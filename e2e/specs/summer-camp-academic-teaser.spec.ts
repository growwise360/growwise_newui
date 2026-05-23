import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Summer camp academic teaser band', { tag: '@nightly' }, () => {
  test('shows orange teaser between academic and AI sections on All filter', async ({ page }) => {
    await page.goto(localePath('/camps/summer'));

    await expect(page.getByRole('heading', { name: 'Choose your camp & reserve a week' })).toBeVisible();

    const teaser = page.getByRole('complementary', { name: /reading, writing, or math support/i });
    await expect(teaser).toBeVisible();
    await expect(teaser.getByText('New · June 15')).toBeVisible();
    await expect(teaser.getByRole('link', { name: /View academic programs/i })).toHaveAttribute(
      'href',
      /\/camps\/academic-summer-programs-dublin-ca/,
    );

    const campChooser = page.getByRole('group', { name: 'Choose Your Camp' });
    const academicHeading = campChooser.getByRole('heading', { level: 3, name: 'Academic', exact: true });
    const aiHeading = campChooser.getByRole('heading', { level: 3, name: 'AI & Game Development', exact: true });
    await expect(academicHeading).toBeVisible();
    await expect(aiHeading).toBeVisible();

    const teaserBetweenSections = await campChooser.evaluate((campGroup) => {
      const headings = Array.from(campGroup.querySelectorAll('h3'));
      const academic = headings.find((heading) => heading.textContent?.trim() === 'Academic');
      const ai = headings.find((heading) => heading.textContent?.trim() === 'AI & Game Development');
      const teaserEl = campGroup.querySelector('aside[aria-labelledby="summer-academic-teaser-heading"]');
      if (!academic || !ai || !teaserEl) return false;

      const isBefore = (left: Element, right: Element) =>
        Boolean(left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING);

      return isBefore(academic, teaserEl) && isBefore(teaserEl, ai);
    });
    expect(teaserBetweenSections).toBe(true);
  });

  test('does not show duplicate bottom-page academic teaser', async ({ page }) => {
    await page.goto(localePath('/camps/summer'));
    await expect(page.getByRole('heading', { name: 'Need academic support instead?' })).toHaveCount(0);
  });
});
