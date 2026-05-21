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
