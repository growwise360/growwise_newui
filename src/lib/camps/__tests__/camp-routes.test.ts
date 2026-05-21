import {
  CAMPS_STATIC_PATH_SEGMENTS,
  getCampLandingStaticParams,
} from '@/lib/camps/camp-routes';

describe('camp-routes', () => {
  it('reserves academic hub segments from dynamic slug routes', () => {
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('academic-summer-programs-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('academic-summer-sprint-dublin-ca')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('summer')).toBe(true);
    expect(CAMPS_STATIC_PATH_SEGMENTS.has('winter')).toBe(true);
  });

  it('excludes reserved segments from camp landing static params', () => {
    const slugs = getCampLandingStaticParams().map((p) => p.slug);
    expect(slugs).not.toContain('academic-summer-programs-dublin-ca');
    expect(slugs).not.toContain('academic-summer-sprint-dublin-ca');
    expect(slugs).not.toContain('summer');
    expect(slugs).not.toContain('winter');
  });
});
