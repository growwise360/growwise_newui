import Link from 'next/link';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import { publicPath } from '@/lib/publicPath';
import ProgramRecommendationButton from '@/components/ProgramRecommendationButton';

type MathHubCtaBlockProps = {
  locale: string;
};

export function MathHubCtaBlock({ locale }: MathHubCtaBlockProps) {
  const { cta } = MATH_HUB_COPY;
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;

  return (
    <section
      className="bg-[#1F396D] py-16 md:py-20"
      aria-labelledby="math-hub-cta-heading"
    >
      <div className="mx-auto max-w-[800px] px-5 text-center md:px-12">
        <h2
          id="math-hub-cta-heading"
          className="font-heading text-2xl font-bold text-white md:text-3xl"
        >
          {cta.heading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-200 sm:text-base">{cta.body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ProgramRecommendationButton sourcePage="academic-math" defaultSubject="Math" label="Get My Program Recommendation" className="min-w-[200px] text-sm" />
          <Link
            href={publicPath(cta.secondary.href, locale)}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            {cta.secondary.label}
          </Link>
          <a
            href={phoneHref}
            className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {cta.phoneLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
