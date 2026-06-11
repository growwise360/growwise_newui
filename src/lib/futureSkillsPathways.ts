import type { LucideIcon } from 'lucide-react';
import { Award, Bot, Brain, BriefcaseBusiness, Code2, Palette } from 'lucide-react';

import { getFutureSkillsDiscoveryPage } from './codingProgramSurfaces';

export type FutureSkillsSlug =
  | 'design-creative-media'
  | 'python-certification'
  | 'ai-machine-learning'
  | 'ai-entrepreneurship';

export interface FutureSkillsLevel {
  label: string;
  course: string;
  sessions: number;
  hours: string;
  fee: string;
  outcome: string;
  topics: string[];
}

export interface FutureSkillsCertiportOnSite {
  credential: string;
  note?: string;
}

export interface FutureSkillsSampleSession {
  label: string;
  title: string;
  description: string;
}

export interface FutureSkillsSampleScheduleStage {
  stage: string;
  title: string;
  sessions: FutureSkillsSampleSession[];
}

export interface FutureSkillsPathway {
  slug: FutureSkillsSlug;
  title: string;
  shortTitle: string;
  eyebrow: string;
  bestFor: string;
  mode: string;
  sessionLength: string;
  problem: string;
  hero: string;
  formatShort: string;
  summary: string;
  outcome: string;
  icon: LucideIcon;
  accent: string;
  href: string;
  levels: FutureSkillsLevel[];
  externalFees: Array<{ item: string; fee: string }>;
  buildList: string[];
  certificationFit: string;
  certiportOnSite?: FutureSkillsCertiportOnSite[];
  faq: Array<{ question: string; answer: string }>;
  skillLevel: string;
  programLabel: string;
  programStory: string[];
  learningOutcomes: string[];
  courseFormat: string;
  sampleScheduleIntro: string;
  sampleSchedule: FutureSkillsSampleScheduleStage[];
  credentialHighlight: { title: string; body: string };
  advisorCta: { title: string; body: string };
  closingCta: { title: string; body: string };
  trustHighlights: string[];
  relatedPathwaySlugs: FutureSkillsSlug[];
  discoveryPage: { href: string; title: string; description: string };
}

export const FUTURE_SKILLS_PRICING_NOTE = 'Shared at pathway assessment';

export const CERTIPORT_PARENT_VALUE =
  'Certiport certifications provide students and professionals with an industry-leading assessment of skills, knowledge, and understanding of their area of interest — students who become certified will be better prepared for college and career success.';

export const CERTIPORT_ON_SITE_NOTE =
  'On-site exam delivery available at GrowWise Dublin (Certiport Authorized Testing Center) when the student is ready. Exam vouchers are purchased separately at certiport.com. Certiport certificates are issued by Certiport upon passing — not by GrowWise.';

export const futureSkillsCertiportHubRoster = [
  { pathway: 'Design', credential: 'Adobe Certified Professional' },
  { pathway: 'Python', credential: 'ITS Python (Certiport)' },
  { pathway: 'AI & ML', credential: 'Microsoft AI-900 Fundamentals' },
  { pathway: 'Entrepreneurship', credential: 'ESB · Meta Certification' },
] as const;

export const futureSkillsPathways: FutureSkillsPathway[] = [
  {
    slug: 'design-creative-media',
    title: 'Design & Creative Media Certification Pathway',
    shortTitle: 'Design & Creative Media',
    eyebrow: 'Creative media pathway',
    bestFor: 'Grades 5-10',
    mode: 'Online classes + optional external certification prep',
    sessionLength: '90 minutes',
    problem: 'Students consume digital content but cannot create strong visual communication.',
    hero: 'Turn digital creativity into a real design portfolio.',
    formatShort: 'Live online · 90-minute sessions · small groups',
    summary:
      'Students learn design foundations, visual storytelling, presentation design, short video, and Adobe-ready creative workflow through portfolio-first projects.',
    outcome:
      'Posters, flyers, school presentation slides, social media creatives, short videos, and a final brand/project portfolio.',
    icon: Palette,
    accent: '#F16112',
    href: '/future-skills/design-creative-media',
    levels: [
      {
        label: 'Level 1',
        course: 'Canva Design Foundations',
        sessions: 8,
        hours: '12 hrs',
        fee: '$599',
        outcome: 'Flyers, posters, slides, basic branding',
        topics: ['Layout and hierarchy', 'Color and type basics', 'School presentations', 'Poster and flyer systems'],
      },
      {
        label: 'Level 2',
        course: 'Creative Media Portfolio',
        sessions: 12,
        hours: '18 hrs',
        fee: '$899',
        outcome: 'Social media creatives, event flyer, visual portfolio',
        topics: ['Visual storytelling', 'Event campaigns', 'Short video basics', 'Portfolio curation'],
      },
      {
        label: 'Level 3',
        course: 'Adobe Foundations',
        sessions: 16,
        hours: '24 hrs',
        fee: '$1,299',
        outcome: 'Photoshop / Illustrator / Premiere foundations',
        topics: ['Image editing', 'Vector design', 'Video editing workflow', 'Adobe project habits'],
      },
      {
        label: 'Level 4',
        course: 'Adobe Certification Prep',
        sessions: 24,
        hours: '36 hrs',
        fee: '$1,499',
        outcome: 'Adobe exam-style prep + portfolio review',
        topics: ['Exam-style practice', 'Portfolio review', 'Tool fluency checks', 'Certification readiness plan'],
      },
    ],
    externalFees: [
      { item: 'Adobe exam voucher (Certiport, optional)', fee: 'Quoted at placement' },
    ],
    buildList: ['Brand board', 'Poster set', 'Presentation deck', 'Short video', 'Final portfolio'],
    certificationFit:
      'Optional Adobe Certified Professional (Certiport) when students complete portfolio and exam-style prep.',
    certiportOnSite: [{ credential: 'Adobe Certified Professional' }],
    faq: [
      {
        question: 'Is this a Canva course or an Adobe course?',
        answer:
          'It starts with Canva because students can quickly learn design thinking and produce polished work. Advanced levels move toward Adobe foundations and Adobe Certified Professional readiness.',
      },
      {
        question: 'Does my child need design experience?',
        answer:
          'No. Level 1 starts with layout, color, typography, and simple visual communication. Students with prior design exposure can begin higher after a placement conversation.',
      },
    ],
    skillLevel: 'Beginner–Advanced (placement-based)',
    programLabel: 'Creative media · Grades 5-10',
    programStory: [
      'Students move from consuming digital content to producing polished visual work — posters, presentations, social posts, and short videos that look intentional, not accidental.',
      'The pathway starts with Canva so students learn design thinking quickly, then advances into Adobe foundations and exam-style practice for Adobe Certified Professional credentials through Certiport.',
      'Every level ends with portfolio-ready output families can see and students can reuse for school projects, clubs, and optional certification when ready.',
    ],
    learningOutcomes: [
      'Build a multi-piece design portfolio with posters, slides, and short video',
      'Apply layout, color, typography, and visual hierarchy to real projects',
      'Move from Canva fluency to Adobe Photoshop, Illustrator, and Premiere foundations',
      'Prepare for optional Adobe Certified Professional exams at GrowWise Dublin (Certiport)',
      'Present a final brand or campaign portfolio with instructor feedback',
    ],
    courseFormat:
      'Live 90-minute online sessions in small groups with project feedback and portfolio review. Optional in-person support and Certiport exams are available at GrowWise Dublin when students are ready.',
    sampleScheduleIntro:
      'Students progress at their own pace after placement. Here is a sample of what a typical session sequence looks like at each level — not a fixed calendar.',
    sampleSchedule: [
      {
        stage: 'Level 1',
        title: 'Canva Design Foundations',
        sessions: [
          { label: 'Session 1', title: 'Layout and hierarchy', description: 'Students learn visual hierarchy and build a school poster with clear focal points.' },
          { label: 'Session 2', title: 'Color and type systems', description: 'Apply color palettes and typography to a flyer set with consistent branding.' },
          { label: 'Session 3', title: 'Presentation design', description: 'Design a slide deck for a school topic with readable layouts and visuals.' },
        ],
      },
      {
        stage: 'Level 2',
        title: 'Creative Media Portfolio',
        sessions: [
          { label: 'Session 1', title: 'Visual storytelling', description: 'Plan a short campaign with a clear audience and message across multiple assets.' },
          { label: 'Session 2', title: 'Social and event creatives', description: 'Produce social posts and an event flyer that share one visual system.' },
          { label: 'Session 3', title: 'Portfolio curation', description: 'Select and present best work in a shareable portfolio layout.' },
        ],
      },
      {
        stage: 'Level 3',
        title: 'Adobe Foundations',
        sessions: [
          { label: 'Session 1', title: 'Photoshop basics', description: 'Edit images, use layers, and complete a photo-based poster project.' },
          { label: 'Session 2', title: 'Illustrator vectors', description: 'Create vector icons and simple illustrations for a campaign asset.' },
          { label: 'Session 3', title: 'Premiere intro', description: 'Edit a short video with titles, cuts, and a simple story arc.' },
        ],
      },
      {
        stage: 'Level 4',
        title: 'Adobe Certification Prep',
        sessions: [
          { label: 'Session 1', title: 'Exam-style practice', description: 'Work through timed Adobe-style tasks with instructor feedback.' },
          { label: 'Session 2', title: 'Portfolio review', description: 'Finalize a certification-ready portfolio with rubric-based review.' },
          { label: 'Session 3', title: 'Readiness plan', description: 'Confirm optional Certiport exam path and next steps with family.' },
        ],
      },
    ],
    credentialHighlight: {
      title: 'Portfolio-ready work and optional Adobe certification',
      body: 'Students earn GrowWise level completion certificates as they finish each stage. When ready, they can opt for Adobe Certified Professional (Certiport) and sit the exam on-site at GrowWise Dublin. Certiport issues the credential upon passing — not GrowWise.',
    },
    advisorCta: {
      title: 'Get advice from our team',
      body: 'Not sure which level to start at? A pathway assessment helps us recommend the right entry point before you enroll.',
    },
    closingCta: {
      title: 'Start with the right design level — not the biggest package.',
      body: 'A pathway assessment confirms whether your child should begin at Canva foundations, move into Adobe, or focus on portfolio work before optional Adobe certification.',
    },
    trustHighlights: [
      'Small-group live instruction with project feedback',
      '387+ students enrolled · 4.9★ Google · 98% parent satisfaction',
      'Certiport Authorized Testing Center in Dublin for eligible Adobe exams',
      'GrowWise level certificates at each completed stage',
    ],
    relatedPathwaySlugs: ['python-certification', 'ai-machine-learning', 'ai-entrepreneurship'],
    discoveryPage: {
      href: '/steam',
      title: 'STEAM programs hub',
      description: 'Explore our broader STEAM catalog first if your child is still choosing between coding, design, and project-based tracks.',
    },
  },
  {
    slug: 'python-certification',
    title: 'Python Coding Certification Pathway',
    shortTitle: 'Python Certification',
    eyebrow: 'Python coding pathway',
    bestFor: 'Grades 7-12',
    mode: 'Online learning + project review + optional external exam prep',
    sessionLength: '90 minutes',
    problem: 'Students learn coding randomly but do not build fluency, projects, or credential-ready skills.',
    hero: 'Build Python fluency, real projects, and certification readiness.',
    formatShort: 'Live online · 90-minute sessions · code review',
    summary:
      'A structured path from Python fundamentals to project fluency, PCEP readiness, and intermediate PCAP concepts for serious computer science preparation.',
    outcome: 'Games, calculators, mini tools, automation scripts, mock exams, and a certification-readiness plan.',
    icon: Code2,
    accent: '#1F396D',
    href: '/future-skills/python-certification',
    levels: [
      {
        label: 'Stage 1',
        course: 'Python Foundations',
        sessions: 12,
        hours: '18 hrs',
        fee: '$699',
        outcome: 'Variables, conditions, loops, functions',
        topics: ['Input/output', 'Conditionals', 'Loops', 'Functions', 'Debugging habits'],
      },
      {
        label: 'Stage 2',
        course: 'Python Project Builder',
        sessions: 12,
        hours: '18 hrs',
        fee: '$899',
        outcome: 'Games, calculators, mini tools, automation',
        topics: ['Lists and dictionaries', 'Files', 'Modules', 'Mini apps', 'Project reviews'],
      },
      {
        label: 'Stage 3',
        course: 'PCEP Prep',
        sessions: 8,
        hours: '12 hrs',
        fee: '$599',
        outcome: 'Exam-style review + mock test',
        topics: ['PCEP domains', 'Timed practice', 'Concept review', 'Readiness feedback'],
      },
      {
        label: 'Stage 4',
        course: 'PCAP Prep',
        sessions: 20,
        hours: '30 hrs',
        fee: '$1,299',
        outcome: 'OOP, modules, exceptions, intermediate Python',
        topics: ['Object-oriented programming', 'Exceptions', 'Packages', 'Intermediate syntax', 'Mock review'],
      },
    ],
    externalFees: [
      { item: 'PCEP exam voucher (Python Institute, optional)', fee: 'Quoted at placement' },
      { item: 'PCEP practice test (Python Institute, optional)', fee: 'Quoted at placement' },
      { item: 'PCAP exam voucher (Python Institute, optional)', fee: 'Quoted at placement' },
    ],
    buildList: ['Quiz game', 'Calculator', 'Automation script', 'Data mini-project', 'Mock exam plan'],
    certificationFit:
      'Optional Certiport ITS Python on-site at Dublin, or Python Institute PCEP/PCAP through separate registration when students are ready.',
    certiportOnSite: [{ credential: 'Information Technology Specialist (Python)' }],
    faq: [
      {
        question: 'Is this only test prep?',
        answer:
          'No. The first two stages build fluency through projects. Certification prep comes after students have enough syntax and debugging confidence.',
      },
      {
        question: 'Can a student start directly in PCEP prep?',
        answer:
          'Yes, if they already know Python basics. We recommend a placement conversation or trial class before skipping the project stages.',
      },
      {
        question: 'Do PCEP and PCAP require separate registration?',
        answer:
          'Yes. Each is a separate Python Institute exam with its own voucher and scheduling. GrowWise prep does not include exam registration. Families opt in when the student is ready.',
      },
      {
        question: 'Are PCEP and PCAP taken through GrowWise?',
        answer:
          'No. These are Python Institute exams. Students register and take them through OpenEDG/TestNow or Pearson VUE after purchasing the appropriate voucher.',
      },
      {
        question: 'What is the difference between ITS Python and PCEP/PCAP?',
        answer:
          'ITS Python is a Certiport exam that eligible students can take on-site at GrowWise Dublin after purchasing a voucher at certiport.com. PCEP and PCAP are Python Institute exams with separate registration and are not Certiport or on-site at GrowWise.',
      },
    ],
    skillLevel: 'Beginner–Advanced (placement-based)',
    programLabel: 'Python coding · Grades 7-12',
    programStory: [
      'Students build Python fluency through projects first — games, tools, and automation — before any certification conversation.',
      'When ready, families can choose Certiport ITS Python on-site at GrowWise Dublin, or Python Institute PCEP and PCAP through separate registration. GrowWise prepares; exam providers issue credentials.',
      'The pathway is structured for serious CS preparation: syntax confidence, debugging habits, and mock exams — not random tutorial hopping.',
    ],
    learningOutcomes: [
      'Write Python with variables, loops, functions, and basic data structures',
      'Build mini apps, games, calculators, and automation scripts',
      'Prepare for optional Certiport ITS Python on-site at GrowWise Dublin',
      'Prepare for optional Python Institute PCEP and PCAP (separate registration)',
      'Complete mock exams and a certification-readiness plan with instructor feedback',
    ],
    courseFormat:
      'Live 90-minute online sessions with code review, project checkpoints, and optional exam prep stages. Certiport ITS Python exams can be taken on-site at GrowWise Dublin when students are ready.',
    sampleScheduleIntro:
      'Placement determines the starting stage. Below is a sample session sequence — actual pacing varies by student.',
    sampleSchedule: [
      {
        stage: 'Stage 1',
        title: 'Python Foundations',
        sessions: [
          { label: 'Session 1', title: 'Input, output, and variables', description: 'Write first programs with user input and formatted output.' },
          { label: 'Session 2', title: 'Conditionals and logic', description: 'Build decision trees and simple quiz logic with if/elif/else.' },
          { label: 'Session 3', title: 'Loops and functions', description: 'Automate repetitive tasks and refactor code into reusable functions.' },
        ],
      },
      {
        stage: 'Stage 2',
        title: 'Python Project Builder',
        sessions: [
          { label: 'Session 1', title: 'Lists and dictionaries', description: 'Store and manipulate data for a mini app or game.' },
          { label: 'Session 2', title: 'Files and modules', description: 'Read/write files and organize code into reusable modules.' },
          { label: 'Session 3', title: 'Project review', description: 'Ship a calculator, game, or automation script with instructor feedback.' },
        ],
      },
      {
        stage: 'Stage 3',
        title: 'PCEP Prep',
        sessions: [
          { label: 'Session 1', title: 'PCEP domain review', description: 'Cover entry-level Python exam domains with timed practice.' },
          { label: 'Session 2', title: 'Mock exam + feedback', description: 'Sit a mock PCEP-style test and review gaps with the instructor.' },
        ],
      },
      {
        stage: 'Stage 4',
        title: 'PCAP Prep',
        sessions: [
          { label: 'Session 1', title: 'Object-oriented Python', description: 'Classes, objects, and inheritance with practical examples.' },
          { label: 'Session 2', title: 'Exceptions and packages', description: 'Handle errors and structure code for intermediate exam topics.' },
          { label: 'Session 3', title: 'Mock review', description: 'Timed PCAP-style practice and a readiness plan for optional registration.' },
        ],
      },
    ],
    credentialHighlight: {
      title: 'Project proof and optional Python credentials',
      body: 'Students earn GrowWise level completion certificates at each stage. Optional paths include Certiport ITS Python on-site at Dublin, or Python Institute PCEP/PCAP through separate registration — each with its own voucher and scheduling.',
    },
    advisorCta: {
      title: 'Get advice from our team',
      body: 'A pathway assessment confirms whether your child should start at foundations, project builder, or certification prep — and which external credential track fits their goals.',
    },
    closingCta: {
      title: 'Start with the right Python stage — not the longest track.',
      body: 'A pathway assessment confirms whether your child should begin at foundations, project builder, or certification prep — and whether Certiport ITS Python or Python Institute exams fit their goals.',
    },
    trustHighlights: [
      'Project-first Python — not test-only cramming',
      '387+ students enrolled · 4.9★ Google · 98% parent satisfaction',
      'Certiport ITS Python available on-site at GrowWise Dublin',
      'Clear separation between Certiport and Python Institute exam paths',
    ],
    relatedPathwaySlugs: ['design-creative-media', 'ai-machine-learning', 'ai-entrepreneurship'],
    discoveryPage: getFutureSkillsDiscoveryPage('python-certification') ?? {
      href: '/coding/python',
      title: 'Python coding classes',
      description: 'Start with foundations, projects, and trial classes before committing to a certification pathway.',
    },
  },
  {
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Pathway',
    shortTitle: 'AI & Machine Learning',
    eyebrow: 'AI and data pathway',
    bestFor: 'Grades 8-12',
    mode: 'Online learning + project review + optional external credential prep',
    sessionLength: '90 minutes',
    problem: 'Students use AI tools but do not understand AI, data, models, limitations, or responsible use.',
    hero: 'Go beyond prompting into data, models, and real AI projects.',
    formatShort: 'Live online · 90-minute sessions · project review',
    summary:
      'Students learn AI literacy, Python for AI, model basics, datasets, responsible use, and certification/badge readiness through explainable projects.',
    outcome: 'AI literacy projects, Python data analysis, classification projects, model reviews, and readiness for AWS/NVIDIA/Microsoft pathways.',
    icon: Brain,
    accent: '#29335C',
    href: '/future-skills/ai-machine-learning',
    levels: [
      {
        label: 'Level 1',
        course: 'AI Foundations',
        sessions: 8,
        hours: '12 hrs',
        fee: '$599',
        outcome: 'AI literacy, prompting, responsible AI',
        topics: ['How AI works', 'Prompting', 'Bias and limitations', 'Responsible AI use'],
      },
      {
        label: 'Level 2',
        course: 'Python for AI',
        sessions: 12,
        hours: '18 hrs',
        fee: '$899',
        outcome: 'Python, data handling, libraries, simple analysis',
        topics: ['Python review', 'Data structures', 'CSV/data handling', 'Simple charts and analysis'],
      },
      {
        label: 'Level 3',
        course: 'ML Project Builder',
        sessions: 16,
        hours: '24 hrs',
        fee: '$1,299',
        outcome: 'Datasets, prediction, classification, model basics',
        topics: ['Classification', 'Prediction', 'Training/testing split', 'Evaluation', 'Project explanation'],
      },
      {
        label: 'Level 4',
        course: 'AI Certification Prep',
        sessions: 12,
        hours: '18 hrs',
        fee: '$999',
        outcome: 'Microsoft AI / AWS / NVIDIA pathway readiness',
        topics: ['Certification map', 'Concept review', 'Practice tasks', 'Project presentation'],
      },
    ],
    externalFees: [
      { item: 'AWS Educate badge (third-party, optional)', fee: 'Quoted at placement' },
      { item: 'NVIDIA DLI course (third-party, optional)', fee: 'Quoted at placement' },
      { item: 'Microsoft Certified Fundamentals AI-900 exam (Certiport, optional)', fee: 'Quoted at placement' },
    ],
    buildList: ['Prompting lab', 'Data analysis notebook', 'Classifier project', 'AI ethics review', 'Capstone presentation'],
    certificationFit:
      'Optional AWS Educate, NVIDIA DLI, or Microsoft AI-900 (Certiport) when aligned with student goals — each registered separately.',
    certiportOnSite: [{ credential: 'Microsoft Certified: Azure AI Fundamentals (AI-900)' }],
    faq: [
      {
        question: 'Does my child need Python first?',
        answer:
          'For Level 1, no. For Python for AI and ML Project Builder, basic Python comfort is strongly recommended.',
      },
      {
        question: 'Is this just ChatGPT prompting?',
        answer:
          'No. Prompting is included, but the pathway moves into data, models, evaluation, limitations, and responsible AI project work.',
      },
    ],
    skillLevel: 'Beginner–Advanced (placement-based)',
    programLabel: 'AI & machine learning · Grades 8-12',
    programStory: [
      'Students go beyond prompting into how AI systems work — data, models, evaluation, and responsible use — through projects they can explain to a parent or teacher.',
      'The pathway builds toward optional third-party credentials when aligned with student goals: AWS Educate, NVIDIA DLI learning paths, or Microsoft Certified Fundamentals AI-900 through Certiport. GrowWise prepares readiness; each provider handles registration separately.',
      'Every level produces explainable work: notebooks, classifiers, ethics reviews, and a capstone presentation — not black-box demos.',
    ],
    learningOutcomes: [
      'Understand AI concepts, limitations, bias, and responsible use',
      'Use Python for data handling, analysis, and simple ML projects',
      'Build and evaluate classification and prediction projects',
      'Prepare for optional AWS Educate, NVIDIA DLI, or Microsoft AI-900 pathways',
      'Present an AI capstone with clear problem, method, and results',
    ],
    courseFormat:
      'Live 90-minute online sessions in small groups with project review and instructor feedback. Optional credential prep is added when the student is ready — each external badge or exam is registered separately.',
    sampleScheduleIntro:
      'Students may start at Level 1 or higher after placement. Sample sessions below show typical work at key stages.',
    sampleSchedule: [
      {
        stage: 'Level 1',
        title: 'AI Foundations',
        sessions: [
          { label: 'Session 1', title: 'How AI works', description: 'Explore what models do, what they cannot do, and where human judgment matters.' },
          { label: 'Session 2', title: 'Prompting with purpose', description: 'Practice structured prompts for school and project tasks with evaluation.' },
          { label: 'Session 3', title: 'Responsible AI', description: 'Discuss bias, privacy, and limitations through a short ethics review project.' },
        ],
      },
      {
        stage: 'Level 2',
        title: 'Python for AI',
        sessions: [
          { label: 'Session 1', title: 'Python for data', description: 'Review Python basics and load structured data for analysis.' },
          { label: 'Session 2', title: 'Charts and patterns', description: 'Visualize datasets and interpret trends for a school-relevant question.' },
          { label: 'Session 3', title: 'Analysis notebook', description: 'Complete a documented notebook families can review.' },
        ],
      },
      {
        stage: 'Level 3',
        title: 'ML Project Builder',
        sessions: [
          { label: 'Session 1', title: 'Datasets and labels', description: 'Load CSV data, explore features, and define a classification goal.' },
          { label: 'Session 2', title: 'Train and test', description: 'Split data, train a simple model, and measure accuracy with clear metrics.' },
          { label: 'Session 3', title: 'Project presentation', description: 'Explain results, limitations, and next steps in a capstone-style demo.' },
        ],
      },
      {
        stage: 'Level 4',
        title: 'AI Certification Prep',
        sessions: [
          { label: 'Session 1', title: 'Credential map', description: 'Compare optional AWS, NVIDIA, and Microsoft paths to student goals.' },
          { label: 'Session 2', title: 'Concept review', description: 'Review exam or badge domains with practice tasks.' },
          { label: 'Session 3', title: 'Capstone presentation', description: 'Present an AI project with clear problem, method, and results.' },
        ],
      },
    ],
    credentialHighlight: {
      title: 'Explainable AI projects and optional credentials',
      body: 'Students earn GrowWise level completion certificates at each stage. Optional third-party credentials — AWS Educate, NVIDIA DLI, or Microsoft Certified Fundamentals AI-900 — are pursued separately when aligned with the student goal. GrowWise does not issue those credentials.',
    },
    advisorCta: {
      title: 'Get advice from our team',
      body: 'We help families choose the right starting level and whether an external credential path (AWS, NVIDIA, Microsoft) fits your child’s timeline and interests.',
    },
    closingCta: {
      title: 'Start with the right AI level — not the longest track.',
      body: 'A pathway assessment confirms whether your child should begin at AI literacy, Python for AI, or ML projects — and whether an optional credential path fits their timeline.',
    },
    trustHighlights: [
      'Project-based AI literacy — not prompt tricks only',
      '387+ students enrolled · 4.9★ Google · 98% parent satisfaction',
      'Microsoft AI-900 available on-site at GrowWise Dublin (Certiport)',
      'Capstone presentations families can understand',
    ],
    relatedPathwaySlugs: ['python-certification', 'design-creative-media', 'ai-entrepreneurship'],
    discoveryPage: getFutureSkillsDiscoveryPage('ai-machine-learning') ?? {
      href: '/coding/ml-ai',
      title: 'ML and AI coding classes',
      description:
        'Start with trial-first ML and AI classes before committing to a structured certification pathway.',
    },
  },
  {
    slug: 'ai-entrepreneurship',
    title: 'AI Entrepreneur & Business Pathway',
    shortTitle: 'AI Entrepreneur',
    eyebrow: 'AI business pathway',
    bestFor: 'Grades 7-12',
    mode: 'Online learning + pitch feedback + optional external exam prep',
    sessionLength: '90 minutes',
    problem: 'Students have ideas but cannot turn them into a product, pitch, business model, or market-ready presentation.',
    hero: 'Turn ideas into AI products, pitches, and business-ready stories.',
    formatShort: 'Live online · 90-minute sessions · pitch coaching',
    summary:
      'Students learn problem discovery, user research, AI-assisted product building, landing pages, business models, pitch decks, and entrepreneurship certification readiness.',
    outcome: 'Validated idea, AI product concept, landing page, pitch deck, business model, and optional ESB/Meta certification readiness.',
    icon: BriefcaseBusiness,
    accent: '#F1894F',
    href: '/future-skills/ai-entrepreneurship',
    levels: [
      {
        label: 'Level 1',
        course: 'Idea Builder',
        sessions: 8,
        hours: '12 hrs',
        fee: '$599',
        outcome: 'Problem finding, user research, idea validation',
        topics: ['Problem discovery', 'Customer interviews', 'Idea scoring', 'Validation basics'],
      },
      {
        label: 'Level 2',
        course: 'AI Product Builder',
        sessions: 12,
        hours: '18 hrs',
        fee: '$899',
        outcome: 'AI product idea + landing page',
        topics: ['AI use cases', 'Product concept', 'Landing page copy', 'Prototype story'],
      },
      {
        label: 'Level 3',
        course: 'Startup Pitch Studio',
        sessions: 12,
        hours: '18 hrs',
        fee: '$999',
        outcome: 'Pitch deck, demo, business model',
        topics: ['Pitch structure', 'Market sizing basics', 'Business model', 'Demo practice'],
      },
      {
        label: 'Level 4',
        course: 'ESB / Meta Prep',
        sessions: 24,
        hours: '36 hrs',
        fee: '$1,499',
        outcome: 'Entrepreneurship / digital marketing exam prep',
        topics: ['ESB concepts', 'Digital marketing basics', 'Practice review', 'Final presentation'],
      },
    ],
    externalFees: [
      { item: 'ESB exam voucher (Certiport, optional)', fee: 'Quoted at placement' },
      { item: 'Meta Certification exam (Certiport, optional)', fee: 'Quoted at placement' },
    ],
    buildList: ['Problem brief', 'User research notes', 'AI product concept', 'Landing page', 'Pitch deck'],
    certificationFit:
      'Optional Entrepreneurship and Small Business (ESB) and Meta Certification (Certiport) when students complete pitch-ready work.',
    certiportOnSite: [
      { credential: 'Entrepreneurship and Small Business (ESB)' },
      { credential: 'Meta Certification' },
    ],
    faq: [
      {
        question: 'Is this for students who already have a business?',
        answer:
          'No. Students can begin with curiosity and ideas. The pathway teaches how to find a real problem, validate an idea, and communicate a product clearly.',
      },
      {
        question: 'Will students actually build something?',
        answer:
          'Yes. Students produce a product concept, landing page, pitch deck, and final presentation rather than only learning business vocabulary.',
      },
    ],
    skillLevel: 'Beginner–Advanced (placement-based)',
    programLabel: 'AI entrepreneurship · Grades 7-12',
    programStory: [
      'Students learn to find real problems, validate ideas, and communicate a product story — not just memorize business terms.',
      'They build an AI-assisted product concept, landing page, pitch deck, and final presentation. When ready, they can opt for Entrepreneurship and Small Business (ESB) or Meta Certification through Certiport on-site at GrowWise Dublin.',
      'The pathway mirrors how young founders actually work: research, prototype narrative, pitch practice, and optional certification — with GrowWise feedback at every stage.',
    ],
    learningOutcomes: [
      'Validate ideas through problem discovery and user research',
      'Design an AI product concept with a clear user and use case',
      'Build a landing page and pitch deck that tell a coherent story',
      'Practice demo delivery and business model basics',
      'Prepare for optional ESB and Meta Certification (Certiport) on-site at Dublin',
    ],
    courseFormat:
      'Live 90-minute online sessions with pitch feedback and presentation coaching. Optional Certiport exams for ESB and Meta Certification can be taken on-site at GrowWise Dublin when students are ready.',
    sampleScheduleIntro:
      'Students progress through four levels after placement. Sample sessions below show typical milestones — pacing varies by student.',
    sampleSchedule: [
      {
        stage: 'Level 1',
        title: 'Idea Builder',
        sessions: [
          { label: 'Session 1', title: 'Problem discovery', description: 'Identify real problems worth solving and score ideas for feasibility.' },
          { label: 'Session 2', title: 'User research', description: 'Interview peers or family and summarize insights in a problem brief.' },
          { label: 'Session 3', title: 'Idea validation', description: 'Refine one idea with evidence and a simple validation plan.' },
        ],
      },
      {
        stage: 'Level 2',
        title: 'AI Product Builder',
        sessions: [
          { label: 'Session 1', title: 'AI use cases', description: 'Match AI capabilities to a real user problem without overpromising.' },
          { label: 'Session 2', title: 'Product concept', description: 'Define features, user story, and prototype narrative.' },
          { label: 'Session 3', title: 'Landing page', description: 'Draft landing page copy and layout for a shareable product story.' },
        ],
      },
      {
        stage: 'Level 3',
        title: 'Startup Pitch Studio',
        sessions: [
          { label: 'Session 1', title: 'Pitch structure', description: 'Outline problem, solution, market, and ask in a slide deck.' },
          { label: 'Session 2', title: 'Demo practice', description: 'Rehearse a product demo with instructor feedback on clarity.' },
          { label: 'Session 3', title: 'Final presentation', description: 'Deliver a polished pitch with Q&A preparation.' },
        ],
      },
      {
        stage: 'Level 4',
        title: 'ESB / Meta Prep',
        sessions: [
          { label: 'Session 1', title: 'ESB concepts', description: 'Review entrepreneurship and small-business exam domains with practice.' },
          { label: 'Session 2', title: 'Digital marketing basics', description: 'Connect Meta Certification topics to the student product story.' },
          { label: 'Session 3', title: 'Readiness review', description: 'Confirm optional Certiport exam path and presentation polish.' },
        ],
      },
    ],
    credentialHighlight: {
      title: 'Pitch-ready portfolio and optional Certiport business credentials',
      body: 'Students earn GrowWise level completion certificates at each stage. When ready, they can opt for Entrepreneurship and Small Business (ESB) and Meta Certification through Certiport — exams on-site at GrowWise Dublin. Certiport issues credentials upon passing.',
    },
    advisorCta: {
      title: 'Get advice from our team',
      body: 'A pathway assessment helps determine whether your teen should start with idea discovery or jump ahead — and whether ESB or Meta certification fits their goals.',
    },
    closingCta: {
      title: 'Start with the right entrepreneurship level — not the longest track.',
      body: 'A pathway assessment confirms whether your teen should begin with idea discovery, product building, or pitch studio — and whether optional ESB or Meta certification fits their goals.',
    },
    trustHighlights: [
      'Build real pitch assets — not vocabulary worksheets',
      '387+ students enrolled · 4.9★ Google · 98% parent satisfaction',
      'ESB and Meta Certification available on-site at GrowWise Dublin (Certiport)',
      'Presentation coaching with live instructor feedback',
    ],
    relatedPathwaySlugs: ['python-certification', 'ai-machine-learning', 'design-creative-media'],
    discoveryPage: {
      href: '/programs',
      title: 'All GrowWise programs',
      description: 'Compare academic, STEAM, and Future Skills offerings before choosing an entrepreneurship pathway.',
    },
  },
];

export const futureSkillsBundles = [
  {
    name: 'Starter Track',
    includes: 'One Level 1 course',
    sessions: 'From 8 sessions',
  },
  {
    name: 'Builder Track',
    includes: 'Level 1 + Level 2',
    sessions: '20 sessions',
    featured: true,
  },
  {
    name: 'Advanced Track',
    includes: 'Level 1 + Level 2 + Level 3',
    sessions: '32–36 sessions',
  },
  {
    name: 'Certification Track',
    includes: 'Full pathway + certification prep',
    sessions: '44–60 sessions',
  },
];

export function getFutureSkillsPathway(slug: string): FutureSkillsPathway | undefined {
  return futureSkillsPathways.find((pathway) => pathway.slug === slug);
}

export function getRelatedFutureSkillsPathways(slug: FutureSkillsSlug): FutureSkillsPathway[] {
  const pathway = getFutureSkillsPathway(slug);
  if (!pathway) {
    return [];
  }
  return pathway.relatedPathwaySlugs
    .map((relatedSlug) => getFutureSkillsPathway(relatedSlug))
    .filter((related): related is FutureSkillsPathway => related !== undefined);
}

export const futureSkillsHeroStats = [
  { label: 'Grades', value: '6–12' },
  { label: 'Session length', value: '90 minutes' },
  { label: 'Mode', value: 'Online + Dublin support' },
  { label: 'Pathways', value: '4 pathways' },
];

export const futureSkillsHubIcon = Bot;
export const futureSkillsAwardIcon = Award;
