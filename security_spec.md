# Security Specification – Complete Notebook Official Website

## 1. Data Invariants
1. **Default Deny**: Every unlisted path in Firestore is unconditionally denied for both reads and writes.
2. **Public Visibility Boundary (`app_updates`)**: Unauthenticated global visitors may `get` or `list` documents in `/app_updates/{updateId}` ONLY when `resource.data.published == true`. Unpublished drafts are strictly hidden from non-admins.
3. **Zero PII Exposure**: Neither `/app_updates/{updateId}` nor `/admins/{adminId}` stores email addresses, phone numbers, or physical addresses, eliminating public PII leaks.
4. **Verified Developer Admin Write Gate**: Creating, updating, or deleting `/app_updates/{updateId}` or `/admins/{adminId}` requires an authenticated user with `request.auth.token.email_verified == true` AND (`request.auth.token.email == 'ryhstarr@gmail.com'` OR existence of `/admins/$(request.auth.uid)`).
5. **Identity & Temporal Integrity**:
   - `authorUid` on `AppUpdate` must equal `request.auth.uid` on creation and is immutable on update.
   - `createdAt` must equal `request.time` on creation and is immutable on update.
   - `updatedAt` must equal `request.time` on both creation and update.
6. **Strict Schema, Multilingual Map & Volumetric Guards**:
   - Primary `title` (3–140 chars) and `summary` (10–3000 chars) are always required as universal fallback fields.
   - Optional `defaultLang` must belong to the 8 supported ISO codes (`['id', 'en', 'es', 'fr', 'ja', 'ar', 'ru', 'ko']`).
   - Optional `translations` must be a native Firestore `map` whose keys are strictly restricted via `hasOnly` to `['id', 'en', 'es', 'fr', 'ja', 'ar', 'ru', 'ko']`, and every present locale value must be a `map` with strictly `['title', 'summary']` adhering to `title` (3–140 chars) and `summary` (10–3000 chars).

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unauthenticated Write**: Anonymous attacker attempts `create` on `/app_updates/upd_1` -> `PERMISSION_DENIED`.
2. **Non-Admin Authenticated Write**: Signed-in verified user `attacker@example.com` attempts `create` on `/app_updates/upd_1` -> `PERMISSION_DENIED`.
3. **Unverified Admin Email Spoof**: Signed-in user with `email == 'ryhstarr@gmail.com'` and `email_verified == false` attempts `create` on `/app_updates/upd_1` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection (Root or Nested Locale)**: Verified admin sends valid `AppUpdate` payload plus `"isSuperVerified": true` or `translations.xx` / `translations.en.extra` -> `PERMISSION_DENIED`.
5. **Identity Spoofing (`authorUid`)**: Verified admin creates `AppUpdate` with `authorUid: "someone_else"` -> `PERMISSION_DENIED`.
6. **Immutable Field Mutation (`createdAt` / `authorUid`)**: Verified admin updates `AppUpdate` modifying `createdAt` or `authorUid` -> `PERMISSION_DENIED`.
7. **Forged Client Timestamp**: Verified admin creates `AppUpdate` with a past/future `createdAt` instead of `serverTimestamp()` (`request.time`) -> `PERMISSION_DENIED`.
8. **ID Poisoning Attack**: Verified admin attempts to create `/app_updates/invalid$id!@#` or >128 char ID -> `PERMISSION_DENIED`.
9. **Denial-of-Wallet Oversized String (Primary or Localized)**: Verified admin submits `summary` or `translations.ja.summary` with 10,000 characters (> 3000 max) -> `PERMISSION_DENIED`.
10. **Invalid Enum Category or Unsupported `defaultLang`**: Verified admin submits `category: "hacked"` or `defaultLang: "zz"` -> `PERMISSION_DENIED`.
11. **Draft Scraping via List Query**: Unauthenticated visitor queries `/app_updates` without `where('published', '==', true)` when drafts exist -> `PERMISSION_DENIED`.
12. **Self-Privilege Escalation (`admins`)**: Authenticated non-admin attempts to create `/admins/{theirUid}` -> `PERMISSION_DENIED`.
