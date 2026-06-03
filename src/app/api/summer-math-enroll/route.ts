import { NextResponse } from 'next/server';
import { CONTACT_INFO } from '@/lib/constants';
import { isBrevoTransactionalReady, sendBrevoTransactionalEmail } from '@/lib/brevo';
import { sendEmail, type SendEmailResult } from '@/lib/email';
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit';
import { clip, exceedsMax, FIELD_MAX, isValidEmailShape } from '@/lib/inputLimits';
import { honeypotTriggered, isOriginAllowed } from '@/lib/requestGuard';
import { splitFullName, syncHubSpotLeadIfConfigured } from '@/lib/hubspot/submitForm';

const MAX_BODY_BYTES = 8 * 1024;

function escapeHtmlEmail(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function deliverEnrollmentNotification(opts: {
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  const to = CONTACT_INFO.enrollmentEmail;
  const replyTo = { email: CONTACT_INFO.email, name: 'GrowWise' } as const;

  if (isBrevoTransactionalReady()) {
    const brevo = await sendBrevoTransactionalEmail({ to, ...opts, replyTo });
    if (brevo.success) return brevo;
    console.error('[summer-math-enroll] Brevo failed; SMTP fallback.', brevo.error);
  }

  return sendEmail({ to, ...opts, replyTo: CONTACT_INFO.email });
}

export async function POST(request: Request) {
  try {
    if (!isAllowed('enroll', clientIpFrom(request))) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }
    if (!isOriginAllowed(request)) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 403 });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: 'Request too large' }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    if (honeypotTriggered(body)) {
      return NextResponse.json({ success: true });
    }

    const parentName = clip(String(body.parentName ?? ''), FIELD_MAX.name);
    const email = clip(String(body.email ?? ''), FIELD_MAX.email);
    const studentName = clip(String(body.studentName ?? ''), FIELD_MAX.name);
    const grade = clip(String(body.grade ?? ''), 32);
    const subject = clip(String(body.subject ?? ''), 120);
    const schedule = clip(String(body.schedule ?? ''), 64);
    const courseId = clip(String(body.courseId ?? ''), 64);

    if (
      !parentName ||
      !email ||
      !studentName ||
      !grade ||
      !subject ||
      !schedule ||
      exceedsMax(parentName, FIELD_MAX.name) ||
      exceedsMax(email, FIELD_MAX.email) ||
      exceedsMax(studentName, FIELD_MAX.name)
    ) {
      return NextResponse.json({ success: false, error: 'Please complete all fields.' }, { status: 400 });
    }

    if (!isValidEmailShape(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email.' }, { status: 400 });
    }

    const ip = clientIpFrom(request);
    const submitted = new Date().toLocaleString();

    const text = [
      'High School Summer Intensive enrollment request',
      '',
      `Parent: ${parentName}`,
      `Email: ${email}`,
      `Student: ${studentName}`,
      `Grade: ${grade}`,
      `Course: ${subject}`,
      `Course ID: ${courseId}`,
      `Schedule: ${schedule}`,
      `Submitted: ${submitted}`,
      `IP: ${ip}`,
    ].join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1F396D;">High School Summer Intensive Enrollment</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>Parent:</strong> ${escapeHtmlEmail(parentName)}</p>
          <p><strong>Email:</strong> ${escapeHtmlEmail(email)}</p>
          <p><strong>Student:</strong> ${escapeHtmlEmail(studentName)}</p>
          <p><strong>Grade:</strong> ${escapeHtmlEmail(grade)}</p>
          <p><strong>Course:</strong> ${escapeHtmlEmail(subject)}</p>
          <p><strong>Course ID:</strong> ${escapeHtmlEmail(courseId)}</p>
          <p><strong>Schedule:</strong> ${escapeHtmlEmail(schedule)}</p>
          <p><strong>Submitted:</strong> ${escapeHtmlEmail(submitted)}</p>
          <p><strong>IP:</strong> ${escapeHtmlEmail(ip)}</p>
        </div>
        <p style="color: #666; font-size: 12px;">Source: high-school-summer-intensive</p>
      </div>
    `;

    const emailResult = await deliverEnrollmentNotification({
      subject: `HS Summer Intensive enroll: ${subject} — ${studentName}`.slice(0, 998),
      html,
      text,
    });

    if (!emailResult.success) {
      console.error('[summer-math-enroll] Email delivery failed:', emailResult.error);
      return NextResponse.json(
        { success: false, error: 'Unable to submit right now. Please call us or try again.' },
        { status: 503 },
      );
    }

    const { firstname, lastname } = splitFullName(parentName);
    const hubspotMessage = [
      `HS Summer Intensive: ${subject}`,
      `Schedule: ${schedule}`,
      `Student: ${studentName}`,
      `Grade: ${grade}`,
      courseId ? `Course ID: ${courseId}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    await syncHubSpotLeadIfConfigured(
      [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname },
        { name: 'email', value: email },
        { name: 'message', value: hubspotMessage },
      ],
      {
        pageUri: request.headers.get('referer') ?? '/camps/high-school-summer-intensive-dublin-ca',
        pageName: 'High School Summer Intensive',
      },
      'summer-math-enroll',
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[summer-math-enroll]', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
