'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ChatbotErrorBoundary } from './ChatbotErrorBoundary';

const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false,
});

const IDLE_TIMEOUT_MS = 8000;

function scheduleIdleMount(onReady: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  let done = false;
  const mount = () => {
    if (done) return;
    done = true;
    onReady();
  };

  const onInteraction = () => mount();
  window.addEventListener('scroll', onInteraction, { once: true, passive: true });
  window.addEventListener('pointerdown', onInteraction, { once: true });
  window.addEventListener('keydown', onInteraction, { once: true });

  let idleId: ReturnType<typeof setTimeout> | number | undefined;
  if ('requestIdleCallback' in window) {
    idleId = window.requestIdleCallback(mount, { timeout: IDLE_TIMEOUT_MS });
  } else {
    idleId = window.setTimeout(mount, IDLE_TIMEOUT_MS);
  }

  return () => {
    window.removeEventListener('scroll', onInteraction);
    window.removeEventListener('pointerdown', onInteraction);
    window.removeEventListener('keydown', onInteraction);
    if ('requestIdleCallback' in window && idleId !== undefined) {
      window.cancelIdleCallback(idleId as number);
    } else if (idleId !== undefined) {
      window.clearTimeout(idleId as ReturnType<typeof setTimeout>);
    }
  };
}

/**
 * Defers mounting the chat bundle until the browser is idle (or user scrolls / taps).
 * Keeps homepage main-thread/network work lighter during LCP/TBT-heavy first seconds.
 */
export default function LazyChatbot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => scheduleIdleMount(() => setMounted(true)), []);

  if (!mounted) return null;

  return (
    <ChatbotErrorBoundary>
      <Chatbot />
    </ChatbotErrorBoundary>
  );
}
