import {
  clearChatbotSessionEmail,
  isValidChatbotEmail,
  readChatbotSessionEmail,
  writeChatbotSessionEmail,
} from '@/lib/chatbotSession';

describe('chatbotSession', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('validates email shape', () => {
    expect(isValidChatbotEmail('parent@example.com')).toBe(true);
    expect(isValidChatbotEmail('not-an-email')).toBe(false);
  });

  it('persists email for the browser session', () => {
    writeChatbotSessionEmail('Parent@Example.com');
    expect(readChatbotSessionEmail()).toBe('parent@example.com');
  });

  it('returns null when no email is stored', () => {
    expect(readChatbotSessionEmail()).toBeNull();
  });

  it('clears stored email', () => {
    writeChatbotSessionEmail('parent@example.com');
    clearChatbotSessionEmail();
    expect(readChatbotSessionEmail()).toBeNull();
  });
});
