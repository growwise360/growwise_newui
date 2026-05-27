import { MATH_HUB_COPY } from '@/lib/math-hub-copy';

describe('MATH_HUB_COPY pricing', () => {
  it('grade-band cards use current monthly from-prices', () => {
    const lines = MATH_HUB_COPY.gradeBands.cards.map((c) => c.packageLine);
    expect(lines).toEqual([
      'From $169/month · 75 min, once a week · 3-month program',
      'From $179/month · 75 min, once a week · 3-month program',
      'From $189/month · 75 min, once a week · 3-month program',
    ]);

    const onceAWeek = MATH_HUB_COPY.programOptions.cards.map(
      (c) => c.options[0]?.schedule,
    );
    expect(onceAWeek).toEqual([
      '75 min, once a week',
      '75 min/week',
      '75 min/week',
    ]);
  });

  it('program option cards list real prices per band', () => {
    const entryPrices = MATH_HUB_COPY.programOptions.cards.map(
      (c) => c.options[0]?.price,
    );
    expect(entryPrices).toEqual(['$169/mo', '$179/mo', '$189/mo']);

    const accelerated = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'middle-school',
    );
    expect(accelerated?.options.map((o) => o.price)).toEqual([
      '$179/mo',
      '$289/mo',
      '$289/mo',
    ]);
    expect(accelerated?.options.map((o) => o.name)).toEqual([
      '1 Subject',
      '2 Subject',
      'Accelerated Math',
    ]);
  });

  it('middle and high program cards include complimentary weekly practice', () => {
    const benefit =
      'Complimentary 60-minute weekly practice session included with every program';

    const elementary = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'elementary',
    );
    const middle = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'middle-school',
    );
    const high = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');

    expect(elementary?.includedBenefit).toBeUndefined();
    expect(middle?.includedBenefit).toBe(benefit);
    expect(high?.includedBenefit).toBe(benefit);
  });

  it('high school AP Math option includes school-aligned subtitle', () => {
    const high = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');
    const ap = high?.options.find((o) => o.name === 'AP Math');
    expect(ap?.subtitle).toBe('(100% School Aligned)');
    expect(ap?.schedule).toBe('120 min/week');
  });

  it('high school hub links use canonical legacy path', () => {
    const band = MATH_HUB_COPY.gradeBands.cards.find((c) => c.id === 'high-school');
    const program = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');
    expect(band?.path).toBe('/academic/math/high-school');
    expect(program?.path).toBe('/academic/math/high-school');
  });
});
