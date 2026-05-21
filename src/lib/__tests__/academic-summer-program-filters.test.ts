import { filterAcademicProgramsByChip } from '@/lib/academic-summer-program-filters';
import { buildAllAcademicSummerPrograms } from '@/lib/academic-summer-programs-hub-data';

describe('filterAcademicProgramsByChip', () => {
  const programs = buildAllAcademicSummerPrograms();

  it('returns all six programs for the all filter', () => {
    expect(filterAcademicProgramsByChip(programs, 'all')).toHaveLength(6);
  });

  it('filters reading and writing sprints', () => {
    const filtered = filterAcademicProgramsByChip(programs, 'readingWriting');
    expect(filtered.map((p) => p.id)).toEqual(['read-to-prove', 'write-to-explain']);
  });

  it('filters bridge-the-gap math only', () => {
    const filtered = filterAcademicProgramsByChip(programs, 'bridgeTheGap');
    expect(filtered.map((p) => p.id)).toEqual(['bridge-the-gap-math']);
  });

  it('filters get-ready math tracks', () => {
    const filtered = filterAcademicProgramsByChip(programs, 'getReadyMath');
    expect(filtered.map((p) => p.id)).toEqual(['im1', 'algebra-1', 'geometry']);
  });
});
