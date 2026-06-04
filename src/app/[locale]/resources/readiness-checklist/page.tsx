import { ReadinessChecklistClient } from '@/components/ReadinessChecklistClient'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'

const FAQ_ITEMS = [
  {
    q: 'Is this checklist a diagnosis?',
    a: 'No. This is a pattern-finding educational tool only. It is not a clinical or educational diagnosis. Consult a school psychologist or clinician for formal evaluation.',
  },
  {
    q: "My child's grades are fine. Should I still use this?",
    a: 'Yes. Grades in elementary and middle school often mask gaps — teachers provide scaffolding, tests are re-taken, and partial credit softens low scores. This checklist looks at patterns, not report cards.',
  },
  {
    q: 'Is my child\'s data safe?',
    a: 'Yes. Data is not collected on this checklist page. Your score is calculated in your browser. Email is only captured if you choose to contact us and is encrypted in transit and at rest.',
  },
  {
    q: 'What should I do if I\'m concerned about a learning disability?',
    a: 'Contact your school psychologist or pediatrician. They can conduct formal evaluation. This checklist is a first step, not a replacement for professional assessment.',
  },
]

export default function ReadinessChecklistPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-slate-200/80 bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F97316] sm:text-sm">Free Parent Resource</p>
          <h1 className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1E3A5F] sm:text-4xl md:text-5xl">
            Help Your Child Succeed This Year
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            A quick checklist to identify academic gaps before they compound. Created by educators, for parents.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
            Takes 3 minutes. Free. No signup required.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-12">

        {/* Introduction */}
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <h2 className="font-heading text-2xl font-bold text-[#1E3A5F] mb-4">
            What This Checklist Does
          </h2>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Most academic gaps don't appear as failed tests. They show up as repeated mistakes,
            long homework sessions, vague answers, and avoidance. By the time grades drop,
            the pattern has been building for months.
          </p>
          <p className="text-slate-700 leading-relaxed">
            This checklist is a <strong>pattern finder</strong> — not a diagnosis.
            Check every sign that applies to your child. Use your score to decide
            whether to act now or monitor at the next grade transition.
          </p>
        </div>

        {/* Checklist Client Component */}
        <ReadinessChecklistClient />

        {/* Interpretation Guide */}
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <h2 className="font-heading text-2xl font-bold text-[#1E3A5F] mb-6">
            How to Read Your Results
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-[#1E3A5F] mb-2">0–2 Signs: Strong Foundation</p>
              <p className="text-slate-700 text-sm">
                Monitor at grade transitions — particularly at 5th → middle school
                and 8th → high school. Early detection prevents gaps from compounding.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1E3A5F] mb-2">3–5 Signs: Early Action Recommended</p>
              <p className="text-slate-700 text-sm">
                Gaps are present. Early correction is faster and less disruptive than waiting
                for grades to drop. A structured check now saves significant time later.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1E3A5F] mb-2">6+ Signs: Clear Pattern Emerged</p>
              <p className="text-slate-700 text-sm">
                A pattern has emerged. Gaps at this level typically compound — each layer builds
                on the one below. Targeted gap-closing, not more practice of the same material,
                is what corrects this.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <h2 className="font-heading text-2xl font-bold text-[#1E3A5F] mb-6">
            Common Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-slate-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-slate-700 text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Disclaimer */}
        <ComplianceDisclaimer />

        </div>
      </div>
    </main>
  )
}
