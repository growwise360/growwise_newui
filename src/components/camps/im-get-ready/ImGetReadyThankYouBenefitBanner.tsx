import Link from 'next/link';

type ImGetReadyThankYouBenefitBannerProps = {
  title: string;
  copy: string;
  note: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function ImGetReadyThankYouBenefitBanner({
  title,
  copy,
  note,
  ctaHref,
  ctaLabel,
}: ImGetReadyThankYouBenefitBannerProps) {
  return (
    <section
      aria-labelledby="im-get-ready-thank-you-benefit"
      className="border-y border-[#F16112]/20 bg-gradient-to-r from-[#FFF7F0] via-white to-[#FFF7F0]"
    >
      <div className="mx-auto max-w-[1100px] px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
        <div className="flex flex-col gap-3 rounded-xl border border-[#F16112]/25 bg-white/90 p-4 shadow-sm sm:rounded-2xl sm:gap-4 sm:p-5 md:flex-row md:items-start md:gap-5">
          <div className="shrink-0">
            <p className="inline-flex rounded-full bg-[#F16112] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1 sm:text-xs">
              Up to $120 savings
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <h2
              id="im-get-ready-thank-you-benefit"
              className="font-heading text-base font-bold text-[#1F396D] sm:text-lg md:text-xl"
            >
              {title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 sm:mt-2">{copy}</p>
            <p className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">{note}</p>
            {ctaHref && ctaLabel ? (
              <Link
                href={ctaHref}
                className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#F16112] underline hover:text-[#d54f0a]"
              >
                {ctaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
