import { BookOpen, CheckCircle2, Clock, Users } from 'lucide-react';
import copy from '@/i18n/messages/academic-summer-programs-en.json';
import { SectionContainer } from '@/components/camps/SectionContainer';
import { cn } from '@/lib/utils';

const SECTION = copy.howItWorks;

const STEP_ICONS = [Clock, BookOpen, Users, CheckCircle2] as const;

const STEP_THEMES = [
  {
    card: 'border-[#1F396D]/20 bg-gradient-to-br from-[#1F396D]/5 via-white to-white',
    icon: 'bg-[#1F396D]/12 text-[#1F396D]',
    parentLine: 'text-[#1F396D]',
  },
  {
    card: 'border-[#F16112]/25 bg-gradient-to-br from-[#F16112]/10 via-white to-white',
    icon: 'bg-[#F16112]/12 text-[#F16112]',
    parentLine: 'text-[#F16112]',
  },
  {
    card: 'border-[#1F396D]/20 bg-gradient-to-br from-[#1F396D]/5 via-white to-white',
    icon: 'bg-[#1F396D]/12 text-[#1F396D]',
    parentLine: 'text-[#1F396D]',
  },
  {
    card: 'border-[#F16112]/25 bg-gradient-to-br from-[#F16112]/10 via-white to-white',
    icon: 'bg-[#F16112]/12 text-[#F16112]',
    parentLine: 'text-[#F16112]',
  },
] as const;

const HIGHLIGHT_THEMES = [
  'border-[#1F396D]/15 bg-[#1F396D]/5',
  'border-[#F16112]/20 bg-[#F16112]/8',
  'border-[#1F396D]/15 bg-[#1F396D]/5',
  'border-[#F16112]/20 bg-[#F16112]/8',
] as const;

export function AcademicHowItWorksSection() {
  return (
    <SectionContainer id="how-it-works" className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#1F396D]">
            {SECTION.eyebrow}
          </p>
          <h2 className="font-heading mt-2 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
            {SECTION.heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">{SECTION.subheading}</p>
        </div>

        <ol className="mt-10 grid gap-5 lg:grid-cols-4 lg:gap-4" aria-label={SECTION.stepsAriaLabel}>
          {SECTION.steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? Clock;
            const theme = STEP_THEMES[index % STEP_THEMES.length];

            return (
              <li key={step.title} className="flex min-w-0 flex-col">
                <article
                  className={cn(
                    'flex h-full flex-col rounded-2xl border p-5 shadow-sm md:p-6',
                    theme.card,
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                        theme.icon,
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                        {step.stepLabel}
                      </p>
                      <h3 className="font-heading mt-1 text-base font-bold leading-snug text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className={cn('mt-4 text-sm font-semibold leading-snug', theme.parentLine)}>
                    {step.parentLine}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                    {step.detail}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>

        <ul
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-label={SECTION.highlightsAriaLabel}
        >
          {SECTION.highlights.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                'rounded-xl border px-4 py-3 text-center',
                HIGHLIGHT_THEMES[index % HIGHLIGHT_THEMES.length],
              )}
            >
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="mt-1 text-xs leading-snug text-slate-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
}
