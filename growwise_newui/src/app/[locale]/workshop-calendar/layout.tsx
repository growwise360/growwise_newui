import { Metadata } from 'next';
import { generateMetadataFromPath } from '@/lib/seo/metadata';
import { CONTACT_INFO } from '@/lib/constants';
import { absoluteSiteUrl } from '@/lib/publicPath';
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl';
import {
  generateBreadcrumbSchema,
  generateEventSchema,
  generateItemListSchema,
  generateWebPageJsonLd,
  generateFAQPageSchema,
} from '@/lib/seo/structuredData';
import { getWorkshopEventsMap } from '@/components/workshop/workshopEvents';
import { WORKSHOP_CALENDAR_FAQS } from '@/lib/schema/workshop-calendar-faqs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateMetadataFromPath('/workshop-calendar', locale);
  return metadata ?? { title: 'Workshop Calendar | GrowWise', description: 'Free parent workshops and webinars on math and English — Tuesdays in Dublin, CA. Register free.' };
}

export default function WorkshopCalendarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <WorkshopCalendarStructuredData params={params}>
      {children}
    </WorkshopCalendarStructuredData>
  );
}

async function WorkshopCalendarStructuredData({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();
  const pageUrl = absoluteSiteUrl('/workshop-calendar', locale, baseUrl);
  const events = Object.entries(getWorkshopEventsMap())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .slice(0, 12);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Workshop Calendar', url: pageUrl },
  ]);
  const webPageSchema = generateWebPageJsonLd({
    name: 'Workshop Calendar | GrowWise',
    description: 'Free Saturday skill workshops and parent webinars for GrowWise families.',
    url: pageUrl,
  });
  const itemListSchema = generateItemListSchema(
    'Upcoming GrowWise workshops',
    events.map(([date, event]) => ({
      name: `${event.name} (${date})`,
      url: `${pageUrl}#${date}`,
    })),
  );
  const eventSchemas = events.map(([date, event]) =>
    generateEventSchema({
      name: event.name,
      description: event.description,
      startDate: `${date}T${event.time}:00-07:00`,
      endDate: `${date}T${event.time}:00-07:00`,
      location: {
        name: 'GrowWise School',
        address: {
          streetAddress: CONTACT_INFO.street,
          addressLocality: 'Dublin',
          addressRegion: 'CA',
          postalCode: CONTACT_INFO.zipCode,
          addressCountry: 'US',
        },
      },
      organizer: {
        name: 'GrowWise',
        url: baseUrl,
      },
      offers: {
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: pageUrl,
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      performer: {
        name: 'GrowWise instructors',
        type: 'Organization',
      },
    }),
  );
  const faqSchema = generateFAQPageSchema(WORKSHOP_CALENDAR_FAQS);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema,
      webPageSchema,
      itemListSchema,
      faqSchema,
      ...eventSchemas,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      {children}
    </>
  );
}
