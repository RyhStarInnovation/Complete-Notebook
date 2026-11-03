import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Box,
  Maximize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Smartphone,
  Sun,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { VIDEO_SHOWCASE_TRANSLATIONS } from '../i18n/videoShowcaseTranslations';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { FramelessPhoneVideo } from './FramelessPhoneVideo';
import { EASE_OUT_EXPO, RevealInView } from './motionPrimitives';

interface VideoShowcaseSectionProps {
  onExploreGallery: () => void;
}

export function VideoShowcaseSection({ onExploreGallery }: VideoShowcaseSectionProps) {
  const { language, t } = useLanguage();
  const copy = VIDEO_SHOWCASE_TRANSLATIONS[language];

  const sectionRef = useRef<HTMLElement | null>(null);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const [showcaseMode, setShowcaseMode] = useState<'3d' | 'live-ui'>('3d');
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState<'light' | 'dark'>('light');
  const [liveUiPhase, setLiveUiPhase] = useState<'light' | 'dark'>('light');
  const [liveUiSeekRequest, setLiveUiSeekRequest] = useState<{
    seconds: number;
    nonce: number;
  } | null>(null);
  const [cinemaOpen, setCinemaOpen] = useState(false);

  // Auto-pause 3D inline video when scrolled offscreen or switched to live-ui tab
  useEffect(() => {
    const videoEl = inlineVideoRef.current;
    const wrapperEl = sectionRef.current;
    if (!videoEl || !wrapperEl || showcaseMode !== '3d') return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      videoEl.pause();
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !cinemaOpen) {
          videoEl
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          videoEl.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapperEl);
    return () => observer.disconnect();
  }, [showcaseMode, cinemaOpen]);

  // Pause inline video when Cinema Modal opens
  useEffect(() => {
    if (!cinemaOpen) return;

    const inlineEl = inlineVideoRef.current;
    if (inlineEl) {
      inlineEl.pause();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCinemaOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cinemaOpen]);

  const handleLoadedMetadata = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;
    if (videoEl.currentTime < 0.5) {
      videoEl.currentTime = 0.7;
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl || !videoEl.duration) return;

    const current = videoEl.currentTime;
    const pct = Math.min(100, Math.max(0, (current / videoEl.duration) * 100));
    setProgress(pct);
    setActivePhase(current >= 5.3 ? 'dark' : 'light');
  };

  const togglePlay = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) {
      void videoEl.play();
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;
    videoEl.currentTime = 0.6;
    void videoEl.play();
    setIsPlaying(true);
  };

  const toggleModalPlay = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setModalPlaying(true);
    } else {
      el.pause();
      setModalPlaying(false);
    }
  };

  const replayModal = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    el.currentTime = 0.6;
    void el.play();
    setModalPlaying(true);
  };

  const seekToChapter = (seconds: number, phase: 'light' | 'dark') => {
    if (showcaseMode === 'live-ui') {
      setLiveUiPhase(phase);
      setLiveUiSeekRequest({ seconds, nonce: Date.now() });
      return;
    }
    const videoEl = inlineVideoRef.current;
    setActivePhase(phase);
    if (!videoEl) return;
    videoEl.currentTime = seconds;
    void videoEl.play();
    setIsPlaying(true);
  };

  const activeChapters = showcaseMode === 'live-ui' ? copy.liveUiChapters : copy.chapters;
  const currentPhase = showcaseMode === 'live-ui' ? liveUiPhase : activePhase;

  return (
    <section
      ref={sectionRef}
      id="video-showcase"
      className="relative py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060B16] overflow-hidden"
    >
      {/* Subtle GPU-Composited Ambient Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full hero-ambient-orb"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Video Mode Switcher + Narrative + Interactive Timestamp Chapters */}
          <RevealInView className="lg:col-span-7 space-y-7 order-2 lg:order-1">
            {/* Dual Official Video Switcher */}
            <div className="inline-grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0D1527] border border-slate-200 dark:border-slate-800 max-w-md">
              <button
                type="button"
                onClick={() => setShowcaseMode('3d')}
                className={`relative inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  showcaseMode === '3d'
                    ? 'text-blue-700 dark:text-sky-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {showcaseMode === '3d' && (
                  <motion.span
                    layoutId="videoShowcaseModePill"
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-[#17284B] shadow-xs"
                  />
                )}
                <Box className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10 truncate">{copy.mode3dTab}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowcaseMode('live-ui')}
                className={`relative inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  showcaseMode === 'live-ui'
                    ? 'text-blue-700 dark:text-sky-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {showcaseMode === 'live-ui' && (
                  <motion.span
                    layoutId="videoShowcaseModePill"
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-[#17284B] shadow-xs"
                  />
                )}
                <Smartphone className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10 truncate">{copy.modeLiveUiTab}</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={showcaseMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                className="space-y-4"
              >
                <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
                  {showcaseMode === 'live-ui' ? copy.liveUiKicker : copy.kicker}
                </p>
                <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                  {showcaseMode === 'live-ui' ? copy.liveUiHeading : copy.heading}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {showcaseMode === 'live-ui' ? copy.liveUiSubheading : copy.subheading}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Video Scene Chapters (Click to Seek) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeChapters.map((chapter) => {
                const isCurrent = currentPhase === chapter.id;
                const Icon = chapter.id === 'light' ? Sun : Moon;
                return (
                  <motion.button
                    key={`${showcaseMode}-${chapter.id}`}
                    type="button"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                    onClick={() => seekToChapter(chapter.seekSeconds, chapter.id)}
                    className={`text-start p-5 rounded-2xl border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                      isCurrent
                        ? 'border-blue-600 dark:border-sky-400 bg-blue-50/50 dark:bg-[#0E1A32]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1325] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="font-mono text-xs font-medium text-blue-600 dark:text-sky-400">
                        {chapter.timeLabel}
                      </span>
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isCurrent
                            ? 'text-blue-600 dark:text-sky-400'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display text-base font-bold text-slate-950 dark:text-white">
                        {chapter.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {chapter.desc}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <motion.a
                href={SITE_CONFIG.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </motion.a>

              <motion.button
                type="button"
                onClick={onExploreGallery}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700/90 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#0D1527] font-medium text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{copy.exploreScreensCta}</span>
                <ArrowDownRight className="w-4 h-4 shrink-0" />
              </motion.button>
            </div>
          </RevealInView>

          {/* Right Column: Switchable 3D Cinema Stage OR Frameless Floating Smartphone Video */}
          <RevealInView
            delay={0.08}
            className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2"
          >
            <div className="w-full flex justify-center">
              <AnimatePresence mode="wait">
                {showcaseMode === 'live-ui' ? (
                  <motion.div
                    key="frameless-live-ui"
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -8 }}
                    transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                    className="w-full flex justify-center"
                  >
                    <FramelessPhoneVideo
                      maxWidthClass="max-w-[282px]"
                      onPhaseChange={setLiveUiPhase}
                      seekRequest={liveUiSeekRequest}
                      showPhasePills
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="cinema-3d"
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -8 }}
                    transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                    className="relative w-full max-w-[325px] py-2"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-full phone-aura-breathe"
                    />
                    <div className="relative animate-phone-float rounded-[28px] p-2 bg-slate-900 dark:bg-[#0D172B] border border-slate-800 dark:border-slate-700/80 shadow-[0_22px_48px_-12px_rgba(2,8,23,0.42)]">
                      {/* Inner 9:16 Video Frame */}
                      <div className="group relative aspect-[9/16] w-full rounded-[21px] overflow-hidden bg-[#F5F5F3]">
                        <video
                          ref={inlineVideoRef}
                          src={MEDIA_REGISTRY.officialPromoVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          onLoadedMetadata={handleLoadedMetadata}
                          onTimeUpdate={handleTimeUpdate}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onClick={togglePlay}
                          className="w-full h-full object-cover cursor-pointer"
                        />

                        {/* Top-Right Fullscreen Cinema Trigger */}
                        <button
                          type="button"
                          onClick={() => setCinemaOpen(true)}
                          aria-label={copy.expandLabel}
                          title={copy.expandLabel}
                          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>

                        {/* Bottom Control Bar Overlay */}
                        <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={togglePlay}
                              aria-label={isPlaying ? copy.pauseLabel : copy.playLabel}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white transition-colors cursor-pointer"
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 fill-current" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={handleReplay}
                              aria-label={copy.replayLabel}
                              title={copy.replayLabel}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Hairline Playback Timeline */}
                          <div className="mt-2.5 h-1 w-full rounded-full bg-white/25 overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: Math.max(0.02, progress / 100) }}
                              transition={{ duration: 0.12, ease: 'linear' }}
                              className="h-full w-full origin-left bg-sky-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealInView>
        </div>
      </div>

      {/* Fullscreen Cinema Modal for 3D Video */}
      <AnimatePresence>
        {cinemaOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={copy.navLabel}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCinemaOpen(false)}
              className="fixed inset-0 bg-slate-950/88 backdrop-blur-xs"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-slate-700 bg-[#0B1325] p-3 sm:p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 pb-3 px-1">
                <p className="font-display text-sm font-bold text-white truncate">
                  {copy.mode3dTab} · {SITE_CONFIG.appName}
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    aria-label={modalPlaying ? copy.pauseLabel : copy.playLabel}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  >
                    {modalPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={replayModal}
                    aria-label={copy.replayLabel}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCinemaOpen(false)}
                    aria-label={copy.closeLabel}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="aspect-[9/16] max-h-[78vh] mx-auto rounded-2xl overflow-hidden bg-[#F5F5F3]">
                <video
                  ref={modalVideoRef}
                  src={MEDIA_REGISTRY.officialPromoVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onPlay={() => setModalPlaying(true)}
                  onPause={() => setModalPlaying(false)}
                  onClick={toggleModalPlay}
                  className="w-full h-full object-contain cursor-pointer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
