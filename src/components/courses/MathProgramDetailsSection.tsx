'use client';

import { CheckCircle, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Retained for internal pricing configuration and checkout mapping. */
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
  readonly onBookAssessment: () => void;
  readonly ctaLabel?: string;
};

export function MathProgramDetailsSection({
  sectionLabel,
  heading,
  includes,
  outcomes,
  onBookAssessment,
  ctaLabel = 'Get More Information',
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
              <p className="text-2xl font-bold text-[#1F396D] mb-2">Find the right program for your child</p>
              <p className="text-sm leading-relaxed text-gray-600 mb-4">
                Tell us your child&apos;s grade, subject, and main goal. We&apos;ll recommend the best-fit option and send current pricing—no commitment.
              </p>
              <div className="mb-4 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  Takes about 30 seconds
                </span>
              </div>

              <Button
                type="button"
                onClick={onBookAssessment}
                className="bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white rounded-full w-full font-semibold"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
