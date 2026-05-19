import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { getValidLocale } from '@/i18n/localeConfig';
import { generateFAQPageSchema } from '@/lib/seo/structuredData';

const HOME_FAQS = [
  {
    question: 'What grades does GrowWise serve?',
    answer:
      'GrowWise serves students in Grades 1 through 12, offering personalized academic tutoring and STEAM programs for all levels.',
  },
  {
    question: 'Where is GrowWise located?',
    answer:
      'GrowWise is located at 4564 Dublin Blvd, Dublin, CA 94568, serving families across Dublin, Pleasanton, San Ramon, Danville, and Livermore.',
  },
  {
    question: 'What subjects does GrowWise tutor?',
    answer:
      'GrowWise offers tutoring in Math (Grades 1-12), English Language Arts, SAT/ACT Prep, Python coding, ML/AI, and Game Development.',
  },
  {
    question: 'How do I get started at GrowWise?',
    answer:
      'Book a free diagnostic assessment at growwiseschool.org/book-assessment. We assess your child\u2019s level and create a personalized learning plan.',
  },
  {
    question: 'Does GrowWise offer summer camps?',
    answer:
      'Yes. GrowWise runs accredited summer camps in Math, Coding, Robotics, and STEAM for Grades K-12 in Dublin, CA. Sessions run June through August.',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getValidLocale(rawLocale);
  const metadata = generateMetadataFromPath('/', locale);
  return metadata || { title: 'Grades 1-12 Tutoring & STEAM | Dublin CA | GrowWise' };
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  const baseUrl = getCanonicalSiteUrl();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "GrowWise — Grades 1-12 Tutoring & STEAM Programs in Dublin, CA",
    "description": "Grades 1-12 tutoring and STEAM in Dublin, CA. Math, English, coding, SAT prep, and camps. Small groups and personalized lessons. Book a free assessment.",
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

  const faqSchema = generateFAQPageSchema(HOME_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
