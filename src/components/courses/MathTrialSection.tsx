'use client'

import { CheckCircle } from 'lucide-react'
import type { MathTrialBandConfig } from '@/lib/math-program-trial-copy'
import ProgramRecommendationButton from '@/components/ProgramRecommendationButton'

type MathTrialSectionProps = {
  config: MathTrialBandConfig
  locale: string
  className?: string
}

export function MathTrialSection({
  config,
  className = 'bg-[#ebebeb] py-16 lg:py-20',
}: MathTrialSectionProps) {
  const subject = config.sessionTitle.includes('English') ? 'English' : 'Math'
  const gradeBand = config.gradeLabel.includes('1–5') ? 'K-5' : config.gradeLabel.includes('6–8') ? '6-8' : '9-12'
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
            <div className="shrink-0 text-left sm:text-right">
              <p className="text-base font-bold text-[#1F396D]">Personalized program fit</p>
              <p className="mt-0.5 text-xs font-semibold text-green-600">Current pricing shared before enrollment</p>
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
            Tell us the grade and subject first. We&apos;ll recommend the right starting point and send current pricing—no commitment.
          </p>
          {config.extraNote ? (
            <p className="text-sm text-green-700 font-medium mb-6">{config.extraNote}</p>
          ) : null}

          <ProgramRecommendationButton sourcePage={`trial-${subject.toLowerCase()}-${gradeBand}`} defaultSubject={subject} defaultGradeBand={gradeBand} />
          <p className="text-xs text-gray-400 mt-4">A free assessment is available after we identify the most relevant program.</p>
        </div>
      </div>
    </section>
  )
}
