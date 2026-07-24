'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, BookOpen, Download, PenLine, SearchCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  RESOURCE_FILTERS,
  RESOURCE_GUIDES,
  RESOURCES_CTA,
  resourceCategoryTagClass,
  type ResourceFilterId,
} from '@/data/resources-hub'
import { RESOURCE_BULLETIN_CTA } from '@/data/resource-bulletin-cta'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

const hubSections = [
  {
    title: "Parents' Corner",
    eyebrow: 'Articles & blog picks',
    description:
      'Start with the problem you are seeing at home: hidden gaps, careless mistakes, homework battles, or confidence dips.',
    icon: BookOpen,
    accent: 'bg-[#1F396D]',
    cta: 'Browse Parent Articles',
    href: '/growwise-blogs',
    links: [
      {
        title: "Your child's A grade may be hiding a learning gap",
        description: 'For parents who feel something is off even when the report card looks fine.',
        href: '/resources/why-grades-hide-learning-gaps',
      },
      {
        title: 'Careless math mistakes are usually not careless',
        description: 'See the pattern behind repeated errors, rushed work, and lost test points.',
        href: '/resources/careless-math-mistakes',
      },
      {
        title: 'Stop sitting next to your child every homework night',
        description: 'A practical independence system for families tired of nightly homework stress.',
        href: '/resources/homework-independence',
      },
    ],
  },
  {
    title: 'Practice Plans & Worksheets',
    eyebrow: 'Downloads & quick checks',
    description:
      'Free study plans, printable practice resources, and quick checks parents can use before booking anything.',
    icon: Download,
    accent: 'bg-[#F16112]',
    cta: 'Open Free Downloads',
    href: '/resources/downloads',
    links: [
      {
        title: 'Free Math & English study plans',
        description: 'Build a simple 4-week home practice plan without guessing where to start.',
        href: '/resources/downloads',
      },
      {
        title: 'Math & reading readiness checklist',
        description: 'A fast way to spot grade-level readiness concerns before they become bigger gaps.',
        href: '/readinesschecklist',
      },
      {
        title: 'Math mistake self-check',
        description: 'Help your child notice the mistake pattern behind repeated wrong answers.',
        href: '/self-check',
      },
    ],
  },
  {
    title: 'Student Corner',
    eyebrow: 'Student work showcase',
    description:
      'A home for student writing, published articles, short stories, coding projects, and creative work.',
    icon: PenLine,
    accent: 'bg-[#29335C]',
    cta: 'Visit Student Corner',
    href: '/resources/student-corner',
    links: [
      {
        title: 'Published student articles',
        description: 'Celebrate research, opinion writing, and student voice beyond worksheets.',
        href: '/resources/student-corner#student-articles',
      },
      {
        title: 'Short stories and creative writing',
        description: 'A place for narrative writing, imagination, and polished student drafts.',
        href: '/resources/student-corner#short-stories',
      },
      {
        title: 'Projects and portfolio highlights',
        description: 'Showcase coding, AI, media, and problem-solving work students are proud of.',
        href: '/resources/student-corner#project-showcase',
      },
    ],
  },
] as const

export function ResourcesHubPage() {
  const locale = useLocale()
  const [activeFilter, setActiveFilter] = useState<ResourceFilterId>('all')
  const bookAssessmentHref = publicPath('/book-assessment?source=resources-hub', locale)
  const bulletinHref = publicPath(RESOURCE_BULLETIN_CTA.href, locale)

  const visibleGuides = useMemo(() => {
    if (activeFilter === 'all') return RESOURCE_GUIDES
    return RESOURCE_GUIDES.filter((guide) => guide.category === activeFilter)
  }, [activeFilter])

  return (
    <main data-resources-hub className="min-h-screen bg-background font-sans">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#102A54] text-white" aria-labelledby="resources-hero-title">
        <Image
          src="/images/resources/growwise-back-to-school-math-assessment.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102A54] via-[#102A54]/86 to-[#102A54]/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:py-14">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25 sm:text-sm">
              GrowWise parent resources
            </p>
            <h1 id="resources-hero-title" className="font-heading mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Parent resources for when schoolwork feels off
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl">
              Find the right article, practice plan, or student example before guessing what your child needs next.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="min-h-[52px] rounded-lg bg-[#F16112] px-6 text-sm font-bold text-white shadow-lg shadow-black/20 hover:bg-[#d54f0a] sm:text-base"
              >
                <Link href={publicPath('/resources/downloads', locale)}>
                  Get Free Practice Plans
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-h-[52px] rounded-lg border-white bg-white/95 px-6 text-sm font-bold text-[#1F396D] hover:bg-white sm:text-base"
              >
                <Link href={bookAssessmentHref}>Book an Assessment</Link>
              </Button>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-white/95 sm:grid-cols-3">
              {['Hidden learning gaps', 'Homework battles', 'Practice plans'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 ring-1 ring-white/20 backdrop-blur">
                  <SearchCheck className="h-4 w-4 shrink-0 text-[#F7A15D]" aria-hidden />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {hubSections.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.title}
                  href={publicPath(section.href, locale)}
                  className="group flex min-h-[154px] gap-4 rounded-2xl border border-white/20 bg-white/95 p-5 text-left text-[#1F396D] shadow-xl shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  <span className={cn('inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm', section.accent)}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-[#F16112]">{section.eyebrow}</span>
                    <span className="mt-1 flex items-start justify-between gap-3">
                      <span className="font-heading text-xl font-bold leading-tight group-hover:text-[#C45A1A]">{section.title}</span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#F16112] transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-600">{section.description}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-12 sm:py-14" aria-labelledby="popular-parent-guides">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#F16112] sm:text-sm">Start with the problem</p>
              <h2 id="popular-parent-guides" className="font-heading mt-2 text-2xl font-bold text-[#1F396D] sm:text-3xl">
                Popular parent reads
              </h2>
            </div>
            <Link
              href={publicPath('/growwise-blogs', locale)}
              className="inline-flex w-fit items-center text-sm font-bold text-[#F16112] hover:text-[#C45A1A] hover:underline"
            >
              Browse all articles
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {hubSections[0].links.map((link) => (
              <Link
                key={link.href}
                href={publicPath(link.href, locale)}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-colors hover:border-[#F16112]/35 hover:bg-[#FFF7ED]"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-heading text-lg font-bold leading-snug text-[#1F396D] group-hover:text-[#C45A1A]">{link.title}</span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#F16112] transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-slate-600">{link.description}</span>
              </Link>
            ))}
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
          <div className="mb-8 flex flex-col gap-2 text-center sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#F16112] sm:text-sm">Full library</p>
            <h2 className="font-heading text-2xl font-bold text-[#1F396D] sm:text-3xl">
              Parent articles, tools, and decision guides
            </h2>
          </div>
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
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
