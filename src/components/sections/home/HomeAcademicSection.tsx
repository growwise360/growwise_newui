'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const ACADEMIC_TRACKS = [
  {
    id: 'careless-mistakes',
    title: 'Careless Mistakes',
    mobileDescription:
      'Your child understands the work but still loses points. We find the exact mistake pattern — not guess at it.',
    description:
      'Your child understands the work but still loses points on tests. It\u2019s not a knowledge gap \u2014 it\u2019s a checking system and pacing pattern. We find the exact mistake pattern and close it with targeted practice, not more worksheets.',
    tag: 'See how we fix this \u2192',
    href: '/self-check',
    analyticsEvent: 'pillar_accuracy_track_click',
  },
  {
    id: 'homework-battles',
    title: 'Homework Won\u2019t Get Done',
    mobileTitle: 'Homework Battles',
    mobileDescription:
      'Sitting next to them every night signals a missing routine. We build the system that makes them independent in 6\u20138 weeks.',
    description:
      'Sitting next to them every night isn\u2019t a solution \u2014 it\u2019s a sign of a missing routine. Procrastination and missing work are system problems, not character problems. We build the study habits that make them independent in 6\u20138 weeks.',
    tag: 'See how we fix this \u2192',
    href: '/academic',
    analyticsEvent: 'pillar_independence_track_click',
  },
  {
    id: 'falling-behind-math',
    title: 'Falling Behind in Math',
    mobileDescription:
      'Middle school gaps become high school problems. We find the exact blocker and close it before it compounds.',
    description:
      'Middle school gaps compound into high school problems. Before SAT prep or Algebra 2, we run a skill diagnostic to find the exact blocker \u2014 then build a structured plan to close it before it gets worse.',
    tag: 'See how we fix this \u2192',
    href: '/courses/sat-prep',
    analyticsEvent: 'pillar_mastery_track_click',
  },
  {
    id: 'not-keeping-up',
    title: 'Not Keeping Up in Class',
    mobileDescription:
      'Generic tutoring teaches the wrong content. We align every session to their exact curriculum and upcoming assessments.',
    description:
      'Generic tutoring teaches content they\u2019re not being tested on. We align every session to their exact curriculum, unit pace, and upcoming assessments \u2014 so improvement shows up in actual class grades, not just practice.',
    tag: 'See how we do this \u2192',
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
        <h2 className="home-section-h2">
          <span className="home-academic-copy home-academic-copy--desktop">
            Which of these sounds like your child?
          </span>
          <span className="home-academic-copy home-academic-copy--mobile">
            Which sounds like your child?
          </span>
        </h2>
        <p className="home-section-sub">
          Four patterns we see every week — and close with a clear plan.
        </p>

        <div className="home-cards-grid">
          {ACADEMIC_TRACKS.map((track) => (
            <Link
              key={track.id}
              href={publicPath(track.href, locale)}
              className="home-pillar-card home-pillar-card-link"
              onClick={() => trackCTAClick(track.analyticsEvent, 'homepage_pillars')}
            >
              <div className="home-card-icon home-icon-academic" aria-hidden>
                ✦
              </div>
              <h3 className="home-card-title">
                <span className="home-academic-copy home-academic-copy--desktop">{track.title}</span>
                <span className="home-academic-copy home-academic-copy--mobile">
                  {'mobileTitle' in track ? track.mobileTitle : track.title}
                </span>
              </h3>
              <p className="home-card-desc">
                <span className="home-academic-copy home-academic-copy--desktop">{track.description}</span>
                <span className="home-academic-copy home-academic-copy--mobile">{track.mobileDescription}</span>
              </p>
              <span className="home-card-tag home-card-tag-academic">{track.tag}</span>
            </Link>
          ))}
        </div>

        <p className="home-standards-badge-row">
          <span className="home-standards-badge-row-label">Aligned with:</span>
          {' '}
          State Standards · Schools · Common Core · Integrated Math 1/2/3 · SAT/ACT · College Board AP · SBAC
        </p>

        <div className="home-section-cta">
          <Link
            href={assessmentHref}
            className="home-btn-section-academic"
            onClick={() => trackCTAClick('pillar_assessment_cta_click', 'homepage_pillars')}
          >
            Book a Free Assessment →
          </Link>
          <p className="home-section-cta-note home-section-cta-note-academic">
            45 minutes · Personalized plan included · No commitment
          </p>
        </div>
      </div>
    </section>
  );
}
