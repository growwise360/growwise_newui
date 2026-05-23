const CHATBOT_EMAIL_LEAD_SENT_KEY = 'growy_chat_email_lead_sent';

export type ChatbotEmailLeadPayload = {
  email: string;
  pageContextId: string;
  pageUri?: string;
  queuedMessage?: string | null;
  honeypot?: string;
};

export type ChatbotEmailLeadResult =
  | { ok: true }
  | { ok: false; message?: string };

export function hasChatbotEmailLeadBeenSent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(CHATBOT_EMAIL_LEAD_SENT_KEY) === 'true';
  } catch {
    return false;
  }
}

function markChatbotEmailLeadSent(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CHATBOT_EMAIL_LEAD_SENT_KEY, 'true');
  } catch {
    // ignore
  }
}

/** Capture Growy email-gate lead before unlocking chat. */
export async function submitChatbotEmailLead(
  payload: ChatbotEmailLeadPayload,
): Promise<ChatbotEmailLeadResult> {
  if (hasChatbotEmailLeadBeenSent()) return { ok: true };

  let response: Response;
  try {
    response = await fetch('/api/chat/email-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: payload.email,
        pageContextId: payload.pageContextId,
        pageUri: payload.pageUri ?? (typeof window !== 'undefined' ? window.location.href : ''),
        queuedMessage: payload.queuedMessage ?? undefined,
        _hp: payload.honeypot ?? '',
      }),
    });
  } catch {
    return { ok: false, message: 'Network error. Please try again.' };
  }

  let data: { success?: boolean; message?: string } = {};
  try {
    data = (await response.json()) as { success?: boolean; message?: string };
  } catch {
    // non-JSON error body
  }

  if (!response.ok || !data.success) {
    return {
      ok: false,
      message: data.message ?? 'Could not save your email. Please try again.',
    };
  }

  markChatbotEmailLeadSent();
  return { ok: true };
}
