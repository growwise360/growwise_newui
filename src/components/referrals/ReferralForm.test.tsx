import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ReferralForm } from './ReferralForm'

describe('ReferralForm', () => {
  afterEach(() => jest.restoreAllMocks())

  test('requires a separate new-student name and start date', () => {
    render(<ReferralForm />)

    expect(screen.getByLabelText('New student’s name *')).toBeRequired()
    expect(screen.getByLabelText('New student’s start date *')).toBeRequired()
    expect(screen.getByText('For two or more families, submit one form per family.')).toBeInTheDocument()
    expect(screen.getByText(/minimum three-month commitment/)).toBeInTheDocument()
    expect(screen.getByText(/Credit applies once per family, not per student/)).toBeInTheDocument()
  })

  test('shows the confirmation email and spam-folder guidance after submission', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        success: true,
        referralId: 'REF-20260831-ABC12345',
        creditDueDate: '2026-11-15T17:00:00.000Z',
      }),
    })) as jest.Mock

    render(<ReferralForm />)
    fireEvent.change(screen.getByLabelText('Parent or guardian name *', { selector: 'input[name="referrerName"]' }), { target: { value: 'Existing Parent' } })
    fireEvent.change(screen.getByLabelText('GrowWise account email *'), { target: { value: 'parent@example.com' } })
    fireEvent.change(screen.getByLabelText('Phone number *'), { target: { value: '9255551212' } })
    fireEvent.change(screen.getByLabelText('Current student’s name *'), { target: { value: 'Current Student' } })
    fireEvent.change(screen.getByLabelText('Parent or guardian name *', { selector: 'input[name="referredParentName"]' }), { target: { value: 'New Parent' } })
    fireEvent.change(screen.getByLabelText('Parent or guardian email *'), { target: { value: 'new@example.com' } })
    fireEvent.change(screen.getByLabelText('New student’s name *'), { target: { value: 'New Student' } })
    fireEvent.change(screen.getByLabelText('New student’s start date *'), { target: { value: '2026-09-15' } })
    fireEvent.click(screen.getByLabelText(/I confirm this family gave me permission/))
    fireEvent.click(screen.getByRole('button', { name: 'Submit referral' }))

    await waitFor(() => expect(screen.getByText('Referral received')).toBeInTheDocument())
    expect(screen.getByText(/parent@example.com/)).toBeInTheDocument()
    expect(screen.getByText(/check Spam, Junk, or Promotions/)).toBeInTheDocument()
    expect(screen.getByText(/each family receives its own referral ID/)).toBeInTheDocument()
  })
})
