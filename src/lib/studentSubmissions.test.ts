import {
  MAX_STUDENT_SUBMISSION_BYTES,
  safeStudentSubmissionFilename,
  validateStudentSubmissionBytes,
  validateStudentSubmissionFile,
} from './studentSubmissions'

describe('student submission upload safeguards', () => {
  const asciiBytes = (value: string) => Uint8Array.from(value, (character) => character.charCodeAt(0))

  test('accepts supported files within the size limit', () => {
    expect(validateStudentSubmissionFile({
      name: 'My Story.docx',
      size: 2048,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })).toEqual({
      ok: true,
      extension: 'docx',
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
  })

  test('rejects executable and oversized files', () => {
    expect(validateStudentSubmissionFile({ name: 'story.exe', size: 100, type: 'application/octet-stream' })).toEqual({
      ok: false,
      error: 'Upload a PDF, DOCX, or TXT file.',
    })
    expect(validateStudentSubmissionFile({ name: 'story.pdf', size: MAX_STUDENT_SUBMISSION_BYTES + 1, type: 'application/pdf' })).toEqual({
      ok: false,
      error: 'The file must be 8 MB or smaller.',
    })
  })

  test('checks common file signatures instead of trusting the extension', () => {
    expect(validateStudentSubmissionBytes(asciiBytes('%PDF-1.7'), 'pdf')).toBe(true)
    expect(validateStudentSubmissionBytes(asciiBytes('not a pdf'), 'pdf')).toBe(false)
    expect(validateStudentSubmissionBytes(new Uint8Array([0x50, 0x4b, 0x03, 0x04]), 'docx')).toBe(true)
    expect(validateStudentSubmissionBytes(new Uint8Array([0x4d, 0x5a, 0, 0]), 'docx')).toBe(false)
    expect(validateStudentSubmissionBytes(asciiBytes('Original student story'), 'txt')).toBe(true)
    expect(validateStudentSubmissionBytes(new Uint8Array([65, 0, 66]), 'txt')).toBe(false)
  })

  test('sanitizes uploaded filenames used in private storage paths', () => {
    expect(safeStudentSubmissionFilename('../../My Great Story (Final).pdf')).toBe('My-Great-Story-Final.pdf')
  })
})
