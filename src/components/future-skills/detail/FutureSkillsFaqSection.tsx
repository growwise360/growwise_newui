'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FAQSchema from '@/components/schema/FAQSchema';
import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsFaqSectionProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsFaqSection({ pathway }: FutureSkillsFaqSectionProps) {
  return (
    <section className="px-4 py-16 md:py-20">
      <FAQSchema faqs={pathway.faq} />
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Parent questions</p>
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">FAQ</h2>
        <Accordion type="multiple" className="mt-8 w-full">
          {pathway.faq.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-[#1F396D]/10">
              <AccordionTrigger className="text-left text-base font-bold text-gray-950 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-gray-600">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
