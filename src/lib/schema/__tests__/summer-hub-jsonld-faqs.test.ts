import fs from 'node:fs';
import path from 'node:path';
import { CONTACT_INFO } from '@/lib/constants';
import {
  SUMMER_HUB_MOCK_FAQ_EXCLUDED_NEAR_PRIORITY,
  SUMMER_HUB_PRIORITY_FAQS,
  getSummerHubVisibleFaqs,
} from '@/lib/schema/summer-hub-jsonld-faqs';

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

describe('summer hub FAQ (UI + JSON-LD single source)', () => {
  it('prepends priority FAQs then filtered mock entries', () => {
    const faqs = getSummerHubVisibleFaqs();
    expect(faqs.length).toBeGreaterThan(SUMMER_HUB_PRIORITY_FAQS.length);
    SUMMER_HUB_PRIORITY_FAQS.forEach((item, index) => {
      expect(faqs[index]?.question).toBe(item.question);
      expect(faqs[index]?.answer).toBe(item.answer);
    });
  });

  it('excludes near-duplicate mock questions', () => {
    const questions = new Set(
      getSummerHubVisibleFaqs().map((f) => f.question.trim().toLowerCase()),
    );
    for (const excluded of SUMMER_HUB_MOCK_FAQ_EXCLUDED_NEAR_PRIORITY) {
      expect(questions.has(excluded)).toBe(false);
    }
  });

  it('priority copy reflects hub grid (no Math Olympiad on booking grid)', () => {
    const offer = SUMMER_HUB_PRIORITY_FAQS.find((f) =>
      f.question.includes('book on this page'),
    );
    expect(offer?.answer).toContain('AI Entrepreneur Studio');
    expect(offer?.answer).toContain('dedicated camp pages');
    expect(offer?.answer).not.toContain('Math Olympiad, and Young Authors');
  });

  it('enroll FAQ uses canonical phone', () => {
    const enroll = SUMMER_HUB_PRIORITY_FAQS.find((f) => f.question.includes('enroll'));
    expect(enroll?.answer).toContain(CONTACT_INFO.phone);
    expect(enroll?.answer).not.toContain('555-0123');
  });

  it('summer layout and page use getSummerHubVisibleFaqs', () => {
    const layout = readSource('src/app/[locale]/camps/summer/layout.tsx');
    const page = readSource('src/app/[locale]/camps/summer/page.tsx');
    expect(layout).toContain('getSummerHubVisibleFaqs()');
    expect(page).toContain('getSummerHubVisibleFaqs()');
    expect(page).not.toContain('summer-camp-faq.json');
  });
});
