import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Link2, Mail, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';

interface PrivacyPolicyViewProps {
  onBackHome: () => void;
}

export function PrivacyPolicyView({ onBackHome }: PrivacyPolicyViewProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyDirectUrl = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.privacyPolicyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <main className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#0D1527] transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 rtl:rotate-180" />
            <span>{t.nav.backToHome}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void handleCopyDirectUrl()}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1527] text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#14223E] transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.privacyPolicyPage.copiedLinkLabel}</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>{t.privacyPolicyPage.copyLinkBtn}</span>
                </>
              )}
            </button>

            <a
              href={SITE_CONFIG.privacyPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <span>{t.privacyPolicyPage.openOfficialPolicyBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Document Header */}
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-sky-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t.privacyPolicyPage.kicker}</span>
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
            {t.privacyPolicyPage.title}
          </h1>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {t.privacyPolicyPage.effectiveDate}
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
            {t.privacyPolicyPage.intro}
          </p>

          {/* Verified Active Google Play Privacy Policy URL Reference */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1428] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t.privacyPolicyPage.officialPolicyUrlLabel}
              </p>
              <a
                href={SITE_CONFIG.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-600 dark:text-sky-400 hover:underline break-all"
              >
                <span>{SITE_CONFIG.privacyPolicyUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Structured Compliance Clauses */}
        <div className="space-y-6">
          {t.privacyPolicyPage.sections.map((sec) => (
            <section
              key={sec.heading}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-6 sm:p-8 space-y-3"
            >
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {sec.heading}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {sec.body}
              </p>
            </section>
          ))}
        </div>

        {/* Official Contact Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-[#0B1428] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={MEDIA_REGISTRY.brandEmblem}
              alt="Complete Notebook Official Logo"
              referrerPolicy="no-referrer"
              className="w-11 h-11 object-contain shrink-0"
            />
            <div className="space-y-1">
              <p className="font-display text-base font-bold text-slate-900 dark:text-white">
                {SITE_CONFIG.companyName} · {SITE_CONFIG.appName}
              </p>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {SITE_CONFIG.packageId}
              </p>
            </div>
          </div>
          <a
            href={`mailto:${SITE_CONFIG.developerEmail}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>{SITE_CONFIG.developerEmail}</span>
          </a>
        </div>
      </div>
    </main>
  );
}
