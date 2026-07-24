# Design QA — Homepage Deeper-Learning Proof Bridge

- Source visual truth: `docs/audits/evidence/home-deeper-learning-selected-mock.png`
- Implementation route: `/`
- Desktop implementation: `docs/audits/evidence/home-deeper-learning-context-desktop.png`
- Focused desktop section: `docs/audits/evidence/home-deeper-learning-desktop.png`
- Focused mobile section: `docs/audits/evidence/home-deeper-learning-mobile.png`
- Combined comparison: `docs/audits/evidence/home-deeper-learning-design-comparison.png`
- Browser validation: `docs/audits/evidence/home-deeper-learning-verification.json`
- Cross-route mobile validation: `docs/audits/evidence/mobile-regression-2026-07-24.json`
- Source pixels: 1488 × 1058
- Desktop implementation pixels: 1440 × 1050 from a 1440 × 1100 CSS viewport at device scale factor 1
- Focused desktop section: 1440 × 561 CSS pixels
- Focused mobile section: 390 × 882 CSS pixels from a 390 × 844 viewport at device scale factor 1
- State: public homepage, video facade visible and video not playing

## Full-view comparison evidence

The combined comparison places the selected mock and implementation on one canvas. Both show the same funnel sequence: navy assessment offer, compact light-blue mechanism proof, and white parent-testimonial section. The implementation preserves the selected hierarchy, copy-first layout, three mechanism steps, orange assessment CTA, trust note, and compact portrait player.

The live capture includes the real sticky header because it is part of the production page. This is an expected product constraint and does not alter the inserted section.

## Focused comparison evidence

The focused desktop and mobile captures confirm:

- a compact two-column desktop layout with copy on the left and the 9:16 player on the right;
- a centered single-column mobile layout;
- the real GrowWise speaker and captioned video poster;
- an obvious play affordance and a single primary CTA;
- reserved 9:16 dimensions with no layout movement when the iframe replaces the poster;
- no initial YouTube, YouTube thumbnail-domain, or Google Video request.

## Required fidelity surfaces

- Fonts and typography: existing GrowWise font family and optical hierarchy are preserved; navy headline, orange uppercase eyebrow, readable body copy, bold scan points, and compact trust copy match the selected direction.
- Spacing and layout rhythm: the desktop section uses a 900 px content grid, 72 px column gap, 44 px vertical padding, and a 250 px portrait player. Mobile collapses cleanly to one column without horizontal overflow.
- Colors and visual tokens: the selected light-blue surface, GrowWise navy, orange action color, and white controls use existing page tokens and maintain adequate contrast.
- Image quality and asset fidelity: the official YouTube thumbnail was center-cropped to the actual 9:16 speaker frame and compressed to 53 KB. The subject, captions, crop, and color remain faithful.
- Copy and content: the selected headline, mechanism explanation, three steps, CTA, trust note, and 61-second label are all present.

## Interaction and performance validation

- Initial iframe count: 0 on desktop and mobile.
- Initial YouTube-family request count: 0 on desktop and mobile.
- After play: the facade is replaced by one privacy-enhanced iframe at `youtube-nocookie.com`.
- CTA target: `/book-assessment`.
- Browser console errors: 0 on desktop and mobile.
- Touch smoke mode: rendered visible pixels on the 390 × 844 mobile canvas while preserving normal scrolling and pointer events.
- Cross-route mobile regression: 25/25 routes passed with no horizontal document overflow or unexpected failed response.
- Focused component tests: 2 passed.
- Production build: passed.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- P3: the production sticky header appears in context captures but is intentionally absent from the isolated concept mock.

## Comparison history

- Initial design: selected compact proof bridge with a portrait player on the right.
- Implementation: recreated the layout within the existing homepage design system and connected the real assessment route and video behavior.
- Performance refinement: replaced the remote poster dependency with a 53 KB local poster and deferred every YouTube request until explicit play.
- Post-fix evidence: combined desktop comparison, focused desktop/mobile captures, interaction JSON, passing tests, and passing build listed above.

## Implementation checklist

- [x] Insert after the assessment offer and before parent testimonials.
- [x] Preserve the selected compact two-column desktop composition.
- [x] Use a responsive single-column mobile composition.
- [x] Use one assessment CTA with locale-compatible routing.
- [x] Load no YouTube iframe before play.
- [x] Use the privacy-enhanced YouTube domain after play.
- [x] Track video plays and assessment clicks.
- [x] Verify desktop, mobile, console, link, interaction, test, and build behavior.

final result: passed
