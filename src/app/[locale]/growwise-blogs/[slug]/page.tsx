import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ParentPainGuidePage } from '@/components/blogs/ParentPainGuidePage'
import { PARENT_PAIN_GUIDES, getParentPainGuide } from '@/data/parent-pain-guides'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return PARENT_PAIN_GUIDES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const guide = getParentPainGuide(slug)
  if (!guide) return {}
  return generatePageMetadata({
    locale,
    path: `/growwise-blogs/${guide.slug}`,
    type: 'article',
    title: guide.seoTitle,
    description: guide.description,
    keywords: guide.keywords.join(', '),
    image: `${getCanonicalSiteUrl()}${guide.image}`,
    imageAlt: guide.imageAlt,
    publishedTime: `${guide.publishedDate}T00:00:00.000Z`,
    modifiedTime: `${guide.publishedDate}T00:00:00.000Z`,
  })
}

export default async function ParentPainBlogRoute({ params }: Props) {
  const { locale, slug } = await params
  const guide = getParentPainGuide(slug)
  if (!guide) notFound()
  return <ParentPainGuidePage guide={guide} locale={locale} />
}
