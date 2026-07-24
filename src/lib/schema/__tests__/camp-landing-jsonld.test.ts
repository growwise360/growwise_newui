import { getCampPage } from '@/lib/camps/get-camp-page';
import {
  buildCampLandingJsonLdGraph,
  buildSummerHubCampItemListSchema,
} from '@/lib/schema/camp-landing-jsonld';

const LOCALE = 'en';
const BASE_URL = 'https://growwiseschool.org';

describe('camp-landing-jsonld', () => {
  describe('buildSummerHubCampItemListSchema', () => {
    const schema = buildSummerHubCampItemListSchema(LOCALE) as Record<string, unknown>;
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    it('lists summer hub booking-grid programs in track order (excludes Olympiad & Advanced Math)', () => {
      expect(schema['@type']).toBe('ItemList');
      expect(items).toHaveLength(5);
      const names = items.map((entry) => entry.name);
      expect(names[0]).toContain('AI Entrepreneur');
      expect(names).toContain('Scratch');
      expect(names.some((n) => String(n).includes('Math Olympiad'))).toBe(false);
      expect(names.some((n) => String(n).includes('Advanced Math'))).toBe(false);
    });

    it('links hub programs with dedicated landing pages to /camps/[slug]', () => {
      const scratch = items.find((entry) => String(entry.name).includes('Scratch'));
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
      expect(course.provider).toEqual({
        '@id': 'https://growwiseschool.org#organization',
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
        availability: 'https://schema.org/SoldOut',
        priceCurrency: 'USD',
      });
      expect(event.performer).toMatchObject({
        '@type': 'Organization',
        name: 'GrowWise School',
      });
    });

    it('closed camp landing pages use SoldOut availability on Course and Event offers', () => {
      for (const slug of [
        'young-authors-camp-dublin-ca',
        'game-development-camp-dublin-ca',
        'robotics-camp-dublin-ca',
        'robotics-full-day-dublin-ca',
      ] as const) {
        const page = getCampPage(slug);
        expect(page).toBeDefined();
        const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
        const nodes = graph['@graph'] as Array<Record<string, unknown>>;
        const course = nodes.find((n) => n['@type'] === 'Course');
        const event = nodes.find((n) => n['@type'] === 'Event');
        expect(course?.offers).toMatchObject({
          availability: 'https://schema.org/SoldOut',
        });
        expect(event?.offers).toMatchObject({
          availability: 'https://schema.org/SoldOut',
        });
      }
    });

    it('open camp landing pages keep InStock availability', () => {
      const page = getCampPage('ai-studio-dublin-ca');
      expect(page).toBeDefined();
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE) as Record<string, unknown>;
      const nodes = graph['@graph'] as Array<Record<string, unknown>>;
      const course = nodes.find((n) => n['@type'] === 'Course')!;
      const event = nodes.find((n) => n['@type'] === 'Event')!;
      expect(course.offers).toMatchObject({
        availability: 'https://schema.org/InStock',
      });
      expect(event.offers).toMatchObject({
        availability: 'https://schema.org/InStock',
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
