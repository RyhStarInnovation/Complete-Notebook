import {
  LanguageMeta,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  TranslationContent,
} from './types';
import { idContent } from './locales/id';
import { enContent } from './locales/en';
import { esContent } from './locales/es';
import { frContent } from './locales/fr';
import { jaContent } from './locales/ja';
import { arContent } from './locales/ar';
import { ruContent } from './locales/ru';
import { koContent } from './locales/ko';

export type { SupportedLanguage, LanguageMeta, TranslationContent };
export { SUPPORTED_LANGUAGES };

export const TRANSLATIONS: Record<SupportedLanguage, TranslationContent> = {
  id: idContent,
  en: enContent,
  es: esContent,
  fr: frContent,
  ja: jaContent,
  ar: arContent,
  ru: ruContent,
  ko: koContent,
};
