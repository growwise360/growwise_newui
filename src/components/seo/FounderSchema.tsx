import { CONTACT_INFO } from '@/lib/constants'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const FOUNDER_IMAGE_PATH = '/assets/founderImage.webp'

export default function FounderSchema() {
  const baseUrl = getCanonicalSiteUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anshika Verma',
    jobTitle: 'Founder & Educational Director, GrowWise School',
    image: `${baseUrl}${FOUNDER_IMAGE_PATH}`,
    description:
      'Educator focused on teaching kids how to learn. Founder of GrowWise School, a K–12 enrichment and tutoring center in Dublin, CA.',
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
