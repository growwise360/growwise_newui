import type { Program } from '@/lib/summer-camp-data';
import type { AcademicSprintTrackId } from '@/lib/academic-summer-programs-hub-data';

/** Parent-facing groupings on the academic hub (by start window, not internal sprint names). */
export type AcademicProgramGroup = 'junePrograms' | 'julyPrograms';

export const ACADEMIC_PROGRAM_GROUP_ORDER: readonly AcademicProgramGroup[] = [
  'junePrograms',
  'julyPrograms',
];

const JULY_TRACK_IDS = new Set<AcademicSprintTrackId>(['im1', 'im2', 'algebra-1', 'geometry']);

const TRACK_DISPLAY_ORDER: readonly AcademicSprintTrackId[] = [
  'read-to-prove',
  'write-to-explain',
  'bridge-the-gap-math',
  'im1',
  'im2',
  'algebra-1',
  'geometry',
];

export function getAcademicProgramGroup(programId: string): AcademicProgramGroup {
  return JULY_TRACK_IDS.has(programId as AcademicSprintTrackId) ? 'julyPrograms' : 'junePrograms';
}

export function orderAcademicSummerPrograms(programs: Program[]): Program[] {
  const byId = new Map(programs.map((p) => [p.id, p]));
  return TRACK_DISPLAY_ORDER.map((id) => byId.get(id)).filter((p): p is Program => Boolean(p));
}

export function groupAcademicProgramsByWindow(
  programs: Program[],
): Array<{ group: AcademicProgramGroup; programs: Program[] }> {
  const ordered = orderAcademicSummerPrograms(programs);
  return ACADEMIC_PROGRAM_GROUP_ORDER.map((group) => ({
    group,
    programs: ordered.filter((p) => getAcademicProgramGroup(p.id) === group),
  })).filter((entry) => entry.programs.length > 0);
}
