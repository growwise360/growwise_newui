import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

import { CONTACT_INFO } from '@/lib/constants';
import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsAdvisorCtaProps {
  pathway: FutureSkillsPathway;
  assessmentHref: string;
  onTrialClick?: () => void;
}

export function FutureSkillsAdvisorCta({ pathway, assessmentHref, onTrialClick }: FutureSkillsAdvisorCtaProps) {
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="max-w-3xl rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#1F396D] sm:text-3xl">{pathway.advisorCta.title}</h2>
        <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">{pathway.advisorCta.body}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={assessmentHref}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f] sm:w-auto"
          >
            Book a Free Assessment
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <a
            href={phoneHref}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#1F396D]/20 px-6 py-3 text-sm font-bold text-[#1F396D] transition hover:bg-white sm:w-auto"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {CONTACT_INFO.phone}
          </a>
          {onTrialClick ? (
            <button
              type="button"
              onClick={onTrialClick}
              className="min-h-11 text-sm font-semibold text-[#1F396D] underline underline-offset-2 lg:hidden"
            >
              Prefer a trial class first?
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
