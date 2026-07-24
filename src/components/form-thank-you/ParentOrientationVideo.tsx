'use client';

import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const VIDEO_ID = 'XIFkRF0SYnw';

type ParentOrientationVideoProps = {
  context?: 'thank-you' | 'middle-school-math';
  onCtaClick?: () => void;
  placement?: 'section' | 'hero';
};

const COPY = {
  'thank-you': {
    eyebrow: 'While you wait',
    title: 'See What Happens After the Assessment',
    description:
      'Watch the GrowWise parent orientation to understand our teaching approach, learning plans, and what your family can expect next.',
  },
  'middle-school-math': {
    eyebrow: 'Parent orientation',
    title: 'See How We Find the Right Math Starting Point',
    description:
      'Watch how the assessment, personalized learning plan, and teaching approach help us match support to your child’s actual skill gap.',
  },
} as const;

export function ParentOrientationVideo({
  context = 'thank-you',
  onCtaClick,
  placement = 'section',
}: ParentOrientationVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const copy = COPY[context];
  const isMiddleSchoolMath = context === 'middle-school-math';
  const isHeroPlacement = placement === 'hero';

  const videoPlayer = (
    <div>
      <div className={`${isMiddleSchoolMath ? '' : 'mt-5'} aspect-video overflow-hidden rounded-xl bg-[#102542] shadow-md`}>
        {isPlaying ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0`}
            title="GrowWise Parent Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(16, 37, 66, 0.12), rgba(16, 37, 66, 0.28)), url("https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg")`,
              filter: 'brightness(1.12) contrast(1.08)',
            }}
            aria-label="Play GrowWise Parent Orientation"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F16112] text-white shadow-xl transition-transform group-hover:scale-105 group-focus-visible:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        Video hosted on YouTube. The player loads only after you press play.
      </p>
    </div>
  );

  if (isHeroPlacement) {
    return (
      <div
        className="mx-auto mt-5 w-full max-w-2xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-xl"
        aria-label="GrowWise parent orientation video"
        data-testid="parent-orientation-video"
        data-context={context}
        data-placement={placement}
      >
        {videoPlayer}
      </div>
    );
  }

  if (isMiddleSchoolMath) {
    return (
      <section
        className="rounded-2xl border border-[#1F396D]/10 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
        aria-labelledby="parent-orientation-title"
        data-testid="parent-orientation-video"
        data-context={context}
      >
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-9">
          <div className="text-center lg:text-left">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">
              {copy.eyebrow}
            </p>
            <h2
              id="parent-orientation-title"
              className="mt-2 text-2xl font-bold leading-tight text-[#1F396D] sm:text-3xl"
            >
              {copy.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {copy.description}
            </p>
            {onCtaClick ? (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F16112] to-[#F1894F] px-6 py-3 text-sm font-bold text-white shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16112] focus-visible:ring-offset-2 sm:w-auto"
                >
                  Find My Child&apos;s Math Starting Point
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Free 30-minute assessment · Written next-step plan · No pressure
                </p>
              </div>
            ) : null}
          </div>
          {videoPlayer}
        </div>
      </section>
    );
  }

  return (
    <section
      className="mt-10 rounded-2xl border border-[#1F396D]/10 bg-white p-4 shadow-sm sm:p-6"
      aria-labelledby="parent-orientation-title"
      data-testid="parent-orientation-video"
      data-context={context}
    >
      <p className="text-center text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">
        {copy.eyebrow}
      </p>
      <h2
        id="parent-orientation-title"
        className="mt-2 text-center text-xl font-bold text-[#1F396D] sm:text-2xl"
      >
        {copy.title}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-sm leading-relaxed text-slate-600">
        {copy.description}
      </p>
      {videoPlayer}
    </section>
  );
}
