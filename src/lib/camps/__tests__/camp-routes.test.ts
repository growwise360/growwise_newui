import {
  CAMPS_STATIC_PATH_SEGMENTS,
  getCampLandingStaticParams,
} from '@/lib/camps/camp-routes';

describe('camp-routes', () => {
  it('reserves academic hub segments from dynamic slug routes', () => {
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('academic-summer-programs-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('academic-summer-sprint-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer-reading-writing-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer-math-foundations-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer-algebra-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer-geometry-precalculus-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer-im-get-ready-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('winter')).toBe(true);
  });

  it('excludes reserved segments from camp landing static params', () => {
    const slugs = getCampLandingStaticParams().map((p) => p.slug);
    expect(slugs).not.toContain('academic-summer-programs-dublin-ca');
    expect(slugs).not.toContain('academic-summer-sprint-dublin-ca');
    expect(slugs).not.toContain('summer-reading-writing-dublin-ca');
    expect(slugs).not.toContain('summer-math-foundations-dublin-ca');
    expect(slugs).not.toContain('summer-algebra-dublin-ca');
    expect(slugs).not.toContain('summer-geometry-precalculus-dublin-ca');
    expect(slugs).not.toContain('summer-im-get-ready-dublin-ca');
    expect(slugs).not.toContain('summer');
    expect(slugs).not.toContain('winter');
  });
});
