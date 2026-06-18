'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ChatbotErrorBoundary } from './ChatbotErrorBoundary';

const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false,
});

export default function LazyChatbot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ChatbotErrorBoundary>
      <Chatbot />
    </ChatbotErrorBoundary>
  );
}
