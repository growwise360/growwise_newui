import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { MATH_HUB_COPY, MATH_HUB_PATH } from '@/lib/math-hub-copy';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { GeoCallout } from './math-hub/GeoCallout';
import { GradeBandCards } from './math-hub/GradeBandCards';
import { HowItWorksSteps } from './math-hub/HowItWorksSteps';
import { MathHubCtaBlock } from './math-hub/MathHubCtaBlock';
import { MathHubFaq } from './math-hub/MathHubFaq';
import { MathHubHero } from './math-hub/MathHubHero';
import { MathHubJtbdSelector } from './math-hub/MathHubJtbdSelector';
import { ProgramOptionCards } from './math-hub/ProgramOptionCards';
import { TrustMetrics } from './math-hub/TrustMetrics';
import { MathParentGuidesSection } from './MathParentGuidesSection';

type MathHubPageProps = {
  locale: string;
};

export function MathHubPage({ locale }: MathHubPageProps) {
  const { breadcrumb } = MATH_HUB_COPY;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Breadcrumbs
        noSchema
        items={[
          { name: 'Academic', url: absoluteSiteUrl('/academic', locale) },
          { name: breadcrumb.mathPrograms, url: absoluteSiteUrl(MATH_HUB_PATH, locale) },
        ]}
      />
      <main>
        <MathHubHero />
        <GradeBandCards locale={locale} />
        <MathHubJtbdSelector locale={locale} />
        <HowItWorksSteps />
        <ProgramOptionCards locale={locale} />
        <GeoCallout locale={locale} />
        <TrustMetrics />
        <MathParentGuidesSection locale={locale} pageId="hub" />
        <MathHubFaq />
        <MathHubCtaBlock locale={locale} />
      </main>
    </div>
  );
}
