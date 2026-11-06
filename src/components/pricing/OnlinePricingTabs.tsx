'use client'

import * as Tabs from '@radix-ui/react-tabs'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ONLINE_CATALOG_CONFIG, formatOnlinePrice } from '@/config/online-pricing'
import { publicPath } from '@/lib/publicPath'

export function OnlinePricingTabs() {
  const locale = useLocale()

  return (
    <Tabs.Root defaultValue="elementary" className="mt-8">
      <Tabs.List aria-label="Choose a grade band" className="flex flex-wrap gap-2 border-b border-slate-200">
        {ONLINE_CATALOG_CONFIG.bands.map((band) => (
          <Tabs.Trigger
            key={band.id}
            value={band.id}
            className="rounded-t-lg px-4 py-3 font-semibold text-slate-700 outline-none data-[state=active]:bg-[#1F396D] data-[state=active]:text-white focus-visible:ring-2 focus-visible:ring-orange-600"
          >
            {band.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {ONLINE_CATALOG_CONFIG.bands.map((band) => (
        <Tabs.Content key={band.id} value={band.id} className="pt-6 focus-visible:outline-none">
          <p className="font-semibold text-slate-700">{band.grades} · {band.subjects.join(' · ')}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PlanCard title="Trial month" amount={band.trial} detail="Four weeks · one time per student and subject" locale={locale} gradeBandLabel={band.label} plan="Trial month" billing="one-time" />
            <PlanCard title="Core" amount={band.core} detail="Per month · three-month term · per subject" locale={locale} gradeBandLabel={band.label} plan="Core" />
            {band.advanced ? (
              <PlanCard title="Advanced" amount={band.advanced} detail="Per month · three-month term · per subject" locale={locale} gradeBandLabel={band.label} plan="Advanced" />
            ) : (
              <article className="flex flex-col rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-[#1F396D]">Advanced</h3>
                <p className="mt-3 text-slate-700">Advanced pathways start in middle school.</p>
              </article>
            )}
          </div>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${band.label} subjects`}>
            {band.subjects.map((subject) => <li key={subject} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#1F396D]">{subject}</li>)}
          </ul>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

function PlanCard({
  title,
  amount,
  detail,
  locale,
  gradeBandLabel,
  plan,
  billing = 'monthly',
}: {
  title: string
  amount: number
  detail: string
  locale: string
  gradeBandLabel: string
  plan: string
  billing?: 'one-time' | 'monthly'
}) {
  const params = new URLSearchParams({ package: `${gradeBandLabel} · ${plan}`, utm_source: 'pricing', utm_medium: 'website', utm_campaign: 'online_catalog' })
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#1F396D]">{title}</h3>
      <p className="mt-4 text-3xl font-black text-[#1F396D]">{formatOnlinePrice(amount)}<span className="text-base font-medium text-slate-600">{billing === 'one-time' ? ' one-time' : ' / month'}</span></p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
      <p className="mt-3 text-sm text-slate-600">{ONLINE_CATALOG_CONFIG.weeklyClassMinutes}-minute weekly live class. Placement and available schedule are confirmed by a teacher.</p>
      <Link className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#F16112] px-4 py-2 font-bold text-white hover:bg-[#d54f0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F396D]" href={`${publicPath('/book-assessment', locale)}?${params.toString()}`}>
        Book a free assessment
      </Link>
    </article>
  )
}
