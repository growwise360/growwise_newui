import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_INFO } from '@/lib/constants';
import { isBrevoTransactionalReady, sendBrevoTransactionalEmail } from '@/lib/brevo';
import { sendEmail, type SendEmailResult } from '@/lib/email';
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit';
import { clip, exceedsMax, FIELD_MAX, isValidEmailShape } from '@/lib/inputLimits';
import { honeypotTriggered, isOriginAllowed } from '@/lib/requestGuard';
import { syncHubSpotLeadIfConfigured } from '@/lib/hubspot/submitForm';

const MAX_BODY_BYTES = 4 * 1024;

const ALLOWED_PAGE_CONTEXT_IDS = new Set([
  'default',
  'campsHub',
  'campsSummer',
  'campsAcademicSummer',
  'campsWinter',
  'campSlug',
  'assessment',
  'enroll',
  'contact',
  'courseTopic',
]);

function escapeHtmlEmail(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendGrowyEmailLeadNotification(opts: {
  email: string;
  pageUri: string;
  pageContextId: string;
  queuedMessage?: string;
  ip: string;
}): Promise<SendEmailResult> {
  const to = CONTACT_INFO.email;
  const safeEmail = escapeHtmlEmail(opts.email);
  const safePageUri = escapeHtmlEmail(opts.pageUri);
  const safeContext = escapeHtmlEmail(opts.pageContextId);
  const safeQueued = opts.queuedMessage ? escapeHtmlEmail(opts.queuedMessage) : '';
  const safeIp = escapeHtmlEmail(opts.ip);
  const submitted = escapeHtmlEmail(new Date().toLocaleString());

  const subject = `New Growy chat lead: ${opts.email}`.slice(0, 998);
  const text = [
    'New Growy chat email gate lead',
    '',
    `Email: ${opts.email}`,
    `Page: ${opts.pageUri || '(unknown)'}`,
    `Page context: ${opts.pageContextId}`,
    opts.queuedMessage ? `Queued first message: ${opts.queuedMessage}` : '',
    `Submitted: ${submitted}`,
    `IP: ${opts.ip}`,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1F396D;">New Growy Chat Lead</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Page:</strong> ${safePageUri || '(unknown)'}</p>
        <p><strong>Page context:</strong> ${safeContext}</p>
        ${safeQueued ? `<p><strong>Queued first message:</strong> ${safeQueued}</p>` : ''}
        <p><strong>Submitted:</strong> ${submitted}</p>
        <p><strong>IP:</strong> ${safeIp}</p>
      </div>
      <p style="color: #666; font-size: 12px;">Source: chatbot-email-gate</p>
    </div>
  `;

  const replyTo = { email: CONTACT_INFO.email, name: 'GrowWise' } as const;

  if (isBrevoTransactionalReady()) {
    const brevo = await sendBrevoTransactionalEmail({
      to,
      subject,
      html,
      text,
      replyTo,
    });
    if (brevo.success) return brevo;
  }

  return sendEmail({
    to,
    subject,
    html,
    text,
    replyTo: CONTACT_INFO.email,
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowed('contact', clientIpFrom(request))) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }

    if (!isOriginAllowed(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 403 });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, message: 'Request too large' }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
    }

    if (honeypotTriggered(body)) {
      return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }

    const email = clip(body.email, FIELD_MAX.email).toLowerCase();
    if (!email || !isValidEmailShape(email)) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 },
      );
    }

    const pageUri = clip(body.pageUri, FIELD_MAX.longText);
    const pageContextRaw = clip(body.pageContextId, FIELD_MAX.shortText) || 'default';
    const pageContextId = ALLOWED_PAGE_CONTEXT_IDS.has(pageContextRaw)
      ? pageContextRaw
      : 'default';
    const queuedMessage =
      typeof body.queuedMessage === 'string' && body.queuedMessage.trim()
        ? clip(body.queuedMessage, FIELD_MAX.longText)
        : undefined;

    if (
      exceedsMax(body.pageUri, FIELD_MAX.longText) ||
      (typeof body.queuedMessage === 'string' && exceedsMax(body.queuedMessage, FIELD_MAX.longText))
    ) {
      return NextResponse.json(
        { success: false, message: 'One or more fields are too long' },
        { status: 400 },
      );
    }

    const ip = clientIpFrom(request);
    const referer = request.headers.get('referer') ?? pageUri;

    const emailResult = await sendGrowyEmailLeadNotification({
      email,
      pageUri: referer,
      pageContextId,
      queuedMessage,
      ip,
    });

    if (!emailResult.success) {
      console.error('[chat/email-lead] notification failed:', emailResult.error);
      return NextResponse.json(
        { success: false, message: 'Could not record lead. Please try again.' },
        { status: 502 },
      );
    }

    const messageBlock = [
      'Growy chat email gate — conversation unlocked.',
      pageContextId !== 'default' ? `Page context: ${pageContextId}` : '',
      referer ? `Page: ${referer}` : '',
      queuedMessage ? `Queued first message: ${queuedMessage}` : '',
      'Source: chatbot-email-gate',
    ]
      .filter(Boolean)
      .join('\n');

    await syncHubSpotLeadIfConfigured(
      [
        { name: 'firstname', value: 'Growy' },
        { name: 'lastname', value: 'Chat lead' },
        { name: 'email', value: email },
        { name: 'message', value: messageBlock },
      ],
      {
        pageUri: referer,
        pageName: 'Growy chat email gate',
      },
      'chat/email-lead',
    );

    console.log('[chat/email-lead] ok', {
      emailDomain: email.slice(email.indexOf('@') + 1),
      pageContextId,
      hasQueuedMessage: Boolean(queuedMessage),
      messageId: emailResult.messageId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[chat/email-lead] POST failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
