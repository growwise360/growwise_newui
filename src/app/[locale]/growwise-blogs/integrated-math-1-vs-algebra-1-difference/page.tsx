import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, CheckCircle2, GitCompareArrows, User } from 'lucide-react'

import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'integrated-math-1-vs-algebra-1-difference'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/camps/banners/im1_get_ready_04d2d274_web.webp'
const HEADLINE = "Integrated Math 1 vs. Algebra 1: What's the Difference?"
const SEO_TITLE = "Integrated Math 1 vs. Algebra 1: What's the Difference? (Parent Guide)"
const DESCRIPTION =
  "Confused why your child's math class is called Integrated Math 1 instead of Algebra 1? Here's what's actually different, what's the same, and what to watch for."
const PUBLISHED_DATE = '2026-08-21'

export const INTEGRATED_MATH_1_FAQS = [
  {
    question: 'Is Integrated Math 1 the same as Algebra 1?',
    answer:
      'Not exactly. Algebra 1 covers algebra in a dedicated year, while Integrated Math 1 covers algebra alongside geometry and statistics in the same course. Both are standard pathways covering comparable content.',
  },
  {
    question: 'Is Integrated Math 1 harder than Algebra 1?',
    answer:
      'No. The two pathways cover comparable content at a comparable level; they organize it differently rather than one being inherently harder.',
  },
  {
    question: 'Does Integrated Math 1 hurt college admissions?',
    answer:
      'No. Integrated mathematics is a recognized secondary-school pathway. Colleges evaluate the courses and rigor a student completed, not whether the sequence used an Integrated Math or Algebra and Geometry naming system.',
  },
  {
    question: 'What comes after Integrated Math 1?',
    answer:
      'Integrated Math 2 comes next, followed by Integrated Math 3. Across the full sequence, students continue building algebra, geometry, functions, probability, and statistics together.',
  },
  {
    question: 'Can my child switch from Integrated Math to the traditional Algebra and Geometry sequence?',
    answer:
      'Sometimes, but the switch should be coordinated with the school counselor. The two sequences do not align topic-for-topic, so changing pathways can create a gap or repeat depending on when the move happens.',
  },
] as const

const COMPARISON_ROWS = [
  ['Course structure', 'Algebra, geometry, and statistics develop together across IM1, IM2, and IM3.', 'Algebra 1, Geometry, and Algebra 2 are usually separate courses.'],
  ['Algebra in the first course', 'A major part of IM1, alongside geometry and statistics.', 'The main focus of Algebra 1 for the full course.'],
  ['Geometry', 'Introduced and revisited throughout the Integrated sequence.', 'Usually concentrated in a dedicated Geometry course.'],
  ['Overall destination', 'Builds secondary algebra, geometry, functions, and statistics across three courses.', 'Builds a comparable progression through Algebra 1, Geometry, and Algebra 2.'],
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)
  return {
    title: SEO_TITLE,
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title: SEO_TITLE,
      description: DESCRIPTION,
      url,
      type: 'article',
      publishedTime: PUBLISHED_DATE,
      images: [{ url: `${baseUrl}${BLOG_IMAGE_URL}`, width: 1600, height: 900, alt: 'Integrated Math 1 and Algebra 1 pathways compared for parents' }],
    },
    twitter: { card: 'summary_large_image', title: SEO_TITLE, description: DESCRIPTION, images: [`${baseUrl}${BLOG_IMAGE_URL}`] },
  }
}

function ComparisonTable() {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead className="bg-[#1F396D] text-white">
          <tr><th className="px-5 py-4 text-sm font-bold">Comparison</th><th className="px-5 py-4 text-sm font-bold">Integrated Math pathway</th><th className="px-5 py-4 text-sm font-bold">Traditional pathway</th></tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map(([feature, integrated, traditional], index) => (
            <tr key={feature} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <th className="border-t border-slate-200 px-5 py-4 text-sm font-bold text-slate-900">{feature}</th>
              <td className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">{integrated}</td>
              <td className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">{traditional}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FaqBlock() {
  return (
    <section className="not-prose mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-950">Integrated Math 1 vs. Algebra 1 FAQ</h2>
      <div className="mt-6 space-y-6">
        {INTEGRATED_MATH_1_FAQS.map((faq) => <div key={faq.question}><h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></div>)}
      </div>
    </section>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)
  const articleSchema = generateArticleSchema({ headline: HEADLINE, description: DESCRIPTION, url: pageUrl, image: `${baseUrl}${BLOG_IMAGE_URL}`, datePublished: PUBLISHED_DATE, dateModified: PUBLISHED_DATE, author: { type: 'Organization', name: 'GrowWise Education Team' } })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) }, { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) }, { name: HEADLINE, url: pageUrl }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...INTEGRATED_MATH_1_FAQS])) }} />

      <div className="min-h-screen bg-[#f6f8fb]">
        <section className="bg-[#1F396D] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href={publicPath('/growwise-blogs', locale)} className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 hover:text-white"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden />Back to Blogs</Link>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{HEADLINE}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">A parent guide to what the pathways share, how their course structures differ, and where a transition can create a hidden gap.</p>
            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#F16112] bg-white p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold"><GitCompareArrows className="h-6 w-6 text-[#F16112]" aria-hidden />The Short Answer</h2>
              <p className="mt-3 leading-7 text-slate-800">Integrated Math 1 is not simply Algebra 1 with a different name. Algebra 1 concentrates on algebra for a dedicated course, while IM1 teaches substantial algebra alongside geometry and statistics. Across IM1, IM2, and IM3, those strands develop together instead of being separated into Algebra 1, Geometry, and Algebra 2.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80"><span className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden />GrowWise Education Team</span><span className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden /><time dateTime={PUBLISHED_DATE}>August 21, 2026</time></span></div>
          </div>
        </section>

        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl"><div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
            <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
              <p className="lead text-xl text-slate-800">Many parents open a report card, see “Integrated Math 1,” and have the same reaction: <em>Wait, is this Algebra 1 or not?</em></p>
              <p>It is a fair question. The two courses cover much of the same mathematical territory, but they are not organized the same way. That difference matters when parents compare placements, interpret a transcript, or try to spot a missing prerequisite before the next course begins.</p>
              <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"><Image src={BLOG_IMAGE_URL} alt="Integrated Math 1 course concepts represented on a classroom math board" width={1600} height={900} priority sizes="(max-width: 768px) 100vw, 900px" className="h-auto w-full" /><figcaption className="px-5 py-3 text-sm text-slate-600">IM1 develops algebra alongside geometry and statistics instead of reserving each strand for a separate year.</figcaption></figure>

              <h2>What is Integrated Math 1?</h2>
              <p>Integrated Math 1, usually shortened to IM1, is the first course in an Integrated Math sequence. Instead of teaching algebra, geometry, and statistics in separate years, the sequence develops all three strands across IM1, IM2, and IM3.</p>
              <p>The Common Core mathematics framework describes both a traditional pathway and an integrated pathway in its <a href="https://www.thecorestandards.org/wp-content/uploads/Math_Appendix_A.pdf" target="_blank" rel="noreferrer">high-school course-pathway appendix</a>. The standards are the destination; the pathways organize how students reach it.</p>

              <h2>How is Algebra 1 organized?</h2>
              <p>In the traditional sequence, Algebra 1 spends a dedicated course developing algebraic reasoning, equations, functions, graphs, and related skills. Geometry usually follows as its own course, then Algebra 2 continues the algebra and function progression.</p>
              <p>The familiar labels do not make the traditional pathway more legitimate or automatically more rigorous than the Integrated sequence.</p>
            </div>

            <ComparisonTable />

            <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
              <h2>Why do schools use one pathway instead of the other?</h2>
              <p>Both pathways are established ways to organize secondary mathematics. A school or district usually adopts one sequence as a curriculum decision. The course name alone does not tell parents that one student is ahead, behind, or taking a less rigorous program.</p>
              <p>For college preparation, the important question is whether the student completes an appropriately rigorous sequence of approved mathematics courses. The University of California&apos;s <a href="https://hs-articulation.ucop.edu/guide/a-g-subject-requirements/c-mathematics/" target="_blank" rel="noreferrer">mathematics subject guidance</a> accommodates integrated courses within its college-preparatory requirements.</p>

              <h2>Where do parents get tripped up?</h2>
              <h3>“My child is behind because they are not in Algebra 1 yet.”</h3>
              <p>Not necessarily. If the school uses the Integrated pathway, IM1 is the first course in that sequence. Comparing it with a friend&apos;s Algebra 1 placement at a school using a different sequence is not an apples-to-apples comparison.</p>
              <h3>“IM1 is watered down because it is not called Algebra.”</h3>
              <p>Algebraic equations, functions, graphs, and modeling remain central to IM1; they are taught alongside geometry and statistics rather than in isolation.</p>
              <h3>“Switching schools mid-sequence will be seamless.”</h3>
              <p>This is the legitimate risk. A student moving from an Integrated school to a traditional Algebra–Geometry–Algebra 2 sequence, or the other way around, can enter a course that assumes topics the student has not studied yet. The student may also repeat material already completed.</p>
              <p>Families should ask the receiving school to compare the completed syllabus with the next course&apos;s prerequisites before placement is finalized.</p>

              <h2>What actually predicts trouble in either pathway?</h2>
              <p>The course name matters less than whether a student has a specific, recurring gap. A student can be on pace with the school calendar and still have shaky footing in solving equations, working with variables, interpreting graphs, or translating word problems into mathematical relationships.</p>
              <p>Those gaps may remain quiet during a familiar unit, then surface in IM2, IM3, Geometry, or Algebra 2 when a new topic depends on the missing skill.</p>
              <div className="not-prose my-8 rounded-xl border border-[#1F396D]/15 bg-[#F7FAFC] p-6"><h3 className="flex items-center gap-2 text-xl font-bold text-[#1F396D]"><CheckCircle2 className="h-5 w-5 text-[#1D9E75]" aria-hidden />What to look for in either sequence</h3><ul className="mt-4 space-y-3 text-slate-700"><li>Can your child explain why a step works instead of only repeating it?</li><li>Are mistakes random, or do they repeat in the same type of problem?</li><li>Is homework taking noticeably longer than it used to, even on familiar topics?</li></ul></div>
              <p>If two or more patterns persist, identify the exact gap before the next course builds on it. Parents can review GrowWise <Link href={publicPath('/academic/math', locale)}>math programs</Link> and <Link href={publicPath('/academic/math/high-school', locale)}>high-school math support</Link> for the relevant sequence and grade level.</p>

              <h2>The bottom line</h2>
              <p>Integrated Math 1 and Algebra 1 are different course structures leading through comparable secondary mathematics. IM1 combines algebra, geometry, and statistics; Algebra 1 concentrates the first course on algebra. The useful question is not which title sounds stronger, but whether the student understands the prerequisite skills needed for the next course.</p>
            </div>

            <FaqBlock />
            <section className="not-prose mt-12 rounded-2xl bg-gradient-to-r from-[#1F396D] to-[#29335C] p-7 text-center text-white md:p-10"><h2 className="text-2xl font-bold md:text-3xl">Not sure whether a specific math gap is developing?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-white/85">A GrowWise math assessment can identify where your child stands in an Integrated or traditional sequence before the next course builds on the missing skill.</p><Link href={publicPath('/book-assessment', locale)} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F16112] px-7 py-3 font-bold text-white hover:bg-[#d9540d]">Book a Math Assessment</Link></section>
          </div></div>
        </article>
      </div>
    </>
  )
}
