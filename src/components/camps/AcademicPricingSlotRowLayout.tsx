import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Shared pricing-row layout for academic enrollment panels. */
export function AcademicPricingSlotRowLayout({
  info,
  price,
  action,
  className,
  highlighted,
  inCart,
  cohort2Accent,
}: {
  info: ReactNode;
  price: ReactNode;
  action: ReactNode;
  className?: string;
  highlighted?: boolean;
  inCart?: boolean;
  cohort2Accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border px-3 py-3 sm:px-3.5 sm:py-3',
        cohort2Accent && 'border-l-2 border-l-[#9FE1CB]',
        inCart
          ? highlighted
            ? 'border-[#9FE1CB] bg-[#F0FAF6]'
            : 'border-green-200 bg-green-50/30'
          : highlighted
            ? 'border-[#9FE1CB] bg-[#F0FAF6]'
            : 'border-slate-200 bg-white',
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_4.75rem_auto] sm:items-start sm:gap-x-3">
        <div className="min-w-0">{info}</div>

        <div
          className={cn(
            'flex items-center justify-between gap-3 border-t border-slate-100 pt-2.5',
            'sm:contents',
          )}
        >
          <div
            className={cn(
              'min-w-[4.75rem] text-left tabular-nums sm:border-l sm:pl-3 sm:pt-0.5 sm:text-right',
              highlighted ? 'sm:border-[#9FE1CB]/60' : 'sm:border-slate-100',
            )}
          >
            {price}
          </div>
          <div className="shrink-0 sm:pt-0.5">{action}</div>
        </div>
      </div>
    </div>
  );
}

export function AcademicPricingSlotPrice({
  price,
  compareAtPrice,
  priceClassName,
}: {
  price: number;
  compareAtPrice?: number | null;
  priceClassName?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-0.5 sm:items-end">
      {compareAtPrice ? (
        <span className="text-xs font-semibold text-slate-400 line-through">${compareAtPrice}</span>
      ) : null}
      <span className={cn('text-sm font-black leading-none text-slate-900', priceClassName)}>${price}</span>
    </div>
  );
}
