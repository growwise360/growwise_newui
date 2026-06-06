/**
 * English copy for /academic/math hub and grade-band stub pages.
 * Single source for UI + JSON-LD FAQ text.
 */

import { MATH_COURSE_PATHS } from '@/lib/math-course-paths';

export const MATH_HUB_PATH = MATH_COURSE_PATHS.hub;

/** Pre-compressed WebP hero (~23KB @ 1024w). Served from /public/assets/courses/. */
export const MATH_HUB_BANNER_SRC = '/assets/courses/math-hub-banner.webp' as const;

/** Smaller variant for viewports ≤768px (~13KB @ 640w). */
export const MATH_HUB_BANNER_SM_SRC = '/assets/courses/math-hub-banner-sm.webp' as const;

export type MathGradeBandId = 'elementary' | 'middle-school' | 'high-school';

export type MathHubJtbdSituation = {
  readonly id: string;
  readonly label: string;
  readonly symptoms: string;
  readonly resolution: string;
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
};

export type MathHubGradeBandCard = {
  readonly id: MathGradeBandId;
  readonly path: string;
  readonly gradeTag: string;
  readonly heading: string;
  readonly tagline: string;
  readonly description: string;
  readonly masteryLine?: string;
  readonly coursesIncluded: readonly string[];
  readonly packageLine: string;
  readonly ctaLabel: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly featured?: boolean;
};

export type MathHubProgramOption = {
  readonly name: string;
  readonly schedule: string;
  readonly price: string;
  readonly subtitle?: string;
  readonly bestFor?: string;
  readonly featured?: boolean;
};

export type MathHubProgramBandCard = {
  readonly id: MathGradeBandId;
  readonly path: string;
  readonly heading: string;
  readonly gradeRange: string;
  readonly tracks: string;
  readonly options: readonly MathHubProgramOption[];
  readonly ctaLabel: string;
  readonly includedBenefit?: string;
};

export const MATH_HUB_COPY = {
  breadcrumb: {
    academic: 'Academic',
    mathPrograms: 'Math Programs',
  },
  hero: {
    bannerAlt:
      'A math teacher leading a small-group tutoring session with students around a table in a bright classroom.',
    h1: "Find the right math program for your child's grade and goal.",
    subheading:
      "Not all math problems are the same — and neither are the programs. Every grade band has different gaps, different curriculum demands, and different parent concerns. Start by selecting where your child is right now.",
    trustBar: [
      'Live online · In-person in Dublin, CA · nationwide',
      '6–10 students per group',
      'Starts monthly — no waiting for September',
      'Diagnostic-first',
    ] as const,
  },
  gradeBands: {
    sectionLabel: "Choose your child's grade level",
    subheading: 'Three programs. Each built for a different stage of math learning.',
    cards: [
      {
        id: 'elementary',
        path: MATH_COURSE_PATHS.elementary,
        gradeTag: 'Grades 1–5',
        heading: 'Elementary math',
        tagline: 'Number sense, fractions, and reasoning — before the gaps compound.',
        description:
          'Most elementary math struggles trace back to one unaddressed concept from 6–12 months ago. We find it before it becomes a pattern.',
        masteryLine: '3 levels: Beginner · Champ · Pro · 90% mastery to advance',
        coursesIncluded: [
          'Place value',
          'Operations fluency',
          'Fractions & decimals',
          'Word problem structure',
          'Intro geometry',
        ],
        packageLine: 'From $169/month · Grade 1-2 Math · 75 minutes per week',
        ctaLabel: 'See elementary programs',
        imageSrc: '/assets/courses/math-band-elementary.webp',
        imageAlt:
          'Elementary students learning number sense and fractions in a small-group online math class.',
      },
      {
        id: 'middle-school',
        path: MATH_COURSE_PATHS.middleSchool,
        gradeTag: 'Grades 6–8',
        heading: 'Middle school math',
        tagline: 'Pre-Algebra, IM1, IM2 — including accelerated curriculum tracks.',
        description:
          'The jump into Integrated Math catches many students off guard. We close the gaps before they compound across the year.',
        masteryLine: '5th & 7th grade district placement · Course 1/2, C1, C3, IM1',
        coursesIncluded: [
          'Pre-Algebra',
          'Integrated Math 1',
          'Integrated Math 2',
          'Proportional reasoning',
          'Linear functions',
        ],
        packageLine: 'From $289/month · 150 minutes per week · 3-month program',
        ctaLabel: 'See middle school programs',
        imageSrc: '/assets/courses/math-band-middle-school.webp',
        imageAlt:
          'Middle school students working through pre-algebra and integrated math in a live tutoring session.',
        featured: true,
      },
      {
        id: 'high-school',
        path: MATH_COURSE_PATHS.highSchool,
        gradeTag: 'Grades 9–12',
        heading: 'High school math',
        tagline: 'Algebra 2 through AP Calculus — course-specific, not general review.',
        description:
          'High school math moves at pace. Our programs are built around the course your child is actually in — not a broad review of everything.',
        coursesIncluded: [
          'Algebra 2',
          'Geometry',
          'Pre-Calculus',
          'AP Calculus AB/BC',
          'AP Statistics',
          'SAT Math',
        ],
        packageLine: 'From $189/month · 75 min, once a week · 3-month program',
        ctaLabel: 'See high school programs',
        imageSrc: '/assets/courses/math-band-high-school.webp',
        imageAlt:
          'High school student writing math notes in a notebook at a desk with a laptop.',
      },
    ] satisfies readonly MathHubGradeBandCard[],
  },
  jtbd: {
    sectionLabel: 'Step 2 — Find your situation',
    heading: 'What problem are we solving?',
    body: "Most parents arrive with a symptom — grades dropped, homework is a battle, a harder course is coming. Select the situation that fits. We'll show you what's usually behind it and which program closes it.",
    situations: [
      {
        id: 'falling-behind',
        label: 'My child is falling behind and struggling to keep up',
        symptoms: 'Grades dropping, homework avoidance, inconsistent test scores',
        resolution:
          "A gap from 12–18 months back that hasn't been named. We run a diagnostic before the first session to find it.",
        primaryCta: { label: 'Book free assessment', href: '/book-assessment' },
        secondaryCta: { label: 'See rescue programs', href: '/academic/math' },
      },
      {
        id: 'harder-course-coming',
        label: 'A harder course is coming — I want them ready before day one',
        symptoms: 'IM1, IM2, Algebra 2, Pre-Calc transition',
        resolution:
          "Placement doesn't guarantee readiness. We prep for the specific concepts the course assumes on week one.",
        primaryCta: { label: 'See Math Get Ready programs', href: '/camps/academic-summer-programs-dublin-ca' },
        secondaryCta: { label: 'View 3-month packages', href: '/academic/math#packages' },
      },
      {
        id: 'gaps-unclear',
        label: "I can see gaps but can't pinpoint exactly what",
        symptoms:
          'Inconsistent performance, careless errors that never go away, strong on some topics and weak on others',
        resolution:
          'The GrowWise pattern finder runs before instruction begins. We identify the real gap — not just the symptom.',
        primaryCta: { label: 'Try the free Self-Check', href: '/self-check' },
        secondaryCta: { label: 'Book assessment', href: '/book-assessment' },
      },
      {
        id: 'ahead',
        label: 'My child is doing fine — I want them ahead',
        symptoms: 'Accelerated track, staying competitive, Math Olympiad interest',
        resolution:
          'We work above grade level in a small group with peers at the same pace. No ceiling.',
        primaryCta: { label: 'Talk to an advisor', href: '/contact' },
        secondaryCta: { label: 'View advanced programs', href: MATH_COURSE_PATHS.highSchool },
      },
      {
        id: 'year-round',
        label: 'They need consistent support through the school year',
        symptoms: 'Weekly instruction that tracks school, progress updates, continuity',
        resolution:
          '3-month rolling programs with monthly parent reports. Renew by quarter.',
        primaryCta: { label: 'Book free assessment', href: '/book-assessment' },
        secondaryCta: { label: 'See year-round packages', href: '/academic/math#packages' },
      },
    ] satisfies readonly MathHubJtbdSituation[],
  },
  howItWorks: {
    sectionLabel: 'How it works',
    heading: 'Every program starts with a diagnostic. Not a placement test — a pattern finder.',
    steps: [
      {
        title: 'Assessment (free)',
        description:
          'A 45-minute session that maps what your child knows, where reasoning breaks down, and what the first month of instruction should focus on. No charge. No commitment.',
      },
      {
        title: 'Program placement',
        description:
          'Based on assessment results, we place your child in the right grade band and curriculum track — standard or accelerated. Group size: 6–10 students.',
      },
      {
        title: '3-month program',
        description:
          'Defined curriculum scope. Sessions twice per week. Monthly parent progress report showing skills covered, patterns corrected, and next steps. Renew by quarter.',
      },
    ] as const,
  },
  programOptions: {
    sectionLabel: 'Programs · 3-month commitment',
    heading: 'Defined programs. Not open-ended tutoring.',
    body: "Each package has a fixed curriculum scope, a start-point diagnostic, and a clear outcome by the end of three months. You know what's covered before you enroll.",
    footnote: 'Prices shown are monthly rates. Contact us for exact pricing by program and schedule.',
    cards: [
      {
        id: 'elementary',
        path: MATH_COURSE_PATHS.elementary,
        heading: 'Elementary math',
        gradeRange: 'Grades 1–5',
        tracks: 'Beginner · Champ · Pro',
        ctaLabel: 'See full program',
        options: [
          { name: 'Grade 1&2 Math', schedule: '75 minutes per week', price: '$169/mo' },
          { name: 'Grade 3-5 Math', schedule: '2 × 60 min/week', price: '$289/mo' },
          {
            name: 'Math + Coding',
            schedule: '2 × 60 min/week',
            price: '$295/mo',
            bestFor: 'Scratch or Roblox',
          },
        ],
      },
      {
        id: 'middle-school',
        path: MATH_COURSE_PATHS.middleSchool,
        heading: 'Middle school math',
        gradeRange: 'Grades 6–8',
        tracks: 'IM1 · IM2 · Accelerated',
        ctaLabel: 'See full program',
        options: [
          {
            name: 'Regular Math Program',
            schedule: '150 minutes per week',
            price: '$289/mo',
            bestFor: 'Small-group math support for the current course sequence',
            featured: true,
          },
          {
            name: 'Advanced Math',
            schedule: '150 minutes per week',
            price: '$295/mo',
            bestFor:
              '4-6 students per group · Quarterly tests on all topics taught that quarter',
          },
        ],
        includedBenefit:
          'Quarterly tests cover all topics taught during the quarter.',
      },
      {
        id: 'high-school',
        path: MATH_COURSE_PATHS.highSchool,
        heading: 'High school math',
        gradeRange: 'Grades 9–12',
        tracks: 'Algebra 2 · AP Calc · SAT',
        ctaLabel: 'See full program',
        options: [
          { name: '1 Subject', schedule: '75 min/week', price: '$189/mo' },
          { name: '2 Subject', schedule: '2 × 60 min/week', price: '$369/mo' },
          {
            name: 'AP Math',
            subtitle: '(100% School Aligned)',
            schedule: '120 min/week',
            price: '$376/mo',
          },
        ],
        includedBenefit:
          'Complimentary 60-minute weekly practice session included with every program',
      },
    ] satisfies readonly MathHubProgramBandCard[],
  },
  geo: {
    heading: 'In the Tri-Valley?',
    body: "We also offer in-person sessions at our Dublin, CA center — aligned to the DUSD and PUSD curriculum sequences your child's school uses.",
    ctaLabel: 'See Dublin, CA programs',
    href: '/dublin-ca',
  },
  trust: {
    metrics: [
      { value: '6–10', label: 'students per group' },
      { value: 'Gr 1–12', label: 'full range covered' },
      { value: 'Free', label: 'first assessment' },
      { value: 'Monthly', label: 'Cohorts start monthly' },
    ] as const,
    paragraph:
      'GrowWise is not a tutoring marketplace. Every instructor is subject-trained. Every program has a defined curriculum and a measurable outcome. Sessions run live — not recorded, not self-paced.',
  },
  faq: {
    title: 'Math program FAQs',
    subtitle: 'Common questions about our 3-month math programs',
    items: [
      {
        question: 'Do I have to commit to 3 months upfront?',
        answer:
          "Yes. The 3-month minimum is what makes these programs work — it's enough time to run a diagnostic, close the primary gap, and verify the fix held. One-off sessions don't produce the same outcome.",
      },
      {
        question: 'Can my child join mid-year?',
        answer:
          'Yes. Programs start monthly. The diagnostic at program start sets the right entry point regardless of where the school year is.',
      },
      {
        question:
          'What if my child is between grade levels — for example, doing 7th grade math in 6th grade?',
        answer:
          'Placement is based on the diagnostic, not grade level. A 6th grader doing accelerated 7th grade math would be placed in the middle school accelerated track at the correct entry point.',
      },
      {
        question: "What's the difference between a 3-month program and regular tutoring?",
        answer:
          "Regular tutoring is reactive — homework help, test prep session by session. A 3-month program has a defined curriculum scope, a diagnostic at the start, and a clear outcome by the end. You know what's covered before you pay.",
      },
      {
        question: 'Is this in-person or online?',
        answer:
          'Both. Live online sessions are available nationwide. In-person sessions run at 4564 Dublin Blvd, Dublin, CA. Same curriculum, same group size, same instruction quality.',
      },
      {
        question: 'How do I know which grade band is right?',
        answer:
          'Use the free Self-Check or book a free 45-minute assessment. The assessment takes about 45 minutes and gives you a clear answer before you commit to anything.',
      },
      {
        question: 'Where did the old /courses/math pages go?',
        answer:
          'Math programs now live at /academic/math. Choose a grade band: /academic/math/elementary, /academic/math/middle-school, or /academic/math/high-school. Older /courses/math links redirect here automatically.',
      },
    ] as const,
  },
  cta: {
    heading: 'Not sure where to start?',
    body: 'A free 45-minute assessment identifies the real gap, places your child in the right program, and gives you a concrete plan — before you pay anything.',
    primary: { label: 'Book free assessment', href: '/book-assessment' },
    secondary: { label: 'Try the free Self-Check', href: '/self-check' },
    phoneLabel: 'Call (925) 456-4606',
  },
} as const;

export type MathGradeBandStubCopy = {
  readonly id: MathGradeBandId;
  readonly path: string;
  readonly breadcrumbLabel: string;
  readonly h1: string;
  readonly intro: string;
  readonly body: string;
  readonly coursesIncluded: readonly string[];
  readonly packageLine: string;
  readonly schemaCourseName: string;
  readonly schemaDescription: string;
};

export const MATH_GRADE_BAND_STUBS: Record<MathGradeBandId, MathGradeBandStubCopy> = {
  elementary: {
    id: 'elementary',
    path: MATH_COURSE_PATHS.elementary,
    breadcrumbLabel: 'Elementary Math',
    h1: 'Elementary math programs — Grades 1–5',
    intro:
      'Number sense, fractions, and reasoning — before the gaps compound.',
    body: 'Most elementary math struggles trace back to one unaddressed concept from 6–12 months ago. We find it before it becomes a pattern. Live online small groups with a defined 3-month curriculum.',
    coursesIncluded: MATH_HUB_COPY.gradeBands.cards[0].coursesIncluded,
    packageLine: 'From $169/month · Grade 1-2 Math · 75 minutes per week',
    schemaCourseName: 'Elementary Math Program — Grades 1–5',
    schemaDescription:
      '3-month structured math program for Grades 1–5. Covers number sense, fractions, operations, and word problem reasoning. Live online small groups.',
  },
  'middle-school': {
    id: 'middle-school',
    path: MATH_COURSE_PATHS.middleSchool,
    breadcrumbLabel: 'Middle School Math',
    h1: 'Middle school math programs — Grades 6–8',
    intro: 'Pre-Algebra, IM1, IM2 — including accelerated curriculum tracks.',
    body: 'The jump into Integrated Math catches many students off guard. We close the gaps before they compound across the year. Programs align with Common Core and local IM sequences.',
    coursesIncluded: MATH_HUB_COPY.gradeBands.cards[1].coursesIncluded,
    packageLine: 'From $289/month · 150 minutes per week · 3-month program',
    schemaCourseName: 'Middle School Math Program — Grades 6–8',
    schemaDescription:
      '3-month structured math program for Grades 6–8. Covers Pre-Algebra, Integrated Math 1, and Integrated Math 2. Live online small groups.',
  },
  'high-school': {
    id: 'high-school',
    path: MATH_COURSE_PATHS.highSchool,
    breadcrumbLabel: 'High School Math',
    h1: 'High school math programs — Grades 9–12',
    intro: 'Algebra 2 through AP Calculus — course-specific, not general review.',
    body: 'High school math moves at pace. Our programs are built around the course your child is actually in — not a broad review of everything.',
    coursesIncluded: MATH_HUB_COPY.gradeBands.cards[2].coursesIncluded,
    packageLine: 'From $189/month · 75 min, once a week · 3-month program',
    schemaCourseName: 'High School Math Program — Grades 9–12',
    schemaDescription:
      '3-month structured math program for Grades 9–12. Covers Algebra 2, Pre-Calculus, AP Calculus AB/BC, AP Statistics, and SAT Math. Live online small groups.',
  },
};

export const MATH_HUB_METADATA = {
  '/academic/math': {
    title: 'Math Tutoring Programs Online — Grades 1–12 | GrowWise',
    description:
      'Structured math programs for Grades 1–12. Live online small groups. Elementary, middle school, and high school tracks. 3-month curriculum packages. Book a free assessment.',
    keywords:
      'math tutoring online, online math program grades 1-12, elementary math tutoring, middle school math help, IM1 tutoring, high school math tutoring, AP calculus tutoring online, math small group online, 3-month math program, math tutoring small group',
  },
  '/academic/math/elementary': {
    title: 'Elementary Math Tutoring Online — Grades 1–5 | GrowWise',
    description:
      '3-month elementary math program for Grades 1–5. Number sense, fractions, operations, and word problems. Live online small groups. Book a free assessment.',
    keywords:
      'elementary math tutoring online, grades 1-5 math program, number sense tutoring, fractions tutoring online',
  },
  '/academic/math/middle-school': {
    title: 'Middle School Math Tutoring — Grades 6–8 | GrowWise',
    description:
      'Middle school math programs for Grades 6–8. Pre-Algebra, Integrated Math 1 & 2. Live online small groups. 3-month curriculum. Book a free assessment.',
    keywords:
      'middle school math tutoring, IM1 tutoring, IM2 tutoring, pre-algebra tutoring online, grades 6-8 math program',
  },
  '/academic/math/high-school': {
    title: 'High School Math Tutoring Online — Grades 9–12 | GrowWise',
    description:
      'High school math programs: Algebra 2, Pre-Calculus, AP Calculus, AP Statistics, SAT Math. Course-specific 3-month programs. Book a free assessment.',
    keywords:
      'high school math tutoring online, AP calculus tutoring, algebra 2 tutoring, SAT math prep online, grades 9-12 math program',
  },
} as const;
