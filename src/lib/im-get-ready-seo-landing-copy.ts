import imGetReadyCopy from '@/i18n/messages/summer-im-get-ready-dublin-ca-en.json';
import type { AcademicSeoFaqItem } from '@/lib/schema/academic-seo-landing-jsonld';

export type ImGetReadyNavItemCopy = {
  readonly label: string;
  readonly href: string;
  readonly type: 'anchor' | 'route';
};

export type ImGetReadyProgramCardCopy = {
  readonly id: string;
  readonly title: string;
  readonly gradeBadge: string;
  readonly headline?: string;
  readonly subheadline?: string;
  readonly positioningLines?: readonly string[];
  readonly tagline?: string;
  readonly scheduleLine: string;
  readonly bestForLabel?: string;
  readonly bestFor?: readonly string[];
  readonly workOnLabel?: string;
  readonly workOn?: readonly string[];
  readonly programLength: string;
  readonly priceLabel: string;
  readonly seatsLabel: string;
  readonly ctaLabel: string;
  readonly hubTrackId: 'im1' | 'im2';
};

export type ImGetReadyWorkOnModuleCopy = {
  readonly title: string;
  readonly bullets: readonly string[];
};

export type ImGetReadyCurriculumCardCopy = {
  readonly title: string;
  readonly text: string;
};

export type ImGetReadyCurriculumColumnCopy = {
  readonly title: string;
  readonly copy: string;
  readonly topics: readonly string[];
};

export type ImGetReadyComparisonRowCopy = {
  readonly label: string;
  readonly value: string;
};

export type ImGetReadyHowItWorksStepCopy = {
  readonly stepLabel: string;
  readonly title: string;
  readonly text: string;
};

export type ImGetReadyImDetailCopy = {
  readonly bestFor: readonly string[];
  readonly workOnModules: readonly ImGetReadyWorkOnModuleCopy[];
  readonly mistakePatterns: readonly string[];
  readonly curriculumAlignment: {
    readonly title: string;
    readonly copy: string;
    readonly cards: readonly ImGetReadyCurriculumCardCopy[];
  };
  readonly diagnosticMethod: {
    readonly title: string;
    readonly subtitle: string;
    readonly features: readonly { readonly title: string; readonly text: string }[];
  };
  readonly whyThisMatters: {
    readonly title: string;
    readonly copy: string;
    readonly habits: readonly string[];
  };
  readonly fourWeekStructure: {
    readonly title: string;
    readonly weeks: readonly { readonly title: string; readonly text: string }[];
  };
  readonly regularTutoring: {
    readonly title: string;
    readonly copy: string;
    readonly continuationLabel?: string;
    readonly items?: readonly string[];
  };
  readonly thankYouBenefit: {
    readonly title: string;
    readonly copy: string;
    readonly eligibilityNote: string;
  };
  readonly faq: readonly AcademicSeoFaqItem[];
  readonly finalCta: {
    readonly headline: string;
    readonly subheadline: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
};

export type ImGetReadyIm1DetailCopy = ImGetReadyImDetailCopy;
export type ImGetReadyIm2DetailCopy = ImGetReadyImDetailCopy;

export type ImGetReadySeoLandingCopy = {
  readonly topNav: {
    readonly brandLabel: string;
    readonly items: readonly ImGetReadyNavItemCopy[];
    readonly ctaLabel: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly h1: string;
    readonly subheadline: string;
    readonly supportingText: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly trustBar: string;
  };
  readonly courseCardsSection: {
    readonly title: string;
    readonly intro: string;
  };
  readonly programCards: {
    readonly im1: ImGetReadyProgramCardCopy;
    readonly im2: ImGetReadyProgramCardCopy;
  };
  readonly im1Detail: ImGetReadyIm1DetailCopy;
  readonly im2Detail: ImGetReadyIm2DetailCopy;
  readonly curriculumAlignment: {
    readonly title: string;
    readonly intro: string;
    readonly im1: ImGetReadyCurriculumColumnCopy;
    readonly im2: ImGetReadyCurriculumColumnCopy;
  };
  readonly diagnosticMethod: {
    readonly title: string;
    readonly subtitle: string;
    readonly features: readonly { readonly title: string; readonly text: string }[];
  };
  readonly mistakePatterns: {
    readonly title: string;
    readonly intro: string;
    readonly im1Label: string;
    readonly im1Patterns: readonly string[];
    readonly im2Label: string;
    readonly im2Patterns: readonly string[];
  };
  readonly howItWorks: {
    readonly title: string;
    readonly stepsAriaLabel: string;
    readonly steps: readonly ImGetReadyHowItWorksStepCopy[];
  };
  readonly whatStudentsReceive: {
    readonly title: string;
    readonly items: readonly string[];
  };
  readonly regularTutoring: {
    readonly title: string;
    readonly copy: string;
    readonly subheading: string;
    readonly items: readonly string[];
  };
  readonly thankYouBenefit: {
    readonly title: string;
    readonly copy: string;
    readonly importantNote: string;
    readonly ctaLabel: string;
  };
  readonly comparison: {
    readonly title: string;
    readonly getReadyColumn: {
      readonly title: string;
      readonly rows: readonly ImGetReadyComparisonRowCopy[];
    };
    readonly regularTutoringColumn: {
      readonly title: string;
      readonly rows: readonly ImGetReadyComparisonRowCopy[];
    };
  };
  readonly finalCta: {
    readonly headline: string;
    readonly subheadline: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly footerMicrocopy: string;
  readonly internalLinks: {
    readonly heading: string;
    readonly items: readonly { readonly href: string; readonly label: string }[];
  };
  readonly faq: readonly AcademicSeoFaqItem[];
};

const COPY = imGetReadyCopy as ImGetReadySeoLandingCopy;

export type ImTrackGetReadySeoLandingCopy = {
  readonly trackId: 'im1' | 'im2';
  readonly topNav: ImGetReadySeoLandingCopy['topNav'];
  readonly hero: {
    readonly eyebrow: string;
    readonly h1: string;
    readonly subheadline: string;
    readonly supportingText: string;
    readonly gradeBadge: string;
    readonly scheduleLine: string;
    readonly programLength: string;
    readonly priceLabel: string;
    readonly seatsLabel: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly trustBar: string;
  };
  readonly detail: ImGetReadyImDetailCopy;
  readonly comparison: ImGetReadySeoLandingCopy['comparison'];
  readonly whatStudentsReceive: ImGetReadySeoLandingCopy['whatStudentsReceive'];
  readonly siblingPage: {
    readonly href: string;
    readonly label: string;
    readonly description: string;
  };
  readonly internalLinks: ImGetReadySeoLandingCopy['internalLinks'];
  readonly footerMicrocopy: string;
  readonly faq: readonly AcademicSeoFaqItem[];
};

/** User-visible overview hero H1 (also used in E2E smoke expectations). */
export const IM_GET_READY_OVERVIEW_HERO_H1 =
  'IM1 & IM2 Get Ready Summer Cohorts — DUSD & PUSD, Dublin CA';

export function getImGetReadySeoLandingCopy(): ImGetReadySeoLandingCopy {
  return {
    ...COPY,
    hero: {
      ...COPY.hero,
      h1: IM_GET_READY_OVERVIEW_HERO_H1,
    },
  };
}

function buildTrackNav(trackId: 'im1' | 'im2'): ImGetReadySeoLandingCopy['topNav'] {
  const faqAnchor = trackId === 'im1' ? '#im1-faq' : '#im2-faq';
  return {
    brandLabel: 'GrowWise Math',
    items: [
      { label: 'Curriculum', href: '#curriculum', type: 'anchor' },
      { label: 'How It Works', href: '#how-it-works', type: 'anchor' },
      { label: 'Regular Tutoring', href: '/academic/math/high-school', type: 'route' },
      { label: 'FAQ', href: faqAnchor, type: 'anchor' },
    ],
    ctaLabel: trackId === 'im1' ? 'Reserve IM1 Spot' : 'Reserve IM2 Spot',
  };
}

function buildTrackHero(trackId: 'im1' | 'im2'): ImTrackGetReadySeoLandingCopy['hero'] {
  const card = COPY.programCards[trackId];
  const combinedHero = COPY.hero;

  if (trackId === 'im1') {
    return {
      eyebrow: 'DUSD & PUSD-Aligned · IM1 Get Ready · Dublin, CA',
      h1: 'IM1 Get Ready Summer Cohort for Integrated Math 1',
      subheadline: card.headline ?? 'Start IM1 with strong algebra habits before the pace picks up.',
      supportingText: card.subheadline ?? combinedHero.supportingText,
      gradeBadge: 'Entering Integrated Math 1 · often Grade 7 accelerated',
      scheduleLine: card.scheduleLine,
      programLength: card.programLength,
      priceLabel: card.priceLabel,
      seatsLabel: card.seatsLabel,
      primaryCta: card.ctaLabel,
      secondaryCta: 'Ask a Question',
      trustBar: combinedHero.trustBar,
    };
  }

  return {
    eyebrow: 'DUSD & PUSD-Aligned · IM2 Get Ready · Dublin, CA',
    h1: 'IM2 Get Ready Summer Cohort for Integrated Math 2',
    subheadline: card.headline ?? 'Move into IM2 ready for geometry reasoning, proof, and similarity.',
    supportingText: card.subheadline ?? combinedHero.supportingText,
    gradeBadge: card.gradeBadge,
    scheduleLine: card.scheduleLine,
    programLength: card.programLength,
    priceLabel: card.priceLabel,
    seatsLabel: card.seatsLabel,
    primaryCta: card.ctaLabel,
    secondaryCta: 'Ask a Question',
    trustBar: combinedHero.trustBar,
  };
}

export function getIm1GetReadySeoLandingCopy(): ImTrackGetReadySeoLandingCopy {
  return {
    trackId: 'im1',
    topNav: buildTrackNav('im1'),
    hero: buildTrackHero('im1'),
    detail: COPY.im1Detail,
    comparison: COPY.comparison,
    whatStudentsReceive: COPY.whatStudentsReceive,
    siblingPage: {
      href: '/camps/summer-im2-get-ready-dublin-ca',
      label: 'View IM2 Get Ready →',
      description: 'Preparing for Integrated Math 2 instead? See the IM2 first-quarter readiness cohort.',
    },
    internalLinks: {
      heading: 'Helpful links',
      items: [
        { href: '/camps/summer-im-get-ready-dublin-ca', label: 'Compare IM1 & IM2 Get Ready programs' },
        { href: '/camps/academic-summer-programs-dublin-ca', label: 'See all summer programs' },
        { href: '/courses/integrated-math-1-dublin-ca', label: 'Year-round IM1 tutoring in Dublin' },
        { href: '/contact', label: 'Contact us with questions' },
      ],
    },
    footerMicrocopy: COPY.footerMicrocopy,
    faq: COPY.im1Detail.faq,
  };
}

export function getIm2GetReadySeoLandingCopy(): ImTrackGetReadySeoLandingCopy {
  return {
    trackId: 'im2',
    topNav: buildTrackNav('im2'),
    hero: buildTrackHero('im2'),
    detail: COPY.im2Detail,
    comparison: COPY.comparison,
    whatStudentsReceive: COPY.whatStudentsReceive,
    siblingPage: {
      href: '/camps/summer-im1-get-ready-dublin-ca',
      label: 'View IM1 Get Ready →',
      description: 'Entering Integrated Math 1 instead? See the IM1 first-quarter readiness cohort.',
    },
    internalLinks: {
      heading: 'Helpful links',
      items: [
        { href: '/camps/summer-im-get-ready-dublin-ca', label: 'Compare IM1 & IM2 Get Ready programs' },
        { href: '/camps/academic-summer-programs-dublin-ca', label: 'See all summer programs' },
        { href: '/academic/math/high-school', label: 'Year-round high school math tutoring' },
        { href: '/contact', label: 'Contact us with questions' },
      ],
    },
    footerMicrocopy: COPY.footerMicrocopy,
    faq: COPY.im2Detail.faq,
  };
}
