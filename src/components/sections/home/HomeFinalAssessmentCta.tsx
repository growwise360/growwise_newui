'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

export function HomeFinalAssessmentCta() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const assessmentHref = publicPath('/book-assessment', locale);

  return (
    <section className="home-section-final-cta">
      <div className="home-section-inner home-final-inner">
        <h2 className="home-final-h2">Ready to know exactly what to do next?</h2>
        <p className="home-final-sub">
          Book an assessment request — clear next step, personalized plan, no commitment.
        </p>
        <Link
          href={assessmentHref}
          className="home-btn-final"
          onClick={() => trackCTAClick('final_assessment_cta_click', 'homepage_final_cta')}
        >
          Book a Free Assessment
        </Link>
      </div>
    </section>
  );
}
