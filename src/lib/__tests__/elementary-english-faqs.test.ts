import { ELEMENTARY_ENGLISH_VISIBLE_FAQS } from '@/lib/schema/elementary-english-faqs'

describe('elementary-english-faqs', () => {
  it('exposes seven visible FAQ entries for AEO', () => {
    expect(ELEMENTARY_ENGLISH_VISIBLE_FAQS).toHaveLength(7)
    for (const faq of ELEMENTARY_ENGLISH_VISIBLE_FAQS) {
      expect(faq.question.length).toBeGreaterThan(10)
      expect(faq.answer.length).toBeGreaterThan(40)
    }
  })
})
