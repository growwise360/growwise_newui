import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import { publicPath } from '@/lib/publicPath';
import { MathHubSection } from './MathHubSection';
import ProgramRecommendationButton from '@/components/ProgramRecommendationButton';

type ProgramOptionCardsProps = {
  locale: string;
};

export function ProgramOptionCards({ locale }: ProgramOptionCardsProps) {
  const { programOptions } = MATH_HUB_COPY;

  return (
    <MathHubSection
      id="packages"
      label={programOptions.sectionLabel}
      heading={programOptions.heading}
      body={programOptions.body}
      className="bg-slate-50/80"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {programOptions.cards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <header>
              <h3 className="font-heading text-xl font-bold text-[#1F396D]">{card.heading}</h3>
              <p className="mt-0.5 text-sm text-slate-500">{card.gradeRange}</p>
              <p className="mt-0.5 text-sm text-slate-500">{card.tracks}</p>
            </header>

            <ul className="mt-5 flex-1 divide-y divide-slate-100">
              {card.options.map((option) => (
                <li key={option.name} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-semibold text-slate-900">{option.name}</p>
                  {option.subtitle ? (
                    <p className="mt-0.5 text-xs text-slate-500">{option.subtitle}</p>
                  ) : null}
                  <p className="mt-0.5 text-sm text-slate-600">{option.schedule}</p>
                  {option.bestFor ? (
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {option.bestFor}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>

            {card.includedBenefit ? (
              <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                {card.includedBenefit}
              </p>
            ) : null}

            <Link
              href={publicPath(card.path, locale)}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F16112] hover:text-[#d54f0a]"
            >
              {card.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-slate-600">
          GrowWise pricing depends on grade, program fit, and format. Share a few details to receive the right options and current pricing before enrollment.
        </p>
        <ProgramRecommendationButton sourcePage="academic-math" defaultSubject="Math" />
      </div>
    </MathHubSection>
  );
}
