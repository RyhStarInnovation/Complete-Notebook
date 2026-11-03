import { SupportedLanguage } from './types';

export interface UpdatesAutoTranslateCopy {
  autoTranslateNotice: string;
  translatingAndSavingBtn: string;
  autoSyncedLangsLabel: string;
}

export const UPDATES_AUTO_TRANSLATE_COPY: Record<SupportedLanguage, UpdatesAutoTranslateCopy> = {
  id: {
    autoTranslateNotice:
      'Tulis satu kali saja — judul dan ringkasan otomatis diterjemahkan ke 8 bahasa mengikuti pilihan bahasa situs.',
    translatingAndSavingBtn: 'Menerjemahkan & menyimpan...',
    autoSyncedLangsLabel: 'Otomatis 8 bahasa',
  },
  en: {
    autoTranslateNotice:
      'Write once — title and summary are automatically translated into all 8 languages to match the site language selector.',
    translatingAndSavingBtn: 'Translating & saving...',
    autoSyncedLangsLabel: 'Auto 8 languages',
  },
  es: {
    autoTranslateNotice:
      'Escriba una sola vez: el título y el resumen se traducen automáticamente a los 8 idiomas según el selector del sitio.',
    translatingAndSavingBtn: 'Traduciendo y guardando...',
    autoSyncedLangsLabel: '8 idiomas automáticos',
  },
  fr: {
    autoTranslateNotice:
      'Rédigez une seule fois — le titre et le résumé sont automatiquement traduits dans les 8 langues selon la langue choisie sur le site.',
    translatingAndSavingBtn: 'Traduction et enregistrement...',
    autoSyncedLangsLabel: '8 langues auto',
  },
  ja: {
    autoTranslateNotice:
      '1回入力するだけで、サイトの言語選択に合わせてタイトルと概要が全8言語へ自動翻訳されます。',
    translatingAndSavingBtn: '翻訳して保存中...',
    autoSyncedLangsLabel: '8言語自動対応',
  },
  ar: {
    autoTranslateNotice:
      'اكتب مرة واحدة فقط — تتم ترجمة العنوان والملخص تلقائياً إلى اللغات الثماني حسب اختيار لغة الموقع.',
    translatingAndSavingBtn: 'جارٍ الترجمة والحفظ...',
    autoSyncedLangsLabel: '8 لغات تلقائياً',
  },
  ru: {
    autoTranslateNotice:
      'Напишите один раз — заголовок и описание автоматически переводятся на все 8 языков в соответствии с выбором языка сайта.',
    translatingAndSavingBtn: 'Перевод и сохранение...',
    autoSyncedLangsLabel: 'Автоперевод (8 яз.)',
  },
  ko: {
    autoTranslateNotice:
      '한 번만 작성하세요 — 사이트 언어 선택에 맞춰 제목과 요약이 8개 언어로 자동 번역됩니다.',
    translatingAndSavingBtn: '번역 및 저장 중...',
    autoSyncedLangsLabel: '8개 언어 자동 번역',
  },
};
