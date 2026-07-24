'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  Printer,
  Target,
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
  href?: string
}

const downloads: DownloadItem[] = [
  {
    id: 'thinking-gap-playbook',
    subject: 'math',
    title: 'Thinking Gap Playbook for Parents',
    grade: 'Grades 3-8',
    description: 'Spot hidden reasoning gaps before they become repeated mistakes.',
    href: '/downloads/ThinkingGap_Playbook_for_parents.pdf',
  },
  {
    id: 'math-weekly-plan',
    subject: 'math',
    title: 'Weekly Math Training Plan',
    grade: 'Grades 3-8',
    description: 'A focused routine for skill review, accuracy, and mistake correction.',
  },
  {
    id: 'english-weekly-plan',
    subject: 'english',
    title: 'Weekly English Training Plan',
    grade: 'Grades 2-8',
    description: 'A reading and writing rhythm for comprehension, vocabulary, and response.',
  },
  {
    id: 'paragraph-planner',
    subject: 'english',
    title: 'Paragraph Writing Planner',
    grade: 'Grades 3-8',
    description: 'Structure topic sentences, evidence, explanation, and revision checks.',
  },
]

const focusOptions: Record<Subject, string[]> = {
  math: ['Math facts and accuracy', 'Fractions', 'Word problems', 'Algebra readiness'],
  english: ['Reading comprehension', 'Vocabulary', 'Paragraph writing', 'Grammar and editing'],
}

const planTemplates: Record<Subject, Record<Frequency, string[]>> = {
  math: {
    '3': ['Monday: Skill refresh', 'Wednesday: Mistake correction', 'Friday: Independent mini quiz'],
    '5': ['Monday: Skill refresh', 'Tuesday: Accuracy sprint', 'Wednesday: Word problems', 'Thursday: Mistake correction', 'Friday: Independent mini quiz'],
  },
  english: {
    '3': ['Monday: Read and notice', 'Wednesday: Vocabulary and inference', 'Friday: Written response'],
    '5': ['Monday: Fluency read', 'Tuesday: Vocabulary builder', 'Wednesday: Comprehension check', 'Thursday: Paragraph planner', 'Friday: Revision day'],
  },
}

function subjectLabel(subject: Subject) {
  return subject === 'math' ? 'Math' : 'English'
}

export function StudyPlansDownloadPage() {
  const locale = useLocale()
  const [subject, setSubject] = useState<Subject>('math')
  const [grade, setGrade] = useState('Grade 5')
  const [frequency, setFrequency] = useState<Frequency>('3')
  const [focus, setFocus] = useState(focusOptions.math[0])
  const [email, setEmail] = useState('')
  const [created, setCreated] = useState(false)
  const bookAssessmentHref = publicPath('/book-assessment?source=practice-plans-downloads', locale)

  function selectSubject(nextSubject: Subject) {
    setSubject(nextSubject)
    setFocus(focusOptions[nextSubject][0])
    setCreated(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCreated(true)
  }

  const planDays = planTemplates[subject][frequency]

  return (
    <main className="min-h-screen bg-[#F7FAFC] text-slate-900">
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16" aria-labelledby="downloads-hero-title">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F16112] ring-1 ring-orange-100">
              <BookOpenCheck className="size-4" aria-hidden="true" />
              Parent achievement platform
            </p>
            <h1 id="downloads-hero-title" className="font-heading mt-5 text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">
              Own your child&apos;s next practice move
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              A parent command center for Math and English practice: choose the skill, set the rhythm, and know exactly what your child should complete next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="min-h-[48px] rounded-lg bg-[#F16112] px-6 text-white hover:bg-[#d54f0a]">
                <a href="#plan-builder">
                  Build my child&apos;s achievement plan
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="min-h-[48px] rounded-lg border-[#1F396D]/25 px-6 text-[#1F396D]">
                <a href="#practice-assets">
                  View practice assets
                  <Download className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#F16112]">This week&apos;s command board</p>
            <h2 className="font-heading mt-2 text-xl font-bold text-[#1F396D]">{grade} {subjectLabel(subject)} plan</h2>
            <div className="mt-5 grid gap-3">
              {planDays.slice(0, 3).map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="font-semibold text-[#1F396D]">{item}</p>
                  <p className="mt-1 text-sm text-slate-600">{focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] py-10" aria-labelledby="parent-mission-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">Choose the parent mission</p>
          <h2 id="parent-mission-title" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
            Built for parents who want control, not confusion
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['No more guessing', 'Turn uncertainty into a weekly training routine.'],
              ['One command center', 'Keep Math and English practice together.'],
              ['Clear next step', 'Use the plan, then book an assessment if you want us to identify the exact gap.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <Target className="size-6 text-[#F16112]" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-[#1F396D]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="practice-assets" className="bg-white py-12 sm:py-16" aria-labelledby="assets-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">Practice library</p>
              <h2 id="assets-title" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
                Your Math and English achievement shelves
              </h2>
            </div>
            <div className="flex rounded-xl bg-slate-100 p-1" aria-label="Choose subject">
              {(['math', 'english'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectSubject(item)}
                  className={cn('rounded-lg px-4 py-2 text-sm font-semibold transition', subject === item ? 'bg-white text-[#1F396D] shadow-sm' : 'text-slate-600')}
                >
                  {subjectLabel(item)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {downloads.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-[#1F396D]/10 px-3 py-1 text-xs font-bold text-[#1F396D]">{item.grade}</span>
                  <FileText className="size-5 text-[#F16112]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1F396D]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                {item.href ? (
                  <Button asChild className="mt-5 min-h-[44px] rounded-lg bg-[#F16112] text-white hover:bg-[#d54f0a]">
                    <a href={item.href} download>
                      Download PDF
                      <Download className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <p className="mt-5 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
                    Included in upcoming worksheet pack
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plan-builder" className="border-y border-slate-200 bg-slate-50 py-12 sm:py-16" aria-labelledby="builder-title">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">My child&apos;s weekly training rhythm</p>
            <h2 id="builder-title" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
              Build a 4-week {subjectLabel(subject).toLowerCase()} plan your family can execute
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Parent email
                <span className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="parent@example.com"
                    className="min-h-[46px] w-full rounded-lg border border-slate-300 pl-10 pr-3 outline-none focus:border-[#F16112] focus:ring-2 focus:ring-[#F16112]/20"
                  />
                </span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Grade
                  <select value={grade} onChange={(event) => setGrade(event.target.value)} className="min-h-[46px] rounded-lg border border-slate-300 px-3">
                    {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'High School'].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Practice rhythm
                  <select value={frequency} onChange={(event) => setFrequency(event.target.value as Frequency)} className="min-h-[46px] rounded-lg border border-slate-300 px-3">
                    <option value="3">3 days per week</option>
                    <option value="5">5 days per week</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Focus skill
                <select value={focus} onChange={(event) => setFocus(event.target.value)} className="min-h-[46px] rounded-lg border border-slate-300 px-3">
                  {focusOptions[subject].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <Button type="submit" className="min-h-[48px] rounded-lg bg-[#1F396D] text-white hover:bg-[#17305d]">
                Create my training plan
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#F16112]">Parent view</p>
                <h3 className="font-heading mt-2 text-xl font-bold text-[#1F396D]">{grade} {subjectLabel(subject)}: {focus}</h3>
              </div>
              <CalendarDays className="size-7 text-[#F16112]" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-3">
              {planDays.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#1F396D]">{item}</p>
                  <p className="mt-1 text-sm text-slate-600">Short, focused practice with a clear finish line.</p>
                </div>
              ))}
            </div>
            {created ? (
              <div className="mt-6 rounded-lg bg-[#1F396D] p-4 text-white">
                <p className="font-semibold">Plan created for {email}</p>
                <Button type="button" onClick={() => window.print()} className="mt-4 min-h-[44px] rounded-lg bg-white text-[#1F396D] hover:bg-slate-100">
                  Print or save plan
                  <Printer className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ) : (
              <p className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                Fill out the form to personalize the weekly plan.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-labelledby="assessment-cta-title">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <CheckCircle2 className="mx-auto size-9 text-[#F16112]" aria-hidden="true" />
          <h2 id="assessment-cta-title" className="font-heading mt-4 text-2xl font-bold text-[#1F396D] sm:text-3xl">
            Not sure what the practice plan is revealing?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            If the same mistake keeps showing up, a GrowWise assessment can tell you whether it is a missing skill, a habit, or a confidence issue.
          </p>
          <Button asChild className="mt-7 min-h-[48px] rounded-lg bg-[#F16112] px-6 text-white hover:bg-[#d54f0a]">
            <Link href={bookAssessmentHref}>
              Book an Assessment
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
