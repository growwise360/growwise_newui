import { buildMathGradeBandPageGraphSchema, buildMathHubPageGraphSchema } from '@/lib/schema/math-hub-jsonld';

const BASE_URL = 'https://growwiseschool.org';
const LOCALE = 'en';

describe('math-hub-jsonld', () => {
  describe('buildMathHubPageGraphSchema', () => {
    const graph = buildMathHubPageGraphSchema(BASE_URL, LOCALE) as Record<string, unknown>;
    const nodes = graph['@graph'] as Array<Record<string, unknown>>;

    it('emits BreadcrumbList, 3 Course nodes, and FAQPage in @graph', () => {
      const types = nodes.map((n) => n['@type']);
      expect(types).toContain('BreadcrumbList');
      expect(types.filter((t) => t === 'Course')).toHaveLength(3);
      expect(types).toContain('FAQPage');
    });

    it('links grade-band courses to canonical paths', () => {
      const courses = nodes.filter((n) => n['@type'] === 'Course');
      const urls = courses.map((c) => c.url as string);
      expect(urls).toContain(`${BASE_URL}/academic/math/elementary`);
      expect(urls).toContain(`${BASE_URL}/academic/math/middle-school`);
      expect(urls).toContain(`${BASE_URL}/academic/math/high-school`);
    });

    it('FAQPage has 6 questions', () => {
      const faq = nodes.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>;
      const mainEntity = faq.mainEntity as unknown[];
      expect(mainEntity).toHaveLength(6);
    });
  });

  describe('buildMathGradeBandPageGraphSchema', () => {
    it('emits BreadcrumbList and single Course for elementary', () => {
      const graph = buildMathGradeBandPageGraphSchema('elementary', BASE_URL, LOCALE) as Record<
        string,
        unknown
      >;
      const nodes = graph['@graph'] as Array<Record<string, unknown>>;
      expect(nodes.map((n) => n['@type'])).toEqual(['BreadcrumbList', 'Course']);
      const course = nodes.find((n) => n['@type'] === 'Course');
      expect(course?.url).toBe(`${BASE_URL}/academic/math/elementary`);
    });
  });
});
