import Link from 'next/link';
import copy from '@/i18n/messages/academic-summer-programs-en.json';
import { createLocaleUrl } from '@/components/layout/Header/utils';

type AcademicInternalLinksSectionProps = {
  locale: string;
};

const LINKS = copy.internalLinks;

export function AcademicInternalLinksSection({ locale }: AcademicInternalLinksSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-14 px-4">
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-3 text-xl font-bold text-[#1F396D] sm:text-2xl">{LINKS.heading}</h3>
        <p className="mb-6 text-gray-600">{LINKS.body}</p>
        <ul className="mb-6 space-y-3">
          {LINKS.items.map((item) => (
            <li key={item.href} className="flex items-start gap-2">
              <span className="mt-0.5 font-bold text-[#F16112]" aria-hidden>
                →
              </span>
              <span>
                <Link
                  href={createLocaleUrl(item.href, locale)}
                  className="font-semibold text-[#1F396D] underline hover:text-[#F16112]"
                >
                  {item.label}
                </Link>
                {' '}
                — {item.description}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          {LINKS.footerPrefix}
          <Link
            href={createLocaleUrl(LINKS.footerLink.href, locale)}
            className="font-semibold text-[#1F396D] underline hover:text-[#F16112]"
          >
            {LINKS.footerLink.label}
          </Link>
          {' '}
          {LINKS.footerSuffix}
        </p>
      </div>
    </section>
  );
}
