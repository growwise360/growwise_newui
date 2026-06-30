import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateMetadataFromPath } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return (
    generateMetadataFromPath('/resources/downloads', locale) ?? {
      title: 'Free Math & English Study Plans | GrowWise',
      description:
        'Download starter resources and create a free 4-week Math or English study plan for your child.',
    }
  )
}

export default function DownloadsLayout({ children }: { children: ReactNode }) {
  return children
}
