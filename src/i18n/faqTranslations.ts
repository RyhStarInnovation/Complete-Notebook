import { SupportedLanguage } from './types';

export interface FaqItemCopy {
  question: string;
  answer: string;
}

export interface FaqSectionCopy {
  sectionKicker: string;
  heading: string;
  subheading: string;
  officialFactsLabel: string;
  items: FaqItemCopy[];
}

export const FAQ_TRANSLATIONS: Record<SupportedLanguage, FaqSectionCopy> = {
  id: {
    sectionKicker: '06. Informasi & Panduan Resmi · Complete Notebook',
    heading: 'Informasi Lengkap Aplikasi Catatan, OCR & Keuangan Complete Notebook.',
    subheading:
      'Panduan resmi bagi pengguna yang mencari rekomendasi aplikasi catatan lengkap untuk mengelola catatan harian, tugas, jadwal, pemindai OCR, hingga pembukuan keuangan pribadi (tersedia di Google Play & segera hadir di App Store iOS).',
    officialFactsLabel: 'Identitas Resmi Produk',
    items: [
      {
        question: 'Apa itu aplikasi Complete Notebook?',
        answer:
          'Complete Notebook adalah aplikasi buku catatan digital dan ruang kerja all-in-one resmi oleh RyhStar Innovation (tersedia di Google Play Store & segera hadir di App Store) yang menggabungkan catatan pintar rich-text, jurnal harian, daftar tugas (to-do list), pemindai teks foto OCR, pencatat tabungan dan pengeluaran, kalender agenda, alarm audio MP3 presisi, serta pencadangan ke Google Drive pribadi.',
      },
      {
        question: 'Mengapa Complete Notebook direkomendasikan sebagai aplikasi catatan lengkap serbaguna?',
        answer:
          'Tidak perlu lagi memasang banyak aplikasi terpisah yang membebani memori ponsel. Complete Notebook menyatukan 7 utilitas harian utama—catatan serbaguna bergambar, pemindai kamera OCR, pengatur jadwal kalender, pengingat alarm MP3 kustom, pelacak target tabungan, pencatat pemasukan-pengeluaran, serta ekspor laporan PDF/Excel—dalam satu aplikasi ringan bertema Midnight-Blue.',
      },
      {
        question: 'Apakah bisa mencatat keuangan, target tabungan, dan pengeluaran harian sekaligus?',
        answer:
          'Bisa. Selain berfungsi sebagai aplikasi catatan lengkap dan jurnal harian, Complete Notebook menyediakan fitur pembukuan keuangan pribadi untuk memantau progres target tabungan bergambar, mencatat arus kas pemasukan dan pengeluaran harian, melihat grafik visual otomatis, hingga mengekspor laporan keuangan ke PDF maupun Excel.',
      },
      {
        question: 'Apakah Complete Notebook bisa digunakan secara offline maupun online?',
        answer:
          'Ya. Complete Notebook dirancang fleksibel untuk penggunaan offline maupun online: seluruh catatan, jadwal, dan pembukuan keuangan tersimpan aman secara lokal di perangkat Anda sehingga lancar diakses kapan saja tanpa sinyal internet, serta siap dicadangkan secara online ke Google Drive pribadi.',
      },
      {
        question: 'Bagaimana keamanan privasi catatan pribadi dan fitur kunci aplikasinya?',
        answer:
          'Catatan penting, jurnal pribadi, dan data finansial Anda dilindungi berlapis menggunakan kunci biometrik Sidik Jari, PIN, maupun Pola langsung di perangkat. Data disimpan secara lokal di memori ponsel Anda dan hanya disinkronkan ke akun Google Drive pribadi milik Anda sendiri saat Anda menjalankan fitur Backup & Restore.',
      },
      {
        question: 'Apakah Complete Notebook memerlukan biaya langganan bulanan?',
        answer:
          'Tidak ada biaya langganan bulanan. Seluruh fitur produktivitas utama—mulai dari catatan pintar, OCR, pelacak tabungan dan pengeluaran, alarm MP3, kunci privasi, hingga ekspor berkas .cnot, PDF, dan Excel—dapat langsung digunakan tanpa tagihan berulang.',
      },
      {
        question: 'Di mana mengunduh Complete Notebook yang resmi? Apakah tersedia untuk Android dan iOS (App Store)?',
        answer:
          'Aplikasi resmi Complete Notebook oleh RyhStar Innovation saat ini sudah tersedia untuk perangkat Android di Google Play Store (ID paket: com.ryhstarinnovation.complete_notebook), dan versi App Store untuk pengguna iOS sedang disiapkan (Segera Hadir). Pantau pengumuman rilis resmi di ryhstarinnovation.web.id.',
      },
    ],
  },
  en: {
    sectionKicker: '06. Official Product Guide · Complete Notebook',
    heading: 'Complete Guide to the All-in-One Notes, OCR & Finance App.',
    subheading:
      'Official answers for users looking for a recommended all-in-one notebook app combining smart notes, daily journals, OCR text scanning, schedules, and personal finance tracking (available on Google Play & coming soon to the iOS App Store).',
    officialFactsLabel: 'Verified App Identity',
    items: [
      {
        question: 'What is the Complete Notebook app?',
        answer:
          'Complete Notebook is an official all-in-one digital notebook and workspace by RyhStar Innovation (available on Google Play & coming soon to the App Store) that unifies rich-text smart notes, daily journals, to-do lists, built-in OCR photo-to-text scanning, savings and expense tracking, calendar schedules, custom MP3 alarms, and personal Google Drive backup.',
      },
      {
        question: 'Why is Complete Notebook recommended as a complete all-in-one note-taking app?',
        answer:
          'Instead of juggling separate apps for notes, reminders, document scanning, and budgeting, Complete Notebook integrates 7 essential daily utilities—rich-text notes, instant OCR scanner, calendar agenda, custom MP3 alarms, visual savings goals, income-expense ledger, and PDF/Excel exports—inside one calm Midnight-Blue workspace.',
      },
      {
        question: 'Can I track savings goals and daily expenses inside the same notebook app?',
        answer:
          'Yes. Alongside smart notes and periodic journals, Complete Notebook includes a dedicated personal finance tracker for visual savings goals, daily income and expense logging, cash-flow analytics charts, and instant PDF or Excel financial reports.',
      },
      {
        question: 'Does Complete Notebook work both offline and online?',
        answer:
          'Yes. Complete Notebook is engineered for flexible offline and online use: your notes, schedules, and financial records are stored locally on your device for instant offline access, with encrypted online backup to your personal Google Drive whenever connected.',
      },
      {
        question: 'How are private notes, journals, and financial logs protected?',
        answer:
          'Your personal notes and financial records are safeguarded locally with multi-layer Fingerprint biometric lock, PIN, and Pattern protection, while cloud backups go exclusively to your own personal Google Drive account.',
      },
      {
        question: 'Does Complete Notebook require a monthly subscription?',
        answer:
          'No monthly subscription is required. Core productivity and finance tools—including OCR scanning, biometric/PIN app lock, financial analytics, and PDF, Excel, or .cnot exports—are available without recurring monthly bills.',
      },
      {
        question: 'Where can I download Complete Notebook? Is it available on Android and iOS (App Store)?',
        answer:
          'Complete Notebook by RyhStar Innovation is currently available for Android on the Google Play Store (package ID: com.ryhstarinnovation.complete_notebook), and the official Apple App Store version for iOS is coming soon. Follow official release updates at ryhstarinnovation.web.id.',
      },
    ],
  },
  es: {
    sectionKicker: '06. Guía Oficial · Complete Notebook',
    heading: 'Guía Completa de la App de Notas, OCR y Finanzas.',
    subheading:
      'Información oficial para quienes buscan una aplicación de notas completa recomendada con diario, escáner OCR, agenda y control financiero (disponible en Google Play y próximamente en App Store para iOS).',
    officialFactsLabel: 'Identidad Oficial del Producto',
    items: [
      {
        question: '¿Qué es la aplicación Complete Notebook?',
        answer:
          'Complete Notebook es un cuaderno digital y espacio de trabajo todo en uno por RyhStar Innovation (disponible en Google Play y próximamente en App Store) que reúne notas inteligentes, diario personal, listas de tareas, escáner OCR, control de ahorros y gastos, calendario con alarmas MP3 y copia en Google Drive.',
      },
      {
        question: '¿Por qué se recomienda Complete Notebook como aplicación de notas completa?',
        answer:
          'Porque unifica 7 herramientas esenciales en una sola aplicación ligera: editor de notas enriquecido, escáner de texto OCR, calendario de actividades, alarmas MP3 personalizadas, metas de ahorro, registro de gastos e informes en PDF y Excel.',
      },
      {
        question: '¿Puedo registrar ahorros y gastos diarios en la misma aplicación de notas?',
        answer:
          'Sí. Incluye un módulo completo de finanzas personales con metas de ahorro con imagen, control de ingresos y gastos diarios, gráficos visuales y exportación a PDF o Excel.',
      },
      {
        question: '¿Funciona sin conexión y en línea?',
        answer:
          'Sí. Tus notas, horarios y finanzas se almacenan localmente para trabajar sin internet y pueden respaldarse en línea en tu Google Drive personal.',
      },
      {
        question: '¿Cómo se protege la privacidad de mis notas privadas?',
        answer:
          'Cuenta con bloqueo por huella digital, PIN y patrón en el dispositivo, además de respaldo directo únicamente en tu propia cuenta de Google Drive.',
      },
      {
        question: '¿Requiere una suscripción mensual?',
        answer:
          'No requiere suscripción mensual para disfrutar de notas inteligentes, OCR, finanzas, bloqueo biométrico y exportación a PDF, Excel y .cnot.',
      },
      {
        question: '¿Dónde descargar Complete Notebook oficial? ¿Está disponible en Android e iOS (App Store)?',
        answer:
          'Complete Notebook por RyhStar Innovation está disponible actualmente para Android en Google Play Store (paquete: com.ryhstarinnovation.complete_notebook), y la versión oficial en App Store para iOS estará disponible próximamente. Consulta las novedades en ryhstarinnovation.web.id.',
      },
    ],
  },
  fr: {
    sectionKicker: '06. Guide Officiel · Complete Notebook',
    heading: 'Guide Complet de l’Application de Notes, OCR et Finances.',
    subheading:
      'Réponses officielles pour les utilisateurs recherchant une application de notes complète recommandée avec OCR, agenda et budget (disponible sur Google Play et bientôt sur l’App Store iOS).',
    officialFactsLabel: 'Identité Officielle de l’Application',
    items: [
      {
        question: 'Qu’est-ce que l’application Complete Notebook ?',
        answer:
          'Complete Notebook est un carnet numérique tout-en-un par RyhStar Innovation (disponible sur Google Play et bientôt sur l’App Store) réunissant notes intelligentes, journal quotidien, listes de tâches, scanner OCR, suivi de l’épargne et des dépenses, calendrier avec alarmes MP3 et sauvegarde Google Drive.',
      },
      {
        question: 'Pourquoi Complete Notebook est-il recommandé comme application de notes complète ?',
        answer:
          'Il regroupe 7 outils essentiels dans une seule application fluide : éditeur de notes enrichi, scan OCR instantané, calendrier, alarmes audio MP3, objectifs d’épargne, suivi des dépenses et exportation PDF/Excel.',
      },
      {
        question: 'Puis-je suivre mon épargne et mes dépenses dans la même application ?',
        answer:
          'Oui. Un gestionnaire financier intégré permet de suivre vos objectifs d’épargne, vos revenus et dépenses quotidiens avec graphiques et rapports PDF ou Excel.',
      },
      {
        question: 'Fonctionne-t-il hors ligne et en ligne ?',
        answer:
          'Oui. Vos données restent accessibles localement hors ligne et peuvent être sauvegardées en ligne sur votre Google Drive personnel.',
      },
      {
        question: 'Comment mes notes privées sont-elles sécurisées ?',
        answer:
          'Vos notes et données financières sont protégées par empreinte biométrique, code PIN ou schéma, avec sauvegarde privée sur votre propre Google Drive.',
      },
      {
        question: 'Faut-il un abonnement mensuel ?',
        answer:
          'Aucun abonnement mensuel n’est requis pour utiliser les notes, le scanner OCR, le suivi financier, le verrouillage biométrique et les exports PDF, Excel ou .cnot.',
      },
      {
        question: 'Où télécharger la version officielle ? Est-elle disponible sur Android et iOS (App Store) ?',
        answer:
          'Complete Notebook par RyhStar Innovation est disponible dès maintenant pour Android sur Google Play Store (identifiant : com.ryhstarinnovation.complete_notebook), et la version officielle sur l’App Store pour iOS sera bientôt disponible. Suivez les annonces sur ryhstarinnovation.web.id.',
      },
    ],
  },
  ja: {
    sectionKicker: '06. 公式製品ガイド · Complete Notebook',
    heading: '多機能ノート・OCR・家計管理アプリ Complete Notebook 公式ガイド',
    subheading:
      'おすすめの多機能ノート・日記・OCR・スケジュール・家計簿アプリをお探しの方向けの公式案内です（Google Play配信中・iOS向けApp Store近日公開予定）。',
    officialFactsLabel: '公式アプリ情報',
    items: [
      {
        question: 'Complete Notebook とはどのようなアプリですか？',
        answer:
          'Complete Notebook は RyhStar Innovation が提供するオールインワン型デジタルノートです（Google Play 配信中・App Store 近日公開予定）。高機能メモ、日記、ToDoリスト、OCR文字認識、貯金・支出管理、カレンダー予定、MP3アラーム、Googleドライブバックアップを1つに統合しています。',
      },
      {
        question: 'おすすめの多機能ノートアプリとして選ばれる理由は？',
        answer:
          'メモ帳・OCRスキャナー・予定表・MP3アラーム・貯金目標・家計簿・PDF/Excel出力の7つの実用機能を1つの軽量なアプリにまとめているため、複数のアプリを切り替える手間がありません。',
      },
      {
        question: 'ノートと一緒に毎日の支出や貯金目標も記録できますか？',
        answer:
          'はい。写真付きの貯金目標管理、日々の収支記録、視覚的なキャッシュフロー分析グラフ、PDF・Excelレポート出力に対応しています。',
      },
      {
        question: 'オフラインとオンラインの両方で使えますか？',
        answer:
          'はい。データは端末内に安全に保存されるため圏外でも快適に利用でき、オンライン時には個人のGoogleドライブへバックアップできます。',
      },
      {
        question: '大切なメモや家計データのプライバシー保護はありますか？',
        answer:
          '指紋認証・PIN・パターンによるアプリロック機能を備えており、クラウドバックアップもご自身のGoogleドライブアカウントのみに保存されます。',
      },
      {
        question: '月額サブスクリプション料金は必要ですか？',
        answer:
          '月額課金なしでスマートノート、OCR、家計管理、生体認証ロック、PDF・Excel・.cnot出力をご利用いただけます。',
      },
      {
        question: '公式アプリはどこで入手できますか？Android と iOS（App Store）に対応していますか？',
        answer:
          'RyhStar Innovation の Complete Notebook は現在 Android 向けに Google Play ストア（com.ryhstarinnovation.complete_notebook）で配信中であり、iOS 向け App Store 版も近日公開予定です。最新情報は公式サイト ryhstarinnovation.web.id でご確認いただけます。',
      },
    ],
  },
  ar: {
    sectionKicker: '06. الدليل الرسمي · Complete Notebook',
    heading: 'دليل شامل لتطبيق الملاحظات والمسح الضوئي OCR والإدارة المالية.',
    subheading:
      'إجابات رسمية للباحثين عن أفضل تطبيق ملاحظات شامل (متوفر على Google Play وقريباً على App Store لنظام iOS) يجمع المذكرات والمهام ومسح النصوص ومتابعة المصاريف.',
    officialFactsLabel: 'الهوية الرسمية للتطبيق',
    items: [
      {
        question: 'ما هو تطبيق Complete Notebook؟',
        answer:
          'تطبيق Complete Notebook هو دفتر ملاحظات رقمي شامل من تطوير RyhStar Innovation (متوفر على Google Play وقريباً على App Store) يجمع بين الملاحظات الذكية، المذكرات اليومية، قوائم المهام، الماسح الضوئي OCR، متابعة المدخرات والمصروفات، التقويم مع منبهات MP3، والنسخ الاحتياطي عبر Google Drive.',
      },
      {
        question: 'لماذا يُنصح بتطبيق Complete Notebook كأفضل تطبيق ملاحظات شامل؟',
        answer:
          'لأنه يوفر 7 أدوات أساسية في تطبيق واحد خفيف: محرر ملاحظات متقدم، ماسح نصوص الصور OCR، جدول مواعيد، منبه صوتي MP3، أهداف ادخار، سجل مصاريف، وتصدير تقارير PDF وExcel.',
      },
      {
        question: 'هل يمكن تسجيل المدخرات والمصاريف اليومية داخل نفس التطبيق؟',
        answer:
          'نعم. يتضمن قسماً متكاملاً للإدارة المالية الشخصية لمتابعة أهداف الادخار والإيرادات والمصروفات مع رسوم بيانية وتصدير تقارير PDF وExcel.',
      },
      {
        question: 'هل يعمل التطبيق بدون إنترنت وعبر الإنترنت؟',
        answer:
          'نعم. تُحفظ بياناتك محلياً للعمل الفوري بدون اتصال، مع إمكانية النسخ الاحتياطي السحابي إلى حساب Google Drive الشخصي.',
      },
      {
        question: 'كيف تتم حماية خصوصية الملاحظات الشخصية؟',
        answer:
          'يدعم قفل التطبيق ببصمة الإصبع أو الرمز السري PIN أو النمط، وتُحفظ النسخ الاحتياطية حصرياً في حساب Google Drive الخاص بك.',
      },
      {
        question: 'هل يتطلب اشتراكاً شهرياً؟',
        answer:
          'لا يتطلب رسوم اشتراك شهري للاستفادة من الملاحظات ومسح OCR والإدارة المالية والقفل البيومتري وتصدير الملفات.',
      },
      {
        question: 'من أين يمكن تنزيل النسخة الرسمية؟ وهل يتوفر لنظامي Android و iOS (App Store)؟',
        answer:
          'يتوفر تطبيق Complete Notebook من RyhStar Innovation حالياً لأجهزة الأندرويد عبر متجر Google Play (معرف الحزمة: com.ryhstarinnovation.complete_notebook)، وستتوفر نسخة متجر App Store لنظام iOS قريباً. تابع التحديثات الرسمية عبر ryhstarinnovation.web.id.',
      },
    ],
  },
  ru: {
    sectionKicker: '06. Официальное руководство · Complete Notebook',
    heading: 'Полная информация о приложении для заметок, OCR и финансов.',
    subheading:
      'Официальное руководство для пользователей, которые ищут рекомендуемое универсальное приложение-блокнот (доступно в Google Play и скоро в App Store для iOS).',
    officialFactsLabel: 'Официальные данные приложения',
    items: [
      {
        question: 'Что такое приложение Complete Notebook?',
        answer:
          'Complete Notebook — это универсальный цифровой блокнот от RyhStar Innovation (доступно в Google Play и скоро в App Store), объединяющий умные заметки, дневник, списки задач, OCR-сканер текста, учёт сбережений и расходов, календарь с MP3-будильниками и резервное копирование в Google Диск.',
      },
      {
        question: 'Почему Complete Notebook рекомендуют как полноценное приложение для заметок?',
        answer:
          'Оно заменяет сразу 7 отдельных программ: редактор заметок с фото, сканер текста OCR, ежедневник, MP3-будильники, цели накоплений, учёт доходов/расходов и экспорт отчётов в PDF и Excel.',
      },
      {
        question: 'Можно ли вести учёт финансов и накоплений в этом же приложении?',
        answer:
          'Да. Встроенный финансовый трекер позволяет отслеживать цели сбережений, ежедневные доходы и расходы, наглядные графики и выгружать отчёты в PDF или Excel.',
      },
      {
        question: 'Работает ли приложение офлайн и онлайн?',
        answer:
          'Да. Записи хранятся локально на устройстве для мгновенного доступа без интернета и синхронизируются с личным Google Диском онлайн.',
      },
      {
        question: 'Как защищены личные заметки и финансовые данные?',
        answer:
          'Предусмотрена защита отпечатком пальца, PIN-кодом и графическим ключом, а облачные копии сохраняются только на вашем личном Google Диске.',
      },
      {
        question: 'Нужна ли ежемесячная подписка?',
        answer:
          'Нет, умные заметки, OCR, финансовая аналитика, блокировка и экспорт в PDF, Excel и .cnot доступны без ежемесячной абонентской платы.',
      },
      {
        question: 'Где скачать официальное приложение? Доступно ли оно на Android и iOS (App Store)?',
        answer:
          'Complete Notebook от RyhStar Innovation уже доступен для Android в Google Play (пакет: com.ryhstarinnovation.complete_notebook), а официальная версия в App Store для iOS выйдет скоро. Следите за новостями на сайте ryhstarinnovation.web.id.',
      },
    ],
  },
  ko: {
    sectionKicker: '06. 공식 제품 가이드 · Complete Notebook',
    heading: '올인원 스마트 노트·OCR·가계부 앱 Complete Notebook 안내',
    subheading:
      '추천 올인원 메모장, 일기, OCR 스캐너, 일정 알람 및 가계부 앱을 찾는 분들을 위한 공식 정보입니다(Google Play 정식 제공 · iOS App Store 출시 예정).',
    officialFactsLabel: '공식 앱 식별 정보',
    items: [
      {
        question: 'Complete Notebook은 어떤 앱인가요?',
        answer:
          'Complete Notebook은 RyhStar Innovation이 제공하는 올인원 디지털 노트로(Google Play 제공 중 · App Store 출시 예정), 스마트 메모, 일기장, 할 일 목록, OCR 텍스트 스캐너, 저축·지출 가계부, 캘린더 일정 및 MP3 알람, 개인 Google 드라이브 백업을 하나로 통합한 앱입니다.',
      },
      {
        question: '추천 올인원 노트 앱으로 꼽히는 이유는 무엇인가요?',
        answer:
          '여러 앱을 따로 설치할 필요 없이 리치 텍스트 메모, 카메라 OCR 스캔, 일정 캘린더, 맞춤 MP3 알람, 저축 목표, 수입·지출 기록, PDF/Excel 내보내기 등 7가지 필수 도구를 하나의 가벼운 앱에서 모두 제공하기 때문입니다.',
      },
      {
        question: '메모와 함께 저축 목표나 매일의 지출 내역도 관리할 수 있나요?',
        answer:
          '네. 사진이 포함된 저축 목표 달성률 확인, 일일 수입·지출 내역 기록, 현금 흐름 차트 분석 및 PDF·Excel 보고서 내보내기를 지원합니다.',
      },
      {
        question: '오프라인과 온라인 모두에서 사용할 수 있나요?',
        answer:
          '네. 기기 내부에 데이터가 안전하게 저장되어 인터넷 없이도 즉시 사용할 수 있으며, 온라인 시 개인 Google 드라이브로 백업할 수 있습니다.',
      },
      {
        question: '개인 메모와 가계부 데이터의 보안은 어떻게 유지되나요?',
        answer:
          '지문 인식, PIN 번호, 패턴 잠금으로 안전하게 보호되며 백업 파일 역시 사용자 본인의 Google 드라이브 계정에만 저장됩니다.',
      },
      {
        question: '월간 구독료가 필요한가요?',
        answer:
          '월간 구독료 없이 스마트 노트, OCR 스캔, 가계부 분석, 생체 잠금 및 PDF·Excel·.cnot 내보내기 기능을 이용하실 수 있습니다.',
      },
      {
        question: '공식 앱은 어디서 다운로드하나요? Android와 iOS(App Store) 모두 지원하나요?',
        answer:
          'RyhStar Innovation의 Complete Notebook은 현재 Android용 Google Play 스토어(패키지 ID: com.ryhstarinnovation.complete_notebook)에서 정식 제공 중이며, iOS용 App Store 버전도 곧 출시될 예정입니다. 공식 웹사이트 ryhstarinnovation.web.id에서 최신 소식을 확인하실 수 있습니다.',
      },
    ],
  },
};
