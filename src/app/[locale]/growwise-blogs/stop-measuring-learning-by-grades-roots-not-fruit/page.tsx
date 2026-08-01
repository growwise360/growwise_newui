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

const BLOG_SLUG = 'stop-measuring-learning-by-grades-roots-not-fruit'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/stop-measuring-learning-by-grades-roots-not-fruit.png'

const HERO_IMAGE_ALT =
  'Cross-section of an apple tree showing healthy roots underground and ripe apples on the branches above'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = 'Stop Measuring Learning by Grades'

const DESCRIPTION =
  'Grades are the fruit. Curiosity, practice, feedback, and consistency are the roots. Why parents who obsess over fruit usually miss the roots, and what to water instead.'

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'Imagine planting an apple tree and inspecting the apples every morning without ever watering the roots. Many parents do the same thing with grades. This article explains the difference between the roots of learning, curiosity, practice, feedback, sleep, reading, and consistency, and the fruit, grades, test scores, and acceptance letters, and why strengthening the roots is the only reliable way to get better fruit.'

const ARTICLE_KEYWORDS = [
  'grades vs real learning',
  'how to help my child academically',
  'building study habits at home',
  'why grades dont reflect learning',
  'academic roots not grades',
  'parent guide student success',
  'academic support Dublin CA',
  'Tri-Valley parent education tips',
] as const

const BLOG_FAQS = [
  {
    question: 'If grades don\'t measure real learning, what does?',
    answer:
      'Whether a student can explain a concept in their own words, apply it to an unfamiliar problem, and recover from a mistake without being told exactly what went wrong. Grades measure performance on specific, recently taught material. They do not directly measure whether a student built the underlying skill, or just learned to produce the expected answer for that particular test.',
  },
  {
    question: 'What are the "roots" of learning that parents should focus on?',
    answer:
      'Seven things build the roots: curiosity, consistent practice, useful feedback, enough sleep, regular reading, and consistency over time. None of these appear directly on a report card, but all of them determine whether the grades that do appear are backed by real understanding or are a temporary result that will not hold up once the material gets harder.',
  },
  {
    question: 'My child has good grades. Do I still need to worry about the roots?',
    answer:
      'Good grades with weak roots are common, especially in elementary and early middle school, where material is simple enough that memorization and parental help can produce strong scores without deep understanding. The roots matter most for what happens later: whether a student can handle harder material in Grade 7, 8, or high school without the support that propped up earlier grades. Strong current grades are not proof that the roots are strong.',
  },
  {
    question: 'How do I strengthen the roots without adding pressure?',
    answer:
      'Focus on process, not outcome. Ask what was interesting or difficult about a subject instead of just checking the score. Build a consistent, low-stress reading habit rather than assigning extra worksheets. Protect sleep, since it directly affects memory consolidation and focus. None of this requires pressure. It requires consistency, which is a very different thing.',
  },
  {
    question: 'How does GrowWise help build the roots, not just the grade?',
    answer:
      'GrowWise programs are project-based and built around explanation, practice, and feedback, the actual roots of learning, rather than test-prep shortcuts aimed only at a grade. A free assessment looks at where a student\'s foundational skills stand, not just their most recent report card, so families can see the roots, not only the fruit.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: 'Stop Measuring Learning by Grades | GrowWise',
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
      { '@type': 'Thing', name: 'Grades versus real understanding' },
      { '@type': 'Thing', name: 'Foundational learning habits' },
      { '@type': 'Thing', name: 'Long-term academic growth' },
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
                Imagine planting an apple tree. Every morning you inspect the apples. You measure them. You
                compare them with your neighbor&apos;s apples. You worry because yours are smaller.
              </p>

              <p className="text-gray-700 mb-6">
                Meanwhile, you never water the roots. Parents often do the same thing with grades.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                Grades are the fruit of learning, not the roots. The roots are curiosity, consistent practice,
                useful feedback, enough sleep, regular reading, and consistency over time. Parents who focus only
                on the grade are inspecting fruit while the roots go unattended, and fruit grown on weak roots
                eventually stops coming.
              </div>

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
                  Grades are the fruit. Curiosity, practice, and consistency are the roots underneath.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">Roots and fruit</h2>

              <p className="text-gray-700 mb-6">
                The roots: curiosity, practice, feedback, sleep, reading, consistency. None of these show up
                directly on a report card. All of them determine whether the fruit keeps coming.
              </p>

              <p className="text-gray-700 mb-8">
                The fruit: grades, test scores, awards, scholarships, acceptance letters. These are what everyone
                sees. They are also the last thing to change, not the first. By the time fruit looks small, the
                roots have usually been under-watered for a while.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Why parents inspect the fruit
              </h2>

              <p className="text-gray-700 mb-6">
                Fruit is visible. A grade shows up in a portal within days. Roots are invisible and take weeks or
                months to show any effect. It is natural to focus on what you can see and measure immediately, but
                that focus creates a trap: reacting to a grade after the fact, instead of building the conditions
                that determine whether the next grade will be any different.
              </p>

              <p className="text-gray-700 mb-8">
                A parent who measures the apples every morning and compares them to the neighbor&apos;s tree is
                spending all their attention on something they cannot directly change. The roots are where the
                actual leverage is.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What each root actually looks like
              </h2>

              <p className="text-gray-700 mb-6">
                Curiosity looks like a child asking why, not just what. Practice means retrieving information
                without looking it up, not just re-reading notes. Feedback means correcting a mistake close to
                when it happened, not weeks later on a returned test. Sleep is the single most under-rated root:
                memory consolidation happens during sleep, and a tired student cannot fully use what they were
                taught that day. Reading, even outside of assigned material, builds vocabulary and stamina that
                shows up everywhere else. Consistency ties it all together: small, repeated effort compounds in a
                way that occasional intense effort never does.
              </p>

              <p className="text-gray-700 mb-8">
                In Dublin, Pleasanton, and San Ramon, where school pace is fast, families sometimes compensate for
                weak roots with more tutoring hours aimed directly at the next test. That can raise the fruit
                temporarily. It rarely fixes the roots, and the same gap tends to resurface the following semester
                in a harder form.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What to do instead of checking the grade portal daily
              </h2>

              <p className="text-gray-700 mb-6">
                Ask what was interesting today, not just what the score was. Protect sleep even during a busy
                week. Build five or ten minutes of independent reading into the routine. Let your child sit with a
                hard problem for a few minutes before stepping in. None of this produces an immediate grade
                change. All of it strengthens the roots that produce every grade after this one.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Want to see how strong your child&apos;s roots actually are, not just the grade? GrowWise&apos;s
                  free self-check looks underneath the fruit.
                </p>
                <Button asChild className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold">
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For more on how a good grade can still hide a weak root system, see our guide on{' '}
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
                Parents who obsess over fruit usually miss the roots.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-semibold">
                Parents who strengthen the roots rarely have to worry about the fruit.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Build the roots, not just the grade.</p>
                <p className="mb-6">
                  GrowWise School runs small-group math and English programs for Grades 3–12 in Dublin, CA, built
                  around curiosity, practice, and feedback, the roots that produce lasting results.
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
              id="roots-not-fruit-faq-heading"
              heading="Frequently asked questions about grades versus real learning"
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
