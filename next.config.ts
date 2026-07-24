import type { NextConfig } from "next";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';
import { LEGACY_PATH_REDIRECTS } from './src/lib/seo/legacy-path-redirects';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === 'production';
const retiredLocale = 'hi|zh|es';

const LEGACY_ACADEMIC_REDIRECTS = [
  { from: '/courses/math', to: '/academic/math' },
  { from: '/courses/english', to: '/academic/english' },
  { from: '/courses/high-school-math', to: '/academic/math/high-school' },
] as const;

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  compiler: {
    // Smaller bundles + less parse time in prod (Lighthouse "Minify JS" is largely third-party;
    // this trims our code and drops noisy logs.)
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
  // Ensure these ESM packages are transpiled and bundled by Next.js
  transpilePackages: [
    'next-intl',
    '@formatjs/icu-messageformat-parser',
    '@formatjs/icu-skeleton-parser',
    '@formatjs/ecma402-abstract',
    '@formatjs/intl-localematcher',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  skipTrailingSlashRedirect: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.s3.**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'thegrowwise.com',
      },
      {
        protocol: 'https',
        hostname: 'growwiseschool.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'patch.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.activityhero.com',
      },
      {
        protocol: 'https',
        hostname: 'www.6crickets.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Use modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Include 70 for summer hero / program cards; 75 default; 85 where explicitly requested.
    qualities: [70, 75, 85],
    // Short TTL in dev; longer in prod so repeat views hit the image optimizer cache more often.
    minimumCacheTTL: isProd ? 86_400 : 60,
  },
  
  // Webpack filesystem cache can corrupt .next/dev when multiple dev servers run
  // (ENOENT on routes-manifest / fallback-build-manifest / pack.gz rename).
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },

  // Experimental features for better performance
  experimental: {
    // inlineCss disabled (SEO audit 2026-07-08): it embedded ~229KB of Tailwind CSS
    // into every HTML response, ballooning the homepage document to ~920KB and hurting
    // LCP more than the saved stylesheet round-trip gained. External CSS is cacheable
    // across pages. https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss
    inlineCss: false,
    // Smaller dev graphs for Webpack + Turbopack (tree-shake barrel imports)
    optimizePackageImports: [
      'next-intl',
      'recharts',
      'embla-carousel-react',
      '@stripe/react-stripe-js',
      'react-day-picker',
      'cmdk',
      'input-otp',
      'vaul',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-visually-hidden',
    ],
  },
  
  // Headers for caching and security
  async headers() {
    /** Camp guide PDF — inline in browser (avoid attachment download). */
    const campGuidePdf = [
      {
        source: '/assets/camps/SummerCampBrochure.pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'inline' },
        ],
      },
    ];

    const security = [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];

    // Long immutable cache breaks Next dev HMR for /_next/static; apply only in production.
    if (!isProd) {
      return [...campGuidePdf, ...security];
    }

    return [
      ...campGuidePdf,
      ...security,
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      // Next.js reserves `/sitemap.xml`; keep the index on a non-reserved
      // internal route and expose the standard public URL through a rewrite.
      { source: '/sitemap.xml', destination: '/sitemap-index.xml' },
      // Legacy camp guide POST path → canonical API route.
      { source: '/api/summer-camp-lottery', destination: '/api/summer-camp-summercamp' },
    ];
  },

  // Legacy `/camp/*` SEO landings → `/camps/*` (canonical namespace aligns with /camps/summer, /camps/winter).
  // `/en/camp/*` listed before `/en/:path*` so one redirect hop to `/camps/*`.
  async redirects() {
    const legacyAcademicRedirects = LEGACY_ACADEMIC_REDIRECTS.flatMap(({ from, to }) => [
      { source: from, destination: to, permanent: true as const },
      { source: `${from}/`, destination: to, permanent: true as const },
      { source: `/en${from}`, destination: to, permanent: true as const },
      { source: `/en${from}/`, destination: to, permanent: true as const },
      {
        source: `/:locale(${retiredLocale})${from}`,
        destination: to,
        permanent: true as const,
      },
      {
        source: `/:locale(${retiredLocale})${from}/`,
        destination: to,
        permanent: true as const,
      },
    ]);

    const legacyMarketingRedirects = LEGACY_PATH_REDIRECTS.flatMap(({ from, to }) => [
      { source: from, destination: to, permanent: true as const },
      { source: `${from}/`, destination: to, permanent: true as const },
    ]);

    const localePrefixedLegacyRedirects = LEGACY_PATH_REDIRECTS.flatMap(({ from, to }) => [
      {
        source: `/:locale(${retiredLocale})${from}`,
        destination: to,
        permanent: true as const,
      },
      {
        source: `/:locale(${retiredLocale})${from}/`,
        destination: to,
        permanent: true as const,
      },
    ]);

    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.growwiseschool.org' }],
        destination: 'https://growwiseschool.org/:path*',
        permanent: true,
      },
      ...legacyAcademicRedirects,
      ...localePrefixedLegacyRedirects,
      ...legacyMarketingRedirects,
      {
        source: '/camps/academic-summer-sprint-dublin-ca',
        destination: '/camps/academic-summer-programs-dublin-ca',
        permanent: true,
      },
      {
        source: '/en/camps/academic-summer-sprint-dublin-ca',
        destination: '/camps/academic-summer-programs-dublin-ca',
        permanent: true,
      },
      {
        source: `/:locale(${retiredLocale})/camps/academic-summer-sprint-dublin-ca`,
        destination: '/camps/academic-summer-programs-dublin-ca',
        permanent: true,
      },
      { source: '/detective', destination: '/self-check', permanent: true },
      { source: '/results', destination: '/self-check', permanent: true },
      { source: '/en/detective', destination: '/self-check', permanent: true },
      { source: '/en/results', destination: '/self-check', permanent: true },
      {
        source: `/:locale(${retiredLocale})/detective`,
        destination: '/self-check',
        permanent: true,
      },
      {
        source: `/:locale(${retiredLocale})/results`,
        destination: '/self-check',
        permanent: true,
      },
      { source: '/camp', destination: '/camps/summer', permanent: true },
      { source: '/camp/:slug', destination: '/camps/:slug', permanent: true },
      { source: '/en/camp', destination: '/camps/summer', permanent: true },
      { source: '/en/camp/:slug', destination: '/camps/:slug', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      { source: `/:locale(${retiredLocale})`, destination: '/', permanent: true },
      { source: `/:locale(${retiredLocale})/:path*`, destination: '/:path*', permanent: true },
      {
        source: '/:locale/camps/summer/lottery-success',
        destination: '/:locale/camps/summer/summercamp-success',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
