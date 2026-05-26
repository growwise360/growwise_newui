import type { ImGetReadySeoLandingCopy } from '@/lib/im-get-ready-seo-landing-copy';

type ImGetReadyComparisonTableProps = {
  comparison: ImGetReadySeoLandingCopy['comparison'];
};

export function ImGetReadyComparisonTable({ comparison }: ImGetReadyComparisonTableProps) {
  const columns = [comparison.getReadyColumn, comparison.regularTutoringColumn];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {columns.map((column) => (
        <div
          key={column.title}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <p className="border-b border-slate-100 bg-[#1F396D]/5 px-5 py-4 text-center font-heading text-lg font-bold text-[#1F396D]">
            {column.title}
          </p>
          <dl className="divide-y divide-slate-100">
            {column.rows.map((row) => (
              <div key={row.label} className="px-5 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-800">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
