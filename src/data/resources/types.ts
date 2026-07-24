import type { ResourceCategory } from '@/data/resources-hub'

export type ResourceArticleFaq = {
  question: string
  answer: string
}

/** Alias used by some resource article modules */
export type ResourceArticleFAQ = ResourceArticleFaq

export type ResourceArticleRelated = {
  title: string
  href: string
  description?: string
}

export type ResourceArticleMeta = {
  path: string
  category: ResourceCategory
  categoryLabel: string
  h1: string
  readTime: string
  updated: string
  title: string
  description: string
  keywords: string
  datePublished: string
  dateModified: string
  /** Optional extended frontmatter (Article 12+ template) */
  seoTitle?: string
  slug?: string
  canonicalUrl?: string
  author?: string
  primaryKeyword?: string
  secondaryKeywords?: readonly string[]
  audience?: string
  ctaText?: string
  ctaUrl?: string
}

export type ResourceArticleCta = {
  href: string
  label: string
}
