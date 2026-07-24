import { Award, CheckCircle2, Clock } from 'lucide-react';

import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsLevelsSectionProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsLevelsSection({ pathway }: FutureSkillsLevelsSectionProps) {
  return (
    <section id="levels" className="px-4 py-16 md:py-20">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Curriculum and levels</p>
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">Four levels, each with a concrete student output.</h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Every level uses 90-minute sessions. Families can start with one level, choose a builder track, or continue through
          certification prep when the student is ready. Pricing is shared at your pathway assessment.
        </p>
      </div>
      <div className="mt-10 grid max-w-5xl gap-5">
        {pathway.levels.map((level) => (
          <article key={level.course} className="rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">{level.label}</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-950">{level.course}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-4">
                <Clock className="mb-2 h-4 w-4 text-[#F16112]" aria-hidden />
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Sessions</p>
                <p className="mt-1 font-bold text-gray-900">
                  {level.sessions} sessions / {level.hours}
                </p>
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
      <div className="mt-10 max-w-3xl rounded-2xl border border-[#1F396D]/10 bg-white p-6">
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
    </section>
  );
}
