'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FutureSkillsStickyCtaProps {
  assessmentHref: string;
  /** When set, hide the sticky bar while this element is visible (avoids covering duplicate CTAs). */
  hideWhenVisibleId?: string;
}

export function FutureSkillsStickyCta({
  assessmentHref,
  hideWhenVisibleId = 'future-skills-closing-cta',
}: FutureSkillsStickyCtaProps) {
  const [hideSticky, setHideSticky] = useState(false);

  useEffect(() => {
    if (hideWhenVisibleId === undefined) {
      return undefined;
    }

    const target = document.getElementById(hideWhenVisibleId);
    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideSticky(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '0px 0px -72px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hideWhenVisibleId]);

  if (hideSticky) {
    return null;
  }

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] lg:hidden"
        role="region"
        aria-label="Start certification readiness"
      >
        <div className="pointer-events-auto mx-auto max-w-6xl px-4">
          <Link
            href={assessmentHref}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F16112] px-4 py-3 text-sm font-bold text-white hover:bg-[#d9550f]"
          >
            Start Certification Readiness
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="h-[calc(5rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden />
    </>
  );
}
