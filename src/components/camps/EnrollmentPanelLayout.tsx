import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Shared spacing tokens for summer + academic enrollment panels. */
export const enrollmentPanelSelectClass =
  'h-8 w-full rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-medium text-slate-900 focus:border-[#1F396D] focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20';

/** Sticky desktop wrapper — caps height below site header so panel header stays visible while slots scroll. */
export const enrollmentPanelStickyWrapClass =
  'lg:sticky lg:top-[var(--header-height,10rem)] lg:z-10 lg:flex lg:max-h-[calc(100vh-var(--header-height,10rem)-1rem)] lg:min-h-0 lg:w-full lg:flex-col lg:self-start lg:overflow-hidden';

export function EnrollmentPanelShell({
  id = 'slots-panel',
  ariaLabel,
  children,
  className,
}: {
  id?: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-label={ariaLabel}
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl lg:max-h-full',
        'max-[768px]:overflow-x-visible',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EnrollmentPanelHeader({
  title,
  subtitle,
  metaLine,
  topRight,
  footer,
}: {
  title: string;
  subtitle?: string;
  metaLine?: string;
  topRight?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="shrink-0 border-b border-slate-50 bg-slate-50/30 px-4 py-[10px]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="font-heading text-base font-extrabold leading-tight text-slate-900">{title}</h3>
            {subtitle ? (
              <span className="text-[11px] font-semibold leading-snug text-slate-700">{subtitle}</span>
            ) : null}
          </div>
          {metaLine ? (
            <p className="mt-0.5 text-[11px] leading-snug text-slate-600">{metaLine}</p>
          ) : null}
        </div>
        {topRight ? <div className="shrink-0">{topRight}</div> : null}
      </div>
      {footer}
    </div>
  );
}

export function EnrollmentPanelTierBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-[#1F396D]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#1F396D]">
      {label}
    </span>
  );
}

export function EnrollmentPanelInfoButton({
  onClick,
  ariaLabel,
}: {
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1F396D]/10 text-[#1F396D] transition-colors hover:bg-[#1F396D]/20"
    >
      <Info className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}

export function EnrollmentPanelControls({ children }: { children: ReactNode }) {
  return <div className="shrink-0 bg-white">{children}</div>;
}

export function EnrollmentPanelDropdownsRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-slate-100 bg-white px-4 py-[6px] sm:grid-cols-2">
      {children}
    </div>
  );
}

export function EnrollmentPanelDescriptionStrip({ children }: { children: ReactNode }) {
  return (
    <p className="shrink-0 border-l-[3px] border-[#1F396D] bg-white px-4 py-[5px] text-[11px] leading-tight text-slate-600">
      {children}
    </p>
  );
}

export function EnrollmentPanelSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="shrink-0 border-b border-slate-100 bg-white px-4 py-[6px] text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
      {children}
    </p>
  );
}

export function EnrollmentPanelScrollBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'min-h-0 overscroll-contain',
        'lg:flex-1 lg:overflow-y-auto',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EnrollmentPanelSlotList({ children }: { children: ReactNode }) {
  return <div className="divide-y divide-slate-100">{children}</div>;
}
