# Batch 1 SEO Dev Validation Report — PR #346

**Date:** 2026-06-12  
**PR:** [growwise360/growwise_newui#346](https://github.com/growwise360/growwise_newui/pull/346) (`dev` → `main`)  
**Branch tested:** `fix/seo-audit-remaining` @ `a9ec4c3`  
**Dev runtime:** `http://localhost:3000` (Next.js 16.2.0 Turbopack)  
**Note:** Vercel preview returned `401` (auth-protected). Validation ran on local dev with Batch 1 code.

---

## Executive Summary

**Recommendation: Merge with follow-up**

All Batch 1 SEO merge-gate criteria pass on dev runtime:

- Real hard 404 for unknown routes (not homepage soft-404)
- Valid sitemap index + child urlsets, no duplicate URLs
- robots.txt rules correct
- Broken internal links from Batch 1 scope removed
- Canonical metadata correct (verified on production for non-www)
- OG image route serves real `image/webp` on dev (production still broken pre-merge)
- llms.txt renders correctly with priority links

**Follow-up items (non-blocking):**

- `/resources/readiness-checklist` returns middleware **404** (not 301) — canonical dedup works but no redirect for link equity
- CSR pages have `SeoPageFallback` SSR text; full content still client-rendered (Batch 2/3)
- Production still has pre-merge regressions (soft 404, OG image HTML, flat sitemap urlset) — expected until deploy

---

## Commands / Tests Run

```bash
# Unit tests (30 passed)
cd growwise_newui
npm test -- --testPathPatterns="robots.seo|sitemapData|seo-jsonld-route-audit" --ci

# Dev server
npx next dev --turbo -p 3000

# Automated validation
docs/validation/batch1-seo-20260612/run-validation.sh

# Python supplemental checks (content, schema, sitemap analysis, production spot-check)
python3 (inline scripts — see evidence files)

# Static link audit
grep -rn "academic/reading|math-tutoring-dublin-ca/elementary" src/ public/
```

---

## URLs Manually Checked

| URL | Environment |
|-----|-------------|
| `https://www.growwiseschool.org/` | Live (www redirect) |
| `https://growwiseschool.org/` | Live (canonical spot-check) |
| `https://growwiseschool.org/readinesschecklist` | Live (canonical) |
| `https://growwiseschool.org/sitemap.xml` | Live (pre-merge baseline) |
| `https://growwiseschool.org/og-image.jpg` | Live (pre-merge baseline) |
| `http://localhost:3000/random-test-url` | Dev |
| `http://localhost:3000/abc123` | Dev |
| `http://localhost:3000/academic/not-real-page` | Dev |
| `http://localhost:3000/sitemap.xml` | Dev |
| `http://localhost:3000/sitemap-pages.xml` | Dev |
| `http://localhost:3000/sitemap-blogs.xml` | Dev |
| `http://localhost:3000/robots.txt` | Dev |
| `http://localhost:3000/llms.txt` | Dev |
| `http://localhost:3000/og-image.jpg` | Dev |
| `http://localhost:3000/readinesschecklist` | Dev |
| `http://localhost:3000/resources/readiness-checklist` | Dev |
| `http://localhost:3000/` | Dev |
| `http://localhost:3000/academic/english` | Dev |
| `http://localhost:3000/workshop-calendar` | Dev |
| `http://localhost:3000/resources/tutoring-dublin-ca` | Dev |
| `http://localhost:3000/enroll` | Dev |
| `http://localhost:3000/game-dev` | Dev |
| `http://localhost:3000/camps/academic-summer-programs-dublin-ca` | Dev |
| `http://localhost:3000/camps/winter/calendar` | Dev |

---

## Screenshots

Playwright screenshot capture was attempted but failed (browsers not installed in environment). **Terminal/HTML evidence files substitute per plan requirement** ("Screenshot or terminal output").

Evidence directory: `docs/validation/batch1-seo-20260612/`

---

## Files Changed by Batch 1 (26 files)

See PR #346 file list. Key SEO files:

- `src/middleware.ts` — hard 404 + www redirect
- `src/app/sitemap.xml/route.ts`, `sitemap-pages.xml`, `sitemap-blogs.xml` — sitemap index split
- `src/lib/seo/sitemapData.ts` — pages/blogs split, `buildPagesPaths`/`buildBlogPaths`
- `src/app/robots.ts`, `src/app/llms.txt/route.ts`, `src/app/og-image.jpg/route.ts`
- `src/lib/seo/metadataConfig.ts` — title/description shortening
- `src/components/seo/SeoPageFallback.tsx` + enroll/game-dev/camps pages
- `src/components/ElementaryMathPage.tsx` — link fix
- `public/api/mock/en/header.json`, `footer.json` — nav link fixes

---

## Final Validation Table

| Audit Item | Dev Result | Evidence | Fixed in Batch 1? | Follow-up Needed |
| ---------- | ---------- | -------- | ----------------- | ---------------- |
| www 403 stale check | **STALE / PASS** | `www-redirect-chain.txt` — 301 → `growwiseschool.org`, final 200 | N/A (pre-existing infra) | None |
| Real 404 `/random-test-url` | **PASS** | `404-checks.txt` — HTTP 404, `Page not found`, no homepage title | Yes — middleware | None |
| Real 404 `/abc123` | **PASS** | `404-checks.txt` | Yes | None |
| Real 404 `/academic/not-real-page` | **PASS** | `404-checks.txt` | Yes | None |
| `/academic/reading` link removed | **PASS** | `static-link-audit.txt` — ZERO matches; `internal-link-rendered.txt` — ZERO deprecated hrefs | Yes — header/nav | None |
| `/math-tutoring-dublin-ca/elementary` removed | **PASS** | `static-link-audit.txt`; fix in `ElementaryMathPage.tsx` → `/academic/math/elementary` | Yes | None |
| Sitemap valid index | **PASS** | `sitemap-index.xml` — `<sitemapindex>`; `sitemap-analysis.txt` | Yes — replaced flat urlset (prod still flat pre-merge) | Deploy |
| Sitemap child urlsets | **PASS** | `sitemap-pages.xml`, `sitemap-blogs.xml` — `<urlset>`; 59 + 41 URLs | Yes | None |
| `/resources` not duplicated | **PASS** | `sitemap-analysis.txt` — hub in pages only, not blogs | Yes | None |
| Sitemap non-www domain | **PASS (prod)** | Production locs: `https://growwiseschool.org/...`; dev uses localhost (expected) | Yes | None |
| No duplicate sitemap URLs | **PASS** | `sitemap-analysis.txt` — duplicate URLs: none | Yes | None |
| Key pages in sitemap | **PASS** | coding, game-dev, academic-summer, readinesschecklist, workshop-calendar — all FOUND | Yes | None |
| robots.txt correct | **PASS** | `robots.txt`, `robots-headers.txt` — allow `/`, `/_next/image?*`, blog pagination; disallow legacy locales, cart | Yes | None |
| Marketing paths not blocked | **PASS** | Unit test `robots.seo.test.ts` + manual review | Yes | None |
| llms.txt renders | **PASS** | `llms.txt` — 200 text/plain; priority links present, non-www URLs | Yes — PR #343 | None |
| llms.txt no deprecated paths | **PASS** | `llms.txt` content review | Yes | None |
| Metadata homepage | **PASS** | `metadata-rendered.txt` — shortened description rendered | Yes | None |
| Metadata `/readinesschecklist` | **PASS** | Title: "Free Math & Reading Checklist \| GrowWise Dublin CA" | Yes | None |
| Metadata `/academic/english` | **PASS** | Shortened description rendered | Yes | None |
| Metadata `/workshop-calendar` | **PASS** | Title + description present (layout metadata added) | Yes | None |
| Metadata `/resources/tutoring-dublin-ca` | **PASS** | Shortened title/description | Yes | None |
| Canonical non-www (prod) | **PASS** | Live: `https://growwiseschool.org/readinesschecklist` | Yes | None |
| OG image 200 + image type | **PASS (dev)** | `og-image-validation.txt` — 200, `image/webp`, magic `52494646` (RIFF) | Yes — new route | Prod still HTML pre-merge |
| OG image in metadata | **PASS** | `metadata-rendered.txt` — `og:image` → `/og-image.jpg` | Yes | None |
| `/readinesschecklist` canonical | **PASS** | `readiness-redirect.txt` — 200, canonical `/readinesschecklist` | Yes | None |
| `/resources/readiness-checklist` | **404 (not 301)** | `readiness-redirect.txt` — middleware hard 404 | Partial — dedup via 404 | Consider 301 in Batch 2 |
| Sitemap has only short readiness path | **PASS** | `sitemap-analysis.txt` — readinesschecklist yes, long path no | Yes | None |
| `/enroll` rendered content | **FIXED (partial)** | `content-check.txt` — 2 H1s, 4958 words; SeoPageFallback sr-only in HTML | Yes — SeoPageFallback | Full SSR optional Batch 2 |
| `/game-dev` rendered content | **FIXED** | `content-check.txt` — H1 present, 4782 words | Yes — SeoPageFallback + existing components | None |
| `/camps/academic-summer-*` | **FIXED** | `content-check.txt` — 2 H1s, 7482 words | Yes — SeoPageFallback | None |
| `/camps/winter/calendar` | **FIXED** | `content-check.txt` — H1 present, 5429 words; client refactor | Yes — WinterCampCalendarClient split | None |
| JSON-LD valid | **PASS** | `jsonld-extract.txt` — all scripts parse; unit tests 30/30 pass | Mostly pre-existing; no regressions | None |
| Production soft 404 (pre-merge) | **Not yet deployed** | Live `/random-test-url` → 200 | Yes in code | Deploy fixes |
| Production OG image (pre-merge) | **Broken on prod** | Live `/og-image.jpg` → `text/html` | Yes in code | Deploy fixes |

---

## Items Confirmed Fixed (Batch 1)

1. Hard 404 for unknown public paths (middleware `KNOWN_PUBLIC_PATHS`)
2. Sitemap split into valid `<sitemapindex>` + two `<urlset>` child sitemaps
3. `/resources` hub deduplicated across sitemaps
4. robots.txt consolidated with correct allow/disallow rules
5. llms.txt AEO crawl hints endpoint
6. OG image route serving real WebP bytes
7. Broken links `/academic/reading` and `/math-tutoring-dublin-ca/elementary` removed
8. Metadata title/description shortening on 10+ pages
9. SeoPageFallback SSR text on CSR-heavy pages (enroll, game-dev, camps)
10. Winter calendar page refactor with crawlable fallback content

---

## Items Confirmed Stale / False Positive

1. **www 403** — Live `www.growwiseschool.org` returns `301` → `https://growwiseschool.org/` (not 403). Old audit item is stale.

---

## Items Not Included in Batch 1

1. Full SSR hydration for `/enroll` (fallback only, main form still CSR)
2. Explicit 301 redirect from `/resources/readiness-checklist` → `/readinesschecklist`
3. AI-bot-specific robots rules (default `*` allow applies)
4. PR #344 Future Skills certification navigation (merged in PR #346 but outside SEO Batch 1 scope)

---

## Items Requiring Batch 2/3 Work

1. Add 301 redirect for `/resources/readiness-checklist` → `/readinesschecklist` (currently middleware 404)
2. Deeper SSR/content batch for enroll and other CSR-heavy conversion pages
3. Post-deploy GSC recrawl after merge (per `docs/seo-post-deploy-checklist.md`)

---

## Merge Recommendation

### **Merge with follow-up**

**Rationale:**

| Merge gate criterion | Status |
|---------------------|--------|
| Real 404 behavior works | PASS on dev |
| Sitemap valid | PASS on dev |
| robots.txt correct | PASS |
| Broken internal links fixed | PASS |
| Canonical URLs correct | PASS (prod verified non-www) |
| No new crawl/indexing regression | PASS — improvements only |
| Rendered verification supports fixes | PASS |

**Non-blocking follow-ups:**

- `/resources/readiness-checklist` should get a 301 (currently 404) — acceptable for dedup but not ideal for inbound links
- Production will not reflect fixes until deploy; post-deploy re-run `scripts/seo-verify.mjs` against `growwiseschool.org`

**Do not merge if:** N/A — no blocking failures found on dev runtime.

---

## Evidence File Index

| File | Contents |
|------|----------|
| `unit-tests.txt` | 30/30 Jest tests passed |
| `www-redirect-chain.txt` | Live www → non-www 301 chain |
| `404-checks.txt` | Hard 404 validation (3 paths) |
| `sitemap-index.xml` | Rendered sitemap index |
| `sitemap-pages.xml` | Pages child sitemap (59 URLs) |
| `sitemap-blogs.xml` | Blogs child sitemap (41 URLs) |
| `sitemap-analysis.txt` | Structure + duplicate + key page checks |
| `robots.txt` | Rendered robots rules |
| `llms.txt` | Rendered llms.txt body |
| `og-image-validation.txt` | OG image status + content-type |
| `metadata-rendered.txt` | Rendered title/meta/canonical/OG for 9 pages |
| `content-check.txt` | H1 + word count for 4 flagged pages |
| `readiness-redirect.txt` | Canonical vs duplicate path behavior |
| `jsonld-extract.txt` | JSON-LD parse validation |
| `static-link-audit.txt` | Zero deprecated path references |
| `internal-link-rendered.txt` | Rendered href audit (46 unique links) |
| `run-validation.sh` | Reproducible validation script |
