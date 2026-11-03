/**
 * Centralized Official Media Registry (PNG / JPG / MP4)
 * Complete Notebook by RyhStar Innovation
 *
 * Uses Vite's BASE_URL (`./` in production builds, `/` in dev) so all images
 * and video load reliably on both root domains and GitHub Pages subpaths.
 */
const rawBase = import.meta.env?.BASE_URL || './';
const normalizedBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const resolvePublicAsset = (relativePath: string): string =>
  `${normalizedBase}${relativePath.replace(/^\/+/, '')}`;

export const MEDIA_REGISTRY = {
  brandEmblem: resolvePublicAsset('assets/icons/app-icon.png'),
  darkModeScreen: resolvePublicAsset(
    'images/screenshots/transparent/01-dark-mode-transparent.png'
  ),
  lightModeScreen: resolvePublicAsset(
    'images/screenshots/transparent/02-light-mode-transparent.png'
  ),
  versatileNotebookScreen: resolvePublicAsset(
    'images/screenshots/transparent/03-versatile-notebook-transparent.png'
  ),
  plansCalendarScreen: resolvePublicAsset(
    'images/screenshots/transparent/04-plans-calendar-transparent.png'
  ),
  financialGoalsScreen: resolvePublicAsset(
    'images/screenshots/transparent/05-financial-goals-transparent.png'
  ),
  privacyBackupScreen: resolvePublicAsset(
    'images/screenshots/transparent/06-privacy-backup-transparent.png'
  ),
  officialPromoVideo: resolvePublicAsset(
    'assets/videos/complete-notebook-3d-promo.mp4'
  ),
  liveUiPhoneVideo: resolvePublicAsset(
    'assets/videos/complete-notebook-live-ui.mp4'
  ),
} as const;

export type MediaSlotKey = keyof typeof MEDIA_REGISTRY;
