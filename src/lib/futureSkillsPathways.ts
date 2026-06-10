import type { LucideIcon } from 'lucide-react';
import { Award, Bot, Brain, BriefcaseBusiness, Code2, Palette } from 'lucide-react';

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
  summary: string;
  outcome: string;
  icon: LucideIcon;
  accent: string;
  href: string;
  levels: FutureSkillsLevel[];
  externalFees: Array<{ item: string; fee: string }>;
  buildList: string[];
  certificationFit: string;
  faq: Array<{ question: string; answer: string }>;
}

export const futureSkillsPathways: FutureSkillsPathway[] = [
  {
    slug: 'design-creative-media',
    title: 'Design & Creative Media Certification Pathway',
    shortTitle: 'Design & Creative Media',
    eyebrow: 'Creative media pathway',
    bestFor: 'Grades 5-10',
    mode: 'Online classes + optional in-person certification testing in Dublin',
    sessionLength: '90 minutes',
    problem: 'Students consume digital content but cannot create strong visual communication.',
    hero: 'Turn digital creativity into a real design portfolio.',
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
      { item: 'Adobe exam voucher', fee: 'Confirm current Certiport price' },
      { item: 'GrowWise proctor/admin support', fee: '$50' },
    ],
    buildList: ['Brand board', 'Poster set', 'Presentation deck', 'Short video', 'Final portfolio'],
    certificationFit:
      'Best external fit: Adobe Certified Professional through Certiport, including Photoshop, Illustrator, Premiere Pro, and specialty credential combinations.',
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
  },
  {
    slug: 'python-certification',
    title: 'Python Coding Certification Pathway',
    shortTitle: 'Python Certification',
    eyebrow: 'Python coding pathway',
    bestFor: 'Grades 7-12',
    mode: 'Online learning + project review + optional certification support',
    sessionLength: '90 minutes',
    problem: 'Students learn coding randomly but do not build fluency, projects, or credential-ready skills.',
    hero: 'Build Python fluency, real projects, and certification readiness.',
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
      { item: 'PCEP exam voucher', fee: 'About $69-$95' },
      { item: 'PCEP practice test', fee: 'About $29' },
      { item: 'PCAP exam voucher', fee: 'Confirm current price before publishing' },
      { item: 'GrowWise exam-readiness/admin support', fee: '$50-$75' },
    ],
    buildList: ['Quiz game', 'Calculator', 'Automation script', 'Data mini-project', 'Mock exam plan'],
    certificationFit:
      'Best external fit: Python Institute PCEP for entry-level Python and PCAP for students ready for intermediate Python concepts.',
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
    ],
  },
  {
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Pathway',
    shortTitle: 'AI & Machine Learning',
    eyebrow: 'AI and data pathway',
    bestFor: 'Grades 8-12',
    mode: 'Online learning + project review + optional badge/certification support',
    sessionLength: '90 minutes',
    problem: 'Students use AI tools but do not understand AI, data, models, limitations, or responsible use.',
    hero: 'Go beyond prompting into data, models, and real AI projects.',
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
      { item: 'AWS Educate badge', fee: 'Usually free' },
      { item: 'NVIDIA DLI course', fee: 'Often around $90, depending on course' },
      { item: 'Microsoft AI Fundamentals exam', fee: 'Confirm current regional price' },
      { item: 'GrowWise project review/admin support', fee: '$50-$75' },
    ],
    buildList: ['Prompting lab', 'Data analysis notebook', 'Classifier project', 'AI ethics review', 'Capstone presentation'],
    certificationFit:
      'Best external fit depends on student goal: AWS Educate for cloud awareness, NVIDIA DLI for applied AI learning, or Microsoft AI Fundamentals for concept validation.',
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
  },
  {
    slug: 'ai-entrepreneurship',
    title: 'AI Entrepreneur & Business Pathway',
    shortTitle: 'AI Entrepreneur',
    eyebrow: 'AI business pathway',
    bestFor: 'Grades 7-12',
    mode: 'Online learning + pitch feedback + optional certification support',
    sessionLength: '90 minutes',
    problem: 'Students have ideas but cannot turn them into a product, pitch, business model, or market-ready presentation.',
    hero: 'Turn ideas into AI products, pitches, and business-ready stories.',
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
      { item: 'ESB exam voucher', fee: 'About $84-$109' },
      { item: 'Meta Certification exam', fee: 'Confirm current price' },
      { item: 'GrowWise proctor/admin support', fee: '$50' },
    ],
    buildList: ['Problem brief', 'User research notes', 'AI product concept', 'Landing page', 'Pitch deck'],
    certificationFit:
      'Best external fit: Entrepreneurship and Small Business certification for business foundations, with Meta certification considered after digital marketing readiness.',
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
  },
];

export const futureSkillsBundles = [
  {
    name: 'Starter Track',
    includes: 'Any Level 1',
    sessions: '8 sessions',
    price: '$599',
  },
  {
    name: 'Builder Track',
    includes: 'Level 1 + Level 2',
    sessions: '20 sessions',
    price: '$1,399',
    featured: true,
  },
  {
    name: 'Advanced Track',
    includes: 'Level 1 + Level 2 + Level 3',
    sessions: '32-36 sessions',
    price: '$2,199-$2,499',
  },
  {
    name: 'Certification Track',
    includes: 'Full pathway through certification prep',
    sessions: '44-60 sessions',
    price: '$3,199-$3,799',
  },
];

export function getFutureSkillsPathway(slug: string): FutureSkillsPathway | undefined {
  return futureSkillsPathways.find((pathway) => pathway.slug === slug);
}

export const futureSkillsHeroStats = [
  { label: 'Grades', value: '6-12' },
  { label: 'Session length', value: '90 minutes' },
  { label: 'Mode', value: 'Online + Dublin support' },
  { label: 'Pathways', value: '4 certification tracks' },
];

export const futureSkillsHubIcon = Bot;
export const futureSkillsAwardIcon = Award;
