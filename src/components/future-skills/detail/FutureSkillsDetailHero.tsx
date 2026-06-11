'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { publicPath } from '@/lib/publicPath';
import { FUTURE_SKILLS_PRICING_NOTE, type FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsDetailHeroProps {
  pathway: FutureSkillsPathway;
  assessmentHref: string;
  locale: string;
}

export function FutureSkillsDetailHero({ pathway, assessmentHref, locale }: FutureSkillsDetailHeroProps) {
  const Icon = pathway.icon;
  const quickFacts = [
    { label: 'Age', value: pathway.bestFor },
    { label: 'Skill level', value: pathway.skillLevel },
    { label: 'Format', value: pathway.formatShort },
    { label: 'Structure', value: '4 levels' },
    { label: 'Pricing', value: FUTURE_SKILLS_PRICING_NOTE },
  ];

  const quickFactsList = (
    <dl className="space-y-3">
      {quickFacts.map(({ label, value }) => (
        <div key={label} className="border-l-2 border-[#F8B34C] bg-white/10 px-4 py-3">
          <dt className="text-xs font-bold uppercase tracking-wider text-white/60">{label}</dt>
          <dd className="mt-1 text-sm font-bold leading-snug text-white">{value}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section className="bg-[#07162f] px-4 py-12 text-white sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href={publicPath('/future-skills', locale)}
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
        >
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
          Future Skills pathways
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-10">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wider">
              <Icon className="h-4 w-4 text-[#F8B34C]" aria-hidden />
              {pathway.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {pathway.hero}
            </h1>
            <p className="mt-3 text-base font-semibold leading-7 text-[#F8B34C] sm:mt-4 sm:text-lg md:text-xl">
              {pathway.outcome}
            </p>

            <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4 lg:hidden">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#F8B34C]">Quick facts</p>
              <dl className="grid grid-cols-2 gap-2">
                {quickFacts.map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-white/10 px-3 py-2">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-white/60">{label}</dt>
                    <dd className="mt-1 text-xs font-bold leading-snug text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">{pathway.summary}</p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href={assessmentHref}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f] sm:w-auto"
              >
                Book a Pathway Assessment
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="#levels"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15 sm:w-auto"
              >
                See curriculum
              </Link>
            </div>
          </div>
          <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-6 lg:block">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#F8B34C]">Quick facts</p>
            {quickFactsList}
          </div>
        </div>
      </div>
    </section>
  );
}
