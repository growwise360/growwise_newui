'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { publicPath } from '@/lib/publicPath';

export function CodingFutureSkillsCallout() {
  const locale = useLocale();

  return (
    <section className="px-4 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#1F396D]/10 bg-white p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">Looking for certification pathways?</p>
        <h2 className="mt-2 text-2xl font-bold text-[#1F396D]">Future Skills is separate from these coding class pages.</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
          Coding pages are for foundations and trial classes. The STEAM catalog is for browsing and enrolling. Future
          Skills adds structured multi-level pathways with optional Adobe, Python Institute, and Certiport credentials
          when students are ready.
        </p>
        <Link
          href={publicPath('/future-skills', locale)}
          className="mt-5 inline-flex min-h-12 items-center gap-2 font-bold text-[#F16112]"
        >
          Explore Future Skills pathways
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
