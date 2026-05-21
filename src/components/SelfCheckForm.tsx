'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { PREDICTION_OPTIONS } from '@/lib/award';
import { CONTACT_INFO } from '@/lib/constants';

interface FormState {
  parentName: string;
  parentEmail: string;
  studentName: string;
  grade: string;
  parentPredictions: string[];
}

interface FormErrors {
  parentName?: string;
  parentEmail?: string;
  studentName?: string;
  grade?: string;
  parentPredictions?: string;
  general?: string;
}

interface MagicLinkData {
  childName: string;
  childGrade: string;
  parentEmail: string;
  quizUrl: string;
  emailSent: boolean;
}

const GRADES = [
  { value: '3', label: 'Grade 3' },
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '7', label: 'Grade 7' },
  { value: '8', label: 'Grade 8' },
];

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/;
const SUBMISSION_COOLDOWN_MS = 30 * 60 * 1000;
const STORAGE_KEY_PREFIX = 'growwise_self_check_submit_';

function getLastSubmissionTime(email: string): number | null {
  if (typeof window === 'undefined') return null;
  const key = STORAGE_KEY_PREFIX + email.toLowerCase().trim();
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) : null;
}

function setLastSubmissionTime(email: string): void {
  if (typeof window === 'undefined') return;
  const key = STORAGE_KEY_PREFIX + email.toLowerCase().trim();
  localStorage.setItem(key, Date.now().toString());
}

function getTimeUntilCanSubmit(email: string): number {
  const lastTime = getLastSubmissionTime(email);
  if (!lastTime) return 0;
  const elapsed = Date.now() - lastTime;
  const remaining = SUBMISSION_COOLDOWN_MS - elapsed;
  return remaining > 0 ? remaining : 0;
}

function validateField(field: keyof FormState, value: string): string | undefined {
  switch (field) {
    case 'parentName':
      return !value.trim() ? 'Your first name is required.' : undefined;
    case 'parentEmail':
      if (!value.trim()) return 'Email is required.';
      if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email.';
      return undefined;
    case 'studentName':
      return !value.trim() ? "Your child's name is required." : undefined;
    case 'grade':
      return !value ? 'Please select a grade.' : undefined;
    case 'parentPredictions':
      return undefined;
  }
}

/* ─── Magic Link Card ──────────────────────────────────────────────── */

function MagicLinkCard({ data }: { data: MagicLinkData }) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `Hi ${data.childName}! GrowWise sent you a short math quiz. It takes less than 10 minutes. Here's your link: ${data.quizUrl}`;

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.quizUrl).then(() => triggerCopied()).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    const el = document.createElement('textarea');
    el.value = data.quizUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    triggerCopied();
  }

  function triggerCopied() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
  }

  function handleSMS() {
    window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, '_blank');
  }

  function handleEmail() {
    window.open(
      `mailto:?subject=${encodeURIComponent("Your GrowWise math quiz is ready")}&body=${encodeURIComponent(shareMessage)}`,
      '_blank',
    );
  }

  return (
    <div className="space-y-4">
      {/* Green confirmation header */}
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" aria-hidden />
        <div>
          <p className="font-bold text-sm text-green-800">Your child&apos;s quiz link is ready</p>
          <p className="text-xs text-green-700 mt-0.5">
            Ready for {data.childName} &middot; Grade {data.childGrade}
          </p>
        </div>
      </div>

      {/* Step 1: Copy link */}
      <div>
        <p className="text-[10px] font-bold text-[#F16112] uppercase tracking-widest mb-1">
          Step 1 &mdash; Copy the quiz link
        </p>
        <p className="text-[11px] text-gray-500 mb-1.5">
          Copy this link and send it to <strong className="text-[#1F396D]">{data.childName}</strong> — they open it on their device to start the quiz.
        </p>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <span className="font-mono text-[11px] text-gray-600 flex-1 truncate">{data.quizUrl}</span>
          <button
            onClick={handleCopy}
            className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-[#1F396D] text-white hover:bg-[#162d57]'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Step 2: Share */}
      <div>
        <p className="text-[10px] font-bold text-[#F16112] uppercase tracking-widest mb-1.5">
          Step 2 &mdash; Send it to your child now
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:opacity-90 text-white text-xs font-bold py-2.5 rounded-lg transition-opacity"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={handleSMS}
            className="flex items-center justify-center gap-1.5 bg-[#1F396D] hover:bg-[#162d57] text-white text-xs font-bold py-2.5 rounded-lg border border-[#1F396D]/30 transition-colors"
          >
            📱 Text
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-lg border border-gray-200 transition-colors"
          >
            ✉️ Email
          </button>
        </div>
      </div>

      {/* Reminder */}
      <p className="text-[11px] text-gray-400 text-center leading-relaxed">
        Link works on any device &middot; Expires in 48 hours &middot; No login needed for your child
      </p>

      {/* Email confirmation — only when API actually sent the email */}
      {data.emailSent ? (
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-center">
          <p className="text-xs text-gray-500">
            📧 We&apos;ve also emailed you this link at <strong className="text-gray-700">{data.parentEmail}</strong>
          </p>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5 text-center">
          <p className="text-xs text-amber-800">
            Copy the link above and send it to your child — that&apos;s the fastest way to start the quiz.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Form ─────────────────────────────────────────────────────── */

export default function SelfCheckForm() {
  const [form, setForm] = useState<FormState>({
    parentName: '',
    parentEmail: '',
    studentName: '',
    grade: '',
    parentPredictions: [],
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitErrors, setSubmitErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [magicLink, setMagicLink] = useState<MagicLinkData | null>(null);

  function getError(field: keyof FormState): string | undefined {
    return submitErrors[field] ?? (touched[field] ? validateField(field, typeof form[field] === 'string' ? form[field] : '') : undefined);
  }

  function touch(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function togglePrediction(value: string) {
    setForm((prev) => ({
      ...prev,
      parentPredictions: prev.parentPredictions.includes(value)
        ? prev.parentPredictions.filter((v) => v !== value)
        : [...prev.parentPredictions, value],
    }));
    touch('parentPredictions');
  }

  function validateAll(): FormErrors {
    const fields: (keyof FormState)[] = ['parentName', 'parentEmail', 'studentName', 'grade'];
    const errs: FormErrors = {};
    for (const f of fields) {
      const val = form[f];
      const err = validateField(f, typeof val === 'string' ? val : '');
      if (err) (errs as Record<string, string>)[f] = err;
    }
    if (form.grade && form.parentPredictions.length === 0) {
      errs.parentPredictions = 'Please select at least one area.';
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateAll();
    if (Object.keys(errs).length > 0) {
      setSubmitErrors(errs);
      setTouched({ parentName: true, parentEmail: true, studentName: true, grade: true, parentPredictions: true });
      return;
    }

    const remainingMs = getTimeUntilCanSubmit(form.parentEmail.trim().toLowerCase());
    if (remainingMs > 0) {
      const minutes = Math.ceil(remainingMs / 60000);
      setSubmitErrors({
        general: `You already submitted this email. Please wait ${minutes} minute${minutes !== 1 ? 's' : ''} before trying again.`,
      });
      return;
    }

    setSubmitErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/self-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          parentEmail: form.parentEmail.trim().toLowerCase(),
          studentName: form.studentName.trim(),
          grade: form.grade,
          subject: 'math',
          parentPrediction: form.parentPredictions,
        }),
      });
      const data = await res.json() as { success?: boolean; error?: string; quizUrl?: string; emailSent?: boolean };
      if (data.error === 'grade_unavailable') {
        setSubmitErrors({ grade: `This grade is coming soon. Call us at ${CONTACT_INFO.phone} to schedule directly.` });
        return;
      }
      if (!res.ok || !data.success) {
        setSubmitErrors({ general: data.error || 'Something went wrong. Please try again.' });
        return;
      }
      setLastSubmissionTime(form.parentEmail.trim().toLowerCase());
      setMagicLink({
        childName: form.studentName.trim(),
        childGrade: form.grade,
        parentEmail: form.parentEmail.trim().toLowerCase(),
        quizUrl: data.quizUrl ?? '',
        emailSent: data.emailSent ?? false,
      });
    } catch {
      setSubmitErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  }

  if (magicLink) {
    return <MagicLinkCard data={magicLink} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <input type="text" name="_hp" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-2 gap-3">
        {/* Parent First Name */}
        <div className="space-y-1">
          <Label htmlFor="sc-parentName" className="text-xs font-medium text-gray-600">
            Your First Name
          </Label>
          <Input
            id="sc-parentName"
            type="text"
            placeholder="Sarah"
            maxLength={100}
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
            onBlur={() => touch('parentName')}
            aria-invalid={!!getError('parentName')}
            className="h-10 text-sm"
          />
          {getError('parentName') && (
            <p className="text-xs text-red-600" role="alert">{getError('parentName')}</p>
          )}
        </div>

        {/* Parent Email */}
        <div className="space-y-1">
          <Label htmlFor="sc-parentEmail" className="text-xs font-medium text-gray-600">
            Your Email
          </Label>
          <Input
            id="sc-parentEmail"
            type="email"
            placeholder="you@example.com"
            maxLength={254}
            value={form.parentEmail}
            onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
            onBlur={() => touch('parentEmail')}
            aria-invalid={!!getError('parentEmail')}
            className="h-10 text-sm"
          />
          {getError('parentEmail') && (
            <p className="text-xs text-red-600" role="alert">{getError('parentEmail')}</p>
          )}
        </div>

        {/* Student First Name */}
        <div className="space-y-1">
          <Label htmlFor="sc-studentName" className="text-xs font-medium text-gray-600">
            Child&#39;s First Name
          </Label>
          <Input
            id="sc-studentName"
            type="text"
            placeholder="Arjun"
            maxLength={100}
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            onBlur={() => touch('studentName')}
            aria-invalid={!!getError('studentName')}
            className="h-10 text-sm"
          />
          {getError('studentName') && (
            <p className="text-xs text-red-600" role="alert">{getError('studentName')}</p>
          )}
        </div>

        {/* Grade — pill buttons */}
        <div className="space-y-1">
          <Label className="text-xs font-medium text-gray-600">
            Child&#39;s Grade
          </Label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Select grade">
            {GRADES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => { setForm({ ...form, grade: value }); touch('grade'); }}
                aria-pressed={form.grade === value}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  form.grade === value
                    ? 'bg-[#F16112] text-white border-[#F16112]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#F16112]/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {getError('grade') && (
            <p className="text-xs text-red-600" role="alert">{getError('grade')}</p>
          )}
        </div>
      </div>

      {/* Parent Prediction — shown after grade is selected */}
      {form.grade && (
        <div className="space-y-2 pt-1">
          <Label className="text-xs font-semibold text-[#1F396D]">
            🔍 Detective Challenge: What do you think is your child&#39;s main math challenge?
          </Label>
          <p className="text-[11px] text-gray-500">Select all that apply.</p>
          <div className="space-y-1.5">
            {PREDICTION_OPTIONS.map(({ value, label }) => {
              const checked = form.parentPredictions.includes(value);
              return (
                <label
                  key={value}
                  className={`flex items-center gap-2.5 cursor-pointer rounded-lg border px-3 py-2 text-xs transition-colors ${
                    checked
                      ? 'border-[#F16112] bg-[#F16112]/5 text-[#1F396D] font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-[#1F396D]/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={value}
                    checked={checked}
                    onChange={() => togglePrediction(value)}
                    className="accent-[#F16112] flex-shrink-0"
                  />
                  {label}
                </label>
              );
            })}
          </div>
          {submitErrors.parentPredictions && (
            <p className="text-xs text-red-600" role="alert">{submitErrors.parentPredictions}</p>
          )}
          <p className="text-[11px] text-gray-400 leading-snug">
            Your answer is locked in and compared to the real result at the end.
          </p>
        </div>
      )}

      {submitErrors.general && (
        <p className="rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-700 border border-red-100" role="alert">
          {submitErrors.general}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-[#F16112] hover:bg-[#d54f0a] text-white text-sm font-bold rounded-xl transition-colors shadow-md hover:shadow-lg mt-1"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting up the challenge…
          </>
        ) : (
          'Find What\'s Blocking My Child →'
        )}
      </Button>

      <p className="text-center text-[11px] text-gray-400 leading-snug pt-0.5">
        By submitting, you agree to be contacted by GrowWise about this self-check.
        <br />Free · No password needed · Grades 3–8
      </p>
    </form>
  );
}
