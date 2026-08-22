import { render, screen } from '@testing-library/react';
import PartnerTrustStrip from '../PartnerTrustStrip';

describe('PartnerTrustStrip', () => {
  it('renders the partnership message and all three vendor partners', () => {
    render(<PartnerTrustStrip />);

    expect(screen.getByTestId('partner-trust-strip')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Proudly Partnered With' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Visit GrowWise on 6crickets/)).toHaveAttribute(
      'href',
      expect.stringContaining('6crickets.com'),
    );
    expect(screen.getByLabelText(/Visit GrowWise on ActivityHero/)).toHaveAttribute(
      'href',
      expect.stringContaining('activityhero.com'),
    );
    expect(screen.getByRole('link', { name: 'Visit Velp (opens in new tab)' })).toHaveAttribute('href', 'https://thevelp.app/');
  });
});
