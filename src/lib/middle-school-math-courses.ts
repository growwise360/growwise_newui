export type MiddleSchoolCourseBadge = 'school-aligned' | 'advanced-track' | 'grade-improvement'

export type MiddleSchoolCourseCard = {
  readonly id: string
  readonly title: string
  readonly badges: readonly MiddleSchoolCourseBadge[]
  readonly bestFor: string
  readonly focusAreas: string
  readonly outcome: string
}

export const MIDDLE_SCHOOL_COURSE_TRUST = {
  sectionLabel: 'Programs · Grades 6–8',
  heading: 'Middle school math courses built around your school sequence.',
  leadQuote:
    '95% school-aligned after curriculum review. Students share their school curriculum, syllabus, pacing guide, or current unit plan, and we personalize lessons around their exact school sequence.',
  emphasisLines: [
    'Designed to personalize instruction based on the student’s school curriculum.',
    'Focused on closing gaps before they compound across the year.',
    'Built for advanced math readiness, accelerated tracks, and grade improvement.',
  ],
} as const

export const MIDDLE_SCHOOL_COURSE_CARDS: readonly MiddleSchoolCourseCard[] = [
  {
    id: 'course-1',
    title: 'Course 1 Math',
    badges: ['school-aligned', 'grade-improvement'],
    bestFor: 'Grade 6 students building a strong middle school math foundation.',
    focusAreas:
      'Ratios, rates, fractions, decimals, expressions, equations, number sense, geometry, and early problem-solving.',
    outcome:
      'Students strengthen accuracy, reasoning, and confidence before Course 2 or accelerated math.',
  },
  {
    id: 'course-2',
    title: 'Course 2 Math',
    badges: ['school-aligned', 'grade-improvement'],
    bestFor: 'Grade 7 students preparing for pre-algebra and higher-level problem solving.',
    focusAreas:
      'Proportional relationships, rational numbers, percent problems, equations, inequalities, geometry, probability, and data.',
    outcome:
      'Students learn to solve multi-step problems with structure and prepare for Course 3 or Integrated Math 1.',
  },
  {
    id: 'course-3',
    title: 'Course 3 Math',
    badges: ['school-aligned', 'grade-improvement'],
    bestFor: 'Grade 8 students preparing for Integrated Math 1 or algebra-level coursework.',
    focusAreas:
      'Linear equations, slope, functions, systems, exponents, transformations, geometry, and data analysis.',
    outcome:
      'Students connect equations, graphs, tables, and word problems for a smoother transition into advanced math.',
  },
  {
    id: 'accelerated-1-2',
    title: 'Accelerated Course 1/2',
    badges: ['school-aligned', 'advanced-track'],
    bestFor: 'Students moving through Grade 6 and Grade 7 standards at a faster pace.',
    focusAreas:
      'Course 1 and Course 2 concepts, including ratios, proportional reasoning, integers, equations, percent, geometry, and problem-solving.',
    outcome:
      'Students move faster without skipping understanding, with personalized gap checks based on school curriculum.',
  },
  {
    id: 'im1',
    title: 'Integrated Math 1',
    badges: ['school-aligned', 'advanced-track'],
    bestFor: 'Students beginning high-school-level math in middle school or early high school.',
    focusAreas:
      'Linear functions, systems of equations, inequalities, expressions, graphing, modeling, and introductory exponential relationships.',
    outcome:
      'Students build readiness for advanced math by connecting algebra, functions, graphs, and real-world modeling.',
  },
  {
    id: 'im2',
    title: 'Integrated Math 2',
    badges: ['school-aligned', 'advanced-track'],
    bestFor: 'Students continuing the Integrated Math pathway after IM1.',
    focusAreas:
      'Quadratic functions, transformations, similarity, right-triangle relationships, coordinate geometry, probability, and proof-style reasoning.',
    outcome:
      'Students strengthen advanced reasoning, multi-step problem solving, and preparation for Integrated Math 3.',
  },
] as const

export const MIDDLE_SCHOOL_COURSE_CLOSING = {
  heading: 'Personalized to your school curriculum',
  body:
    'Every student’s school sequence is different. Bring your syllabus, textbook chapter list, school portal topics, homework, quiz results, or upcoming test outline. We use it to build a personalized plan that is closely aligned to what the student is learning in class.',
  bullets: [
    '95% school-aligned after curriculum review',
    'Advanced math support for accelerated and IM pathways',
    'Targeted grade improvement through gap repair, practice, and test preparation',
  ],
} as const

export const MIDDLE_SCHOOL_COURSE_CTA = {
  heading: 'Not sure which course fits?',
  body: 'Start with a free assessment. We’ll review the student’s current curriculum, identify gaps, and recommend the right path.',
  buttonLabel: 'Book free assessment',
} as const

export const MIDDLE_SCHOOL_COURSE_BADGE_LABELS: Record<MiddleSchoolCourseBadge, string> = {
  'school-aligned': 'School-aligned',
  'advanced-track': 'Advanced track',
  'grade-improvement': 'Grade improvement',
}
