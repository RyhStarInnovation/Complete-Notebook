import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { GALLERY_TRANSLATIONS, ScreenshotItem } from '../i18n/galleryTranslations';
import { MediaFrame } from './MediaFrame';
import { EASE_OUT_EXPO, FloatingShowcase, RevealInView } from './motionPrimitives';

export function OfficialScreenshotsGallery() {
  const { language } = useLanguage();
  const copy = GALLERY_TRANSLATIONS[language];
  const [activeIndex, setActiveIndex] = useState(2);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeItem: ScreenshotItem = copy.items[activeIndex] ?? copy.items[0];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % copy.items.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + copy.items.length) % copy.items.length
        );
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, copy.items.length]);

  const lightboxItem = lightboxIndex !== null ? copy.items[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#080F1E]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <RevealInView className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
            {copy.kicker}
          </p>
          <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
            {copy.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {copy.subheading}
          </p>
        </RevealInView>

        {/* Featured Interactive Spotlight: Full Portrait Screenshot + Detailed Explanation */}
        <RevealInView
          delay={0.06}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-6 sm:p-8 lg:p-10"
        >
          {/* Portrait Play Store Graphic Stage (Transparent Background) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.button
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              onClick={() => setLightboxIndex(activeIndex)}
              className="group relative w-full max-w-[350px] rounded-2xl overflow-hidden bg-slate-100/60 dark:bg-[#081020]/70 border border-slate-200/80 dark:border-slate-800/90 p-4 cursor-pointer"
              aria-label={`${copy.zoomHint}: ${activeItem.title}`}
            >
              <FloatingShowcase amplitude={6} duration={5.2}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                  >
                    <MediaFrame
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="w-full aspect-[3/4] bg-transparent"
                      imgClassName="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(2,8,23,0.35)] transition-transform duration-300 group-hover:scale-[1.035]"
                    />
                  </motion.div>
                </AnimatePresence>
              </FloatingShowcase>
              <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/85 text-white text-xs font-medium opacity-95 group-hover:bg-blue-600 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{copy.zoomHint}</span>
              </span>
            </motion.button>
          </div>

          {/* Detailed Feature Explanation & Selector */}
          <div className="lg:col-span-7 space-y-7">
            {/* Step Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-[#070D19] border border-slate-200 dark:border-slate-800">
              {copy.items.map((screen, idx) => {
                const selected = idx === activeIndex;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      selected
                        ? 'text-blue-700 dark:text-sky-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="galleryActiveTabPill"
                        transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                        className="absolute inset-0 rounded-lg bg-white dark:bg-[#182849] shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{screen.badge}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <p className="font-mono text-xs text-blue-600 dark:text-sky-400">
                    {activeItem.badge}
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeItem.subtitle}
                  </p>
                </div>

                <ul className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {activeItem.bullets.map((point, bIdx) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.24,
                        delay: bIdx * 0.05,
                        ease: EASE_OUT_EXPO,
                      }}
                      className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
                    >
                      <Check className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next Quick Controls */}
            <div className="flex items-center gap-3 pt-2">
              <motion.button
                type="button"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + copy.items.length) % copy.items.length
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14223E] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{copy.prevScreen}</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % copy.items.length)
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14223E] transition-colors cursor-pointer"
              >
                <span>{copy.nextScreen}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </motion.button>
            </div>
          </div>
        </RevealInView>

        {/* Complete 6-Card Visual Strip for Immediate Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {copy.items.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -5 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: EASE_OUT_EXPO,
                }}
                className={`group rounded-xl border p-2.5 transition-colors flex flex-col justify-between gap-2.5 bg-white dark:bg-[#0D1527] ${
                  isCurrent
                    ? 'border-blue-600 dark:border-sky-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setLightboxIndex(idx);
                  }}
                  className="w-full rounded-lg overflow-hidden bg-slate-100/60 dark:bg-[#081020]/70 p-2 cursor-pointer"
                >
                  <MediaFrame
                    src={item.src}
                    alt={item.title}
                    className="w-full aspect-[3/4] bg-transparent"
                    imgClassName="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="text-start px-1 pb-1 cursor-pointer"
                >
                  <p className="font-mono text-[11px] text-blue-600 dark:text-sky-400 truncate">
                    {item.badge}
                  </p>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 mt-0.5">
                    {item.title}
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs"
              onClick={() => setLightboxIndex(null)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              className="relative z-10 w-full max-w-4xl max-h-[92vh] rounded-2xl border border-slate-700 bg-[#0B1325] text-white p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6 overflow-y-auto shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label={copy.closePreview}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-lg bg-slate-800/90 hover:bg-slate-700 flex items-center justify-center text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 flex justify-center bg-[#070D1B] border border-slate-800 rounded-xl p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxItem.id}
                    src={lightboxItem.src}
                    alt={lightboxItem.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="max-h-[75vh] w-auto object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              <div className="w-full md:w-1/2 space-y-4 pr-2">
                <p className="font-mono text-xs text-sky-400">{lightboxItem.badge}</p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lightboxItem.subtitle}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-800">
                  {lightboxItem.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + copy.items.length) % copy.items.length
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                    <span>{copy.prevScreen}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % copy.items.length)
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    <span>{copy.nextScreen}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
