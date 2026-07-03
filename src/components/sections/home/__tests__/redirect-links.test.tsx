/**
 * Ensures home "Programs" / Popular Courses UIs expose real internal hrefs
 * (links styled as buttons or plain hyperlinks).
 */
import React from 'react';
import { render, screen, within } from '@/test-utils';
import { ProgramsSection } from '../ProgramsSection';
import { PopularCoursesSection } from '../PopularCoursesSection';
import { HomeAcademicSection } from '../HomeAcademicSection';
import { HomeSteamSection } from '../HomeSteamSection';
import { HomeHero } from '../HomeHero';
import { HomeCampsStrip } from '../HomeCampsStrip';
import { HomeDiagnosticSection } from '../HomeDiagnosticSection';
import { HomeAssessmentOfferSection } from '../HomeAssessmentOfferSection';
import { HomeFinalAssessmentCta } from '../HomeFinalAssessmentCta';
import { getIconComponent } from '@/lib/iconMap';
import { publicPath } from '@/lib/publicPath';
import type { ProgramVM } from '../ProgramsSection';
import type { PopularCourseVM } from '../PopularCoursesSection';

import homeEn from '../../../../../public/api/mock/en/home.json';

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

jest.mock('@/lib/analytics/hooks', () => ({
  useButtonTracking: () => ({ trackCTAClick: jest.fn() }),
}));

function toProgramVMs(
  rows: Array<Record<string, unknown>>,
): ProgramVM[] {
  return rows.map((p) => ({
    ...(p as ProgramVM),
    IconComponent: getIconComponent(String(p.icon)),
  }));
}

function toPopularCourseVMs(
  rows: Array<Record<string, unknown>>,
): PopularCourseVM[] {
  return rows.map((c) => ({
    ...(c as PopularCourseVM),
    IconComponent: getIconComponent(String(c.icon)),
  }));
}

function assertNoEmptyOrHashOnlyHref(links: HTMLElement[]) {
  for (const a of links) {
    const href = a.getAttribute('href');
    if (!href || href.match(/^(#|)$/)) {
      throw new Error(
        `Invalid href for link "${a.textContent?.trim()}": ${String(href)}`,
      );
    }
  }
}

describe('ProgramsSection redirect links (Grades 1-12 + STEAM)', () => {
  const locale = 'en';
  const k12 = toProgramVMs(homeEn.k12Programs as Array<Record<string, unknown>>);
  const steam = toProgramVMs(homeEn.steamPrograms as Array<Record<string, unknown>>);

  it('every link has a non-empty internal href', () => {
    render(<ProgramsSection k12={k12} steam={steam} />);
    const links = screen.getAllByRole('link');
    assertNoEmptyOrHashOnlyHref(links as HTMLElement[]);
  });

  it('Grades 1-12 card CTAs point at course routes from mock ctaUrl', () => {
    render(<ProgramsSection k12={k12} steam={steam} />);
    const k12Root = screen
      .getByRole('heading', { name: /Grades 1-12 Academic Programs/i })
      .closest('.mb-20');
    expect(k12Root).toBeTruthy();

    const ctaLinks = within(k12Root as HTMLElement).getAllByRole('link');
    const ctaHrefs = ctaLinks.map((link) => link.getAttribute('href'));

    k12.forEach((program) => {
      const url = program.ctaUrl ?? program.href;
      if (!url) {
        throw new Error(`Missing ctaUrl/href for program: ${program.title}`);
      }
      expect(ctaHrefs).toContain(publicPath(url, locale));
    });
  });

  it('STEAM card CTAs point at workshop calendar', () => {
    render(<ProgramsSection k12={k12} steam={steam} />);
    const expectedWorkshop = publicPath('/workshop-calendar', locale);
    const steamRoot = screen
      .getByRole('heading', { name: /^STEAM Programs$/i })
      .closest('.mb-16');
    expect(steamRoot).toBeTruthy();

    const ctaLinks = within(steamRoot as HTMLElement).getAllByRole('link', {
      name: /^Book Free Trial$/i,
    });
    expect(ctaLinks).toHaveLength(steam.length);
    ctaLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', expectedWorkshop);
    });
  });
});

describe('HomeAcademicSection redirect links (OASC pillars)', () => {
  const locale = 'en';
  const cards = [
    { title: 'Careless Mistakes', href: '/self-check' },
    { title: "Homework Won't Get Done", href: '/academic' },
    { title: 'Falling Behind in Math', href: '/courses/sat-prep' },
    { title: 'Not Keeping Up in Class', href: '/academic/math' },
  ] as const;

  it('each pillar card links to the expected route', () => {
    render(<HomeAcademicSection />);
    cards.forEach(({ href }) => {
      const matchingLink = screen
        .getAllByRole('link')
        .find((link) => link.getAttribute('href') === publicPath(href, locale));
      expect(matchingLink).toBeTruthy();
    });
  });

  it('assessment CTA links to book-assessment', () => {
    render(<HomeAcademicSection />);
    const cta = screen.getByRole('link', { name: /Book a Free Assessment/i });
    expect(cta).toHaveAttribute('href', publicPath('/book-assessment', locale));
  });
});

describe('HomeSteamSection redirect links (OASC STEAM)', () => {
  const locale = 'en';
  const cards = [
    { title: 'Python & AI', href: '/steam/ml-ai-coding' },
    { title: 'Game Development', href: '/steam/game-development' },
    { title: 'Robotics & Engineering', href: '/steam/game-development?type=Robotics' },
  ] as const;

  it('each STEAM card links to the expected route', () => {
    render(<HomeSteamSection />);
    cards.forEach(({ title, href }) => {
      const heading = screen.getByRole('heading', { name: title });
      const cardRoot = heading.closest('article') ?? heading.closest('a');
      expect(cardRoot).toBeTruthy();

      const expectedHref = publicPath(href, locale);
      if (cardRoot?.tagName === 'A') {
        expect(cardRoot).toHaveAttribute('href', expectedHref);
        return;
      }

      const primaryLink = within(cardRoot as HTMLElement)
        .getAllByRole('link')
        .find((link) => link.getAttribute('href') === expectedHref);
      expect(primaryLink).toBeTruthy();
    });
  });

  it('trial CTA links to workshop calendar', () => {
    render(<HomeSteamSection />);
    const cta = screen.getByRole('link', { name: /Book a Free Trial Class/i });
    expect(cta).toHaveAttribute('href', publicPath('/workshop-calendar', locale));
  });
});

describe('HomeHero redirect links (OASC carousel)', () => {
  const locale = 'en';

  it('assessment and self-check CTAs use the correct routes', () => {
    render(<HomeHero />);
    expect(
      screen.getByRole('link', { name: /Book a Free Assessment/i }),
    ).toHaveAttribute('href', publicPath('/book-assessment', locale));
    expect(
      screen.getByRole('link', { name: /Get My Child's Free Diagnostic Report/i }),
    ).toHaveAttribute('href', publicPath('/self-check', locale));
  });

  it('STEAM CTAs use workshop calendar and STEAM hub', () => {
    render(<HomeHero />);
    expect(
      screen.getByRole('link', { name: /Book a Free Trial Class/i }),
    ).toHaveAttribute('href', publicPath('/workshop-calendar', locale));
    expect(
      screen.getByRole('link', { name: /View Coding Programs/i }),
    ).toHaveAttribute('href', publicPath('/steam', locale));
  });
});

describe('HomeCampsStrip redirect links', () => {
  const locale = 'en';

  it('back-to-school CTAs point at assessment booking and readiness self-check', () => {
    render(<HomeCampsStrip />);
    expect(screen.getByRole('link', { name: /Book Assessment/i })).toHaveAttribute(
      'href',
      publicPath('/book-assessment', locale),
    );
    expect(screen.getByRole('link', { name: /5-Minute Self-Check/i })).toHaveAttribute(
      'href',
      publicPath('/readinesschecklist', locale),
    );
  });
});

describe('HomeDiagnosticSection redirect links', () => {
  const locale = 'en';

  it('primary self-check and secondary assessment links are correct', () => {
    render(<HomeDiagnosticSection />);
    expect(
      screen.getByRole('link', { name: /Get My Child's Free Diagnostic Report/i }),
    ).toHaveAttribute('href', publicPath('/self-check', locale));
    expect(
      screen.getByRole('link', { name: /Book a Free Assessment instead/i }),
    ).toHaveAttribute('href', publicPath('/book-assessment', locale));
  });
});

describe('HomeAssessmentOfferSection redirect links', () => {
  const locale = 'en';

  it('assessment CTA links to book-assessment', () => {
    render(<HomeAssessmentOfferSection />);
    expect(
      screen.getByRole('link', { name: /Book a Free Assessment/i }),
    ).toHaveAttribute('href', publicPath('/book-assessment', locale));
  });
});

describe('HomeFinalAssessmentCta redirect links', () => {
  const locale = 'en';

  it('final assessment CTA links to book-assessment', () => {
    render(<HomeFinalAssessmentCta />);
    expect(
      screen.getByRole('link', { name: /Book a Free Assessment/i }),
    ).toHaveAttribute('href', publicPath('/book-assessment', locale));
  });
});

describe('PopularCoursesSection redirect links', () => {
  const locale = 'en';
  const courses = toPopularCourseVMs(
    homeEn.popularCourses as Array<Record<string, unknown>>,
  );

  it('each popular course card is a single link with expected href', () => {
    render(
      <PopularCoursesSection courses={courses} error={null} onRetry={undefined} />,
    );
    const links = screen.getAllByRole('link');
    assertNoEmptyOrHashOnlyHref(links as HTMLElement[]);
    expect(links).toHaveLength(courses.length);

    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      const href = c.href;
      if (!href) {
        throw new Error(`Missing href for popular course: ${c.name}`);
      }
      expect(links[i]).toHaveAttribute('href', publicPath(href, locale));
    }
  });
});
