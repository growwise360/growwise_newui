import Link from 'next/link';

export default function WinterCampCalendarPage() {
  return (
    <main className="min-h-[68vh] bg-slate-50 px-4 py-16 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F16112]">
          Winter camp calendar
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#1F396D] sm:text-5xl">
          New winter camp dates are coming later.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          There is no active winter calendar to register for right now. Browse current camp
          options or join the GrowWise bulletin so you hear when verified winter dates open.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/camps"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1F396D] px-6 py-3 font-semibold text-white"
          >
            Browse current camps
          </Link>
          <Link
            href="/bulletin"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1F396D] px-6 py-3 font-semibold text-[#1F396D]"
          >
            Join the bulletin
          </Link>
        </div>
      </section>
    </main>
  );
}
