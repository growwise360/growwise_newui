import Link from 'next/link'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'
import { ReadinessChecklistClient } from '@/components/ReadinessChecklistClient'
import { siteGoogleTrustReviewCards } from '@/lib/siteGoogleTrustReviews'

const FAQ_ITEMS = [
  {
    q: 'Is this checklist a diagnosis?',
    a: 'No. It is a pattern-finding tool. Only a qualified educator can assess the depth of an academic gap. This checklist helps you decide whether a more structured assessment is worth pursuing.',
  },
  {
    q: "My child's grades are fine. Should I still use this?",
    a: 'Yes. Grades in elementary and middle school often mask gaps — teachers provide scaffolding, tests are re-taken, and partial credit softens low scores. The checklist looks at patterns, not report cards.',
  },
  {
    q: 'What does GrowWise do with the gaps identified?',
    a: 'GrowWise runs a diagnostic session to pinpoint the specific missing concepts, then builds a structured practice plan that targets those gaps directly rather than re-teaching everything.',
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
    a: 'Call or text (925) 456-4606 to book a free academic gap assessment. GrowWise is located at 4564 Dublin Blvd, Dublin, CA.',
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
              Free parent checklist · Dublin CA
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
                See Score Guide
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-blue-100">
              Free · No signup · Used by Dublin & Tri-Valley families
            </p>
            <p className="mt-2 text-sm text-white/75">
              Serving Dublin families since 2024 · Grades 1–12
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ['3 minutes', 'Quick parent-friendly scan'],
            ['34 signs', 'Math, reading, writing, and readiness'],
            ['45 minutes', 'Free assessment if a pattern emerges'],
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
                This is a <strong>pattern finder</strong>, not a diagnosis. Check every sign that applies to your child. The score helps you decide whether to monitor, act early, or book a structured assessment.
              </p>
              <p>
                No email is required. Your score is calculated in your browser. If you choose to book, GrowWise uses the result only to understand the pattern before the free assessment.
              </p>
            </div>
          </section>

          <ReadinessChecklistClient />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
              How to read your results
            </p>
            <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
              Use the score as a decision guide.
            </h2>
            <p className="mt-4 max-w-4xl rounded-lg border-l-4 border-[#F97316] bg-[#FFF7ED] px-4 py-3 text-sm font-semibold leading-relaxed text-slate-800">
              Inspired by MTSS/RtI pattern-based screening logic: one concern is not a diagnosis; repeated signs across learning areas may be a reason to schedule a deeper academic assessment.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-2xl font-black text-[#1E3A5F]">0–2</p>
                <h3 className="mt-2 font-black text-slate-900">Strong foundation</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Monitor at grade transitions — particularly at 5th grade entry into middle school and 8th grade entry into high school math.
                </p>
              </div>
              <div className="rounded-xl border border-[#F97316]/30 bg-[#FFF7ED] p-5">
                <p className="text-2xl font-black text-[#F97316]">3–5</p>
                <h3 className="mt-2 font-black text-slate-900">Early action recommended</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Gaps are present. Early correction is faster and less disruptive than waiting for grades to drop. The result also highlights which section is most concentrated.
                </p>
              </div>
              <div className="rounded-xl border border-[#F97316] bg-[#F97316] p-5 text-white">
                <p className="text-2xl font-black">6+</p>
                <h3 className="mt-2 font-black">Clear pattern emerged</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  A clear pattern has emerged. At 10+ signs, the assessment CTA becomes more urgent because the pattern is likely spread across multiple skills.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F97316]">
                What happens next
              </p>
              <h2 className="font-heading text-2xl font-black text-[#1E3A5F]">
                The free assessment turns the pattern into a plan.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                A GrowWise educator checks the specific concepts behind the pattern, explains what is missing, and recommends whether your child needs support now or simply monitoring.
              </p>
            </div>
            <div className="rounded-xl bg-[#EFF6FF] p-5">
              <ul className="space-y-3 text-sm text-slate-700">
                <li><strong>45 minutes</strong> with no commitment required</li>
                <li><strong>Grades 1–12</strong> math and English readiness</li>
                <li><strong>Dublin center</strong> at 4564 Dublin Blvd</li>
                <li><strong>Parent takeaway</strong>: the next-step plan</li>
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
              <Link
                href="/book-assessment?source=readiness-checklist-social-proof"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#1E3A5F] px-6 py-3 text-sm font-black text-white hover:bg-[#142b45]"
              >
                Book Free Assessment
              </Link>
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

          <section className="rounded-2xl bg-[#1E3A5F] p-7 text-center text-white shadow-sm sm:p-10">
            <h2 className="font-heading text-3xl font-black">
              Know what’s wrong. Now get a plan to fix it.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-50 sm:text-base">
              Book a free 45-minute academic gap assessment. No commitment required.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book-assessment?source=readiness-checklist-final"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F97316] px-7 py-3 text-sm font-black text-white hover:bg-orange-500"
              >
                Book Free Assessment
              </Link>
              <a
                href="tel:9254564606"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 px-7 py-3 text-sm font-black text-white hover:bg-white/10"
              >
                Call (925) 456-4606
              </a>
            </div>
            <p className="mt-4 text-xs text-white/70">
              4564 Dublin Blvd, Dublin, CA
            </p>
          </section>

          <ComplianceDisclaimer />
        </div>
      </div>
    </main>
  )
}
