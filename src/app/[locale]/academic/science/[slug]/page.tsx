import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ONLINE_SCIENCE_COURSES, getOnlineScienceCourse } from '@/data/online-science-courses'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { generateBreadcrumbSchema, generateCourseSchema } from '@/lib/seo/structuredData'

export function generateStaticParams() {
  return ONLINE_SCIENCE_COURSES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const course = getOnlineScienceCourse(slug)
  if (!course) return { title: 'Science Courses | GrowWise' }
  const canonical = absoluteSiteUrl(`/academic/science/${slug}`, locale, getCanonicalSiteUrl())
  return {
    title: `${course.title} | GrowWise`,
    description: `${course.grades}. ${course.lanes}. Online classes use simulations; hands-on labs stay with the student’s school.`,
    alternates: { canonical },
    openGraph: { title: `${course.title} | GrowWise`, description: course.description, url: canonical, type: 'website' },
  }
}

export default async function OnlineScienceCoursePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const course = getOnlineScienceCourse(slug)
  if (!course) notFound()
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(`/academic/science/${slug}`, locale, baseUrl)
  const courseSchema = generateCourseSchema({
    name: course.name,
    description: course.description,
    provider: 'GrowWise School',
    educationalLevel: course.grades,
    teaches: [course.subject, course.lanes, 'Scientific reasoning', 'Simulation-based instruction'],
    coursePrerequisites: course.prerequisites,
    url,
    image: `${baseUrl}/assets/growwise-logo.png`,
  })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Academic programs', url: absoluteSiteUrl('/academic', locale, baseUrl) },
    { name: 'Science', url: absoluteSiteUrl('/academic/science/chemistry', locale, baseUrl) },
    { name: course.name, url },
  ])

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#C44B0A]">Online science · {course.grades}</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1F396D]">{course.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{course.description}</p>
        <dl className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-2">
          <div><dt className="font-bold text-[#1F396D]">Grades</dt><dd className="mt-1 text-slate-700">{course.grades}</dd></div>
          <div><dt className="font-bold text-[#1F396D]">Lanes</dt><dd className="mt-1 text-slate-700">{course.lanes}</dd></div>
          <div className="sm:col-span-2"><dt className="font-bold text-[#1F396D]">Prerequisites and placement</dt><dd className="mt-1 text-slate-700">{course.prerequisites}</dd></div>
        </dl>
        <p className="mt-6 max-w-3xl leading-7 text-slate-700">Online instruction uses simulations. Hands-on labs remain with the student’s school.</p>
        <section className="mt-8 rounded-2xl bg-slate-50 p-6" aria-labelledby="related-science-pathways">
          <h2 id="related-science-pathways" className="text-xl font-bold text-[#1F396D]">Related science pathways</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {ONLINE_SCIENCE_COURSES.filter((related) => related.subject === course.subject && related.slug !== course.slug).map((related) => <li key={related.slug}><Link href={publicPath(`/academic/science/${related.slug}`, locale)} className="font-semibold text-[#A83E05] underline">{related.name}</Link></li>)}
          </ul>
        </section>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={publicPath('/book-assessment', locale)} className="inline-flex min-h-12 items-center rounded-lg bg-[#F16112] px-5 py-3 font-bold text-white hover:bg-[#d54f0a]">Book a free assessment</Link>
          <Link href={publicPath('/pricing', locale)} className="inline-flex min-h-12 items-center rounded-lg border border-[#1F396D] px-5 py-3 font-bold text-[#1F396D]">View pricing</Link>
        </div>
      </article>
    </main>
  )
}
