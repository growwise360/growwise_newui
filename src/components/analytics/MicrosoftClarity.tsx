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
    if (shouldSkip || initializedRef.current) return;

    Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' });
    Clarity.init(id);
    initializedRef.current = true;
  }, [id, shouldSkip]);

  return null;
}
