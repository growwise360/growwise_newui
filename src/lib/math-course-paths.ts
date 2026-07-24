/**
 * Canonical path suffixes for academic math/english navigation and hub copy.
 * Locale prefix is applied at runtime via publicPath / createLocaleUrl.
 */
export const MATH_COURSE_PATHS = {
  hub: '/academic/math',
  elementary: '/academic/math/elementary',
  middleSchool: '/academic/math/middle-school',
  highSchool: '/academic/math/high-school',
  mathFinalsPrep: '/math-finals-practice-session',
  english: '/academic/english',
  englishElementary: '/academic/english/elementary',
} as const;

export type MathCoursePathKey = keyof typeof MATH_COURSE_PATHS;
