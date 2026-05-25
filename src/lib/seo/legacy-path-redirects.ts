/**
 * Legacy marketing/WordPress paths → canonical App Router URLs (301 in next.config).
 * Keep in sync with e2e/specs/legacy-path-redirects.spec.ts.
 */
export const LEGACY_PATH_REDIRECTS = [
  {
    from: '/math-courses-in-dublin-ca-growwise',
    to: '/courses/math',
    note: 'Old landing slug; was catch-all 404 with noindex in GSC',
  },
] as const
