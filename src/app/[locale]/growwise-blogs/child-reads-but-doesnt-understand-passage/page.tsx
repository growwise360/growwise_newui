import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpenCheck, Calendar, MessageCircleQuestion, User } from 'lucide-react'

import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'child-reads-but-doesnt-understand-passage'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/child-reads-but-doesnt-understand.webp'
const HEADLINE = 'My Child Can Read the Words but Doesn’t Understand the Passage — What Should I Do?'
const DESCRIPTION =
  'If your child reads fluently but has poor comprehension, learn the warning signs, likely causes, questions to ask, and ways to build reading understanding.'
const PUBLISHED_DATE = '2026-06-20'

const BLOG_FAQS = [
  {
    question: 'Why can my child read the words but not understand the passage?',
    answer:
      'Accurate word reading and comprehension are related but different skills. Understanding also depends on vocabulary, background knowledge, attention, sentence structure, inference, memory, and the ability to monitor whether the text makes sense.',
  },
  {
    question: 'Can a child read fluently and still have poor comprehension?',
    answer:
      'Yes. A child may sound smooth and accurate while focusing on pronunciation rather than meaning. Ask for a retell, main idea, supporting evidence, and an inference to check whether fluent reading is producing understanding.',
  },
  {
    question: 'How can I tell whether vocabulary is the problem?',
    answer:
      'Ask the child to explain important words from the passage in their own language. If understanding improves after two or three key words are taught, vocabulary is likely contributing. If the child knows the words but cannot connect ideas, the gap may be broader comprehension.',
  },
  {
    question: 'What questions improve reading comprehension?',
    answer:
      'Ask what happened, what the passage is mostly about, which detail proves the answer, why a character acted that way, what caused an event, and what the child predicts next. Require the child to point back to the text.',
  },
  {
    question: 'Are more reading-comprehension worksheets the solution?',
    answer:
      'Not by themselves. Worksheets can measure answers without teaching the missing skill. Effective support models how to summarize, infer, clarify vocabulary, connect ideas, and use evidence, then gradually transfers that work to the child.',
  },
  {
    question: 'When should I seek reading-comprehension help?',
    answer:
      'Seek targeted support when a child repeatedly cannot retell grade-level text, misses main ideas, guesses without evidence, struggles across subjects, or becomes increasingly frustrated despite regular reading practice.',
  },
] as const

const RELATED_GUIDES = [
  {
    title: 'Reading Fluency vs. Comprehension',
    href: '/resources/reading-fluency-vs-comprehension',
    description: 'Tell whether the primary gap is accuracy, pace, vocabulary, or understanding.',
  },
  {
    title: 'Does My Child Need Reading Help?',
    href: '/growwise-blogs/does-my-child-need-reading-help-checklist',
    description: 'Use a five-minute checklist to spot decoding, fluency, and comprehension warning signs.',
  },
  {
    title: 'Elementary English Programs',
    href: '/academic/english/elementary',
    description: 'Build reading, vocabulary, comprehension, writing, and communication skills.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)
  return {
    title: 'Child Reads but Doesn’t Understand? Comprehension Guide',
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title: HEADLINE,
      description: DESCRIPTION,
      url,
      type: 'article',
      publishedTime: PUBLISHED_DATE,
      images: [{
        url: `${baseUrl}${BLOG_IMAGE_URL}`,
        width: 1600,
        height: 900,
        alt: 'Parent asking a child questions about an open book to strengthen reading comprehension',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: HEADLINE,
      description: DESCRIPTION,
      images: [`${baseUrl}${BLOG_IMAGE_URL}`],
    },
  }
}

function FaqBlock() {
  return (
    <section className="not-prose mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-950">Reading Comprehension FAQ</h2>
      <div className="mt-6 space-y-6">
        {BLOG_FAQS.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
            <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
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
  const articleSchema = generateArticleSchema({
    headline: HEADLINE,
    description: DESCRIPTION,
    url: pageUrl,
    image: `${baseUrl}${BLOG_IMAGE_URL}`,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    author: { type: 'Organization', name: 'GrowWise Education Team' },
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
        { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
        { name: HEADLINE, url: pageUrl },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...BLOG_FAQS])) }} />

      <div className="min-h-screen bg-[#f6f8fb]">
        <section className="bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1D9E75] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href={publicPath('/growwise-blogs', locale)} className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Back to Blogs
            </Link>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{HEADLINE}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              Smooth reading can hide a comprehension gap. Learn what to look for and how to move from saying the words to building meaning.
            </p>
            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#F16112] bg-white p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold"><BookOpenCheck className="h-6 w-6 text-[#F16112]" aria-hidden />Quick Answer</h2>
              <p className="mt-3 leading-7 text-slate-800">
                A child may read words correctly but still struggle with comprehension because reading accuracy and understanding are different skills. Comprehension also depends on vocabulary, background knowledge, attention, inference, memory, and the ability to identify and explain the main idea with evidence.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden />GrowWise Education Team</span>
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden /><time dateTime={PUBLISHED_DATE}>June 20, 2026</time></span>
            </div>
          </div>
        </section>

        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <p className="lead text-xl text-slate-800">
                  Some children sound like strong readers because they pronounce words accurately and read at a steady pace. Yet when asked what the passage means, they give a vague answer, repeat one detail, or say, “I don’t know.” This is a comprehension problem, not proof that the child was not paying attention.
                </p>
                <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Image src={BLOG_IMAGE_URL} alt="Parent asking a child questions about an open book to strengthen reading comprehension" width={1600} height={900} priority sizes="(max-width: 768px) 100vw, 900px" className="h-auto w-full" />
                  <figcaption className="px-5 py-3 text-sm text-slate-600">Retelling, discussion, vocabulary, and evidence questions reveal whether fluent reading is producing understanding.</figcaption>
                </figure>

                <h2>Why is reading words different from understanding?</h2>
                <p>
                  Reading comprehension requires children to recognize words and build meaning from them. They must connect sentences, understand vocabulary, use background knowledge, remember important details, make inferences, and notice when something does not make sense.
                </p>
                <p>
                  Reading Rockets explains this distinction in its overview of{' '}
                  <a href="https://www.readingrockets.org/reading-101/reading-101-learning-modules/course-modules/comprehension/introduction" target="_blank" rel="noreferrer">
                    reading comprehension
                  </a>. The U.S. Department of Education&apos;s guide on{' '}
                  <a href="https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/readingcomp_pg_092810.pdf" target="_blank" rel="noreferrer">
                    improving reading comprehension
                  </a>{' '}
                  recommends teaching comprehension strategies, discussing text deeply, selecting purposeful text, and creating an engaging context for reading.
                </p>

                <h2>Sign #1: your child cannot retell the passage</h2>
                <p>
                  A retell shows whether the child formed a coherent mental model. If the retell contains disconnected details, leaves out the central problem, or follows the wrong sequence, the child may be reading sentence by sentence without connecting ideas.
                </p>
                <p>Ask: “Tell me what happened first, next, and last,” or for nonfiction, “What were the three most important things the author explained?”</p>

                <h2>Sign #2: your child misses the main idea</h2>
                <p>
                  The main idea is not simply the first sentence or the most interesting fact. It is the central message supported by key details. A child who lists facts but cannot state what they have in common may need explicit practice grouping details under one larger idea.
                </p>

                <h2>Sign #3: your child guesses answers</h2>
                <p>
                  Guessing often sounds plausible but has no textual support. Ask the child to point to the sentence, phrase, or event that supports the answer. If no evidence exists, return to the passage rather than debating the guess.
                </p>

                <h2>Sign #4: inference questions cause trouble</h2>
                <p>
                  An inference combines text evidence with relevant background knowledge. If a character slams a door and answers in short sentences, the author may never state the emotion directly. The child must notice clues and explain what those clues suggest.
                </p>
                <div className="not-prose my-8 rounded-xl border-l-4 border-[#1D9E75] bg-emerald-50 p-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950"><MessageCircleQuestion className="h-5 w-5 text-[#1D9E75]" aria-hidden />Use an evidence sentence</h3>
                  <p className="mt-3 leading-7 text-slate-700">Have your child answer with: “I think ___ because the text says ___.” This separates evidence-based inference from unsupported guessing.</p>
                </div>

                <h2>Vocabulary or comprehension: how can parents tell?</h2>
                <p>
                  Choose two or three important words from the passage. Ask the child to explain them in context. If understanding improves once those words are taught, vocabulary was a major barrier. If the words are known but the child still cannot connect events, identify the main idea, or explain cause and effect, broader comprehension support is needed.
                </p>

                <h2>Why does background knowledge matter?</h2>
                <p>
                  Readers understand new information by connecting it to what they already know. A passage about migration, ecosystems, or a historical event becomes harder when the child lacks the concepts needed to interpret it. Briefly previewing the topic, images, headings, and essential vocabulary can make the text more accessible without giving away its meaning.
                </p>

                <h2>Questions parents should ask after reading</h2>
                <ul>
                  <li>What was this passage mostly about?</li>
                  <li>Which detail is most important, and why?</li>
                  <li>What caused the main event or problem?</li>
                  <li>What changed from the beginning to the end?</li>
                  <li>What can you infer that the author did not state directly?</li>
                  <li>Which sentence or example supports your answer?</li>
                  <li>What part was confusing, and what could you reread?</li>
                </ul>
                <p>
                  Ask one or two questions during a normal reading session, not all seven as an interrogation. The goal is thoughtful conversation and increasing independence.
                </p>

                <h2>What should parents avoid?</h2>
                <p>
                  Do not respond only by assigning more worksheets. A worksheet may reveal that answers are wrong without teaching how to summarize, infer, monitor understanding, or use evidence. Avoid texts that are so difficult that nearly every sentence requires rescue, and do not accept a fast answer without asking how the child knows.
                </p>

                <h2>How does GrowWise build reading comprehension?</h2>
                <p>
                  Effective comprehension instruction makes invisible thinking visible. At GrowWise, students practice retelling, main idea, vocabulary in context, sentence and paragraph connections, inference, evidence, and written responses. Teachers model the strategy, guide practice, study error patterns, and gradually remove support.
                </p>
                <p>
                  If your child reads fluently but struggles to explain what they read, explore our{' '}
                  <Link href={publicPath('/academic/english/elementary', locale)}>elementary English program</Link>, review our guide to{' '}
                  <Link href={publicPath('/resources/reading-fluency-vs-comprehension', locale)}>reading fluency versus comprehension</Link>, or{' '}
                  <Link href={publicPath('/book-assessment', locale)}>book a free reading assessment</Link>.
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
          headline="Does fluent reading hide a comprehension gap?"
          subtext="A free GrowWise reading assessment can identify whether the barrier is decoding, vocabulary, fluency, or understanding."
          relatedPosts={RELATED_GUIDES}
        />
      </div>
    </>
  )
}
