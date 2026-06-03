import Link from 'next/link';
import copy from '@/i18n/messages/summer-camp-canonical-en.json';
import { createLocaleUrl } from '@/components/layout/Header/utils';

const TEASER = copy.conversion;

type HighSchoolSummerIntensiveTeaserBandProps = {
  locale: string;
};

export function HighSchoolSummerIntensiveTeaserBand({ locale }: HighSchoolSummerIntensiveTeaserBandProps) {
  const headingId = 'summer-hs-intensive-teaser-heading';
  const href = createLocaleUrl(TEASER.hsSummerIntensiveTeaserHref, locale);

  return (
    <aside
      className="mb-6 overflow-hidden rounded-lg border-[1.5px] border-[#1F396D]/35 bg-gradient-to-br from-[#eff6ff] via-white to-[#fff7ed]"
      aria-labelledby={headingId}
    >
      <div className="px-4 pb-2.5 pt-3.5">
        <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-full bg-[#1F396D] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white">
            {TEASER.hsSummerIntensiveTeaserBadge}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1F396D]">
            {TEASER.hsSummerIntensiveTeaserEyebrow}
          </span>
        </div>
        <p id={headingId} className="mb-1 text-[13px] font-semibold text-[#1F396D]">
          {TEASER.hsSummerIntensiveTeaserHeading}
        </p>
        <p className="mb-3 text-[11px] leading-snug text-slate-600">
          {TEASER.hsSummerIntensiveTeaserSubhead}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="High school summer intensive courses">
          {TEASER.hsSummerIntensiveTeaserPills.map((pill) => (
            <li
              key={pill}
              className="rounded-full border border-[#1F396D]/25 bg-white px-2.5 py-0.5 text-[10px] text-[#1F396D]"
            >
              {pill}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-stretch justify-between gap-2 border-t border-[#1F396D]/20 bg-white/60 px-4 py-2.5 sm:flex-row sm:items-center">
        <p className="text-[11px] text-slate-600">{TEASER.hsSummerIntensiveTeaserFooter}</p>
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md bg-[#1F396D] px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#162850] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2 sm:w-auto"
        >
          {TEASER.hsSummerIntensiveTeaserCta}
        </Link>
      </div>
    </aside>
  );
}
