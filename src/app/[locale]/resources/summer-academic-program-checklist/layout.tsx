import type { Metadata } from 'next'
import {
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META,
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH,
} from '@/data/resources/summer-academic-program-checklist'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildSummerAcademicProgramChecklistPageGraphSchema } from '@/lib/schema/summer-academic-program-checklist-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH, locale)
  return (
    metadata ?? {
      title: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.title,
      description: SUMMER_ACADEMIC_PROGRAM_CHECKLIST_META.description,
    }
  )
}

export default async function SummerAcademicProgramChecklistLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildSummerAcademicProgramChecklistPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
