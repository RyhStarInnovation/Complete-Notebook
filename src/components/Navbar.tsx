import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { EASE_OUT_EXPO } from './motionPrimitives';

export type ActivePageView = 'home' | 'privacy-policy';

interface NavbarProps {
  activeView: ActivePageView;
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacyPolicy: () => void;
  onOpenDrawer: () => void;
}

export function Navbar({
  activeView,
  onNavigateSection,
  onOpenPrivacyPolicy,
  onOpenDrawer,
}: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!langMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [langMenuOpen]);

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/90 dark:bg-[#060B16]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Official App Logo + Single-line Brand Wordmark */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigateSection('top')}
          className="group inline-flex items-center gap-2 sm:gap-2.5 text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 hover:text-blue-700 dark:hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
        >
          <motion.img
            src={MEDIA_REGISTRY.brandEmblem}
            alt="Complete Notebook – Official App by RyhStar Innovation"
            referrerPolicy="no-referrer"
            whileHover={{ rotate: -6, scale: 1.08 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
            className="w-8 h-8 object-contain shrink-0"
          />
          <span>{SITE_CONFIG.appName}</span>
        </motion.button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          <button
            type="button"
            onClick={() => onNavigateSection('features')}
            className="hover:text-slate-950 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.features}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('utilities')}
            className="hover:text-slate-950 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.utilities}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('privacy')}
            className="hover:text-slate-950 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.privacy}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('updates')}
            className="hover:text-slate-950 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.updates}
          </button>
          <button
            type="button"
            onClick={onOpenPrivacyPolicy}
            className={`underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'privacy-policy'
                ? 'text-blue-700 dark:text-sky-400 underline'
                : 'hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {t.nav.privacyPolicy}
          </button>
        </nav>

        {/* Zone 3: Language Switcher Button + 3-Line Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Selector Dropdown */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-label={t.drawer.languageHeading}
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
              className="inline-flex items-center gap-1.5 sm:gap-2 min-h-[40px] px-2.5 sm:px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-100/80 dark:bg-[#0D1527] text-slate-900 dark:text-slate-100 hover:bg-slate-200/80 dark:hover:bg-[#15223D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              <Globe className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
              <span className="text-xs font-semibold tracking-wide sm:hidden uppercase">
                {currentLang.code}
              </span>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                {currentLang.nativeName}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-150 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  role="listbox"
                  aria-label={t.drawer.languageHeading}
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  className="absolute end-0 mt-2 w-52 rounded-xl border border-slate-200 dark:border-slate-700/90 bg-white dark:bg-[#0D1527] shadow-xl py-1.5 z-50 origin-top-right"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const active = lang.code === language;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-start flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-blue-50 dark:bg-[#162544] text-blue-700 dark:text-sky-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#13203B]'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[11px] uppercase opacity-70 w-5 shrink-0">
                            {lang.code}
                          </span>
                          <span className="truncate">{lang.nativeName}</span>
                        </span>
                        {active && (
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Professional 3-Line Menu Trigger */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenDrawer}
            aria-label={t.nav.menuButton}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 sm:gap-2.5 min-h-[40px] px-3 sm:px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-100/80 dark:bg-[#0D1527] text-slate-900 dark:text-slate-100 hover:bg-slate-200/80 dark:hover:bg-[#15223D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <span className="flex flex-col justify-center gap-[4px] w-4" aria-hidden="true">
              <span className="block h-[1.75px] w-4 bg-current rounded-full" />
              <span className="block h-[1.75px] w-4 bg-current rounded-full" />
              <span className="block h-[1.75px] w-3 bg-current rounded-full" />
            </span>
            <span className="text-xs font-semibold tracking-wide">{t.nav.menuButton}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
