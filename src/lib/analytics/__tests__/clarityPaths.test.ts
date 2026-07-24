import { isClarityExcludedPath, stripLocalePrefix } from '@/lib/analytics/clarityPaths';

describe('stripLocalePrefix', () => {
  it('strips en locale prefix', () => {
    expect(stripLocalePrefix('/en/camps/summer')).toBe('/camps/summer');
  });

  it('leaves paths without locale unchanged', () => {
    expect(stripLocalePrefix('/camps/summer')).toBe('/camps/summer');
  });

  it('returns root for locale-only path', () => {
    expect(stripLocalePrefix('/en')).toBe('/');
  });
});

describe('isClarityExcludedPath', () => {
  it('excludes auth and payment routes with locale', () => {
    expect(isClarityExcludedPath('/en/login')).toBe(true);
    expect(isClarityExcludedPath('/en/student-login')).toBe(true);
    expect(isClarityExcludedPath('/en/dashboard')).toBe(true);
    expect(isClarityExcludedPath('/en/checkout')).toBe(true);
    expect(isClarityExcludedPath('/en/checkout/success')).toBe(true);
  });

  it('excludes auth and payment routes without locale', () => {
    expect(isClarityExcludedPath('/login')).toBe(true);
    expect(isClarityExcludedPath('/checkout')).toBe(true);
  });

  it('allows public marketing routes', () => {
    expect(isClarityExcludedPath('/en/camps/summer')).toBe(false);
    expect(isClarityExcludedPath('/en/enroll')).toBe(false);
    expect(isClarityExcludedPath('/en/contact')).toBe(false);
  });
});
