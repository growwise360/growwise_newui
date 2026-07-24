import fs from 'node:fs';
import path from 'node:path';

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') return [];
      return walk(fullPath);
    }
    if (/\.(?:test|spec)\.(?:ts|tsx)$/.test(entry.name)) return [];
    return /\.(?:ts|tsx|json)$/.test(entry.name) ? [fullPath] : [];
  });
}

describe('Hormozi proof claim safety', () => {
  const sourceRoot = path.join(process.cwd(), 'src');
  const publicRoot = path.join(process.cwd(), 'public');
  const corpus = [...walk(sourceRoot), ...walk(publicRoot)]
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n');

  it('does not publish unsupported assessment scarcity', () => {
    expect(corpus).not.toMatch(/12 spots left/i);
  });

  it('does not reinterpret satisfaction as retention', () => {
    expect(corpus).not.toMatch(/98% of families stay/i);
  });

  it('keeps the middle-school math group-size claim capped at six', () => {
    const middleSchoolClaimCorpus = [
      path.join(sourceRoot, 'components/MiddleSchoolMathPage.tsx'),
      path.join(sourceRoot, 'lib/middle-school-math-program-copy.ts'),
    ]
      .map((file) => fs.readFileSync(file, 'utf8'))
      .join('\n');

    expect(middleSchoolClaimCorpus).toMatch(/up to 6 students/i);
    expect(middleSchoolClaimCorpus).not.toMatch(/6[–-]10 students/i);
  });
});
