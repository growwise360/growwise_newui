import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsCourseFormatProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsCourseFormat({ pathway }: FutureSkillsCourseFormatProps) {
  return (
    <section className="px-4 py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">Course format</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">{pathway.courseFormat}</p>
      </div>
    </section>
  );
}
