import type { Metadata } from 'next'
import { PYTHON_VS_SCRATCH_META, PYTHON_VS_SCRATCH_PATH } from '@/data/resources/python-vs-scratch-copy'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { buildPythonVsScratchPageGraphSchema } from '@/lib/schema/python-vs-scratch-jsonld'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath(PYTHON_VS_SCRATCH_PATH, locale)
  return (
    metadata ?? {
      title: PYTHON_VS_SCRATCH_META.title,
      description: PYTHON_VS_SCRATCH_META.description,
    }
  )
}

export default async function PythonVsScratchLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const graphSchema = buildPythonVsScratchPageGraphSchema(baseUrl, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      {children}
    </>
  )
}
