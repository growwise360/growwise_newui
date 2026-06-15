'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import { CONTACT_INFO } from '@/lib/constants'
import {
  TUTORING_DUBLIN_CA_FAQS,
  TUTORING_DUBLIN_CA_META,
  TUTORING_DUBLIN_CA_RELATED,
} from '@/data/resources/tutoring-dublin-ca'
import { publicPath } from '@/lib/publicPath'

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale()
  return <Link href={publicPath(href, locale)}>{children}</Link>
}

export function TutoringDublinCaArticlePage() {
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`

  return (
    <ResourceArticlePage
      slug="tutoring-dublin-ca"
      category={TUTORING_DUBLIN_CA_META.category}
      categoryLabel={TUTORING_DUBLIN_CA_META.categoryLabel}
      h1={TUTORING_DUBLIN_CA_META.h1}
      readTime={TUTORING_DUBLIN_CA_META.readTime}
      updated={TUTORING_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'The best tutoring program for a Dublin student depends on the root cause: repeated practice helps some students, homework help supports current assignments, and diagnostic-first tutoring is best when a hidden learning gap or mistake pattern is driving the struggle.',
      }}
      faqs={TUTORING_DUBLIN_CA_FAQS}
      relatedArticles={TUTORING_DUBLIN_CA_RELATED}
      ctaHeading="Not sure which program fits your child?"
      ctaSubtext="Book a free 45-minute assessment at our Dublin center — or online. We identify the specific gap before recommending anything."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment →' },
        { href: '/dublin-ca', label: 'View Dublin Center →' },
      ]}
    >
      <p>
        For Tri-Valley families, choosing a tutoring program can feel overwhelming. Dublin, Pleasanton, and San Ramon
        have a high concentration of academic enrichment options — from large national chains to independent tutors —
        and the differences between them aren&apos;t always obvious from a website or a first visit.
      </p>

      <p>
        This guide helps parents in Dublin and the surrounding Tri-Valley area understand what separates one type of
        program from another, what questions to ask before enrolling, and how to match the right program to what your
        child actually needs.
      </p>

      <h2>What are the three types of tutoring programs in the Tri-Valley?</h2>
      <p>
        Most tutoring options in the Dublin area fall into one of three categories. Understanding which type
        you&apos;re looking at before you enroll saves time, money, and frustration.
      </p>

      <h3>Type 1: Worksheet and Repetition Programs</h3>
      <p>
        These programs follow a fixed curriculum sequence. Every student works through the same materials in the same
        order, at their own pace. Progress is measured by completing levels.
      </p>
      <p>
        <strong>Best for:</strong> Students who need consistent reinforcement of foundational skills at a predictable
        pace.
      </p>
      <p>
        <strong>Watch for:</strong> The pace is set by the program, not the student&apos;s actual gaps. A child who
        struggles with one specific concept may move forward before it&apos;s resolved.
      </p>

      <h3>Type 2: Homework Help and Subject Tutoring</h3>
      <p>
        These programs match students with tutors for session-by-session help on current assignments, upcoming tests, or
        specific topics. Sessions are usually flexible and reactive to what&apos;s happening in school that week.
      </p>
      <p>
        <strong>Best for:</strong> Students with strong foundational skills who need occasional support on specific
        topics.
      </p>
      <p>
        <strong>Watch for:</strong> Homework help is reactive by design — it doesn&apos;t identify or close underlying
        gaps. If the real issue is a foundational gap from an earlier grade, homework help won&apos;t surface it.
      </p>

      <h3>Type 3: Diagnostic-First Programs</h3>
      <p>
        These programs start with an assessment to identify where the student actually is — not where their grade level
        says they should be — before building a plan. Sessions are targeted to close specific identified gaps.
      </p>
      <p>
        <strong>Best for:</strong> Students with identifiable patterns (
        <ArticleLink href="/resources/careless-math-mistakes">careless mistakes</ArticleLink>, specific subject
        struggles, upcoming SAT prep) where the root cause matters.
      </p>
      <p>
        <strong>Watch for:</strong> Quality varies significantly. A program that calls itself &ldquo;diagnostic&rdquo;
        should produce a written plan with specific identified gaps, not just a general placement level.
      </p>

      <h2>What questions should parents ask before enrolling?</h2>
      <p>Regardless of which program type you&apos;re considering, these questions surface important differences.</p>
      <ol>
        <li>
          <strong>Do you run a diagnostic before starting — and what does it tell you?</strong> A meaningful diagnostic
          identifies <em>where</em> in a skill the gap exists, not just that a gap exists. &ldquo;Your child is at a
          Grade 4 math level&rdquo; is a placement, not a diagnosis. &ldquo;Your child understands multiplication but
          has a consistent error in multi-digit addition that&apos;s affecting algebra&rdquo; is a diagnosis.
        </li>
        <li>
          <strong>How is my child&apos;s plan different from another child&apos;s plan?</strong> If the answer is
          &ldquo;they work through the same materials at different paces,&rdquo; that&apos;s a repetition program. If
          the answer involves specific identified gaps and a targeted sequence, that&apos;s diagnostic-first.
        </li>
        <li>
          <strong>What happens if my child doesn&apos;t improve?</strong> A good program can explain specifically what
          they&apos;re measuring and how they&apos;ll adjust the approach if progress stalls. &ldquo;We&apos;ll keep
          working with them&rdquo; is not an answer.
        </li>
        <li>
          <strong>How do you align with what they&apos;re learning in school right now?</strong> For Dublin and
          Tri-Valley families, the ability to connect tutoring sessions to current school content — pacing, upcoming
          assessments, unit tests — is a significant differentiator. A program that teaches independently of school
          curriculum may produce results that don&apos;t show up in grades.
        </li>
        <li>
          <strong>What&apos;s the class or session size?</strong> The difference between 1:1 and a group of 10 is
          significant. Research shows 1:1 instruction achieves in approximately 20 hours what takes 40–60 hours in
          larger group settings.
        </li>
      </ol>

      <h2>What should Dublin and Tri-Valley parents know?</h2>

      <h3>Tri-Valley schools are academically demanding.</h3>
      <p>
        Dublin Unified, Pleasanton Unified, and San Ramon Valley Unified all serve high-achieving student populations with
        competitive academic expectations. The bar for what &ldquo;keeping up&rdquo; means is higher here than in many
        other districts.
      </p>
      <p>
        This matters for tutoring because programs designed for average academic environments may not move fast enough
        for Tri-Valley students who need to stay at grade level in accelerated contexts.
      </p>

      <h3>Integrated Math matters here.</h3>
      <p>
        California&apos;s Integrated Math 1, 2, and 3 pathway — used in many Tri-Valley schools — combines algebra,
        geometry, and statistics across three years rather than teaching them as separate courses. Not every tutoring
        program has tutors familiar with this structure. It&apos;s worth asking specifically.
      </p>
      <p>
        GrowWise offers year-round{' '}
        <ArticleLink href="/courses/integrated-math-1-dublin-ca">Integrated Math 1 tutoring</ArticleLink> and summer{' '}
        <ArticleLink href="/camps/summer-im-get-ready-dublin-ca">IM Get Ready programs</ArticleLink> aligned to the
        Tri-Valley IM pathway.
      </p>

      <h3>Summer programs fill quickly.</h3>
      <p>
        Academic{' '}
        <ArticleLink href="/camps/academic-summer-programs-dublin-ca">summer programs</ArticleLink> in Dublin — get-ready
        cohorts, reading and writing sprints, and math foundations — typically fill weeks before summer starts.{' '}
        <ArticleLink href="/camps/summer">STEAM coding camps</ArticleLink> fill on a similar timeline. If summer academic
        programming is on your radar, the right time to look is late winter/early spring.
      </p>

      <h2>What does GrowWise offer Dublin families?</h2>
      <p>
        GrowWise is located at {CONTACT_INFO.address} — serving families from Dublin, Pleasanton, San Ramon, and
        Livermore. Visit our <ArticleLink href="/dublin-ca">Dublin center page</ArticleLink> for directions, hours, and
        program details.
      </p>

      <p>
        <strong>Academic programs (Grades 1–12):</strong>{' '}
        <ArticleLink href="/academic/math">Math Tutoring</ArticleLink> · English &amp; Writing · High School Math ·{' '}
        <ArticleLink href="/courses/sat-prep">SAT/PSAT Preparation</ArticleLink>
      </p>

      <p>
        <strong>STEAM and coding programs (Ages 10–18):</strong>{' '}
        <ArticleLink href="/coding">Python &amp; AI</ArticleLink> ·{' '}
        <ArticleLink href="/steam/game-development">Game Development</ArticleLink> (Roblox, Scratch, Unity) · Robotics
      </p>

      <p>
        <strong>Summer programs:</strong>{' '}
        <ArticleLink href="/camps/academic-summer-programs-dublin-ca">Academic summer hub</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer-reading-writing-dublin-ca">Reading &amp; Writing Sprint</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer-math-foundations-dublin-ca">Math Foundations</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer-algebra-dublin-ca">Algebra 1 Get Ready</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer-geometry-precalculus-dublin-ca">Geometry Get Ready</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer-im1-get-ready-dublin-ca">IM1 Get Ready</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer-im2-get-ready-dublin-ca">IM2 Get Ready</ArticleLink> ·{' '}
        <ArticleLink href="/camps/summer">STEAM Coding Camps</ArticleLink>
      </p>

      <p>
        <strong>What makes our approach different:</strong> Every student starts with a{' '}
        <ArticleLink href="/book-assessment">free 45-minute academic assessment</ArticleLink>. We identify the specific
        mistake pattern or skill gap before recommending any program. We align sessions to current school curriculum —
        not a separate sequence.
      </p>

      <p>
        Small groups (max 8 students) and 1:1 sessions are both available. Live online sessions are also available for
        families who can&apos;t make it to Dublin in person.
      </p>

      <ul>
        <li>
          <strong>In-person:</strong> {CONTACT_INFO.address}
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a href={phoneHref} className="font-semibold text-[#F16112] underline-offset-2 hover:underline">
            {CONTACT_INFO.phone}
          </a>
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="font-semibold text-[#F16112] underline-offset-2 hover:underline"
          >
            {CONTACT_INFO.email}
          </a>
        </li>
        <li>
          <strong>Online:</strong> Available nationwide
        </li>
      </ul>

      <p>
        <ArticleLink href="/book-assessment">Book a Free In-Person or Online Assessment →</ArticleLink>
        {' · '}
        <ArticleLink href="/academic">View All Programs →</ArticleLink>
      </p>

      <h2>When should parents start looking?</h2>

      <p>
        <strong>For school-year support:</strong> The best time to start is before a student falls significantly
        behind. If you&apos;re noticing patterns — consistent low scores on a specific subject, homework resistance,{' '}
        <ArticleLink href="/resources/careless-math-mistakes">careless mistakes on tests</ArticleLink> — those patterns
        get easier to address earlier.
      </p>

      <p>
        <strong>For SAT prep:</strong> Grade 10 is the recommended starting point. Grade 11 is workable. Grade 12 is
        compressed. See our guide on{' '}
        <ArticleLink href="/resources/when-to-start-sat-prep">when to start SAT prep</ArticleLink> for more detail.
      </p>

      <p>
        <strong>For summer programs:</strong> Start looking in March/April. Browse{' '}
        <ArticleLink href="/camps/academic-summer-programs-dublin-ca">Dublin academic summer programs</ArticleLink> —
        spots fill quickly.
      </p>
    </ResourceArticlePage>
  )
}
