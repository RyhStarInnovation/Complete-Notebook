export type SupportedLanguage = 'id' | 'en' | 'es' | 'fr' | 'ja' | 'ar' | 'ru' | 'ko';

export interface LanguageMeta {
  code: SupportedLanguage;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'id', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian', dir: 'ltr' },
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', dir: 'ltr' },
];

export interface TranslationContent {
  pageTitle: string;
  nav: {
    gallery: string;
    features: string;
    utilities: string;
    privacy: string;
    updates: string;
    vision: string;
    privacyPolicy: string;
    menuButton: string;
    closeMenu: string;
    backToHome: string;
  };
  drawer: {
    subtitle: string;
    navigationHeading: string;
    languageHeading: string;
    themeHeading: string;
    darkMode: string;
    lightMode: string;
    communityHeading: string;
    adminHeading: string;
    adminSignIn: string;
    adminSignOut: string;
    adminActiveLabel: string;
    downloadPlayStore: string;
    appStoreComingSoon: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    aboutTitle: string;
    aboutBody: string;
    primaryCta: string;
    appStoreSoonCta: string;
    secondaryCta: string;
    metrics: {
      offlineTitle: string;
      offlineDesc: string;
      zeroSubTitle: string;
      zeroSubDesc: string;
      ownershipTitle: string;
      ownershipDesc: string;
      globalTitle: string;
      globalDesc: string;
    };
  };
  bento: {
    sectionNumber: string;
    heading: string;
    subheading: string;
    smartNotesTitle: string;
    smartNotesDesc: string;
    smartNotesMeta: string;
    financeTitle: string;
    financeDesc: string;
    financeMeta: string;
    agendaAlarmTitle: string;
    agendaAlarmDesc: string;
    calculatorTitle: string;
    calculatorDesc: string;
    cnotExportTitle: string;
    cnotExportDesc: string;
    globalLocTitle: string;
    globalLocDesc: string;
  };
  utilities: {
    sectionNumber: string;
    heading: string;
    subheading: string;
    modulePrefix: string;
    preview: {
      calcTitle: string;
      calcOfflineReady: string;
      financeSavingsLabel: string;
      financeBudgetLabel: string;
      financeBufferLabel: string;
      todoHeader: string;
      todoItems: [string, string, string];
    };
    items: {
      id: string;
      title: string;
      summary: string;
      detail: string;
      highlights: string[];
    }[];
  };
  privacySection: {
    sectionNumber: string;
    heading: string;
    subheading: string;
    lockLabel: string;
    lockDesc: string;
    driveHeading: string;
    driveBackupTitle: string;
    driveBackupDesc: string;
    driveRestoreTitle: string;
    driveRestoreDesc: string;
    driveDeleteTitle: string;
    driveDeleteDesc: string;
    ownershipTitle: string;
    ownershipDesc: string;
    readFullPolicyBtn: string;
  };
  updatesSection: {
    sectionNumber: string;
    heading: string;
    subheading: string;
    filterAll: string;
    categories: {
      release: string;
      feature: string;
      security: string;
      announcement: string;
    };
    pinnedLabel: string;
    draftLabel: string;
    emptyLiveHint: string;
    defaultSeedTitle: string;
    defaultSeedVersion: string;
    defaultSeedSummary: string;
    adminToolbarTitle: string;
    editingIdPrefix: string;
    newUpdateBtn: string;
    editBtn: string;
    deleteBtn: string;
    confirmDeleteBtn: string;
    cancelBtn: string;
    pinBtn: string;
    unpinBtn: string;
    publishBtn: string;
    unpublishBtn: string;
    saveBtn: string;
    savingBtn: string;
    developerLoginPrompt: string;
    formTitleLabel: string;
    formTitlePlaceholder: string;
    formVersionLabel: string;
    formCategoryLabel: string;
    formSummaryLabel: string;
    formSummaryPlaceholder: string;
    formLinkLabel: string;
    formPinToggle: string;
    formPublishToggle: string;
    feedbackUpdated: string;
    feedbackCreated: string;
    feedbackDeleted: string;
    viewOnPlayStore: string;
  };
  visionSection: {
    sectionNumber: string;
    heading: string;
    visionTitle: string;
    visionBody: string;
    missionTitle: string;
    missions: {
      title: string;
      body: string;
    }[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    contactLabel: string;
  };
  privacyPolicyPage: {
    kicker: string;
    title: string;
    effectiveDate: string;
    intro: string;
    openOfficialPolicyBtn: string;
    officialPolicyUrlLabel: string;
    copyLinkBtn: string;
    copiedLinkLabel: string;
    sections: {
      heading: string;
      body: string;
    }[];
  };
  footer: {
    tagline: string;
    officialLinks: string;
    socialChannels: string;
    playStoreOfficialPage: string;
    appStoreComingSoon: string;
    developerContact: string;
    copyright: string;
  };
}
