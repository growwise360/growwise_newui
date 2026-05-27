import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import { MathHubSection } from './MathHubSection';

export function HowItWorksSteps() {
  const { howItWorks } = MATH_HUB_COPY;

  return (
    <MathHubSection
      label={howItWorks.sectionLabel}
      heading={howItWorks.heading}
      className="bg-white"
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
          >
            <span
              className="font-heading flex h-9 w-9 items-center justify-center rounded-full bg-[#1F396D] text-sm font-bold text-white"
              aria-hidden
            >
              {index + 1}
            </span>
            <h3 className="font-heading mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </MathHubSection>
  );
}
