import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'
import { DUBLIN_CA_COPY, DUBLIN_CA_PATH } from '@/data/dublin-ca-copy'
import { DUBLIN_CA_FAQS } from '@/data/dublin-ca-faqs'
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'

const LOCAL_BUSINESS_ID_SUFFIX = '#localbusiness'

export function buildDublinCaLocalBusinessSchema(baseUrl: string, pageUrl?: string) {
  const resolvedPageUrl = pageUrl ?? `${baseUrl}${DUBLIN_CA_PATH}`
  const mapQuery = encodeURIComponent(
    `GrowWise School ${CONTACT_INFO.street} Dublin CA ${CONTACT_INFO.zipCode}`,
  )

  return {
    '@type': 'LocalBusiness',
    '@id': `${resolvedPageUrl}${LOCAL_BUSINESS_ID_SUFFIX}`,
    name: 'GrowWise School — Dublin, CA',
    url: resolvedPageUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.street,
      addressLocality: 'Dublin',
      addressRegion: 'CA',
      postalCode: CONTACT_INFO.zipCode,
      addressCountry: 'US',
    },
    telephone: '+19254564606',
    openingHours: [...OFFICE_HOURS.schema],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7022,
      longitude: -121.9358,
    },
    areaServed: ['Dublin CA', 'Pleasanton CA', 'San Ramon CA', 'Tri-Valley CA'],
    hasMap: `https://maps.google.com/?q=${mapQuery}`,
  }
}

export function buildDublinCaPageGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(DUBLIN_CA_PATH, locale, baseUrl)
  const organizationId = `${baseUrl}#organization`

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: DUBLIN_CA_COPY.hero.h1,
    description: DUBLIN_CA_COPY.hero.subtext,
    about: { '@id': organizationId },
    isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'GrowWise School' },
  }

  const faqPage = {
    ...generateFAQPageSchema([...DUBLIN_CA_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  const breadcrumbPage = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Dublin, CA', url: pageUrl },
  ])
  const breadcrumbList = { ...breadcrumbPage, '@id': `${pageUrl}#breadcrumb` }

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, faqPage, breadcrumbList],
  }
}
