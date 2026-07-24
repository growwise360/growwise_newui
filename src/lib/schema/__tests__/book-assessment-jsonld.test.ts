import { readFileSync } from 'fs'
import { join } from 'path'

import { BOOK_ASSESSMENT_FAQ_JSONLD } from '@/lib/schema/course-hub-jsonld-faqs'

describe('book assessment structured data copy', () => {
  it('uses current assessment offer names and prices in layout schema', () => {
    const source = readFileSync(
      join(process.cwd(), 'src', 'app', '[locale]', 'book-assessment', 'layout.tsx'),
      'utf8',
    )

    expect(source).toContain("name: 'Free 30-Minute Assessment'")
    expect(source).toContain("name: 'Full Diagnostic'")
    expect(source).toContain("price: '0'")
    expect(source).toContain("price: '49'")
    expect(source).not.toContain('Free 20-Minute Assessment')
    expect(source).not.toContain('60-Minute Full Gap Diagnostic')
  })

  it('keeps FAQ schema aligned with visible assessment options', () => {
    const serialized = JSON.stringify(BOOK_ASSESSMENT_FAQ_JSONLD)

    expect(serialized).toContain('free 30-minute assessment')
    expect(serialized).toContain('Grades 1-12')
    expect(serialized).toContain('brief written next-step plan')
    expect(serialized).toContain('60-minute Full Diagnostic')
    expect(serialized).not.toContain('20-minute')
    expect(serialized).not.toContain('fit check')
    expect(serialized).not.toContain('Full Gap Diagnostic')
  })
})
