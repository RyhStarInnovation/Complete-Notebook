import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Maximize2, Moon, Pause, Play, RotateCcw, Sun, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { VIDEO_SHOWCASE_TRANSLATIONS } from '../i18n/videoShowcaseTranslations';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { EASE_OUT_EXPO } from './motionPrimitives';

interface FramelessPhoneVideoProps {
  /** Max width class for the floating smartphone (e.g. "max-w-[248px]" or "max-w-[296px]") */
  maxWidthClass?: string;
  /** Optional external callback when active phase changes between light (0-13.6s) and dark (13.6-27s) */
  onPhaseChange?: (phase: 'light' | 'dark') => void;
  /** Optional imperative seek request controlled by parent */
  seekRequest?: { seconds: number; nonce: number } | null;
  /** Show compact Light/Dark quick-seek buttons under the phone */
  showPhasePills?: boolean;
}

/**
 * Renders `TAMPILAN_UI_01ee2656.mp4` strictly cropped to the exact rounded metallic
 * smartphone chassis (x=155..925, y=205..1767, corner radius R=126px out of 1080x1920)
 * so 100% of the outer white background is eliminated and ONLY the floating phone is visible.
 */
export function FramelessPhoneVideo({
  maxWidthClass = 'max-w-[252px]',
  onPhaseChange,
  seekRequest = null,
  showPhasePills = true,
}: FramelessPhoneVideoProps) {
  const { language } = useLanguage();
  const copy = VIDEO_SHOWCASE_TRANSLATIONS[language];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activePhase, setActivePhase] = useState<'light' | 'dark'>('light');
  const activePhaseRef = useRef<'light' | 'dark'>('light');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);

  // Respect prefers-reduced-motion and auto-pause when scrolled offscreen
  useEffect(() => {
    const videoEl = inlineVideoRef.current;
    const wrapperEl = containerRef.current;
    if (!videoEl || !wrapperEl) return;

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
        if (entry.isIntersecting && !modalOpen) {
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
  }, [modalOpen]);

  // Respond to parent chapter seek requests
  useEffect(() => {
    if (!seekRequest) return;
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;
    videoEl.currentTime = seekRequest.seconds;
    void videoEl.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [seekRequest]);

  // Lock body scroll & handle Escape when frameless phone modal is open
  useEffect(() => {
    if (!modalOpen) return;

    const inlineEl = inlineVideoRef.current;
    if (inlineEl) {
      inlineEl.pause();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  const handleTimeUpdate = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;
    const nextPhase: 'light' | 'dark' = videoEl.currentTime >= 13.6 ? 'dark' : 'light';
    if (nextPhase !== activePhaseRef.current) {
      activePhaseRef.current = nextPhase;
      setActivePhase(nextPhase);
      onPhaseChange?.(nextPhase);
    }
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

  const seekPhase = (phase: 'light' | 'dark') => {
    const videoEl = inlineVideoRef.current;
    activePhaseRef.current = phase;
    setActivePhase(phase);
    onPhaseChange?.(phase);
    if (!videoEl) return;
    videoEl.currentTime = phase === 'light' ? 0.5 : 14.0;
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
    el.currentTime = 0;
    void el.play();
    setModalPlaying(true);
  };

  return (
    <div ref={containerRef} className={`w-full ${maxWidthClass} flex flex-col items-center gap-4`}>
      {/* Silky GPU-Composited Ambient Halo Stage Around the Smartphone */}
      <div className="relative w-full flex items-center justify-center py-2">
        {/* Soft Breathing Ambient Glow Around Phone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-9 -inset-y-6 rounded-full phone-aura-breathe"
        />

        {/* Gentle Counter-Drifting Luminous Mist */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-full phone-aura-drift"
        />

        {/* Soft Breathing Contour Halo Ring Surrounding Smartphone Silhouette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2.5 rounded-[18.4%/9.1%] phone-halo-ring"
        />

        {/* Pure GPU-Composited Floating Smartphone Unit */}
        <div className="relative w-full animate-phone-float">
          {/* Delicate Orbital Light Sheen Gliding Smoothly Around Phone Rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[2px] rounded-[16.85%/8.32%] overflow-hidden opacity-85 dark:opacity-95"
          >
            <div className="phone-rim-orbit" />
          </div>

          {/* Pure Floating Smartphone Chassis — Zero White Background */}
          <div className="group relative w-full aspect-[770/1562] rounded-[16.36%/8.07%] overflow-hidden bg-slate-950 shadow-[0_22px_48px_-12px_rgba(2,8,23,0.52)] ring-1 ring-slate-700/55 dark:ring-slate-500/45 transform-gpu [backface-visibility:hidden]">
            <video
              ref={inlineVideoRef}
              src={MEDIA_REGISTRY.liveUiPhoneVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
              className="absolute -left-[20.13%] -top-[13.12%] w-[140.26%] h-[122.92%] max-w-none object-fill cursor-pointer select-none transform-gpu [backface-visibility:hidden]"
            />

            {/* Subtle Hover / Tap Expand Icon Inside Bottom-Right of Phone Screen */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label={copy.expandLabel}
              title={copy.expandLabel}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-950/75 hover:bg-blue-600 text-white backdrop-blur-xs opacity-85 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Steady External Control Strip Below Phone (Never Bounces or Covers App UI) */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? copy.pauseLabel : copy.playLabel}
          title={isPlaying ? copy.pauseLabel : copy.playLabel}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0D1527]/90 hover:bg-slate-100 dark:hover:bg-[#162443] text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>

        {showPhasePills && (
          <div className="inline-flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0D1527]/90">
            <button
              type="button"
              onClick={() => seekPhase('light')}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                activePhase === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3 shrink-0" />
              <span>{copy.jumpLightLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => seekPhase('dark')}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                activePhase === 'dark'
                  ? 'bg-[#18294D] text-sky-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-3 h-3 shrink-0" />
              <span>{copy.jumpDarkLabel}</span>
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Frameless Smartphone Modal — Also 100% Without White Background */}
      <AnimatePresence>
        {modalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${copy.modeLiveUiTab} · ${SITE_CONFIG.appName}`}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-slate-950/88 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              className="relative z-10 flex flex-col items-center gap-4 w-full max-w-[340px]"
            >
              {/* Floating Close & Audio Controls Above Frameless Phone */}
              <div className="w-full flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    aria-label={modalPlaying ? copy.pauseLabel : copy.playLabel}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white transition-colors cursor-pointer"
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
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label={copy.closeLabel}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Pure Floating Smartphone Body in Modal (Zero White Background + Smooth Rim Aura) */}
              <div className="relative w-full max-h-[76vh] aspect-[770/1562] flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-full phone-aura-breathe"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[2px] rounded-[16.85%/8.32%] overflow-hidden opacity-90"
                >
                  <div className="phone-rim-orbit" />
                </div>
                <div className="relative w-full h-full rounded-[16.36%/8.07%] overflow-hidden bg-slate-950 shadow-[0_32px_72px_rgba(0,0,0,0.75)] ring-1 ring-slate-600/60 transform-gpu [backface-visibility:hidden]">
                  <video
                    ref={modalVideoRef}
                    src={MEDIA_REGISTRY.liveUiPhoneVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onPlay={() => setModalPlaying(true)}
                    onPause={() => setModalPlaying(false)}
                    onClick={toggleModalPlay}
                    className="absolute -left-[20.13%] -top-[13.12%] w-[140.26%] h-[122.92%] max-w-none object-fill cursor-pointer select-none transform-gpu [backface-visibility:hidden]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
