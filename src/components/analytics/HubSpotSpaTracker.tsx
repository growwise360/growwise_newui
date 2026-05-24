'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';

const HUB_ID_PATTERN = /^\d{5,12}$/;

/** HubSpot command queue — commands are string tuples consumed by the tracking script. */
type HubSpotWindow = Window & {
  _hsq?: unknown[][];
  hsConversationsSettings?: { loadImmediately?: boolean };
  hsConversationsOnReady?: Array<() => void>;
  HubSpotConversations?: {
    widget?: { remove: () => void };
  };
};

/** Ask Growy is the site chatbot — block HubSpot's duplicate launcher if the portal has chat enabled. */
const HUBSPOT_CHAT_SUPPRESS_INLINE = `
window.hsConversationsSettings = Object.assign({}, window.hsConversationsSettings, { loadImmediately: false });
window.hsConversationsOnReady = window.hsConversationsOnReady || [];
window.hsConversationsOnReady.push(function () {
  try {
    window.HubSpotConversations && window.HubSpotConversations.widget && window.HubSpotConversations.widget.remove();
  } catch (e) {}
});
`.trim();

function HubSpotSpaRouteSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const skipFirstManualPageView = useRef(true);

  useEffect(() => {
    const fullPath = search ? `${pathname}?${search}` : pathname;

    if (skipFirstManualPageView.current) {
      skipFirstManualPageView.current = false;
      return;
    }

    const w = window as HubSpotWindow;
    w._hsq = w._hsq || [];
    w._hsq.push(['setPath', fullPath]);
    w._hsq.push(['trackPageView']);
  }, [pathname, search]);

  return null;
}

interface HubSpotSpaTrackerProps {
  hubId: string;
}

/** HubSpot page views + SPA navigation only — no chat widget (Ask Growy handles chat). */
export default function HubSpotSpaTracker({ hubId }: HubSpotSpaTrackerProps) {
  const id = hubId.trim();
  if (!id || !HUB_ID_PATTERN.test(id)) return null;

  useEffect(() => {
    const w = window as HubSpotWindow;
    w.hsConversationsSettings = { ...w.hsConversationsSettings, loadImmediately: false };
    const removeWidget = () => {
      try {
        w.HubSpotConversations?.widget?.remove();
      } catch {
        // ignore
      }
    };
    w.hsConversationsOnReady = w.hsConversationsOnReady || [];
    w.hsConversationsOnReady.push(removeWidget);
    removeWidget();
  }, []);

  return (
    <>
      <Script
        id="hs-chat-suppress"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: HUBSPOT_CHAT_SUPPRESS_INLINE }}
      />
      <Script
        id="hs-script-loader"
        strategy="afterInteractive"
        src={`https://js.hs-scripts.com/${id}.js`}
      />
      <Suspense fallback={null}>
        <HubSpotSpaRouteSync />
      </Suspense>
    </>
  );
}
