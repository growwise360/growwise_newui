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

const BLOG_SLUG = 'education-cannot-be-outsourced'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/education-cannot-be-outsourced.png'

const HERO_IMAGE_ALT = 'A parent and child reading together on a couch at home, engaged and curious'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = 'The Education Trap That Smart Parents Fall Into'

const DESCRIPTION =
  "It isn't the wrong tutor, curriculum, or school. It's believing education can be fully outsourced. Why lifelong learners are made at home, not just in a classroom."

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'The biggest mistake smart, well-meaning parents make is not choosing the wrong tutor, curriculum, or school. It is believing that education can be outsourced entirely to any of those. This article explains why children become lifelong learners because the important adults around them value learning every day, not because one excellent teacher or program appeared once.'

const ARTICLE_KEYWORDS = [
  'parent involvement in education',
  'tutoring is not enough',
  'raising a lifelong learner',
  'education cannot be outsourced',
  'role of parents in learning',
  'academic support Dublin CA',
  'Tri-Valley parent education',
  'family learning habits',
] as const

const BLOG_FAQS = [
  {
    question: "Why isn't the right tutor or curriculum enough on its own?",
    answer:
      'A tutor, curriculum, or school provides expertise and structure for a limited number of hours a week. What happens the rest of the time, whether learning is treated as valuable at home, whether questions are encouraged, whether reading happens outside of assignments, has a much larger cumulative effect. The best program in the world cannot fully compensate for an environment where learning is treated as something that only happens elsewhere.',
  },
  {
    question: 'What does it mean to "outsource" education, exactly?',
    answer:
      'It means treating a school, tutor, or program as fully responsible for a child\'s learning, the way you might treat a mechanic as fully responsible for a car repair. Education does not work that way. A child spends far more hours outside a classroom or tutoring session than inside one, and what happens during those hours shapes whether the outsourced instruction actually takes hold.',
  },
  {
    question: 'How do children actually become lifelong learners?',
    answer:
      'Not because one excellent teacher appeared, though that helps. Children become lifelong learners because the important adults around them visibly value learning: asking questions, reading, being curious about how things work, and treating mistakes as useful rather than shameful. Children absorb this modeling far more than they absorb any single lesson.',
  },
  {
    question: 'Does this mean parents have to teach the material themselves?',
    answer:
      'No. Parents rarely need to teach algebra or grammar directly, and often should not, since that is what qualified instruction is for. What matters is the environment around the instruction: showing curiosity, asking a child what they learned rather than just whether homework is done, and treating effort and questions as valuable, not just correct answers.',
  },
  {
    question: 'How does GrowWise support the parent side of this, not just tutoring?',
    answer:
      'GrowWise programs are built to work alongside families, not replace their involvement, with a free assessment that looks at habits and home environment factors, not just test scores. The goal is a partnership: quality instruction paired with the parent involvement that makes it actually stick.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: 'The Education Trap Smart Parents Fall Into | GrowWise',
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
      { '@type': 'Thing', name: 'Lifelong learning habits' },
      { '@type': 'Thing', name: 'Limits of tutoring alone' },
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
                It isn&apos;t choosing the wrong tutor. It isn&apos;t choosing the wrong curriculum. It isn&apos;t
                even choosing the wrong school.
              </p>

              <p className="text-gray-700 mb-6">
                The biggest mistake well-meaning, thoughtful parents make is believing that education can be
                outsourced entirely. Hire the right tutor, pick the right program, choose the right school, and
                the problem is handled.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                Education cannot be fully outsourced. A tutor, curriculum, or school provides structure and
                expertise for a limited number of hours a week. Children become lifelong learners because the
                adults around them consistently value learning, not because one excellent teacher or program
                appeared once.
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
                  Learning that lasts is modeled at home, not just delivered in a classroom.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Children don&apos;t become lifelong learners because one excellent teacher appeared
              </h2>

              <p className="text-gray-700 mb-6">
                They become lifelong learners because every important adult around them values learning. That
                does not mean every parent needs to teach algebra at the kitchen table. It means the child sees
                curiosity modeled: a parent asking a question and looking up the answer together, a parent reading
                for pleasure, a parent treating a mistake as useful information instead of something to hide.
              </p>

              <p className="text-gray-700 mb-8">
                A single great tutor cannot build that environment. A single great school cannot either. Both can
                strengthen it, but only if the environment around them is already pulling in the same direction.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What outsourcing actually looks like
              </h2>

              <p className="text-gray-700 mb-6">
                It rarely looks dramatic. It looks like asking &quot;Did you finish your homework?&quot; and never
                &quot;What did you learn?&quot; It looks like treating a tutor&apos;s hour as the only hour that
                matters, while the other 166 hours in the week run on autopilot. It looks like handing off a
                struggling subject entirely rather than staying curious about it alongside your child.
              </p>

              <p className="text-gray-700 mb-8">
                None of this comes from a lack of care. It comes from a reasonable assumption: that expertise
                should be able to solve the problem on its own. Expertise helps enormously. It does not replace an
                environment where learning is treated as valuable every day, not just during the paid hour.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Why this shows up more in competitive districts
              </h2>

              <p className="text-gray-700 mb-6">
                In Dublin, Pleasanton, and San Ramon, where academic expectations start early, it is tempting to
                treat tutoring as a complete solution: add enough hours, and the grade will follow. Tutoring hours
                can raise a grade temporarily. They rarely build the durable curiosity and independence that
                carries a student through high school and beyond, unless the environment around those hours
                reinforces the same values.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What this looks like in practice
              </h2>

              <p className="text-gray-700 mb-6">
                Reading together, even briefly, past the age when a child can read independently. Being visibly
                curious about something outside your own expertise, so a child sees an adult learning too.
                Treating a wrong answer as interesting rather than disappointing. None of this requires subject
                matter expertise. It requires showing up as someone who values learning, consistently.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Looking for a partner, not just a provider? GrowWise&apos;s free self-check looks at the whole
                  picture, not just the next test.
                </p>
                <Button asChild className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold">
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For more on why tutoring alone is only one side of the equation, see our guide on{' '}
                <Link
                  href={publicPath('/growwise-blogs/learning-triangle-teacher-student-parent', locale)}
                  className="text-[#1F396D] font-semibold underline hover:text-[#F16112]"
                >
                  the learning triangle
                </Link>
                .
              </p>

              <p className="text-gray-700 mb-4 text-lg font-medium">
                The trap isn&apos;t choosing the wrong tutor, curriculum, or school.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-semibold">
                It&apos;s believing any of them can do the whole job alone.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Instruction that works with your family, not around it.</p>
                <p className="mb-6">
                  GrowWise School runs small-group math and English programs for Grades 3–12 in Dublin, CA,
                  designed to strengthen what happens at home, not replace it.
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
              id="education-cannot-be-outsourced-faq-heading"
              heading="Frequently asked questions about parent involvement in education"
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
