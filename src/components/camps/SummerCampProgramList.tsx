'use client';

import { Fragment, memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { AcademicSummerProgramsTeaserBand } from '@/components/camps/AcademicSummerProgramsTeaserBand';
import { HighSchoolSummerIntensiveTeaserBand } from '@/components/camps/HighSchoolSummerIntensiveTeaserBand';
import { SummerCampParentsKnowStrip } from '@/components/camps/SummerCampParentsKnowStrip';
import type { Program } from '@/lib/summer-camp-data';
import {
  getSummerCampProgramTrack,
  orderProgramsBySummerCampTrack,
  type SummerCampProgramTrack,
} from '@/lib/summer-camp-program-groups';
import { getSummerCampPickCardMeta } from '@/lib/summer-camp-pick-card-meta';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import {
  getSummerCampProgramSeoLink,
  summerCampSeoMessagePath,
} from '@/lib/summer-camp-seo-links';

function groupProgramsByTrack(ordered: Program[]): Array<{
  track: SummerCampProgramTrack | 'unknown';
  programs: Program[];
}> {
  const groups: Array<{ track: SummerCampProgramTrack | 'unknown'; programs: Program[] }> = [];
  let current: (typeof groups)[number] | null = null;
  for (const p of ordered) {
    const tr = getSummerCampProgramTrack(p.id) ?? 'unknown';
    if (!current || current.track !== tr) {
      current = { track: tr, programs: [] };
      groups.push(current);
    }
    current.programs.push(p);
  }
  return groups;
}

const CARD_SHELL_CLASS = (isSelected: boolean) =>
  `group flex w-full flex-col overflow-hidden rounded-xl border-2 bg-white text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2 ${
    isSelected
      ? 'border-[#1F396D] shadow-lg'
      : 'border-slate-200 active:border-slate-300 min-[769px]:hover:border-slate-300 min-[769px]:hover:shadow-md'
  }`;

const TITLE_CLASS = (isSelected: boolean) =>
  `line-clamp-2 font-black text-sm uppercase leading-snug tracking-tight ${
    isSelected ? 'text-[#1F396D]' : 'text-slate-900'
  }`;

const SummerCampProgramPickCard = memo(function SummerCampProgramPickCard({
  program,
  isSelected,
  onSelect,
  imageSizes,
  imageWrapperClassName,
}: {
  program: Program;
  isSelected: boolean;
  onSelect: (program: Program) => void;
  imageSizes: string;
  imageWrapperClassName: string;
}) {
  const t = useTranslations('summerCamp');
  const cardMeta = getSummerCampPickCardMeta(program.id);

  const handleEnroll = useCallback(() => {
    void import('@/lib/meta-pixel').then(({ trackCampView }) =>
      trackCampView(program.title, program.category),
    );
    onSelect(program);
  }, [onSelect, program]);

  if (!cardMeta) return null;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={cardMeta.title}
      onClick={handleEnroll}
      className={CARD_SHELL_CLASS(isSelected)}
    >
      <div className={`relative w-full shrink-0 overflow-hidden bg-slate-200 ${imageWrapperClassName}`}>
        <Image
          src={program.image}
          alt={`${cardMeta.title}: ${program.description}`}
          fill
          sizes={imageSizes}
          quality={70}
          decoding="async"
          className="object-cover transition-transform duration-500 min-[769px]:group-hover:scale-105"
          draggable={false}
          unoptimized={/^https?:\/\//i.test(program.image)}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-3">
        <h4 className={TITLE_CLASS(isSelected)}>{cardMeta.title}</h4>
        <span className="mt-1.5 inline-flex w-fit rounded-full border border-[#1F396D]/20 bg-[#1F396D]/5 px-2 py-0.5 text-[10px] font-semibold text-[#1F396D]">
          {cardMeta.gradeLine}
        </span>
        <p className="mt-2 rounded-md bg-[#1F396D]/8 px-2.5 py-1.5 text-[11px] font-bold leading-snug text-[#1F396D]">
          {cardMeta.dayType}
        </p>
        <span className="mt-2 inline-flex w-fit rounded-full bg-[#1F396D]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#1F396D]">
          {cardMeta.formatPill}
        </span>
        <div className="mt-2 min-h-0 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">
            {cardMeta.workOnLabel}
          </p>
          <ul className="mt-1 space-y-1" role="list">
            {cardMeta.workOnBullets.slice(0, 3).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12px] font-medium leading-tight text-slate-800"
              >
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 line-clamp-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-900">
          <span aria-hidden="true">✓ </span>
          {cardMeta.outcome}
        </p>
        {isSelected ? (
          <div
            aria-live="polite"
            className="mt-1.5 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#1F396D]"
          >
            {t('card.active')} <Check className="h-3 w-3" aria-hidden="true" />
          </div>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-2 flex h-8 w-full shrink-0 items-center justify-center rounded-full bg-[#1A2B4A] px-3.5 text-[10px] font-bold text-white min-[769px]:group-hover:bg-[#1F396D]"
        >
          {cardMeta.ctaLabel}
        </span>
      </div>
    </button>
  );
});

export const ProgramList = memo(function ProgramList({
  programs = [],
  onSelectProgram,
  selectedProgramId,
}: {
  programs?: Program[] | null;
  onSelectProgram: (p: Program) => void;
  selectedProgramId: string | null;
}) {
  const t = useTranslations('summerCamp');
  const locale = useLocale();
  const list = programs ?? [];
  const ordered = useMemo(() => orderProgramsBySummerCampTrack(list), [list]);
  const groups = useMemo(() => groupProgramsByTrack(ordered), [ordered]);
  const showAcademicTeaser = groups.some((g) => g.track === 'aiGameDev');

  const sectionHeading = (track: SummerCampProgramTrack | 'unknown') => {
    switch (track) {
      case 'aiGameDev':
        return t('filter.trackAiGameDev');
      case 'creativeWriting':
        return t('filter.trackCreativeWriting');
      default:
        return t('filter.trackOther');
    }
  };

  const renderCardListItem = (
    program: Program,
    layout: 'mobile' | 'desktop',
    idx: number,
    groupLength: number,
  ) => {
    const isSelected = selectedProgramId === program.id;
    const hasOddCount = groupLength % 2 !== 0;
    const isLastAndAlone = layout === 'desktop' && hasOddCount && idx === groupLength - 1;
    const seo = getSummerCampProgramSeoLink(program.id);

    const imageSizes =
      layout === 'mobile'
        ? '(max-width:768px) 96vw, 100vw'
        : '(min-width: 1024px) 24vw, (min-width: 769px) 42vw, 100vw';

    const imageWrapperClassName =
      layout === 'mobile'
        ? 'aspect-[650/270]'
        : isLastAndAlone
          ? 'h-[120px]'
          : 'aspect-[650/270]';

    return (
      <li
        key={program.id}
        className={`[content-visibility:auto] [contain-intrinsic-size:auto_420px] flex flex-col gap-2 ${isLastAndAlone ? 'col-span-2' : ''}`}
      >
        <SummerCampProgramPickCard
          program={program}
          isSelected={isSelected}
          onSelect={onSelectProgram}
          imageSizes={imageSizes}
          imageWrapperClassName={imageWrapperClassName}
        />
        {seo ? (
          <Link
            href={createLocaleUrl(`/camps/${seo.slug}`, locale)}
            className="-mt-0.5 rounded-sm px-0.5 text-[12px] font-semibold text-[#1F396D] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
          >
            {t(summerCampSeoMessagePath(seo.labelKey))}
          </Link>
        ) : null}
      </li>
    );
  };

  return (
    <div className="space-y-8" role="group" aria-label={t('page.title')}>
      <div className="min-[769px]:hidden space-y-8">
        {groups.map((group) => (
          <Fragment key={group.track}>
            <section className="space-y-3">
              <h3 className="font-heading text-base font-black uppercase tracking-tight text-slate-800">
                {sectionHeading(group.track)}
              </h3>
              <ul
                className="m-0 grid list-none grid-cols-1 gap-3 p-0"
                aria-label={sectionHeading(group.track)}
              >
                {group.programs.map((program, idx) =>
                  renderCardListItem(program, 'mobile', idx, group.programs.length),
                )}
              </ul>
            </section>
            {group.track === 'aiGameDev' && showAcademicTeaser ? (
              <>
                <HighSchoolSummerIntensiveTeaserBand locale={locale} />
                <AcademicSummerProgramsTeaserBand locale={locale} />
              </>
            ) : null}
          </Fragment>
        ))}
        <p className="text-center">
          <a href="#lead-capture" className="text-[13px] font-medium text-[#065f46]">
            {t('mobile.summercampLink')}
          </a>
        </p>
      </div>

      <div className="hidden min-[769px]:block space-y-8">
        {groups.map((group) => (
          <Fragment key={`d-${group.track}`}>
            <section className="space-y-3">
              <h3 className="font-heading text-base font-black uppercase tracking-tight text-slate-800">
                {sectionHeading(group.track)}
              </h3>
              <ul
                className="m-0 grid list-none grid-cols-2 gap-3 p-0"
                aria-label={sectionHeading(group.track)}
              >
                {group.programs.map((program, idx) =>
                  renderCardListItem(program, 'desktop', idx, group.programs.length),
                )}
              </ul>
            </section>
            {group.track === 'aiGameDev' && showAcademicTeaser ? (
              <>
                <HighSchoolSummerIntensiveTeaserBand locale={locale} />
                <AcademicSummerProgramsTeaserBand locale={locale} />
              </>
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="max-[768px]:hidden">
        <SummerCampParentsKnowStrip />
      </div>
    </div>
  );
});
