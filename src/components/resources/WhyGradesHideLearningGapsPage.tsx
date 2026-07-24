'use client'

import Image from 'next/image'
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
  WHY_GRADES_CTA,
  WHY_GRADES_FAQS,
  WHY_GRADES_HERO,
  WHY_GRADES_RELATED,
} from '@/data/resources/why-grades-hide-learning-gaps-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const sectionClass = 'mx-auto max-w-3xl px-4 sm:px-6'
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl'
const bodyClass = 'text-base leading-relaxed text-slate-700 sm:text-lg'

export function WhyGradesHideLearningGapsPage() {
  const locale = useLocale()
  const resourcesHref = publicPath(RESOURCES_PATH, locale)
  const selfCheckHref = publicPath('/self-check', locale)
  const bookAssessmentHref = publicPath('/book-assessment', locale)
  const mathCoursesHref = publicPath('/academic/math', locale)
  const defaultOpenFaqs = getDefaultOpenFaqValues(WHY_GRADES_FAQS.length, (idx) => `why-grades-faq-${idx}`)

  return (
    <main data-why-grades-hide-learning-gaps className="min-h-screen bg-background font-sans">
      <section
        className="border-b border-slate-200/80 bg-slate-50 py-10 sm:py-14"
        aria-labelledby="why-grades-hero-title"
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
            {WHY_GRADES_HERO.categoryLabel}
          </span>
          <h1
            id="why-grades-hero-title"
            className="font-heading mt-4 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-[2.5rem]"
          >
            {WHY_GRADES_HERO.h1}
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-500">{WHY_GRADES_HERO.meta}</p>
          <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#1D9E75] bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-[#1F396D]">Quick Answer</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-700">
              Yes, a good grade can hide a learning gap when a student memorizes a procedure but cannot explain,
              transfer, or apply the concept in a new context.
            </p>
          </div>
          <figure className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-56 w-full sm:h-64">
              <Image
                src="/images/resources/growwise-why-grades-hide-gaps.webp"
                alt="Grades hide learning gaps visual guide for parents reviewing hidden academic understanding"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
            <figcaption className="px-5 py-3 text-sm text-slate-600">
              Grades hide learning gaps when students can perform a procedure but cannot explain or transfer the
              underlying idea.
            </figcaption>
          </figure>
        </div>
      </section>

      <article className="py-10 sm:py-14">
        <div className={sectionClass}>

          {/* Opening */}
          <div className="space-y-6">
            <p className={cn(bodyClass, 'text-lg font-medium text-slate-800')}>
              Your child brought home an A.
            </p>
            <p className={bodyClass}>
              You felt relieved. The teacher moved on. The unit ended.
            </p>
            <p className={bodyClass}>The gap is still there.</p>
          </div>

          {/* Section 1 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>What does a school grade actually measure?</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              A grade measures performance on a specific set of questions, on a specific day, under specific conditions.
              It is not a measurement of understanding — and the difference between those two things grows more
              significant every year your child moves through school.
            </p>
            <p className={bodyClass}>
              A student can score an A on a fractions test in May and still be unable to apply fraction logic to a ratio
              problem in September. The procedure was memorized correctly. The understanding was not built. The grade
              reported mastery. The grade was wrong.
            </p>
          </div>

          {/* Section 2 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>Can a student get good grades but still have learning gaps?</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              Yes — and it is more common than most parents expect. At GrowWise, we see this pattern consistently: a
              student who scores well on assessments arrives at the next unit or the next grade year unable to connect
              the prior material to new concepts. The grade said they were ready. The diagnostic tells a different story.
            </p>
            <p className={bodyClass}>
              This is not a failure of the student or the teacher. Grades are designed to report performance at a moment
              in time. They are not designed to measure whether understanding will hold when the curriculum moves forward
              and the context changes.
            </p>
          </div>

          {/* Section 3 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>Why do grades fail to show real understanding?</h2>
          <div className="space-y-4">
            <p className={bodyClass}>There are three structural reasons grades misreport mastery.</p>
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-bold text-[#1F396D]">Most tests reward procedure</h3>
                <p className="mt-3 text-slate-700">
                  A student who has memorized a method can execute it correctly without understanding why it works. That
                  execution earns full marks — and leaves the conceptual gap completely invisible.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-bold text-[#1F396D]">Classroom conditions are consistent</h3>
                <p className="mt-3 text-slate-700">
                  A student takes every test in the same environment, with the same teacher, after studying the same
                  material. That consistency suppresses errors that appear when the context shifts — which is exactly
                  what happens when the next unit begins.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-bold text-[#1F396D]">Grades are single data points</h3>
                <p className="mt-3 text-slate-700">
                  One test on one day. A student who was slightly unwell, slightly distracted, or slightly lucky
                  produces a grade that does not represent their actual skill level. Most academic decisions — program
                  placement, promotion, enrichment — are made on the basis of these single data points.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>What are the signs a grade is hiding a learning gap?</h2>
          <div className="space-y-4">
            <p className={bodyClass}>Three signs that a grade is reporting performance rather than understanding:</p>
            <ul className="list-disc space-y-4 pl-6 text-slate-700">
              <li className={bodyClass}>
                <strong>The child cannot explain it.</strong> Ask your child to teach you the concept they just tested
                on. A student who truly understands a concept can explain it simply. A student who memorized a procedure
                will describe steps — but cannot tell you why those steps work or what happens if the problem looks
                slightly different.
              </li>
              <li className={bodyClass}>
                <strong>The next unit feels disconnected.</strong> Math and science are cumulative. Genuine mastery of
                Unit 3 makes Unit 4 manageable. Performed mastery — where the procedure was memorized but not
                understood — makes Unit 4 confusing in ways the student cannot locate or explain.
              </li>
              <li className={bodyClass}>
                <strong>The same concept fails in a different context.</strong> Give your child the same mathematical
                concept framed differently than how it appeared on the test. True understanding transfers to new
                contexts. A memorized procedure does not.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>Why does this matter more in middle school and high school?</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              In Grades 1 through 5, the curriculum repeats and reinforces core concepts frequently. A fragile
              understanding of fractions in Grade 4 is likely to be retaught in Grade 5. The gap can hide.
            </p>
            <p className={bodyClass}>
              From Grade 6 onward, the curriculum assumes mastery and builds on it. Integrated Math 1 assumes
              proportional reasoning is solid. AP Calculus assumes algebraic manipulation is automatic. Each course adds
              a layer. A fragile foundation in an earlier layer does not disappear — it becomes load-bearing.
            </p>
            <p className={bodyClass}>
              At GrowWise, the students who arrive most behind are rarely students who failed. They are students who
              passed — but whose passing grades masked gaps that compounded quietly across two or three grade years
              before they became impossible to ignore.
            </p>
          </div>

          {/* Section 6 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>
            What does GrowWise look for that grades do not show?
          </h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              The GrowWise diagnostic assessment is designed to find exactly the gap that grades miss. Rather than asking
              whether a student can produce a correct answer, the assessment examines where in the problem the
              student&apos;s understanding actually holds and where it breaks down.
            </p>
            <p className={bodyClass}>
              The assessment identifies four specific points of failure that grades do not capture:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-slate-700">
              <li>Whether the student can set up a problem correctly from a word description</li>
              <li>Whether they understand <em>why</em> a procedure works or only <em>that</em> it works</li>
              <li>Whether the correct answer transfers to a variation of the same concept</li>
              <li>Whether the student can check their own work using a different method</li>
            </ul>
            <p className={bodyClass}>
              A student who can do all four has genuine mastery. A student who can only produce a correct answer through
              memorized procedure has a gap — regardless of what their report card says. Our{' '}
              <Link
                href={mathCoursesHref}
                className="font-semibold text-[#1F396D] underline-offset-2 hover:underline"
              >
                math tutoring programs
              </Link>{' '}
              are built around this diagnostic-first model.
            </p>
          </div>

          {/* Section 7 */}
          <h2 className={cn(h2Class, 'mt-12 mb-4')}>How do I know if my child&apos;s grades are hiding a gap?</h2>
          <div className="space-y-4">
            <p className={bodyClass}>
              The most direct way is the explanation test: ask your child to explain the last concept they were graded
              on, in plain language, to someone who does not already know it. This test cannot be passed through
              memorization. It requires actual understanding.
            </p>
            <p className={bodyClass}>
              If the explanation breaks down — if they can describe steps but not reasons, if they can do it but cannot
              say why — that is the gap. The grade reported something different. The gap is real.
            </p>
            <p className={bodyClass}>
              A structured diagnostic, like the free assessment GrowWise offers, maps this precisely across an entire
              subject area — showing not just where the gap exists but how far back it starts and how it connects to
              current material.
            </p>
          </div>

          {/* Inline CTA */}
          <section
            className="mt-12 rounded-2xl border border-[#1F396D]/15 bg-[#1F396D]/5 p-6 sm:p-8"
            aria-labelledby="why-grades-cta"
          >
            <h2 id="why-grades-cta" className={cn(h2Class, 'text-2xl')}>
              {WHY_GRADES_CTA.heading}
            </h2>
            <p className="mt-4 text-slate-700">{WHY_GRADES_CTA.subtext}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="min-h-[48px] rounded-lg bg-[#F16112] px-6 font-semibold text-white hover:bg-[#d54f0a]"
              >
                <Link href={selfCheckHref}>{WHY_GRADES_CTA.selfCheckLabel}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-h-[48px] rounded-lg border-[#1F396D] px-6 font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
              >
                <Link href={bookAssessmentHref}>{WHY_GRADES_CTA.assessmentLabel}</Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section
            className="mt-12 rounded-2xl border border-slate-200 bg-white px-4 py-10 shadow-sm sm:px-6"
            aria-labelledby="why-grades-faq-heading"
          >
            <div className="mb-8 text-center">
              <h2 id="why-grades-faq-heading" className={cn(h2Class, 'text-2xl')}>
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-slate-600">Common questions about grades and learning gaps</p>
            </div>
            <Accordion type="multiple" className="space-y-4" defaultValue={defaultOpenFaqs}>
              {WHY_GRADES_FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`why-grades-faq-${i}`}
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
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <ResourceBulletinCta className="mt-12" />

          {/* Related */}
          <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="why-grades-related">
            <h2 id="why-grades-related" className="font-heading text-lg font-bold text-[#1F396D]">
              Related guides &amp; programs
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {WHY_GRADES_RELATED.map((related) => {
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
