'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import FormPrivacyConsent from '@/components/form/FormPrivacyConsent';
import { isValidChatbotEmail } from '@/lib/chatbotSession';

type ChatbotEmailGateProps = {
  onContinue: (email: string, honeypot?: string) => void | Promise<void>;
  error?: string;
  isSubmitting?: boolean;
};

export function ChatbotEmailGate({ onContinue, error, isSubmitting = false }: ChatbotEmailGateProps) {
  const t = useTranslations('chatbot.emailGate');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidChatbotEmail(trimmed)) {
      setValidationError(t('invalidEmail'));
      return;
    }
    if (!agree) {
      setValidationError(t('consentRequired'));
      return;
    }
    setValidationError('');
    void Promise.resolve(onContinue(trimmed, honeypot));
  };

  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-medium text-slate-800">{t('prompt')}</p>
      <div className="space-y-1.5">
        <Label htmlFor="growy-chat-email" className="text-xs text-slate-600">
          {t('emailLabel')}
        </Label>
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="growy-chat-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder={t('emailPlaceholder')}
            className="min-h-[44px] pl-9"
            aria-invalid={Boolean(displayError)}
          />
        </div>
      </div>
      <FormPrivacyConsent
        checkboxId="growy-chat-email-consent"
        checked={agree}
        onCheckedChange={setAgree}
        variant="compact"
        alignPrivacyWithConsent
        showSubmitDisclaimer={false}
      />
      {displayError ? (
        <p className="text-xs text-red-600" role="alert">
          {displayError}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] w-full rounded-full bg-[#1F396D] hover:bg-[#183056] disabled:opacity-60"
      >
        {isSubmitting ? t('submitting') : t('continueCta')}
      </Button>
    </form>
  );
}
