import { buildAcademicSeoLandingCourseSchema } from '@/lib/schema/academic-seo-landing-jsonld';

describe('academic-seo-landing-jsonld algebra & geometry', () => {
  it.each(['algebra', 'geometry'] as const)('%s uses Course schema with provider and schedule', (pageId) => {
    const schema = buildAcademicSeoLandingCourseSchema(pageId) as Record<string, unknown>;

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Course');
    expect(schema.provider).toMatchObject({
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
    });

    const schedule = schema.courseSchedule as Record<string, unknown>;
    expect(schedule['@type']).toBe('Schedule');
    expect(schedule.startDate).toBe('2026-06-15');
    expect(schedule.byDay).toEqual(['Monday', 'Wednesday', 'Friday']);
  });

  it('uses Algebra 1 course name and offers on algebra page', () => {
    const schema = buildAcademicSeoLandingCourseSchema('algebra') as Record<string, unknown>;
    expect(schema.name).toBe('Algebra 1 Get Ready — Summer Algebra Program Dublin CA');
    const offers = schema.offers as Array<Record<string, unknown>>;
    expect(offers.length).toBeGreaterThanOrEqual(2);
    expect(offers[0]?.price).toBe('249');
  });

  it('uses Geometry course name and offers on geometry page', () => {
    const schema = buildAcademicSeoLandingCourseSchema('geometry') as Record<string, unknown>;
    expect(schema.name).toBe('Geometry Get Ready — Summer Geometry Program Dublin CA');
    const offers = schema.offers as Array<Record<string, unknown>>;
    expect(offers[0]?.price).toBe('279');
  });
});
