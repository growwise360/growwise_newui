import { CheckCircle2 } from 'lucide-react';
import {
  MATH_HUB_BANNER_SM_SRC,
  MATH_HUB_BANNER_SRC,
  MATH_HUB_COPY,
} from '@/lib/math-hub-copy';
import { cn } from '@/lib/utils';

export function MathHubHero() {
  const { hero } = MATH_HUB_COPY;

  return (
    <section
      className={cn(
        'relative isolate w-full min-h-[min(48svh,17rem)] max-h-[600px] overflow-hidden',
        'md:min-h-[min(40vh,22rem)]',
      )}
      aria-label="Math programs hero"
    >
      <div className="absolute inset-0 z-0">
        <picture className="absolute inset-0 block h-full w-full">
          <source
            media="(max-width: 768px)"
            srcSet={MATH_HUB_BANNER_SM_SRC}
            type="image/webp"
          />
          <img
            src={MATH_HUB_BANNER_SRC}
            alt={hero.bannerAlt}
            width={1024}
            height={579}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center select-none"
            draggable={false}
          />
        </picture>
        {/* Base scrim — keeps photo visible on the right, readable text on the left */}
        <div className="absolute inset-0 z-[1] bg-black/45" aria-hidden />
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0f2347]/97 via-[#1F396D]/88 to-[#1F396D]/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-10 md:px-12 md:py-16 lg:py-20">
        <h1
          className={cn(
            'font-heading max-w-[800px] text-[1.5rem] font-bold leading-[1.15] text-white',
            'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]',
            'sm:text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem]',
          )}
        >
          {hero.h1}
        </h1>
        <p
          className={cn(
            'mt-4 max-w-[720px] text-sm leading-relaxed text-white/95',
            'drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]',
            'sm:text-base md:text-lg',
          )}
        >
          {hero.subheading}
        </p>
        <ul
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Program highlights"
        >
          {hero.trustBar.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 rounded-lg bg-[#0f2347]/75 px-3 py-2.5 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur-sm sm:text-sm"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F1894F]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
