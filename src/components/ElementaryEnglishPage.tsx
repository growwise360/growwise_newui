'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  MapPin,
  ArrowRight,
  Phone,
  X,
  PenTool,
  MessageSquareText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { VisibleCourseFAQ } from '@/components/seo/VisibleCourseFAQ'
import ProgramRecommendationModal from '@/components/ProgramRecommendationModal'
import { MathProgramDetailsSection } from '@/components/courses/MathProgramDetailsSection'
import { MathTrialSection } from '@/components/courses/MathTrialSection'
import { ELEMENTARY_ENGLISH_COPY as COPY } from '@/lib/elementary-english-copy'
import { ELEMENTARY_ENGLISH_VISIBLE_FAQS } from '@/lib/schema/elementary-english-faqs'
import { ELEMENTARY_ENGLISH_TRIAL } from '@/lib/english-program-trial-copy'
import { CONTACT_INFO } from '@/lib/constants'
import { MATH_COURSE_PATHS } from '@/lib/math-course-paths'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { useLocale } from 'next-intl'

const AUGUST_ENGLISH_READINESS = [
  {
    need: 'Reading tutor',
    signal: 'Words are slow, choppy, guessed, or hard to remember after reading.',
  },
  {
    need: 'Comprehension support',
    signal: 'Your child reads the passage but cannot explain the main idea, evidence, or inference.',
  },
  {
    need: 'Writing class',
    signal: 'Blank-page freeze, very short answers, weak paragraphs, or grammar errors hide good ideas.',
  },
] as const

export default function ElementaryEnglishPage() {
  const locale = useLocale()
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
  const openAssessment = () => setIsAssessmentModalOpen(true)

  return (
    <div className="min-h-screen bg-[#ebebeb]" style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}>
      <Breadcrumbs
        noSchema
        items={[
          { name: COPY.breadcrumb.academic, url: absoluteSiteUrl('/academic', locale) },
          { name: COPY.breadcrumb.englishPrograms, url: absoluteSiteUrl(MATH_COURSE_PATHS.english, locale) },
          { name: COPY.breadcrumb.elementary, url: absoluteSiteUrl('/academic/english/elementary', locale) },
        ]}
      />

      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <p className="text-center text-sm font-medium text-gray-600 mb-4">{COPY.hero.eyebrow}</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-5 leading-tight text-center">{COPY.hero.h1}</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed text-center">{COPY.hero.subhead}</p>

          <div className="max-w-3xl mx-auto mb-8 rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-semibold text-[#1F396D] mb-4">{COPY.hero.tldr.title}</p>
            <ul className="space-y-3">
              {COPY.hero.tldr.items.map((item) => (
                <li key={item.pillar} className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{item.pillar}: </span>
                  {item.signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {COPY.hero.trustChips.map((label) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border border-gray-200/60 text-sm text-gray-700 font-medium"
              >
                <CheckCircle className="h-4 w-4 text-[#F16112]" aria-hidden />
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
            <Button
              onClick={openAssessment}
              className="h-auto bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full px-8 py-4 text-base font-semibold"
            >
              <BookOpen className="h-5 w-5" aria-hidden />
              {COPY.hero.primaryCta}
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-2 border-[#1F396D] bg-transparent px-8 py-4 text-base font-semibold text-[#1F396D] hover:bg-[#1F396D]/5 hover:text-[#1F396D]"
            >
              <Link href={publicPath('/self-check', locale)}>{COPY.hero.secondaryCta}</Link>
            </Button>
          </div>
          <p className="text-center text-sm text-gray-500 max-w-xl mx-auto">{COPY.hero.microCopy}</p>
        </div>
      </section>

      <section className="bg-[#ebebeb] py-14 lg:py-20" aria-labelledby="elementary-english-august-readiness-heading">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            August reading and writing readiness
          </p>
          <h2 id="elementary-english-august-readiness-heading" className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Choose English tutoring based on the exact reading or writing gap.
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">
            Parents searching for an English tutor, reading tutor, writing tutor, or English writing classes near
            Dublin are often describing different problems. Before August, separate fluency, comprehension, grammar,
            writing structure, and confidence so support starts in the right place.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {AUGUST_ENGLISH_READINESS.map((item) => (
              <article key={item.need} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#1F396D] mb-2">{item.need}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.signal}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={publicPath('/resources/english-tutor-vs-reading-tutor-vs-writing-class', locale)}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F396D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162850]"
            >
              Compare English support options
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={publicPath('/resources/reading-fluency-vs-comprehension', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F396D] px-6 py-3 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
            >
              Compare fluency vs comprehension
            </Link>
            <Link
              href={publicPath('/resources/child-struggles-with-writing-dublin-ca', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F396D] px-6 py-3 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
            >
              Diagnose writing struggles
            </Link>
          </div>
        </div>
      </section>

      {/* 2. AEO blocks */}
      <section className="bg-white py-16 lg:py-20" aria-label="Common parent questions">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">{COPY.aeo.heading}</h2>
          {COPY.aeo.blocks.map((block) => (
            <article key={block.question} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{block.question}</h3>
              <p className="text-gray-600 leading-relaxed">{block.answer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Why it compounds */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">{COPY.compounding.eyebrow}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">{COPY.compounding.heading}</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-base lg:text-lg">
            {COPY.compounding.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Parent pain cards */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10">
            When my child hates writing or reads but does not understand — what we address
          </h2>
          <div className="space-y-5">
            {COPY.painCards.map((card) => (
              <Card key={card.quote} className="border border-gray-200 bg-gray-50">
                <CardContent className="p-5 lg:p-6">
                  <p className="italic text-gray-800 font-medium mb-3">&ldquo;{card.quote}&rdquo;</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.explanation}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700">Root cause:</span>
                    <span className="text-gray-600">{card.rootCause}</span>
                    <ChevronRight className="h-4 w-4 text-[#F16112]" aria-hidden />
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{card.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Four pillars */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">{COPY.pillars.eyebrow}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">{COPY.pillars.heading}</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">{COPY.pillars.subheading}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COPY.pillars.items.map((pillar) => (
              <Card key={pillar.name} className="bg-white border-t-4 border-[#1F396D]">
                <CardContent className="pt-5 pb-6 px-5">
                  <Badge className="bg-[#1F396D] text-white mb-3">Pillar {pillar.number}</Badge>
                  <h3 className="font-bold text-gray-900 mb-2">{pillar.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{pillar.why}</p>
                  <p className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <span className="font-semibold text-gray-700">Watch for: </span>
                    {pillar.signal}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Mastery track */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">{COPY.mastery.eyebrow}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-5">{COPY.mastery.heading}</h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl">{COPY.mastery.intro}</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {COPY.mastery.levels.map((level) => (
              <div key={level.name} className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
                <p className="text-lg font-bold text-blue-800 mb-2">{level.name}</p>
                <p className="text-sm text-blue-900 leading-relaxed">{level.description}</p>
              </div>
            ))}
          </div>
          <p className="font-semibold text-gray-800 mb-6">{COPY.mastery.rule}</p>
          <Button onClick={openAssessment} className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full px-7 py-3">
            {COPY.hero.primaryCta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </section>

      {/* 7. Curriculum grid */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">{COPY.curriculum.eyebrow}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">{COPY.curriculum.heading}</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">{COPY.curriculum.subheading}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse bg-white rounded-xl shadow-sm text-sm">
              <thead>
                <tr className="bg-[#1F396D] text-white">
                  <th className="text-left p-4 font-semibold w-28">Grade band</th>
                  {COPY.curriculum.headers.map((h) => (
                    <th key={h} className="text-left p-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COPY.curriculum.bands.map((band, i) => (
                  <tr key={band.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-900 align-top">{band.label}</td>
                    <td className="p-4 text-gray-700 align-top">{band.fluency}</td>
                    <td className="p-4 text-gray-700 align-top">{band.vocabulary}</td>
                    <td className="p-4 text-gray-700 align-top">{band.grammar}</td>
                    <td className="p-4 text-gray-700 align-top">{band.writing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. What this is not */}
      <section className="bg-[#1F396D] py-16 lg:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F1894F] mb-3">{COPY.notItems.eyebrow}</p>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">{COPY.notItems.heading}</h2>
          <p className="text-white/80 mb-8 max-w-2xl leading-relaxed">{COPY.notItems.intro}</p>
          <ul className="space-y-3">
            {COPY.notItems.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-white/90 text-sm">
                <X className="h-4 w-4 mt-0.5 text-[#F1894F] shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Program details + pricing */}
      <MathProgramDetailsSection
        sectionLabel={COPY.program.sectionLabel}
        heading={COPY.program.heading}
        includes={COPY.program.includes}
        outcomes={COPY.program.outcomes}
        onBookAssessment={openAssessment}
      />
      <p className="text-center text-xs text-gray-500 px-4 pb-8 max-w-3xl mx-auto">{COPY.program.footerMicro}</p>

      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="rounded-xl border border-[#1F396D]/20 bg-blue-50 p-6 lg:p-8 flex gap-5">
            <div className="shrink-0 h-12 w-12 rounded-full bg-[#1F396D] flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg mb-1">English tutoring Dublin CA · Pleasanton · San Ramon · Tri-Valley</p>
              <p className="text-gray-600 text-sm">
                {CONTACT_INFO.address} — in-person and live online nationwide. Call{' '}
                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} className="text-[#1F396D] font-semibold underline">
                  {CONTACT_INFO.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <VisibleCourseFAQ faqs={ELEMENTARY_ENGLISH_VISIBLE_FAQS} title={COPY.faq.title} subtitle={COPY.faq.subtitle} className="bg-white" />

      <MathTrialSection config={ELEMENTARY_ENGLISH_TRIAL} locale={locale} />

      {/* 11. CTA */}
      <section className="bg-gradient-to-br from-[#1F396D] to-[#29335C] py-16 lg:py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <MessageSquareText className="h-10 w-10 text-[#F1894F] mx-auto mb-5" aria-hidden />
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">{COPY.cta.heading}</h2>
          <p className="text-white/80 mb-8 leading-relaxed">{COPY.cta.body}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={publicPath(COPY.cta.primaryPath, locale)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] px-8 py-4 text-base font-semibold text-white"
            >
              <PenTool className="h-5 w-5" aria-hidden />
              {COPY.cta.primaryLabel}
            </Link>
            <Button
              type="button"
              onClick={openAssessment}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 text-base font-semibold text-white hover:bg-white/10"
            >
              {COPY.cta.secondaryLabel}
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/70 text-sm">
            <Phone className="h-4 w-4" aria-hidden />
            <span>
              {CONTACT_INFO.phone} · No long-term contract · Current pricing shared before enrollment
            </span>
          </div>
        </div>
      </section>

      <ProgramRecommendationModal isOpen={isAssessmentModalOpen} onClose={() => setIsAssessmentModalOpen(false)} sourcePage="academic-english-elementary" defaultSubject="English" defaultGradeBand="K-5" />
    </div>
  )
}
