import type { Metadata } from 'next'
import {
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
} from '@/data/resources/additional-summer-guides'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.title,
      description: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META.description,
    }
  )
}

export default async function ReadingProgramGrades12Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const graphSchema = buildResourceArticleGraphSchema(
    {
      path: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
      meta: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META,
      faqs: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS,
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

