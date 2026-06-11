import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsClosingCtaProps {
  pathway: FutureSkillsPathway;
  assessmentHref: string;
}

export function FutureSkillsClosingCta({ pathway, assessmentHref }: FutureSkillsClosingCtaProps) {
  return (
    <section
      id="future-skills-closing-cta"
      className="scroll-mt-4 bg-[#07162f] px-4 py-12 text-white sm:py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-[#F8B34C]">Next step</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">{pathway.closingCta.title}</h2>
          <p className="mt-3 text-base leading-7 text-white/75 sm:text-lg">{pathway.closingCta.body}</p>
        </div>
        <div className="w-full shrink-0 lg:w-auto">
          <Link
            href={assessmentHref}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 text-base font-bold text-white transition hover:bg-[#d9550f] lg:w-auto lg:px-8"
          >
            Book a Pathway Assessment
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
