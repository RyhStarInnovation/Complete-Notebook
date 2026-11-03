import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LanguageMeta,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  TRANSLATIONS,
  TranslationContent,
} from './translations';

import { LOCALIZED_SEO_META } from './seoMetadata';
import { FAQ_TRANSLATIONS } from './faqTranslations';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  isSupportedLanguage,
  normalizeUrlLangParam,
  resolveVisitorLanguage,
  sanitizeCountryCode,
} from './visitorLocale';

interface LanguageContextValue {
  language: SupportedLanguage;
  languageMeta: LanguageMeta;
  t: TranslationContent;
  setLanguage: (lang: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const MANUAL_STORAGE_KEY = 'complete_notebook_lang_manual';
const GEO_SESSION_CACHE_KEY = 'complete_notebook_geo_country';

function getUrlLanguageOverride(): SupportedLanguage | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('lang');
  return normalizeUrlLangParam(raw);
}

function getManualLanguagePreference(): SupportedLanguage | null {
  try {
    const saved = localStorage.getItem(MANUAL_STORAGE_KEY);
    return isSupportedLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

function getCachedSessionCountry(): string | null {
  try {
    return sanitizeCountryCode(sessionStorage.getItem(GEO_SESSION_CACHE_KEY));
  } catch {
    return null;
  }
}

function getClientBrowserSignals(): { browserLanguages: string[]; timeZone: string | null } {
  const browserLanguages =
    typeof navigator !== 'undefined'
      ? Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? [...navigator.languages]
        : navigator.language
          ? [navigator.language]
          : []
      : [];

  let timeZone: string | null = null;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    timeZone = null;
  }

  return { browserLanguages, timeZone };
}

function detectInitialLanguage(): SupportedLanguage {
  const urlOverride = getUrlLanguageOverride();
  if (urlOverride) {
    return urlOverride;
  }

  const manualPref = getManualLanguagePreference();
  if (manualPref) {
    return manualPref;
  }

  const { browserLanguages, timeZone } = getClientBrowserSignals();
  const cachedCountry = getCachedSessionCountry();

  return resolveVisitorLanguage({
    browserLanguages,
    timeZone,
    serverCountry: cachedCountry,
  });
}

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLocalizedJsonLd(code: SupportedLanguage, canonicalUrl: string) {
  const seo = LOCALIZED_SEO_META[code];
  const faq = FAQ_TRANSLATIONS[code];

  // 1. Update single FAQPage script in-place so Google Rich Results never sees duplicate FAQPage
  let faqScriptEl = document.head.querySelector<HTMLScriptElement>('script#faq-structured-data');
  if (!faqScriptEl) {
    faqScriptEl = document.createElement('script');
    faqScriptEl.id = 'faq-structured-data';
    faqScriptEl.type = 'application/ld+json';
    document.head.appendChild(faqScriptEl);
  }
  faqScriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    inLanguage: code,
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });

  // 2. Attach localized WebPage metadata when viewing a non-default language variant
  const pageScriptId = 'localized-webpage-data';
  let pageScriptEl = document.head.querySelector<HTMLScriptElement>(`script#${pageScriptId}`);
  if (code === 'id' && canonicalUrl === `${SITE_CONFIG.siteUrl}/`) {
    pageScriptEl?.remove();
    return;
  }

  if (!pageScriptEl) {
    pageScriptEl = document.createElement('script');
    pageScriptEl.id = pageScriptId;
    pageScriptEl.type = 'application/ld+json';
    document.head.appendChild(pageScriptEl);
  }

  pageScriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage-${code}`,
    url: canonicalUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: code,
    keywords: seo.keywords,
    isPartOf: {
      '@id': `${SITE_CONFIG.siteUrl}/#website`,
    },
    about: {
      '@id': `${SITE_CONFIG.siteUrl}/#app`,
    },
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);

  const languageMeta =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) ?? SUPPORTED_LANGUAGES[0];

  // Confirm visitor's physical country via server Geo-IP headers when no URL or manual override is set
  useEffect(() => {
    if (getUrlLanguageOverride() || getManualLanguagePreference()) {
      return;
    }

    let cancelled = false;

    const syncVisitorCountry = async () => {
      const existingCountry = getCachedSessionCountry();
      if (existingCountry) {
        return;
      }

      try {
        const res = await fetch('/api/visitor-locale', {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        const contentType = res.headers.get('content-type') ?? '';
        if (!res.ok || !contentType.includes('application/json') || cancelled) return;

        const data = (await res.json()) as {
          country?: string | null;
          acceptLanguages?: string[];
        };
        if (cancelled) return;

        // Re-check that the visitor didn't click a manual language while request was in flight
        if (getUrlLanguageOverride() || getManualLanguagePreference()) {
          return;
        }

        const serverCountry = sanitizeCountryCode(data.country ?? null);
        if (serverCountry) {
          try {
            sessionStorage.setItem(GEO_SESSION_CACHE_KEY, serverCountry);
          } catch {
            // Ignore sessionStorage error
          }
        }

        const { browserLanguages, timeZone } = getClientBrowserSignals();
        const combinedBrowserLangs =
          browserLanguages.length > 0
            ? browserLanguages
            : Array.isArray(data.acceptLanguages)
              ? data.acceptLanguages
              : [];

        const resolved = resolveVisitorLanguage({
          browserLanguages: combinedBrowserLangs,
          timeZone,
          serverCountry,
        });

        setLanguageState((prev) => (prev === resolved ? prev : resolved));
      } catch {
        // Client-side timezone + navigator.languages fallback is already active
      }
    };

    void syncVisitorCountry();

    const handleBrowserLanguageChange = () => {
      if (getUrlLanguageOverride() || getManualLanguagePreference()) {
        return;
      }
      const { browserLanguages, timeZone } = getClientBrowserSignals();
      const resolved = resolveVisitorLanguage({
        browserLanguages,
        timeZone,
        serverCountry: getCachedSessionCountry(),
      });
      setLanguageState(resolved);
    };

    const handlePopState = () => {
      const urlOverride = getUrlLanguageOverride();
      if (urlOverride) {
        setLanguageState((prev) => (prev === urlOverride ? prev : urlOverride));
      }
    };

    window.addEventListener('languagechange', handleBrowserLanguageChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      cancelled = true;
      window.removeEventListener('languagechange', handleBrowserLanguageChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const code = languageMeta.code;
    const seo = LOCALIZED_SEO_META[code];

    document.documentElement.lang = code;
    document.documentElement.dir = languageMeta.dir;
    document.title = seo.title;

    upsertMetaTag('name', 'description', seo.description);
    upsertMetaTag('name', 'keywords', seo.keywords);
    upsertMetaTag('property', 'og:title', seo.title);
    upsertMetaTag('property', 'og:description', seo.description);
    upsertMetaTag('property', 'og:locale', seo.ogLocale);
    upsertMetaTag('name', 'twitter:title', seo.title);
    upsertMetaTag('name', 'twitter:description', seo.description);

    const hasLangParam = Boolean(getUrlLanguageOverride());
    const canonicalUrl = hasLangParam
      ? `${SITE_CONFIG.siteUrl}/?lang=${code}`
      : `${SITE_CONFIG.siteUrl}/`;

    const canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    }
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertLocalizedJsonLd(code, canonicalUrl);
  }, [languageMeta]);

  const setLanguage = (lang: SupportedLanguage) => {
    try {
      localStorage.setItem(MANUAL_STORAGE_KEY, lang);
    } catch {
      // Ignore storage error
    }

    // If the visitor opened a ?lang=XX hreflang URL and manually switches language,
    // keep the ?lang= parameter synchronized so refresh/share reflects their choice.
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('lang')) {
        params.set('lang', lang);
        const searchStr = params.toString();
        const nextUrl = `${window.location.pathname}${searchStr ? `?${searchStr}` : ''}${window.location.hash}`;
        window.history.replaceState(null, '', nextUrl);
      }
    }

    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        languageMeta,
        t: TRANSLATIONS[language],
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
