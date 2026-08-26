export type ParentGuideFaq = {
  question: string
  answer: string
}

export type ParentGuideLink = {
  label: string
  href: string
}

export type ParentGuideSource = {
  name: string
  url: string
  note: string
}

export type ParentGuideSection = {
  heading: string
  paragraphs: readonly string[]
  checklist?: readonly string[]
}

export type ParentPainGuide = {
  slug: string
  headline: string
  seoTitle: string
  description: string
  schemaDescription: string
  excerpt: string
  keywords: readonly string[]
  image: string
  imageAlt: string
  publishedDate: string
  displayDate: string
  readTime: string
  intro: readonly string[]
  answer: string
  sections: readonly ParentGuideSection[]
  faqs: readonly ParentGuideFaq[]
  sources: readonly ParentGuideSource[]
  related: readonly ParentGuideLink[]
  cta: {
    headline: string
    text: string
    label: string
    href: string
  }
  sensitive?: boolean
}
