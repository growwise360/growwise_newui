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
});
