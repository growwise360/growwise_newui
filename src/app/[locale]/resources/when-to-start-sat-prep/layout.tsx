import type { Metadata } from 'next'
import { WHEN_TO_START_SAT_PREP_META, WHEN_TO_START_SAT_PREP_PATH } from '@/data/resources/when-to-start-sat-prep'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildWhenToStartSatPrepPageGraphSchema } from '@/lib/schema/when-to-start-sat-prep-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(WHEN_TO_START_SAT_PREP_PATH, locale)
  return (
    metadata ?? {
      title: WHEN_TO_START_SAT_PREP_META.title,
      description: WHEN_TO_START_SAT_PREP_META.description,
    }
  )
}

export default async function WhenToStartSatPrepLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildWhenToStartSatPrepPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
