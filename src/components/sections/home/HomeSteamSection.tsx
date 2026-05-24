'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const STEAM_CARDS = [
  {
    title: 'Python & AI',
    description:
      'From first script to AI-ready developer. Variables, functions, APIs, ML basics — structured as a journey, not a course. Build real apps along the way.',
    tag: 'Start coding →',
    href: '/steam/ml-ai-coding',
    analyticsEvent: 'steam_card_python_click',
  },
  {
    title: 'Game Development',
    description:
      'Roblox, Scratch, Unity, Minecraft. Kids build the games they actually want to play — learning logic, design, and problem-solving without knowing it.',
    tag: 'Build a game →',
    href: '/steam/game-development',
    analyticsEvent: 'steam_card_gamedev_click',
  },
  {
    title: 'Robotics & Engineering',
    description:
      'Hands-on builds, code-driven machines. Students design, program, and test — developing the engineering mindset schools don\u2019t have time to teach.',
    tag: 'Explore robotics →',
    href: '/steam',
    analyticsEvent: 'steam_card_robotics_click',
  },
] as const;

export function HomeSteamSection() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const trialHref = publicPath('/workshop-calendar', locale);

  return (
    <section className="home-section-steam">
      <div className="home-section-inner">
        <p className="home-section-pre home-pre-orange">STEAM &amp; Coding</p>
        <h2 className="home-section-h2">
          Vibe it. Build it.
          <br />
          Own your future.
        </h2>
        <p className="home-section-sub">
          Real projects, real skills. Ages 10–18. The way the next generation builds — starting now.
        </p>

        <div className="home-cards-grid">
          {STEAM_CARDS.map((card) => (
            <Link
              key={card.title}
              href={publicPath(card.href, locale)}
              className="home-card"
              onClick={() => trackCTAClick(card.analyticsEvent, 'homepage_steam')}
            >
              <div className="home-card-icon home-icon-steam" aria-hidden>
                ✦
              </div>
              <h3 className="home-card-title">{card.title}</h3>
              <p className="home-card-desc">{card.description}</p>
              <span className="home-card-tag home-card-tag-steam">{card.tag}</span>
            </Link>
          ))}
        </div>

        <div className="home-section-cta">
          <Link
            href={trialHref}
            className="home-btn-section-steam"
            onClick={() => trackCTAClick('steam_trial_click', 'homepage_steam')}
          >
            Book a Free Trial Class →
          </Link>
          <p className="home-section-cta-note">
            Ages 10–18 · Live online + In-person Dublin, CA · No commitment
          </p>
        </div>
      </div>
    </section>
  );
}
