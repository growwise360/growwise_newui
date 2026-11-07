# GrowWise online launch: pre-implementation audit

**Audit date:** November 5, 2026
**Scope:** local `growwise_newui` source and the supplied online-launch brief. Production Search Console, payment provider, Omnix360, video classroom, and instructor-capacity data were not available in this checkout.

## Repository baseline

- Frontend branch: `fix/referral-credit-policy-copy`, two commits ahead of its configured remote at audit time.
- Existing local modifications were present before this implementation: online tutoring hub, parent intake prefill, streaming-boundary removal, selected SEO links, Robotics delivery setting, operations notes, and other related content. They are preserved and treated as working-tree baseline.
- Backend nested repository is on `feature/selfcheck_page` with a pre-existing change to `sql/seeds/programs_seed_pricing.sql`.
- Parent repository has a pre-existing `.DS_Store` modification. No commit, push, or PR is part of this implementation pass.

## Findings and priority

| Priority | Finding | Evidence / impact | Treatment |
|---|---|---|---|
| P0 | Pricing URL is absent and catalog has no dedicated source of truth | No `/pricing` route or online catalog config existed in the frontend; the existing public pricing JSON is a legacy multi-program catalog. | Add a dedicated typed online catalog config and pricing page. Do not alter legacy transaction prices. |
| P0 | Online hub contains unresolved positioning and operational promises | Existing local hub says “small-group,” publishes a February 5, 2027 switch date, and implies Pacific-time options; latest brief marks format and switch date `[OPEN]`. | Align copy to confirmed scope; keep unresolved values out of customer-facing copy and in named config placeholders. |
| P0 | Paid conversion and credit rules are not wired to enrollment | Existing assessment prefill is not checkout; no verified trial eligibility, subject SKU, credit ledger, or reminders were found in the prompt implementation. | Audit current payment paths; do not ship credits or collect payment for unconfigured catalog SKUs. |
| P1 | Grades 1–2 remain in elementary metadata and Course schema | Math and English elementary layouts state Grades 1–5, despite the new catalog serving Grades 3–12. | Update page and schema copy to Grades 3–5. |
| P1 | Chemistry, Physics, and AP pages are missing | No science route files were found under the academic route tree. | Add accurate subject and AP pathway pages from the supplied catalog. |
| P1 | Redirect list risks erasing valid child-facing content | The proposed “off-audience” list includes titles explicitly about children, coding classes for children, and Roblox game development. No GSC evidence was supplied. | Do not add these redirects without URL/query/backlink review; preserve URLs and improve relevant linking. |
| P1 | Orphan/weak-inlink acceptance is not measurable from the current prompt alone | The prior audit reports 22 zero-inlink articles; the implementation brief names a subset and asks for a zero-orphan sitemap result. | Build an internal-link inventory and report remaining URLs rather than claiming full remediation from selected examples. |
| P2 | Homepage credibility claims need owner verification | Brief itself requires confirmation of “387+”, “4.9★”, “98%” and homepage Review schema. No verification source is present in repository context. | Record all claim locations; do not invent verification. Keep status as owner decision. |
| P2 | Student-name collection must disclose Omnix360 handoff | Revised brief correctly assigns profile, consent, dashboard, and retention to Omnix360 while the website captures parent-submitted details. | Add clear notice at relevant entry points; no duplicate student record or separate COPPA workflow. |
| P2 | Credit expiry and discount logic carries launch risk | Expiry wording needs legal review; $85 homework add-on conflicts with the “every price ends in 7” rule; exact bundle math is rounded. | Keep credit issue/redemption disabled; record price conflict and do not silently change confirmed tuition. |

## Production and analytics limits

The supplied brief reports that `/online-tutoring`, `/pricing`, `/academic/science/chemistry`, and `/academic/science/physics` returned 404 during its November 5 crawl. A later direct production recheck also returned 404 for all four URLs. Local source status is the verified baseline for this pass; no claim is made about GSC, paid conversion, or backlinks.

## Stepwise implementation and release gates

1. **Phase 1 — Technical SEO and content integrity:** preserve the locale loading-boundary fix; verify expired copy, initial HTML, metadata/canonicals/schema, internal-link counts, and sitemap; update safe high-priority contextual links. Hold redirects pending GSC review.
2. **Phase 2 — Offer and launch config:** define online availability and switch as separate flags; keep online enrollment separate from the unresolved online-only date. Do not publish unconfirmed formats, times, or capacity.
3. **Phase 3 — Catalog and pricing source:** add typed subject/grade/plan data, named `[OPEN]` fields, SKU identifiers, discount logic, and constraints; do not overwrite existing unrelated program prices.
4. **Phase 4 — Pricing page and CRO:** build responsive accessible grade-band tabs, inclusion comparison, savings information, exact visible FAQ/schema parity, and one primary assessment CTA.
5. **Phase 5 — Subject pages:** add Chemistry, Physics, and AP pathways; state prerequisites and school-provided hands-on labs; correct elementary grade bands and sitemap entries.
6. **Phase 6 — Checkout and privacy handoff:** map current provider/account paths first. Use test mode only. Implement nothing that duplicates Omnix360 profiles or enables unreviewed credit expiry. Report any external service configuration required.
7. **Phase 7 — Parent assessment and measurement:** make the assessment-to-placement-to-quote flow explicit; measure inquiry, assessment, placement, paid starter, three-month conversion, cohort fill, and search performance using existing analytics conventions.

## Post-audit acceptance checks

- New and changed indexable routes have server-rendered H1/body, unique metadata, canonical URL, accurate schema, and sitemap inclusion.
- No customer-facing `[OPEN]` placeholders or unconfirmed schedule/capacity claims.
- All displayed prices obey the agreed price rule and match config; checkout does not imply unsupported payment/credit behavior.
- Parent forms explain collection purpose and Omnix360 handoff.
- Internal links resolve to canonical paths; no redirects are added without search-data review.
- Focused SEO tests, type checks, production build, and route HTML checks complete successfully before release claims.
