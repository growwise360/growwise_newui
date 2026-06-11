'use client';

import Link from 'next/link';
import { ArrowRight, Award, BookOpen, Layers3 } from 'lucide-react';
import { useLocale } from 'next-intl';

import { publicPath } from '@/lib/publicPath';

const codingLinks = [
  { href: '/coding/python', label: 'Python coding classes' },
  { href: '/coding/ml-ai', label: 'ML & AI coding classes' },
] as const;

const certificationLinks = [
  { href: '/future-skills/python-certification', label: 'Python certification pathway' },
  { href: '/future-skills/ai-machine-learning', label: 'AI & ML certification pathway' },
] as const;

export function SteamMlAiSurfacesSection() {
  const locale = useLocale();

  return (
    <section className="border-y border-[#1F396D]/10 bg-white px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#F16112]">Same topics, different pages</p>
          <h2 className="text-3xl font-bold text-[#1F396D] md:text-4xl">
            This catalog is not the same as Coding or Future Skills.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Use this page to browse STEAM courses and enroll. Use Coding pages for a simpler trial-first introduction.
            Use Future Skills when you want a structured certification pathway — tuition is shared at pathway assessment,
            not listed on those pages.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border-2 border-[#F16112] bg-[#FFF7F2] p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F396D] text-white">
              <Layers3 className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F16112]">You are here</p>
            <h3 className="mt-2 text-xl font-bold text-gray-950">STEAM course catalog</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Python, app development, and ML/AI courses with filters and enrollment on this page.
            </p>
            <a
              href="#courses"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#F16112]"
            >
              Jump to courses
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </article>

          <article className="rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F396D] text-white">
              <BookOpen className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F16112]">Exploring first</p>
            <h3 className="mt-2 text-xl font-bold text-gray-950">Coding program pages</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Cleaner overview pages for trial classes and foundations before you choose a track.
            </p>
            <ul className="mt-5 space-y-2">
              {codingLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={publicPath(link.href, locale)}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#1F396D] hover:text-[#F16112]"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#1F396D]/10 bg-[#f8fafc] p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F396D] text-white">
              <Award className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F16112]">Certification ready</p>
            <h3 className="mt-2 text-xl font-bold text-gray-950">Future Skills pathways</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Multi-level pathways with optional Certiport and third-party exams at GrowWise Dublin when ready.
            </p>
            <ul className="mt-5 space-y-2">
              {certificationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={publicPath(link.href, locale)}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#1F396D] hover:text-[#F16112]"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={publicPath('/book-assessment?interest=future-skills', locale)}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#F16112] underline underline-offset-2"
            >
              Book a pathway assessment
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
