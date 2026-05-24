'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const ACADEMIC_TRACKS = [
  {
    title: 'Careless Mistakes',
    description:
      'Capable but inconsistent. Test scores don\u2019t match what they actually know. We find the exact mistake pattern and fix it \u2014 not with more worksheets, but with targeted practice.',
    tag: 'Accuracy track \u2192',
    href: '/self-check',
    analyticsEvent: 'pillar_accuracy_track_click',
  },
  {
    title: 'Homework Battles',
    description:
      'Parent sits every night. Procrastination, missing work, no routine. We build the study system that makes them independent \u2014 in 6\u20138 weeks, not semesters.',
    tag: 'Independence track \u2192',
    href: '/academic',
    analyticsEvent: 'pillar_independence_track_click',
  },
  {
    title: 'Foundation Gaps',
    description:
      'High school math is around the corner. SAT prep is real. We map the exact gaps, close them with a structured plan, and track every milestone.',
    tag: 'Mastery track \u2192',
    href: '/courses/sat-prep',
    analyticsEvent: 'pillar_mastery_track_click',
  },
  {
    title: 'School Aligned',
    description:
      'Students share what they\u2019re learning in school \u2014 we personalize the plan to their exact curriculum, unit pace, and upcoming assessments.',
    tag: 'School aligned track \u2192',
    href: '/courses/math',
    analyticsEvent: 'pillar_school_aligned_track_click',
  },
] as const;

export function HomeAcademicSection() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const assessmentHref = publicPath('/book-assessment', locale);

  return (
    <section className="home-section-academic">
      <div className="home-section-inner">
        <p className="home-section-pre home-pre-blue">Which sounds familiar?</p>
        <h2 className="home-section-h2">Built around how students actually learn</h2>
        <p className="home-section-sub">
          Four patterns we see every week — and close with a clear plan.
        </p>

        <div className="home-cards-grid">
          {ACADEMIC_TRACKS.map((track) => (
            <Link
              key={track.title}
              href={publicPath(track.href, locale)}
              className="home-pillar-card home-pillar-card-link"
              onClick={() => trackCTAClick(track.analyticsEvent, 'homepage_pillars')}
            >
              <div className="home-card-icon home-icon-academic" aria-hidden>
                ✦
              </div>
              <h3 className="home-card-title">{track.title}</h3>
              <p className="home-card-desc">{track.description}</p>
              <span className="home-card-tag home-card-tag-academic">{track.tag}</span>
            </Link>
          ))}
        </div>

        <div className="home-section-cta">
          <Link
            href={assessmentHref}
            className="home-btn-section-academic"
            onClick={() => trackCTAClick('pillar_assessment_cta_click', 'homepage_pillars')}
          >
            Book a Free Assessment →
          </Link>
          <p className="home-section-cta-note home-section-cta-note-academic">
            30 minutes · Personalized plan included · No commitment
          </p>
        </div>
      </div>
    </section>
  );
}
