import type { Metadata } from 'next'
import {
  READING_FLUENCY_VS_COMPREHENSION_META,
  READING_FLUENCY_VS_COMPREHENSION_PATH,
} from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildReadingFluencyVsComprehensionPageGraphSchema } from '@/lib/schema/reading-fluency-vs-comprehension-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(READING_FLUENCY_VS_COMPREHENSION_PATH, locale)
  return (
    metadata ?? {
      title: READING_FLUENCY_VS_COMPREHENSION_META.title,
      description: READING_FLUENCY_VS_COMPREHENSION_META.description,
    }
  )
}

export default async function ReadingFluencyVsComprehensionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildReadingFluencyVsComprehensionPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
