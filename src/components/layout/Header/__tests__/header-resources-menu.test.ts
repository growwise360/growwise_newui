import { readFileSync } from 'fs';
import { join } from 'path';

import { FALLBACK_MENU_ITEMS } from '@/components/layout/Header/constants';

function getResourcesDropdownItems() {
  const resources = FALLBACK_MENU_ITEMS.find((item) => item.key === 'resources');
  return resources?.dropdown?.items.filter((item) => item.visible !== false) ?? [];
}

describe('header resources dropdown menu', () => {
  const items = getResourcesDropdownItems();

  it('exposes parent resources, blogs, and self-check tools in order', () => {
    expect(items.map((item) => item.key)).toEqual([
      'parentsCorner',
      'parentDownloads',
      'blogs',
      'readinessCheck',
      'mathMistakeSelfCheck',
    ]);
  });

  it('links to existing resource and self-check pages', () => {
    expect(items.map((item) => item.href)).toEqual([
      '/resources',
      '/resources/downloads',
      '/growwise-blogs',
      '/readinesschecklist',
      '/self-check',
    ]);
  });

  it('mirrors public/api/mock/en/header.json resources items', () => {
    const raw = JSON.parse(
      readFileSync(join(process.cwd(), 'public/api/mock/en/header.json'), 'utf8'),
    ) as { menuItems: Array<{ key: string; dropdown?: { items: Array<{ key: string; visible?: boolean }> } }> };
    const apiResources = raw.menuItems.find((item) => item.key === 'resources');
    const apiVisible = (apiResources?.dropdown?.items ?? []).filter((item) => item.visible !== false);
    expect(apiVisible.map((item) => item.key)).toEqual(items.map((item) => item.key));
  });
});
