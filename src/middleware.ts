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
    url.host = nonWwwHost;
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
 * Enforce HTTPS (301 redirect). Vercel handles this automatically in production,
 * but explicit handling ensures it works in all environments.
 */
function redirectToHttps(request: NextRequest): NextResponse | null {
  const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol;
  if (proto !== 'https:' && process.env.NODE_ENV === 'production') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  return null;
}

/**
 * With `localePrefix: 'never'`, public URLs must not use `/en/`. Legacy `/en/*` HTML routes
 * (old Stripe success_url values, bookmarks, inbound links) are 301-redirected to the canonical
 * URL so link equity consolidates on the prefix-free path. `/_next/*` static assets nested under
 * `/en/` are handled separately by `rewriteLocalePrefixedNextAssets` (rewrite, not redirect).
 */
function redirectLegacyDefaultLocalePrefix(request: NextRequest): NextResponse | null {
  if (DEFAULT_LOCALE !== 'en') return null;
  const pathname = request.nextUrl.pathname;
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const rest = pathname === '/en' ? '/' : pathname.slice('/en'.length) || '/';
    const url = request.nextUrl.clone();
    url.pathname = rest === '' ? '/' : rest;
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

/** Must match every segment in `ENABLED_LOCALES` (kept in sync with next-intl `locales` above). */
const localePattern =
  ENABLED_LOCALES.length > 0 ? ENABLED_LOCALES.join('|') : 'en';

/**
 * When the matcher runs, `/en/_next/static/...` is treated as a localized route.
 * Rewrite to real `/_next/...` so chunks load.
 */
function rewriteLocalePrefixedNextAssets(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const m = pathname.match(
    new RegExp(`^/(?:${localePattern})/(_next(?:/.*)?)$`),
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
  const legacyEn = redirectLegacyDefaultLocalePrefix(request);
  if (legacyEn) return legacyEn;
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_vercel|sitemap\\.xml|sitemap-pages\\.xml|sitemap-blogs\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)',
  ],
};
