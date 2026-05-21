'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from '@/components/camps/academic-enrollment-panel-scroll.module.css';
import { cn } from '@/lib/utils';

export function AcademicEnrollmentPanelScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  const [showHint, setShowHint] = useState(false);

  const updateHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const overflows = el.scrollHeight > el.clientHeight + 1;
    const atTop = el.scrollTop < 8;
    setShowHint(overflows && atTop && !hasScrolledRef.current);
  }, []);

  useEffect(() => {
    hasScrolledRef.current = false;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    updateHint();

    const el = scrollRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(updateHint);
    resizeObserver.observe(el);

    const onScroll = () => {
      if (el.scrollTop > 8) {
        hasScrolledRef.current = true;
      }
      updateHint();
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', onScroll);
    };
  }, [updateHint, children]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        data-academic-panel-scroll
        className={cn(styles.scrollRegion, 'p-6', className)}
      >
        {children}
      </div>
      {showHint ? (
        <p className={styles.scrollHint} aria-hidden="true">
          Scroll for more options ↓
        </p>
      ) : null}
    </div>
  );
}
