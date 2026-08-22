/**
 * GrowWise Bulletin welcome email — sent on POST /api/bulletin/subscribe.
 */

import { BULLETIN_PATH } from '@/data/bulletin-copy'
import { CARELESS_MATH_MISTAKES_PATH } from '@/data/resources/careless-math-mistakes-copy'
import { FOUNDER_COPY } from '@/data/founder-copy'

export const BULLETIN_EMAIL_UTM = {
  source: 'email',
  medium: 'email',
  campaign: 'growwise_bulletin_welcome',
} as const

function appendBulletinUtm(absoluteUrl: string, content: string): string {
  let u: URL
  try {
    u = new URL(absoluteUrl)
  } catch {
    return absoluteUrl
  }
  u.searchParams.set('utm_source', BULLETIN_EMAIL_UTM.source)
  u.searchParams.set('utm_medium', BULLETIN_EMAIL_UTM.medium)
  u.searchParams.set('utm_campaign', BULLETIN_EMAIL_UTM.campaign)
  u.searchParams.set('utm_content', content)
  return u.toString()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export interface BulletinWelcomeEmailContent {
  subject: string
  html: string
  text: string
}

export function buildBulletinWelcomeEmail(siteUrl: string): BulletinWelcomeEmailContent {
  const base = siteUrl.replace(/\/$/, '')
  const sampleUrl = appendBulletinUtm(`${base}${CARELESS_MATH_MISTAKES_PATH}`, 'sample_article')
  const contactUrl = appendBulletinUtm(`${base}/contact`, 'contact_anshika')
  const bulletinUrl = appendBulletinUtm(`${base}${BULLETIN_PATH}`, 'bulletin_page')

  const subject = 'Welcome to the GrowWise Bulletin'

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.65;">
      <p style="margin: 0 0 16px;">Hi there,</p>
      <p style="margin: 0 0 20px;">You're subscribed to the <strong>GrowWise Bulletin</strong> — free weekly insights for Grades 3–12 parents from our classrooms.</p>
      <p style="margin: 0 0 12px; font-weight: bold; color: #1F396D;">What to expect (3× per week):</p>
      <p style="margin: 0 0 8px;"><strong>Tuesday</strong> — The Parent Insight: one practical lesson from our classrooms.</p>
      <p style="margin: 0 0 8px;"><strong>Thursday</strong> — The Student Spotlight: a real progress story, no fluff.</p>
      <p style="margin: 0 0 24px;"><strong>Saturday</strong> — The Weekly Bulletin: open seats, workshops, and early access.</p>
      <p style="margin: 0 0 12px;">While you wait for Tuesday, here's a recent Parent Insight parents forwarded to each other:</p>
      <p style="margin: 0 0 24px;">
        <a href="${escapeHtml(sampleUrl)}" style="color: #1F396D; font-weight: bold;">Why your child keeps making the same math mistake →</a>
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="margin: 0 0 16px;">Want a live conversation about your child? <a href="${escapeHtml(contactUrl)}" style="color: #F16112; font-weight: bold;">Contact Anshika →</a></p>
      <p style="margin: 0 0 8px;">See you in your inbox,</p>
      <p style="margin: 0;">
        ${escapeHtml(FOUNDER_COPY.name)}<br />
        ${escapeHtml(FOUNDER_COPY.role)}<br />
        <a href="${escapeHtml(bulletinUrl)}" style="color: #1F396D;">growwiseschool.org/bulletin</a>
      </p>
    </div>
  `.trim()

  const text = [
    'Hi there,',
    '',
    "You're subscribed to the GrowWise Bulletin — free weekly insights for Grades 3–12 parents from our classrooms.",
    '',
    'What to expect (3× per week):',
    'Tuesday — The Parent Insight: one practical lesson from our classrooms.',
    'Thursday — The Student Spotlight: a real progress story, no fluff.',
    'Saturday — The Weekly Bulletin: open seats, workshops, and early access.',
    '',
    'While you wait for Tuesday, read a recent Parent Insight:',
    sampleUrl,
    '',
    `Contact Anshika: ${contactUrl}`,
    '',
    'See you in your inbox,',
    FOUNDER_COPY.name,
    FOUNDER_COPY.role,
    bulletinUrl,
  ].join('\n')

  return { subject, html, text }
}
