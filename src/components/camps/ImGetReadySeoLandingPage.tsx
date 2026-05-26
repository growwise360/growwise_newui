'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImGetReadyComparisonTable } from '@/components/camps/im-get-ready/ImGetReadyComparisonTable';
import { ImGetReadySectionContainer } from '@/components/camps/im-get-ready/ImGetReadySectionContainer';
import { ImGetReadyThankYouBenefitBanner } from '@/components/camps/im-get-ready/ImGetReadyThankYouBenefitBanner';
import { ImGetReadyLandingNav } from '@/components/camps/im-get-ready/ImGetReadyLandingNav';
import { AcademicSeoParentGuidesBlock } from '@/components/camps/AcademicSeoParentGuidesBlock';
import {
  IM_GET_READY_GRID_GAP,
  IM_GET_READY_HEADING,
  IM_GET_READY_HERO,
  IM_GET_READY_SCROLL_MT,
  IM_GET_READY_SECTION_STACK,
} from '@/components/camps/im-get-ready/im-get-ready-layout';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import '@/components/camps/academic-summer-programs-page.global.css';
import { ACADEMIC_SEO_HUB_PATH } from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { ACADEMIC_TRACK_BANNER_SRC } from '@/lib/academic-summer-programs-hub-data';
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion';
import { getImGetReadySeoLandingCopy } from '@/lib/im-get-ready-seo-landing-copy';
import { getParentGuidesForLandingPage } from '@/lib/academic-seo-parent-guides';
import { cn } from '@/lib/utils';

type ImGetReadySeoLandingPageProps = {
  locale: string;
};

const TRACK_PAGES = {
  im1: '/camps/summer-im1-get-ready-dublin-ca',
  im2: '/camps/summer-im2-get-ready-dublin-ca',
} as const;

function hubReserveHref(locale: string, trackId: 'im1' | 'im2'): string {
  const query = ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath;
  return createLocaleUrl(`${ACADEMIC_SEO_HUB_PATH}?filter=${query}#track-${trackId}`, locale);
}

export function ImGetReadySeoLandingPage({ locale }: ImGetReadySeoLandingPageProps) {
  const copy = getImGetReadySeoLandingCopy();
  const hubCtaHref = createLocaleUrl(
    `${ACADEMIC_SEO_HUB_PATH}?filter=${ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath}`,
    locale,
  );
  const contactHref = createLocaleUrl('/contact', locale);
  const defaultOpenFaqs = getDefaultOpenFaqValues(copy.faq.length, (idx) => `faq-${idx}`);
  const parentGuides = getParentGuidesForLandingPage('imGetReady');

  const overviewNav = {
    ...copy.topNav,
    items: [
      { label: 'IM1 Get Ready', href: TRACK_PAGES.im1, type: 'route' as const },
      { label: 'IM2 Get Ready', href: TRACK_PAGES.im2, type: 'route' as const },
      { label: 'FAQ', href: '#faq', type: 'anchor' as const },
    ],
  };

  return (
    <div
      data-academic-seo-landing
      data-im-get-ready-landing
      className="min-h-screen bg-background font-sans selection:bg-[#1F396D]/20 selection:text-[#1F396D]"
    >
      <ImGetReadyLandingNav
        locale={locale}
        brandLabel={overviewNav.brandLabel}
        items={overviewNav.items}
        ctaLabel={overviewNav.ctaLabel}
        reserveHref={hubCtaHref}
      />

      <main>
        <section
          className="relative isolate w-full overflow-hidden bg-[#1F396D]"
          aria-label="Program hero"
        >
          <div
            className={cn(
              'relative z-10 mx-auto flex w-full max-w-[1100px] flex-col justify-center',
              IM_GET_READY_HERO,
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-200 sm:text-xs md:text-sm">
              {copy.hero.eyebrow}
            </p>
            <h1 className="font-heading mt-1.5 max-w-[760px] text-[1.375rem] font-bold leading-[1.15] text-white sm:mt-2 sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.625rem]">
              IM1 &amp; IM2 Get Ready Summer Cohorts — DUSD &amp; PUSD, Dublin CA
            </h1>
            <p className="mt-2 max-w-[700px] text-sm leading-snug text-zinc-100 sm:mt-3 sm:text-base md:text-lg">
              {copy.hero.subheadline}
            </p>
            <p className="mt-2 max-w-[700px] text-sm leading-relaxed text-zinc-200 sm:mt-3">
              {copy.hero.supportingText}
            </p>
            <p className="mt-3 max-w-[700px] text-[11px] font-medium text-zinc-300 sm:mt-4 sm:text-xs md:text-sm">
              {copy.hero.trustBar}
            </p>
          </div>
        </section>

        <ImGetReadySectionContainer
          id="course-cards"
          className={cn('bg-white', IM_GET_READY_SCROLL_MT)}
        >
          <div className="mx-auto max-w-[1100px]">
            <h2 className={IM_GET_READY_HEADING}>{copy.courseCardsSection.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700 sm:mt-3">
              {copy.courseCardsSection.intro}
            </p>
            <div className={cn('grid md:grid-cols-2', IM_GET_READY_GRID_GAP)}>
              {(['im1', 'im2'] as const).map((trackId) => {
                const card = copy.programCards[trackId];
                const pageHref = createLocaleUrl(TRACK_PAGES[trackId], locale);
                return (
                  <article
                    key={trackId}
                    id={card.id}
                    className={cn(
                      'flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl',
                      IM_GET_READY_SCROLL_MT,
                    )}
                  >
                    <div className="relative aspect-[650/270] w-full shrink-0 overflow-hidden bg-slate-200">
                      <Image
                        src={ACADEMIC_TRACK_BANNER_SRC[trackId]}
                        alt={`${card.title}: ${card.headline ?? card.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={70}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                      <h3 className="font-heading text-base font-bold uppercase tracking-tight text-[#1F396D] sm:text-lg md:text-xl">
                        {card.title}
                      </h3>
                      <span className="mt-1.5 inline-flex w-fit rounded-full border border-[#1F396D]/20 bg-[#1F396D]/5 px-2 py-0.5 text-[11px] font-semibold text-[#1F396D] sm:mt-2 sm:px-2.5 sm:py-1 sm:text-xs">
                        {trackId === 'im1' ? 'Entering Integrated Math 1' : card.gradeBadge}
                      </span>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-900">
                        {card.headline}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{card.subheadline}</p>
                      <p className="mt-2 rounded-md bg-[#1F396D]/8 px-2 py-1 text-[11px] font-bold text-[#1F396D] sm:mt-3 sm:px-2.5 sm:py-1.5 sm:text-xs">
                        {card.scheduleLine}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#1F396D] sm:mt-3">{card.priceLabel}</p>
                      <div className="mt-4 flex flex-col gap-2 sm:mt-5">
                        <Link
                          href={pageHref}
                          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1F396D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#183056]"
                        >
                          View {trackId === 'im1' ? 'IM1' : 'IM2'} Program Details
                        </Link>
                        <Link
                          href={hubReserveHref(locale, trackId)}
                          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-[#F16112] bg-white px-4 py-2.5 text-sm font-semibold text-[#F16112] hover:bg-[#F16112]/5"
                        >
                          {card.ctaLabel}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </ImGetReadySectionContainer>

        <ImGetReadyThankYouBenefitBanner
          title={copy.thankYouBenefit.title}
          copy={copy.thankYouBenefit.copy}
          note={copy.thankYouBenefit.importantNote}
          ctaHref={contactHref}
          ctaLabel={copy.thankYouBenefit.ctaLabel}
        />

        <ImGetReadySectionContainer className={cn('bg-slate-50/80', IM_GET_READY_SECTION_STACK)}>
          <div className="mx-auto max-w-[1100px]">
            <h2 className={IM_GET_READY_HEADING}>{copy.comparison.title}</h2>
            <div className="mt-4 sm:mt-5">
              <ImGetReadyComparisonTable comparison={copy.comparison} />
            </div>
          </div>
        </ImGetReadySectionContainer>

        <ImGetReadySectionContainer className={cn('border-t border-slate-100 bg-slate-50/60', IM_GET_READY_SECTION_STACK)}>
          <AcademicSeoParentGuidesBlock
            locale={locale}
            guides={parentGuides}
            className="mx-auto max-w-3xl"
          />
        </ImGetReadySectionContainer>

        <ImGetReadySectionContainer
          id="faq"
          className={cn('border-t border-slate-100 bg-white', IM_GET_READY_SCROLL_MT, IM_GET_READY_SECTION_STACK)}
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
              Frequently Asked <span className="text-[#F16112]">Questions</span>
            </h2>
            <div className="mt-5 space-y-2 sm:mt-6 sm:space-y-3">
              <Accordion type="multiple" className="w-full" defaultValue={defaultOpenFaqs}>
                {copy.faq.map((item, idx) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${idx}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white px-3 shadow-sm sm:px-4"
                  >
                    <AccordionTrigger className="py-3 text-left text-sm font-semibold text-slate-900 hover:no-underline sm:py-4 md:text-base">
                      <span className="flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-sm leading-relaxed text-slate-600 sm:pb-4 md:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ImGetReadySectionContainer>

        <ImGetReadySectionContainer className={cn('bg-[#1F396D]', IM_GET_READY_SECTION_STACK)}>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl md:text-3xl">
              {copy.finalCta.headline}
            </h2>
            <p className="mt-2 text-sm text-zinc-200 sm:mt-3 md:text-base">{copy.finalCta.subheadline}</p>
            <div className="mt-4 flex flex-col items-center gap-2.5 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3">
              <Link
                href={hubCtaHref}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:w-auto"
              >
                {copy.finalCta.primaryCta}
              </Link>
              <Link
                href={contactHref}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                {copy.finalCta.secondaryCta}
              </Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-300 sm:mt-5 md:text-sm">
              {copy.footerMicrocopy}
            </p>
          </div>
        </ImGetReadySectionContainer>
      </main>
    </div>
  );
}
