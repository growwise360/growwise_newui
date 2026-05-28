import { FOUNDER_COPY, FOUNDER_ABOUT_STORY_PARAGRAPHS } from '@/data/founder-copy'

describe('founder-copy', () => {
  it('has three story paragraphs and a quote aligned with the closing belief', () => {
    expect(FOUNDER_COPY.story).toHaveLength(3)
    expect(FOUNDER_COPY.story[0]).toContain('2009')
    expect(FOUNDER_COPY.story[1]).toContain('check out')
    expect(FOUNDER_COPY.story[2]).toContain('Not a tutoring center')
    expect(FOUNDER_COPY.quote).toBe('Teach a child how to learn and everything changes.')
  })

  it('uses learning lab framing in schema and short bio', () => {
    expect(FOUNDER_COPY.shortBio).toContain('learning lab')
    expect(FOUNDER_COPY.expertise).toEqual(['English', 'Coding', 'AI'])
    expect(FOUNDER_COPY.schemaDescription).toContain('learning lab')
    expect(FOUNDER_COPY.schemaDescription).not.toContain('tutoring center')
  })

  it('exports about story paragraphs aligned with founder story', () => {
    expect(FOUNDER_ABOUT_STORY_PARAGRAPHS).toHaveLength(3)
    expect(FOUNDER_ABOUT_STORY_PARAGRAPHS).toEqual([...FOUNDER_COPY.story])
  })
})
