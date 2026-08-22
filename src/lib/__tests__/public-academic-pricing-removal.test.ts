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

  it('retains the explicitly approved $45 trial-session price and booking path', () => {
    const trial = fs.readFileSync(path.join(root, 'src/components/courses/MathTrialSection.tsx'), 'utf8')
    expect(trial).toContain('Book a trial session — $45')
    expect(trial).toContain("publicPath(config.enrollPath, locale)")
    expect(trial).not.toMatch(/\$[0-9]+\/(?:mo|month)/i)
  })

  it('resets the information form whenever it is reopened', () => {
    const modal = fs.readFileSync(path.join(root, 'src/components/ProgramRecommendationModal.tsx'), 'utf8')
    expect(modal).toContain("setStep(0)")
    expect(modal).toContain("setStatus('idle')")
    expect(modal).toContain("setError('')")
  })

  it('requires and validates a phone number in the information form and API', () => {
    const modal = fs.readFileSync(path.join(root, 'src/components/ProgramRecommendationModal.tsx'), 'utf8')
    const route = fs.readFileSync(path.join(root, 'src/app/api/program-recommendation/route.ts'), 'utf8')
    expect(modal).toContain('id="recommendation-phone"')
    expect(modal).toContain('maxLength={FIELD_MAX.phone}')
    expect(modal).toContain('validatePhoneSimple(phone)')
    expect(route).toContain('const phone = clip(body.phone, FIELD_MAX.phone)')
    expect(route).toContain('!phoneValidation.isValid')
    expect(route).toContain("{ name: 'phone', value: phone }")
  })

  it('requires a parent or guardian name in the information form and API', () => {
    const modal = fs.readFileSync(path.join(root, 'src/components/ProgramRecommendationModal.tsx'), 'utf8')
    const route = fs.readFileSync(path.join(root, 'src/app/api/program-recommendation/route.ts'), 'utf8')
    expect(modal).toContain('Parent or guardian name *')
    expect(modal).toContain("if (!parentName.trim())")
    expect(modal).toContain('className="mt-2 min-h-11" required />')
    expect(route).toContain('if (!parentName || !isValidEmailShape(email)')
    expect(route).toContain("{ name: 'firstname', value: parentName }")
  })

  it('does not report success unless CRM or notification capture succeeds', () => {
    const route = fs.readFileSync(path.join(root, 'src/app/api/program-recommendation/route.ts'), 'utf8')
    expect(route).toContain('if (!crmCaptured && !notificationDelivered)')
    expect(route).toContain('We could not save your request')
  })
})
