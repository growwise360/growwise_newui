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

const BLOG_SLUG = 'stop-waiting-for-a-problem-proactive-academic-support'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/stop-waiting-for-a-problem-proactive-support.png'

const HERO_IMAGE_ALT =
  'Parent and child walking toward school at sunrise, representing proactive academic support before problems start'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = 'Stop Waiting for a Problem Before Supporting Your Child'

const DESCRIPTION =
  'Why proactive academic support, not waiting for a bad grade, is one of the biggest advantages Dublin and Tri-Valley parents can give their child this school year.'

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'Most families start looking for academic help after a problem becomes visible. A bad quiz grade. A drop in participation. A child who says a subject is "hard." By then the conversation has shifted from growth to recovery. This article explains why learning gaps and confidence form quietly, long before grades show it, and why proactive support early in the school year gives children more small wins before they ever face repeated failure.'

const ARTICLE_KEYWORDS = [
  'proactive academic support',
  'when to get a tutor',
  'early learning gap signs',
  'back to school study habits',
  'building confidence in students',
  'first month of school',
  'academic support Dublin CA',
  'Tri-Valley tutoring',
] as const

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly (AEO / rich results). */
const BLOG_FAQS = [
  {
    question: 'How do I know if my child needs academic support before grades drop?',
    answer:
      'Look for signals that show up before a report card does: a child avoiding a subject they used to enjoy, taking longer to start homework, guessing instead of explaining their reasoning, or going quiet about a specific class. Grades measure what already happened. Behavior (avoidance, hesitation, deflection) usually shows up weeks or months earlier. If you notice a pattern rather than a single bad day, that is worth a closer look, even if the grade still looks "good enough."',
  },
  {
    question: 'Why do good grades sometimes hide a learning gap?',
    answer:
      'A child can earn a solid grade through memorization, repetition, or test familiarity without fully understanding the concept underneath it. That works until the curriculum builds on the missing piece, often a full grade level later, and the gap suddenly becomes visible as a much bigger problem. The better test of understanding is not the grade itself, but whether a child can explain the idea, solve an unfamiliar version of the problem, or teach it to someone else.',
  },
  {
    question: 'Why does the first month of school matter so much?',
    answer:
      'The first few weeks set study habits, routines, and a child\'s sense of whether they are "good" or "bad" at a subject. Teachers form early impressions of which students ask questions and which stay quiet. That early momentum compounds, positive or negative, through the rest of the year. Getting a child comfortable and confident early makes it far more likely they will keep asking questions instead of quietly falling behind.',
  },
  {
    question: 'Does proactive academic support always mean hiring a tutor?',
    answer:
      'No. Tutoring is one option, not the only one. A consistent homework routine, reading together in the evening, reviewing one concept every weekend, or simply asking better questions. "What was the most difficult thing you learned today?" instead of "Did you finish your homework?" These are all forms of proactive support. The goal is catching small misunderstandings early, whether that happens at home, with a teacher, or with a tutor.',
  },
  {
    question: 'What academic support is available in Dublin, CA for Grades 3–12?',
    answer:
      'GrowWise School offers small-group academic programs for Grades 3–12, including math, English, and test prep support, along with a free assessment to identify where a student stands before recommending any program. The goal is to catch small gaps and build confidence early in the school year, not wait for a struggle to become visible.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: 'Stop Waiting for a Problem Before Supporting Your Child | GrowWise',
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
      { '@type': 'Thing', name: 'Proactive academic support' },
      { '@type': 'Thing', name: 'Early learning gap identification' },
      { '@type': 'Thing', name: 'Student confidence building' },
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
            <BlogImage
              src={BLOG_IMAGE_URL}
              alt={HERO_IMAGE_ALT}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
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
                Why proactive parenting is one of the greatest academic advantages a child can have.
              </p>

              <p className="text-gray-700 mb-6">
                Every August, millions of parents buy backpacks, sharpen pencils, label water bottles, and hope
                this will be the year everything clicks. Most children walk into school excited. Most parents
                walk away optimistic. Then life gets busy. Homework becomes routine. Grades look &quot;good
                enough.&quot; No one asks deeper questions because nothing seems wrong.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                Proactive academic support means addressing small misunderstandings before they show up in a
                grade, not waiting for a bad quiz or a teacher comment. Learning gaps and confidence problems
                almost always start weeks or months before a report card reveals them.
              </div>

              <p className="text-gray-700 mb-6">
                Until October. Or November. A quiz comes home with a disappointing score. A teacher mentions that
                participation has dropped. A child quietly says, &quot;Math is hard,&quot; or &quot;I don&apos;t
                like reading anymore.&quot; That is usually when families start looking for help.
              </p>

              <p className="text-gray-700 mb-8">
                What fascinates me is not that parents care. They absolutely do. It is <em>when</em> they begin to
                care differently. For many families, academic support begins after a problem becomes visible. By
                then, the conversation has already changed. It is no longer about helping a child grow. It is
                about helping them recover.
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
                  Proactive support means walking alongside a child before a struggle becomes visible. Not after.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">The invisible learning gap</h2>

              <p className="text-gray-700 mb-6">
                Children rarely wake up one morning with a huge learning gap. Learning gaps grow quietly. One
                misunderstood fraction. One reading strategy that never became automatic. One algebra concept that
                was memorized instead of understood. Each one feels insignificant. Together, they become the
                reason a child starts avoiding a subject they once enjoyed.
              </p>

              <p className="text-gray-700 mb-8">
                Parents usually notice the result. Teachers often notice the pattern. The child experiences the
                struggle long before either adult sees it. That is why waiting for grades can be misleading.
                Grades tell you what already happened. They rarely tell you what is about to happen.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Confidence is built long before success appears
              </h2>

              <p className="text-gray-700 mb-6">
                Parents often ask me, &quot;How do I help my child become more confident?&quot; The answer
                surprises them. Confidence is not built by praise. Confidence is built by repeated evidence.
              </p>

              <p className="text-gray-700 mb-6">
                A child solves a problem they couldn&apos;t solve last week. They explain an idea without looking
                at notes. They make fewer careless mistakes. They begin raising their hand in class. Those tiny
                moments accumulate. Eventually, they become confidence.
              </p>

              <p className="text-gray-700 mb-8">
                This is why proactive support matters. It gives children many small wins before they ever
                experience repeated failure.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                We treat health better than education
              </h2>

              <p className="text-gray-700 mb-6">
                Think about how we approach health. Most of us do not wait until we are seriously ill before
                paying attention. We schedule checkups. We exercise. We try to prevent problems before they become
                emergencies.
              </p>

              <p className="text-gray-700 mb-6">
                Education deserves the same mindset. Imagine waiting until a cavity requires a root canal before
                brushing your teeth. No parent would choose that. Yet academically, many families unintentionally
                do something similar. They wait until grades fall before changing habits. The repair is always
                harder than the prevention.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Good grades can hide weak understanding
              </h2>

              <p className="text-gray-700 mb-6">
                One of the biggest misconceptions I see is assuming good grades always mean deep understanding.
                Sometimes they do. Sometimes they do not. A child can earn high scores through memory, repetition,
                parental help, or test familiarity.
              </p>

              <p className="text-gray-700 mb-6">
                The real question is different. Can they explain the idea? Can they solve a completely new
                problem? Can they teach the concept to someone else? Can they recognize when they have made a
                mistake?
              </p>

              <p className="text-gray-700 mb-8">
                Those are signs of understanding. Understanding lasts much longer than memorization.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                The first month matters more than most parents realize
              </h2>

              <p className="text-gray-700 mb-6">
                The beginning of the school year shapes everything that follows. Study habits begin forming.
                Friendships develop. Teachers learn which students ask questions. Children decide whether they
                believe they are &quot;good&quot; or &quot;bad&quot; at a subject.
              </p>

              <p className="text-gray-700 mb-6">
                Those first few weeks create momentum. Positive momentum compounds. So does negative momentum.
                Helping a child early is not about pushing them ahead. It is about making sure they never feel
                left behind.
              </p>

              <p className="text-gray-700 mb-8">
                In Dublin, Pleasanton, and San Ramon, where the curriculum pace is fast and class sizes leave
                little room for individual catch-up, that first-month momentum matters even more. A student who
                starts September confident and asking questions tends to stay that way. A student who starts
                September quietly confused tends to stay that way too. Until someone notices.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Support does not always mean tutoring
              </h2>

              <p className="text-gray-700 mb-6">
                Whenever I talk about proactive support, people immediately think of tutoring. That is only one
                option. Some parents create a consistent homework routine. Some read together every evening. Some
                review one concept every weekend. Some simply ask better questions.
              </p>

              <p className="text-gray-700 mb-6">
                Instead of asking, &quot;Did you finish your homework?&quot; they ask, &quot;What was the most
                difficult thing you learned today?&quot; One question checks completion. The other checks
                understanding.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                The best time is before your child needs it
              </h2>

              <p className="text-gray-700 mb-6">
                There is a saying in business. The best time to build a roof is before it rains. Education works
                the same way. The strongest students are not always the smartest. They are often the ones whose
                learning was supported before small misunderstandings became large obstacles.
              </p>

              <p className="text-gray-700 mb-6">
                That support may come from parents. It may come from teachers. It may come from mentors. Where it
                comes from matters less than <em>when</em> it comes. The goal is not to create pressure. The goal
                is to create preparedness.
              </p>

              <p className="text-gray-700 mb-8">
                Because children who feel prepared participate more. They ask more questions. They take more
                risks. And eventually, they discover something every parent hopes to see. They begin believing in
                themselves.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Not sure whether your child is on track this year? Try GrowWise&apos;s free parent self-check, a
                  10-minute diagnostic that flags gaps early, before a grade does.
                </p>
                <Button asChild className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold">
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For a closer look at how small misunderstandings compound over time, see our guide on{' '}
                <Link
                  href={publicPath(
                    '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide',
                    locale
                  )}
                  className="text-[#1F396D] font-semibold underline hover:text-[#F16112]"
                >
                  identifying learning gaps at home
                </Link>
                .
              </p>

              <p className="text-gray-700 mb-4 text-lg font-medium">
                The biggest advantage you can give your child this school year is not more homework. It is not a
                better backpack. It is not even a better tutor.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-semibold">
                It is refusing to wait until a problem becomes too big to ignore.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Ready to start the year ahead, not behind?</p>
                <p className="mb-6">
                  GrowWise School runs small-group math and English programs for students in Grades 3–12 in
                  Dublin, CA. Programs are project-based, curriculum-aligned, and focused on catching small gaps
                  early, before they become big ones.
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
              id="proactive-support-faq-heading"
              heading="Frequently asked questions about proactive academic support"
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
