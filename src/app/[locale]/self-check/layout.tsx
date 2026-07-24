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
  const baseUrl = getCanonicalSiteUrl();
  const selfCheckUrl = absoluteSiteUrl('/self-check', locale, baseUrl);
  return (
    meta ?? {
      title: 'Academic Self-Check for Students | GrowWise Dublin CA',
      description:
        'Answer 8 questions to find out where you stand in math or English. Get a clear picture of your strengths and the gaps holding you back — in under 10 minutes.',
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
        url: selfCheckUrl,
        siteName: 'GrowWise School',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: selfCheckUrl,
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
        name: 'Academic Self-Check for Students | GrowWise Dublin CA',
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
            name: "What exactly is a 'gap pattern' in math?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A gap pattern is a specific, repeating mistake a student makes because of a missing foundational skill. It is not a random careless error. If a student gets five fraction problems wrong in a row for the exact same reason, they have a gap pattern.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I tell the difference between a silly mistake and a gap pattern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Look at the data over a week. A silly mistake is a one-off brain fart (like 2+3=6 on one problem, but 2+3=5 on the next). A gap pattern happens consistently across multiple worksheets, quizzes, and homework assignments.',
            },
          },
          {
            '@type': 'Question',
            name: "Why do students constantly make the 'Column Drift' (place value) mistake?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This pattern usually happens due to poor fine motor skills or rushing. Students try to write quickly, their handwriting gets messy, and they accidentally add a number in the ones column to a number in the tens column.',
            },
          },
          {
            '@type': 'Question',
            name: "How can I quickly fix 'Column Drift' without buying new materials?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Turn a standard piece of lined notebook paper sideways (90 degrees). The horizontal blue lines will now become vertical columns. Have the student write one digit per column to keep their math perfectly aligned.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does my student keep solving equations strictly from left to right?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "This is the 'Left-to-Right Rush.' Students are trained to read books from left to right, so they naturally try to read math the same way. They forget that the order of operations (PEMDAS/BODMAS) overrides reading rules.",
            },
          },
          {
            '@type': 'Question',
            name: 'What is the easiest trick to get kids to remember PEMDAS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Have them preview the problem like a detective. Before they solve anything, they must use a yellow highlighter to find and highlight all multiplication and division symbols. This forces them to pause and do those parts first.',
            },
          },
          {
            '@type': 'Question',
            name: "Why do fractions cause the 'Numerator/Denominator Flip' pattern?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kids treat fractions like two separate whole numbers sitting on top of each other rather than one single value. Because 8 is greater than 2, their brain instantly tells them that 1/8 is greater than 1/2, ignoring the reality of how fractions work.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I correct the fraction gap pattern using real-world items?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Stop using abstract numbers and use money or food. Ask them: 'Would you rather have 1 out of 2 slices of a pizza, or 1 out of 8 slices?' Visualizing the actual size of the pieces instantly corrects the misconception.",
            },
          },
          {
            '@type': 'Question',
            name: 'My student keeps dropping negative signs in algebra. How do I stop this?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "This is the 'Sign Flip' pattern. Have them draw a physical wall or use an explicit multiplier. Change a problem like -(x + 4) to -1 * (x + 4), and force them to draw arrows from the -1 to both terms inside the parentheses before multiplying.",
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take to break one of these 5 gap patterns?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It usually takes 2 to 3 weeks of targeted daily practice. You cannot just tell them the rule once; you must enforce the visual habit (like using graph paper or highlighters) until their brain builds a new pathway.',
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
