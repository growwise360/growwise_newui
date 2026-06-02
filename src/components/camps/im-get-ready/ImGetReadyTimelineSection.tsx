import { BookOpen, CheckCircle2, Clock, Search } from 'lucide-react';
import { SectionContainer } from '@/components/camps/SectionContainer';
import { cn } from '@/lib/utils';
import type { ImGetReadySeoLandingCopy } from '@/lib/im-get-ready-seo-landing-copy';

const STEP_ICONS = [Clock, BookOpen, Search, CheckCircle2] as const;

const STEP_THEMES = [
  {
    card: 'border-[#1F396D]/20 bg-gradient-to-br from-[#1F396D]/5 via-white to-white',
    icon: 'bg-[#1F396D]/12 text-[#1F396D]',
  },
  {
    card: 'border-[#F16112]/25 bg-gradient-to-br from-[#F16112]/10 via-white to-white',
    icon: 'bg-[#F16112]/12 text-[#F16112]',
  },
  {
    card: 'border-[#1F396D]/20 bg-gradient-to-br from-[#1F396D]/5 via-white to-white',
    icon: 'bg-[#1F396D]/12 text-[#1F396D]',
  },
  {
    card: 'border-[#F16112]/25 bg-gradient-to-br from-[#F16112]/10 via-white to-white',
    icon: 'bg-[#F16112]/12 text-[#F16112]',
  },
] as const;

type ImGetReadyTimelineSectionProps = {
  howItWorks: ImGetReadySeoLandingCopy['howItWorks'];
};

export function ImGetReadyTimelineSection({ howItWorks }: ImGetReadyTimelineSectionProps) {
  return (
    <SectionContainer id="how-it-works" className="scroll-mt-28 border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="font-heading text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
          {howItWorks.title}
        </h2>
        <ol
          className="mt-10 grid gap-5 lg:grid-cols-4 lg:gap-4"
          aria-label={howItWorks.stepsAriaLabel}
        >
          {howItWorks.steps.map((step, index) => {
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
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                    {step.text}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionContainer>
  );
}
