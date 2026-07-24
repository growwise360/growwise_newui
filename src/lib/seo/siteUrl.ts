/**
 * Canonical origin for metadata, sitemap, JSON-LD, and absolute URLs.
 * No trailing slash. Canonical SEO surfaces must always resolve to the
 * production non-www domain, even when local or preview env vars are present.
 */
const PRODUCTION_SITE_URL = 'https://growwiseschool.org'

export function getCanonicalSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_URL
  const normalized = raw.replace(/\/$/, '')

  try {
    const url = new URL(normalized)
    const hostname = url.hostname.toLowerCase()

    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === 'www.growwiseschool.org' ||
      hostname.endsWith('.vercel.app')
    ) {
      return PRODUCTION_SITE_URL
    }
  } catch {
    return PRODUCTION_SITE_URL
  }

  return normalized
}
