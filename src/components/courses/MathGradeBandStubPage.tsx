import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import {
  MATH_GRADE_BAND_STUBS,
  MATH_HUB_COPY,
  MATH_HUB_PATH,
  type MathGradeBandId,
} from '@/lib/math-hub-copy';
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath';
import { MathParentGuidesBandSection } from './MathParentGuidesSection';

type MathGradeBandStubPageProps = {
  locale: string;
  bandId: MathGradeBandId;
};

export function MathGradeBandStubPage({ locale, bandId }: MathGradeBandStubPageProps) {
  const stub = MATH_GRADE_BAND_STUBS[bandId];
  const { breadcrumb } = MATH_HUB_COPY;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Breadcrumbs
        noSchema
        items={[
          { name: 'Academic', url: absoluteSiteUrl('/academic', locale) },
          { name: breadcrumb.mathPrograms, url: absoluteSiteUrl(MATH_HUB_PATH, locale) },
          { name: stub.breadcrumbLabel, url: absoluteSiteUrl(stub.path, locale) },
        ]}
      />
      <main className="mx-auto max-w-[800px] px-5 py-12 md:px-12 md:py-16">
        <Link
          href={publicPath(MATH_HUB_PATH, locale)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1F396D] hover:text-[#F16112]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All math programs
        </Link>
        <h1 className="font-heading mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {stub.h1}
        </h1>
        <p className="mt-3 text-lg font-medium text-slate-700">{stub.intro}</p>
        <p className="mt-4 leading-relaxed text-slate-600">{stub.body}</p>
        <p className="mt-6 text-sm font-medium text-slate-500">Courses included</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {stub.coursesIncluded.map((topic) => (
            <li
              key={topic}
              className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-700"
            >
              {topic}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm font-semibold text-[#1F396D]">{stub.packageLine}</p>
        <MathParentGuidesBandSection locale={locale} bandId={bandId} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={publicPath('/book-assessment', locale)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F16112] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d54f0a]"
          >
            Book free assessment
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={publicPath(MATH_HUB_PATH, locale)}
            className="inline-flex items-center justify-center rounded-full border-2 border-[#1F396D] px-6 py-3 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
          >
            Compare all grade bands
          </Link>
        </div>
      </main>
    </div>
  );
}
