import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import { publicPath } from '@/lib/publicPath';

type GeoCalloutProps = {
  locale: string;
};

export function GeoCallout({ locale }: GeoCalloutProps) {
  const { geo } = MATH_HUB_COPY;

  return (
    <section className="border-b border-slate-200 bg-blue-50/60 py-10 md:py-12" aria-labelledby="geo-callout-heading">
      <div className="mx-auto max-w-[1100px] px-5 md:px-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-blue-200/80 bg-white/80 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex gap-4">
            <MapPin className="h-6 w-6 shrink-0 text-[#1F396D]" aria-hidden />
            <div>
              <h2 id="geo-callout-heading" className="font-heading text-lg font-bold text-slate-900 md:text-xl">
                {geo.heading}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{geo.body}</p>
            </div>
          </div>
          <Link
            href={publicPath(geo.href, locale)}
            className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
          >
            {geo.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
