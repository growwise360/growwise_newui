import type { ErrorPattern } from './patterns';

export type AwardTier = 'double_detective' | 'parent_detective' | 'self_aware' | 'keep_digging';

export type ParentPrediction =
  | 'negative_signs'
  | 'number_alignment'
  | 'order_of_operations'
  | 'decimal_placement'
  | 'fraction_comparison'
  | 'fraction_addition'
  | 'test_vs_class';

export const PREDICTION_OPTIONS: { value: ParentPrediction; label: string }[] = [
  { value: 'negative_signs',       label: 'Forgets negative signs' },
  { value: 'number_alignment',     label: 'Lines up numbers incorrectly' },
  { value: 'order_of_operations',  label: 'Solves left to right instead of following the correct order' },
  { value: 'decimal_placement',    label: 'Puts the decimal point in the wrong place' },
  { value: 'fraction_comparison',  label: 'Gets confused when comparing fractions' },
  { value: 'fraction_addition',    label: 'Adds fractions the wrong way' },
  { value: 'test_vs_class',        label: 'Understands in class but makes mistakes on tests' },
];

const PREDICTION_TO_DOMAINS: Record<string, string[]> = {
  negative_signs:      ['integers', 'negative_numbers'],
  number_alignment:    ['place_value', 'number_sense'],
  order_of_operations: ['algebra', 'operations'],
  decimal_placement:   ['place_value', 'number_sense'],
  fraction_comparison: ['fractions'],
  fraction_addition:   ['fractions'],
  test_vs_class:       [],
};

function predictionMatchesPatterns(prediction: string | string[], patterns: ErrorPattern[]): boolean {
  const values = Array.isArray(prediction) ? prediction : [prediction];
  if (values.length === 0 || (values.length === 1 && values[0] === 'not_sure')) return false;
  return values.some((v) => {
    if (v === 'not_sure') return false;
    const domains = PREDICTION_TO_DOMAINS[v] ?? [];
    return patterns.some((p) => domains.includes(p.domain));
  });
}

export function computeAward(
  confirmedPatterns: ErrorPattern[],
  studentPrediction: string,
  parentPrediction: string | string[],
): AwardTier {
  const studentCorrect = predictionMatchesPatterns(studentPrediction, confirmedPatterns);
  const parentCorrect = predictionMatchesPatterns(parentPrediction, confirmedPatterns);

  if (studentCorrect && parentCorrect) return 'double_detective';
  if (!studentCorrect && parentCorrect) return 'parent_detective';
  if (studentCorrect && !parentCorrect) return 'self_aware';
  return 'keep_digging';
}

export const PREDICTION_LABELS: Record<string, string> = {
  negative_signs:      'Forgets negative signs',
  number_alignment:    'Lines up numbers incorrectly',
  order_of_operations: 'Solves left to right instead of following the correct order',
  decimal_placement:   'Puts the decimal point in the wrong place',
  fraction_comparison: 'Gets confused when comparing fractions',
  fraction_addition:   'Adds fractions the wrong way',
  test_vs_class:       'Understands in class but makes mistakes on tests',
};
