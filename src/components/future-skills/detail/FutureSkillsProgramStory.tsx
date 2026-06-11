import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsProgramStoryProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsProgramStory({ pathway }: FutureSkillsProgramStoryProps) {
  return (
    <section className="px-4 py-16 md:py-20">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">{pathway.programLabel}</p>
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">What your child builds at each stage</h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-gray-600">
          {pathway.programStory.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
