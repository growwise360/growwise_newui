import { render, screen } from '@/test-utils';
import { AcademicSeoBodySectionsBlock } from '@/components/camps/AcademicSeoLandingPage';
import { getAcademicSeoLandingCopy } from '@/lib/academic-seo-landing-copy';

describe('AcademicSeoBodySectionsBlock', () => {
  it('renders all four section H2 headings from copy', () => {
    const sections = getAcademicSeoLandingCopy('readingWriting').bodySections;

    render(<AcademicSeoBodySectionsBlock sections={sections} />);

    expect(
      screen.getByRole('heading', { level: 2, name: sections.whatYourChildWillWorkOn.heading }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: sections.whoTeaches.heading })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: sections.whoIsRightFor.heading })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: sections.whyGrowWise.heading })).toBeInTheDocument();
  });

  it.each(['readingWriting', 'mathFoundations', 'algebra', 'geometry'] as const)(
    'renders four H2 headings for %s',
    (pageId) => {
      const sections = getAcademicSeoLandingCopy(pageId).bodySections;

      render(<AcademicSeoBodySectionsBlock sections={sections} />);

      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
    },
  );

  it('renders week-by-week subsection headings and notRightFor when present', () => {
    const sections = getAcademicSeoLandingCopy('mathFoundations').bodySections;

    render(<AcademicSeoBodySectionsBlock sections={sections} />);

    expect(
      screen.getByRole('heading', { level: 3, name: sections.whatYourChildWillWorkOn.subsections[0]!.h3 }),
    ).toBeInTheDocument();
    expect(screen.getByText(sections.whoIsRightFor.notRightFor!.label)).toBeInTheDocument();
  });
});
