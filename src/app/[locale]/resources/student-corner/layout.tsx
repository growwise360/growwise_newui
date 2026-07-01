import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Student Corner | Student Writing & Project Showcase | GrowWise',
    description:
      'Explore GrowWise Student Corner, a showcase destination for student articles, short stories, creative writing, coding projects, and portfolio work.',
  }
}

export default function StudentCornerLayout({ children }: { children: ReactNode }) {
  return children
}
