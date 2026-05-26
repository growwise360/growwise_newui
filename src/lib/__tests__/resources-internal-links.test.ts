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
      '/courses/high-school-math',
    ]);
  });

  it('links homework-independence to the academic summer hub', () => {
    const source = readComponent('components/resources/HomeworkIndependencePage.tsx');
    expectContainsHrefs(source, ['/camps/academic-summer-programs-dublin-ca']);
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
