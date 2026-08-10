# Public Pricing Funnel — Pre/Post Audit

Date: 2026-08-10

## Scope

- `/academic`
- `/academic/math`
- `/academic/math/elementary`
- `/academic/math/middle-school`
- `/academic/math/high-school`
- `/academic/english`
- `/academic/english/elementary`
- `/courses/sat-prep`

## Pre-implementation findings

- Public prices appeared as monthly tuition, session fees, trial fees, and SAT package prices.
- Prices were repeated across hub cards, grade-band program blocks, trial sections, FAQs, and Course `Offer` JSON-LD.
- CTA intent was fragmented across assessment, trial, enrollment, and cart actions.
- The full assessment modal required contact and scheduling details before providing program guidance.
- Existing H1s, metadata, course descriptions, curriculum, outcomes, testimonials, internal links, breadcrumbs, and FAQs provided strong SEO/AEO coverage and were marked for preservation.

## Post-implementation results

| Route | HTTP | H1 | Visible prices | Price JSON-LD | Recommendation copy | Console errors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/academic` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/academic/math` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/academic/math/elementary` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/academic/math/middle-school` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/academic/math/high-school` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/academic/english` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/academic/english/elementary` | 200 | 1 | 0 | 0 | Yes | 0 |
| `/courses/sat-prep` | 200 | 1 | 0 | 0 | Yes | 0 |

## UX and functional checks

- Three-step recommendation flow works at a 390×844 mobile viewport.
- Grade selection, contextual subject preselection, goal selection, email validation, consent, submission, and success states were exercised.
- Submission was intercepted during browser validation; no external lead was created.
- Success state provides a direct free-assessment CTA.
- No horizontal overflow was detected.
- Existing page layout, section order, visual system, program content, and responsive structure remain intact outside targeted pricing/CTA blocks.

## SEO and AEO checks

- Existing titles, canonicals, H1s, breadcrumbs, course descriptions, FAQs, and program details remain present.
- Price-bearing Course `Offer` data was removed rather than left incomplete or inconsistent with visible copy.
- Each affected hub or program section explains that pricing depends on grade, program fit, format, or schedule and is supplied before enrollment.
- Curriculum, grade coverage, format, schedules, assessment process, outcomes, and local relevance remain publicly crawlable and are not gated by the modal.

## Build and code gates

- Targeted ESLint: pass.
- Next.js production build: pass; all eight routes prerendered successfully.
- Rendered browser audit: pass for all routes.
- Repository-wide standalone `tsc --noEmit`: blocked by pre-existing duplicate generated types and unrelated baseline errors; no errors from the changed files appeared in the output.

## Remaining scope note

The original request stated ten pages but supplied eight routes. This audit covers the eight identified routes.
