import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { publicPath } from '@/lib/publicPath';

const RELATED_POSTS = [
  {
    title: 'Why Grades Hide Learning Gaps',
    href: '/resources/why-grades-hide-learning-gaps',
    description: 'A parent guide for spotting hidden math and reading gaps before they compound.',
  },
  {
    title: 'How to Build Homework Independence',
    href: '/resources/homework-independence',
    description: 'A practical system for reducing nightly homework dependence.',
  },
  {
    title: 'Python vs Scratch for Kids',
    href: '/resources/python-vs-scratch',
    description: 'An age-by-age guide for choosing the right coding path.',
  },
] as const;

type RelatedPost = {
  title: string;
  href: string;
  description: string;
};

type BlogPostConversionSectionProps = {
  locale: string;
  programHref: string;
  programLabel: string;
  headline?: string;
  subtext?: string;
  relatedPosts?: readonly RelatedPost[];
};

export function BlogPostConversionSection({
  locale,
  programHref,
  programLabel,
  headline = 'Find the right program for your child',
  subtext = 'Explore our programs, then book a free assessment — we will recommend the best fit.',
  relatedPosts = RELATED_POSTS,
}: BlogPostConversionSectionProps) {
  const programUrl = publicPath(programHref, locale);
  const assessmentUrl = publicPath('/book-assessment', locale);
  const enrollUrl = publicPath('/enroll', locale);

  return (
    <>
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="related-guides-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="related-guides-heading" className="text-2xl font-bold text-[#1F396D]">
            Related parent guides
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.href}
                href={publicPath(post.href, locale)}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#F16112] hover:bg-white hover:shadow-md"
              >
                <span className="flex items-start justify-between gap-3 text-base font-bold text-[#1F396D]">
                  {post.title}
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{post.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}
