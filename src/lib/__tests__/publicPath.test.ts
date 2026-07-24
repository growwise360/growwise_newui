import { publicPath, pathWithoutLocalePrefix } from '@/lib/publicPath';

describe('publicPath', () => {
  it('default locale keeps clean paths (no /en prefix)', () => {
    expect(publicPath('/academic/english', 'en')).toBe('/academic/english');
    expect(publicPath('courses/math', 'en')).toBe('/academic/math');
    expect(publicPath('/', 'en')).toBe('/');
  });

  it('trims whitespace', () => {
    expect(publicPath('  /steam/ml-ai-coding  ', 'en')).toBe('/steam/ml-ai-coding');
  });

  it('adds leading slash when missing', () => {
    expect(publicPath('workshop-calendar', 'en')).toBe('/workshop-calendar');
  });

  it('strips default locale prefixes from generated URLs', () => {
    expect(publicPath('/en/about', 'en')).toBe('/about');
    expect(publicPath('/en/growwise-blogs?page=3', 'en')).toBe('/growwise-blogs?page=3');
  });

  it('normalizes legacy redirect URLs to their canonical targets', () => {
    expect(publicPath('/math-courses-in-dublin-ca-growwise/', 'en')).toBe('/academic/math');
    expect(publicPath('/courses/english', 'en')).toBe('/academic/english');
    expect(publicPath('/courses/high-school-math', 'en')).toBe('/academic/math/high-school');
    expect(publicPath('/camps/academic-summer-sprint-dublin-ca', 'en')).toBe(
      '/camps/academic-summer-programs-dublin-ca',
    );
    expect(publicPath('/english-courses-in-dublin-ca-growwise/', 'en')).toBe('/academic/english');
    expect(publicPath('/academic/reading', 'en')).toBe('/academic/english');
    expect(publicPath('/math-tutoring-dublin-ca/elementary', 'en')).toBe('/academic/math/elementary');
    expect(publicPath('/camps/summer-writing-dublin-ca', 'en')).toBe('/camps/summer-reading-writing-dublin-ca');
    expect(publicPath('/detective', 'en')).toBe('/self-check');
    expect(publicPath('/results', 'en')).toBe('/self-check');
  });

  it('preserves query and hash suffixes while canonicalizing paths', () => {
    expect(publicPath('/courses/math?source=nav#pricing', 'en')).toBe(
      '/academic/math?source=nav#pricing',
    );
  });
});

describe('pathWithoutLocalePrefix', () => {
  it('strips a single leading locale segment when it is a known locale', () => {
    expect(pathWithoutLocalePrefix('/en/academic/english')).toBe('/academic/english');
  });

  it('returns root for bare locale path', () => {
    expect(pathWithoutLocalePrefix('/en')).toBe('/');
  });

  it('leaves default paths unchanged when no locale prefix', () => {
    expect(pathWithoutLocalePrefix('/academic/english')).toBe('/academic/english');
  });
});
