/**
 * Structured Data (JSON-LD) for SEO
 * Schema.org markup for better search engine understanding
 */

import type { FormThankYouId } from '@/data/form-thank-you/types'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from './siteUrl'

const CANONICAL_BASE = getCanonicalSiteUrl()

export const TRI_VALLEY_AREA_SERVED = [
  "Dublin, CA",
  "Pleasanton, CA",
  "San Ramon, CA",
  "Danville, CA",
  "Livermore, CA",
  "Tri-Valley, CA",
] as const


export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GrowWise",
  "url": CANONICAL_BASE,
}

/**
 * Generate Course structured data
 */
export function generateCourseSchema({
  name,
  description,
  courseCode,
  educationalLevel,
  teaches,
  coursePrerequisites,
  url,
  image,
  offers,
  location,
}: {
  name: string
  description: string
  /** Accepted for caller compatibility; the provider is always the sitewide GrowWise org (@id reference). */
  provider?: string
  courseCode?: string
  educationalLevel?: string
  teaches?: string[]
  coursePrerequisites?: string
  url: string
  image?: string
  offers?: {
    price?: string
    priceCurrency?: string
    availability?: string
    url?: string
    validFrom?: string
  }
  location?: {
    name: string
    address: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    // Reference the sitewide org block (root layout) by @id instead of duplicating
    // NAP data on every course page. All callers are GrowWise courses, so the
    // `provider` name param is intentionally ignored.
    "provider": { "@id": `${CANONICAL_BASE}#organization` },
    ...(courseCode && { "courseCode": courseCode }),
    ...(educationalLevel && { "educationalLevel": educationalLevel }),
    ...(teaches && teaches.length > 0 && { "teaches": teaches }),
    ...(coursePrerequisites && { "coursePrerequisites": coursePrerequisites }),
    "url": url,
    ...(image && { "image": image }),
    "inLanguage": "en-US",
    "isAccessibleForFree": false,
    ...(location && {
      "location": {
        "@type": "Place",
        "name": location.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": location.address.streetAddress,
          "addressLocality": location.address.addressLocality,
          "addressRegion": location.address.addressRegion,
          "postalCode": location.address.postalCode,
          "addressCountry": location.address.addressCountry,
        },
      },
    }),
    ...(offers && {
      "offers": {
        "@type": "Offer",
        ...(offers.price && { "price": offers.price }),
        ...(offers.priceCurrency && { "priceCurrency": offers.priceCurrency || "USD" }),
        ...(offers.availability && { "availability": offers.availability || "https://schema.org/InStock" }),
        ...(offers.url && { "url": offers.url }),
        ...(offers.validFrom && { "validFrom": offers.validFrom }),
      }
    }),
  }
}

/**
 * Generate Event structured data
 */
export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  image,
  offers,
  eventStatus,
  eventAttendanceMode,
  performer,
}: {
  name: string
  description: string
  startDate: string
  endDate: string
  location: {
    name: string
    address: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
  organizer?: {
    name: string
    url: string
  }
  image?: string
  offers?: {
    price?: string
    priceCurrency?: string
    availability?: string
    url?: string
    validFrom?: string
  }
  eventStatus?: string
  eventAttendanceMode?: string
  performer?: {
    name: string
    type?: string
  }
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "location": {
      "@type": "Place",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address.streetAddress,
        "addressLocality": location.address.addressLocality,
        "addressRegion": location.address.addressRegion,
        "postalCode": location.address.postalCode,
        "addressCountry": location.address.addressCountry,
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer?.name || "GrowWise",
      "url": organizer?.url || CANONICAL_BASE,
    },
    ...(image && { "image": image }),
    ...(offers && {
      "offers": {
        "@type": "Offer",
        ...(offers.price && { "price": offers.price }),
        ...(offers.priceCurrency && { "priceCurrency": offers.priceCurrency || "USD" }),
        ...(offers.availability && { "availability": offers.availability || "https://schema.org/InStock" }),
        ...(offers.url && { "url": offers.url }),
        ...(offers.validFrom && { "validFrom": offers.validFrom }),
      }
    }),
    ...(eventStatus && { "eventStatus": eventStatus || "https://schema.org/EventScheduled" }),
    ...(eventAttendanceMode && { "eventAttendanceMode": eventAttendanceMode || "https://schema.org/OfflineEventAttendanceMode" }),
    ...(performer && {
      "performer": {
        "@type": performer.type || "Person",
        "name": performer.name,
      }
    }),
  }
}

/**
 * Generate Review/AggregateRating structured data
 */
export function generateReviewSchema({
  itemReviewed,
  reviewRating,
  author,
  reviewBody,
  datePublished,
}: {
  itemReviewed: {
    "@type": string
    name: string
  }
  reviewRating: {
    ratingValue: number
    bestRating?: number
    worstRating?: number
  }
  author?: {
    name: string
    type?: string
  }
  reviewBody?: string
  datePublished?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": itemReviewed,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": reviewRating.ratingValue,
      "bestRating": reviewRating.bestRating || 5,
      "worstRating": reviewRating.worstRating || 1,
    },
    ...(author && {
      "author": {
        "@type": author.type || "Person",
        "name": author.name,
      }
    }),
    ...(reviewBody && { "reviewBody": reviewBody }),
    ...(datePublished && { "datePublished": datePublished }),
  }
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQPageSchema(faqs: ReadonlyArray<{
  question: string
  answer: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      }
    }))
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: Array<{
  name: string
  url: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    }))
  }
}

/**
 * WebPage for a program/marketing URL — mirrors form-thank-you WebPage; site org graph stays in root layout.
 */
export function generateWebPageJsonLd({
  name,
  description,
  url,
  inLanguage = "en-US",
}: {
  name: string
  description: string
  url: string
  inLanguage?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "inLanguage": inLanguage,
    "isPartOf": {
      "@type": "WebSite",
      "name": "GrowWise",
      "url": CANONICAL_BASE,
    },
    "about": {
      "@type": "EducationalOrganization",
      "name": "GrowWise",
      "url": CANONICAL_BASE,
    },
  }
}

/**
 * ItemList of public URLs (e.g. summer program detail pages). Each entry must map to a real on-site route.
 */
export function generateItemListSchema(
  name: string,
  items: ReadonlyArray<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }
}

/**
 * Generate BlogPosting structured data (for blog posts).
 * Uses BlogPosting (preferred over Article for blog content) per Google & AI search best practices.
 * Only include verified fields — never invent dates, images, or author names not visible on the page.
 */
export function generateArticleSchema({
  headline,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: {
  headline: string
  description: string
  url: string
  image?: string
  author?: {
    name: string
    type?: string
  }
  datePublished?: string
  dateModified?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    "publisher": {
      "@type": "Organization",
      "name": "GrowWise",
      "url": CANONICAL_BASE,
    },
    "author": {
      "@type": author?.type || "Organization",
      "name": author?.name || "GrowWise",
    },
    ...(image && { "image": image }),
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified }),
  }
}

const BREADCRUMB_FOR_FORM: Record<
  FormThankYouId,
  { parentName: string; parentPath: string }
> = {
  'book-assessment': { parentName: 'Book assessment', parentPath: '/book-assessment' },
  enroll: { parentName: 'Enroll', parentPath: '/enroll' },
  'enroll-academic': { parentName: 'Academic enrollment', parentPath: '/enroll-academic' },
  contact: { parentName: 'Contact', parentPath: '/contact' },
};

/**
 * JSON-LD for form thank-you pages: BreadcrumbList + WebPage in one @graph.
 * No PII; aligns with home WebPage pattern in (home)/layout.tsx.
 */
export function generateFormThankYouJsonLd({
  name,
  description,
  pageUrl,
  locale,
  inLanguage = 'en-US',
  formId,
}: {
  name: string;
  description: string;
  pageUrl: string;
  /** Used with publicPath for Home and parent funnel URLs. */
  locale: string;
  inLanguage?: string;
  formId: FormThankYouId;
}): Record<string, unknown> {
  const { parentName, parentPath } = BREADCRUMB_FOR_FORM[formId];
  const homeUrl = absoluteSiteUrl('/', locale, CANONICAL_BASE);
  const parentUrl = absoluteSiteUrl(parentPath, locale, CANONICAL_BASE);

  const breadcrumb: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
      { '@type': 'ListItem', position: 2, name: parentName, item: parentUrl },
      { '@type': 'ListItem', position: 3, name: 'Thank you', item: pageUrl },
    ],
  };

  const orgUrl = homeUrl;
  const webPage: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: pageUrl,
    inLanguage,
    isPartOf: {
      '@type': 'WebSite',
      name: 'GrowWise',
      url: orgUrl,
    },
    about: {
      '@type': 'EducationalOrganization',
      name: 'GrowWise',
      url: orgUrl,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumb, webPage],
  };
}

