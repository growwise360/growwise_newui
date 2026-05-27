import {
  MATH_GRADE_BAND_STUBS,
  MATH_HUB_COPY,
  MATH_HUB_PATH,
  type MathGradeBandId,
} from '@/lib/math-hub-copy';
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData';
import { absoluteSiteUrl } from '@/lib/publicPath';

const ORG_NAME = 'GrowWise School';
const ORG_URL = 'https://growwiseschool.org';

function courseNode(
  baseUrl: string,
  locale: string,
  name: string,
  description: string,
  path: string,
) {
  return {
    '@type': 'Course' as const,
    name,
    description,
    provider: {
      '@type': 'Organization' as const,
      name: ORG_NAME,
      url: ORG_URL,
    },
    url: absoluteSiteUrl(path, locale, baseUrl),
    hasCourseInstance: {
      '@type': 'CourseInstance' as const,
      courseMode: 'online',
      startDate: 'monthly',
    },
  };
}

function hubBreadcrumbs(baseUrl: string, locale: string) {
  return generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Math Programs', url: absoluteSiteUrl(MATH_HUB_PATH, locale, baseUrl) },
  ]);
}

/** @graph for /academic/math — BreadcrumbList, 3× Course, FAQPage */
export function buildMathHubPageGraphSchema(baseUrl: string, locale: string) {
  const bandCourses = MATH_HUB_COPY.gradeBands.cards.map((card) =>
    courseNode(
      baseUrl,
      locale,
      MATH_GRADE_BAND_STUBS[card.id].schemaCourseName,
      MATH_GRADE_BAND_STUBS[card.id].schemaDescription,
      card.path,
    ),
  );

  const faqPage = generateFAQPageSchema([...MATH_HUB_COPY.faq.items]);

  return {
    '@context': 'https://schema.org',
    '@graph': [hubBreadcrumbs(baseUrl, locale), ...bandCourses, faqPage],
  };
}

/** @graph for grade-band stub pages — BreadcrumbList + single Course */
export function buildMathGradeBandPageGraphSchema(
  bandId: MathGradeBandId,
  baseUrl: string,
  locale: string,
) {
  const stub = MATH_GRADE_BAND_STUBS[bandId];

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Math Programs', url: absoluteSiteUrl(MATH_HUB_PATH, locale, baseUrl) },
    { name: stub.breadcrumbLabel, url: absoluteSiteUrl(stub.path, locale, baseUrl) },
  ]);

  const course = courseNode(
    baseUrl,
    locale,
    stub.schemaCourseName,
    stub.schemaDescription,
    stub.path,
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbs, course],
  };
}
