import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Edit3,
  Eye,
  EyeOff,
  Globe,
  LogIn,
  Pin,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../i18n/types';
import { UPDATES_AUTO_TRANSLATE_COPY } from '../i18n/updatesMultilangTranslations';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG, UpdateCategory } from '../config/siteConfig';
import {
  AppUpdateInput,
  AppUpdateRecord,
  LocalizedUpdateText,
  createAppUpdate,
  deleteAppUpdateById,
  resolveLocalizedUpdate,
  subscribeToAppUpdates,
  togglePinAppUpdate,
  togglePublishAppUpdate,
  updateExistingAppUpdate,
  validateAppUpdateInput,
} from '../services/firebase';
import {
  TranslationServiceUnavailableError,
  getCachedRuntimeTranslation,
  translateLegacyRecordForLanguage,
  translateUpdateToAllLanguages,
} from '../services/translationClient';
import { EASE_OUT_EXPO, RevealInView } from './motionPrimitives';

function createEmptyForm(defaultLang: SupportedLanguage = 'id'): AppUpdateInput {
  return {
    title: '',
    version: '1.0.1+1',
    category: 'release',
    summary: '',
    defaultLang,
    translations: {},
    playStoreUrl: SITE_CONFIG.playStoreUrl,
    pinned: false,
    published: true,
  };
}

export function UpdatesChangelogSection() {
  const { language, t } = useLanguage();
  const autoCopy = UPDATES_AUTO_TRANSLATE_COPY[language];
  const {
    user,
    authReady,
    isDeveloperAdmin,
    showAdminEntry,
    authError,
    clearAuthError,
    signInAsDeveloper,
  } = useAuth();

  const [updates, setUpdates] = useState<AppUpdateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | UpdateCategory>('all');

  // Dynamic fallback translations for any older Firestore records missing `translations[language]`
  const [runtimeTranslations, setRuntimeTranslations] = useState<
    Record<string, LocalizedUpdateText>
  >({});

  // Single-input editor state for verified developer (ryhstarr@gmail.com)
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AppUpdateInput>(() => createEmptyForm('id'));
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!authReady) return;
    setLoading(true);
    setStreamError(null);

    const unsubscribe = subscribeToAppUpdates(
      isDeveloperAdmin,
      (records) => {
        setUpdates(records);
        setLoading(false);
      },
      (errMessage) => {
        setStreamError(errMessage);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authReady, isDeveloperAdmin]);

  // Automatically translate any older existing Firestore update record that does not yet
  // contain the visitor's active language so every card follows the site language selector.
  useEffect(() => {
    if (updates.length === 0) return;
    let cancelled = false;

    for (const item of updates) {
      const hasExactStored =
        Boolean(item.translations?.[language]?.title?.trim()) &&
        Boolean(item.translations?.[language]?.summary?.trim());

      if (hasExactStored) {
        continue;
      }

      const stateKey = `${item.id}_${item.updatedAtMs}_${language}`;
      const cached = getCachedRuntimeTranslation(item.id, item.updatedAtMs, language);
      if (cached) {
        setRuntimeTranslations((prev) =>
          prev[stateKey] ? prev : { ...prev, [stateKey]: cached }
        );
        continue;
      }

      void translateLegacyRecordForLanguage(
        item.id,
        item.updatedAtMs,
        item.title,
        item.summary,
        language
      ).then((translated) => {
        if (!cancelled && translated) {
          setRuntimeTranslations((prev) => ({
            ...prev,
            [stateKey]: translated,
          }));
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [updates, language]);

  const openCreateForm = () => {
    const initialLang: SupportedLanguage = language || 'id';
    setEditingId(null);
    setForm(createEmptyForm(initialLang));
    setFormError(null);
    setEditorOpen(true);
  };

  const openEditForm = (record: AppUpdateRecord) => {
    // Load the text matching the Admin's currently selected UI language (including runtime-translated legacy cards)
    const runtimeKey = `${record.id}_${record.updatedAtMs}_${language}`;
    const runtimeEntry = runtimeTranslations[runtimeKey];
    const resolvedForAdmin =
      record.translations?.[language]?.title && record.translations?.[language]?.summary
        ? {
            title: record.translations[language]!.title,
            summary: record.translations[language]!.summary,
          }
        : runtimeEntry
          ? { title: runtimeEntry.title, summary: runtimeEntry.summary }
          : resolveLocalizedUpdate(record, language);

    setEditingId(record.id);
    setForm({
      title: resolvedForAdmin.title,
      version: record.version,
      category: record.category,
      summary: resolvedForAdmin.summary,
      defaultLang: language,
      translations: { ...record.translations },
      playStoreUrl: record.playStoreUrl,
      pinned: record.pinned,
      published: record.published,
    });
    setFormError(null);
    setEditorOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isDeveloperAdmin) return;

    const activeUiLang: SupportedLanguage = language || 'id';
    const trimmedTitle = form.title.trim();
    const trimmedSummary = form.summary.trim();

    const baseDraft: AppUpdateInput = {
      ...form,
      defaultLang: activeUiLang,
      title: trimmedTitle,
      summary: trimmedSummary,
      translations: {
        ...form.translations,
        [activeUiLang]: {
          title: trimmedTitle,
          summary: trimmedSummary,
        },
      },
    };

    const validationMessage = validateAppUpdateInput(baseDraft);
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      let finalPayload: AppUpdateInput = baseDraft;

      try {
        // Automatically detect input language & translate into all 8 supported languages on the server
        const { translations: autoTranslations, detectedSourceLang } =
          await translateUpdateToAllLanguages(trimmedTitle, trimmedSummary);

        const effectiveDefaultLang: SupportedLanguage = detectedSourceLang ?? activeUiLang;
        const mergedTranslations = detectedSourceLang
          ? {
              ...autoTranslations,
              // Preserve the Admin's exact verbatim phrasing ONLY for the actual language they wrote in
              [detectedSourceLang]: {
                title: trimmedTitle,
                summary: trimmedSummary,
              },
            }
          : { ...autoTranslations };

        const primaryEntry = mergedTranslations[effectiveDefaultLang];
        finalPayload = {
          ...baseDraft,
          defaultLang: effectiveDefaultLang,
          title: primaryEntry?.title ?? trimmedTitle,
          summary: primaryEntry?.summary ?? trimmedSummary,
          translations: mergedTranslations,
        };
      } catch (txErr) {
        if (!(txErr instanceof TranslationServiceUnavailableError)) {
          throw txErr;
        }
        // Static-host or transient endpoint outage: fall back cleanly to saving baseDraft
      }

      if (editingId) {
        await updateExistingAppUpdate(editingId, finalPayload);
        setActionFeedback(t.updatesSection.feedbackUpdated);
      } else {
        await createAppUpdate(user, finalPayload);
        setActionFeedback(t.updatesSection.feedbackCreated);
      }
      setEditorOpen(false);
      setEditingId(null);
      setForm(createEmptyForm(language || 'id'));
      setTimeout(() => setActionFeedback(null), 4000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save update.');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await deleteAppUpdateById(id);
      setConfirmDeleteId(null);
      setActionFeedback(t.updatesSection.feedbackDeleted);
      setTimeout(() => setActionFeedback(null), 3500);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to delete update.');
    }
  };

  const handleTogglePin = async (record: AppUpdateRecord) => {
    try {
      await togglePinAppUpdate(record.id, !record.pinned);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update pin state.');
    }
  };

  const handleTogglePublish = async (record: AppUpdateRecord) => {
    try {
      await togglePublishAppUpdate(record.id, !record.published);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update visibility.');
    }
  };

  // Fallback official foundational release card when database has zero posts yet
  const fallbackRecord: AppUpdateRecord = {
    id: 'official_launch_seed',
    title: t.updatesSection.defaultSeedTitle,
    version: t.updatesSection.defaultSeedVersion,
    category: 'release',
    summary: t.updatesSection.defaultSeedSummary,
    defaultLang: language,
    translations: {
      [language]: {
        title: t.updatesSection.defaultSeedTitle,
        summary: t.updatesSection.defaultSeedSummary,
      },
    },
    playStoreUrl: SITE_CONFIG.playStoreUrl,
    pinned: true,
    published: true,
    authorUid: 'official',
    authorName: SITE_CONFIG.companyName,
    createdAtMs: new Date('2026-10-01T00:00:00Z').getTime(),
    updatedAtMs: new Date('2026-10-01T00:00:00Z').getTime(),
  };

  const effectiveList = updates.length > 0 ? updates : [fallbackRecord];
  const filteredUpdates =
    filterCategory === 'all'
      ? effectiveList
      : effectiveList.filter((item) => item.category === filterCategory);

  const formatDate = (ms: number) => {
    try {
      return new Intl.DateTimeFormat(language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(ms));
    } catch {
      return new Date(ms).toISOString().slice(0, 10);
    }
  };

  return (
    <section
      id="updates"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#080F1E]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Developer Action Row */}
        <RevealInView className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
              {t.updatesSection.sectionNumber}
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.updatesSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.updatesSection.subheading}
            </p>
          </div>

          {/* Admin Sign-In or Create New Update Trigger (Hidden from regular visitors) */}
          {showAdminEntry && (
            <div className="shrink-0">
              {isDeveloperAdmin ? (
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>{t.updatesSection.newUpdateBtn}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void signInAsDeveloper()}
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1527] hover:bg-slate-100 dark:hover:bg-[#14223E] text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>{t.updatesSection.developerLoginPrompt}</span>
                </button>
              )}
            </div>
          )}
        </RevealInView>

        {/* Status / Auth Alerts */}
        {authError && (
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4">
            <span>{authError}</span>
            <button
              type="button"
              onClick={clearAuthError}
              className="underline font-semibold shrink-0 cursor-pointer"
            >
              OK
            </button>
          </div>
        )}

        {actionFeedback && (
          <div className="p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 text-xs font-medium text-emerald-900 dark:text-emerald-200">
            {actionFeedback}
          </div>
        )}

        {streamError && (
          <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-950/30 text-xs text-rose-900 dark:text-rose-200">
            {streamError}
          </div>
        )}

        {/* Developer Admin Single-Input Create / Edit Form Panel */}
        <AnimatePresence>
          {isDeveloperAdmin && editorOpen && (
            <motion.form
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              onSubmit={(e) => void handleSaveForm(e)}
              noValidate
              className="rounded-2xl border border-blue-500/40 dark:border-sky-400/40 bg-white dark:bg-[#0D1527] p-6 sm:p-8 space-y-6 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {t.updatesSection.adminToolbarTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {editingId
                      ? `${t.updatesSection.editingIdPrefix}: ${editingId}`
                      : t.updatesSection.newUpdateBtn}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label={t.updatesSection.cancelBtn}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/40 text-xs text-rose-800 dark:text-rose-200">
                  {formError}
                </div>
              )}

              {/* Quiet inline automatic multi-language notice */}
              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Globe className="w-3.5 h-3.5 mt-0.5 text-blue-600 dark:text-sky-400 shrink-0" />
                <span>{autoCopy.autoTranslateNotice}</span>
              </div>

              {/* Single Title + Version, Category & Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.updatesSection.formTitleLabel}
                    </label>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {form.title.length} / {SITE_CONFIG.validation.titleMax}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    dir="auto"
                    minLength={SITE_CONFIG.validation.titleMin}
                    maxLength={SITE_CONFIG.validation.titleMax}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder={t.updatesSection.formTitlePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070D1A] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.updatesSection.formVersionLabel}
                    </label>
                    <input
                      type="text"
                      required
                      minLength={SITE_CONFIG.validation.versionMin}
                      maxLength={SITE_CONFIG.validation.versionMax}
                      value={form.version}
                      onChange={(e) => setForm({ ...form, version: e.target.value })}
                      placeholder="1.0.1+2"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070D1A] font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.updatesSection.formCategoryLabel}
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value as UpdateCategory })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070D1A] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-sky-400"
                    >
                      <option value="release">{t.updatesSection.categories.release}</option>
                      <option value="feature">{t.updatesSection.categories.feature}</option>
                      <option value="security">{t.updatesSection.categories.security}</option>
                      <option value="announcement">{t.updatesSection.categories.announcement}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Single Summary Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.updatesSection.formSummaryLabel}
                  </label>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    {form.summary.length} / {SITE_CONFIG.validation.summaryMax}
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  dir="auto"
                  minLength={SITE_CONFIG.validation.summaryMin}
                  maxLength={SITE_CONFIG.validation.summaryMax}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder={t.updatesSection.formSummaryPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070D1A] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-sky-400"
                />
              </div>

              {/* Play Store Link */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t.updatesSection.formLinkLabel}
                </label>
                <input
                  type="url"
                  maxLength={SITE_CONFIG.validation.playStoreUrlMax}
                  value={form.playStoreUrl}
                  onChange={(e) => setForm({ ...form, playStoreUrl: e.target.value })}
                  placeholder={SITE_CONFIG.playStoreUrl}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070D1A] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-sky-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.pinned}
                    onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
                    className="rounded border-slate-400 text-blue-600 focus:ring-sky-500"
                  />
                  <span>{t.updatesSection.formPinToggle}</span>
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="rounded border-slate-400 text-blue-600 focus:ring-sky-500"
                  />
                  <span>{t.updatesSection.formPublishToggle}</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setEditorOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {t.updatesSection.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:opacity-50 text-white dark:text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {saving ? autoCopy.translatingAndSavingBtn : t.updatesSection.saveBtn}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Interactive Category Segmented Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter updates by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-[#0D1527] border border-slate-200 dark:border-slate-800"
          >
            {(
              [
                ['all', t.updatesSection.filterAll],
                ['release', t.updatesSection.categories.release],
                ['feature', t.updatesSection.categories.feature],
                ['security', t.updatesSection.categories.security],
                ['announcement', t.updatesSection.categories.announcement],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilterCategory(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === key
                    ? 'bg-white dark:bg-[#192848] text-slate-900 dark:text-sky-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {isDeveloperAdmin && updates.length === 0 && !loading && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.updatesSection.emptyLiveHint}
            </p>
          )}
        </div>

        {/* Feed of Release Updates & Announcements */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((skeleton) => (
              <div
                key={skeleton}
                className="h-36 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0D1527]/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {filteredUpdates.map((item, idx) => {
              const isSeed = item.id === 'official_launch_seed';
              const categoryText = t.updatesSection.categories[item.category];
              const runtimeKey = `${item.id}_${item.updatedAtMs}_${language}`;
              const runtimeEntry = runtimeTranslations[runtimeKey];

              const localized = isSeed
                ? {
                    title: item.title,
                    summary: item.summary,
                    resolvedLang: language,
                  }
                : item.translations?.[language]?.title && item.translations?.[language]?.summary
                  ? {
                      title: item.translations[language]!.title,
                      summary: item.translations[language]!.summary,
                      resolvedLang: language,
                    }
                  : runtimeEntry
                    ? {
                        title: runtimeEntry.title,
                        summary: runtimeEntry.summary,
                        resolvedLang: language,
                      }
                    : resolveLocalizedUpdate(item, language);

              const resolvedDir = localized.resolvedLang === 'ar' ? 'rtl' : 'ltr';
              const isAllLangsSynced =
                !isSeed &&
                SUPPORTED_LANGUAGES.every((l) => Boolean(item.translations?.[l.code]?.title));

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -2 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.05, 0.25),
                    ease: EASE_OUT_EXPO,
                  }}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-6 sm:p-8 space-y-4"
                >
                  {/* Clean Unboxed Metadata Row (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-semibold text-blue-600 dark:text-sky-400 tabular-nums">
                        {item.version}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{categoryText}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{formatDate(item.createdAtMs)}</span>
                      {item.pinned && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {t.updatesSection.pinnedLabel}
                          </span>
                        </>
                      )}
                      {!item.published && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-amber-600 dark:text-amber-400">
                            {t.updatesSection.draftLabel}
                          </span>
                        </>
                      )}
                      {isDeveloperAdmin && isAllLangsSynced && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {autoCopy.autoSyncedLangsLabel}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Developer Inline Controls (Only on live Firestore documents) */}
                    {isDeveloperAdmin && !isSeed && (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void handleTogglePin(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                        >
                          <Pin className="w-3 h-3" />
                          <span>
                            {item.pinned ? t.updatesSection.unpinBtn : t.updatesSection.pinBtn}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleTogglePublish(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                        >
                          {item.published ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>{t.updatesSection.unpublishBtn}</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>{t.updatesSection.publishBtn}</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{t.updatesSection.editBtn}</span>
                        </button>

                        {confirmDeleteId === item.id ? (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => void handleConfirmDelete(item.id)}
                              className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
                            >
                              {t.updatesSection.confirmDeleteBtn}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                            >
                              {t.updatesSection.cancelBtn}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>{t.updatesSection.deleteBtn}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div dir={resolvedDir} className="space-y-3">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {localized.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line max-w-4xl">
                      {localized.summary}
                    </p>
                  </div>

                  {item.playStoreUrl && (
                    <div className="pt-2">
                      <a
                        href={item.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline underline-offset-4"
                      >
                        <span>{t.updatesSection.viewOnPlayStore}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
