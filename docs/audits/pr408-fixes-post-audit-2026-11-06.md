# PR 408 fixes post audit

Date: November 6, 2026 (America/Los_Angeles)

## Scope and baseline

Follow-up to PR 408 at `97b0d0a3b15bb6b7e98e5bad131fecd406a72480`. The pre-audit is `pr408-fixes-pre-audit-2026-11-06.md`. All edits are in the isolated PR worktree, not the existing dirty parent/frontend checkout.

## Changes and acceptance criteria

| Finding | Fix | Acceptance evidence |
|---|---|---|
| Deleted trust fields still read by the summer page | Render only the remaining class-size detail and remove the empty claim wrappers/separators | Component regression test and comparison of actual imported JSON property accesses; four TS2339 errors removed |
| Pricing links assume Grade 3, 6 or 9 | Remove the invented grade query; preserve the selected band and plan in the existing package-interest field | All eight plan links checked; the assessment continues to require the parent to choose an actual grade |
| Trial amount presented as recurring monthly tuition | Explicit one-time billing label for each four-week trial; retain monthly labels for Core/Advanced | All three trial cards and all five paid-plan cards checked; amounts and term policy unchanged |
| New launch pages rejected by the route guard | Add online/pricing paths and derive all seven science paths from the existing course catalog in the public allowlist | Nine path/sitemap regression checks; rendered HTTP checks required below |

## Verification

- Dependency isolation: installed the existing lockfile into `/private/tmp/growwise-pr408-validation-deps` using `npm ci --ignore-scripts --no-audit --no-fund` (1,065 packages). The original shared dependency tree stalls during reads, so the isolated worktree uses the temporary dependency tree. Package manifests and lockfile are unchanged.
- Seven behavioral regression checks fail against the original PR versions of the two affected components and pass against the fixes. Baseline components were loaded from `git show HEAD:<path>` using a temporary Jest configuration, without resetting source files.
- Focused Jest: 6 suites, 47 tests passed. Includes pricing links/billing, summer details, nine new public-path/sitemap checks, public URL handling, existing public academic pricing policy, and assessment JSON-LD.
- Production build: `npm run build -- --webpack` must complete on the final source state; final result recorded below.
- Full type check is not globally clean. A compiler-host comparison on the same project/configuration, substituting the original PR source for changed production files, reports 2,713 baseline diagnostics versus 2,709 after the fixes. The four resolved errors are the deleted trust properties; no new diagnostics are introduced. Existing errors include missing Jest globals in older test files, unrelated API typing, and saga return annotations. The global `ignoreBuildErrors` setting is unchanged.
- Focused lint: final command covers all changed production files, regression tests, and the browser specification. Final result recorded below.
- Browser/HTTP checks use a locally built production server bound to `localhost`; no claim is made that the changes are deployed to the public domain. Form submissions and non-local page requests are blocked in browser checks; no enrollment or payment is submitted.

## Regression boundaries

This follow-up changes three production files. It adds no routes, articles, images, downloadable files, or public claims. Catalog prices, checkout/credit/trial flags, canonical generation, metadata, FAQ/schema data, worksheet assets and redirects are unchanged. The allowlist uses the existing science catalog to avoid duplicating its slugs. Unknown paths must remain hard 404s.

The original Next redirect configuration is retained. An intermediate local hostname mismatch caused self-redirects in the test harness; binding and requesting the site as `localhost` avoids proxying its internal locale rewrites.

## Remaining limits

The repository-wide type backlog remains open and must not be reported as passing. Existing operational launch gates in `online-launch-post-audit-2026-11-05.md` remain: confirmed class formats/schedules/capacity, payment and enrollment integrations, student-profile handoff, trial enforcement, and credits. This patch does not enable any of those systems, merge the PR, or activate the online-only switch.

## Final validation results

| Check | Final result |
|---|---|
| `git diff --check` | Pass |
| Focused Jest | 6 suites, 47 tests passed |
| Critical Playwright specification | 8 Chromium tests passed in 5.4 seconds, including desktop 1440x1000 and mobile 390x844 |
| Final production build | `npm run build -- --webpack` exited 0; 240 pages generated |
| Focused ESLint | Exit 0, no source diagnostics; Browserslist database-age notice only |
| Type diagnostic comparison | 2,713 before / 2,709 after; four resolved, zero introduced; global type check still fails |
| New public routes | All 9 return 200 on the local production build; arbitrary unknown path returns 404 |
| Public locale prefixes | English and retired-locale requests normalize to clean pricing/assessment URLs in one redirect; clean URLs return 200 |
| Initial HTML and SEO | 10 pages (9 new routes plus downloads): initial main content, H1, title, description, canonical and parseable JSON-LD verified |
| Schema parity | Pricing FAQ questions match visible summaries; science pages publish their matching Course URL |
| Discovery endpoints | robots.txt, llms.txt and sitemap-pages.xml return 200 with expected content types; every new page appears once in the pages sitemap |
| Pricing handoff | All 8 plan links retain band/plan without inventing a grade; all 3 trials show one-time pricing; all 5 paid plans show monthly pricing |
| Explicit selector handoff | Grade 12 / Physics reaches the parent form correctly on desktop and mobile |
| Trust section | Remaining class-size text visible on desktop/mobile with no empty trust claims or dividers |
| Browser runtime | Additional scripted browser audit reports zero page errors |

Browser specification: `e2e/specs/online-launch-pr408.spec.ts`. Run against an already built local server using `E2E_BASE_URL=http://localhost:3019 npx playwright test e2e/specs/online-launch-pr408.spec.ts --project=chromium --workers=1`. Bind the local server to `localhost` to match locale rewrites. No form submission, payment, enrollment, production deployment or merge was performed.
