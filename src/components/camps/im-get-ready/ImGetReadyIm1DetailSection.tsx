import { ImGetReadyDetailSection } from '@/components/camps/im-get-ready/ImGetReadyDetailSection';
import type { ImGetReadyIm1DetailCopy } from '@/lib/im-get-ready-seo-landing-copy';

type ImGetReadyIm1DetailSectionProps = {
  locale: string;
  detail: ImGetReadyIm1DetailCopy;
};

export function ImGetReadyIm1DetailSection({ locale, detail }: ImGetReadyIm1DetailSectionProps) {
  return <ImGetReadyDetailSection locale={locale} trackId="im1" detail={detail} />;
}
