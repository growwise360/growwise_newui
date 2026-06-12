'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, Clock, GraduationCap, Layers3, MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';

import { publicPath } from '@/lib/publicPath';
import {
  CERTIPORT_ATC_DISPLAY,
  CERTIPORT_PARENT_VALUE,
  FUTURE_SKILLS_PRICING_NOTE,
  futureSkillsBundles,
  futureSkillsCertiportHubRoster,
  futureSkillsHeroStats,
  futureSkillsPathways,
} from '@/lib/futureSkillsPathways';
import { FutureSkillsHubFaqSection } from '@/components/future-skills/FutureSkillsHubFaqSection';
import { FutureSkillsStickyCta } from '@/components/future-skills/detail/FutureSkillsStickyCta';

export function FutureSkillsHubPage() {
  const locale = useLocale();
  const assessmentHref = publicPath('/book-assessment?interest=future-skills', locale);

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
              Build it.
              <br />
              Certify it.
              <br />
              Own it.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 md:text-xl">
              Four pathways. Real projects at every stage. External certifications when you&apos;re ready. Assessment places
              your child at exactly the right level.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#pathways"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f] sm:w-auto"
              >
                Explore Certification Pathways
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href={assessmentHref}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15 sm:w-auto"
              >
                Book a Free Assessment
              </Link>
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

      <section className="border-b border-[#1F396D]/10 bg-white px-4 py-4" aria-label="GrowWise trust signals">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm font-semibold text-[#1F396D]">
          <span>387+ students enrolled</span>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>
            ·
          </span>
          <span>4.9★ Google reviews</span>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>
            ·
          </span>
          <span>98% parent satisfaction</span>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>
            ·
          </span>
          <span>{CERTIPORT_ATC_DISPLAY}</span>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#1F396D]/10 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">How this relates to other program pages</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
            Future Skills is for certification pathways — not the same as introductory coding class pages.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            Use{' '}
            <Link href={publicPath('/coding', locale)} className="font-semibold text-[#1F396D] underline underline-offset-2">
              Coding
            </Link>{' '}
            when your child is exploring foundations and trial classes. Choose Future Skills when you want a structured
            multi-level pathway with optional external credentials and Dublin Certiport testing.
          </p>
        </div>
      </section>

      <section id="pathways" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Choose by student goal</p>
            <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
              Four certification pathways. One goal: readiness you can see.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Choose the track that matches your child&apos;s goal — creative portfolio, Python fluency, AI projects, or
              entrepreneurship. Each pathway includes live instruction, portfolio-ready work, optional certification readiness,
              and placement before enrollment.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {futureSkillsPathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <Link
                  key={pathway.slug}
                  href={publicPath(pathway.href, locale)}
                  className="group flex flex-col justify-between rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:min-h-[390px]"
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
                    Explore {pathway.shortTitle} pathway
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
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Enrollment tracks</p>
            <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
              Start at the right level — tuition shared at your pathway assessment.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Every track includes live 90-minute sessions, project feedback, portfolio review, and GrowWise level
              certificates. External certification exams are optional and registered separately. We confirm your
              child&apos;s starting level before enrollment — no sticker shock on the website.
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
                    Recommended Start
                  </p>
                )}
                <h3 className="text-xl font-bold text-gray-950">{bundle.name}</h3>
                <p className="mt-3 text-sm font-semibold text-gray-600">{bundle.includes}</p>
                <p className="mt-1 text-sm text-gray-500">{bundle.sessions}</p>
                <p className="mt-5 text-base font-bold text-[#1F396D]">{FUTURE_SKILLS_PRICING_NOTE}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-gray-600">
            Tuition varies by pathway, starting level, and certification goals. External exam vouchers are confirmed when
            families opt in — {FUTURE_SKILLS_PRICING_NOTE.toLowerCase()}.
          </p>

          <div className="mt-6">
            <Link
              href={assessmentHref}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f] sm:w-auto"
            >
              Book a Free Assessment
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-[#1F396D] p-8 text-white">
            <MapPin className="mb-4 h-8 w-8 text-[#F8B34C]" aria-hidden />
            <h2 className="text-3xl font-bold">On-site Certiport exams</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[#F8B34C]">{CERTIPORT_ATC_DISPLAY}</p>
            <p className="mt-4 leading-7 text-white/80">
              Students who complete a pathway and are ready to
              sit their certification exam can do so on-site. Exam vouchers are purchased separately at{' '}
              <a
                href="https://www.certiport.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F8B34C] underline underline-offset-2 hover:text-white"
              >
                certiport.com
              </a>
              . Certiport certificates are issued by Certiport upon passing — not by GrowWise.
            </p>
            <p className="mt-4 leading-7 text-white/70">{CERTIPORT_PARENT_VALUE}</p>
            <div className="mt-6 space-y-2 border-t border-white/15 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F8B34C]">On-site Certiport exams by pathway</p>
              {futureSkillsCertiportHubRoster.map((entry) => (
                <div key={entry.pathway} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                  <span className="font-bold text-white">{entry.pathway}</span>
                  <span className="text-white/50" aria-hidden>
                    →
                  </span>
                  <span className="text-white/85">{entry.credential}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#1F396D]/10 bg-white p-8">
            <h2 className="text-3xl font-bold text-gray-950">What families get before external certification.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Live 90-minute sessions', 'Project feedback', 'Portfolio review', 'GrowWise certificate', 'Readiness guidance', 'On-site Certiport exams when ready (Dublin)'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FutureSkillsHubFaqSection />

      <FutureSkillsStickyCta assessmentHref={assessmentHref} />
    </main>
  );
}
