import { 
  Calculator, 
  BookOpen, 
  Brain, 
  Gamepad2, 
  GraduationCap, 
  Target, 
  BookMarked, 
  UserCheck,
  Calendar,
  Download
} from 'lucide-react';
import { VariantStyles, type MenuItem } from './types';
import { CONTACT_INFO } from '@/lib/constants';
import { CHATBOT_PUBLIC_CONTACT_EMAIL } from '@/lib/chatbotScope';
import { MATH_COURSE_PATHS } from '@/lib/math-course-paths';
import type { SubmenuItem } from './types';

/** Grade-band links under Academic → Math (desktop flyout + mobile accordion). */
export const MATH_GRADE_BAND_NAV_ITEMS: SubmenuItem[] = [
  {
    key: 'elementary-math',
    title: 'Elementary Math',
    description: 'Grades 1–5 foundations, problem solving, and confidence building.',
    icon: 'Calculator',
    href: MATH_COURSE_PATHS.elementary,
    gradient: 'from-[#1F396D] to-[#29335C]',
  },
  {
    key: 'middle-school-math',
    title: 'Middle School Math',
    description: 'Grades 6–8, Course 1–3, accelerated math, IM1, and IM2.',
    icon: 'BookOpen',
    href: MATH_COURSE_PATHS.middleSchool,
    gradient: 'from-[#1F396D] to-[#F16112]',
  },
  {
    key: 'high-school-math',
    title: 'High School Math',
    description:
      'Algebra, Geometry, Algebra II, Precalculus, Calculus, and Statistics.',
    icon: 'GraduationCap',
    href: MATH_COURSE_PATHS.highSchool,
    gradient: 'from-[#29335C] to-[#1F396D]',
  },
];

/** Grade-band links under Academic → English (desktop flyout + mobile accordion). */
export const ENGLISH_SUBMENU_NAV_ITEMS: SubmenuItem[] = [
  {
    key: 'elementary-english',
    title: 'Elementary School English',
    description: 'Grades 1–5 reading fluency, vocabulary, grammar, and writing.',
    icon: 'BookOpen',
    href: MATH_COURSE_PATHS.englishElementary,
    gradient: 'from-[#F16112] to-[#F1894F]',
  },
];

// Icon mapping for dynamic icon rendering
export const ICON_MAP = {
  Calculator,
  BookOpen,
  Brain,
  Gamepad2,
  GraduationCap,
  Target,
  BookMarked,
  UserCheck,
  Calendar,
  Download
} as const;

// Variant-based styles
export const VARIANT_STYLES: Record<string, VariantStyles> = {
  blue: {
    activeBg: 'bg-[#1F396D] text-white shadow-lg',
    hoverText: 'hover:text-[#1F396D]',
    indicator: 'from-[#F16112] to-[#F1894F]',
    itemTitleActive: 'text-[#1F396D]',
    itemPulse: 'bg-[#F16112]'
  },
  orange: {
    activeBg: 'bg-[#F16112] text-white shadow-lg',
    hoverText: 'hover:text-[#F16112]',
    indicator: 'from-[#1F396D] to-[#F16112]',
    itemTitleActive: 'text-[#F16112]',
    itemPulse: 'bg-[#1F396D]'
  }
} as const;

// Default values for header data
export const DEFAULT_HEADER_DATA = {
  topBar: {
    phone: CONTACT_INFO.phone,
    email: CHATBOT_PUBLIC_CONTACT_EMAIL,
    address: CONTACT_INFO.formattedAddress,
    followLabel: 'Follow us:',
    social: {
      facebook: 'https://www.facebook.com/people/GrowWise/61561059687164/',
      twitter: '#',
      instagram: 'https://www.instagram.com/growwise.dublin/',
      linkedin: 'https://www.linkedin.com/company/thegrowwise/'
    }
  },
  footerHelper: 'Need help choosing?',
  footerContactCta: 'Contact us'
} as const;

// Dropdown close delay for hover intent
export const DROPDOWN_CLOSE_DELAY = 180;

/** Path suffixes (locale-agnostic) where the header cart icon is hidden. SSOT for cart visibility by route. */
export const ROUTE_PATH_PATTERNS_HIDE_CART: readonly string[] = [];

/** Fallback menu when backend header/menu is unavailable. Mirrors public/api/mock/en/header.json menuItems. */
export const FALLBACK_MENU_ITEMS: MenuItem[] = [
  {
    key: 'home',
    label: 'Home',
    href: '/',
    type: 'simple',
    variant: 'blue',
  },
  {
    key: 'academic',
    label: 'Academic',
    href: '/academic',
    type: 'dropdown',
    variant: 'blue',
    dropdown: {
      title: 'Academic Programs',
      subtitle: 'Choose your learning path',
      items: [
        {
          key: 'math',
          title: 'Math',
          description:
            'School-aligned math support from foundations to advanced tracks.',
          icon: 'Calculator',
          href: MATH_COURSE_PATHS.hub,
          gradient: 'from-[#1F396D] to-[#29335C]',
          hasSubmenu: true,
          submenuHeaderTitle: 'Math',
          submenuHeaderSubtitle: 'Grades 1–12 math programs',
          submenuItems: MATH_GRADE_BAND_NAV_ITEMS,
        },
        {
          key: 'english',
          title: 'English Courses',
          description:
            'Reading, writing, grammar, vocabulary, and comprehension.',
          icon: 'BookOpen',
          href: MATH_COURSE_PATHS.english,
          gradient: 'from-[#F16112] to-[#F1894F]',
          hasSubmenu: true,
          submenuHeaderTitle: 'English',
          submenuHeaderSubtitle: 'Grades 1–12 English programs',
          submenuItems: ENGLISH_SUBMENU_NAV_ITEMS,
        },
        {
          key: 'satPrep',
          title: 'SAT Prep',
          description: 'Comprehensive SAT test preparation',
          icon: 'Target',
          href: '/courses/sat-prep',
          gradient: 'from-[#29335C] to-[#F16112]',
        },
        {
          key: 'bookAssessment',
          title: 'Book Assessment',
          description: 'Schedule academic evaluation and get insights',
          icon: 'BookMarked',
          href: '/book-assessment',
          gradient: 'from-[#F16112] to-[#1F396D]',
        },
      ],
    },
  },
  {
    key: 'steam',
    label: 'Coding & AI',
    href: '/future-skills',
    type: 'dropdown',
    variant: 'orange',
    dropdown: {
      title: 'Certification Pathways',
      subtitle: 'Project-first pathways with optional external credentials',
      items: [
        {
          key: 'designCreativeMedia',
          title: 'Design & Creative Media',
          description: 'Creative design, visual communication, portfolio projects, and Adobe certification pathway.',
          icon: 'Palette',
          href: '/future-skills/design-creative-media',
          gradient: 'from-[#1F396D] to-[#F16112]',
        },
        {
          key: 'pythonCertification',
          title: 'Python Certification',
          description: 'Python fundamentals, project fluency, Certiport Python pathway, and PCEP/OpenEDG pathway in progress.',
          icon: 'Code2',
          href: '/future-skills/python-certification',
          gradient: 'from-[#1F396D] to-[#29335C]',
        },
        {
          key: 'aiData',
          title: 'AI & Data / Artificial Intelligence',
          description: 'AI literacy, responsible AI use, data concepts, Python for AI, and artificial intelligence certification pathway.',
          icon: 'Brain',
          href: '/future-skills/ai-machine-learning',
          gradient: 'from-[#29335C] to-[#1F396D]',
        },
        {
          key: 'aiEntrepreneur',
          title: 'AI Entrepreneur',
          description: 'Problem discovery, AI-assisted product thinking, landing pages, business models, pitch practice, and entrepreneurship certification pathway.',
          icon: 'BriefcaseBusiness',
          href: '/future-skills/ai-entrepreneurship',
          gradient: 'from-[#F16112] to-[#F1894F]',
        },
      ],
    },
  },
  {
    key: 'resources',
    label: 'Resources',
    href: '/resources',
    type: 'dropdown',
    variant: 'orange',
    dropdown: {
      title: 'Resources',
      subtitle: 'Parent guides, articles, and quick checks',
      items: [
        {
          key: 'parentsCorner',
          title: "Parent's Corner",
          description: 'Guides for learning gaps, tutoring choices, and school readiness.',
          icon: 'BookOpen',
          href: '/resources',
          gradient: 'from-[#1F396D] to-[#29335C]',
        },
        {
          key: 'parentDownloads',
          title: 'Parent Downloads',
          description: 'Free Math and English study plans parents can use at home.',
          icon: 'Download',
          href: '/resources/downloads',
          gradient: 'from-[#F16112] to-[#F1894F]',
          badge: 'Free',
        },
        {
          key: 'blogs',
          title: 'Blogs',
          description: 'GrowWise articles on learning, confidence, coding, and school support.',
          icon: 'BookMarked',
          href: '/growwise-blogs',
          gradient: 'from-[#29335C] to-[#1F396D]',
        },
        {
          key: 'readinessCheck',
          title: '5-Minute Readiness Check',
          description: 'Quick back-to-school checklist for math and learning gaps.',
          icon: 'UserCheck',
          href: '/readinesschecklist',
          gradient: 'from-[#F16112] to-[#F1894F]',
          badge: 'Free',
        },
        {
          key: 'mathMistakeSelfCheck',
          title: 'Math Mistake Self-Check',
          description: 'Find the pattern behind repeated math mistakes.',
          icon: 'Target',
          href: '/self-check',
          gradient: 'from-[#29335C] to-[#F16112]',
        },
      ],
    },
  },
  {
    key: 'about',
    label: 'About',
    href: '/about',
    type: 'simple',
    variant: 'orange',
  },
  {
    key: 'contact',
    label: 'Contact',
    href: '/contact',
    type: 'simple',
    variant: 'orange',
  },
  {
    key: 'enroll',
    label: 'Enroll Now',
    href: '/enroll',
    type: 'simple',
    variant: 'orange',
  },
];
