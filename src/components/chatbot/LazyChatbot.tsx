'use client';

import dynamic from 'next/dynamic';
import { ChatbotErrorBoundary } from './ChatbotErrorBoundary';

const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false,
});

export default function LazyChatbot() {
  return (
    <ChatbotErrorBoundary>
      <Chatbot />
    </ChatbotErrorBoundary>
  );
}
