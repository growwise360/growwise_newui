import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ParentPainGuidePage } from '@/components/blogs/ParentPainGuidePage'
import { EditorialBlogPage } from '@/components/blogs/EditorialBlogPage'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { PARENT_PAIN_GUIDES, getParentPainGuide } from '@/data/parent-pain-guides'
import { EDITORIAL_BLOG_POSTS, getEditorialBlogPost } from '@/data/editorial-blog-posts'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { absoluteSiteUrl } from '@/lib/publicPath'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return [...PARENT_PAIN_GUIDES, ...EDITORIAL_BLOG_POSTS].map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const guide = getParentPainGuide(slug)
  const editorial = getEditorialBlogPost(slug)
  if (!guide && !editorial) return {}
  if (editorial) {
    return generatePageMetadata({
      locale,
      path: `/growwise-blogs/${editorial.slug}`,
      type: 'article',
      title: editorial.seoTitle,
      description: editorial.description,
      keywords: editorial.keywords ? [...editorial.keywords].join(', ') : undefined,
      image: `${getCanonicalSiteUrl()}${editorial.image}`,
      imageAlt: editorial.imageAlt,
      publishedTime: `${editorial.publishedDate}T00:00:00.000Z`,
      modifiedTime: `${editorial.modifiedDate ?? editorial.publishedDate}T00:00:00.000Z`,
    })
  }
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
  const editorial = getEditorialBlogPost(slug)
  if (editorial) {
    const baseUrl = getCanonicalSiteUrl()
    const path = `/growwise-blogs/${editorial.slug}`
    const pageUrl = absoluteSiteUrl(path, locale, baseUrl)
    const articleSchema = generateArticleSchema({
      headline: editorial.headline,
      description: editorial.description,
      url: pageUrl,
      image: `${baseUrl}${editorial.image}`,
      datePublished: editorial.publishedDate,
      dateModified: editorial.modifiedDate ?? editorial.publishedDate,
      author: { type: 'Organization', name: 'GrowWise Education Team' },
      articleSection: editorial.articleSection,
      keywords: editorial.keywords,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
    })

    return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...editorial.faqs])) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
        { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
        { name: editorial.headline, url: pageUrl },
      ]} />
      <EditorialBlogPage
        locale={locale}
        headline={editorial.headline}
        dek={editorial.dek}
        publishedLabel={new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${editorial.publishedDate}T00:00:00Z`))}
        publishedDate={editorial.publishedDate}
        modifiedDate={editorial.modifiedDate}
        image={editorial.image}
        imageAlt={editorial.imageAlt}
        quickAnswer={editorial.quickAnswer}
        faqs={editorial.faqs}
        faqHeading={`${editorial.headline} FAQ`}
        programHref={editorial.programHref}
        programLabel={editorial.programLabel}
        ctaHeadline={editorial.ctaHeadline}
        ctaSubtext={editorial.ctaSubtext}
        relatedPosts={editorial.relatedPosts}
        sources={editorial.sources}
      >
        {editorial.body}
      </EditorialBlogPage>
    </>
  }
  if (!guide) notFound()
  return <ParentPainGuidePage guide={guide} locale={locale} />
}
