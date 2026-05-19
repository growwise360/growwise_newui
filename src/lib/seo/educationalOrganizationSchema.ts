import { CONTACT_INFO } from '@/lib/constants'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

type CatalogCourse = {
  name: string
  description: string
  path: string
  typicalAgeRange: string
  educationalLevel: string
}

function courseOfferEntry(base: string, c: CatalogCourse) {
  const url = `${base}${c.path.startsWith('/') ? c.path : `/${c.path}`}`
  return {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Course',
      name: c.name,
      description: c.description,
      provider: { '@type': 'Organization', name: 'GrowWise School' },
      url,
      typicalAgeRange: c.typicalAgeRange,
      educationalLevel: c.educationalLevel,
      courseMode: 'onsite',
      inLanguage: 'en',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-01-01',
        url,
      },
    },
  }
}

const OFFER_CATALOG_COURSES: CatalogCourse[] = [
  {
    name: 'Math Tutoring Grades 1-12',
    description: 'Grades 1–12 math tutoring including high school math and SAT prep in Dublin, CA',
    path: '/courses/math',
    typicalAgeRange: '6-18',
    educationalLevel: 'Grades 1-12',
  },
  {
    name: 'English & ELA Tutoring',
    description: 'Grades 1–12 English, reading and writing classes in Dublin, CA',
    path: '/courses/english',
    typicalAgeRange: '6-18',
    educationalLevel: 'Grades 1-12',
  },
  {
    name: 'SAT Prep',
    description: 'Comprehensive SAT test preparation for high school students in Dublin, CA',
    path: '/courses/sat-prep',
    typicalAgeRange: '14-18',
    educationalLevel: 'High School',
  },
  {
    name: 'Python Coding',
    description: 'Python programming classes for kids and teens in Dublin, CA',
    path: '/steam/ml-ai-coding',
    typicalAgeRange: '10-18',
    educationalLevel: 'Grades 5-12',
  },
  {
    name: 'ML/AI Coding',
    description: 'Machine learning and AI coding classes for kids in Dublin, CA',
    path: '/steam/ml-ai-coding',
    typicalAgeRange: '10-18',
    educationalLevel: 'Grades 5-12',
  },
  {
    name: 'Game Development',
    description: 'Game development and coding classes for kids in Dublin, CA',
    path: '/steam/game-development',
    typicalAgeRange: '10-18',
    educationalLevel: 'Grades 5-12',
  },
]

/**
 * Site-wide EducationalOrganization + LocalBusiness JSON-LD (local SEO / entity clarity).
 * Exported for unit tests and used by {@link LocalBusinessSchema}.
 */
export function buildEducationalOrganizationSchema() {
  const base = getCanonicalSiteUrl()
  const mapQuery = encodeURIComponent(
    `GrowWise School ${CONTACT_INFO.street} Dublin CA ${CONTACT_INFO.zipCode}`
  )

  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
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
    sameAs: [
      'https://www.facebook.com/people/GrowWise/61561059687164/',
      'https://www.instagram.com/growwise.dublin/',
      'https://www.linkedin.com/company/thegrowwise/',
    ],
    subOrganization: [
      { '@type': 'EducationalOrganization', name: 'GrowWise STEAM Programs' },
      { '@type': 'EducationalOrganization', name: 'GrowWise Academic Tutoring' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Academic & STEAM Programs',
      itemListElement: OFFER_CATALOG_COURSES.map((c) => courseOfferEntry(base, c)),
    },
  }
}
