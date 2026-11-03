import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Globe,
  LogIn,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { VIDEO_SHOWCASE_TRANSLATIONS } from '../i18n/videoShowcaseTranslations';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { MediaFrame } from './MediaFrame';
import { ActivePageView } from './Navbar';
import { AppleLogoIcon, GooglePlayIcon } from './StoreIcons';
import { EASE_OUT_EXPO } from './motionPrimitives';

interface NavigationDrawerProps {
  isOpen: boolean;
  activeView: ActivePageView;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacyPolicy: () => void;
}

export function NavigationDrawer({
  isOpen,
  activeView,
  onClose,
  onNavigateSection,
  onOpenPrivacyPolicy,
}: NavigationDrawerProps) {
  const { language, languageMeta, setLanguage, t } = useLanguage();
  const videoCopy = VIDEO_SHOWCASE_TRANSLATIONS[language];
  const { theme, setTheme } = useTheme();
  const {
    user,
    isDeveloperAdmin,
    showAdminEntry,
    authError,
    clearAuthError,
    signInAsDeveloper,
    signOutUser,
  } = useAuth();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    onClose();
  };

  const handlePolicyClick = () => {
    onOpenPrivacyPolicy();
    onClose();
  };

  const handleDeveloperLogin = async () => {
    const ok = await signInAsDeveloper();
    if (ok) {
      onNavigateSection('updates');
      onClose();
    }
  };

  const isRtl = languageMeta.dir === 'rtl';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuButton}
        >
          {/* Animated Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Animated Slide-over Panel */}
          <motion.aside
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className={`relative z-10 w-full max-w-md h-full overflow-y-auto bg-white dark:bg-[#081021] text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between ${
              isRtl ? 'border-r mr-auto ml-0' : 'border-l ml-auto'
            }`}
          >
        <div className="p-6 space-y-7">
          {/* Drawer Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-3.5">
              <MediaFrame
                src={MEDIA_REGISTRY.brandEmblem}
                alt="Complete Notebook Official Logo"
                className="w-12 h-12 rounded-xl bg-transparent shrink-0"
                imgClassName="w-full h-full object-contain"
              />
              <div>
                <p className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  {SITE_CONFIG.appName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.drawer.subtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Official Platform Availability: Google Play (Live) + App Store iOS (Coming Soon) */}
          <div className="space-y-2.5">
            <a
              href={SITE_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors duration-150"
            >
              <span className="inline-flex items-center gap-2.5 truncate">
                <GooglePlayIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.drawer.downloadPlayStore}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('updates')}
              className="w-full inline-flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1527] hover:bg-slate-100 dark:hover:bg-[#131F38] text-slate-700 dark:text-slate-200 font-medium text-xs transition-colors duration-150 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2.5 truncate">
                <AppleLogoIcon className="w-4 h-4 shrink-0 text-slate-900 dark:text-white" />
                <span className="truncate">{t.drawer.appStoreComingSoon}</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            </button>
          </div>

          {/* Page & Section Navigation */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.drawer.navigationHeading}
            </p>
            <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70 border-y border-slate-200/70 dark:border-slate-800/70">
              <button
                type="button"
                onClick={() => handleNavClick('video-showcase')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{videoCopy.navLabel}</span>
                <span className="text-xs text-slate-400 font-mono">3D</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('gallery')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{t.nav.gallery}</span>
                <span className="text-xs text-slate-400 font-mono">00</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('features')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{t.nav.features}</span>
                <span className="text-xs text-slate-400 font-mono">01</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('utilities')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{t.nav.utilities}</span>
                <span className="text-xs text-slate-400 font-mono">02</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('privacy')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{t.nav.privacy}</span>
                <span className="text-xs text-slate-400 font-mono">03</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('updates')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{t.nav.updates}</span>
                <span className="text-xs text-slate-400 font-mono">04</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('vision')}
                className="w-full py-2.5 flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <span>{t.nav.vision}</span>
                <span className="text-xs text-slate-400 font-mono">05</span>
              </button>
              <button
                type="button"
                onClick={handlePolicyClick}
                className={`w-full py-2.5 flex items-center justify-between text-sm font-semibold transition-colors cursor-pointer ${
                  activeView === 'privacy-policy'
                    ? 'text-blue-600 dark:text-sky-400'
                    : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span>{t.nav.privacyPolicy}</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">06</span>
              </button>
            </div>
          </div>

          {/* 8 Global Languages Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.drawer.languageHeading}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-sky-500/15 border-blue-600/40 dark:border-sky-400/50 text-blue-700 dark:text-sky-300'
                        : 'bg-slate-50 dark:bg-[#0D162C] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate">{lang.nativeName}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Mode Segmented Control */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.drawer.themeHeading}
            </p>
            <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0D162C] border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#162447] text-sky-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.drawer.darkMode}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.drawer.lightMode}</span>
              </button>
            </div>
          </div>

          {/* Official Community & Social Media */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.drawer.communityHeading}
            </p>
            <div className="space-y-1.5 text-xs">
              <a
                href={SITE_CONFIG.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#0D162C] text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span className="inline-flex items-center gap-2 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span className="truncate">{t.privacyPolicyPage.openOfficialPolicyBtn}</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
              <a
                href={SITE_CONFIG.socials.tiktokGlobal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#0D162C] text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span>TikTok Global · @ryhstar_innovation</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
              <a
                href={SITE_CONFIG.socials.tiktokIdn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#0D162C] text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span>TikTok Indonesia · @ryhstar.innovation_idn</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
              <a
                href={SITE_CONFIG.socials.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#0D162C] text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span>Reddit Official · u/CompleteNotebook</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.developerEmail}`}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#0D162C] text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>{SITE_CONFIG.developerEmail}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Developer Update Studio Footer in Drawer (Hidden from regular visitors) */}
        {showAdminEntry && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#060B16]/70 space-y-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.drawer.adminHeading}
            </p>

            {authError && (
              <div className="p-3 rounded-lg border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-900 dark:text-amber-200 flex items-start justify-between gap-2">
                <span>{authError}</span>
                <button
                  type="button"
                  onClick={clearAuthError}
                  className="text-amber-700 dark:text-amber-300 underline shrink-0 cursor-pointer"
                >
                  OK
                </button>
              </div>
            )}

            {isDeveloperAdmin ? (
              <div className="space-y-2">
                <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center justify-between">
                  <span>{t.drawer.adminActiveLabel}</span>
                  <span className="font-mono text-[11px] truncate max-w-[180px]">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleNavClick('updates')}
                    className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {t.updatesSection.newUpdateBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => void signOutUser()}
                    className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.drawer.adminSignOut}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void handleDeveloperLogin()}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D162C] hover:bg-slate-100 dark:hover:bg-[#15223D] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>{t.drawer.adminSignIn}</span>
                </button>
                {user && !isDeveloperAdmin && (
                  <button
                    type="button"
                    onClick={() => void signOutUser()}
                    className="py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap cursor-pointer"
                  >
                    {t.drawer.adminSignOut}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
