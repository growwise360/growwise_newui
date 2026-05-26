import type { AcademicSeoLandingPageId } from '@/lib/academic-seo-landing-config';

export type ParentGuideLink = {
  readonly href: string;
  readonly title: string;
  readonly description: string;
};

export const PARENT_GUIDE_LINKS = {
  carelessMathMistakes: {
    href: '/resources/careless-math-mistakes',
    title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
    description: 'How to identify and break repeatable mistake patterns on tests.',
  },
  tutoringDublin: {
    href: '/resources/tutoring-dublin-ca',
    title: 'Best Tutoring Options in Dublin, CA (2026)',
    description: 'Compare program types and questions to ask before enrolling.',
  },
  whenToStartSatPrep: {
    href: '/resources/when-to-start-sat-prep',
    title: 'When Should My Child Start SAT Prep?',
    description: 'Grade-by-grade timeline and the gap-first principle.',
  },
} as const satisfies Record<string, ParentGuideLink>;

const CARELESS_MATH_MISTAKE_GUIDE_PAGES: readonly AcademicSeoLandingPageId[] = [
  'mathFoundations',
  'algebra',
  'imGetReady',
  'im1GetReady',
  'im2GetReady',
];

export function getParentGuidesForLandingPage(
  pageId: AcademicSeoLandingPageId,
): readonly ParentGuideLink[] {
  if (CARELESS_MATH_MISTAKE_GUIDE_PAGES.includes(pageId)) {
    return [PARENT_GUIDE_LINKS.carelessMathMistakes];
  }

  return [];
}

export function getParentGuidesForAcademicHub(): readonly ParentGuideLink[] {
  return [PARENT_GUIDE_LINKS.tutoringDublin];
}

export function getParentGuidesForSatPrepPage(): readonly ParentGuideLink[] {
  return [PARENT_GUIDE_LINKS.whenToStartSatPrep];
}
