import { AVAILABLE_LOCALES } from '@/i18n/localeConfig';

/** Path prefixes where Clarity session recording must not run. */
const CLARITY_EXCLUDED_PREFIXES = [
  '/login',
  '/student-login',
  '/dashboard',
  '/checkout',
] as const;

const LOCALE_PREFIXES = new Set<string>(AVAILABLE_LOCALES);

/**
 * Strip an optional locale segment (e.g. `/en/camps` → `/camps`).
 */
export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length === 0) return '/';

  if (LOCALE_PREFIXES.has(segments[0])) {
    segments.shift();
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

/** True when Clarity must not initialize on this pathname. */
export function isClarityExcludedPath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname);
  return CLARITY_EXCLUDED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
