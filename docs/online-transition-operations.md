# GrowWise online transition operations

**Online offering:** accept parent assessment requests now.
**Online-only switch date:** `[OPEN: confirm date]`. The online-only switch remains off until the owner confirms the date and operating gates.

## Before publishing cohort times or taking payment

- Confirm instructor availability, subject cadence, class format, and seat count for every program. Publish only confirmed Pacific-time slots.
- Confirm the video classroom, payment flow, USD billing, cancellation/refund terms, trial eligibility, and enrollment confirmation process.
- Pilot the parent/guardian intake through assessment, teacher placement, confirmed schedule, and enrollment.
- Keep student profiles, consent, parent dashboard, and retention in Omnix360. Do not create a duplicate student record in the website or bypass the Omnix360 parent flow.
- Resolve the homework add-on price conflict before displaying its price: the supplied `$85` conflicts with the site rule that displayed prices end in `7`.
- Do not issue or expire promotional credits until the credit terms and receipt/dashboard presentation receive the required legal review.

## Weekly operating review

Record one row per week, with a consistent reporting week and source:

| Metric | Definition |
|---|---|
| Online inquiries | Parent/guardian inquiries attributed to the online offer (`utm_source=online-tutoring` or `pricing`) |
| Completed assessments | Submitted parent/guardian assessment requests for online program fit |
| Confirmed placements | Teacher-confirmed subject, grade band, and lane |
| Paid trials | Trial purchases received, subject to one-trial-per-student/per-subject eligibility |
| Three-month conversions | Trial families who begin a three-month subject plan |
| Cohort fill | Confirmed enrolled seats divided by confirmed capacity, by subject and schedule |
| Search performance | Search Console clicks, impressions, CTR, and position for `/online-tutoring`, `/pricing`, and linked program pages |

The site records assessment starts/submissions and online package interest. Confirmed placements, payments, trial eligibility, and cohort capacity require a staff/CRM record until those systems are connected to the website. Set numeric enrollment goals only after instructor capacity is confirmed.

## Transition sequence

1. Confirm class format, schedule, capacity, video/payment tools, parent intake, and the assessment-to-placement process.
2. Start only paid online trials for cohorts with confirmed times and capacity. Track attendance, placement fit, teacher workload, and trial-to-three-month continuation.
3. Expand only into confirmed capacity. Keep all dates and times labeled with Pacific Time and quote billing in USD.
4. Confirm the online-only switch date and prerequisites with the owner. Before enabling `ONLINE_ONLY_SWITCH`, update homepage positioning, organization schema, address display, local pages, camps, and time-zone copy as listed in the implementation plan.
5. After the last in-person day, remove the street address and address-based local schema and update or close the Business Profile based on its then-current eligibility.

## SEO work represented in the checkout

- The locale-wide route loading boundary has been removed in the local working tree so route content can render in initial HTML; verify with built route HTML before release.
- The homepage assessment strip uses evergreen copy; no expired July 31 assessment banner string remains in the checked source.
- Two clear duplicate articles now redirect to their resource counterparts and are removed from the sitemap; other redirect candidates remain gated pending URL-level query/backlink review.
- Contextual links have been added to selected article clusters. The supplied earlier crawl reported 22 zero-inlink articles, but did not provide the complete URL list. Re-run an inventory before claiming zero orphans.
- Review the 11 coding/career articles against Search Console before redirecting or removing them; several titles are explicitly about children and are relevant to current programs.

## External actions

This repository cannot configure the live payment/video tools, Omnix360, CRM capacity records, Search Console, or Google Business Profile. The website can request assessment and placement; the checkout and credit ledger are not connected to the new catalog yet.
