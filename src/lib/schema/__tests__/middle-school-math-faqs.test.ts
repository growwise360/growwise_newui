import { MIDDLE_SCHOOL_MATH_VISIBLE_FAQS } from '@/lib/schema/middle-school-math-faqs'

describe('MIDDLE_SCHOOL_MATH_VISIBLE_FAQS', () => {
  it('has 9 FAQs for accordion and JSON-LD', () => {
    expect(MIDDLE_SCHOOL_MATH_VISIBLE_FAQS).toHaveLength(9)
  })

  it('includes standard vs accelerated track question', () => {
    const q = MIDDLE_SCHOOL_MATH_VISIBLE_FAQS.map((f) => f.question)
    expect(q).toContain('What is the difference between the standard and accelerated track?')
    expect(q).toContain('Do middle school students get free Sunday sessions?')
  })

  it('each FAQ has non-empty question and answer', () => {
    for (const faq of MIDDLE_SCHOOL_MATH_VISIBLE_FAQS) {
      expect(faq.question.length).toBeGreaterThan(0)
      expect(faq.answer.length).toBeGreaterThan(0)
    }
  })
})
