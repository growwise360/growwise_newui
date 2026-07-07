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

function redirectLegacyResourceAliases(request: NextRequest): NextResponse | null {
  if (request.nextUrl.pathname === '/resources/readiness-checklist') {
    const url = request.nextUrl.clone();
    url.pathname = '/readinesschecklist';
    return NextResponse.redirect(url, 301);
  }
  if (request.nextUrl.pathname === '/resources/kumon-vs-mathnasium-vs-private-tutor-dublin-ca') {
    const url = request.nextUrl.clone();
    url.pathname = '/resources/math-tutoring-options-dublin-ca';
    return NextResponse.redirect(url, 301);
  }
  return null;
}

const intlMiddleware = createMiddleware({
  locales: [...ENABLED_LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  // Default locale (English) uses clean URLs with no /en prefix.
  localePrefix: 'never',
});

const ROOT_PUBLIC_FILES = new Set([
  '/favicon.ico',
  '/file.svg',
  '/globe.svg',
  '/icon.png',
  '/9bdcae9db63f4f39996f3ad38cc52d32.txt',
  '/manifest.json',
  '/next.svg',
  '/og-image.jpg',
  '/vercel.svg',
  '/window.svg',
]);

function notFoundResponse(): NextResponse {
  return new NextResponse(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><title>Page not found | GrowWise</title></head><body><main><h1>Page not found</h1><p>The page you are looking for does not exist or may have been moved.</p><p><a href="/">Back to home</a></p></main></body></html>',
    {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      },
    },
  );
}

function hard404UnknownDottedPath(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  if (!pathname.includes('.') || ROOT_PUBLIC_FILES.has(pathname)) {
    return null;
  }
  return notFoundResponse();
}

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
  const legacyResourceAlias = redirectLegacyResourceAliases(request);
  if (legacyResourceAlias) return legacyResourceAlias;
  if (ROOT_PUBLIC_FILES.has(pathname)) {
    return NextResponse.next();
  }
  const hard404 = hard404UnknownDottedPath(request);
  if (hard404) return hard404;
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_vercel|assets|downloads|images|sitemap\\.xml|sitemap-pages\\.xml|sitemap-blogs\\.xml|robots\\.txt|llms\\.txt).*)',
  ],
};
