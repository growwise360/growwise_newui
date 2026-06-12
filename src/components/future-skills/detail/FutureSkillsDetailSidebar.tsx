'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { FUTURE_SKILLS_PRICING_NOTE, type FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsDetailSidebarProps {
  pathway: FutureSkillsPathway;
  assessmentHref: string;
  onTrialClick: () => void;
}

export function FutureSkillsDetailSidebar({ pathway, assessmentHref, onTrialClick }: FutureSkillsDetailSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4 rounded-2xl border border-[#1F396D]/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-[#F16112]">Pathway at a glance</p>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-bold text-gray-500">Best for</dt>
            <dd className="font-semibold text-gray-900">{pathway.bestFor}</dd>
          </div>
          <div>
            <dt className="font-bold text-gray-500">Sessions</dt>
            <dd className="font-semibold text-gray-900">{pathway.sessionLength}</dd>
          </div>
          <div>
            <dt className="font-bold text-gray-500">Pricing</dt>
            <dd className="font-semibold text-gray-900">{FUTURE_SKILLS_PRICING_NOTE}</dd>
          </div>
        </dl>
        <Link
          href={assessmentHref}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d9550f]"
        >
          Book a Free Assessment
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={onTrialClick}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#1F396D]/20 px-4 py-3 text-sm font-bold text-[#1F396D] transition hover:bg-[#f8fafc]"
        >
          Book a Trial Class
        </button>
      </div>
    </aside>
  );
}
