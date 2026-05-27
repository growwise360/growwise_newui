'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_FAQS,
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_META,
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_RELATED,
} from '@/data/resources/khan-academy-summer-doesnt-work'
import { publicPath } from '@/lib/publicPath'

export function KhanAcademySummerDoesntWorkPage() {
  const locale = useLocale()
  const summerProgramsHref = publicPath('/camps', locale)
  const selfCheckHref = publicPath('/self-check', locale)
  const contactHref = publicPath('/contact', locale)

  return (
    <ResourceArticlePage
      slug="khan-academy-summer-doesnt-work"
      category={KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.category}
      categoryLabel={KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.categoryLabel}
      h1={KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.h1}
      readTime={KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.readTime}
      updated={KHAN_ACADEMY_SUMMER_DOESNT_WORK_META.updated}
      faqs={KHAN_ACADEMY_SUMMER_DOESNT_WORK_FAQS}
      relatedArticles={KHAN_ACADEMY_SUMMER_DOESNT_WORK_RELATED}
      ctaHeading="Compare Your Options"
      ctaSubtext="Khan Academy works in the right context. Here's what structures need to exist around it."
      ctas={[
        { href: summerProgramsHref, label: 'Explore Summer Programs' },
        { href: selfCheckHref, label: 'Take the Self-Check' },
        { href: contactHref, label: 'Contact Us' },
      ]}
    >
      <p>
        It's a familiar summer plan: open Khan Academy, set a goal, check in every few days. By mid-July, the
        streak is broken, the tab is closed, and your child hasn't touched it in three weeks. Sound familiar?
      </p>

      <p>
        This isn't a willpower problem. It's a structural one. And understanding why it happens makes it easier to
        choose something that actually works.
      </p>

      <h2>The Completion Problem Is Well-Documented</h2>

      <p>
        Self-paced online learning has a persistent completion problem. Across virtually every category — MOOCs,
        tutoring apps, academic platforms — studies show completion rates well under 15% for unsupervised learners.
        For K–12 students during an unstructured summer, the number is lower still.
      </p>

      <p>The reasons are predictable:</p>

      <ul>
        <li>No external deadline creates no urgency</li>
        <li>No live accountability means easy avoidance</li>
        <li>No teacher means questions go unanswered and frustration compounds</li>
        <li>Progress bars feel like enough — the visual of doing without the substance</li>
      </ul>

      <p>
        Khan Academy is a genuinely useful tool in the right context — supplementing classroom instruction,
        reviewing a specific concept with a teacher's guidance. As a standalone summer learning plan with no
        structure around it, it almost never produces the outcome parents expect.
      </p>

      <h2>What Kids Actually Need</h2>

      <p>
        The conditions that produce real academic progress over a summer are not complicated, but they require more
        than an app:
      </p>

      <p>
        <strong>Structure.</strong> A defined schedule — same time, same days, set duration — builds the habit and
        reduces the negotiation. Without it, learning becomes optional.
      </p>

      <p>
        <strong>Live instruction.</strong> A student who hits a wall on a concept needs a person who can identify
        the specific mistake pattern, explain it differently, and confirm understanding. A video cannot do that.
      </p>

      <p>
        <strong>Accountability.</strong> Whether it's a teacher, a small group, or a program check-in — external
        accountability dramatically increases follow-through. It also catches a student who's quietly avoiding the
        hard parts.
      </p>

      <p>
        <strong>Sequenced curriculum.</strong> Random topic review is less effective than a defined scope and
        sequence that builds skills in the right order. Real learning compounds. Scattered review doesn't.
      </p>

      <h2>The Small Group Dynamic</h2>

      <p>
        One underestimated factor: peer learning. In a small group of 6–10 students working on the same material,
        students stay more engaged, push slightly harder, and retain more than they do in solo self-paced work.
      </p>

      <p>
        The competitive and collaborative dynamic of a small group — hearing a classmate explain something a
        different way, not wanting to be the one who doesn't know the answer — produces a quality of attention
        that screen-based solo learning can't replicate.
      </p>

      <h2>What to Use Khan Academy For</h2>

      <p>Khan Academy works well when:</p>

      <ul>
        <li>A student needs to review one specific skill they already partly understand</li>
        <li>A parent or teacher is monitoring and correcting the work</li>
        <li>It's used as practice after live instruction — not as the instruction itself</li>
        <li>A student is highly self-motivated and already ahead</li>
      </ul>

      <p>It's a supplement. For most students, it's not enough to be the plan.</p>

      <h2>GrowWise: The Structured Alternative</h2>

      <p>
        GrowWise Academic Summer Programs provide defined curriculum, small groups, live instructors, and a set
        weekly schedule. Programs run across math, reading, and writing, with placement based on skill assessment —
        not just grade level.
      </p>

      <p>Students don't come in and do worksheets. They come in, get taught, practice under guidance, and leave with skills that transfer.</p>

      <p>
        <Link href={summerProgramsHref} className="font-semibold text-[#1F396D] underline-offset-2 hover:underline">
          Compare your options
        </Link>
      </p>
    </ResourceArticlePage>
  )
}
