import type { Metadata } from 'next'
import {
  WHY_GRADES_DESCRIPTION,
  WHY_GRADES_META_TITLE,
  WHY_GRADES_PATH,
} from '@/data/resources/why-grades-hide-learning-gaps-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildWhyGradesHideLearningGapsPageGraphSchema } from '@/lib/schema/why-grades-hide-learning-gaps-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(WHY_GRADES_PATH, locale)
  return (
    metadata ?? {
      title: WHY_GRADES_META_TITLE,
      description: WHY_GRADES_DESCRIPTION,
    }
  )
}

export default async function WhyGradesHideLearningGapsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildWhyGradesHideLearningGapsPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
