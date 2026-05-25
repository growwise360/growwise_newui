import { PYTHON_VS_SCRATCH_PATH } from '@/data/resources/python-vs-scratch-copy'
import { TUTORING_DUBLIN_CA_PATH } from '@/data/resources/tutoring-dublin-ca'
import { WHAT_IS_VIBE_CODING_PATH } from '@/data/resources/what-is-vibe-coding-copy'
import { WHEN_TO_START_SAT_PREP_PATH } from '@/data/resources/when-to-start-sat-prep'

/** Resource article paths for sitemap and routing registry. */
export const RESOURCE_ARTICLE_PATHS = [
  WHAT_IS_VIBE_CODING_PATH,
  PYTHON_VS_SCRATCH_PATH,
  WHEN_TO_START_SAT_PREP_PATH,
  TUTORING_DUBLIN_CA_PATH,
] as const

export type ResourceArticlePath = (typeof RESOURCE_ARTICLE_PATHS)[number]
