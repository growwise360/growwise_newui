'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useButtonTracking } from '@/lib/analytics/hooks';

const STEPS = [
  {
    num: '1',
    title: 'Answer 5 quick questions',
    body: ' about your child\u2019s current mistakes and patterns. Takes under 5 minutes.',
  },
  {
    num: '2',
    title: 'We identify the root cause',
    body: ' — content gap, process issue, attention pattern, or pacing problem.',
  },
  {
    num: '3',
    title: 'Personalized report emailed',
    body: ' with the exact blocker and what to do next. No guessing.',
  },
] as const;

export function HomeDiagnosticSection() {
  const locale = useLocale();
  const { trackCTAClick } = useButtonTracking();
  const selfCheckHref = publicPath('/self-check', locale);
  const assessmentHref = publicPath('/book-assessment', locale);

  return (
    <section className="home-section-diagnostic home-section-diagnostic-micro">
      <div className="home-diag-inner">
        <div className="home-diag-left">
          <h2 className="home-diag-h2">Not ready to book yet?</h2>
          <p className="home-diag-sub">
            Start with a 5-minute diagnostic check. You&apos;ll receive a personalized report
            showing your child&apos;s likely mistake patterns, skill gaps, and recommended next
            step.
          </p>
          <p className="home-diag-bridge">
            If the results match what you&apos;re seeing at home, book a free assessment to get
            the full learning plan.
          </p>
          <Link
            href={selfCheckHref}
            className="home-btn-diag home-btn-diag-secondary"
            onClick={() => trackCTAClick('diagnostic_report_start_click', 'homepage_diagnostic')}
          >
            Get My Child&apos;s Free Diagnostic Report
          </Link>
          <p className="home-diag-meta">
            <Link
              href={assessmentHref}
              className="home-diag-assessment-link"
              onClick={() => trackCTAClick('diagnostic_assessment_link_click', 'homepage_diagnostic')}
            >
              Book a Free Assessment instead
            </Link>
          </p>
        </div>

        <div className="home-diag-right">
          <span className="home-diag-grade-tag">Grades 3–8</span>
          <div className="home-diag-steps">
            {STEPS.map((step) => (
              <div key={step.num} className="home-diag-step">
                <span className="home-step-num">{step.num}</span>
                <p className="home-step-text">
                  <strong>{step.title}</strong>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
