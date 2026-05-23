'use client';

import { useMemo } from 'react';
import { AcademicGetReadySlotsPanel } from '@/components/camps/AcademicGetReadySlotsPanel';
import { AcademicSprintSlotsPanel } from '@/components/camps/AcademicSprintSlotsPanel';
import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import {
  isAcademicGetReadyProgram,
  isAcademicSummerSprintProgram,
} from '@/lib/academic-summer-programs-hub-data';
import type { Program } from '@/lib/summer-camp-data';
import { cn } from '@/lib/utils';

const COPY = hubCopy.enrollmentPanel;

const panelShellClass =
  'bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex w-full min-h-0 flex-col lg:max-h-full';

function panelProgramForDisplay(program: Program): Program {
  if (program.id === 'algebra-1') {
    return { ...program, title: 'Algebra 1 Get Ready' };
  }
  return program;
}

export function AcademicEnrollmentPanel({
  program,
  programs,
  onSelectProgram,
  onInquireClick,
  onChooseProgram,
}: {
  program: Program | null;
  programs: readonly Program[];
  onSelectProgram: (program: Program) => void;
  onInquireClick: () => void;
  onChooseProgram: () => void;
}) {
  const panelProgram = useMemo(
    () => (program ? panelProgramForDisplay(program) : null),
    [program],
  );

  if (!program || !panelProgram) {
    return (
      <div
        id="slots-panel"
        className={cn(panelShellClass, 'min-h-[280px] justify-between p-8')}
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="font-heading text-base font-bold text-slate-900">{COPY.emptyTitle}</p>
          <p className="mt-2 text-sm text-slate-600">{COPY.emptyPanel}</p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onChooseProgram}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1F396D] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#183056] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
          >
            {COPY.chooseProgramCta}
          </button>
          <button
            type="button"
            onClick={onInquireClick}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#1F396D] shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
          >
            {COPY.askScheduleCta}
          </button>
        </div>
      </div>
    );
  }

  if (isAcademicSummerSprintProgram(program.id)) {
    return (
      <AcademicSprintSlotsPanel
        key={program.id}
        program={panelProgram}
        programs={programs}
        onSelectProgram={onSelectProgram}
      />
    );
  }

  if (isAcademicGetReadyProgram(program.id)) {
    return (
      <AcademicGetReadySlotsPanel
        key={program.id}
        program={panelProgram}
        programs={programs}
        onSelectProgram={onSelectProgram}
      />
    );
  }

  return null;
}
