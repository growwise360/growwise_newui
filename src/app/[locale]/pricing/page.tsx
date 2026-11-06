import type { Metadata } from 'next'
import Link from 'next/link'
import { ONLINE_CATALOG_CONFIG, formatOnlinePrice, upfrontTermPrice } from '@/config/online-pricing'
import { OnlinePricingTabs } from '@/components/pricing/OnlinePricingTabs'
import FAQSchema from '@/components/schema/FAQSchema'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const canonical = absoluteSiteUrl('/pricing', locale, getCanonicalSiteUrl())
  return {
    title: 'Online Tutoring Pricing | GrowWise',
    description: 'Compare monthly online Math, English, Chemistry, and Physics plans for Grades 3–12. A teacher confirms placement and schedule before enrollment.',
    alternates: { canonical },
    openGraph: { title: 'Online Tutoring Pricing | GrowWise', description: 'Compare online learning plans by subject and grade band.', url: canonical, type: 'website' },
  }
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqs = [...ONLINE_CATALOG_CONFIG.faqs]

  return (
    <main>
      <FAQSchema faqs={faqs} />
      <section className="bg-gradient-to-br from-[#F8FAFC] to-blue-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[#C44B0A]">Online tutoring · Grades 3–12</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-[#1F396D] sm:text-5xl">One learning system. One monthly price per subject.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">Start with an assessment. A GrowWise teacher confirms the subject, level, available schedule, and price before enrollment.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="learning-system-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="learning-system-title" className="text-2xl font-bold text-[#1F396D]">A five-step learning system</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {['Assessment', 'Live class', 'Gap lessons', 'Reteach', 'Parent dashboard'].map((step, index) => (
              <li key={step} className="rounded-xl border border-slate-200 bg-white p-4"><span className="text-sm font-bold text-[#C44B0A]">0{index + 1}</span><p className="mt-1 font-semibold text-[#1F396D]">{step}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="plan-pricing-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="plan-pricing-title" className="text-3xl font-bold text-[#1F396D]">Choose a grade band</h2>
          <p className="mt-2 max-w-3xl text-slate-600">All prices are in US dollars, per subject, per month, on a three-month term. The four-week trial is a separate one-time purchase per student and subject.</p>
          <OnlinePricingTabs />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="included-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="included-title" className="text-3xl font-bold text-[#1F396D]">What each plan includes</h2>
          <div className="mt-5 space-y-3 md:hidden">
            {[
              ['Trial', 'Live class; trial report with the gap lessons queued for a paid plan; no student support.'],
              ['Elementary', 'Live class, gap lessons, reteach, parent dashboard, monthly progress report.'],
              ['Middle school', 'Everything in Elementary, plus student support.'],
              ['High school', 'Live class, gap lessons, reteach, parent dashboard, monthly assessment, student support.'],
            ].map(([plan, includes]) => <article key={plan} className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="font-bold text-[#1F396D]">{plan}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{includes}</p></article>)}
          </div>
          <div className="mt-5 hidden overflow-x-auto rounded-xl border border-slate-200 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-[#1F396D]"><tr><th scope="col" className="p-4">Plan</th><th scope="col" className="p-4">Live class</th><th scope="col" className="p-4">Gap lessons + reteach</th><th scope="col" className="p-4">Parent view</th><th scope="col" className="p-4">Reports / support</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr><th scope="row" className="p-4 font-semibold">Trial</th><td className="p-4">Yes</td><td className="p-4">Queued for paid plan</td><td className="p-4">Trial report</td><td className="p-4">No student support</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Elementary</th><td className="p-4">Yes</td><td className="p-4">Yes</td><td className="p-4">Parent dashboard</td><td className="p-4">Monthly progress report</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Middle school</th><td className="p-4">Yes</td><td className="p-4">Yes</td><td className="p-4">Parent dashboard</td><td className="p-4">Monthly progress report + student support</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">High school</th><td className="p-4">Yes</td><td className="p-4">Yes</td><td className="p-4">Parent dashboard</td><td className="p-4">Monthly assessment + student support</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">Each weekly live class is {ONLINE_CATALOG_CONFIG.weeklyClassMinutes} minutes. Class format and confirmed schedule are shared after teacher review.</p>
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="savings-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="savings-title" className="text-3xl font-bold text-[#1F396D]">Ways to save</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl bg-white p-5"><h3 className="font-bold text-[#1F396D]">Subject bundles</h3><ul className="mt-3 space-y-2 text-sm text-slate-700">{ONLINE_CATALOG_CONFIG.bundles.map((bundle) => <li key={bundle.id}>{bundle.label}: {bundle.core ? formatOnlinePrice(bundle.core) : ''}{bundle.core && bundle.advanced ? ' Core · ' : ''}{bundle.advanced ? `${formatOnlinePrice(bundle.advanced)} Advanced` : ''} / month</li>)}</ul><p className="mt-3 text-xs text-slate-500">Each bundle covers the listed subjects for one student.</p></article>
            <article className="rounded-xl bg-white p-5"><h3 className="font-bold text-[#1F396D]">Purchase credits</h3><p className="mt-2 text-sm leading-6 text-slate-700">Credit offers are being prepared. The amounts, expiry, and redemption terms will be confirmed before credits become available to purchase or use.</p></article>
            <article className="rounded-xl bg-white p-5"><h3 className="font-bold text-[#1F396D]">Pay the term upfront</h3><p className="mt-2 text-sm leading-6 text-slate-700">Planned: a {ONLINE_CATALOG_CONFIG.upfrontDiscountPercent}% discount for paying a three-month term upfront. The total will be rounded to an amount ending in 7.</p><ul className="mt-3 space-y-1 text-sm text-slate-700">{ONLINE_CATALOG_CONFIG.bands.map((band) => <li key={band.id}>{band.label}: Core {formatOnlinePrice(upfrontTermPrice(band.core))}{band.advanced ? ` · Advanced ${formatOnlinePrice(upfrontTermPrice(band.advanced))}` : ''}</li>)}</ul></article>
            <article className="rounded-xl bg-white p-5"><h3 className="font-bold text-[#1F396D]">Homework help add-on</h3><p className="mt-2 text-sm leading-6 text-slate-700">Available for high-school students; contact GrowWise to confirm its current price. Elementary and middle-school availability is still being confirmed.</p></article>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="pricing-faq-title">
        <div className="mx-auto max-w-4xl">
          <h2 id="pricing-faq-title" className="text-3xl font-bold text-[#1F396D]">Pricing questions</h2>
          <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map(({ question, answer }) => <details key={question} className="py-5"><summary className="cursor-pointer font-bold text-[#1F396D]">{question}</summary><p className="mt-3 leading-7 text-slate-700">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="bg-[#1F396D] px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Find the right starting point</h2>
        <p className="mx-auto mt-3 max-w-2xl text-blue-100">A parent completes the assessment. A teacher confirms placement, schedule, and tuition before the family decides. This page does not collect payment or complete enrollment.</p>
        <Link href={publicPath('/book-assessment', locale)} className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-[#F16112] px-6 py-3 font-bold text-white hover:bg-[#d54f0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Book a free assessment</Link>
      </section>
    </main>
  )
}
