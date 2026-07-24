# Free resources feature — status

## Architecture (locked)

- **Middleware:** Clean URLs like `/free-resources` are listed in `PATHS_NEEDING_IMPLICIT_LOCALE_PREFIX` in [`src/middleware.ts`](../src/middleware.ts) so Next resolves `app/[locale]/free-resources` (same pattern as other locale-only pages that lack an `app/<segment>` shim).
- **Capture:** Next.js only — [`src/app/api/capture-lead/route.ts`](../src/app/api/capture-lead/route.ts). No growwise_backend Express route for this flow.
- **Database schema:** [`supabase/migrations/20260724000000_free_resources.sql`](../supabase/migrations/20260724000000_free_resources.sql) — apply it to the Supabase project used by the site before deployment.
- **Supabase client:** `@supabase/supabase-js` via [`src/lib/supabaseAdmin.ts`](../src/lib/supabaseAdmin.ts). **URL:** `NEXT_PUBLIC_SUPABASE_URL` **or** `SUPABASE_URL` (whichever is already on Vercel / matches the backend). **Key:** `SUPABASE_SERVICE_ROLE_KEY` (server-only).

## Data contract

- Catalog: [`src/data/free-resources.json`](../src/data/free-resources.json) + [`src/data/free-resources.ts`](../src/data/free-resources.ts). Each item has a stable **`id`** (URL-safe slug).
- **POST body:** `{ email, resourceId, consent, _hp }` — `resourceId` must match a catalog item and `consent` must be `true`. The server selects the canonical download URL.
- **Email in DB:** `email.trim().toLowerCase()` only (see migration comment block).

## `resource_downloads`

- **`resource_id`** stores the **slug** (`id`), not marketing display `name`.
- **`resource_category`** denormalized from JSON for filtering/analytics.

## Abuse protection

- Requests use the shared per-IP form rate limit, origin allowlist, 10 KB body limit, and a honeypot field.
- Database tracking is idempotent per lead/resource, so retries do not inflate download counts.

## QA checklist

- [ ] SQL migration applied in Supabase.
- [ ] Vercel env: Supabase URL (`NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`) + `SUPABASE_SERVICE_ROLE_KEY` (often already set for this project); Brevo or SMTP for mail.
- [ ] Open `/free-resources`, each tab filters cards.
- [ ] Download → email modal → submit → **“Check your email!”**; email received with Drive link.
- [ ] Invalid `resourceId` or missing consent returns 400.
- [ ] Rows in `free_resource_leads` and `resource_downloads` with correct `email` and `resource_id`.
