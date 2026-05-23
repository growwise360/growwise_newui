import { getCampPage } from '@/lib/camps/get-camp-page';
import {
  buildCampLandingJsonLdGraph,
  buildSummerHubCampItemListSchema,
} from '@/lib/schema/camp-landing-jsonld';

const LOCALE = 'en';
const BASE_URL = 'https://www.growwiseschool.org';

describe('camp-landing-jsonld', () => {
  describe('buildSummerHubCampItemListSchema', () => {
    const schema = buildSummerHubCampItemListSchema(LOCALE) as Record<string, unknown>;
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    it('lists all 7 summer hub programs in track order', () => {
      expect(schema['@type']).toBe('ItemList');
      expect(items).toHaveLength(7);
      const names = items.map((entry) => entry.name);
      expect(names[0]).toContain('Math Olympiad');
      expect(names[1]).toContain('Advanced Math');
      expect(names).toContain('Scratch');
    });

    it('links programs with landing pages to /camps/[slug]', () => {
      const mathOlympiad = items.find((entry) =>
        String(entry.name).includes('Math Olympiad'),
      );
      expect(mathOlympiad?.item).toBe(`${BASE_URL}/camps/math-olympiad-camp-dublin-ca`);
    });

    it('links hub-only programs to /camps/summer', () => {
      const advMath = items.find((entry) => String(entry.name).includes('Advanced Math'));
      const scratch = items.find((entry) => String(entry.name).includes('Scratch'));
      expect(advMath?.item).toBe(`${BASE_URL}/camps/summer`);
      expect(scratch?.item).toBe(`${BASE_URL}/camps/summer`);
    });
  });

  describe('buildCampLandingJsonLdGraph', () => {
    it('math olympiad page has 1 Course and 12 Events', () => {
      const page = getCampPage('math-olympiad-camp-dublin-ca');
      expect(page).toBeDefined();
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
      const nodes = graph['@graph'] as Array<Record<string, unknown>>;
      const courses = nodes.filter((n) => n['@type'] === 'Course');
      const events = nodes.filter((n) => n['@type'] === 'Event');
      expect(courses).toHaveLength(1);
      expect(events).toHaveLength(12);
    });

    it('robotics-full-day page reuses robotics-camp weekly slots (8 Events)', () => {
      const page = getCampPage('robotics-full-day-dublin-ca');
      expect(page).toBeDefined();
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
      const nodes = graph['@graph'] as Array<Record<string, unknown>>;
      const events = nodes.filter((n) => n['@type'] === 'Event');
      expect(events).toHaveLength(8);
    });

    it('Course includes provider, location, price, grade range, and url', () => {
      const page = getCampPage('ai-studio-dublin-ca');
      expect(page).toBeDefined();
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
      const nodes = graph['@graph'] as Array<Record<string, unknown>>;
      const course = nodes.find((n) => n['@type'] === 'Course')!;
      expect(course.name).toBe(page!.h1);
      expect(course.description).toBe(page!.metaDescription);
      expect(course.url).toBe(`${BASE_URL}/camps/ai-studio-dublin-ca`);
      expect(course.provider).toMatchObject({
        '@type': 'EducationalOrganization',
        name: 'GrowWise',
      });
      expect(course.location).toMatchObject({
        '@type': 'Place',
        name: 'GrowWise',
      });
      expect(course.educationalLevel).toBe('Grades 8-12');
      expect(course.offers).toMatchObject({
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      });
      expect(Number((course.offers as Record<string, unknown>).price)).toBeGreaterThan(0);
    });

    it('Event nodes include startDate, endDate, price, availability, and location', () => {
      const page = getCampPage('young-authors-camp-dublin-ca');
      expect(page).toBeDefined();
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
      const nodes = graph['@graph'] as Array<Record<string, unknown>>;
      const event = nodes.find((n) => n['@type'] === 'Event')!;
      expect(event.startDate).toMatch(/^2026-/);
      expect(event.endDate).toMatch(/^2026-/);
      expect(event.location).toMatchObject({ '@type': 'Place', name: 'GrowWise' });
      expect(event.offers).toMatchObject({
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
      });
    });

    it('includes BreadcrumbList, WebPage, and FAQPage in graph', () => {
      const page = getCampPage('robotics-camp-dublin-ca');
      expect(page).toBeDefined();
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
      const types = (graph['@graph'] as Array<Record<string, unknown>>).map((n) => n['@type']);
      expect(types).toContain('BreadcrumbList');
      expect(types).toContain('WebPage');
      expect(types).toContain('FAQPage');
    });
  });
});
