import {
  formatGcrEstimatedDeliveryDate,
  getGcrFieldsFromCheckoutSession,
  isGcrCheckoutReady,
} from '@/lib/googleCustomerReviews';

describe('googleCustomerReviews', () => {
  it('formatGcrEstimatedDeliveryDate returns YYYY-MM-DD UTC', () => {
    expect(formatGcrEstimatedDeliveryDate(7, new Date('2026-05-26T12:00:00.000Z'))).toBe('2026-06-02');
  });

  it('getGcrFieldsFromCheckoutSession prefers metadata orderId', () => {
    const fields = getGcrFieldsFromCheckoutSession(
      {
        id: 'cs_test_abc',
        payment_status: 'paid',
        customer_email: 'parent@example.com',
        metadata: { orderId: 'ord_123' },
      },
      'cs_fallback',
    );
    expect(fields.orderId).toBe('ord_123');
    expect(fields.email).toBe('parent@example.com');
    expect(fields.estimatedDeliveryDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(fields.isVerifiedPaid).toBe(true);
  });

  it('getGcrFieldsFromCheckoutSession falls back to Stripe session id', () => {
    const fields = getGcrFieldsFromCheckoutSession(
      {
        id: 'cs_test_abc',
        payment_status: 'paid',
        customer_details: { email: 'buyer@example.com' },
      },
      'cs_fallback',
    );
    expect(fields.orderId).toBe('cs_test_abc');
    expect(fields.email).toBe('buyer@example.com');
  });

  it('isGcrCheckoutReady requires paid status, order id, and email', () => {
    expect(
      isGcrCheckoutReady({
        orderId: 'ord_1',
        email: 'a@b.com',
        estimatedDeliveryDate: '2026-06-02',
        isVerifiedPaid: true,
      }),
    ).toBe(true);
    expect(
      isGcrCheckoutReady({
        orderId: 'ord_1',
        email: '',
        estimatedDeliveryDate: '2026-06-02',
        isVerifiedPaid: true,
      }),
    ).toBe(false);
    expect(
      isGcrCheckoutReady({
        orderId: 'ord_1',
        email: 'a@b.com',
        estimatedDeliveryDate: '2026-06-02',
        isVerifiedPaid: false,
      }),
    ).toBe(false);
  });
});
