import React from 'react';
import { render, screen } from '@/test-utils';
import MobileNavigation from '../MobileNavigation';

jest.mock('@/components/LocaleSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="locale-switcher" />,
}));

jest.mock('@/components/chatbot/HeaderChatbotTrigger', () => ({
  HeaderChatbotTrigger: ({ variant }: { variant?: string }) => (
    <button type="button" aria-label="Open chat" data-variant={variant}>
      Ask Growy
    </button>
  ),
}));

const defaultProps = {
  menuItems: [],
  mobileMenuOpen: false,
  onToggleMobileMenu: jest.fn(),
  onCloseMobileMenu: jest.fn(),
  createLocaleUrl: (path: string) => `/en${path}`,
  pathname: '/en/camps/summer-algebra-dublin-ca',
  locale: 'en',
  cartItemCount: 0,
  showCart: true,
};

describe('MobileNavigation Ask Growy triggers', () => {
  it('shows one header trigger when the mobile menu is closed', () => {
    render(<MobileNavigation {...defaultProps} />);

    expect(screen.getAllByRole('button', { name: 'Open chat' })).toHaveLength(1);
  });

  it('shows header and drawer triggers on academic camp routes when menu is open', () => {
    render(<MobileNavigation {...defaultProps} mobileMenuOpen />);

    const triggers = screen.getAllByRole('button', { name: 'Open chat' });
    expect(triggers).toHaveLength(2);
    expect(triggers.every((trigger) => trigger.dataset.variant === 'compact')).toBe(true);
  });

  it('shows header and drawer triggers on STEAM camp SEO routes when menu is open', () => {
    render(
      <MobileNavigation
        {...defaultProps}
        pathname="/en/camps/math-olympiad-camp-dublin-ca"
        mobileMenuOpen
      />,
    );

    expect(screen.getAllByRole('button', { name: 'Open chat' })).toHaveLength(2);
  });
});
