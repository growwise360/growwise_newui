import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'

/**
 * Shared FAQ copy for /from-nextdoor (visible accordion + JSON-LD).
 */
export const FROM_NEXTDOOR_FAQS: ReadonlyArray<{
  question: string
  answer: string
}> = [
  {
    question: 'Why do Dublin parents recommend GrowWise on Nextdoor?',
    answer:
      'Families highlight our small classes, expert instructors (especially in Python and STEAM), structured progression from basics to advanced topics, and a welcoming campus where kids gain confidence through hands-on projects.',
  },
  {
    question: 'Where is GrowWise located?',
    answer: `GrowWise School is at ${CONTACT_INFO.street}, ${CONTACT_INFO.city} ${CONTACT_INFO.zipCode}. All in-person classes and free assessments happen at this Dublin campus.`,
  },
  {
    question: 'What is included in the free assessment?',
    answer:
      'A free diagnostic assessment helps us understand your child’s strengths and gaps in math, English, or both. You receive clear recommendations with no obligation to enroll.',
  },
  {
    question: 'What programs do you offer for elementary and middle school students?',
    answer:
      'We offer math and English tutoring, Python and AI coding, game development, robotics-oriented STEAM paths, and seasonal summer camps — all in small groups at our Dublin center.',
  },
  {
    question: 'Can I visit or call before enrolling?',
    answer: `Yes. Call ${CONTACT_INFO.phone} to schedule a visit or book a free assessment online. Hours: ${OFFICE_HOURS.summary}.`,
  },
]
