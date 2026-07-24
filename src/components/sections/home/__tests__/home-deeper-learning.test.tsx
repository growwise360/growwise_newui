import { fireEvent, render, screen } from '@testing-library/react';
import { HomeDeeperLearningSection } from '../HomeDeeperLearningSection';

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

jest.mock('@/lib/analytics/hooks', () => ({
  useButtonTracking: () => ({
    trackButtonClick: jest.fn(),
    trackCTAClick: jest.fn(),
  }),
}));

describe('HomeDeeperLearningSection', () => {
  it('keeps YouTube off the initial homepage load and starts it only after play', () => {
    render(<HomeDeeperLearningSection />);

    expect(screen.queryByTitle('GrowWise deeper learning approach')).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Play the 61-second GrowWise deeper learning video',
      }),
    );

    expect(screen.getByTitle('GrowWise deeper learning approach')).toHaveAttribute(
      'src',
      expect.stringContaining(
        'youtube-nocookie.com/embed/LN3xuCyf-Oc?autoplay=1&playsinline=1&rel=0',
      ),
    );
  });

  it('links the mechanism proof to the localized assessment route', () => {
    render(<HomeDeeperLearningSection />);

    expect(
      screen.getByRole('link', {
        name: "Find My Child's Learning Gap →",
      }),
    ).toHaveAttribute('href', '/book-assessment');
  });
});
