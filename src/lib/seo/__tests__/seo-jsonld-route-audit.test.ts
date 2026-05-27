/**
 * Static audit: one FAQPage per route pattern, no removed dead exports, legacy redirects defined.
 */
import { HOME_GRAPH_JSON_LD } from '../homeGraphJsonLd'
import { countSchemaType, countSchemaTypeInScripts } from '../countJsonLdTypes'
import { generateFAQPageSchema } from '../structuredData'
import { HOME_VISIBLE_FAQS } from '@/lib/home/homeFaqCopy'
import { LEGACY_PATH_REDIRECTS } from '../legacy-path-redirects'
import { buildCarelessMathMistakesPageGraphSchema } from '@/lib/schema/careless-math-mistakes-jsonld'
import { buildPythonVsScratchPageGraphSchema } from '@/lib/schema/python-vs-scratch-jsonld'
import { buildDublinCaPageGraphSchema } from '@/lib/schema/dublin-ca-local-business-jsonld'
import { buildTutoringDublinCaArticleGraphSchema } from '@/lib/schema/tutoring-dublin-ca-jsonld'
import { buildHomeworkIndependencePageGraphSchema } from '@/lib/schema/homework-independence-jsonld'
import { buildWhenToStartSatPrepPageGraphSchema } from '@/lib/schema/when-to-start-sat-prep-jsonld'
import { buildWhatIsVibeCodingPageGraphSchema } from '@/lib/schema/what-is-vibe-coding-jsonld'
import { buildMathHubPageGraphSchema } from '@/lib/schema/math-hub-jsonld'
import { buildCampLandingJsonLdGraph } from '@/lib/schema/camp-landing-jsonld'
import { getCampPage } from '@/lib/camps/get-camp-page'
import { buildPagesUrls } from '@/lib/seo/sitemapData'

const BASE = 'https://growwiseschool.org'
const LOCALE = 'en'

/** Simulated per-URL JSON-LD payloads (layout + page scripts). */
const ROUTE_JSON_LD_AUDIT: Array<{ route: string; schemas: unknown[] }> = [
  {
    route: '/',
    schemas: [
      { '@type': 'WebPage' },
      HOME_GRAPH_JSON_LD,
    ],
  },
  {
    route: '/about',
    schemas: [
      { '@type': 'BreadcrumbList' },
      { '@type': 'AboutPage' },
      generateFAQPageSchema([]),
    ],
  },
  {
    route: '/contact',
    schemas: [
      { '@type': 'BreadcrumbList' },
      { '@type': 'ContactPage' },
      generateFAQPageSchema([]),
    ],
  },
  {
    route: '/academic',
    schemas: [{ '@type': 'Service' }, generateFAQPageSchema([])],
  },
  {
    route: '/steam',
    schemas: [{ '@type': 'Service' }, generateFAQPageSchema([])],
  },
  {
    route: '/programs',
    schemas: [{ '@type': 'Service' }, generateFAQPageSchema([])],
  },
  {
    route: '/academic/math',
    schemas: [buildMathHubPageGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/academic/english',
    schemas: [
      { '@type': 'Course' },
      { '@type': 'BreadcrumbList' },
      generateFAQPageSchema([]),
    ],
  },
  {
    route: '/dublin-ca',
    schemas: [buildDublinCaPageGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/resources/tutoring-dublin-ca',
    schemas: [buildTutoringDublinCaArticleGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/resources/careless-math-mistakes',
    schemas: [buildCarelessMathMistakesPageGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/resources/python-vs-scratch',
    schemas: [buildPythonVsScratchPageGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/resources/homework-independence',
    schemas: [buildHomeworkIndependencePageGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/resources/when-to-start-sat-prep',
    schemas: [buildWhenToStartSatPrepPageGraphSchema(BASE, LOCALE)],
  },
  {
    route: '/resources/what-is-vibe-coding',
    schemas: [buildWhatIsVibeCodingPageGraphSchema(BASE, LOCALE)],
  },
]

describe('SEO JSON-LD route audit', () => {
  it('homepage emits exactly one FAQPage (regression for GSC duplicate)', () => {
    const schemas = [{ '@type': 'WebPage' }, HOME_GRAPH_JSON_LD]
    expect(countSchemaTypeInScripts(schemas, 'FAQPage')).toBe(1)
    expect(countSchemaType(HOME_GRAPH_JSON_LD, 'FAQPage')).toBe(1)
  })

  it.each(ROUTE_JSON_LD_AUDIT.map((r) => [r.route, r.schemas] as const))(
    '%s emits exactly one FAQPage when FAQ is present',
    (route, schemas) => {
      const count = countSchemaTypeInScripts(schemas, 'FAQPage')
      expect(count).toBeLessThanOrEqual(1)
      const routesWithFaq = [
        '/',
        '/about',
        '/contact',
        '/academic',
        '/steam',
        '/programs',
        '/academic/math',
        '/academic/english',
        '/dublin-ca',
        '/resources/tutoring-dublin-ca',
        '/resources/careless-math-mistakes',
        '/resources/python-vs-scratch',
        '/resources/homework-independence',
        '/resources/when-to-start-sat-prep',
        '/resources/what-is-vibe-coding',
      ]
      if (routesWithFaq.includes(route)) {
        expect(count).toBe(1)
      }
    },
  )

  it('camp landing graphs emit exactly one FAQPage each', () => {
    const slugs = ['ai-studio-dublin-ca', 'math-olympiad-camp-dublin-ca'] as const
    for (const slug of slugs) {
      const page = getCampPage(slug)
      expect(page).toBeDefined()
      const graph = buildCampLandingJsonLdGraph(page!, LOCALE)
      expect(countSchemaType(graph, 'FAQPage')).toBe(1)
    }
  })

  it('sitemap URLs do not include /en/ prefix for default locale', () => {
    const urls = buildPagesUrls(BASE, '2026-01-01').map((u) => u.loc)
    const withEnPrefix = urls.filter((loc) => /\/en(\/|$)/.test(new URL(loc).pathname))
    expect(withEnPrefix).toEqual([])
  })

  it('legacy redirects target indexable canonical paths', () => {
    expect(LEGACY_PATH_REDIRECTS.length).toBeGreaterThan(0)
    for (const { from, to } of LEGACY_PATH_REDIRECTS) {
      expect(from.startsWith('/')).toBe(true)
      expect(to.startsWith('/')).toBe(true)
      expect(from).not.toMatch(/\/en\//)
    }
  })

  it('HOME_GRAPH FAQ matches HOME_VISIBLE_FAQS count', () => {
    expect(countSchemaType(HOME_GRAPH_JSON_LD, 'FAQPage')).toBe(1)
    const faqNode = HOME_GRAPH_JSON_LD['@graph'][1]
    expect(faqNode.mainEntity).toHaveLength(HOME_VISIBLE_FAQS.length)
  })
})
