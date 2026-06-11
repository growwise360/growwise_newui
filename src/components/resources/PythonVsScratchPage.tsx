'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  PYTHON_VS_SCRATCH_FAQS,
  PYTHON_VS_SCRATCH_META,
  PYTHON_VS_SCRATCH_RELATED,
} from '@/data/resources/python-vs-scratch-copy'
import { publicPath } from '@/lib/publicPath'

export function PythonVsScratchPage() {
  const locale = useLocale()
  const gameDevHref = publicPath('/steam/game-development', locale)
  const codingHref = publicPath('/coding', locale)
  const mlAiHref = publicPath('/steam/ml-ai-coding', locale)
  const futureSkillsPythonHref = publicPath('/future-skills/python-certification', locale)

  return (
    <ResourceArticlePage
      slug="python-vs-scratch"
      category={PYTHON_VS_SCRATCH_META.category}
      categoryLabel={PYTHON_VS_SCRATCH_META.categoryLabel}
      h1={PYTHON_VS_SCRATCH_META.h1}
      readTime={PYTHON_VS_SCRATCH_META.readTime}
      updated={PYTHON_VS_SCRATCH_META.updated}
      faqs={PYTHON_VS_SCRATCH_FAQS}
      relatedArticles={PYTHON_VS_SCRATCH_RELATED}
      ctaHeading="Find the right coding path for your child"
      ctaSubtext="Every student starts with a placement assessment so we can identify exactly where they are — not based on age alone, but on what they can actually do."
      ctas={[
        { href: '/steam/game-development', label: 'Explore Game Development (Scratch, Roblox, Unity) →' },
        { href: '/coding', label: 'Explore Python & AI Programs →' },
        { href: '/future-skills/python-certification', label: 'Explore Python Certification Pathway →' },
        { href: '/coding', label: 'Book a Free Trial Class →' },
      ]}
    >
      <p>
        Scratch or Python — this is one of the most common questions parents ask when their child expresses
        interest in coding.
      </p>

      <p>
        Both are widely recommended. Both are free. Both are used in schools. The recommendation parents usually
        get is: &quot;Start with Scratch, then move to Python.&quot; But parents who ask more questions get more
        useful answers.
      </p>

      <p>Here&apos;s the honest breakdown.</p>

      <h2>What Each One Actually Is</h2>

      <p>
        <strong>Scratch</strong> is a visual, block-based programming language developed by MIT&apos;s Lifelong
        Kindergarten Group. Instead of typing code, children drag and snap coloured blocks together. No syntax
        errors are possible — if blocks snap together, they work.
      </p>

      <p>
        Scratch teaches: sequencing, loops, conditionals, events, variables, and basic logic. The same concepts
        that appear in every other programming language — just in a visual format.
      </p>

      <p>
        <strong>Python</strong> is a text-based programming language — one of the most widely used in the world.
        Developers use it for web development, data analysis, machine learning, and AI. It requires typing,
        attention to syntax, and more abstract thinking than Scratch.
      </p>

      <p>
        Python teaches: the same foundational concepts as Scratch, plus real-world syntax, debugging, functions,
        data structures, and increasingly —{' '}
        <Link href={mlAiHref}>AI and machine learning</Link>.
      </p>

      <h2>The Critical Difference: Ceiling</h2>

      <p>The most important practical difference between Scratch and Python is where each one stops.</p>

      <p>
        Scratch has a ceiling. According to coding educators across multiple published reviews, most children
        reach the limits of Scratch&apos;s capabilities after 12–18 months of regular use. Advanced Scratch
        projects exist — but the platform was built for learning, not professional development. At some point, the
        student can&apos;t build what they want to build in Scratch anymore.
      </p>

      <p>
        Python has no ceiling. Python is used at the frontier of AI research. The same language a 10-year-old
        uses to build their first calculator is the same language used to train machine learning models. A student
        who starts Python at age 10 and continues through secondary school builds depth in one language rather
        than repeatedly switching. Research from the Learning and Work Institute (2022) found that students who
        build on prior foundational knowledge progress at twice the rate of those starting without foundations
        on the same material.
      </p>

      <h2>The Age-by-Age Guide</h2>

      <h3>Ages 6–9: Scratch first</h3>

      <p>
        Children under 10 typically benefit from Scratch&apos;s visual, immediate feedback. They can see what
        their code does instantly, without worrying about syntax errors. A 2021 study in <em>Computers &amp; Education</em>{' '}
        found that block-based coding like Scratch reduces frustration and increases early coding confidence
        significantly.
      </p>

      <p>
        At this age, the goal is building logical thinking — sequences, conditionals, loops. Scratch teaches all
        of these. It&apos;s not &quot;just a toy&quot; — it&apos;s the same computational thinking that Python
        will later require, in a form that 7-year-olds can access.
      </p>

      <h3>Ages 10–12: The transition window</h3>

      <p>
        Ages 10–12 are developmentally ready for the switch to text-based coding. Children this age have the
        typing speed, abstract reasoning, and frustration tolerance to handle Python syntax errors without giving
        up.
      </p>

      <p>
        Most coding educators recommend beginning Python alongside or shortly after Scratch at this age. The
        transition from Scratch to Python is typically smooth when handled well — students recognize the same
        concepts (loops are still loops; conditionals are still conditionals) in a new format.
      </p>

      <p>
        For children who have been in Scratch for 1–2 years, this transition often feels like a natural
        progression. For beginners at age 10–12, either language works as a starting point, though Python is
        increasingly common.
      </p>

      <h3>Ages 13 and above: Python directly</h3>

      <p>
        For older beginners, starting with Scratch can feel patronizing — the visual interface is designed for
        younger learners. A 13-year-old starting from zero often does better going directly to Python. Their
        abstract thinking is more developed, they can tolerate syntax errors, and the progress in Python is more
        immediately satisfying.
      </p>

      <p>
        The exception: a 13-year-old who has never written code and struggles with abstract thinking may still
        benefit from a brief Scratch foundation. A diagnostic assessment helps determine which path is right.
      </p>

      <h2>Is Scratch Real Programming?</h2>

      <p>
        Yes. This question comes up frequently from parents who worry that Scratch is &quot;just for kids.&quot;
      </p>

      <p>
        Scratch teaches every foundational concept that Python requires: sequencing, loops, conditionals,
        variables, events, parallelism. The blocks correspond directly to code constructs. A child who has spent
        18 months in Scratch and understands what each block does has a genuine programming foundation.
      </p>

      <p>
        Python is the #1 most-taught programming language in U.S. high schools, surpassing Java (ACM Education
        Board, 2022). Over 70% of teachers use Scratch to introduce computational thinking in elementary
        classrooms worldwide (ScratchEd Research). Both tools have genuine educational credibility.
      </p>

      <h2>The Honest Answer: It&apos;s Not Either/Or</h2>

      <p>
        For most children, the best path is Scratch first, then Python — in sequence, not as alternatives.
      </p>

      <p>The transition point depends on:</p>
      <ul>
        <li>Age (10–12 is the typical window)</li>
        <li>How long they&apos;ve been in Scratch</li>
        <li>Whether they&apos;re expressing frustration with Scratch&apos;s limits</li>
        <li>Their abstract reasoning development</li>
      </ul>

      <p>
        The signs a child is ready to transition: they can create projects independently in Scratch, explain their
        code logic, debug their own errors, and are starting to ask &quot;can I make it do more?&quot;
      </p>

      <p>When those signs appear, it&apos;s time for Python.</p>

      <h2>What GrowWise Offers</h2>

      <p>GrowWise teaches both — at the right stage for each child.</p>

      <p>
        <Link href={gameDevHref}>Game Development programs</Link> use Scratch, Roblox, and Minecraft — visual,
        project-based, immediately engaging for younger learners.
      </p>

      <p>
        <Link href={codingHref}>Python &amp; AI programs</Link> start from first script and progress to real apps,
        APIs, and machine learning basics — for students ages 10 and above who are ready for text-based coding.
      </p>

      <p>
        Families ready for structured certification prep can explore the{' '}
        <Link href={futureSkillsPythonHref}>Python certification pathway</Link> on Future Ready Skills — project-first,
        with optional PCEP, PCAP, or Certiport ITS Python when students are ready.
      </p>

      <p>
        Every student starts with a placement assessment so we can identify exactly where they are and which path
        makes sense — not based on age alone, but on what they can actually do.
      </p>
    </ResourceArticlePage>
  )
}
