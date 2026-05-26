import fs from 'node:fs';
import path from 'node:path';

const UI_ROOT = path.join(__dirname, '..', '..');

function readComponent(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8');
}

describe('resources internal links', () => {
  it('links reading-fluency-vs-comprehension to self-check and reading sprint', () => {
    const source = readComponent('components/resources/ReadingFluencyVsComprehensionPage.tsx');
    expect(source).toContain('/self-check');
    expect(source).toContain('/camps/summer-reading-writing-dublin-ca');
  });

  it('links homework-independence to reading-fluency-vs-comprehension', () => {
    const source = readComponent('components/resources/HomeworkIndependencePage.tsx');
    expect(source).toContain('/resources/reading-fluency-vs-comprehension');
  });

  it('links courses/english to reading-fluency-vs-comprehension', () => {
    const source = readComponent('app/[locale]/courses/english/page.tsx');
    expect(source).toContain('/resources/reading-fluency-vs-comprehension');
  });

  it('links summer reading landing to reading-fluency-vs-comprehension', () => {
    const source = readComponent('components/camps/AcademicSeoLandingPage.tsx');
    expect(source).toContain('/resources/reading-fluency-vs-comprehension');
  });
});
