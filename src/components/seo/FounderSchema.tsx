import { CONTACT_INFO } from '@/lib/constants'
import { FOUNDER_COPY } from '@/data/founder-copy'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export default function FounderSchema() {
  const baseUrl = getCanonicalSiteUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: FOUNDER_COPY.name,
    jobTitle: 'Founder & Educational Director, GrowWise School',
    image: `${baseUrl}${FOUNDER_COPY.image}`,
    description: FOUNDER_COPY.schemaDescription,
    sameAs: [
      'https://nextdoor.com/pages/growwise-dublin-ca-1/',
      'https://www.yelp.com/biz/growwise-dublin',
    ],
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
      url: baseUrl,
    },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_INFO.street,
        addressLocality: 'Dublin',
        addressRegion: 'CA',
        postalCode: CONTACT_INFO.zipCode,
        addressCountry: 'US',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
