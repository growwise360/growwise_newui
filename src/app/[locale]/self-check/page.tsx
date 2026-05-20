import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import SelfCheckFormClient from '@/components/SelfCheckFormClient';
import LiveCounterStrip from '@/components/LiveCounterStrip';
import ErrorBanner from '@/components/ErrorBanner';
import { getSelfCheckStats } from '@/lib/selfCheckStats';

/* ─── Data ──────────────────────────────────────────────────────────── */

const MINI_LOOP = [
  'Self-Check',
  'Pattern Result',
  'Teacher Validation',
  'Gap Fixer',
  'Recheck',
];

const FUNNEL_CARDS = [
  {
    emoji: '🔍',
    step: 'Step 1',
    title: 'Free Self-Check',
    body: 'A 10-minute diagnostic quiz your child takes on any device. No account needed. Flags the exact mistake pattern — not a general score.',
    badge: 'Free',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
    featured: false,
  },
  {
    emoji: '🧑‍🏫',
    step: 'Step 2',
    title: 'Free 1:1 Personalized Plan Preparation',
    body: 'A GrowWise teacher validates the gap in a 45-min session. They walk through the exact blocker and show your child the specific fix — live.',
    badge: 'Free · Limited spots',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
    featured: true,
  },
  {
    emoji: '⚡',
    step: 'Step 3',
    title: '4-Week Gap Fixer',
    body: 'Eight targeted sessions built around the single blocker found in Step 1. You\'ll see the pattern gone in the recheck at the end of Week 4.',
    badge: 'Paid · From $299',
    badgeClass: 'bg-[#1F396D]/10 text-[#1F396D] border-[#1F396D]/20',
    featured: false,
  },
];

const MISTAKE_PATTERNS = [
  {
    num: '01',
    emoji: '⚡',
    title: 'Rushing Pattern',
    what: 'Knows the method, skips steps under time pressure. Gets it right when there\'s no clock — fails when there is one.',
    fix: 'Pacing technique — not more content practice. No new topics needed.',
    youllKnow: 'which question types trigger it and exactly how many marks it costs per test.',
  },
  {
    num: '02',
    emoji: '🪜',
    title: 'Skipped-Step Pattern',
    what: 'Jumps straight to the answer. Shows no working. Correct answers are luck, not method — invisible until a test.',
    fix: 'Process structure — not subject knowledge. No syllabus gap to fill.',
    youllKnow: 'whether it\'s a real gap or a habit fixable in 2 focused sessions.',
  },
  {
    num: '03',
    emoji: '🏗️',
    title: 'Weak Basics',
    what: 'A prior-grade concept never fully locked in. Every topic built on top of it wobbles — looks like 6 different problems, but it\'s one root cause.',
    fix: 'Target the root, not the 6 surface symptoms.',
    youllKnow: 'exactly which foundational concept is missing and which grade it\'s from.',
  },
];

const TESTIMONIALS = [
  {
    outcome: 'Grade improved C → A− in 4 weeks',
    pattern: 'Skipped-Step Pattern',
    quote: 'I assumed Meera needed more practice. The diagnosis showed she already knew everything — she just never wrote her steps down. Two sessions with her teacher and the habit was gone. Her teacher noticed the improvement before I did.',
    meta: 'Dublin, CA · Grade 5 parent',
    initials: 'SP',
    avatarBg: 'bg-[#F16112]',
  },
  {
    outcome: '9 marks recovered in next test',
    pattern: 'Rushing Pattern',
    quote: 'My son Rohan aced every homework set but kept dropping marks on timed tests. We thought he needed harder practice. GrowWise showed us it was pacing, not knowledge. They gave him one technique and the next test score jumped.',
    meta: 'Pleasanton, CA · Grade 6 parent',
    initials: 'RK',
    avatarBg: 'bg-[#1F396D]',
  },
  {
    outcome: '3 months of confusion resolved in 1 session',
    pattern: 'Weak Basics',
    quote: 'My daughter was struggling with fractions, decimals, and percentages all at once. The diagnosis found she had never fully understood ratio from Grade 4 — that one missing piece was causing everything. We fixed the root and all three topics improved together.',
    meta: 'San Ramon, CA · Grade 6 parent',
    initials: 'AM',
    avatarBg: 'bg-emerald-600',
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */

export default async function SelfCheckPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedParams = await (searchParams ?? Promise.resolve({} as { error?: string }));
  const errorCode = resolvedParams?.error;
  const errorMessage =
    errorCode === 'expired'
      ? 'Your session expired — please start again. It only takes 5 minutes.'
      : errorCode === 'incomplete'
        ? 'Please complete the quiz first, then check your results.'
        : null;

  const stats = await getSelfCheckStats();

  return (
    <main className="min-h-screen page-bg-coding">

      {errorMessage && <ErrorBanner message={errorMessage} />}

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="pt-10 pb-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — copy + mini-loop + form */}
          <div className="space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F396D]/10 ring-1 ring-[#F16112]/25 text-xs font-bold uppercase tracking-widest text-[#1F396D]">
              <BarChart3 className="w-3.5 h-3.5 text-[#F16112]" aria-hidden />
              Free Math Diagnostic · Grades 3–8 · Report In Your Inbox
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1F396D] leading-[1.18]">
              In 10 minutes, know exactly which pattern is{' '}
              <span className="text-[#F16112]">costing your child marks</span> in math.
            </h1>

            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              You&apos;ll have the pattern name, the exact question types it triggers, and one
              specific fix — all in your inbox before school tomorrow.
            </p>

            {/* Mini loop — upgraded active step */}
            <div className="flex flex-wrap items-center gap-1 text-xs font-semibold">
              {MINI_LOOP.map((step, i) => (
                <React.Fragment key={step}>
                  {i === 0 ? (
                    <span className="px-2.5 py-1 rounded-full whitespace-nowrap bg-[#F16112] text-white ring-2 ring-[#F16112]/30 ring-offset-1">
                      {step}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full whitespace-nowrap bg-gray-100 text-gray-400">
                      {step}
                    </span>
                  )}
                  {i < MINI_LOOP.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" aria-hidden />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {[
                { Icon: CheckCircle, text: 'Free — no credit card' },
                { Icon: Clock,       text: 'Under 10 minutes' },
                { Icon: ShieldCheck, text: 'Diagnosis emailed to you' },
                { Icon: ShieldCheck, text: 'No password needed' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon className="w-3.5 h-3.5 text-[#F16112] flex-shrink-0" aria-hidden />
                  {text}
                </div>
              ))}
            </div>

            {/* Social proof */}
            <p className="text-xs text-gray-400 leading-relaxed italic">
              Trusted by families in Dublin, Pleasanton, and San Ramon, CA — Grades 3 through 8.
            </p>

            {/* Form card */}
            <div
              id="self-check-form"
              className="bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(31,57,109,0.2)] ring-1 ring-[#1F396D]/10 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#1F396D] to-[#29335C] px-5 py-3.5">
                <p className="text-white font-bold text-sm">Start Your Child&apos;s Self-Check</p>
                <p className="text-white/60 text-xs mt-0.5">Takes under 10 minutes · Diagnosis in your inbox</p>
              </div>
              <div className="p-5">
                <SelfCheckFormClient />
              </div>
            </div>

            {/* Secondary CTA */}
            <a
              href="#funnel"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F396D] hover:text-[#F16112] transition-colors"
            >
              See how it works
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>

          {/* Right — Sample Report Preview */}
          <div className="lg:pt-4 hidden md:block">
            <p className="text-[11px] font-bold text-[#E87722] uppercase tracking-[2px] mb-2 text-center">
              Sample Diagnosis Preview
            </p>
            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden w-full border border-gray-100">

              {/* Header */}
              <div className="bg-[#1F396D] px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base">Mistake Detective Report</p>
                  <p className="text-white/80 text-[13px] mt-0.5">Arjun · Grade 5 · Dublin, CA</p>
                </div>
                <span className="bg-[#F16112]/20 border border-[#F16112]/40 text-[#F16112] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Draft
                </span>
              </div>

              {/* Score block */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center py-2">
                    <p className="text-[#1F396D] font-extrabold text-[26px] leading-none">14<span className="text-sm opacity-40">/20</span></p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide mt-1">Score</p>
                  </div>
                  <div className="text-center bg-[#fff5f0] rounded-xl py-2">
                    <p className="text-[#F16112] font-extrabold text-[26px] leading-none">6</p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide mt-1">Errors</p>
                  </div>
                  <div className="text-center bg-[#f0faf4] rounded-xl py-2">
                    <p className="text-[#22863a] font-extrabold text-[26px] leading-none">8</p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wide mt-1">Min</p>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: 'Fractions', pct: 45, color: 'bg-[#F16112]' },
                    { label: 'Word Problems', pct: 60, color: 'bg-[#F16112]' },
                    { label: 'Mental Math', pct: 90, color: 'bg-[#22863a]' },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span className="text-gray-600">{label}</span>
                        <span className={pct >= 80 ? 'text-[#22863a]' : 'text-[#F16112]'}>{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`${color} rounded-full h-1.5 transition-all`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pattern identified */}
                <div className="bg-[#FFF8F3] border border-[#E87722]/30 border-l-[3px] border-l-[#E87722] rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-[#1F396D] uppercase tracking-[1.5px] font-bold mb-0.5">
                      Pattern Identified
                    </p>
                    <p className="font-bold text-[15px] text-gray-900">Skipped-Step Pattern</p>
                  </div>
                  <span className="flex-shrink-0 bg-[#E87722] text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                    CONFIRMED
                  </span>
                </div>

                {/* Blurred insight */}
                <div className="relative bg-[#fffbf0] border-l-[3px] border-[#1F396D] rounded-md px-3.5 py-3 overflow-hidden mb-4">
                  <p className="italic text-[13px] text-[#555] leading-relaxed blur-sm select-none">
                    Arjun consistently skips the intermediate step in multi-part fraction problems.
                    This is not a knowledge gap — it&apos;s a process habit that costs him 3–4 marks per
                    test and can be fixed in 2 focused sessions.
                  </p>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[60px]"
                    style={{ background: 'linear-gradient(transparent, white)' }}
                  />
                </div>

                {/* CTA inside preview */}
                <a
                  href="#self-check-form"
                  className="block w-full bg-[#F16112] hover:bg-[#d54f0a] text-white font-bold text-[14px] px-6 py-3 rounded-lg text-center transition-colors shadow-sm"
                >
                  Show Me What&apos;s Blocking Arjun →
                </a>
              </div>
            </div>

            <p className="text-center text-[12px] text-[#999] mt-2">
              Your child&apos;s actual diagnosis is generated minutes after completing the quiz.
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. LIVE COUNTER STRIP
      ══════════════════════════════════════════ */}
      <LiveCounterStrip c1={stats.families} c2={stats.patterns} c3={stats.sessions} />

      {/* ══════════════════════════════════════════
          3. WHAT WE DIAGNOSE — Pattern Library
      ══════════════════════════════════════════ */}
      <section className="py-16 px-4 border-t border-[#1F396D]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
              <Badge className="bg-[#1F396D]/10 text-[#1F396D] border-[#1F396D]/20 border font-bold uppercase tracking-widest text-xs">
                What We Diagnose
              </Badge>
              <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
              Three blockers. One is causing your child&apos;s mistakes.
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Most parents assume it&apos;s a knowledge gap. Usually it isn&apos;t. The quiz finds
              which of these three is the real cause.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MISTAKE_PATTERNS.map(({ num, emoji, title, what, fix, youllKnow }) => (
              <Card
                key={title}
                className="border border-[#1F396D]/10 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Card header */}
                  <div className="px-5 pt-5 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl" aria-hidden>{emoji}</span>
                      <span className="text-[11px] font-black text-[#1F396D]/40 bg-[#1F396D]/[0.06] px-2.5 py-0.5 rounded-full tracking-wider">
                        {num}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#1F396D] text-base mb-2">{title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{what}</p>
                  </div>

                  {/* Fix row */}
                  <div className="mx-4 mb-4 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
                    <span className="text-[10px] font-bold text-[#F16112] uppercase tracking-wider">Fix · </span>
                    <span className="text-xs text-gray-600">{fix}</span>
                  </div>

                  {/* You'll know — highlighted bottom row */}
                  <div className="border-t-2 border-[#F16112]/20 bg-[#FFF8F3] px-4 py-3">
                    <p className="text-[10px] font-bold text-[#F16112] uppercase tracking-wider mb-1">
                      You&apos;ll know
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed">{youllKnow}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FUNNEL — From Free Check to Fixed Gap
      ══════════════════════════════════════════ */}
      <section id="funnel" className="py-16 px-4 bg-white border-y border-[#1F396D]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
              <Badge className="bg-[#F16112]/10 text-[#F16112] border-[#F16112]/20 border font-bold uppercase tracking-widest text-xs">
                The Funnel
              </Badge>
              <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
              From Free Check to Fixed Gap
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Every step is designed to get your child more specific, not more confused.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
            {FUNNEL_CARDS.map(({ emoji, step, title, body, badge, badgeClass, featured }, i) => (
              <React.Fragment key={title}>
                <div className="relative flex flex-col">
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-[#1F396D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <Card
                    className={`h-full transition-all duration-200 ${
                      featured
                        ? 'border-2 border-[#1F396D] bg-[#1F396D]/[0.03] shadow-[0_8px_32px_-4px_rgba(31,57,109,0.2)] -translate-y-1'
                        : 'border border-[#1F396D]/10 hover:shadow-md'
                    }`}
                  >
                    <CardContent className="p-5 space-y-3 flex flex-col h-full">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl" aria-hidden>{emoji}</span>
                        <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${badgeClass}`}>
                          {badge}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${featured ? 'text-[#1F396D]' : 'text-[#F16112]'}`}>{step}</p>
                        <h3 className="font-bold text-[#1F396D] text-sm mb-1.5">{title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                      </div>
                    </CardContent>
                  </Card>
                  {i < FUNNEL_CARDS.length - 1 && (
                    <div className="hidden sm:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#1F396D]/15 shadow items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-[#F16112]" aria-hidden />
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#self-check-form"
              className="inline-flex items-center gap-2 bg-[#F16112] hover:bg-[#d54f0a] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
            >
              Identify My Child&apos;s Blocker →
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-[#1F396D]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
              <Badge className="bg-white/10 text-white border-white/20 border font-bold uppercase tracking-widest text-xs">
                Parent Stories
              </Badge>
              <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What parents found — and fixed.
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              No generic praise. Every parent below can tell you the exact pattern that was found and what changed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ outcome, pattern, quote, meta, initials, avatarBg }) => (
              <div
                key={meta}
                className="bg-white/[0.07] border border-white/[0.12] rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/[0.10] transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Outcome box — solid orange, high contrast */}
                <div className="bg-[#F16112] rounded-lg px-3 py-2.5">
                  <p className="font-bold text-sm text-white leading-snug">{outcome}</p>
                </div>

                {/* Pattern tag */}
                <span className="inline-block self-start text-[11px] font-semibold bg-white/[0.10] text-white/70 px-2.5 py-1 rounded-full border border-white/[0.15]">
                  Pattern found: {pattern}
                </span>

                {/* Quote with large opening mark */}
                <div className="flex-1 relative">
                  <span className="absolute -top-2 -left-1 text-4xl font-serif text-[#F16112]/40 leading-none select-none" aria-hidden>
                    &ldquo;
                  </span>
                  <p className="text-sm text-white/75 leading-relaxed pt-3 pl-2">
                    {quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-1 border-t border-white/[0.10]">
                  <div className={`w-8 h-8 rounded-full ${avatarBg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[11px] font-bold text-white">{initials}</span>
                  </div>
                  <p className="text-xs text-white/50 font-semibold">{meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-[#FFF3EE]">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
            <span className="text-[11px] font-bold text-[#F16112] uppercase tracking-widest">Start Free</span>
            <span className="block w-6 h-[3px] rounded-full bg-[#F16112]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
            Know exactly what to fix before the school year starts.
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Free · No password · Grades 3–8 · Diagnosis in your inbox in minutes
          </p>
          <a
            href="#self-check-form"
            className="inline-flex items-center gap-2 bg-[#F16112] hover:bg-[#d54f0a] text-white font-bold px-9 py-4 rounded-xl text-base transition-colors shadow-lg hover:shadow-xl"
          >
            Find What&apos;s Blocking My Child →
            <ArrowRight className="w-4 h-4" aria-hidden />
          </a>
          <p className="text-xs text-gray-400 pt-1">
            Joined by 47+ Tri-Valley families · No spam · Unsubscribe anytime
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FAQs
      ══════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white border-t border-[#1F396D]/10">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-xl font-bold text-[#1F396D] text-center mb-8">FAQs</h2>
          {[
            {
              q: "What exactly is a 'gap pattern' in math?",
              a: "A gap pattern is a specific, repeating mistake a student makes because of a missing foundational skill. It is not a random careless error. If a student gets five fraction problems wrong in a row for the exact same reason, they have a gap pattern.",
            },
            {
              q: 'How can I tell the difference between a silly mistake and a gap pattern?',
              a: 'Look at the data over a week. A silly mistake is a one-off brain fart (like 2+3=6 on one problem, but 2+3=5 on the next). A gap pattern happens consistently across multiple worksheets, quizzes, and homework assignments.',
            },
            {
              q: "Why do students constantly make the 'Column Drift' (place value) mistake?",
              a: 'This pattern usually happens due to poor fine motor skills or rushing. Students try to write quickly, their handwriting gets messy, and they accidentally add a number in the ones column to a number in the tens column.',
            },
            {
              q: "How can I quickly fix 'Column Drift' without buying new materials?",
              a: 'Turn a standard piece of lined notebook paper sideways (90 degrees). The horizontal blue lines will now become vertical columns. Have the student write one digit per column to keep their math perfectly aligned.',
            },
            {
              q: 'Why does my student keep solving equations strictly from left to right?',
              a: "This is the 'Left-to-Right Rush.' Students are trained to read books from left to right, so they naturally try to read math the same way. They forget that the order of operations (PEMDAS/BODMAS) overrides reading rules.",
            },
            {
              q: 'What is the easiest trick to get kids to remember PEMDAS?',
              a: 'Have them preview the problem like a detective. Before they solve anything, they must use a yellow highlighter to find and highlight all multiplication and division symbols. This forces them to pause and do those parts first.',
            },
            {
              q: "Why do fractions cause the 'Numerator/Denominator Flip' pattern?",
              a: 'Kids treat fractions like two separate whole numbers sitting on top of each other rather than one single value. Because 8 is greater than 2, their brain instantly tells them that 1/8 is greater than 1/2, ignoring the reality of how fractions work.',
            },
            {
              q: 'How do I correct the fraction gap pattern using real-world items?',
              a: "Stop using abstract numbers and use money or food. Ask them: 'Would you rather have 1 out of 2 slices of a pizza, or 1 out of 8 slices?' Visualizing the actual size of the pieces instantly corrects the misconception.",
            },
            {
              q: 'My student keeps dropping negative signs in algebra. How do I stop this?',
              a: "This is the 'Sign Flip' pattern. Have them draw a physical wall or use an explicit multiplier. Change a problem like -(x + 4) to -1 * (x + 4), and force them to draw arrows from the -1 to both terms inside the parentheses before multiplying.",
            },
            {
              q: 'How long does it take to break one of these 5 gap patterns?',
              a: 'It usually takes 2 to 3 weeks of targeted daily practice. You cannot just tell them the rule once; you must enforce the visual habit (like using graph paper or highlighters) until their brain builds a new pathway.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
              <p className="font-semibold text-[#1F396D] text-sm mb-1.5 flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#F16112] inline-block" />
                {q}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed pl-3.5">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
