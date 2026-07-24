import type { FooterData } from '@/components/layout/Footer/types';
import en from '../../public/api/mock/en/footer.json';

/** Bundled copy of public mock footer — used when the API fetch fails so the footer never stays in the pulse/blur loading shell. */
export function getFooterFallback(_locale: string): FooterData {
  return en as FooterData;
}
