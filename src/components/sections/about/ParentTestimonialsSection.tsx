'use client'

import Link from 'next/link'
import { Quote } from 'lucide-react'
import { useLocale } from 'next-intl'
import { FROM_NEXTDOOR_TESTIMONIALS } from '@/data/from-nextdoor-testimonials'
import { publicPath } from '@/lib/publicPath'

export function ParentTestimonialsSection() {
  const locale = useLocale()

  return (
    <section
      className="section-base section-gray py-16"
      aria-labelledby="parent-testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="center-text mb-12">
          <h2 id="parent-testimonials-title" className="title-section mb-4">
            What Dublin Parents Say
          </h2>
          <p className="subtitle-sm max-w-3xl mx-auto">
            Voices from our Nextdoor community and local families
          </p>
        </div>

        <ul className="grid list-none gap-4 p-0 md:grid-cols-2" role="list">
          {FROM_NEXTDOOR_TESTIMONIALS.map((review, index) => (
            <li
              key={`about-parent-review-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Quote className="h-5 w-5 text-amber-500/80" aria-hidden />
              <blockquote className="m-0 mt-3 border-0 p-0">
                <p className="text-sm leading-relaxed text-slate-800">&ldquo;{review.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-slate-700">
                  — {review.parentName}
                  {review.childContext ? (
                    <span className="mt-1 block text-xs font-medium text-slate-500">{review.childContext}</span>
                  ) : null}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <Link
            href={publicPath('/from-nextdoor', locale)}
            className="text-base font-semibold text-[#1F396D] underline-offset-4 hover:text-[#F16112] hover:underline"
          >
            Read more neighbor stories from Nextdoor →
          </Link>
        </p>
      </div>
    </section>
  )
}
