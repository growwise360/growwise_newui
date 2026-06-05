import type { Metadata } from 'next'

import ReadinessChecklistLayout, {
  generateMetadata as generateReadinessChecklistMetadata,
} from '../resources/readiness-checklist/layout'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return generateReadinessChecklistMetadata({ params })
}

export default function ShortReadinessChecklistLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return ReadinessChecklistLayout({ children, params })
}
