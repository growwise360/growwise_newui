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
    title: 'Short Stories & Creative Writing | Student Corner | GrowWise',
    description:
      'Explore short stories, personal narratives, creative scenes, and polished writing from GrowWise students.',
    alternates: {
      canonical: absoluteSiteUrl('/resources/student-creative-writing', locale, baseUrl),
    },
  }
}

export default function CreativeWritingLayout({ children }: { children: ReactNode }) {
  return children
}
