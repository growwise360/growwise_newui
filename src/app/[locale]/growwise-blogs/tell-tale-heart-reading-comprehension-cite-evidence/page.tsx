import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpenCheck, Calendar, Highlighter, Quote, SearchCheck, User } from 'lucide-react'

import { BlogFaqAccordion } from '@/components/blogs/BlogFaqAccordion'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'tell-tale-heart-reading-comprehension-cite-evidence'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/child-reads-but-doesnt-understand.webp'
const HEADLINE = 'The Tell-Tale Heart Reading Comprehension: Decode Excerpts and Cite Evidence'
const DESCRIPTION =
  'An ELA close-reading lesson for The Tell-Tale Heart that shows students how to decode short excerpts, underline evidence, and explain narrator reliability.'
const PUBLISHED_DATE = '2026-07-01'

const BLOG_FAQS = [
  {
    question: 'Why is citing evidence important in reading?',
    answer:
      'Citing evidence teaches students to prove an idea instead of guessing. When a child can point to the exact words that support an answer, reading becomes more precise and written responses become stronger.',
  },
  {
    question: 'What is the difference between annotation and underlining everything?',
    answer:
      'Annotation is selective thinking on the page. Students should mark the few words that reveal character, conflict, emotion, motive, or theme, then write a short note about why those words matter.',
  },
  {
    question: 'How do students decode a difficult sentence or passage?',
    answer:
      'Students should first say what is happening literally, then circle confusing words, underline clue words, and ask what the line reveals. In The Tell-Tale Heart, this means separating what the narrator claims from what his nervous language reveals.',
  },
  {
    question: 'How does close reading help students write better?',
    answer:
      'Strong writing starts with strong reading. When students learn to notice exact words, organize evidence, and explain why details matter, they are also practicing the building blocks of analytical paragraphs and essays.',
  },
  {
    question: 'Why do real readers often become the best writers?',
    answer:
      'Real readers study how authors create meaning. They notice word choice, structure, contrast, suspense, and tone. Over time, that habit gives students better ideas, better sentences, and stronger evidence when they write.',
  },
] as const

const RELATED_GUIDES = [
  {
    title: 'My Child Reads but Does Not Understand',
    href: '/growwise-blogs/child-reads-but-doesnt-understand-passage',
    description: 'Learn why fluent reading can hide a comprehension gap.',
  },
  {
    title: 'Reading Fluency vs. Comprehension',
    href: '/resources/reading-fluency-vs-comprehension',
    description: 'Tell whether the primary gap is pace, accuracy, vocabulary, or understanding.',
  },
  {
    title: 'Does My Child Need Reading Help?',
    href: '/growwise-blogs/does-my-child-need-reading-help-checklist',
    description: 'Use a quick checklist to spot decoding, fluency, and comprehension warning signs.',
  },
] as const

function Evidence({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-100/80 px-1 font-semibold text-slate-950 underline decoration-[#F16112] decoration-2 underline-offset-4">
      {children}
    </span>
  )
}

function PassageExcerpt({ number, children }: { number: number; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800">Reading chunk {number}</p>
      <p className="mt-2 text-lg leading-8 text-slate-900">{children}</p>
    </div>
  )
}

function DecodeBlock({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section className="not-prose my-8 rounded-xl border-l-4 border-[#1D9E75] bg-emerald-50 p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">Decode chunk {number}</p>
      <h3 className="mt-2 text-xl font-bold text-slate-950">{title}</h3>
      <div className="mt-4 space-y-3 text-base leading-7 text-slate-700">{children}</div>
    </section>
  )
}

function StoryCreditBlock() {
  return (
    <div className="not-prose my-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-slate-800">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">Story credit and source</p>
      <h3 className="mt-2 text-xl font-bold text-slate-950">The Tell-Tale Heart by Edgar Allan Poe</h3>
      <dl className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-950">Author</dt>
          <dd>Edgar Allan Poe</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">First published</dt>
          <dd><cite>The Pioneer</cite>, January 1843</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Original text</dt>
          <dd>
            <a className="font-semibold text-[#1F396D] underline underline-offset-2" href="https://poemuseum.org/the-tell-tale-heart/" target="_blank" rel="noreferrer">
              Poe Museum
            </a>
            {' '}and{' '}
            <a className="font-semibold text-[#1F396D] underline underline-offset-2" href="https://en.wikisource.org/wiki/Mystery_Tales_of_Edgar_Allan_Poe/The_Tell-Tale_Heart" target="_blank" rel="noreferrer">
              Wikisource
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">How this lesson uses it</dt>
          <dd>Brief adapted excerpts for ELA instruction, with credit to the original story and author.</dd>
        </div>
      </dl>
    </div>
  )
}

function BrainstormExercise() {
  return (
    <section className="not-prose my-10 rounded-xl border border-[#1F396D]/15 bg-white p-5 shadow-sm md:p-7">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F16112]">Student exercise</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Pick a short story and prove one idea</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-slate-700">
            This is the practice part. Students choose one short story, pick one short passage, underline two or three proof words, then write a claim-evidence-explanation response.
          </p>
        </div>
        <div className="rounded-lg bg-[#1D9E75]/10 px-4 py-3 text-sm font-bold text-[#176F55]">
          Goal: 8/10 or higher
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['Best for narrator reliability', 'The Tell-Tale Heart', 'Edgar Allan Poe'],
          ['Best for irony and sacrifice', 'The Gift of the Magi', 'O. Henry'],
          ['Best for suspense and surprise', 'The Open Window', 'Saki'],
        ].map(([focus, title, author]) => (
          <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1F396D]">{focus}</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              <cite>{title}</cite>
            </p>
            <p className="mt-1 text-sm text-slate-600">by {author}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">Filled sample</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold text-slate-950">Story</p>
            <p className="mt-1 text-slate-700">
              <cite>The Tell-Tale Heart</cite> by Edgar Allan Poe
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Question</p>
            <p className="mt-1 text-slate-700">Can we trust the narrator?</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Claim</p>
            <p className="mt-1 text-slate-700">The narrator is unreliable because he claims control while revealing fear and obsession.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Underlined evidence</p>
            <p className="mt-1 text-slate-700">&quot;extremely nervous,&quot; &quot;day and night,&quot; and &quot;blood run cold&quot;</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-bold text-slate-950">Explanation</p>
            <p className="mt-1 text-slate-700">
              These details show that the narrator is not calm or objective. His own words reveal fear, fixation, and a conflict he cannot explain logically.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-800">Blank template</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-800">
            <p><span className="font-bold">Story:</span> ______________________________</p>
            <p><span className="font-bold">Author:</span> ______________________________</p>
            <p><span className="font-bold">Question I am answering:</span> ______________________________</p>
            <p><span className="font-bold">My claim:</span> I think __________________ because __________________.</p>
            <p><span className="font-bold">Words I underlined:</span> 1. __________ 2. __________ 3. __________</p>
            <p><span className="font-bold">My explanation:</span> This evidence shows __________________ because __________________.</p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-900">10-point score</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-800">
            <p><span className="font-bold">2 pts - Claim:</span> clear answer to the question.</p>
            <p><span className="font-bold">2 pts - Evidence:</span> exact words or details from the story.</p>
            <p><span className="font-bold">3 pts - Explanation:</span> tells why the evidence proves the claim.</p>
            <p><span className="font-bold">2 pts - Accuracy:</span> matches what actually happens in the text.</p>
            <p><span className="font-bold">1 pt - Writing:</span> complete sentences and careful wording.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)

  return {
    title: 'The Tell-Tale Heart Reading Comprehension | Cite Evidence',
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
        alt: 'Student and parent reading together while marking text evidence',
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
        <section className="bg-gradient-to-br from-[#17315F] via-[#26365F] to-[#1D9E75] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link href={publicPath('/growwise-blogs', locale)} className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Back to Blogs
            </Link>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
              <Highlighter className="h-4 w-4" aria-hidden /> ELA close-reading lesson
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{HEADLINE}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              Use Edgar Allan Poe&apos;s famous story to teach students how to slow down, decode one short excerpt at a time, and prove each answer with underlined evidence.
            </p>
            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#F16112] bg-white p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold"><BookOpenCheck className="h-6 w-6 text-[#F16112]" aria-hidden />Quick Answer</h2>
              <p className="mt-3 leading-7 text-slate-800">
                To read The Tell-Tale Heart closely, students should track what the narrator claims, underline phrases that reveal nervousness or obsession, and cite exact evidence before explaining whether the narrator can be trusted.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden />GrowWise Education Team</span>
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden /><time dateTime={PUBLISHED_DATE}>July 1, 2026</time></span>
            </div>
          </div>
        </section>

        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <p className="lead text-xl text-slate-800">
                  Many students know <strong><cite>The Tell-Tale Heart</cite></strong> is scary, but they struggle to explain how Poe creates that feeling. Strong readers do something more precise: they slow down and point to the words that prove what the narrator feels, wants, and hides.
                </p>
                <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Image src={BLOG_IMAGE_URL} alt="Student and parent reading together while marking text evidence" width={1600} height={900} priority sizes="(max-width: 768px) 100vw, 980px" className="h-auto w-full" />
                  <figcaption className="px-5 py-3 text-sm text-slate-600">The goal is not to underline everything. The goal is to underline the few words that reveal the narrator&apos;s state of mind.</figcaption>
                </figure>

                <h2>Excerpt-by-excerpt passage</h2>
                <p>
                  This student-friendly passage is adapted from the opening of Edgar Allan Poe&apos;s public-domain story <strong><cite>The Tell-Tale Heart</cite></strong>. Blue boxes are short reading chunks, not full paragraphs. Green boxes are the teacher decoding notes. Amber underlines show evidence students should cite.
                </p>
                <StoryCreditBlock />
                <div className="not-prose my-8 rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1F396D]">The Tell-Tale Heart: Opening Close Reading</p>
                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-800">
                    <p className="font-bold text-slate-950">Teacher thesis for chunking</p>
                    <p className="mt-1">
                      These are short reading chunks, not full paragraphs. We separated them this way so students can practice one comprehension move at a time: noticing contradiction, checking credibility, identifying obsession, separating denial from motive, and naming the central conflict.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <PassageExcerpt number={1}>The narrator begins by insisting he is not mad, even though he admits he has been extremely nervous.</PassageExcerpt>
                    <PassageExcerpt number={2}>He claims his senses have become sharper, especially his hearing, and says he can calmly explain the whole story.</PassageExcerpt>
                    <PassageExcerpt number={3}>Then he admits that an idea entered his mind and stayed there day and night.</PassageExcerpt>
                    <PassageExcerpt number={4}>He says he had no anger toward the old man and did not want money.</PassageExcerpt>
                    <PassageExcerpt number={5}>Instead, he focuses on the old man&apos;s pale eye and says the eye made his blood run cold.</PassageExcerpt>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Attribution note: this classroom-style adaptation is based on Poe&apos;s original opening. The original public-domain text includes the phrases &quot;very, very dreadfully nervous,&quot; &quot;why will you say that I am mad?&quot; and &quot;I heard many things in hell.&quot;
                  </p>
                </div>

                <DecodeBlock number={1} title="Notice the narrator's contradiction">
                  <p>
                    Excerpt 1 gives students the first contradiction: the narrator insists he is not mad, but he also admits he has been <Evidence>extremely nervous</Evidence>.
                  </p>
                  <p>
                    ELA teacher move: ask students, &quot;Can both things be true?&quot; This helps them see that the narrator may not be reliable.
                  </p>
                </DecodeBlock>

                <DecodeBlock number={2} title="Track what the narrator claims about himself">
                  <p>
                    Excerpt 2 matters because the narrator wants the reader to trust him. He says his senses are sharper and that he can <Evidence>calmly explain the whole story</Evidence>.
                  </p>
                  <p>
                    Students should underline this because it is a claim about credibility. Later, they can compare this claim with his actions.
                  </p>
                </DecodeBlock>

                <DecodeBlock number={3} title="Find the obsession">
                  <p>
                    In excerpt 3, the key detail is that the idea stayed with him <Evidence>day and night</Evidence>. That phrase shows obsession, not calm reasoning.
                  </p>
                  <p>
                    A strong reader notices that repeated thinking can become a motive, even before the narrator fully explains what he wants to do.
                  </p>
                </DecodeBlock>

                <DecodeBlock number={4} title="Separate motive from denial">
                  <p>
                    Excerpt 4 is important because the narrator denies normal motives: <Evidence>no anger</Evidence> and <Evidence>did not want money</Evidence>.
                  </p>
                  <p>
                    If he had no anger and did not want money, students should ask, &quot;Then why is he telling this story?&quot; That question prepares them for excerpt 5.
                  </p>
                </DecodeBlock>

                <DecodeBlock number={5} title="Identify the detail that reveals the conflict">
                  <p>
                    Excerpt 5 reveals the conflict: the narrator focuses on the old man&apos;s <Evidence>pale eye</Evidence> and says it made his <Evidence>blood run cold</Evidence>.
                  </p>
                  <p>
                    This is the evidence students need for a claim about irrational fear. The narrator does not hate the man; he fixates on one physical detail.
                  </p>
                </DecodeBlock>

                <div className="not-prose my-10 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <SearchCheck className="h-7 w-7 text-[#1D9E75]" aria-hidden />
                    <h3 className="mt-3 text-lg font-bold text-slate-950">Claim</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">The narrator is unreliable because his emotions contradict his claims.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <Highlighter className="h-7 w-7 text-[#F16112]" aria-hidden />
                    <h3 className="mt-3 text-lg font-bold text-slate-950">Evidence</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">&quot;Extremely nervous,&quot; &quot;day and night,&quot; and &quot;blood run cold&quot; are the underlined proof.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <Quote className="h-7 w-7 text-[#1F396D]" aria-hidden />
                    <h3 className="mt-3 text-lg font-bold text-slate-950">Explanation</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">Those details show the narrator is driven by fear and fixation, even while claiming control.</p>
                  </div>
                </div>

                <BrainstormExercise />

                <h2>Evidence sentence frame students can use</h2>
                <p>
                  Give students this frame until the habit becomes automatic:
                </p>
                <blockquote>
                  <p>I think ___ because the text says ___, which shows ___.</p>
                </blockquote>
                <p>
                  Example: I think the narrator is unreliable because the text says he is <Evidence>extremely nervous</Evidence> and thinks about the idea <Evidence>day and night</Evidence>, which shows he is not as calm as he claims.
                </p>

                <h2>Why this method works</h2>
                <p>
                  The Institute of Education Sciences practice guide on improving reading comprehension recommends teaching students comprehension strategies, helping them use text structure, and guiding focused discussion about meaning. Reading Rockets also explains that reading depends on both word recognition and language comprehension, which includes vocabulary, background knowledge, and inference. For story context, The Poe Museum notes that The Tell-Tale Heart was first published in 1843 and provides the public-domain text.
                </p>
                <p>
                  In parent language: students need more than &quot;read it again.&quot; They need a repeatable process for noticing words, connecting details across short passages, and explaining the evidence.
                </p>

                <h2>Parent practice routine</h2>
                <ol>
                  <li>Read one short excerpt aloud.</li>
                  <li>Ask, &quot;What is happening literally?&quot;</li>
                  <li>Ask, &quot;Which words matter most?&quot;</li>
                  <li>Underline only the proof words.</li>
                  <li>Use the sentence frame: &quot;I think ___ because the text says ___.&quot;</li>
                </ol>
                <p>
                  Keep it short. One excerpt practiced carefully is often more valuable than five pages read quickly with no evidence.
                </p>

                <h2>Sources and further reading</h2>
                <ul>
                  <li>
                    Edgar Allan Poe, <cite>The Tell-Tale Heart</cite>. First published in <cite>The Pioneer</cite>, January 1843. Public-domain text via The Poe Museum:{' '}
                    <a href="https://poemuseum.org/the-tell-tale-heart/" target="_blank" rel="noreferrer">
                      The Tell-Tale Heart by Edgar Allan Poe
                    </a>.
                  </li>
                  <li>
                    Wikisource transcription:{' '}
                    <a href="https://en.wikisource.org/wiki/Mystery_Tales_of_Edgar_Allan_Poe/The_Tell-Tale_Heart" target="_blank" rel="noreferrer">
                      Mystery Tales of Edgar Allan Poe/The Tell-Tale Heart
                    </a>.
                  </li>
                  <li>
                    Optional practice stories for the student exercise: O. Henry, <cite>The Gift of the Magi</cite>, in <cite>The Four Million</cite>; and Saki, <cite>The Open Window</cite>. Use public-domain editions and credit the author and publication source.
                  </li>
                  <li>
                    Institute of Education Sciences / What Works Clearinghouse:{' '}
                    <a href="https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/readingcomp_pg_092810.pdf" target="_blank" rel="noreferrer">
                      Improving Reading Comprehension in Kindergarten Through 3rd Grade
                    </a>.
                  </li>
                  <li>
                    Reading Rockets:{' '}
                    <a href="https://www.readingrockets.org/topics/about-reading/articles/simple-view-reading" target="_blank" rel="noreferrer">
                      The Simple View of Reading
                    </a>.
                  </li>
                </ul>

                <h2>How GrowWise teaches this</h2>
                <p>
                  At GrowWise, students do not just answer comprehension questions. They learn how to decode the excerpt, underline evidence, explain why the evidence matters, and write a complete response. If your child reads quickly but struggles to prove answers, start with our{' '}
                  <Link href={publicPath('/resources/reading-fluency-vs-comprehension', locale)}>reading fluency versus comprehension guide</Link> or{' '}
                  <Link href={publicPath('/book-assessment', locale)}>book a free reading assessment</Link>.
                </p>
              </div>
              <BlogFaqAccordion
                id="tell-tale-heart-faq-heading"
                heading="Citation, annotation, and close-reading FAQ"
                subheading="Parent and teacher questions about proving answers, decoding hard passages, and turning strong reading into stronger writing."
                faqs={[...BLOG_FAQS]}
              />
            </div>
          </div>
        </article>

        <BlogPostConversionSection
          locale={locale}
          programHref="/academic/english"
          programLabel="Explore English Programs"
          headline="Want your child to cite evidence with confidence?"
          subtext="A free GrowWise reading assessment can show whether the gap is decoding, vocabulary, comprehension, or written response."
          relatedPosts={RELATED_GUIDES}
        />
      </div>
    </>
  )
}
