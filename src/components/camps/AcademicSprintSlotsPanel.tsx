'use client';

import { useMemo } from 'react';
import { Info } from 'lucide-react';
import { useCart } from '@/components/gw/CartContext';
import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import { toAcademicSummerCartItem } from '@/lib/academic-cart-utils';
import {
  formatAcademicSprintUsd,
  getAcademicSprintById,
  type AcademicSprintPricingTier,
  type AcademicSprintPricingTierId,
} from '@/lib/academic-summer-programs-hub-data';
import type { Level, Program, Slot } from '@/lib/summer-camp-data';
import {
  AcademicPricingSlotPrice,
  AcademicPricingSlotRowLayout,
} from '@/components/camps/AcademicPricingSlotRowLayout';
import { AcademicEnrollmentPanelScroll } from '@/components/camps/AcademicEnrollmentPanelScroll';
import { AcademicMobileProgramSwitcher } from '@/components/camps/AcademicMobileProgramSwitcher';

const COPY = hubCopy.enrollmentPanel;

function AcademicPanelScarcityPill() {
  return (
    <>
      {/* TODO: Replace static "Max 8 students" with live enrollment count
          from booking system when API is available.
          Format: "X spots remaining" when < 4 spots left. */}
      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FAEEDA] px-2 py-0.5 text-[11px] font-medium text-[#633806]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#633806]" aria-hidden />
        Small group · Max 8 students per class
      </span>
    </>
  );
}

function SprintGradeBandDivider() {
  return <div className="my-2 h-px bg-slate-200" aria-hidden />;
}

function buildSprintBothUpfrontNote(upfront: number, saveAmount: number): string {
  return COPY.sprintBothUpfrontNote
    .replace('{upfront}', formatAcademicSprintUsd(upfront))
    .replace('{saveAmount}', formatAcademicSprintUsd(saveAmount));
}

function AcademicSprintSlotRow({
  slot,
  level,
  program,
  tier,
  saveAmount,
  cartItemIds,
  onAdd,
  onRemove,
}: {
  slot: Slot;
  level: Level;
  program: Program;
  tier: AcademicSprintPricingTier;
  saveAmount: number;
  cartItemIds: Set<string>;
  onAdd: (level: Level, slot: Slot) => void;
  onRemove: (slotId: string) => void;
}) {
  const inCart = cartItemIds.has(slot.id);
  const isBothCohorts = slot.id.endsWith('-both');
  const isCohort2 = slot.id.endsWith('-cohort2');
  const compareAtPrice = isBothCohorts ? tier.perCohortPrice * 2 : null;
  const upfrontNote = isBothCohorts
    ? buildSprintBothUpfrontNote(tier.bothCohortsPrice, saveAmount)
    : undefined;
  const saveLabel = COPY.sprintSaveBadge.replace(
    '{amount}',
    formatAcademicSprintUsd(saveAmount),
  );

  return (
    <AcademicPricingSlotRowLayout
      highlighted={isBothCohorts}
      inCart={inCart}
      cohort2Accent={isCohort2}
      info={
        <div className="space-y-1.5">
          <p
            className={`text-[13px] font-bold leading-snug ${isBothCohorts ? 'text-[#085041]' : 'text-slate-800'}`}
          >
            {slot.label}
          </p>
          {isBothCohorts ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-[#0F6E56] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
                {saveLabel}
              </span>
              <span className="rounded-full border border-emerald-300 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#0F6E56]">
                {COPY.sprintBestValueBadge}
              </span>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-600">
            <span className="flex items-center gap-1">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              {slot.format}
            </span>
            <span className="font-semibold normal-case tracking-normal text-slate-700">{slot.time}</span>
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
          priceClassName={isBothCohorts ? 'text-[#085041]' : undefined}
        />
      }
      action={
        inCart ? (
          <button
            type="button"
            aria-label={`Remove ${slot.label}`}
            onClick={() => onRemove(slot.id)}
            className="h-8 shrink-0 rounded-full px-3 text-[10px] font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Add ${slot.label}`}
            onClick={() => onAdd(level, slot)}
            className={`h-8 shrink-0 rounded-full px-3.5 text-[10px] font-bold text-white ${
              isBothCohorts
                ? 'bg-[#0F6E56] hover:bg-[#0B5A46]'
                : 'bg-[#1A2B4A] hover:bg-[#1F396D]'
            }`}
          >
            Add
          </button>
        )
      }
    />
  );
}

export function AcademicSprintSlotsPanel({
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
  const sprint = getAcademicSprintById('academic-summer-sprint');
  const saveAmount = sprint?.pricing?.upsellSaveAmount ?? 0;

  const summerCampItemIds = useMemo(
    () => new Set(cartState.items.filter((i) => i.type === 'summer-camp').map((i) => i.id)),
    [cartState.items],
  );

  const slotsByTier = useMemo(() => {
    if (!level || !sprint?.pricing) return [];
    return sprint.pricing.tiers.map((tier) => ({
      tierId: tier.id as AcademicSprintPricingTierId,
      tier,
      slots: level.slots.filter((slot) => slot.id.includes(`-${tier.id}-`)),
    }));
  }, [level, sprint?.pricing]);

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

  if (!level) return null;

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
        <AcademicPanelScarcityPill />
        <ul className="mt-2 space-y-1" aria-label={`${program.title} highlights`}>
          {program.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
              <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <AcademicEnrollmentPanelScroll>
        <div className="space-y-3">
          <h4 className="border-l-2 border-[#1F396D] pl-3 text-xs font-bold uppercase tracking-tight text-slate-900">
            {COPY.sprintChooseCohortGradeHeader}
          </h4>
          {slotsByTier.map(({ tierId, tier, slots }, index) => (
            <div key={tierId} className="space-y-2">
              {index > 0 ? <SprintGradeBandDivider /> : null}
              <div className="grid gap-2">
                {slots.map((slot) => (
                  <AcademicSprintSlotRow
                    key={slot.id}
                    slot={slot}
                    level={level}
                    program={program}
                    tier={tier}
                    saveAmount={saveAmount}
                    cartItemIds={summerCampItemIds}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </AcademicEnrollmentPanelScroll>
    </div>
  );
}
