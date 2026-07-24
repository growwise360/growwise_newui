type SeoPageFallbackLink = {
  href: string;
  label: string;
};

type SeoPageFallbackProps = {
  eyebrow: string;
  title: string;
  description: string;
  links?: SeoPageFallbackLink[];
  className?: string;
  /**
   * With `force-dynamic` + Suspense streaming, both this fallback and the real
   * page content end up in the served HTML. If the wrapped component renders
   * its own `<h1>`, pass `headingLevel="p"` here so the page keeps exactly one H1.
   */
  headingLevel?: 'h1' | 'p';
};

export function SeoPageFallback({
  eyebrow,
  title,
  description,
  links = [],
  className = '',
  headingLevel = 'h1',
}: SeoPageFallbackProps) {
  const Heading = headingLevel;
  return (
    <section className={`min-h-[68vh] bg-white px-4 py-20 text-[#1F396D] ${className}`}>
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F16112]">{eyebrow}</p>
        <Heading className="text-4xl font-bold leading-tight md:text-5xl">{title}</Heading>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
        {links.length > 0 && (
          <nav aria-label="Related pages" className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-[#1F396D]/20 px-4 py-2 text-sm font-semibold text-[#1F396D] transition hover:border-[#F16112] hover:text-[#F16112]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
