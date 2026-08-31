'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, FileText, Loader2, UploadCloud } from 'lucide-react'

import { MAX_STUDENT_SUBMISSION_BYTES } from '@/lib/studentSubmissions'

type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string; submissionId?: string }
  | { status: 'success'; submissionId: string }

const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-[#1F396D] focus:ring-2 focus:ring-[#1F396D]/20'
const labelClass = 'block text-sm font-semibold text-slate-800'

export function StudentWorkSubmissionForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const [fileName, setFileName] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const payload = new FormData(form)
    payload.set('guardianConsent', payload.get('guardianConsent') === 'on' ? 'true' : 'false')
    payload.set('originalWork', payload.get('originalWork') === 'on' ? 'true' : 'false')
    const file = payload.get('workFile')
    if (!(file instanceof File) || file.size === 0) {
      setState({ status: 'error', message: 'Choose a PDF, DOCX, or TXT file.' })
      return
    }
    if (file.size > MAX_STUDENT_SUBMISSION_BYTES) {
      setState({ status: 'error', message: 'The file must be 8 MB or smaller.' })
      return
    }

    setState({ status: 'submitting' })
    try {
      const response = await fetch('/api/student-submissions', { method: 'POST', body: payload })
      const result = await response.json() as {
        success?: boolean
        error?: string
        submissionId?: string
        stored?: boolean
      }
      if (!response.ok || !result.success || !result.submissionId) {
        setState({
          status: 'error',
          message: result.error || 'We could not submit the work. Please try again.',
          submissionId: result.stored ? result.submissionId : undefined,
        })
        return
      }
      form.reset()
      setFileName('')
      setState({ status: 'success', submissionId: result.submissionId })
    } catch {
      setState({ status: 'error', message: 'Network error. Please try again.' })
    }
  }

  if (state.status === 'success') {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold text-slate-950">Your work is ready for review</h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-700">
          GrowWise received the file and notified the reviewer. Nothing is published automatically. We may contact your parent or guardian about edits, permissions, or the public byline.
        </p>
        <p className="mt-4 text-sm text-slate-600">Submission ID</p>
        <p className="mt-1 break-all font-mono font-bold text-[#1F396D]">{state.submissionId}</p>
        <p className="mx-auto mt-5 max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          A confirmation was sent to the parent or guardian email. If it is not in the inbox, check Spam, Junk, or Promotions.
        </p>
        <button type="button" onClick={() => setState({ status: 'idle' })} className="mt-6 font-bold text-[#1F396D] underline underline-offset-4">
          Submit another piece
        </button>
      </section>
    )
  }

  return (
    <form ref={formRef} onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8" noValidate>
      <div className="grid gap-7">
        <fieldset>
          <legend className="text-xl font-bold text-[#1F396D]">About your work</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Submission type *
              <select name="submissionType" className={inputClass} required defaultValue="">
                <option value="" disabled>Choose one</option>
                <option value="article">Article</option>
                <option value="story">Short story or creative writing</option>
              </select>
            </label>
            <label className={labelClass}>Title *
              <input name="title" className={inputClass} minLength={2} maxLength={160} required />
            </label>
            <div>
              <label htmlFor="studentName" className={labelClass}>Student name *</label>
              <input id="studentName" name="studentName" className={inputClass} minLength={2} maxLength={100} required aria-describedby="studentNameHelp" />
              <span id="studentNameHelp" className="mt-1 block text-xs font-normal leading-5 text-slate-500">We will confirm the public byline with your parent or guardian before publishing.</span>
            </div>
            <label className={labelClass}>Grade *
              <select name="grade" className={inputClass} required defaultValue="">
                <option value="" disabled>Choose grade</option>
                {Array.from({ length: 10 }, (_, index) => String(index + 3)).map((grade) => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className="border-t border-slate-200 pt-7">
          <legend className="text-xl font-bold text-[#1F396D]">Upload your file</legend>
          <label className="mt-5 flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-[#1F396D] hover:bg-blue-50/40">
            <UploadCloud className="h-9 w-9 text-[#1F396D]" aria-hidden />
            <span className="mt-3 font-bold text-slate-900">Choose a PDF, DOCX, or TXT file</span>
            <span className="mt-1 text-sm text-slate-600">Maximum size: 8 MB</span>
            <input
              name="workFile"
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              required
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
            />
            {fileName && (
              <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#1F396D] shadow-sm">
                <FileText className="h-4 w-4" aria-hidden />
                {fileName}
              </span>
            )}
          </label>
          <p className="mt-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Protect your privacy: remove home addresses, personal phone numbers, passwords, private account links, and other students’ identifying information.
          </p>
        </fieldset>

        <fieldset className="border-t border-slate-200 pt-7">
          <legend className="text-xl font-bold text-[#1F396D]">Parent or guardian review</legend>
          <p className="mt-1 text-sm leading-6 text-slate-600">A parent or guardian must review the work and permission statements before submission.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Parent or guardian name *
              <input name="guardianName" className={inputClass} minLength={2} maxLength={100} required />
            </label>
            <label className={labelClass}>Parent or guardian email *
              <input name="guardianEmail" type="email" className={inputClass} maxLength={254} required />
            </label>
          </div>
        </fieldset>

        <label className={labelClass}>Notes for the reviewer <span className="font-normal text-slate-500">(optional)</span>
          <textarea name="notes" className={`${inputClass} min-h-28 resize-y`} maxLength={2000} placeholder="Anything the reviewer should know about this piece?" />
        </label>

        <div className="hidden" aria-hidden="true">
          <label>Company<input name="_hp" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <input name="guardianConsent" type="checkbox" className="mt-1 h-4 w-4 accent-[#1F396D]" required />
            <span>A parent or guardian has reviewed this submission and gives GrowWise permission to privately review it for possible publication. *</span>
          </label>
          <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <input name="originalWork" type="checkbox" className="mt-1 h-4 w-4 accent-[#1F396D]" required />
            <span>This is the student’s original work, sources are credited, and it does not include private information belonging to someone else. *</span>
          </label>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          Submitting does not guarantee publication. GrowWise may edit, request revisions, decline a submission, or ask for additional parent/guardian permission before publishing.
        </p>

        {state.status === 'error' && (
          <div className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800" role="alert">
            <p className="font-semibold">{state.message}</p>
            {state.submissionId && <p className="mt-1">Saved submission ID: <span className="font-mono">{state.submissionId}</span></p>}
          </div>
        )}

        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F16112] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#d8520d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === 'submitting' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
          {state.status === 'submitting' ? 'Uploading securely…' : 'Submit for review'}
        </button>
      </div>
    </form>
  )
}
