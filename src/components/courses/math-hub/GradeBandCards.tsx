import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import { publicPath } from '@/lib/publicPath';
import { MathHubSection } from './MathHubSection';

type GradeBandCardsProps = {
  locale: string;
};

export function GradeBandCards({ locale }: GradeBandCardsProps) {
  const { gradeBands } = MATH_HUB_COPY;

  return (
    <MathHubSection
      label={gradeBands.sectionLabel}
      heading={gradeBands.subheading}
      className="bg-white"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {gradeBands.cards.map((card) => (
          <Link
            key={card.id}
            href={publicPath(card.path, locale)}
            className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
              card.featured
                ? 'border-[#F16112] ring-2 ring-[#F16112]/30'
                : 'border-slate-200'
            }`}
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
              <img
                src={card.imageSrc}
                alt={card.imageAlt}
                width={640}
                height={400}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center select-none"
                draggable={false}
              />
              {card.featured ? (
                <span className="absolute left-4 top-4 inline-flex w-fit rounded-full bg-[#F16112] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Most enrolled
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1F396D]">
                {card.gradeTag}
              </span>
              <h3 className="font-heading mt-1 text-xl font-bold text-slate-900">{card.heading}</h3>
              <p className="mt-1 text-sm font-medium text-slate-700">{card.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.description}</p>
              {card.masteryLine ? (
                <p className="mt-1.5 flex-1 text-[11px] text-slate-400">{card.masteryLine}</p>
              ) : (
                <div className="flex-1" />
              )}
              <p className="mt-4 text-xs font-medium text-slate-500">Courses included</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {card.coursesIncluded.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-[#1F396D]">{card.packageLine}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F16112] group-hover:text-[#d54f0a]">
                {card.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </MathHubSection>
  );
}
