'use client';

import { usePathname } from 'next/navigation';
import { ENABLED_LOCALES } from '@/i18n/localeConfig';
import { HomeCampsStrip } from './HomeCampsStrip';

function isHomePath(pathname: string): boolean {
  if (pathname === '/') return true;
  return ENABLED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname === `/${locale}/`,
  );
}

export function HomeCampsStripSlot() {
  const pathname = usePathname();
  if (!isHomePath(pathname)) return null;
  return <HomeCampsStrip />;
}
