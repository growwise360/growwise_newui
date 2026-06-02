'use client';

import { useMemo } from 'react';
import { useCart } from '@/components/gw/CartContext';
import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import { toAcademicSummerCartItem } from '@/lib/academic-cart-utils';
import {
  formatAcademicSprintUsd,
  getAcademicSummerProgramsHubData,
  getGetReadyPanelMeta,
  type AcademicGetReadyTrackId,
  type GetReadyPanelMeta,
} from '@/lib/academic-summer-programs-hub-data';
import type { Level, Program, Slot } from '@/lib/summer-camp-data';
import {
  AcademicPricingSlotPrice,
  AcademicPricingSlotRowLayout,
  EnrollmentCompactAddButton,
} from '@/components/camps/AcademicPricingSlotRowLayout';
import { AcademicMobileProgramSwitcher } from '@/components/camps/AcademicMobileProgramSwitcher';
import {
  EnrollmentPanelHeader,
  EnrollmentPanelScrollBody,
  EnrollmentPanelSectionLabel,
  EnrollmentPanelShell,
  EnrollmentPanelSlotList,
} from '@/components/camps/EnrollmentPanelLayout';

const COPY = hubCopy.enrollmentPanel;

function findSlot(slots: Slot[], suffix: string): Slot | undefined {
  return slots.find((slot) => slot.id.endsWith(suffix));
}

function GetReadySlotRow({
  slot,
  level,
  variant,
  footnote,
  upfrontNote,
  saveLabel,
  compareAtPrice,
  cartItemIds,
  onAdd,
  onRemove,
}: {
  slot: Slot;
  level: Level;
  variant: 'standard' | 'both';
  footnote?: string | null;
  upfrontNote?: string;
  saveLabel?: string;
  compareAtPrice?: number | null;
  cartItemIds: Set<string>;
  onAdd: (slotLevel: Level, slot: Slot) => void;
  onRemove: (slotId: string) => void;
}) {
  const inCart = cartItemIds.has(slot.id);
  const isBoth = variant === 'both';
  const isCohort2 = slot.id.endsWith('-cohort2');

  return (
    <div className="space-y-1">
      <AcademicPricingSlotRowLayout
        highlighted={isBoth}
        inCart={inCart}
        cohort2Accent={isCohort2}
        info={
          <div>
            <p
              className={`truncate text-[12px] font-bold leading-tight max-[768px]:whitespace-normal max-[768px]:line-clamp-2 ${isBoth ? 'text-[#085041]' : 'text-slate-900'}`}
            >
              {slot.label}
            </p>
            {isBoth && saveLabel ? (
              <span className="mt-0.5 inline-flex rounded-full bg-[#0F6E56] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                {saveLabel}
              </span>
            ) : null}
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-600">
              <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#F5A623]" />
              {slot.time}
            </div>
            {upfrontNote ? (
              <p className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-[#0F6E56]">{upfrontNote}</p>
            ) : null}
          </div>
        }
        price={
          <AcademicPricingSlotPrice
            price={slot.price}
            compareAtPrice={compareAtPrice}
            priceClassName={isBoth ? 'text-[#085041]' : undefined}
          />
        }
        action={
          inCart ? (
            <EnrollmentCompactAddButton
              label="Remove"
              ariaLabel={`Remove ${slot.label}`}
              onClick={() => onRemove(slot.id)}
              variant="remove"
            />
          ) : (
            <EnrollmentCompactAddButton
              label="Add"
              ariaLabel={`Add ${slot.label}`}
              onClick={() => onAdd(level, slot)}
              variant={isBoth ? 'green' : 'default'}
            />
          )
        }
      />
      {footnote ? (
        <p className="px-4 py-[5px] text-[10px] italic leading-snug text-slate-500">{footnote}</p>
      ) : null}
    </div>
  );
}

function buildBothUpfrontNote(panelMeta: GetReadyPanelMeta): string {
  const { both } = panelMeta;
  return COPY.getReadyBothUpfrontNote
    .replace('{upfront}', formatAcademicSprintUsd(both.upfrontAmount))
    .replace('{saveAmount}', formatAcademicSprintUsd(both.upfrontSaveAmount));
}

export function AcademicGetReadySlotsPanel({
  program,
  programs,
  onSelectProgram,
}: {
  program: Program;
  programs: readonly Program[];
  onSelectProgram: (program: Program) => void;
}) {
  const { state: cartState, addItem, removeItem } = useCart();

  const level = program.levels[0];
  const panelMeta = getGetReadyPanelMeta(program.id as AcademicGetReadyTrackId);
  const hub = getAcademicSummerProgramsHubData();
  const saveAmount = hub.getReadyUpsellSaveAmount;

  const summerCampItemIds = useMemo(
    () => new Set(cartState.items.filter((i) => i.type === 'summer-camp').map((i) => i.id)),
    [cartState.items],
  );

  const slots = level?.slots ?? [];
  const cohort1Slot = findSlot(slots, '-cohort1');
  const cohort2Slot = findSlot(slots, '-cohort2');
  const bothSlot = findSlot(slots, '-both');

  const saveLabel = COPY.getReadySaveBadge.replace(
    '{amount}',
    formatAcademicSprintUsd(saveAmount),
  );
  const bothUpfrontNote = panelMeta ? buildBothUpfrontNote(panelMeta) : '';
  const compareAtPrice =
    cohort1Slot && bothSlot ? cohort1Slot.price * 2 : null;

  const handleAdd = (slotLevel: Level, slot: Slot) => {
    if (summerCampItemIds.has(slot.id)) return;
    void import('@/lib/meta-pixel').then(({ trackEnrollClick }) =>
      trackEnrollClick(program.title, slot.price),
    );
    addItem(toAcademicSummerCartItem(program, slotLevel, slot));
  };

  const handleRemove = (slotId: string) => {
    removeItem(slotId);
  };

  if (!level || !panelMeta || !cohort1Slot || !cohort2Slot || !bothSlot) {
    return null;
  }

  return (
    <EnrollmentPanelShell ariaLabel={program.title}>
      <AcademicMobileProgramSwitcher
        programs={programs}
        selectedProgramId={program.id}
        onSelectProgram={onSelectProgram}
      />
      <EnrollmentPanelHeader
        title={program.title}
        subtitle={program.outcome}
        footer={
          <>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#FAEEDA] px-2 py-0.5 text-[11px] font-medium text-[#633806]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#633806]" aria-hidden />
              Small group · Max 8 students per class
            </span>
            <ul className="mt-1 space-y-0.5" aria-label={`${program.title} highlights`}>
              {program.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-1.5 text-[11px] leading-snug text-slate-600">
                  <span className="mt-[4px] h-1 w-1 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </>
        }
      />

      <EnrollmentPanelSectionLabel>{COPY.getReadyChooseCohortHeader}</EnrollmentPanelSectionLabel>
      <EnrollmentPanelScrollBody>
        <EnrollmentPanelSlotList>
          <GetReadySlotRow
            slot={cohort1Slot}
            level={level}
            variant="standard"
            cartItemIds={summerCampItemIds}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
          <GetReadySlotRow
            slot={cohort2Slot}
            level={level}
            variant="standard"
            footnote={panelMeta.cohort2HolidayNote}
            cartItemIds={summerCampItemIds}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        </EnrollmentPanelSlotList>
        <div className="h-px bg-slate-200" aria-hidden />
        <EnrollmentPanelSlotList>
          <GetReadySlotRow
            slot={bothSlot}
            level={level}
            variant="both"
            saveLabel={saveLabel}
            upfrontNote={bothUpfrontNote}
            compareAtPrice={compareAtPrice}
            cartItemIds={summerCampItemIds}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        </EnrollmentPanelSlotList>
      </EnrollmentPanelScrollBody>
    </EnrollmentPanelShell>
  );
}
