'use client';

import { usePathname } from 'next/navigation';
import { getFooterTrustBadges } from '@/data/footerTrustBadges';

function isHomePath(pathname: string): boolean {
  return pathname === '/';
}

export default function FooterFindUsOn() {
  const pathname = usePathname();
  const badges = getFooterTrustBadges(isHomePath(pathname));

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-500 mb-4">Find Us On</p>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {badges.map((badge) => (
          <a
            key={badge.id}
            href={badge.href}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img
              src={badge.imageSrc}
              alt={badge.imageAlt}
              className="h-[60px] w-auto"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
