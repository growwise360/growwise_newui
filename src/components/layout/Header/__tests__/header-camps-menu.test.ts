import { readFileSync } from 'fs';
import { join } from 'path';

import { FALLBACK_MENU_ITEMS } from '@/components/layout/Header/constants';

function getBackToSchoolDropdownItems() {
  const backToSchool = FALLBACK_MENU_ITEMS.find((item) => item.key === 'backToSchool');
  return backToSchool?.dropdown?.items.filter((item) => item.visible !== false) ?? [];
}

describe('header back-to-school dropdown menu', () => {
  const items = getBackToSchoolDropdownItems();

  it('exposes readiness and school-year support links in order', () => {
    expect(items.map((item) => item.key)).toEqual([
      'bookAssessment',
      'readinessSelfCheck',
      'mathTutoring',
      'englishSupport',
      'satPrep',
    ]);
  });

  it('includes assessment and readiness self-check entries with hrefs', () => {
    const assessment = items.find((item) => item.key === 'bookAssessment');
    expect(assessment).toMatchObject({
      title: 'Book Free Assessment',
      href: '/book-assessment',
    });

    const selfCheck = items.find((item) => item.key === 'readinessSelfCheck');
    expect(selfCheck).toMatchObject({
      title: '5-Minute Self-Check',
      href: '/readinesschecklist',
      badge: 'Free',
    });
  });

  it('mirrors public/api/mock/en/header.json back-to-school items', () => {
    const raw = JSON.parse(
      readFileSync(join(process.cwd(), 'public/api/mock/en/header.json'), 'utf8'),
    ) as { menuItems: Array<{ key: string; dropdown?: { items: Array<{ key: string; visible?: boolean }> } }> };
    const apiBackToSchool = raw.menuItems.find((item) => item.key === 'backToSchool');
    const apiVisible = (apiBackToSchool?.dropdown?.items ?? []).filter((item) => item.visible !== false);
    expect(apiVisible.map((item) => item.key)).toEqual(items.map((item) => item.key));
  });
});
