import Link from 'next/link'
import { ArrowLeft, PenLine, UploadCloud } from 'lucide-react'

export default function CreativeWritingPage() {
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
            <p className="text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Creative writing</p>
            <h1 className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">
              Short Stories & Creative Writing
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              Short stories, personal narratives, creative scenes, and polished drafts from GrowWise writing students.
            </p>
            <Link href="/resources/student-corner/submit" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#F16112] px-5 text-sm font-bold text-white hover:bg-[#d54f0a]">
              <UploadCloud className="mr-2 h-4 w-4" aria-hidden />
              Submit creative writing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D] text-white">
              <PenLine className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-heading mt-5 text-2xl font-bold text-[#1F396D]">Creative pieces will appear here</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Approved short stories, personal narratives, and creative scenes will be added to this section.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
