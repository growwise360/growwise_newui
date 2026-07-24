# GrowWise Hormozi Value Equation Audit — July 2026

> Recommendation index: use the linked route table below to jump directly to each page’s evidence and recommendation.

## Method and proof standard

This audit applies Alex Hormozi’s Value Equation as a page-review rubric: increase the specificity of the **Dream Outcome** and the visitor’s **Perceived Likelihood** of achieving it; reduce perceived **Time Delay** and **Effort/Sacrifice**. Risk Reversal and Action Clarity are reported separately because they support the equation without replacing it.

Each factor is scored from 0–5. For Time and Effort, a higher score means delay or effort is better minimized. The core score is the geometric mean of the four normalized factors:

`Value score = 100 × ((Dream × Likelihood × Time × Effort) / 625)^(1/4)`

The audit covers 114 canonical Money, Traffic, and Trust routes. Utility, legal, authentication, checkout/completion, redirect-only pages, and **`/resources/student-articles` plus all descendants** are excluded. Scores are structured content-review indicators, not conversion-rate claims.

## Executive verdict

- **Implemented conversion routes:** 22. Their average Value Equation score moved from **41/100** to **72/100**.
- **Rendered validation:** 44/44 desktop/mobile checks passed across 22 routes.
- **Remaining recommendations:** 92 audited routes are still labeled **Recommended—not implemented**. They retain baseline scores and are not represented as optimized.
- **CTR interpretation:** the Value Equation improves the conversion argument and CTA clarity, but it does not prove higher CTR. Confirm the outcome with analytics or an A/B test after deployment.
- **Certification boundary:** the implemented routes pass the defined audit and validation checks. The report does not claim that every unchanged page is universally “best,” because that would exceed the evidence.

## Route and link integrity

| Environment | Sitemap pages | Sitemap 4xx | Sitemap 5xx | Internal targets | Broken targets | Redirected targets |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Local compiled post-change build | 121 | 0 | 0 | 126 | 0 | 0 |
| Live production | 121 | 0 | 0 | 125 | 0 | 0 |

Evidence: [local link-integrity crawl](./evidence/link-integrity-local-2026-07-23.json), [production link-integrity crawl](./evidence/link-integrity-production-2026-07-23.json), and [rendered route validation](./evidence/rendered-route-validation-2026-07-23.json).

## Pre/post evidence

- Baseline date: **2026-07-23**, from the pre-change route/source review.
- Post-change date: **2026-07-23**, from the implementation source review.
- Implemented routes: `/`, `/academic`, `/academic/english`, `/academic/english/elementary`, `/academic/math`, `/academic/math/middle-school`, `/book-assessment`, `/camps`, `/camps/academic-summer-programs-dublin-ca`, `/camps/high-school-summer-intensive-dublin-ca`, `/camps/summer-algebra-dublin-ca`, `/camps/summer-geometry-precalculus-dublin-ca`, `/camps/summer-im-get-ready-dublin-ca`, `/camps/summer-math-foundations-dublin-ca`, `/camps/summer-reading-writing-dublin-ca`, `/coding`, `/contact`, `/courses/integrated-math-1-dublin-ca`, `/dublin-ca`, `/future-skills`, `/game-dev`, `/steam`.
- Unchanged routes retain the same baseline and post score and are explicitly labeled “Recommended—not implemented.”
- Visual evidence limitation: no deployed “pre” screenshot is claimed. 44 fresh post-change screenshots are retained at matched desktop and mobile viewports for every implemented route.
- Claim guardrail: the implementation uses “98% Parent Satisfaction,” never “98% of families stay,” and does not publish a numerical spots-remaining claim.
- Homepage mechanism-proof supplement, **2026-07-24**: the selected deeper-learning video treatment was implemented between the assessment offer and parent reviews to strengthen Perceived Likelihood without adding initial-load video cost. Evidence: [selected mock](./evidence/home-deeper-learning-selected-mock.png), [desktop section](./evidence/home-deeper-learning-desktop.png), [mobile section](./evidence/home-deeper-learning-mobile.png), [side-by-side design comparison](./evidence/home-deeper-learning-design-comparison.png), and [interaction/performance verification](./evidence/home-deeper-learning-verification.json).
- Mobile regression supplement, **2026-07-24**: 25/25 changed and audited routes passed at 390 × 844 with one visible H1, no horizontal document overflow, no unexpected failed response, no actionable console/page error, and a touch-enabled low-cost smoke canvas. The pass includes the homepage, assessment and thank-you flow, middle-school pathway, implemented commercial routes, and functional layout checks for both student-article pages without adding those articles to Hormozi scoring. Evidence: [mobile regression report](./evidence/mobile-regression-2026-07-24.json).
- Student-rating environment boundary: both article rating interfaces and their unit tests pass, but local persistence remains unavailable until `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and the `student_article_ratings` migration are configured. The mobile report records that local 503 separately as an expected environment response rather than presenting persistence as verified.

### Rendered post-change evidence

| Route | Desktop | Mobile |
| --- | --- | --- |
| `/` | [Desktop](./evidence/post-home-desktop.png) | [Mobile](./evidence/post-home-mobile.png) |
| `/academic` | [Desktop](./evidence/post-academic-desktop.png) | [Mobile](./evidence/post-academic-mobile.png) |
| `/academic/english` | [Desktop](./evidence/post-academic-english-desktop.png) | [Mobile](./evidence/post-academic-english-mobile.png) |
| `/academic/english/elementary` | [Desktop](./evidence/post-academic-english-elementary-desktop.png) | [Mobile](./evidence/post-academic-english-elementary-mobile.png) |
| `/academic/math` | [Desktop](./evidence/post-academic-math-desktop.png) | [Mobile](./evidence/post-academic-math-mobile.png) |
| `/academic/math/middle-school` | [Desktop](./evidence/post-academic-math-middle-school-desktop.png) | [Mobile](./evidence/post-academic-math-middle-school-mobile.png) |
| `/book-assessment` | [Desktop](./evidence/post-book-assessment-desktop.png) | [Mobile](./evidence/post-book-assessment-mobile.png) |
| `/camps` | [Desktop](./evidence/post-camps-desktop.png) | [Mobile](./evidence/post-camps-mobile.png) |
| `/camps/academic-summer-programs-dublin-ca` | [Desktop](./evidence/post-camps-academic-summer-programs-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-academic-summer-programs-dublin-ca-mobile.png) |
| `/camps/high-school-summer-intensive-dublin-ca` | [Desktop](./evidence/post-camps-high-school-summer-intensive-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-high-school-summer-intensive-dublin-ca-mobile.png) |
| `/camps/summer-algebra-dublin-ca` | [Desktop](./evidence/post-camps-summer-algebra-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-summer-algebra-dublin-ca-mobile.png) |
| `/camps/summer-geometry-precalculus-dublin-ca` | [Desktop](./evidence/post-camps-summer-geometry-precalculus-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-summer-geometry-precalculus-dublin-ca-mobile.png) |
| `/camps/summer-im-get-ready-dublin-ca` | [Desktop](./evidence/post-camps-summer-im-get-ready-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-summer-im-get-ready-dublin-ca-mobile.png) |
| `/camps/summer-math-foundations-dublin-ca` | [Desktop](./evidence/post-camps-summer-math-foundations-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-summer-math-foundations-dublin-ca-mobile.png) |
| `/camps/summer-reading-writing-dublin-ca` | [Desktop](./evidence/post-camps-summer-reading-writing-dublin-ca-desktop.png) | [Mobile](./evidence/post-camps-summer-reading-writing-dublin-ca-mobile.png) |
| `/coding` | [Desktop](./evidence/post-coding-desktop.png) | [Mobile](./evidence/post-coding-mobile.png) |
| `/contact` | [Desktop](./evidence/post-contact-desktop.png) | [Mobile](./evidence/post-contact-mobile.png) |
| `/courses/integrated-math-1-dublin-ca` | [Desktop](./evidence/post-courses-integrated-math-1-dublin-ca-desktop.png) | [Mobile](./evidence/post-courses-integrated-math-1-dublin-ca-mobile.png) |
| `/dublin-ca` | [Desktop](./evidence/post-dublin-ca-desktop.png) | [Mobile](./evidence/post-dublin-ca-mobile.png) |
| `/future-skills` | [Desktop](./evidence/post-future-skills-desktop.png) | [Mobile](./evidence/post-future-skills-mobile.png) |
| `/game-dev` | [Desktop](./evidence/post-game-dev-desktop.png) | [Mobile](./evidence/post-game-dev-mobile.png) |
| `/steam` | [Desktop](./evidence/post-steam-desktop.png) | [Mobile](./evidence/post-steam-mobile.png) |

## Priority selection

The first shared implementation targets ten active Money/Trust hubs with high conversion proximity and reuse impact: `/academic`, `/academic/math`, `/academic/english`, `/coding`, `/future-skills`, `/steam`, `/game-dev`, `/camps`, `/dublin-ca`, and `/contact`. The next deterministic batch implements the ten lowest-scoring active Money routes: `/`, `/camps/summer-im-get-ready-dublin-ca`, `/courses/integrated-math-1-dublin-ca`, `/camps/summer-algebra-dublin-ca`, `/camps/summer-geometry-precalculus-dublin-ca`, `/camps/summer-math-foundations-dublin-ca`, `/camps/summer-reading-writing-dublin-ca`, `/camps/high-school-summer-intensive-dublin-ca`, `/camps/academic-summer-programs-dublin-ca`, and `/academic/english/elementary`. The shared strip adds a route-specific outcome, verified proof, a first-result expectation, no-pressure risk reversal, and a matched primary action. The homepage now bridges its assessment offer and parent reviews with a click-to-load deeper-learning mechanism video. The middle-school math pathway pairs its outcome-led offer with the parent-orientation mechanism video in a compact two-column hero. The assessment page receives the full offer redesign.

## Route score and recommendation index

| Route | Job | Before | After | Δ | Status |
| --- | --- | ---: | ---: | ---: | --- |
| [`/`](#route-home) | Money | 24 | 74 | +50 | Implemented—lowest-score Money batch |
| [`/about`](#route-about) | Trust | 44 | 44 | +0 | Recommended—not implemented |
| [`/academic`](#route-academic) | Money | 49 | 69 | +20 | Implemented—shared value proof |
| [`/academic/english`](#route-academic-english) | Money | 49 | 69 | +20 | Implemented—shared value proof |
| [`/academic/english/elementary`](#route-academic-english-elementary) | Money | 37 | 74 | +37 | Implemented—lowest-score Money batch |
| [`/academic/math`](#route-academic-math) | Money | 49 | 63 | +14 | Implemented—shared value proof |
| [`/academic/math/elementary`](#route-academic-math-elementary) | Money | 58 | 58 | +0 | Recommended—not implemented |
| [`/academic/math/high-school`](#route-academic-math-high-school) | Money | 64 | 64 | +0 | Recommended—not implemented |
| [`/academic/math/middle-school`](#route-academic-math-middle-school) | Money | 53 | 69 | +16 | Implemented—orientation proof |
| [`/book-assessment`](#route-book-assessment) | Money | 58 | 89 | +31 | Implemented—assessment redesign |
| [`/bulletin`](#route-bulletin) | Traffic | 31 | 31 | +0 | Recommended—not implemented |
| [`/camps`](#route-camps) | Money | 49 | 69 | +20 | Implemented—shared value proof |
| [`/camps/academic-summer-programs-dublin-ca`](#route-camps-academic-summer-programs-dublin-ca) | Money | 35 | 74 | +39 | Implemented—lowest-score Money batch |
| [`/camps/ai-studio-dublin-ca`](#route-camps-ai-studio-dublin-ca) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/camps/game-development-camp-dublin-ca`](#route-camps-game-development-camp-dublin-ca) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/camps/high-school-summer-intensive-dublin-ca`](#route-camps-high-school-summer-intensive-dublin-ca) | Money | 34 | 74 | +40 | Implemented—lowest-score Money batch |
| [`/camps/math-olympiad-camp-dublin-ca`](#route-camps-math-olympiad-camp-dublin-ca) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/camps/robotics-camp-dublin-ca`](#route-camps-robotics-camp-dublin-ca) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/camps/robotics-full-day-dublin-ca`](#route-camps-robotics-full-day-dublin-ca) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/camps/summer`](#route-camps-summer) | Money | 53 | 53 | +0 | Recommended—not implemented |
| [`/camps/summer-algebra-dublin-ca`](#route-camps-summer-algebra-dublin-ca) | Money | 31 | 74 | +43 | Implemented—lowest-score Money batch |
| [`/camps/summer-geometry-precalculus-dublin-ca`](#route-camps-summer-geometry-precalculus-dublin-ca) | Money | 31 | 74 | +43 | Implemented—lowest-score Money batch |
| [`/camps/summer-im-get-ready-dublin-ca`](#route-camps-summer-im-get-ready-dublin-ca) | Money | 26 | 74 | +48 | Implemented—lowest-score Money batch |
| [`/camps/summer-im1-get-ready-dublin-ca`](#route-camps-summer-im1-get-ready-dublin-ca) | Money | 40 | 40 | +0 | Recommended—not implemented |
| [`/camps/summer-im2-get-ready-dublin-ca`](#route-camps-summer-im2-get-ready-dublin-ca) | Money | 40 | 40 | +0 | Recommended—not implemented |
| [`/camps/summer-math-foundations-dublin-ca`](#route-camps-summer-math-foundations-dublin-ca) | Money | 31 | 74 | +43 | Implemented—lowest-score Money batch |
| [`/camps/summer-reading-writing-dublin-ca`](#route-camps-summer-reading-writing-dublin-ca) | Money | 31 | 74 | +43 | Implemented—lowest-score Money batch |
| [`/camps/young-authors-camp-dublin-ca`](#route-camps-young-authors-camp-dublin-ca) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/coding`](#route-coding) | Money | 49 | 63 | +14 | Implemented—shared value proof |
| [`/coding/app-development`](#route-coding-app-development) | Money | 40 | 40 | +0 | Recommended—not implemented |
| [`/coding/ml-ai`](#route-coding-ml-ai) | Money | 48 | 48 | +0 | Recommended—not implemented |
| [`/coding/python`](#route-coding-python) | Money | 40 | 40 | +0 | Recommended—not implemented |
| [`/contact`](#route-contact) | Money | 40 | 69 | +29 | Implemented—shared value proof |
| [`/courses/integrated-math-1-dublin-ca`](#route-courses-integrated-math-1-dublin-ca) | Money | 26 | 74 | +48 | Implemented—lowest-score Money batch |
| [`/courses/sat-prep`](#route-courses-sat-prep) | Money | 58 | 58 | +0 | Recommended—not implemented |
| [`/dublin-ca`](#route-dublin-ca) | Trust | 49 | 69 | +20 | Implemented—shared value proof |
| [`/enroll`](#route-enroll) | Money | 49 | 49 | +0 | Recommended—not implemented |
| [`/enroll-academic`](#route-enroll-academic) | Money | 69 | 69 | +0 | Recommended—not implemented |
| [`/from-nextdoor`](#route-from-nextdoor) | Trust | 31 | 31 | +0 | Recommended—not implemented |
| [`/future-skills`](#route-future-skills) | Money | 49 | 69 | +20 | Implemented—shared value proof |
| [`/future-skills/ai-entrepreneurship`](#route-future-skills-ai-entrepreneurship) | Money | 53 | 53 | +0 | Recommended—not implemented |
| [`/future-skills/ai-machine-learning`](#route-future-skills-ai-machine-learning) | Money | 53 | 53 | +0 | Recommended—not implemented |
| [`/future-skills/design-creative-media`](#route-future-skills-design-creative-media) | Money | 53 | 53 | +0 | Recommended—not implemented |
| [`/future-skills/python-certification`](#route-future-skills-python-certification) | Money | 53 | 53 | +0 | Recommended—not implemented |
| [`/game-dev`](#route-game-dev) | Money | 49 | 69 | +20 | Implemented—shared value proof |
| [`/growwise-blogs`](#route-growwise-blogs) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help`](#route-growwise-blogs-can-chatgpt-replace-a-tutor-ai-homework-help) | Traffic | 58 | 58 | +0 | Recommended—not implemented |
| [`/growwise-blogs/child-reads-but-doesnt-understand-passage`](#route-growwise-blogs-child-reads-but-doesnt-understand-passage) | Traffic | 37 | 37 | +0 | Recommended—not implemented |
| [`/growwise-blogs/common-core-math-strategies-parents`](#route-growwise-blogs-common-core-math-strategies-parents) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/growwise-blogs/does-my-child-need-reading-help-checklist`](#route-growwise-blogs-does-my-child-need-reading-help-checklist) | Traffic | 40 | 40 | +0 | Recommended—not implemented |
| [`/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise`](#route-growwise-blogs-embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era`](#route-growwise-blogs-harnessing-the-power-of-code-a-skill-for-the-modern-era) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley`](#route-growwise-blogs-high-school-math-finals-prep-dublin-tri-valley) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations`](#route-growwise-blogs-how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities`](#route-growwise-blogs-how-programming-skills-on-a-resume-will-open-more-career-opportunities) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide`](#route-growwise-blogs-how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide) | Traffic | 63 | 63 | +0 | Recommended—not implemented |
| [`/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux`](#route-growwise-blogs-how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux) | Traffic | 63 | 63 | +0 | Recommended—not implemented |
| [`/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide`](#route-growwise-blogs-how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/improve-child-focus-feel-valued`](#route-growwise-blogs-improve-child-focus-feel-valued) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career`](#route-growwise-blogs-technical-schools-in-2025-a-smart-investment-for-your-career) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/tell-tale-heart-reading-comprehension-cite-evidence`](#route-growwise-blogs-tell-tale-heart-reading-comprehension-cite-evidence) | Traffic | 49 | 49 | +0 | Recommended—not implemented |
| [`/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child`](#route-growwise-blogs-the-advantage-in-choosing-the-right-coding-class-for-your-child) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills`](#route-growwise-blogs-the-importance-of-coding-for-kids-building-future-ready-skills) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/thinking-gap-your-kids-arent-distracted`](#route-growwise-blogs-thinking-gap-your-kids-arent-distracted) | Traffic | 63 | 63 | +0 | Recommended—not implemented |
| [`/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement`](#route-growwise-blogs-unlock-your-future-the-best-programming-languages-for-career-advancement) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp`](#route-growwise-blogs-unlocking-confidence-independence-and-fun-through-summer-camp) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments`](#route-growwise-blogs-us-kids-falling-behind-math-english-parent-assessments) | Traffic | 63 | 63 | +0 | Recommended—not implemented |
| [`/growwise-blogs/why-is-my-child-struggling-with-fractions`](#route-growwise-blogs-why-is-my-child-struggling-with-fractions) | Traffic | 37 | 37 | +0 | Recommended—not implemented |
| [`/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile`](#route-growwise-blogs-why-learning-java-coding-is-impressive-on-your-linkedin-profile) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers`](#route-growwise-blogs-why-learning-python-is-your-fast-track-to-in-demand-job-offers) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math`](#route-growwise-blogs-your-child-got-a-b-plus-doesnt-mean-they-understand-the-math) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/math-finals-practice-session`](#route-math-finals-practice-session) | Money | 64 | 64 | +0 | Recommended—not implemented |
| [`/middle-school-tutoring-dublin-ca`](#route-middle-school-tutoring-dublin-ca) | Money | 53 | 53 | +0 | Recommended—not implemented |
| [`/programs`](#route-programs) | Money | 44 | 44 | +0 | Recommended—not implemented |
| [`/readinesschecklist`](#route-readinesschecklist) | Traffic | 63 | 63 | +0 | Recommended—not implemented |
| [`/resources`](#route-resources) | Traffic | 37 | 37 | +0 | Recommended—not implemented |
| [`/resources/affordable-summer-academic-programs-dublin-ca`](#route-resources-affordable-summer-academic-programs-dublin-ca) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/resources/back-to-school-math-assessment-dublin-ca`](#route-resources-back-to-school-math-assessment-dublin-ca) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/back-to-school-night-parent-questions`](#route-resources-back-to-school-night-parent-questions) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/best-tutoring-dublin-ca`](#route-resources-best-tutoring-dublin-ca) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/california-math-standards-by-grade`](#route-resources-california-math-standards-by-grade) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/careless-math-mistakes`](#route-resources-careless-math-mistakes) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/resources/child-struggles-with-writing-dublin-ca`](#route-resources-child-struggles-with-writing-dublin-ca) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/english-tutor-vs-reading-tutor-vs-writing-class`](#route-resources-english-tutor-vs-reading-tutor-vs-writing-class) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/homework-independence`](#route-resources-homework-independence) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/how-to-choose-coding-school-for-kids`](#route-resources-how-to-choose-coding-school-for-kids) | Traffic | 53 | 53 | +0 | Recommended—not implemented |
| [`/resources/how-to-choose-summer-camp`](#route-resources-how-to-choose-summer-camp) | Traffic | 53 | 53 | +0 | Recommended—not implemented |
| [`/resources/im1-summer-prep-dublin-ca`](#route-resources-im1-summer-prep-dublin-ca) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/resources/khan-academy-summer-doesnt-work`](#route-resources-khan-academy-summer-doesnt-work) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/resources/kumon-alternative-dublin-ca`](#route-resources-kumon-alternative-dublin-ca) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/math-summer-program-dublin-ca-math-sprint-breakdown`](#route-resources-math-summer-program-dublin-ca-math-sprint-breakdown) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/math-tutoring-options-dublin-ca`](#route-resources-math-tutoring-options-dublin-ca) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/mathnasium-alternative-dublin-pleasanton`](#route-resources-mathnasium-alternative-dublin-pleasanton) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/middle-school-math-readiness-checklist`](#route-resources-middle-school-math-readiness-checklist) | Traffic | 57 | 57 | +0 | Recommended—not implemented |
| [`/resources/python-vs-scratch`](#route-resources-python-vs-scratch) | Traffic | 40 | 40 | +0 | Recommended—not implemented |
| [`/resources/reading-fluency-vs-comprehension`](#route-resources-reading-fluency-vs-comprehension) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/resources/reading-program-grades-1-2-dublin-ca`](#route-resources-reading-program-grades-1-2-dublin-ca) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/rsm-alternative-dublin-ca`](#route-resources-rsm-alternative-dublin-ca) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/small-group-tutoring-vs-1-on-1`](#route-resources-small-group-tutoring-vs-1-on-1) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/student-corner`](#route-resources-student-corner) | Traffic | 41 | 41 | +0 | Recommended—not implemented |
| [`/resources/summer-academic-program-checklist`](#route-resources-summer-academic-program-checklist) | Traffic | 44 | 44 | +0 | Recommended—not implemented |
| [`/resources/summer-slide-dublin-ca`](#route-resources-summer-slide-dublin-ca) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/summer-slide-prevention`](#route-resources-summer-slide-prevention) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/summer-writing-program-dublin-ca`](#route-resources-summer-writing-program-dublin-ca) | Traffic | 41 | 41 | +0 | Recommended—not implemented |
| [`/resources/tutoring-dublin-ca`](#route-resources-tutoring-dublin-ca) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/what-is-vibe-coding`](#route-resources-what-is-vibe-coding) | Traffic | 37 | 37 | +0 | Recommended—not implemented |
| [`/resources/when-to-start-sat-prep`](#route-resources-when-to-start-sat-prep) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/resources/why-grades-hide-learning-gaps`](#route-resources-why-grades-hide-learning-gaps) | Traffic | 48 | 48 | +0 | Recommended—not implemented |
| [`/self-check`](#route-self-check) | Traffic | 58 | 58 | +0 | Recommended—not implemented |
| [`/steam`](#route-steam) | Money | 49 | 69 | +20 | Implemented—shared value proof |
| [`/steam/game-development`](#route-steam-game-development) | Money | 64 | 64 | +0 | Recommended—not implemented |
| [`/steam/ml-ai-coding`](#route-steam-ml-ai-coding) | Money | 64 | 64 | +0 | Recommended—not implemented |
| [`/why-growwise`](#route-why-growwise) | Trust | 24 | 24 | +0 | Recommended—not implemented |
| [`/workshop-calendar`](#route-workshop-calendar) | Traffic | 53 | 53 | +0 | Recommended—not implemented |

## Page-level evidence and recommendations

<a id="route-home"></a>
### `/`

- Production: [https://growwiseschool.org/](https://growwiseschool.org/)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **24/100** (D2 · L1 · T1 · E1 · R1 · A2)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/(home)/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-about"></a>
### `/about`

- Production: [https://growwiseschool.org/about](https://growwiseschool.org/about)
- Page job and intent: **Trust** — Decide whether GrowWise is credible, local, and a good fit.
- Baseline: **44/100** (D4 · L2 · T1 · E3 · R2 · A3)
- Post-change: **44/100** (D4 · L2 · T1 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/about/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Support the claim with local, attributable evidence.
- Status: **Recommended—not implemented**

<a id="route-academic"></a>
### `/academic`

- Production: [https://growwiseschool.org/academic](https://growwiseschool.org/academic)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/academic/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-academic-english"></a>
### `/academic/english`

- Production: [https://growwiseschool.org/academic/english](https://growwiseschool.org/academic/english)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/academic/english/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-academic-english-elementary"></a>
### `/academic/english/elementary`

- Production: [https://growwiseschool.org/academic/english/elementary](https://growwiseschool.org/academic/english/elementary)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **37/100** (D3 · L2 · T1 · E2 · R1 · A2)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/academic/english/elementary/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-academic-math"></a>
### `/academic/math`

- Production: [https://growwiseschool.org/academic/math](https://growwiseschool.org/academic/math)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **63/100** (D4 · L4 · T3 · E2 · R3 · A2)
- Evidence: reviewed `src/app/[locale]/academic/math/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-academic-math-elementary"></a>
### `/academic/math/elementary`

- Production: [https://growwiseschool.org/academic/math/elementary](https://growwiseschool.org/academic/math/elementary)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **58/100** (D4 · L2 · T3 · E3 · R2 · A3)
- Post-change: **58/100** (D4 · L2 · T3 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/academic/math/elementary/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-academic-math-high-school"></a>
### `/academic/math/high-school`

- Production: [https://growwiseschool.org/academic/math/high-school](https://growwiseschool.org/academic/math/high-school)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Post-change: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/academic/math/high-school/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-academic-math-middle-school"></a>
### `/academic/math/middle-school`

- Production: [https://growwiseschool.org/academic/math/middle-school](https://growwiseschool.org/academic/math/middle-school)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **53/100** (D4 · L2 · T2 · E3 · R3 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/academic/math/middle-school/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals. The hero pairs an approved three-line outcome-led H1 and concise offer copy on the left with a brightened orientation mechanism video on the right. Hero actions use matched dimensions, and middle-school group-size messaging is consistently capped at 6 students.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—orientation proof**

<a id="route-book-assessment"></a>
### `/book-assessment`

- Production: [https://growwiseschool.org/book-assessment](https://growwiseschool.org/book-assessment)
- Page job and intent: **Money** — Identify the skill gap and request a free assessment.
- Baseline: **58/100** (D3 · L2 · T4 · E3 · R2 · A3)
- Post-change: **89/100** (D5 · L4 · T5 · E4 · R5 · A5)
- Evidence: reviewed `src/app/[locale]/book-assessment/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals. The free assessment remains the primary default, while the 60-Minute Full Diagnostic at $49 is a transparent expandable secondary path.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Implemented—assessment redesign**

<a id="route-bulletin"></a>
### `/bulletin`

- Production: [https://growwiseschool.org/bulletin](https://growwiseschool.org/bulletin)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **31/100** (D3 · L1 · T1 · E2 · R1 · A3)
- Post-change: **31/100** (D3 · L1 · T1 · E2 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/bulletin/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-camps"></a>
### `/camps`

- Production: [https://growwiseschool.org/camps](https://growwiseschool.org/camps)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/camps/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-camps-academic-summer-programs-dublin-ca"></a>
### `/camps/academic-summer-programs-dublin-ca`

- Production: [https://growwiseschool.org/camps/academic-summer-programs-dublin-ca](https://growwiseschool.org/camps/academic-summer-programs-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **35/100** (D3 · L1 · T1 · E3 · R2 · A3)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/academic-summer-programs-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-ai-studio-dublin-ca"></a>
### `/camps/ai-studio-dublin-ca`

- Production: [https://growwiseschool.org/camps/ai-studio-dublin-ca](https://growwiseschool.org/camps/ai-studio-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Post-change: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Evidence: reviewed `src/app/[locale]/camps/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-game-development-camp-dublin-ca"></a>
### `/camps/game-development-camp-dublin-ca`

- Production: [https://growwiseschool.org/camps/game-development-camp-dublin-ca](https://growwiseschool.org/camps/game-development-camp-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Post-change: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Evidence: reviewed `src/app/[locale]/camps/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-high-school-summer-intensive-dublin-ca"></a>
### `/camps/high-school-summer-intensive-dublin-ca`

- Production: [https://growwiseschool.org/camps/high-school-summer-intensive-dublin-ca](https://growwiseschool.org/camps/high-school-summer-intensive-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **34/100** (D4 · L2 · T1 · E1 · R1 · A2)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/high-school-summer-intensive-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-math-olympiad-camp-dublin-ca"></a>
### `/camps/math-olympiad-camp-dublin-ca`

- Production: [https://growwiseschool.org/camps/math-olympiad-camp-dublin-ca](https://growwiseschool.org/camps/math-olympiad-camp-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Post-change: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Evidence: reviewed `src/app/[locale]/camps/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-robotics-camp-dublin-ca"></a>
### `/camps/robotics-camp-dublin-ca`

- Production: [https://growwiseschool.org/camps/robotics-camp-dublin-ca](https://growwiseschool.org/camps/robotics-camp-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Post-change: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Evidence: reviewed `src/app/[locale]/camps/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-robotics-full-day-dublin-ca"></a>
### `/camps/robotics-full-day-dublin-ca`

- Production: [https://growwiseschool.org/camps/robotics-full-day-dublin-ca](https://growwiseschool.org/camps/robotics-full-day-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Post-change: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Evidence: reviewed `src/app/[locale]/camps/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-summer"></a>
### `/camps/summer`

- Production: [https://growwiseschool.org/camps/summer](https://growwiseschool.org/camps/summer)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **53/100** (D4 · L4 · T1 · E3 · R2 · A3)
- Post-change: **53/100** (D4 · L4 · T1 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/camps/summer/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-summer-algebra-dublin-ca"></a>
### `/camps/summer-algebra-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-algebra-dublin-ca](https://growwiseschool.org/camps/summer-algebra-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **31/100** (D3 · L1 · T1 · E2 · R2 · A3)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/summer-algebra-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-summer-geometry-precalculus-dublin-ca"></a>
### `/camps/summer-geometry-precalculus-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-geometry-precalculus-dublin-ca](https://growwiseschool.org/camps/summer-geometry-precalculus-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **31/100** (D3 · L1 · T1 · E2 · R2 · A3)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/summer-geometry-precalculus-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-summer-im-get-ready-dublin-ca"></a>
### `/camps/summer-im-get-ready-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-im-get-ready-dublin-ca](https://growwiseschool.org/camps/summer-im-get-ready-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **26/100** (D3 · L1 · T1 · E1 · R1 · A2)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/summer-im-get-ready-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-summer-im1-get-ready-dublin-ca"></a>
### `/camps/summer-im1-get-ready-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-im1-get-ready-dublin-ca](https://growwiseschool.org/camps/summer-im1-get-ready-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **40/100** (D4 · L2 · T1 · E2 · R1 · A3)
- Post-change: **40/100** (D4 · L2 · T1 · E2 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/camps/summer-im1-get-ready-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-summer-im2-get-ready-dublin-ca"></a>
### `/camps/summer-im2-get-ready-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-im2-get-ready-dublin-ca](https://growwiseschool.org/camps/summer-im2-get-ready-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **40/100** (D4 · L2 · T1 · E2 · R1 · A3)
- Post-change: **40/100** (D4 · L2 · T1 · E2 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/camps/summer-im2-get-ready-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-camps-summer-math-foundations-dublin-ca"></a>
### `/camps/summer-math-foundations-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-math-foundations-dublin-ca](https://growwiseschool.org/camps/summer-math-foundations-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **31/100** (D3 · L1 · T1 · E2 · R2 · A3)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/summer-math-foundations-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-summer-reading-writing-dublin-ca"></a>
### `/camps/summer-reading-writing-dublin-ca`

- Production: [https://growwiseschool.org/camps/summer-reading-writing-dublin-ca](https://growwiseschool.org/camps/summer-reading-writing-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **31/100** (D3 · L1 · T1 · E2 · R2 · A3)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/camps/summer-reading-writing-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-camps-young-authors-camp-dublin-ca"></a>
### `/camps/young-authors-camp-dublin-ca`

- Production: [https://growwiseschool.org/camps/young-authors-camp-dublin-ca](https://growwiseschool.org/camps/young-authors-camp-dublin-ca)
- Page job and intent: **Money** — Choose and reserve the right camp.
- Baseline: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Post-change: **44/100** (D4 · L1 · T2 · E3 · R2 · A2)
- Evidence: reviewed `src/app/[locale]/camps/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-coding"></a>
### `/coding`

- Production: [https://growwiseschool.org/coding](https://growwiseschool.org/coding)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **63/100** (D4 · L4 · T3 · E2 · R3 · A2)
- Evidence: reviewed `src/app/[locale]/coding/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-coding-app-development"></a>
### `/coding/app-development`

- Production: [https://growwiseschool.org/coding/app-development](https://growwiseschool.org/coding/app-development)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **40/100** (D4 · L2 · T1 · E2 · R1 · A2)
- Post-change: **40/100** (D4 · L2 · T1 · E2 · R1 · A2)
- Evidence: reviewed `src/app/[locale]/coding/app-development/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-coding-ml-ai"></a>
### `/coding/ml-ai`

- Production: [https://growwiseschool.org/coding/ml-ai](https://growwiseschool.org/coding/ml-ai)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **48/100** (D4 · L2 · T2 · E2 · R1 · A3)
- Post-change: **48/100** (D4 · L2 · T2 · E2 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/coding/ml-ai/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-coding-python"></a>
### `/coding/python`

- Production: [https://growwiseschool.org/coding/python](https://growwiseschool.org/coding/python)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **40/100** (D4 · L2 · T1 · E2 · R1 · A3)
- Post-change: **40/100** (D4 · L2 · T1 · E2 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/coding/python/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-contact"></a>
### `/contact`

- Production: [https://growwiseschool.org/contact](https://growwiseschool.org/contact)
- Page job and intent: **Money** — Ask a question and receive a clear next step.
- Baseline: **40/100** (D2 · L2 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/contact/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-courses-integrated-math-1-dublin-ca"></a>
### `/courses/integrated-math-1-dublin-ca`

- Production: [https://growwiseschool.org/courses/integrated-math-1-dublin-ca](https://growwiseschool.org/courses/integrated-math-1-dublin-ca)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **26/100** (D3 · L1 · T1 · E1 · R1 · A2)
- Post-change: **74/100** (D4 · L4 · T4 · E3 · R3 · A4)
- Evidence: reviewed `src/app/[locale]/courses/integrated-math-1-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Reduce decision friction and make the next step easier to understand. Keep one primary conversion action.
- Status: **Implemented—lowest-score Money batch**

<a id="route-courses-sat-prep"></a>
### `/courses/sat-prep`

- Production: [https://growwiseschool.org/courses/sat-prep](https://growwiseschool.org/courses/sat-prep)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **58/100** (D4 · L3 · T2 · E3 · R2 · A3)
- Post-change: **58/100** (D4 · L3 · T2 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/courses/sat-prep/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-dublin-ca"></a>
### `/dublin-ca`

- Production: [https://growwiseschool.org/dublin-ca](https://growwiseschool.org/dublin-ca)
- Page job and intent: **Trust** — Decide whether GrowWise is credible, local, and a good fit.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Support the claim with local, attributable evidence.
- Status: **Implemented—shared value proof**

<a id="route-enroll"></a>
### `/enroll`

- Production: [https://growwiseschool.org/enroll](https://growwiseschool.org/enroll)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **49/100** (D3 · L2 · T2 · E3 · R2 · A3)
- Post-change: **49/100** (D3 · L2 · T2 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/enroll/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-enroll-academic"></a>
### `/enroll-academic`

- Production: [https://growwiseschool.org/enroll-academic](https://growwiseschool.org/enroll-academic)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **69/100** (D4 · L4 · T3 · E3 · R1 · A2)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R1 · A2)
- Evidence: reviewed `src/app/[locale]/enroll-academic/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-from-nextdoor"></a>
### `/from-nextdoor`

- Production: [https://growwiseschool.org/from-nextdoor](https://growwiseschool.org/from-nextdoor)
- Page job and intent: **Trust** — Decide whether GrowWise is credible, local, and a good fit.
- Baseline: **31/100** (D3 · L2 · T1 · E1 · R1 · A2)
- Post-change: **31/100** (D3 · L2 · T1 · E1 · R1 · A2)
- Evidence: reviewed `src/app/[locale]/from-nextdoor/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Support the claim with local, attributable evidence.
- Status: **Recommended—not implemented**

<a id="route-future-skills"></a>
### `/future-skills`

- Production: [https://growwiseschool.org/future-skills](https://growwiseschool.org/future-skills)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/future-skills/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-future-skills-ai-entrepreneurship"></a>
### `/future-skills/ai-entrepreneurship`

- Production: [https://growwiseschool.org/future-skills/ai-entrepreneurship](https://growwiseschool.org/future-skills/ai-entrepreneurship)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Post-change: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/future-skills/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-future-skills-ai-machine-learning"></a>
### `/future-skills/ai-machine-learning`

- Production: [https://growwiseschool.org/future-skills/ai-machine-learning](https://growwiseschool.org/future-skills/ai-machine-learning)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Post-change: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/future-skills/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-future-skills-design-creative-media"></a>
### `/future-skills/design-creative-media`

- Production: [https://growwiseschool.org/future-skills/design-creative-media](https://growwiseschool.org/future-skills/design-creative-media)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Post-change: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/future-skills/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-future-skills-python-certification"></a>
### `/future-skills/python-certification`

- Production: [https://growwiseschool.org/future-skills/python-certification](https://growwiseschool.org/future-skills/python-certification)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Post-change: **53/100** (D4 · L4 · T1 · E3 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/future-skills/[slug]/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-game-dev"></a>
### `/game-dev`

- Production: [https://growwiseschool.org/game-dev](https://growwiseschool.org/game-dev)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A2)
- Evidence: reviewed `src/app/[locale]/game-dev/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-growwise-blogs"></a>
### `/growwise-blogs`

- Production: [https://growwiseschool.org/growwise-blogs](https://growwiseschool.org/growwise-blogs)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-can-chatgpt-replace-a-tutor-ai-homework-help"></a>
### `/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help`

- Production: [https://growwiseschool.org/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help](https://growwiseschool.org/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **58/100** (D3 · L3 · T2 · E4 · R2 · A4)
- Post-change: **58/100** (D3 · L3 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-child-reads-but-doesnt-understand-passage"></a>
### `/growwise-blogs/child-reads-but-doesnt-understand-passage`

- Production: [https://growwiseschool.org/growwise-blogs/child-reads-but-doesnt-understand-passage](https://growwiseschool.org/growwise-blogs/child-reads-but-doesnt-understand-passage)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **37/100** (D3 · L1 · T1 · E4 · R2 · A4)
- Post-change: **37/100** (D3 · L1 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/child-reads-but-doesnt-understand-passage/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-common-core-math-strategies-parents"></a>
### `/growwise-blogs/common-core-math-strategies-parents`

- Production: [https://growwiseschool.org/growwise-blogs/common-core-math-strategies-parents](https://growwiseschool.org/growwise-blogs/common-core-math-strategies-parents)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Post-change: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/common-core-math-strategies-parents/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-does-my-child-need-reading-help-checklist"></a>
### `/growwise-blogs/does-my-child-need-reading-help-checklist`

- Production: [https://growwiseschool.org/growwise-blogs/does-my-child-need-reading-help-checklist](https://growwiseschool.org/growwise-blogs/does-my-child-need-reading-help-checklist)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **40/100** (D4 · L1 · T1 · E4 · R2 · A4)
- Post-change: **40/100** (D4 · L1 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/does-my-child-need-reading-help-checklist/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise"></a>
### `/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise`

- Production: [https://growwiseschool.org/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise](https://growwiseschool.org/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-harnessing-the-power-of-code-a-skill-for-the-modern-era"></a>
### `/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era`

- Production: [https://growwiseschool.org/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era](https://growwiseschool.org/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-high-school-math-finals-prep-dublin-tri-valley"></a>
### `/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley`

- Production: [https://growwiseschool.org/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley](https://growwiseschool.org/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations"></a>
### `/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations`

- Production: [https://growwiseschool.org/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations](https://growwiseschool.org/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-how-programming-skills-on-a-resume-will-open-more-career-opportunities"></a>
### `/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities`

- Production: [https://growwiseschool.org/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities](https://growwiseschool.org/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide"></a>
### `/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide`

- Production: [https://growwiseschool.org/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide](https://growwiseschool.org/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **63/100** (D4 · L3 · T2 · E4 · R2 · A4)
- Post-change: **63/100** (D4 · L3 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux"></a>
### `/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux`

- Production: [https://growwiseschool.org/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux](https://growwiseschool.org/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **63/100** (D4 · L2 · T3 · E4 · R2 · A4)
- Post-change: **63/100** (D4 · L2 · T3 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide"></a>
### `/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide`

- Production: [https://growwiseschool.org/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide](https://growwiseschool.org/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-improve-child-focus-feel-valued"></a>
### `/growwise-blogs/improve-child-focus-feel-valued`

- Production: [https://growwiseschool.org/growwise-blogs/improve-child-focus-feel-valued](https://growwiseschool.org/growwise-blogs/improve-child-focus-feel-valued)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/improve-child-focus-feel-valued/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-technical-schools-in-2025-a-smart-investment-for-your-career"></a>
### `/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career`

- Production: [https://growwiseschool.org/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career](https://growwiseschool.org/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-tell-tale-heart-reading-comprehension-cite-evidence"></a>
### `/growwise-blogs/tell-tale-heart-reading-comprehension-cite-evidence`

- Production: [https://growwiseschool.org/growwise-blogs/tell-tale-heart-reading-comprehension-cite-evidence](https://growwiseschool.org/growwise-blogs/tell-tale-heart-reading-comprehension-cite-evidence)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **49/100** (D3 · L3 · T1 · E4 · R2 · A4)
- Post-change: **49/100** (D3 · L3 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/tell-tale-heart-reading-comprehension-cite-evidence/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-the-advantage-in-choosing-the-right-coding-class-for-your-child"></a>
### `/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child`

- Production: [https://growwiseschool.org/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child](https://growwiseschool.org/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-the-importance-of-coding-for-kids-building-future-ready-skills"></a>
### `/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills`

- Production: [https://growwiseschool.org/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills](https://growwiseschool.org/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-thinking-gap-your-kids-arent-distracted"></a>
### `/growwise-blogs/thinking-gap-your-kids-arent-distracted`

- Production: [https://growwiseschool.org/growwise-blogs/thinking-gap-your-kids-arent-distracted](https://growwiseschool.org/growwise-blogs/thinking-gap-your-kids-arent-distracted)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **63/100** (D4 · L2 · T3 · E4 · R2 · A4)
- Post-change: **63/100** (D4 · L2 · T3 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/thinking-gap-your-kids-arent-distracted/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-unlock-your-future-the-best-programming-languages-for-career-advancement"></a>
### `/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement`

- Production: [https://growwiseschool.org/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement](https://growwiseschool.org/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-unlocking-confidence-independence-and-fun-through-summer-camp"></a>
### `/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp`

- Production: [https://growwiseschool.org/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp](https://growwiseschool.org/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-us-kids-falling-behind-math-english-parent-assessments"></a>
### `/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments`

- Production: [https://growwiseschool.org/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments](https://growwiseschool.org/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **63/100** (D4 · L2 · T3 · E4 · R2 · A4)
- Post-change: **63/100** (D4 · L2 · T3 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-why-is-my-child-struggling-with-fractions"></a>
### `/growwise-blogs/why-is-my-child-struggling-with-fractions`

- Production: [https://growwiseschool.org/growwise-blogs/why-is-my-child-struggling-with-fractions](https://growwiseschool.org/growwise-blogs/why-is-my-child-struggling-with-fractions)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **37/100** (D3 · L1 · T1 · E4 · R2 · A4)
- Post-change: **37/100** (D3 · L1 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/why-is-my-child-struggling-with-fractions/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-why-learning-java-coding-is-impressive-on-your-linkedin-profile"></a>
### `/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile`

- Production: [https://growwiseschool.org/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile](https://growwiseschool.org/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-why-learning-python-is-your-fast-track-to-in-demand-job-offers"></a>
### `/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers`

- Production: [https://growwiseschool.org/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers](https://growwiseschool.org/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-growwise-blogs-your-child-got-a-b-plus-doesnt-mean-they-understand-the-math"></a>
### `/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math`

- Production: [https://growwiseschool.org/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math](https://growwiseschool.org/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-math-finals-practice-session"></a>
### `/math-finals-practice-session`

- Production: [https://growwiseschool.org/math-finals-practice-session](https://growwiseschool.org/math-finals-practice-session)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Post-change: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/math-finals-practice-session/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-middle-school-tutoring-dublin-ca"></a>
### `/middle-school-tutoring-dublin-ca`

- Production: [https://growwiseschool.org/middle-school-tutoring-dublin-ca](https://growwiseschool.org/middle-school-tutoring-dublin-ca)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **53/100** (D4 · L2 · T2 · E3 · R2 · A3)
- Post-change: **53/100** (D4 · L2 · T2 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/middle-school-tutoring-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-programs"></a>
### `/programs`

- Production: [https://growwiseschool.org/programs](https://growwiseschool.org/programs)
- Page job and intent: **Money** — Choose the right GrowWise program or assessment.
- Baseline: **44/100** (D4 · L2 · T1 · E3 · R2 · A3)
- Post-change: **44/100** (D4 · L2 · T1 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/programs/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-readinesschecklist"></a>
### `/readinesschecklist`

- Production: [https://growwiseschool.org/readinesschecklist](https://growwiseschool.org/readinesschecklist)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **63/100** (D4 · L3 · T2 · E4 · R1 · A2)
- Post-change: **63/100** (D4 · L3 · T2 · E4 · R1 · A2)
- Evidence: reviewed `src/app/[locale]/readinesschecklist/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources"></a>
### `/resources`

- Production: [https://growwiseschool.org/resources](https://growwiseschool.org/resources)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **37/100** (D3 · L1 · T1 · E4 · R1 · A4)
- Post-change: **37/100** (D3 · L1 · T1 · E4 · R1 · A4)
- Evidence: reviewed `src/app/[locale]/resources/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-affordable-summer-academic-programs-dublin-ca"></a>
### `/resources/affordable-summer-academic-programs-dublin-ca`

- Production: [https://growwiseschool.org/resources/affordable-summer-academic-programs-dublin-ca](https://growwiseschool.org/resources/affordable-summer-academic-programs-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Post-change: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/affordable-summer-academic-programs-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-back-to-school-math-assessment-dublin-ca"></a>
### `/resources/back-to-school-math-assessment-dublin-ca`

- Production: [https://growwiseschool.org/resources/back-to-school-math-assessment-dublin-ca](https://growwiseschool.org/resources/back-to-school-math-assessment-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/back-to-school-math-assessment-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-back-to-school-night-parent-questions"></a>
### `/resources/back-to-school-night-parent-questions`

- Production: [https://growwiseschool.org/resources/back-to-school-night-parent-questions](https://growwiseschool.org/resources/back-to-school-night-parent-questions)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/back-to-school-night-parent-questions/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-best-tutoring-dublin-ca"></a>
### `/resources/best-tutoring-dublin-ca`

- Production: [https://growwiseschool.org/resources/best-tutoring-dublin-ca](https://growwiseschool.org/resources/best-tutoring-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/best-tutoring-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-california-math-standards-by-grade"></a>
### `/resources/california-math-standards-by-grade`

- Production: [https://growwiseschool.org/resources/california-math-standards-by-grade](https://growwiseschool.org/resources/california-math-standards-by-grade)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/california-math-standards-by-grade/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-careless-math-mistakes"></a>
### `/resources/careless-math-mistakes`

- Production: [https://growwiseschool.org/resources/careless-math-mistakes](https://growwiseschool.org/resources/careless-math-mistakes)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D3 · L1 · T2 · E4 · R1 · A4)
- Post-change: **44/100** (D3 · L1 · T2 · E4 · R1 · A4)
- Evidence: reviewed `src/app/[locale]/resources/careless-math-mistakes/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-child-struggles-with-writing-dublin-ca"></a>
### `/resources/child-struggles-with-writing-dublin-ca`

- Production: [https://growwiseschool.org/resources/child-struggles-with-writing-dublin-ca](https://growwiseschool.org/resources/child-struggles-with-writing-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/child-struggles-with-writing-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-english-tutor-vs-reading-tutor-vs-writing-class"></a>
### `/resources/english-tutor-vs-reading-tutor-vs-writing-class`

- Production: [https://growwiseschool.org/resources/english-tutor-vs-reading-tutor-vs-writing-class](https://growwiseschool.org/resources/english-tutor-vs-reading-tutor-vs-writing-class)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/english-tutor-vs-reading-tutor-vs-writing-class/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-homework-independence"></a>
### `/resources/homework-independence`

- Production: [https://growwiseschool.org/resources/homework-independence](https://growwiseschool.org/resources/homework-independence)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L1 · T2 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L1 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/homework-independence/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-how-to-choose-coding-school-for-kids"></a>
### `/resources/how-to-choose-coding-school-for-kids`

- Production: [https://growwiseschool.org/resources/how-to-choose-coding-school-for-kids](https://growwiseschool.org/resources/how-to-choose-coding-school-for-kids)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **53/100** (D3 · L2 · T2 · E4 · R2 · A4)
- Post-change: **53/100** (D3 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/how-to-choose-coding-school-for-kids/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-how-to-choose-summer-camp"></a>
### `/resources/how-to-choose-summer-camp`

- Production: [https://growwiseschool.org/resources/how-to-choose-summer-camp](https://growwiseschool.org/resources/how-to-choose-summer-camp)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **53/100** (D4 · L3 · T1 · E4 · R2 · A4)
- Post-change: **53/100** (D4 · L3 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/how-to-choose-summer-camp/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-im1-summer-prep-dublin-ca"></a>
### `/resources/im1-summer-prep-dublin-ca`

- Production: [https://growwiseschool.org/resources/im1-summer-prep-dublin-ca](https://growwiseschool.org/resources/im1-summer-prep-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Post-change: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/im1-summer-prep-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-khan-academy-summer-doesnt-work"></a>
### `/resources/khan-academy-summer-doesnt-work`

- Production: [https://growwiseschool.org/resources/khan-academy-summer-doesnt-work](https://growwiseschool.org/resources/khan-academy-summer-doesnt-work)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Post-change: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/khan-academy-summer-doesnt-work/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-kumon-alternative-dublin-ca"></a>
### `/resources/kumon-alternative-dublin-ca`

- Production: [https://growwiseschool.org/resources/kumon-alternative-dublin-ca](https://growwiseschool.org/resources/kumon-alternative-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/kumon-alternative-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-math-summer-program-dublin-ca-math-sprint-breakdown"></a>
### `/resources/math-summer-program-dublin-ca-math-sprint-breakdown`

- Production: [https://growwiseschool.org/resources/math-summer-program-dublin-ca-math-sprint-breakdown](https://growwiseschool.org/resources/math-summer-program-dublin-ca-math-sprint-breakdown)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/math-summer-program-dublin-ca-math-sprint-breakdown/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-math-tutoring-options-dublin-ca"></a>
### `/resources/math-tutoring-options-dublin-ca`

- Production: [https://growwiseschool.org/resources/math-tutoring-options-dublin-ca](https://growwiseschool.org/resources/math-tutoring-options-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/math-tutoring-options-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-mathnasium-alternative-dublin-pleasanton"></a>
### `/resources/mathnasium-alternative-dublin-pleasanton`

- Production: [https://growwiseschool.org/resources/mathnasium-alternative-dublin-pleasanton](https://growwiseschool.org/resources/mathnasium-alternative-dublin-pleasanton)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/mathnasium-alternative-dublin-pleasanton/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-middle-school-math-readiness-checklist"></a>
### `/resources/middle-school-math-readiness-checklist`

- Production: [https://growwiseschool.org/resources/middle-school-math-readiness-checklist](https://growwiseschool.org/resources/middle-school-math-readiness-checklist)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Post-change: **57/100** (D4 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/middle-school-math-readiness-checklist/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-python-vs-scratch"></a>
### `/resources/python-vs-scratch`

- Production: [https://growwiseschool.org/resources/python-vs-scratch](https://growwiseschool.org/resources/python-vs-scratch)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **40/100** (D4 · L1 · T1 · E4 · R1 · A4)
- Post-change: **40/100** (D4 · L1 · T1 · E4 · R1 · A4)
- Evidence: reviewed `src/app/[locale]/resources/python-vs-scratch/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-reading-fluency-vs-comprehension"></a>
### `/resources/reading-fluency-vs-comprehension`

- Production: [https://growwiseschool.org/resources/reading-fluency-vs-comprehension](https://growwiseschool.org/resources/reading-fluency-vs-comprehension)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D4 · L2 · T1 · E3 · R2 · A4)
- Post-change: **44/100** (D4 · L2 · T1 · E3 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/reading-fluency-vs-comprehension/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-reading-program-grades-1-2-dublin-ca"></a>
### `/resources/reading-program-grades-1-2-dublin-ca`

- Production: [https://growwiseschool.org/resources/reading-program-grades-1-2-dublin-ca](https://growwiseschool.org/resources/reading-program-grades-1-2-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/reading-program-grades-1-2-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-rsm-alternative-dublin-ca"></a>
### `/resources/rsm-alternative-dublin-ca`

- Production: [https://growwiseschool.org/resources/rsm-alternative-dublin-ca](https://growwiseschool.org/resources/rsm-alternative-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D2 · L2 · T2 · E4 · R2 · A4)
- Post-change: **48/100** (D2 · L2 · T2 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/rsm-alternative-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Replace generic benefits with one specific visitor outcome. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-small-group-tutoring-vs-1-on-1"></a>
### `/resources/small-group-tutoring-vs-1-on-1`

- Production: [https://growwiseschool.org/resources/small-group-tutoring-vs-1-on-1](https://growwiseschool.org/resources/small-group-tutoring-vs-1-on-1)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/small-group-tutoring-vs-1-on-1/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-student-corner"></a>
### `/resources/student-corner`

- Production: [https://growwiseschool.org/resources/student-corner](https://growwiseschool.org/resources/student-corner)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **41/100** (D3 · L2 · T1 · E3 · R1 · A4)
- Post-change: **41/100** (D3 · L2 · T1 · E3 · R1 · A4)
- Evidence: reviewed `src/app/[locale]/resources/student-corner/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-summer-academic-program-checklist"></a>
### `/resources/summer-academic-program-checklist`

- Production: [https://growwiseschool.org/resources/summer-academic-program-checklist](https://growwiseschool.org/resources/summer-academic-program-checklist)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Post-change: **44/100** (D3 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/summer-academic-program-checklist/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-summer-slide-dublin-ca"></a>
### `/resources/summer-slide-dublin-ca`

- Production: [https://growwiseschool.org/resources/summer-slide-dublin-ca](https://growwiseschool.org/resources/summer-slide-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/summer-slide-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-summer-slide-prevention"></a>
### `/resources/summer-slide-prevention`

- Production: [https://growwiseschool.org/resources/summer-slide-prevention](https://growwiseschool.org/resources/summer-slide-prevention)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/summer-slide-prevention/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-summer-writing-program-dublin-ca"></a>
### `/resources/summer-writing-program-dublin-ca`

- Production: [https://growwiseschool.org/resources/summer-writing-program-dublin-ca](https://growwiseschool.org/resources/summer-writing-program-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **41/100** (D3 · L2 · T1 · E3 · R1 · A4)
- Post-change: **41/100** (D3 · L2 · T1 · E3 · R1 · A4)
- Evidence: reviewed `src/app/[locale]/resources/summer-writing-program-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-tutoring-dublin-ca"></a>
### `/resources/tutoring-dublin-ca`

- Production: [https://growwiseschool.org/resources/tutoring-dublin-ca](https://growwiseschool.org/resources/tutoring-dublin-ca)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/tutoring-dublin-ca/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-what-is-vibe-coding"></a>
### `/resources/what-is-vibe-coding`

- Production: [https://growwiseschool.org/resources/what-is-vibe-coding](https://growwiseschool.org/resources/what-is-vibe-coding)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **37/100** (D3 · L1 · T1 · E4 · R1 · A3)
- Post-change: **37/100** (D3 · L1 · T1 · E4 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/resources/what-is-vibe-coding/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-when-to-start-sat-prep"></a>
### `/resources/when-to-start-sat-prep`

- Production: [https://growwiseschool.org/resources/when-to-start-sat-prep](https://growwiseschool.org/resources/when-to-start-sat-prep)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L1 · T2 · E4 · R1 · A4)
- Post-change: **48/100** (D4 · L1 · T2 · E4 · R1 · A4)
- Evidence: reviewed `src/app/[locale]/resources/when-to-start-sat-prep/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-resources-why-grades-hide-learning-gaps"></a>
### `/resources/why-grades-hide-learning-gaps`

- Production: [https://growwiseschool.org/resources/why-grades-hide-learning-gaps](https://growwiseschool.org/resources/why-grades-hide-learning-gaps)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Post-change: **48/100** (D4 · L2 · T1 · E4 · R2 · A4)
- Evidence: reviewed `src/app/[locale]/resources/why-grades-hide-learning-gaps/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-self-check"></a>
### `/self-check`

- Production: [https://growwiseschool.org/self-check](https://growwiseschool.org/self-check)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **58/100** (D4 · L3 · T2 · E3 · R1 · A3)
- Post-change: **58/100** (D4 · L3 · T2 · E3 · R1 · A3)
- Evidence: reviewed `src/app/[locale]/self-check/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**

<a id="route-steam"></a>
### `/steam`

- Production: [https://growwiseschool.org/steam](https://growwiseschool.org/steam)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **49/100** (D3 · L3 · T2 · E2 · R2 · A3)
- Post-change: **69/100** (D4 · L4 · T3 · E3 · R3 · A3)
- Evidence: reviewed `src/app/[locale]/steam/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: State when the visitor receives the first useful result. Keep one primary conversion action.
- Status: **Implemented—shared value proof**

<a id="route-steam-game-development"></a>
### `/steam/game-development`

- Production: [https://growwiseschool.org/steam/game-development](https://growwiseschool.org/steam/game-development)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Post-change: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/steam/game-development/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-steam-ml-ai-coding"></a>
### `/steam/ml-ai-coding`

- Production: [https://growwiseschool.org/steam/ml-ai-coding](https://growwiseschool.org/steam/ml-ai-coding)
- Page job and intent: **Money** — Choose a project-based technology learning path.
- Baseline: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Post-change: **64/100** (D4 · L3 · T3 · E3 · R2 · A3)
- Evidence: reviewed `src/app/[locale]/steam/ml-ai-coding/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep one primary conversion action.
- Status: **Recommended—not implemented**

<a id="route-why-growwise"></a>
### `/why-growwise`

- Production: [https://growwiseschool.org/why-growwise](https://growwiseschool.org/why-growwise)
- Page job and intent: **Trust** — Decide whether GrowWise is credible, local, and a good fit.
- Baseline: **24/100** (D2 · L1 · T1 · E1 · R1 · A2)
- Post-change: **24/100** (D2 · L1 · T1 · E1 · R1 · A2)
- Evidence: reviewed `src/app/[locale]/why-growwise/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Support the claim with local, attributable evidence.
- Status: **Recommended—not implemented**

<a id="route-workshop-calendar"></a>
### `/workshop-calendar`

- Production: [https://growwiseschool.org/workshop-calendar](https://growwiseschool.org/workshop-calendar)
- Page job and intent: **Traffic** — Get a useful answer, then choose the most relevant next step.
- Baseline: **53/100** (D3 · L2 · T2 · E4 · R1 · A2)
- Post-change: **53/100** (D3 · L2 · T2 · E4 · R1 · A2)
- Evidence: reviewed `src/app/[locale]/workshop-calendar/page.tsx` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.
- Recommendation: Add relevant proof and explain the mechanism near the next action. Keep the useful answer primary and use one contextual route to the next decision page.
- Status: **Recommended—not implemented**
