'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, Play } from 'lucide-react';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const VIDEO_ID = 'LN3xuCyf-Oc';

const APPROACH_STEPS = [
  'Find the gap',
  'Explain the concept',
  'Build the foundation',
] as const;

export function HomeDeeperLearningSection() {
  const locale = useLocale();
  const { trackButtonClick, trackCTAClick } = useButtonTracking();
  const [isPlaying, setIsPlaying] = useState(false);
  const assessmentHref = publicPath('/book-assessment', locale);

  const playVideo = () => {
    trackButtonClick('deeper_learning_video_play', 'homepage_deeper_learning');
    setIsPlaying(true);
  };

  return (
    <section
      className="home-section-deeper-learning"
      aria-labelledby="home-deeper-learning-heading"
    >
      <div className="home-deeper-learning-inner">
        <div className="home-deeper-learning-copy">
          <p className="home-section-pre home-deeper-learning-eyebrow">
            Why the approach works
          </p>
          <h2 id="home-deeper-learning-heading" className="home-deeper-learning-h2">
            Build understanding that lasts
          </h2>
          <p className="home-deeper-learning-sub">
            GrowWise identifies the gap, connects the concept, and strengthens the foundation for
            what comes next.
          </p>

          <ul className="home-deeper-learning-steps" aria-label="The GrowWise deeper learning approach">
            {APPROACH_STEPS.map((step) => (
              <li key={step}>
                <CheckCircle2 aria-hidden />
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <Link
            href={assessmentHref}
            className="home-deeper-learning-cta"
            onClick={() =>
              trackCTAClick(
                'deeper_learning_assessment_click',
                'homepage_deeper_learning',
              )
            }
          >
            Find My Child&apos;s Learning Gap →
          </Link>
          <p className="home-deeper-learning-trust">
            Free assessment · Written next-step plan · No pressure
          </p>
        </div>

        <div className="home-deeper-learning-media">
          <p className="home-deeper-learning-video-label">Watch the 61-second approach</p>
          <div className="home-deeper-learning-player">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0`}
                title="GrowWise deeper learning approach"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="home-deeper-learning-play"
                onClick={playVideo}
                aria-label="Play the 61-second GrowWise deeper learning video"
              >
                <Image
                  src="/images/home/growwise-deeper-learning-poster.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 220px, 250px"
                />
                <span className="home-deeper-learning-play-icon">
                  <Play aria-hidden />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
