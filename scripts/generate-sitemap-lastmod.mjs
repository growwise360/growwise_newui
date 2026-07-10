#!/usr/bin/env node
/**
 * Generates src/lib/seo/sitemap-lastmod.json — a map of public path → last
 * meaningful change date (YYYY-MM-DD) derived from git history of each route's
 * source directory.
 *
 * Why committed JSON instead of computing at build time: Vercel builds use a
 * shallow git clone, so `git log` there would silently return wrong/no dates.
 * Re-run this script (npm run seo:lastmod) whenever page content changes and
 * commit the result. Dates must reflect real content edits — never fake them
 * to the deploy date (Google learns to ignore lastmod otherwise).
 *
 * Route resolution:
 * - `/`               → src/app/[locale]/(home)
 * - static routes     → src/app/[locale]<path> directory (recursive walk)
 * - dynamic /camps/*  → src/lib/camps/camp-data.ts (content source of truth)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALE_DIR = join(ROOT, 'src', 'app', '[locale]');
const CAMP_DATA = join(ROOT, 'src', 'lib', 'camps', 'camp-data.ts');
const OUTPUT = join(ROOT, 'src', 'lib', 'seo', 'sitemap-lastmod.json');

function gitDate(target) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', target], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    return iso ? iso.slice(0, 10) : null;
  } catch {
    return null;
  }
}

/** Walk [locale] recursively; map each page.tsx-bearing directory to its public path. */
function collectRoutes(dir, publicPath) {
  const routes = [];
  const entries = readdirSync(dir);
  if (entries.includes('page.tsx') || entries.includes('page.ts')) {
    routes.push({ path: publicPath === '' ? '/' : publicPath, source: dir });
  }
  for (const entry of entries) {
    const child = join(dir, entry);
    if (!statSync(child).isDirectory()) continue;
    if (entry.startsWith('[')) continue; // dynamic segments handled separately
    // Route groups like (home) contribute no URL segment.
    const segment = entry.startsWith('(') && entry.endsWith(')') ? '' : `/${entry}`;
    routes.push(...collectRoutes(child, `${publicPath}${segment}`));
  }
  return routes;
}

function campSlugs() {
  const source = readFileSync(CAMP_DATA, 'utf8');
  return [...source.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]);
}

const map = {};

for (const { path, source } of collectRoutes(LOCALE_DIR, '')) {
  const date = gitDate(source);
  if (date) map[path] = date;
}

const campDataDate = gitDate(CAMP_DATA);
for (const slug of campSlugs()) {
  const path = `/camps/${slug}`;
  // Static route dirs (already collected) win over the camp-data fallback.
  if (!map[path] && campDataDate) map[path] = campDataDate;
}

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUTPUT, `${JSON.stringify(sorted, null, 2)}\n`);

const dates = new Set(Object.values(sorted));
console.log(`Wrote ${Object.keys(sorted).length} paths (${dates.size} distinct dates) to ${OUTPUT}`);
if (dates.size < 2) {
  console.error('ERROR: fewer than 2 distinct lastmod dates — refusing to look like a faked deploy date.');
  process.exit(1);
}
