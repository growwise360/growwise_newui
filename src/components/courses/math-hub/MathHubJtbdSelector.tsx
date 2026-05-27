'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import { publicPath } from '@/lib/publicPath';
import { MathHubSection } from './MathHubSection';

type MathHubJtbdSelectorProps = {
  locale: string;
};

export function MathHubJtbdSelector({ locale }: MathHubJtbdSelectorProps) {
  const { jtbd } = MATH_HUB_COPY;
  const [selectedId, setSelectedId] = useState<string>(jtbd.situations[0].id);
  const selected = jtbd.situations.find((s) => s.id === selectedId) ?? jtbd.situations[0];

  return (
    <MathHubSection
      label={jtbd.sectionLabel}
      heading={jtbd.heading}
      body={jtbd.body}
      className="bg-slate-50/80"
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-2 lg:col-span-2" role="list">
          {jtbd.situations.map((situation) => {
            const isSelected = selectedId === situation.id;
            return (
              <button
                key={situation.id}
                type="button"
                role="listitem"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(situation.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-[#1F396D] bg-[#1F396D] text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-[#1F396D]/40 hover:bg-slate-50'
                }`}
              >
                {situation.label}
              </button>
            );
          })}
        </div>
        <div
          className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-3 min-h-[200px]"
          aria-live="polite"
        >
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Symptoms: </span>
            {selected.symptoms}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-[#1F396D]">What we do: </span>
            {selected.resolution}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={publicPath(selected.primaryCta.href, locale)}
              className="inline-flex items-center justify-center rounded-full bg-[#F16112] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d54f0a]"
            >
              {selected.primaryCta.label}
            </Link>
            <Link
              href={publicPath(selected.secondaryCta.href, locale)}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
            >
              {selected.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </MathHubSection>
  );
}
