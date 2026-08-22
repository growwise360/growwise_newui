'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

export function HomeCampsStrip() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();

  return (
    <section className="home-camps-strip home-camps-strip-top" aria-label="Back to school assessment offer">
      <div className="home-camps-strip-left">
        <span className="home-camps-badge">Back to School</span>
        <span>Free Assessments Available Until July 31 · Grades 3–12</span>
      </div>
      <div className="home-camps-strip-right">
        <Link
          href={publicPath('/book-assessment', locale)}
          className="home-camp-btn"
          onClick={() => trackCTAClick('back_to_school_assessment_click', 'homepage_top_strip')}
        >
          <span className="home-camp-btn-label home-camp-btn-label--desktop">Book Assessment →</span>
          <span className="home-camp-btn-label home-camp-btn-label--mobile">Book →</span>
        </Link>
        <Link
          href={publicPath('/readinesschecklist', locale)}
          className="home-camp-btn-out"
          onClick={() => trackCTAClick('back_to_school_self_check_click', 'homepage_top_strip')}
        >
          <span className="home-camp-btn-label home-camp-btn-label--desktop">5-Minute Self-Check →</span>
          <span className="home-camp-btn-label home-camp-btn-label--mobile">Self-Check →</span>
        </Link>
      </div>
    </section>
  );
}
