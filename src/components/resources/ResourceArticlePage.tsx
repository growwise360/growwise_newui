'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { useLocale } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ResourceBulletinCta } from '@/components/resources/ResourceBulletinCta'
import type { ResourceCategory } from '@/data/resources-hub'
import { RESOURCES_PATH, resourceCategoryTagClass } from '@/data/resources-hub'
import type { ResourceArticleCta, ResourceArticleFaq, ResourceArticleRelated } from '@/data/resources/types'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const sectionClass = 'mx-auto max-w-3xl px-4 sm:px-6'
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl'
const bodyClass = 'text-base leading-relaxed text-slate-700 sm:text-lg'

const resourceFigureImages: Record<ResourceCategory, string> = {
  academic: '/assets/courses/math-hub-banner.webp',
  stem: '/assets/photos/photo-1526379095098-d400fd0bf935.jpg',
  'sat-prep': '/assets/courses/math-band-high-school.webp',
  local: '/assets/hero-one-on-one.jpg',
  'summer-learning': '/images/camps/banners/acabanner.webp',
  'parent-resources': '/assets/hero-one-on-one.jpg',
}

const resourceFigureImagesBySlug: Record<string, string> = {
  'back-to-school-math-assessment-dublin-ca': '/images/resources/growwise-back-to-school-math-assessment.webp',
  'english-tutor-vs-reading-tutor-vs-writing-class': '/images/resources/growwise-english-tutor-reading-writing-class.webp',
  'math-tutoring-options-dublin-ca': '/images/resources/growwise-math-tutoring-options-dublin-ca.webp',
  'middle-school-math-readiness-checklist': '/images/resources/growwise-middle-school-math-readiness-checklist.webp',
  'summer-academic-program-checklist': '/images/resources/growwise-summer-academic-checklist.webp',
  'summer-slide-dublin-ca': '/images/resources/growwise-summer-slide-dublin.webp',
  'summer-slide-prevention': '/images/resources/growwise-summer-slide-prevention.webp',
  'summer-writing-program-dublin-ca': '/images/resources/growwise-summer-writing-program.webp',
  'tutoring-dublin-ca': '/images/resources/growwise-tutoring-dublin-ca.webp',
  'what-is-vibe-coding': '/images/resources/growwise-what-is-vibe-coding.webp',
  'when-to-start-sat-prep': '/images/resources/growwise-when-to-start-sat-prep.webp',
}

function readableSlug(slug: string) {
  return slug.replace(/-/g, ' ')
}

type Props = {
  slug: string
  category: ResourceCategory
  categoryLabel: string
  h1: string
  readTime: string
  updated: string
  answerBlock?: {
    heading?: string
    text: string
  }
  faqs: readonly ResourceArticleFaq[]
  relatedArticles?: readonly ResourceArticleRelated[]
  ctaHeading?: string
  ctaSubtext?: string
  ctas?: readonly ResourceArticleCta[]
  children: React.ReactNode
}

export function ResourceArticlePage({
  slug,
  category,
  categoryLabel,
  h1,
  readTime,
  updated,
  answerBlock,
  faqs,
  relatedArticles = [],
  ctaHeading,
  ctaSubtext,
  ctas = [],
  children,
}: Props) {
  const locale = useLocale()
  const resourcesHref = publicPath(RESOURCES_PATH, locale)
  const defaultOpenFaqs = getDefaultOpenFaqValues(faqs.length, (idx) => `${slug}-faq-${idx}`)
  const figureKeyword = readableSlug(slug)
  const figureImage = resourceFigureImagesBySlug[slug] ?? resourceFigureImages[category]
  const assessmentCta = ctas.find((cta) => cta.href === '/book-assessment' || cta.href.startsWith('/book-assessment?'))
  const earlyCtas = assessmentCta
    ? [assessmentCta, ...ctas.filter((cta) => cta !== assessmentCta)].slice(0, 2)
    : []

  return (
    <main data-resource-article={slug} className="min-h-screen bg-background font-sans">
      <section
        className="border-b border-slate-200/80 bg-slate-50 py-10 sm:py-14"
        aria-labelledby={`${slug}-hero-title`}
      >
        <div className={sectionClass}>
          <Link
            href={resourcesHref}
            className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-[#F16112]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back to all guides
          </Link>
          <span
            className={cn(
              'mt-6 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
              resourceCategoryTagClass(category),
            )}
          >
            {categoryLabel}
          </span>
          <h1
            id={`${slug}-hero-title`}
            className="font-heading mt-4 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl"
          >
            {h1}
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-500">
            {readTime} · {updated}
          </p>
          {answerBlock ? (
            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#1D9E75] bg-white p-5 shadow-sm">
              {answerBlock.heading ? (
                <h2 className="font-heading text-lg font-bold text-[#1F396D]">{answerBlock.heading}</h2>
              ) : null}
              <p className="mt-2 text-base leading-relaxed text-slate-700">{answerBlock.text}</p>
            </div>
          ) : null}
          {earlyCtas.length > 0 ? (
            <div className="mt-5 rounded-xl border border-[#1F396D]/10 bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-5">
              <div>
                <p className="text-sm font-semibold text-[#1F396D]">
                  Not sure which option fits your child?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Start with a GrowWise assessment, then compare programs with a clearer read on the actual gap.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:shrink-0">
                {earlyCtas.map((cta, index) => (
                  <Button
                    key={cta.label}
                    asChild
                    variant={index === 0 ? 'default' : 'outline'}
                    className={cn(
                      'min-h-[44px] rounded-lg px-4 text-sm font-semibold',
                      index === 0
                        ? 'bg-[#F16112] text-white hover:bg-[#d54f0a]'
                        : 'border-[#1F396D]/20 text-[#1F396D] hover:bg-[#1F396D]/5',
                    )}
                  >
                    <Link href={publicPath(cta.href, locale)}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
          <figure className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-56 w-full sm:h-64">
              <Image
                src={figureImage}
                alt={`${h1} visual guide for ${figureKeyword}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="px-5 py-3 text-sm text-slate-600">
              {h1} — a GrowWise parent guide for {figureKeyword}.
            </figcaption>
          </figure>
        </div>
      </section>

      <article className="py-10 sm:py-14">
        <div className={cn(sectionClass, 'space-y-6 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1F396D] [&_h2]:sm:text-3xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#1F396D] [&_a]:font-semibold [&_a]:text-[#F16112] [&_a]:underline-offset-2 hover:[&_a]:underline [&_li]:text-slate-700 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-slate-700 [&_p]:sm:text-lg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6')}>
          {children}
        </div>

        {ctas.length > 0 ? (
          <div className={cn(sectionClass, 'mt-12 rounded-2xl border border-slate-200 bg-[#1F396D] p-8 text-center sm:p-10')}>
            {ctaHeading ? (
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">{ctaHeading}</h2>
            ) : null}
            {ctaSubtext ? <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">{ctaSubtext}</p> : null}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {ctas.map((cta) => (
                <Button
                  key={cta.label}
                  asChild
                  className="min-h-[48px] rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:text-base"
                >
                  <Link href={publicPath(cta.href, locale)}>{cta.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        {relatedArticles.length > 0 ? (
          <aside className={cn(sectionClass, 'mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6')}>
            <h2 className={h2Class}>Related guides</h2>
            <ul className="mt-4 list-none space-y-3 p-0">
              {relatedArticles.map((article) => (
                <li key={article.href}>
                  <Link
                    href={publicPath(article.href, locale)}
                    className="text-sm font-semibold text-[#F16112] hover:text-[#C45A1A] hover:underline"
                  >
                    {article.title} →
                  </Link>
                  {article.description ? (
                    <p className="mt-1 text-sm text-slate-600">{article.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <ResourceBulletinCta className={cn(sectionClass, 'mt-12')} />
      </article>

      <section className="border-t border-slate-100 bg-white py-12 sm:py-16" aria-labelledby={`${slug}-faq-heading`}>
        <div className={sectionClass}>
          <h2 id={`${slug}-faq-heading`} className={cn(h2Class, 'mb-8 text-center')}>
            Frequently asked questions
          </h2>
          <Accordion type="multiple" className="space-y-4" defaultValue={defaultOpenFaqs}>
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq.question}
                value={`${slug}-faq-${idx}`}
                className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <AccordionTrigger className="px-4 py-4 text-left text-base hover:no-underline sm:px-6 sm:text-lg">
                  <div className="flex items-center gap-3 pr-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F16112]/10">
                      <GraduationCap className="h-4 w-4 text-[#F16112]" aria-hidden />
                    </div>
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600 sm:px-6 sm:text-base">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}
