'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getFooterTrustBadges } from '@/data/footerTrustBadges';
import { isCampSeoLandingPath } from '@/lib/camps/camp-seo-landing-slugs';
import { ENABLED_LOCALES } from '@/i18n/localeConfig';

function isHomePath(pathname: string): boolean {
  if (pathname === '/') return true;
  return ENABLED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname === `/${locale}/`,
  );
}

function shouldShowAllTrustBadges(pathname: string): boolean {
  return !isHomePath(pathname) || isCampSeoLandingPath(pathname);
}

export function hasDedicatedPartnerStrip(pathname: string): boolean {
  if (isHomePath(pathname)) return true;

  const normalized = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
  return normalized === '/book-assessment' || normalized === '/enroll';
}

export default function FooterFindUsOn() {
  const pathname = usePathname();

  if (hasDedicatedPartnerStrip(pathname)) return null;

  const badges = getFooterTrustBadges(!shouldShowAllTrustBadges(pathname));

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-500 mb-4">Find Us On</p>
      <div className="grid grid-cols-3 gap-3 items-center justify-items-center md:flex md:flex-wrap md:justify-center md:items-center md:gap-6">
        {badges.map((badge) => (
          <a
            key={badge.id}
            href={badge.href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center justify-center w-full min-w-0 min-h-[44px] md:w-auto"
          >
            <Image
              src={badge.imageSrc}
              alt={badge.imageAlt}
              width={120}
              height={60}
              unoptimized={badge.unoptimized}
              sizes="(max-width: 768px) 33vw, 120px"
              className="h-[60px] w-auto max-w-full object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
