import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Moon, Play, Smartphone, Sun } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { GALLERY_TRANSLATIONS } from '../i18n/galleryTranslations';
import { VIDEO_SHOWCASE_TRANSLATIONS } from '../i18n/videoShowcaseTranslations';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { MediaFrame } from './MediaFrame';
import { FramelessPhoneVideo } from './FramelessPhoneVideo';
import { AppleLogoIcon, GooglePlayIcon } from './StoreIcons';
import { EASE_OUT_EXPO } from './motionPrimitives';

interface HeroSectionProps {
  onExploreFeatures: () => void;
  onWatchVideo: () => void;
  onNavigateUpdates: () => void;
}

export function HeroSection({
  onExploreFeatures,
  onWatchVideo,
  onNavigateUpdates,
}: HeroSectionProps) {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const galleryCopy = GALLERY_TRANSLATIONS[language];
  const videoCopy = VIDEO_SHOWCASE_TRANSLATIONS[language];

  const [previewMode, setPreviewMode] = useState<'live' | 'dark' | 'light'>('live');
  const prevThemeRef = useRef(theme);

  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      prevThemeRef.current = theme;
      setPreviewMode((curr) => (curr === 'live' ? 'live' : theme));
    }
  }, [theme]);

  const activeHeroScreen =
    previewMode === 'dark'
      ? MEDIA_REGISTRY.darkModeScreen
      : MEDIA_REGISTRY.lightModeScreen;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      {/* Subtle GPU-Composited Ambient Midnight-Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-1/5 w-[480px] h-[480px] rounded-full hero-ambient-orb"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Balanced 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Proposition & Action */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                {t.hero.kicker}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06, ease: EASE_OUT_EXPO }}
                className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white text-balance"
              >
                <span className="text-blue-600 dark:text-sky-400">
                  {SITE_CONFIG.appName}
                </span>
                <span className="text-slate-400 dark:text-slate-600 font-normal">
                  {' — '}
                </span>
                <span>{t.hero.headline}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT_EXPO }}
                className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl"
              >
                {t.hero.subheadline}
              </motion.p>

              {/* Single Dominant Primary Play Store CTA + Subordinate App Store Coming Soon + Editorial Explore Link */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT_EXPO }}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                <motion.a
                  href={SITE_CONFIG.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  className="inline-flex items-center gap-2.5 min-h-[46px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors duration-150 whitespace-nowrap shrink-0 shadow-sm"
                >
                  <GooglePlayIcon className="w-4 h-4 shrink-0" />
                  <span>{t.hero.primaryCta}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </motion.a>
                <motion.button
                  type="button"
                  onClick={onNavigateUpdates}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  className="inline-flex items-center gap-2 min-h-[46px] px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700/90 bg-white/80 dark:bg-[#0D1527] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131F38] font-medium text-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <AppleLogoIcon className="w-4 h-4 shrink-0 text-slate-900 dark:text-white" />
                  <span>{t.hero.appStoreSoonCta}</span>
                </motion.button>
                <button
                  type="button"
                  onClick={onExploreFeatures}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-2 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{t.hero.secondaryCta}</span>
                  <ArrowDownRight className="w-4 h-4 shrink-0" />
                </button>
              </motion.div>
            </div>

            {/* About Complete Notebook Summary Block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT_EXPO }}
              className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-start gap-4"
            >
              <div className="shrink-0 mt-0.5 animate-phone-float">
                <MediaFrame
                  src={MEDIA_REGISTRY.brandEmblem}
                  alt="Complete Notebook – Official App by RyhStar Innovation"
                  className="w-12 h-12 rounded-xl bg-transparent"
                  imgClassName="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t.hero.aboutTitle}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
                  {t.hero.aboutBody}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Frameless Live Smartphone Video & Static Mode Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 flex flex-col items-center space-y-4"
          >
            {/* Interactive 3-Mode Switcher: Live Phone UI | Dark Mode | Light Mode */}
            <div className="w-full max-w-[332px] grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0D1527] border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewMode('live')}
                className={`relative inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  previewMode === 'live'
                    ? 'text-white dark:text-slate-950'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {previewMode === 'live' && (
                  <motion.span
                    layoutId="heroPreviewActivePill"
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-lg bg-blue-600 dark:bg-sky-400 shadow-xs"
                  />
                )}
                <Smartphone className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10 truncate">{videoCopy.heroLiveUiTab}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode('dark')}
                className={`relative inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  previewMode === 'dark'
                    ? 'text-sky-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {previewMode === 'dark' && (
                  <motion.span
                    layoutId="heroPreviewActivePill"
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-lg bg-[#162447] shadow-xs"
                  />
                )}
                <Moon className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10 truncate">{galleryCopy.heroDarkBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode('light')}
                className={`relative inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  previewMode === 'light'
                    ? 'text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {previewMode === 'light' && (
                  <motion.span
                    layoutId="heroPreviewActivePill"
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-lg bg-white shadow-xs"
                  />
                )}
                <Sun className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10 truncate">{galleryCopy.heroLightBtn}</span>
              </button>
            </div>

            {/* Transparent Floating Official Phone Stage (Live Frameless Video or Static PNG) */}
            <div className="relative w-full max-w-[320px] flex justify-center">
              <AnimatePresence mode="wait">
                {previewMode === 'live' ? (
                  <motion.div
                    key="live-phone-video"
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -6 }}
                    transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                    className="w-full flex justify-center"
                  >
                    <FramelessPhoneVideo maxWidthClass="max-w-[238px]" showPhasePills />
                  </motion.div>
                ) : (
                  <motion.div
                    key={previewMode}
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -6 }}
                    whileHover={{ scale: 1.025, y: -3 }}
                    transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                    className="relative w-full flex justify-center py-2"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-full phone-aura-breathe"
                    />
                    <div className="w-full animate-phone-float">
                      <MediaFrame
                        src={activeHeroScreen}
                        alt={
                          previewMode === 'dark'
                            ? 'Complete Notebook Dark Mode Interface'
                            : 'Complete Notebook Light Mode Interface'
                        }
                        className="w-full max-h-[480px] bg-transparent"
                        imgClassName="w-full h-full max-h-[480px] object-contain drop-shadow-[0_20px_38px_rgba(2,8,23,0.38)]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle Quick Jump to Official 3D & Live UI Video Showcase */}
            <motion.button
              type="button"
              onClick={onWatchVideo}
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-sky-500/10 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>{videoCopy.heroQuickWatch}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Architectural Value Strip Below Hero Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          {[
            {
              title: t.hero.metrics.offlineTitle,
              desc: t.hero.metrics.offlineDesc,
            },
            {
              title: t.hero.metrics.zeroSubTitle,
              desc: t.hero.metrics.zeroSubDesc,
            },
            {
              title: t.hero.metrics.ownershipTitle,
              desc: t.hero.metrics.ownershipDesc,
            },
            {
              title: t.hero.metrics.globalTitle,
              desc: t.hero.metrics.globalDesc,
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: EASE_OUT_EXPO,
              }}
              className="space-y-1.5"
            >
              <p className="font-display text-base font-bold text-slate-900 dark:text-white">
                {metric.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
