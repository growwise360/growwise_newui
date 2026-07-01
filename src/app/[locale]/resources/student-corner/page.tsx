import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, PenLine, Sparkles } from 'lucide-react'

const showcaseSections = [
  {
    id: 'student-articles',
    title: 'Published Student Articles',
    description:
      'Opinion pieces, research reflections, explainers, and student perspectives that show clear thinking and voice.',
    icon: BookOpen,
    examples: ['Research reflections', 'Opinion writing', 'Learning explainers'],
  },
  {
    id: 'short-stories',
    title: 'Short Stories & Creative Writing',
    description:
      'Narrative writing, character work, descriptive scenes, and polished drafts from GrowWise writing students.',
    icon: PenLine,
    examples: ['Short stories', 'Personal narratives', 'Creative scenes'],
  },
  {
    id: 'project-showcase',
    title: 'Projects & Portfolio Highlights',
    description:
      'Coding, AI, design, and problem-solving projects students can proudly point to as real work.',
    icon: Code2,
    examples: ['Coding projects', 'AI projects', 'Digital portfolios'],
  },
] as const

export default function StudentCornerPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20" aria-labelledby="student-corner-title">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Student Corner</p>
          <h1 id="student-corner-title" className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">
            A place to celebrate student voice and real work
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Student Corner will showcase articles, short stories, creative writing, coding projects, and portfolio work from GrowWise students.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="showcase-types">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Coming next</p>
            <h2 id="showcase-types" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
              Showcase sections we are preparing
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              This page is ready as the destination. As student pieces are approved, they can be added into the sections below.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {showcaseSections.map((section) => {
              const Icon = section.icon
              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm scroll-mt-32"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D] text-white shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-heading mt-5 text-xl font-bold text-[#1F396D]">{section.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.description}</p>
                  <ul className="mt-5 space-y-2">
                    {section.examples.map((example) => (
                      <li key={example} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Sparkles className="h-4 w-4 text-[#F16112]" aria-hidden />
                        {example}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#1F396D] py-14 sm:py-16" aria-labelledby="student-corner-cta">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="student-corner-cta" className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Want your child to build work worth showcasing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            GrowWise programs help students move from practice to polished work: writing, coding, AI, and academic projects with clear instructor feedback.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/book-assessment"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#F16112] px-6 text-sm font-bold text-white transition-colors hover:bg-[#d54f0a] sm:text-base"
            >
              Book an Assessment
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/resources"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/40 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:text-base"
            >
              Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
