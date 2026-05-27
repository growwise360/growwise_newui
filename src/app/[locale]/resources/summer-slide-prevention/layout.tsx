import type { Metadata } from 'next'
import { SUMMER_SLIDE_PREVENTION_META, SUMMER_SLIDE_PREVENTION_PATH } from '@/data/resources/summer-slide-prevention'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildSummerSlidePreventionPageGraphSchema } from '@/lib/schema/summer-slide-prevention-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(SUMMER_SLIDE_PREVENTION_PATH, locale)
  return (
    metadata ?? {
      title: SUMMER_SLIDE_PREVENTION_META.title,
      description: SUMMER_SLIDE_PREVENTION_META.description,
    }
  )
}

export default async function SummerSlidePreventionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildSummerSlidePreventionPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
