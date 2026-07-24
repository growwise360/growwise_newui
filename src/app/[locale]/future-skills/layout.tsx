import type { Metadata } from 'next';

import { futureSkillsPathways } from '@/lib/futureSkillsPathways';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateMetadataFromPath('/future-skills', locale);
  return (
    metadata ?? {
      title: 'Future Skills Certification Pathways | GrowWise',
      description:
        'Future Skills pathways for Grades 6-12. Python, creative media, AI/ML, and entrepreneurship. Project-first learning before optional external exams.',
    }
  );
}

export default async function FutureSkillsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Future Skills Certification Pathways | GrowWise Dublin CA',
    description:
      'Structured certification pathways for Grades 6-12: design and creative media, Python, AI and machine learning, and AI entrepreneurship. Project-first learning with optional external exams at GrowWise Dublin.',
    url: absoluteSiteUrl('/future-skills', locale, baseUrl),
    serviceType: 'Certification Pathway Education',
    provider: { '@id': `${baseUrl}#organization` },
    areaServed: ['Dublin, CA', 'Pleasanton, CA', 'San Ramon, CA', 'Tri-Valley, CA'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Future Skills Pathways',
      itemListElement: futureSkillsPathways.map((pathway) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: pathway.title,
          description: pathway.summary,
          provider: { '@id': `${baseUrl}#organization` },
          url: absoluteSiteUrl(pathway.href, locale, baseUrl),
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
