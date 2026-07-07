import fs from 'node:fs';
import path from 'node:path';
import { CONTACT_INFO } from '@/lib/constants';
import { HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS } from '@/lib/schema/high-school-summer-intensive-jsonld-faqs';
import { buildHighSchoolSummerIntensiveCourseItemListSchema } from '@/lib/schema/high-school-summer-intensive-jsonld';
import { getMetadataConfig } from '@/lib/seo/metadataConfig';

const UI_ROOT = path.join(__dirname, '..', '..');

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8');
}

describe('high-school-summer-intensive-dublin-ca SEO', () => {
  it('has metadata within length limits', () => {
    const config = getMetadataConfig('/camps/high-school-summer-intensive-dublin-ca');
    expect(config).not.toBeNull();
    expect(config!.title.length).toBeLessThanOrEqual(60);
    expect(config!.description.length).toBeLessThanOrEqual(150);
  });

  it('FAQs use canonical contact phone, not placeholder', () => {
    const unsure = HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS.find((f) =>
      f.question.includes('not sure'),
    );
    expect(unsure?.answer).toContain(CONTACT_INFO.phone);
    expect(unsure?.answer).not.toContain('555-0123');
  });

  it('course ItemList JSON-LD includes six intensives', () => {
    const schema = buildHighSchoolSummerIntensiveCourseItemListSchema();
    expect(schema.itemListElement).toHaveLength(6);
  });

  it('layout injects FAQPage and course JSON-LD', () => {
    const source = readSource('app/[locale]/camps/high-school-summer-intensive-dublin-ca/layout.tsx');
    expect(source).toContain('FAQSchema');
    expect(source).toContain('HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS');
    expect(source).toContain('buildHighSchoolSummerIntensiveCourseItemListSchema');
    expect(source.match(/application\/ld\+json/g)?.length).toBeGreaterThanOrEqual(4);
  });

  it('page uses shared FAQs and Dialog close pattern', () => {
    const source = readSource('components/camps/HighSchoolSummerIntensivePage.tsx');
    expect(source).toContain('HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS');
    expect(source).toContain('high-school-summer-intensive-en.json');
    expect(source).toContain('DialogContent');
    expect(source).not.toContain('555-0123');
    expect(source).toContain('if (!open) closeSummerEnrollmentModal()');
  });

  it('header mock no longer includes the seasonal Back-to-School nav tab', () => {
    const header = JSON.parse(
      fs.readFileSync(path.join(UI_ROOT, '..', 'public/api/mock/en/header.json'), 'utf8'),
    ) as { menuItems: Array<{ key: string }> };
    const backToSchool = header.menuItems.find((m) => m.key === 'backToSchool');
    expect(backToSchool).toBeUndefined();
  });
});
