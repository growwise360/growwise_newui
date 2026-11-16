import Link from 'next/link';
import { Phone, Mail, Facebook, Instagram, Linkedin, LogIn } from 'lucide-react';

interface TopBarProps {
  studentLoginHref: string;
  phone: string;
  email: string;
  address: string;
  followLabel: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export default function TopBar({ phone, email, address, followLabel, social, studentLoginHref }: TopBarProps) {
  // Clean phone number for tel: link (remove spaces, parentheses, etc.)
  const cleanPhoneNumber = phone.replace(/[\s\(\)\-]/g, '');
  
  return (
    <div className="header-topbar" suppressHydrationWarning>
      <div className="container-7xl">
        <div className="header-toprow max-md:justify-end">
          {/* Contact Info */}
          <div className="header-contact-group">
            <div className="header-contact-item">
              <Phone className="w-4 h-4" />
              <a 
                href={`tel:${cleanPhoneNumber}`}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
                title="Click to call"
              >
                {phone}
              </a>
            </div>
            <div className="header-contact-item">
              <Mail className="w-4 h-4" />
              <a 
                href={`mailto:${email}`}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
                title="Click to email"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Social Media + Address */}
          <div className="header-social-row">
            <div className="header-social-group">
              <span className="header-social-label">{followLabel}</span>
              <div className="header-social-links">
                <Link href={social.facebook} target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Facebook (opens in new tab)">
                  <Facebook className="w-4 h-4" aria-hidden />
                </Link>
                <Link href={social.instagram} target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Instagram (opens in new tab)">
                  <Instagram className="w-4 h-4" aria-hidden />
                </Link>
                <Link href={social.linkedin} target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="LinkedIn (opens in new tab)">
                  <Linkedin className="w-4 h-4" aria-hidden />
                </Link>
              </div>
            </div>
            <div className="header-address" suppressHydrationWarning>{address}</div>
            <Link
              href={studentLoginHref}
              prefetch={false}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/60 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1E3A5F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F]"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
