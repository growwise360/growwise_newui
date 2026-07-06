import { Star, Quote, ChevronDown } from 'lucide-react';
import { siteGoogleTrustReviewCards } from '@/lib/siteGoogleTrustReviews';
import { WORKSHOP_CALENDAR_FAQS } from '@/lib/schema/workshop-calendar-faqs';

function reviewInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((w) => w.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'G'
  );
}

export default function WorkshopPageSections() {
  const testimonials = siteGoogleTrustReviewCards().slice(0, 3);

  return (
    <>
      {/* ── Trusted Parents ──────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F16112] mb-2">
              Trusted by Dublin families
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              What Parents Say About GrowWise
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Verified Google reviews from parents in Dublin, Pleasanton &amp; San Ramon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100"
              >
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-[#F16112] fill-current" aria-hidden />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="w-5 h-5 text-[#1F396D]/20 absolute -top-1 -left-1" aria-hidden />
                  <blockquote className="text-sm text-gray-700 leading-relaxed italic pl-4 line-clamp-5">
                    {t.content}
                  </blockquote>
                </div>
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-200">
                  <div
                    className="w-9 h-9 rounded-full bg-[#1F396D] flex items-center justify-center flex-shrink-0"
                    aria-hidden
                  >
                    <span className="text-white text-xs font-bold">{reviewInitials(t.name)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100 py-14 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F16112] mb-2">
              FAQ
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              Common Questions About GrowWise Workshops
            </h2>
          </div>

          <div className="space-y-3">
            {WORKSHOP_CALENDAR_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-orange-50/40 transition-colors">
                  <span className="font-semibold text-gray-800 text-sm leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="px-5 pb-4 pt-0">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
