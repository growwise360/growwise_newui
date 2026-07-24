import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateMetadataFromPath } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = generateMetadataFromPath('/resources/downloads', locale) ?? {
    title: 'Free Math & English Study Plans | GrowWise',
    description:
      'Download starter resources and create a free 4-week Math or English study plan for your child.',
  }
  // Page is an interactive study-plan builder with thin crawlable text.
  // Marking noindex prevents crawl budget waste; the page remains accessible via direct link.
  return {
    ...base,
    robots: { index: false, follow: true },
  }
}

export default function DownloadsLayout({ children }: { children: ReactNode }) {
  return children
}
