import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  Users,
  RefreshCw,
  FileText,
  BookOpen,
  Zap,
  ChevronRight,
} from 'lucide-react';
import SelfCheckFormClient from '@/components/SelfCheckFormClient';
import ErrorBanner from '@/components/ErrorBanner';

/* ─── Data ──────────────────────────────────────────────────────────── */

const MINI_LOOP = [
  'Self-Check',
  'Pattern Result',
  'Teacher Validation',
  'Gap Fixer',
  'Recheck',
];

const LOOP_STEPS = [
  {
    icon: BarChart3,
    label: 'Free Self-Check',
    sub: "Child takes an 8-question math quiz — no login needed.",
    color: 'bg-[#1F396D]',
    num: '01',
  },
  {
    icon: FileText,
    label: 'Mistake Pattern Result',
    sub: "You see exactly what's breaking down: rushing, skipped steps, or a true gap.",
    color: 'bg-[#F16112]',
    num: '02',
  },
  {
    icon: Users,
    label: 'Teacher Workshop',
    sub: 'A GrowWise teacher validates the gap in a 45-min in-person session.',
    color: 'bg-[#1F396D]',
    num: '03',
  },
  {
    icon: BookOpen,
    label: 'Parent Gap Report',
    sub: 'Written plan: what the gap is, why it formed, and how to close it.',
    color: 'bg-[#F16112]',
    num: '04',
  },
  {
    icon: Zap,
    label: '4-Week Gap Fixer',
    sub: 'Four targeted sessions close the top 2–3 patterns before fall.',
    color: 'bg-[#1F396D]',
    num: '05',
  },
  {
    icon: RefreshCw,
    label: 'Progress Recheck',
    sub: 'Recheck confirms the gap is gone before the new school year starts.',
    color: 'bg-[#F16112]',
    num: '06',
  },
];

const FUNNEL_CARDS = [
  {
    emoji: '🔍',
    step: 'Step 1',
    title: 'Free Self-Check',
    body: 'Identifies possible mistake patterns from an 8-question quiz. No teacher needed yet — just signal.',
    badge: 'Free',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    emoji: '🧑‍🏫',
    step: 'Step 2',
    title: 'Teacher Workshop',
    body: 'Validates whether the gaps are real. Eliminates false positives. Produces the written Parent Gap Report.',
    badge: 'Free',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    emoji: '⚡',
    step: 'Step 3',
    title: '4-Week Gap Fixer',
    body: 'Targets the top 2–3 confirmed patterns in four structured sessions before fall starts.',
    badge: 'Paid program',
    badgeClass: 'bg-[#1F396D]/10 text-[#1F396D] border-[#1F396D]/20',
  },
];

const MISTAKE_PATTERNS = [
  {
    emoji: '⚡',
    title: 'Rushing Pattern',
    body: 'Child knows the concept but skips steps under time pressure — produces careless errors that look like knowledge gaps.',
  },
  {
    emoji: '📋',
    title: 'Skipped-Step Pattern',
    body: 'Jumps from the problem to the answer, missing the intermediate work — correct answer is luck, not method.',
  },
  {
    emoji: '🧱',
    title: 'Weak Basics',
    body: 'A foundational concept from a prior grade was never fully locked in — every new topic built on it wobbles.',
  },
  {
    emoji: '❓',
    title: 'Question Misread',
    body: 'Reads too fast and answers the wrong question — the math skill is fine but comprehension breaks first.',
  },
  {
    emoji: '🔄',
    title: 'Wrong Method',
    body: 'Has memorised a shortcut that works in easy cases but fails the harder problems on a real test.',
  },
  {
    emoji: '🕳️',
    title: 'Concept Gap',
    body: 'A specific concept was genuinely never understood — no amount of practice helps until it is re-taught correctly.',
  },
];

const AFTER_STEPS = [
  {
    number: '01',
    title: 'You get the Pattern Result',
    body: 'Within minutes, you see whether the issue is a rushing habit, skipped steps, or a true concept gap — with the risk level for the upcoming grade.',
  },
  {
    number: '02',
    title: 'Teacher Workshop Validation',
    body: 'A GrowWise teacher sits with your child for 45 minutes to confirm the pattern, rule out false positives, and build the exact intervention plan.',
  },
  {
    number: '03',
    title: 'Parent Gap Report',
    body: 'You walk out with a written report: what the gap is, why it formed, and the week-by-week plan to close it before it compounds.',
  },
  {
    number: '04',
    title: '4-Week Gap Fixer',
    body: 'Four focused sessions, each targeting one layer of the gap — from re-teaching the concept to embedding the correct method under test pressure.',
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

  return (
    <main className="min-h-screen page-bg-coding">

        {errorMessage && <ErrorBanner message={errorMessage} />}

        {/* ══════════════════════════════════════════
            1. HERO — H1 + mini loop + form + sample result
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
                Find Out Why Your Child Keeps Making the Same Math Mistakes
              </h1>

              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                Most parents see the symptoms — wrong answers, lost marks, test anxiety. Few know
                the actual cause. In 5 minutes, GrowWise identifies the exact mistake pattern and
                emails you a personalized report. Not a score. A diagnosis.
              </p>

              {/* Mini loop */}
              <div className="flex flex-wrap items-center gap-1 text-xs font-semibold text-[#1F396D]">
                {MINI_LOOP.map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="bg-[#1F396D]/[0.07] px-2.5 py-1 rounded-full whitespace-nowrap">{step}</span>
                    {i < MINI_LOOP.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-[#F16112] flex-shrink-0" aria-hidden />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {[
                  { Icon: CheckCircle, text: 'Free — no credit card' },
                  { Icon: Clock,       text: 'Under 10 minutes' },
                  { Icon: ShieldCheck, text: 'Report emailed to you' },
                  { Icon: ShieldCheck, text: 'No password needed' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icon className="w-3.5 h-3.5 text-[#F16112] flex-shrink-0" aria-hidden />
                    {text}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Parents from Dublin, Pleasanton and San Ramon have used this to finally
                understand what their child&apos;s teacher couldn&apos;t explain.
              </p>

              {/* Form card */}
              <div
                id="self-check-form"
                className="bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(31,57,109,0.2)] ring-1 ring-[#1F396D]/10 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#1F396D] to-[#29335C] px-5 py-3.5">
                  <p className="text-white font-bold text-sm">Find My Child&apos;s Mistake Pattern</p>
                  <p className="text-white/60 text-xs mt-0.5">Personalized report emailed in minutes after the quiz</p>
                </div>
                <div className="p-5">
                  <SelfCheckFormClient />
                </div>
              </div>

              {/* Secondary CTA */}
              <a
                href="#gap-loop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F396D] hover:text-[#F16112] transition-colors"
              >
                How the Mistake Pattern Report works →
                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </a>
            </div>

            {/* Right — Sample Report Email Preview */}
            <div className="lg:pt-4 hidden md:block">
              <p className="text-[11px] font-bold text-[#E87722] uppercase tracking-[2px] mb-2 text-center">
                Sample Report Email
              </p>
              <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden w-full">

                {/* A) Header strip */}
                <div className="bg-[#1F396D] px-5 py-4">
                  <p className="text-white font-bold text-base">Mistake Detective Report</p>
                  <p className="text-white/80 text-[13px] mt-0.5">Analysis for Alex · Grade 5</p>
                </div>

                {/* B) Score block */}
                <div className="px-5 py-4">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                      <p className="text-[#1F396D] font-bold text-[28px] leading-none">8</p>
                      <p className="text-gray-400 text-[11px] uppercase tracking-wide mt-1">Questions</p>
                    </div>
                    <div className="text-center bg-[#f0faf4] rounded-lg py-1.5">
                      <p className="text-[#22863a] font-bold text-[28px] leading-none">5</p>
                      <p className="text-gray-400 text-[11px] uppercase tracking-wide mt-1">Correct</p>
                    </div>
                    <div className="text-center bg-[#fff5f5] rounded-lg py-1.5">
                      <p className="text-[#c0392b] font-bold text-[28px] leading-none">3</p>
                      <p className="text-gray-400 text-[11px] uppercase tracking-wide mt-1">To Review</p>
                    </div>
                  </div>
                  <div className="w-full bg-[#eee] rounded h-1.5">
                    <div className="bg-[#1F396D] rounded h-1.5" style={{ width: '62%' }} />
                  </div>
                  <p className="text-right text-[11px] text-gray-400 mt-1">
                    62% score ·{' '}
                    <span className="text-[#c0392b]">Below 80% threshold</span>
                  </p>
                </div>

                {/* C) Pattern card */}
                <div className="px-5 pb-4">
                  <p className="text-[10px] text-[#1F396D] uppercase tracking-[1.5px] font-semibold">
                    Pattern Identified
                  </p>
                  <div className="mt-2 bg-[#FFF8F3] border-l-[3px] border-[#E87722] rounded-md px-3.5 py-2.5 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-[14px] text-gray-900">Skipped Steps</p>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                        Jumps to answer without showing full working.
                      </p>
                    </div>
                    <span className="flex-shrink-0 bg-[#E87722] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      CONFIRMED
                    </span>
                  </div>
                </div>

                {/* D) Instructor note */}
                <div className="px-5 pb-4">
                  <div className="relative bg-[#fffbf0] border-l-[3px] border-[#1F396D] rounded-md px-3.5 py-3 overflow-hidden">
                    <p className="italic text-[13px] text-[#555] leading-relaxed">
                      Alex&apos;s score suggests the gap is in how she approaches
                      multi-step problems. I&apos;d like to understand...
                    </p>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[60px]"
                      style={{ background: 'linear-gradient(transparent, white)' }}
                    />
                  </div>
                </div>

                {/* E) CTA preview */}
                <div className="bg-[#1F396D] px-5 py-5 text-center">
                  <div className="inline-block bg-[#E87722] text-white font-bold text-[14px] px-6 py-3 rounded-lg">
                    Get Alex&apos;s Personalized Plan →
                  </div>
                </div>
              </div>

              <p className="text-center text-[12px] text-[#999] mt-2">
                Your child&apos;s actual report is generated minutes after completing the quiz.
              </p>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. FULL GROWWISE GAP LOOP — 3×2 grid
        ══════════════════════════════════════════ */}
        <section id="gap-loop" className="py-14 px-4 bg-white border-y border-[#1F396D]/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <Badge className="bg-[#1F396D]/10 text-[#1F396D] border-[#1F396D]/20 border font-bold uppercase tracking-widest text-xs">
                The GrowWise Gap Loop
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
                One self-check starts the whole cycle
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Every child who takes the self-check enters a structured improvement loop —
                from pattern detection all the way to a confirmed recheck.
              </p>
            </div>

            {/* 3×2 grid — no horizontal scroll */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOOP_STEPS.map(({ icon: Icon, label, sub, color, num }) => (
                <div
                  key={num}
                  className="flex gap-3.5 p-4 rounded-2xl border border-[#1F396D]/10 bg-[#1F396D]/[0.025] hover:bg-[#1F396D]/[0.045] transition-colors"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${color} flex items-center justify-center shadow`}>
                    <Icon className="w-5 h-5 text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#F16112] uppercase tracking-widest mb-0.5">Step {num}</p>
                    <p className="text-sm font-bold text-[#1F396D] mb-0.5">{label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 text-center">
              <a
                href="#self-check-form"
                className="inline-flex items-center gap-2 bg-[#F16112] hover:bg-[#d54f0a] text-white font-bold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
              >
                Start the Self-Check
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. FROM FREE RESULT TO FIXED GAP
        ══════════════════════════════════════════ */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <Badge className="bg-[#F16112]/10 text-[#F16112] border-[#F16112]/20 border font-bold uppercase tracking-widest text-xs">
                The Funnel
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
                From Free Result to Fixed Gap
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                The self-check shows the pattern. The workshop confirms it.
                The 4-week program fixes it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
              {FUNNEL_CARDS.map(({ emoji, step, title, body, badge, badgeClass }, i) => (
                <React.Fragment key={title}>
                  <div className="relative">
                    <Card className="border border-[#1F396D]/10 h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl" aria-hidden>{emoji}</span>
                          <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${badgeClass}`}>
                            {badge}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#F16112] uppercase tracking-widest mb-0.5">{step}</p>
                          <h3 className="font-bold text-[#1F396D] text-sm mb-1">{title}</h3>
                          <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Arrow between cards on desktop */}
                    {i < FUNNEL_CARDS.length - 1 && (
                      <div className="hidden sm:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#1F396D]/15 shadow items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-[#F16112]" aria-hidden />
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="mt-9 text-center">
              <a
                href="#self-check-form"
                className="inline-flex items-center gap-2 bg-[#1F396D] hover:bg-[#162d57] text-white font-bold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
              >
                Validate the Gap in a Teacher Workshop
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. PATTERN LIBRARY
        ══════════════════════════════════════════ */}
        <section className="py-14 px-4 bg-white border-t border-[#1F396D]/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <Badge className="bg-[#1F396D]/10 text-[#1F396D] border-[#1F396D]/20 border font-bold uppercase tracking-widest text-xs">
                Pattern Library
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
                Why repeated mistakes happen
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Most parents assume wrong answers mean their child doesn&apos;t know the topic.
                Usually that&apos;s not the case — the self-check finds out exactly why.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MISTAKE_PATTERNS.map(({ emoji, title, body }) => (
                <Card
                  key={title}
                  className="border border-[#1F396D]/10 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <CardContent className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden>{emoji}</span>
                      <h3 className="font-bold text-[#1F396D] text-sm">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. WHAT HAPPENS AFTER
        ══════════════════════════════════════════ */}
        <section className="py-14 px-4 border-t border-[#1F396D]/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <Badge className="bg-[#F16112]/10 text-[#F16112] border-[#F16112]/20 border font-bold uppercase tracking-widest text-xs">
                What Happens After
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F396D]">
                The self-check is just step one
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                A free result is good. A fixed gap is better. Here&apos;s the full path.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {AFTER_STEPS.map(({ number, title, body }) => (
                <div
                  key={number}
                  className="flex gap-4 p-5 rounded-2xl border border-[#1F396D]/10 bg-[#1F396D]/[0.025]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1F396D] flex items-center justify-center text-white text-sm font-bold shadow">
                    {number}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#1F396D] text-sm">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. FAQ (SEO)
        ══════════════════════════════════════════ */}
        <section className="py-12 px-4 bg-white border-t border-[#1F396D]/10">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-xl font-bold text-[#1F396D] text-center">Common Questions</h2>
            {[
              {
                q: 'Is the Self-Check really free?',
                a: 'Yes — completely. No credit card, no password, and no hidden fees.',
              },
              {
                q: 'What grades does it cover?',
                a: 'Grades 3 through 8 for the math self-check.',
              },
              {
                q: 'What do I get at the end?',
                a: 'A Gap Snapshot: the patterns found, the risk level for the upcoming grade, and the recommended next step.',
              },
              {
                q: 'How long does the quiz take?',
                a: '8 questions — most students finish in under 10 minutes.',
              },
              {
                q: 'Is the Teacher Workshop also free?',
                a: 'Yes. The Teacher Workshop Validation is complimentary. There is no cost until you decide to enroll in the 4-Week Gap Fixer.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <p className="font-semibold text-[#1F396D] text-sm mb-1">{q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. FINAL CTA
        ══════════════════════════════════════════ */}
        <section className="py-16 px-4 bg-gradient-to-br from-[#1F396D] to-[#162d57]">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Find out what&apos;s really holding your child back
            </h2>
            <p className="text-white/70 leading-relaxed">
              Free · No password needed · Takes under 10 minutes · Grades 3–8
            </p>
            <a
              href="#self-check-form"
              className="inline-flex items-center gap-2 bg-[#F16112] hover:bg-[#d54f0a] text-white font-bold px-9 py-4 rounded-xl text-base transition-colors shadow-lg hover:shadow-xl"
            >
              Start Free Math Self-Check
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </section>

    </main>
  );
}
