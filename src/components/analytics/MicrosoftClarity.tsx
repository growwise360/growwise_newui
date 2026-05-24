'use client';

import { useEffect, useRef } from 'react';
import Clarity from '@microsoft/clarity';
import { isAutomatedAuditEnvironment } from '@/lib/consent';
import { isClarityExcludedPath } from '@/lib/analytics/clarityPaths';

interface MicrosoftClarityProps {
  projectId: string;
  pathname: string;
}

const PROJECT_ID_PATTERN = /^[a-z0-9]+$/i;

function stopClarityRecording() {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('stop');
  }
}

/**
 * Microsoft Clarity — session replay / heatmaps.
 * Loads only on public pages after analytics cookie consent (parent gate).
 */
export function MicrosoftClarity({ projectId, pathname }: MicrosoftClarityProps) {
  const id = projectId.trim();
  const initializedRef = useRef(false);

  const shouldSkip =
    !id ||
    !PROJECT_ID_PATTERN.test(id) ||
    isAutomatedAuditEnvironment() ||
    isClarityExcludedPath(pathname);

  useEffect(() => {
    if (shouldSkip) {
      if (initializedRef.current) {
        stopClarityRecording();
        initializedRef.current = false;
      }
      return;
    }

    if (initializedRef.current) return;

    // init() creates the window.clarity queue stub; consentV2 requires it.
    Clarity.init(id);
    if (typeof window.clarity === 'function') {
      Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' });
    }
    initializedRef.current = true;
  }, [id, shouldSkip]);

  useEffect(() => {
    return () => {
      if (initializedRef.current) {
        stopClarityRecording();
        initializedRef.current = false;
      }
    };
  }, []);

  return null;
}
