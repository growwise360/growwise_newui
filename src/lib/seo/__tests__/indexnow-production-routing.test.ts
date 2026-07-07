import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const INDEXNOW_KEY_PATH = '/9bdcae9db63f4f39996f3ad38cc52d32.txt'

describe('IndexNow production routing', () => {
  it('allows the public key through dotted-path middleware protection', () => {
    const middleware = readFileSync(
      path.join(ROOT, 'src/middleware.ts'),
      'utf8',
    )
    expect(middleware).toContain(`'${INDEXNOW_KEY_PATH}'`)
  })

  it('keeps the sitemap index on the Vercel-safe internal route', () => {
    expect(
      existsSync(path.join(ROOT, 'src/app/sitemap-index.xml/route.ts')),
    ).toBe(true)
    expect(existsSync(path.join(ROOT, 'src/app/sitemap.xml/route.ts'))).toBe(
      false,
    )
  })

  it('rewrites the standard sitemap URL to the internal index route', () => {
    const config = readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8')
    expect(config).toContain(
      "{ source: '/sitemap.xml', destination: '/sitemap-index.xml' }",
    )
  })

  it('redirects the old Kumon comparison slug to the indexable math tutoring options article', () => {
    const middleware = readFileSync(
      path.join(ROOT, 'src/middleware.ts'),
      'utf8',
    )
    expect(middleware).toContain(
      "'/resources/kumon-vs-mathnasium-vs-private-tutor-dublin-ca'",
    )
    expect(middleware).toContain(
      "'/resources/math-tutoring-options-dublin-ca'",
    )
  })
})
