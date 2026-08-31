import { createClient } from '@supabase/supabase-js'

export const STUDENT_SUBMISSION_BUCKET = 'student-submissions'
export const MAX_STUDENT_SUBMISSION_BYTES = 8 * 1024 * 1024

export const STUDENT_SUBMISSION_TYPES = ['article', 'story'] as const
export type StudentSubmissionType = (typeof STUDENT_SUBMISSION_TYPES)[number]

const ALLOWED_FILES = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  txt: 'text/plain',
} as const

export function isStudentSubmissionType(value: string): value is StudentSubmissionType {
  return (STUDENT_SUBMISSION_TYPES as readonly string[]).includes(value)
}

export function safeStudentSubmissionFilename(value: string): string {
  const cleaned = value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/-+\./g, '.')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, 120)
  return cleaned || 'student-work'
}

export function validateStudentSubmissionFile(file: {
  name: string
  size: number
  type: string
}): { ok: true; extension: keyof typeof ALLOWED_FILES; contentType: string } | { ok: false; error: string } {
  if (file.size <= 0) return { ok: false, error: 'Choose a file to upload.' }
  if (file.size > MAX_STUDENT_SUBMISSION_BYTES) {
    return { ok: false, error: 'The file must be 8 MB or smaller.' }
  }

  const extension = file.name.toLowerCase().split('.').pop() as keyof typeof ALLOWED_FILES
  if (!extension || !(extension in ALLOWED_FILES)) {
    return { ok: false, error: 'Upload a PDF, DOCX, or TXT file.' }
  }
  const expectedType = ALLOWED_FILES[extension]
  if (file.type && file.type !== expectedType && !(extension === 'txt' && file.type === 'text/markdown')) {
    return { ok: false, error: `The selected .${extension} file has an unexpected file type.` }
  }
  return { ok: true, extension, contentType: expectedType }
}

export function validateStudentSubmissionBytes(
  bytes: Uint8Array,
  extension: keyof typeof ALLOWED_FILES,
): boolean {
  if (extension === 'pdf') {
    return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-'
  }
  if (extension === 'docx') {
    return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04
  }
  return !bytes.slice(0, Math.min(bytes.length, 4096)).includes(0)
}

export function createStudentSubmissionsClient() {
  const url = process.env.SUPABASE_URL?.trim()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceRoleKey) return null
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
