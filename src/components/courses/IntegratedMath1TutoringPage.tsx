'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HelpCircle, MapPin, Phone } from 'lucide-react'
import { useLocale } from 'next-intl'
import FreeAssessmentModal from '@/components/FreeAssessmentModal'
import { RelatedContent } from '@/components/seo/RelatedContent'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { INTEGRATED_MATH_1_DUBLIN_CA_COPY } from '@/data/integrated-math-1-dublin-ca-copy'
import { INTEGRATED_MATH_1_DUBLIN_CA_FAQS } from '@/data/integrated-math-1-dublin-ca-faqs'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { cn } from '@/lib/utils'

const copy = INTEGRATED_MATH_1_DUBLIN_CA_COPY
const phoneHref = `tel:${copy.hero.phone.replace(/\D/g, '')}`

const sectionClass = 'mx-auto max-w-3xl px-4 sm:px-6'
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl'

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2" role="list">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

function ContactStrip({ variant }: { variant: 'hero' | 'footer' }) {
  const isHero = variant === 'hero'
  return (
    <div
      className={cn(
        'mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6',
        isHero ? 'text-slate-700' : 'text-white/90',
      )}
    >
      <p className="flex items-center gap-2">
        <Phone className={cn('h-4 w-4 shrink-0', isHero ? 'text-[#1F396D]' : 'text-[#F16112]')} aria-hidden />
        <span className="font-semibold">{copy.hero.phoneLabel}:</span>{' '}
        <Link
          href={phoneHref}
          className={cn(
            'font-semibold underline-offset-2 hover:underline',
            isHero ? 'text-[#1F396D]' : 'text-white',
          )}
        >
          {copy.hero.phone}
        </Link>
      </p>
      <p className="flex items-start gap-2">
        <MapPin className={cn('mt-0.5 h-4 w-4 shrink-0', isHero ? 'text-[#1F396D]' : 'text-[#F16112]')} aria-hidden />
        <span>
          <span className="font-semibold">{copy.hero.locationLabel}:</span>{' '}
          {isHero ? copy.hero.location : copy.cta.location}
        </span>
      </p>
    </div>
  )
}

export function IntegratedMath1TutoringPage() {
  const locale = useLocale()
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
  const defaultOpenFaqs = getDefaultOpenFaqValues(
    INTEGRATED_MATH_1_DUBLIN_CA_FAQS.length,
    (idx) => `im1-faq-${idx}`,
  )

  return (
    <main data-integrated-math-1-tutoring className="min-h-screen bg-background font-sans">
      <section className="border-b border-slate-200/80 bg-white pb-14 pt-12 sm:pb-20 sm:pt-16" aria-labelledby="im1-hero-title">
        <div className={cn(sectionClass, 'max-w-4xl')}>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
            Dublin, CA · Integrated Math 1
          </p>
          <h1 id="im1-hero-title" className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-5xl">
            {copy.hero.h1}
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-800 sm:text-xl">{copy.hero.subtext}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            {copy.hero.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ContactStrip variant="hero" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => setIsAssessmentModalOpen(true)}
              className="min-h-[48px] rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:text-base"
            >
              {copy.hero.assessmentCta}
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-[48px] rounded-lg border-[#1F396D] px-6 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5 sm:text-base"
            >
              <Link href={phoneHref}>{copy.hero.phoneLabel}: {copy.hero.phone}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/80 py-12 sm:py-16" aria-labelledby="im1-struggle-signs">
        <div className={sectionClass}>
          <h2 id="im1-struggle-signs" className={h2Class}>
            {copy.struggleSigns.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.struggleSigns.intro}</p>
          <p className="mt-4 text-sm font-semibold text-slate-900 sm:text-base">{copy.struggleSigns.subheading}</p>
          <BulletList items={copy.struggleSigns.items} />
          <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.struggleSigns.closing}</p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-labelledby="im1-coverage">
        <div className={sectionClass}>
          <h2 id="im1-coverage" className={h2Class}>
            {copy.coverage.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.coverage.intro}</p>
          <div className="mt-8 space-y-10">
            {copy.coverage.topics.map((topic) => (
              <div key={topic.title}>
                <h3 className="font-heading text-lg font-semibold text-[#1F396D] sm:text-xl">{topic.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-800 sm:text-base">{topic.leadIn}</p>
                <BulletList items={topic.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/80 py-12 sm:py-16" aria-labelledby="im1-approach">
        <div className={sectionClass}>
          <h2 id="im1-approach" className={h2Class}>
            {copy.approach.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.approach.intro}</p>
          <p className="mt-4 text-sm font-semibold text-slate-900 sm:text-base">{copy.approach.subheading}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.approach.body}</p>
          <BulletList items={copy.approach.patterns} />
          <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.approach.closing}</p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-labelledby="im1-audience">
        <div className={sectionClass}>
          <h2 id="im1-audience" className={h2Class}>
            {copy.audience.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.audience.intro}</p>
          <BulletList items={copy.audience.items} />
          <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.audience.closing}</p>
        </div>
      </section>

      <section className="bg-slate-50/80 py-12 sm:py-16" aria-labelledby="im1-why-growwise">
        <div className={sectionClass}>
          <h2 id="im1-why-growwise" className={h2Class}>
            {copy.whyGrowWise.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.whyGrowWise.intro}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.whyGrowWise.body}</p>
          <p className="mt-4 text-sm font-semibold text-slate-900 sm:text-base">{copy.whyGrowWise.subheading}</p>
          <BulletList items={copy.whyGrowWise.items} />
        </div>
      </section>

      <section className="bg-[#1F396D] py-14 sm:py-16" aria-labelledby="im1-cta">
        <div className={cn(sectionClass, 'text-center')}>
          <h2 id="im1-cta" className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {copy.cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">{copy.cta.subtext}</p>
          <div className="mx-auto mt-6 max-w-xl text-left">
            <ContactStrip variant="footer" />
            <dl className="mt-4 space-y-2 text-sm text-white/90 sm:text-base">
              <div>
                <dt className="inline font-semibold text-white">{copy.cta.programLabel}: </dt>
                <dd className="inline">{copy.cta.program}</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-white">{copy.cta.formatLabel}: </dt>
                <dd className="inline">{copy.cta.format}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => setIsAssessmentModalOpen(true)}
              className="min-h-[48px] w-full max-w-xs rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:w-auto sm:text-base"
            >
              {copy.cta.assessmentCta}
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-[48px] w-full max-w-xs rounded-lg border-white bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto sm:text-base"
            >
              <Link href={phoneHref}>{copy.hero.phoneLabel}: {copy.hero.phone}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            Frequently Asked <span className="text-[#F16112]">Questions</span>
          </h2>
          <div className="mt-10 space-y-3">
            <Accordion type="multiple" className="w-full" defaultValue={defaultOpenFaqs}>
              {INTEGRATED_MATH_1_DUBLIN_CA_FAQS.map((item, idx) => (
                <AccordionItem
                  key={item.question}
                  value={`im1-faq-${idx}`}
                  className="overflow-hidden rounded-xl border-0 bg-white shadow-sm ring-1 ring-slate-200/90"
                >
                  <AccordionTrigger className="px-4 py-4 text-left hover:no-underline sm:px-5">
                    <span className="flex items-center gap-3">
                      <span
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F16112]/10 ring-1 ring-[#F16112]/15"
                        aria-hidden
                      >
                        <HelpCircle className="h-4 w-4 text-[#F16112]" />
                      </span>
                      <span className="text-sm font-semibold text-slate-900 sm:text-base">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-slate-600 sm:px-5 sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <RelatedContent locale={locale} />

      <FreeAssessmentModal isOpen={isAssessmentModalOpen} onClose={() => setIsAssessmentModalOpen(false)} />
    </main>
  )
}
