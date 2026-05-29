import fs from 'node:fs'
import path from 'node:path'

const UI_ROOT = path.join(__dirname, '..', '..')

function readComponent(relativePath: string): string {
  return fs.readFileSync(path.join(UI_ROOT, relativePath), 'utf8')
}

describe('bulletin resource cross-links', () => {
  it('links bulletin page to resources hub and featured guides', () => {
    const landingPage = readComponent('components/marketing/BulletinLandingPage.tsx')
    const copy = readComponent('data/bulletin-copy.ts')

    expect(landingPage).toContain('featuredGuides')
    expect(landingPage).toContain('hubHref')
    expect(copy).toContain('/resources/homework-independence')
    expect(copy).toContain('/resources/reading-fluency-vs-comprehension')
    expect(copy).toContain('/resources/careless-math-mistakes')
    expect(copy).toContain("RESOURCES_PATH")
  })

  it('links resource articles back to bulletin via shared CTA', () => {
    const articlePage = readComponent('components/resources/ResourceArticlePage.tsx')
    const carelessPage = readComponent('components/resources/CarelessMathMistakesPage.tsx')
    const resourcesHub = readComponent('components/resources/ResourcesHubPage.tsx')
    const ctaData = readComponent('data/resource-bulletin-cta.ts')

    expect(articlePage).toContain('ResourceBulletinCta')
    expect(carelessPage).toContain('ResourceBulletinCta')
    expect(resourcesHub).toContain('RESOURCE_BULLETIN_CTA')
    expect(resourcesHub).toContain('bulletinHref')
    expect(ctaData).toContain('BULLETIN_PATH')
  })
})
