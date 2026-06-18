import Link from 'next/link';

export default function WinterCampPage() {
  return (
    <main className="min-h-[68vh] bg-slate-50 px-4 py-16 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F16112]">
          Winter camps
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#1F396D] sm:text-5xl">
          The next winter camp schedule is not published yet.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The previous winter session has ended. We will publish verified dates, programs,
          and registration details here when the next Dublin winter schedule is ready.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/camps"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1F396D] px-6 py-3 font-semibold text-white"
          >
            Explore current camps
          </Link>
          <Link
            href="/bulletin"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1F396D] px-6 py-3 font-semibold text-[#1F396D]"
          >
            Get schedule updates
          </Link>
        </div>
      </section>
    </main>
  );
}
