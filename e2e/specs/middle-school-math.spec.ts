import { test, expect } from '@playwright/test';
import { localePath } from '../localePath';

test.describe('Middle school math page', { tag: '@critical' }, () => {
  test('/academic/math/middle-school renders full landing sections', async ({ page }) => {
    await page.goto(localePath('/academic/math/middle-school'), { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /Middle school math is where gaps start compounding/,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'School District Math Placement Test Prep' }),
    ).toBeVisible();
    await expect(page.getByText('5th grade · district math placement test')).toBeVisible();
    await expect(page.getByText('Grade 7 math placement')).toBeVisible();

    const placementDiagram = page.getByLabel('School district math placement pathways');
    await expect(placementDiagram.getByText('Grade 6', { exact: true })).toHaveCount(2);
    await expect(page.getByText('Standard track · Grades 6–8')).toHaveCount(0);

    await expect(page.getByText('95% school-aligned after curriculum review').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Course 1 Math' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Integrated Math 1' })).toBeVisible();
    await expect(page.getByText('School-aligned').first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Personalized to your school curriculum' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Not sure which course fits?' })).toBeVisible();
    await expect(page.getByText('Which situation fits your child?')).toBeVisible();
    await expect(page.getByText('Trial session — Grades 6–8')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'My child is falling behind in 6th or 7th grade math' }),
    ).toBeVisible();
    await expect(page.getByText('This is usually a gap from 1–2 years back')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Middle School Math — 3-Month Program' })).toBeVisible();
    await expect(page.getByText('From $179/month')).toBeVisible();
    await expect(page.getByText('$179/mo')).toBeVisible();
    await expect(page.getByText('Accelerated Math')).toBeVisible();
    await expect(page.getByText('$289/mo').first()).toBeVisible();
    await expect(page.getByText('Free Sunday practice sessions — included for all Grades 6–12 students')).toBeVisible();
    await expect(page.getByText('Trial session — Grades 6–8')).toBeVisible();
  });
});

test.describe('Math hub middle school card', { tag: '@critical' }, () => {
  test('middle school grade band card shows mastery line', async ({ page }) => {
    await page.goto(localePath('/academic/math'), { waitUntil: 'domcontentloaded' });
    await expect(
      page.getByText('5th & 7th grade district placement · Course 1/2, C1, C3, IM1'),
    ).toBeVisible();
  });
});
