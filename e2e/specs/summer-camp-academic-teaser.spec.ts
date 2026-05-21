import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Summer camp academic teaser band', () => {
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

    const academicHeading = page.getByRole('heading', { name: 'Academic', exact: false }).first();
    const aiHeading = page.getByRole('heading', { name: /AI & Game Development/i }).first();
    await expect(academicHeading).toBeVisible();
    await expect(aiHeading).toBeVisible();

    const academicBox = await academicHeading.boundingBox();
    const teaserBox = await teaser.boundingBox();
    const aiBox = await aiHeading.boundingBox();
    expect(academicBox).not.toBeNull();
    expect(teaserBox).not.toBeNull();
    expect(aiBox).not.toBeNull();
    if (academicBox && teaserBox && aiBox) {
      expect(academicBox.y).toBeLessThan(teaserBox.y);
      expect(teaserBox.y).toBeLessThan(aiBox.y);
    }
  });

  test('does not show duplicate bottom-page academic teaser', async ({ page }) => {
    await page.goto(localePath('/camps/summer'));
    await expect(page.getByRole('heading', { name: 'Need academic support instead?' })).toHaveCount(0);
  });
});
