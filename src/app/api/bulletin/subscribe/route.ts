import { NextResponse } from 'next/server';
import { FOUNDER_COPY } from '@/data/founder-copy';
import {
  addBulletinContactToBrevoList,
  isBrevoTransactionalReady,
  sendBrevoTransactionalEmail,
} from '@/lib/brevo';
import { buildBulletinWelcomeEmail } from '@/lib/bulletin-welcome-email';
import { sendEmail, type SendEmailResult } from '@/lib/email';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BULLETIN_REPLY_TO = { email: FOUNDER_COPY.email, name: FOUNDER_COPY.name } as const;
const BREVO_RETRY_DELAY_MS = 450;

export const maxDuration = 60;
export const runtime = 'nodejs';

async function sendBulletinWelcomeWithFallback(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  if (isBrevoTransactionalReady()) {
    let lastErr: string | undefined;
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt > 0) {
        await new Promise((r) => setTimeout(r, BREVO_RETRY_DELAY_MS));
      }
      const brevo = await sendBrevoTransactionalEmail({
        ...opts,
        replyTo: BULLETIN_REPLY_TO,
      });
      if (brevo.success) return brevo;
      lastErr = brevo.error;
      console.error(
        `[bulletin/subscribe] Brevo welcome email attempt ${attempt + 1}/2 failed:`,
        brevo.error,
      );
    }
    console.error('[bulletin/subscribe] Brevo failed after retry; SMTP fallback.', lastErr);
  } else {
    console.warn(
      '[bulletin/subscribe] Brevo not configured (set BREVO_API_KEY + BREVO_SENDER_EMAIL); using SMTP only if configured.',
    );
  }

  return sendEmail({
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: BULLETIN_REPLY_TO.email,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; recaptchaToken?: string };

    const emailRaw = typeof body.email === 'string' ? body.email.trim() : '';
    if (!emailRaw || !EMAIL_REGEX.test(emailRaw)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const email = emailRaw.toLowerCase();
    const siteUrl = getCanonicalSiteUrl();
    const welcome = buildBulletinWelcomeEmail(siteUrl);

    const welcomeResult = await sendBulletinWelcomeWithFallback({
      to: email,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
    });

    if (!welcomeResult.success) {
      const brevoReady = isBrevoTransactionalReady();
      if (!brevoReady && process.env.NODE_ENV === 'development') {
        console.warn('[bulletin/subscribe] Welcome email not sent in dev (no Brevo/SMTP); continuing.');
      } else {
        console.error('[bulletin/subscribe] Welcome email failed:', welcomeResult.error);
        return NextResponse.json(
          {
            success: false,
            error: `We could not send your welcome email. Please try again or email ${FOUNDER_COPY.email}.`,
          },
          { status: 503 },
        );
      }
    }

    const listResult = await addBulletinContactToBrevoList(email);

    if (!listResult.success) {
      const isConfigMissing =
        listResult.error === 'BREVO_LIST_BULLETIN not set' || listResult.error === 'Brevo not configured';
      if (isConfigMissing && process.env.NODE_ENV === 'development') {
        console.warn('[bulletin/subscribe] Brevo list not configured in dev; welcome email may have sent.');
        return NextResponse.json({
          success: true,
          devMode: true,
          message: 'Check your inbox for a welcome note from GrowWise.',
        });
      }
      console.warn('[bulletin/subscribe] Brevo list add failed (welcome email may have sent).', listResult.error);
      return NextResponse.json(
        { success: false, error: 'Unable to complete your subscription. Please try again later.' },
        { status: 503 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Check your inbox for a welcome note from GrowWise.',
    });
  } catch (err) {
    console.error('[bulletin/subscribe] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
