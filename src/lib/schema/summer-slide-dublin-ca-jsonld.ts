import { SUMMER_SLIDE_DUBLIN_CA_FAQS, SUMMER_SLIDE_DUBLIN_CA_PATH } from '@/data/resources/summer-slide-dublin-ca'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'

export function buildSummerSlideDublinCaArticleGraphSchema(baseUrl: string, locale: string) {
  const pageUrl = absoluteSiteUrl(SUMMER_SLIDE_DUBLIN_CA_PATH, locale, baseUrl)

  const article = {
    ...generateArticleSchema({
      title: 'The Summer Slide Is Real: What Dublin Parents Need to Know Before June Ends',
      description:
        'Dublin and Tri-Valley students lose months of academic progress every summer. Here\'s what the summer slide actually looks like — and how structured programs prevent it.',
      url: pageUrl,
      datePublished: '2026-06-01',
      dateModified: '2026-06-01',
      authorName: 'GrowWise',
    }),
    '@id': `${pageUrl}#article`,
  }

  const faqPage = {
    ...generateFAQPageSchema([...SUMMER_SLIDE_DUBLIN_CA_FAQS]),
    '@id': `${pageUrl}#faq`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faqPage],
  }
}
