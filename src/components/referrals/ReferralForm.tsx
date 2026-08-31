'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

import { trackGenerateLead } from '@/lib/analytics/gtmEvents'

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string }
  | { status: 'success'; referralId: string; creditDueDate?: string; confirmationEmail: string }

const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-[#1F396D] focus:ring-2 focus:ring-[#1F396D]/20'
const labelClass = 'block text-sm font-semibold text-slate-800'

export function ReferralForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ status: 'submitting' })
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries()) as Record<string, FormDataEntryValue | boolean>
    payload.permissionConfirmed = data.get('permissionConfirmed') === 'on'

    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json() as { success?: boolean; referralId?: string; creditDueDate?: string; error?: string }
      if (!response.ok || !result.success || !result.referralId) {
        setState({ status: 'error', message: result.error || 'We could not submit the referral. Please try again.' })
        return
      }
      trackGenerateLead('referral', { form_name: 'referral_credit_form' })
      form.reset()
      setState({
        status: 'success',
        referralId: result.referralId,
        creditDueDate: result.creditDueDate,
        confirmationEmail: String(payload.referrerEmail || ''),
      })
    } catch {
      setState({ status: 'error', message: 'Network error. Please try again.' })
    }
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold text-slate-950">Referral received</h2>
        <p className="mt-3 text-slate-700">Keep this confirmation number for your records:</p>
        <p className="mt-2 font-mono text-lg font-bold text-[#1F396D]">{state.referralId}</p>
        {state.creditDueDate && (
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Expected credit-review date: {new Date(state.creditDueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
          </p>
        )}
        <p className="mt-4 text-sm leading-6 text-slate-600">
          If the new student enrolls, we will track eligibility and review the credit during their third monthly billing cycle.
        </p>
        <div className="mx-auto mt-5 max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-950">
          We sent a confirmation to <strong>{state.confirmationEmail}</strong>. If it does not arrive within a few minutes, check Spam, Junk, or Promotions and mark the message as “Not spam.”
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-600">
          Referring another family? Submit a separate form so each family receives its own referral ID and credit schedule.
        </p>
        <button type="button" onClick={() => setState({ status: 'idle' })} className="mt-6 font-semibold text-[#1F396D] underline underline-offset-4">
          Refer another family
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8" noValidate>
      <div className="grid gap-8">
        <fieldset>
          <legend className="text-xl font-bold text-[#1F396D]">Your family</legend>
          <p className="mt-1 text-sm text-slate-600">Use the email connected to your GrowWise account.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Parent or guardian name *
              <input className={inputClass} name="referrerName" autoComplete="name" maxLength={100} required />
            </label>
            <label className={labelClass}>GrowWise account email *
              <input className={inputClass} name="referrerEmail" type="email" autoComplete="email" maxLength={254} required />
            </label>
            <label className={labelClass}>Phone number *
              <input className={inputClass} name="referrerPhone" type="tel" autoComplete="tel" maxLength={32} required />
            </label>
            <label className={labelClass}>Current student’s name *
              <input className={inputClass} name="currentStudentName" maxLength={100} required />
            </label>
          </div>
        </fieldset>

        <fieldset className="border-t border-slate-200 pt-8">
          <legend className="text-xl font-bold text-[#1F396D]">Family you are referring</legend>
          <p className="mt-1 text-sm text-slate-600">Their enrollment email is used to match and track the referral.</p>
          <p className="mt-1 text-sm font-medium text-[#1F396D]">For two or more families, submit one form per family.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Parent or guardian name *
              <input className={inputClass} name="referredParentName" maxLength={100} required />
            </label>
            <label className={labelClass}>Parent or guardian email *
              <input className={inputClass} name="referredEmail" type="email" maxLength={254} required />
            </label>
            <label className={labelClass}>New student’s name *
              <input className={inputClass} name="referredStudentName" maxLength={100} required />
            </label>
            <label className={labelClass}>New student’s start date *
              <input className={inputClass} name="newStudentStartDate" type="date" required />
            </label>
            <label className={labelClass}>Program of interest <span className="font-normal text-slate-500">(optional)</span>
              <select className={inputClass} name="programInterest" defaultValue="">
                <option value="">Not sure yet</option>
                <option>Math tutoring</option>
                <option>English tutoring</option>
                <option>SAT/ACT preparation</option>
                <option>Coding or STEAM</option>
                <option>Summer program</option>
              </select>
            </label>
          </div>
        </fieldset>

        <div className="hidden" aria-hidden="true">
          <label>Company<input name="_hp" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <input name="permissionConfirmed" type="checkbox" className="mt-1 h-4 w-4 accent-[#1F396D]" required />
          <span>I confirm this family gave me permission to share their contact information with GrowWise. *</span>
        </label>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Referral credit is reviewed during the new student’s third monthly billing cycle. The new student must remain actively enrolled and in good standing. Credits have no cash value and cannot exceed the referring family’s invoice balance.
        </div>

        {state.status === 'error' && <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800" role="alert">{state.message}</p>}

        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#d8520d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === 'submitting' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
          {state.status === 'submitting' ? 'Submitting…' : 'Submit referral'}
        </button>
      </div>
    </form>
  )
}
