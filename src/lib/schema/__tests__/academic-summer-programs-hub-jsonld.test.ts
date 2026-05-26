import { CONTACT_INFO } from '@/lib/constants';
import { ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS } from '@/lib/schema/academic-summer-programs-hub-jsonld-faqs';
import {
  buildAcademicSummerProgramsCourseItemListSchema,
  buildAcademicSummerProgramsOrgSchema,
} from '@/lib/schema/academic-summer-programs-hub-jsonld';

const BASE_URL = 'https://growwiseschool.org';

describe('academic-summer-programs-hub-jsonld', () => {
  describe('buildAcademicSummerProgramsOrgSchema', () => {
    const schema = buildAcademicSummerProgramsOrgSchema(BASE_URL) as Record<string, unknown>;

    it('uses EducationalOrganization with GrowWise School name', () => {
      expect(schema['@type']).toBe('EducationalOrganization');
      expect(schema.name).toBe('GrowWise School');
      expect(schema.url).toBe(BASE_URL);
      expect(schema.logo).toBe(`${BASE_URL}/assets/growwise-logo.png`);
    });

    it('includes Dublin address from CONTACT_INFO', () => {
      const addr = schema.address as Record<string, unknown>;
      expect(addr['@type']).toBe('PostalAddress');
      expect(addr.streetAddress).toBe(CONTACT_INFO.street);
      expect(addr.addressLocality).toBe('Dublin');
      expect(addr.addressRegion).toBe('CA');
      expect(addr.postalCode).toBe(CONTACT_INFO.zipCode);
    });

    it('includes contact, area served, and aggregate rating', () => {
      expect(schema.telephone).toBe('+19254564606');
      expect(schema.email).toBe(CONTACT_INFO.email);
      expect(schema.areaServed).toEqual([
        'Dublin, CA',
        'Pleasanton, CA',
        'San Ramon, CA',
        'Livermore, CA',
      ]);
      expect(schema.aggregateRating).toMatchObject({
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '40',
        bestRating: '5',
      });
    });
  });

  describe('buildAcademicSummerProgramsCourseItemListSchema', () => {
    const schema = buildAcademicSummerProgramsCourseItemListSchema() as Record<string, unknown>;
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    it('uses ItemList with 7 courses', () => {
      expect(schema['@type']).toBe('ItemList');
      expect(schema.name).toBe('GrowWise Academic Summer Programs');
      expect(items).toHaveLength(7);
    });

    it('lists courses in prompt order with nested Course items', () => {
      const names = items.map((entry) => {
        const course = entry.item as Record<string, unknown>;
        return course.name;
      });
      expect(names).toEqual([
        'Read to Prove',
        'Write to Explain',
        'Bridge the Gap Math',
        'IM1 Get Ready Sprint',
        'IM2 Get Ready Sprint',
        'Algebra 1 Get Ready Sprint',
        'Geometry Get Ready Sprint',
      ]);
      for (const [index, entry] of items.entries()) {
        expect(entry['@type']).toBe('ListItem');
        expect(entry.position).toBe(index + 1);
        const course = entry.item as Record<string, unknown>;
        expect(course['@type']).toBe('Course');
        expect(course.provider).toMatchObject({
          '@type': 'EducationalOrganization',
          name: 'GrowWise School',
        });
        expect(course.courseSchedule).toMatchObject({
          '@type': 'Schedule',
        });
        expect(Array.isArray(course.offers)).toBe(true);
      }
    });

    it('includes expected offer prices for sprint and get-ready courses', () => {
      const readToProve = items[0].item as Record<string, unknown>;
      const offers = readToProve.offers as Array<Record<string, unknown>>;
      expect(offers.map((o) => o.price)).toEqual(['249', '349']);

      const geometry = items[6].item as Record<string, unknown>;
      const geometryOffers = geometry.offers as Array<Record<string, unknown>>;
      expect(geometryOffers.map((o) => o.price)).toEqual(['279', '499']);
    });

    it('uses prompt schedule dates for academic sprint and get-ready courses', () => {
      const readSchedule = (items[0].item as Record<string, unknown>).courseSchedule as Record<
        string,
        unknown
      >;
      expect(readSchedule.startDate).toBe('2026-06-15');
      expect(readSchedule.endDate).toBe('2026-07-11');
      expect(readSchedule.repeatFrequency).toBe('P1D');

      const im1Schedule = (items[3].item as Record<string, unknown>).courseSchedule as Record<
        string,
        unknown
      >;
      expect(im1Schedule.startDate).toBe('2026-07-20');
      expect(im1Schedule.endDate).toBe('2026-08-15');

      const im2Schedule = (items[4].item as Record<string, unknown>).courseSchedule as Record<
        string,
        unknown
      >;
      expect(im2Schedule.startDate).toBe('2026-07-20');
      expect(im2Schedule.endDate).toBe('2026-08-15');

      const algebraSchedule = (items[5].item as Record<string, unknown>).courseSchedule as Record<
        string,
        unknown
      >;
      expect(algebraSchedule.startDate).toBe('2026-06-15');
      expect(algebraSchedule.endDate).toBe('2026-07-11');
    });
  });

  describe('ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS', () => {
    it('has 8 FAQs with expected first and last questions', () => {
      expect(ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS).toHaveLength(8);
      expect(ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS[0].question).toBe(
        'What grades do these programs serve?',
      );
      expect(ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS[7].question).toBe('How do I enroll?');
    });

    it('includes contact phone in enroll answer', () => {
      expect(ACADEMIC_SUMMER_PROGRAMS_HUB_FAQS[7].answer).toContain(CONTACT_INFO.phone);
    });
  });
});
