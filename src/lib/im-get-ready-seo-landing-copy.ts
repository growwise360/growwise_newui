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

export function getImGetReadySeoLandingCopy(): ImGetReadySeoLandingCopy {
  return COPY;
}
