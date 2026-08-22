import {
  ENGLISH_COURSE_MERGED_FAQ_JSONLD,
  ENGLISH_COURSE_VISIBLE_FAQS,
} from '@/lib/schema/course-hub-jsonld-faqs'

describe('english course FAQs', () => {
  it('keeps visible FAQs aligned with the current English programs', () => {
    const visibleText = ENGLISH_COURSE_VISIBLE_FAQS.map(
      (faq) => `${faq.question} ${faq.answer}`,
    ).join(' ')

    expect(visibleText).toContain('Contact GrowWise for the current schedule, availability, and pricing')
    expect(visibleText).toContain('English Mastery')
    expect(visibleText).toContain('separate creative writing program')
    expect(visibleText).not.toContain('$349')
    expect(visibleText).not.toContain('grades 3–12')
  })

  it('includes English FAQs in JSON-LD source', () => {
    const schemaText = ENGLISH_COURSE_MERGED_FAQ_JSONLD.map(
      (faq) => `${faq.question} ${faq.answer}`,
    ).join(' ')

    expect(schemaText).toContain('two separate English programs')
    expect(schemaText).toContain('Contact GrowWise for the current schedule, availability, and pricing')
  })
})
