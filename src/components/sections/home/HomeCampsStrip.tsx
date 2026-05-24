'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';

export function HomeCampsStrip() {
  const locale = useLocale();

  return (
    <div className="home-camps-strip">
      <div className="home-camps-strip-left">
        <span className="home-camps-badge">Now Open</span>
        <span>Summer Camps · Starting June 15 · Grades 1–12</span>
      </div>
      <div className="home-camps-strip-right">
        <Link
          href={publicPath('/camps/academic-summer-programs-dublin-ca', locale)}
          className="home-camp-btn"
        >
          Academic Sprint →
        </Link>
        <Link href={publicPath('/camps/summer', locale)} className="home-camp-btn-out">
          STEAM Coding →
        </Link>
      </div>
    </div>
  );
}
