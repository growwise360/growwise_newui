'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FRONTMATTER,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_RELATED,
} from '@/data/resources/affordable-summer-academic-programs-dublin-ca'
import { publicPath } from '@/lib/publicPath'

const ARTICLE_HERO_IMAGE = '/assets/camps/acabanner.webp'

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale()
  return (
    <Link href={publicPath(href, locale)} className="font-semibold text-[#F16112] underline-offset-2 hover:underline">
      {children}
    </Link>
  )
}

export function AffordableSummerAcademicProgramsDublinCaPage() {
  return (
    <ResourceArticlePage
      slug="affordable-summer-academic-programs-dublin-ca"
      category={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.category}
      categoryLabel={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.categoryLabel}
      h1={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.h1}
      readTime={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.readTime}
      updated={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'An affordable summer academic program is not simply the lowest-priced option. It should offer clear instructional value through small groups, defined outcomes, skill-focused curriculum, and feedback tied to your child\'s actual needs.',
      }}
      faqs={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FAQS}
      relatedArticles={AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_RELATED}
      ctaHeading="Review GrowWise academic summer programs"
      ctaSubtext="See schedules, tracks, and enrollment details for Dublin, CA and Tri-Valley families."
      ctas={[
        { href: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FRONTMATTER.ctaUrl, label: AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_FRONTMATTER.ctaText },
        { href: '/book-assessment', label: 'Book Free Assessment' },
        { href: '/self-check', label: 'Self-Check' },
        { href: '/contact', label: 'Contact Us' },
      ]}
    >
      <p>
        Affordable summer academic programs in Dublin, CA and the Tri-Valley are not always the lowest-priced
        options — they are programs that deliver clear instructional value for the time and money you invest. The
        best fit depends on class size, structured outcomes, and whether the program addresses your child&apos;s
        grade-level needs rather than generic activity time.
      </p>

      <p>
        Summer programs in Dublin, Pleasanton, San Ramon, and nearby Tri-Valley communities can vary widely. Some
        are built mainly for childcare. Some focus on enrichment. Some are academic. Some are project-based. Some
        are structured. Some are mostly activity time.
      </p>

      <p>
        For parents, the question is not only, &quot;What does it cost?&quot; The better question is: &quot;What is
        my child actually getting from the program?&quot; An affordable summer program should not simply mean the
        lowest price. It should mean the program gives meaningful value for the time, money, and trust a parent is
        investing.
      </p>

      <h2>What do summer academic programs usually include?</h2>

      <p>Academic summer programs may focus on:</p>

      <ul>
        <li>Math readiness</li>
        <li>Reading support</li>
        <li>Writing skills</li>
        <li>Problem-solving</li>
        <li>Study habits</li>
        <li>Grade-level review</li>
        <li>Advanced enrichment</li>
        <li>School-year preparation</li>
      </ul>

      <p>
        Some programs are full-day. Some are half-day. Some run weekly. Some are built as multi-week academic
        sprints. The right fit depends on your child&apos;s age, current academic needs, and summer schedule.
      </p>

      <h2>Why can the cheapest summer program cost more later?</h2>

      <p>
        A lower-cost program can be a good choice if it is safe, structured, and aligned with your goals. But cheap
        does not always mean valuable.
      </p>

      <p>Parents should be cautious when a program has:</p>

      <ul>
        <li>No clear learning goal</li>
        <li>Very large groups</li>
        <li>Generic worksheets</li>
        <li>No assessment</li>
        <li>No instructor feedback</li>
        <li>No explanation of what students will learn</li>
        <li>No clear connection to grade-level skills</li>
      </ul>

      <p>
        If the child spends the week busy but does not build any measurable skill, the program may not be a good
        value. That does not mean every program needs to be intense. But parents should know what they are paying
        for. Use our{' '}
        <ArticleLink href="/resources/summer-academic-program-checklist">
          summer academic program checklist
        </ArticleLink>{' '}
        to compare options before you enroll.
      </p>

      <h2>What should &quot;affordable&quot; actually mean?</h2>

      <p>A good value program is not always the cheapest one. When comparing summer programs, look at:</p>

      <ul>
        <li>Cost per session</li>
        <li>Number of instructional hours</li>
        <li>Class size</li>
        <li>Instructor quality</li>
        <li>Program structure</li>
        <li>Skill focus</li>
        <li>Parent communication</li>
        <li>Whether the program addresses your child&apos;s actual needs</li>
      </ul>

      <p>
        For example, a program with a slightly higher weekly cost may still be a better value if it includes
        structured instruction, smaller groups, and targeted academic support.
      </p>

      <h2>Is it childcare or academic support?</h2>

      <p>Some parents need summer coverage. That is valid. But if the goal is academic growth, parents should look for more than supervision.</p>

      <p>Ask:</p>

      <ul>
        <li>Will my child be assessed?</li>
        <li>What skills will be taught?</li>
        <li>How are students grouped?</li>
        <li>Is the program grade-specific?</li>
        <li>Will students receive feedback?</li>
        <li>Is the work aligned to school-year expectations?</li>
        <li>How will I know if my child improved?</li>
      </ul>

      <p>
        These questions help separate academic programs from general activity programs. If summer learning loss is a
        concern, read our guide on{' '}
        <ArticleLink href="/resources/summer-slide-dublin-ca">the summer slide in Dublin, CA</ArticleLink>.
      </p>

      <h2>Why does class size matter?</h2>

      <p>Class size affects attention. A large group may be fine for general activities, but academic support requires visibility.</p>

      <p>The instructor needs to notice:</p>

      <ul>
        <li>Where the student hesitates</li>
        <li>Which mistakes repeat</li>
        <li>Whether the child understands or is guessing</li>
        <li>How the child explains their reasoning</li>
        <li>Whether the work is too easy or too hard</li>
      </ul>

      <p>Smaller academic groups make this more possible.</p>

      <h2>Why do outcomes matter more than activities?</h2>

      <p>A summer academic program should be able to explain its purpose clearly. For example:</p>

      <ul>
        <li>Is the goal to close math gaps?</li>
        <li>Improve reading fluency?</li>
        <li>Strengthen writing structure?</li>
        <li>Prepare for the next grade?</li>
        <li>Build problem-solving confidence?</li>
        <li>Give advanced students more challenge?</li>
      </ul>

      <p>
        If the goal is unclear, the outcome will likely be unclear too. Parents should not have to guess what the
        program is designed to accomplish.
      </p>

      <h2>GrowWise Academic Summer Programs</h2>

      <figure className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <div className="relative aspect-[16/9]">
        <Image
          src={ARTICLE_HERO_IMAGE}
          alt="Small-group academic summer program for K-12 students in Dublin, CA"
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
        </div>
        <figcaption className="px-5 py-3 text-sm text-slate-600">
          A structured academic summer program should show small-group instruction, defined outcomes, and skill-specific support.
        </figcaption>
      </figure>

      <p>
        GrowWise offers academic summer programs in Dublin, CA for students who need focused support in math,
        reading, and writing. Programs are designed to help students use summer time productively through structured
        learning, small-group instruction, and grade-level readiness.
      </p>

      <p>
        Instead of offering random worksheets or generic review, GrowWise programs focus on identifying student
        needs and helping them build stronger academic foundations. Parents can review current program details,
        schedules, and enrollment information on the{' '}
        <ArticleLink href="/camps/academic-summer-programs-dublin-ca">academic summer programs page</ArticleLink>.
        For year-round support, see our{' '}
        <ArticleLink href="/resources/tutoring-dublin-ca">Dublin tutoring guide</ArticleLink> or{' '}
        <ArticleLink href="/book-assessment">book a free assessment</ArticleLink>.
      </p>

      <h2>How should parents evaluate the best fit?</h2>

      <p>Before enrolling, ask yourself:</p>

      <ul>
        <li>Does my child need academic support, enrichment, or childcare?</li>
        <li>Is the program aligned with my child&apos;s grade level?</li>
        <li>Does the program explain what students will learn?</li>
        <li>Is there an assessment or placement process?</li>
        <li>Will the instructor know my child&apos;s needs?</li>
        <li>Is the price connected to real instructional value?</li>
      </ul>

      <p>The right summer program should feel clear, structured, and purposeful.</p>

      <h2>What is the final takeaway?</h2>

      <p>Affordable does not mean low-quality. And expensive does not automatically mean better.</p>

      <p>
        The best summer academic program is the one that gives your child the right support, at the right level, with
        a clear purpose. For families in Dublin, Pleasanton, San Ramon, and nearby Tri-Valley communities, summer
        can be a strong time to address academic gaps before the next school year begins.
      </p>
    </ResourceArticlePage>
  )
}
