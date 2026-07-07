import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'

export const DUBLIN_CA_PATH = '/dublin-ca' as const

export const DUBLIN_CA_DESCRIPTION =
  'In-person K-12 tutoring and coding classes at GrowWise in Dublin, CA. Math, English, SAT prep, and summer camps. Serving Tri-Valley families. Book a free assessment.'

export type DublinCaProgramCard = {
  title: string
  description: string
  href: string
}

export const DUBLIN_CA_COPY = {
  hero: {
    h1: 'K-12 Tutoring & Coding Classes in Dublin, CA',
    subtext:
      'GrowWise School is a single in-person campus in Dublin where Tri-Valley families get expert math, English, coding, and SAT support in small groups.',
    intro:
      'Whether your child needs help catching up, staying on track, or moving ahead, our Dublin center offers structured programs led by subject-trained instructors—not general camp counselors.',
    phoneLabel: 'Call/Text',
    phone: CONTACT_INFO.phone,
    locationLabel: 'Address',
    location: `${CONTACT_INFO.street}, ${CONTACT_INFO.city} ${CONTACT_INFO.zipCode}`,
    hoursLabel: 'Hours',
    hours: OFFICE_HOURS.summary,
    servedAreas: 'Serving Dublin, Pleasanton, San Ramon, and the Tri-Valley community',
    parkingNote: 'Free on-site parking for all visitors',
    assessmentCta: 'Book a Free In-Person Assessment',
  },
  programs: {
    heading: 'In-person programs at our Dublin center',
    intro: 'All programs below are available in person at 4564 Dublin Blvd. Many also offer online options nationwide.',
    cards: [
      {
        title: 'Math Tutoring',
        description: 'Grades 1–12 math support from foundations through high school and AP-level topics.',
        href: '/academic/math',
      },
      {
        title: 'English & Writing',
        description: 'Reading comprehension, grammar, and essay writing for Grades 1–12.',
        href: '/academic/english',
      },
      {
        title: 'Middle School Tutoring',
        description: 'Math and English for Grades 6–8. DUSD-aligned gap diagnostics and small groups.',
        href: '/middle-school-tutoring-dublin-ca',
      },
      {
        title: 'Python & AI Coding',
        description: 'Hands-on Python, AI, and coding projects for ages 10–18.',
        href: '/coding',
      },
      {
        title: 'SAT Prep',
        description: 'Targeted SAT strategies, practice tests, and score-focused tutoring.',
        href: '/courses/sat-prep',
      },
      {
        title: 'Game Development',
        description: 'Build games while learning programming, design, and problem-solving.',
        href: '/steam/game-development',
      },
      {
        title: 'Summer Camps',
        description: 'Weekly STEAM and academic summer sessions for grades 1–12.',
        href: '/camps/summer',
      },
    ] satisfies DublinCaProgramCard[],
  },
  curriculum: {
    heading: 'Tutors familiar with Dublin Unified & Pleasanton Unified pacing',
    body: 'Our tutors are familiar with pacing and curriculum structures used in Dublin Unified and Pleasanton Unified schools.',
    support:
      'We help reinforce classroom topics and build confidence—without claiming official district endorsement or partnership.',
  },
  testimonials: {
    heading: 'What parents say about GrowWise Dublin',
    googleRatingLine: '4.9★ average on Google · Verified reviews from families at our Dublin campus',
  },
  faq: {
    heading: 'Frequently Asked',
    headingHighlight: 'Questions',
  },
  cta: {
    heading: 'Book a Free In-Person Assessment at our Dublin center',
    subtext:
      'Schedule a visit to meet our team, tour the center, and get a personalized program recommendation for your child.',
    assessmentCta: 'Book a Free In-Person Assessment',
  },
} as const
