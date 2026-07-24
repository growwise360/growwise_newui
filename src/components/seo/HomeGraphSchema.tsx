import { HOME_GRAPH_JSON_LD } from '@/lib/seo/homeGraphJsonLd';

/**
 * Homepage @graph JSON-LD: EducationalOrganization + FAQPage (single FAQ block).
 * FAQ copy comes from HOME_VISIBLE_FAQS via homeGraphJsonLd.ts. Rendered only on (home)/layout.tsx.
 */
export default function HomeGraphSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_GRAPH_JSON_LD) }}
    />
  );
}
