'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionContainer } from '@/components/camps/SectionContainer';
import { ImGetReadyComparisonTable } from '@/components/camps/im-get-ready/ImGetReadyComparisonTable';
import { ImGetReadyIm1DetailSection } from '@/components/camps/im-get-ready/ImGetReadyIm1DetailSection';
import { ImGetReadyIm2DetailSection } from '@/components/camps/im-get-ready/ImGetReadyIm2DetailSection';
import { ImGetReadyLandingNav } from '@/components/camps/im-get-ready/ImGetReadyLandingNav';
import { ImGetReadyTimelineSection } from '@/components/camps/im-get-ready/ImGetReadyTimelineSection';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import '@/components/camps/academic-summer-programs-page.global.css';
import { ACADEMIC_SEO_HUB_PATH } from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { ACADEMIC_TRACK_BANNER_SRC } from '@/lib/academic-summer-programs-hub-data';
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion';
import {
  getImGetReadySeoLandingCopy,
  type ImGetReadyProgramCardCopy,
} from '@/lib/im-get-ready-seo-landing-copy';

type ImGetReadySeoLandingPageProps = {
  locale: string;
};

function hubReserveHref(locale: string, trackId: 'im1' | 'im2'): string {
  const query = ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath;
  return createLocaleUrl(
    `${ACADEMIC_SEO_HUB_PATH}?filter=${query}#track-${trackId}`,
    locale,
  );
}

function ImGetReadyProgramCard({
  card,
  locale,
  imageSrc,
}: {
  card: ImGetReadyProgramCardCopy;
  locale: string;
  imageSrc: string;
}) {
  const hasExpandedHeader = card.headline !== undefined && card.subheadline !== undefined;

  return (
    <article
      id={card.id}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative aspect-[650/270] w-full shrink-0 overflow-hidden bg-slate-200">
        <Image
          src={imageSrc}
          alt={`${card.title}: ${card.headline ?? card.tagline ?? card.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          decoding="async"
          className="object-cover"
          draggable={false}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-[#1F396D] md:text-xl">
          {card.title}
        </h2>
        <span className="mt-2 inline-flex w-fit rounded-full border border-[#1F396D]/20 bg-[#1F396D]/5 px-2.5 py-1 text-xs font-semibold text-[#1F396D]">
          {card.gradeBadge}
        </span>
        {hasExpandedHeader ? (
          <>
            <h3 className="mt-3 text-base font-semibold leading-relaxed text-slate-900 md:text-lg">
              {card.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.subheadline}</p>
            {card.positioningLines !== undefined && card.positioningLines.length > 0 ? (
              <ul className="mt-4 space-y-2" role="list">
                {card.positioningLines.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm font-medium leading-snug text-slate-700"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F16112]" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">{card.tagline}</p>
        )}
        <p className="mt-4 rounded-md bg-[#1F396D]/8 px-2.5 py-1.5 text-xs font-bold leading-snug text-[#1F396D]">
          {card.scheduleLine}
        </p>
        {!hasExpandedHeader && card.bestFor !== undefined && card.bestFor.length > 0 ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">
              {card.bestForLabel}
            </p>
            <ul className="mt-2 space-y-1.5" role="list">
              {card.bestFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm font-medium leading-snug text-slate-800"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {!hasExpandedHeader && card.workOn !== undefined && card.workOn.length > 0 ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">
              {card.workOnLabel}
            </p>
            <ul className="mt-2 space-y-1.5" role="list">
              {card.workOn.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm font-medium leading-snug text-slate-800"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <ul className="mt-4 space-y-1 text-sm text-slate-700" role="list">
          <li>{card.programLength}</li>
          <li className="font-semibold text-[#1F396D]">{card.priceLabel}</li>
          <li>{card.seatsLabel}</li>
        </ul>
        <Link
          href={hubReserveHref(locale, card.hubTrackId)}
          className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#F16112] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2"
        >
          {card.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2" role="list">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ImGetReadySeoLandingPage({ locale }: ImGetReadySeoLandingPageProps) {
  const copy = getImGetReadySeoLandingCopy();
  const hubCtaHref = createLocaleUrl(
    `${ACADEMIC_SEO_HUB_PATH}?filter=${ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath}`,
    locale,
  );
  const contactHref = createLocaleUrl('/contact', locale);
  const defaultOpenFaqs = getDefaultOpenFaqValues(copy.faq.length, (idx) => `faq-${idx}`);

  return (
    <div
      data-academic-seo-landing
      className="min-h-screen bg-background font-sans selection:bg-[#1F396D]/20 selection:text-[#1F396D]"
    >
      <ImGetReadyLandingNav
        locale={locale}
        brandLabel={copy.topNav.brandLabel}
        items={copy.topNav.items}
        ctaLabel={copy.topNav.ctaLabel}
        reserveHref={hubCtaHref}
      />

      <main>
        <section
          className="relative isolate w-full min-h-[min(48svh,17rem)] max-h-[700px] overflow-hidden bg-[#1F396D] md:min-h-[min(40vh,22rem)]"
          aria-label="Program hero"
        >
          <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col justify-center px-5 py-8 sm:px-8 md:px-12 md:py-14 lg:px-16 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-200 md:text-sm">
              {copy.hero.eyebrow}
            </p>
            <h1 className="font-heading mt-2 max-w-[700px] text-[1.5rem] font-bold leading-[1.15] text-white sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.625rem]">
              {copy.hero.h1}
            </h1>
            <p className="mt-3 max-w-[650px] text-base leading-snug text-zinc-100 md:text-lg">
              {copy.hero.subheadline}
            </p>
            <p className="mt-4 max-w-[650px] text-sm leading-relaxed text-zinc-200 md:text-base">
              {copy.hero.supportingText}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={hubCtaHref}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto sm:text-base"
              >
                {copy.hero.primaryCta}
              </Link>
              <a
                href="#course-cards"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F396D] sm:w-auto sm:text-base"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>
            <p className="mt-6 max-w-[650px] text-xs font-medium text-zinc-300 md:text-sm">
              {copy.hero.trustBar}
            </p>
          </div>
        </section>

        <SectionContainer id="course-cards" className="scroll-mt-28 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
              {copy.courseCardsSection.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              {copy.courseCardsSection.intro}
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <ImGetReadyProgramCard
                card={copy.programCards.im1}
                locale={locale}
                imageSrc={ACADEMIC_TRACK_BANNER_SRC.im1}
              />
              <ImGetReadyProgramCard
                card={copy.programCards.im2}
                locale={locale}
                imageSrc={ACADEMIC_TRACK_BANNER_SRC.im2}
              />
            </div>
          </div>
        </SectionContainer>

        <ImGetReadyIm1DetailSection locale={locale} detail={copy.im1Detail} />

        <ImGetReadyIm2DetailSection locale={locale} detail={copy.im2Detail} />

        <ImGetReadyTimelineSection howItWorks={copy.howItWorks} />

        <SectionContainer className="bg-slate-50/80">
          <div className="mx-auto max-w-[720px]">
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
              {copy.whatStudentsReceive.title}
            </h2>
            <BulletList items={copy.whatStudentsReceive.items} />
          </div>
        </SectionContainer>

        <SectionContainer id="regular-tutoring" className="scroll-mt-28 bg-white">
          <div className="mx-auto max-w-[720px]">
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
              {copy.regularTutoring.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {copy.regularTutoring.copy}
            </p>
            <h3 className="mt-6 font-heading text-lg font-bold text-slate-900">
              {copy.regularTutoring.subheading}
            </h3>
            <BulletList items={copy.regularTutoring.items} />
          </div>
        </SectionContainer>

        <SectionContainer className="bg-slate-50/80">
          <div className="mx-auto max-w-[720px]">
            <article className="rounded-2xl border border-[#1F396D]/15 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
                {copy.thankYouBenefit.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                {copy.thankYouBenefit.copy}
              </p>
              <p className="mt-4 text-sm font-medium text-slate-600">
                {copy.thankYouBenefit.importantNote}
              </p>
              <Link
                href={contactHref}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-[#1F396D] bg-white px-6 py-3 text-sm font-semibold text-[#1F396D] transition-colors hover:bg-[#1F396D]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
              >
                {copy.thankYouBenefit.ctaLabel}
              </Link>
            </article>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-white">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
              {copy.comparison.title}
            </h2>
            <ImGetReadyComparisonTable comparison={copy.comparison} />
          </div>
        </SectionContainer>

        <SectionContainer id="faq" className="scroll-mt-28 border-t border-slate-100 bg-slate-50/60">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-2xl font-bold text-slate-900 md:text-3xl">
              Frequently Asked <span className="text-[#F16112]">Questions</span>
            </h2>
            <div className="mt-10 space-y-3">
              <Accordion type="multiple" className="w-full" defaultValue={defaultOpenFaqs}>
                {copy.faq.map((item, idx) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${idx}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white px-4 shadow-sm"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-slate-900 hover:no-underline md:text-base">
                      <span className="flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-slate-600 md:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-[#1F396D]">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
              {copy.finalCta.headline}
            </h2>
            <p className="mt-3 text-sm text-zinc-200 md:text-base">{copy.finalCta.subheadline}</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={hubCtaHref}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto sm:text-base"
              >
                {copy.finalCta.primaryCta}
              </Link>
              <Link
                href={contactHref}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F396D] sm:w-auto sm:text-base"
              >
                {copy.finalCta.secondaryCta}
              </Link>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-zinc-300 md:text-sm">
              {copy.footerMicrocopy}
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-white pb-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-lg font-bold text-[#1F396D] sm:text-xl">
              {copy.internalLinks.heading}
            </h2>
            <ul className="mt-4 space-y-2">
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
          </div>
        </SectionContainer>
      </main>
    </div>
  );
}
