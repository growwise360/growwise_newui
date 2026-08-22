'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const OUTCOMES = [
  'Skill gaps in Math or English — by grade and subject unit',
  'The exact mistake pattern behind dropped test scores',
  'A named 4–8 week plan — before you commit to anything',
] as const;

export function HomeAssessmentOfferSection() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const assessmentHref = publicPath('/book-assessment', locale);

  return (
    <section className="home-section-offer" aria-labelledby="home-offer-heading">
      <div className="home-section-inner home-offer-inner">
        <p className="home-section-pre home-pre-offer">Academic Assessment Options · Grades 3–12</p>
        <h2 id="home-offer-heading" className="home-offer-h2">
          Stop guessing what&apos;s holding your child back
        </h2>
        <p className="home-offer-sub">
          Start with a readiness check. Get a clear next step, not a sales pitch.
        </p>
        <ul className="home-offer-list">
          {OUTCOMES.map((item) => (
            <li key={item} className="home-offer-item">
              <Check className="home-offer-check" aria-hidden strokeWidth={2.5} />
              <span>{item}</span>
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
            Book a Free Assessment →
          </Link>
          <p className="home-section-cta-note home-offer-cta-note">
            No commitment · In-person in Dublin or online
          </p>
        </div>
      </div>
    </section>
  );
}
