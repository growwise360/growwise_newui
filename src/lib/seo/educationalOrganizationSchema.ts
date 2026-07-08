import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

/**
 * Site-wide EducationalOrganization + LocalBusiness JSON-LD (local SEO / entity clarity).
 * Exported for unit tests and used by {@link LocalBusinessSchema}.
 *
 * Deliberately excludes (SEO audit 2026-07-08):
 * - aggregateRating: self-serving ratings on Organization/LocalBusiness are ineligible
 *   for rich results and a review-snippet spam-policy risk.
 * - hasOfferCatalog: Course/Offer markup must live only on pages whose visible
 *   content matches (per-page Course JSON-LD), not on every page sitewide.
 *
 * The `@id` (`#organization`) is load-bearing: per-page Course schema references it
 * via `provider: { "@id": ... }`.
 */
export function buildEducationalOrganizationSchema() {
  const base = getCanonicalSiteUrl()
  const mapQuery = encodeURIComponent(
    `GrowWise School ${CONTACT_INFO.street} Dublin CA ${CONTACT_INFO.zipCode}`
  )

  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${base}#organization`,
    name: 'GrowWise',
    alternateName: 'GrowWise School',
    url: base,
    logo: `${base}/assets/growwise-logo.png`,
    image: `${base}/og-image.jpg`,
    description:
      'Grades 1-12 tutoring and STEAM programs in Dublin, CA. Math, English, coding, and SAT prep. Small groups, personalized lessons.',
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7022,
      longitude: -121.9358,
    },
    hasMap: `https://maps.google.com/?q=${mapQuery}`,
    openingHours: [...OFFICE_HOURS.schema],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    knowsAbout: [
      'STEAM Education for K-12',
      'Math Tutoring Dublin CA',
      'Kids Coding Classes',
      'AI and Machine Learning for Kids',
      'Game Development for Children',
      'Robotics Summer Camps',
      'Summer Camps Dublin CA Tri-Valley',
    ],
    areaServed: [
      { '@type': 'City', name: 'Dublin, CA' },
      { '@type': 'City', name: 'Pleasanton, CA' },
      { '@type': 'City', name: 'San Ramon, CA' },
      { '@type': 'City', name: 'Danville, CA' },
      { '@type': 'City', name: 'Livermore, CA' },
    ],
    // Expanded entity signals (SEO audit 2026-07-08). YouTube omitted: the audited
    // handle (@growwise.dublin) returns 404 — add once the owner confirms the real one.
    sameAs: [
      'https://www.facebook.com/people/GrowWise/61561059687164/',
      'https://www.instagram.com/growwise.dublin/',
      'https://www.linkedin.com/company/thegrowwise/',
      'https://www.yelp.com/biz/growwise-dublin',
      'https://nextdoor.com/pages/growwise-dublin-ca-1/',
      'https://www.crunchbase.com/organization/growwise-339a',
    ],
    subOrganization: [
      { '@type': 'EducationalOrganization', name: 'GrowWise STEAM Programs' },
      { '@type': 'EducationalOrganization', name: 'GrowWise Academic Tutoring' },
    ],
  }
}
