import type { Metadata } from 'next'
import { WHAT_IS_VIBE_CODING_META, WHAT_IS_VIBE_CODING_PATH } from '@/data/resources/what-is-vibe-coding-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildWhatIsVibeCodingPageGraphSchema } from '@/lib/schema/what-is-vibe-coding-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(WHAT_IS_VIBE_CODING_PATH, locale)
  return (
    metadata ?? {
      title: WHAT_IS_VIBE_CODING_META.title,
      description: WHAT_IS_VIBE_CODING_META.description,
    }
  )
}

export default async function WhatIsVibeCodingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildWhatIsVibeCodingPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
