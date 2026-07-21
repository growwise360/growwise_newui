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
    title: 'Books Beyond Personality | Student Article | GrowWise',
    description:
      'Read a GrowWise Student Corner article by Aaran Karthik about how books shape personality, confidence, knowledge, and worldview.',
    alternates: {
      canonical: absoluteSiteUrl('/resources/student-articles/books-beyond-personality', locale, baseUrl),
    },
  }
}

export default function BooksBeyondPersonalityLayout({ children }: { children: ReactNode }) {
  return children
}
