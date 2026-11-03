import { SupportedLanguage } from './types';

export interface LocalizedSeoMeta {
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
}

/**
 * Search-engine optimized titles (45-60 chars), descriptions (130-160 chars),
 * and comprehensive category discovery keywords across all 8 languages.
 */
export const LOCALIZED_SEO_META: Record<SupportedLanguage, LocalizedSeoMeta> = {
  id: {
    title: 'Complete Notebook – Aplikasi Catatan Lengkap, OCR & Keuangan',
    description:
      'Rekomendasi aplikasi catatan lengkap (Google Play & App Store segera hadir): jurnal harian, OCR, pencatat tabungan & pengeluaran, alarm MP3, kunci PIN, dan Google Drive.',
    keywords:
      'Complete Notebook, RyhStar Innovation, aplikasi catatan, aplikasi catatan lengkap, rekomendasi aplikasi catatan, aplikasi catatan Android dan iOS, Complete Notebook App Store, aplikasi buku catatan, buku catatan digital, aplikasi tulis catatan harian, aplikasi jurnal harian pribadi, aplikasi diary kunci PIN, aplikasi to-do list daftar tugas, aplikasi catatan dan keuangan, aplikasi catatan uang masuk dan keluar, aplikasi pencatat keuangan harian, aplikasi catatan tabungan dan pengeluaran, aplikasi catatan belanja, aplikasi pengingat jadwal kegiatan, aplikasi catatan dengan alarm MP3, aplikasi scan foto ke teks OCR, pemindai teks gambar OCR, aplikasi catatan aman sidik jari PIN, aplikasi catatan tanpa biaya langganan, aplikasi catatan offline dan online, aplikasi catatan backup Google Drive, ekspor catatan PDF Excel',
    ogLocale: 'id_ID',
  },
  en: {
    title: 'Complete Notebook – All-in-One Notes, OCR & Finance App',
    description:
      'Recommended all-in-one notebook app (Google Play & App Store coming soon): smart notes, OCR scanner, savings & expense tracker, MP3 alarms, PIN lock, and Drive backup.',
    keywords:
      'Complete Notebook, RyhStar Innovation, all-in-one note taking app, best notebook app Android iOS, Complete Notebook App Store, smart notes app, daily journal app, to-do list planner, offline online OCR scanner app, personal finance and expense tracker, savings goal tracker, calendar schedule reminder MP3 alarm, private notes with PIN fingerprint lock, Google Drive backup notebook, export notes PDF Excel',
    ogLocale: 'en_US',
  },
  es: {
    title: 'Complete Notebook – App Completa de Notas, OCR y Finanzas',
    description:
      'Aplicación todo en uno recomendada (Google Play y App Store próximamente): notas inteligentes, escáner OCR, control de ahorros y gastos, alarmas MP3, PIN y Drive.',
    keywords:
      'Complete Notebook, RyhStar Innovation, aplicación de notas completa, mejor app de notas Android e iOS, Complete Notebook App Store, cuaderno digital, diario personal, lista de tareas, escáner de texto OCR, control de gastos y ahorros, agenda con alarmas MP3, notas privadas con huella y PIN, copia de seguridad Google Drive',
    ogLocale: 'es_ES',
  },
  fr: {
    title: 'Complete Notebook – App Complète de Notes, OCR & Finances',
    description:
      'Application bloc-notes tout-en-un recommandée (Google Play et App Store bientôt) : notes riches, scan OCR, suivi épargne et dépenses, alarmes MP3, PIN et Drive.',
    keywords:
      'Complete Notebook, RyhStar Innovation, application prise de notes complète, meilleure application notes Android et iOS, Complete Notebook App Store, carnet numérique, journal quotidien, liste de tâches, scanner texte OCR, gestion budget épargne dépenses, rappel calendrier alarme MP3, notes sécurisées PIN biométrie, sauvegarde Google Drive',
    ogLocale: 'fr_FR',
  },
  ja: {
    title: 'Complete Notebook – 多機能ノート・OCR・家計簿オールインワンアプリ',
    description:
      'おすすめ多機能ノートアプリ（Google Play配信中・App Store近日公開）：高機能メモ、日記、OCR文字認識、貯金・支出の家計管理、MP3アラーム、PINロック、Googleドライブ連携。',
    keywords:
      'Complete Notebook, RyhStar Innovation, ノートアプリ おすすめ, 多機能メモ帳 Android iOS, Complete Notebook App Store, 日記アプリ, ToDoリスト, OCR 文字認識 スキャナー, 家計簿 貯金 支出管理, カレンダー リマインダー MP3アラーム, 鍵付きメモ 指紋認証, Googleドライブ バックアップ',
    ogLocale: 'ja_JP',
  },
  ar: {
    title: 'Complete Notebook – تطبيق ملاحظات شامل ومسح OCR وإدارة مالية',
    description:
      'أفضل تطبيق دفتر ملاحظات شامل (Google Play و App Store قريباً): ملاحظات ذكية، مذكرات يومية، ماسح نصوص OCR، متابعة المدخرات والمصاريف، منبهات MP3، وقفل بالبصمة.',
    keywords:
      'Complete Notebook, RyhStar Innovation, تطبيق ملاحظات شامل, أفضل برنامج ملاحظات أندرويد وآيفون iOS, Complete Notebook App Store, دفتر ملاحظات رقمي, مذكرات يومية, قائمة مهام, ماسح النصوص OCR, تطبيق إدارة المصاريف والمدخرات, تقويم ومنبه MP3, قفل الملاحظات بالبصمة والرمز, نسخ احتياطي جوجل درايف',
    ogLocale: 'ar_AR',
  },
  ru: {
    title: 'Complete Notebook – Универсальные заметки, OCR и финансы',
    description:
      'Рекомендуемое приложение-блокнот «всё в одном» (Google Play и скоро в App Store): умные заметки, OCR-сканер, учёт доходов и расходов, MP3-будильники и PIN-защита.',
    keywords:
      'Complete Notebook, RyhStar Innovation, лучшее приложение для заметок Android и iOS, Complete Notebook App Store, универсальный блокнот, личный дневник, список задач, сканер текста OCR, учет финансов расходов и сбережений, ежедневник с будильником MP3, заметки с паролем и отпечатком, резервная копия Google Диск',
    ogLocale: 'ru_RU',
  },
  ko: {
    title: 'Complete Notebook – 올인원 스마트 노트, OCR 스캔 & 가계부 앱',
    description:
      '추천 올인원 노트 앱(Google Play 출시 · App Store 출시 예정): 스마트 메모, 일기장, OCR 텍스트 스캔, 저축·지출 가계부, MP3 알람 일정관리, 지문·PIN 잠금 및 구글 드라이브 백업.',
    keywords:
      'Complete Notebook, RyhStar Innovation, 노트 앱 추천, 올인원 메모장 안드로이드 iOS, Complete Notebook App Store, 다이어리 일기 앱, 할일 목록, OCR 텍스트 스캐너, 가계부 저축 지출 관리, 일정 알림 MP3 알람, 비밀 메모 잠금, 구글 드라이브 백업',
    ogLocale: 'ko_KR',
  },
};
