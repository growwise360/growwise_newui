import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/steam/game-development', locale)
  return metadata || { title: 'Game Development | GrowWise', description: 'Game development course' }
}

export default async function GameDevelopmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const courseSchema = generateCourseSchema({
    name: "Game Development Classes for Kids — Dublin, CA",
    description:
      "Game development courses for kids in Dublin, CA. Learn to build games using Roblox Studio, Scratch, Minecraft, and Unity. For Grades 1-12.",
    provider: "GrowWise",
    courseCode: "GAME-DEV-K12",
    educationalLevel: "Grades 1-12",
    teaches: [
      "Game Design",
      "Game Programming",
      "Roblox Development",
      "Scratch Programming",
      "Python Game Development",
      "Minecraft Modding",
      "Game Mechanics"
    ],
    coursePrerequisites: "No prior experience required - perfect for beginners",
    url: absoluteSiteUrl('/steam/game-development', locale, baseUrl),
    image: `${baseUrl}/og-image.jpg`,
    offers: {
      availability: "https://schema.org/InStock",
      url: absoluteSiteUrl('/workshop-calendar', locale, baseUrl),
    }
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Programs', url: absoluteSiteUrl('/programs', locale, baseUrl) },
    { name: 'STEAM', url: absoluteSiteUrl('/steam', locale, baseUrl) },
    { name: 'Game Development', url: absoluteSiteUrl('/steam/game-development', locale, baseUrl) },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}

