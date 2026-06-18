import { countSchemaType, countSchemaTypeInScripts } from '../countJsonLdTypes'
import { HOME_GRAPH_JSON_LD } from '../homeGraphJsonLd'
import { generateFAQPageSchema } from '../structuredData'
import { HOME_VISIBLE_FAQS } from '@/lib/home/homeFaqCopy'
import { buildCarelessMathMistakesPageGraphSchema } from '@/lib/schema/careless-math-mistakes-jsonld'
import { buildPythonVsScratchPageGraphSchema } from '@/lib/schema/python-vs-scratch-jsonld'

describe('countSchemaType', () => {
  it('counts FAQPage in @graph', () => {
    expect(countSchemaType(HOME_GRAPH_JSON_LD, 'FAQPage')).toBe(1)
    expect(countSchemaType(HOME_GRAPH_JSON_LD, 'EducationalOrganization')).toBe(0)
  })

  it('counts multiple FAQPage across scripts', () => {
    const legacy = [
      generateFAQPageSchema(HOME_VISIBLE_FAQS),
      HOME_GRAPH_JSON_LD,
    ]
    expect(countSchemaTypeInScripts(legacy, 'FAQPage')).toBe(2)
  })
})

describe('page graph builders emit exactly one FAQPage', () => {
  const baseUrl = 'https://growwiseschool.org'
  const locale = 'en'

  it('careless-math-mistakes graph', () => {
    const graph = buildCarelessMathMistakesPageGraphSchema(baseUrl, locale)
    expect(countSchemaType(graph, 'FAQPage')).toBe(1)
  })

  it('python-vs-scratch graph', () => {
    const graph = buildPythonVsScratchPageGraphSchema(baseUrl, locale)
    expect(countSchemaType(graph, 'FAQPage')).toBe(1)
  })
})
