# GrowWise online launch: implementation and post-audit

**Audit date:** November 5, 2026
**Scope:** local frontend source after implementation; no commit, push, deployment, payment-provider, Omnix360, cohort-capacity, or Search Console changes were made.

## Implemented locally

- Added `/online-tutoring` as the parent-facing online offer hub and `/pricing` as a responsive, grade-band pricing page. The assessment remains the primary CTA; the pages explain teacher-confirmed placement, price, schedule, and capacity.
- Added a typed online catalog source in `src/config/online-pricing.ts`. It separates online offering visibility from the online-only switch; checkout, trial eligibility enforcement, and credits remain disabled.
- Added Chemistry, Physics, and AP science pathway pages, their course metadata/schema, and sitemap entries. Corrected elementary Math and English page/schema copy to Grades 3–5.
- Added the parent-facing student profile disclosure and a privacy-policy explanation that Omnix360 handles online profiles, consent, the parent dashboard, and retention. No automatic website-to-Omnix360 integration was verified or asserted.
- Removed unverified numeric trust claims from the affected customer-facing source surfaces and removed homepage Review JSON-LD. The current inventory is in `claims-verification-todo-2026-11-05.md`.
- Added permanent redirects for the two duplicate article pairs and updated known internal links and sitemap entries. Off-audience redirects remain held because the affected coding articles include child-facing content and no Search Console evidence was available.
- Added selected contextual links for the fractions, reading motivation, math cliff, and “good grades” topic cluster. The complete 22-article orphan inventory was not supplied, so sitewide zero-orphan status is not claimed.
- Preserved the locale loading-boundary removal already present in the working tree and removed the expired assessment banner. The evergreen banner points to the self-check.

## Verification evidence

- TypeScript syntax transpilation completed for 49 changed or untracked `.ts`/`.tsx` files with zero syntax diagnostics. This is not a full type check.
- `git diff --check` passed after the final source edits.
- Source scan found no remaining `387+`, `4.9⭐`, `98% Parent`, or `98%` strings under `src` outside tests. One unused `4.9` aggregate-rating constant remains in `src/lib/seo/socialProof.ts`; it has no imports, is listed in the claims TODO, and should be removed before anyone reuses that module. This does not independently validate every claim in external systems or image assets.
- A pricing invariant audit earlier in this pass found the displayed catalog and bundle amounts comply with the configured price-ending rule. The $85 homework-help value remains hidden pending owner resolution of the conflict with that rule.
- Direct production recheck returned HTTP 404 for `/online-tutoring`, `/pricing`, `/academic/science/chemistry`, and `/academic/science/physics`. Local changes are not deployed.
- Full `npm run build`, `npx tsc --noEmit`, targeted lint, and targeted Jest commands did not complete: each stalled without diagnostic output and was interrupted. Therefore build, type, lint, and test status are unverified; no pass is claimed.

## Remaining release gates

1. Confirm or retain `[OPEN]` values for class format, markets, student-support detail, homework add-on pricing/availability, same-package credit renewal, and the online-only date. Keep `[OPEN]` text out of public copy.
2. Confirm teacher schedules, capacity, and course cadence; then expose only those confirmed slots in Pacific Time.
3. Connect and verify the parent enrollment, payment, trial-eligibility, and Omnix360 handoff paths. Do not represent assessment prefill as checkout or enrollment.
4. Get the complete orphan URL list and query/backlink data; finish contextual inlink counts and validate redirect targets before release.
5. Complete a production build and route-level HTML checks for initial `<main>` content, canonical URLs, metadata, schema parity, and broken internal links.
6. Confirm owner evidence for any numerical review, enrollment, satisfaction, or capacity claims before restoring them.
7. Deploy only after operating gates pass, then re-crawl production, monitor Search Console and the agreed funnel events, and update local-business signals when the in-person transition occurs.

## Repository state

Changes remain in the existing dirty frontend working tree. Pre-existing modifications were preserved. No commit, push, PR, deployment, checkout activation, credit-ledger change, or Google Business Profile action occurred.
