'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, Clock, GraduationCap, Layers3, MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';

import BookTrialModal from '@/components/ui/BookTrialModal';
import { publicPath } from '@/lib/publicPath';
import {
  futureSkillsBundles,
  futureSkillsHeroStats,
  futureSkillsPathways,
} from '@/lib/futureSkillsPathways';

export function FutureSkillsHubPage() {
  const locale = useLocale();
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="bg-[#07162f] px-4 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wider">
              <Award className="h-4 w-4 text-[#F8B34C]" aria-hidden />
              GrowWise Future Skills
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Certification pathways for students who need more than random classes.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 md:text-xl">
              Four premium 90-minute pathways that turn interest into outcomes: creative media portfolios, Python fluency,
              AI/ML projects, and AI entrepreneurship. Students build first, then prepare for external certifications when ready.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#pathways"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f]"
              >
                Compare pathways
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setIsTrialOpen(true)}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15"
              >
                Book a Trial Class
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {futureSkillsHeroStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-[#F8B34C] bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-white/60">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pathways" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Choose by student goal</p>
            <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
              One hub, four detailed program pages.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Each pathway has a different parent job: create, code, understand AI, or build a business idea. The hub helps
              families choose. The detail pages explain the curriculum, pricing, credentials, and student outcomes.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {futureSkillsPathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <Link
                  key={pathway.slug}
                  href={publicPath(pathway.href, locale)}
                  className="group flex min-h-[390px] flex-col justify-between rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F396D] text-white">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">{pathway.eyebrow}</p>
                        <h3 className="text-2xl font-bold text-gray-950">{pathway.shortTitle}</h3>
                      </div>
                    </div>
                    <p className="rounded-xl border-l-4 border-[#F16112] bg-[#FFF7F2] p-4 text-sm font-semibold leading-6 text-gray-700">
                      {pathway.problem}
                    </p>
                    <p className="mt-4 leading-7 text-gray-600">{pathway.summary}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <GraduationCap className="mb-2 h-4 w-4 text-[#1F396D]" aria-hidden />
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Best for</p>
                        <p className="mt-1 text-sm font-bold text-gray-900">{pathway.bestFor}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <Clock className="mb-2 h-4 w-4 text-[#1F396D]" aria-hidden />
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Sessions</p>
                        <p className="mt-1 text-sm font-bold text-gray-900">90 minutes</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <Layers3 className="mb-2 h-4 w-4 text-[#1F396D]" aria-hidden />
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Levels</p>
                        <p className="mt-1 text-sm font-bold text-gray-900">4-stage path</p>
                      </div>
                    </div>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#F16112]">
                    View pathway details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Bundle pricing</p>
            <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
              Public pricing that increases commitment without hiding the outcome.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              GrowWise course fees include live instruction, projects, feedback, portfolio review, and GrowWise certificates.
              External certification fees are optional and billed separately.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {futureSkillsBundles.map((bundle) => (
              <div
                key={bundle.name}
                className={`rounded-2xl border p-6 ${
                  bundle.featured
                    ? 'border-[#F16112] bg-[#FFF7F2] shadow-lg'
                    : 'border-[#1F396D]/10 bg-[#f8fafc]'
                }`}
              >
                {bundle.featured && (
                  <p className="mb-3 inline-flex rounded-full bg-[#F16112] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most useful start
                  </p>
                )}
                <h3 className="text-xl font-bold text-gray-950">{bundle.name}</h3>
                <p className="mt-3 text-sm font-semibold text-gray-600">{bundle.includes}</p>
                <p className="mt-1 text-sm text-gray-500">{bundle.sessions}</p>
                <p className="mt-5 text-3xl font-bold text-[#1F396D]">{bundle.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-[#1F396D] p-8 text-white">
            <MapPin className="mb-4 h-8 w-8 text-[#F8B34C]" aria-hidden />
            <h2 className="text-3xl font-bold">Online learning with Dublin certification support.</h2>
            <p className="mt-4 leading-7 text-white/80">
              Students can join online, build projects live, and use optional in-person support for certification readiness,
              portfolio review, or testing logistics when appropriate.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1F396D]/10 bg-white p-8">
            <h2 className="text-3xl font-bold text-gray-950">What families get before an exam voucher.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Live 90-minute sessions', 'Project feedback', 'Portfolio review', 'GrowWise certificate', 'Readiness guidance', 'Optional external exam support'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookTrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />
    </main>
  );
}
