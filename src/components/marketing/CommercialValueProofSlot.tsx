'use client';

import { CheckCircle, Clock3, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DEFAULT_LOCALE, ENABLED_LOCALES } from '@/i18n/localeConfig';
import {
  COMMERCIAL_VALUE_ROUTES,
  SITE_PROOF_LINE,
  type CommercialValueRoute,
} from '@/lib/siteProof';
import { publicPath } from '@/lib/publicPath';

function stripLocale(pathname: string): string {
  for (const locale of ENABLED_LOCALES) {
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

export function CommercialValueProofSlot() {
  const pathname = usePathname();
  const route = stripLocale(pathname) as CommercialValueRoute;
  const offer = COMMERCIAL_VALUE_ROUTES[route];
  const locale = ENABLED_LOCALES.find(
    (candidate) => pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`),
  ) ?? DEFAULT_LOCALE;

  if (!offer) return null;

  const actionHref = offer.actionHref.startsWith('#')
    ? offer.actionHref
    : publicPath(offer.actionHref, locale);

  return (
    <aside
      className="border-y border-[#1F396D]/10 bg-[#F8FAFC] px-4 py-3 text-[#1F396D]"
      aria-label="GrowWise outcome and family proof"
      data-testid="commercial-value-proof"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
        <div className="min-w-0">
          <p className="flex items-start gap-2 text-sm font-bold leading-relaxed">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
            {offer.outcome}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 pl-6 text-xs font-semibold text-slate-600">
            <span>{SITE_PROOF_LINE}</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5 text-[#F16112]" aria-hidden />
              {offer.firstResult}
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#F16112]" aria-hidden />
              No pressure to enroll
            </span>
          </div>
        </div>
        <Link
          href={actionHref}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#F16112] px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#D9540B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2"
        >
          {offer.actionLabel}
        </Link>
      </div>
    </aside>
  );
}
