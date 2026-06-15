import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, CheckCircle2, ClipboardCheck, User } from 'lucide-react'

import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'does-my-child-need-reading-help-checklist'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/reading-assessment-checklist-dublin-ca.webp'

const HEADLINE = 'Does My Child Need Reading Help This Summer? A 5-Minute Parent Checklist'
const DESCRIPTION =
  'A simple reading help checklist for Dublin and Tri-Valley parents. Spot decoding, fluency, comprehension, and writing signs before summer gaps grow.'
const PUBLISHED_DATE = '2026-06-15'

const CHECKLIST_ITEMS = [
  'Needs help sounding out new words',
  'Guesses based on the first letter or picture clues',
  'Reads slowly, word by word, or without expression',
  'Avoids reading aloud when a parent asks',
  'Has trouble remembering common sight words',
  'Cannot explain the main idea after reading',
  'Struggles to retell story events in order',
  'Skips endings, small words, or punctuation',
  'Spelling does not match grade expectations',
  'Gets frustrated with reading homework',
] as const

const BLOG_FAQS = [
  {
    question: 'How do I know if my child needs reading help?',
    answer:
      'Your child may need reading help if they consistently guess words, avoid reading aloud, read very slowly, forget what they just read, or become frustrated during reading homework.',
  },
  {
    question: 'What score on the checklist means I should get support?',
    answer:
      'One to three signs may mean your child needs extra practice and monitoring. Four or more signs suggest a targeted reading assessment would be wise.',
  },
  {
    question: 'Can summer reading help prevent bigger gaps?',
    answer:
      'Yes. Summer is a strong time to rebuild decoding, fluency, vocabulary, and comprehension because students can practice without the pressure of nightly school assignments.',
  },
  {
    question: 'Where can Dublin parents get a reading assessment?',
    answer:
      'GrowWise School offers academic assessments in Dublin, CA for families who want a clearer picture of reading, writing, and comprehension skills.',
  },
] as const

const RELATED_READING_GUIDES = [
  {
    title: 'Reading Fluency vs. Comprehension',
    href: '/resources/reading-fluency-vs-comprehension',
    description: 'A parent guide for telling whether the gap is accuracy, pace, or understanding.',
  },
  {
    title: 'Reading Program for Grades 1-2',
    href: '/resources/reading-program-grades-1-2-dublin-ca',
    description: 'What early elementary readers need before gaps become harder to unwind.',
  },
  {
    title: 'Why Grades Hide Learning Gaps',
    href: '/resources/why-grades-hide-learning-gaps',
    description: 'How parents can spot hidden reading and math gaps before report cards make them obvious.',
  },
] as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)

  return {
    title: 'Does My Child Need Reading Help? 5-Minute Checklist | GrowWise',
    description: DESCRIPTION,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: HEADLINE,
      description: DESCRIPTION,
      url,
      type: 'article',
      images: [
        {
          url: `${baseUrl}${BLOG_IMAGE_URL}`,
          width: 1600,
          height: 1200,
          alt: 'Reading difficulty checklist for Dublin CA parents with warning signs for elementary students',
        },
      ],
    },
  }
}

function Checklist() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {CHECKLIST_ITEMS.map((item) => (
        <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1D9E75]" aria-hidden />
          <span className="text-slate-700">{item}</span>
        </div>
      ))}
    </div>
  )
}

function FaqBlock() {
  return (
    <section className="not-prose mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-950">Reading Help FAQ</h2>
      <div className="mt-6 space-y-5">
        {BLOG_FAQS.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
            <p className="mt-2 text-slate-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)
  const imageUrl = `${baseUrl}${BLOG_IMAGE_URL}`

  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: HEADLINE, url: pageUrl },
  ]

  const articleSchema = generateArticleSchema({
    headline: HEADLINE,
    description: DESCRIPTION,
    url: pageUrl,
    image: imageUrl,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
  })

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

      <div className="min-h-screen bg-[#f6f8fb]">
        <section className="bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1D9E75] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href={publicPath('/growwise-blogs', locale)}
              className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Back to Blogs
            </Link>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {HEADLINE}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/88">
              Use this quick checklist to spot reading warning signs before summer turns small gaps into bigger
              frustration.
            </p>
            <div className="llm-answer-block mt-6 rounded-2xl border-l-4 border-[#1D9E75] bg-white/95 p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <ClipboardCheck className="h-6 w-6 text-[#1D9E75]" aria-hidden />
                Quick Answer
              </h2>
              <p className="mt-3 text-slate-800">
                Your child may need reading help if they regularly guess words, avoid reading aloud, read very slowly,
                forget what they just read, or become upset during reading homework. If you check four or more signs
                below, a reading assessment can help identify whether the gap is in decoding, fluency, vocabulary, or
                comprehension.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/82">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden />
                <span>GrowWise</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden />
                <time dateTime={PUBLISHED_DATE}>June 15, 2026</time>
              </div>
            </div>
          </div>
        </section>

        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <p className="lead text-xl text-slate-800">
                  Parents often notice reading trouble before a report card does. A child may get through school
                  assignments, but reading still feels slow, stressful, or uneven at home.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Image
                    src={BLOG_IMAGE_URL}
                    alt="Reading difficulty checklist for Dublin CA parents with warning signs for elementary students"
                    width={1600}
                    height={1200}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    className="h-auto w-full"
                  />
                  <figcaption className="px-5 py-3 text-sm text-slate-600">
                    A quick parent checklist for spotting reading difficulty signs in grades 1-5.
                  </figcaption>
                </figure>

                <h2>Use the 5-minute reading checklist</h2>
                <p>
                  Sit with your child during a normal reading moment. Do not turn it into a test. Pick a book,
                  article, or school passage that should be close to grade level, then watch for patterns.
                </p>
              </div>

              <div className="not-prose my-8">
                <Checklist />
              </div>

              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <h2>How to score the checklist</h2>
                <p>
                  If you check <strong>one to three signs</strong>, keep monitoring and add short, consistent reading
                  practice at home. If you check <strong>four or more signs</strong>, your child may need more
                  targeted support than extra reading minutes alone.
                </p>
                <p>
                  The reason matters. A child who guesses words may need phonics or decoding work. A child who reads
                  accurately but cannot explain the passage may need comprehension support. A child who reads only
                  when pushed may need fluency practice and confidence rebuilding.
                </p>

                <h2>Why summer is a smart time to act</h2>
                <p>
                  Summer gives families room to rebuild skills without the pressure of daily homework, tests, and
                  classroom pacing. For Dublin and Tri-Valley students, a short reading plan can help protect
                  momentum before the next grade begins.
                </p>
                <p>
                  Start with 15-20 minutes of daily reading, but do not stop there. Ask your child to summarize,
                  explain new vocabulary, read one paragraph aloud, and show where the text supports their answer.
                  Those small checks reveal much more than page count.
                </p>

                <h2>When to book a reading assessment</h2>
                <p>
                  A reading assessment is useful when parents need to know which skill is causing the struggle. At
                  GrowWise, families can use an academic assessment to understand whether support should focus on
                  reading accuracy, fluency, comprehension, vocabulary, or written response.
                </p>
                <p>
                  For next steps, explore our{' '}
                  <Link href={publicPath('/academic/english', locale)}>English and reading programs</Link>, or{' '}
                  <Link href={publicPath('/book-assessment', locale)}>book an academic assessment</Link> at our
                  Dublin center. Parents comparing reading symptoms can also use our guide to{' '}
                  <Link href={publicPath('/resources/reading-fluency-vs-comprehension', locale)}>
                    reading fluency versus comprehension
                  </Link>{' '}
                  and our local overview of{' '}
                  <Link href={publicPath('/dublin-ca', locale)}>GrowWise academic support in Dublin, CA</Link>.
                </p>
              </div>

              <FaqBlock />
            </div>
          </div>
        </article>

        <BlogPostConversionSection
          locale={locale}
          programHref="/academic/english"
          programLabel="Explore English Programs"
          headline="Want a clearer reading plan?"
          subtext="Bring the checklist to a GrowWise assessment and we will help identify the reading skill that needs the most attention first."
          relatedPosts={RELATED_READING_GUIDES}
        />
      </div>
    </>
  )
}
