import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  Calendar,
  CheckCircle2,
  Eye,
  Lightbulb,
  ShieldCheck,
  User,
} from 'lucide-react'

import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const BLOG_SLUG = 'can-chatgpt-replace-a-tutor-ai-homework-help'
const BLOG_PATH = `/growwise-blogs/${BLOG_SLUG}` as const
const BLOG_IMAGE_URL = '/images/blogs/ai-homework-help-parent-guide.webp'

const HEADLINE = 'Can ChatGPT Replace a Tutor? A Parent Guide to AI Homework Help'
const DESCRIPTION =
  'Can ChatGPT replace a tutor? Learn what AI homework help does well, where it fails, what counts as cheating, and when children need human support.'
const PUBLISHED_DATE = '2026-06-17'

const COMPARISON_ROWS = [
  {
    need: 'Explain a concept another way',
    ai: 'Often useful, but may be confidently wrong',
    tutor: 'Adjusts the explanation after observing the student',
  },
  {
    need: 'Generate examples or practice questions',
    ai: 'Fast and flexible',
    tutor: 'Targets the exact skill and difficulty level',
  },
  {
    need: 'Diagnose the underlying learning gap',
    ai: 'Limited without reliable assessment evidence',
    tutor: 'Can study error patterns and ask follow-up questions',
  },
  {
    need: 'Verify independent understanding',
    ai: 'Weak when the student can copy or accept the answer',
    tutor: 'Can require explanation, retrieval, and independent work',
  },
  {
    need: 'Notice frustration, avoidance, or low confidence',
    ai: 'Cannot reliably read the whole child',
    tutor: 'Can respond to behavior, emotion, and effort in real time',
  },
  {
    need: 'Provide accountability and a learning plan',
    ai: 'Can suggest a plan',
    tutor: 'Can monitor whether the plan is actually working',
  },
] as const

const AI_RULES = [
  {
    level: 'Green',
    tone: 'border-[#1D9E75] bg-emerald-50',
    icon: CheckCircle2,
    iconClass: 'text-[#1D9E75]',
    summary: 'AI supports thinking that the student still owns.',
    examples: [
      'Explain a term in simpler language',
      'Create a short practice quiz',
      'Give one more example after the student tries',
      'Ask questions about a completed draft',
      'Suggest what the student should verify',
    ],
  },
  {
    level: 'Yellow',
    tone: 'border-amber-400 bg-amber-50',
    icon: Eye,
    iconClass: 'text-amber-700',
    summary: 'AI may help, but an adult or teacher should set boundaries.',
    examples: [
      'Suggest an outline before writing',
      'Give hints for a multi-step problem',
      'Check calculations or grammar',
      'Summarize a difficult passage',
      'Brainstorm project ideas',
    ],
  },
  {
    level: 'Red',
    tone: 'border-red-400 bg-red-50',
    icon: AlertTriangle,
    iconClass: 'text-red-700',
    summary: 'AI replaces the student, hides the gap, or creates a safety risk.',
    examples: [
      'Write the assignment or solve every problem',
      'Invent sources, quotes, or citations',
      'Imitate the student so the work looks original',
      'Complete a test, quiz, or graded assessment',
      'Upload private student, school, or family information',
    ],
  },
] as const

const BLOG_FAQS = [
  {
    question: 'Can ChatGPT replace a tutor?',
    answer:
      'ChatGPT can explain concepts, generate examples, and create practice questions, but it cannot reliably replace a tutor who diagnoses learning gaps, observes student behavior, adjusts instruction, verifies independent mastery, and provides accountability.',
  },
  {
    question: 'Is using ChatGPT for homework cheating?',
    answer:
      'It depends on the assignment and school policy. Using AI to generate work that the student submits as their own is generally inappropriate. Using AI for an explanation, a practice quiz, or feedback may be acceptable when the teacher permits it and the student still completes the thinking.',
  },
  {
    question: 'How can parents tell whether AI is hiding a learning gap?',
    answer:
      'Ask the child to close the AI tool and explain the idea, solve a similar problem, or write a short response independently. If performance collapses without the tool, AI may be masking a gap rather than supporting learning.',
  },
  {
    question: 'What is a safe way for students to use AI for homework?',
    answer:
      'Start with the student attempting the work. Use AI for one explanation, hint, example, or practice question. Then close the tool and require the student to explain or complete a similar task independently.',
  },
  {
    question: 'When does a child need a human tutor instead of AI help?',
    answer:
      'A human tutor is a better next step when mistakes repeat, homework depends on constant prompting, the child cannot explain completed work, confidence is falling, or parents do not know which foundational skill is missing.',
  },
] as const

const RELATED_GUIDES = [
  {
    title: 'How to Build Homework Independence',
    href: '/resources/homework-independence',
    description: 'A practical system for helping children complete work without nightly parent rescue.',
  },
  {
    title: 'Why Grades Hide Learning Gaps',
    href: '/resources/why-grades-hide-learning-gaps',
    description: 'How completed assignments and acceptable grades can still conceal fragile understanding.',
  },
  {
    title: 'What Is Vibe Coding?',
    href: '/resources/what-is-vibe-coding',
    description: 'A parent guide to AI-assisted building, its value, and the skills students still need.',
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
    title: 'Can ChatGPT Replace a Tutor? Parent Guide (2026)',
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
          height: 900,
          alt: 'Parent guiding a student who uses an AI homework assistant while solving work independently',
        },
      ],
    },
  }
}

function ComparisonTable() {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-[#1F396D] text-white">
          <tr>
            <th className="px-5 py-4 text-sm font-bold">Learning need</th>
            <th className="px-5 py-4 text-sm font-bold">ChatGPT or another AI tool</th>
            <th className="px-5 py-4 text-sm font-bold">Qualified human tutor</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row, index) => (
            <tr key={row.need} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <th className="border-t border-slate-200 px-5 py-4 text-sm font-bold text-slate-900">{row.need}</th>
              <td className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">{row.ai}</td>
              <td className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">
                {row.tutor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AiUseRules() {
  return (
    <div className="not-prose my-8 grid gap-4 lg:grid-cols-3">
      {AI_RULES.map((rule) => {
        const Icon = rule.icon
        return (
          <section key={rule.level} className={`rounded-xl border-l-4 p-5 ${rule.tone}`}>
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
              <Icon className={`h-5 w-5 ${rule.iconClass}`} aria-hidden />
              {rule.level}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{rule.summary}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {rule.examples.map((example) => (
                <li key={example} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

function FaqBlock() {
  return (
    <section className="not-prose mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-950">AI Homework Help FAQ</h2>
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
              AI can explain, quiz, and brainstorm. The harder question is whether your child is still learning, or
              simply completing work faster.
            </p>

            <div className="llm-answer-block mt-6 rounded-xl border-l-4 border-[#F16112] bg-white p-6 text-slate-900 shadow-lg">
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <Bot className="h-6 w-6 text-[#F16112]" aria-hidden />
                Quick Answer
              </h2>
              <p className="mt-3 leading-7 text-slate-800">
                ChatGPT can support learning, but it cannot reliably replace a qualified tutor. AI can provide
                explanations, examples, and practice questions. A tutor can diagnose learning gaps, notice confusion,
                adjust instruction, verify independent mastery, and provide accountability. The best approach uses AI
                as a supervised learning tool, not as the person doing the student&apos;s thinking.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden />
                <span>GrowWise Education Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden />
                <time dateTime={PUBLISHED_DATE}>June 17, 2026</time>
              </div>
            </div>
          </div>
        </section>

        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <p className="lead text-xl text-slate-800">
                  A child can now paste a question into an AI tool and receive a polished explanation in seconds. That
                  can be useful. It can also make completed homework look like understanding when the student could not
                  solve or explain the same idea alone.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Image
                    src={BLOG_IMAGE_URL}
                    alt="Parent guiding a student who uses an AI homework assistant while solving work independently"
                    width={1600}
                    height={900}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    className="h-auto w-full"
                  />
                  <figcaption className="px-5 py-3 text-sm text-slate-600">
                    Healthy AI homework use keeps the student explaining, checking, and completing the thinking.
                  </figcaption>
                </figure>

                <h2>Can ChatGPT replace a tutor?</h2>
                <p>
                  ChatGPT can imitate parts of tutoring, but it cannot reliably replace the full job of a tutor. It can
                  explain a fraction problem, suggest a thesis statement, or generate vocabulary practice. It does not
                  automatically know why a specific child is stuck, whether the child understands the answer, or which
                  earlier skill caused today&apos;s problem.
                </p>
                <p>
                  The distinction matters because homework completion and learning are not the same outcome. A student
                  may finish an assignment with AI and still be unable to retrieve the concept tomorrow, apply it to a
                  new problem, or explain the reasoning without help.
                </p>

                <h2>AI tutor vs. human tutor</h2>
                <p>
                  AI is strongest when the task is immediate and narrow. Human tutoring is strongest when the problem
                  requires diagnosis, adaptation, motivation, and proof of independent understanding.
                </p>
              </div>

              <ComparisonTable />

              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <h2>What AI homework help does well</h2>
                <p>
                  Used carefully, AI can reduce friction around a difficult concept. It can give a second explanation,
                  create extra examples, turn notes into a practice quiz, or ask a student questions about a draft.
                  These uses are especially helpful when the student has already attempted the work.
                </p>
                <p>
                  The U.S. Department of Education&apos;s report on{' '}
                  <a
                    href="https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    AI and the future of teaching and learning
                  </a>{' '}
                  emphasizes keeping humans involved in educational decisions and designing AI around learning goals.
                  That is a useful parent rule too: begin with the skill your child needs to learn, then decide whether
                  AI supports that goal.
                </p>

                <h2>What AI cannot reliably do</h2>
                <p>
                  An AI response can sound certain even when the answer, source, or reasoning is wrong. It also cannot
                  see the full pattern across schoolwork unless a family provides extensive information, which creates
                  additional privacy concerns and still may not produce a valid diagnosis.
                </p>
                <p>
                  More importantly, AI usually sees the prompt, not the learner. It cannot reliably notice that a child
                  is guessing, avoiding reading, losing confidence, copying a procedure without understanding it, or
                  depending on prompts for every next step.
                </p>

                <h2>Is using ChatGPT for homework cheating?</h2>
                <p>
                  The answer depends on the assignment and the school&apos;s policy. A simple test is ownership: did AI
                  support the student&apos;s thinking, or did it produce work the student is presenting as their own?
                </p>
                <p>
                  If the teacher allows AI, students should still disclose its use when required, verify claims and
                  sources, and be able to explain the final work independently. If the assignment is intended to measure
                  unaided writing, calculation, recall, or reasoning, using AI to produce the answer defeats the purpose
                  of the assessment.
                </p>

                <h2>The green, yellow, and red rules for student AI use</h2>
                <p>
                  Families need rules children can remember. Use this framework before opening an AI tool.
                </p>
              </div>

              <AiUseRules />

              <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:font-semibold prose-a:text-[#1F396D]">
                <h2>AI guidance by age</h2>

                <h3>Elementary school</h3>
                <p>
                  Keep AI use adult-guided and occasional. Young students need direct practice with reading, writing,
                  number sense, memory, and verbal explanation. AI should not become the default way they begin or
                  finish homework.
                </p>

                <h3>Middle school</h3>
                <p>
                  Teach students to attempt the task first, ask for a hint rather than a complete answer, and verify the
                  result with class notes or a trusted source. This is also the age to discuss fabricated information,
                  privacy, and school rules explicitly.
                </p>

                <h3>High school</h3>
                <p>
                  Students can use AI more independently, but the standard should rise with them. They should compare
                  sources, identify assumptions, test code or calculations, cite permitted assistance, and defend their
                  final reasoning. AI literacy means evaluating a tool, not merely knowing how to prompt it.
                </p>
                <p>
                  UNESCO&apos;s{' '}
                  <a
                    href="https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"
                    target="_blank"
                    rel="noreferrer"
                  >
                    guidance for generative AI in education and research
                  </a>{' '}
                  recommends age-appropriate, human-centered use and attention to privacy, safety, and educational
                  purpose.
                </p>

                <h2>How to tell whether AI is hiding a learning gap</h2>
                <p>
                  Do not judge by whether the homework is finished. Remove the tool and ask for fresh evidence of
                  understanding.
                </p>
                <ol>
                  <li>
                    <strong>Ask for an explanation:</strong> &quot;Why does this method work?&quot;
                  </li>
                  <li>
                    <strong>Change the problem:</strong> Use different numbers, a new passage, or another example.
                  </li>
                  <li>
                    <strong>Ask for the first step:</strong> Students with a real plan can usually begin without a
                    prompt.
                  </li>
                  <li>
                    <strong>Wait one day:</strong> Check whether the student can retrieve the idea later.
                  </li>
                  <li>
                    <strong>Look for a pattern:</strong> One difficult assignment is normal; repeated dependence points
                    to a gap.
                  </li>
                </ol>

                <div className="not-prose my-8 rounded-xl border-l-4 border-[#F16112] bg-orange-50 p-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                    <Lightbulb className="h-5 w-5 text-[#F16112]" aria-hidden />
                    The closed-laptop test
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    After AI helps, close the laptop. Ask the student to solve a similar problem or explain the idea
                    aloud. If the learning disappears when the tool closes, the tool completed the task but did not
                    build independence.
                  </p>
                </div>

                <h2>When your child needs a human tutor</h2>
                <p>
                  Consider an assessment or tutor when the same mistakes keep returning, homework requires constant
                  prompting, the child cannot explain completed work, grades and independent performance do not match,
                  or confidence is falling.
                </p>
                <p>
                  Start by identifying the job. If the issue is a math or reading gap, explore GrowWise{' '}
                  <Link href={publicPath('/academic', locale)}>academic programs</Link> or{' '}
                  <Link href={publicPath('/book-assessment', locale)}>book a free assessment</Link>. If the goal is to
                  understand how AI works and use it responsibly, review our{' '}
                  <Link href={publicPath('/future-skills/ai-machine-learning', locale)}>
                    AI and machine learning pathway
                  </Link>
                  .
                </p>

                <h2>A five-step AI homework routine</h2>
                <ol>
                  <li>
                    <strong>Attempt first.</strong> The student writes what they know and marks the exact point of
                    confusion.
                  </li>
                  <li>
                    <strong>Ask narrowly.</strong> Request one hint, explanation, example, or checking question.
                  </li>
                  <li>
                    <strong>Verify.</strong> Compare the response with notes, a textbook, teacher instructions, or a
                    reliable source.
                  </li>
                  <li>
                    <strong>Close the tool.</strong> Complete a similar task without AI.
                  </li>
                  <li>
                    <strong>Explain.</strong> The student states what they learned and where they still need help.
                  </li>
                </ol>

                <h2>Sources and further guidance</h2>
                <ul>
                  <li>
                    <a
                      href="https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      U.S. Department of Education: Artificial Intelligence and the Future of Teaching and Learning
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"
                      target="_blank"
                      rel="noreferrer"
                    >
                      UNESCO: Guidance for Generative AI in Education and Research
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.commonsensemedia.org/research/the-dawn-of-the-ai-era-teens-parents-and-the-adoption-of-generative-ai-at-home-and-school"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Common Sense Media: Teens, Parents, and the Adoption of Generative AI
                    </a>
                  </li>
                </ul>
              </div>

              <div className="not-prose mt-10 rounded-xl border border-[#1F396D]/15 bg-[#F7FAFC] p-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-[#1F396D]">
                  <ShieldCheck className="h-6 w-6 text-[#1D9E75]" aria-hidden />
                  The parent standard
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  AI use is productive when the child becomes more capable without it. If the tool makes work look
                  better while independent understanding stays the same, change the routine or get human support.
                </p>
              </div>

              <FaqBlock />
            </div>
          </div>
        </article>

        <BlogPostConversionSection
          locale={locale}
          programHref="/future-skills/ai-machine-learning"
          programLabel="Explore Responsible AI Skills"
          headline="Is AI helping your child learn, or hiding the gap?"
          subtext="A GrowWise assessment can identify the skill your child needs to strengthen before more tools become the answer."
          relatedPosts={RELATED_GUIDES}
        />
      </div>
    </>
  )
}
