'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, Code2, Smartphone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import {
  getCatalogAnchorForDiscoveryPath,
  getCodingSurfaceByPricingProgramId,
  type PricingProgramId,
} from '@/lib/codingProgramSurfaces';

const paths = [
  { key: 'python', icon: Code2, pricingProgramId: 'python' as PricingProgramId },
  { key: 'ai', icon: BrainCircuit, pricingProgramId: 'aiml' as PricingProgramId },
  { key: 'appdev', icon: Smartphone, pricingProgramId: 'appdev' as PricingProgramId },
] as const;

export function CodingPathCards() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section id="coding-paths" className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">
            {t('codingPage.paths.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
            {t('codingPage.paths.title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('codingPage.paths.subtitle')}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {paths.map(({ key, icon: Icon, pricingProgramId }) => {
            const discoveryHref = t(`codingPage.paths.items.${key}.href`);
            const surface = getCodingSurfaceByPricingProgramId(pricingProgramId);
            const catalogHref = surface
              ? getCatalogAnchorForDiscoveryPath(surface.discoveryPath)
              : '/steam/ml-ai-coding';

            return (
              <article
                key={key}
                className="group flex min-h-[340px] flex-col justify-between rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm shadow-[#1F396D]/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1F396D]/10"
              >
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D] text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">
                    {t(`codingPage.paths.items.${key}.bestFor`)}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-950">
                    {t(`codingPage.paths.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">
                    {t(`codingPage.paths.items.${key}.body`)}
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="text-sm font-semibold text-gray-500">
                    {t(`codingPage.paths.items.${key}.artifactLabel`)}
                  </p>
                  <p className="mt-1 font-bold text-[#1F396D]">
                    {t(`codingPage.paths.items.${key}.artifact`)}
                  </p>
                  <Link
                    href={publicPath(discoveryHref, locale)}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#F16112]"
                  >
                    {t('codingPage.paths.cta')}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </Link>
                  <Link
                    href={publicPath(catalogHref, locale)}
                    className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#1F396D] underline underline-offset-2 hover:text-[#F16112]"
                  >
                    Browse enroll options
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
