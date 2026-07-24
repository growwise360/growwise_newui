'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { RESOURCE_BULLETIN_CTA } from '@/data/resource-bulletin-cta'
import { publicPath } from '@/lib/publicPath'
import { cn } from '@/lib/utils'

type ResourceBulletinCtaProps = {
  className?: string
}

export function ResourceBulletinCta({ className }: ResourceBulletinCtaProps) {
  const locale = useLocale()
  const bulletinHref = publicPath(RESOURCE_BULLETIN_CTA.href, locale)

  return (
    <aside
      className={cn(
        'rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-white p-6 sm:p-8',
        className,
      )}
      aria-labelledby="resource-bulletin-cta-heading"
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F396D]/10 text-[#1F396D]"
          aria-hidden
        >
          <Mail className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="resource-bulletin-cta-heading" className="font-heading text-lg font-bold text-[#1F396D] sm:text-xl">
            {RESOURCE_BULLETIN_CTA.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{RESOURCE_BULLETIN_CTA.subtext}</p>
          <Button
            asChild
            className="mt-4 min-h-[48px] rounded-lg bg-[#F16112] px-5 text-sm font-semibold text-white hover:bg-[#d54f0a]"
          >
            <Link href={bulletinHref}>{RESOURCE_BULLETIN_CTA.buttonLabel}</Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}
