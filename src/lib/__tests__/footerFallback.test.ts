import { getFooterFallback } from '@/data/footerFallback';

describe('getFooterFallback', () => {
  it('returns English footer for any locale (English-only site)', () => {
    const en = getFooterFallback('en');
    expect(en).toBeDefined();
    expect(getFooterFallback('zh')).toEqual(en);
    expect(getFooterFallback('hi')).toEqual(en);
    expect(getFooterFallback('es')).toEqual(en);
  });
});
