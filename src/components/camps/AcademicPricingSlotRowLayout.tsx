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
        'flex items-center justify-between gap-3 px-4 py-2',
        'max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-2 max-[768px]:py-2.5',
        cohort2Accent && 'border-l-[3px] border-l-[#9FE1CB]',
        inCart
          ? highlighted
            ? 'bg-[#F0FAF6]'
            : 'bg-green-50/30'
          : highlighted
            ? 'bg-[#F0FAF6]'
            : undefined,
        className,
      )}
    >
      <div className="min-w-0 flex-1">{info}</div>
      <div className="flex shrink-0 items-center gap-2.5 max-[768px]:w-full max-[768px]:justify-between max-[768px]:border-t max-[768px]:border-slate-100 max-[768px]:pt-2">
        {price}
        {action}
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
    <div className="flex flex-col items-end gap-0">
      {compareAtPrice ? (
        <span className="text-[10px] font-semibold leading-none text-slate-400 line-through">
          ${compareAtPrice}
        </span>
      ) : null}
      <span className={cn('text-[13px] font-black leading-none text-slate-900', priceClassName)}>
        ${price}
      </span>
    </div>
  );
}

export function EnrollmentCompactAddButton({
  label,
  ariaLabel,
  onClick,
  variant = 'default',
  disabled = false,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  variant?: 'default' | 'green' | 'remove';
  disabled?: boolean;
}) {
  const variantClass =
    disabled
      ? 'cursor-not-allowed bg-slate-200 text-slate-500'
      : variant === 'green'
      ? 'bg-[#0F6E56] text-white hover:bg-[#0B5A46]'
      : variant === 'remove'
        ? 'text-red-600 hover:bg-red-50'
        : 'bg-[#1A2B4A] text-white hover:bg-[#1F396D]';

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-[26px] min-w-[26px] shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold leading-none',
        'max-[768px]:h-11 max-[768px]:min-w-11 max-[768px]:px-2 max-[768px]:text-[11px]',
        variantClass,
      )}
    >
      {label}
    </button>
  );
}
