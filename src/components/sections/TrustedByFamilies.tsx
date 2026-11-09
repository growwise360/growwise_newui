import { BookOpen, ClipboardCheck, Layers3 } from 'lucide-react'

const learningFeatures = [
  { title: 'Assessment-led placement', description: 'Start by identifying the skill or mistake pattern that needs attention.', Icon: ClipboardCheck },
  { title: 'Subject-specific pathways', description: 'Choose Math, English, or a confirmed advanced course pathway.', Icon: BookOpen },
  { title: 'Progress parents can follow', description: 'Review learning goals and recommended next steps with GrowWise.', Icon: Layers3 },
]

export default function TrustedByFamilies() {
  return (
    <section className="px-4 py-16 lg:px-8" aria-labelledby="learning-approach-title">
      <div className="mx-auto max-w-6xl">
        <h2 id="learning-approach-title" className="text-center text-3xl font-bold text-[#1F396D]">A clear learning path for each student</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {learningFeatures.map(({ title, description, Icon }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <Icon className="mx-auto h-9 w-9 text-[#F16112]" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-[#1F396D]">{title}</h3>
              <p className="mt-2 leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
