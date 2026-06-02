import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ENABLED_LOCALES, DEFAULT_LOCALE } from '@/i18n/localeConfig';

/**
 * Strip www subdomain to enforce single canonical domain (301 redirect).
 * Consolidates SEO link equity and prevents crawl budget waste on duplicate www/non-www versions.
 */
function redirectWwwToDomain(request: NextRequest): NextResponse | null {
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const nonWwwHost = host.slice('www.'.length);
    const url = request.nextUrl.clone();
    url.hostname = nonWwwHost;
    return NextResponse.redirect(url, 301);
  }
  return null;
}

/**
 * Remove trailing slashes (except root) to normalize URLs and consolidate canonical versions.
 * Prevents `/path/` and `/path` from being indexed as separate pages.
 */
function removeTrailingSlash(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }
  return null;
}

/**
 * Enforce HTTPS (301 redirect). Vercel handles this automatically in production.
 * Skip on localhost so `next start` + CI E2E can use plain HTTP (no TLS on :3000).
 */
function redirectToHttps(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  const host = request.headers.get('host') || '';
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) {
    return null;
  }
  const proto = request.headers.get('x-forwarded-proto');
  if (proto && proto !== 'https') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  return null;
}

/** Retired URL prefixes — English-only site; none of these should return 200 HTML. */
const LEGACY_LOCALE_PREFIXES = ['en', 'hi', 'zh', 'es'] as const;

/**
 * With `localePrefix: 'never'`, public URLs must not use `/en/` (or retired `/hi|zh|es/`).
 * Legacy prefixed routes are 301-redirected to prefix-free English paths.
 * `/_next/*` under a locale prefix is handled by `rewriteLocalePrefixedNextAssets` (rewrite, not redirect).
 */
function redirectLegacyLocalePrefix(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  for (const loc of LEGACY_LOCALE_PREFIXES) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      const rest = pathname === `/${loc}` ? '/' : pathname.slice(`/${loc}`.length) || '/';
      const url = request.nextUrl.clone();
      url.pathname = rest === '' ? '/' : rest;
      return NextResponse.redirect(url, 301);
    }
  }
  return null;
}

const intlMiddleware = createMiddleware({
  locales: [...ENABLED_LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  // Default locale (English) uses clean URLs with no /en prefix.
  localePrefix: 'never',
});

/** Locales that may prefix `/_next/*` asset paths (enabled + retired). */
const assetLocalePattern = [
  ...new Set([...ENABLED_LOCALES, ...LEGACY_LOCALE_PREFIXES]),
].join('|');

/**
 * When the matcher runs, `/en/_next/static/...` is treated as a localized route.
 * Rewrite to real `/_next/...` so chunks load.
 */
function rewriteLocalePrefixedNextAssets(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const m = pathname.match(
    new RegExp(`^/(?:${assetLocalePattern})/(_next(?:/.*)?)$`),
  );
  if (!m) return null;
  const url = request.nextUrl.clone();
  url.pathname = `/${m[1]}`;
  return NextResponse.rewrite(url);
}

/**
 * With `src/app`, Next.js expects middleware beside `src/app` (`src/middleware.ts`).
 * A root-level `middleware.ts` can be ignored in some setups, which makes `/` 404
 * because there is no root `app/page.tsx` (only `app/[locale]/...`).
 */
export default function middleware(request: NextRequest) {
  // HTTPS enforcement (runs first)
  const httpsRedirect = redirectToHttps(request);
  if (httpsRedirect) return httpsRedirect;

  // www → non-www redirect (consolidate domain canonicalization)
  const wwwRedirect = redirectWwwToDomain(request);
  if (wwwRedirect) return wwwRedirect;

  // Remove trailing slashes (except root) to normalize URLs
  const noTrailing = removeTrailingSlash(request);
  if (noTrailing) return noTrailing;

  const pathname = request.nextUrl.pathname;
  // Non-localized App Router segments (`app/camp/...` at repo root). Running next-intl on these
  // can fight with `[locale]/camp/[slug]` and caused redirect loops to the same URL.
  if (pathname === '/camp' || pathname.startsWith('/camp/')) {
    return NextResponse.next();
  }

  const rewritten = rewriteLocalePrefixedNextAssets(request);
  if (rewritten) return rewritten;
  const legacyLocale = redirectLegacyLocalePrefix(request);
  if (legacyLocale) return legacyLocale;
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_vercel|sitemap\\.xml|sitemap-pages\\.xml|sitemap-blogs\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)',
  ],
};
