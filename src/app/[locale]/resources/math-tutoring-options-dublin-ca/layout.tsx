import type { Metadata } from 'next'
import {
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_FAQS,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_PATH,
} from '@/data/resources/august-math-english-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.title,
      description: KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META.description,
    }
  )
}

export default async function MathTutoringOptionsDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_PATH,
      meta: KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_META,
      faqs: KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_FAQS,
      articleSection: 'Local',
    },
    getCanonicalSiteUrl(),
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
