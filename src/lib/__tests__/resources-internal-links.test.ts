import fs from 'node:fs';
import path from 'node:path';
import { CAMPS_STATIC_PATH_SEGMENTS } from '@/lib/camps/camp-routes';

const UI_ROOT = path.join(__dirname, '..', '..');

function readComponent(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8');
}

function expectContainsHrefs(source: string, hrefs: readonly string[]): void {
  for (const href of hrefs) {
    expect(source).toContain(href);
  }
}

function campSlugFromHref(href: string): string | null {
  const match = /^\/camps\/([^#?]+)/.exec(href);
  return match?.[1] ?? null;
}

describe('resources internal links', () => {
  const academicCampHrefs = [
    '/camps/academic-summer-programs-dublin-ca',
    '/camps/summer-math-foundations-dublin-ca',
    '/camps/summer-algebra-dublin-ca',
    '/camps/summer-geometry-precalculus-dublin-ca',
    '/camps/summer-im-get-ready-dublin-ca',
    '/camps/summer-im1-get-ready-dublin-ca',
    '/camps/summer-im2-get-ready-dublin-ca',
    '/camps/summer-reading-writing-dublin-ca',
  ] as const;

  it('maps academic camp hrefs to registered static camp routes', () => {
    for (const href of academicCampHrefs) {
      const slug = campSlugFromHref(href);
      expect(slug).toBeTruthy();
      expect(CAMPS_STATIC_PATH_SEGMENTS.has(slug!)).toBe(true);
    }
  });

  it('links careless-math-mistakes to mistake-pattern summer programs', () => {
    const source = readComponent('components/resources/CarelessMathMistakesPage.tsx');
    expectContainsHrefs(source, [
      '/camps/summer-math-foundations-dublin-ca',
      '/camps/summer-im1-get-ready-dublin-ca',
      '/camps/summer-im2-get-ready-dublin-ca',
      '/camps/summer-algebra-dublin-ca',
      '/camps/academic-summer-programs-dublin-ca',
    ]);
  });

  it('links when-to-start-sat-prep to foundation summer programs and high school math', () => {
    const source = readComponent('components/resources/WhenToStartSatPrepPage.tsx');
    expectContainsHrefs(source, [
      '/camps/summer-math-foundations-dublin-ca',
      '/camps/summer-algebra-dublin-ca',
      '/academic/math/high-school',
    ]);
  });

  it('links homework-independence to the academic summer hub and reading guide', () => {
    const source = readComponent('components/resources/HomeworkIndependencePage.tsx');
    expectContainsHrefs(source, [
      '/camps/academic-summer-programs-dublin-ca',
      '/resources/reading-fluency-vs-comprehension',
    ]);
  });

  it('links reading-fluency-vs-comprehension to self-check and reading sprint', () => {
    const source = readComponent('components/resources/ReadingFluencyVsComprehensionPage.tsx');
    expectContainsHrefs(source, ['/self-check', '/camps/summer-reading-writing-dublin-ca']);
  });

  it('links courses/english to reading-fluency-vs-comprehension', () => {
    const source = readComponent('app/[locale]/academic/english/page.tsx');
    expect(source).toContain('/resources/reading-fluency-vs-comprehension');
  });

  it('links summer reading landing to reading-fluency-vs-comprehension', () => {
    const source = readComponent('components/camps/AcademicSeoLandingPage.tsx');
    expect(source).toContain('/resources/reading-fluency-vs-comprehension');
  });

  it('links summer camp pages to summer-slide-dublin-ca', () => {
    const summerPage = readComponent('app/[locale]/camps/summer/page.tsx');
    const problemSection = readComponent('components/camps/AcademicProblemSection.tsx');
    const seoLanding = readComponent('components/camps/AcademicSeoLandingPage.tsx');

    expect(summerPage).toContain('/resources/summer-slide-dublin-ca');
    expect(problemSection).toContain('/resources/summer-slide-dublin-ca');
    expect(seoLanding).toContain('/resources/summer-slide-dublin-ca');
  });

  it('links how-to-choose blog to summer-slide-dublin-ca', () => {
    const source = readComponent(
      'app/[locale]/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide/page.tsx',
    );
    expect(source).toContain('/resources/summer-slide-dublin-ca');
  });

  it('links summer-slide-dublin-ca to related guides and summer programs', () => {
    const articlePage = readComponent('components/resources/SummerSlideDublinCaArticlePage.tsx');
    const dataModule = readComponent('data/resources/summer-slide-dublin-ca.ts');

    expect(articlePage).toContain('/camps/academic-summer-programs-dublin-ca');
    expectContainsHrefs(dataModule, [
      '/resources/tutoring-dublin-ca',
      '/resources/careless-math-mistakes',
    ]);
  });

  it('fixes tutoring-dublin-ca academic summer mislink and expands program links', () => {
    const source = readComponent('components/resources/TutoringDublinCaArticlePage.tsx');

    expect(source).toContain('/camps/academic-summer-programs-dublin-ca');
    expect(source).toContain('/courses/integrated-math-1-dublin-ca');
    expect(source).toContain('/camps/summer-im-get-ready-dublin-ca');
    expect(source).toContain('/camps/summer-im1-get-ready-dublin-ca');
    expect(source).toContain('/camps/summer-im2-get-ready-dublin-ca');

    const academicSummerParagraph = source.match(
      /Academic[\s\S]*?summer programs[\s\S]*?late winter\/early spring\./,
    )?.[0];
    expect(academicSummerParagraph).toBeDefined();
    expect(academicSummerParagraph).toContain('/camps/academic-summer-programs-dublin-ca');
    expect(academicSummerParagraph).not.toMatch(
      /Academic[\s\S]*?href="\/camps\/summer"[\s\S]*?summer programs/,
    );
  });

  it('does not force academic camp links into STEAM resource articles', () => {
    const vibeCoding = readComponent('components/resources/WhatIsVibeCodingPage.tsx');
    const pythonVsScratch = readComponent('components/resources/PythonVsScratchPage.tsx');

    for (const href of academicCampHrefs) {
      expect(vibeCoding).not.toContain(href);
      expect(pythonVsScratch).not.toContain(href);
    }
  });
});
