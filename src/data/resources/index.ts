import { CARELESS_MATH_MISTAKES_PATH } from '@/data/resources/careless-math-mistakes-copy'
import { HOMEWORK_INDEPENDENCE_PATH } from '@/data/resources/homework-independence-copy'
import { PYTHON_VS_SCRATCH_PATH } from '@/data/resources/python-vs-scratch-copy'
import { READING_FLUENCY_VS_COMPREHENSION_PATH } from '@/data/resources/reading-fluency-vs-comprehension-copy'
import { TUTORING_DUBLIN_CA_PATH } from '@/data/resources/tutoring-dublin-ca'
import { WHAT_IS_VIBE_CODING_PATH } from '@/data/resources/what-is-vibe-coding-copy'
import { WHEN_TO_START_SAT_PREP_PATH } from '@/data/resources/when-to-start-sat-prep'

/** Resource article paths for sitemap and routing registry. */
export const RESOURCE_ARTICLE_PATHS = [
  READING_FLUENCY_VS_COMPREHENSION_PATH,
  CARELESS_MATH_MISTAKES_PATH,
  HOMEWORK_INDEPENDENCE_PATH,
  WHAT_IS_VIBE_CODING_PATH,
  WHEN_TO_START_SAT_PREP_PATH,
  PYTHON_VS_SCRATCH_PATH,
  TUTORING_DUBLIN_CA_PATH,
] as const

export type ResourceArticlePath = (typeof RESOURCE_ARTICLE_PATHS)[number]
