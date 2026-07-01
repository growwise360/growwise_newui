import type { Metadata } from 'next';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateWebPageJsonLd } from '@/lib/seo/structuredData';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

const PAGE_PATH = '/camps/academic-summer-sprint-dublin-ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateMetadataFromPath(PAGE_PATH, locale);
  return (
    metadata ?? {
      title: 'Academic Summer Sprint Dublin CA | GrowWise',
      description:
        'Read to Prove, Write with Structure, and Mistake-Proof Math sprints starting June 15 in Dublin, CA. DUSD aligned. Enroll online.',
    }
  );
}

export default async function AcademicSummerSprintLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();
  const pageUrl = absoluteSiteUrl(PAGE_PATH, locale, baseUrl);
  const hubUrl = absoluteSiteUrl('/camps/academic-summer-programs-dublin-ca', locale, baseUrl);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Camps', url: absoluteSiteUrl('/camps', locale, baseUrl) },
    { name: 'Academic Summer Programs', url: hubUrl },
    { name: 'Academic Summer Sprint', url: pageUrl },
  ]);

  const webPageSchema = generateWebPageJsonLd({
    name: 'Academic Summer Sprint in Dublin, CA | GrowWise',
    description:
      'Read to Prove, Write with Structure, and Mistake-Proof Math — focused summer sprints starting June 15. DUSD aligned, small groups, in-person at GrowWise Dublin.',
    url: pageUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}
