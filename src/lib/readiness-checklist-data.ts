export const READINESS_SECTIONS = [
  {
    id: 'math-1-4',
    title: 'Math Readiness - Grades 1-4',
    items: [
      'Counts on fingers for basic addition or subtraction past 1st grade',
      'Cannot recall basic multiplication facts by end of 3rd grade',
      'Struggles to explain how they got an answer - guesses without process',
      'Makes the same arithmetic mistakes repeatedly - not random errors',
      'Avoids word problems or skips them entirely',
      'Confuses place value - treats 34 and 43 as similar or interchangeable',
      'Cannot identify simple fractions visually (1/2, 1/4) by 3rd grade',
    ],
  },
  {
    id: 'math-5-8',
    title: 'Math Readiness - Grades 5-8',
    items: [
      'Cannot convert between fractions, decimals, and percentages fluently',
      'Struggles with negative numbers or gets confused by signs in subtraction',
      'Cannot set up a ratio or proportion from a word problem',
      'Pre-algebra feels impossible - variables cause shutdown or refusal',
      'Makes consistent errors in multi-step problems - loses track of the process',
      'Cannot identify what operation a word problem is asking for',
      'Integrated Math 1 is assigned next year and current foundations are weak',
    ],
  },
  {
    id: 'reading',
    title: 'Reading Comprehension',
    items: [
      'Reads words correctly but cannot explain what a passage means',
      'Cannot identify the main idea vs. a supporting detail',
      'Struggles to make inferences - only understands what is stated explicitly',
      'Cannot answer "why" or "how" questions about a text',
      'Avoids reading independently - prefers to be read to past 2nd grade',
      'Comprehension drops significantly when text length increases',
      "Cannot compare two texts or identify an author's purpose",
    ],
  },
  {
    id: 'writing',
    title: 'Writing Gaps',
    items: [
      'Writes short, vague sentences without supporting detail',
      'Cannot construct a clear argument with evidence from a text',
      'Uses the same sentence structure repeatedly throughout a piece',
      'Avoids writing - freezes or shuts down when given a blank page',
      'Cannot revise their own work - does not see what is unclear',
      'Written explanations are much weaker than verbal explanations of the same idea',
      'Essays lack a clear beginning, middle, and conclusion - ideas run together',
    ],
  },
  {
    id: 'middle-school',
    title: 'Middle School Readiness - Grades 5-6 Transition',
    items: [
      'Study habits are not in place - relies on parent reminders for everything',
      'Cannot manage a multi-day assignment independently from start to finish',
      'Does not review mistakes after a graded test - moves on without correction',
      'Struggles when a teacher does not re-explain every concept individually',
      'Cannot identify their own knowledge gaps - says "I get it" but scores poorly',
      'Homework takes 2-3x longer than peers without a clear reason',
    ],
  },
] as const

export const READINESS_GRADE_BANDS = [
  {
    id: 'grades-1-4',
    label: 'Grades 1-4',
    description: 'Elementary math, reading, and writing signals',
    sectionIds: ['math-1-4', 'reading', 'writing'],
  },
  {
    id: 'grades-5-6',
    label: 'Grades 5-6',
    description: 'Upper elementary plus middle-school transition readiness',
    sectionIds: ['math-5-8', 'reading', 'writing', 'middle-school'],
  },
  {
    id: 'grades-7-8',
    label: 'Grades 7-8',
    description: 'Middle-school math, reading, and writing signals',
    sectionIds: ['math-5-8', 'reading', 'writing'],
  },
] as const

export type ReadinessGradeBandId = (typeof READINESS_GRADE_BANDS)[number]['id']

export const READINESS_CHECKLIST_ITEMS = READINESS_SECTIONS.flatMap((section) =>
  section.items.map((text, itemIndex) => ({
    key: `${section.id}-${itemIndex}`,
    sectionId: section.id,
    section: section.title,
    text,
  })),
)

export function getReadinessGradeBand(id: string) {
  return READINESS_GRADE_BANDS.find((gradeBand) => gradeBand.id === id) ?? null
}

export function getReadinessActiveItems(gradeBandId: string) {
  const gradeBand = getReadinessGradeBand(gradeBandId)
  if (!gradeBand) return []
  const activeSectionIds = new Set<string>(gradeBand.sectionIds)
  return READINESS_CHECKLIST_ITEMS.filter((item) => activeSectionIds.has(item.sectionId))
}
