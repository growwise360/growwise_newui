'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CountryCodeSelector from '@/components/CountryCodeSelector';
import copy from '@/i18n/messages/academic-summer-programs-en.json';
import {
  DIAL_CODE_TO_ISO2,
  getPhonePlaceholder,
  validatePhoneWithCountryCode,
} from '@/lib/phoneValidation';

const COPY = copy.inquiryModal;
const SOURCE = 'academic-summer-programs';

export type AcademicProgramInterestId =
  | 'read-to-prove'
  | 'write-to-explain'
  | 'bridge-the-gap-math'
  | 'im1'
  | 'algebra-1'
  | 'geometry'
  | 'not-sure';

export type AcademicInquiryFormData = {
  parentName: string;
  email: string;
  countryCode: string;
  phone: string;
  childGrade: string;
  programInterest: AcademicProgramInterestId;
  preferredMonth: keyof typeof COPY.monthOptions;
  preferredTime: keyof typeof COPY.timeOptions;
  needsHelp: string;
};

const GRADE_OPTIONS = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm ' +
  'placeholder:text-slate-400 focus:border-[#1F396D] focus:outline-none focus:ring-2 focus:ring-[#1F396D]/25';

type AcademicSummerInquiryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedProgram?: AcademicProgramInterestId;
};

export function AcademicSummerInquiryModal({
  open,
  onOpenChange,
  preselectedProgram = 'not-sure',
}: AcademicSummerInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AcademicInquiryFormData>({
    defaultValues: {
      parentName: '',
      email: '',
      countryCode: '+1',
      phone: '',
      childGrade: '',
      programInterest: preselectedProgram,
      preferredMonth: 'flexible',
      preferredTime: 'flexible',
      needsHelp: '',
    },
  });

  const countryCode = watch('countryCode');
  const phonePlaceholder = getPhonePlaceholder(DIAL_CODE_TO_ISO2[countryCode]);

  useEffect(() => {
    if (open) {
      setValue('programInterest', preselectedProgram, { shouldDirty: true });
    } else {
      setSubmitted(false);
    }
  }, [open, preselectedProgram, setValue]);

  const onSubmit = async (data: AcademicInquiryFormData) => {
    clearErrors('root');
    const phoneValidation = validatePhoneWithCountryCode(data.countryCode, data.phone);
    const pageUrl =
      typeof window !== 'undefined' ? window.location.href.split('#')[0] : '/camps/academic-summer-programs-dublin-ca';
    const selectedProgram = COPY.programOptions[data.programInterest];

    const messageBody = [
      `Page URL: ${pageUrl}`,
      `Program interest: ${selectedProgram}`,
      `Student grade: ${data.childGrade}`,
      `Preferred month: ${COPY.monthOptions[data.preferredMonth]}`,
      `Preferred time: ${COPY.timeOptions[data.preferredTime]}`,
      `What they need help with:\n${data.needsHelp.trim()}`,
    ].join('\n\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.parentName,
          email: data.email,
          phone: phoneValidation.e164 ?? data.phone,
          message: messageBody,
          source: SOURCE,
          program: selectedProgram,
          gradeLevel: data.childGrade,
        }),
      });

      const json = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || json.success === false) {
        setError('root', { message: json.message ?? COPY.errorMessage });
        return;
      }

      reset({
        parentName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        childGrade: '',
        programInterest: preselectedProgram,
        preferredMonth: 'flexible',
        preferredTime: 'flexible',
        needsHelp: '',
      });
      setSubmitted(true);
    } catch {
      setError('root', { message: COPY.errorMessage });
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setSubmitted(false);
      reset({
        parentName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        childGrade: '',
        programInterest: preselectedProgram,
        preferredMonth: 'flexible',
        preferredTime: 'flexible',
        needsHelp: '',
      });
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-slate-900">{COPY.title}</DialogTitle>
          <DialogDescription className="text-slate-600">{COPY.subtitle}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-700" role="status">
            {COPY.successMessage}
          </p>
        ) : (
          <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <Label htmlFor="academic-inquiry-parent">{COPY.parentNameLabel}</Label>
              <Input
                id="academic-inquiry-parent"
                type="text"
                autoComplete="name"
                className="h-11"
                aria-invalid={errors.parentName ? 'true' : 'false'}
                {...register('parentName', {
                  required: 'Please enter your name.',
                  setValueAs: (v: string) => v.trim(),
                  minLength: { value: 2, message: 'Enter at least 2 characters.' },
                })}
              />
              {errors.parentName ? (
                <p className="text-sm text-red-600" role="alert">
                  {errors.parentName.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="academic-inquiry-email">{COPY.emailLabel}</Label>
                <Input
                  id="academic-inquiry-email"
                  type="email"
                  autoComplete="email"
                  className="h-11"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  {...register('email', {
                    required: 'Please enter an email address.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address.',
                    },
                  })}
                />
                {errors.email ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="academic-inquiry-phone">{COPY.phoneLabel}</Label>
                <div
                  className={[
                    'flex items-center gap-0 overflow-hidden rounded-lg border bg-white shadow-sm',
                    errors.phone ? 'border-red-500' : 'border-slate-300',
                    'focus-within:border-[#1F396D] focus-within:ring-2 focus-within:ring-[#1F396D]/25',
                  ].join(' ')}
                >
                  <CountryCodeSelector
                    value={countryCode}
                    onChange={(v) => setValue('countryCode', v, { shouldDirty: true, shouldValidate: true })}
                    className="flex-shrink-0"
                  />
                  <div className="h-10 w-px flex-shrink-0 bg-slate-300" aria-hidden />
                  <input
                    id="academic-inquiry-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder={phonePlaceholder}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    {...register('phone', {
                      required: 'Please enter a phone number.',
                      validate: (v) => {
                        const res = validatePhoneWithCountryCode(countryCode, v);
                        return res.isValid || res.errorMessage || 'Please enter a valid phone number.';
                      },
                    })}
                  />
                </div>
                {errors.phone ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="academic-inquiry-grade">{COPY.gradeLabel}</Label>
              <select
                id="academic-inquiry-grade"
                className={inputClass}
                aria-invalid={errors.childGrade ? 'true' : 'false'}
                {...register('childGrade', { required: 'Please select a grade.' })}
              >
                <option value="">{COPY.gradePlaceholder}</option>
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g === 'K' ? 'Kindergarten' : `Grade ${g}`}
                  </option>
                ))}
              </select>
              {errors.childGrade ? (
                <p className="text-sm text-red-600" role="alert">
                  {errors.childGrade.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="academic-inquiry-program">{COPY.programLabel}</Label>
              <select
                id="academic-inquiry-program"
                className={inputClass}
                aria-invalid={errors.programInterest ? 'true' : 'false'}
                {...register('programInterest', { required: 'Please select a program.' })}
              >
                {Object.entries(COPY.programOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="academic-inquiry-month">{COPY.monthLabel}</Label>
                <select id="academic-inquiry-month" className={inputClass} {...register('preferredMonth')}>
                  {Object.entries(COPY.monthOptions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="academic-inquiry-time">{COPY.timeLabel}</Label>
                <select id="academic-inquiry-time" className={inputClass} {...register('preferredTime')}>
                  {Object.entries(COPY.timeOptions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="academic-inquiry-needs">{COPY.needsLabel}</Label>
              <textarea
                id="academic-inquiry-needs"
                rows={4}
                className={`${inputClass} min-h-[120px] resize-y`}
                placeholder={COPY.needsPlaceholder}
                aria-invalid={errors.needsHelp ? 'true' : 'false'}
                {...register('needsHelp', {
                  required: 'Please tell us what your child needs help with.',
                  setValueAs: (v: string) => v.trim(),
                  minLength: { value: 10, message: 'Please share a bit more detail (at least 10 characters).' },
                })}
              />
              {errors.needsHelp ? (
                <p className="text-sm text-red-600" role="alert">
                  {errors.needsHelp.message}
                </p>
              ) : null}
            </div>

            {errors.root ? (
              <p className="text-sm text-red-600" role="alert">
                {errors.root.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#F16112] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d54f0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? COPY.submittingCta : COPY.submitCta}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
