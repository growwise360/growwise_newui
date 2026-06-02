import Link from 'next/link';
import { getAllCampPages } from '@/lib/camps/get-camp-page';
import { publicPath } from '@/lib/publicPath';

type FeaturedCampGuidesSectionProps = {
  locale: string;
};

export function FeaturedCampGuidesSection({ locale }: FeaturedCampGuidesSectionProps) {
  const camps = getAllCampPages();

  return (
    <section
      className="py-14 px-4 bg-white border-t border-slate-200"
      aria-labelledby="featured-camp-guides-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="featured-camp-guides-heading"
          className="text-2xl sm:text-3xl font-bold text-[#1F396D] mb-2 text-center"
        >
          Featured camp guides
        </h2>
        <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
          Deep dives on each summer track — schedules, FAQs, and how to request a seat at our Dublin campus.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <li key={camp.slug}>
              <Link
                href={publicPath(`/camps/${camp.slug}`, locale)}
                className="block h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm transition hover:border-[#1F396D]/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
              >
                <span className="font-semibold text-slate-900 line-clamp-2">{camp.h1}</span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {camp.metaDescription}
                </span>
                <span className="mt-3 inline-block text-sm font-semibold text-[#F16112]">
                  Read camp guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
