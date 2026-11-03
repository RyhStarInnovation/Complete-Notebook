import { SupportedLanguage } from './translations';

export interface VideoChapterCopy {
  id: 'light' | 'dark';
  timeLabel: string;
  seekSeconds: number;
  title: string;
  desc: string;
}

export interface VideoShowcaseCopy {
  navLabel: string;
  heroLiveUiTab: string;
  heroQuickWatch: string;
  mode3dTab: string;
  modeLiveUiTab: string;
  kicker: string;
  heading: string;
  subheading: string;
  liveUiKicker: string;
  liveUiHeading: string;
  liveUiSubheading: string;
  playLabel: string;
  pauseLabel: string;
  unmuteLabel: string;
  muteLabel: string;
  replayLabel: string;
  expandLabel: string;
  closeLabel: string;
  jumpLightLabel: string;
  jumpDarkLabel: string;
  exploreScreensCta: string;
  chapters: [VideoChapterCopy, VideoChapterCopy];
  liveUiChapters: [VideoChapterCopy, VideoChapterCopy];
}

const idCopy: VideoShowcaseCopy = {
  navLabel: 'Cuplikan 3D & UI',
  heroLiveUiTab: 'UI',
  heroQuickWatch: 'Tonton Cuplikan 3D & UI',
  mode3dTab: 'Animasi 3D Resmi',
  modeLiveUiTab: 'Tampilan UI',
  kicker: 'Cuplikan Animasi 3D Resmi · Complete Notebook',
  heading: 'Satu Ruang Kerja Terpadu dalam Transisi Light & Midnight-Blue Dark.',
  subheading:
    'Saksikan pratinjau gerak 3D antarmuka Complete Notebook: mulai dari tampilan Clean Light Mode yang jernih hingga bertransformasi mulus ke tema khas Midnight-Blue Dark Mode untuk mengelola catatan, produktivitas, dan keuangan dalam satu genggaman.',
  liveUiKicker: 'Pratinjau Antarmuka UI · Complete Notebook',
  liveUiHeading: 'Interaksi Nyata Widget Waktu, Saldo Keuangan & Tema Gelap.',
  liveUiSubheading:
    'Lihat langsung rekaman antarmuka ponsel Complete Notebook tanpa latar belakang: menggeser kartu Create Notes, jam digital real-time yang terus berdetak, ringkasan Total Balance & Tabungan, hingga perpindahan instan ke Midnight-Blue Dark Mode.',
  playLabel: 'Putar',
  pauseLabel: 'Jeda',
  unmuteLabel: 'Suara',
  muteLabel: 'Bisukan',
  replayLabel: 'Ulangi',
  expandLabel: 'Perbesar UI',
  closeLabel: 'Tutup Video',
  jumpLightLabel: 'Light UI',
  jumpDarkLabel: 'Dark UI',
  exploreScreensCta: 'Lihat Detail 6 Layar Aplikasi',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: 'Clean Light Mode yang Jernih & Terstruktur',
      desc: 'Akses instan ke kategori Semua, Produktivitas, dan Keuangan dengan ikon modul berwarna tegas di siang hari.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Transformasi ke Midnight-Blue Dark Mode',
      desc: 'Transisi satu ketukan menuju kanvas gelap elegan yang nyaman di mata untuk mencatat dan merencanakan kapan saja.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'Mode Terang: Jam Real-Time & Kartu Saldo',
      desc: 'Menampilkan slider Create Notes, jam digital aktif (Current Date & Time), serta ringkasan Total Balance & Tabungan.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'Mode Gelap Midnight-Blue Interaktif',
      desc: 'Sentuhan ikon bulan mengubah seluruh antarmuka dan kartu finansial ke tema gelap khas yang elegan dan fokus.',
    },
  ],
};

const enCopy: VideoShowcaseCopy = {
  navLabel: '3D & UI Showcase',
  heroLiveUiTab: 'UI',
  heroQuickWatch: 'Watch 3D & UI Showcase',
  mode3dTab: 'Official 3D Motion',
  modeLiveUiTab: 'Live UI',
  kicker: 'Official 3D Motion Showcase · Complete Notebook',
  heading: 'One Unified Workspace Across Clean Light & Midnight-Blue Dark.',
  subheading:
    'Experience Complete Notebook in 3D motion: seamlessly transitioning from crisp Clean Light Mode into our signature Midnight-Blue Dark Mode to organize notes, productivity schedules, and personal finances in one place.',
  liveUiKicker: 'Frameless Live UI Showcase · Complete Notebook',
  liveUiHeading: 'Real-Time Clock, Balance Analytics & Instant Dark Theme in Action.',
  liveUiSubheading:
    'Watch the live Complete Notebook smartphone interface floating cleanly without background distractions—sliding across Create Notes, a live ticking digital clock, Total Balance & Savings cards, and an instant switch to Midnight-Blue Dark Mode.',
  playLabel: 'Play',
  pauseLabel: 'Pause',
  unmuteLabel: 'Sound On',
  muteLabel: 'Mute',
  replayLabel: 'Replay',
  expandLabel: 'Expand UI',
  closeLabel: 'Close Video',
  jumpLightLabel: 'Light UI',
  jumpDarkLabel: 'Dark UI',
  exploreScreensCta: 'Explore All 6 App Screens',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: 'Crisp & Structured Clean Light Mode',
      desc: 'Instant filtering across All, Productivity, and Finance modules with high-clarity visual hierarchy.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Seamless Shift to Midnight-Blue Dark Mode',
      desc: 'One-tap transition into a calm, eye-friendly dark workspace built for day and night focus.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'Light UI: Live Clock & Balance Cards',
      desc: 'Smooth header carousel featuring Create Notes, live ticking Current Date & Time, and Total Balance overview.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'Interactive Midnight-Blue Dark UI',
      desc: 'One tap on the theme switch transforms every module and financial widget into calm Midnight-Blue Dark Mode.',
    },
  ],
};

const esCopy: VideoShowcaseCopy = {
  navLabel: 'Vista 3D y UI',
  heroLiveUiTab: 'UI',
  heroQuickWatch: 'Ver Vista 3D y UI',
  mode3dTab: 'Animación 3D Oficial',
  modeLiveUiTab: 'Interfaz UI',
  kicker: 'Presentación 3D Oficial · Complete Notebook',
  heading: 'Un Espacio Unificado en Modo Claro y Midnight-Blue Oscuro.',
  subheading:
    'Descubre Complete Notebook en movimiento 3D: pasando con fluidez del modo claro nítido al exclusivo tema Midnight-Blue Dark Mode para organizar notas, agenda y finanzas personales.',
  liveUiKicker: 'Vista de Interfaz UI en Vivo · Complete Notebook',
  liveUiHeading: 'Reloj en Tiempo Real, Tarjeta de Saldo y Tema Oscuro al Instante.',
  liveUiSubheading:
    'Observa la interfaz real del teléfono de Complete Notebook sin bordes de fondo: deslizando notas, reloj digital en vivo, resumen de saldo y ahorros, y cambio instantáneo a Midnight-Blue Dark Mode.',
  playLabel: 'Reproducir',
  pauseLabel: 'Pausar',
  unmuteLabel: 'Sonido',
  muteLabel: 'Silenciar',
  replayLabel: 'Repetir',
  expandLabel: 'Ampliar UI',
  closeLabel: 'Cerrar video',
  jumpLightLabel: 'UI Clara',
  jumpDarkLabel: 'UI Oscura',
  exploreScreensCta: 'Ver las 6 pantallas',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: 'Clean Light Mode Nítido y Ordenado',
      desc: 'Acceso inmediato a Todos, Productividad y Finanzas con iconos claros y organizados.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Transición a Midnight-Blue Dark Mode',
      desc: 'Cambio instantáneo con un toque hacia una interfaz oscura cómoda para cualquier hora.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'Modo Claro: Reloj en Vivo y Saldo',
      desc: 'Carrusel interactivo con notas rápidas, hora actual en tiempo real y resumen visual de ahorros y gastos.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'Modo Oscuro Midnight-Blue en Acción',
      desc: 'Transición fluida de toda la pantalla y las tarjetas financieras al tema oscuro Midnight-Blue.',
    },
  ],
};

const frCopy: VideoShowcaseCopy = {
  navLabel: 'Aperçu 3D & UI',
  heroLiveUiTab: 'UI',
  heroQuickWatch: 'Voir l’Aperçu 3D & UI',
  mode3dTab: 'Animation 3D Officielle',
  modeLiveUiTab: 'Interface UI',
  kicker: 'Présentation 3D Officielle · Complete Notebook',
  heading: 'Un Espace Unifié en Mode Clair et Midnight-Blue Sombre.',
  subheading:
    'Découvrez Complete Notebook en mouvement 3D : une transition fluide du mode clair épuré vers notre thème signature Midnight-Blue Dark Mode pour gérer notes, productivité et finances.',
  liveUiKicker: 'Aperçu Direct de l’Interface UI · Complete Notebook',
  liveUiHeading: 'Horloge Temps Réel, Carte de Solde & Mode Sombre Instantané.',
  liveUiSubheading:
    'Découvrez l’interface réelle du téléphone Complete Notebook détourée sans fond blanc : carrousel Create Notes, horloge numérique en direct, solde d’épargne et passage immédiat au mode sombre Midnight-Blue.',
  playLabel: 'Lire',
  pauseLabel: 'Pause',
  unmuteLabel: 'Son',
  muteLabel: 'Muet',
  replayLabel: 'Rejouer',
  expandLabel: 'Agrandir UI',
  closeLabel: 'Fermer la vidéo',
  jumpLightLabel: 'UI Claire',
  jumpDarkLabel: 'UI Sombre',
  exploreScreensCta: 'Explorer les 6 écrans',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: 'Mode Clair Net et Structuré',
      desc: 'Filtres rapides Tout, Productivité et Finances avec une lisibilité immédiate.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Passage au Mode Midnight-Blue Sombre',
      desc: 'Basculez en un geste vers une interface sombre reposante de jour comme de nuit.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'Mode Clair : Horloge & Solde en Direct',
      desc: 'Navigation fluide entre création de notes, horloge numérique active et aperçu financier Total Balance.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'Interface Midnight-Blue Sombre Interactive',
      desc: 'Un seul geste transforme tous les modules et widgets financiers dans le thème sombre Midnight-Blue.',
    },
  ],
};

export const VIDEO_SHOWCASE_BASE: Record<'id' | 'en' | 'es' | 'fr', VideoShowcaseCopy> = {
  id: idCopy,
  en: enCopy,
  es: esCopy,
  fr: frCopy,
};

const jaCopy: VideoShowcaseCopy = {
  navLabel: '3D＆UIプレビュー',
  heroLiveUiTab: 'UI',
  heroQuickWatch: '3D＆UIプレビューを見る',
  mode3dTab: '公式3Dモーション',
  modeLiveUiTab: 'ライブUI',
  kicker: '公式3Dモーション紹介 · Complete Notebook',
  heading: 'ライトモードとMidnight-Blueダークモードを自在に行き来。',
  subheading:
    'Complete Notebookの3Dモーションプレビュー：鮮明なライトモードから象徴的なMidnight-Blueダークモードへ滑らかに切り替わり、ノート・予定・家計を一画面で整理できます。',
  liveUiKicker: 'フレームレスUIプレビュー · Complete Notebook',
  liveUiHeading: 'リアルタイム時計・残高カード・ダークモード切り替えを実機映像で。',
  liveUiSubheading:
    '背景なしのスマートフォンのみを切り出したライブUI映像：ノート作成カード、秒単位で動くデジタル時計、総残高＆貯蓄カード、そしてMidnight-Blueダークモードへの瞬時の切り替えをご覧いただけます。',
  playLabel: '再生',
  pauseLabel: '一時停止',
  unmuteLabel: '音声オン',
  muteLabel: 'ミュート',
  replayLabel: 'もう一度',
  expandLabel: 'UIを拡大',
  closeLabel: '閉じる',
  jumpLightLabel: 'ライトUI',
  jumpDarkLabel: 'ダークUI',
  exploreScreensCta: '6つの公式画面を見る',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: '視認性に優れたClean Light Mode',
      desc: 'すべて・生産性・家計のフィルターと整理されたモジュールアイコンに素早くアクセス。',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Midnight-Blue Dark Modeへの切り替え',
      desc: 'ワンタップで目に優しいダークキャンバスへ移行し、昼夜を問わず快適に作業できます。',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'ライトUI：リアルタイム時計＆残高カード',
      desc: 'Create Notes、現在日時のデジタル時計、Total Balance＆貯蓄ウィジェットのスムーズな切り替え。',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'Midnight-BlueダークUIのライブ動作',
      desc: 'テーマボタンひとつで全モジュールと家計カードが洗練されたダークモードへ瞬時に変化します。',
    },
  ],
};

const arCopy: VideoShowcaseCopy = {
  navLabel: 'عرض 3D و UI',
  heroLiveUiTab: 'UI',
  heroQuickWatch: 'شاهد عرض 3D و UI',
  mode3dTab: 'العرض ثلاثي الأبعاد',
  modeLiveUiTab: 'واجهة UI الحية',
  kicker: 'عرض حركي رسمي ثلاثي الأبعاد · Complete Notebook',
  heading: 'مساحة عمل موحدة بين الوضع الفاتح و Midnight-Blue الداكن.',
  subheading:
    'شاهد Complete Notebook بحركة ثلاثية الأبعاد: انتقال سلس من الوضع الفاتح النقي إلى الوضع الداكن المميز Midnight-Blue لتنظيم الملاحظات والمهام والشؤون المالية في مكان واحد.',
  liveUiKicker: 'معاينة واجهة UI الحية بدون خلفية · Complete Notebook',
  liveUiHeading: 'ساعة فورية وبطاقة الرصيد المالي والوضع الداكن في عرض حي.',
  liveUiSubheading:
    'شاهد واجهة هاتف Complete Notebook الحقيقية مباشرة بدون خلفية بيضاء: التمرير السلس بين إنشاء الملاحظات، الساعة الرقمية الحية، بطاقة إجمالي الرصيد والمدخرات، والتحول الفوري إلى الوضع الداكن Midnight-Blue.',
  playLabel: 'تشغيل',
  pauseLabel: 'إيقاف',
  unmuteLabel: 'الصوت',
  muteLabel: 'كتم',
  replayLabel: 'إعادة',
  expandLabel: 'تكبير UI',
  closeLabel: 'إغلاق الفيديو',
  jumpLightLabel: 'واجهة فاتحة',
  jumpDarkLabel: 'واجهة داكنة',
  exploreScreensCta: 'استكشف شاشات التطبيق الست',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: 'الوضع الفاتح النقي والمنظم',
      desc: 'وصول فوري إلى فئات الكل والإنتاجية والمالية مع أيقونات واضحة وسريعة.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'الانتقال السلس إلى Midnight-Blue الداكن',
      desc: 'تحول بلمسة واحدة إلى واجهة داكنة مريحة للعين للتركيز ليلا ونهارا.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'الوضع الفاتح: الساعة الحية وبطاقة الرصيد',
      desc: 'عرض تفاعلي لشريط الملاحظات والساعة الرقمية الفورية وملخص الرصيد والمدخرات.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'الوضع الداكن Midnight-Blue التفاعلي',
      desc: 'ضغطة واحدة تحوّل جميع الأدوات وبطاقات المالية إلى المظهر الداكن الأنيق.',
    },
  ],
};

const ruCopy: VideoShowcaseCopy = {
  navLabel: '3D и UI обзор',
  heroLiveUiTab: 'UI',
  heroQuickWatch: 'Смотреть 3D и UI обзор',
  mode3dTab: '3D-анимация',
  modeLiveUiTab: 'Живой UI',
  kicker: 'Официальный 3D-обзор · Complete Notebook',
  heading: 'Единое пространство в светлой теме и Midnight-Blue Dark.',
  subheading:
    'Оцените Complete Notebook в 3D-движении: плавный переход от чёткой светлой темы к фирменной Midnight-Blue Dark Mode для заметок, планирования и личных финансов.',
  liveUiKicker: 'Живая демонстрация UI · Complete Notebook',
  liveUiHeading: 'Часы в реальном времени, баланс и мгновенная тёмная тема.',
  liveUiSubheading:
    'Посмотрите реальную работу интерфейса смартфона Complete Notebook без белого фона: слайдер заметок, живые цифровые часы, карточка общего баланса и накоплений, а также мгновенное переключение в Midnight-Blue Dark Mode.',
  playLabel: 'Пуск',
  pauseLabel: 'Пауза',
  unmuteLabel: 'Звук',
  muteLabel: 'Без звука',
  replayLabel: 'Повтор',
  expandLabel: 'Увеличить UI',
  closeLabel: 'Закрыть видео',
  jumpLightLabel: 'Светлый UI',
  jumpDarkLabel: 'Тёмный UI',
  exploreScreensCta: 'Смотреть все 6 экранов',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: 'Чёткая светлая тема Clean Light Mode',
      desc: 'Мгновенная фильтрация разделов «Все», «Продуктивность» и «Финансы».',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Переход в Midnight-Blue Dark Mode',
      desc: 'Переключение в одно касание на комфортный тёмный интерфейс для работы днём и ночью.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: 'Светлый режим: живые часы и баланс',
      desc: 'Плавная прокрутка карточек Create Notes, текущего времени и сводки сбережений и расходов.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: 'Интерактивный Midnight-Blue Dark UI',
      desc: 'Мгновенное переключение всех модулей и финансового виджета в фирменную тёмную тему.',
    },
  ],
};

const koCopy: VideoShowcaseCopy = {
  navLabel: '3D 및 UI 프리뷰',
  heroLiveUiTab: 'UI',
  heroQuickWatch: '3D 및 UI 프리뷰 보기',
  mode3dTab: '공식 3D 모션',
  modeLiveUiTab: '라이브 UI',
  kicker: '공식 3D 모션 쇼케이스 · Complete Notebook',
  heading: '라이트 모드와 Midnight-Blue 다크 모드를 넘나드는 통합 워크스페이스.',
  subheading:
    'Complete Notebook의 3D 모션 프리뷰를 확인하세요. 깔끔한 라이트 모드에서 시그니처 Midnight-Blue 다크 모드로 매끄럽게 전환되며 메모, 일정, 가계부를 한곳에서 관리합니다.',
  liveUiKicker: '배경 없는 라이브 UI 프리뷰 · Complete Notebook',
  liveUiHeading: '실시간 시계, 총 잔액 카드, 즉시 전환되는 다크 모드를 생생하게.',
  liveUiSubheading:
    '흰색 배경 없이 스마트폰 화면만 깔끔하게 분리된 실제 UI 영상을 확인하세요. 노트 생성 카드, 실시간 디지털 시계, 총 잔액 및 저축 요약, 그리고 Midnight-Blue 다크 모드로의 즉각적인 전환을 보여줍니다.',
  playLabel: '재생',
  pauseLabel: '일시정지',
  unmuteLabel: '소리 켜기',
  muteLabel: '음소거',
  replayLabel: '다시 보기',
  expandLabel: 'UI 크게 보기',
  closeLabel: '닫기',
  jumpLightLabel: '라이트 UI',
  jumpDarkLabel: '다크 UI',
  exploreScreensCta: '6개 공식 화면 살펴보기',
  chapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:01 – 0:05',
      seekSeconds: 0.8,
      title: '선명하고 정돈된 Clean Light Mode',
      desc: '전체, 생산성, 금융 필터와 직관적인 모듈 아이콘에 즉시 접근합니다.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:06 – 0:09',
      seekSeconds: 5.6,
      title: 'Midnight-Blue Dark Mode로의 전환',
      desc: '원탭 전환으로 눈이 편안한 다크 캔버스에서 밤낮으로 쾌적하게 기록하세요.',
    },
  ],
  liveUiChapters: [
    {
      id: 'light',
      timeLabel: '01 · 0:00 – 0:13',
      seekSeconds: 0.5,
      title: '라이트 UI: 실시간 시계 & 잔액 카드',
      desc: 'Create Notes, 실시간 날짜·시계 위젯, 총 잔액 및 저축 현황 카드가 부드럽게 슬라이드됩니다.',
    },
    {
      id: 'dark',
      timeLabel: '02 · 0:14 – 0:27',
      seekSeconds: 14.0,
      title: '인터랙티브 Midnight-Blue 다크 UI',
      desc: '테마 아이콘 한 번의 터치로 모든 모듈과 금융 카드가 세련된 다크 모드로 전환됩니다.',
    },
  ],
};

export const VIDEO_SHOWCASE_TRANSLATIONS: Record<SupportedLanguage, VideoShowcaseCopy> = {
  ...VIDEO_SHOWCASE_BASE,
  ja: jaCopy,
  ar: arCopy,
  ru: ruCopy,
  ko: koCopy,
};
