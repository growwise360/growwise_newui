import type { Metadata } from 'next'
import Link from 'next/link'

import { EditorialBlogPage } from '@/components/blogs/EditorialBlogPage'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const PATH = '/growwise-blogs/how-to-tell-if-tutoring-is-working' as const
const IMAGE = '/images/blogs/how-to-tell-if-tutoring-is-working.webp'
const HEADLINE = 'How Can You Tell Whether Tutoring Is Actually Working?'
const DESCRIPTION = 'Learn which signs, assessments, and progress measures show whether tutoring is creating real, lasting academic improvement.'
const DATE = '2026-09-02'

const FAQS = [
  { question: 'How can parents tell if tutoring is working?', answer: 'Compare the student’s current performance with a clear baseline. Look for better accuracy, stronger explanations, success on unfamiliar examples, retention over time, and less dependence on prompts—not only improved homework completion or grades.' },
  { question: 'How long should it take to see tutoring progress?', answer: 'The timeline depends on the starting point, attendance, skill complexity, and practice between sessions. A provider should still define short-term skill goals, report evidence regularly, and explain how instruction will change when progress stalls.' },
  { question: 'What should a tutoring progress report include?', answer: 'A useful report names what was taught, what the student can now do, the evidence of improvement, skills still developing, the student’s level of independence, and the next instructional goal.' },
  { question: 'Are better grades enough to prove tutoring is effective?', answer: 'No. Grades can change because of assignment weights, extra credit, retakes, or the current unit. Combine grades with targeted assessments, transfer tasks, explanations, retention checks, teacher feedback, and independence during practice.' },
  { question: 'What should happen if tutoring progress stalls?', answer: 'The provider should investigate the evidence and adapt. That may mean targeting a different prerequisite, changing the explanation or representation, adjusting difficulty, increasing guided practice, or considering attention, language, or learning needs.' },
] as const

const RELATED = [
  { title: 'Tutoring vs. Teaching', href: '/growwise-blogs/tutoring-vs-teaching-what-parents-should-pay-for', description: 'Understand what separates homework help from a structured learning program.' },
  { title: 'The Most Important Skill in the AI Era', href: '/growwise-blogs/thinking-gap-your-kids-arent-distracted', description: 'Why education must build judgment and independent thinking.' },
  { title: 'Why Grades Hide Learning Gaps', href: '/resources/why-grades-hide-learning-gaps', description: 'Look beyond a report-card average to the skills underneath.' },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl(); const url = absoluteSiteUrl(PATH, locale, baseUrl)
  return { title: 'How to Tell If Tutoring Is Working for Your Child', description: DESCRIPTION, alternates: { canonical: url }, openGraph: { title: HEADLINE, description: DESCRIPTION, url, type: 'article', publishedTime: `${DATE}T00:00:00.000Z`, modifiedTime: `${DATE}T00:00:00.000Z`, images: [{ url: `${baseUrl}${IMAGE}`, width: 1600, height: 900, alt: 'Parent and educator reviewing tutoring progress while a student works independently' }] } }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const baseUrl = getCanonicalSiteUrl(); const pageUrl = absoluteSiteUrl(PATH, locale, baseUrl)
  const article = generateArticleSchema({ headline: HEADLINE, description: DESCRIPTION, url: pageUrl, image: `${baseUrl}${IMAGE}`, datePublished: DATE, dateModified: DATE, author: { type: 'Organization', name: 'GrowWise Education Team' } })
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...FAQS])) }} />
    <BreadcrumbSchema items={[{ name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) }, { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) }, { name: HEADLINE, url: pageUrl }]} />
    <EditorialBlogPage locale={locale} headline={HEADLINE} dek="Attendance and completed worksheets are activities. Effective tutoring should produce observable, transferable, and increasingly independent skills." publishedLabel="September 2, 2026" publishedDate={DATE} image={IMAGE} imageAlt="Student working independently while a parent and educator review tutoring progress" quickAnswer="Tutoring is working when a child can do more without the tutor. Start with a skill-level baseline, set observable goals, reassess regularly, and look for accuracy, explanation, transfer to unfamiliar tasks, retention, and decreasing support. Grades and calmer homework matter, but they should not be the only evidence." faqs={FAQS} faqHeading="Tutoring progress FAQ" programHref="/academic" programLabel="Explore Assessment-Based Programs" ctaHeadline="Want a clearer view of what your child knows?" ctaSubtext="GrowWise uses assessment, targeted teaching, reassessment, and regular progress reporting to make improvement visible." relatedPosts={RELATED}>
      <p className="lead">Your child attends tutoring every week. The tutor is encouraging. Homework feels calmer. But after several months, an important question remains: is the tutoring actually working?</p>
      <p>Attendance is not progress. Completed worksheets are not progress. Even a child saying, “That session was good,” does not tell you whether skills are improving.</p>
      <p>Effective tutoring should produce evidence that a student knows more, can do more independently, and is better prepared for future learning.</p>
      <h2>Start with a clear baseline</h2>
      <p>It is difficult to measure growth without knowing the starting point. A useful initial assessment should identify more than a broad grade level. It should show which specific skills are secure, developing, or missing.</p>
      <p>In math, that might include fact fluency, fractions, proportional reasoning, computation, or algebraic thinking. In English, it might include vocabulary, comprehension, inference, paragraph structure, grammar, or evidence-based writing.</p>
      <p>The baseline gives instruction a purpose. It also gives parents something concrete to compare with later performance.</p>
      <h2>Look for a specific learning plan</h2>
      <p>“Improve math” is too broad to guide instruction or measure progress. Stronger goals are observable:</p>
      <ul><li>Solve multi-step equations accurately and explain each step.</li><li>Add and subtract fractions with unlike denominators independently.</li><li>Identify the main idea and support it with relevant details.</li><li>Write a focused paragraph with a claim, evidence, and explanation.</li></ul>
      <p>Parents should know what the current goals are, why they matter, and how mastery will be checked. If you are still comparing service models, read <Link href={publicPath('/growwise-blogs/tutoring-vs-teaching-what-parents-should-pay-for', locale)}>tutoring versus structured teaching</Link>.</p>
      <h2>Measure more than school grades</h2>
      <p>Grades matter, but they can change for many reasons: a new unit, different assignment weights, extra credit, test difficulty, or improved homework completion.</p>
      <ul><li>Diagnostic and follow-up assessment results</li><li>Accuracy on targeted skills</li><li>Ability to explain reasoning</li><li>Performance on unfamiliar examples</li><li>Retention after time has passed</li><li>Independence during practice</li><li>Teacher feedback</li><li>Changes in homework time and frustration</li><li>School grades and test results</li></ul>
      <h2>A practical tutoring progress scorecard</h2>
      <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['Accuracy','Can the student perform the targeted skill correctly?'],['Explanation','Can the student explain why the method works?'],['Transfer','Can the student handle a new format or unfamiliar example?'],['Retention','Does the skill remain after time has passed?'],['Independence','Can the student begin and continue with fewer prompts?']].map(([title,text]) => <section key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-bold text-[#1F396D]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{text}</p></section>)}</div>
      <h2>Ask whether support is decreasing</h2>
      <p>At the beginning, a student may need models, prompts, and guided practice. As learning develops, the tutor should gradually remove that support.</p>
      <ul><li>Starting tasks without waiting for a hint</li><li>Choosing an appropriate strategy</li><li>Explaining an answer in the student’s own words</li><li>Catching and correcting errors</li><li>Completing a similar problem independently</li><li>Remembering the skill in a later session</li></ul>
      <p>If performance remains strong only when the tutor leads every step, the student may be completing work without mastering it.</p>
      <h2>Expect reassessment, not just repetition</h2>
      <p>After teaching a skill, the program should check whether the student can use it accurately, explain it, apply it in a new context, and retain it. If the student cannot, instruction should change.</p>
      <h2>Progress reports should answer useful questions</h2>
      <p>A useful progress update should explain what was taught, what the student can now do, what evidence shows improvement, which skills still need support, whether the student is working independently, and what will be taught next.</p>
      <h2>When progress is slower than expected</h2>
      <p>Learning is not always linear. A student may need time to rebuild foundations, and progress may appear first in confidence or accuracy before it appears in grades.</p>
      <p>Still, a program should be able to explain a plateau and adapt based on evidence. “Just give it more time” is not a complete answer.</p>
      <h2>The clearest outcome is growing independence</h2>
      <p>The purpose of tutoring is not to create a student who always needs tutoring. It is to build knowledge, strategies, and confidence that the student can carry into class and future courses.</p>
      <p>At GrowWise, measurable progress is built into the learning process. We assess, identify gaps, teach, reteach when needed, and verify mastery.</p>
    </EditorialBlogPage>
  </>
}
