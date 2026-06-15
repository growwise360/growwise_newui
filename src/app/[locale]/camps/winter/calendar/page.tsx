import { Suspense } from 'react';
import { SeoPageFallback } from '@/components/seo/SeoPageFallback';
import { WinterCampCalendarClient } from './WinterCampCalendarClient';

export default function WinterCampCalendarPage() {
  return (
    <Suspense
        fallback={
          <SeoPageFallback
            eyebrow="Winter camps"
            title="Winter Camp Calendar"
            description="Review GrowWise winter camp dates, one-day camp options, and creative technology programs for students in Dublin, CA. Families can compare Roblox, Scratch, and Minecraft camp sessions before adding a date to the cart."
            links={[
              { href: '/camps/winter', label: 'Winter camps' },
              { href: '/camps/summer', label: 'Summer camps' },
              { href: '/contact', label: 'Contact GrowWise' },
            ]}
            className="bg-[#ebebeb]"
          />
        }
      >
        <WinterCampCalendarClient />
      </Suspense>
  );
}
