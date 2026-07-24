#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'

const baseUrl = (process.env.E2E_BASE_URL || 'http://127.0.0.1:3002').replace(/\/$/, '')
const outputPath = process.env.RENDER_AUDIT_OUTPUT ||
  'docs/audits/evidence/rendered-route-validation-2026-07-23.json'
const defaultRoutes = [
  '/book-assessment',
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
  '/academic/math/middle-school',
]
const routes = process.env.RENDER_AUDIT_ROUTES
  ? process.env.RENDER_AUDIT_ROUTES.split(',').map((route) => route.trim()).filter(Boolean)
  : defaultRoutes
const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
}

function isIgnorableConsoleError(text) {
  return (
    text.includes('favicon') ||
    text.includes('ERR_BLOCKED_BY_CLIENT') ||
    text.includes('Failed to load resource') && text.includes('youtube')
  )
}

function isExpectedEnvironmentResponse(response) {
  return (
    baseUrl.includes('127.0.0.1') &&
    response.status() === 403 &&
    response.url().includes('/api/visitor-events')
  )
}

const browser = await chromium.launch({ headless: true })
const checks = []

try {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport })

    for (const route of routes) {
      const page = await context.newPage()
      const consoleErrors = []
      const pageErrors = []
      const failedResponses = []
      const environmentResponses = []

      page.on('console', (message) => {
        if (message.type() === 'error' && !isIgnorableConsoleError(message.text())) {
          consoleErrors.push(message.text())
        }
      })
      page.on('pageerror', (error) => pageErrors.push(error.message))
      page.on('response', (response) => {
        if (response.status() >= 400) {
          const item = {
            status: response.status(),
            url: response.url(),
            resourceType: response.request().resourceType(),
          }
          if (isExpectedEnvironmentResponse(response)) environmentResponses.push(item)
          else failedResponses.push(item)
        }
      })

      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 45_000,
      })
      await page.locator('#main-content').waitFor({ state: 'visible' })
      await page.waitForTimeout(200)

      const status = response?.status() || 0
      const visibleH1Count = await page.locator('h1:visible').count()
      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      )
      const routeIssues = []

      if (status >= 400 || status === 0) routeIssues.push(`HTTP ${status || 'no response'}`)
      if (visibleH1Count !== 1) routeIssues.push(`${visibleH1Count} visible H1 elements`)
      if (horizontalOverflow) routeIssues.push('Horizontal viewport overflow')

      if (route === '/book-assessment') {
        const diagnosticSummary = page.getByText('60-Minute Full Diagnostic · $49').first()
        await diagnosticSummary.click()
        const chooseDiagnostic = page.getByRole('button', { name: 'Choose Full Diagnostic' })
        await chooseDiagnostic.click()
        await page.getByText('Full Diagnostic Selected').waitFor({ state: 'visible' })
        await page.getByRole('button', {
          name: "Request My Child's 60-Min Full Diagnostic →",
        }).waitFor({ state: 'visible' })
        await page.getByRole('button', { name: 'Switch to free assessment' }).click()
        await page.getByRole('button', {
          name: "Get My Child's Free 30-Min Assessment →",
        }).waitFor({ state: 'visible' })
      } else if (route === '/academic/math/middle-school') {
        const heroHeading = page.locator('h1').first()
        const orientationVideo = page.locator('[data-testid="parent-orientation-video"]:visible')
        const primary = page.getByRole('button', { name: 'Book free assessment' }).first()
        const secondary = page.getByRole('link', { name: 'Try the free Self-Check' }).first()
        await orientationVideo.waitFor({ state: 'visible' })
        const headingText = await heroHeading.innerText()
        if (
          headingText !==
          "Middle school math is where\ngaps start compounding.\nHere's how to stop it."
        ) {
          routeIssues.push(`Hero H1 does not use the approved three-line structure: ${headingText}`)
        }
        const [headingBox, videoBox, primaryBox, secondaryBox] = await Promise.all([
          heroHeading.boundingBox(),
          orientationVideo.boundingBox(),
          primary.boundingBox(),
          secondary.boundingBox(),
        ])
        if (!headingBox || !videoBox) {
          routeIssues.push('Hero heading or orientation video is not measurable')
        } else if (
          viewportName === 'desktop' &&
          videoBox.x < headingBox.x + headingBox.width
        ) {
          routeIssues.push('Orientation video is not positioned to the right of the hero H1')
        } else if (
          viewportName === 'mobile' &&
          videoBox.y < headingBox.y + headingBox.height
        ) {
          routeIssues.push('Orientation video is not positioned below the hero H1 on mobile')
        }
        if (
          !primaryBox ||
          !secondaryBox ||
          Math.abs(primaryBox.width - secondaryBox.width) > 1 ||
          Math.abs(primaryBox.height - secondaryBox.height) > 1
        ) {
          routeIssues.push('Hero CTA dimensions do not match')
        }
        const secondaryHref = await secondary.getAttribute('href')
        if (!secondaryHref?.endsWith('/self-check')) {
          routeIssues.push(`Hero Self-Check CTA has unexpected href: ${secondaryHref || 'missing'}`)
        }
        await primary.click()
        await page.locator('[role="dialog"][aria-modal="true"]').waitFor({ state: 'visible' })
      } else {
        await page.locator('[data-testid="commercial-value-proof"]:visible').first().waitFor({ state: 'visible' })
      }

      const actionableConsoleErrors = consoleErrors.filter(
        (message) =>
          !(
            environmentResponses.length > 0 &&
            message.includes('403 (Forbidden)') &&
            message.includes('Failed to load resource')
          ),
      )
      if (actionableConsoleErrors.length) routeIssues.push(`${actionableConsoleErrors.length} console error(s)`)
      if (failedResponses.length) routeIssues.push(`${failedResponses.length} failed background response(s)`)
      if (pageErrors.length) routeIssues.push(`${pageErrors.length} page error(s)`)

      checks.push({
        route,
        viewport: viewportName,
        status,
        visibleH1Count,
        horizontalOverflow,
        consoleErrors,
        actionableConsoleErrors,
        failedResponses,
        environmentResponses,
        pageErrors,
        issues: routeIssues,
        passed: routeIssues.length === 0,
      })
      await page.close()
    }

    await context.close()
  }
} finally {
  await browser.close()
}

const report = {
  runAt: new Date().toISOString(),
  baseUrl,
  summary: {
    routes: routes.length,
    viewportChecks: checks.length,
    passed: checks.filter((check) => check.passed).length,
    failed: checks.filter((check) => !check.passed).length,
  },
  failedChecks: checks.filter((check) => !check.passed),
  checks,
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report.summary, null, 2))
console.log(`Wrote ${outputPath}`)

if (report.summary.failed) process.exitCode = 1
