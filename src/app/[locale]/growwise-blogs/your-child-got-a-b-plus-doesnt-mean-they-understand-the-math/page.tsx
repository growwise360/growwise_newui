import { Metadata } from 'next'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { generatePageMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { BlogFaqAccordion } from '@/components/blogs/BlogFaqAccordion'
import { DetectiveChallengeList, SelfCheckGapFaqBlock } from '@/components/blogs/SelfCheckGapFaqBlock'
import { FRACTION_GAP_IDS, getGapFaq } from '@/lib/selfCheckGapFaqs'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { CONTACT_INFO } from '@/lib/constants'

const BLOG_SLUG = 'your-child-got-a-b-plus-doesnt-mean-they-understand-the-math'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/your-child-got-a-b-plus-math-understanding.png'

const HERO_IMAGE_ALT =
  'B+ grade on the surface with a larger iceberg below representing hidden math understanding gaps'

const CANONICAL_SITE_URL = getCanonicalSiteUrl()

const HEADLINE = "Your Child Got a B+. That Doesn't Mean They Understand the Math."

const DESCRIPTION =
  'Why a B+ can hide math gaps in Tri-Valley schools and how Dublin parents can spot real understanding, mistake patterns, and memorization before algebra.'

/** BlogPosting description (JSON-LD) — fuller than meta description for AEO. */
const ARTICLE_SCHEMA_DESCRIPTION =
  'Grades measure performance — not understanding. Here is what grades miss, why learning gaps stay hidden in competitive school districts, and how to spot them at home.'

const ARTICLE_KEYWORDS = [
  'math learning gap',
  'learning gap signs',
  'child struggling with math',
  'grades vs understanding',
  'math gap elementary school',
  'how to identify learning gaps',
  'fraction gap grade 5',
  'academic enrichment Dublin CA',
] as const

/** Visible FAQ accordion + FAQPage JSON-LD — must match exactly (AEO / rich results). */
const BLOG_FAQS = [
  {
    question: 'Can a child have good grades and still have a math learning gap?',
    answer:
      'Yes — and this is one of the most common situations in competitive school districts like Dublin and Pleasanton. Grades measure how a student performed on specific material at a specific time. They do not reveal whether the student genuinely understands the concept or has learned to work around a gap using memorized steps. A child can score a B+ on a fractions test by memorizing the procedure while still holding a fundamental misconception about how fractions work. That gap stays hidden until the curriculum builds on it — usually in Grade 6 or 7 — when it suddenly becomes visible.',
  },
  {
    question: 'What is a math learning gap?',
    answer:
      'A math learning gap is a conceptual misunderstanding — not just a wrong answer. It forms when a child learns a procedure without understanding why it works. The most common example: a child who believes that a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/5 because 8 > 5). This misconception forms in Grade 3, stays hidden because the child can still do simpler fraction tasks, and then blocks understanding of ratios, proportions, and pre-algebra in middle school. A gap is different from a slip (a careless mistake) or a bad day — it is a stable, persistent pattern of wrong thinking.',
  },
  {
    question: 'Why does my child understand math in class but make mistakes on tests?',
    answer:
      'This usually means your child has recognition-level understanding, not retrieval-level understanding. In class, they can follow along with an example the teacher just showed. On a test, they have to independently retrieve and apply the method without a prompt. Those are different cognitive skills. A child who gets it during a lesson but struggles on a test has not yet encoded the concept deeply enough to reproduce it under independent conditions. The fix is not more studying of the same problems — it is interleaved practice where different problem types are mixed so the child has to identify which method applies, not just execute a just-shown procedure.',
  },
  {
    question: 'How can I tell if my child has a math learning gap at home?',
    answer:
      'The fastest method: ask your child to explain their answer, not just give it. A child with genuine understanding can tell you why their first step is correct. A child with a gap will give you the answer but freeze when asked to explain, or will give a reason that reveals a misconception (e.g., putting the bigger number on top because bigger is always more). Specific tests: ask which is bigger, 1/5 or 1/8 — a child with a fraction gap will say 1/8. Ask 2 + 3 × 4 = ? — a child with an order of operations gap will say 20 instead of 14. Confident wrong answers are almost always gaps, not slips.',
  },
  {
    question: 'Why does my child struggle with fractions?',
    answer:
      'The most common reason is whole-number bias: children apply rules they learned for whole numbers to fractions, where those rules do not work. For example, they compare fractions by looking at the denominator size (thinking 1/8 > 1/5 because 8 is bigger), or they add fractions by adding both numerators and denominators separately (getting 2/5 instead of 5/6 for 1/2 + 1/3). These are not random mistakes — they are logical rules the child has constructed that work in some contexts and fail in others. They do not resolve with more practice of the same type; they require a direct conceptual correction.',
  },
  {
    question: 'What happens if a fraction learning gap is not addressed?',
    answer:
      'Fraction fluency is a gateway skill. Research from the National Mathematics Advisory Panel shows that fraction knowledge in upper elementary directly predicts algebra performance in middle school. A student who carries a fraction gap into Grade 6 will typically struggle with ratios, proportions, percentages, and pre-algebra — not because those topics are harder, but because they all require fraction fluency as a foundation. The gap compounds: each new topic that requires fractions becomes harder, and the child accumulates a sense of being bad at math that is actually the result of one unresolved conceptual gap.',
  },
  {
    question: 'Is my child bad at math, or are they missing foundational skills?',
    answer:
      "Bad at math is almost never accurate. What looks like a general math inability is almost always a specific foundational gap — in place value, fractions, integer operations, or early algebra — that was never directly addressed. If a child has a specific gap in fraction comparison that formed in Grade 3, that gap can be identified and corrected in a few targeted sessions. GrowWise offers a free math self-check and diagnostic sessions to identify exactly which gaps are present before recommending any program.",
  },
  {
    question: 'What is the difference between a learning gap and a learning disability in math?',
    answer:
      'A learning gap is a missing or incorrect concept — it forms when instruction moved too fast, a concept was introduced without sufficient foundation, or a misconception was never corrected. It is extremely common and fully addressable with targeted teaching. A learning disability (such as dyscalculia) involves neurological difficulty with number processing that persists across contexts and interventions. A child with a gap typically has uneven performance (strong in some math areas, weak in specific ones) and their errors follow a logical pattern. A child with dyscalculia typically struggles consistently across all number-based tasks. Most children who struggle with math have gaps, not disabilities.',
  },
  {
    question: 'How long does it take to fix a math learning gap?',
    answer:
      'It depends on the type and how long the gap has been present. A fraction comparison misconception caught in Grade 4 typically resolves in 3–5 targeted sessions. The same gap caught in Grade 7, after it has been reinforced for three additional years and has caused downstream confusion in ratios and proportions, takes considerably longer — often 4–8 weeks of structured work. This is why early identification matters. A gap found early is a small problem. The same gap found late is a big one.',
  },
  {
    question: 'What math enrichment programs are available in Dublin CA for Grades 3–12?',
    answer: `GrowWise School at ${CONTACT_INFO.street}, Dublin CA offers small-group enrichment programs for Grades 3–12 including Accelerated Math, Math Olympiad Prep (AMC8), Roblox Game Development, AI Entrepreneur Studio, Scratch Programming, Robotics Camp, and Young Authors Camp. Class sizes are 8–12 students. All programs are project-based with tangible student deliverables. GrowWise is an approved enrichment provider for Oak Grove School District's ELOP program. Free diagnostic sessions are available to identify learning gaps before enrollment. Call ${CONTACT_INFO.phone} or visit ${CANONICAL_SITE_URL}.`,
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return generatePageMetadata({
    locale,
    path: BLOG_PATH,
    type: 'article',
    title: "B+ Doesn't Mean Math Understanding | GrowWise",
    description: DESCRIPTION,
    keywords: ARTICLE_KEYWORDS.join(', '),
    image: `${CANONICAL_SITE_URL}${BLOG_IMAGE_URL}`,
    imageAlt: HERO_IMAGE_ALT,
    publishedTime: '2026-05-20T00:00:00.000Z',
    modifiedTime: '2026-05-20T00:00:00.000Z',
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

  const selfCheckUrl = absoluteSiteUrl('/self-check', locale, baseUrl)

  const articleSchema = {
    ...generateArticleSchema({
      headline: HEADLINE,
      description: ARTICLE_SCHEMA_DESCRIPTION,
      url: pageUrl,
      image: absImage,
      author: { name: 'Anshika Verma', type: 'Person' },
      datePublished: '2026-05-20',
      dateModified: '2026-05-20',
    }),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    keywords: [...ARTICLE_KEYWORDS],
    articleSection: 'Learning Gaps',
    about: [
      { '@type': 'Thing', name: 'Learning gaps in mathematics' },
      { '@type': 'Thing', name: 'Academic performance vs conceptual understanding' },
      { '@type': 'Thing', name: 'K-12 math enrichment' },
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
    relatedLink: [selfCheckUrl, absoluteSiteUrl('/book-assessment', locale, baseUrl)],
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Your Child Got a B+. That Doesn&apos;t Mean They Understand the Math.
            </h1>

            <Link
              href="/growwise-blogs"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
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
                <time dateTime="2026-05-20">May 20, 2026</time>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              <p className="lead text-xl text-gray-700 mb-4 font-medium">
                Here&apos;s what grades actually measure — and what they quietly miss.
              </p>

              <p className="text-gray-700 mb-6">
                Your child brings home a B+ in math. You feel good. They feel okay about it. Life moves on.
              </p>

              <div className="llm-answer-block not-prose mb-8 rounded-xl border-l-4 border-[#F16112] bg-[#F7FAFC] p-5 text-gray-800">
                A B+ can still hide a math learning gap because grades measure performance on recent work, not
                always conceptual understanding. Parents should look for repeated mistake patterns, confident wrong
                explanations, and memorized steps that break when problems change.
              </div>

              <p className="text-gray-700 mb-6">
                But here&apos;s what the B+ doesn&apos;t tell you: whether your child actually{' '}
                <em>understands</em> the math, or whether they&apos;ve learned to work around the parts they
                don&apos;t.
              </p>

              <p className="text-gray-700 mb-8">
                These are not the same thing. And in competitive school districts, the gap between them tends to
                stay hidden — until it suddenly isn&apos;t.
              </p>

              {/* Featured Image — same pattern as other GrowWise blog posts */}
              <figure className="not-prose not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px]">
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt="Iceberg metaphor: a B+ grade is the visible tip; hidden math gaps lie beneath"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  your child got a b plus doesnt mean they understand the math visual guide for GrowWise families.
                </figcaption>
              </figure>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                What do grades measure, and what do they miss?
              </h2>

              <p className="text-gray-700 mb-6">
                A grade reflects how a student did on the specific material taught that quarter. It rewards
                memorization, effort, test-taking skill, and homework completion. It does not — and cannot — tell
                you whether the underlying concept has been genuinely understood or quietly patched over.
              </p>

              <p className="text-gray-700 mb-6">
                Research from the National Mathematics Advisory Panel identifies three distinct types of student
                errors: slips (random mistakes that self-correct), bugs (wrong rules applied consistently), and
                gaps (missing conceptual understanding that persists even after re-teaching).
              </p>

              <p className="text-gray-700 mb-6">
                Slips show up as grade deductions. Bugs and gaps often don&apos;t — because students learn to
                compensate.
              </p>

              <p className="text-gray-700 mb-8">
                A student who doesn&apos;t understand <em>why</em> fractions work the way they do can still score
                well on a fractions test. They memorize the steps. They pattern-match from examples. They get the
                right answer by the wrong reasoning — until the material builds on itself and the patch no longer
                holds.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">The grade that hides the gap</h2>

              <p className="text-gray-700 mb-6">
                Here&apos;s a pattern that plays out often in Grades 5 through 7.
              </p>

              <p className="text-gray-700 mb-6">
                A student moves through elementary math performing adequately. They get Bs and Cs. No alarm bells.
                Parents assume the school is handling it. The student assumes they&apos;re &quot;not a math
                person&quot; and adjusts expectations accordingly.
              </p>

              <p className="text-gray-700 mb-6">
                What no one sees: the student has a fundamental misconception about how fractions work —
                specifically, that a bigger denominator means a bigger fraction (1/8 &gt; 1/5, because 8 is bigger
                than 5). This belief formed in Grade 3 and was never directly corrected.
              </p>

              <p className="text-gray-700 mb-6">
                On its own, in a Grade 3 context, this misconception rarely tanks a grade. The tests don&apos;t
                always surface it. The student works around it.
              </p>

              <p className="text-gray-700 mb-8">
                By Grade 7, that same student is struggling with ratios, proportions, and pre-algebra — topics that
                all depend on fraction fluency. Their grades slide. They feel behind. The cause is traced to
                &quot;they&apos;re not good at math,&quot; not to a specific, fixable misconception that has been
                compounding quietly for four years.
              </p>

              <p className="text-gray-700 mb-8">
                This is not unusual. Studies of math error patterns show that some of the most consequential
                misconceptions — particularly around fractions, place value, and algebraic thinking — are highly
                persistent precisely because they are easy to hide behind correct-looking procedures.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">
                Why Tri-Valley parents should care about this specifically
              </h2>

              <p className="text-gray-700 mb-6">
                Academic pressure in districts like Dublin, Pleasanton, and San Ramon starts early and compounds.
                Students here are compared to cohorts where a significant percentage are already ahead. When a gap
                exists, there&apos;s less slack — the curriculum moves fast, class sizes are large, and teachers
                rarely have time for individual diagnostic work.
              </p>

              <p className="text-gray-700 mb-6">
                The students most at risk are not the ones clearly struggling. They&apos;re the ones performing
                just well enough that no one looks closer.
              </p>

              <p className="text-gray-700 mb-8">
                A student who is &quot;getting by&quot; in Grade 5 with an undiagnosed fraction gap is likely to
                hit a wall in Grade 7 algebra that feels sudden but wasn&apos;t. The grade didn&apos;t predict it.
                The grade never could.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">What actually reveals a gap</h2>

              <p className="text-gray-700 mb-6">
                Gaps surface when you change the <em>form</em> of the question — not when you repeat it.
              </p>

              <p className="text-gray-700 mb-6">
                A student who has memorized fraction procedures will fail if you ask them: &quot;Which is larger —
                one-fifth or one-eighth?&quot; and require them to explain why without calculating. A student who
                genuinely understands fractions will answer correctly and explain that fewer cuts means bigger
                pieces.
              </p>

              <p className="text-gray-700 mb-6">
                That&apos;s the difference between procedural performance and conceptual understanding. One shows
                up on grades. The other shows up when the underlying thinking is tested directly.
              </p>

              <p className="text-gray-700 mb-8">
                The most effective way to surface a gap — without a formal assessment — is to ask your child to
                explain their reasoning, not just their answer. Wrong answers with confident, logical-sounding
                explanations are usually bugs or gaps, not slips. Slips come with uncertainty. Bugs come with
                conviction.
              </p>

              <h2 className="not-prose text-3xl font-bold text-[#1F396D] mt-12 mb-6">What to do if you suspect a gap</h2>

              <p className="text-gray-700 mb-6">
                Start with observation, not alarm. Ask your child one or two conceptual questions in the area
                you&apos;re curious about. Not &quot;what is 3/5 + 2/5?&quot; — but &quot;which fraction is
                bigger, and how do you know?&quot;
              </p>

              <p className="text-gray-700 mb-6">
                If you&apos;re not sure what to listen for, use the parent guides below — the same patterns as our
                free Detective Challenge self-check. Each maps to a known high-risk gap and shows what a red-flag
                answer sounds like.
              </p>

              <h3 className="not-prose text-xl font-bold text-[#1F396D] mt-8 mb-4">
                Parent guides: fraction gaps (most common behind a B+)
              </h3>

              {FRACTION_GAP_IDS.map((id) => (
                <SelfCheckGapFaqBlock key={id} faq={getGapFaq(id)} locale={locale} />
              ))}

              <DetectiveChallengeList locale={locale} />

              <div className="not-prose bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-semibold mb-3">
                  Try GrowWise&apos;s free parent self-check — a 10-minute diagnostic that flags the exact mistake
                  pattern, not just a general score.
                </p>
                <Button
                  asChild
                  className="bg-[#1F396D] hover:bg-[#29335C] text-white font-semibold"
                >
                  <Link href={publicPath('/self-check', locale)}>Start the Free Self-Check</Link>
                </Button>
              </div>

              <p className="text-gray-700 mb-6">
                For a deeper look at spotting gaps at home, see our guide on{' '}
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

              <p className="text-gray-700 mb-8">
                A gap found in Grade 5 takes weeks to fix. The same gap found in Grade 8 takes months — and costs
                confidence along the way.
              </p>

              <p className="text-gray-700 mb-8 text-lg font-medium">
                The B+ doesn&apos;t know that. But you can.
              </p>

              <div className="not-prose bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8">
                <p className="text-xl font-bold mb-4">Ready to go deeper?</p>
                <p className="mb-6">
                  GrowWise School runs small-group math programs for students in Grades 3–12 in Dublin, CA.
                  Programs are project-based, curriculum-aligned, and focused on genuine understanding — not test
                  prep.
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
                </div>
              </div>

              <p className="text-gray-600 text-sm italic border-t pt-6">
                GrowWise School runs small-group math programs for students in Grades 3–12 in Dublin, CA. Programs
                are project-based, curriculum-aligned, and focused on genuine understanding — not test prep. Learn
                more at{' '}
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
              id="b-plus-math-faq-heading"
              heading="Frequently asked questions about grades, math gaps, and enrichment in Dublin CA"
              subheading="Parent questions we hear in Tri-Valley — same topics as our free math self-check. Tap to expand."
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
