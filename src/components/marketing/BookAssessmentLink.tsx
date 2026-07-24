'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import type { ReactNode } from 'react'
import { trackCtaClickNextdoor } from '@/lib/analytics/gtmEvents'
import { appendUtm, type StoredUtm } from '@/lib/analytics/utm'
import { publicPath } from '@/lib/publicPath'

export interface BookAssessmentLinkProps {
  location: string
  className?: string
  children: ReactNode
  utm?: StoredUtm
  onClickExtra?: () => void
}

export function BookAssessmentLink({
  location,
  className,
  children,
  utm,
  onClickExtra,
}: BookAssessmentLinkProps) {
  const locale = useLocale()
  const baseHref = publicPath('/book-assessment', locale)
  const href = appendUtm(baseHref, utm)

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackCtaClickNextdoor(location, typeof window !== 'undefined' ? window.location.pathname : '')
        onClickExtra?.()
      }}
    >
      {children}
    </Link>
  )
}
