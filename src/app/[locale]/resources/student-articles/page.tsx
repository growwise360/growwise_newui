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
        <div className="mx-auto max-w-5xl space-y-5 px-4 sm:px-6">
          {articles.map((article) => (
            <article
              key={article.href}
              className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[minmax(220px,36%)_1fr]"
            >
              <Link
                href={article.href}
                className="flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-50 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1F396D] sm:aspect-auto sm:min-h-56 sm:border-b-0 sm:border-r"
                aria-label={`Read ${article.title}`}
              >
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  width={1536}
                  height={1024}
                  className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="flex min-w-0 flex-col p-5 sm:p-6">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F16112]">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  Student Article
                </span>
                <h2 className="font-heading mt-2 text-xl font-bold leading-tight text-[#1F396D] sm:text-2xl">
                  <Link
                    href={article.href}
                    className="rounded-sm transition-colors group-hover:text-[#F16112] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">By {article.author}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{article.description}</p>
                <Link
                  href={article.href}
                  className="mt-4 inline-flex min-h-[44px] w-fit items-center text-sm font-bold text-[#1F396D] transition-colors hover:text-[#F16112] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
                >
                  Read article
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
