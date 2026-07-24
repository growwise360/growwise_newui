import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { MATH_HUB_COPY, MATH_HUB_PATH } from '@/lib/math-hub-copy';
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath';
import { GeoCallout } from './math-hub/GeoCallout';
import { GradeBandCards } from './math-hub/GradeBandCards';
import { HowItWorksSteps } from './math-hub/HowItWorksSteps';
import { MathHubCtaBlock } from './math-hub/MathHubCtaBlock';
import { MathHubFaq } from './math-hub/MathHubFaq';
import { MathHubHero } from './math-hub/MathHubHero';
import { MathHubJtbdSelector } from './math-hub/MathHubJtbdSelector';
import { ProgramOptionCards } from './math-hub/ProgramOptionCards';
import { TrustMetrics } from './math-hub/TrustMetrics';
import { MathParentGuidesSection } from './MathParentGuidesSection';

type MathHubPageProps = {
  locale: string;
};

const augustMathSearchCards = [
  {
    title: 'Comparing math tutoring options?',
    body:
      'Parents searching Kumon, Mathnasium, Russian Math, Tutoring Club, or a private math tutor are usually deciding between repetition, acceleration, and diagnostic support. GrowWise starts with the gap first, then places students into the right grade band.',
    href: '/resources/math-tutoring-options-dublin-ca',
    cta: 'Compare tutoring options',
  },
  {
    title: 'Starting a harder math class in August?',
    body:
      'For IM1, Algebra 1, Algebra 2, Geometry, and middle school placement, the best August move is a readiness check before homework pressure starts.',
    href: '/resources/back-to-school-math-assessment-dublin-ca',
    cta: 'Read assessment guide',
  },
  {
    title: 'Seeing careless errors or weak homework habits?',
    body:
      'Back-to-school searches often start with “math tutor near me,” but the real issue may be fractions, ratios, word problems, or test-time mistake patterns.',
    href: '/resources/careless-math-mistakes',
    cta: 'Read the mistake guide',
  },
] as const;

export function MathHubPage({ locale }: MathHubPageProps) {
  const { breadcrumb } = MATH_HUB_COPY;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Breadcrumbs
        noSchema
        items={[
          { name: 'Academic', url: absoluteSiteUrl('/academic', locale) },
          { name: breadcrumb.mathPrograms, url: absoluteSiteUrl(MATH_HUB_PATH, locale) },
        ]}
      />
      <main>
        <MathHubHero />
        <GradeBandCards locale={locale} />
        <section className="bg-slate-50 px-5 py-14 md:px-12 md:py-20" aria-labelledby="august-math-search-heading">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F16112]">August back-to-school searches</p>
              <h2 id="august-math-search-heading" className="font-heading mt-3 text-3xl font-black text-[#1F396D] md:text-4xl">
                Before parents choose a math tutor, they compare the type of help.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Families in Dublin, Pleasanton, San Ramon, and the Tri-Valley start searching in August for
                math tutors, tutoring centers, Algebra support, and school-year readiness. These are the
                questions to answer before the first progress report arrives.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {augustMathSearchCards.map((card) => (
                <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-[#1F396D]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
                  <Link
                    href={publicPath(card.href, locale)}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-black text-[#F16112] hover:text-[#C45A1A]"
                  >
                    {card.cta}
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <MathHubJtbdSelector locale={locale} />
        <HowItWorksSteps />
        <ProgramOptionCards locale={locale} />
        <GeoCallout locale={locale} />
        <TrustMetrics />
        <MathParentGuidesSection locale={locale} pageId="hub" />
        <MathHubFaq />
        <MathHubCtaBlock locale={locale} />
      </main>
    </div>
  );
}
