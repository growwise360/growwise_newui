import { CONTACT_INFO } from '@/lib/constants'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export function EnrollPageJsonLd() {
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = `${baseUrl}/enroll`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Enroll at GrowWise — Dublin CA',
        description:
          'Enroll your child in K-12 tutoring, STEAM, or summer camp programs at GrowWise in Dublin, CA.',
        url: pageUrl,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'GrowWise',
          url: baseUrl,
        },
      },
      {
        '@type': 'Service',
        name: 'K-12 Tutoring & STEAM Enrollment',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'GrowWise',
          address: {
            '@type': 'PostalAddress',
            streetAddress: CONTACT_INFO.street,
            addressLocality: 'Dublin',
            addressRegion: 'CA',
            postalCode: CONTACT_INFO.zipCode,
          },
        },
        areaServed: ['Dublin, CA', 'Pleasanton, CA', 'San Ramon, CA', 'Livermore, CA'],
        url: pageUrl,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
