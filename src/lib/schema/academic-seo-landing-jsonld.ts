import { CONTACT_INFO } from '@/lib/constants';
import type { AcademicSeoLandingPageId } from '@/lib/academic-seo-landing-config';
import { ACADEMIC_SEO_LANDING_PAGES } from '@/lib/academic-seo-landing-config';

const ORG_NAME = 'GrowWise School';
const PROVIDER_ADDRESS = `${CONTACT_INFO.street}, Dublin, CA ${CONTACT_INFO.zipCode}`;
const SCHEMA_PHONE = '+19254564606';

const WEEKDAY_SCHEDULE = {
  startDate: '2026-06-15',
  endDate: '2026-07-11',
  repeatFrequency: 'P1D',
  byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
};

const MWF_SCHEDULE_JUNE = {
  startDate: '2026-06-15',
  endDate: '2026-07-11',
  byDay: ['Monday', 'Wednesday', 'Friday'] as const,
};

function courseProviderWithPhone() {
  return {
    '@type': 'EducationalOrganization' as const,
    name: ORG_NAME,
    address: PROVIDER_ADDRESS,
    telephone: SCHEMA_PHONE,
  };
}

function courseSchedule(schedule: {
  startDate: string;
  endDate: string;
  byDay: readonly string[];
  repeatFrequency?: string;
}) {
  return {
    '@type': 'Schedule' as const,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    ...(schedule.repeatFrequency ? { repeatFrequency: schedule.repeatFrequency } : {}),
    byDay: [...schedule.byDay],
  };
}

function courseOffer(offer: { price: string; priceCurrency: string; name: string }) {
  return {
    '@type': 'Offer' as const,
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    name: offer.name,
  };
}

const READ_TO_PROVE_COURSE = {
  '@type': 'Course' as const,
  name: 'Read to Prove — Summer Reading Program Dublin CA',
  description:
    'Summer reading comprehension sprint in Dublin, CA. Main idea, inference, vocabulary, text evidence. Grades 1–8. 90 min/day. Starts June 15.',
  provider: courseProviderWithPhone(),
  courseSchedule: courseSchedule(WEEKDAY_SCHEDULE),
  offers: [
    courseOffer({ price: '249', priceCurrency: 'USD', name: 'Grades 1–5' }),
    courseOffer({ price: '349', priceCurrency: 'USD', name: 'Grades 6–8' }),
  ],
};

const WRITE_TO_EXPLAIN_COURSE = {
  '@type': 'Course' as const,
  name: 'Write to Explain — Summer Writing Program Dublin CA',
  description:
    'Summer writing sprint in Dublin, CA. Sentence structure, paragraph writing, essays, revision. Grades 1–8. 90 min/day. Starts June 15.',
  provider: courseProviderWithPhone(),
  courseSchedule: courseSchedule(WEEKDAY_SCHEDULE),
  offers: [
    courseOffer({ price: '249', priceCurrency: 'USD', name: 'Grades 1–5' }),
    courseOffer({ price: '349', priceCurrency: 'USD', name: 'Grades 6–8' }),
  ],
};

const BRIDGE_THE_GAP_COURSE = {
  '@type': 'Course' as const,
  name: 'Bridge the Gap Math — Summer Math Program Dublin CA',
  description:
    'Summer math foundations program in Dublin, CA. Fractions, word problems, multi-step math, grade readiness. Grades 1–8. 90 min/day. Starts June 15. DUSD aligned.',
  provider: courseProviderWithPhone(),
  courseSchedule: courseSchedule(WEEKDAY_SCHEDULE),
  offers: [
    courseOffer({ price: '249', priceCurrency: 'USD', name: 'Grades 1–5' }),
    courseOffer({ price: '349', priceCurrency: 'USD', name: 'Grades 6–8' }),
  ],
};

const ALGEBRA_COURSE = {
  '@type': 'Course' as const,
  name: 'Algebra 1 Get Ready — Summer Algebra Program Dublin CA',
  description:
    'DUSD-aligned Algebra 1 summer program in Dublin, CA. Equations, functions, graphing, inequalities. Grades 7–8. Mon/Wed/Fri evenings 5–6:30 PM. Starts June 15.',
  provider: courseProviderWithPhone(),
  courseSchedule: courseSchedule(MWF_SCHEDULE_JUNE),
  offers: [
    courseOffer({ price: '249', priceCurrency: 'USD', name: '2-week sprint' }),
    courseOffer({ price: '449', priceCurrency: 'USD', name: 'Both cohorts' }),
  ],
};

const GEOMETRY_COURSE = {
  '@type': 'Course' as const,
  name: 'Geometry Get Ready — Summer Geometry Program Dublin CA',
  description:
    'DUSD-aligned Geometry summer program in Dublin, CA. Proofs, triangles, similarity, coordinate geometry. Grades 9–10. Mon/Wed/Fri evenings 5–6:30 PM. Starts June 15.',
  provider: courseProviderWithPhone(),
  courseSchedule: courseSchedule(MWF_SCHEDULE_JUNE),
  offers: [
    courseOffer({ price: '279', priceCurrency: 'USD', name: '2-week sprint' }),
    courseOffer({ price: '499', priceCurrency: 'USD', name: 'Both cohorts' }),
  ],
};

export type AcademicSeoFaqItem = {
  question: string;
  answer: string;
};

export function buildAcademicSeoLandingCourseSchema(pageId: AcademicSeoLandingPageId): object {
  switch (pageId) {
    case 'readingWriting':
      return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Summer Reading & Writing Programs Dublin CA',
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: READ_TO_PROVE_COURSE },
          { '@type': 'ListItem', position: 2, item: WRITE_TO_EXPLAIN_COURSE },
        ],
      };
    case 'mathFoundations':
      return { '@context': 'https://schema.org', ...BRIDGE_THE_GAP_COURSE };
    case 'algebra':
      return { '@context': 'https://schema.org', ...ALGEBRA_COURSE };
    case 'geometry':
      return { '@context': 'https://schema.org', ...GEOMETRY_COURSE };
    default: {
      const _exhaustive: never = pageId;
      return _exhaustive;
    }
  }
}

export function buildAcademicSeoLandingWebPageName(pageId: AcademicSeoLandingPageId): string {
  return ACADEMIC_SEO_LANDING_PAGES[pageId].breadcrumbLabel;
}
