'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  BookOpen,
  Users,
  CheckCircle,
  ChevronRight,
  MapPin,
  ArrowRight,
  Target,
  Brain,
  TrendingUp,
  Clock,
  Star,
  Phone,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CourseFAQ } from '@/components/seo/CourseFAQ'
import FreeAssessmentModal from '@/components/FreeAssessmentModal'
import { ELEMENTARY_MATH_VISIBLE_FAQS } from '@/lib/schema/elementary-math-faqs'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { useLocale } from 'next-intl'

// ─────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────

const TRUST_CHIPS = [
  { icon: BookOpen, label: 'Grades 1–5' },
  { icon: Users, label: 'Live online nationwide + in-person Dublin CA' },
  { icon: Target, label: '6–10 students per group' },
  { icon: Clock, label: 'Starts monthly' },
]

const GRADE_SIGNS = [
  {
    grades: 'Grade 1–2',
    color: 'border-[#1F396D]',
    badgeColor: 'bg-[#1F396D]',
    signs: [
      'Can count but struggles to compose and decompose numbers',
      "Knows addition facts but can't explain what addition means",
      'Confuses tens and ones place value under pressure',
    ],
    meaning:
      "Number sense isn't concrete yet. The student is relying on memorization, not understanding.",
  },
  {
    grades: 'Grade 3–4',
    color: 'border-[#F16112]',
    badgeColor: 'bg-[#F16112]',
    signs: [
      'Multiplication facts are shaky or slow',
      'Word problems work in one step but fall apart in two steps',
      'Fractions feel arbitrary — no intuition for what a fraction represents',
    ],
    meaning:
      'Conceptual gaps in multiplication and early fractions. Procedural drill without meaning.',
  },
  {
    grades: 'Grade 5',
    color: 'border-[#F1894F]',
    badgeColor: 'bg-[#F1894F]',
    signs: [
      'Fractions with unlike denominators are inconsistent',
      "Decimal operations produce errors that don't feel \"wrong\" to the student",
      'Order of operations is memorized but not understood',
    ],
    meaning:
      "One or two fraction concepts that never fully landed are now showing up in everything. Usually fixable in 4–6 weeks of targeted work.",
  },
]

interface JTBDSituation {
  label: string
  heading: string
  body: string
  cta: 'assessment' | 'selfcheck' | 'summer' | 'advisor'
  ctaLabel: string
}

const JTBD_SITUATIONS: JTBDSituation[] = [
  {
    label: 'Fractions',
    heading: "\"My child has been struggling with fractions for months and I can't figure out why\"",
    body: 'This is the most common elementary math presentation. Fractions are where conceptual gaps in multiplication and number sense compound all at once. The fix is almost always a few weeks back — not in the fractions unit itself.',
    cta: 'assessment',
    ctaLabel: 'Book free assessment',
  },
  {
    label: 'Word problems',
    heading: "\"They're fine at computation but fall apart on word problems\"",
    body: 'Word problems require reading the mathematical structure of a situation — not just calculating. This is a reasoning gap, not a computation gap. Different fix.',
    cta: 'selfcheck',
    ctaLabel: 'Try the Self-Check',
  },
  {
    label: 'Practice gaps',
    heading: "\"Teacher says they need more practice, but I don't know practice of what\"",
    body: '"More practice" applied to the wrong concept produces frustration, not progress. The first step is identifying exactly which concept needs work.',
    cta: 'assessment',
    ctaLabel: 'Book free assessment',
  },
  {
    label: 'New grade prep',
    heading: "\"Going into a new grade and I want to make sure the foundation is solid\"",
    body: 'Summer and transition prep for rising Grade 2–5 students. We assess where they are and build forward.',
    cta: 'summer',
    ctaLabel: 'See summer programs',
  },
  {
    label: 'Enrichment',
    heading: "\"They're doing fine — I want them ahead\"",
    body: 'Enrichment track for students who have mastered grade-level material and are ready to work above it.',
    cta: 'advisor',
    ctaLabel: 'Talk to an advisor',
  },
]

const CURRICULUM_BANDS = [
  {
    label: 'Grade 1–2 focus',
    color: 'bg-[#1F396D]',
    topics: [
      'Number sense and place value — tens, ones, composing and decomposing numbers',
      'Addition and subtraction with understanding — not just fact memorization',
      'Measuring and comparing — early geometric thinking',
      'Introduction to repeated addition as multiplication foundation',
    ],
  },
  {
    label: 'Grade 3–4 focus',
    color: 'bg-[#F16112]',
    topics: [
      'Multiplication and division fluency — with conceptual backing, not just times tables',
      'Fractions as numbers on a number line — not just parts of a shape',
      'Equivalent fractions — the most commonly skipped and most consequential concept',
      'Multi-step word problems — identifying the mathematical structure before calculating',
    ],
  },
  {
    label: 'Grade 5 focus',
    color: 'bg-[#F1894F]',
    topics: [
      'Fractions: addition, subtraction, multiplication, division — all operations with conceptual grounding',
      'Decimal operations connected to fraction understanding',
      'Order of operations — with meaning, not just PEMDAS memorization',
      'Intro to coordinate planes and basic data interpretation',
    ],
  },
]

const PROGRAM_INCLUDES = [
  'Diagnostic assessment before session 1 (identifies the primary gap and sets the curriculum entry point)',
  '2 sessions per week · 60 minutes each · 24 sessions total',
  'Small group of 6–10 students at the same skill level',
  "Defined curriculum scope — you know what's covered before you start",
  'Monthly parent progress report (skills covered, mistake patterns corrected, next steps)',
  "Common Core aligned — tracks the concepts your child's school teaches",
  'Live online or in-person at Dublin Blvd, Dublin CA',
]

const PROGRAM_OUTCOMES = [
  'Have the primary identified gap closed',
  'Be able to approach multi-step problems with a system, not guesswork',
  'Have measurable improvement in the specific skills identified at diagnostic',
]

const NOT_ITEMS = [
  'Assign worksheets without instructor-led explanation',
  "Reteach the current school unit without diagnosing what's blocking it",
  'Operate as homework completion supervision',
]

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const ElementaryMathPage: React.FC = () => {
  const locale = useLocale()
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)

  const openAssessment = () => setIsAssessmentModalOpen(true)

  const ctaForSituation = (situation: JTBDSituation) => {
    if (situation.cta === 'assessment') {
      return (
        <button
          onClick={openAssessment}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#F16112] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d54f0a] transition-colors"
        >
          {situation.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      )
    }
    if (situation.cta === 'selfcheck') {
      return (
        <Link
          href={publicPath('/self-check', locale)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1F396D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#162850] transition-colors"
        >
          {situation.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )
    }
    if (situation.cta === 'summer') {
      return (
        <Link
          href={publicPath('/camps/academic-summer-programs-dublin-ca', locale)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1F396D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#162850] transition-colors"
        >
          {situation.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )
    }
    // advisor
    return (
      <button
        onClick={openAssessment}
        className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5 transition-colors"
      >
        {situation.ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[#ebebeb]" style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}>
      {/* Breadcrumb */}
      <Breadcrumbs
        noSchema
        items={[
          { name: 'Academic', url: absoluteSiteUrl('/academic', locale) },
          { name: 'Math Programs', url: absoluteSiteUrl('/courses/math', locale) },
          { name: 'Elementary Math', url: absoluteSiteUrl('/courses/math/elementary', locale) },
        ]}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#F16112]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#1F396D]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Floating number symbols */}
          {['1', '2', '+', '½', '×', '÷', '=', '3', '5', '¼'].map((sym, i) => (
            <div
              key={i}
              className="absolute text-gray-400/40 font-bold select-none"
              style={{
                left: `${10 + i * 9}%`,
                top: `${15 + (i % 3) * 25}%`,
                fontSize: `${18 + (i % 3) * 8}px`,
              }}
            >
              {sym}
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-16 lg:py-24 text-center">
          <Badge className="mb-4 bg-[#F16112]/10 text-[#F16112] border-[#F16112]/20 hover:bg-[#F16112]/20">
            Elementary Math · Grades 1–5
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-5 leading-tight">
            Most elementary math struggles trace back to one gap.
            <span className="block bg-gradient-to-r from-[#1F396D] to-[#F16112] bg-clip-text text-transparent mt-1">
              We find it before it spreads.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed">
            By the time a parent notices the problem — grades slipping, homework battles, "I hate math" — the real blocker is usually something from 6 to 18 months ago that never fully landed. Our programs start with a diagnostic session that identifies where reasoning breaks down, not where the current worksheet is hard.
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {TRUST_CHIPS.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/60 text-sm text-gray-700 font-medium shadow-sm">
                <Icon className="h-4 w-4 text-[#F16112]" aria-hidden />
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={openAssessment}
              className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Calculator className="mr-2 h-5 w-5" aria-hidden />
              Book free assessment
            </Button>
            <Link
              href={publicPath('/self-check', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F396D] px-8 py-4 text-base font-semibold text-[#1F396D] hover:bg-[#1F396D]/5 transition-colors"
            >
              Try the free Self-Check
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: The real problem ─────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">What's actually happening</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
            Elementary math has a compounding problem most parents don't see.
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-base lg:text-lg">
            <p>
              Each new math concept in Grades 1–5 builds on what came before. Fractions assume multiplication fluency. Multi-step word problems assume solid operations. Decimals assume fraction understanding.
            </p>
            <p>
              When one concept doesn't land fully — and the class moves on — the gap doesn't disappear. It compounds. The student arrives at the next unit slightly behind, the unit after that a little more behind, and by Grade 4 or 5 the problem is visible everywhere even though it started in one narrow place.
            </p>
            <p className="font-medium text-gray-700">
              The most common parent experience: "They were fine until this year." They weren't behind in previous years — the gap was just smaller than the work required to expose it.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Signs by grade ────────────────── */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">What to look for</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10">
            Common signs at each stage — and what they usually mean.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {GRADE_SIGNS.map((band) => (
              <Card key={band.grades} className={`border-t-4 ${band.color} bg-white shadow-sm`}>
                <CardContent className="pt-5 pb-6 px-5">
                  <Badge className={`${band.badgeColor} text-white mb-4`}>{band.grades}</Badge>
                  <ul className="space-y-2 mb-4">
                    {band.signs.map((sign) => (
                      <li key={sign} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                        {sign}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm italic text-gray-500 border-t border-gray-100 pt-3">
                    <span className="font-semibold not-italic text-gray-600">What it usually means: </span>
                    {band.meaning}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: JTBD ──────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">Which situation fits your child?</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10">
            We've seen every version of this.
          </h2>
          <div className="space-y-5">
            {JTBD_SITUATIONS.map((situation, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-5 lg:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 mb-2">{situation.heading}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{situation.body}</p>
                  </div>
                  <div className="shrink-0 mt-1">
                    {ctaForSituation(situation)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Curriculum ────────────────────── */}
      <section className="bg-[#ebebeb] py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">Curriculum scope — Grades 1–5</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            What we cover and why the order matters.
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Every session sequence is built backward from where the gaps most commonly appear — not forward from a textbook chapter order.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {CURRICULUM_BANDS.map((band) => (
              <div key={band.label} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className={`${band.color} px-5 py-3`}>
                  <span className="text-white font-semibold text-sm">{band.label}</span>
                </div>
                <ul className="px-5 py-4 space-y-3">
                  {band.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Program details ───────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">Program details</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
            Elementary Math Foundation — 3-Month Program
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-gray-800 mb-4">What's included:</p>
              <ul className="space-y-3">
                {PROGRAM_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-4">At the end of 3 months, your child should:</p>
              <ul className="space-y-3 mb-8">
                {PROGRAM_OUTCOMES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <Star className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border border-[#F16112]/20 bg-orange-50 p-5">
                <p className="text-2xl font-bold text-[#F16112] mb-1">From $349/month</p>
                <p className="text-sm text-gray-600 mb-1">Billed monthly · 3-month minimum</p>
                <p className="text-xs text-gray-500 mb-4">Contact us for exact pricing by schedule and session type.</p>
                <Button
                  onClick={openAssessment}
                  className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full w-full font-semibold"
                >
                  Book free assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Not homework help ─────────────── */}
      <section className="bg-[#1F396D] py-16 lg:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F1894F] mb-3">What this is not</p>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Not more of what isn't working.
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl leading-relaxed">
            Most children with elementary math gaps have already done more worksheets. The problem is rarely practice volume — it's practice of the wrong concept, or practice of the right concept without understanding.
          </p>
          <p className="font-semibold text-white/90 mb-4">GrowWise elementary sessions do not:</p>
          <ul className="space-y-3 mb-8">
            {NOT_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-white/80 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-[#F1894F] mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-white/80 leading-relaxed">
            Every session is instructed. The diagnostic determines the starting concept. The instructor corrects specific mistake patterns — not just wrong answers. Students leave each session with something they can do that they couldn't do before.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: Geo callout ───────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="rounded-xl border border-[#1F396D]/20 bg-blue-50 p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="shrink-0 h-12 w-12 rounded-full bg-[#1F396D] flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-lg mb-1">In Dublin, Pleasanton, or the Tri-Valley?</p>
              <p className="text-gray-600 text-sm">
                Our Dublin, CA center offers in-person elementary math sessions — same curriculum, same small groups, same diagnostic approach.
              </p>
            </div>
            <Link
              href={publicPath('/math-tutoring-dublin-ca/elementary', locale)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#1F396D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#162850] transition-colors whitespace-nowrap"
            >
              See local programs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: Middle school transition ─────── */}
      <section className="bg-[#ebebeb] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="shrink-0 h-12 w-12 rounded-full bg-[#F16112] flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-lg mb-1">Heading into middle school?</p>
              <p className="text-gray-600 text-sm">
                If your child is finishing Grade 5 and moving into 6th grade math or a Pre-Algebra track, the middle school program is the right next step.
              </p>
            </div>
            <Link
              href={publicPath('/courses/math/middle-school', locale)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-[#F16112] px-5 py-2.5 text-sm font-semibold text-[#F16112] hover:bg-[#F16112]/5 transition-colors whitespace-nowrap"
            >
              See middle school math
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FAQ ───────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <CourseFAQ
            faqs={ELEMENTARY_MATH_VISIBLE_FAQS}
            title="Elementary Math FAQs"
            subtitle="Common questions about the Grades 1–5 program."
            includeStructuredData={false}
          />
        </div>
      </section>

      {/* ── SECTION 10: CTA block ────────────────────── */}
      <section className="bg-gradient-to-br from-[#1F396D] to-[#29335C] py-16 lg:py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <Brain className="h-10 w-10 text-[#F1894F] mx-auto mb-5" aria-hidden />
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Start with a free assessment.</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            The diagnostic session is free, takes 20 minutes, and tells you exactly which gap to close — before you commit to anything. Most parents leave knowing more about their child's math than they did after months of homework help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={openAssessment}
              className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Calculator className="mr-2 h-5 w-5" aria-hidden />
              Book free assessment
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
            <span>Or call <a href="tel:+19254564606" className="underline underline-offset-2 hover:text-white">(925) 456-4606</a></span>
          </div>
        </div>
      </section>

      <FreeAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
      />
    </div>
  )
}

export default ElementaryMathPage
