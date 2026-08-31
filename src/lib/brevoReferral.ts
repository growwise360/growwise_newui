import { thirdBillingCycleDate } from '@/lib/referrals'

const BREVO_API_BASE = 'https://api.brevo.com/v3'
const REFERRAL_DEAL_PREFIX = 'GrowWise referral'

type BrevoResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number }

type ReferralContact = {
  email: string
  fullName: string
  phone?: string
}

export type CreateBrevoReferralInput = {
  referralId: string
  submittedAt: string
  newStudentStartDate: Date
  referrer: ReferralContact & { studentName: string }
  referred: ReferralContact & { studentName: string; programInterest?: string }
}

type BrevoDeal = {
  id: string
  attributes?: Record<string, unknown>
  linkedContactsIds?: number[]
}

function apiKey(): string | null {
  return process.env.BREVO_API_KEY?.trim() || null
}

function env(name: string): string | null {
  return process.env[name]?.trim() || null
}

async function brevoRequest<T>(path: string, init: RequestInit = {}): Promise<BrevoResult<T>> {
  const key = apiKey()
  if (!key) return { ok: false, error: 'Brevo API is not configured' }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)
  try {
    const response = await fetch(`${BREVO_API_BASE}${path}`, {
      ...init,
      headers: {
        accept: 'application/json',
        'api-key': key,
        ...(init.body ? { 'content-type': 'application/json' } : {}),
        ...init.headers,
      },
      signal: controller.signal,
    })
    const raw = await response.text()
    let data: unknown = undefined
    if (raw) {
      try { data = JSON.parse(raw) } catch { data = raw }
    }
    if (!response.ok) {
      const message = typeof data === 'object' && data && 'message' in data
        ? String((data as { message: unknown }).message)
        : String(data || `HTTP ${response.status}`)
      return { ok: false, error: message, status: response.status }
    }
    return { ok: true, data: data as T }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Brevo request failed' }
  } finally {
    clearTimeout(timeout)
  }
}

function splitName(fullName: string): { FIRSTNAME: string; LASTNAME?: string } {
  const [first, ...rest] = fullName.trim().split(/\s+/)
  return { FIRSTNAME: first || fullName.trim(), ...(rest.length ? { LASTNAME: rest.join(' ') } : {}) }
}

async function upsertContact(contact: ReferralContact): Promise<BrevoResult<number>> {
  const upsert = await brevoRequest<unknown>('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      email: contact.email,
      attributes: splitName(contact.fullName),
      updateEnabled: true,
    }),
  })
  if (!upsert.ok) return upsert

  const found = await brevoRequest<{ id: number }>(`/contacts/${encodeURIComponent(contact.email)}?identifierType=email_id`)
  return found.ok ? { ok: true, data: found.data.id } : found
}

async function dealsForContact(contactId: number): Promise<BrevoResult<BrevoDeal[]>> {
  const pipeline = env('BREVO_REFERRAL_PIPELINE_ID')
  if (!pipeline) return { ok: false, error: 'BREVO_REFERRAL_PIPELINE_ID is not configured' }
  const query = new URLSearchParams({
    'filters[linkedContactsIds]': String(contactId),
    'filters[attributes.pipeline]': pipeline,
    limit: '50',
    sort: 'desc',
  })
  const result = await brevoRequest<{ items?: BrevoDeal[] }>(`/crm/deals?${query}`)
  return result.ok ? { ok: true, data: result.data.items ?? [] } : result
}

function configuredAttributes(values: Record<string, string | number | boolean>): Record<string, string | number | boolean> {
  const attributes: Record<string, string | number | boolean> = {}
  for (const [envSuffix, value] of Object.entries(values)) {
    const internalName = env(`BREVO_REFERRAL_ATTR_${envSuffix}`)
    if (internalName) attributes[internalName] = value
  }
  return attributes
}

export async function createBrevoReferralDeal(
  input: CreateBrevoReferralInput,
): Promise<BrevoResult<{ dealId: string; duplicate: boolean; taskId?: string; creditDueDate?: string; reminderCreated?: boolean }>> {
  const pipeline = env('BREVO_REFERRAL_PIPELINE_ID')
  const submittedStage = env('BREVO_REFERRAL_SUBMITTED_STAGE_ID')
  if (!pipeline || !submittedStage) {
    return { ok: false, error: 'Brevo referral pipeline is not configured' }
  }

  const [referrerResult, referredResult] = await Promise.all([
    upsertContact(input.referrer),
    upsertContact(input.referred),
  ])
  if (!referrerResult.ok) return referrerResult
  if (!referredResult.ok) return referredResult

  const existing = await dealsForContact(referredResult.data)
  if (!existing.ok) return existing
  const duplicate = existing.data.find((deal) =>
    String(deal.attributes?.deal_name ?? '').startsWith(REFERRAL_DEAL_PREFIX),
  )
  if (duplicate) return { ok: true, data: { dealId: duplicate.id, duplicate: true } }

  const optionalAttributes = configuredAttributes({
    REFERRAL_ID: input.referralId,
    REFERRER_EMAIL: input.referrer.email,
    REFERRED_EMAIL: input.referred.email,
    SUBMITTED_DATE: input.submittedAt.slice(0, 10),
    START_DATE: input.newStudentStartDate.toISOString().slice(0, 10),
    CREDIT_DUE_DATE: thirdBillingCycleDate(input.newStudentStartDate).toISOString().slice(0, 10),
  })
  const deal = await brevoRequest<{ id: string }>('/crm/deals', {
    method: 'POST',
    body: JSON.stringify({
      name: `${REFERRAL_DEAL_PREFIX} | ${input.referrer.fullName} → ${input.referred.fullName} | ${input.referralId}`,
      attributes: {
        pipeline,
        deal_stage: submittedStage,
        ...optionalAttributes,
      },
      // Link only the referred family so an enrollment email maps to one referral role.
      linkedContactsIds: [referredResult.data],
    }),
  })
  if (!deal.ok) return deal

  const taskTypeId = env('BREVO_REFERRAL_TASK_TYPE_ID')
  if (!taskTypeId) {
    return { ok: true, data: { dealId: deal.data.id, duplicate: false, reminderCreated: false } }
  }

  const due = thirdBillingCycleDate(input.newStudentStartDate)
  const task = await brevoRequest<{ id: string }>('/crm/tasks', {
    method: 'POST',
    body: JSON.stringify({
      date: due.toISOString(),
      name: `Verify and apply GrowWise referral credit (${due.toISOString().slice(0, 10)})`,
      taskTypeId,
      dealsIds: [deal.data.id],
      contactsIds: [referredResult.data],
      notes: [
        `Referral ID: ${input.referralId}`,
        `Referring family: ${input.referrer.fullName} (${input.referrer.email})`,
        `Referred family: ${input.referred.fullName} (${input.referred.email})`,
        `New student: ${input.referred.studentName}`,
        `Reported start date: ${input.newStudentStartDate.toISOString().slice(0, 10)}`,
        `Third billing cycle: ${due.toISOString().slice(0, 10)}`,
        'Before applying credit, verify the start date, active enrollment, successful payments, and that no credit was already applied.',
      ].join('\n'),
      reminder: { value: 1, unit: 'days', types: ['email', 'push'] },
    }),
  })
  if (!task.ok) {
    console.error('[referral] Deal created but credit reminder task failed', {
      dealId: deal.data.id,
      error: task.error,
      status: task.status,
    })
    return { ok: true, data: { dealId: deal.data.id, duplicate: false, reminderCreated: false } }
  }

  const taskIdAttribute = env('BREVO_REFERRAL_ATTR_TASK_ID')
  if (taskIdAttribute) {
    const savedTaskId = await brevoRequest<unknown>(`/crm/deals/${deal.data.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ attributes: { [taskIdAttribute]: task.data.id } }),
    })
    if (!savedTaskId.ok) {
      console.error('[referral] Reminder created but task ID could not be stored on the deal', {
        dealId: deal.data.id,
        taskId: task.data.id,
        error: savedTaskId.error,
      })
    }
  }

  return {
    ok: true,
    data: {
      dealId: deal.data.id,
      duplicate: false,
      reminderCreated: true,
      taskId: task.data.id,
      creditDueDate: due.toISOString(),
    },
  }
}

export async function markBrevoReferralEnrolled(input: {
  referredEmail: string
  enrollmentDate: Date
  enrollmentId?: string
  creditAmount?: number
}): Promise<BrevoResult<{ dealId: string; taskId: string; creditDueDate: string }>> {
  const pipeline = env('BREVO_REFERRAL_PIPELINE_ID')
  const pendingStage = env('BREVO_REFERRAL_PENDING_STAGE_ID')
  const taskTypeId = env('BREVO_REFERRAL_TASK_TYPE_ID')
  if (!pipeline || !pendingStage || !taskTypeId) {
    return { ok: false, error: 'Brevo referral enrollment automation is not configured' }
  }

  const contact = await brevoRequest<{ id: number }>(
    `/contacts/${encodeURIComponent(input.referredEmail)}?identifierType=email_id`,
  )
  if (!contact.ok) return contact
  const deals = await dealsForContact(contact.data.id)
  if (!deals.ok) return deals
  const deal = deals.data.find((row) =>
    String(row.attributes?.deal_name ?? '').startsWith(REFERRAL_DEAL_PREFIX),
  )
  if (!deal) return { ok: false, error: 'No referral deal found for this enrollment', status: 404 }

  const due = thirdBillingCycleDate(input.enrollmentDate)
  const optionalAttributes = configuredAttributes({
    ENROLLMENT_DATE: input.enrollmentDate.toISOString().slice(0, 10),
    CREDIT_DUE_DATE: due.toISOString().slice(0, 10),
    ...(input.enrollmentId ? { ENROLLMENT_ID: input.enrollmentId } : {}),
    ...(input.creditAmount !== undefined ? { CREDIT_AMOUNT: input.creditAmount } : {}),
  })
  const updated = await brevoRequest<unknown>(`/crm/deals/${deal.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ attributes: { pipeline, deal_stage: pendingStage, ...optionalAttributes } }),
  })
  if (!updated.ok) return updated

  const taskPayload = {
      date: due.toISOString(),
      name: `Verify and apply GrowWise referral credit (${due.toISOString().slice(0, 10)})`,
      taskTypeId,
      dealsIds: [deal.id],
      contactsIds: [contact.data.id],
      notes: [
        `Referred family: ${input.referredEmail}`,
        `Enrollment date: ${input.enrollmentDate.toISOString().slice(0, 10)}`,
        `Third billing cycle: ${due.toISOString().slice(0, 10)}`,
        input.enrollmentId ? `Enrollment ID: ${input.enrollmentId}` : '',
        input.creditAmount !== undefined ? `Expected credit: $${input.creditAmount.toFixed(2)}` : '',
        'Before applying credit, verify active enrollment, successful payments, and that no credit was already applied.',
      ].filter(Boolean).join('\n'),
      reminder: { value: 1, unit: 'days', types: ['email', 'push'] },
  }
  const taskIdAttribute = env('BREVO_REFERRAL_ATTR_TASK_ID')
  const existingTaskId = taskIdAttribute && typeof deal.attributes?.[taskIdAttribute] === 'string'
    ? String(deal.attributes[taskIdAttribute])
    : null
  const task = existingTaskId
    ? await brevoRequest<unknown>(`/crm/tasks/${existingTaskId}`, {
        method: 'PATCH',
        body: JSON.stringify(taskPayload),
      })
    : await brevoRequest<{ id: string }>('/crm/tasks', {
        method: 'POST',
        body: JSON.stringify(taskPayload),
      })
  return task.ok
    ? {
        ok: true,
        data: {
          dealId: deal.id,
          taskId: existingTaskId || (task.data as { id: string }).id,
          creditDueDate: due.toISOString(),
        },
      }
    : task
}
