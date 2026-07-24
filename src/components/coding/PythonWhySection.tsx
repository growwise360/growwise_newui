'use client';

import React from 'react';
import { BrainCircuit, School, TerminalSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

const reasons = [
  { key: 'school', icon: School },
  { key: 'syntax', icon: TerminalSquare },
  { key: 'ai', icon: BrainCircuit },
] as const;

export function PythonWhySection() {
  const t = useTranslations();

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">
              {t('codingPage.why.eyebrow')}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#1F396D] md:text-4xl">
              {t('codingPage.why.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('codingPage.why.subtitle')}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {reasons.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm shadow-[#1F396D]/5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F16112]/10 text-[#F16112]">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-gray-950">
                  {t(`codingPage.why.items.${key}.title`)}
                </h3>
                <p className="mt-2 leading-7 text-gray-600">
                  {t(`codingPage.why.items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
