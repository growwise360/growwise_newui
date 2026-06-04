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

export default async function ReadinessChecklistPage() {
  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F3D22] to-[#1A6B3C] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-5xl leading-tight mb-4">
            Help Your Child Succeed This Year
          </h1>
          <p className="text-xl text-white/80 mb-6">
            A quick checklist to identify academic gaps before they compound.
            Created by educators, for parents.
          </p>
          <p className="text-sm text-white/60">
            Takes 3 minutes. Free. No signup required.
          </p>

          {/* Transparency about tool */}
          <p className="text-xs text-white/50 mt-6 border-t border-white/20 pt-4">
            This is a pattern-finding tool, not a clinical diagnosis.
            <br />
            For concerns, consult your school or pediatrician.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">

        {/* Introduction */}
        <div className="bg-white rounded-xl border border-[#D8E8E0] p-8">
          <h2 className="font-serif text-2xl text-[#0F3D22] mb-4">
            What This Checklist Does
          </h2>
          <p className="text-[#5A6472] mb-4 leading-relaxed">
            Most academic gaps don't appear as failed tests. They show up as repeated mistakes,
            long homework sessions, vague answers, and avoidance. By the time grades drop,
            the pattern has been building for months.
          </p>
          <p className="text-[#5A6472] leading-relaxed">
            This checklist is a <strong>pattern finder</strong> — not a diagnosis.
            Check every sign that applies to your child. Use your score to decide
            whether to act now or monitor at the next grade transition.
          </p>
        </div>

        {/* Checklist Client Component */}
        <ReadinessChecklistClient />

        {/* Interpretation Guide */}
        <div className="bg-white rounded-xl border border-[#D8E8E0] p-8">
          <h2 className="font-serif text-2xl text-[#0F3D22] mb-6">
            How to Read Your Results
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-[#1A6B3C] mb-2">0–2 Signs: Strong Foundation</p>
              <p className="text-[#5A6472] text-sm">
                Monitor at grade transitions — particularly at 5th → middle school
                and 8th → high school. Early detection prevents gaps from compounding.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1A6B3C] mb-2">3–5 Signs: Early Action Recommended</p>
              <p className="text-[#5A6472] text-sm">
                Gaps are present. Early correction is faster and less disruptive than waiting
                for grades to drop. A structured check now saves significant time later.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1A6B3C] mb-2">6+ Signs: Clear Pattern Emerged</p>
              <p className="text-[#5A6472] text-sm">
                A pattern has emerged. Gaps at this level typically compound — each layer builds
                on the one below. Targeted gap-closing, not more practice of the same material,
                is what corrects this.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-[#D8E8E0] p-8">
          <h2 className="font-serif text-2xl text-[#0F3D22] mb-6">
            Common Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-[#1A1A1A] mb-2">
                  {item.q}
                </h3>
                <p className="text-[#5A6472] text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Disclaimer */}
        <ComplianceDisclaimer />

        {/* Footer Info */}
        <div className="border-t border-[#D8E8E0] pt-8 text-center text-xs text-[#5A6472]">
          <p className="mb-3">
            © GrowWise School · 4564 Dublin Blvd, Dublin, CA 94568
          </p>
          <p>
            <a href="tel:9254564606" className="hover:text-[#0F3D22]">
              (925) 456-4606
            </a>
            {' '}· {' '}
            <a href="https://growwiseschool.org" className="hover:text-[#0F3D22]">
              growwiseschool.org
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
