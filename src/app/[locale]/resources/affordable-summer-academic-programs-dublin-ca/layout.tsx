import type { Metadata } from 'next'
import {
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_PATH,
} from '@/data/resources/affordable-summer-academic-programs-dublin-ca'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildAffordableSummerAcademicProgramsDublinCaJsonLd } from '@/lib/schema/affordable-summer-academic-programs-dublin-ca-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_PATH, locale)
  return (
    metadata ?? {
      title: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.title,
      description: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.description,
    }
  )
}

export default async function AffordableSummerAcademicProgramsDublinCaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const jsonLd = buildAffordableSummerAcademicProgramsDublinCaJsonLd(baseUrl, locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.article) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      {children}
    </>
  )
}
