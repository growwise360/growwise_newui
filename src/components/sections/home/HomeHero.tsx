'use client';

import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';
import { RisingSymbols } from './RisingSymbols';

const PROGRAM_TICKER_ITEMS = [
  'Summer Camps · Online + In-Person',
  '1:1 & Small Groups',
  'Math Mastery · Grades 3–12',
  'English & Writing',
  'SAT / ACT Prep',
  'Python & Coding · Ages 10–18',
  'ML / AI Track',
  'Robotics & STEAM',
] as const;

const META_ITEMS = [
  '387+ Students',
  '4.9★ Google',
  '98% Satisfaction',
  'Live Online',
  'In-person · Dublin, CA',
] as const;

type SlideIndex = 0 | 1;

export function HomeHero() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const [activeSlide, setActiveSlide] = useState<SlideIndex>(0);
  const [animEpoch, setAnimEpoch] = useState(0);

  const bookAssessmentHref = publicPath('/book-assessment', locale);
  const selfCheckHref = publicPath('/self-check', locale);
  const workshopHref = publicPath('/workshop-calendar', locale);
  const steamHref = publicPath('/steam', locale);

  const goToSlide = useCallback((index: SlideIndex) => {
    setActiveSlide(index);
    setAnimEpoch((epoch) => epoch + 1);
  }, []);

  const handleIndicatorClick = (index: SlideIndex) => {
    goToSlide(index);
  };

  return (
    <div
      className="hero-carousel-inner"
    >
      <RisingSymbols activeSlide={activeSlide} />

      <div className="hero-carousel-content">
        <p className="pre-tag hero-trust-line hero-trust-line-top">
          &lt; Grades 3–12 · Live Online · Across the US &gt;
        </p>

        <div className="hero-slide-indicators" role="tablist" aria-label="Hero slides">
          {([0, 1] as const).map((index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={index === 0 ? 'Academic programs' : 'STEAM programs'}
              className={`hero-indicator${activeSlide === index ? ' hero-indicator-active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
            >
              <span
                key={activeSlide === index ? `fill-${animEpoch}` : 'fill-idle'}
                className="hero-indicator-fill"
              />
            </button>
          ))}
        </div>

        <div className="hero-headline-wrap" aria-live="polite">
          <div
            className={`hero-headline-slide ${activeSlide === 0 ? 'hero-slide-active' : ''}`}
            aria-hidden={activeSlide !== 0}
          >
            {activeSlide === 0 ? (
              <h1 className="hero-h1">
                Better grades.
                <br />
                <span className="hero-highlight-box hero-hl-orange">Fewer battles.</span>
                <br />
                More confidence.
              </h1>
            ) : (
              <p className="hero-h1 m-0" aria-hidden>
                Better grades. Fewer battles. More confidence.
              </p>
            )}
          </div>
          <div
            className={`hero-headline-slide ${activeSlide === 1 ? 'hero-slide-active' : ''}`}
            aria-hidden={activeSlide !== 1}
          >
            {activeSlide === 1 ? (
              <h1 className="hero-h1">
                Vibe it.
                <br />
                <span className="hero-highlight-box hero-hl-navy">Build it.</span>
                <br />
                Own your future.
              </h1>
            ) : (
              <p className="hero-h1 m-0" aria-hidden>
                Vibe it. Build it. Own your future.
              </p>
            )}
          </div>
        </div>

        <div className="hero-sub-wrap">
          <p className={`hero-sub hero-sub-slide ${activeSlide === 0 ? 'hero-slide-active' : ''}`}>
            GrowWise helps students become confident, independent learners through targeted Math,
            English, and problem-solving support.
          </p>
          <p
            className={`hero-sub hero-sub-slide ${activeSlide === 1 ? 'hero-slide-active' : ''}`}
            aria-hidden={activeSlide !== 1}
          >
            Learn to build real apps using Python and AI — the way the next generation codes.
          </p>
        </div>

        <div className="hero-ticker-wrap" aria-hidden>
          <div className="hero-ticker-track">
            {[...PROGRAM_TICKER_ITEMS, ...PROGRAM_TICKER_ITEMS].map((item, i) => (
              <span key={`${item}-${i}`} className="hero-ticker-item">
                <span className="hero-ticker-sep" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-cta-wrap">
          <div className={`hero-cta-slide hero-cta-academic ${activeSlide === 0 ? 'hero-slide-active' : ''}`}>
            <Link
              href={bookAssessmentHref}
              className="hero-btn-orange hero-btn-primary"
              onClick={() => trackCTAClick('hero_cta_assessment_click', 'homepage_hero')}
            >
              Book a Free Assessment
            </Link>
            <div className="hero-secondary-block">
              <Link
                href={selfCheckHref}
                className="hero-link-secondary"
                onClick={() => trackCTAClick('hero_diagnostic_report_click', 'homepage_hero')}
              >
                Get My Child&apos;s Free Diagnostic Report
              </Link>
              <p className="hero-secondary-helper">
                Takes 15 minutes. Personalized report generated automatically.
              </p>
            </div>
          </div>
          <div className={`hero-cta-slide hero-cta-steam ${activeSlide === 1 ? 'hero-slide-active' : ''}`}>
            <Link
              href={workshopHref}
              className="hero-btn-navy"
              onClick={() => trackCTAClick('steam_trial_click', 'homepage_hero_steam')}
            >
              Book a Free Trial Class →
            </Link>
            <Link href={steamHref} className="hero-btn-orange-out">
              View Coding Programs
            </Link>
          </div>
        </div>

        <div className="hero-proof-row">
          <div className="hero-meta-row">
            {META_ITEMS.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 ? <span className="hero-meta-sep" aria-hidden /> : null}
                <span className={`hero-meta-item${i < 3 ? ' hero-meta-stat' : ''}`}>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
