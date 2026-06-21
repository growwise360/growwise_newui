import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, CircleDot, Ruler, User } from 'lucide-react'

import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'why-is-my-child-struggling-with-fractions'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/child-struggling-with-fractions-parent-guide.webp'
const HEADLINE = 'Why Is My Child Struggling With Fractions? A Parent Guide to Fractions, Models, and Common Mistakes'
const DESCRIPTION =
  'Why are fractions so hard? Learn common fraction mistakes, visual models, number-line strategies, and how parents can help children understand fractions.'
const PUBLISHED_DATE = '2026-06-20'

const BLOG_FAQS = [
  {
    question: 'Why does my child struggle with fractions?',
    answer:
      'Fractions are difficult because they do not follow every whole-number rule. Children must coordinate the numerator and denominator, understand equal-sized parts, compare quantities, recognize equivalence, and place fractions on a number line.',
  },
  {
    question: 'Why does a bigger denominator mean a smaller fraction?',
    answer:
      'When the whole stays the same, a larger denominator means the whole was divided into more equal parts, so each part is smaller. One eighth is smaller than one fourth because eighths are smaller pieces than fourths.',
  },
  {
    question: 'Why can’t children add the denominators?',
    answer:
      'The denominator names the size of the parts. When adding fractions with the same denominator, the part size does not change, so only the number of parts changes. Two eighths plus three eighths equals five eighths, not five sixteenths.',
  },
  {
    question: 'What is the best way to explain fractions to a child?',
    answer:
      'Connect three representations: a visual area model, a number line, and fraction notation. Ask the child to identify the whole, divide it into equal parts, name one part, and locate the same value on a number line.',
  },
  {
    question: 'Do weak multiplication facts cause fraction problems?',
    answer:
      'They can. Equivalent fractions, common denominators, simplification, and fraction multiplication become harder when multiplication and division facts are not fluent. However, fact practice alone will not repair a weak understanding of fraction size.',
  },
  {
    question: 'When should my child get extra help with fractions?',
    answer:
      'Consider targeted support when mistakes persist across several weeks, the child relies on memorized rules without explaining them, cannot compare simple fractions, confuses numerator and denominator, or struggles to transfer a model to an equation.',
  },
] as const

const RELATED_GUIDES = [
  {
    title: 'Common Core Math Strategies for Parents',
    href: '/growwise-blogs/common-core-math-strategies-parents',
    description: 'Learn how number lines, area models, and tape diagrams support mathematical reasoning.',
  },
  {
    title: 'Elementary Math Programs',
    href: '/academic/math/elementary',
    description: 'Build number sense, operations, fractions, and problem-solving foundations.',
  },
  {
    title: 'Middle School Math Programs',
    href: '/academic/math/middle-school',
    description: 'Strengthen fractions, ratios, proportions, expressions, and pre-algebra skills.',
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(BLOG_PATH, locale, baseUrl)
  return {
    title: 'Why Is My Child Struggling With Fractions? Parent Guide',
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
        alt: 'Parent helping a child understand fraction circles, fraction strips, and a number line',
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
      <h2 className="text-2xl font-bold text-slate-950">Fractions FAQ for Parents</h2>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...BLOG_FAQS])) }}
      />

      <div className="min-h-screen bg-[#f6f8fb]">
        <section className="bg-[#1F396D] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href={publicPath('/growwise-blogs', locale)} className="mb-6 inline-flex items-center text-sm font-semibold text-white/85 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Back to Blogs
            </Link>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{HEADLINE}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              Fractions become much easier when children can see their size, connect models to symbols, and explain why a rule works.
            </p>
            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#F16112] bg-white p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <CircleDot className="h-6 w-6 text-[#F16112]" aria-hidden /> Quick Answer
              </h2>
              <p className="mt-3 leading-7 text-slate-800">
                Children struggle with fractions because fractions do not behave like whole numbers. They must understand parts of a whole, equal-sized groups, number lines, equivalent fractions, and why the numerator and denominator work together. Memorizing rules before those ideas are secure often creates recurring mistakes.
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
                  A child may be successful with addition and multiplication, then suddenly feel lost when fractions appear. That jump is common because fraction understanding requires a new way of thinking about number size, equivalence, and operations.
                </p>
                <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Image src={BLOG_IMAGE_URL} alt="Parent helping a child understand fraction circles, fraction strips, and a number line" width={1600} height={900} priority sizes="(max-width: 768px) 100vw, 900px" className="h-auto w-full" />
                  <figcaption className="px-5 py-3 text-sm text-slate-600">Fraction circles, strips, and number lines help children connect equal parts to numerical size.</figcaption>
                </figure>

                <h2>Why are fractions harder than whole numbers?</h2>
                <p>
                  With whole numbers, a larger numeral usually represents a larger quantity. Fractions require children to consider two numbers at once. The value depends on both how many equal parts exist and how many of those parts are being counted.
                </p>
                <p>
                  The U.S. Department of Education&apos;s evidence guide on{' '}
                  <a href="https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/fractions_pg_093010.pdf" target="_blank" rel="noreferrer">
                    effective fractions instruction
                  </a>{' '}
                  recommends building understanding with number lines, visual representations, equivalence, and conceptually grounded procedures.
                </p>

                <h2>What do the numerator and denominator mean?</h2>
                <p>
                  The denominator tells how many equal parts make one whole. The numerator tells how many of those equal parts are being considered. In three fourths, the whole is divided into four equal parts and three are selected.
                </p>
                <p>
                  The word <strong>equal</strong> matters. If a pizza is cut into four unequal pieces, one piece cannot automatically be called one fourth. Ask: “What is the whole, and are all the parts the same size?”
                </p>

                <h2>Why doesn’t a bigger denominator mean a bigger fraction?</h2>
                <p>
                  When the whole is fixed, dividing it into more pieces makes each piece smaller. One eighth is smaller than one fourth even though eight is greater than four. Comparing fraction strips or locating both fractions on a number line makes this relationship visible.
                </p>

                <h2>Common fraction mistake #1: adding the denominators</h2>
                <p>
                  Children may add one third and one third as two sixths because they treat the numerator and denominator as separate whole numbers. But the parts remain thirds, so one third plus one third equals two thirds.
                </p>
                <p>
                  For unlike denominators, children need equivalent fractions with a common part size. The goal is not merely to memorize “find a common denominator,” but to understand that quantities can only be combined directly when the units match.
                </p>

                <h2>Common fraction mistake #2: confusing the part and the whole</h2>
                <p>
                  A fraction has meaning only in relation to its whole. One half of a small brownie is not the same amount as one half of a large brownie. Students can also count shaded pieces correctly but use the wrong total number of equal parts as the denominator.
                </p>

                <h2>Common fraction mistake #3: weak multiplication facts</h2>
                <p>
                  Multiplication and division facts support equivalent fractions, common denominators, simplification, and operations. A child who must labor over every fact has less attention available for the fraction concept.
                </p>
                <p>
                  Still, facts are only one layer. A student can know that three times four equals twelve and remain unsure why three fourths equals nine twelfths. Models should establish equivalence before procedures become automatic.
                </p>

                <h2>How do number lines help with fractions?</h2>
                <p>
                  A number line treats a fraction as a number with a location, not only as a shaded piece. Start with zero and one, divide the distance into equal intervals, and identify where fractions belong. This helps students compare size, understand improper fractions, and see that many equivalent names can occupy the same point.
                </p>
                <div className="not-prose my-8 rounded-xl border-l-4 border-[#1D9E75] bg-emerald-50 p-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950"><Ruler className="h-5 w-5 text-[#1D9E75]" aria-hidden />Try this at home</h3>
                  <p className="mt-3 leading-7 text-slate-700">Draw a line from zero to one. Ask your child to place one half, one fourth, and three fourths. Then ask which fraction is closest to zero, one half, and one—and how they know.</p>
                </div>

                <h2>How do visual fraction models help?</h2>
                <p>
                  Use fraction circles for parts of a whole, fraction strips for comparison and equivalence, and sets of objects for fractions of a group. Always connect the model to spoken language and notation so the child does not treat the picture as a separate activity.
                </p>
                <ol>
                  <li>Identify the whole.</li>
                  <li>Confirm that the parts are equal.</li>
                  <li>Name the size of one part.</li>
                  <li>Count the selected parts.</li>
                  <li>Write the fraction and place it on a number line.</li>
                </ol>

                <h2>How can parents help with fractions at home?</h2>
                <ul>
                  <li>Use measuring cups, recipes, paper folding, and equal sharing.</li>
                  <li>Ask children to estimate whether an answer should be less than, equal to, or greater than one.</li>
                  <li>Compare fractions with the same numerator or denominator before teaching shortcuts.</li>
                  <li>Ask “why?” after a correct answer, not only after a mistake.</li>
                  <li>Connect every rule to a model or number-line explanation.</li>
                </ul>

                <h2>When does a child need extra fraction support?</h2>
                <p>
                  Look for patterns: repeatedly adding denominators, believing the larger denominator creates the larger value, confusing unequal pieces, forgetting procedures immediately, or being unable to explain a simple fraction with a drawing.
                </p>
                <p>
                  Not sure whether your child has a fraction gap or a calculation gap? Explore GrowWise{' '}
                  <Link href={publicPath('/academic/math', locale)}>math programs</Link> or{' '}
                  <Link href={publicPath('/book-assessment', locale)}>book a free math assessment</Link>. We identify whether the underlying issue is fraction meaning, number sense, multiplication fluency, or operation strategy.
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
          headline="Is it a fraction gap or a calculation gap?"
          subtext="A free GrowWise math assessment can identify the exact concept preventing your child from moving forward."
          relatedPosts={RELATED_GUIDES}
        />
      </div>
    </>
  )
}
