import type { FAQItem } from '@/components/schema/FAQSchema';
import { CONTACT_INFO } from '@/lib/constants';
import summerCampFaqData from '../../../public/api/mock/en/summer-camp-faq.json';

/** Hub FAQ shown in accordion and FAQPage JSON-LD — single source of truth. */
export const SUMMER_HUB_PRIORITY_FAQS: FAQItem[] = [
  {
    question: 'Does GrowWise offer summer camps in Dublin CA?',
    answer: `Yes. GrowWise runs summer camps from June through August at ${CONTACT_INFO.street}, Dublin, CA ${CONTACT_INFO.zipCode}. Programs have included Math Olympiad (AMC8/MOEMS prep), Advanced Math, AI Entrepreneur Studio, Scratch coding, Roblox game development, Robotics, and Young Authors creative writing — availability varies by season, so check the booking grid on this page. Camps run in small groups of about 8 students, and every student leaves with a tangible output: a published game, a working project, a completed story, or a competition-ready math skill set.`,
  },
  {
    question: 'What grades are GrowWise summer STEAM camps for?',
    answer:
      'The summer booking grid on this page serves Grades 3–6 for Robotics, Young Authors, Scratch, Roblox, and AI Entrepreneur Studio. AI Entrepreneur may accept older students by placement. Robotics, Roblox game development, and Young Authors are not currently accepting applications for Summer 2026. Scratch and AI Entrepreneur Studio remain open for self-serve enrollment. For academic sprints (Grades 1–10) or high school math intensives (Grades 8–12), see the links on this page.',
  },
  {
    question: 'Where are GrowWise summer camps held?',
    answer: `All in-person summer camps are held at ${CONTACT_INFO.street}, Dublin, CA ${CONTACT_INFO.zipCode}. Families join us from Pleasanton, San Ramon, Livermore, and across the Tri-Valley.`,
  },
  {
    question: 'What summer camps can I book on this page?',
    answer:
      'On this hub you can reserve weeks for Scratch coding and AI Entrepreneur Studio. Robotics, Roblox game development, and Young Authors are visible but not accepting applications for Summer 2026. Math Olympiad and Advanced Math have dedicated camp pages linked from our site—not this booking grid.',
  },
  {
    question: 'How do I enroll my child in a GrowWise summer camp?',
    answer: `Choose a program and week on this page, then complete checkout. You can also book a free assessment at growwiseschool.org/book-assessment or call ${CONTACT_INFO.phone}. Spots are limited to about 8 students per class.`,
  },
  {
    question: 'Are GrowWise summer camps worth it?',
    answer:
      'Students leave with a real project they built—a working game, an AI project, a published story, or a robot. Not a certificate. Something they made.',
  },
];

/**
 * Mock FAQ questions that repeat priority topics (different wording).
 * Excluded so UI and JSON-LD stay aligned without near-duplicate entities.
 */
export const SUMMER_HUB_MOCK_FAQ_EXCLUDED_NEAR_PRIORITY = new Set([
  'what grades and ages are growwise summer camps designed for?',
  'what grades does growwise serve for summer camp?',
  'what age groups are your summer math camps in dublin, ca designed for?',
  'where are growwise summer camps located?',
]);

function normalizeFaqQuestion(question: string): string {
  return question.trim().toLowerCase();
}

/** Visible accordion + FAQPage JSON-LD for `/camps/summer`. */
export function getSummerHubVisibleFaqs(): FAQItem[] {
  const priorityKeys = new Set(
    SUMMER_HUB_PRIORITY_FAQS.map((f) => normalizeFaqQuestion(f.question)),
  );
  const rest = summerCampFaqData.faqs.filter((f) => {
    const key = normalizeFaqQuestion(f.question);
    return !priorityKeys.has(key) && !SUMMER_HUB_MOCK_FAQ_EXCLUDED_NEAR_PRIORITY.has(key);
  });
  return [...SUMMER_HUB_PRIORITY_FAQS, ...rest];
}
