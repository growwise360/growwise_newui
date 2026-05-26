import { buildAcademicSeoLandingCourseSchema } from '@/lib/schema/academic-seo-landing-jsonld';

describe('academic-seo-landing-jsonld imGetReady', () => {
  const schema = buildAcademicSeoLandingCourseSchema('imGetReady') as Record<string, unknown>;
  const items = schema.itemListElement as Array<Record<string, unknown>>;

  it('uses ItemList with IM1 and IM2 courses', () => {
    expect(schema['@type']).toBe('ItemList');
    expect(items).toHaveLength(2);

    const names = items.map((entry) => (entry.item as Record<string, unknown>).name);
    expect(names).toEqual([
      'IM1 Get Ready — Integrated Math 1 Summer Prep Dublin CA',
      'IM2 Get Ready — Integrated Math 2 Summer Prep Dublin CA',
    ]);
  });

  it('uses July M/W/F schedule for both courses', () => {
    for (const entry of items) {
      const schedule = (entry.item as Record<string, unknown>).courseSchedule as Record<
        string,
        unknown
      >;
      expect(schedule.startDate).toBe('2026-07-20');
      expect(schedule.endDate).toBe('2026-08-15');
      expect(schedule.byDay).toEqual(['Monday', 'Wednesday', 'Friday']);
    }
  });
});
