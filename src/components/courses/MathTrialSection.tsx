'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import type { MathTrialBandConfig } from '@/lib/math-program-trial-copy'
import { publicPath } from '@/lib/publicPath'

type MathTrialSectionProps = {
  config: MathTrialBandConfig
  locale: string
  className?: string
}

export function MathTrialSection({
  config,
  locale,
  className = 'bg-[#ebebeb] py-16 lg:py-20',
}: MathTrialSectionProps) {
  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
          Try before you commit
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-5">{config.introHeading}</h2>
        <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl">{config.introBody}</p>

        <div className="rounded-xl border-2 border-[#1F396D]/20 bg-white p-6 lg:p-8 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="font-bold text-gray-800 text-lg mb-1">{config.sessionTitle}</p>
              <p className="text-gray-500 text-sm">{config.durationLabel}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-bold text-[#1F396D]">$45</p>
              <p className="text-xs text-green-600 font-semibold mt-0.5">
                Fee fully waived when you enroll within 7 days.
              </p>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-700 mb-3">What happens in the trial:</p>
          <ul className="space-y-2 mb-6">
            {config.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 mt-0.5 text-[#1F396D] shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-sm text-gray-700 font-semibold mb-4 border-l-4 border-[#F16112] pl-4">
            {config.feeNote}
          </p>
          {config.extraNote ? (
            <p className="text-sm text-green-700 font-medium mb-6">{config.extraNote}</p>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={publicPath(config.enrollPath, locale)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] px-6 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
            >
              Book a trial session — $45
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={publicPath('/book-assessment', locale)}
              className="inline-flex items-center justify-center text-sm font-medium text-[#1F396D] hover:text-[#F16112] underline underline-offset-4 px-4 py-3 transition-colors"
            >
              Or start with the free 45-min assessment first
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">{config.footnote}</p>
        </div>
      </div>
    </section>
  )
}
