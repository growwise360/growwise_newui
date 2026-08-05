import { Metadata } from 'next'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { generatePageMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { BlogFaqAccordion } from '@/components/blogs/BlogFaqAccordion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'learning-triangle-teacher-student-parent'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/learning-triangle-teacher-student-parent.png'

const HERO_IMAGE_ALT =
  'Three connected figures representing teacher, student, and parent forming a triangle of support'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = "Who Is Really Responsible for a Child's Learning?"

const DESCRIPTION =
  'Tutoring alone rarely fixes a struggling student. Why teacher, student, and parent form a learning triangle, and what happens when one side is missing.'

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'Many parents expect one or two hours of weekly tutoring to undo years of inconsistent habits. This article explains the learning triangle of teacher, student, and parent, why removing any one side causes the whole structure to collapse, and what factors like attention, motivation, sleep, practice, and feedback have to do with whether tutoring actually works.'

const ARTICLE_KEYWORDS = [
  'parent role in tutoring',
  'why tutoring is not working',
  'learning triangle',
  'student motivation and habits',
  'homework routine at home',
  'parent involvement in education',
  'tutoring Dublin CA',
  'academic support Tri-Valley',
] as const

const BLOG_FAQS = [
  {
    question: 'Why isn\'t tutoring alone fixing my child\'s grades?',
    answer:
      'Tutoring typically covers one or two hours a week. The other 166 hours are shaped by habits, sleep, attention, and practice built at home and school. A tutor can teach a concept clearly, but if a child is not practicing between sessions, is exhausted from poor sleep, or has no consistent homework routine, the lesson has nowhere to land. Tutoring works best as one point of a triangle, not a replacement for the other two.',
  },
  {
    question: 'What is the "learning triangle"?',
    answer:
      'The learning triangle is teacher, student, and parent, each responsible for a different part of learning. The teacher delivers instruction. The student does the thinking and practicing. The parent provides routine, sleep, encouragement, and follow-through between sessions. Remove any one side and the structure weakens. A brilliant teacher cannot compensate for a student who never practices, and a motivated student cannot compensate for a chaotic home routine with no consistent sleep or study time.',
  },
  {
    question: 'What can parents actually control in their child\'s learning?',
    answer:
      'Parents rarely control the curriculum or the classroom, but they control nearly everything around it: sleep schedule, a consistent time and place for homework, how much screen time competes with practice, and the tone of conversations about school. Those factors do not show up on a report card, but they determine whether what happens in the classroom or a tutoring session actually sticks.',
  },
  {
    question: 'How much should a parent be involved in homework?',
    answer:
      'Enough to create structure, not enough to do the thinking. The most effective role is logistical: a consistent time and place, checking that work gets started, and asking questions that prompt explanation rather than giving answers. Parents who complete or heavily correct homework remove the exact practice that builds understanding. Parents who provide zero structure leave a child to build habits alone, which rarely happens without guidance.',
  },
  {
    question: 'What academic support does GrowWise offer in Dublin, CA?',
    answer:
      'GrowWise School offers small-group tutoring for Grades 3–12 in math and English, paired with a free assessment that looks at more than test scores, including study habits and where a student\'s learning triangle may be missing a side. The goal is to identify what is actually blocking progress before recommending a program.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: "Who Is Responsible for a Child's Learning? | GrowWise",
    description: DESCRIPTION,
    keywords: ARTICLE_KEYWORDS.join(', '),
    image: `${CANONICAL_SITE_URL}${BLOG_IMAGE_URL}`,
    imageAlt: HERO_IMAGE_ALT,
    publishedTime: '2026-08-01T00:00:00.000Z',
    modifiedTime: '2026-08-01T00:00:00.000Z',
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)
  const absImage = `${baseUrl}${BLOG_IMAGE_URL}`

  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: HEADLINE, url: pageUrl },
  ]

  const articleSchema = {
    ...generateArticleSchema({
      headline: HEADLINE,
      description: ARTICLE_SCHEMA_DESCRIPTION,
      url: pageUrl,
      image: absImage,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: '2026-08-01',
      dateModified: '2026-08-01',
    }),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    keywords: [...ARTICLE_KEYWORDS],
    articleSection: 'Parent Guides',
    about: [
      { '@type': 'Thing', name: 'Parent involvement in education' },
      { '@type': 'Thing', name: 'Effective tutoring' },
      { '@type': 'Thing', name: 'Study habits and routines' },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'GrowWise School',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/growwise-logo.png`,
      },
    },
    relatedLink: [
      absoluteSiteUrl('/self-check', locale, baseUrl),
      absoluteSiteUrl('/book-assessment', locale, baseUrl),
    ],
  }

  const faqSchema = generateFAQPageSchema([...BLOG_FAQS])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <section className="relative bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <BlogImage src={BLOG_IMAGE_URL} alt={HERO_IMAGE_ALT} fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{HEADLINE}</h1>

            <Link
              href="/growwise-blogs"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 mt-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
            <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Anshika Verma</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime="2026-08-01">August 1, 2026</time>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              <p className="lead text-xl text-gray-700 mb-4 font-medium">
                Learning is not a service you purchase. It is a partnership, and most families are only staffing
                one side of it.
              </p>

              <p className="text-gray-700 mb-6">
                A piano teacher sees a student for one hour every week. Nobody expects that single hour to create
                a concert pianist. Practice between lessons creates the musician. Yet somehow, many parents expect
                one or two hours of tutoring to erase years of inconsistent habits.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                A child&apos;s learning depends on three parties working together: the teacher who delivers
                instruction, the student who practices and thinks, and the parent who builds the routine, sleep,
                and follow-through around it. Tutoring can strengthen one side of that triangle. It cannot replace
                the other two.
              </div>

              <p className="text-gray-700 mb-8">
                Tutoring is treated, quietly, as an outsourcing decision. Hire the right person, and the problem
                gets solved. But a tutor is one hour a week. A teacher is a shared classroom with thirty other
                students. The other 166 hours belong to the student and the family.
              </p>

              <figure className="not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px]">
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt={HERO_IMAGE_ALT}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  Teacher, student, and parent. Remove one side, and the triangle collapses.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">The learning triangle</h2>

              <p className="text-gray-700 mb-6">
                Picture a triangle with three points: teacher, student, and parent. Each point holds up a
                different part of the structure. The teacher delivers instruction and expertise. The student does
                the actual thinking, practicing, and retrieving. The parent builds the conditions around both, the
                sleep, the routine, the encouragement, the follow-through.
              </p>

              <p className="text-gray-700 mb-8">
                A triangle with only two points is not a weaker triangle. It is not a triangle at all. Remove the
                parent side, and even excellent teaching has nowhere consistent to land. Remove the student&apos;s
                effort, and no amount of instruction converts into learning. Remove quality teaching, and a
                motivated student with a great home routine still lacks the expertise to move forward efficiently.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What actually determines whether learning sticks
              </h2>

              <p className="text-gray-700 mb-6">
                Five factors decide whether an hour of instruction turns into real progress: attention, motivation,
                sleep, practice, and feedback. None of these live inside the tutoring session. All of them live in
                the hours around it.
              </p>

              <p className="text-gray-700 mb-6">
                A child who is exhausted cannot hold new information regardless of how well it is taught. A child
                who never practices between sessions forgets by the following week. A child who gets no feedback
                on daily work repeats the same mistakes undisturbed. These are not tutoring problems. They are
                triangle problems.
              </p>

              <p className="text-gray-700 mb-8">
                This is why two students with the same tutor, the same curriculum, and the same starting point
                often end up in very different places by the end of a semester. The difference is rarely the
                instruction. It is almost always what happens on the other two sides of the triangle.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Why we expect teachers to solve problems that start earlier
              </h2>

              <p className="text-gray-700 mb-6">
                Teachers and tutors are often handed a problem that began long before the lesson started: a child
                who has not slept enough, has no consistent homework routine, or has quietly decided they are
                &quot;not a math person.&quot; Instruction can address the content gap. It cannot, on its own,
                rebuild a sleep schedule or a study routine.
              </p>

              <p className="text-gray-700 mb-8">
                In Dublin, Pleasanton, and San Ramon, where families often invest heavily in tutoring the moment a
                grade dips, this gets missed constantly. The tutor gets blamed, or replaced, when the actual gap is
                on the parent side of the triangle: no consistent time for homework, inconsistent sleep, or no
                follow-through between sessions.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What parents can actually do
              </h2>

              <p className="text-gray-700 mb-6">
                Not more tutoring hours. A consistent time and place for homework. A protected bedtime, even when
                the week gets busy. A five-minute check-in that asks what was learned, not just whether homework
                is done. These do not require expertise. They require consistency, and consistency is entirely
                within a parent&apos;s control.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Not sure which side of the triangle is missing? GrowWise&apos;s free parent self-check looks at
                  habits and routines, not just test scores.
                </p>
                <Button asChild className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold">
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For more on why grades alone do not reveal the real problem, see our guide on{' '}
                <Link
                  href={publicPath(
                    '/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math',
                    locale
                  )}
                  className="text-[#1F396D] font-semibold underline hover:text-[#F16112]"
                >
                  what a B+ actually hides
                </Link>
                .
              </p>

              <p className="text-gray-700 mb-4 text-lg font-medium">
                Learning is not something you outsource to one hour a week.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-semibold">
                It is a triangle. All three sides have to hold.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Want a plan that covers all three sides?</p>
                <p className="mb-6">
                  GrowWise School runs small-group math and English programs for students in Grades 3–12 in
                  Dublin, CA, paired with practical guidance for the routine side of learning, not just the
                  instruction side.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-[#1F396D]">
                  <Button
                    asChild
                    className="bg-white text-[#1F396D] hover:bg-gray-100 text-base font-semibold px-6 py-3 h-auto w-full sm:w-auto shadow-sm"
                  >
                    <Link href={publicPath('/self-check', locale)}>Free Self-Check</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-white text-[#1F396D] hover:bg-gray-100 text-base font-semibold px-6 py-3 h-auto w-full sm:w-auto shadow-sm"
                  >
                    <Link href={publicPath('/book-assessment', locale)}>Book a Free Assessment</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-white text-[#1F396D] hover:bg-gray-100 text-base font-semibold px-6 py-3 h-auto w-full sm:w-auto shadow-sm"
                  >
                    <Link href={publicPath('/academic/math', locale)}>Explore Math Programs</Link>
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 text-sm italic border-t pt-6">
                GrowWise School runs small-group academic programs for students in Grades 3–12 in Dublin, CA.
                Learn more at{' '}
                <a
                  href={baseUrl}
                  className="text-[#1F396D] font-semibold underline hover:text-[#F16112]"
                  rel="noopener noreferrer"
                >
                  growwiseschool.org
                </a>
                .
              </p>
            </div>

            <BlogFaqAccordion
              id="learning-triangle-faq-heading"
              heading="Frequently asked questions about the teacher-student-parent learning triangle"
              subheading="Parent questions we hear in Tri-Valley. Tap to expand."
              faqs={[...BLOG_FAQS]}
            />

            <p className="not-prose text-center text-sm text-gray-500 mt-10">
              More for Tri-Valley families:{' '}
              <Link href={publicPath('/growwise-blogs', locale)} className="text-[#1F396D] font-semibold hover:underline">
                GrowWise blog
              </Link>
              {' · '}
              <Link href={publicPath('/self-check', locale)} className="text-[#1F396D] font-semibold hover:underline">
                Free math self-check
              </Link>
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
