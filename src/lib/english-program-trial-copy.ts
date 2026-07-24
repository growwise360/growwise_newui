import { ENGLISH_TRIAL_SESSION_FEE_USD } from '@/lib/english-pricing-display'
import type { MathTrialBandConfig } from '@/lib/math-program-trial-copy'

const TRIAL_FEE = `$${ENGLISH_TRIAL_SESSION_FEE_USD}`

export const ELEMENTARY_ENGLISH_TRIAL: MathTrialBandConfig = {
  gradeLabel: 'Grades 1–5',
  durationLabel: 'One session · 60 minutes',
  sessionTitle: 'Trial session — Elementary English',
  introHeading: 'Prefer to try one session first?',
  introBody:
    'Your child works on real reading and writing tasks with a GrowWise instructor. We identify pillar gaps and explain which level fits. You leave with a clear picture before committing to a monthly program.',
  bullets: [
    'Instructor-led work on grade-appropriate reading and writing',
    'Identifies fluency, vocabulary, grammar, and writing gaps',
    'Parent debrief — recommended level and monthly program fit',
    'No pressure to enroll',
  ],
  feeNote: `The ${TRIAL_FEE} trial fee is credited in full if you enroll within 7 days.`,
  footnote: 'Trial fee applies to Grades 1–5. Fee credited upon enrollment within 7 days of trial session.',
  enrollPath: '/enroll-academic',
}
