'use client';

import { CheckCircle, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type MathProgramPricingTier = {
  readonly name: string;
  readonly schedule: string;
  readonly price: string;
  readonly subtitle?: string;
  readonly bestFor?: string;
  readonly featured?: boolean;
};

type MathProgramDetailsSectionProps = {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly includes: readonly string[];
  readonly outcomes: readonly string[];
  readonly fromMonthlyLabel: string;
  readonly tiers: readonly MathProgramPricingTier[];
  readonly onBookAssessment: () => void;
};

export function MathProgramDetailsSection({
  sectionLabel,
  heading,
  includes,
  outcomes,
  fromMonthlyLabel,
  tiers,
  onBookAssessment,
}: MathProgramDetailsSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
          {sectionLabel}
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">{heading}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-gray-800 mb-4">What&apos;s included:</p>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-4">At the end of 3 months, your child should:</p>
            <ul className="space-y-3 mb-8">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <Star className="h-4 w-4 mt-0.5 text-[#F16112] shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-[#F16112]/20 bg-orange-50 p-5">
              <p className="text-2xl font-bold text-[#F16112] mb-1">{fromMonthlyLabel}</p>
              <p className="text-sm text-gray-600 mb-4">Billed monthly · 3-month minimum</p>

              <div className="space-y-2 mb-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`flex items-center justify-between bg-white rounded-lg px-4 py-3 border ${
                      tier.featured ? 'border-[#F16112]/40 ring-1 ring-[#F16112]/20' : 'border-gray-100'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{tier.name}</p>
                      {tier.subtitle ? (
                        <p className="text-xs text-gray-500">{tier.subtitle}</p>
                      ) : null}
                      <p className="text-xs text-gray-500">{tier.schedule}</p>
                      {tier.bestFor ? (
                        <p className="mt-1 max-w-[220px] text-xs leading-snug text-gray-500">
                          {tier.bestFor}
                        </p>
                      ) : null}
                    </div>
                    <p className="font-bold text-[#F16112] shrink-0 ml-3">{tier.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 mb-4">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  No registration fee through July 2026
                </span>
              </div>

              <Button
                type="button"
                onClick={onBookAssessment}
                className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full w-full font-semibold"
              >
                Book free 45-min assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
