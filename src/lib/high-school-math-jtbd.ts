export type HighSchoolJtbdSituation = {
  readonly id: string
  readonly leftLabel: string
  readonly tagPill: string
  readonly panelHeading: string
  readonly panelBody: string
  readonly primaryCta: 'assessment' | 'contact'
  readonly primaryLabel: string
  readonly secondaryHref?: string
  readonly secondaryLabel?: string
}

export const HIGH_SCHOOL_JTBD_SECTION = {
  sectionLabel: 'Which situation fits your student?',
  heading: "What's actually going on with your student's math?",
} as const

export const HIGH_SCHOOL_JTBD_SITUATIONS: readonly HighSchoolJtbdSituation[] = [
  {
    id: 'falling-behind',
    leftLabel: 'My student is falling behind in high school math',
    tagPill: '→ Course-specific · gap repair',
    panelHeading: 'Homework help and targeted tutoring are not the same thing',
    panelBody:
      'When a student is lost in Algebra 1, Algebra 2, Precalculus, or Calculus, the issue is often a concept from an earlier unit or course — not tonight\'s problem set. We are designed to find that gap in a free assessment and build a school-aligned plan before the next test cycle.',
    primaryCta: 'assessment',
    primaryLabel: 'Book free assessment',
  },
  {
    id: 'course-prep',
    leftLabel: 'Starting Algebra 2, Precalculus, AP Precalculus, or Calculus',
    tagPill: '→ Course-specific prep',
    panelHeading: 'Placement does not guarantee week-one readiness',
    panelBody:
      'Students entering Algebra 2, Precalculus, AP Precalculus, or Calculus are often expected to know skills from prior courses on day one. We align prep to the syllabus and pacing guide your school is using — focused on improvement, not a generic review.',
    primaryCta: 'assessment',
    primaryLabel: 'Book free assessment',
    secondaryHref: '/academic/math',
    secondaryLabel: 'See all math programs',
  },
  {
    id: 'tests',
    leftLabel: 'Strong in class but struggles on tests',
    tagPill: '→ Test-readiness focus',
    panelHeading: 'Test performance is a different skill than classwork',
    panelBody:
      'Students who understand lessons but lose points on tests often have mistake patterns under time pressure or gaps in the reasoning type the assessment requires. Targeted instruction is designed to build test-readiness between paid sessions.',
    primaryCta: 'assessment',
    primaryLabel: 'Book free assessment',
  },
  {
    id: 'honors-ap',
    leftLabel: 'Honors or AP pace feels too fast',
    tagPill: '→ Advanced track support',
    panelHeading: 'Fast pace does not always mean the student is in the wrong class',
    panelBody:
      'Honors, AP Precalculus, and Calculus courses move quickly. Focused small-group time on the exact concepts the class is covering — aligned after curriculum review — is designed to help students keep up without skipping foundational understanding.',
    primaryCta: 'assessment',
    primaryLabel: 'Book free assessment',
  },
  {
    id: 'year-round',
    leftLabel: 'We need consistent, school-aligned support all year',
    tagPill: '→ Monthly program',
    panelHeading: 'Year-round support tracks what school is teaching now',
    panelBody:
      'Monthly programs are built around the student\'s current course sequence. Bring syllabus topics, portal units, homework, and upcoming tests — we personalize lessons around that sequence and report progress monthly.',
    primaryCta: 'assessment',
    primaryLabel: 'Book free assessment',
    secondaryHref: '/book-assessment',
    secondaryLabel: 'Schedule free assessment',
  },
] as const
