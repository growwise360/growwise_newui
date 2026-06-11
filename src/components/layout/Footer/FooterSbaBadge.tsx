import { Award, ShieldCheck } from 'lucide-react';

import { CERTIPORT_ATC_DISPLAY } from '@/lib/futureSkillsPathways';

export default function FooterSbaBadge() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <div
        className="inline-flex items-center gap-2.5 rounded-full border border-[#1F396D]/12 bg-white/70 px-4 py-2 shadow-[0_2px_12px_rgba(31,57,109,0.08)] ring-1 ring-white/60 backdrop-blur-sm"
        role="img"
        aria-label="SBA-Certified Women-Owned Business"
      >
        <Award className="h-4 w-4 shrink-0 text-[#F16112]" aria-hidden strokeWidth={2.25} />
        <p className="m-0 text-left text-xs leading-snug text-gray-600 sm:text-sm">
          <span className="font-semibold text-[#1F396D]">SBA-Certified Women-Owned</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Business</span>
        </p>
      </div>
      <div
        className="inline-flex items-center gap-2.5 rounded-full border border-[#1F396D]/12 bg-white/70 px-4 py-2 shadow-[0_2px_12px_rgba(31,57,109,0.08)] ring-1 ring-white/60 backdrop-blur-sm"
        role="img"
        aria-label={CERTIPORT_ATC_DISPLAY}
      >
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#F16112]" aria-hidden strokeWidth={2.25} />
        <p className="m-0 text-left text-xs leading-snug text-gray-600 sm:text-sm">
          <span className="font-semibold text-[#1F396D]">Certiport Authorized Testing Center</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">ID 90097702 · Dublin, CA</span>
        </p>
      </div>
    </div>
  );
}
