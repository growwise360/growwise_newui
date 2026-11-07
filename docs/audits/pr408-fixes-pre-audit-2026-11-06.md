# PR 408 fixes pre audit

Date: November 6, 2026 (America/Los_Angeles)

## Verified baseline and scope

- PR: https://github.com/growwise360/growwise_newui/pull/408
- Branch: `feat/growwise-online-launch-current`; target: `dev`.
- Reviewed head: `97b0d0a3b15bb6b7e98e5bad131fecd406a72480`.
- Worktree: `/private/tmp/growwise-online-launch-pr-current`, clean before this follow-up.
- Local `origin/dev`: `291cbdd09daa99e325bf475864810d3c3673e316`; local `main`: `755507b842017da19d7429e4a39e1cd1bf2f712e`. These are source-control references, not proof of production deployment.
- Parent checkout has pre-existing `.DS_Store`, backend and frontend dirtiness. Its frontend remains on `fix/referral-credit-policy-copy` with substantial unrelated edits; it is excluded from this fix.
- Scope: the three defects identified in the current PR review, associated regression checks, and a pre/post audit. No enrollment, payment, credit, online-only flag, or production activation is included.

## Findings and acceptance criteria

| Priority | Finding and evidence | User impact | Acceptance criteria |
|---|---|---|---|
| P1 | `HighSchoolSummerIntensivePage.tsx` reads `PAGE.trustBar.rating`, `ratingLabel`, `reviews`, and `enrolled`, but its imported JSON contains only `classSize`. A focused TypeScript check reproduced four TS2339 errors. | Blank trust items and separators; type checking fails for the deleted keys. | Render the remaining class-size text without reading removed properties or leaving separators; verify the real component and type checking. |
| P1 | `OnlinePricingTabs.tsx` maps Elementary/Middle/High school to `Grade 3`/`Grade 6`/`Grade 9` and passes that as `grade` to the assessment. | Pricing visitors can submit an assumed student grade they never selected. | All plan links leave actual grade unset; preserve the selected band and plan as inquiry context. An explicitly chosen grade in the online selector must continue to work. |
| P2 | Shared `PlanCard` appends `/ month` to every amount, including the one-time four-week trial. | Trial billing appears recurring. | Trial amount is labeled one-time; Core and Advanced remain monthly with the three-month term. Amounts stay unchanged. |

## Existing validation and limits

GitHub readback before changes reports Vercel, Vercel Preview Comments, and the Lighthouse parser check successful at the reviewed head. `next.config.ts` sets `typescript.ignoreBuildErrors = true`; a green deployment does not prove type safety. Browser checks, a fresh local production build, and a full application type check have not yet passed in this audit.

The broader PR launch gates in `online-launch-post-audit-2026-11-05.md` remain relevant: schedules, class format, payment/enrollment/Omnix360 integrations, and remaining business decisions require separate verification. This audit must not be interpreted as approval to enable those systems.

## Pre-fix reproduction

A TypeScript compiler-API check of the actual `PAGE.trustBar` property accesses against the imported JSON reproduced all four TS2339 errors. Inspection of all eight plan cards confirms the CTA passes an assumed grade, and the shared renderer appends `/ month` to all three trial cards.

The normal focused Jest run and full `tsc` invocation stalled without diagnostics and were interrupted. A second Jest run using the bundled Node runtime also stalled; module tracing showed slow dependency imports. These attempts are inconclusive, not passing or failing test results. Behavioral regression tests were added before the fix; their post-fix run is required.

## Additional blocker found during rendered post-audit

The first successful production build was served locally. `/pricing` returned HTTP 404 before any React page content or pricing tabs could render. Inspection showed that `src/middleware.ts` rejects paths absent from `PUBLIC_SITEMAP_PATHS`; the new `/online-tutoring`, `/pricing`, and seven science paths were missing from `src/lib/seo/public-paths.ts` even though they were in the sitemap and build output. This is a P1 launch blocker. Acceptance: all nine public paths are allowed, return HTTP 200 from the rebuilt app, and have exactly one corresponding pages-sitemap entry; arbitrary unknown paths must still return 404.

Validation environment note: binding the local server to `127.0.0.1` while locale rewrites target `localhost` causes an external rewrite and a self-redirect on both existing and new routes. Binding and requesting the production server at `localhost` resolves that test-harness issue. The original Next redirect configuration is retained; this is not classified as a production defect.

## Completed baseline comparison

After isolating dependencies, seven component regression assertions were run against the original PR component sources and all seven failed as expected (the invented-grade URLs, recurring trial labels, and missing cleaned-up program-details region). These are actual assertion failures, separate from the inconclusive shared-dependency attempts above. The full comparison also confirms the four original trust-field TypeScript errors; the post-audit records the resulting diagnostic delta and browser/HTTP verification.
