import type { ParentPrediction } from '@/lib/award'
import { PREDICTION_LABELS, PREDICTION_OPTIONS } from '@/lib/award'

export type SelfCheckGapFaq = {
  id: ParentPrediction
  label: string
  whatItMeans: string
  askYourChild: string
  correct: string
  redFlag: string
  downstream: string
  followUp?: string
  slipVsBugTest?: string
}

export const FRACTION_GAP_IDS: ParentPrediction[] = ['fraction_comparison', 'fraction_addition']

export const SELF_CHECK_GAP_FAQS: Record<ParentPrediction, SelfCheckGapFaq> = {
  negative_signs: {
    id: 'negative_signs',
    label: PREDICTION_LABELS.negative_signs,
    whatItMeans:
      "There's a difference between occasionally dropping a sign (a slip — normal under pressure) and consistently getting signs wrong in the same way across similar problems (a bug — a pattern that won't fix itself). This guide helps you tell which one it is.",
    askYourChild:
      'Write this on paper: −3 × −4 = ?\nThen write: 5 − (−3) = ?\nAsk them to solve both without a calculator.',
    correct:
      'First: positive 12. Second: 8.\nChild can explain: "Two negatives multiply to a positive" and "minus a negative is the same as adding."',
    redFlag:
      'First answer: −12. Second answer: 2.\nChild says "two negatives make a negative" (applying the wrong rule) or treats −(−3) as just −3.',
    downstream:
      "If the sign errors are consistent and your child is confident in the wrong answer, this is a bug — a misapplied rule, not carelessness. Sign errors of this type show up in every algebra topic: simplifying expressions, solving equations, graphing lines, and quadratics. They don't resolve on their own because the rule feels logical to the child.",
    slipVsBugTest:
      "Ask the same question three days apart. If they make the same error both times, it's a bug.",
  },
  number_alignment: {
    id: 'number_alignment',
    label: PREDICTION_LABELS.number_alignment,
    whatItMeans:
      "When a child misaligns digits in addition or multiplication, it usually signals a place value gap — they're treating numbers as sequences of separate digits rather than as quantities with positional meaning. It's not a neatness problem. It's a foundational concept that underpins almost all arithmetic.",
    askYourChild: 'Write on paper: 25 × 34 = ? — ask them to solve it in columns and show every step.',
    correct:
      'Two rows of partial products: 100 (25×4), then 750 (25×30) — with the second row shifted one place left. Final answer: 850.',
    redFlag:
      'Second partial product (25×3 = 75) written directly under the first row without shifting left. Final answer: 175.\nChild treats the "3" in 34 as just 3, not 30.',
    downstream:
      "This place value gap causes errors in long division, decimal multiplication, and eventually polynomial multiplication in algebra. A child who doesn't understand why we shift the partial product will also struggle to understand why we \"move the decimal point\" in multiplication — because both are the same underlying concept.",
    followUp:
      'Ask "Why do you write the second row one space over?" A child who truly understands will say something about tens. A child with the gap will say "because that\'s the rule" or look uncertain.',
  },
  order_of_operations: {
    id: 'order_of_operations',
    label: PREDICTION_LABELS.order_of_operations,
    whatItMeans:
      "Order of operations (PEMDAS/BODMAS) is one of the most frequently memorized but least understood rules in math. A child who solves strictly left to right hasn't internalized that the order exists to ensure one unambiguous answer — they're treating math as a sequence of steps rather than a structured expression.",
    askYourChild: 'Write on paper: 2 + 3 × 4 = ?',
    correct: '14. Child multiplies first (3×4=12), then adds 2. Can explain: "Multiplication comes before addition."',
    redFlag: '20. Child adds first (2+3=5), then multiplies by 4. Solves purely left to right.',
    downstream:
      'Left-to-right solving causes systematic wrong answers across algebra, especially in expressions with multiple terms, evaluating functions, and any problem with exponents or grouping. Calculators that follow strict left-to-right logic can reinforce this bug if a child uses them to "check" answers.',
    followUp:
      'Second question (harder): 10 − 2² + (3 × 1) = ?\nCorrect: 9 (parentheses first → 3, exponent → 4, then 10−4+3=9).\nRed flag: any answer that doesn\'t start with parentheses and exponent, or that handles subtraction before the exponent.',
  },
  decimal_placement: {
    id: 'decimal_placement',
    label: PREDICTION_LABELS.decimal_placement,
    whatItMeans:
      'Decimal placement errors are almost never random. They follow one of two patterns: the child either doesn\'t track the total number of decimal places in multiplication, or they have a "more digits = bigger number" misconception when reading decimals. Both are high-risk patterns that affect measurement, money, and science throughout school.',
    askYourChild:
      'Q1 (comparison): "Which is bigger — 3.7 or 3.215?"\nQ2 (multiplication): Write on paper: 0.4 × 0.3 = ?',
    correct:
      'Q1: 3.7 — child explains that tenths are larger than thousandths, or that 3.700 > 3.215.\nQ2: 0.12 — two decimal places total (one from each factor).',
    redFlag:
      'Q1: 3.215, "because it has more digits after the decimal" or "because 215 is bigger than 7."\nQ2: 1.2 or 12 — child didn\'t count decimal places in the result, or applied "multiplication makes bigger" thinking.',
    downstream:
      'The comparison misconception (more digits = bigger) is documented as one of the most persistent errors in Grades 3–12 math. It directly affects percent calculations, scientific notation, unit conversions, and data interpretation. The multiplication error affects chemistry, physics, and any applied math. Neither resolves without explicit teaching — practice alone reinforces the wrong pattern.',
  },
  fraction_comparison: {
    id: 'fraction_comparison',
    label: PREDICTION_LABELS.fraction_comparison,
    whatItMeans:
      'This is the most common and most consequential fraction misconception. It forms in Grade 3 and, if not corrected, directly blocks ratios, proportions, and pre-algebra in Grades 6–8. The confusion comes from applying whole-number thinking to fractions — bigger number means bigger value — which is true for whole numbers and completely wrong for denominators.',
    askYourChild: '"Which is bigger — one-fifth or one-eighth? How do you know?"',
    correct:
      'One-fifth. Explanation: "If you cut something into 5 pieces, each piece is bigger than if you cut it into 8 pieces."',
    redFlag:
      '"One-eighth, because 8 is bigger than 5." Or a correct answer with the wrong reason: "one-fifth, because 1 and 5 are smaller numbers."',
    downstream:
      'Fraction comparison is the entry point for rational number fluency. Students who can\'t reliably compare fractions cannot reliably order them, add them, or work with them in proportion problems. Research documents this misconception appearing in students through high school — and even in some adults. It requires direct conceptual correction, not just more practice.',
    followUp:
      '"Is 3/4 bigger or smaller than 5/8?"\nCorrect: 3/4 (common denominator or reasoning: 3/4 = 6/8 > 5/8).\nRed flag: 5/8, "because 5 and 8 are bigger numbers."',
  },
  fraction_addition: {
    id: 'fraction_addition',
    label: PREDICTION_LABELS.fraction_addition,
    whatItMeans:
      'This is the most documented fraction bug in math education. The child applies whole-number addition logic to fractions — adding tops and adding bottoms — which produces a consistent, confident wrong answer. The insidious part: students who do this often feel they\'ve done it correctly. It\'s a systematic bug, not a careless mistake.',
    askYourChild: 'Write on paper: 1/2 + 1/3 = ?',
    correct:
      '5/6. Child found a common denominator (6), converted both fractions, then added numerators only.',
    redFlag:
      '2/5. Child added 1+1=2 (numerators) and 2+3=5 (denominators). Answer feels logical to them.',
    downstream:
      'This bug blocks all algebraic fraction work, rational expressions in Algebra 2, and any application involving rates, ratios, or measurement. It is almost always persistent — students repeat it consistently on tests because the procedure feels right to them. It requires explicit reteaching of what a fraction denominator actually means (part size, not a count), not just the correct algorithm.',
    followUp:
      'Write: 2/4 + 1/4 = ?\nCorrect: 3/4. Same denominator — just add numerators.\nWatch for: child who gets this right but did the previous one wrong may not understand why — they only recognize same-denominator cases as a separate rule.',
  },
  test_vs_class: {
    id: 'test_vs_class',
    label: PREDICTION_LABELS.test_vs_class,
    whatItMeans:
      "This is the most misread signal parents encounter. It feels like test anxiety or nerves — and sometimes it is. But more often, it indicates that what looked like understanding in class was actually recognition: the child could follow along with the teacher's example, but hadn't built the independent retrieval pathway needed to reproduce it under test conditions.\n\nUnderstanding and being able to reproduce are different cognitive processes. Class performance measures the first. Tests measure the second.",
    askYourChild:
      'Pick a topic they recently covered in class. Write one problem from that topic on paper. No hints. No examples first. Just the problem.',
    correct:
      'Genuine understanding: Child can start the problem without prompting, applies the right approach, and can explain their first step before they solve it.',
    redFlag:
      'Recognition, not understanding: Child stares at the problem, says "I know this," but can\'t start without a hint or an example to look at. Once shown a similar example, they can copy the method — but that\'s recognition, not retrieval.',
    downstream:
      'Recognition-based learning works until material builds on itself and tests mix problem types. By Grade 7–8, tests stop being "here are 10 problems of the type we just practiced" and start being "here are problems from multiple topics — figure out which approach to use." That\'s the wall where recognition breaks down completely.\n\nThe fix is not more studying or more practice of the same problems. It\'s interleaved practice — mixing problem types so the child has to identify the method, not just execute it. This requires a structural change in how they study, not just more time spent.',
  },
}

/** One-line summaries for the Detective Challenge list on the blog. */
export const DETECTIVE_CHALLENGE_SUMMARIES: Record<ParentPrediction, string> = {
  negative_signs: 'Slip vs. bug — same sign error twice means a pattern.',
  number_alignment: 'Place value — partial products must shift left.',
  order_of_operations: 'PEMDAS — multiply before add, not left to right.',
  decimal_placement: 'More digits after the decimal does not always mean bigger.',
  fraction_comparison: 'Bigger denominator can mean smaller pieces.',
  fraction_addition: 'Adding tops and bottoms (e.g. 2/5) is a systematic bug.',
  test_vs_class: 'Class follow-along vs. test retrieval are different skills.',
}

export function getGapFaq(id: ParentPrediction): SelfCheckGapFaq {
  return SELF_CHECK_GAP_FAQS[id]
}

/** Ordered list matching SelfCheckForm checkbox order. */
export const DETECTIVE_CHALLENGE_OPTIONS = PREDICTION_OPTIONS
