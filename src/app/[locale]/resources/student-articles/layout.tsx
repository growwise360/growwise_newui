import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()

  return {
    title: 'Published Student Articles | Student Corner | GrowWise',
    description:
      'Read published student articles, reflections, explainers, and opinion writing from GrowWise students.',
    alternates: {
      canonical: absoluteSiteUrl('/resources/student-articles', locale, baseUrl),
    },
  }
}

export default function StudentArticlesLayout({ children }: { children: ReactNode }) {
  return children
}
