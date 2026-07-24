import { render, screen } from '@testing-library/react';
import { CommercialValueProofSlot } from '../CommercialValueProofSlot';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('CommercialValueProofSlot', () => {
  it('renders centralized proof on selected commercial routes', () => {
    mockUsePathname.mockReturnValue('/en/academic/math');
    render(<CommercialValueProofSlot />);

    expect(screen.getByTestId('commercial-value-proof')).toHaveTextContent(
      '387+ Students · 4.9★ Google · 98% Parent Satisfaction',
    );
    expect(screen.getByText('No pressure to enroll')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Find the Math Gap' })).toHaveAttribute(
      'href',
      '/book-assessment',
    );
  });

  it('uses the audited route-specific outcome, timing, and action', () => {
    mockUsePathname.mockReturnValue('/camps/summer-reading-writing-dublin-ca');
    render(<CommercialValueProofSlot />);

    expect(
      screen.getByText('Build stronger comprehension and organized writing before school resumes.'),
    ).toBeInTheDocument();
    expect(screen.getByText('See schedule, fit, and pricing now')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Reading and Writing' })).toHaveAttribute(
      'href',
      '/camps/academic-summer-programs-dublin-ca?filter=academic-sprints',
    );
  });

  it('does not render on excluded student article routes', () => {
    mockUsePathname.mockReturnValue('/en/resources/student-articles/books-beyond-personality');
    const { container } = render(<CommercialValueProofSlot />);
    expect(container).toBeEmptyDOMElement();
  });
});
