import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Calculator, PenTool } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import {
  formatAcademicSprintUsd,
  type AcademicTrackCardModel,
} from '@/lib/academic-summer-programs-hub-data';
import { CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

const COPY = hubCopy.trackCard;

const ICONS = {
  book: BookOpen,
  pen: PenTool,
  calculator: Calculator,
} as const;

type AcademicSprintCardProps = {
  card: AcademicTrackCardModel;
  locale: string;
};

export function AcademicSprintCard({ card, locale }: AcademicSprintCardProps) {
  const Icon = ICONS[card.icon];
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;
  const primaryHref =
    card.ctaType === 'page' && card.ctaHref
      ? createLocaleUrl(card.ctaHref, locale)
      : phoneHref;
  const isPhonePrimary = card.ctaType === 'phone';

  return (
    <article
      id={`track-${card.id}`}
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#eef2f7]">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 96vw, (max-width: 1024px) 48vw, 360px"
          quality={75}
          decoding="async"
          className="object-contain object-center"
          draggable={false}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-lg font-bold text-[#1F396D] md:text-xl">{card.name}</h3>
            <p className="mt-1.5 min-h-[2.75rem] text-sm leading-relaxed text-slate-700 line-clamp-2">
              {card.tagline}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge
              variant="outline"
              className="border-[#1F396D]/20 bg-[#1F396D]/5 text-[#1F396D]"
            >
              {card.gradeBadge}
            </Badge>
            <Icon className="h-5 w-5 text-[#1D9E75]" aria-hidden />
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {COPY.bestForLabel}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2" role="list">
            {card.bestFor.map((skill) => (
              <li key={skill}>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {COPY.formatLabel}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-800">
            {card.formatLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {COPY.cohortsLabel}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-800">
            {card.cohortLines.map((row) => (
              <li key={`${row.label}-${row.dates}`}>
                {row.label ? (
                  <>
                    <span className="font-medium">{row.label}</span> {row.dates}
                  </>
                ) : (
                  row.dates
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {COPY.pricingLabel}
          </p>
          <ul className="mt-2 space-y-1.5">
            {card.pricingLines.map((row) => (
              <li key={row.label} className="flex justify-between gap-3 text-sm text-slate-800">
                <span>{row.label}</span>
                <span className="font-semibold tabular-nums text-slate-900">
                  {formatAcademicSprintUsd(row.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {isPhonePrimary ? (
            <a
              href={primaryHref}
              className={cn(
                'inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1F396D] px-4 py-3',
                'text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#183056]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2',
              )}
            >
              {COPY.chooseTrackCta}
            </a>
          ) : (
            <Link
              href={primaryHref}
              className={cn(
                'inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1F396D] px-4 py-3',
                'text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#183056]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2',
              )}
            >
              {COPY.chooseTrackCta}
            </Link>
          )}
          <a
            href={phoneHref}
            className="text-center text-sm font-semibold text-[#1F396D] underline-offset-4 hover:underline"
          >
            {COPY.confirmLevelCta}
          </a>
        </div>
      </div>
    </article>
  );
}
