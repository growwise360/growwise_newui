import type { Metadata } from 'next'
import { SUMMER_SLIDE_DUBLIN_CA_META, SUMMER_SLIDE_DUBLIN_CA_PATH } from '@/data/resources/summer-slide-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildSummerSlideDublinCaArticleGraphSchema } from '@/lib/schema/summer-slide-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(SUMMER_SLIDE_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: SUMMER_SLIDE_DUBLIN_CA_META.title,
      description: SUMMER_SLIDE_DUBLIN_CA_META.description,
    }
  )
}

export default async function SummerSlideDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildSummerSlideDublinCaArticleGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
