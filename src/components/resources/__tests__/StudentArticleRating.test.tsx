import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import StudentArticleRating from '../StudentArticleRating'

describe('StudentArticleRating', () => {
  afterEach(() => {
    delete (global as typeof globalThis & { fetch?: typeof fetch }).fetch
  })

  it('loads the aggregate and saves a selected rating', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(
        {
          ok: true,
          json: async () => ({ success: true, average: 4.5, count: 2, userRating: null }),
        } as Response,
      )
      .mockResolvedValueOnce(
        {
          ok: true,
          json: async () => ({ success: true, average: 4.7, count: 3, userRating: 5 }),
        } as Response,
      )
    global.fetch = fetchMock

    render(<StudentArticleRating slug="books-beyond-personality" />)

    expect(await screen.findByText('4.5 out of 5 · 2 ratings')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '5 stars' }))

    expect(await screen.findByText('Thank you—your rating was saved.')).toBeInTheDocument()
    expect(screen.getByText('4.7 out of 5 · 3 ratings')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5 stars' })).toHaveAttribute('aria-pressed', 'true')

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({ method: 'POST' })
  })

  it('shows an unavailable message when the API cannot load', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('offline'))
    render(<StudentArticleRating slug="books-beyond-personality" />)

    expect(await screen.findByText('Ratings are temporarily unavailable.')).toBeInTheDocument()
  })
})
