import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { DEFAULT_HEADER_DATA } from '@/components/layout/Header/constants';
import FooterFindUsOn from './FooterFindUsOn';

export default function FooterSocialBar() {
  const social = DEFAULT_HEADER_DATA.topBar.social;

  return (
    <div className="border-t border-gray-300 mt-12 pt-8 text-center">
      <div className="flex justify-center items-center gap-4">
        <Link
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded"
          aria-label="Facebook (opens in new tab)"
        >
          <Facebook className="w-5 h-5" aria-hidden />
        </Link>
        <Link
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded"
          aria-label="Instagram (opens in new tab)"
        >
          <Instagram className="w-5 h-5" aria-hidden />
        </Link>
        <Link
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded"
          aria-label="LinkedIn (opens in new tab)"
        >
          <Linkedin className="w-5 h-5" aria-hidden />
        </Link>
      </div>

      <FooterFindUsOn />
    </div>
  );
}
