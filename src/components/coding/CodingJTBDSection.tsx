'use client';

import React from 'react';
import { Brain, MapPinned, Sparkles, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';

const jobs = [
  { key: 'futureReady', icon: Brain },
  { key: 'rightLevel', icon: MapPinned },
  { key: 'motivation', icon: Sparkles },
  { key: 'proof', icon: Trophy },
] as const;

export function CodingJTBDSection() {
  const t = useTranslations();

  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">
            {t('codingPage.jobs.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
            {t('codingPage.jobs.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('codingPage.jobs.subtitle')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm shadow-[#1F396D]/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D]/10 text-[#1F396D]">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-950">
                {t(`codingPage.jobs.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-gray-600">
                {t(`codingPage.jobs.items.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
