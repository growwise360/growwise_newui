# GrowWise SEO Implementation Rules

This file is the required SEO guardrail for all future GrowWise website changes.

Before changing routes, navigation, metadata, sitemap, robots.txt, redirects, page content, schema, internal links, or program pages, check this file first.

**Supporting docs:** Architecture hub → [`docs/SEO.md`](../docs/SEO.md)  
Post-deploy runbooks → [`docs/seo-post-deploy-checklist.md`](../docs/seo-post-deploy-checklist.md), [`docs/seo-jsonld-validation.md`](../docs/seo-jsonld-validation.md)

Violations = incorrect solution. If a constraint cannot be met, STOP and explain.

---

## 1. Current SEO Strategy

GrowWise SEO priority is:

1. Local academic intent
   * Math tutoring
   * English / reading / writing
   * SAT / PSAT
   * IM1 / IM2 readiness
   * Dublin, Pleasanton, San Ramon, Tri-Valley

2. Certification-based Future Skills
   * Design & Creative Media
   * Python Certification
   * AI & Data / Artificial Intelligence
   * AI Entrepreneur

3. Search-driven parent content
   * Readiness checklists
   * Comparison articles
   * Parent guides
   * Grade/pathway preparation articles

Do not prioritize Roblox, Scratch, Unity, or Game Development unless specifically requested. Keep existing Game Development pages live if already present, but do not promote them in main navigation or SEO priority work.

---

## 2. Domain and Canonical Rules

Canonical domain:

```txt
https://growwiseschool.org
```

Rules:

* Use non-www canonical URLs.
* Do not create canonical URLs with `www`.
* Do not create duplicate URLs for the same page.
* Keep canonical tags consistent with sitemap URLs.
* Do not change Vercel/DNS settings from code.
* Do not treat old audit data as current truth unless reproduced live.

Expected behavior:

```txt
https://www.growwiseschool.org → https://growwiseschool.org
```

If live redirect works, old "www 403" findings are stale/false positives.

---

## 3. Legacy Locale URL Rules

The site is currently English-only.

Retired locale prefixes:

```txt
/en
/hi
/zh
/es
```

Expected behavior:

* Legacy locale URLs should not return live duplicate English content under the prefixed URL.
* Valid old locale paths may redirect to prefix-free English URLs.
* Dead old locale paths may redirect to a dead English path and then return hard 404.
* Do not add locale-prefixed URLs to sitemap.
* Do not internally link to locale-prefixed URLs.
* Do not create new `/en`, `/hi`, `/zh`, or `/es` pages unless multilingual strategy is intentionally reopened.

Correct examples:

```txt
/zh/programs → /programs
/hi/courses/math → /academic/math
/hi/dead-old-page → /dead-old-page → 404
```

Do not force all legacy locale URLs to direct 404 if redirect strategy already exists.

Implementation: [`src/middleware.ts`](../src/middleware.ts) (`redirectLegacyLocalePrefix`), [`src/lib/seo/legacy-path-redirects.ts`](../src/lib/seo/legacy-path-redirects.ts).

---

## 4. Sitemap Rules

Sitemap must be clean, valid, and canonical.

Rules:

* `/sitemap.xml` must use valid XML.
* If it is a sitemap index, use `<sitemapindex>`.
* If it is a URL sitemap, use `<urlset>`.
* Do not duplicate `/resources`.
* Do not include retired locale-prefixed URLs.
* Do not include non-canonical duplicate URLs.
* Do not include URLs that redirect unless intentionally required.
* Do not include 404 URLs.
* Use canonical non-www absolute URLs.
* Include important program, resource, blog, and certification pages.

Required validation after sitemap changes:

```txt
/sitemap.xml
/sitemap-pages.xml, if applicable
/sitemap-blogs.xml, if applicable
```

Check:

* correct XML format
* no duplicates
* no retired locale prefixes
* no dead URLs
* canonical non-www URLs only

Implementation: [`src/lib/seo/sitemapData.ts`](../src/lib/seo/sitemapData.ts), [`src/app/sitemap-index.xml/route.ts`](../src/app/sitemap-index.xml/route.ts).

---

## 5. Robots.txt Rules

Robots.txt must protect crawlability.

Rules:

* Do not block important program pages.
* Do not block important resources or blogs.
* Do not block sitemap access.
* Do not block optimized images if Google needs them.
* Do not block AI crawlers unless business direction changes.
* Do not use robots.txt as a removal tool.
* Do not block URLs that Google needs to crawl in order to see redirects.

Important:

If old URLs are intentionally redirected, Google may need to crawl the old URL to process the redirect. Do not block legacy redirect paths without verifying the SEO impact.

Retired locale prefixes (`/en/`, `/hi/`, `/zh/`, `/es/`) are **not** disallowed in [`src/app/robots.ts`](../src/app/robots.ts). Middleware redirects them to prefix-free English URLs (§3); blocking them in robots.txt would prevent Googlebot from discovering those redirects during normal crawl.

Required validation:

```txt
/robots.txt
```

Check:

* sitemap URL is present
* important pages are crawlable
* image URLs are crawlable if used in metadata/content
* blog pagination/discovery is not unintentionally blocked

Single source: `src/app/robots.ts`. Do **not** add `public/robots.txt`.

---

## 6. 404 and Soft 404 Rules

Missing pages must return real 404.

Rules:

* Unknown URLs must not return homepage content.
* Unknown URLs must not return status 200.
* Unknown URLs must show a real not-found page.
* Add `noindex,follow` to the not-found page if supported.
* Do not mask broken links with homepage fallback.
* Do not redirect random unknown URLs to homepage.

Required test URLs:

```txt
/random-test-url
/abc123
/academic/not-real-page
```

Expected:

```txt
HTTP 404
Not homepage content
Clear not-found page
```

Implementation: [`src/middleware.ts`](../src/middleware.ts) (`hard404UnknownPublicPath`, `notFoundResponse`).

---

## 7. Redirect Rules

Redirects must be intentional and minimal.

Allowed redirects:

* `www` to non-www
* legacy locale prefix to prefix-free English path
* old known page to closest relevant current page
* duplicate resource URL to canonical resource URL
* renamed route to new route

Avoid:

* redirecting unrelated old pages to homepage
* long redirect chains
* redirect loops
* redirecting all 404s automatically
* redirecting low-value dead slugs without a relevant destination

Important duplicate to verify:

```txt
/readinesschecklist
/resources/readiness-checklist
```

There must be one canonical version. **Current state:** canonical is `/readinesschecklist` ([`metadataConfig.ts`](../src/lib/seo/metadataConfig.ts)); `/resources/readiness-checklist` still exists — resolve with redirect or consolidation in a separate approved PR.

---

## 8. Metadata Rules

Metadata must be verified from rendered output, not only source code.

For changed pages, check:

* title
* meta description
* canonical URL
* OG title
* OG description
* OG image
* robots meta

Guidelines:

* Title should be clear, search-intent aligned, and not unnecessarily long.
* Meta description should be accurate and parent-search friendly.
* Do not keyword-stuff.
* Do not create duplicate metadata across pages.
* Use local terms naturally only where relevant.
* Canonical must be non-www.
* OG image must return real image content, not HTML.

Required OG image check:

```txt
/og-image.jpg
```

Route: [`src/app/og-image.jpg`](../src/app/og-image.jpg). Default in [`metadataConfig.ts`](../src/lib/seo/metadataConfig.ts) and [`metadata.ts`](../src/lib/seo/metadata.ts).

Expected:

```txt
HTTP 200
Content-Type: image/jpeg, image/png, or image/webp
Actual image response, not HTML
```

---

## 9. Internal Linking Rules

Internal links should support priority pages.

Rules:

* Do not link to retired locale-prefixed URLs.
* Do not link to removed routes.
* Do not link to duplicate URLs.
* Do not link to redirecting URLs when the final canonical URL is known.
* Use contextual links from blogs/resources to program pages.
* Use hub pages to support money pages.
* Keep footer useful but do not rely only on footer links.
* Avoid footer link bloat as the main SEO structure.

Priority internal link destinations:

```txt
/
/academic/math
/academic/english
/courses/sat-prep
/future-skills
/future-skills/design-creative-media
/future-skills/python-certification
/future-skills/ai-machine-learning
/future-skills/ai-entrepreneurship
/readinesschecklist
/book-assessment
```

Every search-driven article should link to:

1. one main program page
2. one related article/resource
3. one assessment or CTA page
4. one local/service page if relevant

Use `publicPath(path, locale)` from [`src/lib/publicPath.ts`](../src/lib/publicPath.ts) — never hardcode `/en/...`.

---

## 10. Navigation Rules

Current navigation direction:

Replace generic STEAM positioning with certification-forward positioning.

Preferred menu label:

```txt
Coding & Certifications
```

Short fallback:

```txt
Certifications
```

Primary dropdown should prioritize:

1. Design & Creative Media
2. Python Certification
3. AI & Data / Artificial Intelligence
4. AI Entrepreneur

Do not show these as priority dropdown items unless requested:

* Game Development
* Roblox
* Scratch
* Unity
* generic STEAM Programs wording

Do not delete old Game Development pages automatically. Keep them live unless a separate removal/redirect plan is approved.

---

## 11. Certification Wording Rules

Current certification status:

* GrowWise is approved for Certiport.
* GrowWise is in process for PCEP/OpenEDG.
* Do not claim PCEP/OpenEDG approval yet.

Allowed wording:

```txt
GrowWise is approved for Certiport.
Certiport certification pathways.
Certiport-aligned certification programs.
Adobe certification pathway.
Python certification pathway.
Artificial intelligence certification pathway.
Entrepreneurship certification pathway.
Certification readiness.
Exam preparation.
```

For PCEP/OpenEDG, allowed wording only:

```txt
PCEP/OpenEDG pathway in progress.
Python certification pathway expanding toward PCEP.
OpenEDG/PCEP approval in process.
```

Do not say:

```txt
GrowWise is approved for PCEP.
OpenEDG approved academy.
Official PCEP testing center.
PCEP testing center.
```

unless later explicitly verified.

---

## 12. Future Skills Page Rules

Priority Future Skills pages:

```txt
/future-skills
/future-skills/design-creative-media
/future-skills/python-certification
/future-skills/ai-machine-learning
/future-skills/ai-entrepreneurship
```

If route names change, preserve SEO intent and add proper redirects.

Future Skills page content should emphasize:

* certification pathways
* project-based learning
* portfolio readiness
* middle and high school suitability
* responsible AI use
* parent-friendly outcomes
* clear CTA

Preferred CTAs:

```txt
Explore Certification Pathways
Book a Free Assessment
Start Certification Readiness
```

---

## 13. Content and Article SEO Rules

All new articles must be search-driven.

Do not publish generic blogs.

Each article must have:

* clear primary search intent
* clear parent/student audience
* one main target query
* one supporting query cluster
* internal links to relevant money pages
* useful headings
* direct-answer sections
* FAQ if appropriate
* no filler content

Priority article clusters:

1. Python certification for students
2. Certiport vs PCEP / Python pathway
3. Adobe certification for students
4. AI certification for students
5. AI classes for middle/high school
6. Math tutoring Dublin CA
7. IM1 readiness
8. IM2 readiness
9. SAT/PSAT preparation timeline
10. Middle school word problem struggles
11. Writing improvement for middle school
12. Reading comprehension support
13. Dublin / Pleasanton / San Ramon academic pathways

Do not create thin duplicate city pages. Local pages must have unique, useful local content.

---

## 14. Schema Rules

Schema must remain valid.

Current useful schema types:

* EducationalOrganization
* LocalBusiness
* WebSite
* BlogPosting
* FAQPage
* BreadcrumbList
* Event, when there is a real event/workshop

Rules:

* Do not add fake schema.
* Do not add FAQ schema unless FAQs are visible on the page.
* Do not add Event schema unless event details are real and visible.
* Do not break existing JSON-LD.
* Validate schema after global changes.
* Use BreadcrumbList on camps/resources/program pages where appropriate.

Helpers: [`src/lib/seo/structuredData.ts`](../src/lib/seo/structuredData.ts), [`src/components/schema/`](../src/components/schema/).

---

## 15. Rendered Content Rules

Important pages must have meaningful rendered content.

Do not rely on nearly empty initial HTML for priority SEO pages.

Pages to watch:

```txt
/enroll
/camps/academic-summer-programs-dublin-ca
/camps/winter/calendar
/game-dev
```

If a page is priority, it should have:

* rendered H1
* meaningful crawlable content
* clear metadata
* internal links
* CTA
* no empty shell behavior

If a page is not priority, mark it for later instead of making random changes.

---

## 16. AEO / AI Visibility Rules

AEO priority:

* clear answers
* FAQs
* comparison content
* parent guides
* llms.txt
* strong internal links to key resources

Rules:

* Keep `/llms.txt` updated.
* Include priority program/resource links.
* Do not feature deprecated Game Development pages as primary AI visibility links.
* Keep AI bots allowed unless business direction changes.
* Write clear, direct answers in resource content.
* Surface comparison articles because AI engines often use them.

Important llms.txt links should include:

```txt
/future-skills
/future-skills/python-certification
/future-skills/design-creative-media
/future-skills/ai-machine-learning
/future-skills/ai-entrepreneurship
/academic/math
/academic/english
/readinesschecklist
```

Route: [`src/app/llms.txt`](../src/app/llms.txt).

---

## 17. PR Validation Rules

Every SEO-related PR must include validation evidence.

Required validation table:

| Check | Result | Evidence | Follow-up |
| ----- | ------ | -------- | --------- |

Minimum checks:

```txt
/robots.txt
/sitemap.xml
/llms.txt
/random-test-url
/abc123
/academic/not-real-page
/og-image.jpg
```

For changed pages, also check:

* rendered title
* rendered description
* canonical URL
* OG tags
* status code
* content-type
* H1
* internal links
* schema if touched

Screenshots are useful, but screenshots alone are not enough.

SEO proof requires:

* HTTP status code
* response content-type
* rendered HTML check
* canonical URL
* metadata output
* link checker result where relevant

---

## 18. Do Not Do These

Do not:

* change Vercel/DNS from code
* fix stale audit findings without live/repo validation
* create duplicate city pages
* keyword-stuff Dublin/Pleasanton/San Ramon
* add locale-prefixed pages
* add pages to sitemap that redirect or 404
* redirect unrelated old pages to homepage
* remove existing pages without redirect plan
* claim PCEP/OpenEDG approval
* promote Game Development in main nav
* use generic STEAM positioning as the primary strategy
* publish generic non-search-driven articles
* rely only on source code instead of rendered output
* merge SEO changes without validation evidence

---

## 19. Merge Gate

Do not merge SEO-related PRs unless:

* sitemap is valid
* robots.txt is correct
* unknown routes return real 404
* canonicals are non-www
* no retired locale URLs are added to sitemap
* no broken internal links are introduced
* metadata is verified from rendered output
* OG image path returns a real image
* changed schema parses correctly
* priority pages remain crawlable
* validation table is included (§17)

---

## 20. Current GSC Targets

Current baseline from June 2026:

```txt
~66 clicks / 7 days
~2.01K impressions / 7 days
~3.3% CTR
~10.9 average position
```

30-day target after Batch 1 + Batch 2 + search-driven articles:

```txt
500–650 clicks/month
15K–20K impressions/month
CTR above 4%
Average position under 10
```

Track weekly:

* clicks
* impressions
* CTR
* average position
* indexed pages
* queries ranking positions 5–20
* pages with high impressions and low CTR

Do not judge SEO from one-day movement. Use 7-day and 28-day comparisons.
