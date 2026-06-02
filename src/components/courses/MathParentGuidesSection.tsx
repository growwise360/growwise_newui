import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  getMathParentGuidesForBand,
  MATH_PARENT_GUIDES_BY_PAGE,
  type MathParentGuideLink,
  type MathParentGuidesPageId,
} from '@/lib/math-parent-guides';
import type { MathGradeBandId } from '@/lib/math-hub-copy';
import { publicPath } from '@/lib/publicPath';

type MathParentGuidesSectionProps = {
  locale: string;
  pageId: MathParentGuidesPageId;
};

type MathParentGuidesBandProps = {
  locale: string;
  bandId: MathGradeBandId;
};

function GuideCard({ guide, locale }: { guide: MathParentGuideLink; locale: string }) {
  return (
    <Link
      href={publicPath(guide.href, locale)}
      className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md hover:border-[#F16112]/30"
    >
      <div className="flex items-start gap-3">
        <BookOpen className="h-5 w-5 shrink-0 text-[#1F396D]" aria-hidden />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-[#F16112] transition-colors">
            {guide.title}
          </h3>
          {guide.readTime ? (
            <p className="mt-0.5 text-xs text-gray-500">{guide.readTime}</p>
          ) : null}
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm text-gray-600 leading-relaxed">{guide.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1F396D] group-hover:text-[#F16112]">
        Read guide
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}

function GuidesGrid({
  guides,
  locale,
}: {
  guides: readonly MathParentGuideLink[];
  locale: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {guides.map((guide) => (
        <GuideCard key={guide.key} guide={guide} locale={locale} />
      ))}
    </div>
  );
}

export function MathParentGuidesSection({ locale, pageId }: MathParentGuidesSectionProps) {
  const guides = MATH_PARENT_GUIDES_BY_PAGE[pageId];
  if (guides.length === 0) return null;

  return (
    <section className="bg-[#ebebeb] py-12 lg:py-16" aria-labelledby={`${pageId}-parent-guides`}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
          Free parent guides
        </p>
        <h2
          id={`${pageId}-parent-guides`}
          className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3"
        >
          Understand the gap before you choose a program
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl leading-relaxed">
          These guides explain mistake patterns, learning gaps, and what to do at home — the same
          concepts we use in our free assessment and placement process.
        </p>
        <GuidesGrid guides={guides} locale={locale} />
      </div>
    </section>
  );
}

export function MathParentGuidesBandSection({ locale, bandId }: MathParentGuidesBandProps) {
  const guides = getMathParentGuidesForBand(bandId);
  if (guides.length === 0) return null;

  return (
    <section className="border-t border-gray-100 py-10" aria-labelledby={`${bandId}-parent-guides`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#1F396D] mb-2">
        Parent guides
      </p>
      <h2 id={`${bandId}-parent-guides`} className="text-xl font-bold text-slate-900 mb-4">
        Related reading
      </h2>
      <GuidesGrid guides={guides} locale={locale} />
    </section>
  );
}
