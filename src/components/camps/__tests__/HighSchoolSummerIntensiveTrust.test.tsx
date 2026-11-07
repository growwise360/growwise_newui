/* eslint-disable @next/next/no-img-element -- next/image is replaced with an image test double in jsdom. */
import { describe, expect, it } from '@jest/globals'
declare const jest: typeof import('@jest/globals').jest
import '@testing-library/jest-dom/jest-globals'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { HighSchoolSummerIntensivePage } from '../HighSchoolSummerIntensivePage'

jest.mock('next-intl', () => ({ useLocale: () => 'en' }))
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={src} alt={alt} />,
}))

describe('high-school summer program details after trust-claim removal', () => {
  it('renders the remaining program detail without empty claims or separator bars', () => {
    render(<HighSchoolSummerIntensivePage />)
    const details = screen.getByRole('region', { name: 'Program details' })
    expect(details.textContent?.trim()).toBe('Max 8 per class')
    expect(details.querySelectorAll('.w-px')).toHaveLength(0)
    expect(details.querySelectorAll('span:empty, div:empty')).toHaveLength(0)
  })
})
