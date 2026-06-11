import { 
  Calculator, 
  BookOpen, 
  Brain, 
  Gamepad2, 
  GraduationCap, 
  Target, 
  BookMarked, 
  UserCheck,
  Calendar
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
  Calendar
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
    active: true,
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
    label: 'STEAM',
    href: '/steam',
    type: 'dropdown',
    variant: 'orange',
    dropdown: {
      title: 'STEAM Programs',
      subtitle: 'Explore science, technology, and creativity',
      items: [
        {
          key: 'futureSkills',
          title: 'Future Ready Skills',
          description: 'Certification pathways in Python, AI/ML, design, and entrepreneurship',
          icon: 'GraduationCap',
          href: '/future-skills',
          gradient: 'from-[#1F396D] to-[#F16112]',
        },
        {
          key: 'gameDev',
          title: 'Game Development',
          description: 'Create games with Roblox, Scratch, and Unity',
          icon: 'Gamepad2',
          href: '/steam/game-development',
          gradient: 'from-[#F16112] to-[#F1894F]',
        },
      ],
    },
  },
  {
    key: 'camps',
    label: 'Camps',
    href: '/camps',
    type: 'dropdown',
    variant: 'orange',
    dropdown: {
      title: 'Camps & Programs',
      subtitle: 'Join our exciting camp experiences',
      items: [
        {
          key: 'summerCamp',
          title: 'Summer STEAM Camps',
          description: 'Coding, AI, Robotics & Math · Grades 1–12',
          icon: 'Calendar',
          href: '/camps/summer',
          gradient: 'from-[#F16112] to-[#F1894F]',
        },
        {
          key: 'academicSummerPrograms',
          title: 'Academic Summer Programs',
          description: 'Reading, Writing & Math Sprints · Grades 1–10 · June & July',
          icon: 'BookOpen',
          href: '/camps/academic-summer-programs-dublin-ca',
          gradient: 'from-[#F16112] to-[#F1894F]',
          badge: 'New',
          emphasis: 'academicSummer',
        },
        {
          key: 'highSchoolSummerIntensive',
          title: 'High School Intensive',
          description: 'Algebra 1, Geometry, Precalculus & Calculus · Grades 9–12 · June 15 – July 24',
          icon: 'Calculator',
          href: '/camps/high-school-summer-intensive-dublin-ca',
          gradient: 'from-[#1F396D] to-[#29335C]',
        },
        {
          key: 'workshopCalendar',
          title: 'Book a Workshop',
          description: 'Browse upcoming workshops',
          icon: 'BookMarked',
          href: '/workshop-calendar',
          gradient: 'from-[#1F396D] to-[#29335C]',
        },
      ],
    },
  },
  {
    key: 'blogs',
    label: 'Blogs',
    href: '/growwise-blogs',
    type: 'simple',
    variant: 'orange',
  },
  {
    key: 'about',
    label: 'About Us',
    href: '/about',
    type: 'simple',
    variant: 'orange',
  },
  {
    key: 'contact',
    label: 'Contact Us',
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
