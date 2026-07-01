import { AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_PATH } from '@/data/resources/affordable-summer-academic-programs-dublin-ca'
import {
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
  MATH_SPRINT_BREAKDOWN_PATH,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
} from '@/data/resources/additional-summer-guides'
import {
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_PATH,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_PATH,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_PATH,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_PATH,
} from '@/data/resources/august-math-english-guides'
import { CARELESS_MATH_MISTAKES_PATH } from '@/data/resources/careless-math-mistakes-copy'
import { HOW_TO_CHOOSE_SUMMER_CAMP_PATH } from '@/data/resources/how-to-choose-summer-camp'
import { WHY_GRADES_PATH } from '@/data/resources/why-grades-hide-learning-gaps-copy'
import { HOMEWORK_INDEPENDENCE_PATH } from '@/data/resources/homework-independence-copy'
import { IM1_SUMMER_PREP_DUBLIN_CA_PATH } from '@/data/resources/im1-summer-prep-dublin-ca'
import { KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH } from '@/data/resources/khan-academy-summer-doesnt-work'
import { PYTHON_VS_SCRATCH_PATH } from '@/data/resources/python-vs-scratch-copy'
import { READING_FLUENCY_VS_COMPREHENSION_PATH } from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH } from '@/data/resources/summer-academic-program-checklist'
import { SUMMER_SLIDE_DUBLIN_CA_PATH } from '@/data/resources/summer-slide-dublin-ca'
import { SUMMER_SLIDE_PREVENTION_PATH } from '@/data/resources/summer-slide-prevention'
import { SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH } from '@/data/resources/summer-writing-program-dublin-ca'
import { TUTORING_DUBLIN_CA_PATH } from '@/data/resources/tutoring-dublin-ca'
import { WHAT_IS_VIBE_CODING_PATH } from '@/data/resources/what-is-vibe-coding-copy'
import { WHEN_TO_START_SAT_PREP_PATH } from '@/data/resources/when-to-start-sat-prep'
import { READINESS_CHECKLIST_PATH } from '@/data/resources/readiness-checklist'

/** Resource article paths for sitemap and routing registry. */
export const RESOURCE_ARTICLE_PATHS = [
  BACK_TO_SCHOOL_MATH_ASSESSMENT_DUBLIN_CA_PATH,
  ENGLISH_TUTOR_VS_READING_TUTOR_VS_WRITING_CLASS_PATH,
  KUMON_VS_MATHNASIUM_VS_PRIVATE_TUTOR_DUBLIN_CA_PATH,
  MIDDLE_SCHOOL_MATH_READINESS_CHECKLIST_PATH,
  READINESS_CHECKLIST_PATH,
  READING_FLUENCY_VS_COMPREHENSION_PATH,
  CARELESS_MATH_MISTAKES_PATH,
  HOW_TO_CHOOSE_SUMMER_CAMP_PATH,
  HOMEWORK_INDEPENDENCE_PATH,
  WHAT_IS_VIBE_CODING_PATH,
  WHEN_TO_START_SAT_PREP_PATH,
  PYTHON_VS_SCRATCH_PATH,
  SUMMER_SLIDE_DUBLIN_CA_PATH,
  SUMMER_SLIDE_PREVENTION_PATH,
  KHAN_ACADEMY_SUMMER_DOESNT_WORK_PATH,
  IM1_SUMMER_PREP_DUBLIN_CA_PATH,
  SUMMER_ACADEMIC_PROGRAM_CHECKLIST_PATH,
  AFFORDABLE_SUMMER_ACADEMIC_PROGRAMS_DUBLIN_CA_PATH,
  MATH_SPRINT_BREAKDOWN_PATH,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
  SUMMER_WRITING_PROGRAM_DUBLIN_CA_PATH,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
  TUTORING_DUBLIN_CA_PATH,
  WHY_GRADES_PATH,
] as const

export type ResourceArticlePath = (typeof RESOURCE_ARTICLE_PATHS)[number]
