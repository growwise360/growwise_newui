'use client';

import React from 'react';
import { ArrowRight, Calculator, Database, Gamepad2, Layers3 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const stages = [
  { key: 'beginner', icon: Gamepad2 },
  { key: 'intermediate', icon: Calculator },
  { key: 'advanced', icon: Database },
] as const;

const skills = ['scripts', 'logic', 'functions', 'data', 'files', 'oop', 'architecture', 'algorithms'] as const;

export function PythonPathwaySection() {
  const t = useTranslations();

  return (
    <section id="python-pathway" className="bg-[#F7FAFC] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">
              {t('codingPage.pathway.eyebrow')}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#1F396D] md:text-4xl">
              {t('codingPage.pathway.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('codingPage.pathway.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-[#1F396D]">
            <Layers3 className="h-5 w-5 text-[#F16112]" aria-hidden />
            {t('codingPage.pathway.placement')}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {stages.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              className="relative rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm shadow-[#1F396D]/5"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D] text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-[#F16112]">
                  {t('codingPage.pathway.stageLabel', { number: index + 1 })}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-950">
                {t(`codingPage.pathway.stages.${key}.title`)}
              </h3>
              <p className="mt-2 text-gray-600">
                {t(`codingPage.pathway.stages.${key}.body`)}
              </p>
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {t('codingPage.pathway.buildLabel')}
                </p>
                <p className="mt-1 text-lg font-bold text-[#1F396D]">
                  {t(`codingPage.pathway.stages.${key}.build`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-[#1F396D] p-6 text-white md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold">{t('codingPage.pathway.skillsTitle')}</h3>
              <p className="mt-2 leading-7 text-white/78">{t('codingPage.pathway.skillsBody')}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2 bg-white/10 px-3 py-2">
                  <ArrowRight className="h-4 w-4 text-[#F8B34C]" aria-hidden />
                  <span className="text-sm font-semibold">{t(`codingPage.pathway.skills.${skill}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
