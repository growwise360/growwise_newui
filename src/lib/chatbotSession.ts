const CHATBOT_SESSION_EMAIL_KEY = 'growy_chat_email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readChatbotSessionEmail(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = sessionStorage.getItem(CHATBOT_SESSION_EMAIL_KEY)?.trim().toLowerCase();
    return value && EMAIL_REGEX.test(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeChatbotSessionEmail(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CHATBOT_SESSION_EMAIL_KEY, email.trim().toLowerCase());
  } catch {
    // storage blocked — gate still unlocks for this tab via React state
  }
}

export function clearChatbotSessionEmail(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(CHATBOT_SESSION_EMAIL_KEY);
  } catch {
    // ignore
  }
}

export function isValidChatbotEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}
