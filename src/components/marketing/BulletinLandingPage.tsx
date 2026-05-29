'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Mail, Quote } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BulletinSubscribeForm } from '@/components/marketing/BulletinSubscribeForm';
import { BULLETIN_COPY } from '@/data/bulletin-copy';
import { publicPath } from '@/lib/publicPath';
import { cn } from '@/lib/utils';

const sectionClass = 'mx-auto max-w-5xl px-4 sm:px-6';
const h2Class = 'font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl';

export function BulletinLandingPage() {
  const locale = useLocale();
  const heroFormRef = useRef<HTMLDivElement>(null);
  const copy = BULLETIN_COPY;

  const scrollToHeroForm = () => {
    heroFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const input = document.getElementById('bulletin-hero-form-email');
    if (input instanceof HTMLInputElement) {
      window.setTimeout(() => input.focus(), 400);
    }
  };

  return (
    <main data-bulletin className="min-h-screen bg-background font-sans pb-24 md:pb-0">
      {/* Hero */}
      <section
        className="border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white pb-14 pt-10 sm:pb-20 sm:pt-14"
        aria-labelledby="bulletin-hero-title"
      >
        <div className={sectionClass}>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/60 px-3 py-1.5 text-xs font-semibold text-[#1F396D]">
              <span className="h-2 w-2 rounded-full bg-[#F16112]" aria-hidden />
              {copy.eyebrow}
            </span>
            <span className="rounded-full border border-[#1F396D]/15 bg-[#1F396D]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1F396D]">
              {copy.badge}
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_220px] lg:gap-16">
            <div className="max-w-xl">
              <h1
                id="bulletin-hero-title"
                className="font-heading text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.12]"
              >
                {copy.hero.h1}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-[17px]">{copy.hero.subtext}</p>

              <div ref={heroFormRef} className="mt-8">
                <BulletinSubscribeForm
                  formId="bulletin-hero-form"
                  submitLabel={copy.hero.submitLabel}
                  successMessage={copy.hero.successMessage}
                  variant="light"
                  layout="stacked"
                />
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-[#1F396D]" aria-hidden>
                  ✓
                </span>
                {copy.hero.formNote}
              </p>

              <p className="mt-4 text-sm text-slate-700">
                {copy.hero.contactIntro}{' '}
                <Link
                  href={publicPath('/contact', locale)}
                  className="font-medium text-[#1F396D] underline decoration-[#1F396D]/30 underline-offset-2 hover:decoration-[#1F396D]"
                >
                  {copy.hero.contactLinkLabel}
                </Link>
              </p>
            </div>

            <aside className="flex flex-col items-center text-center lg:items-center">
              <div className="relative h-[220px] w-[180px] overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 shadow-sm">
                <Image
                  src={copy.founder.image}
                  alt={copy.founder.imageAlt}
                  fill
                  sizes="180px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{copy.founder.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                {copy.founder.role}
                <br />
                {copy.founder.established}
              </p>
              <span className="mt-2.5 rounded-full bg-[#1F396D] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                {copy.founder.tag}
              </span>
            </aside>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-12 sm:py-16" aria-labelledby="bulletin-schedule-heading">
        <div className={sectionClass}>
          <h2 id="bulletin-schedule-heading" className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F396D]">
            {copy.schedule.label}
          </h2>
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-3" role="list">
            {copy.schedule.items.map((item) => (
              <li key={item.day}>
                <Card className="h-full overflow-hidden border-slate-200 shadow-none">
                  <div className="h-[3px] bg-[#1F396D]" aria-hidden />
                  <CardContent className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{item.day}</p>
                    <h3 className="font-heading mt-2 text-lg font-semibold leading-snug text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-5 py-3.5 text-center text-sm text-slate-600">
            <strong className="font-semibold text-slate-700">{copy.schedule.trustLineBold}</strong>{' '}
            {copy.schedule.trustLineRest}
          </p>
        </div>
      </section>

      {/* Proof band */}
      <section className="bg-[#1F396D] py-10 sm:py-12" aria-label="GrowWise by the numbers">
        <div className={cn(sectionClass, 'flex flex-wrap items-center gap-8 lg:gap-10')}>
          {copy.proof.stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-8 lg:gap-10">
              {index > 0 ? (
                <div className="hidden h-11 w-px bg-white/20 sm:block" aria-hidden />
              ) : null}
              <div>
                <p className="font-heading text-3xl font-bold leading-none text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-white/70">{stat.label}</p>
              </div>
            </div>
          ))}
          <div className="hidden h-11 w-px bg-white/20 sm:block" aria-hidden />
          <blockquote className="min-w-[200px] flex-1">
            <Quote className="mb-2 h-5 w-5 text-white/40" aria-hidden />
            <p className="font-heading text-[15px] italic leading-relaxed text-white/90">&ldquo;{copy.proof.quote}&rdquo;</p>
            <footer className="mt-2 text-[11px] tracking-wide text-white/55">{copy.proof.attribution}</footer>
          </blockquote>
        </div>
      </section>

      {/* Sample issue */}
      <section className="border-t border-slate-100 py-14 sm:py-16" aria-labelledby="bulletin-sample-heading">
        <div className={cn(sectionClass, 'grid items-center gap-10 lg:grid-cols-2 lg:gap-14')}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F396D]">{copy.sample.label}</p>
            <h2 id="bulletin-sample-heading" className={cn(h2Class, 'mt-3')}>
              {copy.sample.heading}
            </h2>
            {copy.sample.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                {paragraph}
              </p>
            ))}
          </div>
          <Card className="overflow-hidden border-slate-200 shadow-md shadow-slate-200/40">
            <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50/80 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#F16112] ring-1 ring-amber-400/60" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900/80">
                {copy.sample.cardTag}
              </span>
            </div>
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold leading-snug text-slate-900">{copy.sample.cardTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{copy.sample.cardExcerpt}</p>
              <Link
                href={publicPath(copy.sample.cardHref, locale)}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#1F396D] hover:text-[#F16112]"
              >
                {copy.sample.cardLinkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {copy.sample.relatedGuides.length > 0 ? (
                <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                  {copy.sample.relatedGuides.map((guide) => (
                    <li key={guide.href}>
                      <Link
                        href={publicPath(guide.href, locale)}
                        className="text-sm font-medium text-[#1F396D] underline decoration-[#1F396D]/25 underline-offset-2 hover:text-[#F16112] hover:decoration-[#F16112]"
                      >
                        {guide.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured parent guides */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16" aria-labelledby="bulletin-guides-heading">
        <div className={sectionClass}>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F396D]">{copy.featuredGuides.label}</p>
          <h2 id="bulletin-guides-heading" className={cn(h2Class, 'mt-3')}>
            {copy.featuredGuides.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {copy.featuredGuides.subtext}
          </p>
          <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-3" role="list">
            {copy.featuredGuides.items.map((guide) => (
              <li key={guide.href}>
                <Card className="h-full border-slate-200 shadow-none transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-5">
                    <h3 className="font-heading text-base font-semibold leading-snug text-[#1F396D] sm:text-lg">
                      <Link href={publicPath(guide.href, locale)} className="hover:text-[#F16112] hover:underline">
                        {guide.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{guide.description}</p>
                    <p className="mt-3 text-xs font-medium text-slate-500">{guide.readTime}</p>
                    <Link
                      href={publicPath(guide.href, locale)}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#F16112] hover:text-[#d54f0a]"
                    >
                      Read guide
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link
              href={publicPath(copy.featuredGuides.hubHref, locale)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F396D] underline decoration-[#1F396D]/30 underline-offset-2 hover:decoration-[#1F396D]"
            >
              {copy.featuredGuides.hubLinkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t border-[#183056] bg-[#1F396D] py-14 text-white sm:py-16"
        aria-labelledby="bulletin-bottom-cta-heading"
      >
        <div className={cn(sectionClass, 'max-w-xl text-center')}>
          <h2 id="bulletin-bottom-cta-heading" className="font-heading text-2xl font-bold sm:text-[2rem]">
            {copy.bottomCta.heading}{' '}
            <em className="not-italic text-[#F1894F]">{copy.bottomCta.headingEmphasis}</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-[15px]">{copy.bottomCta.subtext}</p>
          <div className="mt-8">
            <BulletinSubscribeForm
              formId="bulletin-bottom-form"
              submitLabel={copy.bottomCta.submitLabel}
              successMessage={copy.hero.successMessage}
              variant="dark"
              layout="inline"
              className="text-left"
            />
          </div>
          <p className="mt-4 text-xs text-white/50">{copy.bottomCta.note}</p>
        </div>
      </section>

      {/* Mobile sticky */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:hidden"
        aria-label="Subscribe to bulletin"
      >
        <Button
          type="button"
          onClick={scrollToHeroForm}
          className="min-h-[44px] w-full rounded-lg bg-[#F16112] font-semibold text-white hover:bg-[#d54f0a]"
        >
          <Mail className="mr-2 h-4 w-4" aria-hidden />
          {copy.mobileSticky.label}
        </Button>
      </div>
    </main>
  );
}
