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
    title: 'Projects & Portfolio Highlights | Student Corner | GrowWise',
    description:
      'Explore coding, AI, design, and portfolio projects from GrowWise students.',
    alternates: {
      canonical: absoluteSiteUrl('/resources/student-projects', locale, baseUrl),
    },
  }
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
