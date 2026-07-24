import type { Metadata } from 'next'
import { HOW_TO_CHOOSE_SUMMER_CAMP_META, HOW_TO_CHOOSE_SUMMER_CAMP_PATH } from '@/data/resources/how-to-choose-summer-camp'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildHowToChooseSummerCampArticleGraphSchema } from '@/lib/schema/how-to-choose-summer-camp-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(HOW_TO_CHOOSE_SUMMER_CAMP_PATH, locale)
  return (
    metadata ?? {
      title: HOW_TO_CHOOSE_SUMMER_CAMP_META.title,
      description: HOW_TO_CHOOSE_SUMMER_CAMP_META.description,
    }
  )
}

export default async function HowToChooseSummerCampLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildHowToChooseSummerCampArticleGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
