import { MATH_COURSE_PATHS } from '@/lib/math-course-paths';
import { isDropdownItemPathActive, isSubmenuItemPathActive } from '@/components/layout/Header/utils';
import { FALLBACK_MENU_ITEMS } from '@/components/layout/Header/constants';

function getMathDropdownItem() {
  const academic = FALLBACK_MENU_ITEMS.find((item) => item.key === 'academic');
  return academic?.dropdown?.items.find((item) => item.key === 'math');
}

describe('header utils nested active paths', () => {
  const math = getMathDropdownItem();

  it('marks middle-school path active under Academic → Math', () => {
    const pathname = MATH_COURSE_PATHS.middleSchool;
    expect(isDropdownItemPathActive(math!, pathname, 'en')).toBe(true);
  });

  it('marks canonical high-school path active', () => {
    const pathname = MATH_COURSE_PATHS.highSchool;
    const nested = math?.submenuItems?.find((item) => item.key === 'high-school-math');
    expect(isSubmenuItemPathActive(nested!, pathname, 'en')).toBe(true);
  });

  it('does not mark unrelated paths active', () => {
    const pathname = MATH_COURSE_PATHS.english;
    expect(isDropdownItemPathActive(math!, pathname, 'en')).toBe(false);
  });
});
