import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink, User } from 'lucide-react'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { BlogFaqAccordion } from '@/components/blogs/BlogFaqAccordion'
import { BlogImage } from '@/components/blogs/BlogImage'
import { Button } from '@/components/ui/button'
import type { ParentPainGuide } from '@/data/parent-pain-guides/types'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export function ParentPainGuidePage({ guide, locale }: { guide: ParentPainGuide; locale: string }) {
  const baseUrl = getCanonicalSiteUrl()
  const path = `/growwise-blogs/${guide.slug}`
  const pageUrl = absoluteSiteUrl(path, locale, baseUrl)
  const imageUrl = `${baseUrl}${guide.image}`
  const articleSchema = {
    ...generateArticleSchema({
      headline: guide.headline,
      description: guide.schemaDescription,
      url: pageUrl,
      image: imageUrl,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: guide.publishedDate,
      dateModified: guide.publishedDate,
    }),
    '@type': 'BlogPosting',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    articleSection: 'Parent Guides',
    keywords: [...guide.keywords],
    publisher: {
      '@type': 'Organization',
      name: 'GrowWise School',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/assets/growwise-logo.png` },
    },
  }
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: guide.headline, url: pageUrl },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...guide.faqs])) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
          <div className="absolute inset-0 opacity-20">
            <BlogImage src={guide.image} alt="" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl">
            <Link href={publicPath('/growwise-blogs', locale)} className="mb-5 inline-flex items-center text-sm font-semibold text-white/85 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Link>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{guide.headline}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />Anshika Verma</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /><time dateTime={guide.publishedDate}>{guide.displayDate}</time></span>
              <span>{guide.readTime}</span>
            </div>
          </div>
        </header>

        <article className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="prose prose-lg mx-auto max-w-4xl rounded-2xl bg-white p-7 shadow-xl md:p-12">
            {guide.intro.map((paragraph) => <p key={paragraph} className="text-gray-700">{paragraph}</p>)}

            <div className="not-prose my-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
              <p className="font-semibold text-[#1F396D]">The short answer</p>
              <p className="mt-2 leading-relaxed">{guide.answer}</p>
            </div>

            <figure className="not-prose my-9 overflow-hidden rounded-xl bg-gray-50 shadow-lg">
              <div className="relative aspect-[16/9] w-full">
                <BlogImage src={guide.image} alt={guide.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
              </div>
            </figure>

            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[#1F396D]">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-gray-700">{paragraph}</p>)}
                {section.checklist && (
                  <div className="not-prose my-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
                    <h3 className="font-bold text-[#1F396D]">What parents can try</h3>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      {section.checklist.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-[#F16112]">✓</span><span>{item}</span></li>)}
                    </ul>
                  </div>
                )}
              </section>
            ))}

            <aside className="not-prose my-10 rounded-2xl bg-[#1F396D] p-7 text-white">
              <h2 className="text-2xl font-bold">{guide.cta.headline}</h2>
              <p className="mt-3 text-blue-50">{guide.cta.text}</p>
              <Button asChild className="mt-5 bg-[#F16112] text-white hover:bg-[#d94f08]">
                <Link href={publicPath(guide.cta.href, locale)}>{guide.cta.label}</Link>
              </Button>
            </aside>

            <h2 className="text-[#1F396D]">Related parent guides</h2>
            <ul>
              {guide.related.map((item) => <li key={item.href}><Link href={publicPath(item.href, locale)}>{item.label}</Link></li>)}
            </ul>

            <BlogFaqAccordion title="Questions parents often ask" faqs={[...guide.faqs]} />

            <section>
              <h2 className="text-[#1F396D]">Sources and further reading</h2>
              <p className="text-sm text-gray-600">These sources support the educational and health information in this guide. They are not a substitute for advice from your child’s teacher, pediatrician, or licensed specialist.</p>
              <ul className="text-sm">
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      {source.name}<ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>{' '}{source.note}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </main>
    </>
  )
}
