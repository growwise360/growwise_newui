'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/components/gw/CartContext';
import { Button } from '@/components/ui/button';
import {
  ACADEMIC_SPRINT_COHORT2_UPSELL_SKUS,
  buildAcademicSprintCohort2UpsellCartItem,
  getEligibleAcademicSprintUpsellTiers,
  type AcademicSprintUpsellTierId,
} from '@/lib/academic-sprint-cohort2-upsell';

function UpsellTierBlock({
  tier,
  onAdd,
  onSkip,
}: {
  tier: AcademicSprintUpsellTierId;
  onAdd: () => void;
  onSkip: () => void;
}) {
  const sku = ACADEMIC_SPRINT_COHORT2_UPSELL_SKUS[tier];

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-900">
        Add Cohort 2 · {sku.gradeLabel} · {sku.cohortDates} · Save ${sku.saveAmount}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-sm text-slate-500 line-through">${sku.compareAtPrice}</span>
        <span className="text-2xl font-bold text-[#1F396D]">${sku.price}</span>
      </div>
      <Button
        type="button"
        onClick={onAdd}
        className="w-full bg-[#1F396D] hover:bg-[#183056] text-white"
      >
        Add Cohort 2 — ${sku.price}
      </Button>
      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center text-sm text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
      >
        Skip for now — I&apos;ll enroll in Cohort 2 separately if needed
      </button>
    </div>
  );
}

export function AcademicSprintCohort2Upsell() {
  const { state, addItem } = useCart();
  const [dismissed, setDismissed] = useState(false);

  const eligibleTiers = useMemo(
    () => (dismissed ? [] : getEligibleAcademicSprintUpsellTiers(state.items)),
    [dismissed, state.items],
  );

  if (eligibleTiers.length === 0) return null;

  return (
    <div
      className="mb-6 rounded-xl border-[1.5px] p-5 sm:p-6"
      style={{ backgroundColor: '#F0FAF6', borderColor: '#9FE1CB' }}
      role="region"
      aria-label="Extend to 4 weeks upsell"
    >
      <h2 className="text-lg font-bold text-slate-900">Extend to 4 weeks and save up to $60</h2>
      <p className="mt-2 text-sm text-slate-700">
        Add Cohort 2 (June 30 – July 11) to your order now at a discounted rate.
      </p>

      <div className="mt-5 space-y-6">
        {eligibleTiers.map((tier) => (
          <UpsellTierBlock
            key={tier}
            tier={tier}
            onAdd={() => addItem(buildAcademicSprintCohort2UpsellCartItem(tier))}
            onSkip={() => setDismissed(true)}
          />
        ))}
      </div>
    </div>
  );
}
