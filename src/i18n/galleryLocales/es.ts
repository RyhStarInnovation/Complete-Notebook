import { MEDIA_REGISTRY } from '../../assets/mediaRegistry';
import type { GallerySectionCopy } from '../galleryTranslations';

export const esGallery: GallerySectionCopy = {
  kicker: 'Galería Oficial · Google Play y App Store (Próximamente)',
  heading: 'Pantallas Reales y Guía Completa de Funciones.',
  subheading:
    'Explora cada pantalla real de Complete Notebook: desde el Modo Oscuro Midnight-Blue y el Modo Claro hasta el Lienzo Personalizado con OCR, el Calendario con Alarmas, Analíticas Financieras y Copia en Google Drive.',
  zoomHint: 'Ampliar Pantalla',
  closePreview: 'Cerrar Vista',
  prevScreen: 'Anterior',
  nextScreen: 'Siguiente',
  heroDarkBtn: 'Modo Oscuro',
  heroLightBtn: 'Modo Claro',
  items: [
    {
      id: 'dark-mode',
      src: MEDIA_REGISTRY.darkModeScreen,
      badge: '01 · Modo Oscuro',
      title: 'Centro Principal Midnight-Blue Dark Mode',
      subtitle:
        'Organiza tu vida desde un panel unificado que reúne Cuaderno, Diario, Semanal, Mensual, Lista de Tareas, Ahorros, Gastos, Calendario, Calculadora y Alarmas.',
      bullets: [
        'Diez módulos de trabajo integrados (incluidas Alarmas de precisión)',
        'Filtro rápido por Todos, Productividad y Finanzas',
        'Cómodo para la vista de día y de noche',
      ],
    },
    {
      id: 'light-mode',
      src: MEDIA_REGISTRY.lightModeScreen,
      badge: '02 · Modo Claro',
      title: 'Interfaz Clean Light Mode Clara y Minimalista',
      subtitle:
        'Cambia al instante entre el Modo Oscuro Midnight-Blue y el Modo Claro con un solo toque en el icono superior.',
      bullets: [
        'Diseño limpio con iconos de categorías codificados por color',
        'Acceso directo a ajustes y bloqueo de seguridad',
        'Rendimiento rápido y ligero tanto offline como online',
      ],
    },
    {
      id: 'versatile-notebook',
      src: MEDIA_REGISTRY.versatileNotebookScreen,
      badge: '03 · Cuaderno Versátil',
      title: 'Notas Ilimitadas, Lienzo Personalizado y OCR',
      subtitle:
        'Crea notas sin límites con lienzo personalizado, elige color o imagen JPG de fondo, inserta fotos y escanea texto por cámara OCR con o sin conexión.',
      bullets: [
        'Color de fondo de nota e imagen JPG personalizada',
        'Barra completa de formato (Fuentes, Negrita, Subrayado, Código, Enlaces)',
        'Carpetas organizadas con búsqueda instantánea',
      ],
    },
    {
      id: 'plans-calendar',
      src: MEDIA_REGISTRY.plansCalendarScreen,
      badge: '04 · Planes y Calendario',
      title: 'Planificador, Calendario Inteligente y Alarmas',
      subtitle:
        'Programa notas diarias, semanales y mensuales, agenda eventos en el Calendario Inteligente y configura alarmas con tonos personalizados.',
      bullets: [
        'Carpetas estructuradas de notas Diarias, Semanales y Mensuales',
        'Listas de verificación interactivas por colores con exportación rápida',
        'Calendario inteligente con alarmas y tonos MP3 personalizados',
      ],
    },
    {
      id: 'financial-goals',
      src: MEDIA_REGISTRY.financialGoalsScreen,
      badge: '05 · Metas Financieras',
      title: 'Alcanza Tus Metas: Ahorros y Control de Gastos',
      subtitle:
        'Supervisa cada flujo de efectivo e impulsa tus ahorros con gráficos analíticos interactivos e informes claros.',
      bullets: [
        'Metas de ahorro, gestión de facturas y minicalculadora integrada',
        'Gráficos interactivos circulares, de barras y de líneas',
        'Historial completo y exportación rápida a PDF o Excel',
      ],
    },
    {
      id: 'privacy-backup',
      src: MEDIA_REGISTRY.privacyBackupScreen,
      badge: '06 · Privacidad y Copia',
      title: 'Notas Privadas Locales y Copia en Google Drive',
      subtitle:
        'Tus notas personales se guardan seguras en tu dispositivo y puedes respaldarlas o restaurarlas online directamente en tu Google Drive personal.',
      bullets: [
        'Copia y restauración online directa en tu cuenta personal de Google Drive',
        'Bloqueo multicapa con PIN de 6 dígitos, Patrón y Biometría',
        'Control total sobre tus registros locales y copias en la nube',
      ],
    },
  ],
};
