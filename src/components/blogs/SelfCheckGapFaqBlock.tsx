import Link from 'next/link'
import type { SelfCheckGapFaq } from '@/lib/selfCheckGapFaqs'
import { DETECTIVE_CHALLENGE_OPTIONS, DETECTIVE_CHALLENGE_SUMMARIES } from '@/lib/selfCheckGapFaqs'
import { publicPath } from '@/lib/publicPath'

type Props = {
  faq: SelfCheckGapFaq
  locale: string
  showSelfCheckCta?: boolean
}

function MultilineText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split('\n').map((line, i) => (
        <p key={i} className={i > 0 ? 'mt-2' : undefined}>
          {line}
        </p>
      ))}
    </div>
  )
}

export function SelfCheckGapFaqBlock({ faq, locale, showSelfCheckCta = true }: Props) {
  const selfCheckHref = `${publicPath('/self-check', locale)}#self-check-form`

  return (
    <section
      className="not-prose my-10 rounded-xl border border-[#1F396D]/15 bg-gray-50/80 overflow-hidden"
      aria-labelledby={`gap-faq-${faq.id}`}
    >
      <div className="bg-[#1F396D] px-5 py-3">
        <h3 id={`gap-faq-${faq.id}`} className="text-lg font-bold text-white leading-snug">
          {faq.label}
        </h3>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1F396D] mb-2">
            What this actually means
          </p>
          <MultilineText text={faq.whatItMeans} className="text-sm text-gray-700 leading-relaxed" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1F396D] mb-2">
            Ask your child
          </p>
          <MultilineText
            text={faq.askYourChild}
            className="text-sm text-gray-800 leading-relaxed font-medium bg-white rounded-lg border border-gray-200 p-4"
          />
        </div>

        <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-4">
          <p className="text-xs font-semibold text-green-800 mb-2">Correct thinking</p>
          <MultilineText text={faq.correct} className="text-sm text-gray-800 leading-relaxed" />
        </div>

        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="text-xs font-semibold text-red-800 mb-2">Red flag answer</p>
          <MultilineText text={faq.redFlag} className="text-sm text-gray-800 leading-relaxed" />
        </div>

        {faq.followUp ? (
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <p className="text-xs font-semibold text-[#1F396D] mb-2">Follow-up check</p>
            <MultilineText text={faq.followUp} className="text-sm text-gray-700 leading-relaxed" />
          </div>
        ) : null}

        {faq.slipVsBugTest ? (
          <p className="text-sm text-gray-600 italic border-t border-gray-200 pt-4">{faq.slipVsBugTest}</p>
        ) : null}

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F16112] mb-2">
            What happens downstream
          </p>
          <MultilineText text={faq.downstream} className="text-sm text-gray-700 leading-relaxed" />
        </div>

        {showSelfCheckCta ? (
          <p className="text-sm text-gray-600 pt-2 border-t border-gray-200">
            On the free{' '}
            <Link href={selfCheckHref} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
              math self-check
            </Link>
            , select: <span className="font-medium text-[#1F396D]">{faq.label}</span>
          </p>
        ) : null}
      </div>
    </section>
  )
}

type DetectiveListProps = {
  locale: string
}

export function DetectiveChallengeList({ locale }: DetectiveListProps) {
  return (
    <div className="not-prose my-8 rounded-xl border border-[#1F396D]/10 bg-white p-5 md:p-6">
      <h3 className="text-lg font-bold text-[#1F396D] mb-2">Same labels as our Detective Challenge</h3>
      <p className="text-sm text-gray-600 mb-4">
        The free self-check uses these exact options. Pick what sounds like your child, then compare to the
        quiz result.
      </p>
      <ul className="space-y-3">
        {DETECTIVE_CHALLENGE_OPTIONS.map(({ value, label }) => (
          <li key={value} className="text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <span className="font-semibold text-[#1F396D]">{label}</span>
            <span className="text-gray-600"> — {DETECTIVE_CHALLENGE_SUMMARIES[value]}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link
          href={`${publicPath('/self-check', locale)}#self-check-form`}
          className="text-[#F16112] font-semibold underline hover:text-[#1F396D]"
        >
          Start the free self-check →
        </Link>
      </p>
    </div>
  )
}
