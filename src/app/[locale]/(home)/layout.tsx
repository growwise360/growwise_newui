import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { getValidLocale } from '@/i18n/localeConfig';
import FounderSchema from '@/components/seo/FounderSchema';
import HomeGraphSchema from '@/components/seo/HomeGraphSchema';
import { plusJakarta } from '@/lib/fonts';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getValidLocale(rawLocale);
  const metadata = generateMetadataFromPath('/', locale);
  return metadata || { title: 'Grades 3–12 Online Tutoring & Coding Classes | GrowWise' };
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  const baseUrl = getCanonicalSiteUrl();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Grades 3–12 Online Tutoring & Coding Classes | GrowWise",
    "description": "GrowWise helps Grades 3–12 students become confident, independent learners. Academic tutoring, Python & AI coding, and STEAM programs. Live online nationwide + in-person in Dublin, CA. Book a free assessment today.",
    "url": baseUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "GrowWise",
      "url": baseUrl,
    },
    "about": {
      "@type": "EducationalOrganization",
      "name": "GrowWise",
      "url": baseUrl,
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <HomeGraphSchema />
      <FounderSchema />
      <div className={plusJakarta.variable}>{children}</div>
    </>
  );
}
