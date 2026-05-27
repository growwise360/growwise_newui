import { MATH_HUB_COPY } from '@/lib/math-hub-copy';

export function TrustMetrics() {
  const { trust } = MATH_HUB_COPY;

  return (
    <section className="border-b border-slate-200 bg-white py-14 md:py-20" aria-labelledby="trust-metrics-heading">
      <div className="mx-auto max-w-[1100px] px-5 md:px-12">
        <h2 id="trust-metrics-heading" className="sr-only">
          Trust signals
        </h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trust.metrics.map((metric) => (
            <li
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 text-center"
            >
              <p className="font-heading text-2xl font-bold text-[#1F396D] md:text-3xl">{metric.value}</p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">{metric.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-left text-sm leading-relaxed text-slate-600 md:text-base">
          {trust.paragraph}
        </p>
      </div>
    </section>
  );
}
