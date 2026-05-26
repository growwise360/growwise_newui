/** Google Merchant Center ID for Customer Reviews opt-in. */
export const GCR_MERCHANT_ID = 5572733436;

export interface StripeCheckoutSessionForGcr {
  id?: string;
  payment_status?: string;
  customer_email?: string | null;
  customer_details?: { email?: string | null } | null;
  metadata?: { orderId?: string | null } | null;
}

export interface GcrCheckoutFields {
  orderId: string;
  email: string;
  estimatedDeliveryDate: string;
  isVerifiedPaid: boolean;
}

/** Returns YYYY-MM-DD for Google Customer Reviews (UTC). */
export function formatGcrEstimatedDeliveryDate(daysFromNow = 7, fromDate = new Date()): string {
  const d = new Date(fromDate);
  d.setUTCDate(d.getUTCDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

/**
 * Maps a paid Stripe Checkout session to GCR opt-in fields.
 * Prefers internal order id from metadata; falls back to Stripe session id.
 */
export function getGcrFieldsFromCheckoutSession(
  session: StripeCheckoutSessionForGcr,
  sessionIdFallback: string,
): GcrCheckoutFields {
  const metadataOrderId = session.metadata?.orderId?.trim();
  const orderId = metadataOrderId || session.id?.trim() || sessionIdFallback.trim();
  const email = (session.customer_email ?? session.customer_details?.email ?? '').trim();
  return {
    orderId,
    email,
    estimatedDeliveryDate: formatGcrEstimatedDeliveryDate(7),
    isVerifiedPaid: session.payment_status === 'paid',
  };
}

export function isGcrCheckoutReady(fields: GcrCheckoutFields): boolean {
  return fields.isVerifiedPaid && fields.orderId.length > 0 && fields.email.length > 0;
}
