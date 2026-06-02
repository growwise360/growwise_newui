'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  triggered: boolean;
}

function AnimatedCounter({ target, duration = 1400, triggered }: CounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    let rafId: number;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, target, duration]);

  return <>{value}</>;
}

interface LiveCounterStripProps {
  c1?: number;
  c2?: number;
  c3?: number;
}

export default function LiveCounterStrip({ c1 = 47, c2 = 312, c3 = 28 }: LiveCounterStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-[#1F396D] py-7 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">

        {/* Live badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.12em]">
            Live This Week
          </span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-white/15" />

        {/* Counter 1 */}
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white leading-none tabular-nums">
            <AnimatedCounter target={c1} triggered={triggered} />
          </p>
          <p className="text-[11px] text-white/55 mt-1 font-medium">Tri-Valley families checked</p>
        </div>

        <div className="hidden sm:block w-px h-8 bg-white/15" />

        {/* Counter 2 */}
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white leading-none tabular-nums">
            <AnimatedCounter target={c2} triggered={triggered} duration={1700} />
          </p>
          <p className="text-[11px] text-white/55 mt-1 font-medium">Patterns identified</p>
        </div>

        <div className="hidden sm:block w-px h-8 bg-white/15" />

        {/* Counter 3 */}
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white leading-none tabular-nums">
            <AnimatedCounter target={c3} triggered={triggered} duration={1100} />
          </p>
          <p className="text-[11px] text-white/55 mt-1 font-medium">Sessions booked</p>
        </div>

      </div>
    </div>
  );
}
