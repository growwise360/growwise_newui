#!/usr/bin/env node
/**
 * Measures transparent-canvas padding in growwise-logo.png and prints the
 * CSS margin-top / padding-left values needed for .header-logo-slogan in
 * src/app/globals.css.
 *
 * Usage:  node scripts/measure-logo-padding.js
 *
 * When to run:
 *   - After replacing /public/assets/growwise-logo.png
 *   - After changing logo CSS heights in globals.css
 *
 * Then update:
 *   1. The CSS values in globals.css (.header-logo-slogan block)
 *   2. The LOCKED constants in src/components/layout/Header/__tests__/header-logo-alignment.test.ts
 */

'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const LOGO_PATH = path.resolve(__dirname, '../public/assets/growwise-logo.png');
const BREATHING_PX = 2; // desired gap between visual logo bottom and slogan top

// CSS heights at each Tailwind breakpoint (from globals.css .header-logo class)
const BREAKPOINTS = [
  { name: 'mobile base',    minW: 0,    cssH: 44,  jsClass: 'h-11'       },
  { name: 'max-sm override',minW: 0,    cssH: 42,  jsClass: '@max-640'   },
  { name: 'sm',             minW: 640,  cssH: 48,  jsClass: 'sm:h-12'    },
  { name: 'lg',             minW: 1024, cssH: 64,  jsClass: 'lg:h-16'    },
  { name: 'xl',             minW: 1280, cssH: 80,  jsClass: 'xl:h-20'    },
  { name: '2xl',            minW: 1536, cssH: 88,  jsClass: '2xl:h-[88px]' },
];

function parsePng(filePath) {
  const buf = fs.readFileSync(filePath);
  let offset = 8; // skip 8-byte PNG signature
  const chunks = [];
  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset); offset += 4;
    const type   = buf.toString('ascii', offset, offset + 4); offset += 4;
    const data   = buf.subarray(offset, offset + length); offset += length;
    offset += 4; // skip CRC
    chunks.push({ type, data });
    if (type === 'IEND') break;
  }
  return chunks;
}

function findContentBounds(chunks, W, H, channels) {
  const idatBufs = chunks.filter(c => c.type === 'IDAT').map(c => c.data);
  const raw = zlib.inflateSync(Buffer.concat(idatBufs));
  const stride = 1 + W * channels; // 1 filter byte per row

  function rowHasContent(r) {
    const base = r * stride + 1;
    for (let col = channels - 1; col < W * channels; col += channels) {
      if (raw[base + col] > 10) return true; // alpha > 10
    }
    return false;
  }

  const top    = Array.from({ length: H }, (_, i) => i).find(rowHasContent) ?? 0;
  const bottom = Array.from({ length: H }, (_, i) => H - 1 - i).find(rowHasContent) ?? H - 1;

  return { top, bottom };
}

// --- main ---
const chunks = parsePng(LOGO_PATH);
const ihdr = chunks.find(c => c.type === 'IHDR').data;
const W = ihdr.readUInt32BE(0);
const H = ihdr.readUInt32BE(4);
const colorType = ihdr[9];
const channels  = colorType === 6 ? 4 : 3; // 6=RGBA, 2=RGB

console.log(`\nLogo PNG: ${W}×${H}  color_type=${colorType} (${channels} channels)\n`);

const { top, bottom } = findContentBounds(chunks, W, H, channels);
const leftPadPx   = 38; // pre-computed; column scan omitted for speed (add if needed)
console.log(`Content bbox: top=${top} bottom=${bottom}  (left≈${leftPadPx})\n`);

const bottomPadPng = H - 1 - bottom;
console.log('CSS values for .header-logo-slogan in src/app/globals.css:\n');

for (const bp of BREAKPOINTS) {
  const scale          = bp.cssH / H;
  const bottomTranspPx = bottomPadPng * scale;
  const leftTranspPx   = leftPadPx  * scale;
  const mt = -(Math.round(bottomTranspPx) - BREATHING_PX);
  const pl =   Math.round(leftTranspPx);
  console.log(
    `  ${bp.name.padEnd(22)} (${bp.jsClass.padEnd(14)})` +
    `  margin-top: ${String(mt).padStart(4)}px;  padding-left: ${pl}px;`,
  );
}

console.log('\nUpdate globals.css then update LOCKED constants in:');
console.log('  src/components/layout/Header/__tests__/header-logo-alignment.test.ts\n');
