'use client';

import { useMemo } from 'react';
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

function AcademicPanelScarcityPill() {
  return (
    <>
      {/* TODO: Replace static "Max 8 students" with live enrollment count
          from booking system when API is available.
          Format: "X spots remaining" when < 4 spots left. */}
      <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#FAEEDA] px-2 py-0.5 text-[11px] font-medium text-[#633806]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#633806]" aria-hidden />
        Small group · Max 8 students per class
      </span>
    </>
  );
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
        <div>
          <p
            className={`truncate text-[12px] font-bold leading-tight max-[768px]:whitespace-normal max-[768px]:line-clamp-2 ${isBothCohorts ? 'text-[#085041]' : 'text-slate-800'}`}
          >
            {slot.label}
          </p>
          {isBothCohorts ? (
            <div className="mt-0.5 flex flex-wrap items-center gap-1">
              <span className="rounded-full bg-[#0F6E56] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                {saveLabel}
              </span>
              <span className="rounded-full border border-emerald-300 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#0F6E56]">
                {COPY.sprintBestValueBadge}
              </span>
            </div>
          ) : null}
          <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-slate-600">
            <span className="flex items-center gap-1">
              <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber-400" />
              {slot.format}
            </span>
            <span className="text-slate-700">{slot.time}</span>
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
          priceClassName={isBothCohorts ? 'text-[#085041]' : undefined}
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
            variant={isBothCohorts ? 'green' : 'default'}
          />
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
            <AcademicPanelScarcityPill />
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

      <EnrollmentPanelSectionLabel>{COPY.sprintChooseCohortGradeHeader}</EnrollmentPanelSectionLabel>
      <EnrollmentPanelScrollBody>
        <EnrollmentPanelSlotList>
          {slotsByTier.flatMap(({ tierId, tier, slots }, index) => [
            ...(index > 0
              ? [
                  <div key={`divider-${tierId}`} className="h-px bg-slate-200" aria-hidden />,
                ]
              : []),
            ...slots.map((slot) => (
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
            )),
          ])}
        </EnrollmentPanelSlotList>
      </EnrollmentPanelScrollBody>
    </EnrollmentPanelShell>
  );
}
