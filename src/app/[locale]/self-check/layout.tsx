import React from 'react';
import type { Metadata } from 'next';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { CONTACT_INFO } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = generateMetadataFromPath('/self-check', locale);
  return (
    meta ?? {
      title: 'Free Math Self-Check for Kids Grades 3–8 | GrowWise School',
      description:
        'Find out why your child keeps making the same math mistakes. Free 8-question quiz identifies the exact mistake pattern. Report emailed in minutes. No sign-up. Grades 3–8. Dublin, CA.',
      keywords: [
        'math self-check',
        'free math diagnostic',
        'math mistake patterns',
        'math tutoring Dublin CA',
        'child math assessment',
        'math gap finder',
        'GrowWise School',
      ],
      openGraph: {
        title: 'Free Math Self-Check — Find Your Child\'s Mistake Pattern',
        description:
          '8 questions. Personalized report emailed in minutes. Free for Grades 3–8.',
        url: 'https://www.growwiseschool.org/self-check',
        siteName: 'GrowWise School',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: 'https://www.growwiseschool.org/self-check',
      },
    }
  );
}

export default async function SelfCheckLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();
  const pageUrl = absoluteSiteUrl('/self-check', locale, baseUrl);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}`,
        url: pageUrl,
        name: 'Free Math Self-Check for Kids Grades 3–8 | GrowWise School',
        description:
          'Find out why your child keeps making the same math mistakes. Free 8-question self-check identifies the exact mistake pattern. Report emailed in minutes. No sign-up required.',
        inLanguage: 'en-US',
        isPartOf: { '@id': baseUrl },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Free Math Self-Check',
              item: pageUrl,
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'Free Math Mistake Self-Check',
        description:
          'An 8-question diagnostic quiz that identifies your child\'s exact math mistake patterns. GrowWise emails a full personalized report to parents within minutes of completion.',
        serviceType: 'Math Diagnostic Assessment',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'GrowWise School',
          url: baseUrl,
          telephone: CONTACT_INFO.phone,
          email: CONTACT_INFO.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: CONTACT_INFO.street,
            addressLocality: 'Dublin',
            addressRegion: 'CA',
            postalCode: CONTACT_INFO.zipCode,
            addressCountry: 'US',
          },
          areaServed: ['Dublin, CA', 'Pleasanton, CA', 'San Ramon, CA'],
          sameAs: [
            'https://www.facebook.com/growwiseschool',
            'https://www.instagram.com/growwiseschool',
            'https://www.linkedin.com/company/growwise-school',
          ],
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: 'Parents of K-12 students, Grades 3-8',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'Free — no credit card, no password required',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does the math self-check take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The self-check takes under 5 minutes. Your child answers 8 diagnostic math questions and GrowWise emails a full pattern report within minutes of completion.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the math self-check really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The GrowWise Math Self-Check is completely free. No credit card, no password, and no sign-up form required.',
            },
          },
          {
            '@type': 'Question',
            name: 'What grades is the self-check for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The self-check is calibrated for students in Grades 3 through 8.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does the report show?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The report identifies your child\'s confirmed mistake patterns — such as skipped steps, place value confusion, or word problem misreading — along with a risk level and a recommended next step.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is GrowWise School located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `GrowWise School is located at ${CONTACT_INFO.street}, Dublin, CA ${CONTACT_INFO.zipCode}. We serve students from Dublin, Pleasanton, and San Ramon.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
