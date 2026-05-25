import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants'

/**
 * Shared FAQ copy for the Dublin location hub (visible accordion + JSON-LD).
 */
export const DUBLIN_CA_FAQS: ReadonlyArray<{
  question: string
  answer: string
}> = [
  {
    question: 'Where is GrowWise located in Dublin, CA?',
    answer: `GrowWise School is at ${CONTACT_INFO.street}, ${CONTACT_INFO.city} ${CONTACT_INFO.zipCode}. We operate one physical campus in Dublin—this is where all in-person classes and assessments take place.`,
  },
  {
    question: 'Which areas near Dublin do you serve?',
    answer:
      'Families visit our Dublin campus from Dublin, Pleasanton, San Ramon, Livermore, Danville, and across the Tri-Valley. We do not operate separate campuses in other cities—nearby cities are served areas families travel from.',
  },
  {
    question: 'Do you offer in-person classes in Pleasanton?',
    answer:
      'Yes. Pleasanton families attend in-person classes at our Dublin campus at 4564 Dublin Blvd. GrowWise does not have a separate Pleasanton location—all in-person instruction happens at our single Dublin center.',
  },
  {
    question: 'Do you serve San Ramon families?',
    answer:
      'Yes. San Ramon families regularly attend our Dublin campus at 4564 Dublin Blvd. GrowWise operates one physical location in Dublin—San Ramon is a served area families travel from, not a separate campus.',
  },
  {
    question: 'What grade levels do you support in Dublin?',
    answer:
      'GrowWise supports students in Grades 1–12 at our Dublin center. Programs include elementary and middle school math and English, high school math and SAT prep, and STEAM coding paths for ages 10–18.',
  },
  {
    question: 'Is parking available at your Dublin location?',
    answer:
      'Yes. Free on-site parking is available for all visitors at our Dublin center. When you arrive, follow signage to the visitor parking area.',
  },
  {
    question: 'Can I visit before enrolling my child?',
    answer: `Yes. We encourage families to call (925) 456-4606 to schedule a visit or free assessment during business hours (${OFFICE_HOURS.summary}). There is no commitment required for the assessment.`,
  },
]
