import { EnglishHubPage } from '@/components/courses/EnglishHubPage'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function EnglishCoursesPage({ params }: PageProps) {
  const { locale } = await params

  return <EnglishHubPage locale={locale} />
}
