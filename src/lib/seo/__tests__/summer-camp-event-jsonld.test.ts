import { generateEventSchema } from '@/lib/seo/structuredData';
import { getMinimumPublishedSummerCampPriceUsd } from '@/lib/summer-camp-data';
import {
  SUMMER_CAMP_EVENT_END_ISO,
  SUMMER_CAMP_EVENT_START_ISO,
} from '@/lib/summer-camp-week-calendar';

describe('summer camp hub Event JSON-LD', () => {
  const baseUrl = 'https://growwiseschool.org';

  it('uses 2026 season dates (not stale past seasons)', () => {
    expect(SUMMER_CAMP_EVENT_START_ISO).toMatch(/^2026-/);
    expect(SUMMER_CAMP_EVENT_END_ISO).toMatch(/^2026-/);
    expect(SUMMER_CAMP_EVENT_END_ISO >= SUMMER_CAMP_EVENT_START_ISO).toBe(true);
  });

  it('includes price, priceCurrency, and performer for GSC rich results', () => {
    const minPrice = getMinimumPublishedSummerCampPriceUsd();
    const event = generateEventSchema({
      name: 'Summer STEAM Camp 2026 — Dublin, CA',
      description: 'Summer STEAM camps in Dublin, CA.',
      startDate: SUMMER_CAMP_EVENT_START_ISO,
      endDate: SUMMER_CAMP_EVENT_END_ISO,
      location: {
        name: 'GrowWise',
        address: {
          streetAddress: '4564 Dublin Blvd',
          addressLocality: 'Dublin',
          addressRegion: 'CA',
          postalCode: '94568',
          addressCountry: 'US',
        },
      },
      organizer: { name: 'GrowWise', url: baseUrl },
      image: `${baseUrl}/og-image.jpg`,
      offers: {
        price: String(minPrice),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/camps/summer`,
        validFrom: '2026-01-01',
      },
      performer: { name: 'GrowWise School', type: 'Organization' },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    });

    expect(event.offers).toMatchObject({
      '@type': 'Offer',
      price: String(minPrice),
      priceCurrency: 'USD',
      validFrom: '2026-01-01',
    });
    expect(event.performer).toMatchObject({
      '@type': 'Organization',
      name: 'GrowWise School',
    });
    expect(minPrice).toBeGreaterThan(0);
  });
});
