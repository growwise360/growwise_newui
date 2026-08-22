import Image from 'next/image';

const partnerCardClass =
  'group flex min-h-[92px] items-center justify-center rounded-2xl border border-[#1F396D]/10 bg-white px-5 py-4 shadow-[0_10px_35px_rgba(31,57,109,0.09)] ring-1 ring-white transition duration-300 hover:-translate-y-1 hover:border-[#F16112]/30 hover:shadow-[0_16px_42px_rgba(31,57,109,0.14)]';

export default function PartnerTrustStrip() {
  return (
    <section
      data-testid="partner-trust-strip"
      className="relative overflow-hidden border-y border-[#1F396D]/8 bg-gradient-to-br from-[#F8FAFF] via-white to-[#FFF8F3] px-4 py-12 sm:py-14"
      aria-labelledby="partner-trust-heading"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-52 w-52 rounded-full bg-[#1F396D]/5 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-[#F16112]/8 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#F16112]">
            Trusted platforms
          </p>
          <h2
            id="partner-trust-heading"
            className="text-2xl font-bold tracking-tight text-[#1F396D] sm:text-3xl"
          >
            Proudly Partnered With
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            GrowWise is an approved vendor partner on platforms families trust to discover quality programs.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="https://www.6crickets.com/providerDirectory/US/CA/Dublin/GrowWise-03fcd68e5673f08b?refer&provider=6121&utm_medium=provider&utm_source=providers"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={partnerCardClass}
            aria-label="Visit GrowWise on 6crickets (opens in new tab)"
          >
            <span className="flex items-center gap-3">
              <Image
                src="https://www.6crickets.com/_assets/images/fav.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight text-[#263B70]">6crickets</span>
            </span>
          </a>

          <a
            href="https://www.activityhero.com/biz/169146-growwise-dublin-ca"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={partnerCardClass}
            aria-label="Visit GrowWise on ActivityHero (opens in new tab)"
          >
            <span className="text-center text-xl font-extrabold tracking-tight">
              <span className="text-[#2767B2]">Activity</span>
              <span className="text-[#F16112]">Hero</span>
            </span>
          </a>

          <a
            href="https://thevelp.app/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={partnerCardClass}
            aria-label="Visit Velp (opens in new tab)"
          >
            <span className="relative inline-flex min-w-32 items-center justify-center rounded-xl bg-[#21104F] px-7 py-3 text-2xl font-extrabold lowercase tracking-tight text-white shadow-md">
              velp
              <span className="absolute right-3 top-2 h-2 w-2 rounded-full bg-[#F16112]" aria-hidden />
              <span className="absolute right-2 top-4 h-1.5 w-1.5 rounded-full bg-[#35B6A5]" aria-hidden />
              <span className="absolute right-5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#F4C542]" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
