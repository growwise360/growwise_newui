# SEO validation (post-deploy)

## FAQ / JSON-LD (Duplicate field FAQPage)

After deploying FAQ/JSON-LD fixes:

1. **Google Search Console** — open URL Inspection for `https://www.growwiseschool.org/`, run **Validate fix** on the “Duplicate field FAQPage” issue.
2. **Rich Results Test** — confirm one `FAQPage` on `/` and spot-check `/courses/math` plus one resource article.
3. **Automated checks** — run `npm test -- --testPathPatterns=countJsonLd|homeFaq` and `npm run test:e2e:smoke` (includes `@critical` FAQPage guard).

---

## “Crawled – currently not indexed” (GSC)

This is **not** the same as “Page with redirect.” Google fetched the URL but chose not to show it in search (yet).

### Do not worry (no fix needed)

| URL pattern | Why |
|-------------|-----|
| `/en/...` (e.g. `/en/contact`, `/en/courses/sat-prep`) | Legacy paths **301** to prefix-free English URLs (`localePrefix: 'never'`). Google should not index `/en/...`. |
| `sitemap.xml` | Sitemaps are for discovery, not search results. |
| `api.growwiseschool.org` | API host should not rank. Block on the API service (`robots.txt` disallow or `noindex`). |

Do **not** make `/en/...` return 200 — that creates duplicate URLs.

### Monitor / nudge (camp landings)

These are real marketing pages and may need time or a one-time indexing request:

- `https://www.growwiseschool.org/camps/summer-reading-writing-dublin-ca`
- `https://www.growwiseschool.org/camps/summer-math-foundations-dublin-ca`

**After deploy — GSC URL Inspection (manual):**

1. Inspect each URL above on the **www** property.
2. Confirm: HTTP **200**, canonical matches the same URL, no `/en` in canonical, robots allow indexing.
3. Click **Request indexing** once per URL (do not spam).
4. Confirm the hub links to both pages: `/camps/academic-summer-programs-dublin-ca`.

**Escalate only if** (after 4–6 weeks on canonical www URLs) URL Inspection shows `noindex`, soft 404, or duplicate canonical always pointing only at the hub.

### Host consistency

- Production `NEXT_PUBLIC_SITE_URL` should be `https://www.growwiseschool.org` (matches `getCanonicalSiteUrl()` default).
- Prefer **www** in Vercel domain redirects (apex and http → https www).

### Automated checks

```bash
npm test -- --testPathPatterns=countJsonLd|homeFaq
npm run test:e2e -- e2e/specs/academic-summer-programs.spec.ts --grep "canonical"
```

---

## “Excluded by noindex tag” (legacy URLs)

### Do not worry if intentional

| URL | Why GSC shows noindex | Action |
|-----|----------------------|--------|
| `/math-courses-in-dublin-ca-growwise` (+ trailing `/`) | Old slug hit `[...catchAll]` → `notFound()` → Next.js injects `noindex` (often HTTP 200 soft 404) | **301** to `/courses/math` via [`legacy-path-redirects.ts`](../src/lib/seo/legacy-path-redirects.ts) |

After deploy, URL Inspection should show **301** to `/courses/math` and the legacy URL should drop out of this report.

### Automated checks

```bash
npm run test:e2e -- e2e/specs/legacy-path-redirects.spec.ts
```
