'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  RESOURCE_FILTERS,
  RESOURCE_GUIDES,
  RESOURCES_CTA,
  RESOURCES_HERO,
  resourceCategoryTagClass,
  type ResourceFilterId,
} from '@/data/resources-hub'
import { RESOURCE_BULLETIN_CTA } from '@/data/resource-bulletin-cta'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

export function ResourcesHubPage() {
  const locale = useLocale()
  const [activeFilter, setActiveFilter] = useState<ResourceFilterId>('all')
  const bookAssessmentHref = publicPath('/book-assessment', locale)
  const bulletinHref = publicPath(RESOURCE_BULLETIN_CTA.href, locale)

  const visibleGuides = useMemo(() => {
    if (activeFilter === 'all') return RESOURCE_GUIDES
    return RESOURCE_GUIDES.filter((guide) => guide.category === activeFilter)
  }, [activeFilter])

  return (
    <main data-resources-hub className="min-h-screen bg-background font-sans">
      <section className="border-b border-slate-200/80 bg-slate-50 py-14 sm:py-20" aria-labelledby="resources-hero-title">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F16112] sm:text-sm">{RESOURCES_HERO.preLabel}</p>
          <h1 id="resources-hero-title" className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-4xl md:text-5xl">
            {RESOURCES_HERO.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">{RESOURCES_HERO.subtext}</p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-8 sm:py-10" aria-label="Filter guides by topic">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {RESOURCE_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-[#1F396D] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                  )}
                  aria-pressed={isActive}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-amber-100 bg-amber-50/50 py-8 sm:py-10" aria-labelledby="resources-bulletin-promo">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:flex-row md:text-left">
          <div className="flex-1">
            <h2 id="resources-bulletin-promo" className="font-heading text-lg font-bold text-[#1F396D] sm:text-xl">
              {RESOURCE_BULLETIN_CTA.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{RESOURCE_BULLETIN_CTA.subtext}</p>
          </div>
          <Button
            asChild
            className="min-h-[48px] shrink-0 rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a]"
          >
            <Link href={bulletinHref}>{RESOURCE_BULLETIN_CTA.buttonLabel}</Link>
          </Button>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-label="Parent guides">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {visibleGuides.map((guide) => (
              <li key={guide.id}>
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span
                    className={cn(
                      'inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
                      resourceCategoryTagClass(guide.category),
                    )}
                  >
                    {guide.categoryLabel}
                  </span>
                  <h2 className="font-heading mt-4 text-lg font-bold leading-snug text-[#1F396D] sm:text-xl">
                    <Link href={publicPath(guide.href, locale)} className="hover:text-[#F16112] hover:underline">
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2">{guide.description}</p>
                  <p className="mt-4 text-xs font-medium text-slate-500">{guide.readTime}</p>
                  <Link
                    href={publicPath(guide.href, locale)}
                    className="mt-3 inline-flex text-sm font-semibold text-[#F16112] hover:text-[#C45A1A] hover:underline"
                  >
                    Read guide →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#1F396D] py-14 sm:py-16" aria-labelledby="resources-cta">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="resources-cta" className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {RESOURCES_CTA.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">{RESOURCES_CTA.subtext}</p>
          <Button
            asChild
            className="mt-8 min-h-[48px] rounded-lg bg-[#F16112] px-6 text-sm font-semibold text-white hover:bg-[#d54f0a] sm:text-base"
          >
            <Link href={bookAssessmentHref}>{RESOURCES_CTA.button}</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
