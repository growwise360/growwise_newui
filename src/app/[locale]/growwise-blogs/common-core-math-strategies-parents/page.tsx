import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Grid2X2,
  MoveRight,
  Shapes,
  User,
} from 'lucide-react'

import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'common-core-math-strategies-parents'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/common-core-math-strategies-parents.webp'

const HEADLINE =
  'Common Core Math Strategies Parents Can Use at Home: Number Lines, Area Models, and Bar Models Explained'
const DESCRIPTION =
  'Confused by Common Core math homework? Learn number lines, area models, bar models, place value strategies, and how to help without teaching the wrong way.'
const PUBLISHED_DATE = '2026-06-20'

const BLOG_FAQS = [
  {
    question: 'Why does Common Core math look so different?',
    answer:
      'Common Core math often looks different because students are asked to show their thinking with models, drawings, number lines, equations, and explanations. The goal is to build conceptual understanding and procedural fluency, not to reject efficient standard methods.',
  },
  {
    question: 'Is Common Core math harder than traditional math?',
    answer:
      'It can feel harder at first because students must explain why a method works. The extra reasoning is intended to help students transfer their skills to unfamiliar and multi-step problems instead of relying only on memorized steps.',
  },
  {
    question: 'Should parents teach the traditional algorithm at home?',
    answer:
      'Parents can discuss the traditional algorithm, but they should first help the child use the strategy requested by the teacher. Once the child understands the place value or model behind the problem, connect that reasoning to the efficient algorithm.',
  },
  {
    question: 'What is an area model in math?',
    answer:
      'An area model is a rectangle divided into smaller sections to show how a multiplication problem can be decomposed. For 23 × 14, the sections represent 20 × 10, 20 × 4, 3 × 10, and 3 × 4.',
  },
  {
    question: 'What is a bar model or tape diagram?',
    answer:
      'A bar model, also called a tape diagram, uses rectangular bars to show relationships between quantities. It helps students see totals, missing parts, comparisons, equal groups, fractions, and ratios before choosing an operation.',
  },
  {
    question: 'Why can my child calculate but still struggle with word problems?',
    answer:
      'Calculation and problem representation are different skills. A child may know a procedure but still struggle to identify what is known, what is unknown, how quantities relate, or which operation matches the situation.',
  },
  {
    question: 'When should a child stop using math models?',
    answer:
      'A child can rely less on drawings when they can explain the concept, choose an efficient strategy, calculate accurately, and check whether the answer is reasonable. Models should build understanding and remain available when a new or difficult problem calls for them.',
  },
] as const

const RELATED_GUIDES = [
  {
    title: 'Why Grades Hide Learning Gaps',
    href: '/resources/why-grades-hide-learning-gaps',
    description: 'Learn why a solid grade can coexist with fragile math understanding.',
  },
  {
    title: 'Elementary Math Programs',
    href: '/academic/math/elementary',
    description: 'Explore concept-based math support for elementary students.',
  },
  {
    title: 'Middle School Math Programs',
    href: '/academic/math/middle-school',
    description: 'Build stronger reasoning, fractions, ratios, equations, and problem-solving skills.',
  },
] as const

const STRATEGIES = [
  {
    name: 'Number line',
    bestFor: 'Addition, subtraction, fractions, decimals, elapsed time, and negative numbers',
    parentPrompt: 'Where did you start, and why did you choose those jumps?',
  },
  {
    name: 'Area model',
    bestFor: 'Multi-digit multiplication, fractions, place value, and the distributive property',
    parentPrompt: 'What does each section represent, and how do the partial products combine?',
  },
  {
    name: 'Bar model or tape diagram',
    bestFor: 'Word problems, comparison, equal groups, missing parts, fractions, and ratios',
    parentPrompt: 'What relationship does the drawing show before you choose an operation?',
  },
  {
    name: 'Place value decomposition',
    bestFor: 'Regrouping, mental math, addition, subtraction, multiplication, and decimals',
    parentPrompt: 'What is the value of each digit, and how can you break the number apart?',
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
    title: 'Common Core Math Strategies Parents Can Use at Home',
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title: HEADLINE,
      description: DESCRIPTION,
      url,
      type: 'article',
      publishedTime: PUBLISHED_DATE,
      images: [
        {
          url: `${baseUrl}${BLOG_IMAGE_URL}`,
          width: 1600,
          height: 900,
          alt: 'Parent helping a child use a number line, area model, and bar model for Common Core math',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: HEADLINE,
      description: DESCRIPTION,
      images: [`${baseUrl}${BLOG_IMAGE_URL}`],
    },
  }
}

function StrategyTable() {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead className="bg-[#1F396D] text-white">
          <tr>
            <th className="px-5 py-4 text-sm font-bold">Strategy</th>
            <th className="px-5 py-4 text-sm font-bold">Best used for</th>
            <th className="px-5 py-4 text-sm font-bold">A useful parent question</th>
          </tr>
        </thead>
        <tbody>
          {STRATEGIES.map((strategy, index) => (
            <tr key={strategy.name} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <th className="border-t border-slate-200 px-5 py-4 text-sm font-bold text-slate-900">
                {strategy.name}
              </th>
              <td className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">
                {strategy.bestFor}
              </td>
              <td className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">
                “{strategy.parentPrompt}”
              </td>
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
      <h2 className="text-2xl font-bold text-slate-950">Common Core Math FAQ for Parents</h2>
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
    author: {
      type: 'Organization',
      name: 'GrowWise Education Team',
    },
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
        <section className="bg-[#1F396D] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href={publicPath('/growwise-blogs', locale)}
              className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Back to Blogs
            </Link>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{HEADLINE}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              A parent-friendly guide to the visual strategies children use for arithmetic, multiplication, fractions,
              and word problems—and the questions that help without taking over.
            </p>

            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#F16112] bg-white p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <Shapes className="h-6 w-6 text-[#F16112]" aria-hidden />
                Quick Answer
              </h2>
              <p className="mt-3 leading-7 text-slate-800">
                Common Core math strategies help students understand why a calculation works before they rely only on
                a memorized procedure. Number lines show movement and distance, area models break multiplication into
                place-value parts, and bar models show relationships in word problems. Parents can help by asking the
                child to explain the model, then connect it to an efficient equation or algorithm.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden />
                <span>GrowWise Education Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden />
                <time dateTime={PUBLISHED_DATE}>June 20, 2026</time>
              </div>
            </div>
          </div>
        </section>

        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <p className="lead text-xl text-slate-800">
                  Common Core math can feel unfamiliar because the homework may ask for a drawing, model, or written
                  explanation when an adult remembers solving the same problem with one stacked algorithm. The model
                  is not meant to make arithmetic needlessly complicated. It is meant to reveal place value,
                  relationships, and reasoning that a shortcut can hide.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Image
                    src={BLOG_IMAGE_URL}
                    alt="Parent helping a child use a number line, area model, and bar model for Common Core math"
                    width={1600}
                    height={900}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    className="h-auto w-full"
                  />
                  <figcaption className="px-5 py-3 text-sm text-slate-600">
                    Number lines, area models, and bar models make mathematical relationships visible before students
                    move to faster procedures.
                  </figcaption>
                </figure>

                <h2>What is Common Core math trying to build?</h2>
                <p>
                  Common Core math aims to develop both understanding and fluency. Students should calculate
                  accurately, but they should also make sense of problems, represent quantities, explain reasoning,
                  choose useful tools, and check whether an answer is reasonable.
                </p>
                <p>
                  The official{' '}
                  <a href="https://www.thecorestandards.org/Math/Practice/" target="_blank" rel="noreferrer">
                    Standards for Mathematical Practice
                  </a>{' '}
                  emphasize problem solving, quantitative reasoning, modeling, precision, and recognizing structure.
                  That is why students may be asked to solve one problem in more than one way.
                </p>
                <p>
                  For example, a student should eventually know that <strong>24 × 13 = 312</strong>. Before treating
                  the procedure as a set of steps, the student should also see that the problem can be decomposed into
                  <strong> 24 × 10</strong> and <strong>24 × 3</strong>, estimated, modeled, and checked.
                </p>
              </div>

              <StrategyTable />

              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <h2>1. How does a number line strategy work?</h2>
                <p>
                  A number line shows numbers in order and makes movement, distance, and magnitude visible. Students
                  can use it for addition, subtraction, elapsed time, fractions, decimals, and negative numbers.
                </p>

                <div className="not-prose my-8 rounded-xl border-l-4 border-[#1D9E75] bg-emerald-50 p-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                    <MoveRight className="h-5 w-5 text-[#1D9E75]" aria-hidden />
                    Example: 38 + 27
                  </h3>
                  <ol className="mt-4 space-y-2 text-slate-700">
                    <li>Start at 38.</li>
                    <li>Jump forward 20 to reach 58.</li>
                    <li>Jump forward 7 to reach 65.</li>
                    <li>Therefore, 38 + 27 = 65.</li>
                  </ol>
                </div>

                <p>
                  The important idea is not the drawing itself. The child is decomposing 27 into 20 and 7 and tracking
                  how each part changes the total. A useful parent prompt is: <em>“Why did you choose those jumps?”</em>
                </p>

                <h2>2. What is an area model?</h2>
                <p>
                  An area model is a rectangle divided into sections. Each section represents one partial product,
                  helping students connect multi-digit multiplication to place value and the distributive property.
                </p>

                <div className="not-prose my-8 rounded-xl border-l-4 border-[#F16112] bg-orange-50 p-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                    <Grid2X2 className="h-5 w-5 text-[#F16112]" aria-hidden />
                    Example: 23 × 14
                  </h3>
                  <div className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
                    <p>20 × 10 = 200</p>
                    <p>20 × 4 = 80</p>
                    <p>3 × 10 = 30</p>
                    <p>3 × 4 = 12</p>
                  </div>
                  <p className="mt-4 font-semibold text-slate-900">200 + 80 + 30 + 12 = 322</p>
                </div>

                <p>
                  This is the same mathematics that appears inside the standard multiplication algorithm, but the
                  place-value parts remain visible. Later, the same structure supports fraction multiplication and
                  algebraic expressions.
                </p>

                <h2>3. What is a bar model or tape diagram?</h2>
                <p>
                  A bar model, also called a tape diagram, uses rectangular bars to show how quantities relate. It is
                  especially useful when a child can calculate but does not know which operation a word problem needs.
                </p>
                <p>
                  Suppose Lena has 24 stickers and Maya has three times as many. One bar represents Lena&apos;s 24.
                  Three equal bars represent Maya&apos;s amount, so the relationship is <strong>24 × 3 = 72</strong>.
                </p>
                <p>
                  Before discussing an operation, ask: <em>“What is happening between these quantities?”</em> The
                  student should identify whether the problem shows a total, a missing part, a comparison, equal
                  groups, or a multiplicative relationship.
                </p>

                <h2>4. What is place value decomposition?</h2>
                <p>
                  Place value decomposition means breaking a number into the value represented by each digit. For
                  example, <strong>456 = 400 + 50 + 6</strong>. This helps students understand regrouping instead of
                  treating “carrying” or “borrowing” as unexplained rules.
                </p>
                <p>
                  To solve <strong>456 + 238</strong>, a student can add hundreds, tens, and ones: 400 + 200 = 600,
                  50 + 30 = 80, and 6 + 8 = 14. Combining the parts gives <strong>694</strong>.
                </p>

                <h2>5. What are partial products?</h2>
                <p>
                  Partial products are the smaller multiplication results that make up a larger product. For
                  <strong> 34 × 6</strong>, a student can calculate <strong>30 × 6 = 180</strong> and
                  <strong> 4 × 6 = 24</strong>, then combine them to get <strong>204</strong>.
                </p>
                <p>
                  Partial products also make estimation easier. Since 34 × 6 is slightly more than 30 × 6, an answer
                  near 180 is reasonable; an answer such as 2,040 should trigger a place-value check.
                </p>

                <h2>Do students still need the standard algorithm?</h2>
                <p>
                  Yes. Visual models are a bridge to efficient and accurate procedures, not a permanent replacement
                  for them. A strong progression is: understand the quantities, model the relationship, explain the
                  reasoning, connect the model to an equation, and then use an efficient algorithm fluently.
                </p>
                <p>
                  Students are ready to rely less on a model when they can choose the operation, explain what the
                  numbers mean, estimate the result, calculate accurately, and check whether the answer makes sense.
                </p>

                <h2>Common mistakes parents make when helping</h2>

                <h3>Teaching only the shortcut</h3>
                <p>
                  “Let me show you the faster way” may produce tonight&apos;s answer while making the classroom method
                  more confusing. Ask what strategy the teacher expects, understand that strategy first, and then show
                  how it connects to the familiar algorithm.
                </p>

                <h3>Searching for keywords in word problems</h3>
                <p>
                  Rules such as “altogether means add” fail when problems become more complex. Help the child identify
                  what is known, what is unknown, and how the quantities relate before choosing an operation.
                </p>

                <h3>Doing the thinking for the child</h3>
                <p>
                  A parent can make every step look clear while the child remains passive. Pause after each prompt and
                  let the child decide what happens next.
                </p>

                <h3>Treating every model as unnecessary extra work</h3>
                <p>
                  A model earns its place when it reveals the source of an error. A tape diagram can expose a mistaken
                  comparison, an area model can reveal a missing partial product, and decomposition can uncover weak
                  place value.
                </p>

                <h2>A five-step homework routine for parents</h2>
                <ol>
                  <li>
                    <strong>Read the problem aloud.</strong> Slow down long or multi-step directions.
                  </li>
                  <li>
                    <strong>Name the goal.</strong> Ask what the problem wants the student to find.
                  </li>
                  <li>
                    <strong>Choose a representation.</strong> Use a number line, area model, bar model, or place-value
                    chart when it clarifies the relationship.
                  </li>
                  <li>
                    <strong>Connect the model to an equation.</strong> The drawing and symbols should describe the same
                    mathematics.
                  </li>
                  <li>
                    <strong>Check for independence.</strong> Change the numbers and ask the child to solve a similar
                    problem without copying.
                  </li>
                </ol>

                <div className="not-prose my-8 rounded-xl border border-[#1F396D]/15 bg-[#F7FAFC] p-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-[#1F396D]">
                    <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" aria-hidden />
                    Questions that help without giving away the answer
                  </h3>
                  <ul className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
                    <li>What do you know?</li>
                    <li>What are you trying to find?</li>
                    <li>What does this part of the model represent?</li>
                    <li>Why did you choose that operation?</li>
                    <li>Can you estimate before calculating?</li>
                    <li>Does your answer make sense?</li>
                  </ul>
                </div>

                <h2>Signs your child may need extra math support</h2>
                <p>
                  Extra support may help when a child repeatedly calculates correctly but cannot solve word problems,
                  chooses operations by guessing, makes persistent place-value errors, forgets a method quickly, or
                  cannot solve a similar problem after following an example.
                </p>
                <p>
                  These patterns do not necessarily mean the child is not trying. They often point to a specific gap
                  in number sense, language, representation, or prerequisite knowledge. GrowWise uses assessment and
                  error patterns to identify that gap rather than simply assigning more of the same worksheet.
                </p>
                <p>
                  Families in Dublin, Pleasanton, San Ramon, Livermore, and nearby Tri-Valley communities can explore
                  our <Link href={publicPath('/academic/math', locale)}>math programs</Link> or{' '}
                  <Link href={publicPath('/book-assessment', locale)}>book a free assessment</Link> to identify the
                  concept that needs attention.
                </p>

                <h2>The bottom line</h2>
                <p>
                  Common Core math strategies are useful when they make thinking visible. Number lines show movement,
                  area models reveal place value in multiplication, bar models clarify word-problem relationships, and
                  decomposition explains regrouping. The parent&apos;s most valuable job is not to supply a faster
                  answer—it is to ask the question that helps the child see the mathematics.
                </p>
              </div>

              <FaqBlock />
            </div>
          </div>
        </article>

        <BlogPostConversionSection
          locale={locale}
          programHref="/academic/math"
          programLabel="Explore Math Programs"
          headline="Still unsure where your child’s math confusion begins?"
          subtext="A GrowWise assessment can identify whether the gap is calculation, place value, word-problem reasoning, or a missing prerequisite skill."
          relatedPosts={RELATED_GUIDES}
        />
      </div>
    </>
  )
}
