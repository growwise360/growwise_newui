'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpenCheck, BrainCircuit, Code2, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import BookTrialModal from '@/components/ui/BookTrialModal';
import { publicPath } from '@/lib/publicPath';

const outcomes = [
  { key: 'python', icon: Code2 },
  { key: 'ai', icon: BrainCircuit },
  { key: 'apps', icon: Sparkles },
] as const;

export function CodingOverviewHero() {
  const t = useTranslations();
  const locale = useLocale();
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden px-4 py-20 md:py-24">
      <Image
        src="/images/hero-coding.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07162f]/95 via-[#1F396D]/88 to-[#1F396D]/48" aria-hidden />

      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-bold uppercase tracking-wider backdrop-blur">
            <BookOpenCheck className="h-4 w-4 text-[#F8B34C]" aria-hidden />
            {t('codingPage.overviewHero.badge')}
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {t('codingPage.overviewHero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 md:text-xl">
            {t('codingPage.overviewHero.subtitle')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#coding-paths"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 text-base font-bold text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d9550f] sm:w-auto"
            >
              {t('codingPage.overviewHero.ctaPaths')}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setIsTrialOpen(true)}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-white/28 bg-white/12 px-6 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
            >
              {t('codingPage.overviewHero.ctaTrial')}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {outcomes.map(({ key, icon: Icon }) => (
            <Link
              key={key}
              href={publicPath(t(`codingPage.overviewHero.outcomes.${key}.href`), locale)}
              className="group border-l-2 border-[#F8B34C] bg-white/10 p-5 text-white backdrop-blur transition hover:bg-white/16"
            >
              <Icon className="mb-3 h-6 w-6 text-[#F8B34C]" aria-hidden />
              <h2 className="text-xl font-bold">{t(`codingPage.overviewHero.outcomes.${key}.title`)}</h2>
              <p className="mt-2 text-sm leading-6 text-white/74">
                {t(`codingPage.overviewHero.outcomes.${key}.body`)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <BookTrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />
    </section>
  );
}
