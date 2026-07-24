import Link from 'next/link';
import copy from '@/i18n/messages/summer-camp-canonical-en.json';
import { createLocaleUrl } from '@/components/layout/Header/utils';

const TEASER = copy.conversion;

const HOMEPAGE_HEADING = 'New · Academic Summer Programs';
const HOMEPAGE_SUBTEXT =
  'Daily reading, writing & math sprints · Grades 1–10 · From $249 · Starts June 15';

type AcademicSummerProgramsTeaserBandProps = {
  locale: string;
  variant?: 'summer' | 'homepage';
};

export function AcademicSummerProgramsTeaserBand({
  locale,
  variant = 'summer',
}: AcademicSummerProgramsTeaserBandProps) {
  const isHomepage = variant === 'homepage';
  const headingId = isHomepage ? 'homepage-academic-teaser-heading' : 'summer-academic-teaser-heading';
  const href = createLocaleUrl(TEASER.academicTeaserHref, locale);

  return (
    <aside
      className={`overflow-hidden rounded-lg border-[1.5px] border-[#F16112]/40 bg-gradient-to-br from-[#fff7ed] via-white to-[#eff6ff] ${
        isHomepage ? 'mb-12' : 'mb-6'
      }`}
      aria-labelledby={headingId}
    >
      <div className={isHomepage ? 'px-6 pb-3 pt-5' : 'px-4 pb-2.5 pt-3.5'}>
        {!isHomepage ? (
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-[#F16112] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white">
              {TEASER.academicTeaserBadge}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1F396D]">
              {TEASER.academicTeaserEyebrow}
            </span>
          </div>
        ) : null}
        <p
          id={headingId}
          className={
            isHomepage
              ? 'mb-2 text-lg font-semibold text-[#1F396D] sm:text-xl'
              : 'mb-1 text-[13px] font-semibold text-[#1F396D]'
          }
        >
          {isHomepage ? HOMEPAGE_HEADING : TEASER.academicTeaserHeading}
        </p>
        <p
          className={
            isHomepage
              ? 'text-sm leading-relaxed text-slate-600 sm:text-base'
              : 'mb-3 text-[11px] leading-snug text-slate-600'
          }
        >
          {isHomepage ? HOMEPAGE_SUBTEXT : TEASER.academicTeaserSubhead}
        </p>
        {!isHomepage ? (
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
        ) : null}
      </div>
      <div
        className={`flex flex-col items-stretch justify-between gap-2 border-t border-[#F16112]/25 bg-white/60 sm:flex-row sm:items-center ${
          isHomepage ? 'px-6 py-3.5 sm:justify-end' : 'px-4 py-2.5'
        }`}
      >
        {!isHomepage ? (
          <p className="text-[11px] text-slate-600">{TEASER.academicTeaserFooter}</p>
        ) : null}
        <Link
          href={href}
          className={`inline-flex w-full items-center justify-center whitespace-nowrap rounded-md bg-[#F16112] font-semibold text-white transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto ${
            isHomepage ? 'px-4 py-2 text-sm' : 'px-3.5 py-1.5 text-[11px]'
          }`}
        >
          {TEASER.academicTeaserCta}
        </Link>
      </div>
    </aside>
  );
}
