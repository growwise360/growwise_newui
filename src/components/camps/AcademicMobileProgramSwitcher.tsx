'use client';

import hubCopy from '@/i18n/messages/academic-summer-programs-en.json';
import hubTrackCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import type { Program } from '@/lib/summer-camp-data';
import { cn } from '@/lib/utils';
import styles from '@/components/camps/academic-mobile-program-switcher.module.css';

const COPY = hubCopy.booking;

/** Display order for mobile panel program switcher pills. */
export const ACADEMIC_MOBILE_SWITCHER_PROGRAM_IDS = [
  'read-to-prove',
  'write-to-explain',
  'bridge-the-gap-math',
  'im1',
  'algebra-1',
  'geometry',
] as const;

function pillLabel(programId: string): string {
  const track = hubTrackCopy.tracks[programId as keyof typeof hubTrackCopy.tracks];
  return track?.name ?? programId;
}

export function AcademicMobileProgramSwitcher({
  programs,
  selectedProgramId,
  onSelectProgram,
}: {
  programs: readonly Program[];
  selectedProgramId: string;
  onSelectProgram: (program: Program) => void;
}) {
  const programById = new Map(programs.map((program) => [program.id, program]));

  return (
    <div className={cn(styles.switcher, 'min-[768px]:hidden')} aria-label={COPY.mobileSwitcherLabel}>
      <span className={styles.label}>{COPY.mobileSwitcherLabel}</span>
      <div className={styles.pillRow} role="tablist" aria-label={COPY.mobileSwitcherLabel}>
        {ACADEMIC_MOBILE_SWITCHER_PROGRAM_IDS.map((programId, index) => {
          const program = programById.get(programId);
          if (!program) return null;

          const isActive = selectedProgramId === programId;
          const showDivider = index === 3;

          return (
            <span key={programId} className="inline-flex items-center">
              {showDivider ? <span className={styles.divider} aria-hidden="true" /> : null}
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectProgram(program)}
                className={cn(styles.pill, isActive && styles.pillActive)}
              >
                {pillLabel(programId)}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
