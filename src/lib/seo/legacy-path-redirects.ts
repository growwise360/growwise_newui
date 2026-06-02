/**
 * Legacy marketing/WordPress paths → canonical App Router URLs (301 in next.config).
 * Keep in sync with e2e/specs/legacy-path-redirects.spec.ts.
 */
export const LEGACY_PATH_REDIRECTS = [
  {
    from: '/math-courses-in-dublin-ca-growwise',
    to: '/academic/math',
    note: 'Old landing slug; was catch-all 404 with noindex in GSC',
  },
  {
    from: '/courses/math',
    to: '/academic/math',
    note: 'Courses namespace retired → academic math hub',
  },
  {
    from: '/courses/math/elementary',
    to: '/academic/math/elementary',
    note: 'Courses namespace retired → academic math elementary',
  },
  {
    from: '/courses/math/middle-school',
    to: '/academic/math/middle-school',
    note: 'Courses namespace retired → academic math middle school',
  },
  {
    from: '/courses/math/high-school',
    to: '/academic/math/high-school',
    note: 'Courses namespace retired → academic math high school',
  },
  {
    from: '/courses/high-school-math',
    to: '/academic/math/high-school',
    note: 'Legacy high school math URL → academic math high school',
  },
  {
    from: '/courses/english',
    to: '/academic/english',
    note: 'Courses namespace retired → academic english',
  },
  {
    from: '/math-tutoring-dublin-ca',
    to: '/dublin-ca',
    note: 'Spec geo link; Dublin location page is canonical',
  },
] as const;
