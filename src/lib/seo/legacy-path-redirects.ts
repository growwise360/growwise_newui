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
  {
    from: '/growwise-blogs/reading-fluency-vs-reading-comprehension',
    to: '/resources/reading-fluency-vs-comprehension',
    note: 'Duplicate legacy article consolidated into the canonical resource guide',
  },
  {
    from: '/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide',
    to: '/resources/how-to-choose-summer-camp',
    note: 'Duplicate legacy summer-camp guide consolidated into the canonical resource guide',
  },
] as const;
