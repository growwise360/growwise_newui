import { MiddleSchoolTutoringPage } from '@/components/MiddleSchoolTutoringPage'

export default async function MiddleSchoolTutoringDublinCaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <MiddleSchoolTutoringPage locale={locale} />
}
