import { getImGetReadySeoLandingCopy } from '@/lib/im-get-ready-seo-landing-copy';

describe('im-get-ready-seo-landing-copy', () => {
  const copy = getImGetReadySeoLandingCopy();

  it('includes the cohort positioning hero headline', () => {
    expect(copy.hero.h1).toBe('Start Integrated Math with confidence.');
    expect(copy.hero.eyebrow).toContain('DUSD & PUSD');
  });

  it('defines both program cards with distinct schedules', () => {
    expect(copy.programCards.im1.scheduleLine).toContain('5:00–6:30 PM');
    expect(copy.programCards.im2.scheduleLine).toContain('6:45–8:15 PM');
    expect(copy.programCards.im1.gradeBadge).toContain('entering IM1');
    expect(copy.programCards.im2.gradeBadge).toContain('entering IM2');
  });

  it('defines IM1 card header copy from the IM1 section spec', () => {
    expect(copy.programCards.im1.headline).toBe(
      'Start IM1 with strong algebra habits before the pace picks up.',
    );
    expect(copy.programCards.im1.subheadline).toContain('DUSD or PUSD Integrated Math 1');
    expect(copy.programCards.im1.positioningLines).toHaveLength(3);
    expect(copy.programCards.im1.ctaLabel).toBe('Reserve IM1 Spot');
  });

  it('defines IM1 detail modules, mistake patterns, and FAQ', () => {
    expect(copy.im1Detail.workOnModules).toHaveLength(3);
    expect(copy.im1Detail.workOnModules[0]?.title).toContain('Module 1 Readiness');
    expect(copy.im1Detail.mistakePatterns).toHaveLength(11);
    expect(copy.im1Detail.faq).toHaveLength(5);
    expect(copy.im1Detail.finalCta.headline).toBe('Help your child start IM1 ready.');
    expect(copy.im1Detail.fourWeekStructure.weeks).toHaveLength(4);
  });

  it('defines IM2 card header copy from the IM2 section spec', () => {
    expect(copy.programCards.im2.headline).toBe(
      'Move into IM2 ready for geometry reasoning, proof, and similarity.',
    );
    expect(copy.programCards.im2.subheadline).toContain('DUSD or PUSD Integrated Math 2');
    expect(copy.programCards.im2.positioningLines).toHaveLength(3);
    expect(copy.programCards.im2.ctaLabel).toBe('Reserve IM2 Spot');
  });

  it('defines IM2 detail modules, mistake patterns, and FAQ', () => {
    expect(copy.im2Detail.workOnModules).toHaveLength(5);
    expect(copy.im2Detail.workOnModules[0]?.title).toBe('Triangle Congruence Bridge');
    expect(copy.im2Detail.mistakePatterns).toHaveLength(11);
    expect(copy.im2Detail.curriculumAlignment.cards).toHaveLength(4);
    expect(copy.im2Detail.faq).toHaveLength(6);
    expect(copy.im2Detail.finalCta.headline).toBe('Help your child start IM2 ready.');
    expect(copy.im2Detail.fourWeekStructure.weeks).toHaveLength(4);
    expect(copy.im2Detail.regularTutoring.items).toHaveLength(10);
    expect(copy.im2Detail.whyThisMatters.habits).toHaveLength(9);
  });

  it('includes seven combined FAQ entries from the cohort landing spec', () => {
    expect(copy.faq).toHaveLength(7);
    expect(copy.faq.some((item) => item.question.includes('Quarter 2'))).toBe(true);
    expect(copy.faq.some((item) => item.question.includes('$120'))).toBe(true);
  });

  it('includes comparison, thank-you benefit, and how-it-works sections', () => {
    expect(copy.comparison.getReadyColumn.rows.length).toBeGreaterThanOrEqual(5);
    expect(copy.thankYouBenefit.copy).toContain('$120');
    expect(copy.howItWorks.steps).toHaveLength(4);
  });

  it('defines top nav with anchor and route items', () => {
    expect(copy.topNav.brandLabel).toBe('GrowWise Math');
    expect(copy.topNav.items.some((item) => item.type === 'anchor')).toBe(true);
    expect(copy.topNav.items.some((item) => item.href === '/courses/high-school-math')).toBe(true);
    expect(copy.topNav.items.some((item) => item.href === '#im1-get-ready')).toBe(true);
    expect(copy.topNav.items.some((item) => item.href === '#im2-get-ready')).toBe(true);
  });
});
