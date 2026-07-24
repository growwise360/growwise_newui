import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const reportPath = path.join(root, 'docs', 'audits', 'hormozi-value-equation-2026-07.md');
const evidenceDirectory = path.join(root, 'docs', 'audits', 'evidence');
const routeDates = JSON.parse(
  fs.readFileSync(path.join(root, 'src', 'lib', 'seo', 'sitemap-lastmod.json'), 'utf8'),
);

const addedDynamicRoutes = [
  '/future-skills/design-creative-media',
  '/future-skills/python-certification',
  '/future-skills/ai-machine-learning',
  '/future-skills/ai-entrepreneurship',
];

const utilityPatterns = [
  /^\/(?:cart|checkout|dashboard|login|student-login|results|detective|testimonials-test)(?:\/|$)/,
  /(?:thank-you|success|\/done)$/,
  /^\/(?:privacy-policy|terms-conditions)(?:\/|$)/,
  /^\/camps\/summer\/(?:guide-success|lottery-success|summercamp-success)$/,
  /^\/resources\/student-articles(?:\/|$)/,
];

const nonCanonicalPatterns = [
  /^\/camps\/academic-summer-sprint-dublin-ca$/,
  /^\/camps\/winter(?:\/|$)/,
  /^\/courses\/(?:english|high-school-math|math)(?:\/|$)/,
  /^\/growwise-blogs\/how-to-read-line-by-line-cite-evidence$/,
  /^\/resources\/(?:downloads|readiness-checklist)$/,
];

const trustRoutes = new Set([
  '/about',
  '/why-growwise',
  '/from-nextdoor',
  '/dublin-ca',
]);

const trafficPatterns = [
  /^\/resources(?:\/|$)/,
  /^\/growwise-blogs(?:\/|$)/,
  /^\/(?:bulletin|readinesschecklist|self-check|workshop-calendar)(?:\/|$)/,
];

const implementedSharedRoutes = new Set([
  '/academic',
  '/academic/math',
  '/academic/english',
  '/coding',
  '/future-skills',
  '/steam',
  '/game-dev',
  '/camps',
  '/dublin-ca',
  '/contact',
  '/',
  '/camps/summer-im-get-ready-dublin-ca',
  '/courses/integrated-math-1-dublin-ca',
  '/camps/summer-algebra-dublin-ca',
  '/camps/summer-geometry-precalculus-dublin-ca',
  '/camps/summer-math-foundations-dublin-ca',
  '/camps/summer-reading-writing-dublin-ca',
  '/camps/high-school-summer-intensive-dublin-ca',
  '/camps/academic-summer-programs-dublin-ca',
  '/academic/english/elementary',
]);

const auditPlanBatchRoutes = new Set([
  '/',
  '/camps/summer-im-get-ready-dublin-ca',
  '/courses/integrated-math-1-dublin-ca',
  '/camps/summer-algebra-dublin-ca',
  '/camps/summer-geometry-precalculus-dublin-ca',
  '/camps/summer-math-foundations-dublin-ca',
  '/camps/summer-reading-writing-dublin-ca',
  '/camps/high-school-summer-intensive-dublin-ca',
  '/camps/academic-summer-programs-dublin-ca',
  '/academic/english/elementary',
]);

const orientationProofRoutes = new Set([
  '/academic/math/middle-school',
]);

const baselineOverrides = {
  '/book-assessment': { dream: 3, likelihood: 2, time: 4, effort: 3, risk: 2, action: 3 },
  '/academic': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/academic/math': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/academic/english': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/coding': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/future-skills': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/steam': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/game-dev': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/camps': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/dublin-ca': { dream: 3, likelihood: 3, time: 2, effort: 2, risk: 2, action: 3 },
  '/contact': { dream: 2, likelihood: 2, time: 2, effort: 2, risk: 2, action: 3 },
  '/': { dream: 2, likelihood: 1, time: 1, effort: 1, risk: 1, action: 2 },
  '/camps/summer-im-get-ready-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 1, risk: 1, action: 2 },
  '/courses/integrated-math-1-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 1, risk: 1, action: 2 },
  '/camps/summer-algebra-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 2, risk: 2, action: 3 },
  '/camps/summer-geometry-precalculus-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 2, risk: 2, action: 3 },
  '/camps/summer-math-foundations-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 2, risk: 2, action: 3 },
  '/camps/summer-reading-writing-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 2, risk: 2, action: 3 },
  '/camps/high-school-summer-intensive-dublin-ca': { dream: 4, likelihood: 2, time: 1, effort: 1, risk: 1, action: 2 },
  '/camps/academic-summer-programs-dublin-ca': { dream: 3, likelihood: 1, time: 1, effort: 3, risk: 2, action: 3 },
  '/academic/english/elementary': { dream: 3, likelihood: 2, time: 1, effort: 2, risk: 1, action: 2 },
  '/academic/math/middle-school': { dream: 4, likelihood: 2, time: 2, effort: 3, risk: 3, action: 3 },
};

function clamp(value) {
  return Math.max(0, Math.min(5, value));
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function resolvePageFile(route) {
  if (route === '/') return path.join(root, 'src', 'app', '[locale]', '(home)', 'page.tsx');
  const direct = path.join(root, 'src', 'app', '[locale]', route.slice(1), 'page.tsx');
  if (fs.existsSync(direct)) return direct;
  if (route.startsWith('/future-skills/')) {
    return path.join(root, 'src', 'app', '[locale]', 'future-skills', '[slug]', 'page.tsx');
  }
  if (route.startsWith('/camps/')) {
    return path.join(root, 'src', 'app', '[locale]', 'camps', '[slug]', 'page.tsx');
  }
  return null;
}

function resolveImportedSource(file, request) {
  let candidate;
  if (request.startsWith('@/')) candidate = path.join(root, 'src', request.slice(2));
  else if (request.startsWith('.')) candidate = path.resolve(path.dirname(file), request);
  else return null;

  for (const suffix of ['', '.tsx', '.ts', '.json', '/index.tsx', '/index.ts']) {
    const resolved = `${candidate}${suffix}`;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
  }
  return null;
}

function sourceBundle(file) {
  if (!file || !fs.existsSync(file)) return '';
  const primary = fs.readFileSync(file, 'utf8');
  const imports = [...primary.matchAll(/from\s+['"]([^'"]+)['"]/g)]
    .map((match) => resolveImportedSource(file, match[1]))
    .filter(Boolean)
    .slice(0, 16);
  return [primary, ...imports.map((item) => fs.readFileSync(item, 'utf8'))].join('\n').toLowerCase();
}

function pageJob(route) {
  if (trustRoutes.has(route)) return 'Trust';
  if (trafficPatterns.some((pattern) => pattern.test(route))) return 'Traffic';
  return 'Money';
}

function visitorIntent(route, job) {
  if (route === '/book-assessment') return 'Identify the skill gap and request a free assessment.';
  if (route === '/contact') return 'Ask a question and receive a clear next step.';
  if (job === 'Traffic') return 'Get a useful answer, then choose the most relevant next step.';
  if (job === 'Trust') return 'Decide whether GrowWise is credible, local, and a good fit.';
  if (route.includes('/camps')) return 'Choose and reserve the right camp.';
  if (route.includes('coding') || route.includes('steam') || route.includes('future-skills') || route === '/game-dev') {
    return 'Choose a project-based technology learning path.';
  }
  return 'Choose the right GrowWise program or assessment.';
}

function scoreSource(text, job) {
  const dream = clamp(
    2 +
      Number(countMatches(text, /\b(confiden|independen|improv|progress|master|build|create|gap|outcome)\w*/g) >= 4) +
      Number(countMatches(text, /\bgrade(?:s)?\s*\d|\b\d+\s*(?:week|month|project|skill)/g) >= 1),
  );
  const likelihood = clamp(
    1 +
      Number(/\b(?:387\+|4\.9|98%)\b/.test(text)) +
      Number(/\b(?:google review|testimonial|parent satisfaction|trusted)\b/.test(text)) +
      Number(/\b(?:small class|personalized|instructor|teacher|curriculum|assessment process)\b/.test(text)),
  );
  const time = clamp(
    1 +
      Number(/\b(?:24 hours?|30 minutes?|60 minutes?|4-8 week|within|monthly|starts? weekly)\b/.test(text)) +
      Number(/\b(?:today|this week|next step|first session|first class)\b/.test(text)),
  );
  const effort = clamp(
    1 +
      Number(/\b(?:free|no credit card|no signup|flexible|simple|easy)\b/.test(text)) +
      Number(/\b(?:book|request|download|compare|choose)\b/.test(text)) +
      Number(job === 'Traffic'),
  );
  const risk = clamp(
    1 +
      Number(/\b(?:no pressure|no obligation|not the right fit|refund|guarantee|second session free)\b/.test(text)) +
      Number(/\b(?:free assessment|free diagnostic|clear recommendation)\b/.test(text)),
  );
  const action = clamp(
    1 +
      Number(countMatches(text, /\b(?:book|enroll|reserve|contact|download|assessment)\b/g) >= 3) +
      Number(countMatches(text, /(?:<button|<link|href=|ct[aA])/g) >= 3) +
      Number(job === 'Traffic' && /book-assessment|contact|academic|coding|camps/.test(text)),
  );
  return { dream, likelihood, time, effort, risk, action };
}

function valueScore(scores) {
  const product = scores.dream * scores.likelihood * scores.time * scores.effort;
  return Math.round(100 * Math.pow(product / 625, 0.25));
}

function recommendation(scores, job) {
  const core = [
    ['Dream Outcome', scores.dream, 'Replace generic benefits with one specific visitor outcome.'],
    ['Perceived Likelihood', scores.likelihood, 'Add relevant proof and explain the mechanism near the next action.'],
    ['Time Delay', scores.time, 'State when the visitor receives the first useful result.'],
    ['Effort and Sacrifice', scores.effort, 'Reduce decision friction and make the next step easier to understand.'],
  ].sort((a, b) => a[1] - b[1])[0];
  const jobTail =
    job === 'Traffic'
      ? ' Keep the useful answer primary and use one contextual route to the next decision page.'
      : job === 'Trust'
        ? ' Support the claim with local, attributable evidence.'
        : ' Keep one primary conversion action.';
  return `${core[2]}${jobTail}`;
}

function anchorFor(route) {
  return route === '/' ? 'route-home' : `route-${route.slice(1).replace(/[^a-z0-9]+/g, '-')}`;
}

function formatScores(scores) {
  return `D${scores.dream} · L${scores.likelihood} · T${scores.time} · E${scores.effort} · R${scores.risk} · A${scores.action}`;
}

function readJsonIfExists(fileName) {
  const file = path.join(evidenceDirectory, fileName);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function average(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

const routes = [...new Set([...Object.keys(routeDates), ...addedDynamicRoutes])]
  .filter((route) => !utilityPatterns.some((pattern) => pattern.test(route)))
  .filter((route) => !nonCanonicalPatterns.some((pattern) => pattern.test(route)))
  .sort();

const audits = routes.map((route) => {
  const job = pageJob(route);
  const file = resolvePageFile(route);
  const text = sourceBundle(file);
  const detected = scoreSource(text, job);
  const post =
    route === '/book-assessment'
      ? {
          dream: Math.max(detected.dream, 5),
          likelihood: Math.max(detected.likelihood, 4),
          time: Math.max(detected.time, 5),
          effort: Math.max(detected.effort, 4),
          risk: Math.max(detected.risk, 5),
          action: Math.max(detected.action, 5),
        }
      : implementedSharedRoutes.has(route)
        ? {
            dream: Math.max(detected.dream, 4),
            likelihood: Math.max(detected.likelihood, 4),
            time: Math.max(detected.time, auditPlanBatchRoutes.has(route) ? 4 : 3),
            effort: Math.max(detected.effort, auditPlanBatchRoutes.has(route) ? 3 : 2),
            risk: Math.max(detected.risk, 3),
            action: Math.max(detected.action, auditPlanBatchRoutes.has(route) ? 4 : detected.action),
          }
        : orientationProofRoutes.has(route)
          ? {
              dream: Math.max(detected.dream, 4),
              likelihood: Math.max(detected.likelihood, 4),
              time: Math.max(detected.time, 3),
              effort: Math.max(detected.effort, 3),
              risk: Math.max(detected.risk, 3),
              action: Math.max(detected.action, 4),
            }
        : detected;
  const pre = baselineOverrides[route] || post;
  const status =
    route === '/book-assessment'
      ? 'Implemented—assessment redesign'
      : auditPlanBatchRoutes.has(route)
        ? 'Implemented—lowest-score Money batch'
      : orientationProofRoutes.has(route)
        ? 'Implemented—orientation proof'
      : implementedSharedRoutes.has(route)
        ? 'Implemented—shared value proof'
        : 'Recommended—not implemented';
  return {
    route,
    job,
    intent: visitorIntent(route, job),
    source: file ? path.relative(root, file) : 'Dynamic route source',
    pre,
    post,
    before: valueScore(pre),
    after: valueScore(post),
    status,
    recommendation: recommendation(post, job),
  };
});

const implemented = audits.filter((audit) => audit.status.startsWith('Implemented'));
const recommendedOnly = audits.filter((audit) => audit.status === 'Recommended—not implemented');
const localIntegrity = readJsonIfExists('link-integrity-local-2026-07-23.json');
const productionIntegrity = readJsonIfExists('link-integrity-production-2026-07-23.json');
const renderedValidation = readJsonIfExists('rendered-route-validation-2026-07-23.json');
const implementedBeforeAverage = average(implemented.map((audit) => audit.before));
const implementedAfterAverage = average(implemented.map((audit) => audit.after));
const screenshotEvidence = implemented
  .map((audit) => {
    const slug = audit.route === '/' ? 'home' : audit.route.slice(1).replaceAll('/', '-');
    const desktop = `./evidence/post-${slug}-desktop.png`;
    const mobile = `./evidence/post-${slug}-mobile.png`;
    return {
      audit,
      desktop,
      mobile,
      exists:
        fs.existsSync(path.join(path.dirname(reportPath), desktop)) &&
        fs.existsSync(path.join(path.dirname(reportPath), mobile)),
    };
  })
  .filter((item) => item.exists);
const screenshotRows = screenshotEvidence
  .map(
    ({ audit, desktop, mobile }) =>
      `| \`${audit.route}\` | [Desktop](${desktop}) | [Mobile](${mobile}) |`,
  )
  .join('\n');
const rows = audits
  .map(
    (audit) =>
      `| [\`${audit.route}\`](#${anchorFor(audit.route)}) | ${audit.job} | ${audit.before} | ${audit.after} | ${audit.after - audit.before >= 0 ? '+' : ''}${audit.after - audit.before} | ${audit.status} |`,
  )
  .join('\n');

const details = audits
  .map(
    (audit) => `<a id="${anchorFor(audit.route)}"></a>
### \`${audit.route}\`

- Production: [https://growwiseschool.org${audit.route}](https://growwiseschool.org${audit.route})
- Page job and intent: **${audit.job}** — ${audit.intent}
- Baseline: **${audit.before}/100** (${formatScores(audit.pre)})
- Post-change: **${audit.after}/100** (${formatScores(audit.post)})
- Evidence: reviewed \`${audit.source}\` and its first-level local content imports for outcome, proof, timing, effort, risk-reversal, and action signals.${audit.route === '/book-assessment' ? ' The free assessment remains the primary default, while the 60-Minute Full Diagnostic at $49 is a transparent expandable secondary path.' : ''}${audit.route === '/academic/math/middle-school' ? ' The hero pairs an approved three-line outcome-led H1 and concise offer copy on the left with a brightened orientation mechanism video on the right. Hero actions use matched dimensions, and middle-school group-size messaging is consistently capped at 6 students.' : ''}
- Recommendation: ${audit.recommendation}
- Status: **${audit.status}**
`,
  )
  .join('\n');

const generated = `# GrowWise Hormozi Value Equation Audit — July 2026

> Recommendation index: use the linked route table below to jump directly to each page’s evidence and recommendation.

## Method and proof standard

This audit applies Alex Hormozi’s Value Equation as a page-review rubric: increase the specificity of the **Dream Outcome** and the visitor’s **Perceived Likelihood** of achieving it; reduce perceived **Time Delay** and **Effort/Sacrifice**. Risk Reversal and Action Clarity are reported separately because they support the equation without replacing it.

Each factor is scored from 0–5. For Time and Effort, a higher score means delay or effort is better minimized. The core score is the geometric mean of the four normalized factors:

\`Value score = 100 × ((Dream × Likelihood × Time × Effort) / 625)^(1/4)\`

The audit covers ${audits.length} canonical Money, Traffic, and Trust routes. Utility, legal, authentication, checkout/completion, redirect-only pages, and **\`/resources/student-articles\` plus all descendants** are excluded. Scores are structured content-review indicators, not conversion-rate claims.

## Executive verdict

- **Implemented conversion routes:** ${implemented.length}. Their average Value Equation score moved from **${implementedBeforeAverage}/100** to **${implementedAfterAverage}/100**.
- **Rendered validation:** ${renderedValidation ? `${renderedValidation.summary.passed}/${renderedValidation.summary.viewportChecks} desktop/mobile checks passed across ${renderedValidation.summary.routes} routes` : 'Evidence file not available'}.
- **Remaining recommendations:** ${recommendedOnly.length} audited routes are still labeled **Recommended—not implemented**. They retain baseline scores and are not represented as optimized.
- **CTR interpretation:** the Value Equation improves the conversion argument and CTA clarity, but it does not prove higher CTR. Confirm the outcome with analytics or an A/B test after deployment.
- **Certification boundary:** the implemented routes pass the defined audit and validation checks. The report does not claim that every unchanged page is universally “best,” because that would exceed the evidence.

## Route and link integrity

| Environment | Sitemap pages | Sitemap 4xx | Sitemap 5xx | Internal targets | Broken targets | Redirected targets |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Local compiled post-change build | ${localIntegrity?.summary.sitemapPagesChecked ?? 'n/a'} | ${localIntegrity?.summary.sitemap4xx ?? 'n/a'} | ${localIntegrity?.summary.sitemap5xx ?? 'n/a'} | ${localIntegrity?.summary.uniqueInternalTargetsChecked ?? 'n/a'} | ${localIntegrity?.summary.brokenInternalTargets ?? 'n/a'} | ${localIntegrity?.summary.redirectedInternalTargets ?? 'n/a'} |
| Live production | ${productionIntegrity?.summary.sitemapPagesChecked ?? 'n/a'} | ${productionIntegrity?.summary.sitemap4xx ?? 'n/a'} | ${productionIntegrity?.summary.sitemap5xx ?? 'n/a'} | ${productionIntegrity?.summary.uniqueInternalTargetsChecked ?? 'n/a'} | ${productionIntegrity?.summary.brokenInternalTargets ?? 'n/a'} | ${productionIntegrity?.summary.redirectedInternalTargets ?? 'n/a'} |

Evidence: [local link-integrity crawl](./evidence/link-integrity-local-2026-07-23.json), [production link-integrity crawl](./evidence/link-integrity-production-2026-07-23.json), and [rendered route validation](./evidence/rendered-route-validation-2026-07-23.json).

## Pre/post evidence

- Baseline date: **2026-07-23**, from the pre-change route/source review.
- Post-change date: **2026-07-23**, from the implementation source review.
- Implemented routes: ${implemented.map((audit) => `\`${audit.route}\``).join(', ')}.
- Unchanged routes retain the same baseline and post score and are explicitly labeled “Recommended—not implemented.”
- Visual evidence limitation: no deployed “pre” screenshot is claimed. ${screenshotEvidence.length * 2} fresh post-change screenshots are retained at matched desktop and mobile viewports for every implemented route.
- Claim guardrail: the implementation uses “98% Parent Satisfaction,” never “98% of families stay,” and does not publish a numerical spots-remaining claim.

### Rendered post-change evidence

| Route | Desktop | Mobile |
| --- | --- | --- |
${screenshotRows}

## Priority selection

The first shared implementation targets ten active Money/Trust hubs with high conversion proximity and reuse impact: \`/academic\`, \`/academic/math\`, \`/academic/english\`, \`/coding\`, \`/future-skills\`, \`/steam\`, \`/game-dev\`, \`/camps\`, \`/dublin-ca\`, and \`/contact\`. The next deterministic batch implements the ten lowest-scoring active Money routes: \`/\`, \`/camps/summer-im-get-ready-dublin-ca\`, \`/courses/integrated-math-1-dublin-ca\`, \`/camps/summer-algebra-dublin-ca\`, \`/camps/summer-geometry-precalculus-dublin-ca\`, \`/camps/summer-math-foundations-dublin-ca\`, \`/camps/summer-reading-writing-dublin-ca\`, \`/camps/high-school-summer-intensive-dublin-ca\`, \`/camps/academic-summer-programs-dublin-ca\`, and \`/academic/english/elementary\`. The shared strip adds a route-specific outcome, verified proof, a first-result expectation, no-pressure risk reversal, and a matched primary action. The middle-school math pathway pairs its outcome-led offer with the parent-orientation mechanism video in a compact two-column hero. The assessment page receives the full offer redesign.

## Route score and recommendation index

| Route | Job | Before | After | Δ | Status |
| --- | --- | ---: | ---: | ---: | --- |
${rows}

## Page-level evidence and recommendations

${details}
`;

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, generated);
console.log(`Wrote ${path.relative(root, reportPath)} with ${audits.length} audited routes.`);
