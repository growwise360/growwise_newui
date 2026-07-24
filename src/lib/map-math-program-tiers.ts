import type { MathHubProgramOption } from '@/lib/math-hub-copy';
import type { MathProgramPricingTier } from '@/components/courses/MathProgramDetailsSection';

export function mapHubOptionsToPricingTiers(
  options: readonly MathHubProgramOption[],
): readonly MathProgramPricingTier[] {
  return options.map((option) => ({
    name: option.name,
    schedule: option.schedule,
    price: option.price,
    subtitle: option.subtitle,
    bestFor: option.bestFor,
    featured: option.featured,
  }));
}
