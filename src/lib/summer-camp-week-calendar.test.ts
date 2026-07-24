import {
  formatCampWeekSlotHeading,
  formatOlympiadTier2SlotHeading,
  getMathOlympiadTier2IsoRange,
  getMathOlympiadTier2SlotLabel,
  getSummerCampWeekIsoRange,
  getSummerCampWeekLabel,
  isJune8SummerCampRegistrationClosed,
  MATH_OLYMPIAD_TIER2_ISO_RANGES_2026,
  SUMMER_CAMP_EVENT_END_ISO,
  SUMMER_CAMP_EVENT_START_ISO,
  SUMMER_CAMP_JULY4_NOTE,
  SUMMER_CAMP_SEASON_RANGE_TEXT,
  SUMMER_CAMP_WEEK_COUNT,
  SUMMER_CAMP_WEEK_ISO_RANGES_2026,
  SUMMER_CAMP_WEEK_LABELS_2026,
} from '@/lib/summer-camp-week-calendar';

describe('summer-camp-week-calendar', () => {
  it('exposes eight week labels for 2026', () => {
    expect(SUMMER_CAMP_WEEK_COUNT).toBe(8);
    expect(SUMMER_CAMP_WEEK_LABELS_2026).toHaveLength(8);
  });

  it('first week is Jun 8–12 and last is Jul 27–31', () => {
    expect(SUMMER_CAMP_WEEK_LABELS_2026[0]).toBe('Jun 8–12, 2026');
    expect(SUMMER_CAMP_WEEK_LABELS_2026[7]).toBe('Jul 27–31, 2026');
  });

  it('getSummerCampWeekLabel falls back beyond range', () => {
    expect(getSummerCampWeekLabel(8)).toBe('Week 9');
  });

  it('tier 2 olympiad spans four two-week slots', () => {
    expect(getMathOlympiadTier2SlotLabel(0)).toBe('Jun 8 – Jun 19, 2026');
    expect(getMathOlympiadTier2SlotLabel(3)).toBe('Jul 20 – Jul 31, 2026');
  });

  it('tier 2 label falls back for out-of-range index', () => {
    expect(getMathOlympiadTier2SlotLabel(4)).toBe('Weeks 9–10');
  });

  it('JSON-LD ISO bounds match June 8 and July 31 2026 PT', () => {
    expect(SUMMER_CAMP_EVENT_START_ISO).toContain('2026-06-08');
    expect(SUMMER_CAMP_EVENT_END_ISO).toContain('2026-07-31');
  });

  it('season copy strings are non-empty', () => {
    expect(SUMMER_CAMP_SEASON_RANGE_TEXT.length).toBeGreaterThan(10);
    expect(SUMMER_CAMP_JULY4_NOTE.length).toBeGreaterThan(3);
  });

  it('formatCampWeekSlotHeading matches Week N (dates) pattern', () => {
    expect(formatCampWeekSlotHeading(0)).toBe('Week 1 (Jun 8–12, 2026)');
    expect(formatCampWeekSlotHeading(7)).toBe('Week 8 (Jul 27–31, 2026)');
  });

  it('formatOlympiadTier2SlotHeading wraps tier-2 spans', () => {
    expect(formatOlympiadTier2SlotHeading(0)).toBe(
      `Weeks 1-2 (${getMathOlympiadTier2SlotLabel(0)})`
    );
  });

  it('identifies Jun 8-starting slots as closed for registration', () => {
    expect(isJune8SummerCampRegistrationClosed('Week 1 (Jun 8–12, 2026)')).toBe(true);
    expect(isJune8SummerCampRegistrationClosed('Weeks 1-2 (Jun 8 – Jun 19, 2026)')).toBe(true);
    expect(isJune8SummerCampRegistrationClosed('Week 1 (Jun 9, 10, 11)')).toBe(false);
    expect(isJune8SummerCampRegistrationClosed('Week 2 (Jun 15–19, 2026)')).toBe(false);
  });

  it('ISO week ranges align with week labels', () => {
    expect(SUMMER_CAMP_WEEK_ISO_RANGES_2026).toHaveLength(8);
    expect(SUMMER_CAMP_WEEK_ISO_RANGES_2026[0]).toEqual({
      startDate: '2026-06-08',
      endDate: '2026-06-12',
    });
    expect(SUMMER_CAMP_WEEK_ISO_RANGES_2026[7]).toEqual({
      startDate: '2026-07-27',
      endDate: '2026-07-31',
    });
    expect(getSummerCampWeekIsoRange(8)).toBeUndefined();
  });

  it('Math Olympiad tier 2 ISO ranges span bi-weekly slots', () => {
    expect(MATH_OLYMPIAD_TIER2_ISO_RANGES_2026).toHaveLength(4);
    expect(getMathOlympiadTier2IsoRange(0)).toEqual({
      startDate: '2026-06-08',
      endDate: '2026-06-19',
    });
    expect(getMathOlympiadTier2IsoRange(3)).toEqual({
      startDate: '2026-07-20',
      endDate: '2026-07-31',
    });
  });
});
