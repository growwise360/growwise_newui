'use client';

import { useTranslations } from 'next-intl';
import type { Program } from '@/lib/summer-camp-data';
import { isSummerCampApplicationsClosed } from '@/lib/summer-camp-data';
import { getSummerCampPickCardMeta } from '@/lib/summer-camp-pick-card-meta';
import { cn } from '@/lib/utils';
import styles from '@/components/camps/academic-mobile-program-switcher.module.css';

export function SummerMobileProgramSwitcher({
  programs,
  selectedProgramId,
  onSelectProgram,
}: {
  programs: readonly Program[];
  selectedProgramId: string;
  onSelectProgram: (program: Program) => void;
}) {
  const t = useTranslations('summerCamp.enrollmentPanel');

  return (
    <div className={cn(styles.switcher, 'min-[769px]:hidden')} aria-label={t('mobileSwitcherLabel')}>
      <span className={styles.label}>{t('mobileSwitcherLabel')}</span>
      <div className={styles.pillRow} role="tablist" aria-label={t('mobileSwitcherLabel')}>
        {programs.map((program) => {
          const meta = getSummerCampPickCardMeta(program.id);
          const label = meta?.title ?? program.title;
          const isActive = selectedProgramId === program.id;
          const applicationsClosed = isSummerCampApplicationsClosed(program.id);

          return (
            <button
              key={program.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={
                applicationsClosed ? `${label} — applications closed` : label
              }
              onClick={() => onSelectProgram(program)}
              className={cn(
                styles.pill,
                isActive && styles.pillActive,
                applicationsClosed && !isActive && 'opacity-60',
              )}
            >
              {label}
              {applicationsClosed ? ' · Closed' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
