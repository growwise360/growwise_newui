import { cn } from '@/lib/utils';

type MathHubSectionProps = {
  id?: string;
  label?: string;
  heading?: string;
  body?: string;
  className?: string;
  children: React.ReactNode;
};

export function MathHubSection({
  id,
  label,
  heading,
  body,
  className,
  children,
}: MathHubSectionProps) {
  return (
    <section
      id={id}
      className={cn('border-b border-slate-200 py-14 md:py-20', className)}
      aria-labelledby={heading ? `${id ?? 'section'}-heading` : undefined}
    >
      <div className="mx-auto max-w-[1100px] px-5 md:px-12">
        {label ? (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#F16112] sm:text-xs">
            {label}
          </p>
        ) : null}
        {heading ? (
          <h2
            id={`${id ?? 'section'}-heading`}
            className={cn(
              'font-heading text-2xl font-bold tracking-tight text-slate-900 md:text-3xl',
              label ? 'mt-2' : '',
            )}
          >
            {heading}
          </h2>
        ) : null}
        {body ? <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">{body}</p> : null}
        <div className={heading || body ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  );
}
