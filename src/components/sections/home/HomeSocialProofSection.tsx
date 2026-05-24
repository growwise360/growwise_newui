'use client';

import { useMemo } from 'react';
import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import type { TestimonialVM } from './TestimonialsSection';

const PROOF_STATS = [
  { value: '325+', label: 'Students' },
  { value: '4.9★', label: 'Google rating' },
  { value: '98%', label: 'Satisfaction' },
] as const;

export function HomeSocialProofSection({
  fallbackTestimonials,
}: {
  fallbackTestimonials?: TestimonialVM[] | null;
}) {
  const { testimonials: apiTestimonials } = useTestimonials({
    limit: 2,
    autoRefresh: false,
    minRating: 4,
  });

  const featured = useMemo(() => {
    const source =
      apiTestimonials && apiTestimonials.length > 0
        ? apiTestimonials
        : (fallbackTestimonials ?? []);
    return source.slice(0, 2);
  }, [apiTestimonials, fallbackTestimonials]);

  return (
    <section className="home-section-proof" aria-label="Social proof">
      <div className="home-section-inner">
        <div className="home-proof-stats">
          {PROOF_STATS.map((stat) => (
            <div key={stat.label} className="home-proof-stat">
              <span className="home-proof-stat-value">{stat.value}</span>
              <span className="home-proof-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {featured.length > 0 ? (
          <div className="home-proof-quotes">
            {featured.map((testimonial) => (
              <blockquote key={testimonial.name} className="home-proof-quote">
                <div className="home-proof-stars" aria-hidden>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="home-proof-star" fill="currentColor" />
                  ))}
                </div>
                <p className="home-proof-quote-text">&ldquo;{testimonial.content}&rdquo;</p>
                <footer className="home-proof-quote-author">
                  — {testimonial.name}
                  {testimonial.role ? `, ${testimonial.role}` : ''}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
