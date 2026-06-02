import React from 'react'
import { generateFAQPageSchema } from '@/lib/seo/structuredData'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

/** FAQPage JSON-LD — questions/answers must match visible FAQ content on the page when applicable. */
export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = generateFAQPageSchema(faqs)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
