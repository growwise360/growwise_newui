import { ReadinessChecklistClient } from '@/components/ReadinessChecklistClient'

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
    a: 'GrowWise runs a diagnostic session to pinpoint the specific missing concepts — not just the subject. Then a structured practice plan targets those gaps directly, rather than re-teaching everything.',
  },
  {
    q: 'What grades does GrowWise serve?',
    a: 'GrowWise serves grades 1–12 across Dublin, Pleasanton, San Ramon, Livermore, and the broader Tri-Valley area.',
  },
  {
    q: 'How do I take the next step?',
    a: 'Call or text (925) 456-4606 to book a free academic gap assessment. GrowWise will review the patterns from this checklist with you before the session.',
  },
]

export default async function ReadinessChecklistPage() {
  return (
    <main className="min-h-screen bg-[#FAFCFB] font-sans text-[#1A1A1A]">
      {/* Hero */}
      <section className="bg-[#0F3D22] text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-white/10 border border-white/20 text-white/85 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Free Resource — Dublin & Tri-Valley Families
          </div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Math & Reading Readiness Checklist for Parents
          </h1>
          <p className="text-lg text-white/75 mb-8">Find the real gaps before they compound. Grades 1–8. Takes 3 minutes.</p>
          <a
            href="/downloads/growwise-checklist.pdf"
            download
            className="inline-flex items-center gap-2 bg-white text-[#0F3D22] font-bold px-7 py-3 rounded-lg hover:shadow-lg transition-shadow"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
            Download Free PDF
          </a>
          <div className="text-xs text-white/50 mt-3">No signup required · Printable · Shareable</div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">
        {/* Intro */}
        <div className="bg-white border border-[#D8E8E0] rounded-xl p-8">
          <p className="text-[#5A6472] text-base leading-relaxed mb-3">
            Most academic gaps don't appear as failed tests. They show up as repeated mistakes, long homework sessions, vague answers, and avoidance. By the time grades drop, the pattern has been building for months.
          </p>
          <p className="text-[#5A6472] text-base leading-relaxed">
            This checklist is a <strong className="text-[#1A1A1A]">pattern finder</strong> — not a diagnosis. Check every sign that applies to your child. Use the score to decide whether to act now or monitor at the next grade transition.
          </p>
        </div>

        {/* Checklist (Client Component) */}
        <ReadinessChecklistClient />

        {/* Interpretation */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl text-[#0F3D22]">How to Read Your Results</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="font-bold text-[#1A6B3C] text-sm min-w-20">0–2 signs</span>
              <p className="text-[#5A6472] text-sm leading-relaxed">
                Strong foundation. Monitor at grade transitions — particularly at 5th grade entry into middle school and 8th grade entry into high school math.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-[#1A6B3C] text-sm min-w-20">3–5 signs</span>
              <p className="text-[#5A6472] text-sm leading-relaxed">
                Gaps are present. Early correction is faster and less disruptive than waiting for grades to drop. A structured check now saves significant time later.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-[#1A6B3C] text-sm min-w-20">6+ signs</span>
              <p className="text-[#5A6472] text-sm leading-relaxed">
                A clear pattern has emerged. Gaps at this level typically compound — each layer builds on the one below. Targeted gap-closing, not more practice of the same material, is what corrects this.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl text-[#0F3D22]">Common Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="border-b border-[#D8E8E0] pb-4 last:border-b-0">
                <h3 className="font-bold text-[#1A1A1A] text-sm mb-2">{item.q}</h3>
                <p className="text-[#5A6472] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#0F3D22] text-white rounded-xl p-10 text-center space-y-6">
          <h2 className="font-serif text-3xl">Book a Free Academic Gap Assessment</h2>
          <p className="text-white/70">We'll identify exactly where the gap is and what it would take to close it. No commitment required.</p>
          <a
            href="https://growwiseschool.org/contact"
            className="inline-block bg-white text-[#0F3D22] font-bold px-8 py-3 rounded-lg hover:shadow-lg transition-shadow"
          >
            Schedule Free Assessment →
          </a>
          <div className="text-xs text-white/50">4564 Dublin Blvd, Dublin, CA · (925) 456-4606 · growwiseschool.org</div>
        </div>
      </div>
    </main>
  )
}
