import { Suspense } from 'react';
import { SeoPageFallback } from '@/components/seo/SeoPageFallback';
import { BOOK_ASSESSMENT_FAQ_JSONLD } from '@/lib/schema/course-hub-jsonld-faqs';
import BookAssessmentPageClient from './BookAssessmentPageClient';

export default function BookAssessmentPage() {
  return (
    <>
      <Suspense
        fallback={
          <SeoPageFallback
            eyebrow="Free assessment"
            title="Book a Free Math and English Assessment at GrowWise"
            description="Schedule a free GrowWise assessment for math, English, or academic readiness in Dublin, CA. Families get a clear next step before choosing tutoring or enrichment."
            links={[
              { href: '/academic', label: 'Explore academics' },
              { href: '/contact', label: 'Contact GrowWise' },
            ]}
          />
        }
      >
        <BookAssessmentPageClient />
      </Suspense>
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="assessment-faq-heading">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">Assessment FAQ</p>
            <h2 id="assessment-faq-heading" className="mt-2 text-2xl font-bold tracking-tight text-[#1F396D] sm:text-3xl">
              Questions parents ask before booking
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Clear answers about the free assessment, the full diagnostic, and what happens after you submit the form.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {BOOK_ASSESSMENT_FAQ_JSONLD.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">{faq.question}</h3>
                <p className="mt-2 text-base leading-7 text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
