import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/academic/math', locale)
  return metadata || { title: 'Math Programs | GrowWise', description: 'Structured math programs for Grades 1–12' }
}

export default function MathCoursesLayout({ children }: { children: React.ReactNode }) {
  return children
}
