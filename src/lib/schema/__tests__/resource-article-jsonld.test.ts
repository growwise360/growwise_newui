import fs from 'node:fs'
import path from 'node:path'
import {
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_META,
  CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META,
  CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
  MATH_SPRINT_BREAKDOWN_FAQS,
  MATH_SPRINT_BREAKDOWN_META,
  MATH_SPRINT_BREAKDOWN_PATH,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META,
  READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META,
  SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
} from '@/data/resources/additional-summer-guides'
import { RESOURCE_ARTICLE_PATHS } from '@/data/resources'
import { countSchemaType } from '@/lib/seo/countJsonLdTypes'
import { buildResourceArticleGraphSchema } from '@/lib/schema/resource-article-jsonld'

const BASE_URL = 'https://growwiseschool.org'
const LOCALE = 'en'
const SRC_ROOT = path.join(__dirname, '..', '..', '..')

const newResourceArticles = [
  {
    path: MATH_SPRINT_BREAKDOWN_PATH,
    meta: MATH_SPRINT_BREAKDOWN_META,
    faqs: MATH_SPRINT_BREAKDOWN_FAQS,
    articleSection: 'Summer Learning',
  },
  {
    path: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_PATH,
    meta: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_META,
    faqs: READING_PROGRAM_GRADES_1_2_DUBLIN_CA_FAQS,
    articleSection: 'Reading Support',
  },
  {
    path: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_PATH,
    meta: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_META,
    faqs: SMALL_GROUP_TUTORING_VS_ONE_ON_ONE_FAQS,
    articleSection: 'Parent Resources',
  },
  {
    path: CALIFORNIA_MATH_STANDARDS_BY_GRADE_PATH,
    meta: CALIFORNIA_MATH_STANDARDS_BY_GRADE_META,
    faqs: CALIFORNIA_MATH_STANDARDS_BY_GRADE_FAQS,
    articleSection: 'Math Resources',
  },
  {
    path: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_PATH,
    meta: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_META,
    faqs: CHILD_STRUGGLES_WITH_WRITING_DUBLIN_CA_FAQS,
    articleSection: 'Writing Support',
  },
] as const

describe('resource article JSON-LD', () => {
  it.each(newResourceArticles.map((article) => [article.path, article] as const))(
    '%s emits BlogPosting, FAQPage, and BreadcrumbList schema',
    (_, article) => {
      const schema = buildResourceArticleGraphSchema(article, BASE_URL, LOCALE)
      const serializedSchema = JSON.stringify(schema)

      expect(countSchemaType(schema, 'BlogPosting')).toBe(1)
      expect(countSchemaType(schema, 'FAQPage')).toBe(1)
      expect(countSchemaType(schema, 'BreadcrumbList')).toBe(1)
      expect(serializedSchema).toContain(article.meta.h1)
      expect(serializedSchema).toContain(article.meta.description)
      expect(serializedSchema).toContain(article.faqs[0].question)
    },
  )

  it('all registered resource routes include a JSON-LD script in their layout', () => {
    for (const resourcePath of RESOURCE_ARTICLE_PATHS) {
      const layoutPath = path.join(
        SRC_ROOT,
        'app/[locale]',
        resourcePath.replace(/^\//, ''),
        'layout.tsx',
      )

      expect(fs.existsSync(layoutPath)).toBe(true)
      const source = fs.readFileSync(layoutPath, 'utf8')
      const delegatedLayoutMatch = source.match(/from ['"]\.\.\/resources\/([^'"]+)\/layout['"]/)

      if (delegatedLayoutMatch) {
        const delegatedLayoutPath = path.join(
          SRC_ROOT,
          'app/[locale]/resources',
          delegatedLayoutMatch[1],
          'layout.tsx',
        )

        expect(fs.existsSync(delegatedLayoutPath)).toBe(true)
        expect(fs.readFileSync(delegatedLayoutPath, 'utf8')).toContain('application/ld+json')
      } else {
        expect(source).toContain('application/ld+json')
      }
    }
  })
})
