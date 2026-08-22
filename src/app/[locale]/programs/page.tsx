"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getDefaultOpenFaqValues } from "@/lib/faq-accordion";
import { HelpCircle } from "lucide-react";
import { PROGRAMS_FAQS } from '@/data/programs-faqs';
import { publicPath } from '@/lib/publicPath';
import { Button } from '@/components/ui/button';

export default function ProgramsPage() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const createLocaleUrl = (path: string) => publicPath(path, locale);
  
  return (
    <main className="section-base section-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="title-section mb-6">{t('programs')}</h1>
        <p className="subtitle-sm mb-6">
          Explore our academic and STEAM offerings — and{' '}
          <Link href={createLocaleUrl('/camps/summer')} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
            see summer camp programs
          </Link>{' '}
          for seasonal intensives in Dublin.
        </p>
        <div className="mb-10 rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6">
          <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">Which page should I use?</p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700">
            <li>
              <strong className="text-[#1F396D]">Coding & STEAM</strong> — foundations, trial classes, and project-based
              learning for families still exploring.
            </li>
            <li>
              <strong className="text-[#1F396D]">Future Skills</strong> — structured certification pathways with placement,
              optional external exams, and on-site Certiport testing in Dublin when ready.
            </li>
          </ul>
        </div>
        <div className="mb-10 flex flex-col sm:flex-row gap-4">
          <Button asChild className="rounded-full bg-[#F16112] hover:bg-[#F1894F] text-white px-8 py-6 text-base font-semibold">
            <Link href={createLocaleUrl('/book-assessment')}>Book Free Assessment</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-[#1F396D] text-[#1F396D] px-8 py-6 text-base font-semibold">
            <Link href={createLocaleUrl('/enroll')}>Enroll Now</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link href={createLocaleUrl('/academic')} className="card-base card-padding hover:shadow-xl rounded-xl border border-gray-100 group">
            <div className="text-strong text-lg mb-2">Academic</div>
            <div className="text-muted mb-4">Grades 3–12 Math and English programs</div>
            <span className="text-[#F16112] font-semibold group-hover:underline">Explore academic programs →</span>
          </Link>
          <Link href={createLocaleUrl('/steam')} className="card-base card-padding hover:shadow-xl rounded-xl border border-gray-100 group">
            <div className="text-strong text-lg mb-2">STEAM</div>
            <div className="text-muted mb-4">ML/AI, game development, and exploratory STEAM classes</div>
            <span className="text-[#F16112] font-semibold group-hover:underline">Explore STEAM programs →</span>
          </Link>
          <Link href={createLocaleUrl('/future-skills')} className="card-base card-padding hover:shadow-xl rounded-xl border border-gray-100 group">
            <div className="text-strong text-lg mb-2">Future Skills</div>
            <div className="text-muted mb-4">Grades 5-12 certification pathways — assessment-first, optional external exams</div>
            <span className="text-[#F16112] font-semibold group-hover:underline">Explore Future Skills →</span>
          </Link>
        </div>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="text-[#F16112]">Questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Learn more about our programs and find the right fit for your child.
              </p>
            </div>

            <Accordion
              type="multiple"
              className="space-y-4"
              defaultValue={getDefaultOpenFaqValues(PROGRAMS_FAQS.length, (index) => `item-${index}`)}
            >
              {PROGRAMS_FAQS.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F16112]/10 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-[#F16112]" />
                      </div>
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </main>
  );
}


