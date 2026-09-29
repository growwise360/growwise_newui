# Post-audit: SEO Manager blogs

Generated 2026-09-27 after application integration.

| File | SEO title chars | Description chars | FAQ count | FAQ/schema exact | Why GrowWise | Source-backed body |
|---|---:|---:|---:|:---:|:---:|:---:|
| `06-can-your-child-explain-it-without-ai.md` | 61 | 134 | 5 | pass | pass | pass |
| `07-is-ai-weakening-your-childs-writing.md` | 60 | 136 | 5 | pass | pass | pass |
| `08-algebra-1-in-8th-grade-tri-valley.md` | 62 | 140 | 5 | pass | pass | pass |
| `09-california-phone-free-schools-law-focus.md` | 57 | 146 | 5 | pass | pass | pass |
| `10-is-uc-bringing-back-the-sat.md` | 52 | 165 | 5 | pass | pass | pass |
| `11-is-tutoring-worth-it.md` | 45 | 139 | 5 | pass | pass | pass |
| `12-kumon-vs-mathnasium-vs-rsm.md` | 45 | 146 | 5 | pass | pass | pass |
| `13-online-vs-in-person-tutoring.md` | 64 | 136 | 5 | pass | pass | pass |
| `14-questions-to-ask-a-tutor-before-hiring.md` | 41 | 130 | 5 | pass | pass | pass |
| `15-math-olympiad-by-grade.md` | 64 | 122 | 5 | pass | pass | pass |

## Integration results
- 10 source-backed posts load into the editorial collection; 17 total editorial posts are now discoverable.
- All new slugs are registered in `public-paths.ts`, `sitemap-lastmod.json`, and `/llms.txt`.
- New route data supplies `BlogPosting` fields: `articleSection`, `keywords`, `datePublished`, `dateModified`, `inLanguage`, and `isAccessibleForFree`.
- FAQ JSON-LD is generated from the same FAQ array rendered by the visible accordion; the two source mismatches from the pre-audit are corrected in the copied source files.
- Source citations are parsed from each draft and rendered in the published article below the FAQ, so GEO-facing evidence is visible to readers and crawlers.
- Source-backed bodies rename the GrowWise section to `Why GrowWise?`; the existing template renders the page headline as its single H1 and does not render the source metadata H1.

## Automated validation
- `npx jest src/lib/seo/__tests__/robots.seo.test.ts src/lib/seo/__tests__/seo-jsonld-route-audit.test.ts src/lib/seo/__tests__/metadata-length-limits.test.ts src/lib/__tests__/seo-manager-blog-posts.test.ts src/lib/__tests__/editorial-blog-posts.test.ts --runInBand` — 5 suites, 86 tests passed.
- Repository-wide `next build`, `tsc`, lint, and dev-server smoke tests were attempted but exceeded the available execution window without emitting diagnostics; they are not counted as passes.
