'use client';

import Link from 'next/link';
import { createLocaleUrl } from '@/components/layout/Header/utils';
import type { ParentGuideLink } from '@/lib/academic-seo-parent-guides';

type AcademicSeoParentGuidesBlockProps = {
  locale: string;
  guides: readonly ParentGuideLink[];
  className?: string;
};

export function AcademicSeoParentGuidesBlock({
  locale,
  guides,
  className,
}: AcademicSeoParentGuidesBlockProps) {
  if (guides.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="font-heading text-xl font-bold text-[#1F396D] sm:text-2xl">Parent guides</h2>
      <ul className="mt-4 space-y-3">
        {guides.map((guide) => (
          <li key={guide.href} className="text-sm text-slate-700 sm:text-base">
            <Link
              href={createLocaleUrl(guide.href, locale)}
              className="font-semibold text-[#1F396D] underline hover:text-[#F16112]"
            >
              {guide.title}
            </Link>
            {' — '}
            {guide.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
