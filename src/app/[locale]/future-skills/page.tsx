import React, { Suspense } from 'react';

import FAQSchema from '@/components/schema/FAQSchema';
import { FutureSkillsHubPage } from '@/components/future-skills/FutureSkillsHubPage';
import { FUTURE_SKILLS_HUB_FAQS } from '@/data/future-skills-hub-faqs';

export default function FutureSkillsPage() {
  return (
    <>
      <FAQSchema faqs={[...FUTURE_SKILLS_HUB_FAQS]} />
      <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-[#1F396D]">Loading...</div>}>
        <FutureSkillsHubPage />
      </Suspense>
    </>
  );
}
