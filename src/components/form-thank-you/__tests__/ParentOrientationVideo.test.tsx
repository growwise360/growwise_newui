import { fireEvent, render, screen } from '@testing-library/react';
import { ParentOrientationVideo } from '../ParentOrientationVideo';

describe('ParentOrientationVideo', () => {
  it('defers YouTube until the parent presses play', () => {
    render(<ParentOrientationVideo />);

    expect(screen.queryByTitle('GrowWise Parent Orientation')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play GrowWise Parent Orientation' }));

    const iframe = screen.getByTitle('GrowWise Parent Orientation');
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('youtube-nocookie.com/embed/XIFkRF0SYnw'),
    );
  });

  it('uses pathway-specific copy and opens the assessment from the middle-school page', () => {
    const onCtaClick = jest.fn();
    render(
      <ParentOrientationVideo
        context="middle-school-math"
        onCtaClick={onCtaClick}
      />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'See How We Find the Right Math Starting Point',
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText('While you wait')).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: "Find My Child's Math Starting Point",
      }),
    );
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('renders a focused player without duplicate section copy in the hero', () => {
    render(
      <ParentOrientationVideo
        context="middle-school-math"
        placement="hero"
      />,
    );

    expect(screen.getByTestId('parent-orientation-video')).toHaveAttribute('data-placement', 'hero');
    expect(screen.getByRole('button', { name: 'Play GrowWise Parent Orientation' })).toHaveStyle({
      filter: 'brightness(1.12) contrast(1.08)',
    });
    expect(
      screen.queryByRole('heading', {
        name: 'See How We Find the Right Math Starting Point',
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: "Find My Child's Math Starting Point",
      }),
    ).not.toBeInTheDocument();
  });
});
