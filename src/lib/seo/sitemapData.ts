/**
 * Shared sitemap data + XML helpers consumed by the sitemap index and child
 * sitemap route handlers (`src/app/sitemap*.xml/route.ts`).
 *
 * We split into two child sitemaps so Google can segment crawl/lastmod
 * tracking per content type:
 *   - `/sitemap-pages.xml`  — core site (home, academic, courses, STEAM, camps)
 *   - `/sitemap-blogs.xml`  — blog posts + resource guide articles
 * Index at `/sitemap.xml` references both (`src/app/sitemap-index.xml/route.ts` + rewrite).
 */

import { RESOURCE_ARTICLE_PATHS } from '@/data/resources'
import { RESOURCES_PATH } from '@/data/resources-hub'
import { locales } from '@/i18n/config'
import { DEFAULT_LOCALE } from '@/i18n/localeConfig'
import { getCampSlugs } from '@/lib/camps/get-camp-page'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

export type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export interface SitemapEntry {
  path: string
  priority: number
  changefreq: ChangeFreq
  /** When the entry was last meaningfully updated (ISO string). */
  lastmod?: string
}

export interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: ChangeFreq
  priority: number
}

/** Non-blog pages. `/` and `/camps/summer` are top-tier commercial targets. */
const corePages: SitemapEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/why-growwise', priority: 0.85, changefreq: 'monthly' },
  { path: '/academic', priority: 0.9, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/dublin-ca', priority: 0.9, changefreq: 'monthly' },
  { path: '/from-nextdoor', priority: 0.9, changefreq: 'monthly' },
  { path: '/bulletin', priority: 0.85, changefreq: 'monthly' },
  { path: '/enroll', priority: 0.85, changefreq: 'monthly' },
  { path: '/enroll-academic', priority: 0.9, changefreq: 'monthly' },
  { path: '/book-assessment', priority: 0.9, changefreq: 'monthly' },
  { path: '/self-check', priority: 0.85, changefreq: 'monthly' },
  { path: '/math-finals-practice-session', priority: 0.85, changefreq: 'weekly' },
  { path: '/workshop-calendar', priority: 0.8, changefreq: 'weekly' },
  { path: '/programs', priority: 0.8, changefreq: 'monthly' },
  { path: '/growwise-blogs', priority: 0.85, changefreq: 'weekly' },
  { path: '/resources', priority: 0.85, changefreq: 'weekly' },
]

const coursePages: SitemapEntry[] = [
  { path: '/academic/math', priority: 0.95, changefreq: 'weekly' },
  { path: '/academic/math/elementary', priority: 0.9, changefreq: 'monthly' },
  { path: '/academic/math/middle-school', priority: 0.9, changefreq: 'monthly' },
  { path: '/academic/math/high-school', priority: 0.9, changefreq: 'monthly' },
  { path: '/academic/english', priority: 0.95, changefreq: 'weekly' },
  { path: '/academic/english/elementary', priority: 0.92, changefreq: 'weekly' },
  { path: '/courses/sat-prep', priority: 0.9, changefreq: 'weekly' },
  { path: '/courses/integrated-math-1-dublin-ca', priority: 0.85, changefreq: 'monthly' },
]

const steamPages: SitemapEntry[] = [
  { path: '/steam', priority: 0.9, changefreq: 'monthly' },
  { path: '/steam/ml-ai-coding', priority: 0.85, changefreq: 'monthly' },
  { path: '/steam/game-development', priority: 0.85, changefreq: 'monthly' },
  { path: '/coding', priority: 0.85, changefreq: 'monthly' },
  { path: '/coding/python', priority: 0.75, changefreq: 'monthly' },
  { path: '/coding/ml-ai', priority: 0.75, changefreq: 'monthly' },
  { path: '/coding/app-development', priority: 0.75, changefreq: 'monthly' },
  { path: '/game-dev', priority: 0.85, changefreq: 'monthly' },
]

const futureSkillsPages: SitemapEntry[] = [
  { path: '/future-skills', priority: 0.85, changefreq: 'monthly' },
  { path: '/future-skills/design-creative-media', priority: 0.8, changefreq: 'monthly' },
  { path: '/future-skills/python-certification', priority: 0.8, changefreq: 'monthly' },
  { path: '/future-skills/ai-machine-learning', priority: 0.8, changefreq: 'monthly' },
  { path: '/future-skills/ai-entrepreneurship', priority: 0.8, changefreq: 'monthly' },
]

const legalPages: SitemapEntry[] = [
  { path: '/privacy-policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms-conditions', priority: 0.4, changefreq: 'yearly' },
]

const campPages: SitemapEntry[] = [
  { path: '/camps/summer', priority: 1.0, changefreq: 'weekly' },
  { path: '/camps/academic-summer-programs-dublin-ca', priority: 0.95, changefreq: 'weekly' },
  { path: '/camps/high-school-summer-intensive-dublin-ca', priority: 0.95, changefreq: 'weekly' },
  { path: '/camps/summer-reading-writing-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/summer-math-foundations-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/summer-algebra-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/summer-geometry-precalculus-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/summer-im-get-ready-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/summer-im1-get-ready-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/summer-im2-get-ready-dublin-ca', priority: 0.9, changefreq: 'weekly' },
  { path: '/camps/winter', priority: 0.7, changefreq: 'weekly' },
  { path: '/camps/winter/calendar', priority: 0.6, changefreq: 'weekly' },
]

/** SEO camp hub + landings — single Dublin campus, default-locale only. */
const campLandingHub: SitemapEntry = {
  path: '/camps',
  priority: 0.85,
  changefreq: 'weekly',
}

/** Blog post paths (same slugs as under `src/app/[locale]/growwise-blogs/`). */
const blogPostPaths = [
  '/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math',
  '/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley',
  '/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise',
  '/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era',
  '/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations',
  '/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities',
  '/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide',
  '/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux',
  '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide',
  '/growwise-blogs/improve-child-focus-feel-valued',
  '/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career',
  '/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child',
  '/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills',
  '/growwise-blogs/thinking-gap-your-kids-arent-distracted',
  '/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement',
  '/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp',
  '/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments',
  '/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile',
  '/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers',
] as const

const XML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&apos;',
  '"': '&quot;',
}

function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (ch) => XML_ESCAPE[ch] ?? ch)
}

function renderUrl(u: SitemapUrl): string {
  return [
    '  <url>',
    `    <loc>${escapeXml(u.loc)}</loc>`,
    `    <lastmod>${u.lastmod}</lastmod>`,
    `    <changefreq>${u.changefreq}</changefreq>`,
    `    <priority>${u.priority.toFixed(2)}</priority>`,
    '  </url>',
  ].join('\n')
}

export function renderUrlset(urls: SitemapUrl[]): string {
  const body = urls.map(renderUrl).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}

export function renderSitemapIndex(
  entries: Array<{ loc: string; lastmod: string }>,
): string {
  const body = entries
    .map(
      (e) =>
        `  <sitemap>\n    <loc>${escapeXml(e.loc)}</loc>\n    <lastmod>${
          e.lastmod
        }</lastmod>\n  </sitemap>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`
}

/** Build all non-blog page URLs across enabled locales. */
export function buildPagesUrls(baseUrl: string, lastmod: string): SitemapUrl[] {
  const urls: SitemapUrl[] = []
  const localeRoutes = [...corePages, ...coursePages, ...steamPages, ...futureSkillsPages, ...campPages, ...legalPages]

  locales.forEach((locale) => {
    localeRoutes.forEach((page) => {
      urls.push({
        loc: absoluteSiteUrl(page.path, locale, baseUrl),
        lastmod: page.lastmod ?? lastmod,
        changefreq: page.changefreq,
        priority: page.priority,
      })
    })

    if (locale === DEFAULT_LOCALE) {
      urls.push({
        loc: absoluteSiteUrl(campLandingHub.path, locale, baseUrl),
        lastmod: campLandingHub.lastmod ?? lastmod,
        changefreq: campLandingHub.changefreq,
        priority: campLandingHub.priority,
      })
      getCampSlugs().forEach((slug) => {
        urls.push({
          loc: absoluteSiteUrl(`/camps/${slug}`, locale, baseUrl),
          lastmod,
          changefreq: 'weekly',
          priority: 0.9,
        })
      })
    }
  })

  return urls
}

/** Build public paths represented by the non-blog sitemap. */
export function buildPagesPaths(): string[] {
  const paths: string[] = []
  const localeRoutes = [...corePages, ...coursePages, ...steamPages, ...futureSkillsPages, ...campPages, ...legalPages]

  locales.forEach((locale) => {
    localeRoutes.forEach((page) => {
      paths.push(publicPath(page.path, locale))
    })

    if (locale === DEFAULT_LOCALE) {
      paths.push(publicPath(campLandingHub.path, locale))
      getCampSlugs().forEach((slug) => {
        paths.push(publicPath(`/camps/${slug}`, locale))
      })
    }
  })

  return Array.from(new Set(paths))
}

/** Build blog post and resource guide URLs across enabled locales. */
export function buildBlogUrls(baseUrl: string, lastmod: string): SitemapUrl[] {
  const urls: SitemapUrl[] = []
  locales.forEach((locale) => {
    blogPostPaths.forEach((path) => {
      urls.push({
        loc: absoluteSiteUrl(path, locale, baseUrl),
        lastmod,
        changefreq: 'monthly',
        priority: 0.75,
      })
    })
    RESOURCE_ARTICLE_PATHS.forEach((path) => {
      urls.push({
        loc: absoluteSiteUrl(path, locale, baseUrl),
        lastmod,
        changefreq: 'monthly',
        priority:
          path === '/resources/tutoring-dublin-ca' || path === '/resources/summer-slide-dublin-ca' ? 0.85 : 0.8,
      })
    })
  })
  return urls
}

/** Build public paths represented by the blog/resource sitemap. */
export function buildBlogPaths(): string[] {
  const paths: string[] = []
  locales.forEach((locale) => {
    blogPostPaths.forEach((path) => {
      paths.push(publicPath(path, locale))
    })
    RESOURCE_ARTICLE_PATHS.forEach((path) => {
      paths.push(publicPath(path, locale))
    })
  })
  return Array.from(new Set(paths))
}

/** Child sitemap descriptors listed in the sitemap index. */
export function getChildSitemaps(baseUrl: string, lastmod: string) {
  return [
    { loc: `${baseUrl}/sitemap-pages.xml`, lastmod },
    { loc: `${baseUrl}/sitemap-blogs.xml`, lastmod },
  ]
}

export const sitemapConstants = {
  getBaseUrl: getCanonicalSiteUrl,
}
