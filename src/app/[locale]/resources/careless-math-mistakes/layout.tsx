import type { Metadata } from 'next'
import {
  CARELESS_MATH_MISTAKES_DESCRIPTION,
  CARELESS_MATH_MISTAKES_META_TITLE,
  CARELESS_MATH_MISTAKES_PATH,
} from '@/data/resources/careless-math-mistakes-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildCarelessMathMistakesPageGraphSchema } from '@/lib/schema/careless-math-mistakes-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(CARELESS_MATH_MISTAKES_PATH, locale)
  return (
    metadata ?? {
      title: CARELESS_MATH_MISTAKES_META_TITLE,
      description: CARELESS_MATH_MISTAKES_DESCRIPTION,
    }
  )
}

export default async function CarelessMathMistakesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildCarelessMathMistakesPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
