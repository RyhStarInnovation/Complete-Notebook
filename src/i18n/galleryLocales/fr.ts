import { MEDIA_REGISTRY } from '../../assets/mediaRegistry';
import type { GallerySectionCopy } from '../galleryTranslations';

export const frGallery: GallerySectionCopy = {
  kicker: 'Galerie Officielle · Google Play & App Store (Bientôt disponible)',
  heading: 'Captures Officielles & Guide Complet des Fonctions.',
  subheading:
    'Découvrez chaque écran réel de Complete Notebook : du Mode Sombre Midnight-Blue et Mode Clair au Canevas Personnalisé avec OCR, Calendrier & Alarmes, Suivi d’Épargne et Sauvegarde Google Drive.',
  zoomHint: 'Agrandir l’Écran',
  closePreview: 'Fermer l’Aperçu',
  prevScreen: 'Précédent',
  nextScreen: 'Suivant',
  heroDarkBtn: 'Mode Sombre',
  heroLightBtn: 'Mode Clair',
  items: [
    {
      id: 'dark-mode',
      src: MEDIA_REGISTRY.darkModeScreen,
      badge: '01 · Mode Sombre',
      title: 'Accueil Signature Midnight-Blue Dark Mode',
      subtitle:
        'Organisez votre quotidien depuis un tableau de bord unifié regroupant Carnet, Quotidien, Hebdomadaire, Mensuel, Checklist, Épargne, Dépenses, Calendrier, Calculatrice et Alarmes.',
      bullets: [
        'Dix modules intégrés (y compris les rappels d’Alarme)',
        'Filtre instantané Tout, Productivité et Finances',
        'Confort visuel optimal de jour comme de nuit',
      ],
    },
    {
      id: 'light-mode',
      src: MEDIA_REGISTRY.lightModeScreen,
      badge: '02 · Mode Clair',
      title: 'Interface Clean Light Mode Claire et Épurée',
      subtitle:
        'Basculez instantanément entre le Mode Sombre Midnight-Blue et le Mode Clair d’un simple geste sur l’icône supérieure.',
      bullets: [
        'Présentation nette avec icônes colorées par catégorie',
        'Accès direct aux réglages et au verrouillage de sécurité',
        'Réactivité fluide aussi bien hors-ligne qu’en ligne',
      ],
    },
    {
      id: 'versatile-notebook',
      src: MEDIA_REGISTRY.versatileNotebookScreen,
      badge: '03 · Carnet Polyvalent',
      title: 'Notes Illimitées, Canevas Personnalisé & OCR',
      subtitle:
        'Créez des notes sans limites avec canevas personnalisé, choisissez une couleur ou image JPG de fond, insérez des photos et numérisez du texte par OCR hors-ligne ou en ligne.',
      bullets: [
        'Couleurs d’arrière-plan et fond photo JPG personnalisé',
        'Barre d’outils complète (Polices, Gras, Souligné, Code, Liens)',
        'Dossiers structurés avec recherche instantanée',
      ],
    },
    {
      id: 'plans-calendar',
      src: MEDIA_REGISTRY.plansCalendarScreen,
      badge: '04 · Plans & Calendrier',
      title: 'Planificateur, Calendrier Intelligent & Alarmes',
      subtitle:
        'Planifiez vos notes quotidiennes, hebdomadaires et mensuelles, suivez votre Calendrier Intelligent et programmez des alarmes avec sonneries personnalisées.',
      bullets: [
        'Dossiers dédiés Quotidien, Hebdomadaire et Mensuel',
        'Checklists colorées interactives avec exportation rapide',
        'Calendrier intelligent associé aux alarmes MP3 personnalisées',
      ],
    },
    {
      id: 'financial-goals',
      src: MEDIA_REGISTRY.financialGoalsScreen,
      badge: '05 · Objectifs Financiers',
      title: 'Atteignez Vos Objectifs : Épargne & Dépenses',
      subtitle:
        'Suivez chaque flux de trésorerie et développez votre épargne grâce à des graphiques analytiques interactifs.',
      bullets: [
        'Objectifs d’épargne, suivi des factures et mini-calculatrice intégrée',
        'Graphiques interactifs circulaires, en barres et en courbes',
        'Historique complet et export rapide en PDF ou Excel',
      ],
    },
    {
      id: 'privacy-backup',
      src: MEDIA_REGISTRY.privacyBackupScreen,
      badge: '06 · Confidentialité & Drive',
      title: 'Notes Locales Privées & Sauvegarde Google Drive',
      subtitle:
        'Vos notes personnelles restent en sécurité sur votre appareil et peuvent être sauvegardées ou restaurées en ligne sur votre Google Drive personnel.',
      bullets: [
        'Sauvegarde et restauration en ligne sur votre Google Drive personnel',
        'Verrouillage multicouche : Code PIN à 6 chiffres, Schéma et Biométrie',
        'Contrôle complet de vos données locales et archives cloud',
      ],
    },
  ],
};
