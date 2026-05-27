import { CONTACT_INFO } from '@/lib/constants'

export const FROM_NEXTDOOR_PATH = '/from-nextdoor' as const

export const FROM_NEXTDOOR_DESCRIPTION =
  'Dublin parents choose GrowWise for STEM, coding, and tutoring. Top-rated locally. Book a free assessment.'

export type FromNextdoorProgramCard = {
  title: string
  description: string
  href: string
}

export const FROM_NEXTDOOR_COPY = {
  hero: {
    h1: 'GrowWise in Dublin, CA — Trusted by Your Neighbors',
    subtext:
      'Parents on Nextdoor praise our structured classes, expert Python instructors, and hands-on projects that build confidence, curiosity, and real problem-solving skills.',
    intro:
      'You found us through neighbors you trust — welcome. GrowWise is a local K-12 enrichment center at 4564 Dublin Blvd with small classes and caring educators, not a corporate chain.',
    assessmentCta: 'Book Free Assessment',
    phoneLabel: 'Call',
    phone: CONTACT_INFO.phone,
  },
  badges: {
    topFive: 'Top 5 Tutoring & Learning Centers',
    nextdoorFaves: '12 community recommendations on Nextdoor',
  },
  programs: {
    heading: 'Programs Dublin families love',
    intro: 'Explore in-person tutoring and STEAM paths — then book a free assessment to find the right fit for your child.',
    cards: [
      {
        title: 'Academic Tutoring',
        description: 'Math, English, and SAT support for Grades 1–12 in small-group and 1:1 formats.',
        href: '/academic',
      },
      {
        title: 'STEAM & Coding',
        description: 'Python, AI, robotics, and game development with project-based learning.',
        href: '/steam',
      },
      {
        title: 'Summer Camps',
        description: 'Weekly STEAM and academic camps, including ML/AI programs for teens.',
        href: '/camps/summer',
      },
    ] satisfies FromNextdoorProgramCard[],
  },
  testimonials: {
    heading: 'What Dublin parents say',
    subheading: 'Voices from our Nextdoor community and local families',
  },
  founder: {
    heading: 'Meet the founder',
    name: 'Anshika Verma',
    role: 'Founder & Educational Director',
    image: '/assets/founderImage.webp',
    quote:
      'I started GrowWise with the belief in making a positive impact in our community — teaching kids how to learn, not just what to memorize.',
    story: [
      'Inspired by her parents — both lifelong educators — and with over a decade in software engineering, Anshika built GrowWise to combine academic rigor with modern STEAM skills for Tri-Valley families.',
      'Her focus is confidence, curiosity, and character: small classes where kids ask questions, build projects, and leave proud of what they created.',
    ],
    aboutLinkLabel: 'Meet our full team',
  },
  faq: {
    heading: 'Questions neighbors often ask',
  },
  cta: {
    heading: 'Ready to see if GrowWise is right for your child?',
    subtext: 'Book a free diagnostic assessment — no commitment. We will recommend a path based on your child’s goals.',
  },
} as const
