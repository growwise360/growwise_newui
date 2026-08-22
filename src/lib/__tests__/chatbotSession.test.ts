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
    expect(isValidChatbotEmail('parent.family@gmail.com')).toBe(true);
    expect(isValidChatbotEmail('not-an-email')).toBe(false);
    expect(isValidChatbotEmail('parent@gmial.com')).toBe(false);
    expect(isValidChatbotEmail('123448294@gmail.com')).toBe(false);
    expect(isValidChatbotEmail('a1b2c3d4e5f6@gmail.com')).toBe(false);
  });

  it('persists email for the browser session', () => {
    writeChatbotSessionEmail('Parent.Family@Gmail.com');
    expect(readChatbotSessionEmail()).toBe('parent.family@gmail.com');
  });

  it('returns null when no email is stored', () => {
    expect(readChatbotSessionEmail()).toBeNull();
  });

  it('clears stored email', () => {
    writeChatbotSessionEmail('parent.family@gmail.com');
    clearChatbotSessionEmail();
    expect(readChatbotSessionEmail()).toBeNull();
  });
});
