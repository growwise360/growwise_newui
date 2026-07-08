import { LEGACY_PATH_REDIRECTS } from '@/lib/seo/legacy-path-redirects';

const DIRECT_CANONICAL_PATH_ALIASES = [
  { from: '/camps/academic-summer-sprint-dublin-ca', to: '/camps/academic-summer-programs-dublin-ca' },
  { from: '/detective', to: '/self-check' },
  { from: '/results', to: '/self-check' },
  { from: '/english-courses-in-dublin-ca-growwise', to: '/academic/english' },
  { from: '/academic/reading', to: '/academic/english' },
  { from: '/math-tutoring-dublin-ca/elementary', to: '/academic/math/elementary' },
  { from: '/camps/summer-writing-dublin-ca', to: '/camps/summer-reading-writing-dublin-ca' },
] as const;

const CANONICAL_PATH_ALIAS_MAP = new Map<string, string>([
  ...LEGACY_PATH_REDIRECTS.map(({ from, to }) => [from, to] as const),
  ...DIRECT_CANONICAL_PATH_ALIASES.map(({ from, to }) => [from, to] as const),
]);

const LEGACY_LOCALE_PREFIX_PATTERN = /^\/(?:en|hi|zh|es)(?=\/|$)/;

export function normalizeCanonicalPathAlias(path: string): string {
  if (!path || path.startsWith('#') || path.startsWith('?')) return path;

  const match = path.match(/^([^?#]*)(.*)$/);
  const rawPathname = match?.[1] || '/';
  const suffix = match?.[2] || '';
  const pathname = rawPathname !== '/' && rawPathname.endsWith('/')
    ? rawPathname.slice(0, -1)
    : rawPathname;

  return `${CANONICAL_PATH_ALIAS_MAP.get(pathname) ?? pathname}${suffix}`;
}

export function getCanonicalPathAlias(pathname: string): string | null {
  const normalized = normalizeCanonicalPathAlias(pathname);
  if (normalized !== pathname) return normalized;

  const withoutLocalePrefix = pathname.replace(LEGACY_LOCALE_PREFIX_PATTERN, '') || '/';
  if (withoutLocalePrefix !== pathname) {
    return normalizeCanonicalPathAlias(withoutLocalePrefix);
  }

  return null;
}
