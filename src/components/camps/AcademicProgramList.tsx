'use client';

import { memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import type { Program } from '@/lib/summer-camp-data';
import pageCopy from '@/i18n/messages/academic-summer-programs-en.json';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import {
  getAcademicGetReadyPickCardMeta,
  getAcademicSprintPickCardMeta,
  isAcademicGetReadyProgram,
  isAcademicSummerSprintProgram,
  type AcademicGetReadyTrackId,
  type AcademicSummerSprintTrackId,
} from '@/lib/academic-summer-programs-hub-data';
import {
  getAcademicProgramSeoLink,
  type AcademicProgramSeoSlugKey,
} from '@/lib/academic-summer-seo-links';
import {
  groupAcademicProgramsByWindow,
  type AcademicProgramGroup,
} from '@/lib/academic-summer-program-groups';

const COPY = pageCopy.programs;

function academicSeoLinkLabel(labelKey: AcademicProgramSeoSlugKey): string | undefined {
  return COPY.seoLinks[labelKey as keyof typeof COPY.seoLinks];
}

const CARD_BUTTON_CLASS = (isSelected: boolean) =>
  `group flex w-full flex-col overflow-hidden rounded-xl border-2 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2 ${
    isSelected
      ? 'border-[#1F396D] shadow-lg'
      : 'border-slate-200 active:border-slate-300 min-[769px]:hover:border-slate-300'
  }`;

const TITLE_CLASS = (isSelected: boolean) =>
  `line-clamp-2 font-black text-sm uppercase leading-snug tracking-tight ${
    isSelected ? 'text-[#1F396D]' : 'text-slate-900'
  }`;

function ActiveIndicator() {
  return (
    <div
      aria-live="polite"
      className="mt-2 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#1F396D]"
    >
      {COPY.activeLabel} <Check className="h-3 w-3" aria-hidden />
    </div>
  );
}

type EnhancedPickCardMeta = {
  gradeBadge: string;
  scheduleLine: string;
  bestForLabel: string;
  bestFor: readonly string[];
};

function AcademicEnhancedPickCardBody({
  program,
  isSelected,
  cardMeta,
}: {
  program: Program;
  isSelected: boolean;
  cardMeta: EnhancedPickCardMeta;
}) {
  return (
    <div className="flex flex-1 flex-col px-4 py-3">
      <h4 className={TITLE_CLASS(isSelected)}>{program.title}</h4>
      <span className="mt-1.5 inline-flex w-fit rounded-full border border-[#1F396D]/20 bg-[#1F396D]/5 px-2 py-0.5 text-[10px] font-semibold text-[#1F396D]">
        {cardMeta.gradeBadge}
      </span>
      <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-800">{program.outcome}</p>
      <p className="mt-2 rounded-md bg-[#1F396D]/8 px-2.5 py-1.5 text-[11px] font-bold leading-snug text-[#1F396D]">
        {cardMeta.scheduleLine}
      </p>
      <div className="mt-2.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">
          {cardMeta.bestForLabel}
        </p>
        <ul className="mt-1.5 space-y-1.5" role="list">
          {cardMeta.bestFor.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs font-medium leading-snug text-slate-800">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {isSelected ? <ActiveIndicator /> : null}
    </div>
  );
}

const AcademicProgramPickCard = memo(function AcademicProgramPickCard({
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
  const handleClick = useCallback(() => {
    void import('@/lib/meta-pixel').then(({ trackCampView }) =>
      trackCampView(program.title, program.category),
    );
    onSelect(program);
  }, [onSelect, program]);

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={program.title}
      onClick={handleClick}
      className={CARD_BUTTON_CLASS(isSelected)}
    >
      <div className={`relative w-full shrink-0 overflow-hidden bg-slate-200 ${imageWrapperClassName}`}>
        <Image
          src={program.image}
          alt={`${program.title}: ${program.description}`}
          fill
          sizes={imageSizes}
          quality={70}
          decoding="async"
          className="object-cover"
          draggable={false}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3">
        <h4 className={TITLE_CLASS(isSelected)}>{program.title}</h4>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{program.outcome}</p>
        {isSelected ? <ActiveIndicator /> : null}
      </div>
    </button>
  );
});

const AcademicSprintPickCard = memo(function AcademicSprintPickCard({
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
  const cardMeta = getAcademicSprintPickCardMeta(program.id as AcademicSummerSprintTrackId);

  const handleClick = useCallback(() => {
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
      aria-label={program.title}
      onClick={handleClick}
      className={CARD_BUTTON_CLASS(isSelected)}
    >
      <div className={`relative w-full shrink-0 overflow-hidden bg-slate-200 ${imageWrapperClassName}`}>
        <Image
          src={program.image}
          alt={`${program.title}: ${program.description}`}
          fill
          sizes={imageSizes}
          quality={70}
          decoding="async"
          className="object-cover"
          draggable={false}
        />
      </div>

      <AcademicEnhancedPickCardBody program={program} isSelected={isSelected} cardMeta={cardMeta} />
    </button>
  );
});

const AcademicGetReadyPickCard = memo(function AcademicGetReadyPickCard({
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
  const cardMeta = getAcademicGetReadyPickCardMeta(program.id as AcademicGetReadyTrackId);

  const handleClick = useCallback(() => {
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
      aria-label={program.title}
      onClick={handleClick}
      className={CARD_BUTTON_CLASS(isSelected)}
    >
      <div className={`relative w-full shrink-0 overflow-hidden bg-slate-200 ${imageWrapperClassName}`}>
        <Image
          src={program.image}
          alt={`${program.title}: ${program.description}`}
          fill
          sizes={imageSizes}
          quality={70}
          decoding="async"
          className="object-cover"
          draggable={false}
        />
      </div>

      <AcademicEnhancedPickCardBody program={program} isSelected={isSelected} cardMeta={cardMeta} />
    </button>
  );
});

function renderProgramGrid(
  programs: Program[],
  selectedProgramId: string | null,
  onSelectProgram: (program: Program) => void,
  locale: string,
) {
  return programs.map((program, idx) => {
    const isSelected = selectedProgramId === program.id;
    const isSprint = isAcademicSummerSprintProgram(program.id);
    const isGetReady = isAcademicGetReadyProgram(program.id);
    const isEnhancedCard = isSprint || isGetReady;
    const hasOddCount = programs.length % 2 !== 0;
    const isLastAndAlone = hasOddCount && idx === programs.length - 1;
    const seo = getAcademicProgramSeoLink(program.id);
    const seoLabel = seo ? academicSeoLinkLabel(seo.labelKey) : undefined;

    const imageSizes = '(max-width:768px) 96vw, (min-width: 1024px) 24vw, (min-width: 769px) 42vw, 100vw';

    const imageWrapperClassName = isEnhancedCard
      ? isLastAndAlone
        ? 'aspect-[650/270] min-[769px]:aspect-auto min-[769px]:h-[120px]'
        : 'aspect-[650/270]'
      : isLastAndAlone
        ? 'aspect-[650/450] min-[769px]:aspect-auto min-[769px]:h-[200px]'
        : 'aspect-[650/450]';

    const CardComponent = isSprint
      ? AcademicSprintPickCard
      : isGetReady
        ? AcademicGetReadyPickCard
        : AcademicProgramPickCard;

    return (
      <li
        key={program.id}
        id={`track-${program.id}`}
        className={`flex flex-col gap-2 scroll-mt-28 [content-visibility:visible] min-[769px]:[content-visibility:auto] ${
          isEnhancedCard
            ? 'min-[769px]:[contain-intrinsic-size:auto_420px]'
            : 'min-[769px]:[contain-intrinsic-size:auto_300px]'
        } ${isLastAndAlone ? 'min-[769px]:col-span-2' : ''}`}
      >
        <CardComponent
          program={program}
          isSelected={isSelected}
          onSelect={onSelectProgram}
          imageSizes={imageSizes}
          imageWrapperClassName={imageWrapperClassName}
        />
        {seo && seoLabel ? (
          <Link
            href={createLocaleUrl(`/camps/${seo.slug}`, locale)}
            className="-mt-0.5 rounded-sm px-0.5 text-[12px] font-semibold text-[#1F396D] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
          >
            {seoLabel}
          </Link>
        ) : null}
      </li>
    );
  });
}

export const AcademicProgramList = memo(function AcademicProgramList({
  programs = [],
  onSelectProgram,
  selectedProgramId,
  onInquire,
}: {
  programs?: Program[] | null;
  onSelectProgram: (program: Program) => void;
  selectedProgramId: string | null;
  onInquire?: () => void;
}) {
  const locale = useLocale();
  const groups = useMemo(() => groupAcademicProgramsByWindow(programs ?? []), [programs]);

  const sectionHeading = (group: AcademicProgramGroup) => COPY.groups[group].heading;

  return (
    <div className="space-y-8" role="group" aria-label={COPY.ariaLabel}>
      <div className="space-y-8">
        {groups.map((groupEntry) => (
          <section key={groupEntry.group} className="space-y-3">
            <h3 className="font-heading text-base font-black uppercase tracking-tight text-slate-800">
              {sectionHeading(groupEntry.group)}
            </h3>
            <p className="text-xs text-slate-500">{COPY.groups[groupEntry.group].subtext}</p>
            <ul
              className="m-0 grid list-none grid-cols-1 gap-3 p-0 min-[769px]:grid-cols-2"
              aria-label={sectionHeading(groupEntry.group)}
            >
              {renderProgramGrid(groupEntry.programs, selectedProgramId, onSelectProgram, locale)}
            </ul>
          </section>
        ))}
        {onInquire ? (
          <p className="text-center min-[769px]:hidden">
            <button
              type="button"
              onClick={onInquire}
              className="text-[13px] font-medium text-[#065f46] underline-offset-2 hover:underline"
            >
              {COPY.inquireLink}
            </button>
          </p>
        ) : null}
      </div>
    </div>
  );
});
