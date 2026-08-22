import { CONTACT_INFO } from '@/lib/constants'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export function EnrollAcademicPageJsonLd() {
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = `${baseUrl}/enroll-academic`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Enroll in Academic Programs — GrowWise Dublin CA',
        description:
          'Enroll in Grades 3–12 math, English, and SAT prep programs at GrowWise in Dublin, CA.',
        url: pageUrl,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'GrowWise',
          url: baseUrl,
        },
      },
      {
        '@type': 'Service',
        name: 'Academic Tutoring Enrollment — Math, English & SAT Prep',
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
