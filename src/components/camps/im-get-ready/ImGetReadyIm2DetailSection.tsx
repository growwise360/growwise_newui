import { ImGetReadyDetailSection } from '@/components/camps/im-get-ready/ImGetReadyDetailSection';
import type { ImGetReadyIm2DetailCopy } from '@/lib/im-get-ready-seo-landing-copy';

type ImGetReadyIm2DetailSectionProps = {
  locale: string;
  detail: ImGetReadyIm2DetailCopy;
};

export function ImGetReadyIm2DetailSection({ locale, detail }: ImGetReadyIm2DetailSectionProps) {
  return <ImGetReadyDetailSection locale={locale} trackId="im2" detail={detail} />;
}
