'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const NEXTDOOR_PIXEL_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type NextdoorWindow = Window & {
  ndp?: {
    (...args: unknown[]): void;
    queue?: unknown[][];
    v?: number;
    handleRequest?: (...args: unknown[]) => void;
  };
};

function NextdoorRouteSync() {
  const pathname = usePathname();
  const skipFirstManualPageView = useRef(true);

  useEffect(() => {
    if (skipFirstManualPageView.current) {
      skipFirstManualPageView.current = false;
      return;
    }

    const w = window as NextdoorWindow;
    w.ndp?.('track', 'PAGE_VIEW');
  }, [pathname]);

  return null;
}

interface NextdoorPixelProps {
  pixelId?: string | null;
}

/** Nextdoor Ads Pixel — consent-gated PageView tracking with SPA route sync. */
export default function NextdoorPixel({ pixelId }: NextdoorPixelProps) {
  const id = pixelId?.trim();

  useEffect(() => {
    if (!id || !NEXTDOOR_PIXEL_ID_PATTERN.test(id)) return;

    const w = window as NextdoorWindow;
    if (!w.ndp) {
      const ndp = (...args: unknown[]) => {
        if (ndp.handleRequest) {
          ndp.handleRequest(...args);
        } else {
          ndp.queue?.push(args);
        }
      };
      ndp.queue = [] as unknown[][];
      ndp.v = 1;
      w.ndp = ndp;

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://ads.nextdoor.com/public/pixel/ndp.js?id=${encodeURIComponent(id)}`;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }

    w.ndp('init', id, {});
    w.ndp('track', 'PAGE_VIEW');
  }, [id]);

  if (!id || !NEXTDOOR_PIXEL_ID_PATTERN.test(id)) return null;

  return (
    <>
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: 'none' }}
          src={`https://flask.nextdoor.com/pixel?pid=${id}&ev=PAGE_VIEW&noscript=1`}
          alt=""
        />
      </noscript>
      <NextdoorRouteSync />
    </>
  );
}
