import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Eye, LockKeyhole, MailCheck } from 'lucide-react'

import { StudentWorkSubmissionForm } from '@/components/resources/StudentWorkSubmissionForm'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Submit Student Writing for Review | GrowWise',
    description: 'Securely submit a student article or short story for private GrowWise review and possible Student Corner publication.',
    alternates: { canonical: absoluteSiteUrl('/resources/student-corner/submit', locale, getCanonicalSiteUrl()) },
  }
}

export default function StudentCornerSubmitPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link href="/resources/student-corner" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-[#1F396D] hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Student Corner
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Student submission</p>
          <h1 className="font-heading mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">Share your article or story</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            Upload your writing for private GrowWise review. Your work will not appear publicly until it is reviewed and publication permission is confirmed.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:py-16">
        <aside>
          <h2 className="text-2xl font-bold text-slate-950">What happens next?</h2>
          <div className="mt-6 space-y-4">
            {[
              { icon: LockKeyhole, title: 'Private upload', text: 'Your file is stored privately and is not added to the public Student Corner.' },
              { icon: MailCheck, title: 'Reviewer notified', text: 'GrowWise receives an email with a secure, time-limited review link.' },
              { icon: Eye, title: 'Manual review', text: 'We check quality, originality, privacy, formatting, and parent permission before publication.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1F396D]/10 text-[#1F396D]"><Icon className="h-5 w-5" aria-hidden /></span>
                <div><h3 className="font-bold text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        </aside>
        <StudentWorkSubmissionForm />
      </section>
    </main>
  )
}
