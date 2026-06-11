/**
 * Centralized SEO metadata configuration
 * All page metadata is defined here for easy maintenance
 * Titles: max 60 characters. Descriptions: max 150 characters (no pricing).
 */

import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import {
  buildHighSchoolMetaDescription,
  buildMiddleSchoolMetaDescription,
} from '@/lib/math-pricing-display'

const canonicalSiteUrl = getCanonicalSiteUrl()
const CAMP_SUMMER_BANNER_IMAGE = `${canonicalSiteUrl}/assets/camps/summer-camp-banner.png`
const CAMP_ACADEMIC_BANNER_IMAGE = `${canonicalSiteUrl}/assets/camps/acabanner.webp`

export interface PageMetadataConfig {
  title: string
  description: string
  keywords: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

/** Used for `/math-finals-practice-session` meta tags, JSON-LD, and fallbacks. */
export const MATH_FINALS_PRACTICE_SESSION_DESCRIPTION =
  'In-center high school math finals prep in Dublin, CA for Algebra 1, Algebra 2, and Pre-Calculus with exam-style practice.'

export const metadataConfig: Record<string, PageMetadataConfig> = {
  // Home page
  '/': {
    title: 'K-12 Online Tutoring & Coding Classes | GrowWise',
    description:
      'GrowWise helps Grades 1-12 students become confident, independent learners. Academic tutoring, Python & AI coding, and STEAM programs. Live online nationwide + in-person in Dublin, CA. Book a free assessment today.',
    keywords:
      'tutoring Dublin CA, Grades 1-12 education, STEAM programs, math tutor, English tutor, coding classes, SAT prep Dublin, personalized learning',
    path: '',
  },

  // Core pages
  '/about': {
    title: 'Meet the GrowWise Team — Dublin, CA',
    description:
      'Founded by Anshika Verma. Trusted Dublin educators for K-12 tutoring and STEAM. Meet our team and see what local families say.',
    keywords:
      'about GrowWise, Anshika Verma, tutoring center Dublin CA, Grades 1-12 education Dublin, STEAM programs',
    path: '/about',
  },

  '/from-nextdoor': {
    title: 'GrowWise in Dublin, CA — Trusted by Neighbors',
    description:
      'Dublin parents choose GrowWise for STEM, coding, and tutoring. Top-rated locally. Book a free assessment.',
    keywords:
      'tutoring Dublin CA, GrowWise Dublin, Nextdoor tutoring Dublin, coding classes Dublin, Tri-Valley tutoring, learning center Dublin California, tutoring Dublin California',
    path: '/from-nextdoor',
    image: '/og-image.jpg',
  },

  '/bulletin': {
    title: "How to Support Your K–12 Child's Learning | GrowWise Bulletin",
    description:
      "What I learn teaching students every day, I share with you. Every Tuesday, Thursday and Saturday. Free. Why this works for both:",
    keywords:
      'GrowWise newsletter, parent education tips, K-12 tutoring updates, Dublin tutoring newsletter, student learning insights',
    path: '/bulletin',
    image: '/og-image.jpg',
  },

  '/dublin-ca': {
    title: 'K-12 Tutoring & Coding Classes in Dublin, CA | GrowWise',
    description:
      'In-person math, English, coding, SAT prep, and summer camps at 4564 Dublin Blvd. Serving Tri-Valley families. Book a free assessment.',
    keywords:
      'tutoring Dublin CA, coding classes Dublin, SAT prep Dublin, Tri-Valley tutoring, K-12 tutoring Pleasanton, San Ramon tutoring, GrowWise Dublin, math tutor Dublin California, coding for kids Dublin California, robotics Dublin California, after school programs Dublin California, kids spring break camps Dublin California, learning center Dublin California, writing classes Dublin California, tutoring Dublin California',
    path: '/dublin-ca',
  },

  '/contact': {
    title: 'Contact GrowWise | Dublin CA | Talk to Us',
    description:
      'Reach GrowWise in Dublin, CA for tutoring, STEAM programs, and enrollment. Call, email, or visit—we respond within one business day.',
    keywords:
      'contact GrowWise, tutoring Dublin CA, Grades 1-12 education contact, STEAM programs Dublin, free assessment booking',
    path: '/contact',
  },

  '/programs': {
    title: 'Programs | Academic & STEAM | GrowWise',
    description:
      'Browse GrowWise academic and STEAM programs in Dublin, CA. Math, English, ML/AI, game dev, and coding paths for every learner.',
    keywords:
      'GrowWise programs, academic courses, STEAM programs, Grades 1-12 education Dublin, math courses, coding classes',
    path: '/programs',
  },

  // Academic pages
  '/academic': {
    title: 'Grades 1-12 Academic Programs | Dublin CA | GrowWise',
    description:
      'Grades 1–12 Math and English tutoring in Dublin, CA, aligned with DUSD & PUSD. Small groups, personalized paths. Book a free assessment today.',
    keywords:
      'academic programs, math tutoring Dublin CA, English tutoring, DUSD aligned curriculum, PUSD aligned, grade-level math, accelerated math, English Language Arts',
    path: '/academic',
  },

  '/academic/math': {
    title: 'Math Tutoring Programs Online — Grades 1–12 | GrowWise',
    description:
      'Structured math programs for Grades 1–12. Live online small groups. Elementary, middle school, and high school tracks. Book a free assessment.',
    keywords:
      'math tutoring online, online math program grades 1-12, elementary math tutoring, middle school math help, IM1 tutoring, high school math tutoring, AP calculus tutoring online, math small group online, 3-month math program, math tutoring small group',
    path: '/academic/math',
  },

  '/academic/math/elementary': {
    title: 'Elementary Math Tutoring Online — Grades 1–5 | GrowWise',
    description:
      'Structured math programs for Grades 1–5. Number sense, fractions, word problem reasoning. Live online small groups. Diagnostic-first. 3-month programs.',
    keywords:
      'elementary math tutoring online, grade 1-5 math help, fractions tutoring grade 4, math word problem help elementary, grade 3 math struggles, place value tutoring, elementary math small group online, math program grades 1 5',
    path: '/academic/math/elementary',
  },

  '/academic/math/middle-school': {
    title: 'Middle School Math Tutoring — IM1, IM2 | GrowWise',
    description: buildMiddleSchoolMetaDescription(),
    keywords:
      'middle school math tutoring online, IM1 tutoring, IM2 tutoring, pre-algebra tutoring online, integrated math 1 tutoring, grades 6-8 math program, standard track math, accelerated math tutoring',
    path: '/academic/math/middle-school',
  },

  '/academic/english': {
    title: 'English Tutoring Programs Grades 1-8 | Dublin CA | GrowWise',
    description:
      'Structured English tutoring for Grades 1-8 in Dublin, CA and live online. Reading comprehension, writing, grammar, vocabulary, and essay writing in small groups.',
    keywords:
      'English tutoring Dublin CA, English tutor Dublin, reading comprehension tutoring, essay writing help, grammar tutoring, vocabulary development, English Language Arts, ELA tutoring, writing tutor, reading tutor, English classes Dublin CA, English help Dublin, English tutoring near me, Grades 1-8 English programs',
    path: '/academic/english',
  },

  '/academic/english/elementary': {
    title: 'Elementary English Tutoring Online — Grades 1–5 | GrowWise',
    description:
      'Structured English program for Grades 1–5. Reading fluency, vocabulary, grammar, and writing. Live online small groups. Diagnostic-first. 3-month programs. Dublin, CA.',
    keywords:
      'elementary English tutoring online, reading below grade level grades 1-5, my child hates writing, child reads but does not understand, California Common Core ELA, English tutoring Dublin CA, Pleasanton San Ramon Tri-Valley',
    path: '/academic/english/elementary',
  },

  '/courses/sat-prep': {
    title: 'SAT Prep Tutoring in Dublin, CA | GrowWise',
    description:
      'Score higher on the SAT with personalized prep in Dublin, CA. Practice tests, proven strategies & expert tutors. Small groups. Book a free assessment today.',
    keywords:
      'SAT prep Dublin CA, SAT preparation, SAT course, SAT tutoring Dublin, SAT test prep, SAT strategies, SAT practice tests, SAT classes Dublin CA, SAT help, SAT tutor near me, SAT prep course, SAT score improvement, college entrance exam prep',
    path: '/courses/sat-prep',
  },

  '/academic/math/high-school': {
    title: 'High School Math Tutoring Dublin CA | GrowWise',
    description: buildHighSchoolMetaDescription(),
    keywords:
      'high school math tutoring Dublin CA, algebra tutoring, algebra 1, algebra 2, geometry tutoring, pre-calculus, AP precalculus, integrated math, integrated math 1, integrated math 2, DUSD accelerated math placement, high school math courses Dublin CA, advanced math tutoring, high school math tutoring online, AP calculus tutoring, algebra 2 tutoring, SAT math prep online, grades 9-12 math program',
    path: '/academic/math/high-school',
  },

  '/courses/integrated-math-1-dublin-ca': {
    title: 'Integrated Math 1 Tutoring Dublin CA | GrowWise',
    description:
      'Integrated Math 1 tutoring in Dublin, CA. Algebra, functions, systems, and word problems. Small groups. Book a free assessment.',
    keywords:
      'integrated math 1 tutoring Dublin CA, IM1 tutor Dublin, integrated math tutor Tri-Valley, DUSD math tutoring, algebra functions graphs tutoring, systems of equations help Dublin CA',
    path: '/courses/integrated-math-1-dublin-ca',
  },

  '/coding': {
    title: 'Coding Classes Kids | Dublin CA | GrowWise',
    description:
      'Coding classes for Grades 5-12 in Dublin, CA. Explore Python, AI, and app development paths. Build real projects and book a trial class.',
    keywords:
      'coding classes Dublin CA, coding for kids Dublin, Python coding classes Dublin CA, AI coding classes kids, app development classes kids, Python programming for high school students, Python programming for middle school students, high school computer science preparation, AP Computer Science preparation, Python for AI and machine learning, text-based coding for kids, beginner Python course for students',
    path: '/coding',
  },

  '/coding/python': {
    title: 'Python Coding Classes Kids | Dublin CA | GrowWise',
    description:
      'Python coding classes for Grades 5-12 in Dublin, CA. Build real projects and prepare for high school computer science, AI, and data science. Book a trial class.',
    keywords:
      'Python coding classes Dublin CA, Python programming for kids Dublin, Python programming for high school students, Python programming for middle school students, high school computer science preparation, AP Computer Science preparation, text-based coding for kids, beginner Python course for students, Python for AI and machine learning',
    path: '/coding/python',
  },

  '/coding/ml-ai': {
    title: 'ML & AI Coding Classes Kids | Dublin CA | GrowWise',
    description:
      'Machine learning and AI coding classes for Grades 7-12 in Dublin, CA. Build AI projects after Python foundations and book a trial class.',
    keywords:
      'AI coding classes Dublin CA, machine learning classes for kids, ML AI coding for students, Python AI course for students, generative AI classes for kids, high school AI course, machine learning for middle school students, AI projects for students',
    path: '/coding/ml-ai',
  },

  '/coding/app-development': {
    title: 'App Development Classes Kids | Dublin CA | GrowWise',
    description:
      'App development coding classes for Grades 6-12 in Dublin, CA. Build webpages, interfaces, and interactive portfolio projects. Book a trial class.',
    keywords:
      'app development classes Dublin CA, coding apps for kids, web development for students, app development for middle school, app development for high school, coding portfolio projects, programming classes Dublin CA',
    path: '/coding/app-development',
  },

  '/future-skills': {
    title: 'Future Skills Certification Pathways | GrowWise',
    description:
      'Future Skills pathways for Grades 6-12. Python, creative media, AI/ML, and entrepreneurship. Project-first learning before optional external exams.',
    keywords:
      'future skills classes for students, certification pathways for kids, creative media certification, Python certification for students, AI machine learning classes students, AI entrepreneurship for teens, Adobe Certified Professional prep, PCEP prep students, Python Institute prep, Certiport Authorized Testing Center Dublin, optional external certification prep, online future skills classes',
    path: '/future-skills',
  },

  '/future-skills/design-creative-media': {
    title: 'Design & Creative Media Certification Pathway | GrowWise',
    description:
      'Design and creative media for Grades 5-10. Posters, presentations, social media, short video, and Adobe certification pathway prep.',
    keywords:
      'Canva design classes for kids, creative media classes students, Adobe Certified Professional prep, Certiport Authorized Testing Center Dublin, Photoshop certification prep students, Illustrator certification prep, Premiere Pro certification prep, design portfolio for students, digital design classes Dublin CA',
    path: '/future-skills/design-creative-media',
  },

  '/future-skills/python-certification': {
    title: 'Python Coding Certification Pathway | GrowWise',
    description:
      'Python certification pathway for Grades 7-12. Build Python fluency, projects, PCEP readiness, and PCAP prep through 90-minute sessions.',
    keywords:
      'Python certification for students, PCEP prep for kids, PCAP prep students, Python Institute PCEP, Python Institute PCAP, ITS Python Certiport Dublin, Python coding classes Dublin CA, high school computer science preparation, Python project builder, Python exam prep for teens',
    path: '/future-skills/python-certification',
  },

  '/future-skills/ai-machine-learning': {
    title: 'AI & Machine Learning Certification Pathway | GrowWise',
    description:
      'AI and machine learning pathway for Grades 8-12. Learn AI literacy, Python for AI, datasets, model basics, responsible AI, and certification readiness.',
    keywords:
      'AI classes for students, machine learning classes for teens, AI certification pathway, Python for AI students, ML project builder, NVIDIA DLI students, AWS Educate badge, Microsoft Certified Fundamentals AI-900 prep',
    path: '/future-skills/ai-machine-learning',
  },

  '/future-skills/ai-entrepreneurship': {
    title: 'AI Entrepreneur & Business Pathway | GrowWise',
    description:
      'AI entrepreneurship pathway for Grades 7-12. Turn ideas into validated products, landing pages, pitch decks, business models, and certification readiness.',
    keywords:
      'AI entrepreneurship for teens, business classes for students, startup pitch class, AI product builder, ESB certification prep, Meta certification prep Certiport Dublin, entrepreneurship certification students, digital marketing exam prep students',
    path: '/future-skills/ai-entrepreneurship',
  },

  '/game-dev': {
    title: 'Game Dev for Kids | Dublin CA | GrowWise',
    description:
      'Game dev for ages 6–16 in Dublin, CA. Scratch, Roblox, and project builds. Hands-on classes with expert coaches. Book a free trial.',
    keywords:
      'game development Dublin CA, game development for kids, Scratch programming Dublin, Roblox coding classes, Minecraft modding, kids game design, game development courses near me, learn game development Dublin, coding games for kids Dublin CA, game programming classes',
    path: '/game-dev',
  },

  '/steam': {
    title: 'STEAM Programs | Dublin CA | GrowWise',
    description:
      'STEAM programs in Dublin, CA: coding, ML/AI, and game dev for Grades 1–12. Project-based, hands-on learning. Book a free assessment today.',
    keywords:
      'STEAM programs Dublin CA, ML AI coding, game development, coding classes for kids, programming courses, STEM education, technology courses, coding classes Dublin CA, programming for kids, STEAM education, robotics, computer science for kids',
    path: '/steam',
  },

  '/steam/ml-ai-coding': {
    title: 'ML & AI Coding for Kids | Dublin CA | GrowWise',
    description:
      'ML and AI coding in Dublin, CA. Hands-on projects for students. Small classes and expert instructors. Book a free trial.',
    keywords:
      'ML AI coding Dublin CA, machine learning course, artificial intelligence course, AI coding for kids, ML programming, AI programming, machine learning for students, AI classes Dublin CA, coding AI, learn machine learning, artificial intelligence tutoring',
    path: '/steam/ml-ai-coding',
  },

  '/steam/game-development': {
    title: 'Game Development Course | Dublin CA | GrowWise',
    description:
      'Game development classes in Dublin, CA. Build real games with Roblox, Scratch, and Python for Grades 1–12. Small groups, expert coaches. Book a free trial.',
    keywords:
      'game development course Dublin CA, learn game development, coding games, game programming, game design course, kids game development, Roblox coding, Scratch programming, Python game development, game development classes, coding games for kids',
    path: '/steam/game-development',
  },

  '/enroll': {
    title: 'Enroll at GrowWise School | Dublin, CA',
    description:
      'Enroll your child at GrowWise — grades 1–12 tutoring and STEAM programs in Dublin, CA. Fill out the form and we\'ll respond within 24 hours.',
    keywords:
      'enroll GrowWise, tutoring enrollment, Grades 1-12 enrollment Dublin CA, STEAM program enrollment, sign up for tutoring',
    path: '/enroll',
  },

  '/enroll-academic': {
    title: 'Enroll in Tutoring Programs | GrowWise Dublin, CA',
    description:
      'Enroll your child in Math, English, SAT prep or STEAM programs at GrowWise Dublin, CA. Personalized lessons for Grades 1-12. Get started today.',
    keywords:
      'enroll academic programs, math enrollment, English enrollment, academic tutoring enrollment Dublin CA, Grades 1-12 enrollment, SAT prep enrollment',
    path: '/enroll-academic',
  },

  '/self-check': {
    title: 'Academic Self-Check for Students | GrowWise Dublin CA',
    description:
      'Answer 8 questions to find out where you stand in math or English. Get a clear picture of your strengths and the gaps holding you back — in under 10 minutes.',
    keywords:
      'math self-check, free math diagnostic, math mistake patterns, math tutoring Dublin CA, child math assessment, math gap finder, GrowWise School',
    path: '/self-check',
  },

  '/readinesschecklist': {
    title: 'Free Math & Reading Readiness Checklist for Parents | GrowWise School Dublin CA',
    description:
      'Free interactive checklist for Dublin and Tri-Valley parents. Identify math gaps, reading comprehension issues, and writing weaknesses in grades 1–8. No signup required.',
    keywords:
      'math readiness checklist, reading comprehension assessment, academic gap finder, learning gaps checklist, Dublin math tutor, Tri-Valley education, parent resources, grades 1-8',
    path: '/readinesschecklist',
  },

  '/resources/how-to-choose-summer-camp': {
    title: 'How to Choose the Right Summer Camp | Parent Guide | GrowWise',
    description:
      "Interactive parent guide for choosing between academic sprint, STEAM coding, and enrichment camps based on your child's grade, goal, and gaps.",
    keywords:
      'how to choose summer camp, parent summer camp guide, Dublin CA summer camp, academic summer camp, STEAM summer camp, kids camp selection',
    path: '/resources/how-to-choose-summer-camp',
    type: 'article',
  },

  '/book-assessment': {
    title: 'Free Math & English Assessment for Kids | GrowWise Dublin',
    description:
      'Book a free diagnostic assessment at GrowWise in Dublin, CA. We identify exactly where your child needs support and build a personalized learning plan.',
    keywords:
      'free academic assessment Dublin CA, free assessment, placement assessment, math English evaluation, personalized learning plan, book assessment',
    path: '/book-assessment',
  },

  '/math-finals-practice-session': {
    title: 'High School Math Finals Prep | Dublin, CA | GrowWise',
    description: MATH_FINALS_PRACTICE_SESSION_DESCRIPTION,
    keywords:
      'high school math finals prep, Dublin CA math tutoring, algebra 1 finals, algebra 2 finals, Pre-Calculus review, Tri-Valley math, GrowWise',
    path: '/math-finals-practice-session',
  },

  // Thank-you: runtime `generateMetadata` uses `buildFormThankYouMetadata` + `src/data/form-thank-you/en.json` (noindex).
  '/book-assessment/thank-you': {
    title: 'Assessment request received | GrowWise',
    description:
      'Thank you — we received your free assessment booking. Our team will contact you within 24 hours to confirm your appointment.',
    keywords: 'GrowWise, assessment, thank you, confirmation',
    path: '/book-assessment/thank-you',
  },
  '/enroll-academic/thank-you': {
    title: 'Academic enrollment request received | GrowWise',
    description:
      'Thank you for your academic enrollment request. We will connect with you within 24 hours.',
    keywords: 'GrowWise, academic enrollment, thank you',
    path: '/enroll-academic/thank-you',
  },
  '/enroll/thank-you': {
    title: 'Enrollment request received | GrowWise',
    description:
      'Thank you for your enrollment request. A GrowWise advisor will contact you within 24 hours.',
    keywords: 'GrowWise, enrollment, thank you',
    path: '/enroll/thank-you',
  },
  '/contact/thank-you': {
    title: 'Message received | GrowWise',
    description:
      'Thank you for contacting GrowWise. We will respond as soon as possible, typically within one business day.',
    keywords: 'GrowWise, contact, thank you',
    path: '/contact/thank-you',
  },

  '/camps': {
    title: 'Kids Camps Dublin CA | STEAM & Academic | GrowWise',
    description:
      'STEAM & academic summer camps in Dublin, CA. Coding, AI, robotics, math, and writing for Grades 1–12. Book a free assessment today.',
    keywords:
      'kids camps Dublin CA, summer camp Dublin, STEAM camp Tri-Valley, coding camp kids, winter camp Dublin, academic camp Dublin CA, kids spring break camps Dublin California',
    path: '/camps',
  },

  '/camps/winter': {
    title: 'Winter Camp 2025 | Dublin CA | GrowWise',
    description:
      'GrowWise Winter Camp: academic and STEAM workshops during winter break in Dublin, CA. Coding, math, and writing for grades 1–12. Reserve your week.',
    keywords:
      'winter camp 2025, winter break programs, academic winter camp, STEAM winter camp, winter tutoring Dublin CA, December camp, kids spring break camps Dublin California',
    path: '/camps/winter',
  },

  '/camps/winter/calendar': {
    title: 'Winter Camp Schedule 2025 | GrowWise',
    description:
      'Winter camp workshop schedule in Dublin, CA. View all dates, times, and weekly themes for coding, math, and STEAM. Reserve your spot early.',
    keywords:
      'winter camp schedule, winter camp calendar, workshop schedule, December camp schedule, winter break activities',
    path: '/camps/winter/calendar',
  },

  '/camps/summer': {
    title: 'Math, Robotics, Coding & AI Camps Dublin CA | GrowWise',
    description:
      'Summer camps in Dublin, CA for Grades 1–12: Math, Robotics, Coding, AI, game development, and writing. Weekly June–August 2026. Reserve a spot.',
    keywords:
      'summer camp Dublin CA, summer camps Dublin CA 2026, STEAM summer camp Dublin, coding summer camp Dublin CA, math summer camp Dublin CA, summer camp Tri-Valley, summer programs for kids Dublin CA, summer coding camp Dublin CA, summer STEAM camp Dublin CA 2026, coding camp kids Tri-Valley, summer math camp Dublin CA, AI camp for kids Dublin CA, robotics camp kids Dublin CA, game development camp kids, young authors camp summer 2026, summer camp 2026 Dublin CA, STEM camp Pleasanton, STEM camp San Ramon',
    path: '/camps/summer',
    image: CAMP_SUMMER_BANNER_IMAGE,
  },

  '/camps/high-school-summer-intensive-dublin-ca': {
    title: 'High School Summer Math | Dublin CA',
    description:
      'Six-week summer math intensives for Algebra 1, Algebra 2, Precalculus, and Calculus AB in Dublin, CA.',
    keywords:
      'high school summer math Dublin CA, Algebra 1 summer intensive, Algebra 2 summer course, Precalculus summer, Calculus AB prep',
    path: '/camps/high-school-summer-intensive-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/summer/guide-success': {
    title: 'Thank You — Summer Camp Guide | GrowWise',
    description:
      'Thanks for requesting the GrowWise summer camp guide. Check email and reserve your week before seats fill.',
    keywords:
      'GrowWise summer camp, camp guide PDF, Dublin CA summer camp, STEM camp Tri-Valley',
    path: '/camps/summer/guide-success',
    image: CAMP_SUMMER_BANNER_IMAGE,
  },

  '/camps/high-school-summer-intensive-dublin-ca': {
    title: 'High School Summer Math Intensive Dublin CA | GrowWise',
    description:
      '6-week summer math intensives for Grades 8–12 in Dublin, CA. Algebra 1, Algebra 2, Precalculus, and AP Calculus AB. Small groups.',
    keywords:
      'high school summer math Dublin CA, algebra summer intensive, precalculus summer camp, calculus AB summer Dublin, DUSD PUSD summer math',
    path: '/camps/high-school-summer-intensive-dublin-ca',
    image: `${canonicalSiteUrl}/assets/courses/math-band-high-school.webp`,
  },

  '/camps/academic-summer-programs-dublin-ca': {
    title: 'Academic Summer Programs Dublin CA | GrowWise',
    description:
      'Affordable small-group reading, writing, and math summer programs in Dublin, CA. Daily focused instruction plus guided practice. Grades 1–10.',
    keywords:
      'academic summer programs Dublin CA, summer reading program Dublin, summer math program Dublin CA, DUSD PUSD IM1 summer prep, affordable summer academic support, algebra summer prep, geometry summer prep Dublin',
    path: '/camps/academic-summer-programs-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/academic-summer-sprint-dublin-ca': {
    title: 'Academic Summer Sprint Dublin CA | GrowWise',
    description:
      'Read to Prove, Write with Structure & Mistake-Proof Math sprints in Dublin, CA. Starts June 15. DUSD aligned. Small groups — enroll online.',
    keywords:
      'academic summer sprint Dublin CA, Read to Prove summer program, Write with Structure summer writing, Mistake-Proof Math Dublin, summer reading comprehension Dublin, DUSD summer academic program',
    path: '/camps/academic-summer-sprint-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/summer-reading-writing-dublin-ca': {
    title: 'Summer Reading & Writing Programs Dublin CA | GrowWise',
    description:
      'Small-group summer reading comprehension and writing programs in Dublin, CA. Grades 1–8. 90 min/day. Starts June 15. Max 8 students. DUSD aligned.',
    keywords:
      'summer reading program Dublin CA, summer writing program Dublin, Read to Prove Dublin, Write to Explain summer, DUSD reading writing summer',
    path: '/camps/summer-reading-writing-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/summer-math-foundations-dublin-ca': {
    title: 'Summer Math Program Dublin CA | GrowWise',
    description:
      'Small-group summer math program in Dublin, CA. Fractions, word problems, grade readiness. Grades 1–8. 90 min/day. Starts June 15. Max 8 students.',
    keywords:
      'summer math program Dublin CA, Bridge the Gap Math, math foundations summer Dublin, DUSD math summer program',
    path: '/camps/summer-math-foundations-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/summer-algebra-dublin-ca': {
    title: 'Algebra 1 Get Ready Dublin CA | GrowWise School',
    description:
      'Algebra 1 Get Ready summer program in Dublin, CA. DUSD & PUSD aligned. Grades 7–8. Mon/Wed/Fri 5–6:30 PM. From $249. Max 8 students.',
    keywords:
      'summer algebra program Dublin CA, Algebra 1 Get Ready Dublin, DUSD algebra summer prep, algebra summer camp Tri-Valley',
    path: '/camps/summer-algebra-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/summer-geometry-precalculus-dublin-ca': {
    title: 'Geometry Get Ready Dublin CA | GrowWise School',
    description:
      'Geometry Get Ready summer program in Dublin, CA. Proofs & reasoning. DUSD & PUSD aligned. Grades 9–10. Mon/Wed/Fri 5–6:30 PM. From $279.',
    keywords:
      'summer geometry program Dublin CA, Geometry Get Ready Dublin, DUSD geometry summer prep, geometry summer Dublin CA',
    path: '/camps/summer-geometry-precalculus-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/camps/summer-im-get-ready-dublin-ca': {
    title: 'IM1 & IM2 Get Ready Cohorts Dublin CA | GrowWise School',
    description:
      'Choose IM1 or IM2 Get Ready summer cohorts for first-quarter readiness. DUSD & PUSD aligned. Mon/Wed/Fri evenings. Starts July 20. From $249. Dublin, CA.',
    keywords:
      'IM1 IM2 Get Ready Dublin CA, Integrated Math summer prep Tri-Valley, DUSD PUSD math cohort Dublin',
    path: '/camps/summer-im-get-ready-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },
  '/camps/summer-im1-get-ready-dublin-ca': {
    title: 'IM1 Get Ready Summer Cohort Dublin CA | GrowWise School',
    description:
      'IM1 Get Ready: first-quarter algebra readiness for Integrated Math 1. DUSD & PUSD aligned. Mon/Wed/Fri 5–6:30 PM. Starts July 20. From $249. Dublin, CA.',
    keywords:
      'IM1 prep Dublin CA, Integrated Math 1 summer cohort, DUSD IM1 readiness, Grade 7 accelerated math Dublin',
    path: '/camps/summer-im1-get-ready-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },
  '/camps/summer-im2-get-ready-dublin-ca': {
    title: 'IM2 Get Ready Summer Cohort Dublin CA | GrowWise School',
    description:
      'IM2 Get Ready: geometry, proof, and similarity readiness for Integrated Math 2. DUSD & PUSD aligned. Mon/Wed/Fri 5–6:30 PM. From $249. Dublin, CA.',
    keywords:
      'IM2 prep Dublin CA, Integrated Math 2 summer cohort, geometry proof readiness Dublin, PUSD IM2 prep',
    path: '/camps/summer-im2-get-ready-dublin-ca',
    image: CAMP_ACADEMIC_BANNER_IMAGE,
  },

  '/growwise-blogs': {
    title: 'GrowWise Blog | Math, English & Coding Tips',
    description:
      'Articles on math tutoring, English, coding, and STEAM for Tri-Valley families. Practical tips and guides from GrowWise educators in Dublin, CA.',
    keywords:
      'math tutoring tips, English tutoring advice, coding for kids, STEAM education, Grades 1-12 education blog, Dublin CA education, parenting tips, learning resources',
    path: '/growwise-blogs',
  },

  '/resources': {
    title: 'Parent Guides & Resources | K-12 Learning Tips | GrowWise',
    description:
      'Free guides for parents on math mistakes, homework independence, SAT prep, coding for kids, and more. Research-backed advice from GrowWise educators.',
    keywords:
      'parent guides, K-12 learning tips, math mistakes, homework independence, SAT prep timing, coding for kids, vibe coding, Python vs Scratch, tutoring Dublin CA, GrowWise resources',
    path: '/resources',
  },

  '/resources/tutoring-dublin-ca': {
    title: 'K-12 Tutoring in Dublin, CA: How to Choose the Right Program (2026) | GrowWise',
    description:
      'Looking for tutoring in Dublin, CA for your Grade 1–12 student? This guide helps Tri-Valley parents choose between program types — and the questions to ask before enrolling.',
    keywords:
      'tutoring Dublin CA, tutoring Dublin California, K-12 tutoring Dublin California, math tutoring Dublin CA, tutoring near me Dublin CA, after school tutoring Dublin CA Tri-Valley, tutoring Pleasanton CA, tutoring San Ramon CA, coding classes Dublin CA kids, SAT prep Dublin CA, academic programs Tri-Valley',
    path: '/resources/tutoring-dublin-ca',
    type: 'article',
  },

  '/resources/summer-slide-dublin-ca': {
    title: 'Summer Slide Dublin CA: What Parents Need to Know | GrowWise',
    description:
      'Dublin and Tri-Valley students lose months of progress every summer. Learn what the summer slide looks like — and how structured programs prevent it.',
    keywords:
      'summer slide Dublin CA, academic summer programs Dublin CA, summer learning loss Tri-Valley, summer slide prevention, summer tutoring Dublin CA, summer learning loss Dublin CA',
    path: '/resources/summer-slide-dublin-ca',
    type: 'article',
  },

  '/resources/summer-slide-prevention': {
    title: 'How to Prevent Summer Slide in Math & Reading | GrowWise',
    description:
      "Summer learning loss is real. Here's what actually prevents it — and why most summer plans fail by July.",
    keywords:
      'summer slide, prevent summer learning loss, summer academic skills, summer math review, summer reading practice, kids learning over summer break, summer academic program, how to prevent summer slide, summer tutoring, summer learning activities',
    path: '/resources/summer-slide-prevention',
    type: 'article',
  },

  '/resources/khan-academy-summer-doesnt-work': {
    title: 'Why Khan Academy Summer Plans Fail | GrowWise',
    description:
      "Self-paced online learning has a completion problem. Here's why most at-home summer plans fail by July — and what research says works.",
    keywords:
      'Khan Academy summer, self-paced learning completion, summer learning at home, math tutoring summer, online learning fail, summer learning plan, at-home learning, summer academic programs, structured summer learning, completion rates online learning',
    path: '/resources/khan-academy-summer-doesnt-work',
    type: 'article',
  },

  '/resources/summer-academic-program-checklist': {
    title: 'Best Summer Academic Program Dublin CA | 5 Checks',
    description:
      'Before you enroll, check class size, instructor expertise, curriculum, outcomes, and school-year alignment for Dublin CA summer programs.',
    keywords:
      'best summer academic program Dublin CA, summer academic program Dublin CA, summer enrichment Tri-Valley, academic summer camp Dublin, summer reading writing math program Dublin, how to choose summer program Dublin CA',
    path: '/resources/summer-academic-program-checklist',
    type: 'article',
  },

  '/resources/affordable-summer-academic-programs-dublin-ca': {
    title: 'Affordable Summer Programs Dublin CA | Parent Guide',
    description:
      'Compare summer academic programs in Dublin, CA and learn how to evaluate true value based on class size, outcomes, structure, and skill-building.',
    keywords:
      'affordable summer programs Dublin CA, academic summer camp Dublin Pleasanton, summer academic programs Tri-Valley, summer tutoring Dublin CA, affordable summer academic programs, summer camp value Dublin, Tri-Valley summer programs',
    path: '/resources/affordable-summer-academic-programs-dublin-ca',
    type: 'article',
  },

  '/resources/math-summer-program-dublin-ca-math-sprint-breakdown': {
    title: 'Math Summer Program Dublin CA | Week-by-Week Guide',
    description:
      'See what students do in GrowWise Math Sprint: baseline assessment, core skill building, problem solving, and confidence-building review.',
    keywords:
      'math summer program Dublin CA, Math Sprint Dublin CA, summer math program Tri-Valley, math sprint grades 1-10, math enrichment Dublin',
    path: '/resources/math-summer-program-dublin-ca-math-sprint-breakdown',
    type: 'article',
  },

  '/resources/reading-program-grades-1-2-dublin-ca': {
    title: 'Reading Program Grades 1-2 Dublin CA | Parent Guide',
    description:
      'Early reading gaps get harder after Grade 2. Learn what phonics, fluency, and comprehension support should look like.',
    keywords:
      'reading program grades 1-2 Dublin CA, early reading support summer Dublin, summer reading program Tri-Valley, grade 1 reading help Dublin, grade 2 reading help Dublin',
    path: '/resources/reading-program-grades-1-2-dublin-ca',
    type: 'article',
  },

  '/resources/small-group-tutoring-vs-1-on-1': {
    title: 'Small Group vs 1-on-1 Tutoring | Dublin CA Guide',
    description:
      'Private tutoring is not always the best fit. Learn when small-group instruction helps students build independence and confidence.',
    keywords:
      'small group tutoring vs 1-on-1, summer tutoring Dublin CA, small group learning Tri-Valley, tutoring alternatives Dublin CA, best tutoring format kids',
    path: '/resources/small-group-tutoring-vs-1-on-1',
    type: 'article',
  },

  '/resources/california-math-standards-by-grade': {
    title: 'California Math Standards by Grade | Parent Guide',
    description:
      'A parent-friendly grade-by-grade math standards snapshot for Grades 1-10, with red flags that can reveal hidden gaps.',
    keywords:
      'California math standards by grade, CA math standards Tri-Valley, DUSD math standards, PUSD math expectations, math gap assessment Dublin CA',
    path: '/resources/california-math-standards-by-grade',
    type: 'article',
  },

  '/resources/child-struggles-with-writing-dublin-ca': {
    title: 'Child Struggles With Writing | Dublin CA Parent Guide',
    description:
      'Blank-page freeze, short answers, and writing avoidance can signal skill gaps, confidence gaps, or both. Learn what helps.',
    keywords:
      'child struggles with writing, writing help Dublin CA, child avoids writing, blank page freeze writing, writing confidence kids, summer writing program Dublin CA',
    path: '/resources/child-struggles-with-writing-dublin-ca',
    type: 'article',
  },

  '/resources/im1-summer-prep-dublin-ca': {
    title: 'IM1 Summer Prep Dublin CA | Readiness Guide | GrowWise',
    description:
      'Integrated Math 1 starts fast. Learn the pre-algebra, ratio, graphing, and equation skills Dublin students need before day one.',
    keywords:
      'IM1 summer prep Dublin CA, integrated math 1 prep Tri-Valley, IM1 readiness checklist, DUSD math prep, PUSD IM1 prep, summer math program Dublin, pre-algebra prep, math camp Dublin CA',
    path: '/resources/im1-summer-prep-dublin-ca',
    type: 'article',
  },

  '/resources/summer-writing-program-dublin-ca': {
    title: 'Summer Writing Program Dublin CA | Parent Guide | GrowWise',
    description:
      'Compare Dublin CA writing camps by structure, feedback, revision, and outcomes so your child builds a writing system before school starts.',
    keywords:
      'summer writing program Dublin CA, writing camp Tri-Valley, summer writing classes Dublin, writing instruction grades 1-8, academic writing camp, writing sprint, essay writing program, summer writing camp Pleasanton, San Ramon writing program',
    path: '/resources/summer-writing-program-dublin-ca',
    type: 'article',
  },

  '/resources/python-vs-scratch': {
    title: 'Python vs Scratch for Kids: Which Should Your Child Learn First? | GrowWise',
    description:
      "Scratch or Python? The honest, age-by-age answer for parents — including when to switch, what Scratch can't do, and why most kids need both in the right order.",
    keywords:
      'Python vs Scratch for kids, should kids learn Scratch or Python first, when to switch from Scratch to Python, best coding language for kids, Scratch for kids ages 6-10, Python for kids ages 10-14',
    path: '/resources/python-vs-scratch',
    type: 'article',
  },

  '/resources/reading-fluency-vs-comprehension': {
    title: 'Fluency vs Comprehension: Reading Gaps | GrowWise',
    description:
      'Your child can decode every word but still not understand what they read. Learn how to tell fluency from comprehension gaps—and why support matters.',
    keywords:
      'reading fluency vs comprehension, reading fluency comprehension difference, child reads but doesn\'t understand, reading program, reading comprehension gap, reading fluency gap, child struggles with reading comprehension',
    path: '/resources/reading-fluency-vs-comprehension',
    type: 'article',
  },

  '/why-growwise': {
    title: 'Why GrowWise | Structured, School-Aligned Programs for Grades 1–12',
    description:
      'GrowWise uses a diagnostic-first, 3-level progression model with monthly progress reports and school-aligned curriculum. See how it compares to traditional tutoring programs.',
    keywords:
      'tutoring programs, structured tutoring, diagnostic assessment, school-aligned curriculum, diagnostic-first learning, small group tutoring, monthly progress reports, diagnostic learning model',
    path: '/why-growwise',
  },

  '/resources/why-grades-hide-learning-gaps': {
    title: "Why Your Child's A Grade May Be Hiding a Learning Gap | GrowWise",
    description:
      "A grade measures performance on one day — not understanding. Here are three signs your child's grade is hiding a gap, and what to do about it.",
    keywords:
      'learning gap grades, does good grade mean ready for next grade, child good grades but struggling, grades hide learning gaps, academic gap assessment, diagnostic vs grade',
    path: '/resources/why-grades-hide-learning-gaps',
    type: 'article',
  },

  '/resources/careless-math-mistakes': {
    title: 'Why Kids Make Careless Math Mistakes on Tests | GrowWise',
    description:
      "Your child knows the material but still loses points. Careless math mistakes follow specific patterns — and each pattern has a fix. Here's how to find the real blocker.",
    keywords:
      'careless mistakes in math, why kids lose points on math tests, child makes careless math mistakes, how to stop careless mistakes in math, child understands math but gets wrong answers, math mistake patterns, procedural errors in math',
    path: '/resources/careless-math-mistakes',
    type: 'article',
  },

  '/resources/what-is-vibe-coding': {
    title: "What Is Vibe Coding? A Parent's Guide (2026) | GrowWise",
    description:
      "Vibe coding is the fastest-growing way kids learn to build real apps in 2026. Here's what it actually is, why it matters, and the one risk most parents miss.",
    keywords:
      'what is vibe coding, vibe coding for kids, vibe coding explained for parents, should kids learn vibe coding, vibe coding 2026, AI coding for kids, coding for kids 2026, AI-assisted coding children',
    path: '/resources/what-is-vibe-coding',
    type: 'article',
  },

  '/resources/homework-independence': {
    title: 'How to Stop Sitting Next to Your Child Every Homework Night | GrowWise',
    description:
      "If you have to sit with your child every night for homework to get done, that's a system problem — not a character flaw. Here's how to build real homework independence in 6–8 weeks.",
    keywords:
      'how to get child to do homework independently, child won\'t do homework without me, homework independence kids, stop sitting with child for homework, homework battles every night, building homework routine kids, child procrastinates homework',
    path: '/resources/homework-independence',
    type: 'article',
  },

  '/resources/when-to-start-sat-prep': {
    title: 'When Should My Child Start SAT Prep? Grade-by-Grade Guide | GrowWise',
    description:
      "Grade 8, 9, or 10? Most parents ask too late. Here's the honest, grade-by-grade answer — including the one thing most SAT prep programs don't check first.",
    keywords:
      'when to start SAT prep, what grade to start SAT preparation, when should my child start SAT prep, SAT prep grade 8 9 10, how early to start SAT prep, digital SAT prep 2026, SAT preparation timeline high school, PSAT preparation grades 8-10, SAT math foundation gaps',
    path: '/resources/when-to-start-sat-prep',
    type: 'article',
  },

  '/workshop-calendar': {
    title: 'Free Workshop Calendar | GrowWise Dublin',
    description:
      'Free Saturday workshops in Dublin, CA: reading, math, coding, AI studio, and parent webinars. View upcoming dates and register your spot at GrowWise.',
    keywords:
      'workshop calendar, free workshops, Saturday workshops, reading workshop, math olympiad, scratch coding, AI studio, parent webinar, Dublin CA',
    path: '/workshop-calendar',
  },

  '/privacy-policy': {
    title: 'Privacy Policy | GrowWise',
    description:
      'Read the GrowWise privacy policy. Learn how we collect, use, store, and protect your personal information as a student or parent on our platform.',
    keywords: 'GrowWise privacy policy, data protection, personal information',
    path: '/privacy-policy',
  },

  '/terms-conditions': {
    title: 'Terms & Conditions | GrowWise',
    description:
      'Read the GrowWise terms and conditions governing use of our website, tutoring programs, STEAM classes, and camps. Applies to all students and parents.',
    keywords: 'GrowWise terms conditions, terms of service, website terms',
    path: '/terms-conditions',
  },
}

/**
 * Get metadata configuration for a given path
 */
export function getMetadataConfig(path: string): PageMetadataConfig | null {
  // Normalize: empty string or "/" → lookup "/"; other paths strip leading/trailing slashes then prepend one
  if (path === '' || path === '/') {
    return metadataConfig['/'] || null
  }
  const stripped = path.replace(/^\/+|\/+$/g, '')
  const lookupPath = stripped === '' ? '/' : `/${stripped}`
  return metadataConfig[lookupPath] || null
}

/**
 * Get all metadata configs (useful for sitemap generation, etc.)
 */
export function getAllMetadataConfigs(): PageMetadataConfig[] {
  return Object.values(metadataConfig)
}
