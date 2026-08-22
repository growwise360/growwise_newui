import type { Metadata } from 'next';
import { BULLETIN_DESCRIPTION, BULLETIN_PATH } from '@/data/bulletin-copy';
import FounderSchema from '@/components/seo/FounderSchema';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { buildBulletinPageGraphSchema } from '@/lib/schema/bulletin-jsonld';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateMetadataFromPath(BULLETIN_PATH, locale);
  return (
    metadata ?? {
      title: "How to Support Your Child's Learning in Grades 3–12 | GrowWise Bulletin",
      description: BULLETIN_DESCRIPTION,
    }
  );
}

export default async function BulletinLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();
  const graphSchema = buildBulletinPageGraphSchema(baseUrl, locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      <FounderSchema />
      {children}
    </>
  );
}
