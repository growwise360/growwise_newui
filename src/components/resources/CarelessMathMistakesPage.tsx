'use client'

import Link from 'next/link'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { useLocale } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ResourceBulletinCta } from '@/components/resources/ResourceBulletinCta'
import {
  CARELESS_MATH_MISTAKES_CTA,
  CARELESS_MATH_MISTAKES_FAQS,
  CARELESS_MATH_MISTAKES_HERO,
  CARELESS_MATH_MISTAKES_PATTERNS,
  CARELESS_MATH_MISTAKES_RELATED,
} from '@/data/resources/careless-math-mistakes-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const sectionClass = 'mx-auto max-w-3xl px-4 sm:px-6'
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl'
const bodyClass = 'text-base leading-relaxed text-slate-700 sm:text-lg'

function FaqAnswerWithLinks({ question, locale }: { question: string; locale: string }) {
  const item = CARELESS_MATH_MISTAKES_FAQS.find((faq) => faq.question === question)
  if (!item) return null

  if (question === 'Are careless mistakes in math a sign of a learning problem?') {
    return (
      <>
        {item.answer} For older students, similar execution gaps can also show up on standardized tests — see our{' '}
        <Link
          href={publicPath('/courses/sat-prep', locale)}
          className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
        >
          SAT prep
        </Link>{' '}
        approach for timed, high-stakes practice.
      </>
    )
  }

  return item.answer
}

export function CarelessMathMistakesPage() {
  const locale = useLocale()
  const resourcesHref = publicPath(RESOURCES_PATH, locale)
  const selfCheckHref = publicPath('/self-check', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)
  const mathCoursesHref = publicPath('/academic/math', locale)
  const mathFoundationsHref = publicPath('/camps/summer-math-foundations-dublin-ca', locale)
  const im1GetReadyHref = publicPath('/camps/summer-im1-get-ready-dublin-ca', locale)
  const im2GetReadyHref = publicPath('/camps/summer-im2-get-ready-dublin-ca', locale)
  const algebraGetReadyHref = publicPath('/camps/summer-algebra-dublin-ca', locale)
  const academicHubHref = publicPath('/camps/academic-summer-programs-dublin-ca', locale)
  const defaultOpenFaqs = getDefaultOpenFaqValues(CARELESS_MATH_MISTAKES_FAQS.length, (idx) => `careless-faq-${idx}`)

  return (
    <main data-careless-math-mistakes className="min-h-screen bg-background font-sans">
      <section
        className="border-b border-slate-200/80 bg-slate-50 py-10 sm:py-14"
        aria-labelledby="careless-math-hero-title"
      >
        <div className={cn(sectionClass, 'max-w-4xl')}>
          <Link
            href={resourcesHref}
            className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-[#1F396D]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back to Parent Guides
          </Link>
          <span className="mt-6 inline-flex rounded-full bg-[#1F396D]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1F396D] ring-1 ring-[#1F396D]/15">
            {CARELESS_MATH_MISTAKES_HERO.categoryLabel}
          </span>
          <h1
            id="careless-math-hero-title"
            className="font-heading mt-4 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-[2.5rem]"
          >
            {CARELESS_MATH_MISTAKES_HERO.h1}
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-500">{CARELESS_MATH_MISTAKES_HERO.meta}</p>
        </div>
      </section>

      <article className="py-10 sm:py-14">
        <div className={sectionClass}>
          <div className="space-y-6">
            <p className={cn(bodyClass, 'text-lg font-medium text-slate-800')}>
              Your child studies. They understand the lesson. They do the homework without a problem. Then the test
              comes back — and points are gone on questions they definitely knew.
            </p>
            <p className={bodyClass}>
              You ask what happened. They shrug: &quot;I made silly mistakes.&quot;
            </p>
            <p className={bodyClass}>
              This is one of the most frustrating patterns parents encounter — and one of the most misunderstood.
            </p>
            <p className={bodyClass}>
              The advice most kids receive is: <em>&quot;Be more careful next time.&quot;</em> That advice
              doesn&apos;t work. Here&apos;s why.
            </p>
          </div>

          <h2 className={cn(h2Class, 'mt-12 mb-4')}>Careless Mistakes Are Not Random</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              The first thing to understand: what looks like random carelessness is almost never random.
            </p>
            <p className={bodyClass}>
              Research from Vanderbilt University&apos;s IRIS Center confirms that when a student makes 3 to 5 errors
              on a particular type of problem, that constitutes a <em>mistake pattern</em> — not a one-off slip. Mistake
              patterns are predictable. They repeat under pressure. And they respond to targeted practice, not general
              reminders to slow down.
            </p>
            <p className={bodyClass}>Educational researchers classify math errors into three categories:</p>
            <ol className="list-decimal space-y-2 pl-6 text-slate-700">
              <li>
                <strong>Procedural errors</strong> — applying the right concept but executing the steps incorrectly
                (e.g. forgetting to carry a digit, skipping a step in multi-step problems)
              </li>
              <li>
                <strong>Conceptual errors</strong> — confusing two similar-looking methods (e.g. adding vs. multiplying
                fractions, area vs. perimeter formulas)
              </li>
              <li>
                <strong>Attention and pacing errors</strong> — rushing through easy problems to get to hard ones, then
                losing points on both
              </li>
            </ol>
            <p className={bodyClass}>
              According to published research, procedural errors are the most common type of error students make
              (Riccomini, 2014; Nelson &amp; Powell, 2018). They are also the most fixable — because they come from
              habit, not from lack of understanding.
            </p>
          </div>

          <h2 className={cn(h2Class, 'mt-12 mb-4')}>Why &quot;Slow Down&quot; Doesn&apos;t Fix It</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              Most parents and teachers respond to careless mistakes with the same instruction: slow down and check your
              work.
            </p>
            <p className={bodyClass}>
              The problem is that checking a mistake the same way you made it doesn&apos;t catch it. If a student copies
              a number incorrectly from one line to the next, re-reading that line won&apos;t reveal the error —
              because their eye expects to see what they wrote, not what the problem said.
            </p>
            <p className={bodyClass}>
              Research consistently shows that simply providing more practice on the same problem type is not effective
              for breaking mistake patterns (Riccomini, 2014; Lewis &amp; Fisher, 2018). What works is{' '}
              <em>error analysis</em> — identifying which specific type of mistake is being made and targeting that exact
              pattern.
            </p>
          </div>

          <h2 className={cn(h2Class, 'mt-12 mb-4')}>The 4 Most Common Careless Mistake Patterns in Kids</h2>
          <p className={cn(bodyClass, 'mb-8')}>
            Understanding which pattern your child has is the first step to fixing it.
          </p>

          <div className="space-y-8">
            {CARELESS_MATH_MISTAKES_PATTERNS.map((pattern) => (
              <div
                key={pattern.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-heading text-xl font-bold text-[#1F396D]">{pattern.title}</h3>
                <p className="mt-3 text-slate-700">{pattern.description}</p>
                {pattern.examples.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
                    {pattern.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-4 text-slate-700">
                  <span className="font-semibold text-[#F16112]">Fix:</span> {pattern.fix}
                </p>
              </div>
            ))}
          </div>

          <h2 className={cn(h2Class, 'mt-12 mb-4')}>What Most Tutoring Programs Miss</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              Most tutoring adds more practice. More worksheets. More of the same type of problem.
            </p>
            <p className={bodyClass}>
              This approach assumes the issue is knowledge. But when a student consistently gets homework right and tests
              wrong, the knowledge is not the issue. The <em>execution under pressure</em> is the issue — and that
              requires a different kind of practice.
            </p>
            <p className={bodyClass}>
              Simply providing more opportunities to practice the same problem type is typically not effective for
              correcting established mistake patterns (Vanderbilt IRIS Center, 2026). What&apos;s needed is a diagnostic
              approach: identify the specific error type, then target that pattern directly with structured correction.
            </p>
            <p className={bodyClass}>
              For students entering Algebra 1 with execution gaps, a focused{' '}
              <Link
                href={algebraGetReadyHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                Algebra 1 Get Ready
              </Link>{' '}
              summer cohort targets sign and distribution errors before they become habits.
            </p>
          </div>

          <h2 className={cn(h2Class, 'mt-12 mb-4')}>The GrowWise Approach to Careless Mistakes</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              At GrowWise, we start with a mistake pattern diagnostic before prescribing any practice.
            </p>
            <p className={bodyClass}>In the free academic assessment, we look at:</p>
            <ul className="list-disc space-y-2 pl-6 text-slate-700">
              <li>Where in the problem the error occurs (reading, setup, calculation, transfer, or checking)</li>
              <li>Whether the error repeats on similar problem types</li>
              <li>Whether the error appears under timed conditions but not untimed</li>
            </ul>
            <p className={bodyClass}>
              This tells us whether we&apos;re dealing with a procedural pattern, a formula confusion, a pacing issue, or
              a checking gap — and the fix is different for each.
            </p>
            <p className={bodyClass}>
              We do not assign more worksheets. We assign <em>targeted practice</em> that isolates the specific pattern,
              builds the habit that breaks it, and tests improvement under realistic conditions. Our{' '}
              <Link
                href={mathCoursesHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                math tutoring
              </Link>{' '}
              programs are built around this diagnostic-first model.
            </p>
            <p className={bodyClass}>
              During summer, our{' '}
              <Link
                href={mathFoundationsHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                Summer Math Foundations
              </Link>{' '}
              and{' '}
              <Link
                href={im1GetReadyHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                IM1
              </Link>{' '}
              /{' '}
              <Link
                href={im2GetReadyHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                IM2 Get Ready
              </Link>{' '}
              programs apply the same mistake-pattern diagnostic in structured cohorts. See all{' '}
              <Link
                href={academicHubHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                academic summer programs in Dublin
              </Link>
              .
            </p>
            <p className={bodyClass}>
              Most students with identifiable mistake patterns show measurable improvement within 4–6 sessions.
            </p>
          </div>

          <h2 className={cn(h2Class, 'mt-12 mb-4')}>What to Look for in Any Program</h2>
          <div className="space-y-4">
            <p className={bodyClass}>If your child consistently makes careless mistakes, ask any program you consider:</p>
            <ul className="list-disc space-y-2 pl-6 text-slate-700">
              <li>Do you run a diagnostic before starting?</li>
              <li>Do you analyze <em>where</em> in the problem the errors occur?</li>
              <li>Do you practice under timed conditions?</li>
              <li>Do you teach a specific checking method — not just &quot;check your work&quot;?</li>
            </ul>
            <p className={bodyClass}>
              If the answer to any of these is no, the program is treating the symptom, not the pattern.
            </p>
          </div>

          <section
            className="mt-12 rounded-2xl border border-[#1F396D]/15 bg-[#1F396D]/5 p-6 sm:p-8"
            aria-labelledby="careless-math-cta"
          >
            <h2 id="careless-math-cta" className={cn(h2Class, 'text-2xl')}>
              {CARELESS_MATH_MISTAKES_CTA.heading}
            </h2>
            <p className="mt-4 text-slate-700">{CARELESS_MATH_MISTAKES_CTA.subtext}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="min-h-[48px] rounded-lg bg-[#F16112] px-6 font-semibold text-white hover:bg-[#d54f0a]"
              >
                <Link href={selfCheckHref}>{CARELESS_MATH_MISTAKES_CTA.selfCheckLabel}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-h-[48px] rounded-lg border-[#1F396D] px-6 font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
              >
                <Link href={bookAssessmentHref}>{CARELESS_MATH_MISTAKES_CTA.assessmentLabel}</Link>
              </Button>
            </div>
          </section>

          <section
            className="mt-12 rounded-2xl border border-slate-200 bg-white px-4 py-10 shadow-sm sm:px-6"
            aria-labelledby="careless-math-faq"
          >
            <div className="mb-8 text-center">
              <h2 id="careless-math-faq" className={cn(h2Class, 'text-2xl')}>
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-slate-600">Common questions about careless math mistakes on tests</p>
            </div>
            <Accordion type="multiple" className="space-y-4" defaultValue={defaultOpenFaqs}>
              {CARELESS_MATH_MISTAKES_FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`careless-faq-${i}`}
                  className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <AccordionTrigger className="px-4 py-4 text-left text-base hover:no-underline sm:px-6 sm:text-lg">
                    <div className="flex items-center gap-3 pr-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F16112]/10">
                        <GraduationCap className="h-4 w-4 text-[#F16112]" aria-hidden />
                      </div>
                      <span className="font-semibold text-slate-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-slate-600 sm:px-6 sm:text-base">
                    <FaqAnswerWithLinks question={faq.question} locale={locale} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <ResourceBulletinCta className="mt-12" />

          <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="related-guide">
            <h2 id="related-guide" className="font-heading text-lg font-bold text-[#1F396D]">
              Related guides & programs
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {CARELESS_MATH_MISTAKES_RELATED.map((related) => {
                const relatedHref = publicPath(related.href, locale)
                return (
                  <article
                    key={related.href}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-heading text-lg font-bold text-[#1F396D]">
                      <Link href={relatedHref} className="hover:text-[#F16112] hover:underline">
                        {related.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{related.description}</p>
                    <Link
                      href={relatedHref}
                      className="mt-3 inline-flex text-sm font-semibold text-[#F16112] hover:text-[#C45A1A] hover:underline"
                    >
                      Read more →
                    </Link>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
