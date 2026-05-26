import { HOME_VISIBLE_FAQS } from '@/lib/home/homeFaqCopy'
import { generateFAQPageSchema } from '@/lib/seo/structuredData'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const CANONICAL_BASE = getCanonicalSiteUrl()

const { ['@context']: _faqContext, ...faqPageNode } = generateFAQPageSchema(HOME_VISIBLE_FAQS)

export const HOME_GRAPH_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
      url: CANONICAL_BASE,
      logo: `${CANONICAL_BASE}/logo.png`,
      description:
        'GrowWise helps Grades 1-12 students become confident, independent learners through academic tutoring and STEAM programs. Available online nationwide and in-person in Dublin, CA.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4564 Dublin Blvd',
        addressLocality: 'Dublin',
        addressRegion: 'CA',
        postalCode: '94568',
        addressCountry: 'US',
      },
      telephone: '+19254564606',
      email: 'contact@growwiseschool.org',
      areaServed: 'US',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '325',
      },
    },
    faqPageNode,
  ],
} as const
