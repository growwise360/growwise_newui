import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ContentProvider from "@/components/providers/ContentProvider";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import LazyChatbot from "@/components/chatbot/LazyChatbot";
import { WhatsAppFloatingButton } from '@/components/layout/WhatsAppFloatingButton';
import { locales } from '@/i18n/config';
import { PageTrackingWrapper } from '@/components/analytics/PageTrackingWrapper';
import { HomeCampsStripSlot } from '@/components/sections/home/HomeCampsStripSlot';
import { websiteSchema } from '@/lib/seo/structuredData';

const Header = dynamic(() => import("@/components/layout/Header/Header"));
const Footer = dynamic(() => import("@/components/layout/Footer/Footer"));

// Default metadata - can be overridden by page-specific generateMetadata
export const metadata: Metadata = {
  title: "K-12 Online Tutoring & Coding Classes | GrowWise",
  description:
    "GrowWise helps Grades 1-12 students become confident, independent learners. Academic tutoring, Python & AI coding, and STEAM programs. Live online nationwide + in-person in Dublin, CA. Book a free assessment today.",
  keywords: "tutoring Dublin CA, Grades 1-12 education, STEAM programs, math tutor, English tutor, coding classes, SAT prep Dublin, personalized learning",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* WebSite search JSON-LD — primary EducationalOrganization lives in root layout head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* CartProvider lives in app/layout.tsx so /enroll and [locale] routes share one cart */}
      <ChatbotProvider>
        <ContentProvider>
          <PageTrackingWrapper>
            <HomeCampsStripSlot />
            <Header />
            <main id="main-content" suppressHydrationWarning>
              {children}
            </main>
            <Footer />
            <LazyChatbot />
            <WhatsAppFloatingButton />
          </PageTrackingWrapper>
        </ContentProvider>
      </ChatbotProvider>
    </NextIntlClientProvider>
  );
}
