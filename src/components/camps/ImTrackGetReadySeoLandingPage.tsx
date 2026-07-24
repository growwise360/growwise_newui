'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ImGetReadyDetailSection } from '@/components/camps/im-get-ready/ImGetReadyDetailSection';
import { ImGetReadyComparisonTable } from '@/components/camps/im-get-ready/ImGetReadyComparisonTable';
import { ImGetReadySectionContainer } from '@/components/camps/im-get-ready/ImGetReadySectionContainer';
import { ImGetReadyThankYouBenefitBanner } from '@/components/camps/im-get-ready/ImGetReadyThankYouBenefitBanner';
import { ImGetReadyLandingNav } from '@/components/camps/im-get-ready/ImGetReadyLandingNav';
import { AcademicSeoParentGuidesBlock } from '@/components/camps/AcademicSeoParentGuidesBlock';
import {
  IM_GET_READY_GRID_GAP,
  IM_GET_READY_HEADING,
  IM_GET_READY_HERO,
  IM_GET_READY_BLOCK_STACK,
  IM_GET_READY_SECTION_STACK,
} from '@/components/camps/im-get-ready/im-get-ready-layout';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import '@/components/camps/academic-summer-programs-page.global.css';
import { ACADEMIC_SEO_HUB_PATH } from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { ACADEMIC_TRACK_BANNER_SRC } from '@/lib/academic-summer-programs-hub-data';
import type { ImTrackGetReadySeoLandingCopy } from '@/lib/im-get-ready-seo-landing-copy';
import { getParentGuidesForLandingPage } from '@/lib/academic-seo-parent-guides';
import { cn } from '@/lib/utils';

type ImTrackGetReadySeoLandingPageProps = {
  locale: string;
  copy: ImTrackGetReadySeoLandingCopy;
};

function hubReserveHref(locale: string, trackId: 'im1' | 'im2'): string {
  const query = ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath;
  return createLocaleUrl(`${ACADEMIC_SEO_HUB_PATH}?filter=${query}#track-${trackId}`, locale);
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2" role="list">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ImTrackGetReadySeoLandingPage({ locale, copy }: ImTrackGetReadySeoLandingPageProps) {
  const reserveHref = hubReserveHref(locale, copy.trackId);
  const contactHref = createLocaleUrl('/contact', locale);
  const siblingHref = createLocaleUrl(copy.siblingPage.href, locale);
  const bannerSrc = ACADEMIC_TRACK_BANNER_SRC[copy.trackId];
  const parentGuides = getParentGuidesForLandingPage(
    copy.trackId === 'im1' ? 'im1GetReady' : 'im2GetReady',
  );

  return (
    <div
      data-academic-seo-landing
      data-im-get-ready-landing
      className="min-h-screen overflow-x-clip bg-background font-sans selection:bg-[#1F396D]/20 selection:text-[#1F396D]"
    >
      <ImGetReadyLandingNav
        locale={locale}
        brandLabel={copy.topNav.brandLabel}
        items={copy.topNav.items}
        ctaLabel={copy.topNav.ctaLabel}
        reserveHref={reserveHref}
      />

      <main>
        <section
          className="relative isolate w-full overflow-hidden bg-[#1F396D]"
          aria-label="Program hero"
        >
          <div className="relative aspect-[650/270] w-full max-h-[180px] overflow-hidden opacity-30 sm:max-h-[240px] md:max-h-[300px] md:opacity-40">
            <Image
              src={bannerSrc}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              priority
              className="object-cover"
              aria-hidden
            />
          </div>
          <div
            className={cn(
              'relative z-10 mx-auto flex w-full max-w-[1100px] flex-col',
              IM_GET_READY_HERO,
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-200 sm:text-xs md:text-sm">
              {copy.hero.eyebrow}
            </p>
            <h1 className="font-heading mt-1.5 max-w-[760px] text-[1.375rem] font-bold leading-[1.15] text-white sm:mt-2 sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem]">
              {copy.hero.h1}
            </h1>
            <p className="mt-2 max-w-[700px] text-sm font-semibold leading-snug text-zinc-100 sm:mt-3 sm:text-base md:text-lg">
              {copy.hero.subheadline}
            </p>
            <p className="mt-2 max-w-[700px] text-sm leading-relaxed text-zinc-200">
              {copy.hero.supportingText}
            </p>
            <span className="mt-3 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white sm:mt-4 sm:px-3 sm:py-1 sm:text-xs">
              {copy.hero.gradeBadge}
            </span>
            <p className="mt-2 inline-flex w-fit rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white sm:mt-3 sm:px-3 sm:py-1.5 sm:text-xs">
              {copy.hero.scheduleLine}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-200 sm:mt-3 sm:gap-x-4 sm:text-sm" role="list">
              <li>{copy.hero.programLength}</li>
              <li className="font-semibold text-white">{copy.hero.priceLabel}</li>
              <li>{copy.hero.seatsLabel}</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href={reserveHref}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#F16112] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto"
              >
                {copy.hero.primaryCta}
              </Link>
              <Link
                href={contactHref}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F396D] sm:w-auto"
              >
                {copy.hero.secondaryCta}
              </Link>
            </div>
            <p className="mt-3 max-w-[700px] text-[11px] font-medium text-zinc-300 sm:mt-4 sm:text-xs md:text-sm">
              {copy.hero.trustBar}
            </p>
          </div>
        </section>

        <ImGetReadyThankYouBenefitBanner
          title={copy.detail.thankYouBenefit.title}
          copy={copy.detail.thankYouBenefit.copy}
          note={copy.detail.thankYouBenefit.eligibilityNote}
        />

        <ImGetReadySectionContainer className={cn('bg-white', IM_GET_READY_SECTION_STACK)}>
          <div className={cn('mx-auto max-w-[720px]', IM_GET_READY_BLOCK_STACK)}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:rounded-2xl sm:p-5">
              <p className="text-sm text-slate-700">{copy.siblingPage.description}</p>
              <Link
                href={siblingHref}
                className="mt-2 inline-flex text-sm font-semibold text-[#1F396D] underline hover:text-[#F16112]"
              >
                {copy.siblingPage.label}
              </Link>
            </div>
            <div>
              <h2 className={IM_GET_READY_HEADING}>{copy.whatStudentsReceive.title}</h2>
              <BulletList items={copy.whatStudentsReceive.items} />
            </div>
          </div>
        </ImGetReadySectionContainer>

        <ImGetReadySectionContainer className={cn('bg-slate-50/80 pb-0', IM_GET_READY_SECTION_STACK)}>
          <div className="mx-auto max-w-[1100px]">
            <h2 className={IM_GET_READY_HEADING}>{copy.comparison.title}</h2>
            <div className="mt-3 sm:mt-4">
              <ImGetReadyComparisonTable comparison={copy.comparison} />
            </div>
          </div>
        </ImGetReadySectionContainer>

        <ImGetReadyDetailSection locale={locale} trackId={copy.trackId} detail={copy.detail} />

        <ImGetReadySectionContainer className={cn('bg-white pb-6 sm:pb-8', IM_GET_READY_SECTION_STACK)}>
          <div className="mx-auto max-w-3xl">
            <AcademicSeoParentGuidesBlock locale={locale} guides={parentGuides} className="mb-6" />
            <h2 className="font-heading text-base font-bold text-[#1F396D] sm:text-lg md:text-xl">
              {copy.internalLinks.heading}
            </h2>
            <ul className="mt-3 space-y-1.5">
              {copy.internalLinks.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={createLocaleUrl(item.href, locale)}
                    className="text-sm font-semibold text-[#1F396D] underline hover:text-[#F16112]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500 sm:mt-5 md:text-sm">
              {copy.footerMicrocopy}
            </p>
          </div>
        </ImGetReadySectionContainer>
      </main>
    </div>
  );
}
