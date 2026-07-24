import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import StudentArticleRating from '@/components/resources/StudentArticleRating'

const paragraphs = [
  'As Pam Shoemaker said, "When you put the whole picture together, recycling is the right thing to do." Recycling turns waste into resources, and problems into solutions. Recycling is a powerful tool for reducing waste, saving natural resources, and helping the environment.',
  'First, imagine the world without recycling. Pollution, water contamination, and power cuts across the world. Now, if recycling was practiced across the world, now how does it look? Greener, cleaner water, saving energy. However, there is a limit to which materials can go through this process. Some include plastic, paper, cardboard, Aluminum, and glass jars.',
  "Now let's get into the effects. Recycling drastically decreases trash by diverting the materials(said above) away from landfills and back into the manufacturing process. By updating the 45 yrs system, we can also diminish the energy consumption and pollution by limiting the use of incinerators and eliminating greenhouse gas emissions.",
  'Recycling being such a small action, placing plastics and paper in the right bin saves billions of resources each year. If we want a greener future tomorrow, this is our solution.',
] as const

export default function HowRecyclingHelpsTheEnvironmentPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/resources/student-articles"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-[#1F396D] transition-colors hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Student Articles
        </Link>

        <header className="mt-8 border-b border-slate-200 pb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Student Article</p>
          <h1 className="font-heading mt-3 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            How Recycling Helps The Environment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-bold leading-snug text-slate-900">
            A Simple Look At How Small Actions Can Reduce Waste And Protect Natural Resources
          </p>
          <p className="mt-3 font-heading text-xl font-bold text-slate-900">By Aaran Karthik</p>
        </header>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-slate-950">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <StudentArticleRating slug="how-recycling-helps-the-environment" />
      </article>
    </main>
  )
}
