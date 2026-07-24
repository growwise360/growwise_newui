import { formatTrialSessionFeeLabel } from '@/lib/math-pricing-display'

const TRIAL_FEE = formatTrialSessionFeeLabel()

export type MathTrialBandConfig = {
  readonly gradeLabel: string
  readonly durationLabel: string
  readonly sessionTitle: string
  readonly introHeading: string
  readonly introBody: string
  readonly bullets: readonly string[]
  readonly feeNote: string
  readonly footnote: string
  readonly enrollPath: '/enroll-academic'
  readonly extraNote?: string
}

export const ELEMENTARY_TRIAL: MathTrialBandConfig = {
  gradeLabel: 'Grades 1–5',
  durationLabel: 'One session · 60 minutes',
  sessionTitle: 'Trial session — Grades 1–5',
  introHeading: 'Not sure yet? Start with a single session.',
  introBody:
    'A lot can show up in one well-structured session. Your child works through problems with the instructor. We identify where reasoning breaks down and where it is solid. You leave with a clear picture of what needs work — and whether GrowWise is the right fit.',
  bullets: [
    'Instructor works through grade-level problems with your child',
    'Identifies the primary gap and specific mistake patterns',
    'Parent debrief at the end — what we found, what we would focus on, which program fits',
    'No pressure, no obligation',
  ],
  feeNote: `The ${TRIAL_FEE} is not a deposit. It is a session fee — for a real session, with a real instructor, producing a real result. If you enroll within 7 days, it is credited in full toward your first month.`,
  footnote: 'Trial fee applies to Grades 1–8. Fee waived upon enrollment within 7 days of trial session.',
  enrollPath: '/enroll-academic',
}

export const MIDDLE_SCHOOL_TRIAL: MathTrialBandConfig = {
  gradeLabel: 'Grades 6–8',
  durationLabel: 'One session · 90 minutes',
  sessionTitle: 'Trial session — Grades 6–8',
  introHeading: 'One session tells you more than a brochure ever will.',
  introBody:
    'Middle school math gaps are specific — they are not always where parents expect them to be. A single trial session puts your child in front of an instructor who knows the Course 1–3 and IM1/IM2 curriculum, works through real problems, and tells you exactly where the gap is and what it will take to close it.',
  bullets: [
    'Instructor works through course-aligned problems at your child\'s current level',
    'Identifies the specific concept blocking progress — not just "needs more practice"',
    'Determines which track and course level fits: standard or accelerated',
    'Parent debrief: what the trial showed, which program type fits, what month one would focus on',
  ],
  feeNote: `This is a real instructional session — not a demo. The ${TRIAL_FEE} is credited toward your first month if you enroll within 7 days.`,
  footnote: 'Trial fee applies to Grades 6–8. Fee waived upon enrollment within 7 days.',
  enrollPath: '/enroll-academic',
}

export const HIGH_SCHOOL_TRIAL: MathTrialBandConfig = {
  gradeLabel: 'Grades 9–12',
  durationLabel: 'One session · 90 minutes',
  sessionTitle: 'Trial session — Grades 9–12',
  introHeading: 'Try one session before choosing a monthly program.',
  introBody:
    `High school math support is course-specific. A ${TRIAL_FEE} trial session is designed to show how we align to your student's current class — syllabus, unit, and test schedule — separate from monthly enrollment or per-session drop-in catalog options below.`,
  bullets: [
    'Instructor works through problems aligned to the student\'s current high school course',
    'Identifies whether the gap is in the current unit, a prior course, or a prerequisite skill',
    'Parent debrief on course fit, monthly program type, and what the first month would focus on',
    'No pressure, no obligation',
  ],
  feeNote: `The ${TRIAL_FEE} is a session fee for a real instructional session — not a demo. If you enroll in a monthly program within 7 days, it is credited toward your first month.`,
  footnote: 'Trial fee applies to Grades 9–12. Fee waived upon enrollment within 7 days.',
  enrollPath: '/enroll-academic',
}
