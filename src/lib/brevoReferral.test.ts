import { createBrevoReferralDeal } from './brevoReferral'

describe('Brevo referral CRM automation', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      BREVO_API_KEY: 'test-key',
      BREVO_REFERRAL_PIPELINE_ID: 'referral-pipeline',
      BREVO_REFERRAL_SUBMITTED_STAGE_ID: 'submitted-stage',
      BREVO_REFERRAL_TASK_TYPE_ID: 'todo-task',
      BREVO_REFERRAL_ATTR_TASK_ID: 'referral_task_id',
    }

    const response = (status: number, body?: unknown) => ({
      ok: status >= 200 && status < 300,
      status,
      text: async () => body === undefined ? '' : JSON.stringify(body),
    }) as Response

    global.fetch = jest.fn(async (input, init) => {
      const url = String(input)
      const method = init?.method ?? 'GET'

      if (url.endsWith('/contacts') && method === 'POST') return response(201)
      if (url.includes('/contacts/referrer%40example.com')) {
        return response(200, { id: 11 })
      }
      if (url.includes('/contacts/referred%40example.com')) {
        return response(200, { id: 22 })
      }
      if (url.includes('/crm/deals?')) return response(200, { items: [] })
      if (url.endsWith('/crm/deals') && method === 'POST') return response(201, { id: 'deal-1' })
      if (url.endsWith('/crm/deals/deal-1') && method === 'PATCH') return response(204)
      if (url.endsWith('/crm/tasks') && method === 'POST') return response(201, { id: 'task-1' })
      return response(500, { message: `Unexpected request: ${method} ${url}` })
    }) as jest.Mock
  })

  afterEach(() => {
    process.env = originalEnv
    jest.restoreAllMocks()
  })

  test('creates one deal and a third-cycle reminder from the required student start date', async () => {
    const result = await createBrevoReferralDeal({
      referralId: 'REF-20260901-ABC12345',
      submittedAt: '2026-09-01T12:00:00.000Z',
      newStudentStartDate: new Date('2026-09-12T12:00:00.000Z'),
      referrer: {
        email: 'referrer@example.com',
        fullName: 'Existing Parent',
        phone: '9255551212',
        studentName: 'Existing Student',
      },
      referred: {
        email: 'referred@example.com',
        fullName: 'New Parent',
        studentName: 'New Student',
      },
    })

    expect(result).toEqual({
      ok: true,
      data: {
        dealId: 'deal-1',
        duplicate: false,
        reminderCreated: true,
        taskId: 'task-1',
        creditDueDate: '2026-11-12T17:00:00.000Z',
      },
    })

    const calls = (global.fetch as jest.Mock).mock.calls
    const taskCall = calls.find(([url, init]) => String(url).endsWith('/crm/tasks') && init?.method === 'POST')
    const taskBody = JSON.parse(taskCall[1].body)
    expect(taskBody).toMatchObject({
      date: '2026-11-12T17:00:00.000Z',
      dealsIds: ['deal-1'],
      contactsIds: [22],
      reminder: { value: 1, unit: 'days', types: ['email', 'push'] },
    })
    expect(taskBody.notes).toContain('New student: New Student')
    expect(taskBody.notes).toContain('Reported start date: 2026-09-12')

    const taskIdSave = calls.find(([url, init]) => String(url).endsWith('/crm/deals/deal-1') && init?.method === 'PATCH')
    expect(JSON.parse(taskIdSave[1].body)).toEqual({ attributes: { referral_task_id: 'task-1' } })
  })
})
