import {
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_JSONLD_FAQS,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META,
} from '@/data/resources/affordable-summer-academic-programs-dublin-ca'
import {
  buildAffordableSummerAcademicProgramsDublinCaJsonLd,
  buildAffordableSummerArticleJsonLd,
  buildAffordableSummerBreadcrumbJsonLd,
  buildAffordableSummerFaqJsonLd,
} from '@/lib/schema/affordable-summer-academic-programs-dublin-ca-jsonld'

const BASE = 'https://growwiseschool.org'
const PAGE =
  'https://growwiseschool.org/resources/affordable-summer-academic-programs-dublin-ca'
const RESOURCES = 'https://growwiseschool.org/resources'

describe('affordable-summer-academic-programs-dublin-ca-jsonld', () => {
  it('builds Article JSON-LD with exact template fields', () => {
    const article = buildAffordableSummerArticleJsonLd(BASE, PAGE)
    expect(article).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.h1,
      description: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.description,
      author: { '@type': 'Organization', name: 'GrowWise' },
      publisher: { '@type': 'Organization', name: 'GrowWise', url: BASE },
      datePublished: '2026-06-08',
      dateModified: '2026-06-08',
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE },
    })
  })

  it('builds FAQPage JSON-LD from visible FAQs only', () => {
    const faq = buildAffordableSummerFaqJsonLd()
    expect(faq['@type']).toBe('FAQPage')
    expect(faq.mainEntity).toHaveLength(6)
    expect(faq.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS[0].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS[0].answer,
      },
    })
  })

  it('matches JSON-LD FAQs to visible FAQs exactly', () => {
    expect(AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_JSONLD_FAQS).toEqual(
      AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS,
    )
  })

  it('builds BreadcrumbList with Resources as step 2', () => {
    const breadcrumb = buildAffordableSummerBreadcrumbJsonLd(BASE, RESOURCES, PAGE)
    expect(breadcrumb.itemListElement).toHaveLength(3)
    expect(breadcrumb.itemListElement[1]).toMatchObject({
      position: 2,
      name: 'Resources',
      item: RESOURCES,
    })
  })

  it('returns three separate JSON-LD objects', () => {
    const jsonLd = buildAffordableSummerAcademicProgramsDublinCaJsonLd(BASE, 'en')
    expect(jsonLd.article['@context']).toBe('https://schema.org')
    expect(jsonLd.faq['@context']).toBe('https://schema.org')
    expect(jsonLd.breadcrumb['@context']).toBe('https://schema.org')
  })
})
