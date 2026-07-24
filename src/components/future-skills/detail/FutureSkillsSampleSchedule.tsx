'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsSampleScheduleProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsSampleSchedule({ pathway }: FutureSkillsSampleScheduleProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">Sample schedule</h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">{pathway.sampleScheduleIntro}</p>
        <Accordion type="multiple" className="mt-8 w-full">
          {pathway.sampleSchedule.map((stage, index) => (
            <AccordionItem key={stage.stage} value={`stage-${index}`} className="border-[#1F396D]/10">
              <AccordionTrigger className="text-left text-lg font-bold text-gray-950 hover:no-underline">
                {stage.stage}: {stage.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pb-2">
                  {stage.sessions.map((session) => (
                    <div key={session.label} className="rounded-xl bg-[#f8fafc] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#F16112]">
                        {session.label}: {session.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-gray-600">{session.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
