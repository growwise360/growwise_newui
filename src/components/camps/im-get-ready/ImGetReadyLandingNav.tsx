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
    'whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-[#1F396D]/5 hover:text-[#1F396D]';

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
      className="sticky top-[var(--header-height,5rem)] z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1100px] items-center gap-3 px-5 py-3 sm:px-8 lg:px-16">
        <p className="hidden shrink-0 font-heading text-sm font-bold text-[#1F396D] sm:block md:text-base">
          {brandLabel}
        </p>
        <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center gap-1 md:gap-2" role="list">
            {items.map((item) => (
              <li key={item.label}>
                <NavLink item={item} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={reserveHref}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#F16112] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:px-4 sm:text-sm"
        >
          {ctaLabel}
        </Link>
      </div>
    </nav>
  );
}
