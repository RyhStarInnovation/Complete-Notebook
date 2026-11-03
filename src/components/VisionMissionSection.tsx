import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { AppleLogoIcon, GooglePlayIcon } from './StoreIcons';
import { EASE_OUT_EXPO, RevealInView } from './motionPrimitives';

interface VisionMissionSectionProps {
  onNavigateUpdates: () => void;
}

export function VisionMissionSection({ onNavigateUpdates }: VisionMissionSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="vision"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Vision & 3 Missions */}
        <div className="space-y-12">
          <RevealInView className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
              {t.visionSection.sectionNumber}
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.visionSection.heading}
            </h2>
          </RevealInView>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Vision Block */}
            <RevealInView
              delay={0.05}
              className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-7 sm:p-8 space-y-4"
            >
              <p className="text-xs font-semibold text-blue-600 dark:text-sky-400">
                {SITE_CONFIG.companyName}
              </p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t.visionSection.visionTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.visionSection.visionBody}
              </p>
            </RevealInView>

            {/* 3 Core Missions */}
            <div className="lg:col-span-7 space-y-4">
              <RevealInView>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white px-1">
                  {t.visionSection.missionTitle}
                </h3>
              </RevealInView>
              <div className="grid grid-cols-1 gap-4">
                {t.visionSection.missions.map((mission, idx) => (
                  <motion.div
                    key={mission.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -3 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.07,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-6 space-y-2"
                  >
                    <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {mission.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {mission.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Conversion & Official Community Block */}
        <RevealInView className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#0B1428] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white text-balance">
              {t.visionSection.ctaTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.visionSection.ctaBody}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
              <a
                href={`mailto:${SITE_CONFIG.developerEmail}`}
                className="inline-flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>
                  {t.visionSection.contactLabel}: {SITE_CONFIG.developerEmail}
                </span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={SITE_CONFIG.socials.tiktokGlobal}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-sky-400 underline-offset-4 hover:underline"
              >
                TikTok Global
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={SITE_CONFIG.socials.tiktokIdn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-sky-400 underline-offset-4 hover:underline"
              >
                TikTok Indonesia
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={SITE_CONFIG.socials.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-sky-400 underline-offset-4 hover:underline"
              >
                Reddit u/CompleteNotebook
              </a>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <motion.a
              href={SITE_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
            >
              <GooglePlayIcon className="w-4 h-4 shrink-0" />
              <span>{t.visionSection.ctaButton}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </motion.a>
            <motion.button
              type="button"
              onClick={onNavigateUpdates}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700/90 bg-white/80 dark:bg-[#0D1527] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131F38] font-medium text-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <AppleLogoIcon className="w-4 h-4 shrink-0 text-slate-900 dark:text-white" />
              <span>{t.drawer.appStoreComingSoon}</span>
            </motion.button>
          </div>
        </RevealInView>
      </div>
    </section>
  );
}
