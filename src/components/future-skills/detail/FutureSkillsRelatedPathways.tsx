'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { publicPath } from '@/lib/publicPath';
import { getRelatedFutureSkillsPathways, type FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsRelatedPathwaysProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsRelatedPathways({ pathway }: FutureSkillsRelatedPathwaysProps) {
  const locale = useLocale();
  const related = getRelatedFutureSkillsPathways(pathway.slug);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">Other pathways students explore</h2>
        <div className="mt-8 grid gap-4">
          {related.map((relatedPathway) => {
            const Icon = relatedPathway.icon;
            return (
              <Link
                key={relatedPathway.slug}
                href={publicPath(relatedPathway.href, locale)}
                className="group flex items-center gap-4 rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-5 transition hover:border-[#F16112]/40 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1F396D] text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#F16112]">{relatedPathway.eyebrow}</p>
                  <p className="text-lg font-bold text-gray-950">{relatedPathway.shortTitle}</p>
                  <p className="text-sm text-gray-600">{relatedPathway.bestFor}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#F16112] transition group-hover:translate-x-1" aria-hidden />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
