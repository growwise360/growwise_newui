'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

export function HomeCampsStrip() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();

  return (
    <section className="home-camps-strip home-camps-strip-top" aria-label="Summer camps">
      <div className="home-camps-strip-left">
        <span className="home-camps-badge">Now Open</span>
        <span>Summer Camps · Starting June 8 · Grades 1–12</span>
      </div>
      <div className="home-camps-strip-right">
        <Link
          href={publicPath('/camps/academic-summer-programs-dublin-ca', locale)}
          className="home-camp-btn"
          onClick={() => trackCTAClick('camps_academic_sprint_click', 'homepage_camps_strip')}
        >
          <span className="home-camp-btn-label home-camp-btn-label--desktop">Academic Sprint →</span>
          <span className="home-camp-btn-label home-camp-btn-label--mobile">Academic →</span>
        </Link>
        <Link
          href={publicPath('/camps/summer', locale)}
          className="home-camp-btn-out"
          onClick={() => trackCTAClick('camps_steam_coding_click', 'homepage_camps_strip')}
        >
          <span className="home-camp-btn-label home-camp-btn-label--desktop">STEAM Coding →</span>
          <span className="home-camp-btn-label home-camp-btn-label--mobile">STEAM →</span>
        </Link>
      </div>
    </section>
  );
}
