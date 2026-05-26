'use client';

import Link from 'next/link';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import type { ImGetReadyNavItemCopy } from '@/lib/im-get-ready-seo-landing-copy';

type ImGetReadyLandingNavProps = {
  locale: string;
  brandLabel: string;
  items: readonly ImGetReadyNavItemCopy[];
  ctaLabel: string;
  reserveHref: string;
};

function NavLink({
  item,
  locale,
}: {
  item: ImGetReadyNavItemCopy;
  locale: string;
}) {
  const className =
    'whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-[#1F396D]/5 hover:text-[#1F396D] sm:px-3 sm:py-1.5 sm:text-sm';

  if (item.type === 'route') {
    return (
      <Link href={createLocaleUrl(item.href, locale)} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  );
}

export function ImGetReadyLandingNav({
  locale,
  brandLabel,
  items,
  ctaLabel,
  reserveHref,
}: ImGetReadyLandingNavProps) {
  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[var(--header-height,4rem)] z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/90"
    >
      <div className="mx-auto flex max-w-[1100px] items-center gap-2 px-4 py-2 sm:gap-3 sm:px-6 sm:py-2.5 lg:px-8">
        <p className="hidden shrink-0 font-heading text-sm font-bold text-[#1F396D] md:block">
          {brandLabel}
        </p>
        <div className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center gap-0.5 sm:gap-1 md:gap-2" role="list">
            {items.map((item) => (
              <li key={item.label} className="shrink-0">
                <NavLink item={item} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={reserveHref}
          aria-label={ctaLabel}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#F16112] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <span className="sm:hidden">Reserve</span>
          <span className="hidden sm:inline">{ctaLabel}</span>
        </Link>
      </div>
    </nav>
  );
}
