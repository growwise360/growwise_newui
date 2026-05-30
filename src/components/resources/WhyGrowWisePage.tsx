'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BookAssessmentLink } from '@/components/marketing/BookAssessmentLink'
import { ResourceBulletinCta } from '@/components/resources/ResourceBulletinCta'
import {
  WHY_GROWWISE_CTA,
  WHY_GROWWISE_COMPARISON_ROWS,
  WHY_GROWWISE_FAQS,
  WHY_GROWWISE_HERO,
  WHY_GROWWISE_SECTIONS,
} from '@/data/resources/why-growwise-copy'
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const bodyClass = 'text-base leading-relaxed text-slate-700 sm:text-lg'

export function WhyGrowWisePage() {
  const locale = useLocale()
  const selfCheckHref = publicPath('/self-check', locale)
  const defaultOpenFaqs = getDefaultOpenFaqValues(WHY_GROWWISE_FAQS.length, (idx) => `why-growwise-faq-${idx}`)

  return (
    <main data-why-growwise className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20" aria-labelledby="why-growwise-hero-title">
        <div className="mx-auto max-w-[1100px] px-5 md:px-12">
          <h1
            id="why-growwise-hero-title"
            className="font-heading text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-[2.5rem]"
          >
            {WHY_GROWWISE_HERO.h1}
          </h1>
          <p className={cn(bodyClass, 'mt-6 text-lg font-medium text-slate-800')}>
            {WHY_GROWWISE_HERO.opening}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="border-b border-slate-200 py-14 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-12">
          {/* Sections */}
          {WHY_GROWWISE_SECTIONS.map((section, idx) => (
            <div key={idx} className={idx > 0 ? 'mt-12' : ''}>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#1F396D] md:text-3xl mb-4">
                {section.h2}
              </h2>
              <div className="space-y-4">
                {Array.isArray(section.body) ? (
                  section.body.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className={bodyClass}
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/^- /gm, ''),
                      }}
                    />
                  ))
                ) : (
                  <p className={bodyClass}>{section.body}</p>
                )}
              </div>
            </div>
          ))}

          {/* Comparison Table */}
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#1F396D] md:text-3xl mb-6">
              The difference parents notice first
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="bg-slate-100 px-4 py-3 text-left text-sm font-bold text-slate-900">
                      &nbsp;
                    </th>
                    <th className="bg-slate-100 px-4 py-3 text-left text-sm font-bold text-slate-900">
                      Worksheet-Based Programs
                    </th>
                    <th className="bg-slate-100 px-4 py-3 text-left text-sm font-bold text-slate-900">
                      Drop-In Tutoring Centers
                    </th>
                    <th className="bg-[#1D9E75]/10 px-4 py-3 text-left text-sm font-bold text-[#1D9E75]">
                      GrowWise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {WHY_GROWWISE_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900">
                        {row.label}
                      </td>
                      <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-700">
                        {row.worksheetPrograms}
                      </td>
                      <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-700">
                        {row.dropInCenters}
                      </td>
                      <td className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-[#1D9E75]">
                        {row.growwise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#1F396D] md:text-3xl mb-6">
              Common questions about GrowWise programs
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {WHY_GROWWISE_FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`why-growwise-faq-${idx}`}
                  className="border border-slate-200 bg-white"
                  defaultOpen={defaultOpenFaqs.includes(`why-growwise-faq-${idx}`)}
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <span className="text-left font-semibold text-slate-900 text-lg">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-slate-200 px-4 py-4 text-slate-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </article>

      {/* CTA Block */}
      <section className="bg-[#1F396D] py-16 md:py-20" aria-labelledby="why-growwise-cta-heading">
        <div className="mx-auto max-w-[800px] px-5 text-center md:px-12">
          <h2
            id="why-growwise-cta-heading"
            className="font-heading text-2xl font-bold text-white md:text-3xl"
          >
            {WHY_GROWWISE_CTA.h2}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200 sm:text-base">{WHY_GROWWISE_CTA.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={selfCheckHref}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#F16112] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d54f0a]"
            >
              {WHY_GROWWISE_CTA.buttonLabel1}
            </Link>
            <BookAssessmentLink
              location="why-growwise-cta"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {WHY_GROWWISE_CTA.buttonLabel2}
            </BookAssessmentLink>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <ResourceBulletinCta />
    </main>
  )
}
