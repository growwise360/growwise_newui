import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/i18n/localeConfig';

export default function MlAiCodingRedirectPage() {
  redirect(`/${DEFAULT_LOCALE}/coding/ml-ai`);
}
