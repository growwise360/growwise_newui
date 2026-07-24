import { render, screen } from '@testing-library/react'

import ProjectsPage from './page'

const studentNames = [
  'Dhriti Verma',
  'Jayanth Panneer Selvam',
  'Aadya Agarwal',
  'Anvita Punati',
  'Bhargava Ram Chekuri',
  'Aaran Karthik',
] as const

describe('Student Projects page', () => {
  it('renders all six student profiles in the configured order', () => {
    render(<ProjectsPage />)

    const profileHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(profileHeadings.map((heading) => heading.textContent)).toEqual(studentNames)
    expect(screen.getAllByText('Roblox Game Developer')).toHaveLength(6)
  })

  it('renders tutorial links only for students with supplied URLs', () => {
    render(<ProjectsPage />)

    const tutorialLinks = screen.getAllByRole('link', { name: /Watch .* tutorial .* YouTube/ })
    expect(tutorialLinks).toHaveLength(3)
    expect(tutorialLinks.map((link) => link.getAttribute('href'))).toEqual([
      'https://youtu.be/U0kcjFK3eRQ',
      'https://youtu.be/v4YvFM1Xbs0',
      'https://youtu.be/bKVlV5jPn0E',
    ])
    for (const link of tutorialLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('does not render unavailable or disabled project actions', () => {
    render(<ProjectsPage />)

    expect(screen.queryByRole('link', { name: /Play .* on Roblox/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /coming soon/i })).not.toBeInTheDocument()
  })

  it('provides accessible labels for neutral image placeholders', () => {
    render(<ProjectsPage />)

    expect(screen.getAllByRole('img', { name: /profile photo placeholder/ })).toHaveLength(6)
    expect(screen.getAllByRole('img', { name: /game artwork placeholder/ })).toHaveLength(6)
  })
})
