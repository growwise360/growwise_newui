import { getCampPage } from '@/lib/camps/get-camp-page';
import { buildCampLandingJsonLdGraph } from '@/lib/schema/camp-landing-jsonld';

export default async function CampSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getCampPage(slug);
  const jsonLdGraph = page ? buildCampLandingJsonLdGraph(page, locale) : null;

  return (
    <>
      {jsonLdGraph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      ) : null}
      {children}
    </>
  );
}
