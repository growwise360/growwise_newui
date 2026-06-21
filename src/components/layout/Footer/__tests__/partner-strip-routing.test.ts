import { hasDedicatedPartnerStrip } from '../FooterFindUsOn';

describe('partner trust strip routing', () => {
  it.each([
    '/',
    '/en',
    '/en/',
    '/book-assessment',
    '/en/book-assessment',
    '/enroll',
    '/en/enroll',
  ])('hides footer partner badges on %s', (pathname) => {
    expect(hasDedicatedPartnerStrip(pathname)).toBe(true);
  });

  it.each([
    '/about',
    '/en/about',
    '/academic',
    '/en/academic/math',
    '/camps/summer',
    '/en/book-assessment/thank-you',
    '/en/enroll/thank-you',
    '/contact',
  ])('keeps footer partner badges on %s', (pathname) => {
    expect(hasDedicatedPartnerStrip(pathname)).toBe(false);
  });
});
