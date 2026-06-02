import { CourseFAQ } from '@/components/seo/CourseFAQ';
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';

export function MathHubFaq() {
  const { faq } = MATH_HUB_COPY;

  return (
    <CourseFAQ
      faqs={[...faq.items]}
      title={faq.title}
      subtitle={faq.subtitle}
      includeStructuredData={false}
    />
  );
}
