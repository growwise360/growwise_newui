'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Code2, GraduationCap, Laptop, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/components/ui/utils';
import BookTrialModal from '@/components/ui/BookTrialModal';

interface CodingProgramDetailHeroProps {
  namespace: string;
  pathwayHref: string;
  className?: string;
}

const facts = [
  { key: 'grades', icon: GraduationCap },
  { key: 'level', icon: Code2 },
  { key: 'format', icon: Users },
  { key: 'mode', icon: Laptop },
] as const;

export function CodingProgramDetailHero({
  namespace,
  pathwayHref,
  className,
}: CodingProgramDetailHeroProps) {
  const t = useTranslations();
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  return (
    <div className={cn('bg-transparent', className)}>
      <section className="relative isolate overflow-hidden px-4 pb-14 pt-20 md:pb-20">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-coding.png')" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07162f]/95 via-[#1F396D]/86 to-[#1F396D]/42" aria-hidden />

        <div className="mx-auto flex min-h-[620px] max-w-6xl flex-col justify-center">
          <div className="max-w-3xl py-10 text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-bold uppercase tracking-wider backdrop-blur">
              <BookOpenCheck className="h-4 w-4 text-[#F8B34C]" aria-hidden />
              {t(`${namespace}.hero.badge`)}
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              {t(`${namespace}.hero.headlineLine1`)}
              <span className="block text-[#F8B34C]">{t(`${namespace}.hero.headlineLine2`)}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 md:text-xl">
              {t(`${namespace}.hero.subtext`)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsTrialOpen(true)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 text-base font-bold text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d9550f] sm:w-auto"
              >
                {t(`${namespace}.hero.ctaTrial`)}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <Link
                href={pathwayHref}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-white/28 bg-white/12 px-6 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
              >
                {t(`${namespace}.hero.ctaPrograms`)}
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="border-l-2 border-[#F8B34C] bg-white/10 px-4 py-3 text-left backdrop-blur"
                >
                  <Icon className="mb-2 h-5 w-5 text-[#F8B34C]" aria-hidden />
                  <p className="text-xs font-bold uppercase tracking-wider text-white/65">
                    {t(`${namespace}.hero.facts.${key}.label`)}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {t(`${namespace}.hero.facts.${key}.value`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookTrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />
    </div>
  );
}
