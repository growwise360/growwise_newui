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
    title: 'How Recycling Helps The Environment | Student Article | GrowWise',
    description:
      'Read a GrowWise Student Corner article by Aaran Karthik about how recycling reduces waste and protects natural resources.',
    alternates: {
      canonical: absoluteSiteUrl('/resources/student-articles/how-recycling-helps-the-environment', locale, baseUrl),
    },
  }
}

export default function RecyclingArticleLayout({ children }: { children: ReactNode }) {
  return children
}
