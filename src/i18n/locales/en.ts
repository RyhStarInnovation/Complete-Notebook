import { TranslationContent } from '../types';

export const enContent: TranslationContent = {
  pageTitle: 'Complete Notebook — All-in-One Digital Workspace by RyhStar Innovation',
  nav: {
    gallery: 'App Screens',
    features: 'Features',
    utilities: 'Core Utilities',
    privacy: 'Privacy & Drive',
    updates: 'Release Updates',
    vision: 'Vision & Mission',
    privacyPolicy: 'Privacy Policy',
    menuButton: 'Menu',
    closeMenu: 'Close',
    backToHome: 'Back to Overview',
  },
  drawer: {
    subtitle: 'Official Digital Workspace by RyhStar Innovation',
    navigationHeading: 'Site Navigation',
    languageHeading: 'Global Localization (8 Languages)',
    themeHeading: 'Appearance Mode',
    darkMode: 'Midnight-Blue Dark',
    lightMode: 'Clean Light',
    communityHeading: 'Official Community & Social Media',
    adminHeading: 'Developer Portal (Live Updates)',
    adminSignIn: 'Developer Google Sign-In',
    adminSignOut: 'Sign Out Admin',
    adminActiveLabel: 'Developer Admin Active',
    downloadPlayStore: 'Get it on Google Play',
    appStoreComingSoon: 'App Store (iOS) · Coming Soon',
  },
  hero: {
    kicker: 'RyhStar Innovation · Google Play Store · App Store (Coming Soon)',
    headline: 'All-in-One Digital Workspace for Productivity, Finance, and Peace of Mind.',
    subheadline:
      'Tired of switching between separate apps for notes, schedules, and expense tracking? Move to a refined digital workspace that works seamlessly both offline and online—free from monthly subscription fees.',
    aboutTitle: 'About Complete Notebook',
    aboutBody:
      'Complete Notebook is a cross-platform productivity suite (available now on Google Play Store for Android, with Apple App Store for iOS coming soon) built to bring practical organization to your daily routine. Wrapped in an aesthetic Midnight-Blue Dark Mode philosophy, it combines reliable local offline capability with effortless online cloud backup.',
    primaryCta: 'Download on Google Play',
    appStoreSoonCta: 'App Store · Coming Soon',
    secondaryCta: 'Explore Capabilities',
    metrics: {
      offlineTitle: 'Flexible Offline & Online',
      offlineDesc: 'Capture notes smoothly without signal, with easy Google Drive cloud sync when online',
      zeroSubTitle: 'No Subscription Fees',
      zeroSubDesc: 'Full productivity & finance access without monthly subscription bills',
      ownershipTitle: 'Private Data Control',
      ownershipDesc: 'Personal notes & financial logs stay safe on your device and personal Google Drive',
      globalTitle: 'Global Ready',
      globalDesc: 'Native localization across major world languages',
    },
  },
  bento: {
    sectionNumber: '01. Flagship Capabilities',
    heading: 'Engineered for Order, Focus, and Maximum Daily Efficiency.',
    subheading:
      'Every essential personal productivity and finance instrument unified inside a calm Midnight-Blue workspace.',
    smartNotesTitle: 'Smart Notes, Periodic Journals & Built-In OCR',
    smartNotesDesc:
      'Capture ideas, study material, or structured daily and monthly journals with a rich-text editor, embed photos, and extract text from physical pages instantly using the built-in OCR scanner both offline and online.',
    smartNotesMeta: 'Rich-Text Editor · Daily & Monthly Journals · Offline & Online OCR',
    financeTitle: 'Financial Tracker & Visual Savings Goals',
    financeDesc:
      'Attach photos of your dream goals, monitor savings progress automatically, log daily income and expenses, and analyze cash flow with interactive Pie Chart analytics.',
    financeMeta: 'Dream Goal Photos · Interactive Pie Chart · Independent Cash Flow',
    agendaAlarmTitle: 'Agenda Calendar & Precision MP3 Alarms',
    agendaAlarmDesc:
      'Never miss a milestone. Organize schedules, deadlines, and accurate daily reminder alarms complete with custom MP3 ringtone selection.',
    calculatorTitle: 'Built-In Instant Calculator',
    calculatorDesc:
      'Compute daily budgets, savings allocations, and travel expenses instantly without ever leaving your workspace.',
    cnotExportTitle: 'Local .cnot Ecosystem & Instant PDF/Excel Exports',
    cnotExportDesc:
      'Share structured notes seamlessly with the exclusive .cnot file format, or export task lists and financial records into professional PDF and Excel documents anytime.',
    globalLocTitle: 'Built for the Global Stage',
    globalLocDesc:
      'Ready worldwide with support for dozens of major languages including English, Indonesian, Spanish, French, Japanese, Arabic, Russian, Korean, and more.',
  },
  utilities: {
    sectionNumber: '02. Seven Core Utilities',
    heading: 'One Application, Seven Precision Workspace Modules.',
    subheading:
      'Select each module below to inspect how Complete Notebook streamlines your daily workflow.',
    modulePrefix: 'MODULE',
    preview: {
      calcTitle: 'Interactive Built-In Calculator Preview',
      calcOfflineReady: 'Offline & Online',
      financeSavingsLabel: 'Visual Savings Target',
      financeBudgetLabel: 'Essential Living Budget',
      financeBufferLabel: 'Reserve Buffer',
      todoHeader: 'Interactive Workspace Task Preview (.cnot · PDF · Excel Ready)',
      todoItems: [
        'Review monthly savings goal progress',
        'Scan study lecture pages via built-in Smart OCR',
        'Export Q4 project checklist to PDF & .cnot',
      ],
    },
    items: [
      {
        id: 'notebook',
        title: 'Smart Notebook & Built-In OCR',
        summary: 'Rich-text formatting, image embedding, and fast photo-to-text OCR offline or online.',
        detail:
          'Write rich-text notes, insert reference images, and extract printed text from camera photos or study books effortlessly with the built-in intelligent on-device OCR scanner whether offline or online.',
        highlights: ['Full Rich-Text Editor', 'Inline Image Support', 'Fast On-Device OCR Extraction'],
      },
      {
        id: 'planner',
        title: 'Daily, Weekly & Monthly Planner',
        summary: 'Organize daily routines, weekly targets, and long-term monthly roadmaps.',
        detail:
          'Structure your life with clarity. Categorize tasks and priorities across daily routines, weekly objectives, and long-horizon monthly planning views.',
        highlights: ['Focused Daily Routines', 'Weekly Goal Milestones', 'Long-Term Monthly Planning'],
      },
      {
        id: 'todo',
        title: 'Interactive To-Do Lists',
        summary: 'Track daily work items, shopping checklists, and project milestones.',
        detail:
          'Stay ahead of every deliverable. Build interactive task checklists to track everyday errands, shopping lists, or multi-step project progress.',
        highlights: ['Instant Interactive Checklists', 'Structured Task Tracking', 'PDF & Excel Document Export'],
      },
      {
        id: 'finance',
        title: 'Savings & Expense Tracker',
        summary: 'Visualize dream targets, log savings, and inspect interactive Pie Charts.',
        detail:
          'Take full command of personal finances. Attach dream goal photos, record savings deposits and daily expenses, and review visual Pie Chart cash-flow breakdowns.',
        highlights: ['Visual Savings Goal Cards', 'Income & Expense Ledger', 'Interactive Pie Chart Analytics'],
      },
      {
        id: 'calendar',
        title: 'Visual Agenda Calendar',
        summary: 'Clear date navigation across upcoming schedules and deadlines.',
        detail:
          'Gain an immediate visual overview of your month. Navigate dates effortlessly to inspect upcoming agendas, commitments, and project deadlines.',
        highlights: ['Clean Monthly Overview', 'Deadline Highlighting', 'Unified Schedule View'],
      },
      {
        id: 'calculator',
        title: 'Integrated Quick Calculator',
        summary: 'Fast budget math right inside your workspace when on the go.',
        detail:
          'Perform quick calculations without switching apps—ideal for totaling receipts, splitting budgets, and verifying expenses while traveling.',
        highlights: ['Zero App-Switching', 'Fast Budget Calculations', 'Lightweight & Instant'],
      },
      {
        id: 'alarm',
        title: 'Precision MP3 Alarms',
        summary: 'Reliable task reminders with customizable MP3 audio tones.',
        detail:
          'Configure fully customizable precision alarms complete with personal MP3 ringtone support so critical tasks and routines are always signaled on time.',
        highlights: ['Exact Time Triggers', 'Custom MP3 Ringtone Selection', 'Task & Routine Alerts'],
      },
    ],
  },
  privacySection: {
    sectionNumber: '03. Data Privacy & Google Drive Cloud Sync',
    heading: 'Multi-Layer Local Protection with Full User Data Control.',
    subheading:
      'Your personal notes and financial records stay safely stored on your device for instant offline access, paired with optional encrypted online backup straight to your personal Google Drive.',
    lockLabel: 'Multi-Layer Security Lock: Fingerprint (Biometric) · PIN · Pattern Lock',
    lockDesc:
      'Shield personal journals and financial records locally with hardware-backed biometric, PIN, or pattern authentication.',
    driveHeading: 'Full Sovereignty Over Personal Google Drive Cloud Backups',
    driveBackupTitle: '01. One-Tap Manual Backup to Google Drive',
    driveBackupDesc:
      'Whenever connected online, export and store your application data safely straight to your personal Google Drive account with a single tap.',
    driveRestoreTitle: '02. Seamless Cross-Device Restore',
    driveRestoreDesc:
      'Import and restore your complete workspace effortlessly from Google Drive whenever switching phones or reinstalling.',
    driveDeleteTitle: '03. Permanent Cloud Backup Deletion',
    driveDeleteDesc:
      'Maintain total control—permanently delete backup files from your Google Drive directly inside Complete Notebook anytime.',
    ownershipTitle: 'Your Notes & Records Belong to You',
    ownershipDesc:
      'Your private notes, goal photos, and financial entries are never stored on developer servers—remaining safely on your local device and your personal Google Drive.',
    readFullPolicyBtn: 'Read Privacy Policy Summary',
  },
  updatesSection: {
    sectionNumber: '04. Official Announcements & Release Updates',
    heading: 'Latest Changelogs & News from RyhStar Innovation.',
    subheading:
      'Follow new version rollouts, feature enhancements, and official announcements published directly by the developer.',
    filterAll: 'All Updates',
    categories: {
      release: 'Version Release',
      feature: 'New Feature',
      security: 'Security',
      announcement: 'Announcement',
    },
    pinnedLabel: 'Pinned',
    draftLabel: 'Private Draft',
    emptyLiveHint:
      'Showing official launch release overview. Developer updates published online appear here automatically.',
    defaultSeedTitle: 'Complete Notebook Global Launch – All-in-One Digital Workspace',
    defaultSeedVersion: 'Official Play Store Release',
    defaultSeedSummary:
      'Complete Notebook by RyhStar Innovation is officially available worldwide on Google Play for Android (with the iOS App Store release coming soon) as a flexible offline & online digital workspace featuring Midnight-Blue Dark Mode, Smart Notes with built-in OCR, Visual Savings & Pie Chart Expense Analytics, Planners, Precision MP3 Alarms, Built-in Calculator, .cnot sharing, PDF/Excel exports, and personal Google Drive Backup—with no monthly subscription fees.',
    adminToolbarTitle: 'Developer Update Studio (ryhstarr@gmail.com)',
    editingIdPrefix: 'Editing ID',
    newUpdateBtn: 'Publish New Update',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    confirmDeleteBtn: 'Confirm Delete',
    cancelBtn: 'Cancel',
    pinBtn: 'Pin Top',
    unpinBtn: 'Unpin',
    publishBtn: 'Publish Live',
    unpublishBtn: 'Move to Draft',
    saveBtn: 'Save Update',
    savingBtn: 'Saving...',
    developerLoginPrompt: 'Developer Sign-In to Manage Updates',
    formTitleLabel: 'Update Headline',
    formTitlePlaceholder: 'e.g. Complete Notebook 1.0.2+3 – Smart OCR & Cloud Sync Enhancements',
    formVersionLabel: 'Version Tag (e.g. 1.0.1+2)',
    formCategoryLabel: 'Update Category',
    formSummaryLabel: 'Changelog & Additional Information',
    formSummaryPlaceholder:
      'Write release changelog, new capabilities, or important notes for Complete Notebook users...',
    formLinkLabel: 'Optional Action URL (Google Play / Guide)',
    formPinToggle: 'Pin this update to top of feed',
    formPublishToggle: 'Publish immediately to global visitors',
    feedbackUpdated: 'Update modified and synced globally.',
    feedbackCreated: 'New update published globally.',
    feedbackDeleted: 'Update entry deleted.',
    viewOnPlayStore: 'Open on Google Play',
  },
  visionSection: {
    sectionNumber: '05. Vision, Mission & Global Community',
    heading: 'Setting the Global Standard for Private, Unified Digital Workspaces.',
    visionTitle: 'Our Vision',
    visionBody:
      'To become the world’s most trusted global digital workspace standard—elegantly restoring complete control over privacy, time, and personal finance back into the hands of users without boundaries.',
    missionTitle: 'Our Mission',
    missions: [
      {
        title: '01. Subscription-Free Accessibility',
        body: 'Deliver an accessible all-in-one productivity ecosystem for everyone without monthly subscription walls.',
      },
      {
        title: '02. Data Privacy Sovereignty',
        body: 'Combine safe on-device storage with user-controlled personal Google Drive backups so every note and financial record stays secure.',
      },
      {
        title: '03. Seamless Offline & Online Efficiency',
        body: 'Continuously refine daily utility integration for effortless performance both without a connection and when connected online.',
      },
    ],
    ctaTitle: 'Experience Organized Clarity Today',
    ctaBody:
      'Manage your notes, schedules, and personal finances effortlessly in one flexible offline & online workspace by RyhStar Innovation—available on Google Play, with App Store (iOS) coming soon.',
    ctaButton: 'Get Complete Notebook on Google Play',
    contactLabel: 'Official Developer Contact',
  },
  privacyPolicyPage: {
    kicker: 'Official Google Play Store Compliance Document · RyhStar Innovation',
    title: 'Official Privacy Policy – Complete Notebook',
    effectiveDate: 'Effective Date: 13 September 2026 · Package ID: com.ryhstarinnovation.complete_notebook',
    intro:
      'RyhStar Innovation engineered Complete Notebook with a strong commitment to user data security through a flexible Offline & Online architecture. This summary transparently explains how local workspace records, cloud backups, and device permissions operate in alignment with our official Google Play Privacy Policy.',
    openOfficialPolicyBtn: 'Open Official Privacy Policy Page',
    officialPolicyUrlLabel: 'Official Active App Privacy Policy URL',
    copyLinkBtn: 'Copy Official Policy Link',
    copiedLinkLabel: 'Official Policy URL Copied',
    sections: [
      {
        heading: '1. Local Workspace Storage & Flexible Offline/Online Architecture',
        body: 'All personal notes, periodic journals, task lists, calendar agendas, savings goal photos, and financial records are stored locally on your device so you can work reliably offline anytime. Online connectivity is used for personal Google Drive cloud sync and connected app services.',
      },
      {
        heading: '2. Personal Google Drive Online Backup, Restore & Deletion',
        body: 'When you initiate Google Drive Backup while online, backup files transfer directly between your device and your personal Google Drive storage. RyhStar Innovation cannot view or access your Drive files, and you retain full freedom to restore or permanently delete backups directly through the app.',
      },
      {
        heading: '3. Device Permissions (Smart OCR, Biometrics & Alarms)',
        body: 'Camera and photo permissions are used to attach images or run the built-in on-device OCR text scanner. Fingerprint, PIN, and Pattern locks execute locally on your device. Exact alarm and local MP3 audio permissions are used solely to trigger scheduled task alerts accurately.',
      },
      {
        heading: '4. File Exports (.cnot, PDF & Excel)',
        body: 'Exporting records into .cnot archives, PDF documents, or Excel spreadsheets occurs locally on your device. Files are shared externally only when explicitly initiated by you.',
      },
      {
        heading: '5. Developer Contact Information',
        body: 'For any questions regarding this Privacy Policy or Complete Notebook data practices, review the official Privacy Policy link above or contact RyhStar Innovation directly at: ryhstarr@gmail.com.',
      },
    ],
  },
  footer: {
    tagline:
      'Flexible offline & online all-in-one digital workspace by RyhStar Innovation for smart notes, personal finance clarity, and daily scheduling.',
    officialLinks: 'Quick Navigation',
    socialChannels: 'Official Platforms & Media',
    playStoreOfficialPage: 'Google Play Store Official Page',
    appStoreComingSoon: 'App Store (iOS) — Coming Soon',
    developerContact: 'Developer Contact',
    copyright: '© 2026 RyhStar Innovation. All rights reserved.',
  },
};
