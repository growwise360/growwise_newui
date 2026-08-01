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

const BLOG_SLUG = 'mentor-vs-teacher-critical-thinking'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/mentor-vs-teacher-critical-thinking.png'

const HERO_IMAGE_ALT =
  'A glowing upward spiral of curiosity above a student, representing the learning flywheel a mentor creates'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = 'Two Students Get an A in Algebra. Five Years Later, Only One Can Think.'

const DESCRIPTION =
  'Why the difference between a teacher and a mentor shows up years later, not on the report card, and how the learning flywheel builds real critical thinking.'

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'Two students can earn the same A in Algebra and end up in very different places five years later: one able to solve unfamiliar problems, one not. This article explains the difference between a teacher, who transfers knowledge, and a mentor, who transfers thinking, and introduces the learning flywheel of curiosity, questions, understanding, and confidence that mentors build over time.'

const ARTICLE_KEYWORDS = [
  'mentor vs teacher',
  'critical thinking skills for students',
  'why memorization fails in algebra',
  'problem solving skills middle school',
  'learning flywheel',
  'student curiosity',
  'academic mentoring Dublin CA',
  'math enrichment Tri-Valley',
] as const

const BLOG_FAQS = [
  {
    question: 'What is the difference between a teacher and a mentor?',
    answer:
      'A teacher transfers knowledge: facts, formulas, and procedures for a specific subject. A mentor transfers thinking: how to approach an unfamiliar problem, ask better questions, and reason through uncertainty. Both roles matter, but they produce different long-term outcomes. A student can pass every test with strong teaching alone and still freeze the first time a problem does not match a memorized pattern.',
  },
  {
    question: 'Why do two students with the same grade turn out differently later?',
    answer:
      'Grades measure performance on material that was directly taught. They do not measure whether a student can transfer that knowledge to a new, unfamiliar situation. A student who was taught to think, not just taught the content, keeps that ability years later, even in subjects far removed from where it was built. A student who only memorized procedures loses that ability once the specific pattern is gone.',
  },
  {
    question: 'What is the "learning flywheel"?',
    answer:
      'The learning flywheel is a cycle: curiosity leads to questions, questions lead to understanding, understanding builds confidence, and confidence generates more curiosity. Each stage feeds the next. Mentors deliberately build this cycle by asking questions instead of only giving answers, which keeps the flywheel spinning long after a specific lesson ends.',
  },
  {
    question: 'Can a tutor be both a teacher and a mentor?',
    answer:
      'Yes, and the best ones are. It requires deliberately spending part of every session on process, not just content: asking a student to explain their reasoning, letting them sit with a hard problem before offering help, and connecting new material to problems they have not seen before. This takes longer than simply demonstrating the correct method, but it is what builds transferable thinking rather than a temporary grade.',
  },
  {
    question: 'How does GrowWise build critical thinking, not just grades?',
    answer:
      'GrowWise programs are project-based and built around students explaining their reasoning, not just producing correct answers. Instructors deliberately introduce unfamiliar problem types so students practice transferring understanding, not just recalling a memorized method. This is paired with a free assessment so families can see where a student currently stands.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: 'Mentor vs. Teacher: Why Two A Students Differ | GrowWise',
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
      { '@type': 'Thing', name: 'Critical thinking in students' },
      { '@type': 'Thing', name: 'Mentorship vs instruction' },
      { '@type': 'Thing', name: 'Transferable problem solving' },
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
                Two students walk into Algebra. Both earn an A. Five years later, one can solve unfamiliar
                problems. One cannot.
              </p>

              <p className="text-gray-700 mb-6">
                Same class. Same teacher. Same textbook. Same final grade. And yet, years later, when both are
                faced with a problem that does not look like anything from that class, only one of them can work
                through it.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                A teacher transfers knowledge. A mentor transfers thinking. Two students can earn the same grade
                in the same class and still end up with very different long-term abilities, depending on whether
                they were taught what to know or taught how to think through what they do not yet know.
              </div>

              <p className="text-gray-700 mb-8">
                Why? One learned Algebra. The other learned how to think.
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
                  Curiosity leads to questions. Questions lead to understanding. Understanding builds confidence.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Teacher transfers knowledge. Mentor transfers thinking.
              </h2>

              <p className="text-gray-700 mb-6">
                A teacher&apos;s job, fairly and necessarily, is to deliver content: the formula for solving a
                quadratic equation, the rule for combining like terms, the steps for factoring. A student who pays
                attention and practices can learn all of it and earn a strong grade.
              </p>

              <p className="text-gray-700 mb-8">
                A mentor does something different. A mentor is less interested in whether a student got the right
                answer and more interested in how the student got there. A mentor asks, before giving help, &quot;What
                have you tried? Why did you try that? What would happen if this number were different?&quot; That
                habit of reasoning through uncertainty is what survives long after the specific formula is
                forgotten.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">The learning flywheel</h2>

              <p className="text-gray-700 mb-6">
                Curiosity leads to questions. Questions lead to understanding. Understanding builds confidence.
                Confidence creates more curiosity. Each stage feeds the next, and once it is spinning, it keeps
                going largely on its own.
              </p>

              <p className="text-gray-700 mb-6">
                A teacher can deliver a lesson without ever touching this cycle. A mentor builds it on purpose,
                every session, by asking one more question instead of supplying one more answer. It takes longer
                in the moment. It is also the only version of learning that keeps working once the mentor is not
                in the room anymore.
              </p>

              <p className="text-gray-700 mb-8">
                This is why the flywheel matters more in Dublin and Tri-Valley schools than the grade itself.
                Curriculum here moves fast, and a student who only knows how to follow a taught procedure runs
                out of road the moment the material shifts to something new, often right around Algebra 2 or
                Precalculus.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What this looks like in an actual session
              </h2>

              <p className="text-gray-700 mb-6">
                A teaching-only session: student gets stuck, tutor demonstrates the correct method, student copies
                the method, problem solved. A mentoring session: student gets stuck, mentor asks what they have
                tried and why, student explains their reasoning out loud, the gap in that reasoning becomes
                visible to the student themselves, and the correction sticks because the student found it, not
                because it was handed to them.
              </p>

              <p className="text-gray-700 mb-8">
                Both sessions can end with the same correct answer on the page. Only one of them builds a student
                who can do this again, alone, on a problem nobody has shown them yet.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Curious whether your child is learning to think or learning to memorize? GrowWise&apos;s free
                  self-check flags the difference.
                </p>
                <Button asChild className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold">
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For more on how memorization can hide behind a good grade, see our guide on{' '}
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
                Two A grades can look identical on paper.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-semibold">
                Only one of those students learned how to think without you.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Build thinking, not just grades.</p>
                <p className="mb-6">
                  GrowWise School runs small-group, project-based math and English programs for Grades 3–12 in
                  Dublin, CA, built around reasoning and explanation, not just correct answers.
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
              id="mentor-vs-teacher-faq-heading"
              heading="Frequently asked questions about mentoring and critical thinking"
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
