/**
 * @jest-environment node
 *
 * Regression guard for the header logo slogan alignment.
 *
 * Background
 * ----------
 * growwise-logo.png is 560×322 px but its opaque content occupies only the
 * centre of the canvas (bbox: top=98 bottom=223 left=38 right=522, i.e. 484×125 px).
 * That means 30.4% transparent padding top & bottom and 6.8% on the left.
 *
 * At every breakpoint the logo image is height-constrained (object-contain), so
 * the transparent areas scale proportionally with the CSS height.  The
 * .header-logo-slogan block in globals.css must carry compensating margin-top and
 * padding-left values — otherwise the slogan appears floating far below the
 * visible logo and misaligned to its left edge.
 *
 * If the logo PNG is ever replaced, re-run  node scripts/measure-logo-padding.js
 * to recalculate the correct CSS values, update globals.css, then update the
 * constants below so these tests pass again.
 */
import fs from 'fs';
import path from 'path';

const CSS_FILE = path.resolve(__dirname, '../../../../app/globals.css');

// Canonical values derived from PNG pixel scan (scripts/measure-logo-padding.js).
// formula: mt = −floor(98 × h/322) + 2px breathing; pl = round(38 × h/322)
const LOCKED = {
  mobile:  { mt: -11, pl: 5  }, // h-11 (44px) / max-sm h=42px
  sm:      { mt: -13, pl: 6  }, // sm:h-12 (48px)
  lg:      { mt: -18, pl: 8  }, // lg:h-16 (64px)
  xl:      { mt: -22, pl: 9  }, // xl:h-20 (80px)
  _2xl:    { mt: -25, pl: 10 }, // 2xl:h-[88px]
};

describe('Header logo slogan alignment — CSS lock against PNG transparent padding', () => {
  let css: string;

  beforeAll(() => {
    css = fs.readFileSync(CSS_FILE, 'utf-8');
  });

  it('globals.css contains the LOCKED comment sentinel', () => {
    expect(css).toContain('LOCKED — compensates for transparent canvas padding');
  });

  it(`mobile base: margin-top ${LOCKED.mobile.mt}px  padding-left ${LOCKED.mobile.pl}px`, () => {
    const block = css.match(/\.header-logo-slogan\s*\{[\s\S]*?\}/);
    expect(block).not.toBeNull();
    expect(block![0]).toMatch(new RegExp(`margin-top:\\s*${LOCKED.mobile.mt}px`));
    expect(block![0]).toMatch(new RegExp(`padding-left:\\s*${LOCKED.mobile.pl}px`));
  });

  it(`sm breakpoint (min-width:640px): margin-top ${LOCKED.sm.mt}px`, () => {
    const match = css.match(/@media\s*\(min-width:\s*640px\)[\s\S]*?\.header-logo-slogan\s*\{([^}]+)\}/);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(new RegExp(`margin-top:\\s*${LOCKED.sm.mt}px`));
    expect(match![1]).toMatch(new RegExp(`padding-left:\\s*${LOCKED.sm.pl}px`));
  });

  it(`lg breakpoint (min-width:1024px): margin-top ${LOCKED.lg.mt}px`, () => {
    const match = css.match(/@media\s*\(min-width:\s*1024px\)[\s\S]*?\.header-logo-slogan\s*\{([^}]+)\}/);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(new RegExp(`margin-top:\\s*${LOCKED.lg.mt}px`));
  });

  it(`xl breakpoint (min-width:1280px): margin-top ${LOCKED.xl.mt}px`, () => {
    const match = css.match(/@media\s*\(min-width:\s*1280px\)[\s\S]*?\.header-logo-slogan\s*\{([^}]+)\}/);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(new RegExp(`margin-top:\\s*${LOCKED.xl.mt}px`));
  });

  it(`2xl breakpoint (min-width:1536px): margin-top ${LOCKED._2xl.mt}px`, () => {
    const match = css.match(/@media\s*\(min-width:\s*1536px\)[\s\S]*?\.header-logo-slogan\s*\{([^}]+)\}/);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(new RegExp(`margin-top:\\s*${LOCKED._2xl.mt}px`));
  });

  it('slogan uses text-left (not text-center) so it aligns with logo image left edge', () => {
    const block = css.match(/\.header-logo-slogan\s*\{[\s\S]*?\}/);
    expect(block).not.toBeNull();
    expect(block![0]).toContain('text-left');
    expect(block![0]).not.toContain('text-center');
  });

  it('header-logo-wrap CSS class includes flex flex-col items-start (layout consolidated into CSS)', () => {
    const block = css.match(/\.header-logo-wrap\s*\{[^}]+\}/);
    expect(block).not.toBeNull();
    expect(block![0]).toContain('flex-col');
    expect(block![0]).toContain('items-start');
  });
});
