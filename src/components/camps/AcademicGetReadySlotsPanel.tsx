'use client';

import { useMemo } from 'react';
import { Info } from 'lucide-react';
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
} from '@/components/camps/AcademicPricingSlotRowLayout';
import { AcademicEnrollmentPanelScroll } from '@/components/camps/AcademicEnrollmentPanelScroll';
import { AcademicMobileProgramSwitcher } from '@/components/camps/AcademicMobileProgramSwitcher';

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
          <div className="space-y-1.5">
            <p
              className={`text-xs font-medium leading-snug ${isBoth ? 'text-[#085041]' : 'text-slate-900'}`}
            >
              {slot.label}
            </p>
            {isBoth && saveLabel ? (
              <span className="inline-flex rounded-full bg-[#0F6E56] px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                {saveLabel}
              </span>
            ) : null}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5A623]" />
                {slot.time}
              </span>
            </div>
            {upfrontNote ? (
              <p className="text-[10px] leading-snug text-[#0F6E56]">{upfrontNote}</p>
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
            <button
              type="button"
              onClick={() => onRemove(slot.id)}
              className="h-8 shrink-0 rounded-full px-3 text-[10px] font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAdd(level, slot)}
              className={`h-8 shrink-0 rounded-full px-3.5 text-[10px] font-bold text-white ${
                isBoth ? 'bg-[#0F6E56] hover:bg-[#0B5A46]' : 'bg-[#1A2B4A] hover:bg-[#1F396D]'
              }`}
            >
              Add
            </button>
          )
        }
      />
      {footnote ? (
        <p className="pl-0.5 text-[10px] italic leading-snug text-slate-500">{footnote}</p>
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
    <div
      id="slots-panel"
      role="region"
      aria-label={program.title}
      className="flex h-auto max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl"
    >
      <AcademicMobileProgramSwitcher
        programs={programs}
        selectedProgramId={program.id}
        onSelectProgram={onSelectProgram}
      />
      <div className="border-b border-slate-50 bg-slate-50/30 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-extrabold leading-tight text-slate-900">
            {program.title}
          </h3>
          <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F396D]/10 text-[#1F396D]"
            aria-hidden
          >
            <Info className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-gray-800">{program.outcome}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FAEEDA] px-2 py-0.5 text-[11px] font-medium text-[#633806]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#633806]" aria-hidden />
          Small group · Max 8 students per class
        </span>
        <ul className="mt-2 space-y-1" aria-label={`${program.title} highlights`}>
          {program.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
              <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <AcademicEnrollmentPanelScroll className="space-y-2">
        <div className="space-y-2">
          <h4 className="border-t border-slate-200 pt-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
            {COPY.getReadyChooseCohortHeader}
          </h4>

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

          <div className="my-2 h-px bg-slate-200" aria-hidden />

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
        </div>
      </AcademicEnrollmentPanelScroll>
    </div>
  );
}
