'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BULLETIN_COPY } from '@/data/bulletin-copy';
import { getRecaptchaToken } from '@/lib/recaptcha';
import { publicPath } from '@/lib/publicPath';
import { cn } from '@/lib/utils';

const PM_NO_INJECT = { 'data-lpignore': 'true' } as const;

export interface BulletinSubscribeFormProps {
  /** Unique id prefix for form fields (hero vs bottom). */
  formId: string;
  submitLabel: string;
  successMessage: string;
  /** Light (default) or dark (navy bottom CTA band). */
  variant?: 'light' | 'dark';
  /** Stack button below input (hero) or inline (bottom CTA). */
  layout?: 'stacked' | 'inline';
  className?: string;
}

export function BulletinSubscribeForm({
  formId,
  submitLabel,
  successMessage,
  variant = 'light',
  layout = 'stacked',
  className,
}: BulletinSubscribeFormProps) {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === 'dark';
  const inputId = `${formId}-email`;

  const onSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      setError(null);

      const trimmed = email.trim();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setError('Please enter a valid email address.');
        return;
      }

      setSubmitting(true);
      try {
        const recaptchaToken = await getRecaptchaToken('bulletin_subscribe');
        const res = await fetch('/api/bulletin/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmed,
            recaptchaToken: recaptchaToken ?? undefined,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };

        if (!res.ok || !data.success) {
          setError(data.error || 'Something went wrong. Please try again.');
          return;
        }

        setSuccess(true);
        setEmail('');
      } catch {
        setError('Network error. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [email],
  );

  if (success) {
    return (
      <div
        className={cn(
          'flex items-start gap-3 rounded-lg border p-4 text-sm font-medium',
          isDark
            ? 'border-emerald-700/50 bg-emerald-950/40 text-emerald-100'
            : 'border-emerald-200 bg-emerald-50 text-emerald-900',
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <span>{successMessage}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        id={formId}
        onSubmit={onSubmit}
        className={cn(
          layout === 'inline' ? 'flex flex-col gap-3 sm:flex-row sm:items-start' : 'flex flex-col gap-3',
        )}
        noValidate
      >
        <div className={cn(layout === 'inline' && 'flex-1')}>
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <Input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder={BULLETIN_COPY.form.emailPlaceholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            disabled={submitting}
            className={cn(
              'min-h-[48px] rounded-lg text-[15px]',
              isDark
                ? 'border-slate-600 bg-slate-900/60 text-white placeholder:text-slate-500 focus-visible:border-[#5baa7e] focus-visible:ring-[#5baa7e]/30'
                : 'border-slate-200 bg-white focus-visible:border-[#1F396D] focus-visible:ring-[#1F396D]/20',
            )}
            {...PM_NO_INJECT}
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className={cn(
            'min-h-[48px] rounded-lg px-6 text-[15px] font-semibold text-white hover:bg-[#d54f0a]',
            layout === 'inline' && 'shrink-0',
            'bg-[#F16112]',
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Subscribing…
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </form>

      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <p
        className={cn(
          'mt-3 text-xs leading-relaxed',
          isDark ? 'text-slate-400' : 'text-slate-500',
        )}
      >
        {BULLETIN_COPY.form.privacyNote}{' '}
        <Link
          href={publicPath('/privacy-policy', locale)}
          className={cn(
            'underline hover:no-underline',
            isDark ? 'text-slate-300' : 'text-[#1F396D]',
          )}
        >
          Privacy policy
        </Link>
      </p>
    </div>
  );
}
