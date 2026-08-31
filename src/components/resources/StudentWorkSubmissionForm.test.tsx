import { render, screen } from '@testing-library/react'

import { StudentWorkSubmissionForm } from './StudentWorkSubmissionForm'

describe('StudentWorkSubmissionForm', () => {
  test('requires student work, guardian information, and publication-review permission', () => {
    render(<StudentWorkSubmissionForm />)

    expect(screen.getByLabelText('Submission type *')).toBeRequired()
    expect(screen.getByLabelText('Title *')).toBeRequired()
    expect(screen.getByLabelText('Student name *')).toBeRequired()
    expect(screen.getByLabelText('Grade *')).toBeRequired()
    expect(screen.getByLabelText('Parent or guardian name *')).toBeRequired()
    expect(screen.getByLabelText('Parent or guardian email *')).toBeRequired()
    expect(screen.getByLabelText(/gives GrowWise permission to privately review/)).toBeRequired()
    expect(screen.getByLabelText(/This is the student’s original work/)).toBeRequired()
  })

  test('explains private review, upload limits, and publication controls', () => {
    render(<StudentWorkSubmissionForm />)

    expect(screen.getByText('Choose a PDF, DOCX, or TXT file')).toBeInTheDocument()
    expect(screen.getByText('Maximum size: 8 MB')).toBeInTheDocument()
    expect(screen.getByText(/Protect your privacy/)).toBeInTheDocument()
    expect(screen.getByText(/Submitting does not guarantee publication/)).toBeInTheDocument()
  })
})
