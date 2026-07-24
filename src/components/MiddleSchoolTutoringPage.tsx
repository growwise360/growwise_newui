'use client'

import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants'
import { publicPath } from '@/lib/publicPath'
import { MIDDLE_SCHOOL_TUTORING_DUBLIN_CA_FAQS } from '@/lib/schema/middle-school-tutoring-faqs'

interface MiddleSchoolTutoringPageProps {
  locale?: string
}

export function MiddleSchoolTutoringPage({ locale = 'en' }: MiddleSchoolTutoringPageProps) {
  const assessmentHref = publicPath('/book-assessment', locale)
  const mathHref = publicPath('/academic/math/middle-school', locale)
  const englishHref = publicPath('/academic/english', locale)
  const satHref = publicPath('/courses/sat-prep', locale)
  const dublinHref = publicPath('/dublin-ca', locale)
  const tutoringGuideHref = publicPath('/resources/tutoring-dublin-ca', locale)
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1F396D] py-16 md:py-20 lg:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-12">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FED7AA]">
            Middle School · Grades 6–8 · Dublin, CA
          </p>
          <h1 className="font-heading mt-6 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
            Middle School Tutoring in Dublin, CA — Math &amp; English for Grades 6–8
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Small-group math and English tutoring for Grades 6–8, aligned to DUSD and PUSD curriculum.
            We start with a diagnostic that finds the specific gap — not just the grade level — so your child
            builds the right skills before they fall further behind.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={assessmentHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F16112] px-6 py-3 text-sm font-black text-white transition-colors hover:bg-[#d64f0d]"
            >
              Book a Free Assessment
            </Link>
            <a
              href={phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-white py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-5 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1D9E75]">Who it is for</p>
          <h2 className="font-heading mt-3 max-w-2xl text-2xl font-black text-[#1F396D] md:text-3xl">
            Middle school is where gaps start compounding
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            The jump from elementary to middle school changes everything — harder math, longer reading passages,
            multi-paragraph essays, and faster course pacing. A small gap from 5th grade becomes a visible
            struggle in 6th. A missed concept in Course 1 makes IM1 feel impossible. GrowWise works with Grades
            6–8 students who need structured, school-aligned support before the next course starts.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Grade dropped after switching to middle school',
              'Homework takes much longer than expected',
              'Avoiding a specific subject entirely',
              'Teacher flagged a gap on the last report card',
              'Preparing for IM1 or an accelerated math track',
              'Reading passages assigned but not understood',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D9E75] text-xs text-white">
                  ✓
                </span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two programs */}
      <section className="bg-gray-50 py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-5 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1D9E75]">Programs</p>
          <h2 className="font-heading mt-3 max-w-2xl text-2xl font-black text-[#1F396D] md:text-3xl">
            Math and English — each built for middle school
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Math */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F16112]">Math · Grades 6–8</p>
              <h3 className="font-heading mt-3 text-xl font-black text-[#1F396D]">
                Middle School Math Tutoring
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Covers Course 1 through IM2, including standard and accelerated DUSD tracks. We close ratio,
                pre-algebra, equation, and geometry gaps before they block the next course.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {['Course 1 & Course 2', 'Pre-Algebra & Ratios', 'Integrated Math 1 (IM1)', 'Integrated Math 2 (IM2)', 'Word problems and graphing'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D9E75]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={mathHref}
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#1F396D] hover:underline"
              >
                See middle school math programs →
              </Link>
            </div>

            {/* English */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F16112]">English · Grades 1–8</p>
              <h3 className="font-heading mt-3 text-xl font-black text-[#1F396D]">
                Reading &amp; Writing Classes
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Covers reading comprehension, writing structure, grammar, vocabulary, and essays — aligned to
                the standards middle schoolers face in core classes and standardized assessments.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {['Reading comprehension & analysis', 'Paragraph and essay writing', 'Grammar and sentence structure', 'Vocabulary in context', 'Evidence-based writing'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D9E75]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={englishHref}
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#1F396D] hover:underline"
              >
                See English reading and writing classes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How GrowWise identifies gaps */}
      <section className="bg-white py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-5 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1D9E75]">Diagnostic-first</p>
          <h2 className="font-heading mt-3 max-w-2xl text-2xl font-black text-[#1F396D] md:text-3xl">
            How GrowWise identifies your child&apos;s gaps
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            We do not start with a placement test — we start with a pattern finder. The free 45-minute
            assessment surfaces the specific skill behind the struggle: a missed fraction concept from 5th grade,
            a fluency gap that slows reading comprehension, or a vocabulary gap that makes essay prompts
            confusing. That finding drives the program — not a generic grade-level syllabus.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { step: '1', label: 'Free 45-min assessment', body: 'Instructor-led session that finds the skill gap behind the visible struggle.' },
              { step: '2', label: 'Parent debrief', body: 'We explain what we found, which program fits, and what the first 30 days will address.' },
              { step: '3', label: 'Structured small-group program', body: 'Groups of up to 8 students. DUSD-aligned, monthly progress reports, live sessions.' },
            ].map(({ step, label, body }) => (
              <div key={step} className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F396D] text-sm font-bold text-white">
                  {step}
                </span>
                <p className="mt-3 font-semibold text-[#1F396D]">{label}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class format */}
      <section className="bg-gray-50 py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-5 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1D9E75]">Class format</p>
          <h2 className="font-heading mt-3 max-w-xl text-2xl font-black text-[#1F396D] md:text-3xl">
            Small groups, structured sessions
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Group size', value: 'Max 8 students per group' },
              { label: 'Session length', value: '90 minutes per session' },
              { label: 'Location', value: 'In-person Dublin, CA or live online' },
              { label: 'Progress updates', value: 'Monthly written report to parents' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F16112]">{label}</p>
                <p className="mt-2 text-sm font-semibold text-[#1F396D]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#1D9E75] py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-12">
          <h2 className="font-heading text-2xl font-black text-white md:text-3xl">
            Book a free middle school assessment
          </h2>
          <p className="mt-3 text-base text-white/90">
            45 minutes. In-person in Dublin, CA or online. We identify the gap and explain what to do about it —
            at no cost.
          </p>
          <Link
            href={assessmentHref}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-black text-[#1F396D] transition-colors hover:bg-gray-100"
          >
            Book a Free Assessment
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 md:py-18">
        <div className="mx-auto max-w-4xl px-5 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1D9E75]">FAQ</p>
          <h2 className="font-heading mt-3 text-2xl font-black text-[#1F396D] md:text-3xl">
            Common questions from Dublin parents
          </h2>
          <dl className="mt-8 space-y-6">
            {MIDDLE_SCHOOL_TUTORING_DUBLIN_CA_FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <dt className="font-semibold text-[#1F396D]">{question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-gray-600">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related links */}
      <section className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Related resources</p>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm">
            <li>
              <Link href={dublinHref} className="font-medium text-[#1F396D] hover:underline">
                Tutoring &amp; classes in Dublin, CA
              </Link>
            </li>
            <li>
              <Link href={mathHref} className="font-medium text-[#1F396D] hover:underline">
                Middle school math programs
              </Link>
            </li>
            <li>
              <Link href={englishHref} className="font-medium text-[#1F396D] hover:underline">
                English reading and writing classes in Dublin CA
              </Link>
            </li>
            <li>
              <Link href={satHref} className="font-medium text-[#1F396D] hover:underline">
                SAT prep in Dublin CA
              </Link>
            </li>
            <li>
              <Link href={tutoringGuideHref} className="font-medium text-[#1F396D] hover:underline">
                How to compare tutoring options in Dublin, CA
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
