import Link from 'next/link';
import type { SprintOverviewCardModel } from '@/lib/academic-summer-programs-hub-data';
import { cn } from '@/lib/utils';

type AcademicSprintOverviewCardProps = {
  card: SprintOverviewCardModel;
  className?: string;
};

export function AcademicSprintOverviewCard({ card, className }: AcademicSprintOverviewCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm',
        className,
      )}
    >
      <h3 className="font-heading text-xl font-bold text-[#1F396D]">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{card.summary}</p>
      <Link
        href={card.anchorHref}
        className="mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#1F396D] underline-offset-4 hover:underline"
      >
        {card.anchorLabel}
      </Link>
    </article>
  );
}
