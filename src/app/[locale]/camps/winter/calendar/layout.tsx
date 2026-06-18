import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const metadata = generateMetadataFromPath('/camps/winter/calendar', locale)
  const baseMetadata =
    metadata || ({ title: 'Winter Camp Calendar | GrowWise', description: 'Winter camp calendar' } satisfies Metadata)

  return {
    ...baseMetadata,
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  }
}

export default function WinterCampCalendarLayout({ children }: { children: React.ReactNode }) {
  return children
}
