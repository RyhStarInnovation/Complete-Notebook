import { SupportedLanguage } from './translations';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { esGallery } from './galleryLocales/es';
import { frGallery } from './galleryLocales/fr';
import { jaGallery } from './galleryLocales/ja';
import { arGallery } from './galleryLocales/ar';
import { ruGallery } from './galleryLocales/ru';
import { koGallery } from './galleryLocales/ko';

export interface ScreenshotItem {
  id: string;
  src: string;
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
}

export interface GallerySectionCopy {
  kicker: string;
  heading: string;
  subheading: string;
  zoomHint: string;
  closePreview: string;
  prevScreen: string;
  nextScreen: string;
  heroDarkBtn: string;
  heroLightBtn: string;
  items: ScreenshotItem[];
}

const idGallery: GallerySectionCopy = {
  kicker: 'Galeri Tampilan Resmi · Google Play & App Store (Segera Hadir)',
  heading: 'Tampilan Asli & Penjelasan Fitur Complete Notebook.',
  subheading:
    'Lihat langsung antarmuka nyata aplikasi mulai dari tema Midnight-Blue Dark Mode, Clean Light Mode, kanvas catatan kustom dengan OCR, perencana kalender, analitik tabungan, hingga pencadangan Google Drive.',
  zoomHint: 'Perbesar Gambar',
  closePreview: 'Tutup Pratinjau',
  prevScreen: 'Sebelumnya',
  nextScreen: 'Berikutnya',
  heroDarkBtn: 'Mode Gelap',
  heroLightBtn: 'Mode Terang',
  items: [
    {
      id: 'dark-mode',
      src: MEDIA_REGISTRY.darkModeScreen,
      badge: '01 · Mode Gelap',
      title: 'Tema Utama Midnight-Blue Dark Mode',
      subtitle:
        'Kelola hidup lebih teratur dari satu beranda terpadu yang mencakup Notebook, Harian, Mingguan, Bulanan, Checklist, Tabungan, Pengeluaran, Kalender, Kalkulator, serta Alarm.',
      bullets: [
        'Sepuluh modul ruang kerja terintegrasi (termasuk pengingat Alarm)',
        'Filter cepat Semua, Produktivitas, dan Keuangan',
        'Nyaman di mata untuk fokus malam maupun siang hari',
      ],
    },
    {
      id: 'light-mode',
      src: MEDIA_REGISTRY.lightModeScreen,
      badge: '02 · Mode Terang',
      title: 'Antarmuka Clean Light Mode yang Jernih',
      subtitle:
        'Beralih seketika antara Dark Mode dan Light Mode hanya dengan satu ketukan ikon matahari atau bulan di bagian atas aplikasi.',
      bullets: [
        'Tata letak bersih dengan ikon kategori berwarna tegas',
        'Akses instan ke pengaturan dan kunci keamanan aplikasi',
        'Responsif dan ringan digunakan baik saat offline maupun online',
      ],
    },
    {
      id: 'versatile-notebook',
      src: MEDIA_REGISTRY.versatileNotebookScreen,
      badge: '03 · Notebook Serbaguna',
      title: 'Catatan Tanpa Batas, Custom Canvas & Pemindai OCR',
      subtitle:
        'Buat catatan tanpa batas menggunakan kanvas kustom, ubah warna latar atau gambar latar JPG, sisipkan foto, dan pindai teks kamera (OCR) secara offline maupun online.',
      bullets: [
        'Pilihan warna latar catatan & latar gambar JPG kustom',
        'Format teks lengkap (Font, Tebal, Garis Bawah, Subskrip, Kode, Tautan)',
        'Folder rapi (Kamus, Pelajaran, Berkas, Daftar) dengan pencarian instan',
      ],
    },
    {
      id: 'plans-calendar',
      src: MEDIA_REGISTRY.plansCalendarScreen,
      badge: '04 · Rencana & Kalender',
      title: 'Perencana, Kalender Cerdas & Pengingat Alarm',
      subtitle:
        'Susun catatan harian, mingguan, dan bulanan, jadwalkan di Smart Calendar, serta pasang pengingat alarm nada dering agar selalu tepat waktu.',
      bullets: [
        'Folder catatan Harian, Mingguan, dan Bulanan terstruktur',
        'Checklist interaktif penuh warna dengan fitur ekspor cepat',
        'Smart Calendar & daftar alarm dengan pilihan nada dering kustom',
      ],
    },
    {
      id: 'financial-goals',
      src: MEDIA_REGISTRY.financialGoalsScreen,
      badge: '05 · Target Finansial',
      title: 'Capai Target Finansial: Tabungan & Pengeluaran',
      subtitle:
        'Pantau setiap arus kas dan tingkatkan tabungan impian Anda. Ambil kendali penuh atas masa depan keuangan dengan grafik analitik interaktif.',
      bullets: [
        'Target tabungan impian, kelola tagihan, & kalkulator mini bawaan',
        'Grafik analitik interaktif (Donut/Pie, Batang, dan Garis)',
        'Riwayat transaksi lengkap & ekspor laporan cepat ke PDF maupun Excel',
      ],
    },
    {
      id: 'privacy-backup',
      src: MEDIA_REGISTRY.privacyBackupScreen,
      badge: '06 · Privasi & Cadangan',
      title: 'Privasi Catatan Lokal & Cadangan Google Drive',
      subtitle:
        'Catatan pribadi tersimpan aman di perangkat lokal Anda dan dapat dicadangkan atau dipulihkan secara online langsung ke Google Drive pribadi kapan saja.',
      bullets: [
        'Backup & Restore langsung ke akun Google Drive pribadi saat online',
        'Pengunci aplikasi berlapis: PIN 6 Digit, Pola Kunci, & Biometrik',
        'Opsi bersihkan data & kendali penuh atas berkas catatan pengguna',
      ],
    },
  ],
};

const enGallery: GallerySectionCopy = {
  kicker: 'Official App Showcase · Google Play & App Store (Coming Soon)',
  heading: 'Authentic App Screens & Complete Feature Guide.',
  subheading:
    'Explore every real screen of Complete Notebook—from Midnight-Blue Dark Mode and Clean Light Mode to Custom Canvas OCR notes, Smart Calendar alarms, cash-flow analytics, and private Google Drive backups.',
  zoomHint: 'Expand Screen',
  closePreview: 'Close Preview',
  prevScreen: 'Previous',
  nextScreen: 'Next',
  heroDarkBtn: 'Dark Mode',
  heroLightBtn: 'Light Mode',
  items: [
    {
      id: 'dark-mode',
      src: MEDIA_REGISTRY.darkModeScreen,
      badge: '01 · Dark Mode',
      title: 'Signature Midnight-Blue Dark Mode Hub',
      subtitle:
        'Manage your life in an organized way from one unified dashboard covering Notebook, Daily, Weekly, Monthly, Checklist, Savings, Expenses, Calendar, Calculator, and Alarms.',
      bullets: [
        'Ten integrated workspace modules including Precision Alarms',
        'Instant category filtering across All, Productivity, and Finance',
        'Crafted for comfortable day and night focus',
      ],
    },
    {
      id: 'light-mode',
      src: MEDIA_REGISTRY.lightModeScreen,
      badge: '02 · Light Mode',
      title: 'Crisp & Minimal Light Mode Interface',
      subtitle:
        'Switch effortlessly between Midnight-Blue Dark Mode and Clean Light Mode with a single tap on the top theme button.',
      bullets: [
        'High-contrast card layout with color-coded workspace icons',
        'One-tap access to security settings and workspace filters',
        'Fast, lightweight performance both offline and online',
      ],
    },
    {
      id: 'versatile-notebook',
      src: MEDIA_REGISTRY.versatileNotebookScreen,
      badge: '03 · Versatile Notebook',
      title: 'Versatile Notebook, Custom Canvas & Smart OCR',
      subtitle:
        'Create limitless notes. Use Custom Canvas, choose background colors or custom JPG backgrounds, insert images, and scan text via camera OCR both offline and online.',
      bullets: [
        'Custom Canvas mode, full-screen editor, Bg Color, and Bg JPG support',
        'Rich formatting toolbar (Fonts, Bold, Underline, Sub/Superscript, Code)',
        'Organized notebook folders with instant keyword search',
      ],
    },
    {
      id: 'plans-calendar',
      src: MEDIA_REGISTRY.plansCalendarScreen,
      badge: '04 · Plans & Calendar',
      title: 'Plans, Smart Calendar & Alarm Reminders',
      subtitle:
        'Set daily, weekly, and monthly notes, schedule events in the Smart Calendar, and configure custom ringtone alarms so you stay on time and track progress neatly.',
      bullets: [
        'Dedicated Daily, Weekly, and Monthly note folders',
        'Color-coded checklists with one-tap item tracking and export',
        'Smart Calendar events paired with customizable MP3 reminder alarms',
      ],
    },
    {
      id: 'financial-goals',
      src: MEDIA_REGISTRY.financialGoalsScreen,
      badge: '05 · Financial Goals',
      title: 'Achieve Financial Goals: Savings & Expenses',
      subtitle:
        'Monitor every cash flow and grow savings for your dreams. Take full control of your financial future with visual analytics and instant reports.',
      bullets: [
        'Set Savings Goals, Manage Bills, and use the built-in Mini Calculator',
        'Interactive Donut/Pie, Bar, and Line cash-flow analytics charts',
        'Export savings and transaction history to PDF or Excel anytime',
      ],
    },
    {
      id: 'privacy-backup',
      src: MEDIA_REGISTRY.privacyBackupScreen,
      badge: '06 · Privacy & Backup',
      title: 'Private Local Notes & Google Drive Cloud Backup',
      subtitle:
        'Your personal notes and financial logs stay safely stored on your device and can be backed up or restored online straight to your personal Google Drive anytime.',
      bullets: [
        'Direct online Backup & Restore to your personal Google Drive account',
        'Multi-layer App Lock protection with 6-Digit PIN and Pattern Lock',
        'Full user control over local workspace records and cloud backups',
      ],
    },
  ],
};

export const GALLERY_TRANSLATIONS: Record<SupportedLanguage, GallerySectionCopy> = {
  id: idGallery,
  en: enGallery,
  es: esGallery,
  fr: frGallery,
  ja: jaGallery,
  ar: arGallery,
  ru: ruGallery,
  ko: koGallery,
};
