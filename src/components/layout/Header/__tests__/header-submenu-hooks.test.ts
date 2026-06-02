import { submenuKeysToClose } from '@/components/layout/Header/hooks';

describe('header submenu stacking', () => {
  it('closes only the submenu key that was left', () => {
    expect(submenuKeysToClose('math')).toEqual(['math']);
  });
});
