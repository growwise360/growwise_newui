import {
  ACADEMIC_SUMMER_SPRINT_TRACK_IDS,
  buildAllAcademicSummerPrograms,
  buildAcademicSummerSprintPrograms,
  buildGetReadySummerPrograms,
  DEFAULT_ACADEMIC_HUB_PROGRAM_ID,
  getAcademicProgramCardDisplayMap,
  getAcademicSummerProgramsHubData,
  getAcademicTrackCards,
  isAcademicGetReadyProgram,
  isAcademicSummerSprintProgram,
} from '@/lib/academic-summer-programs-hub-data';

describe('academic-summer-programs-hub-data', () => {
  describe('hub JSON integrity', () => {
    const hub = getAcademicSummerProgramsHubData();

    it('defines two sprints with five total tracks', () => {
      expect(hub.sprints).toHaveLength(2);
      const trackIds = hub.sprints.flatMap((s) => s.trackIds);
      expect(trackIds).toHaveLength(5);
      expect(new Set(trackIds).size).toBe(5);
    });

    it('includes expected sprint pricing tiers', () => {
      const sprint = hub.sprints.find((s) => s.id === 'academic-summer-sprint');
      expect(sprint?.pricing?.tiers).toHaveLength(2);
      expect(sprint?.pricing?.tiers.map((t) => t.perCohortPrice)).toEqual([249, 349]);
    });

    it('includes geometry get-ready pricing distinct from standard', () => {
      expect(hub.getReadyPricing.geometry.twoWeek).toBe(279);
      expect(hub.getReadyPricing.standard.twoWeek).toBe(249);
    });
  });

  describe('program builders', () => {
    const allPrograms = buildAllAcademicSummerPrograms();
    const sprintPrograms = buildAcademicSummerSprintPrograms();
    const getReadyPrograms = buildGetReadySummerPrograms();

    it('builds five checkout-compatible programs', () => {
      expect(allPrograms).toHaveLength(5);
      expect(sprintPrograms).toHaveLength(3);
      expect(getReadyPrograms).toHaveLength(2);
    });

    it('uses expected sprint and get-ready ids', () => {
      expect(sprintPrograms.map((p) => p.id)).toEqual([...ACADEMIC_SUMMER_SPRINT_TRACK_IDS]);
      expect(getReadyPrograms.map((p) => p.id)).toEqual(['im1', 'im2']);
    });

    it('assigns slots with prices for every program', () => {
      for (const program of allPrograms) {
        const slots = program.levels[0]?.slots ?? [];
        expect(slots.length).toBeGreaterThan(0);
        expect(slots.every((s) => typeof s.price === 'number' && s.price > 0)).toBe(true);
      }
    });

    it('uses June 15 cohort windows in sprint slot labels (aligned with program cards)', () => {
      const readToProve = sprintPrograms.find((p) => p.id === 'read-to-prove');
      const labels = (readToProve?.levels[0]?.slots ?? []).map((s) => s.label);
      expect(labels.some((l) => l.includes('June 15'))).toBe(true);
      expect(labels.every((l) => !l.includes('June 8'))).toBe(true);
      expect(labels.some((l) => l.includes('Cohort 1 (June 15–26)'))).toBe(true);
      expect(labels.some((l) => l.includes('Both cohorts (June 15–July 11)'))).toBe(true);
    });

    it('uses distinct evening times for IM1 and IM2 enrollment rows', () => {
      const im1 = getReadyPrograms.find((p) => p.id === 'im1');
      const im2 = getReadyPrograms.find((p) => p.id === 'im2');
      expect(im1?.levels[0]?.slots[0]?.time).toContain('5:00–6:30 PM');
      expect(im2?.levels[0]?.slots[1]?.time).toContain('4:30–6:30 PM');
    });

    it('defaults to read-to-prove as the hub program', () => {
      expect(DEFAULT_ACADEMIC_HUB_PROGRAM_ID).toBe('read-to-prove');
      expect(allPrograms[0]?.id).toBe('read-to-prove');
    });
  });

  describe('type guards and display map', () => {
    it('classifies sprint vs get-ready program ids', () => {
      expect(isAcademicSummerSprintProgram('read-to-prove')).toBe(true);
      expect(isAcademicSummerSprintProgram('im1')).toBe(false);
      expect(isAcademicGetReadyProgram('im2')).toBe(true);
      expect(isAcademicGetReadyProgram('write-to-explain')).toBe(false);
    });

    it('returns card display metadata for all five available tracks', () => {
      const map = getAcademicProgramCardDisplayMap();
      expect(Object.keys(map)).toHaveLength(5);
      expect(map['read-to-prove'].startingPrice).toBe(249);
      expect(map.im1.startingPrice).toBe(249);
    });

    it('builds five track cards in reading/writing then math order', () => {
      const cards = getAcademicTrackCards();
      expect(cards).toHaveLength(5);
      expect(cards.map((c) => c.id)).toEqual([
        'read-to-prove',
        'write-to-explain',
        'bridge-the-gap-math',
        'im1',
        'im2',
      ]);
    });
  });
});
