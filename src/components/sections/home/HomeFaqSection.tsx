'use client';

import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HOME_ACADEMIC_FAQS, HOME_STEAM_FAQS } from '@/lib/home/homeFaqCopy';
import type { FAQItem } from '@/components/schema/FAQSchema';

function FaqGroup({
  idPrefix,
  label,
  faqs,
}: {
  idPrefix: string;
  label: string;
  faqs: FAQItem[];
}) {
  const defaultOpen = [`${idPrefix}-0`];

  return (
    <div className="home-faq-group">
      <h3 className="home-faq-group-label">{label}</h3>
      <div className="home-faq-accordion-wrap">
        <Accordion type="multiple" className="w-full" defaultValue={defaultOpen}>
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={faq.question}
              value={`${idPrefix}-${idx}`}
              className="home-faq-item"
            >
              <AccordionTrigger className="home-faq-trigger hover:no-underline">
                <span className="home-faq-trigger-inner">
                  <span className="home-faq-icon" aria-hidden>
                    <HelpCircle className="h-4 w-4 text-[#F16112]" />
                  </span>
                  <span className="home-faq-question">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="home-faq-answer">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export function HomeFaqSection() {
  return (
    <section className="home-section-faq" aria-labelledby="home-faq-heading">
      <div className="home-section-inner home-faq-inner">
        <h2 id="home-faq-heading" className="home-section-h2 home-faq-h2">
          Frequently Asked Questions
        </h2>

        <FaqGroup idPrefix="steam" label="Coding & AI Programs" faqs={HOME_STEAM_FAQS} />
        <FaqGroup idPrefix="academic" label="Academic Tutoring" faqs={HOME_ACADEMIC_FAQS} />
      </div>
    </section>
  );
}
