import type { MathGradeBandId } from '@/lib/math-hub-copy';

export type MathParentGuideLink = {
  readonly key: string;
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly readTime?: string;
};

/** Core gap-pattern and diagnostic resources — linked from all math program pages. */
export const MATH_GAP_SELF_CHECK: MathParentGuideLink = {
  key: 'self-check',
  href: '/self-check',
  title: 'Free Math Gap Self-Check',
  description:
    '10-minute diagnostic that flags recurring mistake patterns — the same lens we use before placement.',
  readTime: '10 min',
};

export const MATH_CARELESS_MISTAKES_GUIDE: MathParentGuideLink = {
  key: 'careless-math-mistakes',
  href: '/resources/careless-math-mistakes',
  title: 'Why Kids Make Careless Math Mistakes',
  description:
    'How to tell a one-off slip from a fixable pattern — procedural, pacing, formula mix-ups, and checking gaps.',
  readTime: '6 min read',
};

export const MATH_HOMEWORK_INDEPENDENCE_GUIDE: MathParentGuideLink = {
  key: 'homework-independence',
  href: '/resources/homework-independence',
  title: 'How to Build Homework Independence',
  description:
    'A practical system for fewer nightly battles — without sitting through every problem.',
  readTime: '5 min read',
};

export const MATH_LEARNING_GAPS_BLOG: MathParentGuideLink = {
  key: 'learning-gaps-blog',
  href: '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide',
  title: 'How to Identify Learning Gaps at Home',
  description:
    'Parent guide to spotting skill gaps before they compound across the school year.',
  readTime: 'Article',
};

export const MATH_B_PLUS_BLOG: MathParentGuideLink = {
  key: 'b-plus-math-blog',
  href: '/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math',
  title: 'A B+ Does Not Mean They Understand the Math',
  description:
    'Why grades can hide conceptual gaps — and how to spot real understanding vs. memorization.',
  readTime: 'Article',
};

export const MATH_SAT_PREP_GUIDE: MathParentGuideLink = {
  key: 'when-to-start-sat-prep',
  href: '/resources/when-to-start-sat-prep',
  title: 'When Should My Child Start SAT Prep?',
  description:
    'Grade 8 vs 9 vs 10 — and when closing math foundation gaps should come first.',
  readTime: '4 min read',
};

export const MATH_FINALS_PREP_BLOG: MathParentGuideLink = {
  key: 'hs-finals-blog',
  href: '/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley',
  title: 'High School Math Finals Prep',
  description:
    'Structured finals support for Algebra, Geometry, and Pre-Calculus in the Tri-Valley.',
  readTime: 'Article',
};

export const MATH_RESOURCES_HUB: MathParentGuideLink = {
  key: 'resources-hub',
  href: '/resources',
  title: 'All Free Parent Guides',
  description: 'Reading, homework, SAT timing, and local program comparisons.',
};

export type MathParentGuidesPageId =
  | 'hub'
  | 'elementary'
  | 'middle-school'
  | 'high-school-math';

export const MATH_PARENT_GUIDES_BY_PAGE: Record<
  MathParentGuidesPageId,
  readonly MathParentGuideLink[]
> = {
  hub: [
    MATH_GAP_SELF_CHECK,
    MATH_CARELESS_MISTAKES_GUIDE,
    MATH_B_PLUS_BLOG,
    MATH_LEARNING_GAPS_BLOG,
    MATH_HOMEWORK_INDEPENDENCE_GUIDE,
    MATH_RESOURCES_HUB,
  ],
  elementary: [
    MATH_GAP_SELF_CHECK,
    MATH_CARELESS_MISTAKES_GUIDE,
    MATH_B_PLUS_BLOG,
    MATH_LEARNING_GAPS_BLOG,
    MATH_HOMEWORK_INDEPENDENCE_GUIDE,
  ],
  'middle-school': [
    MATH_GAP_SELF_CHECK,
    MATH_CARELESS_MISTAKES_GUIDE,
    MATH_HOMEWORK_INDEPENDENCE_GUIDE,
    MATH_LEARNING_GAPS_BLOG,
  ],
  'high-school-math': [
    MATH_GAP_SELF_CHECK,
    MATH_CARELESS_MISTAKES_GUIDE,
    MATH_SAT_PREP_GUIDE,
    MATH_FINALS_PREP_BLOG,
    MATH_B_PLUS_BLOG,
  ],
};

export function getMathParentGuidesForBand(
  bandId: MathGradeBandId,
): readonly MathParentGuideLink[] {
  if (bandId === 'high-school') {
    return MATH_PARENT_GUIDES_BY_PAGE['high-school-math'];
  }
  return MATH_PARENT_GUIDES_BY_PAGE[bandId];
}
