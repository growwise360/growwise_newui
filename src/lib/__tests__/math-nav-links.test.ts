import { LEGACY_PATH_REDIRECTS } from '@/lib/seo/legacy-path-redirects';
import { MATH_COURSE_PATHS } from '@/lib/math-course-paths';
import {
  FALLBACK_MENU_ITEMS,
  MATH_GRADE_BAND_NAV_ITEMS,
} from '@/components/layout/Header/constants';
import { normalizeAcademicMathNav } from '@/components/layout/Header/utils';

describe('math navigation links', () => {
  it('MATH_COURSE_PATHS grade bands match header submenu hrefs', () => {
    expect(MATH_GRADE_BAND_NAV_ITEMS.map((item) => item.href)).toEqual([
      MATH_COURSE_PATHS.elementary,
      MATH_COURSE_PATHS.middleSchool,
      MATH_COURSE_PATHS.highSchool,
    ]);
  });

  it('Academic Math dropdown item links to hub with submenu', () => {
    const academic = FALLBACK_MENU_ITEMS.find((item) => item.key === 'academic');
    const math = academic?.dropdown?.items.find((item) => item.key === 'math');
    expect(math?.href).toBe(MATH_COURSE_PATHS.hub);
    expect(math?.hasSubmenu).toBe(true);
  });

  it('legacy courses high-school band URL redirects to academic math high school', () => {
    const entry = LEGACY_PATH_REDIRECTS.find((r) => r.from === '/courses/math/high-school');
    expect(entry?.to).toBe(MATH_COURSE_PATHS.highSchool);
  });

  it('legacy courses math hub redirects to academic math hub', () => {
    const entry = LEGACY_PATH_REDIRECTS.find((r) => r.from === '/courses/math');
    expect(entry?.to).toBe(MATH_COURSE_PATHS.hub);
  });

  it('normalizeAcademicMathNav restores hub href when API omits it', () => {
    const broken = [
      {
        key: 'academic',
        label: 'Academic',
        href: '/academic',
        type: 'dropdown' as const,
        dropdown: {
          title: 'Academic Programs',
          subtitle: 'Choose your learning path',
          items: [
            {
              key: 'math',
              title: 'Math',
              description: 'Math',
              href: '',
              icon: 'Calculator',
              gradient: 'from-[#1F396D] to-[#29335C]',
              hasSubmenu: true,
              submenuItems: [],
            },
          ],
        },
      },
    ];
    const fixed = normalizeAcademicMathNav(broken);
    const math = fixed[0].dropdown?.items.find((item) => item.key === 'math');
    expect(math?.href).toBe(MATH_COURSE_PATHS.hub);
    expect(math?.submenuItems).toEqual(MATH_GRADE_BAND_NAV_ITEMS);
  });

  it('does not redirect canonical high school path away from itself', () => {
    const awayFromCanonical = LEGACY_PATH_REDIRECTS.find(
      (r) => r.from === MATH_COURSE_PATHS.highSchool,
    );
    expect(awayFromCanonical).toBeUndefined();
  });
});
