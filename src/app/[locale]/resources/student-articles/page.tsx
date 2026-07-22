import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'

const articles = [
  {
    title: 'How Recycling Helps The Environment',
    author: 'Aaran Karthik',
    description:
      'A student article about how small actions can reduce waste and protect natural resources.',
    image: '/images/resources/student-recycling-infographic.webp',
    imageAlt: 'Recycling infographic showing environmental benefits and recyclable materials',
    href: '/resources/student-articles/how-recycling-helps-the-environment',
  },
  {
    title: 'Books Beyond Personality',
    author: 'Aaran Karthik',
    description:
      'A student article about how reading books can shape personality, confidence, knowledge, and worldview.',
    image: '/images/resources/student-books-shape-personality.webp',
    imageAlt: 'Hand-drawn illustrations showing how books shape personality and personal growth',
    href: '/resources/student-articles/books-beyond-personality',
  },
] as const

export default function StudentArticlesPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/resources/student-corner"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-[#1F396D] transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Student Corner
          </Link>
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Student articles</p>
            <h1 className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">
              Published Student Articles
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              Opinion pieces, research reflections, explainers, and student perspectives from GrowWise students.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-label="Published student articles">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6">
          {articles.map((article) => (
            <article key={article.href} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={article.image}
                alt={article.imageAlt}
                width={1536}
                height={1024}
                className="aspect-[16/9] w-full border-b border-slate-200 object-cover"
              />
              <div className="p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D] text-white shadow-sm">
                  <BookOpen className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="font-heading mt-5 text-2xl font-bold text-[#1F396D]">{article.title}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">By {article.author}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{article.description}</p>
                <Link
                  href={article.href}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#1F396D] px-5 text-sm font-bold text-white transition-colors hover:bg-[#172b52]"
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
