import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../i18n/types';
import { LocalizedUpdateText, UpdateTranslationsMap } from './firebase';

interface TranslateApiResponse {
  translations?: UpdateTranslationsMap;
  detectedSourceLang?: string;
  error?: string;
}

export interface FullTranslationResult {
  translations: UpdateTranslationsMap;
  detectedSourceLang?: SupportedLanguage;
}

function isSupportedLanguageCode(val: unknown): val is SupportedLanguage {
  return (
    typeof val === 'string' && SUPPORTED_LANGUAGES.some((langMeta) => langMeta.code === val)
  );
}

const SESSION_CACHE_PREFIX = 'cn_auto_tx_v1_';
const memoryTranslationCache = new Map<string, LocalizedUpdateText>();
const inflightRequests = new Map<string, Promise<LocalizedUpdateText | null>>();

function makeRuntimeCacheKey(
  recordId: string,
  updatedAtMs: number,
  targetLang: SupportedLanguage
): string {
  return `${SESSION_CACHE_PREFIX}${recordId}_${updatedAtMs}_${targetLang}`;
}

export function getCachedRuntimeTranslation(
  recordId: string,
  updatedAtMs: number,
  targetLang: SupportedLanguage
): LocalizedUpdateText | null {
  const key = makeRuntimeCacheKey(recordId, updatedAtMs, targetLang);
  const mem = memoryTranslationCache.get(key);
  if (mem) return mem;

  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as LocalizedUpdateText;
      if (parsed?.title && parsed?.summary) {
        memoryTranslationCache.set(key, parsed);
        return parsed;
      }
    }
  } catch {
    // Ignore storage read restrictions
  }
  return null;
}

function storeCachedRuntimeTranslation(
  recordId: string,
  updatedAtMs: number,
  targetLang: SupportedLanguage,
  entry: LocalizedUpdateText
): void {
  const key = makeRuntimeCacheKey(recordId, updatedAtMs, targetLang);
  memoryTranslationCache.set(key, entry);
  try {
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Ignore storage quota limits
  }
}

export class TranslationServiceUnavailableError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'TranslationServiceUnavailableError';
    this.status = status;
  }
}

/**
 * Translates an Admin release update into all 8 supported website languages at once
 * so visitors switching the language selector see instant localized text from Firestore.
 */
export async function translateUpdateToAllLanguages(
  title: string,
  summary: string
): Promise<FullTranslationResult> {
  const allCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
  let response: Response;
  try {
    response = await fetch('/api/translate-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        summary: summary.trim(),
        targetLangs: allCodes,
      }),
    });
  } catch {
    throw new TranslationServiceUnavailableError('Translation endpoint unreachable.', 0);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  let payload: TranslateApiResponse = {};
  if (isJson) {
    try {
      payload = (await response.json()) as TranslateApiResponse;
    } catch {
      // Ignore malformed JSON body
    }
  }

  if (!isJson || response.status === 404 || response.status === 405 || response.status >= 500) {
    throw new TranslationServiceUnavailableError(
      payload.error || `Translation service unavailable (${response.status}).`,
      response.status
    );
  }

  if (!response.ok || !payload.translations) {
    throw new Error(payload.error || `Translation request failed (${response.status}).`);
  }

  return {
    translations: payload.translations,
    detectedSourceLang: isSupportedLanguageCode(payload.detectedSourceLang)
      ? payload.detectedSourceLang
      : undefined,
  };
}

/**
 * Dynamically translates an older Firestore update record that does not yet contain
 * the visitor's active language in `record.translations`, caching the result locally.
 */
export async function translateLegacyRecordForLanguage(
  recordId: string,
  updatedAtMs: number,
  title: string,
  summary: string,
  targetLang: SupportedLanguage
): Promise<LocalizedUpdateText | null> {
  const cached = getCachedRuntimeTranslation(recordId, updatedAtMs, targetLang);
  if (cached) return cached;

  const inflightKey = makeRuntimeCacheKey(recordId, updatedAtMs, targetLang);
  const existingPromise = inflightRequests.get(inflightKey);
  if (existingPromise) return existingPromise;

  const requestPromise = (async (): Promise<LocalizedUpdateText | null> => {
    try {
      const response = await fetch('/api/translate-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim(),
          targetLangs: [targetLang],
        }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!response.ok || !contentType.includes('application/json')) return null;

      const data = (await response.json()) as TranslateApiResponse;
      const entry = data.translations?.[targetLang];
      if (entry && entry.title && entry.summary) {
        storeCachedRuntimeTranslation(recordId, updatedAtMs, targetLang, entry);
        return entry;
      }
      return null;
    } catch {
      return null;
    } finally {
      inflightRequests.delete(inflightKey);
    }
  })();

  inflightRequests.set(inflightKey, requestPromise);
  return requestPromise;
}
