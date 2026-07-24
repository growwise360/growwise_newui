import { fireEvent, render, screen } from '@testing-library/react';
import SmokeCursor from '../SmokeCursor';
import { getSmokeyVariantOptions } from '@/lib/effects/smokey-cursor-safe';

jest.mock('@/lib/effects/smokey-cursor-fluid', () => ({
  createSmokeyCursorFluid: jest.fn(() => jest.fn()),
}));

function mockMedia({
  coarse = false,
  fine = false,
  reducedMotion = false,
}: {
  coarse?: boolean;
  fine?: boolean;
  reducedMotion?: boolean;
}) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches:
      query.includes('prefers-reduced-motion')
        ? reducedMotion
        : query.includes('pointer: fine')
          ? fine
          : query.includes('pointer: coarse')
            ? coarse
            : false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

describe('SmokeCursor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not run the cursor-only WebGL effect on coarse-pointer mobile devices', () => {
    mockMedia({ coarse: true });
    render(<SmokeCursor />);

    const canvas = screen.getByTestId('smoke-cursor-canvas');
    expect(canvas).toHaveAttribute('data-smoke-mode', 'adaptive');
    expect(canvas.parentElement).toHaveAttribute('data-smokey-variant', 'light');
    expect(canvas.parentElement).toHaveClass('fixed', 'z-30');
    expect(canvas.parentElement).toHaveClass('hidden');
  });

  it('hides the effect when reduced motion is requested', () => {
    mockMedia({ coarse: true, reducedMotion: true });
    render(<SmokeCursor />);

    const canvas = screen.getByTestId('smoke-cursor-canvas');
    expect(canvas.parentElement).toHaveClass('hidden');
  });

  it('uses the approved full-color light-background profile', () => {
    expect(getSmokeyVariantOptions('light')).toEqual({
      colorIntensity: 0.42,
      alphaScale: 0.22,
      clickBoost: 2.5,
    });
  });

  it('hides the effect over forms and clickable actions', () => {
    mockMedia({ fine: true });
    render(
      <>
        <SmokeCursor />
        <button type="button">Book assessment</button>
        <div data-testid="plain-content">Plain content</div>
      </>,
    );

    const smokeContainer = screen.getByTestId('smoke-cursor-canvas').parentElement;
    fireEvent.pointerMove(screen.getByRole('button'));
    expect(smokeContainer).toHaveClass('smokey-cursor-quiet-paused');

    fireEvent.pointerMove(screen.getByTestId('plain-content'));
    expect(smokeContainer).not.toHaveClass('smokey-cursor-quiet-paused');
  });

  it('keeps articles and FAQ cards quiet while allowing empty backgrounds', () => {
    mockMedia({ fine: true });
    render(
      <>
        <SmokeCursor />
        <article>
          <p>Long-form article copy</p>
        </article>
        <div
          data-testid="faq-card"
          className="rounded-2xl border border-slate-200"
        >
          FAQ answer
        </div>
        <section data-testid="empty-background" />
      </>,
    );

    const smokeContainer = screen.getByTestId('smoke-cursor-canvas').parentElement;
    fireEvent.pointerMove(screen.getByText('Long-form article copy'));
    expect(smokeContainer).toHaveClass('smokey-cursor-quiet-paused');

    fireEvent.pointerMove(screen.getByTestId('faq-card'));
    expect(smokeContainer).toHaveClass('smokey-cursor-quiet-paused');

    fireEvent.pointerMove(screen.getByTestId('empty-background'));
    expect(smokeContainer).not.toHaveClass('smokey-cursor-quiet-paused');
  });

  it('uses the element under the pointer when a layered wrapper is the event target', () => {
    mockMedia({ fine: true });
    render(
      <>
        <SmokeCursor />
        <div data-testid="event-wrapper" />
        <form data-testid="visible-form">
          <input aria-label="Email" />
        </form>
      </>,
    );

    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: jest.fn(() => screen.getByTestId('visible-form')),
    });

    const smokeContainer = screen.getByTestId('smoke-cursor-canvas').parentElement;
    fireEvent.pointerMove(screen.getByTestId('event-wrapper'), {
      clientX: 100,
      clientY: 100,
    });

    expect(smokeContainer).toHaveClass('smokey-cursor-quiet-paused');
    delete (document as Partial<Document>).elementFromPoint;
  });
});
