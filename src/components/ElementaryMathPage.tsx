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
  Phone,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CourseFAQ } from '@/components/seo/CourseFAQ'
import ProgramRecommendationModal from '@/components/ProgramRecommendationModal'
import { ELEMENTARY_MATH_VISIBLE_FAQS } from '@/lib/schema/elementary-math-faqs'
import { ELEMENTARY_TRIAL } from '@/lib/math-program-trial-copy'
import { MathTrialSection } from '@/components/courses/MathTrialSection'
import { MathParentGuidesSection } from '@/components/courses/MathParentGuidesSection'
import { MathProgramDetailsSection } from '@/components/courses/MathProgramDetailsSection'
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
  levelTag: string
  levelColor: string // Tailwind bg + text classes
}

const JTBD_SITUATIONS: JTBDSituation[] = [
  {
    label: 'Falling behind',
    heading: '"My child has been struggling and falling behind"',
    body: 'This is the most common presentation. The gap usually started 6–18 months ago and has been compounding ever since. The diagnostic finds the root concept; the Beginner track closes it systematically.',
    cta: 'assessment',
    ctaLabel: 'Get More Information',
    levelTag: 'Beginner level',
    levelColor: 'bg-green-100 text-green-700',
  },
  {
    label: 'Needs consistency',
    heading: '"They\'re doing okay but I want them more consistent"',
    body: "Your child is at grade level but performance is uneven — good days and bad days, strong on some topics and shaky on others. The Champ track builds the consistency that makes math reliable.",
    cta: 'assessment',
    ctaLabel: 'Get More Information',
    levelTag: 'Champ level',
    levelColor: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Already strong',
    heading: '"They\'re already strong — I want them further ahead"',
    body: 'Your child has mastered grade-level material and is ready to work above it. The Pro track moves them into accelerated content with the same structured, gap-aware approach.',
    cta: 'advisor',
    ctaLabel: 'Talk to an advisor',
    levelTag: 'Pro level',
    levelColor: 'bg-purple-100 text-purple-700',
  },
  {
    label: 'Practice of what?',
    heading: '"Teacher says they need more practice but I don\'t know of what"',
    body: '"More practice" applied to the wrong concept produces frustration, not progress. The free 30-minute assessment identifies exactly which concept needs work and whether Beginner or Champ is the right starting point.',
    cta: 'assessment',
    ctaLabel: 'Get More Information',
    levelTag: 'Beginner or Champ · assessment decides',
    levelColor: 'bg-gray-100 text-gray-600',
  },
  {
    label: 'New grade prep',
    heading: '"Going into a new grade, want the foundation solid"',
    body: 'Transition prep for rising Grade 2–5 students. We assess where they are and build forward so they start the new year from a position of strength, not catch-up.',
    cta: 'summer',
    ctaLabel: 'See summer programs',
    levelTag: 'Champ level',
    levelColor: 'bg-blue-100 text-blue-700',
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

const AUGUST_ELEMENTARY_READINESS = [
  {
    grade: 'Grades 1-2',
    focus: 'Place value, composing and decomposing numbers, addition/subtraction meaning',
    redFlag: 'Your child can count or calculate but cannot explain what the numbers mean.',
  },
  {
    grade: 'Grades 3-4',
    focus: 'Multiplication, division, early fractions, and two-step word problems',
    redFlag: 'Facts are slow, fractions feel random, or word problems fall apart after one step.',
  },
  {
    grade: 'Grade 5',
    focus: 'Fraction operations, decimals, order of operations, and pre-algebra habits',
    redFlag: 'Unlike denominators, decimals, or multi-step problems create inconsistent errors.',
  },
] as const

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
          { name: 'Math Programs', url: absoluteSiteUrl('/academic/math', locale) },
          { name: 'Elementary Math', url: absoluteSiteUrl('/academic/math/elementary', locale) },
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
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-4 leading-relaxed">
            By the time a parent notices the problem — grades slipping, homework battles, "I hate math" — the real blocker is usually something from 6 to 18 months ago that never fully landed. Our programs start with a free 30-minute assessment that identifies where reasoning breaks down, not where the current worksheet is hard.
          </p>
          {/* Change 1 — level line */}
          <p className="max-w-xl mx-auto text-sm text-gray-500 mb-8">
            3 levels: <span className="font-medium text-green-700">Beginner</span> · <span className="font-medium text-blue-700">Champ</span> · <span className="font-medium text-purple-700">Pro</span> — assessment places your child in the right one.
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
              Get More Information
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

      <section className="bg-[#ebebeb] py-14 lg:py-20" aria-labelledby="elementary-august-readiness-heading">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            August readiness by grade
          </p>
          <h2 id="elementary-august-readiness-heading" className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Before school starts, check the elementary math skills the next grade assumes.
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">
            Parents searching for elementary math tutoring in Dublin, CA are usually seeing one of three patterns:
            weak number sense, fraction confusion, or word-problem avoidance. A short readiness check shows whether
            your child needs targeted review, a full math program, or enrichment.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {AUGUST_ELEMENTARY_READINESS.map((item) => (
              <article key={item.grade} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#1F396D] mb-2">{item.grade}</h3>
                <p className="text-sm font-semibold text-gray-800 mb-2">{item.focus}</p>
                <p className="text-sm leading-relaxed text-gray-600">{item.redFlag}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={publicPath('/resources/back-to-school-math-assessment-dublin-ca', locale)}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F396D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162850]"
            >
              Read the math assessment guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={publicPath('/resources/careless-math-mistakes', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F396D] px-6 py-3 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
            >
              Fix careless math mistakes
            </Link>
          </div>
        </div>
      </section>

      {/* ── MASTERY TRACK SECTION ────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">GrowWise Mastery Track</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-5">
            A structured progression — not open-ended tutoring.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl">
            Most tutoring programs run indefinitely with no defined milestones. GrowWise Elementary works differently. Every student is placed in one of three levels based on their assessment. Every 3 months, they are re-assessed. Advance to the next level only happens at 90% or above — not before.
          </p>

          {/* Stepper — 3 level boxes + assessment checkpoints */}
          <div className="flex flex-col md:flex-row items-stretch gap-0 mb-8">
            {/* Box 1 — Beginner */}
            <div className="flex-1 rounded-xl border-2 border-green-200 bg-green-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Level 1</p>
              <p className="text-lg font-bold text-green-800 mb-1">Beginner</p>
              <p className="text-sm text-green-700">Below grade level · Closing the gap</p>
            </div>

            {/* Checkpoint 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 px-2 py-3 md:py-0 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="h-5 w-5 text-gray-400 hidden md:block" aria-hidden />
                <span className="text-[10px] font-semibold text-gray-500 text-center bg-gray-100 rounded-full px-2 py-0.5 whitespace-nowrap">3-month assessment · 90% to advance</span>
                <ArrowRight className="h-5 w-5 text-gray-400 hidden md:block" aria-hidden />
              </div>
            </div>

            {/* Box 2 — Champ */}
            <div className="flex-1 rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Level 2</p>
              <p className="text-lg font-bold text-blue-800 mb-1">Champ</p>
              <p className="text-sm text-blue-700">At grade level · Building consistency</p>
            </div>

            {/* Checkpoint 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 px-2 py-3 md:py-0 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="h-5 w-5 text-gray-400 hidden md:block" aria-hidden />
                <span className="text-[10px] font-semibold text-gray-500 text-center bg-gray-100 rounded-full px-2 py-0.5 whitespace-nowrap">3-month assessment · 90% to advance</span>
                <ArrowRight className="h-5 w-5 text-gray-400 hidden md:block" aria-hidden />
              </div>
            </div>

            {/* Box 3 — Pro */}
            <div className="flex-1 rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-1">Level 3</p>
              <p className="text-lg font-bold text-purple-800 mb-1">Pro</p>
              <p className="text-sm text-purple-700">Above grade level · Accelerating ahead</p>
            </div>
          </div>

          <p className="text-gray-600 mb-3 leading-relaxed">
            Students who score below 90% stay at their current level and continue building — no rushing, no skipping steps.
          </p>
          <p className="font-semibold text-gray-800 mb-6">
            The assessment is free, takes 30 minutes, and places your child in the right level before the first paid session.
          </p>
          <Link
            href={publicPath('/book-assessment', locale)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] px-7 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
          >
            Get More Information
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
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
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-semibold text-gray-800">{situation.heading}</p>
                      <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${situation.levelColor}`}>
                        → {situation.levelTag}
                      </span>
                    </div>
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

      <MathProgramDetailsSection
        sectionLabel="Program details"
        heading="Elementary Math Foundation — 3-Month Program"
        includes={PROGRAM_INCLUDES}
        outcomes={PROGRAM_OUTCOMES}
        onBookAssessment={openAssessment}
      />

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
              href={publicPath('/academic/math/elementary', locale)}
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
              href={publicPath('/academic/math/middle-school', locale)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-[#F16112] px-5 py-2.5 text-sm font-semibold text-[#F16112] hover:bg-[#F16112]/5 transition-colors whitespace-nowrap"
            >
              See middle school math
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <MathParentGuidesSection locale={locale} pageId="elementary" />

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

      <MathTrialSection config={ELEMENTARY_TRIAL} locale={locale} />

      {/* ── SECTION 11: CTA block ────────────────────── */}
      <section className="bg-gradient-to-br from-[#1F396D] to-[#29335C] py-16 lg:py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <Brain className="h-10 w-10 text-[#F1894F] mx-auto mb-5" aria-hidden />
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Start with a free 30-minute assessment.</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            The free 30-minute assessment does three things: identifies your child's specific gap, places them in the right level (Beginner, Champ, or Pro), and maps out what month one of their program will focus on. No charge. No commitment. Results you can act on immediately.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={openAssessment}
              className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Calculator className="mr-2 h-5 w-5" aria-hidden />
              Get More Information
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
          {/* FIX 5 — trust line */}
          <p className="mt-6 text-white/50 text-xs">
            No long-term contract. We&apos;ll recommend the right starting level before enrollment.
          </p>
        </div>
      </section>

      <ProgramRecommendationModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        sourcePage="academic-math-elementary"
        defaultSubject="Math"
        defaultGradeBand="K-5"
      />
    </div>
  )
}

export default ElementaryMathPage
