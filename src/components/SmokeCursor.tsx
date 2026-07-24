'use client';

import { useEffect, useRef } from 'react';
import {
  canRunSmokeyCursorEffect,
  getSmokeyVariantOptions,
  isSmokeyCursorQuietPoint,
  isSmokeyCursorQuietTarget,
  type SmokeyCursorVariant,
} from '@/lib/effects/smokey-cursor-safe';
import { cn } from '@/lib/utils';

interface SmokeyCursorEffectProps {
  variant?: SmokeyCursorVariant;
  className?: string;
  /** Pin the canvas to the viewport so the effect persists while scrolling. */
  viewportFixed?: boolean;
}

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function SmokeyCursorEffect({
  variant = 'dark',
  className,
  viewportFixed = false,
}: SmokeyCursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!canRunSmokeyCursorEffect()) {
      container?.classList.add('hidden');
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const idleWindow = window as IdleWindow;
    const variantOptions = getSmokeyVariantOptions(variant);
    let cancelled = false;
    let destroyFluid: (() => void) | undefined;
    let idleHandle: number | undefined;
    let timerHandle: ReturnType<typeof setTimeout> | undefined;
    let pointerOverQuietArea = false;
    let focusOnQuietArea = false;
    let pageLoaded = document.readyState === 'complete';
    let pointerSeen = false;
    let initializationScheduled = false;

    const updateQuietAreaVisibility = () => {
      container?.classList.toggle(
        'smokey-cursor-quiet-paused',
        pointerOverQuietArea || focusOnQuietArea,
      );
    };

    const initialize = async () => {
      try {
        const { createSmokeyCursorFluid } = await import(
          '@/lib/effects/smokey-cursor-fluid'
        );
        if (cancelled) return;
        destroyFluid = createSmokeyCursorFluid(canvas, variantOptions);
      } catch {
        container?.classList.add('hidden');
      }
    };

    const scheduleInitialization = () => {
      if (initializationScheduled || !pageLoaded || !pointerSeen) return;
      initializationScheduled = true;
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(() => void initialize(), {
          timeout: 1200,
        });
      } else {
        timerHandle = setTimeout(() => void initialize(), 0);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerSeen = true;
      pointerOverQuietArea = isSmokeyCursorQuietPoint(
        event.clientX,
        event.clientY,
        event.target,
      );
      updateQuietAreaVisibility();
      scheduleInitialization();
    };

    const onFocusIn = (event: FocusEvent) => {
      focusOnQuietArea = isSmokeyCursorQuietTarget(event.target);
      updateQuietAreaVisibility();
    };

    const onFocusOut = (event: FocusEvent) => {
      focusOnQuietArea = isSmokeyCursorQuietTarget(event.relatedTarget);
      updateQuietAreaVisibility();
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    const onLoad = () => {
      pageLoaded = true;
      scheduleInitialization();
    };

    if (!pageLoaded) window.addEventListener('load', onLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      if (idleHandle !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timerHandle !== undefined) clearTimeout(timerHandle);
      destroyFluid?.();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-smokey-variant={variant}
      className={cn(
        'pointer-events-none z-30 overflow-hidden',
        viewportFixed ? 'fixed inset-0 h-dvh w-full' : 'absolute inset-0',
        variant === 'light' && 'smokey-cursor-light-blend',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        className="block h-full w-full"
        data-smoke-mode="adaptive"
        data-testid="smoke-cursor-canvas"
      />
    </div>
  );
}

export default function SmokeCursor() {
  return <SmokeyCursorEffect variant="light" viewportFixed />;
}
