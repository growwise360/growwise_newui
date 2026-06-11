'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FUTURE_SKILLS_HUB_FAQS } from '@/data/future-skills-hub-faqs';

export function FutureSkillsHubFaqSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Parent questions</p>
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">FAQ</h2>
        <Accordion type="multiple" className="mt-8 w-full">
          {FUTURE_SKILLS_HUB_FAQS.map((item, index) => (
            <AccordionItem key={item.question} value={`hub-faq-${index}`} className="border-[#1F396D]/10">
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
