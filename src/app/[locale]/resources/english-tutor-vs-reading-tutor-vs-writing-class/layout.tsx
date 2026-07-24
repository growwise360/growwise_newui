import type { Metadata } from 'next'
import {
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_FAQS,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_PATH,
} from '@/data/resources/august-math-english-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_PATH, locale)
  return (
    metadata ?? {
      title: ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.title,
      description: ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META.description,
    }
  )
}

export default async function EnglishTutorVsReadingTutorLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_PATH,
      meta: ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_META,
      faqs: ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_FAQS,
      articleSection: 'Academic',
    },
    getCanonicalSiteUrl(),
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
