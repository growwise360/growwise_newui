import { describe, expect, it } from '@jest/globals'
declare const jest: typeof import('@jest/globals').jest
import '@testing-library/jest-dom/jest-globals'
import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { OnlinePricingTabs } from '../OnlinePricingTabs'

jest.mock('next-intl', () => ({ useLocale: () => 'en' }))

const bands = [
  { label: 'Elementary', trial: '$197', core: '$327', advanced: null },
  { label: 'Middle school', trial: '$207', core: '$347', advanced: '$397' },
  { label: 'High school', trial: '$237', core: '$387', advanced: '$437' },
]

function showBand(label: string) {
  render(<OnlinePricingTabs />)
  fireEvent.mouseDown(screen.getByRole('tab', { name: label }), { button: 0, ctrlKey: false })
  return screen.getByRole('tabpanel', { name: label })
}

function card(panel: HTMLElement, title: string) {
  return within(panel).getByRole('heading', { name: title }).closest('article')!
}

describe('online pricing inquiry and billing', () => {
  it.each(bands)('$label preserves band and plan without inventing a student grade', ({ label, advanced }) => {
    const panel = showBand(label)
    const plans = advanced ? ['Trial month', 'Core', 'Advanced'] : ['Trial month', 'Core']
    for (const plan of plans) {
      const link = within(card(panel, plan)).getByRole('link', { name: 'Book a free assessment' })
      const url = new URL(link.getAttribute('href')!, 'https://growwiseschool.org')
      expect(url.pathname).toBe('/book-assessment')
      expect(url.searchParams.has('grade')).toBe(false)
      expect(url.searchParams.get('package')).toBe(`${label} · ${plan}`)
      expect(url.searchParams.get('utm_source')).toBe('pricing')
      expect(url.searchParams.get('utm_campaign')).toBe('online_catalog')
    }
  })

  it.each(bands)('$label distinguishes a one-time trial from monthly term plans', ({ label, trial, core, advanced }) => {
    const panel = showBand(label)
    const trialCard = card(panel, 'Trial month')
    expect(trialCard).toHaveTextContent(`${trial} one-time`)
    expect(trialCard).toHaveTextContent('Four weeks · one time per student and subject')
    expect(trialCard).not.toHaveTextContent('/ month')
    const coreCard = card(panel, 'Core')
    expect(coreCard).toHaveTextContent(`${core} / month`)
    expect(coreCard).toHaveTextContent('three-month term')
    if (advanced) {
      const advancedCard = card(panel, 'Advanced')
      expect(advancedCard).toHaveTextContent(`${advanced} / month`)
      expect(advancedCard).toHaveTextContent('three-month term')
    }
  })
})
