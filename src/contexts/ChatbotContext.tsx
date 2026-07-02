"use client";
import React, { createContext, useCallback, useContext, useRef, useState, ReactNode, SyntheticEvent } from 'react';

export type OpenChatbotOptions = {
  initialUserMessage?: string;
  initialMode?: 'assessment-intake';
};

export type PendingChatMessage = {
  id: number;
  text?: string;
  initialMode?: OpenChatbotOptions['initialMode'];
};

interface ChatbotContextType {
  isOpen: boolean;
  pendingUserMessage: PendingChatMessage | null;
  openChatbot: (arg?: OpenChatbotOptions | SyntheticEvent) => void;
  closeChatbot: () => void;
  clearPendingUserMessage: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<PendingChatMessage | null>(null);
  const pendingMessageIdRef = useRef(0);

  const openChatbot = useCallback((arg?: OpenChatbotOptions | SyntheticEvent) => {
    const mode =
      arg && 'initialMode' in arg && arg.initialMode === 'assessment-intake'
        ? arg.initialMode
        : undefined;
    const message =
      arg && 'initialUserMessage' in arg && typeof arg.initialUserMessage === 'string'
        ? arg.initialUserMessage.trim()
        : undefined;
    if (message || mode) {
      pendingMessageIdRef.current += 1;
      setPendingUserMessage({ id: pendingMessageIdRef.current, text: message, initialMode: mode });
    }
    setIsOpen(true);
  }, []);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearPendingUserMessage = useCallback(() => {
    setPendingUserMessage(null);
  }, []);

  return (
    <ChatbotContext.Provider
      value={{ isOpen, pendingUserMessage, openChatbot, closeChatbot, clearPendingUserMessage }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
