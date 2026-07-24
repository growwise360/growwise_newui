import { render, screen } from '@/test-utils';
import { AcademicSeoLandingPage } from '@/components/camps/AcademicSeoLandingPage';
import { ACADEMIC_SUMMER_BANNER_SRC } from '@/components/camps/AcademicProgramsHero';

describe('AcademicSeoLandingPage hero banner', () => {
  it('algebra page omits the banner image', () => {
    const { container } = render(<AcademicSeoLandingPage pageId="algebra" locale="en" />);

    expect(container.innerHTML).not.toContain(ACADEMIC_SUMMER_BANNER_SRC);
    expect(screen.getByRole('region', { name: 'Program hero' })).toHaveClass('bg-[#1F396D]');
  });

  it('reading/writing page omits the banner image', () => {
    const { container } = render(
      <AcademicSeoLandingPage pageId="readingWriting" locale="en" />,
    );

    expect(container.innerHTML).not.toContain(ACADEMIC_SUMMER_BANNER_SRC);
  });

  it('math foundations page includes the banner image', () => {
    render(<AcademicSeoLandingPage pageId="mathFoundations" locale="en" />);

    expect(screen.getByRole('img', { name: /Summer Math Program in Dublin/i })).toBeInTheDocument();
  });
});
