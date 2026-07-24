import { buildAcademicSeoLandingCourseSchema } from '@/lib/schema/academic-seo-landing-jsonld';

describe('academic-seo-landing-jsonld imGetReady', () => {
  it('uses ItemList with IM1 and IM2 courses on overview page', () => {
    const schema = buildAcademicSeoLandingCourseSchema('imGetReady') as Record<string, unknown>;
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    expect(schema['@type']).toBe('ItemList');
    expect(items).toHaveLength(2);

    const names = items.map((entry) => (entry.item as Record<string, unknown>).name);
    expect(names).toEqual([
      'IM1 Get Ready — Integrated Math 1 Summer Prep Dublin CA',
      'IM2 Get Ready — Integrated Math 2 Summer Prep Dublin CA',
    ]);
  });

  it('uses single IM1 course schema on IM1 page', () => {
    const schema = buildAcademicSeoLandingCourseSchema('im1GetReady') as Record<string, unknown>;
    expect(schema['@type']).toBe('Course');
    expect(schema.name).toBe('IM1 Get Ready — Integrated Math 1 Summer Prep Dublin CA');
  });

  it('uses single IM2 course schema on IM2 page', () => {
    const schema = buildAcademicSeoLandingCourseSchema('im2GetReady') as Record<string, unknown>;
    expect(schema['@type']).toBe('Course');
    expect(schema.name).toBe('IM2 Get Ready — Integrated Math 2 Summer Prep Dublin CA');
  });

  it('uses July M/W/F schedule for IM1 and IM2 courses', () => {
    for (const pageId of ['im1GetReady', 'im2GetReady'] as const) {
      const schema = buildAcademicSeoLandingCourseSchema(pageId) as Record<string, unknown>;
      const schedule = schema.courseSchedule as Record<string, unknown>;
      expect(schedule.startDate).toBe('2026-07-20');
      expect(schedule.endDate).toBe('2026-08-15');
      expect(schedule.byDay).toEqual(['Monday', 'Wednesday', 'Friday']);
    }
  });
});
