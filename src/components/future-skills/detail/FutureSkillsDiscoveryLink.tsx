'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { publicPath } from '@/lib/publicPath';
import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsDiscoveryLinkProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsDiscoveryLink({ pathway }: FutureSkillsDiscoveryLinkProps) {
  const locale = useLocale();
  const { discoveryPage } = pathway;

  return (
    <section className="px-4 pb-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#1F396D]/10 bg-white p-6">
        <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">Not ready for certification yet?</p>
        <h2 className="mt-2 text-xl font-bold text-[#1F396D] sm:text-2xl">{discoveryPage.title}</h2>
        <p className="mt-3 text-base leading-7 text-gray-600">{discoveryPage.description}</p>
        <Link
          href={publicPath(discoveryPage.href, locale)}
          className="mt-5 inline-flex min-h-12 items-center gap-2 font-bold text-[#1F396D] underline underline-offset-2 hover:text-[#F16112]"
        >
          Explore {discoveryPage.title.toLowerCase()}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
