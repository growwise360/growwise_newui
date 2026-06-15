'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  SUMMER_SLIDE_DUBLIN_CA_FAQS,
  SUMMER_SLIDE_DUBLIN_CA_META,
  SUMMER_SLIDE_DUBLIN_CA_RELATED,
} from '@/data/resources/summer-slide-dublin-ca'
import { publicPath } from '@/lib/publicPath'

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale()
  return <Link href={publicPath(href, locale)}>{children}</Link>
}

export function SummerSlideDublinCaArticlePage() {
  return (
    <ResourceArticlePage
      slug="summer-slide-dublin-ca"
      category={SUMMER_SLIDE_DUBLIN_CA_META.category}
      categoryLabel={SUMMER_SLIDE_DUBLIN_CA_META.categoryLabel}
      h1={SUMMER_SLIDE_DUBLIN_CA_META.h1}
      readTime={SUMMER_SLIDE_DUBLIN_CA_META.readTime}
      updated={SUMMER_SLIDE_DUBLIN_CA_META.updated}
      answerBlock={{
        heading: 'Quick Answer',
        text: 'The summer slide is measurable academic skill loss during summer break. Dublin and Tri-Valley students can reduce it with structured review, live instruction, regular practice, and feedback on mistake patterns.',
      }}
      faqs={SUMMER_SLIDE_DUBLIN_CA_FAQS}
      relatedArticles={SUMMER_SLIDE_DUBLIN_CA_RELATED}
      ctaHeading="Ready to find your child's actual gaps before June ends?"
      ctaSubtext="Book a free 45-minute assessment — in-person in Dublin or online. We identify the specific skill gaps before recommending any program."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Assessment →' },
        { href: '/camps/academic-summer-programs-dublin-ca', label: 'View Summer Programs →' },
      ]}
    >
      <p>
        Most parents assume summer means a break. For students, it often means a reset — and not the good kind.
      </p>

      <p>
        The summer slide is the measurable loss of academic skills during summer break. It's not a theory. Decades of
        education research have documented it across reading, writing, and math. The question isn't whether it happens.
        It's how much — and what you do about it.
      </p>

      <h2>How Much Learning Do Students Actually Lose?</h2>

      <p>Research consistently shows students lose ground across core subjects over a 10–12 week summer. The breakdown matters:</p>

      <p>
        <strong>Reading:</strong> Students can lose up to two to three months of reading fluency and comprehension gains
        — particularly in the early grades. Vocabulary retention drops when students stop reading regularly. The words
        they struggled to master in May start to blur by August.
      </p>

      <p>
        <strong>Math:</strong> Math loss tends to be faster and more pronounced. Computation skills — fractions, decimals,
        multi-step operations — erode quickly without practice. Procedural memory is fragile when it isn't used.
      </p>

      <p>
        <strong>The compounding problem:</strong> a student who loses ground each summer arrives at each new grade slightly
        behind where they left the previous one. Three summers of slide is not three months of loss — it's a widening gap.
      </p>

      <h2>Why Tri-Valley Parents Should Pay Closer Attention</h2>

      <p>
        Dublin Unified, Pleasanton Unified, and San Ramon Valley school districts run rigorous, grade-accelerated math
        sequences. DUSD students often enter Integrated Math 1 in 7th grade — a course that requires solid algebraic
        reasoning, proportional thinking, and fluency with rational numbers.
      </p>

      <p>
        A student who enters that course with a summer's worth of forgotten skills faces a steep first month. Teachers
        in these districts move quickly. There's rarely a review buffer.
      </p>

      <p>
        Students in competitive academic tracks need to arrive in August where they left June — not two months behind it.
      </p>

      <h2>What Actually Prevents the Slide</h2>

      <p>Sporadic worksheets don't work. App-based self-paced tools have a completion problem. What prevents learning loss is the same thing that drives learning gain: structure, accountability, and targeted practice.</p>

      <p>That means:</p>

      <ul>
        <li>A defined curriculum sequence — not random topics</li>
        <li>Live instruction — not a video and a multiple choice quiz</li>
        <li>Regular session frequency — not once a week with three-day gaps</li>
        <li>A feedback loop — so a student's specific mistake patterns get corrected, not just flagged</li>
      </ul>

      <h2>GrowWise Academic Summer Programs</h2>

      <p>
        GrowWise offers structured summer academic programs in Dublin, CA covering math, reading, and writing for Grades
        1–12. Programs are built around identified learning gaps — not general review — with small groups and trained
        instructors.
      </p>

      <p>
        Sessions run weekday mornings and evenings starting June 16. Programs are aligned to DUSD, PUSD, and CA Common
        Core Standards.
      </p>

      <p>
        <ArticleLink href="/book-assessment">Book a free assessment</ArticleLink> to find out where your child's gaps
        actually are before summer starts.
      </p>
    </ResourceArticlePage>
  )
}
