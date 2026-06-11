# GrowWise School — SEO Checklist (Enforced)

**Read this before adding routes, blogs, resources, metadata, sitemap entries, or conversion CTAs.**

Full architecture hub: [`docs/SEO.md`](../docs/SEO.md)  
Operational runbooks: [`docs/seo-post-deploy-checklist.md`](../docs/seo-post-deploy-checklist.md), [`docs/seo-jsonld-validation.md`](../docs/seo-jsonld-validation.md)

Violations = incorrect solution. If a constraint cannot be met, STOP and explain.

---

## 1. Business goals

| Priority | Path | Role |
|----------|------|------|
| **Primary** | `/book-assessment` | Free assessment booking — top conversion goal |
| **Secondary** | `/enroll` | Enrollment form (marketing) or Phase3 payment when `?program=` is set |
| **Program hubs** | `/academic`, `/steam/*`, `/camps/summer`, `/programs` | Intent-matched next step from content |

Every **indexable** page must link to at least one conversion action (assessment, enroll, or a relevant program hub).

---

## 2. New marketing page checklist

Use this for any new page under `src/app/[locale]/`:

- [ ] **Route location:** Page lives under `src/app/[locale]/{path}/page.tsx` only. Never duplicate at root `app/{path}/page.tsx` — that shadows the locale route (see `/enroll` lesson).
- [ ] **Metadata:** Add entry to `src/lib/seo/metadataConfig.ts` **or** page-level `generateMetadata` using `getCanonicalSiteUrl()` + `absoluteSiteUrl()` from `@/lib/publicPath`.
- [ ] **Title / description:** Title ≤ 60 characters. Description ≤ 150 characters. No pricing in meta descriptions.
- [ ] **Headings:** One `h1` matching page intent. Logical `h2` → `h3` hierarchy.
- [ ] **Sitemap:** If indexable, add to `src/lib/seo/sitemapData.ts` (`corePages`, camp slugs via `getCampSlugs()`, or the appropriate array).
- [ ] **JSON-LD:** Reuse helpers in `src/lib/seo/structuredData.ts` and components under `src/components/schema/`. FAQ visible text must match FAQPage JSON-LD exactly.
- [ ] **Internal links:** Page is linked **from** at least one hub (nav, footer, programs, camps, academic, or a related parent page). No orphan indexable URLs.
- [ ] **Conversion:** Primary CTA visible without excessive scroll on mobile. Use `publicPath(path, locale)` for locale-aware links — never hardcode `/en/...`.
- [ ] **Images:** `next/image` with `alt`, `sizes`, and appropriate `priority`/`loading`.

---

## 3. New blog post checklist (`/growwise-blogs/*`)

- [ ] Create `src/app/[locale]/growwise-blogs/{slug}/page.tsx`
- [ ] Add slug path to `blogPostPaths` in `src/lib/seo/sitemapData.ts`
- [ ] `generateMetadata`: title, description, canonical, OG image
- [ ] Article JSON-LD via `generateArticleSchema()` in `structuredData.ts`
- [ ] Bottom CTA: use `BlogPostConversionSection` — **never** enroll-only bottom bands

### Program mapping by article intent

| Intent | `programHref` | `programLabel` |
|--------|---------------|----------------|
| Coding / Python / Java / AI / career | `/future-skills` | Explore Future Ready Skills Pathways |
| Game dev / Roblox | `/steam/game-development` | Explore Game Development |
| Summer camps | `/camps/summer` | View Summer Camp Programs |
| Academic / learning gaps / focus | `/academic` | Explore Academic Programs |
| Assessment-led | `/book-assessment` | Book Free Assessment |
| Math self-check | `/self-check` | Take the Math Self-Check |

Example:

```tsx
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection';

<BlogPostConversionSection
  locale={locale}
  programHref="/future-skills"
  programLabel="Explore Future Ready Skills Pathways"
/>
```

Every blog conversion band includes: **program CTA** + **Book Free Assessment** + **Or enroll now** (tertiary link).

---

## 4. New resource article checklist (`/resources/*`)

- [ ] Add path to `RESOURCE_ARTICLE_PATHS` in `src/data/resources/index.ts` — sitemap picks it up automatically
- [ ] Follow existing resource page pattern (structured sections, FAQ, related links)
- [ ] Link from `/resources` hub and footer when published
- [ ] Metadata + Article/FAQ JSON-LD matching visible content

---

## 5. New camp SEO page checklist (`/camps/{slug}`)

- [ ] Camp data in `src/lib/camps/` (see `get-camp-page.ts`, `CAMP_LANDING_PAGES`)
- [ ] Slug included via `getCampSlugs()` in sitemap
- [ ] Linked from `/camps/summer` (`FeaturedCampGuidesSection`) and/or `/camps` hub
- [ ] Camp-specific metadata via `src/lib/seo/camp-metadata.ts` where applicable

---

## 6. Route & indexing rules

| Rule | Detail |
|------|--------|
| **Robots** | Single source: `src/app/robots.ts`. Do **not** add `public/robots.txt`. |
| **Sitemap** | Index at `/sitemap.xml` → `sitemap-pages.xml` + `sitemap-blogs.xml`. Logic in `sitemapData.ts`. |
| **Locale URLs** | `localePrefix: 'never'` — canonical URLs have no `/en/` prefix. Legacy `/en/*` 301 to prefix-free paths via `middleware.ts`. |
| **Canonical domain** | Use `getCanonicalSiteUrl()` in `src/lib/seo/siteUrl.ts`. Never hand-build `www.` vs non-www inconsistently. |
| **Protected routes** | Never rename/move/delete routes in `rules.md` §4 (checkout/success, camps/summer, coding, courses/math, steam pages, ad landings). |
| **URL policy** | No deletions, 301 redirects, noindex, or content removals without GSC/analytics validation. Cross-link duplicate surfaces instead. |

### `/enroll` routing (do not regress)

- `/enroll` → marketing enrollment form (locale layout with header/footer)
- `/enroll?program=...` → Phase3 payment stepper (`EnrollPhase3Page`)
- Phase3 steps live under `src/app/enroll/steps/`; page component at `src/components/enroll/EnrollPhase3Page.tsx`

---

## 7. Two content systems (do not conflate)

| System | Path | Standards |
|--------|------|-----------|
| **Resources** | `/resources/*` | Modern hub-and-spoke; structured metadata; footer/nav links |
| **Legacy blogs** | `/growwise-blogs/*` | Must still meet metadata, sitemap, and `BlogPostConversionSection` standards |

Parallel program URLs (`/coding`, `/game-dev` vs `/steam/*`) both remain indexable — cross-link between them; do not delete without GSC gate.

---

## 8. Required tests

Run after SEO-affecting changes:

```bash
cd growwise_newui
npm test -- --testPathPatterns=robots.seo|sitemapData|metadata-length
npm run build
```

When touching camps:

```bash
npm run test:camps
```

When touching enrollment routes:

```bash
npm run test:e2e -- e2e/specs/enroll-phase3-stepper.spec.ts --project=chromium
```

Defer full mobile-404 / bulk SEO E2E to CI unless the user requests locally.

---

## 9. SEO self-review (add to `rules.md` §15)

Before finishing any SEO-related change, verify:

- [ ] Sitemap entry added if page is indexable
- [ ] `metadataConfig` or `generateMetadata` with canonical URL
- [ ] Conversion path includes `/book-assessment` where appropriate
- [ ] No root-level `app/{route}/page.tsx` shadowing `[locale]/{route}`
- [ ] Blog bottom CTA uses `BlogPostConversionSection` (not enroll-only)
- [ ] Internal link from at least one hub page or nav/footer
- [ ] Robots/sitemap logic unchanged unless explicitly approved
- [ ] Founding year remains 2024 in any org/schema copy

State **PASS** or **FAIL** for SEO items alongside the main self-review in `rules.md` §15.
