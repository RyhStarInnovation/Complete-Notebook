/**
 * Reference Security Rules Specification Test Suite
 * Verifies that all "Dirty Dozen" adversarial payloads in security_spec.md
 * (including multilingual map & locale bounds) evaluate to PERMISSION_DENIED against firestore.rules.
 */

export interface AdversarialCase {
  id: number;
  name: string;
  auth: null | { uid: string; email: string; email_verified: boolean };
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  payload?: Record<string, unknown>;
  expected: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const DIRTY_DOZEN_CASES: AdversarialCase[] = [
  {
    id: 1,
    name: 'Unauthenticated create on app_updates',
    auth: null,
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: { title: 'Fake Update', published: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Authenticated non-admin create on app_updates',
    auth: { uid: 'user_99', email: 'intruder@example.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: { title: 'Fake Update', published: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Unverified admin email spoof attack',
    auth: { uid: 'spoof_1', email: 'ryhstarr@gmail.com', email_verified: false },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: { title: 'Spoofed Release', published: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow field or unsupported locale key injection in translations map',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: {
      title: 'Valid Title',
      translations: {
        xx: { title: 'Unsupported Lang', summary: 'Should be rejected by hasOnly' },
      },
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Identity spoofing via mismatched authorUid',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: { authorUid: 'other_uid' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Immutable createdAt mutation during update',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'update',
    path: '/app_updates/upd_001',
    payload: { createdAt: '1999-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Forged client timestamp on create',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: { createdAt: '2099-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Document ID poisoning with invalid characters',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/bad$id!@#',
    payload: { title: 'Valid Title' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Oversized localized summary exceeding 3000 characters',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: {
      translations: {
        en: { title: 'Valid English Title', summary: 'x'.repeat(3005) },
      },
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Invalid defaultLang outside supported 8 ISO codes',
    auth: { uid: 'dev_1', email: 'ryhstarr@gmail.com', email_verified: true },
    operation: 'create',
    path: '/app_updates/upd_001',
    payload: { defaultLang: 'zz' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Public get/list on unpublished draft update',
    auth: null,
    operation: 'get',
    path: '/app_updates/draft_001',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Self-assigned admin privilege escalation',
    auth: { uid: 'user_99', email: 'intruder@example.com', email_verified: true },
    operation: 'create',
    path: '/admins/user_99',
    payload: { grantedByUid: 'user_99', label: 'Self Admin' },
    expected: 'PERMISSION_DENIED',
  },
];
