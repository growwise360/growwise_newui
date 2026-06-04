'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ResourceArticlePage } from '@/components/resources/ResourceArticlePage'
import {
  HOW_TO_CHOOSE_SUMMER_CAMP_FAQS,
  HOW_TO_CHOOSE_SUMMER_CAMP_META,
  HOW_TO_CHOOSE_SUMMER_CAMP_RELATED,
} from '@/data/resources/how-to-choose-summer-camp'
import { publicPath } from '@/lib/publicPath'

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale()
  return <Link href={publicPath(href, locale)}>{children}</Link>
}

export function HowToChooseSummerCampPage() {
  return (
    <ResourceArticlePage
      slug="how-to-choose-summer-camp"
      category={HOW_TO_CHOOSE_SUMMER_CAMP_META.category}
      categoryLabel={HOW_TO_CHOOSE_SUMMER_CAMP_META.categoryLabel}
      h1={HOW_TO_CHOOSE_SUMMER_CAMP_META.h1}
      readTime={HOW_TO_CHOOSE_SUMMER_CAMP_META.readTime}
      updated={HOW_TO_CHOOSE_SUMMER_CAMP_META.updated}
      faqs={HOW_TO_CHOOSE_SUMMER_CAMP_FAQS}
      relatedArticles={HOW_TO_CHOOSE_SUMMER_CAMP_RELATED}
      ctaHeading="Ready to find the right summer camp for your child?"
      ctaSubtext="Book a free 30-minute consultation. We'll help you match your child with the right program based on their goals, interests, and learning style."
      ctas={[
        { href: '/book-assessment', label: 'Book Free Consultation →' },
        { href: '/camps/summer', label: 'View Summer Programs →' },
      ]}
    >
      <p>
        Choosing the right summer camp for your child can feel overwhelming, but it doesn't have to be. With so many programs out there, it's important to find a camp that matches your child's <strong>interests, learning goals, and personality</strong>.
      </p>

      <p>
        Here's a practical guide to help you make the best choice for a meaningful and memorable summer.
      </p>

      <h2>Identify Your Goals</h2>

      <p>Start by asking yourself:</p>

      <ul>
        <li>Do you want your child to stay ahead academically?</li>
        <li>Are you looking to nurture creativity, confidence, or independence?</li>
        <li>Is your child eager to explore <strong>STEM, coding, art, or writing</strong>?</li>
      </ul>

      <p>
        Your goals will determine whether an <strong>academic summer camp</strong>, a <strong>skill-building camp</strong>, or a <strong>tech-focused camp</strong> is the right fit.
      </p>

      <h2>Match the Camp to Your Child's Interests</h2>

      <p>Summer is the perfect time for your child to:</p>

      <ul>
        <li>
          <strong>Explore new skills:</strong> Like game development, creative writing, robotics, or public speaking
        </li>
        <li>
          <strong>Reinforce school subjects:</strong> Like math, reading comprehension, or writing
        </li>
        <li>
          <strong>Discover passions:</strong> Through hands-on projects that go deeper than what school allows
        </li>
      </ul>

      <p>
        Choose a camp that blends <strong>fun with growth</strong>, and watch your child thrive!
      </p>

      <h2>Look for Small Groups and Quality Instructors</h2>

      <p>
        Low student-to-teacher ratios mean more <strong>personalized attention</strong> and faster progress. Experienced, passionate instructors can make learning exciting and engaging — especially in camps focused on coding, STEM, or academic enrichment.
      </p>

      <p>
        Ask questions about instructor experience, training, and their approach to helping students who fall behind or learn differently.
      </p>

      <h2>Check the Schedule and Flexibility</h2>

      <p>Make sure the camp:</p>

      <ul>
        <li>Fits your family's summer schedule</li>
        <li>Offers part-time or full-day options</li>
        <li>Has flexible drop-off/pick-up times (especially helpful for working parents)</li>
        <li>Accommodates family vacations or other summer commitments</li>
      </ul>

      <p>
        A program that's perfect but doesn't fit your schedule will create stress, not value.
      </p>

      <h2>Go Local and Trusted (Skip the Hype)</h2>

      <p>
        Look for camps near you with strong local reputations. While trendy, far-away camps might seem appealing, local programs have a key advantage: you can visit in person, talk to parents who've already enrolled, and build a relationship with the instructors.
      </p>

      <p>Choose camps that have:</p>

      <ul>
        <li>Positive reviews from local parents</li>
        <li>A strong, established presence in your community</li>
        <li>Real success stories from families you know</li>
      </ul>

      <h2>Ask About Safety and Structure</h2>

      <p>
        Before enrolling, ask about the camp's safety protocols, what happens if your child doesn't understand something, how progress is communicated to parents, and what happens if your child needs to catch up or move at a different pace.
      </p>

      <p>
        Good camps have clear answers to these questions. Vague answers are a red flag.
      </p>

      <h2>Make Summer Count</h2>

      <p>
        The right summer camp isn't just about keeping your child busy. It's about giving them space to grow, build skills, and develop confidence in a supportive environment. By matching the camp to your child's interests and your family's needs, you're setting them up for a summer that matters.
      </p>

      <p>
        <ArticleLink href="/camps/summer">Explore GrowWise summer programs</ArticleLink> in Dublin, CA — or <ArticleLink href="/book-assessment">book a free consultation</ArticleLink> to find the right fit for your child.
      </p>
    </ResourceArticlePage>
  )
}
