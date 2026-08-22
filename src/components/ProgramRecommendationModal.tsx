'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, CheckCircle, X } from 'lucide-react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormPrivacyConsent from '@/components/form/FormPrivacyConsent'
import { publicPath } from '@/lib/publicPath'
import { pushDataLayer } from '@/lib/analytics/gtmEvents'
import { FIELD_MAX } from '@/lib/inputLimits'
import { validatePhoneSimple } from '@/lib/phoneValidation'

export type RecommendationSubject = 'Math' | 'English' | 'SAT Prep' | 'Not sure'
export type RecommendationGradeBand = 'K-5' | 'K-2' | '3-5' | '6-8' | '9-12'

type ProgramRecommendationModalProps = {
  isOpen: boolean
  onClose: () => void
  defaultSubject?: RecommendationSubject
  defaultGradeBand?: RecommendationGradeBand
  sourcePage: string
}

const GRADES = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const
const SUBJECTS: RecommendationSubject[] = ['Math', 'English', 'SAT Prep', 'Not sure']
export default function ProgramRecommendationModal({
  isOpen,
  onClose,
  defaultSubject,
  defaultGradeBand,
  sourcePage,
}: ProgramRecommendationModalProps) {
  const locale = useLocale()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [step, setStep] = useState(0)
  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState<RecommendationSubject | ''>(defaultSubject ?? '')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [parentName, setParentName] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setStep(0)
    setGrade('')
    setSubject(defaultSubject ?? '')
    setEmail('')
    setPhone('')
    setParentName('')
    setConsent(false)
    setStatus('idle')
    setError('')
    pushDataLayer({ event: 'program_recommendation_viewed', source_page: sourcePage })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [defaultSubject, isOpen, onClose, sourcePage])

  if (!isOpen) return null

  const advance = () => {
    setError('')
    if (step === 0 && !grade) return setError('Choose your child\'s grade to continue.')
    if (step === 1 && !subject) return setError('Choose a subject to continue.')
    pushDataLayer({
      event: 'program_recommendation_step_completed',
      recommendation_step: step + 1,
      source_page: sourcePage,
      subject: subject || defaultSubject || '',
    })
    setStep((current) => Math.min(current + 1, 2))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    if (!parentName.trim()) return setError('Enter the parent or guardian name.')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.')
    const phoneValidation = validatePhoneSimple(phone)
    if (!phoneValidation.isValid) return setError(phoneValidation.errorMessage || 'Enter a valid phone number.')
    if (!consent) return setError('Please confirm that we may contact you about this request.')
    setStatus('submitting')
    try {
      const response = await fetch('/api/program-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          parentName,
          grade,
          subject,
          sourcePage,
          locale,
          landingUrl: window.location.href,
          website: '',
        }),
      })
      const result = (await response.json()) as { success?: boolean; message?: string }
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to send your information request.')
      setStatus('success')
      pushDataLayer({
        event: 'program_recommendation_submitted',
        source_page: sourcePage,
        grade,
        subject,
      })
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.'
      setError(message)
      setStatus('idle')
      pushDataLayer({ event: 'program_recommendation_failed', source_page: sourcePage })
    }
  }

  const close = () => {
    if (status !== 'success' && (grade || subject || email || phone)) {
      pushDataLayer({ event: 'program_recommendation_abandoned', source_page: sourcePage, recommendation_step: step + 1 })
    }
    onClose()
  }

  const content = (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div ref={dialogRef} className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-9">
        <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close information request form" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center" aria-live="polite">
            <CheckCircle className="mx-auto h-14 w-14 text-green-600" aria-hidden />
            <h2 id={titleId} className="mt-5 text-2xl font-bold text-[#1F396D]">Your request is on its way</h2>
            <p className="mx-auto mt-3 max-w-md text-gray-600">We’ll email program details and current pricing within one business day.</p>
            <Button asChild className="mt-7 rounded-full bg-[#F16112] px-7 text-white hover:bg-[#d9540d]">
              <a href={publicPath('/book-assessment', locale)}>Book My Free Assessment</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="pr-12">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F16112]">30-second request</p>
              <h2 id={titleId} className="mt-2 text-2xl font-bold text-[#1F396D]">Get more program information</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Tell us your child’s grade and subject. We’ll send relevant program details and current pricing—no commitment.</p>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100" aria-label={`Step ${step + 1} of 3`}>
              <div className="h-full rounded-full bg-[#F16112] transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} />
            </div>

            <form className="mt-7" onSubmit={submit}>
              {step === 0 ? (
                <fieldset>
                  <legend className="text-lg font-bold text-gray-900">What grade is your child in?</legend>
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {GRADES.map((item) => (
                      <button key={item} type="button" onClick={() => setGrade(item)} className={`min-h-11 rounded-xl border px-3 py-2 font-semibold ${grade === item ? 'border-[#F16112] bg-orange-50 text-[#C44D0A]' : 'border-gray-200 text-gray-700 hover:border-[#F16112]/50'}`} aria-pressed={grade === item}>
                        {item}
                      </button>
                    ))}
                  </div>
                  {defaultGradeBand ? <p className="mt-3 text-xs text-gray-500">Showing all grades; this page focuses on Grades {defaultGradeBand}.</p> : null}
                </fieldset>
              ) : null}

              {step === 1 ? (
                <fieldset>
                  <legend className="text-lg font-bold text-gray-900">Which subject needs support?</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {SUBJECTS.map((item) => (
                      <button key={item} type="button" onClick={() => setSubject(item)} className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold ${subject === item ? 'border-[#F16112] bg-orange-50 text-[#C44D0A]' : 'border-gray-200 text-gray-700 hover:border-[#F16112]/50'}`} aria-pressed={subject === item}>{item}</button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 2 ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recommendation-email">Your email address *</Label>
                    <Input id="recommendation-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={FIELD_MAX.email} className="mt-2 min-h-11" required />
                    <p className="mt-1.5 text-xs text-gray-500">We&apos;ll email relevant program details and current pricing.</p>
                  </div>
                  <div>
                    <Label htmlFor="recommendation-phone">Phone number *</Label>
                    <Input id="recommendation-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={FIELD_MAX.phone} className="mt-2 min-h-11" required />
                  </div>
                  <div>
                    <Label htmlFor="recommendation-name">Parent or guardian name *</Label>
                    <Input id="recommendation-name" autoComplete="name" value={parentName} onChange={(event) => setParentName(event.target.value)} maxLength={FIELD_MAX.name} className="mt-2 min-h-11" required />
                  </div>
                  <FormPrivacyConsent
                    checkboxId="program-recommendation-consent"
                    checked={consent}
                    onCheckedChange={setConsent}
                    variant="compact"
                    alignPrivacyWithConsent
                    showSubmitDisclaimer={false}
                    agreeLabel="GrowWise may email or call me about this request."
                    className="[&_h3]:text-xs [&_p]:text-[10px] [&_p]:leading-4 [&_label]:text-xs [&_label]:leading-4"
                  />
                </div>
              ) : null}

              {error ? <p className="mt-4 text-sm text-red-600" role="alert">{error}</p> : null}
              <div className="mt-7 flex gap-3">
                {step > 0 ? (
                  <Button type="button" variant="outline" onClick={() => { setError(''); setStep((current) => current - 1) }} className="min-h-11 rounded-full px-5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : null}
                {step < 2 ? (
                  <Button type="button" onClick={advance} className="min-h-11 flex-1 rounded-full bg-[#F16112] text-white hover:bg-[#d9540d]">Continue</Button>
                ) : (
                  <Button type="submit" disabled={status === 'submitting'} className="min-h-11 flex-1 rounded-full bg-[#F16112] text-white hover:bg-[#d9540d]">
                    {status === 'submitting' ? 'Sending…' : 'Send My Request'}
                  </Button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )

  return typeof document === 'undefined' ? null : createPortal(content, document.body)
}
