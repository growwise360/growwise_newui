import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { publicPath } from '@/lib/publicPath';

type BlogPostConversionSectionProps = {
  locale: string;
  programHref: string;
  programLabel: string;
  headline?: string;
  subtext?: string;
};

export function BlogPostConversionSection({
  locale,
  programHref,
  programLabel,
  headline = 'Find the right program for your child',
  subtext = 'Explore our programs, then book a free assessment — we will recommend the best fit.',
}: BlogPostConversionSectionProps) {
  const programUrl = publicPath(programHref, locale);
  const assessmentUrl = publicPath('/book-assessment', locale);
  const enrollUrl = publicPath('/enroll', locale);

  return (
    <section className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{subtext}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <Link
            href={programUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1F396D] rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {programLabel}
            <ArrowLeft className="w-5 h-5 rotate-180" aria-hidden />
          </Link>
          <Link
            href={assessmentUrl}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
          >
            Book Free Assessment
          </Link>
          <Link
            href={enrollUrl}
            className="text-sm font-semibold text-white/90 underline underline-offset-2 hover:text-white"
          >
            Or enroll now
          </Link>
        </div>
      </div>
    </section>
  );
}
