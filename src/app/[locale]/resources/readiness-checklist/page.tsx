import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'
import { ReadinessChecklistClient } from '@/components/ReadinessChecklistClient'
import { siteGoogleTrustReviewCards } from '@/lib/siteGoogleTrustReviews'

const FAQ_ITEMS = [
  {
    q: 'Is this checklist a diagnosis?',
    a: 'No. It is a pattern-finding tool. Only a qualified educator can assess the depth of an academic gap. This checklist helps you decide whether a more structured academic review is worth pursuing.',
  },
  {
    q: "My child's grades are fine. Should I still use this?",
    a: 'Yes. Grades in elementary and middle school often mask gaps — teachers provide scaffolding, tests are re-taken, and partial credit softens low scores. The checklist looks at patterns, not report cards.',
  },
  {
    q: 'What does GrowWise do with the gaps identified?',
    a: 'This checklist groups repeated signs by learning area so families, schools, aftercare programs, and support providers can discuss the pattern more clearly.',
  },
  {
    q: 'How were the score thresholds chosen?',
    a: 'The thresholds are inspired by MTSS/RtI pattern-based screening logic: one concern by itself does not define readiness, but repeated signs across learning areas may indicate a pattern worth discussing. This checklist is parent-facing and non-diagnostic.',
  },
  {
    q: 'What grades does GrowWise serve?',
    a: 'GrowWise serves grades 1–12 across Dublin, Pleasanton, San Ramon, Livermore, and the broader Tri-Valley area.',
  },
  {
    q: 'How do I take the next step?',
    a: 'Use the patterns you identify to decide whether to monitor, share observations with a teacher, or pursue a structured academic review.',
  },
]

export default function ReadinessChecklistPage() {
  const googleReviews = siteGoogleTrustReviewCards().slice(0, 3)

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-[#1E3A5F] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_24px)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-100 ring-1 ring-white/15">
              Free readiness checklist
            </p>
            <h1 className="font-heading text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Find the academic gaps grades don’t always show.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-50">
              Most gaps don&apos;t show up as failed tests. They show up as repeated mistakes, long homework sessions, and avoidance. This checklist finds the pattern.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#checklist-start"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F97316] px-7 py-3 text-sm font-black text-white shadow-lg shadow-orange-950/20 transition-colors hover:bg-orange-500"
              >
                Start Free Checklist
              </a>
              <a
                href="#how-results-work"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-7 py-3 text-sm font-black text-white transition-colors hover:bg-white/10"
              >
                How It Works
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-blue-100">
              Free · No signup · Useful for families, schools, and aftercare programs
            </p>
            <p className="mt-2 text-sm text-white/75">
              Grades 1–12 · Math, reading, writing, and readiness
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ['3 minutes', 'Quick parent-friendly scan'],
            ['Grade-aware', 'Only relevant sections count toward the score'],
            ['5 areas', 'Pattern summary by learning area'],
          ].map(([stat, label]) => (
            <div key={stat} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-black text-[#1E3A5F]">{stat}</p>
              <p className="mt-1 text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-12">
          <section id="how-results-work" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Before you start
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Check what you actually see at home.
            </h2>
            <div className="mt-4 grid gap-4 text-sm leading-relaxed text-slate-700 sm:grid-cols-2">
              <p>
                This is a <strong>pattern finder</strong>, not a diagnosis. Check every sign that applies to the student. The score helps you decide whether to monitor, act early, or request a structured academic review.
              </p>
              <p>
                No email is required. Your score is calculated in your browser, so families, schools, aftercare teams, and support providers can use the checklist as a neutral observation tool.
              </p>
            </div>
            <p className="mt-5 rounded-lg border-l-4 border-[#F97316] bg-[#FFF7ED] px-4 py-3 text-sm font-semibold leading-relaxed text-slate-800">
              Inspired by MTSS/RtI pattern-based screening logic: one concern is not a diagnosis; repeated signs across learning areas may be a reason to consider a deeper academic review.
            </p>
          </section>

          <ReadinessChecklistClient />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Report
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Export the detailed interpretation when you finish.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
              The on-page checklist keeps the scoring simple. Once you have checked the signs that apply,
              use the export button in the result box to generate a print/PDF-ready report with the detailed
              section interpretation.
            </p>
          </section>

          <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
                What happens next
              </p>
              <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
                Turn the pattern into a practical next-step discussion.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Use the section scores to guide a conversation with a teacher, program lead, or academic support provider. The checklist is designed to clarify where repeated signs are showing up before choosing a next step.
              </p>
            </div>
            <div className="rounded-xl bg-[#EFF6FF] p-5">
              <ul className="space-y-3 text-sm text-slate-700">
                <li><strong>Export the report</strong> after checking every relevant sign</li>
                <li><strong>Review patterns</strong> across math, reading, writing, and readiness</li>
                <li><strong>Share observations</strong> with the adults supporting the student</li>
                <li><strong>Choose a next step</strong> based on repeated signs, not one bad day</li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-yellow-500" aria-label="5 star rating">★★★★★</p>
                <h2 className="mt-2 font-heading text-2xl font-black text-[#1E3A5F]">
                  Trusted by Dublin & Tri-Valley families since 2024.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Families come to GrowWise when homework patterns, repeated mistakes, or confidence drops suggest something deeper than a bad week.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              Google reviews
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Parents trust GrowWise when they need a clear academic plan.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {googleReviews.map((review) => (
                <article key={`${review.name}-${review.content.slice(0, 16)}`} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[#F97316]" aria-label="5 star Google review">★★★★★</p>
                  <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-slate-700">
                    &quot;{review.content}&quot;
                  </p>
                  <p className="mt-4 text-sm font-black text-slate-950">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Common questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200">
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-black text-slate-900">
                    {item.q}
                    <span className="text-[#F97316] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <ComplianceDisclaimer />
        </div>
      </div>
    </main>
  )
}
