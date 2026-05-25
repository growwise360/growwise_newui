'use client';

import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ACADEMIC_SUMMER_BANNER_SRC } from '@/components/camps/AcademicProgramsHero';
import { SectionContainer } from '@/components/camps/SectionContainer';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import '@/components/camps/academic-summer-programs-page.global.css';
import {
  ACADEMIC_SEO_HUB_PATH,
  ACADEMIC_SEO_LANDING_PAGES,
  type AcademicSeoLandingPageId,
} from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { getAcademicSeoLandingCopy, type AcademicSeoBodySections, type AcademicSeoFitGroup } from '@/lib/academic-seo-landing-copy';
import { buildAcademicSeoStaticProgramCard } from '@/lib/academic-seo-landing-program-cards';
import {
  formatAcademicSprintUsd,
  getAcademicSummerProgramsHubData,
} from '@/lib/academic-summer-programs-hub-data';
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type AcademicSeoLandingPageProps = {
  pageId: AcademicSeoLandingPageId;
  locale: string;
};

function hubUrlWithFilter(
  locale: string,
  filter: keyof typeof ACADEMIC_HUB_FILTER_QUERY_VALUES,
): string {
  const query = ACADEMIC_HUB_FILTER_QUERY_VALUES[filter];
  return createLocaleUrl(`${ACADEMIC_SEO_HUB_PATH}?filter=${query}`, locale);
}

function AcademicSeoStaticProgramCard({
  card,
}: {
  card: NonNullable<ReturnType<typeof buildAcademicSeoStaticProgramCard>>;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col p-6">
        <h2 className="font-heading text-lg font-bold text-[#1F396D] md:text-xl">{card.title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{card.tagline}</p>
        <span className="mt-3 inline-flex w-fit rounded-full border border-[#1F396D]/20 bg-[#1F396D]/5 px-2.5 py-1 text-xs font-semibold text-[#1F396D]">
          {card.gradeBadge}
        </span>
        <p className="mt-3 rounded-md bg-[#1F396D]/8 px-2.5 py-1.5 text-xs font-bold leading-snug text-[#1F396D]">
          {card.scheduleLine}
        </p>
        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">
            {card.bestForLabel}
          </p>
          <ul className="mt-2 space-y-1.5" role="list">
            {card.bestFor.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-medium leading-snug text-slate-800">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">Pricing</p>
          <ul className="mt-2 space-y-1" role="list">
            {card.pricingRows.map((row) => (
              <li key={row.label} className="flex items-baseline justify-between gap-3 text-sm text-slate-800">
                <span>{row.label}</span>
                <span className="font-semibold text-[#1F396D]">{row.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function AcademicSeoFitBulletList({ group }: { group: AcademicSeoFitGroup }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-sm font-semibold text-slate-900">{group.label}</p>
      <ul className="mt-2 space-y-1.5" role="list">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm font-medium leading-snug text-slate-800">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F396D]" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AcademicSeoBodySectionsBlock({ sections }: { sections: AcademicSeoBodySections }) {
  return (
    <SectionContainer className="bg-white">
      <div className="mx-auto max-w-[720px] space-y-12">
        <section aria-labelledby="what-your-child-will-work-on">
          <h2
            id="what-your-child-will-work-on"
            className="font-heading text-xl font-bold text-[#1F396D] sm:text-2xl"
          >
            {sections.whatYourChildWillWorkOn.heading}
          </h2>
          <div className="mt-6 space-y-8">
            {sections.whatYourChildWillWorkOn.subsections.map((subsection) => (
              <div key={subsection.h3}>
                <h3 className="font-heading text-base font-semibold text-[#1F396D] sm:text-lg">
                  {subsection.h3}
                </h3>
                <div className="mt-4 space-y-4">
                  {subsection.weeks.map((week) => (
                    <p key={week.title} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      <span className="font-semibold text-slate-900">{week.title}</span> {week.body}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="who-teaches-this-program">
          <h2
            id="who-teaches-this-program"
            className="font-heading text-xl font-bold text-[#1F396D] sm:text-2xl"
          >
            {sections.whoTeaches.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{sections.whoTeaches.body}</p>
        </section>

        <section aria-labelledby="who-this-is-right-for">
          <h2
            id="who-this-is-right-for"
            className="font-heading text-xl font-bold text-[#1F396D] sm:text-2xl"
          >
            {sections.whoIsRightFor.heading}
          </h2>
          <div className="mt-4 space-y-4">
            {sections.whoIsRightFor.groups.map((group) => (
              <AcademicSeoFitBulletList key={group.label} group={group} />
            ))}
            {sections.whoIsRightFor.notRightFor ? (
              <AcademicSeoFitBulletList group={sections.whoIsRightFor.notRightFor} />
            ) : null}
          </div>
        </section>

        <section aria-labelledby="why-growwise">
          <h2 id="why-growwise" className="font-heading text-xl font-bold text-[#1F396D] sm:text-2xl">
            {sections.whyGrowWise.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{sections.whyGrowWise.body}</p>
        </section>
      </div>
    </SectionContainer>
  );
}

export function AcademicSeoLandingPage({ pageId, locale }: AcademicSeoLandingPageProps) {
  const config = ACADEMIC_SEO_LANDING_PAGES[pageId];
  const copy = getAcademicSeoLandingCopy(pageId);
  const hubCtaHref = hubUrlWithFilter(locale, config.hubFilter);
  const hubAllHref = createLocaleUrl(ACADEMIC_SEO_HUB_PATH, locale);

  const programCards = config.trackIds
    .map((trackId) => {
      const override = copy.programCardOverrides?.[trackId];
      return buildAcademicSeoStaticProgramCard(trackId, override);
    })
    .filter((card): card is NonNullable<typeof card> => card !== null);

  const defaultOpenFaqs = getDefaultOpenFaqValues(copy.faq.length, (idx) => `faq-${idx}`);

  const valueAnchorText =
    copy.valueAnchorPrefix && pageId === 'geometry'
      ? `${copy.valueAnchorPrefix} ${formatAcademicSprintUsd(getAcademicSummerProgramsHubData().getReadyPricing.geometry.twoWeek)}.`
      : null;

  const showHeroBanner = config.showHeroBanner !== false;

  const heroContent = (
    <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col justify-center px-5 py-8 sm:px-8 md:px-12 md:py-14 lg:px-16 lg:py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-200 md:text-sm">
        {copy.hero.eyebrow}
      </p>
      <h1 className="font-heading mt-2 max-w-[700px] text-[1.5rem] font-bold leading-[1.15] text-white sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.625rem]">
        {copy.hero.h1}
      </h1>
      <p className="mt-3 max-w-[650px] text-base leading-snug text-zinc-100 md:text-lg">{copy.hero.subtext}</p>
      <div className="mt-5">
        <Link
          href={hubCtaHref}
          className={cn(
            'inline-flex min-h-[44px] w-full max-w-md items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto sm:text-base',
            showHeroBanner
              ? 'bg-[#1F396D] hover:bg-[#183056] focus-visible:ring-[#1F396D]'
              : 'bg-[#F16112] hover:bg-[#d54f0a] focus-visible:ring-[#F16112]',
          )}
        >
          {copy.hero.ctaLabel}
        </Link>
      </div>
    </div>
  );

  return (
    <div
      data-academic-seo-landing
      className="min-h-screen bg-background font-sans selection:bg-[#1F396D]/20 selection:text-[#1F396D]"
    >
      <main>
        <section
          className={cn(
            'relative isolate w-full min-h-[min(48svh,17rem)] max-h-[600px] overflow-hidden md:min-h-[min(40vh,22rem)]',
            !showHeroBanner && 'bg-[#1F396D]',
          )}
          aria-label="Program hero"
        >
          {showHeroBanner ? (
            <div className="absolute inset-0 z-0">
              <Image
                src={ACADEMIC_SUMMER_BANNER_SRC}
                alt={copy.hero.h1}
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
          ) : null}
          {heroContent}
        </section>

        <SectionContainer className="bg-white">
          <div
            className={cn(
              'mx-auto grid max-w-5xl gap-6',
              programCards.length > 1 ? 'md:grid-cols-2' : 'max-w-xl',
            )}
          >
            {programCards.map((card) => (
              <AcademicSeoStaticProgramCard key={card.id} card={card} />
            ))}
          </div>
        </SectionContainer>

        <SectionContainer className="border-y border-slate-100 bg-slate-50/80">
          <ul
            className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2"
            aria-label="Program highlights"
          >
            {copy.keyDetails.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 md:text-sm"
              >
                {pill}
              </li>
            ))}
          </ul>
        </SectionContainer>

        {copy.summerCampCallout ? (
          <SectionContainer className="bg-white py-10 sm:py-12">
            <aside className="mx-auto max-w-3xl overflow-hidden rounded-lg border-[1.5px] border-[#F16112]/40 bg-gradient-to-br from-[#fff7ed] via-white to-[#eff6ff] px-5 py-4">
              <p className="text-sm leading-relaxed text-slate-700">{copy.summerCampCallout.text}</p>
              <Link
                href={createLocaleUrl(copy.summerCampCallout.href, locale)}
                className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#F16112] hover:text-[#d54f0a]"
              >
                {copy.summerCampCallout.linkLabel}
              </Link>
            </aside>
          </SectionContainer>
        ) : null}

        <AcademicSeoBodySectionsBlock sections={copy.bodySections} />

        <SectionContainer className="bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-xl font-bold text-[#1F396D] sm:text-2xl">
              {copy.relatedPrograms.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {config.relatedPageOrder.map((relatedId) => {
                const related = ACADEMIC_SEO_LANDING_PAGES[relatedId];
                const item = copy.relatedPrograms.items[relatedId];
                if (!item) return null;
                return (
                  <li key={relatedId} className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-[#F16112]" aria-hidden>
                      →
                    </span>
                    <span className="text-sm text-slate-700 sm:text-base">
                      <Link
                        href={createLocaleUrl(related.path, locale)}
                        className="font-semibold text-[#1F396D] underline hover:text-[#F16112]"
                      >
                        {item.label}
                      </Link>{' '}
                      — {item.description}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-slate-600">
              <Link
                href={hubAllHref}
                className="font-semibold text-[#1F396D] underline hover:text-[#F16112]"
              >
                {copy.relatedPrograms.hubLinkLabel}
              </Link>
            </p>
          </div>
        </SectionContainer>

        {valueAnchorText ? (
          <SectionContainer className="border-t border-slate-100 bg-slate-50/60 py-8">
            <p className="mx-auto max-w-2xl text-center text-sm text-slate-500">{valueAnchorText}</p>
          </SectionContainer>
        ) : null}

        <SectionContainer className="bg-white">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">{copy.mainCta.headline}</h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base">{copy.mainCta.subtext}</p>
            <Link
              href={hubCtaHref}
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:text-base"
            >
              {copy.mainCta.button}
            </Link>
          </div>
        </SectionContainer>

        <SectionContainer id="faq" className="border-t border-slate-100 bg-slate-50/60">
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
                    className="overflow-hidden rounded-xl border-0 bg-white shadow-sm ring-1 ring-slate-200/90"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline sm:px-5">
                      <span className="flex items-center gap-3">
                        <span
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F16112]/10 ring-1 ring-[#F16112]/15"
                          aria-hidden
                        >
                          <HelpCircle className="h-4 w-4 text-[#F16112]" />
                        </span>
                        <span className="text-sm font-semibold text-slate-900 sm:text-base">{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-slate-600 sm:px-5 sm:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </SectionContainer>
      </main>
    </div>
  );
}
