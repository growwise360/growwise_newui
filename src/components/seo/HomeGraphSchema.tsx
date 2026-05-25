import { HOME_GRAPH_JSON_LD } from '@/lib/seo/homeGraphJsonLd';

/**
 * Homepage @graph JSON-LD: EducationalOrganization + FAQPage (SEO block).
 * Rendered only on the homepage via (home)/layout.tsx.
 */
export default function HomeGraphSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_GRAPH_JSON_LD) }}
    />
  );
}
