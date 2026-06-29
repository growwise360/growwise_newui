'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  Home,
  ListChecks,
  Mail,
  PenLine,
  Printer,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

type Subject = 'math' | 'english'
type Frequency = '3' | '5'

type DownloadItem = {
  id: string
  subject: Subject
  title: string
  grade: string
  description: string
  status: 'live' | 'planned'
  href?: string
}

type PlanDay = {
  day: string
  title: string
  detail: string
}

type ParentJob = {
  id: string
  title: string
  description: string
  subject: Subject
}

const downloads: DownloadItem[] = [
  {
    id: 'thinking-gap-playbook',
    subject: 'math',
    title: 'Thinking Gap Playbook for Parents',
    grade: 'Grades 3-8',
    description:
      'A parent guide for spotting hidden reasoning gaps before they turn into homework battles or test mistakes.',
    status: 'live',
    href: '/downloads/ThinkingGap_Playbook_for_parents.pdf',
  },
  {
    id: 'math-weekly-plan',
    subject: 'math',
    title: 'Weekly Math Study Plan',
    grade: 'Grades 3-8',
    description: 'A printable weekly routine for skill review, mistake correction, and short practice blocks.',
    status: 'planned',
  },
  {
    id: 'fractions-word-problems',
    subject: 'math',
    title: 'Fractions and Word Problems Practice',
    grade: 'Grades 4-7',
    description: 'Mixed practice for fraction sense, setup accuracy, and multi-step word problem confidence.',
    status: 'planned',
  },
  {
    id: 'english-weekly-plan',
    subject: 'english',
    title: 'Weekly English Study Plan',
    grade: 'Grades 2-8',
    description: 'A reading and writing routine that balances comprehension, vocabulary, and written response.',
    status: 'planned',
  },
  {
    id: 'reading-comprehension',
    subject: 'english',
    title: 'Reading Comprehension Practice Sheet',
    grade: 'Grades 3-8',
    description: 'Short passage practice with main idea, inference, evidence, and summary prompts.',
    status: 'planned',
  },
  {
    id: 'paragraph-planner',
    subject: 'english',
    title: 'Paragraph Writing Planner',
    grade: 'Grades 3-8',
    description: 'A simple structure for topic sentences, evidence, explanation, and revision checks.',
    status: 'planned',
  },
]

const focusOptions: Record<Subject, string[]> = {
  math: ['Math facts and accuracy', 'Fractions', 'Word problems', 'Algebra readiness'],
  english: ['Reading comprehension', 'Vocabulary', 'Paragraph writing', 'Grammar and editing'],
}

const parentJobs: ParentJob[] = [
  {
    id: 'guessing',
    title: "I don't know what to practice",
    description: 'Pick a grade, subject, and focus skill. The page turns it into a simple weekly routine.',
    subject: 'math',
  },
  {
    id: 'battles',
    title: 'Practice turns into a fight',
    description: 'Use short named practice blocks so your child knows exactly when they are done.',
    subject: 'english',
  },
  {
    id: 'mistakes',
    title: 'My child keeps making the same mistakes',
    description: 'Add mistake correction days instead of only assigning more worksheets.',
    subject: 'math',
  },
]

const planTemplates: Record<Subject, Record<Frequency, PlanDay[]>> = {
  math: {
    '3': [
      { day: 'Monday', title: 'Skill refresh', detail: 'Review one core concept and complete 12 focused problems.' },
      { day: 'Wednesday', title: 'Mistake correction', detail: 'Redo missed problems and write the reason for each mistake.' },
      { day: 'Friday', title: 'Mini quiz', detail: 'Take a 15-minute mixed practice check without help.' },
    ],
    '5': [
      { day: 'Monday', title: 'Skill refresh', detail: 'Review one core concept and complete 10 focused problems.' },
      { day: 'Tuesday', title: 'Accuracy sprint', detail: 'Practice short problems with a checking routine.' },
      { day: 'Wednesday', title: 'Word problem day', detail: 'Solve 4 multi-step problems and label the operation choices.' },
      { day: 'Thursday', title: 'Mistake correction', detail: 'Redo missed problems and explain the fix.' },
      { day: 'Friday', title: 'Mini quiz', detail: 'Take a 15-minute mixed practice check without help.' },
    ],
  },
  english: {
    '3': [
      { day: 'Monday', title: 'Read and notice', detail: 'Read one short passage and mark the main idea plus key evidence.' },
      { day: 'Wednesday', title: 'Vocabulary and inference', detail: 'Practice 6 vocabulary words and answer 3 inference questions.' },
      { day: 'Friday', title: 'Written response', detail: 'Write one paragraph using claim, evidence, and explanation.' },
    ],
    '5': [
      { day: 'Monday', title: 'Fluency read', detail: 'Read one passage aloud, then write a one-sentence main idea.' },
      { day: 'Tuesday', title: 'Vocabulary builder', detail: 'Practice 6 words using context clues and original sentences.' },
      { day: 'Wednesday', title: 'Comprehension check', detail: 'Answer literal, inference, and evidence-based questions.' },
      { day: 'Thursday', title: 'Paragraph planner', detail: 'Plan a response with topic sentence, evidence, and explanation.' },
      { day: 'Friday', title: 'Revision day', detail: 'Revise for clarity, grammar, and stronger evidence.' },
    ],
  },
}

function subjectLabel(subject: Subject) {
  return subject === 'math' ? 'Math' : 'English'
}

export function StudyPlansDownloadPage() {
  const locale = useLocale()
  const [subject, setSubject] = useState<Subject>('math')
  const [grade, setGrade] = useState('Grade 5')
  const [focus, setFocus] = useState(focusOptions.math[0])
  const [frequency, setFrequency] = useState<Frequency>('3')
  const [email, setEmail] = useState('')
  const [showPlan, setShowPlan] = useState(false)

  const planDays = planTemplates[subject][frequency]
  const bookAssessmentHref = publicPath('/book-assessment', locale)

  function selectSubject(nextSubject: Subject) {
    setSubject(nextSubject)
    setFocus(focusOptions[nextSubject][0])
    setShowPlan(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowPlan(true)
  }

  return (
    <main className="min-h-screen bg-[#F7FAFC] font-sans text-slate-900">
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16" aria-labelledby="study-plans-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F16112] ring-1 ring-orange-100">
              <Sparkles className="size-4" aria-hidden="true" />
              Parent practice platform
            </p>
            <h1 id="study-plans-title" className="font-heading mt-5 text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">
              Know what your child should practice this week
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              A free parent workspace for Math and English practice: choose the skill, get a weekly routine, and stop guessing which worksheet comes next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="min-h-[48px] rounded-lg bg-[#F16112] px-6 text-white hover:bg-[#d54f0a]">
                <a href="#plan-builder">
                  Build my child&apos;s plan
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-h-[48px] rounded-lg border-[#1F396D]/25 px-6 text-[#1F396D] hover:bg-slate-50"
              >
                <a href="#free-downloads">
                  Browse downloads
                  <Download className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="mt-7 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              {[
                ['No login first', 'Start with email only'],
                ['Math + English', 'One place for both'],
                ['Weekly rhythm', 'Clear parent routine'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="font-bold text-[#1F396D]">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F7FAFC] p-4 shadow-sm sm:p-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#F16112]">My child&apos;s practice board</p>
                  <h2 className="font-heading mt-2 text-xl font-bold text-[#1F396D]">This week&apos;s plan</h2>
                </div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-[#1F396D] text-white">
                  <UserRound className="size-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student</p>
                  <p className="mt-1 font-bold text-[#1F396D]">{grade}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Focus</p>
                  <p className="mt-1 font-bold text-[#1F396D]">{focus}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rhythm</p>
                  <p className="mt-1 font-bold text-[#1F396D]">{frequency} days/week</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {planDays.slice(0, 3).map((item) => (
                  <div key={item.day} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F16112]">
                      <ClipboardCheck className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#1F396D]">{item.day}: {item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                [Eye, 'See the gap'],
                [ListChecks, 'Know the next step'],
                [Home, 'Run practice at home'],
              ].map(([Icon, label]) => {
                const IconComponent = Icon as typeof Eye
                return (
                  <div key={label as string} className="rounded-lg bg-white p-3 text-center text-sm font-semibold text-[#1F396D] ring-1 ring-slate-200">
                    <IconComponent className="mx-auto mb-2 size-5 text-[#F16112]" aria-hidden="true" />
                    {label as string}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] py-10" aria-labelledby="parent-jobs-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">Choose what feels true</p>
              <h2 id="parent-jobs-title" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
                Built around the parent job
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              The page should feel less like school paperwork and more like a weekly operating system for helping your child.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {parentJobs.map((job) => (
              <button
                key={job.id}
                type="button"
                onClick={() => selectSubject(job.subject)}
                className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-[#F16112]/40 hover:shadow-md"
              >
                <Target className="size-6 text-[#F16112]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-[#1F396D]">{job.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{job.description}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-[#F16112]">
                  Build {subjectLabel(job.subject)} plan
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="free-downloads" className="bg-white py-12 sm:py-16" aria-labelledby="downloads-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">Start here</p>
              <h2 id="downloads-title" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
                Your Math and English practice shelves
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Keep both subjects in one parent workspace. Download what is ready today, then use the plan builder to turn practice into a weekly routine.
              </p>
            </div>
            <div className="flex rounded-xl bg-slate-100 p-1" aria-label="Choose plan subject">
              {(['math', 'english'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectSubject(item)}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-semibold transition',
                    subject === item ? 'bg-white text-[#1F396D] shadow-sm' : 'text-slate-600 hover:text-slate-900',
                  )}
                >
                  {subjectLabel(item)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {(['math', 'english'] as const).map((group) => (
              <section key={group} className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5" aria-labelledby={`${group}-downloads-title`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 id={`${group}-downloads-title`} className="font-heading text-xl font-bold text-[#1F396D]">
                    {subjectLabel(group)} shelf
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => selectSubject(group)}
                    className="min-h-[40px] rounded-lg border-[#1F396D]/20 bg-white text-[#1F396D] hover:bg-white"
                  >
                    Build {subjectLabel(group)} plan
                  </Button>
                </div>
                <ul className="mt-5 grid list-none gap-4 p-0" role="list">
                  {downloads
                    .filter((item) => item.subject === group)
                    .map((item) => (
                      <li key={item.id}>
                        <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <span className="inline-flex rounded-full bg-[#1F396D]/10 px-3 py-1 text-xs font-bold text-[#1F396D]">
                              {item.grade}
                            </span>
                            <FileText className="size-5 text-[#F16112]" aria-hidden="true" />
                          </div>
                          <h4 className="mt-4 text-lg font-bold leading-snug text-[#1F396D]">{item.title}</h4>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                          {item.status === 'live' && item.href ? (
                            <Button asChild className="mt-5 min-h-[44px] rounded-lg bg-[#F16112] text-white hover:bg-[#d54f0a]">
                              <a href={item.href} download>
                                Download PDF
                                <Download className="size-4" aria-hidden="true" />
                              </a>
                            </Button>
                          ) : (
                            <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                              Included in upcoming worksheet pack
                            </div>
                          )}
                        </article>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="plan-builder" className="border-y border-slate-200 bg-slate-50 py-12 sm:py-16" aria-labelledby="builder-title">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">My child&apos;s weekly routine</p>
            <h2 id="builder-title" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
              Build a 4-week {subjectLabel(subject).toLowerCase()} plan you can actually follow
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              Choose the grade, focus skill, and practice rhythm. The preview becomes a parent-friendly plan: what to do, when to do it, and how to know the week is complete.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Parent email
                  <span className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="parent@example.com"
                      required
                      className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#F16112] focus:ring-2 focus:ring-[#F16112]/20"
                    />
                  </span>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Grade
                    <select
                      value={grade}
                      onChange={(event) => setGrade(event.target.value)}
                      className="min-h-[46px] rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#F16112] focus:ring-2 focus:ring-[#F16112]/20"
                    >
                      {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'High School'].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Practice rhythm
                    <select
                      value={frequency}
                      onChange={(event) => setFrequency(event.target.value as Frequency)}
                      className="min-h-[46px] rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#F16112] focus:ring-2 focus:ring-[#F16112]/20"
                    >
                      <option value="3">3 days per week</option>
                      <option value="5">5 days per week</option>
                    </select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Focus skill
                  <select
                    value={focus}
                    onChange={(event) => setFocus(event.target.value)}
                    className="min-h-[46px] rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#F16112] focus:ring-2 focus:ring-[#F16112]/20"
                  >
                    {focusOptions[subject].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <Button type="submit" className="min-h-[48px] rounded-lg bg-[#1F396D] text-white hover:bg-[#17305d]">
                  Create my free plan
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">Parent view</p>
                <h3 className="font-heading mt-2 text-xl font-bold text-[#1F396D]">
                  {showPlan ? `${grade} ${subjectLabel(subject)}: ${focus}` : 'Your child&apos;s weekly plan will appear here'}
                </h3>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F16112]">
                <CalendarDays className="size-5" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {planDays.map((item) => (
                <div key={item.day} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-bold text-[#1F396D]">{item.day}</p>
                    <p className="text-sm font-semibold text-[#F16112]">{item.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>

            {showPlan ? (
              <div className="mt-6 rounded-lg bg-[#1F396D] p-4 text-white">
                <p className="font-semibold">Plan created for {email}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/85">
                  Use this weekly rhythm to guide short, focused practice. You can print or save it now.
                </p>
                <Button
                  type="button"
                  onClick={() => window.print()}
                  className="mt-4 min-h-[44px] rounded-lg bg-white text-[#1F396D] hover:bg-slate-100"
                >
                  Print or save plan
                  <Printer className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                Fill out the form to turn this into a weekly plan for your child&apos;s grade, subject, focus skill, and practice rhythm.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-labelledby="next-step-title">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <PenLine className="mx-auto size-9 text-[#F16112]" aria-hidden="true" />
          <h2 id="next-step-title" className="font-heading mt-4 text-2xl font-bold text-[#1F396D] sm:text-3xl">
            Want GrowWise to tell you exactly where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Use this page as your parent workspace. When you want a teacher to identify the exact gap, book a free GrowWise assessment.
          </p>
          <Button asChild className="mt-7 min-h-[48px] rounded-lg bg-[#F16112] px-6 text-white hover:bg-[#d54f0a]">
            <Link href={bookAssessmentHref}>
              Book a free assessment
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
