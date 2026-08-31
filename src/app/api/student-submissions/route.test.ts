/** @jest-environment node */

import { File } from 'node:buffer'

import { POST } from '@/app/api/student-submissions/route'
import { __resetForTests } from '@/lib/chatRateLimit'

function submissionRequest(overrides: Record<string, string> = {}, origin = 'http://127.0.0.1:3000') {
  const values: Record<string, string> = {
    _hp: '',
    submissionType: 'article',
    title: 'Why Practice Helps Me Learn',
    studentName: 'Sample Student',
    grade: '7',
    guardianName: 'Sample Guardian',
    guardianEmail: 'guardian.parent@gmail.com',
    guardianConsent: 'true',
    originalWork: 'true',
    notes: 'Automated local test',
    ...overrides,
  }
  const form = new FormData()
  Object.entries(values).forEach(([name, value]) => form.set(name, value))
  form.set('workFile', new File(['Original student article'], 'article.txt', { type: 'text/plain' }))
  return new Request('http://127.0.0.1:3000/api/student-submissions', {
    method: 'POST',
    headers: { origin },
    body: form,
  })
}

describe('Student Corner submission API', () => {
  const originalSupabaseUrl = process.env.SUPABASE_URL
  const originalSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  beforeEach(() => {
    __resetForTests()
    delete process.env.SUPABASE_URL
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
  })

  afterAll(() => {
    if (originalSupabaseUrl) process.env.SUPABASE_URL = originalSupabaseUrl
    if (originalSupabaseKey) process.env.SUPABASE_SERVICE_ROLE_KEY = originalSupabaseKey
  })

  test('rejects a request from an unapproved website', async () => {
    const response = await POST(submissionRequest({}, 'https://attacker.example'))
    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toMatchObject({ success: false, error: 'Invalid request' })
  })

  test('requires the student name and guardian permission', async () => {
    const response = await POST(submissionRequest({ studentName: '', guardianConsent: 'false' }))
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toMatchObject({ success: false, error: 'Please complete all required fields.' })
  })

  test('accepts a valid multipart submission through validation before storage', async () => {
    const response = await POST(submissionRequest())
    const body = await response.json()
    expect({ status: response.status, body }).toEqual({
      status: 503,
      body: { success: false, error: 'Submission storage is temporarily unavailable.' },
    })
  })
})
