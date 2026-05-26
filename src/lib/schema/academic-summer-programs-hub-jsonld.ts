import { CONTACT_INFO } from '@/lib/constants';

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

const MWF_SCHEDULE_JULY = {
  startDate: '2026-07-20',
  endDate: '2026-08-15',
  byDay: ['Monday', 'Wednesday', 'Friday'] as const,
};

const SPRINT_OFFERS = [
  { price: '249', priceCurrency: 'USD', name: 'Grades 1–5 · 2 weeks' },
  { price: '349', priceCurrency: 'USD', name: 'Grades 6–8 · 2 weeks' },
];

const STANDARD_GET_READY_OFFERS = [
  { price: '249', priceCurrency: 'USD', name: '2-week sprint' },
  { price: '449', priceCurrency: 'USD', name: 'Both cohorts' },
];

const GEOMETRY_GET_READY_OFFERS = [
  { price: '279', priceCurrency: 'USD', name: '2-week sprint' },
  { price: '499', priceCurrency: 'USD', name: 'Both cohorts' },
];

function courseProvider() {
  return {
    '@type': 'EducationalOrganization' as const,
    name: ORG_NAME,
    address: PROVIDER_ADDRESS,
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

type CourseEntry = {
  name: string;
  description: string;
  schedule: ReturnType<typeof courseSchedule>;
  offers: ReturnType<typeof courseOffer>[];
};

const ACADEMIC_SUMMER_COURSES: CourseEntry[] = [
  {
    name: 'Read to Prove',
    description:
      'Summer reading comprehension sprint. Main idea, inference, vocabulary, and text evidence. Grades 1–8. Dublin, CA.',
    schedule: courseSchedule(WEEKDAY_SCHEDULE),
    offers: SPRINT_OFFERS.map(courseOffer),
  },
  {
    name: 'Write to Explain',
    description:
      'Summer writing sprint. Sentence structure, paragraph writing, essays, and revision. Grades 1–8. Dublin, CA.',
    schedule: courseSchedule(WEEKDAY_SCHEDULE),
    offers: SPRINT_OFFERS.map(courseOffer),
  },
  {
    name: 'Bridge the Gap Math',
    description:
      'Summer math foundations sprint. Fractions, word problems, multi-step math, and grade readiness. Grades 1–8. Dublin, CA.',
    schedule: courseSchedule(WEEKDAY_SCHEDULE),
    offers: SPRINT_OFFERS.map(courseOffer),
  },
  {
    name: 'IM1 Get Ready Sprint',
    description:
      'Grade 7 accelerated math readiness. 100% DUSD aligned. Mon/Wed/Fri evenings. Dublin, CA.',
    schedule: courseSchedule(MWF_SCHEDULE_JULY),
    offers: STANDARD_GET_READY_OFFERS.map(courseOffer),
  },
  {
    name: 'IM2 Get Ready Sprint',
    description:
      'Grade 8 Integrated Math 2 readiness. 100% DUSD aligned. Mon/Wed/Fri evenings. Dublin, CA.',
    schedule: courseSchedule(MWF_SCHEDULE_JULY),
    offers: STANDARD_GET_READY_OFFERS.map(courseOffer),
  },
  {
    name: 'Algebra 1 Get Ready Sprint',
    description:
      'Algebra 1 foundations before school starts. DUSD aligned. Mon/Wed/Fri evenings. Dublin, CA.',
    schedule: courseSchedule(MWF_SCHEDULE_JUNE),
    offers: STANDARD_GET_READY_OFFERS.map(courseOffer),
  },
  {
    name: 'Geometry Get Ready Sprint',
    description:
      'Geometry prep — proofs, reasoning, and spatial thinking. DUSD aligned. Mon/Wed/Fri evenings. Dublin, CA.',
    schedule: courseSchedule(MWF_SCHEDULE_JUNE),
    offers: GEOMETRY_GET_READY_OFFERS.map(courseOffer),
  },
];

/** Page-specific EducationalOrganization JSON-LD for local SEO on the academic summer hub. */
export function buildAcademicSummerProgramsOrgSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: ORG_NAME,
    url: baseUrl,
    logo: `${baseUrl}/assets/growwise-logo.png`,
    description:
      'Small-group academic summer programs in Dublin, CA. Reading, writing, and math sprints for grades 1–10. DUSD and PUSD aligned.',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '40',
      bestRating: '5',
    },
  };
}

/** ItemList of Course JSON-LD for GrowWise academic summer programs. */
export function buildAcademicSummerProgramsCourseItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GrowWise Academic Summer Programs',
    description:
      'Summer sprint programs in reading, writing, and math for grades 1–10 in Dublin, CA',
    itemListElement: ACADEMIC_SUMMER_COURSES.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: courseProvider(),
        courseSchedule: course.schedule,
        offers: course.offers,
      },
    })),
  };
}
