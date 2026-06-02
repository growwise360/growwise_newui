import type { Metadata } from 'next';
import FAQSchema from '@/components/schema/FAQSchema';
import '@/components/camps/academic-summer-programs-page.global.css';
import type { AcademicSeoLandingPageId } from '@/lib/academic-seo-landing-config';
import {
  ACADEMIC_SEO_LANDING_PAGES,
  getAcademicSeoLandingPageConfig,
} from '@/lib/academic-seo-landing-config';
import { getAcademicSeoLandingCopy } from '@/lib/academic-seo-landing-copy';
import {
  getIm1GetReadySeoLandingCopy,
  getIm2GetReadySeoLandingCopy,
  getImGetReadySeoLandingCopy,
} from '@/lib/im-get-ready-seo-landing-copy';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import type { AcademicSeoFaqItem } from '@/lib/schema/academic-seo-landing-jsonld';
import {
  buildAcademicSeoLandingCourseSchema,
  buildAcademicSeoLandingWebPageName,
} from '@/lib/schema/academic-seo-landing-jsonld';
import { generateBreadcrumbSchema, generateWebPageJsonLd } from '@/lib/seo/structuredData';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

export function createAcademicSeoLandingGenerateMetadata(pageId: AcademicSeoLandingPageId) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const { path } = getAcademicSeoLandingPageConfig(pageId);
    const metadata = generateMetadataFromPath(path, locale);
    return metadata ?? {};
  };
}

function getLandingSchemaCopy(pageId: AcademicSeoLandingPageId): {
  description: string;
  faqs: readonly AcademicSeoFaqItem[];
} {
  switch (pageId) {
    case 'imGetReady': {
      const copy = getImGetReadySeoLandingCopy();
      return { description: copy.hero.subheadline, faqs: copy.faq };
    }
    case 'im1GetReady': {
      const copy = getIm1GetReadySeoLandingCopy();
      return { description: copy.hero.subheadline, faqs: copy.faq };
    }
    case 'im2GetReady': {
      const copy = getIm2GetReadySeoLandingCopy();
      return { description: copy.hero.subheadline, faqs: copy.faq };
    }
    default: {
      const copy = getAcademicSeoLandingCopy(pageId);
      return { description: copy.hero.subtext, faqs: copy.faq };
    }
  }
}

export function AcademicSeoLandingLayout({
  pageId,
  children,
  locale,
}: {
  pageId: AcademicSeoLandingPageId;
  children: React.ReactNode;
  locale: string;
}) {
  const config = ACADEMIC_SEO_LANDING_PAGES[pageId];
  const { description, faqs } = getLandingSchemaCopy(pageId);
  const baseUrl = getCanonicalSiteUrl();
  const pageUrl = absoluteSiteUrl(config.path, locale, baseUrl);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Camps', url: absoluteSiteUrl('/camps', locale, baseUrl) },
    { name: config.breadcrumbLabel, url: pageUrl },
  ]);

  const webPageSchema = generateWebPageJsonLd({
    name: `${buildAcademicSeoLandingWebPageName(pageId)} | GrowWise`,
    description,
    url: pageUrl,
  });

  const courseSchema = buildAcademicSeoLandingCourseSchema(pageId);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQSchema faqs={[...faqs]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  );
}
