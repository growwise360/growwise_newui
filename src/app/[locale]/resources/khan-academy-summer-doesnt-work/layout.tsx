import type { Metadata } from 'next'
import {
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_META,
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH,
} from '@/data/resources/khan-academy-summer-doesnt-work'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildKhanAcademySummerDoesntWorkPageGraphSchema } from '@/lib/schema/khan-academy-summer-doesnt-work-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH, locale)
  return (
    metadata ?? {
      title: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.title,
      description: KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.description,
    }
  )
}

export default async function KhanAcademySummerDoesntWorkLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildKhanAcademySummerDoesntWorkPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
