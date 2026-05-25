import Link from 'next/link';
import ContactInfo from './ContactInfo';
import { ContactInfo as ContactInfoType, FooterSection as FooterSectionType } from './types';

interface FooterSectionProps {
  section: FooterSectionType;
  createLocaleUrl: (path: string) => string;
  contact?: ContactInfoType;
}

export default function FooterSection({ section, createLocaleUrl, contact }: FooterSectionProps) {
  if (section.variant === 'contact' && contact) {
    return (
      <div className="flex flex-col">
        <p className="text-gray-800 text-xl font-bold mb-6">{section.title}</p>
        <ContactInfo contact={contact} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-gray-800 text-xl font-bold mb-6">{section.title}</p>
      <ul className="space-y-3 text-gray-600">
        {(section.links ?? []).map((link, index) => (
          <li key={index}>
            {link.active ? (
              <Link
                href={createLocaleUrl(link.href)}
                className={
                  link.highlight
                    ? 'font-bold text-[#C45A1A] transition-colors hover:text-[#C45A1A] hover:underline'
                    : 'hover:text-gray-800 transition-colors hover:underline'
                }
              >
                {link.label}
              </Link>
            ) : (
              <span className="text-gray-500">{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
