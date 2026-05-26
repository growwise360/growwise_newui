'use client';

import Link from 'next/link';
import { HelpCircle, Search, Sparkles, Wrench } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionContainer } from '@/components/camps/SectionContainer';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import { ACADEMIC_SEO_HUB_PATH } from '@/lib/academic-seo-landing-config';
import { ACADEMIC_HUB_FILTER_QUERY_VALUES } from '@/lib/academic-summer-program-filters';
import { getDefaultOpenFaqValues } from '@/lib/faq-accordion';
import type { ImGetReadyIm2DetailCopy } from '@/lib/im-get-ready-seo-landing-copy';

const DIAGNOSTIC_ICONS = [Search, Wrench, Sparkles] as const;

type ImGetReadyIm2DetailSectionProps = {
  locale: string;
  detail: ImGetReadyIm2DetailCopy;
};

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

function hubReserveHref(locale: string): string {
  const query = ACADEMIC_HUB_FILTER_QUERY_VALUES.getReadyMath;
  return createLocaleUrl(`${ACADEMIC_SEO_HUB_PATH}?filter=${query}#track-im2`, locale);
}

export function ImGetReadyIm2DetailSection({ locale, detail }: ImGetReadyIm2DetailSectionProps) {
  const contactHref = createLocaleUrl('/contact', locale);
  const reserveHref = hubReserveHref(locale);
  const defaultOpenFaqs = getDefaultOpenFaqValues(detail.faq.length, (idx) => `im2-faq-${idx}`);

  return (
    <div className="border-t border-slate-200 bg-slate-50/50">
      <SectionContainer className="bg-transparent">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">Best For:</p>
            <BulletList items={detail.bestFor} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">What We Work On</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {detail.workOnModules.map((module) => (
              <article
                key={module.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-base font-bold leading-snug text-[#1F396D] md:text-lg">
                  {module.title}
                </h3>
                <BulletList items={module.bullets} />
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[1100px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
              Common IM2 Mistake Patterns We Target
            </h2>
            <BulletList items={detail.mistakePatterns} />
          </article>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
            {detail.curriculumAlignment.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            {detail.curriculumAlignment.copy}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {detail.curriculumAlignment.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-lg font-bold text-[#1F396D]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
            {detail.diagnosticMethod.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            {detail.diagnosticMethod.subtitle}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {detail.diagnosticMethod.features.map((feature, index) => {
              const Icon = DIAGNOSTIC_ICONS[index] ?? Search;
              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F396D]/10 text-[#1F396D]"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="font-heading mt-4 text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
            {detail.whyThisMatters.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {detail.whyThisMatters.copy}
          </p>
          <BulletList items={detail.whyThisMatters.habits} />
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
            {detail.fourWeekStructure.title}
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2" aria-label="IM2 four-week cohort structure">
            {detail.fourWeekStructure.weeks.map((week) => (
              <li key={week.title}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-[#1F396D] md:text-lg">
                    {week.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{week.text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </SectionContainer>

      <SectionContainer id="im2-regular-tutoring" className="scroll-mt-28 bg-transparent pt-0">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
            {detail.regularTutoring.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {detail.regularTutoring.copy}
          </p>
          {detail.regularTutoring.continuationLabel !== undefined &&
          detail.regularTutoring.items !== undefined &&
          detail.regularTutoring.items.length > 0 ? (
            <>
              <h3 className="mt-6 font-heading text-lg font-bold text-slate-900">
                {detail.regularTutoring.continuationLabel}
              </h3>
              <BulletList items={detail.regularTutoring.items} />
            </>
          ) : null}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-transparent pt-0">
        <div className="mx-auto max-w-[720px]">
          <article className="rounded-2xl border border-[#1F396D]/15 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">
              {detail.thankYouBenefit.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {detail.thankYouBenefit.copy}
            </p>
            <p className="mt-4 text-sm font-medium text-slate-600">
              {detail.thankYouBenefit.eligibilityNote}
            </p>
          </article>
        </div>
      </SectionContainer>

      <SectionContainer id="im2-faq" className="scroll-mt-28 bg-transparent pt-0">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            IM2 <span className="text-[#F16112]">FAQ</span>
          </h2>
          <div className="mt-10 space-y-3">
            <Accordion type="multiple" className="w-full" defaultValue={defaultOpenFaqs}>
              {detail.faq.map((item, idx) => (
                <AccordionItem
                  key={item.question}
                  value={`im2-faq-${idx}`}
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
            {detail.finalCta.headline}
          </h2>
          <p className="mt-3 text-sm text-zinc-200 md:text-base">{detail.finalCta.subheadline}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={reserveHref}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#F16112] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto sm:text-base"
            >
              {detail.finalCta.primaryCta}
            </Link>
            <Link
              href={contactHref}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F396D] sm:w-auto sm:text-base"
            >
              {detail.finalCta.secondaryCta}
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
