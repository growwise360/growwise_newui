import React from 'react';

export function HeroWrapper({ children }: { children: React.ReactNode }) {
  return <section className="hero-carousel-wrap">{children}</section>;
}
