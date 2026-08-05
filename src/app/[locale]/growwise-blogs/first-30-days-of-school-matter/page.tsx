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

const BLOG_SLUG = 'first-30-days-of-school-matter'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/first-30-days-of-school-matter.png'

const HERO_IMAGE_ALT = 'An airplane climbing steadily into a bright morning sky after takeoff'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = 'The First 30 Days Matter More Than Any Other Part of the School Year'

const DESCRIPTION =
  'Why September, not January, is when students actually build the study habits and routines that carry them through the year.'

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'An airplane burns the most fuel during takeoff. Once it reaches cruising altitude, everything becomes easier. Learning behaves the same way. This article explains why the first 30 days of school set routine, relationships, confidence, and momentum, and why the science of habit formation means students become organized in September, not January.'

const ARTICLE_KEYWORDS = [
  'first month of school habits',
  'back to school routine',
  'building study habits September',
  'school year momentum',
  'habit formation students',
  'back to school preparation Dublin CA',
  'Tri-Valley school year tips',
  'academic support first month',
] as const

const BLOG_FAQS = [
  {
    question: 'Why does the first month of school matter so much?',
    answer:
      'The first 30 days set routine, relationships, and a child\'s sense of whether they are "good" or "bad" at a subject. Teachers form early impressions of which students ask questions and which stay quiet. Study habits either take hold or fail to form during this window, and momentum from those first weeks tends to carry through the rest of the year, positive or negative.',
  },
  {
    question: 'Why can\'t a student just get organized later in the year, like after winter break?',
    answer:
      'Research on habit formation shows that new routines are easiest to establish during a natural transition, like the start of a school year, when old patterns are already disrupted and a new structure feels normal. Trying to build a study routine in January means competing against months of an already-established, often disorganized pattern. It is not impossible, but it takes considerably more effort than building the habit fresh in September.',
  },
  {
    question: 'What should parents actually focus on in the first 30 days?',
    answer:
      'Four things: a consistent homework routine and time, a protected sleep schedule, early relationship-building with teachers (introducing yourself, not waiting for a problem to email about), and celebrating small wins to build early confidence. None of these require academic expertise. They require consistency during a window when consistency has an outsized effect.',
  },
  {
    question: 'How do I know if my child\'s first month is going well?',
    answer:
      'Watch for whether homework starts without a fight, whether your child mentions specific things learned in class (not just whether homework is done), and whether they seem willing to ask questions rather than staying quiet when confused. A rocky first week is normal. A pattern that continues past the third or fourth week is the signal to look closer.',
  },
  {
    question: 'What back-to-school academic support does GrowWise offer in Dublin, CA?',
    answer:
      'GrowWise School offers small-group academic support for Grades 3–12 that starts in the first weeks of the school year, specifically to help students build routine and confidence early rather than waiting for a fall report card to reveal a gap. A free assessment is available to see where a student stands before the semester gets underway.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: 'Why the First 30 Days of School Matter Most | GrowWise',
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
      { '@type': 'Thing', name: 'Back to school routines' },
      { '@type': 'Thing', name: 'Habit formation in students' },
      { '@type': 'Thing', name: 'Early school year momentum' },
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
                An airplane burns the most fuel during takeoff. Once it reaches cruising altitude, everything
                becomes easier.
              </p>

              <p className="text-gray-700 mb-6">
                Learning behaves the same way. The beginning of the school year requires more energy than any
                other part of it: new routines, new relationships, new expectations. Get through that climb, and
                the rest of the year runs smoother. Struggle through it, and the whole flight feels like turbulence.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                The first 30 days of school set the routine, relationships, and confidence that carry a student
                through the rest of the year. Study habits form fastest during this window because it is a
                natural transition point. Waiting until later, such as after winter break, means competing against
                months of an already-set pattern instead of building a fresh one.
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
                  The climb is the hardest part. Once altitude is reached, the flight gets easier.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What takeoff requires that cruising does not
              </h2>

              <p className="text-gray-700 mb-6">
                If takeoff is weak, the rest of the journey becomes turbulent. The beginning of school requires
                four things a settled routine does not: routine itself, new relationships with teachers and
                classmates, early confidence, and momentum. None of these exist yet in September. All of them have
                to be built from scratch.
              </p>

              <p className="text-gray-700 mb-8">
                By November, a student who built solid routines in September is coasting. A student who never
                built them is still fighting for altitude, and every week that passes without a fix makes the
                climb steeper.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                The science of habit formation
              </h2>

              <p className="text-gray-700 mb-6">
                Habits form most easily during a disruption to an existing pattern, which is exactly what the
                first weeks of school are. Old routines from summer are already broken. A new structure does not
                have to fight an established one. This is why the first three weeks of school create automatic
                study behaviors far more easily than the same effort would in November or January.
              </p>

              <p className="text-gray-700 mb-8">
                Children don&apos;t suddenly become organized in January. They become organized in September, or
                they do not become organized at all until something forces the issue. Waiting for a New Year&apos;s
                resolution to fix a study routine means fighting four months of an already-set pattern instead of
                building a new one during the window when it was easiest.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Why this matters even more in a fast-paced district
              </h2>

              <p className="text-gray-700 mb-6">
                In Dublin, Pleasanton, and San Ramon, curriculum pacing does not wait for a student to catch up.
                A rocky September in a fast-moving Algebra 1 or middle school English class compounds quickly,
                because the next unit assumes the last one landed. A strong September buys a student room to
                absorb a harder unit later. A weak one leaves no slack at all.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What actually helps during takeoff
              </h2>

              <p className="text-gray-700 mb-6">
                A consistent homework time and place, set in the first week, not the third. A protected bedtime,
                even during the adjustment period. An early, low-stakes introduction to each teacher, not the
                first email being about a problem. And noticing small wins out loud: a completed assignment
                without a fight, a question asked in class, a concept explained without help.
              </p>

              <p className="text-gray-700 mb-8">
                Helping a child early is not about pushing them ahead. It is about making sure they never feel
                left behind in the first place.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Want to know if your child is off to a strong start? GrowWise&apos;s free self-check flags early
                  warning signs before they compound.
                </p>
                <Button asChild className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold">
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For more on getting ahead before problems show up, see our guide on{' '}
                <Link
                  href={publicPath('/growwise-blogs/stop-waiting-for-a-problem-proactive-academic-support', locale)}
                  className="text-[#1F396D] font-semibold underline hover:text-[#F16112]"
                >
                  proactive academic support
                </Link>
                .
              </p>

              <p className="text-gray-700 mb-4 text-lg font-medium">
                Every flight needs a strong takeoff.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-semibold">
                September is when that climb happens. Not January.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Start the year at cruising altitude.</p>
                <p className="mb-6">
                  GrowWise School runs small-group math and English programs for Grades 3–12 in Dublin, CA, built
                  to help students establish routine and confidence in the first weeks of the school year.
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
              id="first-30-days-faq-heading"
              heading="Frequently asked questions about the first month of school"
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
