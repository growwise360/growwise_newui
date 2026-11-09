import type { Metadata } from 'next'
import Link from 'next/link'

import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { EditorialBlogPage } from '@/components/blogs/EditorialBlogPage'
import { generateArticleSchema, generateFAQPageSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

const SLUG = 'tutoring-vs-teaching-what-parents-should-pay-for'
const PATH = `/growwise-blogs/${SLUG}` as const
const IMAGE = '/images/blogs/tutoring-vs-teaching-structured-learning.webp'
const HEADLINE = 'Tutoring vs. Teaching: What Should Parents Actually Be Paying For?'
const DESCRIPTION = 'Learn the difference between homework help and structured teaching—and what parents should expect from an effective tutoring program.'
const DATE = '2026-09-02'

const FAQS = [
  { question: 'What is the difference between tutoring and teaching?', answer: 'Homework-focused tutoring starts with the immediate assignment. Structured teaching starts with an assessment, identifies specific gaps, follows a learning plan, and checks whether the student can apply and retain each skill independently.' },
  { question: 'When is homework help enough?', answer: 'Homework help may be enough when a student has strong foundations but missed a class, needs clarification on one topic, is preparing for a specific test, or occasionally needs help organizing assignments.' },
  { question: 'What should a tutoring learning plan include?', answer: 'A useful learning plan identifies the student’s starting point, names observable skill goals, sequences instruction, includes guided and independent practice, and explains how mastery will be reassessed and reported.' },
  { question: 'How should a tutoring program measure mastery?', answer: 'Mastery should include more than correct answers. A student should be able to explain the reasoning, apply the skill to an unfamiliar example, retain it over time, and complete the work with decreasing support.' },
  { question: 'Should effective tutoring make a child less dependent on help?', answer: 'Yes. Support may be substantial at first, but effective instruction gradually shifts responsibility to the student so they can start, choose strategies, detect errors, and complete similar work independently.' },
] as const

const RELATED = [
  { title: 'How to Tell If Tutoring Is Working', href: '/growwise-blogs/how-to-tell-if-tutoring-is-working', description: 'The evidence parents should expect after tutoring begins.' },
  { title: 'Why Grades Hide Learning Gaps', href: '/resources/why-grades-hide-learning-gaps', description: 'Why finished work and grades can conceal fragile understanding.' },
  { title: 'How to Build Homework Independence', href: '/resources/homework-independence', description: 'Practical steps that reduce dependence on nightly help.' },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const url = absoluteSiteUrl(PATH, locale, baseUrl)
  return { title: 'Tutoring vs. Teaching: What Is the Difference?', description: DESCRIPTION, alternates: { canonical: url }, openGraph: { title: HEADLINE, description: DESCRIPTION, url, type: 'article', publishedTime: `${DATE}T00:00:00.000Z`, modifiedTime: `${DATE}T00:00:00.000Z`, images: [{ url: `${baseUrl}${IMAGE}`, width: 1600, height: 900, alt: 'Student learning independently while an educator guides a structured skill plan' }] } }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  const pageUrl = absoluteSiteUrl(PATH, locale, baseUrl)
  const article = generateArticleSchema({ headline: HEADLINE, description: DESCRIPTION, url: pageUrl, image: `${baseUrl}${IMAGE}`, datePublished: DATE, dateModified: DATE, author: { type: 'Organization', name: 'GrowWise Education Team' } })
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema([...FAQS])) }} />
    <BreadcrumbSchema items={[{ name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) }, { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) }, { name: HEADLINE, url: pageUrl }]} />
    <EditorialBlogPage locale={locale} headline={HEADLINE} dek="Homework help can solve tonight’s problem. Structured teaching builds a skill a student can use next month and beyond." publishedLabel="September 2, 2026" publishedDate={DATE} image={IMAGE} imageAlt="Student solving math independently while an educator guides a structured learning plan" quickAnswer="Tutoring often focuses on the assignment a student brings today. Structured teaching begins with assessment, targets underlying gaps, follows a sequenced learning plan, and verifies independent mastery. Parents should know whether they are paying for task completion, durable skill development, or a deliberate combination of both." faqs={FAQS} faqHeading="Tutoring vs. teaching FAQ" programHref="/academic" programLabel="Explore Math & English Programs" ctaHeadline="Looking for more than help with tonight’s worksheet?" ctaSubtext="GrowWise combines assessment, structured teaching, practice, and progress reporting to build skills students can use independently." relatedPosts={RELATED}>
      <p className="lead">Your child has a difficult assignment due tomorrow. A tutor helps finish the worksheet, corrects the errors, and prepares the student for the quiz.</p>
      <p>That support can be valuable. But did it solve tonight’s problem, or did it build a skill the student can use next month?</p>
      <p>The word “tutoring” covers many different services. Some provide supervision and homework help. Others deliver structured instruction based on assessment and long-term goals. Parents deserve to know which one they are paying for.</p>
      <h2>Homework help focuses on the immediate task</h2>
      <p>Homework support usually begins with whatever the student brings that day. The goal is to complete the assignment, understand the current lesson, or prepare for an upcoming test.</p>
      <p>This approach can be useful when a student:</p>
      <ul><li>Missed a class</li><li>Needs clarification on one topic</li><li>Is preparing for a specific exam</li><li>Has strong foundations but occasionally gets stuck</li><li>Needs help organizing assignments</li></ul>
      <p>The limitation is that the assignment controls the session. If the homework does not reveal the real gap, that gap may never be addressed.</p>
      <h2>Teaching begins with what the student needs to learn</h2>
      <p>Structured teaching uses the student’s current performance as evidence, not as the entire plan.</p>
      <ol><li>Assess current skills.</li><li>Identify strengths and specific gaps.</li><li>Set observable learning goals.</li><li>Teach concepts in a logical sequence.</li><li>Provide guided and independent practice.</li><li>Reassess to verify mastery.</li><li>Communicate progress to parents.</li></ol>
      <p>Homework may still be supported, but it does not replace the learning plan.</p>
      <h2>Tutoring vs. teaching at a glance</h2>
      <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[640px] text-left"><thead className="bg-[#1F396D] text-white"><tr><th className="p-4">Question</th><th className="p-4">Homework help</th><th className="p-4">Structured teaching</th></tr></thead><tbody className="divide-y divide-slate-200"><tr><th className="p-4">What sets the agenda?</th><td className="p-4">Today’s assignment</td><td className="p-4">Assessment and learning goals</td></tr><tr className="bg-slate-50"><th className="p-4">Primary outcome</th><td className="p-4">Complete or understand the immediate task</td><td className="p-4">Build transferable, retained skills</td></tr><tr><th className="p-4">How is progress checked?</th><td className="p-4">Finished work or the next grade</td><td className="p-4">Explanation, transfer, retention, and independence</td></tr></tbody></table></div>
      <h2>Why the distinction matters</h2>
      <p>Imagine a student who struggles with algebra because operations with fractions are not secure. A homework-focused session may help the student finish tonight’s equations. The next assignment may create the same difficulty because the fraction gap remains.</p>
      <p>A teaching-focused program identifies the prerequisite weakness, teaches it directly, checks that the student can use it independently, and then connects it back to algebra.</p>
      <p>The same pattern appears in English. A tutor can edit an essay sentence by sentence. A teacher identifies whether the student needs instruction in comprehension, thesis development, paragraph structure, evidence, grammar, or revision—and builds those skills deliberately.</p>
      <h2>Questions to ask a tutoring provider</h2>
      <ul><li>How do you determine my child’s starting point?</li><li>Will there be a written learning plan?</li><li>How do you identify foundational gaps?</li><li>Is instruction based only on school homework?</li><li>How do you check whether a skill has been mastered?</li><li>Will my child practice independently?</li><li>How often will I receive progress updates?</li><li>What will those updates measure?</li><li>How do you adjust instruction when progress stalls?</li><li>Is the goal for my child to become less dependent on help?</li></ul>
      <p>Clear answers reveal whether the service is organized around completed work or lasting growth. Our guide to <Link href={publicPath('/growwise-blogs/how-to-tell-if-tutoring-is-working', locale)}>measuring whether tutoring is working</Link> explains the evidence to watch after instruction begins.</p>
      <h2>What meaningful progress looks like</h2>
      <p>In math, progress might mean the student can accurately add fractions with unlike denominators, explain the method, and apply it in a word problem. In English, it might mean the student can identify a main idea, select relevant evidence, and write a paragraph that explains the connection.</p>
      <p>Grades and confidence matter, but they are stronger when supported by observable skill development.</p>
      <h2>The best support builds independence</h2>
      <p>A student may need substantial guidance at first. Over time, the balance should shift. The student attempts more, explains more, catches more errors, and uses strategies without prompting.</p>
      <p>If a child can succeed only while a tutor sits beside them, the support has not yet produced independence.</p>
      <p>At GrowWise, we teach, assess, identify gaps, reteach, and verify mastery. Parents receive regular progress reports so they can see which skills are improving and where more support is needed.</p>
    </EditorialBlogPage>
  </>
}
