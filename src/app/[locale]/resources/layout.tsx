import type { Metadata } from 'next'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildResourcesHubCollectionSchema } from '@/lib/schema/resources-hub-jsonld'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(RESOURCES_PATH, locale)
  return (
    metadata ?? {
      title: 'Parent Guides & Resources | Grades 3–12 Learning Tips | GrowWise',
      description:
        'Free guides for parents on math mistakes, homework independence, SAT prep, coding for kids, and more. Research-backed advice from GrowWise educators.',
    }
  )
}

export default async function ResourcesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const collectionSchema = buildResourcesHubCollectionSchema(locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {children}
    </>
  )
}
