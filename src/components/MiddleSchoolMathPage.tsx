'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Brain,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CourseFAQ } from '@/components/seo/CourseFAQ'
import ProgramRecommendationModal from '@/components/ProgramRecommendationModal'
import { MIDDLE_SCHOOL_MATH_VISIBLE_FAQS } from '@/lib/schema/middle-school-math-faqs'
import {
  MIDDLE_SCHOOL_COURSE_BADGE_LABELS,
  MIDDLE_SCHOOL_COURSE_CARDS,
  MIDDLE_SCHOOL_COURSE_CLOSING,
  MIDDLE_SCHOOL_COURSE_CTA,
  MIDDLE_SCHOOL_COURSE_TRUST,
  type MiddleSchoolCourseBadge,
  type MiddleSchoolCourseCard,
} from '@/lib/middle-school-math-courses'
import { MIDDLE_SCHOOL_TRIAL } from '@/lib/math-program-trial-copy'
import { MATH_HUB_COPY } from '@/lib/math-hub-copy'
import {
  MIDDLE_SCHOOL_MATH_PROGRAM_DETAILS,
  MIDDLE_SCHOOL_PLACEMENT_DIAGRAM,
  MIDDLE_SCHOOL_PROGRAM_INCLUDES,
  MIDDLE_SCHOOL_PROGRAM_OUTCOMES,
} from '@/lib/middle-school-math-program-copy'
import { MiddleSchoolPlacementDiagram } from '@/components/courses/MiddleSchoolPlacementDiagram'
import { MathProgramDetailsSection } from '@/components/courses/MathProgramDetailsSection'
import { MathTrialSection } from '@/components/courses/MathTrialSection'
import { MathParentGuidesSection } from '@/components/courses/MathParentGuidesSection'
import { ParentOrientationVideo } from '@/components/form-thank-you/ParentOrientationVideo'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { useLocale } from 'next-intl'

const TRUST_CHIPS = [
  { icon: BookOpen, label: 'Grades 6–8 · district placement' },
  { icon: Users, label: 'Up to 6 students per group' },
  { icon: Clock, label: 'Starts monthly' },
] as const

type JtbdSituation = {
  readonly id: string
  readonly leftLabel: string
  readonly tagPill: string
  readonly panelHeading: string
  readonly panelBody: string
  readonly primaryCta: 'assessment' | 'contact'
  readonly primaryLabel: string
  readonly secondaryHref?: string
  readonly secondaryLabel?: string
}

const JTBD_SITUATIONS: readonly JtbdSituation[] = [
  {
    id: 'falling-behind',
    leftLabel: 'My child is falling behind in 6th or 7th grade math',
    tagPill: '→ Standard track · Course 1 or 2',
    panelHeading: 'This is usually a gap from 1–2 years back',
    panelBody:
      'Students who fall behind in middle school almost always have an unresolved concept from late elementary — fractions, ratios, or early algebraic thinking. We find it in the assessment and start there, not at the current unit.',
    primaryCta: 'assessment',
    primaryLabel: 'Get my program recommendation',
  },
  {
    id: 'im-prep',
    leftLabel: 'My child is starting IM1 or IM2 and I want them ready',
    tagPill: '→ Accelerated track · IM1 or IM2',
    panelHeading: 'Placement doesn\'t guarantee readiness',
    panelBody:
      'Students placed in IM1 or IM2 are often technically eligible but not actually prepared for the pacing of week one. We run a prep sequence aligned to the exact concepts the course assumes on day one.',
    primaryCta: 'assessment',
    primaryLabel: 'Get my program recommendation',
    secondaryHref: '/camps/academic-summer-programs-dublin-ca',
    secondaryLabel: 'See IM1 Get Ready program',
  },
  {
    id: 'tests',
    leftLabel: 'Strong in class but falls apart on tests',
    tagPill: '→ Any track · mistake pattern focus',
    panelHeading: 'Test performance is a different skill than classwork',
    panelBody:
      'Students who understand concepts in class but lose points on tests usually have one of two problems: careless mistake patterns under time pressure, or gaps in the specific reasoning type the test requires. Both are fixable. Neither is fixed by more homework.',
    primaryCta: 'assessment',
    primaryLabel: 'Get my program recommendation',
  },
  {
    id: 'accelerated-ready',
    leftLabel: 'Placed into accelerated but I\'m not sure they\'re ready',
    tagPill: '→ Accelerated track · Course 1/2 entry',
    panelHeading: 'Placement tests and readiness are not the same thing',
    panelBody:
      'A student can score well enough to place into accelerated math and still not be ready for the pacing or reasoning demands of IM1. The assessment tells you which one is true for your child — and if there is a gap, we close it before the school year starts.',
    primaryCta: 'assessment',
    primaryLabel: 'Get my program recommendation',
  },
  {
    id: 'ahead',
    leftLabel: 'Doing fine — I want them further ahead',
    tagPill: '→ Accelerated track · IM2 or above',
    panelHeading: 'Ahead is a starting point, not a ceiling',
    panelBody:
      'Students who have mastered their current course work above grade level within the accelerated track. We confirm school placement and readiness before the year starts — so pace is fast but never reckless.',
    primaryCta: 'contact',
    primaryLabel: 'Talk to an advisor',
  },
]

const msMonthlyProgram = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'middle-school')

const AUGUST_MIDDLE_SCHOOL_READINESS = [
  'Fractions and decimals are automatic enough for ratios, rates, and equations.',
  'The student can set up multi-step word problems without waiting for a template.',
  'Integers, variables, graphing, and proportional reasoning are ready for Course 1, Course 2, Course 3, or IM1.',
] as const

function courseBadgeClassName(badge: MiddleSchoolCourseBadge): string {
  if (badge === 'school-aligned') {
    return 'bg-green-100 text-green-800 border-green-200'
  }
  if (badge === 'advanced-track') {
    return 'bg-[#1F396D]/10 text-[#1F396D] border-[#1F396D]/20'
  }
  return 'bg-orange-50 text-[#F16112] border-orange-200'
}

function CourseLevelCard({
  course,
  onBookAssessment,
}: {
  course: MiddleSchoolCourseCard
  onBookAssessment: () => void
}) {
  return (
    <Card className="h-full border border-slate-200 bg-gray-50 shadow-sm rounded-2xl flex flex-col">
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {course.badges.map((badge) => (
            <span
              key={badge}
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${courseBadgeClassName(badge)}`}
            >
              {MIDDLE_SCHOOL_COURSE_BADGE_LABELS[badge]}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-[#1F396D] mb-4">{course.title}</h3>
        <div className="space-y-4 flex-1 text-sm text-gray-700 leading-relaxed">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Best for</p>
            <p>{course.bestFor}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Focus areas</p>
            <p>{course.focusAreas}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Student outcome</p>
            <p>{course.outcome}</p>
          </div>
        </div>
        <Button
          type="button"
          onClick={onBookAssessment}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white font-semibold shadow hover:shadow-md transition-shadow"
        >
          Get my program recommendation
        </Button>
      </CardContent>
    </Card>
  )
}

const MiddleSchoolMathPage: React.FC = () => {
  const locale = useLocale()
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
  const [selectedJtbdId, setSelectedJtbdId] = useState(JTBD_SITUATIONS[0].id)

  const selectedJtbd =
    JTBD_SITUATIONS.find((s) => s.id === selectedJtbdId) ?? JTBD_SITUATIONS[0]

  const openAssessment = () => setIsAssessmentModalOpen(true)

  const primaryJtbdCta = (situation: JtbdSituation) => {
    if (situation.primaryCta === 'contact') {
      return (
        <Link
          href={publicPath('/contact', locale)}
          className="inline-flex items-center justify-center rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
        >
          {situation.primaryLabel}
        </Link>
      )
    }
    return (
      <button
        type="button"
        onClick={openAssessment}
        className="inline-flex items-center justify-center rounded-full bg-[#F16112] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d54f0a]"
      >
        {situation.primaryLabel}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[#ebebeb]" style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}>
      <Breadcrumbs
        noSchema
        items={[
          { name: 'Academic', url: absoluteSiteUrl('/academic', locale) },
          { name: 'Math Programs', url: absoluteSiteUrl('/academic/math', locale) },
          { name: 'Middle School Math', url: absoluteSiteUrl('/academic/math/middle-school', locale) },
        ]}
      />

      {/* Section 1 — Hero */}
      <section className="bg-[#eef6ff]">
        <div className="mx-auto grid max-w-6xl gap-x-8 px-4 py-8 text-center lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[auto_1fr] lg:items-center lg:px-8 lg:py-10 lg:text-left">
          <div className="lg:col-start-1 lg:row-start-1">
            <Badge className="mb-3 bg-white/80 text-[#F16112] border-[#F16112]/20 hover:bg-white">
              Grades 6–8 · Middle school math
            </Badge>
            <h1
              className="text-[1.65rem] font-bold leading-[1.08] text-gray-800 sm:text-3xl lg:text-4xl"
              data-testid="middle-school-hero-heading"
            >
              <span className="block whitespace-nowrap">Middle school math is where</span>
              <span className="block">gaps start compounding.</span>
              <span className="mt-1 block bg-gradient-to-r from-[#1F396D] to-[#F16112] bg-clip-text text-transparent">
                Here&apos;s how to stop it.
              </span>
            </h1>
          </div>
          <ParentOrientationVideo
            context="middle-school-math"
            placement="hero"
          />

          <div className="mt-5 lg:col-start-1 lg:row-start-2">
            <p className="text-sm leading-6 text-gray-600 lg:max-w-xl">
              Course 1, IM1, and IM2 move fast. GrowWise finds the exact skill gap and builds the right
              starting plan before it compounds.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-4 grid w-full gap-3 sm:grid-cols-2">
              <Button
                onClick={openAssessment}
                className="h-auto min-h-12 w-full justify-center rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] px-5 py-3 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" aria-hidden />
                Get my program recommendation
              </Button>
              <Link
                href={publicPath('/self-check', locale)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#1F396D] bg-white/40 px-5 py-3 text-sm font-semibold text-[#1F396D] transition-colors hover:bg-white/70"
              >
                <Brain className="h-5 w-5" aria-hidden />
                Try the free Self-Check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ebebeb] py-14 lg:py-20" aria-labelledby="middle-school-august-readiness-heading">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            August readiness before IM1 and middle school placement
          </p>
          <h2 id="middle-school-august-readiness-heading" className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Middle school math tutoring should start with the course your child is about to enter.
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-6">
            For rising Grades 6-8, the first month of school moves quickly. Before August, parents should check whether
            prior skills are ready for Course 1, Course 2, Course 3, Integrated Math 1, or accelerated placement.
          </p>
          <ul className="grid gap-4 md:grid-cols-3">
            {AUGUST_MIDDLE_SCHOOL_READINESS.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700 shadow-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={publicPath('/resources/back-to-school-math-assessment-dublin-ca', locale)}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F396D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162850]"
            >
              Read the August math assessment guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={publicPath('/resources/middle-school-math-readiness-checklist', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F396D] px-6 py-3 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
            >
              Use the middle school checklist
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 — District placement pathways */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            {MIDDLE_SCHOOL_PLACEMENT_DIAGRAM.sectionLabel}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-5">
            {MIDDLE_SCHOOL_PLACEMENT_DIAGRAM.heading}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl">
            {MIDDLE_SCHOOL_PLACEMENT_DIAGRAM.intro}
          </p>

          <MiddleSchoolPlacementDiagram />

          <p className="text-gray-600 mt-10 mb-6 leading-relaxed max-w-2xl">
            {MIDDLE_SCHOOL_PLACEMENT_DIAGRAM.footer}
          </p>
          <p className="font-semibold text-gray-800 mb-6">
            Not sure which course fits? The free assessment identifies your child&apos;s starting
            level before the first paid session.
          </p>
        </div>
      </section>

      {/* Section 2b — Course level cards */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            {MIDDLE_SCHOOL_COURSE_TRUST.sectionLabel}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-5 max-w-3xl">
            {MIDDLE_SCHOOL_COURSE_TRUST.heading}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
            {MIDDLE_SCHOOL_COURSE_TRUST.leadQuote}
          </p>
          <ul className="space-y-2 mb-10 max-w-3xl">
            {MIDDLE_SCHOOL_COURSE_TRUST.emphasisLines.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 mt-0.5 text-[#1F396D] shrink-0" aria-hidden />
                {line}
              </li>
            ))}
          </ul>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {MIDDLE_SCHOOL_COURSE_CARDS.map((course) => (
              <CourseLevelCard key={course.id} course={course} onBookAssessment={openAssessment} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-slate-200 bg-gray-50 p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-[#1F396D] mb-4">
              {MIDDLE_SCHOOL_COURSE_CLOSING.heading}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">{MIDDLE_SCHOOL_COURSE_CLOSING.body}</p>
            <ul className="space-y-2 mb-0">
              {MIDDLE_SCHOOL_COURSE_CLOSING.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center max-w-2xl mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">
              {MIDDLE_SCHOOL_COURSE_CTA.heading}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">{MIDDLE_SCHOOL_COURSE_CTA.body}</p>
            <Button
              type="button"
              onClick={openAssessment}
              className="rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-md transition-shadow"
            >
              {MIDDLE_SCHOOL_COURSE_CTA.buttonLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3 — JTBD */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            Which situation fits your child?
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            What&apos;s actually going on with your child&apos;s math?
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="flex flex-col gap-2 lg:col-span-2" role="list">
              {JTBD_SITUATIONS.map((situation) => {
                const isSelected = selectedJtbdId === situation.id
                return (
                  <button
                    key={situation.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedJtbdId(situation.id)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-[#1F396D] bg-[#1F396D] text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-[#1F396D]/40 hover:bg-slate-50'
                    }`}
                  >
                    {situation.leftLabel}
                  </button>
                )
              })}
            </div>
            <div
              className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-3 min-h-[220px]"
              aria-live="polite"
            >
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-3">
                {selectedJtbd.tagPill}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{selectedJtbd.panelHeading}</h3>
              <p className="text-sm leading-relaxed text-slate-700 mb-6">{selectedJtbd.panelBody}</p>
              <div className="flex flex-wrap gap-3">
                {primaryJtbdCta(selectedJtbd)}
                {selectedJtbd.secondaryHref && selectedJtbd.secondaryLabel ? (
                  <Link
                    href={publicPath(selectedJtbd.secondaryHref, locale)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
                  >
                    {selectedJtbd.secondaryLabel}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {msMonthlyProgram ? (
        <MathProgramDetailsSection
          sectionLabel={MIDDLE_SCHOOL_MATH_PROGRAM_DETAILS.sectionLabel}
          heading={MIDDLE_SCHOOL_MATH_PROGRAM_DETAILS.heading}
          includes={MIDDLE_SCHOOL_PROGRAM_INCLUDES}
          outcomes={MIDDLE_SCHOOL_PROGRAM_OUTCOMES}
          onBookAssessment={openAssessment}
        />
      ) : null}

      <MathTrialSection config={MIDDLE_SCHOOL_TRIAL} locale={locale} />

      <MathParentGuidesSection locale={locale} pageId="middle-school" />

      {/* Section 7 — FAQ */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <CourseFAQ
            faqs={MIDDLE_SCHOOL_MATH_VISIBLE_FAQS}
            title="Middle School Math FAQs"
            subtitle="Common questions about Grades 6–8 programs."
            includeStructuredData={false}
          />
        </div>
      </section>

      {/* Section 8 — Bottom CTA */}
      <section className="bg-gradient-to-br from-[#1F396D] to-[#29335C] py-16 lg:py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <Brain className="h-10 w-10 text-[#F1894F] mx-auto mb-5" aria-hidden />
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Start with a free assessment.</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            The free assessment identifies your child&apos;s current course level, determines which
            track fits — standard or accelerated — and maps out what the first month of their program will
            focus on. No charge. No commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={openAssessment}
              className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Calculator className="mr-2 h-5 w-5" aria-hidden />
              Get my program recommendation
            </Button>
            <Link
              href={publicPath('/self-check', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Try the free Self-Check
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/70 text-sm">
            <Phone className="h-4 w-4" aria-hidden />
            <span>
              Or call{' '}
              <a href="tel:+19254564606" className="underline underline-offset-2 hover:text-white">
                (925) 456-4606
              </a>
            </span>
          </div>
          <p className="mt-6 text-white/50 text-xs">
            No registration fee through July 2026. No long-term contract. Monthly enrollment — cancel anytime.
          </p>
        </div>
      </section>

      {/* Section 9 — Cross-links */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-[#ebebeb] p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-lg mb-1">Coming from elementary school?</p>
              <p className="text-gray-600 text-sm">
                See our elementary math programs — Beginner, Champ, Pro
              </p>
            </div>
            <Link
              href={publicPath('/academic/math/elementary', locale)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-[#F16112] px-5 py-2.5 text-sm font-semibold text-[#F16112] hover:bg-[#F16112]/5 transition-colors whitespace-nowrap"
            >
              See elementary programs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-[#ebebeb] p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-lg mb-1">Moving to high school next year?</p>
              <p className="text-gray-600 text-sm">See our high school math programs</p>
            </div>
            <Link
              href={publicPath('/academic/math/high-school', locale)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5 transition-colors whitespace-nowrap"
            >
              See high school programs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="rounded-xl border border-[#1F396D]/20 bg-blue-50 p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="shrink-0 h-12 w-12 rounded-full bg-[#1F396D] flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-lg mb-1">In the Tri-Valley?</p>
              <p className="text-gray-600 text-sm">
                In-person sessions at our Dublin, CA center — DUSD and PUSD curriculum aligned.
              </p>
            </div>
            <Link
              href={publicPath('/math-tutoring-dublin-ca', locale)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#1F396D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#162850] transition-colors whitespace-nowrap"
            >
              See Dublin, CA math programs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <ProgramRecommendationModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        sourcePage="academic-math-middle-school"
        defaultSubject="Math"
        defaultGradeBand="6-8"
      />
    </div>
  )
}

export default MiddleSchoolMathPage
