'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, Clock, DollarSign, GraduationCap, Layers3, ShieldCheck, Video } from 'lucide-react';
import { useLocale } from 'next-intl';

import BookTrialModal from '@/components/ui/BookTrialModal';
import { publicPath } from '@/lib/publicPath';
import { getFutureSkillsPathway, type FutureSkillsSlug } from '@/lib/futureSkillsPathways';

interface FutureSkillsDetailPageProps {
  slug: FutureSkillsSlug;
}

export function FutureSkillsDetailPage({ slug }: FutureSkillsDetailPageProps) {
  const locale = useLocale();
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const pathway = getFutureSkillsPathway(slug);

  if (!pathway) {
    return null;
  }

  const Icon = pathway.icon;

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="bg-[#07162f] px-4 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Link
              href={publicPath('/future-skills', locale)}
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
              Future Skills pathways
            </Link>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wider">
              <Icon className="h-4 w-4 text-[#F8B34C]" aria-hidden />
              {pathway.eyebrow}
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              {pathway.hero}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 md:text-xl">
              {pathway.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsTrialOpen(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f]"
              >
                Book a Trial Class
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <Link
                href="#levels"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15"
              >
                See levels and pricing
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6">
            <p className="rounded-xl border-l-4 border-[#F8B34C] bg-white/10 p-4 text-lg font-semibold leading-7">
              {pathway.problem}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: GraduationCap, label: 'Best for', value: pathway.bestFor },
                { icon: Clock, label: 'Session length', value: pathway.sessionLength },
                { icon: Video, label: 'Mode', value: 'Online + support' },
                { icon: Layers3, label: 'Structure', value: '4 levels' },
              ].map(({ icon: FactIcon, label, value }) => (
                <div key={label} className="border-l-2 border-[#F8B34C] bg-white/10 p-4">
                  <FactIcon className="mb-2 h-5 w-5 text-[#F8B34C]" aria-hidden />
                  <p className="text-xs font-bold uppercase tracking-wider text-white/60">{label}</p>
                  <p className="mt-1 font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Student outcome</p>
            <h2 className="text-3xl font-bold text-[#1F396D]">What students finish with</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">{pathway.outcome}</p>
          </div>
          <div className="rounded-2xl border border-[#1F396D]/10 bg-white p-8 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">They build</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {pathway.buildList.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f8fafc] p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="levels" className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Curriculum and pricing</p>
            <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
              Four levels, each with a concrete student output.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Every level uses 90-minute sessions. Families can start with one level, choose Builder Track, or continue through
              certification prep when the student is ready.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {pathway.levels.map((level) => (
              <article key={level.course} className="rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">{level.label}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-950">{level.course}</h3>
                  </div>
                  <p className="rounded-xl bg-[#1F396D] px-4 py-2 text-xl font-bold text-white">{level.fee}</p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-4">
                    <Clock className="mb-2 h-4 w-4 text-[#F16112]" aria-hidden />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Sessions</p>
                    <p className="mt-1 font-bold text-gray-900">{level.sessions} sessions / {level.hours}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <Award className="mb-2 h-4 w-4 text-[#F16112]" aria-hidden />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Outcome</p>
                    <p className="mt-1 font-bold text-gray-900">{level.outcome}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Core topics</p>
                  <div className="flex flex-wrap gap-2">
                    {level.topics.map((topic) => (
                      <span key={topic} className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-700">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl bg-[#1F396D] p-8 text-white">
            <ShieldCheck className="mb-4 h-8 w-8 text-[#F8B34C]" aria-hidden />
            <h2 className="text-3xl font-bold">External certification is optional.</h2>
            <p className="mt-4 leading-7 text-white/82">{pathway.certificationFit}</p>
            <p className="mt-4 leading-7 text-white/70">
              GrowWise course fees include instruction, projects, feedback, portfolio review, and GrowWise certificates.
              External exam vouchers, retakes, practice tests, and proctoring fees are confirmed separately.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1F396D]/10 bg-white p-8">
            <h2 className="text-3xl font-bold text-gray-950">External fee notes</h2>
            <div className="mt-6 space-y-3">
              {pathway.externalFees.map((fee) => (
                <div key={fee.item} className="flex items-start justify-between gap-4 rounded-xl bg-[#f8fafc] p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
                    <span className="font-semibold text-gray-700">{fee.item}</span>
                  </div>
                  <span className="text-right text-sm font-bold text-gray-950">{fee.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Parent questions</p>
            <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">Before you choose this pathway</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {pathway.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6">
                <h3 className="text-xl font-bold text-gray-950">{item.question}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07162f] px-4 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#F8B34C]">Next step</p>
            <h2 className="mt-2 text-3xl font-bold">Start with the right level, not the longest package.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/75">
              A trial class helps confirm whether your child should begin at Level 1, skip ahead, or choose a different Future Skills pathway.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTrialOpen(true)}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f]"
          >
            Book a Trial Class
          </button>
        </div>
      </section>

      <BookTrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />
    </main>
  );
}
