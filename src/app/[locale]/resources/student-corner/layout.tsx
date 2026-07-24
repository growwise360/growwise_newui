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
    title: 'Student Corner — Writing & Project Showcase | GrowWise',
    description:
      'Explore GrowWise Student Corner, a showcase destination for student articles, short stories, creative writing, coding projects, and portfolio work.',
    alternates: {
      canonical: absoluteSiteUrl('/resources/student-corner', locale, baseUrl),
    },
  }
}

export default function StudentCornerLayout({ children }: { children: ReactNode }) {
  return children
}
