import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { MediaFrame } from './MediaFrame';
import { EASE_OUT_EXPO, FloatingShowcase, RevealInView } from './motionPrimitives';

interface PrivacyDriveSectionProps {
  onOpenPrivacyPolicy: () => void;
}

export function PrivacyDriveSection({ onOpenPrivacyPolicy }: PrivacyDriveSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="privacy"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Narrative & Multi-Layer Lock */}
          <RevealInView className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
                {t.privacySection.sectionNumber}
              </p>
              <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {t.privacySection.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {t.privacySection.subheading}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1527] p-6 sm:p-7 space-y-4">
              <p className="font-display text-base font-bold text-slate-900 dark:text-white">
                {t.privacySection.lockLabel}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.privacySection.lockDesc}
              </p>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                <p className="font-display text-sm font-bold text-slate-900 dark:text-sky-300">
                  {t.privacySection.ownershipTitle}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.privacySection.ownershipDesc}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href={SITE_CONFIG.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{t.privacyPolicyPage.openOfficialPolicyBtn}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                onClick={onOpenPrivacyPolicy}
                className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1527] hover:bg-slate-100 dark:hover:bg-[#14223E] text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{t.privacySection.readFullPolicyBtn}</span>
                <ArrowRight className="w-4 h-4 shrink-0 rtl:rotate-180" />
              </motion.button>
            </div>
          </RevealInView>

          {/* Right Official Privacy & Data Backup App Screen (Transparent Background) */}
          <RevealInView delay={0.1} className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className="group w-full max-w-[380px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0D1527] p-5 flex items-center justify-center"
            >
              <FloatingShowcase amplitude={8} duration={5.6} className="w-full">
                <MediaFrame
                  src={MEDIA_REGISTRY.privacyBackupScreen}
                  alt={t.privacySection.heading}
                  className="w-full max-h-[440px] bg-transparent"
                  imgClassName="w-full h-full max-h-[440px] object-contain drop-shadow-[0_18px_36px_rgba(2,8,23,0.38)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </FloatingShowcase>
            </motion.div>
          </RevealInView>
        </div>

        {/* 3 Pillars of Personal Google Drive Sovereignty */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 space-y-6">
          <RevealInView>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {t.privacySection.driveHeading}
            </h3>
          </RevealInView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t.privacySection.driveBackupTitle,
                desc: t.privacySection.driveBackupDesc,
              },
              {
                title: t.privacySection.driveRestoreTitle,
                desc: t.privacySection.driveRestoreDesc,
              },
              {
                title: t.privacySection.driveDeleteTitle,
                desc: t.privacySection.driveDeleteDesc,
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.07,
                  ease: EASE_OUT_EXPO,
                }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-6 space-y-2.5"
              >
                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
