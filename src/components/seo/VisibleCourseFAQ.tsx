'use client'

import { HelpCircle } from 'lucide-react'
import type { FAQItem } from '@/components/schema/FAQSchema'

type VisibleCourseFAQProps = {
  faqs: FAQItem[]
  title?: string
  subtitle?: string
  className?: string
}

/** Fully visible FAQs for AEO — all answers in DOM on load (no accordion). */
export function VisibleCourseFAQ({
  faqs,
  title = 'Frequently asked questions',
  subtitle,
  className = '',
}: VisibleCourseFAQProps) {
  if (!faqs?.length) return null

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle ? <p className="text-lg text-gray-600">{subtitle}</p> : null}
        </div>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <article key={faq.question} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-[#F16112]/10 rounded-lg flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4 text-[#F16112]" aria-hidden />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed pl-11">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
