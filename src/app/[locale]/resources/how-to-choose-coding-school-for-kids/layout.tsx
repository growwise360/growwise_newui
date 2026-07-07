import type { Metadata } from 'next'
import {
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META,
  HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_PATH,
} from '@/data/resources/how-to-choose-coding-school-for-kids'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildHowToChooseCodingSchoolForKidsPageGraphSchema } from '@/lib/schema/how-to-choose-coding-school-for-kids-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_PATH, locale)
  return (
    metadata ?? {
      title: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.title,
      description: HOW_TO_CHOOSE_CODING_SCHOOL_FOR_KIDS_META.description,
    }
  )
}

export default async function HowToChooseCodingSchoolForKidsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildHowToChooseCodingSchoolForKidsPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
