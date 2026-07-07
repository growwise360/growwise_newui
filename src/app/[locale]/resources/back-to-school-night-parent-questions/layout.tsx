import type { Metadata } from 'next'
import {
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META,
  BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_PATH,
} from '@/data/resources/back-to-school-night-parent-questions'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildBackToSchoolNightParentQuestionsPageGraphSchema } from '@/lib/schema/back-to-school-night-parent-questions-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_PATH, locale)
  return (
    metadata ?? {
      title: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.title,
      description: BACK_TO_SCHOOL_NIGHT_PARENT_QUESTIONS_META.description,
    }
  )
}

export default async function BackToSchoolNightParentQuestionsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildBackToSchoolNightParentQuestionsPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
