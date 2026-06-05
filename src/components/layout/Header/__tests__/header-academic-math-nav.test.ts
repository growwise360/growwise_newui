import { readFileSync } from 'fs';
import { join } from 'path';

import {
  FALLBACK_MENU_ITEMS,
  MATH_GRADE_BAND_NAV_ITEMS,
  ENGLISH_SUBMENU_NAV_ITEMS,
} from '@/components/layout/Header/constants';
import { MATH_COURSE_PATHS } from '@/lib/math-course-paths';

function getAcademicDropdownItems() {
  const academic = FALLBACK_MENU_ITEMS.find((item) => item.key === 'academic');
  return academic?.dropdown?.items.filter((item) => item.visible !== false) ?? [];
}

describe('header academic math nested menu', () => {
  const academicItems = getAcademicDropdownItems();

  it('lists Math, English, SAT, and Book Assessment at Academic level (no Courses wrapper)', () => {
    expect(academicItems.map((item) => item.key)).toEqual([
      'math',
      'english',
      'satPrep',
      'bookAssessment',
    ]);
    expect(academicItems.some((item) => item.key === 'courses')).toBe(false);
  });

  it('has Math with three grade-band links in one flyout', () => {
    const math = academicItems.find((item) => item.key === 'math');
    expect(math).toMatchObject({
      title: 'Math',
      href: MATH_COURSE_PATHS.hub,
      hasSubmenu: true,
    });
    expect(math?.submenuItems).toEqual(MATH_GRADE_BAND_NAV_ITEMS);
    expect(math?.submenuItems?.map((item) => item.href)).toEqual([
      MATH_COURSE_PATHS.elementary,
      MATH_COURSE_PATHS.middleSchool,
      MATH_COURSE_PATHS.highSchool,
    ]);
  });

  it('has English with elementary link in flyout', () => {
    const english = academicItems.find((item) => item.key === 'english');
    expect(english).toMatchObject({
      title: 'English Courses',
      href: MATH_COURSE_PATHS.english,
      hasSubmenu: true,
    });
    expect(english?.submenuItems).toEqual(ENGLISH_SUBMENU_NAV_ITEMS);
    expect(english?.submenuItems?.map((item) => item.href)).toEqual([
      MATH_COURSE_PATHS.englishElementary,
    ]);
  });

  it('does not expose duplicate top-level High School Math flyout', () => {
    const keys = academicItems.map((item) => item.key);
    expect(keys).not.toContain('highSchoolMath');
  });

  it('mirrors public/api/mock/en/header.json Academic structure', () => {
    const raw = JSON.parse(
      readFileSync(join(process.cwd(), 'public/api/mock/en/header.json'), 'utf8'),
    ) as {
      menuItems: Array<{
        key: string;
        dropdown?: {
          items: Array<{
            key: string;
            submenuItems?: Array<{ href: string }>;
          }>;
        };
      }>;
    };
    const apiAcademic = raw.menuItems.find((item) => item.key === 'academic');
    const apiItems = apiAcademic?.dropdown?.items ?? [];
    expect(apiItems.map((item) => item.key)).toEqual([
      'math',
      'english',
      'satPrep',
      'bookAssessment',
    ]);
    const apiMath = apiItems.find((item) => item.key === 'math');
    expect(apiMath?.submenuItems?.map((item) => item.href)).toEqual([
      MATH_COURSE_PATHS.elementary,
      MATH_COURSE_PATHS.middleSchool,
      MATH_COURSE_PATHS.highSchool,
    ]);
    const apiEnglish = apiItems.find((item) => item.key === 'english');
    expect(apiEnglish?.submenuItems?.map((item) => item.href)).toEqual([
      MATH_COURSE_PATHS.englishElementary,
    ]);
  });
});
