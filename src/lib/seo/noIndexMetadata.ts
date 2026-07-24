import type { Metadata } from 'next';

import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

export function buildNoIndexMetadata({
  title,
  description,
  path,
  locale,
  canonicalPath = path,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  canonicalPath?: string;
}): Metadata {
  const baseUrl = getCanonicalSiteUrl();
  return {
    title,
    description,
    alternates: {
      canonical: absoluteSiteUrl(canonicalPath, locale, baseUrl),
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}
