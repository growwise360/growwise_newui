import { MATH_HUB_COPY } from '@/lib/math-hub-copy';

describe('MATH_HUB_COPY pricing', () => {
  it('grade-band cards use current monthly from-prices', () => {
    const lines = MATH_HUB_COPY.gradeBands.cards.map((c) => c.packageLine);
    expect(lines).toEqual([
      'From $169/month · Grade 1-2 Math · 75 minutes per week',
      'From $289/month · 150 minutes per week · 3-month program',
      'From $369/month · 150 minutes per week · 3-month program',
    ]);

    const entrySchedules = MATH_HUB_COPY.programOptions.cards.map(
      (c) => c.options[0]?.schedule,
    );
    expect(entrySchedules).toEqual([
      '75 minutes per week',
      '150 minutes per week',
      '150 min/week',
    ]);
  });

  it('program option cards list real prices per band', () => {
    const entryPrices = MATH_HUB_COPY.programOptions.cards.map(
      (c) => c.options[0]?.price,
    );
    expect(entryPrices).toEqual(['$169/mo', '$289/mo', '$369/mo']);

    const elementary = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'elementary',
    );
    expect(elementary?.options.map((o) => o.name)).toEqual([
      'Grade 1&2 Math',
      'Grade 3-5 Math',
      'Math + Coding',
    ]);
    expect(elementary?.options.map((o) => o.price)).toEqual([
      '$169/mo',
      '$289/mo',
      '$295/mo',
    ]);
    expect(elementary?.options[2]?.bestFor).toBe('Scratch or Roblox');

    const middle = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'middle-school',
    );
    expect(middle?.options.map((o) => o.price)).toEqual([
      '$289/mo',
      '$295/mo',
    ]);
    expect(middle?.options.map((o) => o.name)).toEqual([
      'Regular Math Program',
      'Advanced Math',
    ]);
    expect(middle?.options[1]?.bestFor).toBe(
      '4-6 students per group · Quarterly tests on all topics taught that quarter',
    );

    const high = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'high-school',
    );
    expect(high?.options.map((o) => o.name)).toEqual(['1 Subject', 'AP Math']);
    expect(high?.options.map((o) => o.price)).toEqual(['$369/mo', '$376/mo']);
  });

  it('middle program card includes current included benefit', () => {
    const middleBenefit = 'Quarterly tests cover all topics taught during the quarter.';

    const elementary = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'elementary',
    );
    const middle = MATH_HUB_COPY.programOptions.cards.find(
      (c) => c.id === 'middle-school',
    );
    const high = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');

    expect(elementary?.includedBenefit).toBeUndefined();
    expect(middle?.includedBenefit).toBe(middleBenefit);
    expect(high?.includedBenefit).toBeUndefined();
  });

  it('high school AP Math option includes school-aligned subtitle', () => {
    const high = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');
    const ap = high?.options.find((o) => o.name === 'AP Math');
    expect(ap?.subtitle).toBe('(100% School Aligned)');
    expect(ap?.schedule).toBe('150 min/week');
  });

  it('high school hub links use canonical legacy path', () => {
    const band = MATH_HUB_COPY.gradeBands.cards.find((c) => c.id === 'high-school');
    const program = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');
    expect(band?.path).toBe('/academic/math/high-school');
    expect(program?.path).toBe('/academic/math/high-school');
  });
});
