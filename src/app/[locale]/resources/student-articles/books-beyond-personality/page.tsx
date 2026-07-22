import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const paragraphs = [
  '“A book made me zero to hero”, many leaders state. Reading books is the magical power that shapes your personality. Books are the key to opening up new pathways.',
  'When I was 9, I went to a leadership conference with my dad. In that conference, they talked about leadership books and how it made them grow into their lives. I wondered, does this apply to all books? Surprisingly, yes! Let me share some examples. Take Hello Universe, it morally teaches you to explore the world and overcome your fears. This opens up a confidence personality pathway. Another example may be textbooks, teaching you fundamental skills for the future, opening up a wise personality and making you more knowledgeable, helping with struggles and decisions later in life.',
  'Well, how does this personality change happen? Is it rocket science? No, It’s simply common understanding. The more you read a genre, the more the concept gets into your head. The concept slowly makes space for itself in your head gradually fixing itself in.',
  'Ultimately, books do more than just entertain us—they shape who we become. Every story we read leaves a lasting mark on our personality and worldview.',
] as const

export default function BooksBeyondPersonalityPage() {
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
            Books Beyond Personality
          </h1>
          <p className="mt-3 font-heading text-xl font-bold italic text-slate-900">By Aaran Karthik</p>
        </header>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-slate-950">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <Image
            src="/images/resources/student-books-shape-personality.webp"
            alt="Two hand-drawn illustrations showing how reading builds confidence, wisdom, knowledge, courage, leadership, and new ideas"
            width={1559}
            height={1009}
            className="h-auto w-full"
          />
        </figure>
      </article>
    </main>
  )
}
