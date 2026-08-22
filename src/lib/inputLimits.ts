/**
 * Server-side field length caps for marketing lead forms.
 * Client forms should mirror these with `maxLength` where applicable.
 */
export const FIELD_MAX = {
  name: 100,
  email: 254,
  phone: 32,
  shortText: 200,
  longText: 2000,
} as const;

export function clip(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export function exceedsMax(value: unknown, max: number): boolean {
  return typeof value === 'string' && value.trim().length > max;
}

/** Stricter than the legacy `/^[^\\s@]+@/` pattern; blocks obvious junk. */
export const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/;

export function isValidEmailShape(email: string): boolean {
  if (email.length > FIELD_MAX.email || !EMAIL_RE.test(email)) return false;
  const [local, domain] = email.toLowerCase().split('@');
  if (!local || !domain || local.length > 64) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (domain.includes('..') || domain.split('.').some((label) => !label || label.startsWith('-') || label.endsWith('-'))) return false;
  return true;
}

const BLOCKED_EMAIL_DOMAINS = new Set([
  'example.com', 'example.net', 'example.org',
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net',
  '10minutemail.com', 'tempmail.com', 'temp-mail.org',
  'yopmail.com', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'dispostable.com', 'maildrop.cc',
]);

/** Common misspellings that are syntactically valid but almost never deliver. */
const MISTYPED_EMAIL_DOMAINS = new Set([
  'gmai.com', 'gmal.com', 'gmial.com', 'gmaill.com', 'gmail.co', 'gmail.con',
  'yaho.com', 'yahooo.com', 'yahoo.co', 'yahoo.con',
  'hotmai.com', 'hotmal.com', 'hotmial.com', 'hotmail.con',
  'outlok.com', 'outllook.com', 'outlook.con',
  'icloud.co', 'icloud.con',
]);

/**
 * Conservative fake/random-local-part detection. This intentionally targets
 * only strong signals so legitimate names, plus-addressing, and school emails
 * remain accepted.
 */
function looksLikeRandomOrFakeLocalPart(local: string): boolean {
  const plain = local.replace(/[._+-]/g, '');
  if (/^\d+$/.test(plain)) return true;
  if (/(.)\1{4,}/i.test(plain)) return true;
  if (/^(?:asdf|qwer|zxcv|abcd|1234|9876)[a-z0-9]*$/i.test(plain)) return true;
  if (/^(?:user|email|sample|anonymous|unknown|noreply|no-reply)(?:\d+)?$/i.test(local)) return true;

  if (/^[a-z0-9]+$/i.test(plain) && plain.length >= 10) {
    const digits = (plain.match(/\d/g) ?? []).length;
    const letters = plain.replace(/\d/g, '');
    const hasLongConsonantRun = /[bcdfghjklmnpqrstvwxyz]{7,}/i.test(letters);
    const alternatesLettersAndDigits = /^(?:[a-z]\d){5,}[a-z]?$/i.test(plain) || /^(?:\d[a-z]){5,}\d?$/i.test(plain);
    if (digits / plain.length >= 0.5 || hasLongConsonantRun || alternatesLettersAndDigits) return true;
  }

  return false;
}

/** Lead-form quality check: valid syntax plus common fake/disposable-domain blocking. */
export function isAcceptableLeadEmail(email: string): boolean {
  if (!isValidEmailShape(email)) return false;
  const [local, domain] = email.toLowerCase().split('@');
  if (BLOCKED_EMAIL_DOMAINS.has(domain) || MISTYPED_EMAIL_DOMAINS.has(domain)) return false;
  if (/^(test|fake|spam|asdf|qwerty|none|noemail)([+._-]?\d*)?$/.test(local)) return false;
  if (looksLikeRandomOrFakeLocalPart(local)) return false;
  return true;
}
