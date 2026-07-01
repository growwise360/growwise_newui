import { Metadata } from 'next'
import FAQSchema from '@/components/schema/FAQSchema'
import { BOOK_ASSESSMENT_FAQ_JSONLD } from '@/lib/schema/course-hub-jsonld-faqs'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { CONTACT_INFO } from '@/lib/constants'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/book-assessment', locale)
  return metadata || { title: 'Book Readiness Assessment | GrowWise', description: 'Book your GrowWise readiness assessment' }
}

export default async function BookAssessmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteSiteUrl('/book-assessment#service', locale, baseUrl),
    name: 'GrowWise Readiness Assessment',
    description:
      "Book a GrowWise readiness assessment in Dublin, CA. We evaluate your child's current level in Math, English, or STEAM and recommend the right next step.",
    serviceType: 'Academic Readiness Assessment',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'GrowWise',
      url: baseUrl,
      telephone: CONTACT_INFO.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_INFO.street,
        addressLocality: 'Dublin',
        addressRegion: 'CA',
        postalCode: CONTACT_INFO.zipCode,
        addressCountry: 'US',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Dublin' },
      { '@type': 'City', name: 'Pleasanton' },
      { '@type': 'City', name: 'San Ramon' },
      { '@type': 'City', name: 'Livermore' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Free 20-Minute Assessment',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
        description: 'Verbal academic gap check and recommended next step',
      },
      {
        '@type': 'Offer',
        name: '60-Minute Full Gap Diagnostic',
        price: '49',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
        description: '60-minute in-depth gap diagnostic with pattern analysis and written report',
      },
    ],
    url: absoluteSiteUrl('/book-assessment', locale, baseUrl),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema faqs={BOOK_ASSESSMENT_FAQ_JSONLD} />
      {children}
    </>
  )
}
