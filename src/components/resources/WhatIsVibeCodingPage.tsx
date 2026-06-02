'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  WHAT_IS_VIBE_CODING_FAQS,
  WHAT_IS_VIBE_CODING_META,
  WHAT_IS_VIBE_CODING_RELATED,
} from '@/data/resources/what-is-vibe-coding-copy'
import { publicPath } from '@/lib/publicPath'

export function WhatIsVibeCodingPage() {
  const locale = useLocale()
  const codingHref = publicPath('/coding', locale)
  const mlAiHref = publicPath('/steam/ml-ai-coding', locale)
  const gameDevHref = publicPath('/steam/game-development', locale)
  const pythonVsScratchHref = publicPath('/resources/python-vs-scratch', locale)

  return (
    <ResourceArticlePage
      slug="what-is-vibe-coding"
      category={WHAT_IS_VIBE_CODING_META.category}
      categoryLabel={WHAT_IS_VIBE_CODING_META.categoryLabel}
      h1={WHAT_IS_VIBE_CODING_META.h1}
      readTime={WHAT_IS_VIBE_CODING_META.readTime}
      updated={WHAT_IS_VIBE_CODING_META.updated}
      faqs={WHAT_IS_VIBE_CODING_FAQS}
      relatedArticles={WHAT_IS_VIBE_CODING_RELATED}
      ctaHeading="Explore GrowWise coding programs"
      ctaSubtext="Students build real projects from day one — with the Python foundation that makes vibe coding powerful."
      ctas={[
        { href: '/coding', label: 'Explore GrowWise Coding & AI Programs →' },
        { href: '/coding', label: 'Book a Free Trial Class →' },
      ]}
    >
      <p>
        If you&apos;ve heard the phrase &quot;vibe coding&quot; and weren&apos;t sure whether it was a trend or
        something real, you&apos;re not alone.
      </p>

      <p>
        In early 2026, vibe coding moved from tech circles into classrooms. Clemson University launched a dedicated
        university course around it. CodaKid named it the most significant shift in coding education for 2026. A recent
        survey found that 85% of students already use AI coding assistants — with or without guidance.
      </p>

      <p>This is no longer a fringe topic. Here&apos;s what it actually means for your child.</p>

      <h2>What Vibe Coding Actually Is</h2>

      <p>
        Vibe coding is the practice of building software using AI tools through natural language — describing what you
        want to create, and using AI to generate, refine, and debug the code.
      </p>

      <p>
        Instead of starting with syntax (&quot;type these exact characters&quot;), vibe coding starts with intent
        (&quot;I want to build a quiz game about space&quot;). The AI generates the initial code. The student directs,
        tests, modifies, and iterates.
      </p>

      <p>
        One analogy captures it well: traditional coding is reading a recipe and memorizing it before you cook anything.
        Vibe coding is cooking from the first lesson — the AI fills in gaps while the student focuses on what they
        actually want to build.
      </p>

      <p>This is not as simple as it sounds. The student still needs to:</p>

      <ul>
        <li>Describe what they want clearly and precisely</li>
        <li>Understand why something isn&apos;t working</li>
        <li>Test the output and identify what&apos;s wrong</li>
        <li>Make decisions about what to change</li>
        <li>Debug problems the AI introduces</li>
      </ul>

      <p>This is why vibe coding is a real skill, not a shortcut.</p>

      <h2>Why It Matters in 2026</h2>

      <p>
        The reason vibe coding has become a major topic in 2026 is straightforward: the tools that professionals use
        every day now work this way.
      </p>

      <p>
        GitHub Copilot, Cursor, and similar AI development tools are standard in most tech companies. Developers
        don&apos;t write every line from scratch anymore — they describe intent, review AI output, and direct the
        result. The skill is not memorizing syntax. The skill is knowing how to lead the AI, catch its mistakes, and
        build something functional.
      </p>

      <p>
        Children who learn to vibe code learn this skill early. They&apos;re not learning a 2026 trick that will be
        obsolete — they&apos;re learning the foundational working method of the next decade of software development.
      </p>

      <p>
        GrowWise programs in <Link href={mlAiHref}>ML/AI coding</Link> and{' '}
        <Link href={gameDevHref}>game development</Link> apply this approach — real projects students choose, with
        structured instruction so they understand what the AI produces.
      </p>

      <h2>The One Risk Most Parents Miss</h2>

      <p>
        Vibe coding has a real upside — but it has one significant risk that most articles don&apos;t address clearly.
      </p>

      <p>
        <strong>A child who only vibe codes, without understanding the fundamentals underneath, hits a ceiling fast.</strong>
      </p>

      <p>
        When the AI produces incorrect code — and it will — a student without foundational understanding cannot identify
        or fix the error. They become dependent on AI output without the ability to evaluate it.
      </p>

      <p>
        This is the same problem that emerged with calculators in math education: students who used calculators without
        ever building arithmetic sense couldn&apos;t detect when the calculator gave a wrong answer.
      </p>

      <p>The best programs in 2026 teach both:</p>

      <ol>
        <li>Vibe coding — using AI tools to build real things from day one</li>
        <li>
          Foundational understanding — knowing enough Python, logic, and structure to evaluate, debug, and direct the AI
          output
        </li>
      </ol>

      <p>
        At GrowWise, we teach students to vibe code AND understand what&apos;s happening underneath. The goal is that
        students control the AI — not the other way around.
      </p>

      <h2>What Age Is Appropriate for Vibe Coding?</h2>

      <p>
        Published guidance from coding educators in 2026 generally places meaningful vibe coding at age 10 and above —
        when students have enough logical reasoning and reading comprehension to describe what they want clearly and
        evaluate what the AI produces.
      </p>

      <p>
        Before age 10, block-based coding tools like Scratch are typically more appropriate. They build the same
        foundational logic — conditionals, loops, sequences — in a more structured, visual environment. See our guide on{' '}
        <Link href={pythonVsScratchHref}>Python vs Scratch</Link> for the age-by-age breakdown.
      </p>

      <p>A useful rough guide:</p>

      <ul>
        <li>
          <strong>Ages 6–9:</strong> Block-based coding (Scratch, Blockly)
        </li>
        <li>
          <strong>Ages 10–13:</strong> Vibe coding with foundational Python alongside
        </li>
        <li>
          <strong>Ages 14–18:</strong> Vibe coding, Python, and increasingly advanced AI/ML concepts
        </li>
      </ul>

      <h2>What to Look for in a Vibe Coding Program</h2>

      <p>Not all programs labeled &quot;vibe coding&quot; are equal. Questions to ask:</p>

      <p>
        <strong>Does the program teach fundamentals alongside AI tools?</strong>
        <br />
        If students only prompt AI without ever understanding variables, functions, or basic logic, they&apos;ll hit a
        wall at the first real project.
      </p>

      <p>
        <strong>Do students build real projects — or complete preset tutorials?</strong>
        <br />
        Real learning happens when students build something they choose. A preset tutorial that produces a predetermined
        result teaches much less than a student-driven project that fails and gets debugged.
      </p>

      <p>
        <strong>How does the program handle debugging?</strong>
        <br />
        The most important skill in vibe coding is knowing what to do when the AI output is wrong. Programs that skip
        this aren&apos;t teaching the real skill.
      </p>

      <p>
        <strong>What does the student own at the end?</strong>
        <br />A student who exits a program with a portfolio of real projects they built — games, apps, tools — has
        demonstrably learned to build. A certificate without projects is a weaker signal.
      </p>

      <h2>Is Vibe Coding the Same as Traditional Coding?</h2>

      <p>No — but both matter.</p>

      <p>
        Traditional coding builds deep understanding of how software actually works. It&apos;s slower to start but
        produces more transferable knowledge.
      </p>

      <p>
        Vibe coding produces real results faster and keeps students engaged — but requires foundational knowledge to
        avoid becoming AI-dependent without understanding.
      </p>

      <p>
        The strongest programs in 2026 integrate both: real projects that vibe code to engage students, paired with
        structured Python instruction to build the foundation that makes the vibe coding meaningful. Explore{' '}
        <Link href={codingHref}>GrowWise coding &amp; AI programs</Link> to see how this works in practice.
      </p>
    </ResourceArticlePage>
  )
}
