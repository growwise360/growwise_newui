import Image from 'next/image';
import Link from 'next/link';
import copy from '@/i18n/messages/academic-summer-programs-en.json';
import { cn } from '@/lib/utils';

export const ACADEMIC_SUMMER_BANNER_SRC = '/assets/camps/acabanner.webp' as const;

const HERO = copy.hero;

type AcademicProgramsHeroProps = {
  onInquireClick: () => void;
};

export function AcademicProgramsHero({ onInquireClick }: AcademicProgramsHeroProps) {
  return (
    <section
      className="relative isolate w-full min-h-[min(48svh,17rem)] max-h-[600px] overflow-hidden md:min-h-[min(40vh,22rem)]"
      aria-label="Academic summer programs hero"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={ACADEMIC_SUMMER_BANNER_SRC}
          alt={HERO.bannerAlt}
          fill
          priority
          fetchPriority="high"
          decoding="async"
          quality={70}
          sizes="(max-width: 768px) 100vw, min(1100px, 85vw)"
          className="object-cover object-center select-none"
          draggable={false}
        />
        <div className="absolute inset-0 z-[1] bg-[rgba(0,0,0,0.6)]" aria-hidden />
      </div>
      <div
        className={cn(
          'relative z-10 mx-auto flex w-full max-w-[1100px] flex-col justify-center text-left',
          'px-5 py-8 sm:px-8 md:px-12 md:py-14 lg:px-16 lg:py-16',
        )}
      >
        <h1 className="font-heading max-w-[700px] text-[1.5rem] font-bold leading-[1.15] text-white sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.625rem]">
          {HERO.h1}
        </h1>
        <p className="mt-2 max-w-[650px] text-base leading-snug text-zinc-100 sm:mt-2.5 md:text-lg md:leading-snug">
          {HERO.subhead}
        </p>
        <ul
          className="mt-4 flex max-w-full flex-wrap gap-2 overflow-hidden sm:mt-5 sm:max-w-2xl"
          aria-label="Program highlights"
        >
          {HERO.trustPills.map((pill) => (
            <li
              key={pill}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-zinc-100 ring-1 ring-white/25 backdrop-blur-sm md:text-sm"
            >
              {pill}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex w-full max-w-2xl flex-col gap-2.5 sm:mt-5 sm:flex-row sm:items-stretch sm:gap-3 md:gap-4">
          <Link
            href="#slots-section"
            className="inline-flex min-h-[44px] w-full min-w-0 flex-1 items-center justify-center rounded-lg bg-[#1F396D] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#183056] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2 sm:min-h-[48px] sm:px-6 sm:py-3 sm:text-base"
          >
            {HERO.primaryCta}
          </Link>
          <button
            type="button"
            onClick={onInquireClick}
            className="inline-flex min-h-[44px] w-full min-w-0 flex-1 items-center justify-center rounded-lg border border-white bg-white px-4 py-3 text-center text-xs font-medium leading-snug text-[#F16112] shadow-sm transition-colors hover:bg-[#FFF4ED] hover:text-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:min-h-[48px] sm:text-sm"
          >
            {HERO.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
