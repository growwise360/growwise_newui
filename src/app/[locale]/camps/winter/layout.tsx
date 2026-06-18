import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildNoIndexMetadata } from '@/lib/seo/noIndexMetadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/camps/winter', locale)
  return {
    ...(metadata ??
      buildNoIndexMetadata({
        title: 'Winter Camps in Dublin, CA | GrowWise',
        description: 'GrowWise winter camp dates are not yet published.',
        path: '/camps/winter',
        locale,
      })),
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  }
}

export default async function WinterCampLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()

  // Event schema removed: Winter Camp 2025 dates (Dec 22-30, 2025) are in the past.
  // Re-add Event schema when verified future dates are available on the page.
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Camps', url: absoluteSiteUrl('/camps', locale, baseUrl) },
    { name: 'Winter Camp', url: absoluteSiteUrl('/camps/winter', locale, baseUrl) },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
