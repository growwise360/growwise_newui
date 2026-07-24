'use client';

import { useChatbot } from '@/contexts/ChatbotContext';
import { ChatbotTrigger } from './ChatbotTrigger';

type HeaderChatbotTriggerProps = {
  variant?: 'header' | 'compact';
};

export function HeaderChatbotTrigger({ variant = 'header' }: HeaderChatbotTriggerProps) {
  const { openChatbot, isOpen } = useChatbot();

  if (isOpen) return null;

  return <ChatbotTrigger onClick={() => openChatbot()} variant={variant} />;
}
