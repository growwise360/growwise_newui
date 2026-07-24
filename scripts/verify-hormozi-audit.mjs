#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('.')
const reportPath = path.join(root, 'docs', 'audits', 'hormozi-value-equation-2026-07.md')
const report = fs.readFileSync(reportPath, 'utf8')
const evidenceLinks = [...report.matchAll(/\]\((\.\/evidence\/[^)]+)\)/g)].map((match) => match[1])
const missingEvidence = [...new Set(
  evidenceLinks.filter((link) => !fs.existsSync(path.resolve(path.dirname(reportPath), link))),
)]
const routeAnchors = (report.match(/<a id="route-/g) || []).length
const routeRows = (report.match(/^\| \[`\//gm) || []).length
const studentArticleScored = report.includes('### `/resources/student-articles')
const localIntegrity = JSON.parse(
  fs.readFileSync(path.join(root, 'docs', 'audits', 'evidence', 'link-integrity-local-2026-07-23.json'), 'utf8'),
)
const productionIntegrity = JSON.parse(
  fs.readFileSync(path.join(root, 'docs', 'audits', 'evidence', 'link-integrity-production-2026-07-23.json'), 'utf8'),
)
const renderedValidation = JSON.parse(
  fs.readFileSync(path.join(root, 'docs', 'audits', 'evidence', 'rendered-route-validation-2026-07-23.json'), 'utf8'),
)

const result = {
  evidenceLinks: evidenceLinks.length,
  missingEvidence,
  routeAnchors,
  routeRows,
  studentArticleScored,
  localBrokenTargets: localIntegrity.summary.brokenInternalTargets,
  productionBrokenTargets: productionIntegrity.summary.brokenInternalTargets,
  renderedFailures: renderedValidation.summary.failed,
}

console.log(JSON.stringify(result, null, 2))

if (
  missingEvidence.length ||
  routeAnchors !== routeRows ||
  studentArticleScored ||
  localIntegrity.summary.brokenInternalTargets ||
  productionIntegrity.summary.brokenInternalTargets ||
  renderedValidation.summary.failed
) {
  process.exitCode = 1
}
