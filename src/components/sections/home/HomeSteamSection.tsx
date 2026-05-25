'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const STEAM_CARDS = [
  {
    title: 'Python & AI',
    description:
      'Python is the #1 language for kids aged 10–18 and the foundation of every major AI system. Students progress from first script to building real apps, working with APIs, and training ML models. No ceiling. No switching languages.',
    tag: 'Start with Python →',
    href: '/steam/ml-ai-coding',
    analyticsEvent: 'steam_card_python_click',
  },
  {
    title: 'Game Development',
    description:
      'Roblox, Scratch, Unity — kids build games they actually play. Each project teaches real logic: conditionals, loops, functions, and design thinking. By the end, they\u2019ve shipped a game — not completed a tutorial.',
    tag: 'Build a game →',
    href: '/steam/game-development',
    analyticsEvent: 'steam_card_gamedev_click',
  },
  {
    title: 'Robotics & Engineering',
    description:
      'Students design, program, and test real robots — code-driven machines that do exactly what they tell them to. The engineering mindset built here (test, fail, iterate) is what colleges and tech careers reward. Skills most schools don\u2019t teach.',
    tag: 'Explore robotics →',
    href: '/steam/game-development?type=Robotics',
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
        <p className="home-section-pre home-pre-orange">Coding &amp; AI Programs · Ages 10–18</p>
        <h2 className="home-section-h2">
          Vibe it. Build it.
          <br />
          Own your future.
        </h2>
        <p className="home-section-sub">
          In 2026, coding is the new literacy. Students at GrowWise build real apps, games, and AI projects — not toy exercises.
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
            Ages 10–18 · Live online nationwide · In-person in Dublin, CA · No commitment
          </p>
        </div>
      </div>
    </section>
  );
}
