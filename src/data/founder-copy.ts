/** Single source of truth for Anshika Verma founder narrative (About, From Nextdoor, JSON-LD). */
export const FOUNDER_COPY = {
  name: 'Anshika Verma',
  role: 'Founder & Educational Director',
  email: 'anshikaverma@thegrowwise.com',
  image: '/assets/founder-anshika-verma.jpg',
  quote: 'Teach a child how to learn and everything changes.',
  shortBio:
    'Anshika founded GrowWise — a learning lab, not a tutoring center — built on 15 years of observation and 2+ years of direct research with kids.',
  story: [
    'Anshika arrived in the US in 2009 with $500. Her family were educators in India. She became a software engineer here. Then a mother.',
    "For years she watched bright kids check out — not because they couldn't learn, but because nobody taught them how.",
    'That gap became GrowWise. Not a tutoring center. A lab built on 15 years of observation, 2+ years of direct research with kids, and one belief: teach a child how to learn and everything changes.',
  ],
  schemaDescription:
    'Founder of GrowWise School, a Grades 3–12 learning lab in Dublin, CA. Software engineer and educator focused on teaching children how to learn.',
  expertise: ['English', 'Coding', 'AI'] as const,
  education: 'Software Engineering & Education Innovation',
} as const

/** Our Story section on /about — org-level paragraphs aligned with founder narrative. */
export const FOUNDER_ABOUT_STORY_PARAGRAPHS = [
  FOUNDER_COPY.story[0],
  FOUNDER_COPY.story[1],
  FOUNDER_COPY.story[2],
] as const
