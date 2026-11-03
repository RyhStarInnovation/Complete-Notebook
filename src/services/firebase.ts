import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { SITE_CONFIG, UpdateCategory } from '../config/siteConfig';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../i18n/types';

const app = initializeApp(firebaseConfig);
export const db = getFirestoreInstance();
export const auth = getAuth(app);

function getFirestoreInstance() {
  return getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

// Validate connection to Firestore on boot per Firebase integration standard
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
void testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface LocalizedUpdateText {
  title: string;
  summary: string;
}

export type UpdateTranslationsMap = Partial<Record<SupportedLanguage, LocalizedUpdateText>>;

export interface AppUpdateRecord {
  id: string;
  title: string;
  version: string;
  category: UpdateCategory;
  summary: string;
  defaultLang: SupportedLanguage;
  translations: UpdateTranslationsMap;
  playStoreUrl: string;
  pinned: boolean;
  published: boolean;
  authorUid: string;
  authorName: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface AppUpdateInput {
  title: string;
  version: string;
  category: UpdateCategory;
  summary: string;
  defaultLang: SupportedLanguage;
  translations: UpdateTranslationsMap;
  playStoreUrl: string;
  pinned: boolean;
  published: boolean;
}

function isSupportedLang(code: unknown): code is SupportedLanguage {
  return (
    typeof code === 'string' &&
    (SITE_CONFIG.validation.allowedLanguages as readonly string[]).includes(code)
  );
}

function toMillis(val: unknown): number {
  if (val instanceof Timestamp) {
    return val.toMillis();
  }
  if (
    val &&
    typeof val === 'object' &&
    'seconds' in val &&
    typeof (val as { seconds: number }).seconds === 'number'
  ) {
    return (val as { seconds: number }).seconds * 1000;
  }
  return Date.now();
}

function parseFirestoreTranslations(raw: unknown): UpdateTranslationsMap {
  if (!raw || typeof raw !== 'object') return {};
  const result: UpdateTranslationsMap = {};
  const source = raw as Record<string, unknown>;
  for (const langMeta of SUPPORTED_LANGUAGES) {
    const entry = source[langMeta.code];
    if (entry && typeof entry === 'object') {
      const e = entry as Record<string, unknown>;
      const t = typeof e.title === 'string' ? e.title.trim() : '';
      const s = typeof e.summary === 'string' ? e.summary.trim() : '';
      if (t.length > 0 && s.length > 0) {
        result[langMeta.code] = { title: t, summary: s };
      }
    }
  }
  return result;
}

/**
 * Resolves the best localized title & summary for a visitor's active UI language.
 * Priority:
 * 1. Exact match in record.translations[activeLanguage]
 * 2. International English fallback (record.translations.en) when activeLanguage !== defaultLang
 * 3. Primary language entry (record.translations[record.defaultLang] or record.title / record.summary)
 */
export function resolveLocalizedUpdate(
  record: AppUpdateRecord,
  activeLanguage: SupportedLanguage
): { title: string; summary: string; resolvedLang: SupportedLanguage } {
  const exact = record.translations?.[activeLanguage];
  if (exact && exact.title.trim().length > 0 && exact.summary.trim().length > 0) {
    return {
      title: exact.title,
      summary: exact.summary,
      resolvedLang: activeLanguage,
    };
  }

  if (activeLanguage !== record.defaultLang) {
    const enFallback = record.translations?.en;
    if (enFallback && enFallback.title.trim().length > 0 && enFallback.summary.trim().length > 0) {
      return {
        title: enFallback.title,
        summary: enFallback.summary,
        resolvedLang: 'en',
      };
    }
  }

  const primaryEntry = record.translations?.[record.defaultLang];
  if (
    primaryEntry &&
    primaryEntry.title.trim().length > 0 &&
    primaryEntry.summary.trim().length > 0
  ) {
    return {
      title: primaryEntry.title,
      summary: primaryEntry.summary,
      resolvedLang: record.defaultLang,
    };
  }

  return {
    title: record.title,
    summary: record.summary,
    resolvedLang: record.defaultLang,
  };
}

/**
 * Sanitizes and normalizes the outgoing translations map so primary language is always synced
 * and blank optional tabs are omitted cleanly before writing to Firestore.
 */
export function buildSanitizedTranslations(input: AppUpdateInput): UpdateTranslationsMap {
  const { validation } = SITE_CONFIG;
  const defaultLang: SupportedLanguage = isSupportedLang(input.defaultLang)
    ? input.defaultLang
    : 'id';
  const primaryTitle = input.title.trim().slice(0, validation.titleMax);
  const primarySummary = input.summary.trim().slice(0, validation.summaryMax);

  const sanitized: UpdateTranslationsMap = {
    [defaultLang]: {
      title: primaryTitle,
      summary: primarySummary,
    },
  };

  for (const langMeta of SUPPORTED_LANGUAGES) {
    if (langMeta.code === defaultLang) continue;
    const rawEntry = input.translations?.[langMeta.code];
    if (!rawEntry) continue;
    const t = rawEntry.title.trim().slice(0, validation.titleMax);
    const s = rawEntry.summary.trim().slice(0, validation.summaryMax);
    if (t.length === 0 && s.length === 0) continue;
    sanitized[langMeta.code] = { title: t, summary: s };
  }

  return sanitized;
}

export function validateAppUpdateInput(
  input: AppUpdateInput,
  incompleteLangFormatter?: (langName: string, titleMin: number, summaryMin: number) => string
): string | null {
  const { validation } = SITE_CONFIG;
  const defaultLang = input.defaultLang;
  if (!isSupportedLang(defaultLang)) {
    return 'Invalid primary language selection.';
  }

  const primaryEntry = input.translations?.[defaultLang];
  const title = (primaryEntry?.title ?? input.title).trim();
  const summary = (primaryEntry?.summary ?? input.summary).trim();
  const version = input.version.trim();
  const playStoreUrl = input.playStoreUrl.trim();

  if (title.length < validation.titleMin || title.length > validation.titleMax) {
    return `Title must be between ${validation.titleMin} and ${validation.titleMax} characters.`;
  }
  if (
    version.length < validation.versionMin ||
    version.length > validation.versionMax ||
    !validation.versionPattern.test(version)
  ) {
    return 'Version must be 1–32 characters (e.g. 1.0.1+1, 1.0.1+2, or v1.0.2).';
  }
  if (!validation.allowedCategories.includes(input.category)) {
    return 'Invalid update category.';
  }
  if (summary.length < validation.summaryMin || summary.length > validation.summaryMax) {
    return `Summary must be between ${validation.summaryMin} and ${validation.summaryMax} characters.`;
  }
  if (playStoreUrl.length > validation.playStoreUrlMax) {
    return `URL must not exceed ${validation.playStoreUrlMax} characters.`;
  }
  if (playStoreUrl.length > 0 && !/^https?:\/\//i.test(playStoreUrl)) {
    return 'Link must start with https:// or http://.';
  }

  // Validate any non-empty optional translations
  for (const langMeta of SUPPORTED_LANGUAGES) {
    if (langMeta.code === defaultLang) continue;
    const rawEntry = input.translations?.[langMeta.code];
    if (!rawEntry) continue;
    const t = rawEntry.title.trim();
    const s = rawEntry.summary.trim();
    if (t.length === 0 && s.length === 0) continue;
    if (
      t.length < validation.titleMin ||
      t.length > validation.titleMax ||
      s.length < validation.summaryMin ||
      s.length > validation.summaryMax
    ) {
      if (incompleteLangFormatter) {
        return incompleteLangFormatter(
          `${langMeta.nativeName} (${langMeta.code.toUpperCase()})`,
          validation.titleMin,
          validation.summaryMin
        );
      }
      return `${langMeta.nativeName} (${langMeta.code.toUpperCase()}): Title must be ${validation.titleMin}–${validation.titleMax} chars and Summary ${validation.summaryMin}–${validation.summaryMax} chars (or clear both fields).`;
    }
  }

  return null;
}

function generateSafeDocumentId(): string {
  const randomSuffix = Math.random().toString(36).slice(2, 10).replace(/[^a-zA-Z0-9]/g, 'x');
  return `upd_${Date.now()}_${randomSuffix}`.slice(0, 64);
}

export function subscribeToAppUpdates(
  isDeveloperAdmin: boolean,
  onData: (records: AppUpdateRecord[]) => void,
  onFriendlyError: (errMessage: string) => void
): () => void {
  const collectionPath = 'app_updates';
  const baseCollection = collection(db, collectionPath);
  const targetQuery = isDeveloperAdmin
    ? baseCollection
    : query(baseCollection, where('published', '==', true));

  return onSnapshot(
    targetQuery,
    (snapshot) => {
      const items: AppUpdateRecord[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const hasExplicitDefaultLang = isSupportedLang(data.defaultLang);
        const defaultLang: SupportedLanguage = hasExplicitDefaultLang
          ? data.defaultLang
          : 'id';
        const parsedTranslations = parseFirestoreTranslations(data.translations);
        const primaryTitle = String(data.title ?? '');
        const primarySummary = String(data.summary ?? '');

        if (
          hasExplicitDefaultLang &&
          !parsedTranslations[defaultLang] &&
          primaryTitle &&
          primarySummary
        ) {
          parsedTranslations[defaultLang] = {
            title: primaryTitle,
            summary: primarySummary,
          };
        }

        return {
          id: docSnap.id,
          title: primaryTitle,
          version: String(data.version ?? 'v1.0'),
          category: (SITE_CONFIG.validation.allowedCategories.includes(data.category)
            ? data.category
            : 'announcement') as UpdateCategory,
          summary: primarySummary,
          defaultLang,
          translations: parsedTranslations,
          playStoreUrl: String(data.playStoreUrl ?? ''),
          pinned: Boolean(data.pinned),
          published: Boolean(data.published),
          authorUid: String(data.authorUid ?? ''),
          authorName: String(data.authorName ?? SITE_CONFIG.companyName),
          createdAtMs: toMillis(data.createdAt),
          updatedAtMs: toMillis(data.updatedAt),
        };
      });

      items.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.createdAtMs - a.createdAtMs;
      });

      onData(items);
    },
    (error) => {
      onFriendlyError(error instanceof Error ? error.message : String(error));
      try {
        handleFirestoreError(error, OperationType.LIST, collectionPath);
      } catch {
        // Structured JSON error logged by handleFirestoreError
      }
    }
  );
}

export async function createAppUpdate(user: User, input: AppUpdateInput): Promise<void> {
  const defaultLang: SupportedLanguage = isSupportedLang(input.defaultLang)
    ? input.defaultLang
    : 'id';
  const primaryEntry = input.translations?.[defaultLang];
  const normalizedInput: AppUpdateInput = {
    ...input,
    defaultLang,
    title: (primaryEntry?.title ?? input.title).trim(),
    summary: (primaryEntry?.summary ?? input.summary).trim(),
  };

  const validationError = validateAppUpdateInput(normalizedInput);
  if (validationError) {
    throw new Error(validationError);
  }

  const sanitizedTranslations = buildSanitizedTranslations(normalizedInput);
  const id = generateSafeDocumentId();
  const path = `app_updates/${id}`;
  const authorName = SITE_CONFIG.companyName.slice(0, SITE_CONFIG.validation.authorNameMax);

  try {
    await setDoc(doc(db, 'app_updates', id), {
      title: normalizedInput.title.slice(0, SITE_CONFIG.validation.titleMax),
      version: normalizedInput.version.trim().slice(0, SITE_CONFIG.validation.versionMax),
      category: normalizedInput.category,
      summary: normalizedInput.summary.slice(0, SITE_CONFIG.validation.summaryMax),
      defaultLang,
      translations: sanitizedTranslations,
      playStoreUrl: normalizedInput.playStoreUrl
        .trim()
        .slice(0, SITE_CONFIG.validation.playStoreUrlMax),
      pinned: Boolean(normalizedInput.pinned),
      published: Boolean(normalizedInput.published),
      authorUid: user.uid,
      authorName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateExistingAppUpdate(id: string, input: AppUpdateInput): Promise<void> {
  const defaultLang: SupportedLanguage = isSupportedLang(input.defaultLang)
    ? input.defaultLang
    : 'id';
  const primaryEntry = input.translations?.[defaultLang];
  const normalizedInput: AppUpdateInput = {
    ...input,
    defaultLang,
    title: (primaryEntry?.title ?? input.title).trim(),
    summary: (primaryEntry?.summary ?? input.summary).trim(),
  };

  const validationError = validateAppUpdateInput(normalizedInput);
  if (validationError) {
    throw new Error(validationError);
  }

  const sanitizedTranslations = buildSanitizedTranslations(normalizedInput);
  const path = `app_updates/${id}`;
  const authorName = SITE_CONFIG.companyName.slice(0, SITE_CONFIG.validation.authorNameMax);

  try {
    await updateDoc(doc(db, 'app_updates', id), {
      title: normalizedInput.title.slice(0, SITE_CONFIG.validation.titleMax),
      version: normalizedInput.version.trim().slice(0, SITE_CONFIG.validation.versionMax),
      category: normalizedInput.category,
      summary: normalizedInput.summary.slice(0, SITE_CONFIG.validation.summaryMax),
      defaultLang,
      translations: sanitizedTranslations,
      playStoreUrl: normalizedInput.playStoreUrl
        .trim()
        .slice(0, SITE_CONFIG.validation.playStoreUrlMax),
      pinned: Boolean(normalizedInput.pinned),
      published: Boolean(normalizedInput.published),
      authorName,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function togglePinAppUpdate(id: string, pinned: boolean): Promise<void> {
  const path = `app_updates/${id}`;
  try {
    await updateDoc(doc(db, 'app_updates', id), {
      pinned: Boolean(pinned),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function togglePublishAppUpdate(id: string, published: boolean): Promise<void> {
  const path = `app_updates/${id}`;
  try {
    await updateDoc(doc(db, 'app_updates', id), {
      published: Boolean(published),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteAppUpdateById(id: string): Promise<void> {
  const path = `app_updates/${id}`;
  try {
    await deleteDoc(doc(db, 'app_updates', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function signInWithGooglePopup(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
}

export async function signOutDeveloperSession(): Promise<void> {
  await signOut(auth);
}
