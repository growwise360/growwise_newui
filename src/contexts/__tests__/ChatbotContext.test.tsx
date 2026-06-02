import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { ChatbotProvider, useChatbot } from '../ChatbotContext';

function wrapper({ children }: { children: React.ReactNode }) {
  return <ChatbotProvider>{children}</ChatbotProvider>;
}

describe('ChatbotContext pending messages', () => {
  it('assigns incrementing ids for each initialUserMessage', () => {
    const { result } = renderHook(() => useChatbot(), { wrapper });

    act(() => {
      result.current.openChatbot({
        initialUserMessage: 'Hi! I have questions about the academic summer program schedule.',
      });
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.pendingUserMessage).toEqual({
      id: 1,
      text: 'Hi! I have questions about the academic summer program schedule.',
    });

    act(() => {
      result.current.clearPendingUserMessage();
      result.current.openChatbot({
        initialUserMessage: 'Hi! I have questions about the academic summer program schedule.',
      });
    });

    expect(result.current.pendingUserMessage?.id).toBe(2);
    expect(result.current.pendingUserMessage?.text).toBe(
      'Hi! I have questions about the academic summer program schedule.',
    );
  });

  it('opens without pending message when no initialUserMessage is provided', () => {
    const { result } = renderHook(() => useChatbot(), { wrapper });

    act(() => {
      result.current.openChatbot();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.pendingUserMessage).toBeNull();
  });
});
