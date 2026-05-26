/**
 * Centralized SEO metadata configuration
 * All page metadata is defined here for easy maintenance
 * Titles: max 60 characters. Descriptions: max 150 characters (no pricing).
 */

import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'

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
    title: 'About GrowWise | Dublin CA | Grades 1-12 & STEAM',
    description:
      "GrowWise offers Grades 1-12 tutoring and STEAM in Dublin, CA. Expert instructors, personalized learning, and proven results.",
    keywords:
      'about GrowWise, tutoring center Dublin CA, Grades 1-12 education Dublin, STEAM programs, educational excellence',
    path: '/about',
  },


  '/dublin-ca': {
    title: 'K-12 Tutoring & Coding Classes in Dublin, CA | GrowWise',
    description:
      'In-person math, English, coding, SAT prep, and summer camps at 4564 Dublin Blvd. Serving Tri-Valley families. Book a free assessment.',
    keywords:
      'tutoring Dublin CA, coding classes Dublin, SAT prep Dublin, Tri-Valley tutoring, K-12 tutoring Pleasanton, San Ramon tutoring, GrowWise Dublin',
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

  '/courses/math': {
    title: 'K-12 Math Tutoring in Dublin, CA | GrowWise',
    description:
      'Expert math tutoring for Grades 1-12 in Dublin, CA. Elementary to AP-level. DUSD-aligned, small groups, personalized plans. Book your free assessment.',
    keywords:
      'math tutoring Dublin CA, math tutor Dublin, Grades 1-12 math courses, grade-level math, accelerated math, integrated math, DUSD math, PUSD math, algebra tutoring, geometry tutoring, pre-calculus, elementary math, middle school math, high school math, math classes Dublin CA, math enrichment Dublin CA, DUSD accelerated math, math help Dublin, math tutoring near me',
    path: '/courses/math',
  },

  '/courses/english': {
    title: 'English Tutoring Dublin CA | ELA | GrowWise',
    description:
      'English and ELA tutoring for grades 1–12 in Dublin, CA. Reading, writing, and grammar in small groups. Book a free assessment.',
    keywords:
      'English tutoring Dublin CA, English tutor Dublin, reading comprehension, essay writing, grammar tutoring, vocabulary development, English Language Arts, ELA tutoring, writing tutor, reading tutor, English classes Dublin CA, English help Dublin, English tutoring near me, Grades 1-12 English courses',
    path: '/courses/english',
  },

  '/courses/sat-prep': {
    title: 'SAT Prep Tutoring in Dublin, CA | GrowWise',
    description:
      'Score higher on the SAT with personalized prep in Dublin, CA. Practice tests, proven strategies & expert tutors. Small groups. Book a free assessment today.',
    keywords:
      'SAT prep Dublin CA, SAT preparation, SAT course, SAT tutoring Dublin, SAT test prep, SAT strategies, SAT practice tests, SAT classes Dublin CA, SAT help, SAT tutor near me, SAT prep course, SAT score improvement, college entrance exam prep',
    path: '/courses/sat-prep',
  },

  '/courses/high-school-math': {
    title: 'High School Math Tutoring Dublin CA | GrowWise',
    description:
      'Algebra, Geometry, Pre-Calculus & AP Math tutoring in Dublin, CA. DUSD-aligned lessons, expert tutors, small groups. Book a free assessment at GrowWise.',
    keywords:
      'high school math tutoring Dublin CA, algebra tutoring, algebra 1, algebra 2, geometry tutoring, pre-calculus, AP precalculus, integrated math, integrated math 1, integrated math 2, DUSD accelerated math placement, high school math courses Dublin CA, advanced math tutoring',
    path: '/courses/high-school-math',
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
      'Coding classes for ages 10–18 in Dublin, CA. Python, JavaScript, and web development basics in small groups with expert instructors. Book a free trial.',
    keywords:
      'coding classes Dublin CA, coding for kids Dublin, Python classes kids, JavaScript course kids, web development course Dublin, coding programs Grades 1-12, coding tutor Dublin, learn to code Dublin CA, kids coding near me, programming classes Dublin CA, coding classes near me',
    path: '/coding',
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
      'kids camps Dublin CA, summer camp Dublin, STEAM camp Tri-Valley, coding camp kids, winter camp Dublin, academic camp Dublin CA',
    path: '/camps',
  },

  '/camps/winter': {
    title: 'Winter Camp 2025 | Dublin CA | GrowWise',
    description:
      'GrowWise Winter Camp: academic and STEAM workshops during winter break in Dublin, CA. Coding, math, and writing for grades 1–12. Reserve your week.',
    keywords:
      'winter camp 2025, winter break programs, academic winter camp, STEAM winter camp, winter tutoring Dublin CA, December camp',
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
    title: 'Summer STEAM Camps 2026 in Dublin, CA | GrowWise',
    description:
      'Top-rated summer STEAM camps in Dublin, CA for Grades 3–12. Math, Coding, Robotics & AI. Weekly sessions June–August. Limited spots — enroll now.',
    keywords:
      'summer camp Dublin CA, summer camps Dublin CA 2026, STEAM summer camp Dublin, coding summer camp Dublin CA, math summer camp Dublin CA, summer camp Tri-Valley, summer programs for kids Dublin CA, summer coding camp Dublin CA, summer STEAM camp Dublin CA 2026, coding camp kids Tri-Valley, summer math camp Dublin CA, AI camp for kids Dublin CA, robotics camp kids Dublin CA, game development camp kids, young authors camp summer 2026, summer camp 2026 Dublin CA, STEM camp Pleasanton, STEM camp San Ramon',
    path: '/camps/summer',
    image: CAMP_SUMMER_BANNER_IMAGE,
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
      'tutoring Dublin CA, K-12 tutoring Dublin California, math tutoring Dublin CA, tutoring near me Dublin CA, after school tutoring Dublin CA Tri-Valley, tutoring Pleasanton CA, tutoring San Ramon CA, coding classes Dublin CA kids, SAT prep Dublin CA, academic programs Tri-Valley',
    path: '/resources/tutoring-dublin-ca',
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
