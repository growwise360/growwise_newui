'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const DELIVERABLES = [
  "Your child's current skill level in Math/English",
  'The mistake patterns behind weak scores',
  'Why homework or tests feel harder than expected',
  'A recommended 4–8 week learning plan',
  'Best-fit program, schedule, and next step',
] as const;

export function HomeAssessmentOfferSection() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const assessmentHref = publicPath('/book-assessment', locale);

  return (
    <section className="home-section-offer">
      <div className="home-section-inner">
        <h2 className="home-offer-h2">What You&apos;ll Know After the Free Assessment</h2>
        <ul className="home-offer-list">
          {DELIVERABLES.map((item) => (
            <li key={item} className="home-offer-item">
              {item}
            </li>
          ))}
        </ul>
        <p className="home-offer-promise">Know exactly what to do next — without guessing.</p>
        <div className="home-section-cta">
          <Link
            href={assessmentHref}
            className="home-btn-section-academic home-btn-offer"
            onClick={() => trackCTAClick('assessment_offer_cta_click', 'homepage_assessment_offer')}
          >
            Book a Free Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
