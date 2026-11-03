/**
 * Official Configuration & Verified Links for Complete Notebook
 * Developed by RyhStar Innovation
 */

export const SITE_CONFIG = {
  appName: 'Complete Notebook',
  companyName: 'RyhStar Innovation',
  siteUrl: 'https://ryhstarinnovation.web.id',
  packageId: 'com.ryhstarinnovation.complete_notebook',
  developerEmail: 'ryhstarr@gmail.com',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.ryhstarinnovation.complete_notebook',
  privacyPolicyUrl: 'https://sites.google.com/view/complete-notebook/halaman-muka',
  socials: {
    tiktokGlobal:
      'https://www.tiktok.com/@ryhstar_innovation?is_from_webapp=1&sender_device=pc',
    tiktokIdn:
      'https://www.tiktok.com/@ryhstar.innovation_idn?is_from_webapp=1&sender_device=pc',
    reddit:
      'https://www.reddit.com/user/CompleteNotebook/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
  },
  // Validation limits synchronized verbatim with firebase-blueprint.json & firestore.rules
  validation: {
    titleMin: 3,
    titleMax: 140,
    versionMin: 1,
    versionMax: 32,
    versionPattern: /^[a-zA-Z0-9.+_()\- ]+$/,
    summaryMin: 10,
    summaryMax: 3000,
    playStoreUrlMax: 300,
    authorNameMax: 80,
    allowedCategories: ['release', 'feature', 'security', 'announcement'] as const,
    allowedLanguages: ['id', 'en', 'es', 'fr', 'ja', 'ar', 'ru', 'ko'] as const,
  },
} as const;

export type UpdateCategory = (typeof SITE_CONFIG.validation.allowedCategories)[number];

