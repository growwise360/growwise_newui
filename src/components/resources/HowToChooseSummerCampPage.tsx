'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  HelpCircle,
  Palette,
  Star,
  Target,
  XCircle,
} from 'lucide-react'
import {
  HOW_TO_CHOOSE_SUMMER_CAMP_FAQS,
  HOW_TO_CHOOSE_SUMMER_CAMP_RELATED,
} from '@/data/resources/how-to-choose-summer-camp'
import { publicPath } from '@/lib/publicPath'
import { siteGoogleTrustReviewCards } from '@/lib/siteGoogleTrustReviews'

type GoalId = 'academic' | 'steam' | 'prep' | 'enrichment'

type Goal = {
  id: GoalId
  title: string
  description: string
  icon: typeof BookOpen
}

type Recommendation = {
  title: string
  body: string
  href: string
  cta: string
  secondaryHref: string
  secondaryCta: string
}

const GOALS: readonly Goal[] = [
  {
    id: 'academic',
    title: 'Close an academic gap',
    description: 'Math, reading, or writing is behind and fall curriculum will build on shaky foundations.',
    icon: BookOpen,
  },
  {
    id: 'steam',
    title: 'Build a future skill',
    description: 'Academics are steady and your child is ready for coding, AI, robotics, or project work.',
    icon: Code2,
  },
  {
    id: 'prep',
    title: 'Prepare for a hard transition',
    description: 'Middle school, high school, or Integrated Math 1 is next, and you want a smoother start.',
    icon: Target,
  },
  {
    id: 'enrichment',
    title: 'Explore and recharge',
    description: 'Grades are fine and the goal is variety, confidence, creativity, or a lighter summer rhythm.',
    icon: Palette,
  },
] as const

const RECOMMENDATIONS: Record<GoalId, Recommendation> = {
  academic: {
    title: 'Academic Summer Sprint',
    body:
      'Choose a structured academic program when a specific gap could compound next year. Look for a diagnostic intake, small groups, a clear scope and sequence, and parent-readable progress updates.',
    href: '/camps/academic-summer-programs-dublin-ca',
    cta: 'See Academic Programs',
    secondaryHref: '/book-assessment?source=camp-guide-academic',
    secondaryCta: 'Book Free Assessment',
  },
  steam: {
    title: 'STEAM Coding or Robotics Camp',
    body:
      'Choose STEAM when academics are solid and your child is ready to build real projects. The best fit is hands-on and structured, not just guided tutorials or passive screen time.',
    href: '/camps/summer',
    cta: 'See STEAM Camps',
    secondaryHref: '/book-assessment?source=camp-guide-steam',
    secondaryCta: 'Ask Which Level Fits',
  },
  prep: {
    title: 'Transition Prep Program',
    body:
      'Choose transition prep when next year brings a harder sequence. This is especially important before middle school math, Integrated Math 1, or high school-level pacing.',
    href: '/camps/high-school-summer-intensive-dublin-ca',
    cta: 'See Transition Prep',
    secondaryHref: '/book-assessment?source=camp-guide-prep',
    secondaryCta: 'Check Readiness First',
  },
  enrichment: {
    title: 'Enrichment or Exploration Camp',
    body:
      'Choose enrichment when foundations are strong and your child needs variety. If they also like technology, a beginner STEAM camp can serve this goal while still building a useful skill.',
    href: '/camps/summer',
    cta: 'Explore Programs',
    secondaryHref: '/readinesschecklist',
    secondaryCta: 'Check for Hidden Gaps',
  },
}

const CAMP_TYPES = [
  {
    title: 'Academic Summer Programs',
    subtitle: 'Math sprints, reading and writing, IM1 prep, high school intensive',
    icon: BookOpen,
    tone: 'navy',
    choose: [
      'A specific subject gap will compound next year if it is not addressed',
      'Middle school math foundations are not solid',
      'Integrated Math 1 is assigned for fall and your child feels underprepared',
      'Reading comprehension or written explanations are weak',
      'Repeated mistakes show up on the same problem types',
    ],
    avoid: [
      'Grades are strong and the goal is exploration or variety',
      'Your child needs a lighter summer after a demanding year',
      'The primary goal is social time, not skill-building',
    ],
    badge: 'GrowWise fit: Academic Summer Programs, grades 1-10, June and July',
  },
  {
    title: 'STEAM and Coding Camps',
    subtitle: 'Python, AI, game development, robotics, project-based learning',
    icon: Code2,
    tone: 'orange',
    choose: [
      'Your child is academically on track and ready to build forward skills',
      'They are curious about technology, engineering, or how things are built',
      'They want to build something real, not just watch videos',
      'They need a structured entry point into coding or robotics',
      'They already code and want to move into AI, ML, or advanced projects',
    ],
    avoid: [
      'Math or reading gaps are significant and need attention first',
      'The interest is not there yet',
      'The program is mostly tutorials without independent building',
    ],
    badge: 'GrowWise fit: STEAM camps, grades 1-12, June-August',
  },
  {
    title: 'Enrichment and Multi-Activity Camps',
    subtitle: 'Arts, sports, nature, social exploration, lighter structure',
    icon: Compass,
    tone: 'slate',
    choose: [
      'Grades are strong and your child genuinely needs a break from academics',
      'They thrive in group, activity-based settings',
      'They have a specific nonacademic interest worth developing',
      'The main goal is confidence, creativity, or social momentum',
    ],
    avoid: [
      'Academic gaps already exist',
      'A hard grade transition is coming and the child is underprepared',
      'You are hoping structured skills will develop passively',
    ],
    badge: "GrowWise note: enrichment is useful, but it is not GrowWise's primary focus",
  },
] as const

const QUESTIONS = [
  {
    q: 'What is your average class size, not your maximum?',
    why: 'The cap is marketing. The average is reality. Under 10 students per instructor usually allows more individual attention.',
  },
  {
    q: "What should my child be able to do at the end that they can't do now?",
    why: 'Strong programs can name concrete outcomes. Vague answers like better skills or more confidence are not enough.',
  },
  {
    q: "What is the instructor's background in this subject?",
    why: 'For academics, subject expertise matters. For coding, ask whether instructors have built real projects, not just taught tutorials.',
  },
  {
    q: 'What is the week-by-week curriculum?',
    why: 'Academic programs need a defined sequence. Coding camps should show what students build, not only what topics they cover.',
  },
  {
    q: "Is the curriculum aligned to my child's school pathway?",
    why: 'This matters most for math. DUSD and PUSD pathways can make a generic summer math program cover the wrong content at the wrong time.',
  },
]

const COMPARISON = [
  ['Primary outcome', 'Gap closed before fall', 'Real skill built', 'Exploration and rest'],
  ['Best fit', 'Below target or gapped', 'On track or above', 'Grades are fine'],
  ['Structure level', 'High, defined curriculum', 'Medium-high, project-based', 'Lower, activity-based'],
  ['Wrong if', 'Child needs a break', 'Gaps need closing first', 'Gaps exist'],
  ['GrowWise offering', 'Academic Summer Programs', 'STEAM Camps', 'Not the main focus'],
] as const

function trackCampGuideEvent(event: string, params: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  const analyticsWindow = window as typeof window & {
    gtag?: (command: 'event', eventName: string, params?: Record<string, unknown>) => void
    dataLayer?: Array<Record<string, unknown>>
  }
  analyticsWindow.gtag?.('event', event, params)
  analyticsWindow.dataLayer?.push({ event, ...params })
}

export function HowToChooseSummerCampPage() {
  const locale = useLocale()
  const [selectedGoal, setSelectedGoal] = useState<GoalId>('academic')
  const recommendation = RECOMMENDATIONS[selectedGoal]
  const googleReviews = useMemo(() => siteGoogleTrustReviewCards().slice(0, 3), [])

  const selectedLabel = useMemo(
    () => GOALS.find((goal) => goal.id === selectedGoal)?.title ?? 'Close an academic gap',
    [selectedGoal],
  )

  const selectGoal = (goal: GoalId) => {
    setSelectedGoal(goal)
    trackCampGuideEvent('camp_guide_goal_selected', {
      goal,
    })
  }

  const trackCta = (location: string, href: string) => {
    trackCampGuideEvent('camp_guide_cta_clicked', {
      location,
      goal: selectedGoal,
      destination: href,
    })
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-[#1E3A5F] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_24px)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-100 ring-1 ring-white/15">
              Parent Resources · Summer Camp Guide
            </p>
            <h1 className="font-heading text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Find the right summer camp before you enroll.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-50">
              Academic sprint, STEAM coding, or enrichment? The right choice depends on your child&apos;s gap, grade, and goal. Use this parent guide to narrow the decision in a few minutes.
            </p>
            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#1D9E75] bg-white/95 p-5 text-slate-900 shadow-lg">
              <h2 className="font-heading text-lg font-bold text-[#1E3A5F]">Quick Answer</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-700">
                Choose a summer camp by matching the program to your child&apos;s primary need: academic gap support,
                transition preparation, STEAM skill-building, or enrichment. Then verify class size, instructor
                background, curriculum, and outcomes before enrolling.
              </p>
            </div>
            <figure className="mt-8 overflow-hidden rounded-xl border border-white/15 bg-white/95 shadow-lg">
              <div className="relative h-56 w-full sm:h-64">
                <Image
                  src="/images/camps/banners/acabanner.webp"
                  alt="Choose summer camp visual guide for comparing academic, STEAM, and enrichment programs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
              <figcaption className="px-5 py-3 text-sm text-slate-700">
                Choose summer camp options by matching each program to your child&apos;s goal, gap, and summer schedule.
              </figcaption>
            </figure>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#camp-decision-tool"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F97316] px-7 py-3 text-sm font-black text-white shadow-lg shadow-orange-950/20 transition-colors hover:bg-orange-500"
              >
                Start Decision Guide
              </a>
              <Link
                href={publicPath('/book-assessment?source=camp-guide-hero', locale)}
                onClick={() => trackCta('hero_assessment', '/book-assessment?source=camp-guide-hero')}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-7 py-3 text-sm font-black text-white transition-colors hover:bg-white/10"
              >
                Book Free Assessment
              </Link>
            </div>
            <p className="mt-4 text-sm font-semibold text-blue-100">
              Free · No signup · Built for Dublin and Tri-Valley parents
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ['3 paths', 'Academic, STEAM, or enrichment'],
            ['5 questions', 'Ask before enrolling anywhere'],
            ['45 minutes', 'Free assessment if the fit is unclear'],
          ].map(([stat, label]) => (
            <div key={stat} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-black text-[#1E3A5F]">{stat}</p>
              <p className="mt-1 text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-12">
          <section id="camp-decision-tool" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Start here
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              What is your primary summer goal?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Choose the closest match. The recommendation is a decision guide, not a commitment.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {GOALS.map((goal) => {
                const Icon = goal.icon
                const isSelected = goal.id === selectedGoal
                return (
                  <button
                    key={goal.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectGoal(goal.id)}
                    className={`min-h-32 rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                      isSelected
                        ? 'border-[#F97316] bg-[#FFF7ED] shadow-sm'
                        : 'border-slate-200 bg-white hover:border-[#F97316]/40 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected ? 'bg-[#F97316] text-white' : 'bg-[#EFF6FF] text-[#1E3A5F]'
                    }`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="block text-base font-black text-slate-950">{goal.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-600">{goal.description}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl border-2 border-[#F97316] bg-[#F97316] p-6 text-white shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">
                Recommended for: {selectedLabel}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-black">{recommendation.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/90">
                {recommendation.body}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={publicPath(recommendation.href, locale)}
                  onClick={() => trackCta('recommendation_primary', recommendation.href)}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-black text-[#1E3A5F] hover:bg-[#EFF6FF]"
                >
                  {recommendation.cta}
                </Link>
                <Link
                  href={publicPath(recommendation.secondaryHref, locale)}
                  onClick={() => trackCta('recommendation_secondary', recommendation.secondaryHref)}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/45 px-6 py-3 text-sm font-black text-white hover:bg-white/10"
                >
                  {recommendation.secondaryCta}
                </Link>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Camp types
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Compare the three real choices.
            </h2>
            <div className="mt-6 space-y-6">
              {CAMP_TYPES.map((type) => {
                const Icon = type.icon
                const headerClass =
                  type.tone === 'orange'
                    ? 'bg-[#F97316]'
                    : type.tone === 'slate'
                      ? 'bg-slate-800'
                      : 'bg-[#1E3A5F]'
                return (
                  <article key={type.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className={`${headerClass} flex items-start gap-4 px-5 py-4 text-white`}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-heading text-xl font-black">{type.title}</h3>
                        <p className="mt-1 text-sm text-white/80">{type.subtitle}</p>
                      </div>
                    </div>
                    <div className="grid gap-6 p-5 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1E3A5F]">
                          Choose this if
                        </p>
                        <ul className="mt-3 space-y-3">
                          {type.choose.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                          Wrong fit if
                        </p>
                        <ul className="mt-3 space-y-3">
                          {type.avoid.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 rounded-lg border border-[#F97316]/25 bg-[#FFF7ED] px-4 py-3 text-xs font-bold text-[#1E3A5F]">
                          {type.badge}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Parent proof
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Families choose GrowWise for small groups, patient instruction, and confidence.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {googleReviews.map((review) => (
                <article key={`${review.name}-${review.content.slice(0, 16)}`} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex gap-1" aria-label="5 star Google review">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F97316] text-[#F97316]" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-slate-700">
                    &quot;{review.content}&quot;
                  </p>
                  <p className="mt-4 text-sm font-black text-slate-950">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Quick comparison
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Pick based on outcome, not just activity.
            </h2>
            <div className="mt-6 grid gap-4 lg:hidden">
              {COMPARISON.map(([factor, academic, steam, enrichment]) => (
                <div key={factor} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-black text-[#1E3A5F]">{factor}</p>
                  <dl className="mt-3 grid gap-3 text-sm">
                    <div><dt className="font-bold text-slate-900">Academic</dt><dd className="text-slate-600">{academic}</dd></div>
                    <div><dt className="font-bold text-slate-900">STEAM</dt><dd className="text-slate-600">{steam}</dd></div>
                    <div><dt className="font-bold text-slate-900">Enrichment</dt><dd className="text-slate-600">{enrichment}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-6 hidden overflow-hidden rounded-xl border border-slate-200 lg:block">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#1E3A5F] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-black">Factor</th>
                    <th className="px-4 py-3 text-left font-black">Academic Sprint</th>
                    <th className="px-4 py-3 text-left font-black">STEAM / Coding</th>
                    <th className="px-4 py-3 text-left font-black">Enrichment</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(([factor, academic, steam, enrichment]) => (
                    <tr key={factor} className="border-t border-slate-200 odd:bg-white even:bg-slate-50">
                      <td className="px-4 py-3 font-black text-slate-900">{factor}</td>
                      <td className="px-4 py-3 text-slate-700">{academic}</td>
                      <td className="px-4 py-3 text-slate-700">{steam}</td>
                      <td className="px-4 py-3 text-slate-700">{enrichment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Before you enroll
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Five questions to ask any summer program.
            </h2>
            <div className="mt-6 divide-y divide-slate-200">
              {QUESTIONS.map((item) => (
                <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex gap-3">
                    <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-[#F97316]" aria-hidden />
                    <div>
                      <h3 className="font-black text-slate-950">&quot;{item.q}&quot;</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
                Local parent note
              </p>
              <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
                A quick diagnostic can prevent the wrong summer plan.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                If you are choosing between academic support and enrichment, check for hidden gaps first. Fine grades can still hide weak foundations, especially before middle school math or Integrated Math 1.
              </p>
            </div>
            <div className="rounded-xl bg-[#EFF6FF] p-5">
              <ul className="space-y-3 text-sm text-slate-700">
                <li><strong>45 minutes</strong> with no commitment required</li>
                <li><strong>Grades 1-12</strong> academic and STEAM guidance</li>
                <li><strong>Dublin center</strong> at 4564 Dublin Blvd</li>
                <li><strong>Parent takeaway</strong>: the next-step plan</li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Common questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200">
              {HOW_TO_CHOOSE_SUMMER_CAMP_FAQS.slice(0, 5).map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-black text-slate-900">
                    {item.question}
                    <span className="text-[#F97316] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#1E3A5F] p-7 text-center text-white shadow-sm sm:p-10">
            <Brain className="mx-auto h-9 w-9 text-[#F97316]" aria-hidden />
            <h2 className="mt-4 font-heading text-3xl font-black">
              Not sure which program fits?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-50 sm:text-base">
              Book a free 45-minute assessment. We&apos;ll look at your child&apos;s actual gaps and goals, then recommend the right summer path before you commit.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={publicPath('/book-assessment?source=camp-guide-final', locale)}
                onClick={() => trackCta('final_assessment', '/book-assessment?source=camp-guide-final')}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F97316] px-7 py-3 text-sm font-black text-white hover:bg-orange-500"
              >
                Book Free Assessment
              </Link>
              <Link
                href={publicPath('/camps/summer', locale)}
                onClick={() => trackCta('final_programs', '/camps/summer')}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 px-7 py-3 text-sm font-black text-white hover:bg-white/10"
              >
                View Summer Camps
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/70">
              4564 Dublin Blvd, Dublin, CA · (925) 456-4606
            </p>
          </section>

          {HOW_TO_CHOOSE_SUMMER_CAMP_RELATED.length > 0 ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
                Related parent guides
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {HOW_TO_CHOOSE_SUMMER_CAMP_RELATED.map((article) => (
                  <Link
                    key={article.href}
                    href={publicPath(article.href, locale)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-[#F97316]/40 hover:bg-[#FFF7ED]"
                  >
                    <span className="text-sm font-black text-[#1E3A5F]">{article.title}</span>
                    {article.description ? (
                      <span className="mt-2 block text-sm leading-relaxed text-slate-600">{article.description}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  )
}
