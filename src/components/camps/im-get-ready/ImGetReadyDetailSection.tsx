'use client';

import Link from 'next/link';
import { HelpCircle, Search, Sparkles, Wrench } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImGetReadySectionContainer } from '@/components/camps/im-get-ready/ImGetReadySectionContainer';
import {
  IM_GET_READY_BLOCK_STACK,
  IM_GET_READY_GRID_GAP,
  IM_GET_READY_HEADING,
  IM_GET_READY_SCROLL_MT,
  IM_GET_READY_SECTION_STACK,
} from '@/components/camps/im-get-ready/im-get-ready-layout';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import { ACADEMIC_SEO_HUB_PATH } from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion';
import type { ImGetReadyImDetailCopy } from '@/lib/im-get-ready-seo-landing-copy';
import { cn } from '@/lib/utils';

const DIAGNOSTIC_ICONS = [Search, Wrench, Sparkles] as const;
const CARD = 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5';
const stackSection = cn('bg-transparent', IM_GET_READY_SECTION_STACK);

type ImGetReadyDetailSectionProps = {
  locale: string;
  trackId: 'im1' | 'im2';
  detail: ImGetReadyImDetailCopy;
};

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

function hubReserveHref(locale: string, trackId: 'im1' | 'im2'): string {
  const query = ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath;
  return createLocaleUrl(`${ACADEMIC_SEO_HUB_PATH}?filter=${query}#track-${trackId}`, locale);
}

export function ImGetReadyDetailSection({ locale, trackId, detail }: ImGetReadyDetailSectionProps) {
  const contactHref = createLocaleUrl('/contact', locale);
  const reserveHref = hubReserveHref(locale, trackId);
  const faqPrefix = `${trackId}-faq`;
  const defaultOpenFaqs = getDefaultOpenFaqValues(detail.faq.length, (idx) => `${faqPrefix}-${idx}`);
  const trackLabel = trackId === 'im1' ? 'IM1' : 'IM2';
  const workOnGridClass =
    trackId === 'im2' ? 'grid md:grid-cols-2 xl:grid-cols-3' : 'grid md:grid-cols-2 lg:grid-cols-3';
  const curriculumGridClass =
    trackId === 'im2' ? 'grid md:grid-cols-2 lg:grid-cols-4' : 'grid md:grid-cols-3';

  return (
    <div className="border-t border-slate-200 bg-slate-50/50">
      <ImGetReadySectionContainer className={stackSection}>
        <div className={cn('mx-auto max-w-[1100px]', IM_GET_READY_BLOCK_STACK)}>
          <div className={CARD}>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">Best For:</p>
            <BulletList items={detail.bestFor} />
          </div>

          <div>
            <h2 className={IM_GET_READY_HEADING}>What We Work On</h2>
            <div className={cn(workOnGridClass, IM_GET_READY_GRID_GAP)}>
              {detail.workOnModules.map((module) => (
                <article key={module.title} className={CARD}>
                  <h3 className="font-heading text-base font-bold leading-snug text-[#1F396D] md:text-lg">
                    {module.title}
                  </h3>
                  <BulletList items={module.bullets} />
                </article>
              ))}
            </div>
          </div>

          <article className={CARD}>
            <h2 className={IM_GET_READY_HEADING}>
              Common {trackLabel} Mistake Patterns We Target
            </h2>
            <BulletList items={detail.mistakePatterns} />
          </article>

          <div id="curriculum" className={IM_GET_READY_SCROLL_MT}>
            <h2 className={IM_GET_READY_HEADING}>{detail.curriculumAlignment.title}</h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-700 sm:mt-2">
              {detail.curriculumAlignment.copy}
            </p>
            <div className={cn(curriculumGridClass, IM_GET_READY_GRID_GAP)}>
              {detail.curriculumAlignment.cards.map((card) => (
                <article key={card.title} className={CARD}>
                  <h3 className="font-heading text-base font-bold text-[#1F396D] sm:text-lg">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700 sm:mt-2">{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className={IM_GET_READY_HEADING}>{detail.diagnosticMethod.title}</h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-700 sm:mt-2">
              {detail.diagnosticMethod.subtitle}
            </p>
            <div className={cn('grid md:grid-cols-3', IM_GET_READY_GRID_GAP)}>
              {detail.diagnosticMethod.features.map((feature, index) => {
                const Icon = DIAGNOSTIC_ICONS[index] ?? Search;
                return (
                  <article key={feature.title} className={CARD}>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F396D]/10 text-[#1F396D] sm:h-11 sm:w-11"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <h3 className="font-heading mt-2 text-base font-bold text-slate-900 sm:mt-3 sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:mt-1.5">{feature.text}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mx-auto max-w-[720px]">
            <h2 className={IM_GET_READY_HEADING}>{detail.whyThisMatters.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 sm:mt-2">{detail.whyThisMatters.copy}</p>
            <BulletList items={detail.whyThisMatters.habits} />
          </div>

          <div id="how-it-works" className={IM_GET_READY_SCROLL_MT}>
            <h2 className={IM_GET_READY_HEADING}>{detail.fourWeekStructure.title}</h2>
            <ol
              className={cn('grid md:grid-cols-2', IM_GET_READY_GRID_GAP)}
              aria-label={`${trackLabel} four-week cohort structure`}
            >
              {detail.fourWeekStructure.weeks.map((week) => (
                <li key={week.title}>
                  <article className={cn('h-full', CARD)}>
                    <h3 className="font-heading text-base font-bold text-[#1F396D] md:text-lg">{week.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700 sm:mt-2">{week.text}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <div
            id={`${trackId}-regular-tutoring`}
            className={cn('mx-auto max-w-[720px]', IM_GET_READY_SCROLL_MT)}
          >
            <h2 className={IM_GET_READY_HEADING}>{detail.regularTutoring.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 sm:mt-2">{detail.regularTutoring.copy}</p>
            {detail.regularTutoring.continuationLabel !== undefined &&
            detail.regularTutoring.items !== undefined &&
            detail.regularTutoring.items.length > 0 ? (
              <>
                <h3 className="mt-3 font-heading text-base font-bold text-slate-900 sm:mt-4 sm:text-lg">
                  {detail.regularTutoring.continuationLabel}
                </h3>
                <BulletList items={detail.regularTutoring.items} />
              </>
            ) : null}
          </div>

          <div id={`${trackId}-faq`} className={IM_GET_READY_SCROLL_MT}>
            <h2 className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
              {trackLabel} <span className="text-[#F16112]">FAQ</span>
            </h2>
            <div className="mx-auto mt-4 max-w-4xl space-y-2 sm:mt-5 sm:space-y-3">
              <Accordion type="multiple" className="w-full" defaultValue={defaultOpenFaqs}>
                {detail.faq.map((item, idx) => (
                  <AccordionItem
                    key={item.question}
                    value={`${faqPrefix}-${idx}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white px-3 shadow-sm sm:px-4"
                  >
                    <AccordionTrigger className="py-3 text-left text-sm font-semibold text-slate-900 hover:no-underline sm:py-3.5 md:text-base">
                      <span className="flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-sm leading-relaxed text-slate-600 sm:pb-3.5 md:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </ImGetReadySectionContainer>

      <ImGetReadySectionContainer className={cn('bg-[#1F396D]', stackSection)}>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-xl font-bold text-white sm:text-2xl md:text-3xl">
            {detail.finalCta.headline}
          </h2>
          <p className="mt-2 text-sm text-zinc-200 sm:mt-3 md:text-base">{detail.finalCta.subheadline}</p>
          <div className="mt-4 flex flex-col items-center gap-2.5 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3">
            <Link
              href={reserveHref}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto"
            >
              {detail.finalCta.primaryCta}
            </Link>
            <Link
              href={contactHref}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F396D] sm:w-auto"
            >
              {detail.finalCta.secondaryCta}
            </Link>
          </div>
        </div>
      </ImGetReadySectionContainer>
    </div>
  );
}
