import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { FAQ_TRANSLATIONS } from '../i18n/faqTranslations';
import { SITE_CONFIG } from '../config/siteConfig';
import { EASE_OUT_EXPO, RevealInView } from './motionPrimitives';

interface OfficialFaqSectionProps {
  onNavigateUpdates: () => void;
}

export function OfficialFaqSection({ onNavigateUpdates }: OfficialFaqSectionProps) {
  const { language, t } = useLanguage();
  const faqCopy = FAQ_TRANSLATIONS[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="official-faq-heading"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Editorial Column: Brand Entity Disambiguation */}
          <RevealInView className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
              {faqCopy.sectionKicker}
            </p>
            <h2
              id="official-faq-heading"
              className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance"
            >
              {faqCopy.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {faqCopy.subheading}
            </p>

            {/* Clean Unboxed Official Product Metadata */}
            <div className="pt-5 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                {faqCopy.officialFactsLabel}
              </p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {SITE_CONFIG.appName}
                </span>
                <span aria-hidden="true">·</span>
                <span>{SITE_CONFIG.companyName}</span>
                <span aria-hidden="true">·</span>
                <span>Android (Google Play)</span>
                <span aria-hidden="true">·</span>
                <span>{t.hero.appStoreSoonCta}</span>
              </div>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400 break-all">
                {SITE_CONFIG.packageId}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={SITE_CONFIG.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline underline-offset-4"
                >
                  <span>
                    {SITE_CONFIG.appName} — {t.footer.playStoreOfficialPage}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
                <span aria-hidden="true" className="text-xs text-slate-400">
                  ·
                </span>
                <button
                  type="button"
                  onClick={onNavigateUpdates}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>{t.footer.appStoreComingSoon}</span>
                </button>
              </div>
            </div>
          </RevealInView>

          {/* Right Column: Accessible Accordion Q&A */}
          <div className="lg:col-span-7 divide-y divide-slate-200 dark:divide-slate-800/90 border-y border-slate-200 dark:border-slate-800/90">
            {faqCopy.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              const triggerId = `faq-trigger-${idx}`;

              return (
                <div key={item.question} className="py-5">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-start justify-between gap-4 text-start group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                    >
                      <span className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 mt-0.5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600 dark:text-sky-400' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={
                      isOpen
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className={`overflow-hidden ${!isOpen ? 'pointer-events-none select-none' : ''}`}
                  >
                    <p className="pt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
