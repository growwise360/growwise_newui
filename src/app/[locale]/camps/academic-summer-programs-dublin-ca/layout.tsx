import type { Metadata } from 'next';
import '@/components/camps/academic-summer-programs-page.global.css';
import FAQSchema from '@/components/schema/FAQSchema';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS } from '@/lib/schema/academic-summer-programs-hub-jsonld-faqs';
import {
  buildAcademicSummerProgramsCourseItemListSchema,
  buildAcademicSummerProgramsOrgSchema,
} from '@/lib/schema/academic-summer-programs-hub-jsonld';
import { generateBreadcrumbSchema, generateWebPageJsonLd } from '@/lib/seo/structuredData';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

const PAGE_PATH = '/camps/academic-summer-programs-dublin-ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateMetadataFromPath(PAGE_PATH, locale);
  return (
    metadata ?? {
      title: 'Academic Summer Programs in Dublin, CA | GrowWise',
      description:
        'Two focused summer sprints for Grades 1–10 — reading, writing, math foundations, plus IM1, Algebra 1, and Geometry prep. DUSD aligned.',
    }
  );
}

export default async function AcademicSummerProgramsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();
  const pageUrl = absoluteSiteUrl(PAGE_PATH, locale, baseUrl);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Camps', url: absoluteSiteUrl('/camps', locale, baseUrl) },
    { name: 'Academic Summer Programs', url: pageUrl },
  ]);

  const webPageSchema = generateWebPageJsonLd({
    name: 'Academic Summer Programs Dublin CA | GrowWise',
    description:
      'Affordable small-group reading, writing, and math summer programs in Dublin, CA. Daily focused instruction plus guided practice. Grades 1–10.',
    url: pageUrl,
  });

  const orgSchema = buildAcademicSummerProgramsOrgSchema(baseUrl);
  const courseItemListSchema = buildAcademicSummerProgramsCourseItemListSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQSchema faqs={ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseItemListSchema) }}
      />
      {children}
    </>
  );
}
