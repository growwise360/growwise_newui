'use client'

import Link from 'next/link'
import {
  BookOpen,
  Calculator,
  Clock,
  Code2,
  Gamepad2,
  GraduationCap,
  HelpCircle,
  MapPin,
  Phone,
  Sun,
  Target,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { RelatedContent } from '@/components/seo/RelatedContent'
import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'
import { DUBLIN_CA_COPY } from '@/data/dublin-ca-copy'
import { DUBLIN_CA_FAQS } from '@/data/dublin-ca-faqs'
import { DUBLIN_CA_LOCAL_TESTIMONIALS } from '@/data/dublin-ca-local-testimonials'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const copy = DUBLIN_CA_COPY
const phoneHref = `tel:${copy.hero.phone.replace(/\D/g, '')}`

const MAPS_QUERY = encodeURIComponent(`${CONTACT_INFO.street}, ${CONTACT_INFO.city} ${CONTACT_INFO.zipCode}`)
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`
const mapEmbedHref = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`

const sectionClass = 'mx-auto max-w-5xl px-4 sm:px-6'
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl'

const PROGRAM_ICONS = {
  'Math Tutoring': Calculator,
  'English & Writing': BookOpen,
  'Python & AI Coding': Code2,
  'SAT Prep': Target,
  'Game Development': Gamepad2,
  'Summer Camps': Sun,
} as const

function DublinCaFaqAnswer({ question, locale }: { question: string; locale: string }) {
  const item = DUBLIN_CA_FAQS.find((faq) => faq.question === question)
  if (!item) return null

  if (question === 'What grade levels do you support in Dublin?') {
    return (
      <>
        GrowWise supports students in Grades 1–12 at our Dublin center. Programs include{' '}
        <Link href={publicPath('/courses/math', locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          math tutoring
        </Link>
        ,{' '}
        <Link href={publicPath('/courses/english', locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          English &amp; writing
        </Link>
        ,{' '}
        <Link href={publicPath('/courses/sat-prep', locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          SAT prep
        </Link>
        , and{' '}
        <Link href={publicPath('/coding', locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          STEAM coding
        </Link>{' '}
        paths for ages 10–18.
      </>
    )
  }

  if (question === 'Can I visit before enrolling my child?') {
    return (
      <>
        Yes. We encourage families to call (925) 456-4606 to schedule a visit or{' '}
        <Link href={publicPath('/book-assessment', locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          free assessment
        </Link>{' '}
        during business hours ({OFFICE_HOURS.summary}). There is no commitment required for the assessment.
      </>
    )
  }

  return item.answer
}

export function DublinCaLocationPage() {
  const locale = useLocale()
  const bookAssessmentHref = publicPath('/book-assessment', locale)
  const defaultOpenFaqs = getDefaultOpenFaqValues(DUBLIN_CA_FAQS.length, (idx) => `dublin-faq-${idx}`)

  return (
    <main data-dublin-ca-location className="min-h-screen bg-background font-sans">
      <section className="border-b border-slate-200/80 bg-white pb-14 pt-12 sm:pb-20 sm:pt-16" aria-labelledby="dublin-hero-title">
        <div className={cn(sectionClass, 'max-w-4xl')}>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">Dublin, CA · In-person campus</p>
          <h1 id="dublin-hero-title" className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-5xl">
            {copy.hero.h1}
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-800 sm:text-xl">{copy.hero.subtext}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.hero.intro}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            New to tutoring options in the Tri-Valley? Read our{' '}
            <Link
              href={publicPath('/resources/tutoring-dublin-ca', locale)}
              className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
            >
              parent guide to choosing a K-12 tutoring program in Dublin, CA
            </Link>
            .
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
            <p className="flex items-center gap-2 text-slate-700">
              <Phone className="h-4 w-4 shrink-0 text-[#1F396D]" aria-hidden />
              <span className="font-semibold">{copy.hero.phoneLabel}:</span>{' '}
              <Link href={phoneHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
                {copy.hero.phone}
              </Link>
            </p>
            <p className="flex items-start gap-2 text-slate-700">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1F396D]" aria-hidden />
              <span>
                <span className="font-semibold">{copy.hero.locationLabel}:</span> {copy.hero.location}
              </span>
            </p>
            <p className="flex items-start gap-2 text-slate-700">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#1F396D]" aria-hidden />
              <span>
                <span className="font-semibold">{copy.hero.hoursLabel}:</span> {copy.hero.hours}
              </span>
            </p>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-800">{copy.hero.servedAreas}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="min-h-[48px] rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:text-base"
            >
              <Link href={bookAssessmentHref}>{copy.hero.assessmentCta}</Link>
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

      <section id="location" className="border-t border-slate-100 bg-slate-50/80 py-12 sm:py-16" aria-labelledby="dublin-location-heading">
        <div className={sectionClass}>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#1F396D]">Location</p>
          <h2 id="dublin-location-heading" className={cn(h2Class, 'mt-2')}>
            Visit our Dublin center
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">{copy.hero.parkingNote}</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <address className="not-italic text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">GrowWise School</span>
                <br />
                {CONTACT_INFO.street}
                <br />
                {CONTACT_INFO.city} {CONTACT_INFO.zipCode}
              </address>
              <p className="mt-4 text-sm text-slate-600">{copy.hero.hours}</p>
              <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white">
                <iframe
                  title="Map preview of GrowWise Dublin campus"
                  src={mapEmbedHref}
                  className="h-44 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={mapsHref}
                className="mt-4 inline-flex text-sm font-semibold text-[#1F396D] underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Families often join us from</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Served cities and areas">
                {['Dublin', 'Pleasanton', 'San Ramon', 'Livermore', 'Danville', 'Tri-Valley'].map((city) => (
                  <li key={city}>
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-800 ring-1 ring-slate-200">
                      {city}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                GrowWise operates one physical campus in Dublin. Nearby cities are served areas families travel from—not separate GrowWise locations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-12 sm:py-16" aria-labelledby="dublin-programs-heading">
        <div className={sectionClass}>
          <h2 id="dublin-programs-heading" className={h2Class}>
            {copy.programs.heading}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">{copy.programs.intro}</p>
          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {copy.programs.cards.map((program) => {
              const Icon = PROGRAM_ICONS[program.title as keyof typeof PROGRAM_ICONS] ?? GraduationCap
              return (
                <li key={program.href}>
                  <Link
                    href={publicPath(program.href, locale)}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-colors hover:border-[#1F396D]/30 hover:bg-white"
                  >
                    <Icon className="h-6 w-6 text-[#1F396D]" aria-hidden />
                    <h3 className="mt-3 font-heading text-lg font-semibold text-[#1F396D]">{program.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{program.description}</p>
                    <span className="mt-4 text-sm font-semibold text-[#F16112]">
                      Explore {program.title} in Dublin →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/80 py-12 sm:py-16" aria-labelledby="dublin-curriculum-heading">
        <div className={cn(sectionClass, 'max-w-3xl')}>
          <h2 id="dublin-curriculum-heading" className={h2Class}>
            {copy.curriculum.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.curriculum.body}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{copy.curriculum.support}</p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-14 md:py-20" aria-labelledby="dublin-testimonials-heading">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <h2 id="dublin-testimonials-heading" className="font-heading text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {copy.testimonials.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-slate-600 md:text-base">
            {copy.testimonials.googleRatingLine}
          </p>
          <ul className="mt-10 grid list-none items-stretch gap-4 p-0 md:grid-cols-3 md:gap-5" role="list">
            {DUBLIN_CA_LOCAL_TESTIMONIALS.map((review, index) => (
              <li
                key={`dublin-review-${index}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm md:p-6"
              >
                <blockquote className="m-0 flex flex-1 flex-col border-0 p-0">
                  <span className="text-base leading-none text-amber-500" aria-hidden="true">
                    ★★★★★
                  </span>
                  <p className="mt-3 flex-1 text-sm font-normal leading-relaxed text-slate-800 md:text-[15px]">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-xs font-medium leading-snug text-slate-600 md:text-[13px]">
                    {review.byline}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            {copy.faq.heading} <span className="text-[#F16112]">{copy.faq.headingHighlight}</span>
          </h2>
          <div className="mt-10 space-y-3">
            <Accordion type="multiple" className="w-full" defaultValue={defaultOpenFaqs}>
              {DUBLIN_CA_FAQS.map((item, idx) => (
                <AccordionItem
                  key={item.question}
                  value={`dublin-faq-${idx}`}
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
                    <DublinCaFaqAnswer question={item.question} locale={locale} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <RelatedContent locale={locale} />

      <section className="bg-[#1F396D] py-14 sm:py-16" aria-labelledby="dublin-cta">
        <div className={cn(sectionClass, 'max-w-3xl text-center')}>
          <h2 id="dublin-cta" className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {copy.cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">{copy.cta.subtext}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="min-h-[48px] w-full max-w-xs rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:w-auto sm:text-base"
            >
              <Link href={bookAssessmentHref}>{copy.cta.assessmentCta}</Link>
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
    </main>
  )
}
