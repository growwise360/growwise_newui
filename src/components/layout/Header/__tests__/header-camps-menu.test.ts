import { readFileSync } from 'fs';
import { join } from 'path';

import { FALLBACK_MENU_ITEMS } from '@/components/layout/Header/constants';

function getCampsDropdownItems() {
  const camps = FALLBACK_MENU_ITEMS.find((item) => item.key === 'camps');
  return camps?.dropdown?.items.filter((item) => item.visible !== false) ?? [];
}

describe('header camps dropdown menu', () => {
  const items = getCampsDropdownItems();

  it('exposes four visible camp hub links in order', () => {
    expect(items.map((item) => item.key)).toEqual([
      'summerCamp',
      'academicSummerPrograms',
      'highSchoolSummerIntensive',
      'workshopCalendar',
    ]);
  });

  it('includes high school summer intensive entry with href', () => {
    const hs = items.find((item) => item.key === 'highSchoolSummerIntensive');
    expect(hs).toMatchObject({
      title: 'High School Intensive',
      href: '/camps/high-school-summer-intensive-dublin-ca',
    });
  });

  it('includes academic summer programs entry with badge and href', () => {
    const academic = items.find((item) => item.key === 'academicSummerPrograms');
    expect(academic).toMatchObject({
      title: 'Academic Summer Programs',
      href: '/camps/academic-summer-programs-dublin-ca',
      badge: 'New',
      emphasis: 'academicSummer',
    });
  });

  it('mirrors public/api/mock/en/header.json camps items', () => {
    const raw = JSON.parse(
      readFileSync(join(process.cwd(), 'public/api/mock/en/header.json'), 'utf8'),
    ) as { menuItems: Array<{ key: string; dropdown?: { items: Array<{ key: string; visible?: boolean }> } }> };
    const apiCamps = raw.menuItems.find((item) => item.key === 'camps');
    const apiVisible = (apiCamps?.dropdown?.items ?? []).filter((item) => item.visible !== false);
    expect(apiVisible.map((item) => item.key)).toEqual(items.map((item) => item.key));
  });
});
