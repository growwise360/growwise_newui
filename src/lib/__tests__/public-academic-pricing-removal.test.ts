import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const publicRenderers = [
  'src/app/[locale]/academic/page.tsx',
  'src/components/courses/EnglishHubPage.tsx',
  'src/components/courses/math-hub/ProgramOptionCards.tsx',
  'src/components/ElementaryMathPage.tsx',
  'src/components/MiddleSchoolMathPage.tsx',
  'src/components/HighSchoolMathPage.tsx',
  'src/components/ElementaryEnglishPage.tsx',
  'src/components/SATPage.tsx',
  'src/components/courses/MathProgramDetailsSection.tsx',
  'src/components/courses/MathTrialSection.tsx',
]

const priceSchemaLayouts = [
  'src/app/[locale]/academic/english/layout.tsx',
  'src/app/[locale]/academic/english/elementary/layout.tsx',
  'src/app/[locale]/academic/math/elementary/layout.tsx',
  'src/app/[locale]/academic/math/middle-school/layout.tsx',
  'src/app/[locale]/academic/math/high-school/layout.tsx',
]

describe('public academic pricing removal', () => {
  it.each(publicRenderers)('%s does not render a literal dollar price', (file) => {
    const source = fs.readFileSync(path.join(root, file), 'utf8')
    expect(source).not.toMatch(/\$[0-9]/)
  })

  it.each(priceSchemaLayouts)('%s does not publish price-bearing structured data', (file) => {
    const source = fs.readFileSync(path.join(root, file), 'utf8')
    expect(source).not.toContain('priceCurrency')
    expect(source).not.toMatch(/\bprice\s*:/)
  })

  it('keeps an indexable explanation of how families receive pricing', () => {
    const englishHub = fs.readFileSync(path.join(root, 'src/components/courses/EnglishHubPage.tsx'), 'utf8')
    const mathHub = fs.readFileSync(path.join(root, 'src/components/courses/math-hub/ProgramOptionCards.tsx'), 'utf8')
    expect(englishHub).toContain('current options and pricing before enrollment')
    expect(mathHub).toContain('current pricing before enrollment')
  })
})
