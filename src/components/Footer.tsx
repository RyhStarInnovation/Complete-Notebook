import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { VIDEO_SHOWCASE_TRANSLATIONS } from '../i18n/videoShowcaseTranslations';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacyPolicy: () => void;
}

export function Footer({ onNavigateSection, onOpenPrivacyPolicy }: FooterProps) {
  const { language, t } = useLanguage();
  const videoCopy = VIDEO_SHOWCASE_TRANSLATIONS[language];

  return (
    <footer className="bg-white dark:bg-[#050913] border-t border-slate-200 dark:border-slate-800/80 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={MEDIA_REGISTRY.brandEmblem}
                alt="Complete Notebook – Official App by RyhStar Innovation"
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain shrink-0"
              />
              <p className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                {SITE_CONFIG.appName}
              </p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-500 pt-1">
              {SITE_CONFIG.packageId}
            </p>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
              {t.footer.officialLinks}
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('video-showcase')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {videoCopy.navLabel}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('gallery')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('features')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.features}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('utilities')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.utilities}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('privacy')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.privacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('updates')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.updates}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  FAQ · Complete Notebook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.privacyPolicy}
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Developer Contact */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
              {t.footer.socialChannels}
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href={SITE_CONFIG.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  {t.footer.playStoreOfficialPage}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('updates')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-start"
                >
                  {t.footer.appStoreComingSoon}
                </button>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  {t.privacyPolicyPage.openOfficialPolicyBtn}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.tiktokGlobal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  TikTok Global (@ryhstar_innovation)
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.tiktokIdn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  TikTok Indonesia (@ryhstar.innovation_idn)
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Reddit Official (u/CompleteNotebook)
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={`mailto:${SITE_CONFIG.developerEmail}`}
                  className="font-mono text-xs text-blue-600 dark:text-sky-400 hover:underline"
                >
                  {SITE_CONFIG.developerEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>{t.footer.copyright}</p>
          <p>{SITE_CONFIG.companyName}</p>
        </div>
      </div>
    </footer>
  );
}
