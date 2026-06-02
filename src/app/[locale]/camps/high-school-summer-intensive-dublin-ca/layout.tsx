import type { Metadata } from 'next';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateWebPageJsonLd } from '@/lib/seo/structuredData';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

const PAGE_PATH = '/camps/high-school-summer-intensive-dublin-ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateMetadataFromPath(PAGE_PATH, locale);
  return (
    metadata ?? {
      title: 'High School Summer Intensive Math · Dublin, CA | GrowWise',
      description:
        'Intensive 6-week summer math courses for Grades 9–12. Master Algebra 1, Geometry, Algebra 2, Precalculus, and AP Calculus. 54 hours of expert instruction.',
    }
  );
}

export default async function HighSchoolSummerIntensiveLayout({
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
    { name: 'High School Summer Intensive', url: pageUrl },
  ]);

  const webPageSchema = generateWebPageJsonLd({
    name: 'High School Summer Intensive Math Dublin CA | GrowWise',
    description:
      '6-week intensive summer math courses for high school students. Algebra 1, Geometry, Algebra 2, Precalculus, and AP Calculus. Expert instruction, small groups.',
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
