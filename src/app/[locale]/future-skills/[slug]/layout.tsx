import { notFound } from 'next/navigation';

import FAQSchema from '@/components/schema/FAQSchema';
import { getFutureSkillsPathway } from '@/lib/futureSkillsPathways';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { generateBreadcrumbSchema, generateCourseSchema } from '@/lib/seo/structuredData';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

export default async function FutureSkillsDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const pathway = getFutureSkillsPathway(slug);

  if (!pathway) {
    notFound();
  }

  const baseUrl = getCanonicalSiteUrl();
  const pathwayUrl = absoluteSiteUrl(pathway.href, locale, baseUrl);
  const assessmentUrl = absoluteSiteUrl(`/book-assessment?interest=future-skills-${slug}`, locale, baseUrl);

  const courseSchema = generateCourseSchema({
    name: pathway.title,
    description: pathway.summary,
    provider: 'GrowWise',
    courseCode: `FS-${slug}`,
    educationalLevel: pathway.bestFor,
    teaches: pathway.learningOutcomes,
    coursePrerequisites: 'Pathway assessment recommended to confirm starting level',
    url: pathwayUrl,
    image: `${baseUrl}/og-image.jpg`,
    offers: {
      availability: 'https://schema.org/InStock',
      url: assessmentUrl,
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Future Skills', url: absoluteSiteUrl('/future-skills', locale, baseUrl) },
    { name: pathway.shortTitle, url: pathwayUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FAQSchema faqs={pathway.faq} />
      {children}
    </>
  );
}
