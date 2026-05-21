import Link from 'next/link';
import copy from '@/i18n/messages/summer-camp-canonical-en.json';
import { createLocaleUrl } from '@/components/layout/Header/utils';

const TEASER = copy.conversion;

type AcademicSummerProgramsTeaserBandProps = {
  locale: string;
};

export function AcademicSummerProgramsTeaserBand({ locale }: AcademicSummerProgramsTeaserBandProps) {
  return (
    <aside
      className="mb-6 overflow-hidden rounded-lg border-[1.5px] border-[#F16112]/40 bg-gradient-to-br from-[#fff7ed] via-white to-[#eff6ff]"
      aria-labelledby="summer-academic-teaser-heading"
    >
      <div className="px-4 pb-2.5 pt-3.5">
        <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-full bg-[#F16112] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white">
            {TEASER.academicTeaserBadge}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1F396D]">
            {TEASER.academicTeaserEyebrow}
          </span>
        </div>
        <p
          id="summer-academic-teaser-heading"
          className="mb-1 text-[13px] font-semibold text-[#1F396D]"
        >
          {TEASER.academicTeaserHeading}
        </p>
        <p className="mb-3 text-[11px] leading-snug text-slate-600">{TEASER.academicTeaserSubhead}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Academic summer program tracks">
          {TEASER.academicTeaserPills.map((pill) => (
            <li
              key={pill}
              className="rounded-full border border-[#F16112]/30 bg-white px-2.5 py-0.5 text-[10px] text-[#1F396D]"
            >
              {pill}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-stretch justify-between gap-2 border-t border-[#F16112]/25 bg-white/60 px-4 py-2.5 sm:flex-row sm:items-center">
        <p className="text-[11px] text-slate-600">{TEASER.academicTeaserFooter}</p>
        <Link
          href={createLocaleUrl(TEASER.academicTeaserHref, locale)}
          className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md bg-[#F16112] px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto"
        >
          {TEASER.academicTeaserCta}
        </Link>
      </div>
    </aside>
  );
}
