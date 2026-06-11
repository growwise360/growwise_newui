'use client';

import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import { useLocale } from 'next-intl';

import { publicPath } from '@/lib/publicPath';
import { getFutureSkillsPathway, type FutureSkillsSlug } from '@/lib/futureSkillsPathways';

interface CodingCertPathwayBannerProps {
  slug: FutureSkillsSlug;
}

export function CodingCertPathwayBanner({ slug }: CodingCertPathwayBannerProps) {
  const locale = useLocale();
  const pathway = getFutureSkillsPathway(slug);

  if (!pathway) {
    return null;
  }

  const assessmentHref = publicPath(`/book-assessment?interest=future-skills-${slug}`, locale);

  return (
    <section className="px-4 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#1F396D]/10 bg-[#1F396D] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Award className="h-4 w-4 text-[#F8B34C]" aria-hidden />
              Future Skills certification pathway
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">Ready for optional external credentials?</h2>
            <p className="mt-3 text-base leading-7 text-white/80">
              This coding page is for foundations and trial classes. The {pathway.shortTitle} certification pathway adds
              structured levels, portfolio review, and optional Certiport or third-party exam prep when your child is ready.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[240px]">
            <Link
              href={publicPath(pathway.href, locale)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white transition hover:bg-[#d9550f]"
            >
              View certification pathway
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={assessmentHref}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              Book a pathway assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
