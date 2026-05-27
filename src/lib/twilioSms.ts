const SMS_TEMPLATES = {
  contact: (name: string) =>
    `GrowWise School: Got your inquiry ${name}! We'll reach out within 1 business day. Call: (925) 456-4606 or visit https://www.growwiseschool.org. Reply STOP to opt out.`,
  assessment: (name: string) =>
    `GrowWise School: Hi ${name}, your free assessment request is confirmed! We'll contact you within 24 hrs to schedule. Call (925) 456-4606. Reply STOP to opt out.`,
  enrollment: (name: string) =>
    `GrowWise School: Hi ${name}, your enrollment inquiry is received! Our team will reach out within 1 business day. Visit: https://www.growwiseschool.org. Reply STOP to opt out.`,
  workshop: (name: string, eventTitle?: string) =>
    `GrowWise School: Hi ${name}, your spot for ${eventTitle || 'our upcoming event'} is confirmed! Check your email for details. Reply STOP to opt out.`,
};

function normalizeToE164(phone: string): string | null {
  if (!phone) return null;
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned) return null;
  if (cleaned.startsWith('+1') && cleaned.length === 12) return cleaned;
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (cleaned.length === 11 && cleaned.startsWith('1')) return `+${cleaned}`;
  if (cleaned.length === 10) return `+1${cleaned}`;
  return null;
}

export async function sendFormSms(opts: {
  phone: string;
  sms_consent: boolean;
  type: keyof typeof SMS_TEMPLATES;
  name: string;
  eventTitle?: string;
}): Promise<void> {
  if (!opts.sms_consent || !opts.phone) return;

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!sid || !token || !messagingServiceSid) {
    const missing = [
      !sid && 'TWILIO_ACCOUNT_SID',
      !token && 'TWILIO_AUTH_TOKEN',
      !messagingServiceSid && 'TWILIO_MESSAGING_SERVICE_SID',
    ].filter(Boolean);
    console.warn(`[sms] Missing env var(s): ${missing.join(', ')}. Skipping SMS.`);
    return;
  }

  const normalized = normalizeToE164(opts.phone);
  if (!normalized) {
    console.warn(`[sms] Could not normalize phone "${opts.phone}" to E.164 format, skipping`);
    return;
  }

  const body = SMS_TEMPLATES[opts.type](opts.name, opts.eventTitle);

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const twilio = require('twilio');
    const client = twilio(sid, token);
    await client.messages.create({ to: normalized, messagingServiceSid, body });
    console.log(`[sms] sent ok type=${opts.type}`);
  } catch (err) {
    console.error(`[sms] failed type=${opts.type}`, err);
  }
}
