import {
  ELEMENTARY_TRIAL,
  HIGH_SCHOOL_TRIAL,
  MIDDLE_SCHOOL_TRIAL,
} from '@/lib/math-program-trial-copy';

describe('math-program-trial-copy', () => {
  const trials = [ELEMENTARY_TRIAL, MIDDLE_SCHOOL_TRIAL, HIGH_SCHOOL_TRIAL] as const;

  it.each(trials.map((t) => [t.sessionTitle, t]))(
    '%s includes $45 fee and 7-day waiver policy',
    (_title, config) => {
      expect(config.feeNote).toMatch(/\$45/);
      expect(config.footnote).toMatch(/7 days/);
      expect(config.enrollPath).toBe('/enroll-academic');
    },
  );
});
