import { FOUNDER_COPY } from '@/data/founder-copy'
import { CARELESS_MATH_MISTAKES_PATH } from '@/data/resources/careless-math-mistakes-copy'
import { HOMEWORK_INDEPENDENCE_PATH } from '@/data/resources/homework-independence-copy'
import { READING_FLUENCY_VS_COMPREHENSION_PATH } from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { RESOURCES_PATH } from '@/data/resources-hub'

export const BULLETIN_PATH = '/bulletin' as const

export const BULLETIN_DESCRIPTION =
  "What I learn teaching students every day, I share with you. Every Tuesday, Thursday and Saturday. Free. Why this works for both:"

export type BulletinScheduleItem = {
  day: string
  title: string
  description: string
}

export const BULLETIN_COPY = {
  eyebrow: 'Free for K–12 parents · 3× per week',
  badge: 'Weekly Bulletin',
  hero: {
    h1: "How to Support Your K–12 Child's Learning — Weekly Insights from a GrowWise Educator",
    subtext:
      'What I learn teaching students every day, I share with you. Every Tuesday, Thursday and Saturday. Free.',
    submitLabel: 'Send me the GrowWise Bulletin →',
    formNote: 'No spam. Unsubscribe in one click. Sent Tue, Thu & Sat.',
    successMessage: "You're in. Check your inbox for a welcome note — your first bulletin arrives this Tuesday.",
    contactIntro: 'Have a question about your child?',
    contactLinkLabel: 'Contact Anshika',
  },
  founder: {
    name: FOUNDER_COPY.name,
    role: FOUNDER_COPY.role,
    image: FOUNDER_COPY.image,
    imageAlt: `${FOUNDER_COPY.name}, Founder of GrowWise`,
    tag: 'SBA Women-Owned',
    established: 'Est. 2024',
  },
  schedule: {
    label: 'Why this works for both:',
    items: [
      {
        day: 'Every Tuesday',
        title: 'The Parent Insight',
        description:
          'One practical lesson from our classrooms — math mistakes, reading gaps, writing habits, and what actually helps students improve.',
      },
      {
        day: 'Every Thursday',
        title: 'The Student Spotlight',
        description:
          'A real student progress story. Where the student started, what changed, and what helped. No fluff.',
      },
      {
        day: 'Every Saturday',
        title: 'The Weekly Bulletin',
        description:
          'Open seats, assessment slots, workshops, camps, and early access before public posting.',
      },
    ] satisfies BulletinScheduleItem[],
    trustLineBold: 'No daily spam. No generic parenting advice.',
    trustLineRest: 'Just useful academic updates from GrowWise.',
  },
  proof: {
    stats: [
      { value: 'Every day', label: 'GrowWise + schools I teach in' },
      { value: 'Top 5', label: 'Tutoring centers, Dublin CA' },
      { value: 'K–12', label: 'Math · English · STEAM · AI' },
    ],
    quote: "My son actually looks forward to class now. I didn't think that was possible.",
    attribution: '— Verified parent review',
  },
  sample: {
    label: 'What a typical Tuesday looks like',
    heading: 'Real insights. Not marketing.',
    paragraphs: [
      "Parents tell us they forward Tuesday emails to their partner — not because we asked, but because it answered a question they'd been sitting with for months.",
      "Here's an example from a recent issue.",
    ],
    cardTag: 'Tuesday · The Parent Insight',
    cardTitle: 'Why your child keeps making the same math mistake',
    cardExcerpt:
      "Most parents call it careless. After reviewing thousands of student papers, what looks careless is almost always a pattern. Here's what it actually means — and what to do before it compounds.",
    cardLinkLabel: 'Read the full guide',
    cardHref: CARELESS_MATH_MISTAKES_PATH,
    relatedGuides: [
      {
        title: 'How to Stop Sitting Next to Your Child Every Homework Night',
        href: HOMEWORK_INDEPENDENCE_PATH,
      },
      {
        title: 'Reading Fluency vs. Reading Comprehension',
        href: READING_FLUENCY_VS_COMPREHENSION_PATH,
      },
    ],
  },
  featuredGuides: {
    label: 'More parent guides',
    heading: 'Free guides for K–12 parents',
    subtext: 'Research-backed articles on math mistakes, homework habits, reading gaps, and more.',
    hubLinkLabel: 'Browse all parent guides',
    hubHref: RESOURCES_PATH,
    items: [
      {
        title: 'Why Kids Make Careless Math Mistakes (And How to Fix It)',
        description: "It's rarely a knowledge problem. Here's the exact pattern and how to break it.",
        href: CARELESS_MATH_MISTAKES_PATH,
        readTime: '6 min read',
      },
      {
        title: 'How to Stop Sitting Next to Your Child Every Homework Night',
        description: 'The system that builds independence in 6–8 weeks — without the fights.',
        href: HOMEWORK_INDEPENDENCE_PATH,
        readTime: '5 min read',
      },
      {
        title: 'Reading Fluency vs. Reading Comprehension',
        description:
          'Your child can decode every word but still not understand what they read. Learn how to tell the gaps apart.',
        href: READING_FLUENCY_VS_COMPREHENSION_PATH,
        readTime: '6 min read',
      },
    ],
  },
  bottomCta: {
    heading: 'Join parents who read this',
    headingEmphasis: 'every week.',
    subtext:
      "There are things I can help your child with that you simply can't — not because you're not a great parent, but because this is all I do, all day. This bulletin is where I share that. Free, every week.",
    submitLabel: 'Join free →',
    note: 'No spam · Unsubscribe anytime · 3× per week',
  },
  mobileSticky: {
    label: 'Join free →',
  },
  form: {
    emailPlaceholder: 'Your email address',
    privacyNote: 'By subscribing, you agree to receive emails from GrowWise. Unsubscribe anytime.',
  },
} as const
