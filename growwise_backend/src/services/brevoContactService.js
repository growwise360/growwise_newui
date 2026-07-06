const logger = require('../utils/logger');

/**
 * Brevo Contact Service
 * Creates/updates contacts and assigns them to marketing lists.
 * Fails silently — contact sync must never block user-facing responses.
 */

const BREVO_LIST_IDS = {
  enrollment: () => parseInt(process.env.BREVO_LIST_ENROLLMENT, 10) || null,
  assessment: () => parseInt(process.env.BREVO_LIST_ASSESSMENT, 10) || null,
  workshop:   () => parseInt(process.env.BREVO_LIST_WORKSHOP, 10)   || null,
  contact:    () => parseInt(process.env.BREVO_LIST_CONTACT, 10)    || null,
};

function isConfigured() {
  return !!process.env.BREVO_API_KEY;
}

function getClient() {
  const { BrevoClient } = require('@getbrevo/brevo');
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
}

function parseName(fullName) {
  if (!fullName) return { firstName: '', lastName: '' };
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  };
}

/**
 * Create or update a contact in Brevo and optionally assign to a list.
 *
 * @param {object} params
 * @param {string} params.email         - Contact email (required)
 * @param {string} [params.fullName]    - Full name to parse into FIRSTNAME / LASTNAME
 * @param {string} [params.phone]       - Phone number
 * @param {string} params.source        - One of: enrollment, assessment, workshop, contact
 * @param {object} [params.attributes]  - Extra Brevo attributes
 */
async function syncContact({ email, fullName, phone, source, attributes = {} }) {
  if (!isConfigured()) {
    logger.debug('Brevo not configured; skipping contact sync');
    return { synced: false, reason: 'not_configured' };
  }

  if (!email) {
    logger.warn('syncContact called without email; skipping');
    return { synced: false, reason: 'missing_email' };
  }

  try {
    const client = getClient();
    const { firstName, lastName } = parseName(fullName);

    const listId = BREVO_LIST_IDS[source]?.();
    const listIds = listId ? [listId] : [];

    const contactPayload = {
      email: email.trim().toLowerCase(),
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        ...(phone ? { PHONE: String(phone).trim() } : {}),
        SOURCE: source,
        ...attributes,
      },
      listIds,
      updateEnabled: true,
    };

    await client.contacts.createContact(contactPayload);

    logger.info({ email, source, listIds }, 'Contact synced to Brevo');
    return { synced: true, email, listIds };
  } catch (err) {
    const status = err?.statusCode || err?.response?.statusCode;
    if (status === 204) {
      logger.info({ email, source }, 'Brevo contact already exists; updated');
      return { synced: true, email, updated: true };
    }

    logger.error({ error: err.message, email, source }, 'Failed to sync contact to Brevo');
    return { synced: false, reason: err.message };
  }
}

module.exports = { syncContact, isConfigured };
