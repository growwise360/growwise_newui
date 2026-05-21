import { test, expect, type Page, type Route } from '@playwright/test';
import { localePath } from '../localePath';

// ─── Shared mock helpers ──────────────────────────────────────────────────────

const MOCK_QUIZ_URL = 'https://app.growwiseschool.org/quiz/test-token123?grade=3&name=Arjun';

/** Mock /api/self-check to return success with quizUrl (magic link flow) */
async function mockSelfCheckSuccess(page: Page) {
  await page.route('**/api/self-check', async (route: Route) => {
    if (route.request().method() !== 'POST') { await route.continue(); return; }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, quizUrl: MOCK_QUIZ_URL, emailSent: true }),
    });
  });
}

/** Mock /api/results to return a completed quiz result */
async function mockResultsCompleted(page: Page) {
  await page.route('**/api/results**', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        status: 'completed',
        student_name: 'Arjun',
        grade: 3,
        subject: 'math',
        patterns_confirmed: [
          {
            id: 'skipped_steps',
            title: 'Skipped Steps',
            riskLevel: 'HIGH',
            commonGrades: '3-5',
            description: 'Jumps from problem to answer without showing work.',
            blocksNext: 'Multi-step word problems',
            domain: 'operations',
          },
        ],
        patterns_possible: [],
        overall_risk: 'HIGH',
        parent_prediction: ['negative_signs'],
        student_prediction: 'negative_signs',
        award_tier: 'double_detective',
      }),
    });
  });
}

/** Mock /api/results to return quiz not yet completed */
async function mockResultsNotCompleted(page: Page) {
  await page.route('**/api/results**', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, status: 'quiz_not_completed' }),
    });
  });
}

/** Mock /api/save-prediction */
async function mockSavePrediction(page: Page) {
  await page.route('**/api/save-prediction', async (route: Route) => {
    if (route.request().method() !== 'POST') { await route.continue(); return; }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
}

/** Navigate with retry — next dev can abort first compile-time request */
async function goto(page: Page, path: string) {
  for (let i = 0; i < 3; i++) {
    try {
      await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      return;
    } catch {
      if (i === 2) throw new Error(`Failed to navigate to ${path} after 3 attempts`);
    }
  }
}

/** Fill and submit the self-check form */
async function fillAndSubmitForm(page: Page, grade = 'Grade 3') {
  await page.getByLabel(/Your First Name/i).fill('Sarah');
  await page.getByLabel(/Your Email/i).fill('test@example.com');
  await page.getByLabel(/Child.*First Name/i).fill('Arjun');

  // Grade — pill buttons (replaced Radix Select)
  await page.getByRole('button', { name: new RegExp(`^${grade}$`, 'i') }).click();

  // Wait for predictions to appear after grade selection
  await expect(page.locator('label', { hasText: /Detective Challenge/i })).toBeVisible({ timeout: 5000 });

  // Select a prediction option from the new symptom-based list
  await page.getByText(/Forgets negative signs/i).click();

  await page.getByRole('button', { name: /Find What.*Blocking My Child/i }).click();
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('Self-Check funnel', () => {

  // ── 1. Self-check page renders ────────────────────────────────────────────
  test('self-check page loads with form', async ({ page }) => {
    await goto(page, localePath('/self-check'));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/Your First Name/i)).toBeVisible();
    await expect(page.getByLabel(/Your Email/i)).toBeVisible();
    await expect(page.getByLabel(/Child.*First Name/i)).toBeVisible();
  });

  // ── 2. Grade pills render ─────────────────────────────────────────────────
  test('grade pills are visible and selectable', async ({ page }) => {
    await goto(page, localePath('/self-check'));
    for (const g of ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8']) {
      await expect(page.getByRole('button', { name: new RegExp(`^${g}$`, 'i') })).toBeVisible();
    }
    await page.getByRole('button', { name: /^Grade 5$/i }).click();
    await expect(page.getByRole('button', { name: /^Grade 5$/i })).toHaveAttribute('aria-pressed', 'true');
  });

  // ── 3. New symptom-based prediction options appear after grade select ─────
  test('shows symptom-based prediction options after grade is selected', async ({ page }) => {
    await goto(page, localePath('/self-check'));
    // Predictions hidden before grade selection
    await expect(page.locator('label', { hasText: /Detective Challenge/i })).not.toBeVisible();
    await page.getByRole('button', { name: /^Grade 4$/i }).click();
    await expect(page.locator('label', { hasText: /Detective Challenge/i })).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(/Forgets negative signs/i)).toBeVisible();
    await expect(page.getByText(/Lines up numbers incorrectly/i)).toBeVisible();
    await expect(page.getByText(/Solves left to right/i)).toBeVisible();
    await expect(page.getByText(/decimal point in the wrong place/i)).toBeVisible();
    await expect(page.getByText(/confused when comparing fractions/i)).toBeVisible();
    await expect(page.getByText(/Adds fractions the wrong way/i)).toBeVisible();
    await expect(page.getByText(/Understands in class but makes mistakes on tests/i)).toBeVisible();
  });

  // ── 4. Validation fires before submit ─────────────────────────────────────
  test('shows validation errors when submitting empty form', async ({ page }) => {
    await goto(page, localePath('/self-check'));
    await page.getByRole('button', { name: /Find What.*Blocking My Child/i }).click();
    await expect(page.getByText(/Your first name is required/i)).toBeVisible();
    await expect(page.getByText(/Email is required/i)).toBeVisible();
  });

  // ── 5. Grade unavailable ──────────────────────────────────────────────────
  test('shows coming-soon message for unavailable grade', async ({ page }) => {
    await page.route('**/api/self-check', async (route: Route) => {
      if (route.request().method() !== 'POST') { await route.continue(); return; }
      await route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'grade_unavailable' }),
      });
    });

    await goto(page, localePath('/self-check'));
    await fillAndSubmitForm(page, 'Grade 5');

    await expect(page.getByText(/This grade is coming soon/i)).toBeVisible({ timeout: 8000 });
    await expect(page).toHaveURL(/self-check/, { timeout: 3000 });
  });

  // ── 6. Happy path — magic link card appears after submit ──────────────────
  test('successful submission shows magic link card', async ({ page }) => {
    await mockSelfCheckSuccess(page);
    await goto(page, localePath('/self-check'));
    await fillAndSubmitForm(page, 'Grade 3');

    // Magic link card should appear
    await expect(page.getByText(/Your child.*quiz link is ready/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/test@example\.com/i)).toBeVisible();
  });

  // ── 7. Magic link card shows quiz URL and share buttons ───────────────────
  test('magic link card shows copy button and share buttons', async ({ page }) => {
    await mockSelfCheckSuccess(page);
    await goto(page, localePath('/self-check'));
    await fillAndSubmitForm(page, 'Grade 3');

    await expect(page.getByRole('button', { name: /Copy/i })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /WhatsApp/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Text/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Email/i })).toBeVisible();
  });

  // ── 8. Copy button changes to Copied! ────────────────────────────────────
  test('copy button shows Copied! feedback on click', async ({ page }) => {
    await mockSelfCheckSuccess(page);
    await goto(page, localePath('/self-check'));
    await fillAndSubmitForm(page, 'Grade 3');

    const copyBtn = page.getByRole('button', { name: /^Copy$/i });
    await expect(copyBtn).toBeVisible({ timeout: 15000 });
    await copyBtn.click();
    await expect(page.getByRole('button', { name: /Copied!/i })).toBeVisible({ timeout: 3000 });
  });

  // ── 9. Expired session banner ─────────────────────────────────────────────
  test('shows expired session banner on /self-check?error=expired', async ({ page }) => {
    await goto(page, localePath('/self-check?error=expired'));
    await expect(page.getByText(/Your session expired/i)).toBeVisible();
  });

  // ── 10. Incomplete quiz banner ────────────────────────────────────────────
  test('shows incomplete banner on /self-check?error=incomplete', async ({ page }) => {
    await goto(page, localePath('/self-check?error=incomplete'));
    await expect(page.getByText(/Please complete the quiz first/i)).toBeVisible();
  });

  // ── 11. Error banner is dismissible ──────────────────────────────────────
  test('error banner can be dismissed', async ({ page }) => {
    await goto(page, localePath('/self-check?error=expired'));
    const banner = page.getByText(/Your session expired/i);
    await expect(banner).toBeVisible();
    await page.locator('button[aria-label="Dismiss"]').click({ force: true });
    await expect(banner).not.toBeAttached({ timeout: 10000 });
  });

  // ── 12. Section order ────────────────────────────────────────────────────
  test('page sections appear in correct order', async ({ page }) => {
    await goto(page, localePath('/self-check'));

    const patternSection = page.getByText(/Three blockers/i);
    const funnelSection  = page.getByText(/From Free Check to Fixed Gap/i);
    const testimonialsSection = page.getByText(/What parents found/i);
    const faqSection     = page.getByText(/FAQs/i);

    await expect(patternSection).toBeVisible();
    await expect(funnelSection).toBeVisible();
    await expect(testimonialsSection).toBeVisible();
    await expect(faqSection).toBeVisible();

    const patternY = await patternSection.boundingBox().then(b => b?.y ?? 0);
    const funnelY  = await funnelSection.boundingBox().then(b => b?.y ?? 0);
    const testimY  = await testimonialsSection.boundingBox().then(b => b?.y ?? 0);
    const faqY     = await faqSection.boundingBox().then(b => b?.y ?? 0);

    expect(patternY).toBeLessThan(funnelY);
    expect(funnelY).toBeLessThan(testimY);
    expect(testimY).toBeLessThan(faqY);
  });
});

test.describe('Detective page', () => {

  // ── 13. Detective page redirects to self-check ────────────────────────────
  test('redirects to /self-check', async ({ page }) => {
    await goto(page, localePath('/detective'));
    await expect(page).toHaveURL(/self-check/, { timeout: 8000 });
  });
});

test.describe('Results page', () => {

  // ── 14. Results page redirects to self-check ──────────────────────────────
  test('redirects to /self-check', async ({ page }) => {
    await goto(page, localePath('/results'));
    await expect(page).toHaveURL(/self-check/, { timeout: 8000 });
  });
});

test.describe('Done page', () => {

  // ── 15. Done page renders ─────────────────────────────────────────────────
  test('done page renders confirmation content', async ({ page }) => {
    await goto(page, localePath('/self-check/done'));
    await expect(page.getByRole('heading', { level: 1, name: /You.*re all set/i })).toBeVisible();
    await expect(page.getByText(/sent to your email/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Book Free 1:1 Plan Preparation/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Book Free 1:1 Plan Preparation/i }).first()).toHaveAttribute(
      'href',
      'https://calendly.com/connect-thegrowwise/new-meeting',
    );
  });

  // ── 16. Back to Self-Check link ───────────────────────────────────────────
  test('done page has correct Back to Self-Check link', async ({ page }) => {
    await goto(page, localePath('/self-check/done'));
    const link = page.getByRole('link', { name: /Back to Self-Check/i });
    await expect(link).toHaveAttribute('href', '/self-check');
  });
});
