import { buildBulletinWelcomeEmail } from '@/lib/bulletin-welcome-email'

describe('bulletin-welcome-email', () => {
  it('builds subject and body with bulletin schedule and sample link', () => {
    const email = buildBulletinWelcomeEmail('https://growwiseschool.org')
    expect(email.subject).toBe('Welcome to the GrowWise Bulletin')
    expect(email.html).toContain('Tuesday')
    expect(email.html).toContain('careless-math-mistakes')
    expect(email.text).toContain('/contact')
    expect(email.html).toContain('Contact Anshika')
    expect(email.html).not.toContain('book-assessment')
  })
})
