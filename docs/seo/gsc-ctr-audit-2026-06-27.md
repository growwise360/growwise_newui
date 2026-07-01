# GSC CTR Audit - 2026-06-27

Source: Google Search Console export `growwiseschool.org-Performance-on-Search-2026-06-27`

Scope:
- Search type: Web
- Date range: Last 3 months
- Sheets reviewed: Chart, Queries, Pages, Countries, Devices, Search appearance, Filters

## Role And Process

Role: SEO audit lead first, implementation engineer second.

Process:
1. Establish pre-audit baseline from all workbook tabs.
2. Group issues by type: CTR, ranking, relevance, canonical/domain, and device.
3. Implement changes in small batches.
4. Validate after each batch.
5. Record post-implementation checks and GSC monitoring windows.

## Pre-Audit Baseline

Overall from device totals:
- Clicks: 337
- Impressions: 12,152
- Estimated CTR: 2.77%

Device split:
- Mobile: 198 clicks, 3,306 impressions, 5.99% CTR, 7.63 average position
- Desktop: 139 clicks, 8,762 impressions, 1.59% CTR, 11.87 average position
- Tablet: 0 clicks, 84 impressions, 0% CTR, 8.21 average position

Country split:
- United States: 304 clicks, 9,670 impressions, 3.14% CTR, 10.84 average position
- India: 19 clicks, 301 impressions, 6.31% CTR, 8.06 average position
- Long-tail non-US impressions exist, but US is the commercial priority.

Search appearance:
- Translated results: 12 impressions, 0 clicks. Not a priority.

Trend from Chart tab:
- Impressions increased sharply in the later part of the period.
- Clicks increased more slowly, which explains the lower aggregate CTR.
- Average position often sits around page 1 bottom / page 2 top, so ranking work matters as much as snippet work.

## Issue Buckets

### CTR Issues

Pages or queries with useful positions but weak clicks.

Examples:
- `/resources/when-to-start-sat-prep`: 1,177 combined impressions, 10 clicks, sub-1% CTR, average position around 8-10.
- `/resources/reading-fluency-vs-comprehension`: 340 combined impressions, 0 clicks, average position around 9.
- `/resources/tutoring-dublin-ca`: 414 combined impressions, 1 click, average position around 10-12.
- Some local "best places..." queries rank around positions 3-6 but have 0 clicks.

### Ranking Issues

Pages with meaningful impressions but average position too low for strong CTR.

Examples:
- `/courses/sat-prep`: 676 combined impressions, 3 clicks, average position around 17.
- `/resources/python-vs-scratch`: 673 impressions, 1 click, average position around 10.
- `/resources/careless-math-mistakes`: 655 combined impressions, 2 clicks, average position around 11.
- `/camps/summer`: 1,201 combined impressions, 28 clicks, average position ranges 8.7-12.1.

### Relevance Issues

Queries that generate impressions but are not clearly commercial or relevant.

Examples:
- `wise`
- long quoted competitor/entity queries
- unrelated cities such as San Clemente, Surrey, Monrovia, Brentwood, Elm Grove
- broad informational queries without local/commercial intent

These should not drive major page rewrites unless they overlap with target topics.

### Canonical / Domain Issues

Both `https://www.growwiseschool.org/...` and `https://growwiseschool.org/...` appear in page data.

This may reflect historical URLs, incomplete recrawl, or production redirect/canonical inconsistency. It must be validated before treating it as fixed.

### Device Issue

Desktop CTR is far weaker than mobile:
- Desktop CTR: 1.59%
- Mobile CTR: 5.99%

This suggests many desktop impressions are lower-position or broader informational searches. Page-level desktop inspection should be part of the post-change review when new GSC data arrives.

## Priority Implementation Order

P0 - Technical validation:
- Verify canonical URLs emit non-www.
- Verify www redirects to non-www.
- Verify `/en/...` legacy URLs redirect to clean URLs.
- Verify sitemap URLs use non-www clean URLs.

P1 - Snippet updates for CTR:
- Homepage
- `/camps/summer`
- `/resources/when-to-start-sat-prep`
- `/resources/reading-fluency-vs-comprehension`
- `/resources/tutoring-dublin-ca`
- `/resources/python-vs-scratch`
- `/resources/careless-math-mistakes`
- `/resources/what-is-vibe-coding`

P2 - Content/ranking improvements:
- `/courses/sat-prep`
- `/camps/summer`
- `/resources/careless-math-mistakes`
- `/resources/python-vs-scratch`
- `/resources/tutoring-dublin-ca`

P3 - New or improved local landing coverage:
- SAT prep Dublin CA
- Middle school tutoring Dublin CA
- High school tutoring Dublin CA
- Summer camps Dublin CA
- Fremont only if the business intentionally serves Fremont.

## Validation Checklist

After each implementation batch:
- Build passes.
- Rendered title and meta description match intended output.
- Canonical URL is clean and non-www.
- Redirect behavior works for www and `/en` variants.
- Sitemap exposes canonical URLs only.
- No unexpected noindex on target pages.

## Implementation Log

### Batch 1 - Technical and Priority Snippet Validation

Validated locally on Webpack dev server:
- `/`: 200, index/follow, canonical `https://growwiseschool.org`
- `/camps/summer`: 200, index/follow, canonical `https://growwiseschool.org/camps/summer`
- `/resources/when-to-start-sat-prep`: 200, index/follow, canonical `https://growwiseschool.org/resources/when-to-start-sat-prep`
- `/en/camps/summer`: redirects to `/camps/summer`
- `/resources/readiness-checklist`: redirects to `/readinesschecklist`
- `sitemap-pages.xml`: no `www` URLs and no `/en/` URLs
- `sitemap-blogs.xml`: no `www` URLs and no `/en/` URLs; includes priority resource URLs
- `curl -H 'Host: www.growwiseschool.org' /camps/summer`: permanent redirect to `https://growwiseschool.org/camps/summer`

### Batch 2 - Resource Metadata Alignment

Changed:
- `/resources/careless-math-mistakes`
  - Title: `Careless Math Mistakes | Why Kids Lose Points`
  - Description: `Learn why kids make careless math mistakes, the common patterns behind lost points, and how to fix them before the next test.`
- `/resources/what-is-vibe-coding`
  - Description: `Vibe coding lets kids build with AI, but fundamentals still matter. Learn the right age, benefits, risks, and what programs should teach.`

Validated:
- Both pages return 200.
- Both pages are index/follow.
- Both pages emit clean non-www canonical URLs.
- Old stale metadata strings do not appear in rendered HTML.

### Final Validation

Rendered priority-page validation passed for:
- `/`
- `/camps/summer`
- `/resources/when-to-start-sat-prep`
- `/courses/sat-prep`
- `/resources/python-vs-scratch`
- `/resources/careless-math-mistakes`
- `/resources/reading-fluency-vs-comprehension`
- `/resources/tutoring-dublin-ca`
- `/resources/what-is-vibe-coding`

Each returned:
- HTTP 200
- `index, follow`
- clean non-www canonical URL
- intended title and meta description

Build validation:
- `npm run build` passed.
- Existing warnings remain:
  - custom Cache-Control header warning for `/_next/static/:path*`
  - Next.js middleware naming deprecation warning

### Batch 3 - P2 Ranking Support Content

Changed:
- `/resources/when-to-start-sat-prep`
  - Added a Dublin/Tri-Valley SAT planning section.
  - Added contextual links to `/courses/sat-prep` and `/resources/tutoring-dublin-ca`.
- `/resources/tutoring-dublin-ca`
  - Added a middle school and high school tutoring comparison section.
  - Added contextual links to middle school math, high school math, Integrated Math 1, SAT prep, English support, and IM readiness pages.
- `/resources/python-vs-scratch`
  - Added a parent-focused coding class evaluation section.
  - Added contextual links to game development and Python/coding program paths.
- `/camps/summer`
  - Added a compact local intent section: `How to choose a summer camp in Dublin, CA`.
  - Added contextual links to the academic summer hub, game development, and Dublin center page.

Validated:
- All four edited pages return 200.
- All four emit `index, follow`.
- All four emit clean non-www canonical URLs.
- Added section headings are present in rendered HTML.
- Target internal links render in the page HTML.
- Final `npm run build` passed after these content changes.
- Existing warnings remain:
  - custom Cache-Control header warning for `/_next/static/:path*`
  - Next.js middleware naming deprecation warning

P3 page decision:
- No duplicate landing pages were created in this pass.
- Existing canonical pages already cover the target buckets:
  - SAT prep Dublin CA: `/courses/sat-prep`
  - Summer camps Dublin CA: `/camps/summer`
  - Middle school tutoring Dublin CA: `/academic/math/middle-school` plus reinforced `/resources/tutoring-dublin-ca`
  - High school tutoring Dublin CA: `/academic/math/high-school` plus reinforced `/resources/tutoring-dublin-ca`
- The next GSC review should decide whether dedicated comparison/list pages are needed, based on query-page pairing after recrawl.

## Measurement Plan

GSC should be reviewed after:
- 14 days: early indexing/snippet movement
- 28 days: first meaningful CTR trend
- 45 days: decide whether to keep, refine, or expand changes

Primary success metrics:
- CTR lift on priority pages
- Click growth on target local queries
- Reduced visibility of duplicate www and `/en` URLs
- Improved average position on P2 content pages
