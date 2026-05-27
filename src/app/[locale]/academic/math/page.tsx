import { MathHubPage } from '@/components/courses/MathHubPage';
import { buildMathHubPageGraphSchema } from '@/lib/schema/math-hub-jsonld';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MathCoursesPage({ params }: PageProps) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();
  const graphSchema = buildMathHubPageGraphSchema(baseUrl, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <MathHubPage locale={locale} />
    </>
  );
}
