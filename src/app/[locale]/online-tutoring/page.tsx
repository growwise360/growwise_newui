import type { Metadata } from 'next'
import Link from 'next/link'
import OnlineCourseSelector from './OnlineCourseSelector'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const subjects = [
  { title: 'Math', href: '/academic/math', detail: 'Math pathways from elementary foundations through advanced high-school courses.' },
  { title: 'English', href: '/academic/english', detail: 'Reading comprehension, vocabulary, grammar, writing, and communication.' },
  { title: 'Chemistry', href: '/academic/science/chemistry', detail: 'High-school Chemistry with simulation-based online instruction.' },
  { title: 'Physics', href: '/academic/science/physics', detail: 'High-school Physics, including Honors and AP pathways.' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const canonical = absoluteSiteUrl('/online-tutoring', locale, getCanonicalSiteUrl())
  return {
    title: 'Online Tutoring & Live Classes | GrowWise',
    description: 'Explore online Math, English, Chemistry, and Physics for Grades 3–12. A teacher confirms placement, schedule, and enrollment details with a parent.',
    alternates: { canonical },
    openGraph: { title: 'Online Tutoring & Live Classes | GrowWise', description: 'A diagnostic-led online learning system with teacher-confirmed placement.', url: canonical, type: 'website' },
  }
}

export default async function OnlineTutoringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const pageUrl = absoluteSiteUrl('/online-tutoring', locale, getCanonicalSiteUrl())
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl,
    name: 'GrowWise Online Tutoring and Live Classes',
    description: 'Online learning for Grades 3–12 with a parent assessment and teacher-confirmed placement.',
    inLanguage: 'en-US', isPartOf: { '@type': 'WebSite', name: 'GrowWise', url: getCanonicalSiteUrl() },
    provider: { '@type': 'EducationalOrganization', name: 'GrowWise School', url: getCanonicalSiteUrl() },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-gradient-to-br from-[#F8FAFC] to-blue-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[#C44B0A]">Live online classes · Grades 3–12</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-[#1F396D] sm:text-5xl">One learning system for the gap behind the grade</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">Start with an assessment. A teacher confirms the subject, level, available class schedule, and enrollment details with the parent or guardian.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-12 items-center rounded-lg bg-[#F16112] px-5 py-3 font-bold text-white hover:bg-[#d54f0a]" href={publicPath('/book-assessment', locale)}>Book a free assessment</Link>
            <Link className="inline-flex min-h-12 items-center rounded-lg border border-[#1F396D] bg-white px-5 py-3 font-bold text-[#1F396D]" href={publicPath('/pricing', locale)}>View pricing</Link>
          </div>
        </div>
      </section>
      <div className="px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl space-y-14">
        <section aria-labelledby="online-subjects-title">
          <h2 id="online-subjects-title" className="text-3xl font-bold text-[#1F396D]">Choose a subject</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Each subject has its own pathway. Prices are listed on the pricing page; the teacher confirms placement and schedule before enrollment.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{subjects.map((subject) => <article key={subject.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-[#1F396D]">{subject.title}</h3><p className="mt-2 min-h-14 leading-6 text-slate-600">{subject.detail}</p><Link className="mt-4 inline-flex font-bold text-[#A83E05] underline underline-offset-4" href={publicPath(subject.href, locale)}>Explore {subject.title}</Link></article>)}</div>
          <p className="mt-4 text-sm leading-6 text-slate-600">Online offerings for other programs are confirmed individually. Contact GrowWise before making plans for SAT/PSAT, Coding, AI, Game Development, or Robotics.</p>
        </section>
        <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8" aria-labelledby="free-resources-title">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#A83E05]">Free parent resources</p>
            <h2 id="free-resources-title" className="mt-2 text-2xl font-bold text-[#1F396D]">Get a worksheet before choosing a course</h2>
            <p className="mt-3 leading-7 text-slate-700">Browse the existing Math and English practice resources. On the downloads page, click Download PDF to download the available worksheet directly. No course enrollment or student profile is required.</p>
            <Link className="mt-5 inline-flex min-h-12 items-center rounded-lg border border-[#1F396D] bg-white px-5 py-3 font-bold text-[#1F396D] hover:bg-blue-50" href={publicPath('/resources/downloads', locale)}>Browse free worksheets</Link>
          </div>
        </section>
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="learning-system-title">
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 id="learning-system-title" className="text-2xl font-bold text-[#1F396D]">How the learning system works</h2><ol className="mt-5 space-y-3 text-slate-700"><li><strong>1. Assessment:</strong> identify the mistake pattern and learning gap.</li><li><strong>2. Live class:</strong> work through a confirmed subject pathway.</li><li><strong>3. Gap lessons:</strong> address the skills that block progress.</li><li><strong>4. Reteach:</strong> revisit a topic when understanding is not secure.</li><li><strong>5. Parent dashboard:</strong> follow progress and recommended next steps.</li></ol></div>
          <div className="rounded-2xl bg-blue-50 p-6"><h2 className="text-2xl font-bold text-[#1F396D]">Parent-led placement</h2><p className="mt-3 leading-7 text-slate-700">The self-check is a Math diagnostic for supported Grades 3–8. It does not place students in English, Chemistry, Physics, or other programs. A parent or guardian submits the assessment; a teacher confirms placement.</p><Link className="mt-4 inline-flex font-bold text-[#A83E05] underline" href={publicPath('/self-check', locale)}>Explore the Math self-check</Link><p className="mt-4 text-sm leading-6 text-slate-600">A parent or guardian may provide a student name and grade so GrowWise can respond and support an online profile. Omnix360 is the system used for online student profiles, consent, the parent dashboard, and retention. <Link className="font-semibold underline" href={publicPath('/privacy-policy', locale)}>Read the privacy notice</Link>.</p></div>
        </section>
        <OnlineCourseSelector />
        <p className="text-sm leading-6 text-slate-500">Class format, confirmed times, and cohort capacity are shared by the team before enrollment. The online-only transition date will be published after it is confirmed.</p>
      </div></div>
    </main>
  )
}
