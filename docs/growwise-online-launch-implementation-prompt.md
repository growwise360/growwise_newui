# Implementation prompt: GrowWise online launch (site + pricing + SEO)

Verified Nov 5, 2026: all 51 existing URLs named here return 200. The four new pages (/pricing, /online-tutoring, /academic/science/chemistry, /academic/science/physics) return 404 until built. Bundle, trial and upfront prices were recomputed; all end in 7.

Paste everything below into your coding agent (Cursor / Claude Code) opened on the growwiseschool.org repo (Next.js; its streamed rendering suggests the App Router, so confirm this in the repo).

---

You are implementing GrowWise School's move to an online-only learning system on growwiseschool.org. Work in phases, in order. Start each phase by inspecting the repo and posting a short plan (files to change, approach) before editing. Do not invent facts, stats, reviews or ratings. Leave any value marked [OPEN] as a clearly named config placeholder, not a guess.

## Ground rules
- Brand: GrowWise sells a **learning system**, not subject tuition: free assessment → 90-min weekly live class → gap lessons for every weak topic → reteach → parent dashboard.
- Never show per-hour or per-class prices. Show prices per month, per subject.
- **Every price ends in 7.** No prices ending in 9.
- Banned copy: "At GrowWise we believe", "GrowWise cares deeply", "summer learning loss", "rebuild confidence", hype language. Preferred: "mistake pattern", "learning gap", "find the real blocker", "gap lessons", "reteach", "self-check".
- Grades served: **3–12** (no grades 1–2).
- Out of scope: the AI-taught tier (proposed, not approved). Do not build it or mention it.
- Class format (small group or 1:1) is [OPEN]. Do not state a format in page copy yet.
- Existing on-site claims such as "387+ Students · 4.9★ Google · 98% Parent Satisfaction" and any Review structured data on the homepage: keep them only if the owner confirms they're current and verifiable. Otherwise remove them. Add a TODO listing every place they appear.
- Use one pricing config file as the single source of truth (Phase 3). No hard-coded prices in components.
- Ship the online-switch changes behind a flag `ONLINE_ONLY_SWITCH` (default off). The owner turns it on on the switch date [OPEN: date].

## Phase 1: Technical SEO fixes (ship now)
1. **Streaming render.** Every page's initial HTML has a ~400-char loading shell in `<main>`, and the real content sits in `<div hidden id="S:0">`. Find the cause (route-level `loading.tsx`, or a Suspense boundary around page content) and fix it so the H1 and article body render inside `<main>` in the first HTML response.
   - Acceptance: `curl -s https://growwiseschool.org/resources/careless-math-mistakes` shows the H1 and body text inside `<main>`, with no `hidden` wrapper.
2. **Expired banner.** Remove the homepage banner "Free Assessments Available Until July 31 · Grades 3–12". Replace it with an evergreen banner linking to the 5-minute Self-Check (`/self-check`). Make banners date-driven (start/end in config) so they expire automatically.
3. **Duplicate pages: 301 redirects** (update internal links and the sitemap too):
   - `/growwise-blogs/reading-fluency-vs-reading-comprehension` → `/resources/reading-fluency-vs-comprehension`
   - `/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide` → `/resources/how-to-choose-summer-camp`
   - `/resources/reading-program-grades-1-2-dublin-ca` → `/academic/english/elementary` (grades 1–2 are no longer served)
4. **Off-audience legacy posts: 301 redirects** to `/coding` (or `/resources/python-vs-scratch` where the topic is Python/Scratch):
   - `/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise`
   - `/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era`
   - `/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations`
   - `/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities`
   - `/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career`
   - `/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement`
   - `/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile`
   - `/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers`
   - `/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills`
   - `/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child`
   - `/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux` (→ `/game-dev`)
5. **"Good grades hide gaps" cluster.** Make `/resources/why-grades-hide-learning-gaps` the pillar. Add a contextual link to it from each of these pages, and link back to each one from the pillar. No redirects:
   - `/growwise-blogs/good-grades-hide-math-learning-gaps`
   - `/growwise-blogs/report-card-fine-child-actually-behind`
   - `/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math`
   - `/growwise-blogs/homework-grades-good-but-fails-tests`
6. **Summer slide pair.** Keep both `/resources/summer-slide-prevention` (national) and `/resources/summer-slide-dublin-ca` (local). Give each a distinct title and H1 and cross-link them.
7. **Orphan articles.** Add 2–3 contextual internal links (in body copy, not the footer) to each remaining orphan and weakly linked article from topically related pages. Start with `/growwise-blogs/why-is-my-child-struggling-with-fractions` (currently 2 inlinks) and these orphans:
   - `/growwise-blogs/child-hates-reading-motivation-help`
   - `/growwise-blogs/middle-school-math-cliff-pre-algebra`
   - `/growwise-blogs/mentor-vs-teacher-critical-thinking`
   - `/growwise-blogs/first-30-days-of-school-matter`
   - `/growwise-blogs/education-cannot-be-outsourced`
   - `/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help`
   - `/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments`
   - `/resources/how-to-choose-coding-school-for-kids`
   - `/resources/back-to-school-night-parent-questions`

   Also add links to `/courses/integrated-math-1-dublin-ca` and `/middle-school-tutoring-dublin-ca`.
   - Acceptance: no article in the sitemap has 0 contextual inlinks.
8. **Housekeeping**
   - Add alt text to the images in the shared layout component (2–4 per page are missing it sitewide).
   - Shorten these titles to 60 characters or fewer: `/growwise-blogs/integrated-math-1-vs-algebra-1-difference`, `/growwise-blogs/stop-waiting-for-a-problem-proactive-academic-support`, `/resources/tutoring-dublin-ca`.
   - Expand these meta descriptions to 120–155 characters: `/referral`, `/resources/student-projects`, `/resources/student-articles`, `/resources/student-creative-writing`.

## Phase 2: Online switch (behind `ONLINE_ONLY_SWITCH`)
1. **Homepage title and meta.** Reposition from "Dublin CA center" to an online learning system for grades 3–12. Keep Dublin and Tri-Valley wording on `/dublin-ca` and the local pages.
2. **Schema.** Replace `EducationalOrganization + LocalBusiness` (with street address) with `EducationalOrganization`: no `address`, keep `telephone`, `email` and `url`. Set `areaServed` from config (US + international [OPEN: markets]). Keep FAQPage schema only for FAQs that are visible on the page.
3. **Address.** Remove "4564 Dublin Blvd, Dublin, CA" from the header, footer and contact page. Keep phone and email.
4. **Local pages.** Reframe `/dublin-ca`, the `*-dublin-ca` resource pages and `/middle-school-tutoring-dublin-ca` as "online tutoring for Dublin and Tri-Valley families." Keep the district, school and Integrated Math pathway content. Remove "visit our center" language.
5. **Camp pages (`/camps/*-dublin-ca`).** For each camp, read [OPEN: list of camps continuing online]. Continuing camps: rewrite as online sprints on the same URL. Discontinued camps: 301 to the closest continuing page or `/camps`. Robotics: [OPEN: kits shipped or discontinued].
6. **Time zones.** Show the time zone on every schedule and booking page, with the viewer's local time where possible.
7. **New hub `/online-tutoring`.** Explain the learning system and link to `/pricing`, `/self-check`, `/book-assessment` and each subject page.

## Phase 3: Catalog and pricing config
Create `config/pricing.(ts|json)` as the single source of truth for this catalog.

Subjects: Math and English for grades 3–12; Physics and Chemistry for high school only. Each subject is its own SKU.

Grade bands and lanes:
- Elementary (3–5): Core only (there is no Advanced lane in elementary).
- Middle (6–8): Core and Advanced.
- High school (9–12): Core and Advanced. HS Advanced covers Honors/AP: AP Chemistry, AP Physics 1, AP Physics 2, AP Physics C: Mechanics, AP Physics C: Electricity and Magnetism. AP Physics C requires calculus.

All sessions are 90 minutes a week, trial included.

| Band | Trial month (4 weeks, one-time) | Core /mo | Advanced /mo |
|---|---|---|---|
| Elementary 3–5 | $197 | $327 | n/a |
| Middle 6–8 | $207 | $347 | $397 |
| High school 9–12 | $237 | $387 | $437 |

- Prices are per subject, per month, on a **3-month term**. The same price applies to every subject in a band.

What each plan includes:
- **Trial:** live class + trial report (listing the gap lessons queued for the paid plan). No student support. Once per student, per subject.
- **Elementary:** live class, gap lessons, reteach, parent dashboard, monthly report. No student support.
- **Middle:** everything in Elementary, plus student support.
- **High school:** live class, gap lessons, reteach, parent dashboard, monthly assessment, student support.
- **Homework help add-on (same subject):** $85/month. Confirmed for high school. Elementary and middle: [OPEN], so put it behind a config switch, off by default.

Bundles (same student). Round each bundle price to end in 7:
- Any 2 subjects: about 10% off the combined price.
- 3–4 subjects (high school): about 15% off.

| Bundle | Core | Advanced |
|---|---|---|
| Elementary Math + English | $587 | n/a |
| Middle Math + English | $627 | $717 |
| High school, any 2 | $697 | $787 |
| High school, any 3 | $987 | $1,117 |
| High school, all 4 | $1,317 | $1,487 |

- Mixed bundles (one Core, one Advanced) take the same percentage off the combined list price, rounded to end in 7.
- Paying the 3-month term upfront: about 5% off, rounded to end in 7.

Credits:
- $50 per single-subject purchase, including the trial. $65 per bundle.
- Issued at purchase. Valid until the purchased course's end date + 30 days.
- The family must *buy* within that window; the new course can start later.
- One credit per purchase. Credits do not stack.
- Can a credit renew the same package? [OPEN] Default it to "different course only" behind a config switch.

## Phase 4: Pricing page `/pricing`
Build the page from the approved mock (the GrowWise Pricing Page design), reading every value from the pricing config. Sections, in order:
1. **Hero:** "One learning system. One monthly price per subject."
2. **Five-step system strip:** assessment → live class → gap lessons → reteach → parent dashboard.
3. **Grade-band tabs** (Elementary / Middle / High school), using accessible tabs. Each tab shows Trial, Core and Advanced cards. Elementary's Advanced card says "Advanced pathways start in middle school." Show the subjects for each band.
4. **"What each plan includes" table:** Trial vs Elementary vs Middle vs High school.
5. **Ways to save:** bundles, the $50/$65 credit, paying upfront, the homework add-on.
6. **FAQ**, with FAQPage schema covering only these questions. Leave "What does student support include?" as [OPEN].
7. **Closing call to action:** "Book free assessment."

Requirements:
- No per-hour figures anywhere.
- Works at 390 px width.
- One primary call to action sitewide: "Book a free assessment."

## Phase 5: Subject pages
- Create `/academic/science/chemistry` and `/academic/science/physics`, plus one page per AP course listed in Phase 3. Each states:
  - grades
  - lanes
  - the math prerequisites (AP Physics C requires calculus)
  - that online classes use simulations and hands-on labs stay with the student's school
- Update `/academic/math/elementary` and `/academic/english/elementary` to say grades 3–5.
- Add Course schema only for courses that exist. Use `offers` only if the price comes from the config.

## Phase 6: Checkout and account logic
Inspect the existing enrollment and payment stack first, and post a plan before writing code. Use test mode only, and never use live keys.

**Trial eligibility:** one trial per student profile per subject SKU. Hide the trial option in checkout once a student has used it.

**Credits ledger:**
- On a paid order, issue a credit of $50 (single subject) or $65 (bundle), with `expires_at = course_end_date + 30 days`.
- Apply a credit to a new purchase only when `order_date <= expires_at`.
- One credit per order. Mark a credit as consumed once used.
- Put the expiry date on the receipt and the parent dashboard ("Your $50 credit expires Mar 30").
- Send reminder emails 14 days and 3 days before expiry.
- Legal note: California gift-certificate rules (Cal. Civ. Code §1749.5) require any expiry date on a promotional credit to be printed on its face in capital letters in at least 10-point font. Flag the receipt and dashboard copy for legal review. Do not ship credit expiry until that review is done.

**Bundles and discounts:**
- Compute bundle prices and the upfront discount from the config.
- Each subject keeps its own SKU on the order lines.

**Student profile and privacy notice:** Parents may provide a student's name to create a profile or access a free resource. Disclose what the website collects, why it collects it, and that the information is handed off to Omnix360 in the privacy notice and at the relevant form. Omnix360 is the system of record for student profiles, consent, the parent dashboard, and data retention. Use the Omnix360 handoff; do not create a duplicate student record or bypass its parent and privacy controls.

## Phase 7: Online assessment flow
The flow is: `/self-check` → `/book-assessment` (30-min Zoom, time-zone aware) → Learning Snapshot sent the same day.

The Learning Snapshot includes:
- the main mistake pattern
- the gap found
- the recommended placement: band, lane, subject and plan, with a direct link to the matching `/pricing` card

## Deliverables
- One PR per phase, each with a checklist and before/after evidence (curl output, screenshots).
- An updated sitemap reflecting the redirects and new pages, with no redirected URL listed.
- A list of every [OPEN] placeholder left in the code.

## Do not do (owner tasks, outside the codebase)
- Google Business Profile: mark it closed or remove it after the last in-person day. Online-only businesses aren't eligible for a profile.
- Collecting testimonials from current families before the profile closes.
- Final legal review of promotional-credit expiry wording.