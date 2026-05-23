import type { Program } from '@/lib/summer-camp-data';

export type AcademicProgramFilterId =
  | 'all'
  | 'readingWriting'
  | 'bridgeTheGap'
  | 'getReadyMath';

export const ACADEMIC_PROGRAM_FILTER_ORDER: readonly AcademicProgramFilterId[] = [
  'all',
  'readingWriting',
  'bridgeTheGap',
  'getReadyMath',
];

const FILTER_PROGRAM_IDS: Record<
  Exclude<AcademicProgramFilterId, 'all'>,
  readonly string[]
> = {
  readingWriting: ['read-to-prove', 'write-to-explain'],
  bridgeTheGap: ['bridge-the-gap-math'],
  getReadyMath: ['im1', 'algebra-1', 'geometry'],
};

export function filterAcademicProgramsByChip(
  programs: Program[],
  filter: AcademicProgramFilterId,
): Program[] {
  if (filter === 'all') return programs;
  const allowed = new Set(FILTER_PROGRAM_IDS[filter]);
  return programs.filter((program) => allowed.has(program.id));
}

/** URL query values for ?filter= on the academic summer programs hub (SEO deep links). */
export const ACADEMIC_HUB_FILTER_QUERY_VALUES: Record<
  Exclude<AcademicProgramFilterId, 'all'>,
  string
> = {
  readingWriting: 'reading-writing',
  bridgeTheGap: 'bridge-the-gap',
  getReadyMath: 'get-ready-math',
};

export function resolveAcademicHubFilterFromQuery(
  param: string | null,
): Exclude<AcademicProgramFilterId, 'all'> | null {
  if (!param) return null;
  const entry = Object.entries(ACADEMIC_HUB_FILTER_QUERY_VALUES).find(([, value]) => value === param);
  return entry ? (entry[0] as Exclude<AcademicProgramFilterId, 'all'>) : null;
}

export function academicHubUrlWithFilter(filter: Exclude<AcademicProgramFilterId, 'all'>): string {
  return `/camps/academic-summer-programs-dublin-ca?filter=${ACADEMIC_HUB_FILTER_QUERY_VALUES[filter]}`;
}
