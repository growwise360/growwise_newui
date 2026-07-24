import fs from 'node:fs';
import path from 'node:path';
import {
  getParentGuidesForAcademicHub,
  getParentGuidesForLandingPage,
  getParentGuidesForSatPrepPage,
} from '@/lib/academic-seo-parent-guides';

const UI_ROOT = path.join(__dirname, '..', '..');

function readComponent(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8');
}

describe('academic-seo-parent-guides', () => {
  it('maps mistake-pattern landing pages to the careless math mistakes guide', () => {
    for (const pageId of ['mathFoundations', 'algebra', 'imGetReady', 'im1GetReady', 'im2GetReady'] as const) {
      expect(getParentGuidesForLandingPage(pageId)).toEqual([
        expect.objectContaining({ href: '/resources/careless-math-mistakes' }),
      ]);
    }
  });

  it('maps the academic hub to the Dublin tutoring guide', () => {
    expect(getParentGuidesForAcademicHub()).toEqual([
      expect.objectContaining({ href: '/resources/tutoring-dublin-ca' }),
    ]);
  });

  it('maps the SAT prep page to the SAT timeline guide', () => {
    expect(getParentGuidesForSatPrepPage()).toEqual([
      expect.objectContaining({ href: '/resources/when-to-start-sat-prep' }),
    ]);
  });

  it('renders parent guide blocks on key landing pages', () => {
    expect(readComponent('components/camps/AcademicSeoLandingPage.tsx')).toContain('AcademicSeoParentGuidesBlock');
    expect(readComponent('components/camps/ImTrackGetReadySeoLandingPage.tsx')).toContain(
      'AcademicSeoParentGuidesBlock',
    );
    expect(readComponent('components/camps/ImGetReadySeoLandingPage.tsx')).toContain('getParentGuidesForLandingPage');
    expect(readComponent('components/camps/AcademicSummerProgramsPage.tsx')).toContain(
      'getParentGuidesForAcademicHub',
    );
    expect(readComponent('components/SATPage.tsx')).toContain('getParentGuidesForSatPrepPage');
  });
});
