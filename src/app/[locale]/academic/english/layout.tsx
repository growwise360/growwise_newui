import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/academic/english', locale)
  return metadata || { title: 'English Courses | GrowWise', description: 'Comprehensive English courses' }
}

export default async function EnglishCoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
