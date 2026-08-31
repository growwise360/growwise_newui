import type { Metadata } from 'next'
import { Gift, ShieldCheck, UserPlus } from 'lucide-react'

import { ReferralForm } from '@/components/referrals/ReferralForm'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Refer a Family | GrowWise Referral Credit',
    description: 'Refer a new family to GrowWise and submit the information needed to track your referral credit.',
    alternates: { canonical: absoluteSiteUrl('/referral', locale, getCanonicalSiteUrl()) },
  }
}

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[#1F396D] to-[#29335C] px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">GrowWise family referrals</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Help another student grow</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            Introduce a family to GrowWise. If their student enrolls and remains active, your referral credit is reviewed during their third monthly billing cycle.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:py-16">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">How it works</h2>
          <div className="mt-6 space-y-5">
            {[
              { icon: UserPlus, title: 'Submit the referral', text: 'Enter your account email and the new family’s enrollment email.' },
              { icon: ShieldCheck, title: 'We match enrollment', text: 'GrowWise matches the referred email after the new student enrolls.' },
              { icon: Gift, title: 'Credit review', text: 'During billing cycle three, we verify eligibility and apply the approved credit.' },
            ].map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F16112]/10 text-[#F16112]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {index + 1}</p>
                  <h3 className="mt-1 font-bold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ReferralForm />
      </section>
    </div>
  )
}
