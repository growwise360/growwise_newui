import { CONTACT_INFO } from '@/lib/constants';
import { buildAggregateRatingJsonLd } from '@/lib/seo/socialProof';

const ORG_NAME = 'GrowWise School';
const SCHEMA_PHONE = '+19254564606';

const INTENSIVE_SCHEDULE = {
  startDate: '2026-06-15',
  endDate: '2026-07-24',
  repeatFrequency: 'P1D',
  byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
};

const COURSE_OFFER = {
  '@type': 'Offer' as const,
  price: '1649',
  priceCurrency: 'USD',
  name: '6-week summer intensive',
};

const INTENSIVE_COURSES = [
  {
    name: 'Algebra 1 Summer Intensive',
    description:
      '6-week summer Algebra 1 intensive for Grades 8–9. Linear equations, quadratics, and DUSD/PUSD-aligned foundations. Dublin, CA.',
  },
  {
    name: 'Algebra 2 Summer Intensive',
    description:
      '6-week summer Algebra 2 intensive for Grades 10–11. Polynomial, exponential, and trigonometric foundations. Dublin, CA.',
  },
  {
    name: 'Advanced Algebra 2 Summer Intensive',
    description:
      'Accelerated 6-week Algebra 2 intensive for honors-track students. Dublin, CA.',
  },
  {
    name: 'Precalculus Summer Intensive',
    description:
      '6-week Precalculus intensive preparing students for Calculus. Functions, trigonometry, and analytical geometry. Dublin, CA.',
  },
  {
    name: 'AP Precalculus Summer Intensive',
    description:
      'College Board–aligned AP Precalculus summer intensive with exam-focused review. Dublin, CA.',
  },
  {
    name: 'Calculus AB Summer Intensive',
    description:
      '6-week AP Calculus AB summer intensive. Limits, derivatives, integrals, and exam strategies. Dublin, CA.',
  },
] as const;

function courseProvider() {
  return {
    '@type': 'EducationalOrganization' as const,
    name: ORG_NAME,
    address: `${CONTACT_INFO.street}, Dublin, CA ${CONTACT_INFO.zipCode}`,
  };
}

function courseSchedule() {
  return {
    '@type': 'Schedule' as const,
    startDate: INTENSIVE_SCHEDULE.startDate,
    endDate: INTENSIVE_SCHEDULE.endDate,
    repeatFrequency: INTENSIVE_SCHEDULE.repeatFrequency,
    byDay: [...INTENSIVE_SCHEDULE.byDay],
  };
}

/** Page-specific EducationalOrganization JSON-LD for the high school summer intensive hub. */
export function buildHighSchoolSummerIntensiveOrgSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: ORG_NAME,
    url: baseUrl,
    logo: `${baseUrl}/assets/growwise-logo.png`,
    description:
      'Small-group high school summer math intensives in Dublin, CA. Algebra 1 through AP Calculus AB. DUSD and PUSD aligned.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.street,
      addressLocality: 'Dublin',
      addressRegion: 'CA',
      postalCode: CONTACT_INFO.zipCode,
      addressCountry: 'US',
    },
    telephone: SCHEMA_PHONE,
    email: CONTACT_INFO.email,
    areaServed: ['Dublin, CA', 'Pleasanton, CA', 'San Ramon, CA', 'Livermore, CA'],
    aggregateRating: buildAggregateRatingJsonLd(),
  };
}

/** ItemList of Course JSON-LD for GrowWise high school summer intensives. */
export function buildHighSchoolSummerIntensiveCourseItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GrowWise High School Summer Math Intensives',
    description:
      '6-week summer math intensives for Grades 8–12 in Dublin, CA — Algebra 1 through AP Calculus AB',
    itemListElement: INTENSIVE_COURSES.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: courseProvider(),
        courseSchedule: courseSchedule(),
        offers: [COURSE_OFFER],
      },
    })),
  };
}
