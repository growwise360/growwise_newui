import { CheckCircle2 } from 'lucide-react';

import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsLearningOutcomesProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsLearningOutcomes({ pathway }: FutureSkillsLearningOutcomesProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">You&apos;ll learn to</h2>
        <ul className="mt-8 space-y-4">
          {pathway.learningOutcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
              <span className="text-lg leading-8 text-gray-700">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
