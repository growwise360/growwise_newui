import { MIDDLE_SCHOOL_COURSE_CARDS } from '@/lib/middle-school-math-courses';

describe('MIDDLE_SCHOOL_COURSE_CARDS', () => {
  it('lists six middle school course levels', () => {
    expect(MIDDLE_SCHOOL_COURSE_CARDS).toHaveLength(6);
    expect(MIDDLE_SCHOOL_COURSE_CARDS.map((c) => c.title)).toEqual([
      'Course 1 Math',
      'Course 2 Math',
      'Course 3 Math',
      'Accelerated Course 1/2',
      'Integrated Math 1',
      'Integrated Math 2',
    ]);
  });

  it('includes school-aligned badge on every card', () => {
    for (const card of MIDDLE_SCHOOL_COURSE_CARDS) {
      expect(card.badges).toContain('school-aligned');
    }
  });
});
