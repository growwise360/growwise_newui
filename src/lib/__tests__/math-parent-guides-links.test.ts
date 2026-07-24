import fs from 'node:fs';
import path from 'node:path';

import {
  MATH_PARENT_GUIDES_BY_PAGE,
  MATH_CARELESS_MISTAKES_GUIDE,
  MATH_GAP_SELF_CHECK,
} from '@/lib/math-parent-guides';

const UI_ROOT = path.join(__dirname, '..', '..');

function readComponent(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8');
}

function expectContainsHrefs(source: string, hrefs: readonly string[]): void {
  for (const href of hrefs) {
    expect(source).toContain(href);
  }
}

describe('math parent guides internal links', () => {
  it('defines gap-pattern guides for every math program page', () => {
    for (const pageId of ['hub', 'elementary', 'middle-school', 'high-school-math'] as const) {
      const hrefs = MATH_PARENT_GUIDES_BY_PAGE[pageId].map((g) => g.href);
      expect(hrefs).toContain(MATH_GAP_SELF_CHECK.href);
      expect(hrefs).toContain(MATH_CARELESS_MISTAKES_GUIDE.href);
    }
  });

  it('renders parent guides on math program pages', () => {
    const hub = readComponent('components/courses/MathHubPage.tsx');
    const elementary = readComponent('components/ElementaryMathPage.tsx');
    const middle = readComponent('components/MiddleSchoolMathPage.tsx');
    const highSchool = readComponent('components/HighSchoolMathPage.tsx');
    expect(hub).toContain('MathParentGuidesSection');
    expect(hub).toContain('pageId="hub"');
    expect(elementary).toContain('pageId="elementary"');
    expect(middle).toContain('pageId="middle-school"');
    expect(highSchool).toContain('pageId="high-school-math"');
    expect(highSchool).toContain('RelatedContent');
  });

  it('links grade-band stub pages via band guides section', () => {
    const source = readComponent('components/courses/MathGradeBandStubPage.tsx');
    expect(source).toContain('MathParentGuidesBandSection');
  });
});
