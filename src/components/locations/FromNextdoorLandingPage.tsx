'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import {
  Award,
  BookOpen,
  Calculator,
  Code2,
  HelpCircle,
  Phone,
  Quote,
  Sun,
  Users,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { BookAssessmentLink } from '@/components/marketing/BookAssessmentLink'
import { RelatedContent } from '@/components/seo/RelatedContent'
import { trackPageViewFromNextdoor } from '@/lib/analytics/gtmEvents'
import { captureUtmFromSearchParams, NEXTDOOR_UTM } from '@/lib/analytics/utm'
import { FROM_NEXTDOOR_COPY } from '@/data/from-nextdoor-copy'
import { FROM_NEXTDOOR_FAQS } from '@/data/from-nextdoor-faqs'
import { FROM_NEXTDOOR_TESTIMONIALS } from '@/data/from-nextdoor-testimonials'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const copy = FROM_NEXTDOOR_COPY
const phoneHref = `tel:${copy.hero.phone.replace(/\D/g, '')}`

const sectionClass = 'mx-auto max-w-5xl px-4 sm:px-6'
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl'

const PROGRAM_ICONS = {
  'Academic Tutoring': Calculator,
  'STEAM & Coding': Code2,
  'Summer Camps': Sun,
} as const

export function FromNextdoorLandingPage() {
  const locale = useLocale()
  const pathname = usePathname()
  const defaultOpenFaqs = getDefaultOpenFaqValues(FROM_NEXTDOOR_FAQS.length, (idx) => `nextdoor-faq-${idx}`)

  useEffect(() => {
    captureUtmFromSearchParams()
    trackPageViewFromNextdoor(pathname)
  }, [pathname])

  return (
    <main data-from-nextdoor className="min-h-screen bg-background font-sans pb-24 md:pb-0">
      <section
        className="border-b border-amber-100/80 bg-gradient-to-b from-amber-50/60 to-white pb-14 pt-12 sm:pb-20 sm:pt-16"
        aria-labelledby="nextdoor-hero-title"
      >
        <div className={cn(sectionClass, 'max-w-4xl')}>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1F396D]/80 sm:text-sm">
            Dublin, CA · Welcome, neighbors
          </p>
          <h1
            id="nextdoor-hero-title"
            className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-5xl"
          >
            {copy.hero.h1}
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-800 sm:text-xl">{copy.hero.subtext}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.hero.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F396D] shadow-sm ring-1 ring-amber-200/80">
              <Award className="h-4 w-4 text-amber-600" aria-hidden />
              {copy.badges.topFive}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F396D] shadow-sm ring-1 ring-amber-200/80">
              <Users className="h-4 w-4 text-[#F16112]" aria-hidden />
              {copy.badges.nextdoorFaves}
            </span>
          </div>

          <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row">
            <Button
              asChild
              className="min-h-[48px] rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:text-base"
            >
              <BookAssessmentLink location="hero_desktop" utm={NEXTDOOR_UTM}>
                {copy.hero.assessmentCta}
              </BookAssessmentLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-[48px] rounded-lg border-[#1F396D] px-6 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5 sm:text-base"
            >
              <Link href={phoneHref}>
                <Phone className="mr-2 inline h-4 w-4" aria-hidden />
                {copy.hero.phoneLabel}: {copy.hero.phone}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-12 sm:py-16" aria-labelledby="nextdoor-programs-heading">
        <div className={sectionClass}>
          <h2 id="nextdoor-programs-heading" className={h2Class}>
            {copy.programs.heading}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">{copy.programs.intro}</p>
          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-3" role="list">
            {copy.programs.cards.map((program) => {
              const Icon = PROGRAM_ICONS[program.title as keyof typeof PROGRAM_ICONS] ?? BookOpen
              return (
                <li key={program.href}>
                  <Link
                    href={publicPath(program.href, locale)}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-colors hover:border-[#1F396D]/30 hover:bg-white"
                  >
                    <Icon className="h-6 w-6 text-[#1F396D]" aria-hidden />
                    <h3 className="mt-3 font-heading text-lg font-semibold text-[#1F396D]">{program.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{program.description}</p>
                    <span className="mt-4 text-sm font-semibold text-[#F16112]">Learn more →</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section
        className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-14 md:py-20"
        aria-labelledby="nextdoor-testimonials-heading"
      >
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <h2
            id="nextdoor-testimonials-heading"
            className="font-heading text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            {copy.testimonials.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-slate-600 md:text-base">
            {copy.testimonials.subheading}
          </p>
          <ul className="mt-10 grid list-none items-stretch gap-4 p-0 md:grid-cols-2 md:gap-5" role="list">
            {FROM_NEXTDOOR_TESTIMONIALS.map((review, index) => (
              <li
                key={`nextdoor-review-${index}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm md:p-6"
              >
                <blockquote className="m-0 flex flex-1 flex-col border-0 p-0">
                  <Quote className="h-5 w-5 text-amber-500/80" aria-hidden />
                  <p className="mt-3 flex-1 text-sm font-normal leading-relaxed text-slate-800 md:text-[15px]">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm font-semibold text-slate-700">
                    — {review.parentName}
                    {review.childContext ? (
                      <span className="mt-1 block text-xs font-medium text-slate-500">{review.childContext}</span>
                    ) : null}
                    <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
                      {review.source === 'nextdoor' ? 'Nextdoor community' : 'Google review'}
                    </span>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-amber-50/40 py-12 sm:py-16" aria-labelledby="nextdoor-founder-heading">
        <div className={cn(sectionClass, 'max-w-3xl')}>
          <h2 id="nextdoor-founder-heading" className={h2Class}>
            {copy.founder.heading}
          </h2>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <Image
              src={copy.founder.image}
              alt={copy.founder.name}
              width={160}
              height={160}
              className="h-32 w-32 shrink-0 rounded-full object-cover shadow-md ring-4 ring-white sm:h-40 sm:w-40"
            />
            <div>
              <p className="text-lg font-bold text-slate-900">{copy.founder.name}</p>
              <p className="text-sm font-semibold text-[#F16112]">{copy.founder.role}</p>
              {copy.founder.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 border-l-4 border-[#F16112] pl-4 text-sm italic leading-relaxed text-slate-700">
                &ldquo;{copy.founder.quote}&rdquo;
              </p>
              <Link
                href={publicPath('/about', locale)}
                className="mt-4 inline-flex text-sm font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                {copy.founder.aboutLinkLabel} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-12 sm:py-16" aria-labelledby="nextdoor-faq-heading">
        <div className={sectionClass}>
          <div className="mb-8 flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-[#1F396D]" aria-hidden />
            <h2 id="nextdoor-faq-heading" className={h2Class}>
              {copy.faq.heading}
            </h2>
          </div>
          <Accordion type="multiple" defaultValue={defaultOpenFaqs} className="w-full">
            {FROM_NEXTDOOR_FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`nextdoor-faq-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[#1F396D] py-14 text-white sm:py-16" aria-labelledby="nextdoor-cta-heading">
        <div className={cn(sectionClass, 'max-w-3xl text-center')}>
          <h2 id="nextdoor-cta-heading" className="font-heading text-2xl font-bold sm:text-3xl">
            {copy.cta.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">{copy.cta.subtext}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="min-h-[48px] rounded-lg bg-[#F16112] px-8 text-base font-semibold text-white hover:bg-[#d54f0a]"
            >
              <BookAssessmentLink location="footer_band" utm={NEXTDOOR_UTM}>
                {copy.hero.assessmentCta}
              </BookAssessmentLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-[48px] rounded-lg border-white/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
            >
              <Link href={phoneHref}>{copy.hero.phoneLabel}: {copy.hero.phone}</Link>
            </Button>
          </div>
        </div>
      </section>

      <RelatedContent locale={locale} />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:hidden"
        aria-label="Quick actions"
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <Button asChild className="min-h-[44px] flex-1 rounded-lg bg-[#F16112] font-semibold text-white hover:bg-[#d54f0a]">
            <BookAssessmentLink location="sticky_mobile" utm={NEXTDOOR_UTM}>
              {copy.hero.assessmentCta}
            </BookAssessmentLink>
          </Button>
          <Button asChild variant="outline" className="min-h-[44px] shrink-0 rounded-lg border-[#1F396D] px-4 text-[#1F396D]">
            <Link href={phoneHref} aria-label={`Call ${copy.hero.phone}`}>
              <Phone className="h-5 w-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
