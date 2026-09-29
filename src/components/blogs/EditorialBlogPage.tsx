import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'

import { BlogFaqAccordion, type BlogFaqItem } from '@/components/blogs/BlogFaqAccordion'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import { publicPath } from '@/lib/publicPath'

type RelatedPost = { title: string; href: string; description: string }

type EditorialBlogPageProps = {
  locale: string
  headline: string
  dek: string
  publishedLabel: string
  publishedDate: string
  modifiedDate?: string
  image: string
  imageAlt: string
  quickAnswer: string
  children: React.ReactNode
  faqs: ReadonlyArray<BlogFaqItem>
  faqHeading: string
  programHref: string
  programLabel: string
  ctaHeadline: string
  ctaSubtext: string
  relatedPosts: readonly RelatedPost[]
  sources?: ReadonlyArray<{ name: string; url: string }>
}

export function EditorialBlogPage({
  locale,
  headline,
  dek,
  publishedLabel,
  publishedDate,
  modifiedDate,
  image,
  imageAlt,
  quickAnswer,
  children,
  faqs,
  faqHeading,
  programHref,
  programLabel,
  ctaHeadline,
  ctaSubtext,
  relatedPosts,
  sources,
}: EditorialBlogPageProps) {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <section className="bg-[#1F396D] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={publicPath('/growwise-blogs', locale)}
            className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Back to Blogs
          </Link>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{headline}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">{dek}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden />GrowWise Education Team</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden /><time dateTime={publishedDate}>{publishedLabel}</time></span>
            {modifiedDate ? <span>Updated {modifiedDate}</span> : null}
          </div>
        </div>
      </section>

      <article className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
          <div className="llm-answer-block rounded-xl border-l-4 border-[#F16112] bg-orange-50 p-6 text-slate-900">
            <h2 className="text-xl font-bold">Quick answer</h2>
            <p className="mt-3 leading-7">{quickAnswer}</p>
          </div>
          <figure className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image src={image} alt={imageAlt} width={1600} height={900} priority sizes="(max-width: 768px) 100vw, 900px" className="h-auto w-full" />
          </figure>
          <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D] prose-li:text-slate-700">
            {children}
          </div>
          <BlogFaqAccordion id="frequently-asked-questions" heading={faqHeading} faqs={faqs} />
          {sources && sources.length > 0 ? (
            <section className="mt-10 border-t border-slate-200 pt-8" aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="text-xl font-bold text-slate-950">Sources and further reading</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1F396D] underline underline-offset-2">{source.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>

      <BlogPostConversionSection
        locale={locale}
        programHref={programHref}
        programLabel={programLabel}
        headline={ctaHeadline}
        subtext={ctaSubtext}
        relatedPosts={relatedPosts}
      />
    </div>
  )
}
