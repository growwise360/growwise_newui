import type { FAQItem } from '@/components/schema/FAQSchema'
import { CONTACT_INFO } from '@/lib/constants'

export const MATH_COURSE_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'Does GrowWise offer math tutoring in Dublin CA?',
    answer:
      'Yes. GrowWise offers in-person math tutoring for grades 1–12 at 4564 Dublin Blvd, Dublin, CA. Programs cover elementary math through AP Precalculus and SAT prep.',
  },
  {
    question: 'What math subjects does GrowWise tutor?',
    answer:
      'GrowWise tutors all K-12 math subjects including elementary math, middle school math, Algebra 1, Algebra 2, Geometry, Precalculus, AP Precalculus, and SAT Math.',
  },
  {
    question: 'How is GrowWise math tutoring different?',
    answer:
      'Classes are small — 4 to 8 students — and instruction is structured around building deep understanding, not just test prep. Students track real progress each session.',
  },
]

export const ENGLISH_COURSE_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'Does GrowWise offer English tutoring in Dublin CA?',
    answer:
      'Yes. GrowWise offers in-person English, reading, and writing programs for grades 1-8 in Dublin, CA at 4564 Dublin Blvd. Live online options are also available.',
  },
  {
    question: 'What English programs does GrowWise offer?',
    answer:
      'GrowWise offers two separate English programs: English Mastery for grades 1-8 and Young Authors, a creative writing cohort for grades 3-5.',
  },
]

/** Visible accordion FAQs on /academic/math — single source for UI + merged JSON-LD in layout */
export const MATH_COURSE_VISIBLE_FAQS: FAQItem[] = [
  {
    question: 'What math courses do you offer at GrowWise?',
    answer:
      'We offer comprehensive Grades 1-12 math courses including grade-level math (aligned with California Common Core Standards), accelerated math programs, and integrated math 1 & 2. Our courses cover Algebra, Geometry, Pre-Calculus, and more. All programs are aligned with DUSD and PUSD curriculum standards.',
  },
  {
    question: 'How do I know which math course is right for my child?',
    answer:
      "We offer a free 60-minute placement assessment to evaluate your child's current math level and identify strengths and areas for improvement. Our education experts will recommend the perfect math program based on the assessment results, your child's grade level, and learning goals.",
  },
  {
    question: 'Are your math courses aligned with school curriculum?',
    answer:
      "Yes, our math courses are aligned with Dublin Unified School District (DUSD) and Pleasanton Unified School District (PUSD) standards, as well as California Common Core Standards (CACCS). This ensures your child's learning at GrowWise complements their school curriculum.",
  },
  {
    question: 'What is the difference between grade-level, accelerated, and integrated math?',
    answer:
      'Grade-level math follows the standard curriculum pace for each grade. Accelerated math moves at a faster pace, allowing students to cover more material. Integrated math combines algebra, geometry, and statistics into a unified approach, which is common in many modern high school curricula.',
  },
  {
    question: 'How much does math tutoring cost at GrowWise?',
    answer: `Our math courses start at $35 per session. Pricing may vary based on the specific program, class size, and duration. We offer flexible scheduling options and packages. Contact us at ${CONTACT_INFO.phone} or ${CONTACT_INFO.email} for detailed pricing information.`,
  },
  {
    question: 'Do you offer online or in-person math tutoring?',
    answer:
      'We offer in-person math tutoring at our Dublin, CA location. Our modern facility provides the perfect environment for focused learning. Contact us to learn more about our current class formats and availability.',
  },
  {
    question: 'What makes GrowWise math tutoring different from other tutoring centers?',
    answer:
      'GrowWise offers personalized math instruction with expert tutors, small class sizes, and curriculum alignment with local school districts. We provide proven results, flexible scheduling, and a supportive learning environment. Our instructors are experienced educators who understand both the curriculum and how to help students succeed.',
  },
]

/** Visible accordion FAQs on /academic/english */
export const ENGLISH_COURSE_VISIBLE_FAQS: FAQItem[] = [
  {
    question: 'Do I have to commit to 3 months upfront?',
    answer:
      'English Mastery and Essay Writing Focus use a 3-month program structure. That gives enough time to assess, teach the primary gap, build consistent habits, and verify progress. Young Authors is a separate fixed 12-session cohort.',
  },
  {
    question: 'Is Young Authors the same as English Mastery?',
    answer:
      'No. English Mastery is the core grades 1-8 English program covering reading comprehension, writing, grammar, vocabulary, and essay skills. Young Authors is a separate creative writing program for grades 3-5.',
  },
  {
    question: 'How much does Young Authors cost?',
    answer:
      'Young Authors is $295 total for a fixed 12-session cohort. Contact GrowWise for the current schedule and availability.',
  },
  {
    question: 'Can my child join English Mastery mid-year?',
    answer:
      'Yes. English Mastery starts monthly. The assessment helps identify the right grade band and entry point regardless of where the school year is.',
  },
  {
    question: 'What is the difference between elementary and middle school English?',
    answer:
      'Elementary English focuses on reading comprehension, paragraph writing, grammar mechanics, and vocabulary. Middle school English builds toward essay writing, literary analysis, argument structure, and evidence integration.',
  },
  {
    question: 'Is this in-person or online?',
    answer:
      'Both. In-person sessions are available at the GrowWise Dublin, CA center, and live online sessions are available nationwide. Both formats use small groups and the same curriculum standards.',
  },
  {
    question: 'What if my child is between grade levels?',
    answer:
      'Placement is based on the assessment, not only the grade on a report card. We match the student to the right skill entry point while keeping the grade band appropriate.',
  },
]

export const MATH_COURSE_MERGED_FAQ_JSONLD: FAQItem[] = [
  ...MATH_COURSE_FAQ_JSONLD,
  ...MATH_COURSE_VISIBLE_FAQS,
]

export const ENGLISH_COURSE_MERGED_FAQ_JSONLD: FAQItem[] = [
  ...ENGLISH_COURSE_FAQ_JSONLD,
  ...ENGLISH_COURSE_VISIBLE_FAQS,
]

export const BOOK_ASSESSMENT_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'Is the GrowWise academic assessment free?',
    answer:
      'Yes. GrowWise offers a free academic assessment for new students to identify learning gaps and recommend the right program. Book online or call (925) 456-4606.',
  },
  {
    question: 'What happens after I book an assessment at GrowWise?',
    answer:
      "After submitting the form, a GrowWise team member will contact you within 24 hours to schedule your child's free in-person assessment at our Dublin, CA center.",
  },
  {
    question: 'How long does the free GrowWise assessment take?',
    answer:
      "The free academic assessment at GrowWise typically takes 60 minutes. Your child completes a grade-level diagnostic in math or English, and our team reviews the results with you right after.",
  },
  {
    question: 'What subjects does the GrowWise assessment cover?',
    answer:
      "The assessment covers Math and/or English depending on your child's needs. For math we evaluate grade-level competency and identify specific skill gaps. For English we assess reading comprehension and writing skills.",
  },
]

export const SAT_PREP_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'When should my child start SAT prep?',
    answer:
      'We recommend starting SAT prep at least 4–6 months before your target test date — typically early 11th grade. Starting earlier allows time to close foundational gaps before focusing on test-specific strategy.',
  },
  {
    question: 'How long is the SAT prep course at GrowWise?',
    answer:
      'GrowWise offers three SAT prep levels: Level 1 (foundation, ~3 months), Level 2 (score acceleration, ~3 months), and Level 3 (elite readiness, ~2 months). Most students complete 3–5 months of prep before their target test date.',
  },
  {
    question: 'Does GrowWise offer ACT prep as well?',
    answer:
      'Our primary focus is SAT and PSAT preparation. If your student is specifically preparing for the ACT, contact us to discuss options — many of the skills and strategies overlap significantly between the two tests.',
  },
  {
    question: 'What SAT score improvements do students typically see?',
    answer:
      'Students who complete a full GrowWise SAT prep cycle and practice consistently at home typically improve 100–250 points. We track progress with regular mock tests so you always know exactly where your child stands.',
  },
]

export const HIGH_SCHOOL_MATH_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'What high school math courses does GrowWise tutor?',
    answer:
      'GrowWise tutors Algebra 1, Algebra 2, Geometry, Pre-Calculus, AP Precalculus, Integrated Math 1, and Integrated Math 2 for high school students in Dublin, CA.',
  },
  {
    question: 'Can GrowWise help with DUSD accelerated math placement?',
    answer:
      'Yes. GrowWise offers targeted tutoring to help students prepare for DUSD accelerated math placement assessments. Our instructors are familiar with the Dublin Unified curriculum and build the exact skills needed to qualify.',
  },
  {
    question: 'Do you offer AP math tutoring?',
    answer:
      'Yes. GrowWise tutors AP Precalculus and supports students in AP-level math courses aligned with California Common Core Standards and the DUSD curriculum.',
  },
]

/** @deprecated Import from `@/lib/schema/high-school-math-faqs` */
export { HS_MATH_VISIBLE_FAQS } from '@/lib/schema/high-school-math-faqs'

/** Visible accordion + JSON-LD on /steam/ml-ai-coding — single source */
export const ML_AI_CODING_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'What age can students start ML/AI coding classes at GrowWise?',
    answer:
      'Our ML/AI and Python coding courses welcome students from Grades 1 through 12 (ages 6–18). We group students by level — not just age — so beginners and advanced learners each get the right challenge. Most students starting AI-specific projects are in Grades 5 and up.',
  },
  {
    question: 'Do students need prior coding experience to join your AI courses?',
    answer:
      'No prior experience is required for our Python Kickstart and beginner tracks. We start from the very basics — variables, loops, and functions — before moving to machine learning concepts. Students who already know Python can join our intermediate ML/AI or advanced Data Science track directly.',
  },
  {
    question: 'What programming language do you teach in ML/AI classes?',
    answer:
      'We teach Python — the most widely used language in AI, data science, and machine learning. Students learn real Python syntax, not block-based coding. By the end of our courses, students can write scripts, train simple ML models, and build AI projects they can add to a resume or college application.',
  },
  {
    question: 'How are ML/AI classes structured at GrowWise?',
    answer:
      'Classes meet once or twice per week in small groups of 4–8 students at our Dublin, CA center. Each session combines direct instruction, live coding practice, and a mini-project. Courses run 10–12 weeks per level. We also offer flexible scheduling including evenings and Saturdays.',
  },
  {
    question: 'How is GrowWise ML/AI different from a general coding class?',
    answer:
      "General coding classes teach programming fundamentals. Our ML/AI program goes further — students learn how to build models that learn from data, recognize patterns, and make predictions. Projects include building AI chatbots, image classifiers, and game-playing agents. It's the hands-on AI experience colleges and employers are looking for.",
  },
]

/** Visible accordion + JSON-LD on /steam/game-development — single source */
export const GAME_DEVELOPMENT_FAQ_JSONLD: FAQItem[] = [
  {
    question: 'What platforms and tools do you teach for game development?',
    answer:
      'We teach game development across four platforms based on student level: Scratch (beginners, Grades 1–5), Roblox Studio with Lua (Grades 3–8), Minecraft Education Edition with Python (Grades 5–9), and Unity with C# for advanced students (Grades 8–12). Students start where they are and progress through each platform naturally.',
  },
  {
    question: 'Does my child need prior coding experience to join game development classes?',
    answer:
      'No prior experience is needed. Our Scratch beginner track starts with visual block-based programming — no typing required. Students who already have coding experience can join our Roblox or Minecraft track, which introduces real scripting languages in a game context they already know and love.',
  },
  {
    question: 'What age group is game development suitable for at GrowWise?',
    answer:
      'We welcome students from Grades 1 through 12 (ages 6–18). Younger students (Grades 1–5) work with Scratch and Roblox; older students (Grades 6–12) tackle Minecraft modding, Unity, and Python game projects. Classes are always grouped by level and platform, not just age.',
  },
  {
    question: 'Can students publish or share the games they build?',
    answer:
      'Yes. Roblox games built in our courses can be published to the Roblox platform and shared with friends. Scratch projects are shareable on the Scratch community. Advanced Unity students build standalone apps. By the end of each course, every student leaves with at least one complete, playable game in their portfolio.',
  },
  {
    question: 'What real skills do kids gain from game development classes — beyond just having fun?',
    answer:
      'Game development builds computational thinking, logic, problem-solving, and creativity in a context students are motivated by. Students learn to break complex problems into steps (decomposition), design systems (game mechanics), debug code, and ship a finished product. These are the same skills college CS programs and tech employers value.',
  },
]
