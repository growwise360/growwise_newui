'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/lib/constants';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { CheckCircle, Calculator, Award, Brain, Sparkles, Star, X, HelpCircle, Calendar, ChevronDown, DollarSign, Clock, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getDefaultOpenFaqValues } from "@/lib/faq-accordion";
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';

// Types
type SummerEnrollmentCourse = {
  id: string;
  name: string;
  schedule: string;
};

type SummerEnrollmentForm = {
  parentName: string;
  email: string;
  studentName: string;
  grade: string;
  subject: string;
};

const initialSummerEnrollmentForm: SummerEnrollmentForm = {
  parentName: '',
  email: '',
  studentName: '',
  grade: '',
  subject: '',
};

type CurriculumWeek = {
  week: number;
  title: string;
  topics: string[];
  outcome: string;
};

type CourseCurriculum = {
  courseId: string;
  learningOutcomes: string[];
  weeks: CurriculumWeek[];
};

// Schedule options (not hardcoded)
export const SCHEDULE_OPTIONS = [
  { value: '10am to Noon', label: '10:00 AM – 12:00 PM' },
  { value: '3:30pm to 5:30pm', label: '3:30 PM – 5:30 PM' },
] as const;

export const DEFAULT_SCHEDULE = SCHEDULE_OPTIONS[0].value;

// Curriculum data
const algebra1Curriculum: CourseCurriculum = {
  courseId: 'algebra-1',
  learningOutcomes: [
    'Solve & graph linear equations and inequalities with real confidence',
    'Turn word problems into equations without freezing up',
    'Start the school year ahead of the class — not catching up',
  ],
  weeks: [
    {
      week: 1,
      title: 'Algebra Foundations',
      topics: ['Variables', 'Algebraic expressions', 'Order of operations', 'Combining like terms'],
      outcome: 'Sample corrected work to eliminate foundational errors early',
    },
    {
      week: 2,
      title: 'Equations & Inequalities',
      topics: ['One-step equations', 'Multi-step equations', 'Real-world word problems', 'Graphing inequalities'],
      outcome: 'Equation-solving strategy checklist and personalized progress note',
    },
    {
      week: 3,
      title: 'Linear Relationships & Graphing',
      topics: ['Slope & y-intercept', 'Coordinate graphing', 'Writing linear equations from tables'],
      outcome: 'Graphing portfolio sample with targeted teacher feedback',
    },
    {
      week: 4,
      title: 'Systems of Equations',
      topics: ['Solving via substitution', 'Solving via elimination', 'Real-world constraint scenarios'],
      outcome: 'Real-world application task detailing student strengths and next steps',
    },
    {
      week: 5,
      title: 'Functions & Patterns',
      topics: ['Function rules', 'Input/output tables', 'Domain and range', 'Identifying non-linear trends'],
      outcome: 'Function mastery task and a snapshot progress report',
    },
    {
      week: 6,
      title: 'Quadratics & Cumulative Challenge',
      topics: ['Quadratic graphs (parabolas)', 'Basic factoring', 'Comprehensive Algebra 1 capstone challenge'],
      outcome: 'Final course performance portfolio proving DUSD/PUSD readiness',
    },
  ],
};

const algebra2Curriculum: CourseCurriculum = {
  courseId: 'algebra-2',
  learningOutcomes: [
    'Master advanced functions and transformations with confidence',
    'Model real-world growth and decay using exponential and logarithmic functions',
    'Connect polynomial structure to graphs and solutions',
  ],
  weeks: [
    {
      week: 1,
      title: 'Advanced Functions',
      topics: ['Domain & range', 'Transformations', 'Parent functions', 'Function comparisons'],
      outcome: 'Students analyze and transform functions using graphs, tables, and equations',
    },
    {
      week: 2,
      title: 'Exponential & Logarithmic Modeling',
      topics: ['Growth & decay', 'Logarithms', 'Inverse relationships', 'Real-world modeling'],
      outcome: 'Students model real-world growth and solve exponential/logarithmic problems',
    },
    {
      week: 3,
      title: 'Rational Functions',
      topics: ['Rational expressions', 'Asymptotes', 'Restrictions', 'Rational equations'],
      outcome: 'Students understand rational behavior and solve equations with restrictions',
    },
    {
      week: 4,
      title: 'Polynomial & Complex Numbers',
      topics: ['Polynomial operations', 'Zeros & factoring', 'Complex numbers', 'Graph connections'],
      outcome: 'Students connect polynomial structure to graphs and solutions',
    },
    {
      week: 5,
      title: 'Sequences & Series',
      topics: ['Arithmetic sequences', 'Geometric sequences', 'Recursive rules', 'Series formulas'],
      outcome: 'Students describe patterns and use formulas to model growth',
    },
    {
      week: 6,
      title: 'Algebra 2 Modeling & Synthesis',
      topics: ['Mixed review', 'Real-world modeling', 'Multi-step applications', 'Synthesis'],
      outcome: 'Students combine Algebra 2 skills in real-world problem-solving tasks',
    },
  ],
};

const precalculusCurriculum: CourseCurriculum = {
  courseId: 'precalculus',
  learningOutcomes: [
    'Master advanced functions with confidence and prepare for Calculus',
    'Apply trigonometric concepts to solve real-world problems',
    'Model complex phenomena using exponential, logarithmic, and trigonometric functions',
  ],
  weeks: [
    {
      week: 1,
      title: 'Function Analysis',
      topics: ['Function behavior', 'Transformations', 'Continuity', 'End behavior'],
      outcome: 'Students analyze advanced functions using graphs, equations, and tables',
    },
    {
      week: 2,
      title: 'Trigonometric Foundations',
      topics: ['Unit circle', 'Radians', 'Trig graphs', 'Identities'],
      outcome: 'Students understand trigonometric functions visually and numerically',
    },
    {
      week: 3,
      title: 'Advanced Trigonometry',
      topics: ['Inverse trig', 'Trig equations', 'Real-world applications'],
      outcome: 'Students solve trigonometric problems connected to real-world contexts',
    },
    {
      week: 4,
      title: 'Exponential & Logarithmic Modeling',
      topics: ['Growth & decay', 'Logarithmic scales', 'Real-world modeling'],
      outcome: 'Students model real-world change using exponential and logarithmic functions',
    },
    {
      week: 5,
      title: 'Conic Sections',
      topics: ['Parabolas', 'Circles', 'Ellipses', 'Hyperbolas'],
      outcome: 'Students connect equations, graphs, and geometric meaning',
    },
    {
      week: 6,
      title: 'Calculus Readiness',
      topics: ['Sequences', 'Series', 'Limits', 'Rates of change'],
      outcome: 'Students build readiness for limits, derivatives, and future Calculus work',
    },
  ],
};

const apPrecalculusCurriculum: CourseCurriculum = {
  courseId: 'ap-precalculus',
  learningOutcomes: [
    'Build deep mastery of polynomial, rational, exponential, and trigonometric functions',
    'Develop strong AP-style problem-solving and modeling skills',
    'Prepare for AP Precalculus exam and college-level mathematics',
  ],
  weeks: [
    {
      week: 1,
      title: 'Polynomial Functions',
      topics: ['Polynomial behavior', 'Zeros', 'End behavior', 'Rates of change'],
      outcome: 'Students analyze polynomial graphs, equations, and real-world models',
    },
    {
      week: 2,
      title: 'Rational Functions',
      topics: ['Rational functions', 'Asymptotes', 'Holes', 'Restrictions', 'End behavior'],
      outcome: 'Students interpret rational graphs and identify key features',
    },
    {
      week: 3,
      title: 'Exponential & Logarithmic Functions',
      topics: ['Growth & decay', 'Inverses', 'Logarithmic models', 'Residuals'],
      outcome: 'Students model real-world growth and solve exponential/logarithmic problems',
    },
    {
      week: 4,
      title: 'Trigonometric & Periodic Modeling',
      topics: ['Unit circle', 'Sinusoidal functions', 'Transformations', 'Inverse trig'],
      outcome: 'Students model periodic behavior using trigonometric functions',
    },
    {
      week: 5,
      title: 'Polar, Parametric & Function Modeling',
      topics: ['Polar graphs', 'Parametric relationships', 'Motion', 'Model interpretation'],
      outcome: 'Students explore advanced function types and real-world motion models',
    },
    {
      week: 6,
      title: 'AP Precalculus Synthesis & Exam Skills',
      topics: ['Mixed AP-style review', 'Modeling', 'Graph interpretation', 'Calculator strategy'],
      outcome: 'Students combine AP Precalculus skills in AP-style practice tasks',
    },
  ],
};

const advancedAlgebra2Curriculum: CourseCurriculum = {
  courseId: 'advanced-algebra-2',
  learningOutcomes: [
    'Master advanced function analysis, transformations, and composition',
    'Solve and model complex exponential, logarithmic, and rational situations',
    'Connect polynomial structure to graphs and complex number solutions',
  ],
  weeks: [
    {
      week: 1,
      title: 'Advanced Functions',
      topics: ['Function analysis', 'Domain & range', 'Transformations', 'Composition', 'Inverses'],
      outcome: 'Students analyze functions using equations, graphs, tables, and transformations',
    },
    {
      week: 2,
      title: 'Exponential & Logarithmic Functions',
      topics: ['Growth & decay', 'Logarithms', 'Inverse relationships', 'Real-world modeling'],
      outcome: 'Students solve and model exponential/logarithmic situations in finance, science, and data',
    },
    {
      week: 3,
      title: 'Rational Functions & Equations',
      topics: ['Rational expressions', 'Restrictions', 'Asymptotes', 'Holes', 'Rational equations'],
      outcome: 'Students understand rational function behavior and solve advanced rational problems',
    },
    {
      week: 4,
      title: 'Polynomial Functions & Complex Numbers',
      topics: ['Polynomial structure', 'Zeros', 'End behavior', 'Factoring', 'Complex solutions'],
      outcome: 'Students connect polynomial equations to graphs, roots, and real/complex solutions',
    },
    {
      week: 5,
      title: 'Sequences & Series',
      topics: ['Arithmetic sequences', 'Geometric sequences', 'Recursive rules', 'Finite & infinite series'],
      outcome: 'Students model repeated growth and patterns using explicit and recursive reasoning',
    },
    {
      week: 6,
      title: 'Advanced Modeling & Synthesis',
      topics: ['Multi-function modeling', 'Comparison', 'Optimization-style reasoning'],
      outcome: 'Students combine advanced Algebra 2 skills in real-world and Precalculus-readiness tasks',
    },
  ],
};

const calculusABCurriculum: CourseCurriculum = {
  courseId: 'calculus-ab',
  learningOutcomes: [
    'Master limits, continuity, and the derivative as a rate of change',
    'Develop strong differentiation and integration skills with applications',
    'Prepare for AP Calculus AB exam with College Board-aligned content',
  ],
  weeks: [
    {
      week: 1,
      title: 'Limits & Continuity',
      topics: ['Limits', 'One-sided limits', 'Continuity', 'Asymptotes'],
      outcome: 'Students understand how functions behave near points and over intervals',
    },
    {
      week: 2,
      title: 'Derivatives Foundations',
      topics: ['Derivative definition', 'Derivative rules', 'Tangent lines'],
      outcome: 'Students interpret derivatives as rates of change and slopes',
    },
    {
      week: 3,
      title: 'Advanced Differentiation',
      topics: ['Chain rule', 'Implicit differentiation', 'Inverse functions', 'Related rates'],
      outcome: 'Students solve more advanced derivative problems in context',
    },
    {
      week: 4,
      title: 'Applications of Derivatives',
      topics: ['Optimization', 'Motion', 'Graph analysis', 'Mean Value Theorem'],
      outcome: 'Students use derivatives to analyze behavior and solve real-world problems',
    },
    {
      week: 5,
      title: 'Integration & Accumulation',
      topics: ['Antiderivatives', 'Definite integrals', 'Fundamental Theorem of Calculus'],
      outcome: 'Students interpret integrals as accumulation and area',
    },
    {
      week: 6,
      title: 'Differential Equations & AP Synthesis',
      topics: ['Differential equations', 'Area/volume applications', 'AP-style mixed review'],
      outcome: 'Students combine limits, derivatives, and integrals in AP-style tasks',
    },
  ],
};

const highSchoolMathCourses = [
  {
    id: 'algebra-1',
    name: 'Algebra 1',
    description: 'Master linear equations, quadratic functions, and foundational algebraic concepts aligned with DUSD and PUSD standards.',
    parentFit: 'Best when your child is entering Algebra 1 or needs a stronger base before Algebra 2.',
    parentOutcome: 'Fewer missed steps on equations, graphs, and word problems.',
    parentConcern: 'My child understands in class, then freezes on homework or tests.',
    imageSrc: '/images/camps/banners/algebra_1_get_ready_3572836f_web.webp',
    price: 1649,
    level: 'Grades 8-9',
    icon: Calculator,
    gradient: 'from-[#1F396D] to-[#29335C]',
    bgGradient: 'bg-gradient-to-br from-[#1F396D]/5 to-[#29335C]/10',
    iconColor: 'text-[#1F396D]',
    hoverBorder: 'border-[#1F396D]/30',
    duration: '6 weeks',
    campDuration: 'June 15 - July 24, 2026',
    sessions: '2 hours/day',
    topics: [
      'Linear equations & inequalities',
      'Systems of linear equations',
      'Quadratic equations & functions',
      'Exponential functions',
      'Graphing techniques',
      'Problem-solving strategies'
    ],
    goals: [
      { icon: Star, title: 'Solid Foundation Establishment', description: 'Establish a strong foundation for future math courses.' },
      { icon: Star, title: 'Critical Skills Development', description: 'Develop critical skills essential for success in algebraic concepts.' },
      { icon: Star, title: 'Inequality Mastery', description: 'Master inequalities and their applications in algebraic problems.' },
      { icon: Star, title: 'Strategic Problem-Solving', description: 'Develop strategic problem-solving skills specific to algebraic scenarios.' },
      { icon: Star, title: 'Comprehensive Topic Coverage', description: 'Cover key topics including functions, inequalities, and systems of equations.' },
      { icon: Star, title: 'Functional Understanding', description: 'Attain a functional understanding of mathematical functions.' },
      { icon: Star, title: 'Systems of Equations Proficiency', description: 'Excel in solving systems of equations through focused learning.' },
      { icon: Star, title: 'Interactive Learning Environment', description: 'Engage in interactive sessions for effective and dynamic learning.' }
    ]
  },
  {
    id: 'algebra-2',
    name: 'Algebra 2',
    description: 'Explore polynomial and exponential functions, trigonometry introduction, and advanced algebraic problem-solving.',
    parentFit: 'Best when grades are slipping in Algebra 2 or the next test feels unpredictable.',
    parentOutcome: 'A clearer plan for functions, polynomials, logs, and multi-step exam problems.',
    parentConcern: 'Algebra 2 suddenly feels harder than Algebra 1.',
    imageSrc: '/images/camps/cards/algebra-1.webp',
    price: 1649,
    level: 'Grades 10-11',
    icon: Calculator,
    gradient: 'from-[#F16112] to-[#F1894F]',
    bgGradient: 'bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/10',
    iconColor: 'text-[#F16112]',
    hoverBorder: 'border-[#F16112]/30',
    duration: '6 weeks',
    campDuration: 'June 15 - July 24, 2026',
    sessions: '2 hours/day',
    topics: [
      'Polynomial functions',
      'Rational functions',
      'Exponential & logarithmic functions',
      'Complex numbers',
      'Trigonometric functions',
      'Statistical analysis'
    ],
    goals: [
      { icon: Star, title: 'Advanced Function Mastery', description: 'Master complex functions and their real-world applications.' },
      { icon: Star, title: 'College Readiness', description: 'Prepare for college-level mathematics with rigorous coursework.' },
      { icon: Star, title: 'Higher Order Thinking', description: 'Develop abstract thinking and mathematical reasoning skills.' },
      { icon: Star, title: 'Test Excellence', description: 'Achieve success on standardized assessments and course exams.' }
    ]
  },
  {
    id: 'advanced-algebra-2',
    name: 'Advanced Algebra 2',
    description: 'Accelerated curriculum for advanced learners, diving deeper into complex algebraic concepts and college prep.',
    parentFit: 'Best for students on an honors, accelerated, or STEM track who need more challenge.',
    parentOutcome: 'Stronger readiness for Precalculus, AP courses, and advanced problem solving.',
    parentConcern: 'My child is doing well, but needs a higher ceiling.',
    imageSrc: '/images/camps/banners/advanced-math-banner.webp',
    price: 1649,
    level: 'Grades 10-11',
    icon: Award,
    gradient: 'from-[#1F396D] to-[#29335C]',
    bgGradient: 'bg-gradient-to-br from-[#1F396D]/5 to-[#29335C]/10',
    iconColor: 'text-[#1F396D]',
    hoverBorder: 'border-[#1F396D]/30',
    duration: '6 weeks',
    campDuration: 'June 15 - July 24, 2026',
    sessions: '2 hours/day',
    topics: [
      'Advanced polynomial functions',
      'Complex exponential concepts',
      'Trigonometric identities',
      'Systems of equations',
      'Matrix algebra',
      'College-level applications'
    ],
    goals: [
      { icon: Star, title: 'Accelerated Learning Path', description: 'Progress at an advanced pace with challenging material.' },
      { icon: Star, title: 'Mathematical Maturity', description: 'Develop sophisticated problem-solving and proof-writing skills.' },
      { icon: Star, title: 'STEM Preparation', description: 'Build foundation for advanced science and engineering courses.' },
      { icon: Star, title: 'Competition Readiness', description: 'Prepare for math competitions and advanced assessments.' }
    ]
  },
  {
    id: 'precalculus',
    name: 'Precalculus',
    description: 'Prepare for Calculus with advanced function analysis, trigonometry, and analytical geometry.',
    parentFit: 'Best when your child is about to take Calculus or is stuck in trig/functions.',
    parentOutcome: 'A smoother path into Calculus with fewer gaps in functions and trigonometry.',
    parentConcern: 'Precalculus is exposing gaps from earlier algebra or geometry.',
    imageSrc: '/assets/courses/math-band-high-school.webp',
    price: 1649,
    level: 'Grade 11',
    icon: Brain,
    gradient: 'from-[#F16112] to-[#F1894F]',
    bgGradient: 'bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/10',
    iconColor: 'text-[#F16112]',
    hoverBorder: 'border-[#F16112]/30',
    duration: '6 weeks',
    campDuration: 'June 15 - July 24, 2026',
    sessions: '2 hours/day',
    topics: [
      'Advanced functions & composition',
      'Trigonometric identities & graphs',
      'Sequences & series',
      'Conic sections',
      'Limits introduction',
      'Vectors & parametric equations'
    ],
    goals: [
      { icon: Star, title: 'Calculus Foundation', description: 'Build essential concepts needed for successful Calculus study.' },
      { icon: Star, title: 'Advanced Trigonometry', description: 'Master trigonometric functions and their applications.' },
      { icon: Star, title: 'Analytical Thinking', description: 'Develop ability to analyze and interpret complex functions.' },
      { icon: Star, title: 'College Pathway', description: 'Complete requirements for college mathematics placement.' }
    ]
  },
  {
    id: 'ap-precalculus',
    name: 'AP Precalculus',
    description: 'College Board AP-level course covering advanced topics essential for Calculus and university success.',
    parentFit: 'Best for students taking AP Precalculus who need AP pacing, review, and exam strategy.',
    parentOutcome: 'More confidence with AP-style questions and the concepts Calculus will assume.',
    parentConcern: 'The AP pace is fast and I want my child to stay ahead.',
    imageSrc: '/images/blog/high-school-math-finals-prep-banner.png',
    price: 1649,
    level: 'Grade 11',
    icon: Sparkles,
    gradient: 'from-[#1F396D] to-[#29335C]',
    bgGradient: 'bg-gradient-to-br from-[#1F396D]/5 to-[#29335C]/10',
    iconColor: 'text-[#1F396D]',
    hoverBorder: 'border-[#1F396D]/30',
    duration: '6 weeks',
    campDuration: 'June 15 - July 24, 2026',
    sessions: '2 hours/day',
    topics: [
      'AP Precalculus curriculum',
      'Advanced trigonometry',
      'Polar coordinates',
      'Parametric equations',
      'Complex function analysis',
      'AP exam preparation'
    ],
    goals: [
      { icon: Star, title: 'AP Exam Excellence', description: 'Achieve a high score on the AP Precalculus examination.' },
      { icon: Star, title: 'College Credit Potential', description: 'Earn college credit through AP exam success.' },
      { icon: Star, title: 'Rigorous Preparation', description: 'Master College Board curriculum standards.' },
      { icon: Star, title: 'University Success', description: 'Build skills for success in university-level mathematics.' }
    ]
  },
  {
    id: 'calculus-ab',
    name: 'Calculus AB',
    description: 'Master AP Calculus AB: limits, derivatives, integration, and real-world applications for college credit.',
    parentFit: 'Best when your child is in AP Calculus AB or wants support before the AP exam.',
    parentOutcome: 'A stronger grasp of limits, derivatives, integrals, and timed AP problem solving.',
    parentConcern: 'Calculus problems make sense in pieces, but not end-to-end.',
    imageSrc: '/images/camps/banners/advanced-math-banner.webp',
    price: 1649,
    level: 'Grades 11-12',
    icon: Sparkles,
    gradient: 'from-[#F16112] to-[#F1894F]',
    bgGradient: 'bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/10',
    iconColor: 'text-[#F16112]',
    hoverBorder: 'border-[#F16112]/30',
    duration: '6 weeks',
    campDuration: 'June 15 - July 24, 2026',
    sessions: '2 hours/day',
    topics: [
      'Limits & continuity',
      'Derivatives & applications',
      'Integration techniques',
      'Fundamental Theorem',
      'AP exam strategies',
      'College credit potential'
    ],
    goals: [
      { icon: Star, title: 'Strengthen Algebra Skills', description: 'Strengthen algebra skills crucial for success in calculus.' },
      { icon: Star, title: 'Critical Concepts Exploration', description: 'Explore critical calculus concepts, including limits, asymptotes, derivatives, and integrals.' },
      { icon: Star, title: 'Limit Understanding', description: 'Develop a clear understanding of limits as a foundational calculus concept.' },
      { icon: Star, title: 'Asymptote Exploration', description: 'Explore the concept of asymptotes and their significance in calculus.' },
      { icon: Star, title: 'Derivatives Mastery', description: 'Master the calculation and application of derivatives in calculus.' },
      { icon: Star, title: 'Integral Understanding', description: 'Gain a comprehensive understanding of integrals and their role in calculus.' },
      { icon: Star, title: 'Application of Concepts', description: 'Apply learned concepts to solve real-world calculus problems.' },
      { icon: Star, title: 'Problem-Solving Proficiency', description: 'Develop proficiency in problem-solving through calculus exercises.' }
    ]
  }
];

const COURSE_THEMES = [
  {
    headerBg:          'bg-[#1F396D]',
    gradeBadgeBg:      'bg-white/20 text-white border border-white/40',
    checkmarkColor:    'text-[#E8571A]',
    iconTilePrimary:   'bg-[#F16112]/10 text-[#F16112]',
    iconTileSecond:    'bg-[#1F396D]/10 text-[#1F396D]',
    selectFocusRing:   'focus:border-[#1F396D] focus:ring-[#1F396D]/20',
    buttonBg:          'bg-[#E8571A] hover:bg-[#C44A14]',
    buttonShadow:      'shadow-[0_4px_14px_rgba(232,87,26,0.35)]',
    expandToggleHover: 'hover:text-[#1F396D]',
  },
  {
    headerBg:          'bg-[#F16112]',
    gradeBadgeBg:      'bg-white/20 text-white border border-white/40',
    checkmarkColor:    'text-[#1F396D]',
    iconTilePrimary:   'bg-[#1F396D]/10 text-[#1F396D]',
    iconTileSecond:    'bg-[#F16112]/10 text-[#F16112]',
    selectFocusRing:   'focus:border-[#F16112] focus:ring-[#F16112]/20',
    buttonBg:          'bg-[#1F396D] hover:bg-[#162850]',
    buttonShadow:      'shadow-[0_4px_14px_rgba(31,57,109,0.35)]',
    expandToggleHover: 'hover:text-[#F16112]',
  },
] as const;

export function HighSchoolSummerIntensivePage() {
  const locale = useLocale();
  const [selectedSummerCourse, setSelectedSummerCourse] = useState<SummerEnrollmentCourse | null>(null);
  const [summerEnrollmentForm, setSummerEnrollmentForm] = useState<SummerEnrollmentForm>(initialSummerEnrollmentForm);
  const [summerEnrollmentStatus, setSummerEnrollmentStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [summerEnrollmentError, setSummerEnrollmentError] = useState('');
  const [courseSchedules, setCourseSchedules] = useState<Record<string, string>>({});
  const [expandedCurriculum, setExpandedCurriculum] = useState<Record<string, boolean>>({});

  const handleEnroll = (course: { id: string; name: string }) => {
    const schedule = courseSchedules[course.id] ?? DEFAULT_SCHEDULE;
    setSelectedSummerCourse({
      id: course.id,
      name: course.name,
      schedule,
    });
    setSummerEnrollmentForm({
      ...initialSummerEnrollmentForm,
      subject: course.name,
    });
    setSummerEnrollmentStatus('idle');
    setSummerEnrollmentError('');
  };

  const closeSummerEnrollmentModal = () => {
    setSelectedSummerCourse(null);
    setSummerEnrollmentForm(initialSummerEnrollmentForm);
    setSummerEnrollmentStatus('idle');
    setSummerEnrollmentError('');
  };

  const updateSummerEnrollmentForm = (field: keyof SummerEnrollmentForm, value: string) => {
    setSummerEnrollmentForm((current) => ({
      ...current,
      [field]: value,
    }));
    setSummerEnrollmentError('');
  };

  const handleSummerEnrollmentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSummerCourse) return;

    const { parentName, email, studentName, grade, subject } = summerEnrollmentForm;
    if (!parentName.trim() || !email.trim() || !studentName.trim() || !grade.trim() || !subject.trim()) {
      setSummerEnrollmentError('Please complete all fields.');
      return;
    }

    setSummerEnrollmentStatus('submitting');
    setSummerEnrollmentError('');

    try {
      const response = await fetch('/api/summer-math-enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentName.trim(),
          email: email.trim(),
          studentName: studentName.trim(),
          grade: grade.trim(),
          subject: subject.trim(),
          schedule: selectedSummerCourse.schedule,
          courseId: selectedSummerCourse.id,
        }),
      });
      const result: { success?: boolean; error?: string; message?: string } = await response.json();
      if (!response.ok || !result.success) {
        setSummerEnrollmentError(result.error || result.message || 'Please try again.');
        setSummerEnrollmentStatus('idle');
        return;
      }
      setSummerEnrollmentStatus('success');
    } catch {
      setSummerEnrollmentError('Network error. Please try again.');
      setSummerEnrollmentStatus('idle');
    }
  };

  const curriculumMap: Record<string, CourseCurriculum> = {
    'algebra-1': algebra1Curriculum,
    'algebra-2': algebra2Curriculum,
    'precalculus': precalculusCurriculum,
    'ap-precalculus': apPrecalculusCurriculum,
    'advanced-algebra-2': advancedAlgebra2Curriculum,
    'calculus-ab': calculusABCurriculum,
  };

  const courseDetails = (course: typeof highSchoolMathCourses[0], courseTheme: typeof COURSE_THEMES[0]) => (
    <>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-3">CAMP DETAILS</p>
          <div className="grid grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 ${courseTheme.iconTilePrimary}`}>
              <Calendar className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold text-gray-900">Duration</p>
              <p className="text-sm mt-1">{course.campDuration}</p>
            </div>
            <div className={`rounded-lg p-4 ${courseTheme.iconTileSecond}`}>
              <DollarSign className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold text-gray-900">Price</p>
              <p className="text-sm mt-1">${course.price.toLocaleString()}</p>
            </div>
            <div className={`rounded-lg p-4 ${courseTheme.iconTilePrimary}`}>
              <Clock className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold text-gray-900">Daily hours</p>
              <p className="text-sm mt-1">{course.sessions} / day</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Choose your schedule
          </label>
          <select
            value={courseSchedules[course.id] ?? DEFAULT_SCHEDULE}
            onChange={(e) => setCourseSchedules({ ...courseSchedules, [course.id]: e.target.value })}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 ${courseTheme.selectFocusRing}`}
          >
            {SCHEDULE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#ebebeb]" style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/courses/math-band-high-school.webp)' }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>

        <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
          <div className="mb-3">
            <Link href={publicPath('/academic/math/high-school', locale)} className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              ← Back to Year-Round Tutoring
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            High School Math Summer Intensive · Dublin, CA
          </h1>
          <p className="text-lg text-white/90 mb-3">June 15 – July 24, 2026</p>
          <p className="text-base text-white/80 max-w-3xl">
            6 weeks × 10 hours per week = 60 hours of expert instruction. Master Algebra 1, Algebra 2, Advanced Algebra 2, Precalculus, AP Precalculus, or Calculus AB before school starts.
          </p>
        </div>
      </section>

      {/* 1. JTBD Situation Strip */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold text-gray-600 uppercase mb-6">Which sounds like your child?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Entering a harder course', desc: 'Needs to build confidence before fall' },
              { label: 'Passed, but not confident', desc: 'Strong grade, weaker understanding' },
              { label: 'Honors / AP track', desc: 'Staying ahead of accelerated pace' },
              { label: 'Close gaps before fall', desc: 'Firm up weak spots now' },
            ].map((situation, idx) => (
              <button
                key={idx}
                onClick={() => document.querySelector('[data-section="courses"]')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-left p-4 rounded-lg border border-gray-300 hover:border-[#1F396D] hover:bg-[#1F396D]/5 transition-all cursor-pointer"
              >
                <p className="font-semibold text-gray-900 text-sm">{situation.label}</p>
                <p className="text-xs text-gray-600 mt-1">{situation.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">4.9★</span>
              <span>Google Reviews</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="hidden sm:block">40+ parent reviews</div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="hidden sm:block">387+ students enrolled</div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="hidden sm:block">Max 8 per class</div>
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="bg-white py-12 md:py-14 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Choose Your Course', desc: 'Pick Algebra 1, Precalc, AP Calc, or another course' },
              { step: 2, title: 'Select a Schedule', desc: '10am–Noon or 3:30–5:30pm, Monday–Friday' },
              { step: 3, title: 'Start June 15', desc: '60 hours of expert instruction over 6 weeks' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1F396D] text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Social Proof */}
      <section className="bg-gray-50 py-12 md:py-14 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">What Parents Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stars: 5, text: 'My child went from C to A in just 6 weeks. The instructors really care.', author: 'Sarah M.', location: 'Pleasanton', initials: 'SM' },
              { stars: 5, text: 'Best summer decision we made. She started AP ready and confident.', author: 'James L.', location: 'San Ramon', initials: 'JL' },
              { stars: 5, text: 'Small class size meant she got real attention. Worth every penny.', author: 'Maria G.', location: 'Livermore', initials: 'MG' },
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <div className="text-center">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-[#1F396D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Quote className="w-6 h-6 text-[#1F396D]" />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F16112] text-[#F16112]" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1F396D] flex items-center justify-center border-2 border-white shadow-md flex-shrink-0">
                      <span className="text-white font-bold text-base">{review.initials}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 text-sm">{review.author}</h4>
                      <p className="text-gray-600 text-xs">{review.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 lg:px-8" data-section="courses">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Choose Your Course</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {highSchoolMathCourses.map((course, index) => {
            const courseTheme = COURSE_THEMES[index % COURSE_THEMES.length];
            const curriculum = curriculumMap[course.id];

            return (
              <article key={course.id} className="rounded-2xl border border-gray-300 overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                {/* Header */}
                <div className={`${courseTheme.headerBg} text-white px-6 lg:px-8 py-8`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{course.name} · Summer Intensive</h3>
                    <Badge className={`${courseTheme.gradeBadgeBg} px-4 py-1.5 text-sm font-semibold`}>
                      {course.level}
                    </Badge>
                  </div>
                  <p className="text-white/90">{course.description}</p>
                </div>

                {/* Body */}
                <div className="p-6 lg:p-8 flex flex-col flex-grow">
                  {/* Learning Outcomes */}
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-600 uppercase mb-3">By the end, students will:</p>
                    <ul className="space-y-3">
                      {curriculum.learningOutcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className={`mt-0.5 h-5 w-5 shrink-0 ${courseTheme.checkmarkColor}`} />
                          <span className="text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info Badges */}
                  <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50">
                      <span className="text-xs font-medium text-gray-700">Aligned with DUSD & PUSD</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50">
                      <span className="text-xs font-medium text-gray-700">Max 8 students</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50">
                      <span className="text-xs font-medium text-gray-700">Pattern Mistake Fixing</span>
                    </div>
                  </div>

                  {/* Details Panel - Mobile */}
                  <div className="lg:hidden mb-8 border-t pt-6">
                    {courseDetails(course, courseTheme)}
                  </div>

                  {/* Curriculum Toggle */}
                  {curriculum && (
                    <div className="mb-6 border-t pt-4">
                      <button
                        onClick={() => setExpandedCurriculum(prev => ({
                          ...prev,
                          [course.id]: !prev[course.id]
                        }))}
                        className={`flex items-center gap-2 text-lg font-semibold text-gray-900 transition-colors ${courseTheme.expandToggleHover}`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${expandedCurriculum[course.id] ? 'rotate-180' : ''}`}
                        />
                        What we cover — full topic list
                      </button>

                      {expandedCurriculum[course.id] && (
                        <div className="mt-6 space-y-6">
                          {curriculum.weeks.map((week) => (
                            <div key={week.week} className="pb-6 border-b border-gray-200 last:border-b-0">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                Week {week.week}: {week.title}
                              </h4>
                              <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Core Topics:</p>
                                <p className="text-base text-gray-700">{week.topics.join(', ')}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Key Outcome:</p>
                                <p className="text-base text-gray-700">{week.outcome}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price & Schedule Section */}
                  <div className="border-t pt-6 mb-6">
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-gray-900">${course.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-1">2 hours everyday for 6 weeks - 60 hours</p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Select a schedule
                      </label>
                      <select
                        value={courseSchedules[course.id] ?? DEFAULT_SCHEDULE}
                        onChange={(event) =>
                          setCourseSchedules((current) => ({
                            ...current,
                            [course.id]: event.target.value,
                          }))
                        }
                        className={`w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${courseTheme.selectFocusRing} bg-white`}
                      >
                        {SCHEDULE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <Button
                    onClick={() => handleEnroll(course)}
                    className={`w-full rounded-lg px-6 py-4 text-base font-semibold text-white ${courseTheme.buttonBg} ${courseTheme.buttonShadow} transition-all hover:shadow-md mt-auto`}
                  >
                    Enroll now →
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'What if my child is behind in math?',
                a: 'Our instructors work at each student\'s level. We start with fundamentals and build from there. Small class size means personalized attention.',
              },
              {
                q: 'Is this online or in-person?',
                a: 'All classes are in-person at our Dublin campus, Monday–Friday, 2 hours per day. We provide a focused, interactive learning environment.',
              },
              {
                q: 'What grade levels are these courses for?',
                a: 'Algebra 1 is Grades 8–9; Algebra 2 is Grades 10–11; Precalculus and AP Precalculus are Grade 11; Calculus AB is Grades 11–12. Placement depends on your child\'s math level.',
              },
              {
                q: 'How small are the classes?',
                a: 'Maximum 8 students per class. This ensures every student gets personal feedback and attention from the instructor.',
              },
              {
                q: 'What if I\'m not sure which course to pick?',
                a: 'We recommend a free assessment call. Our team will evaluate your child\'s current level and recommend the best fit. Email us or call (925) 555-0123.',
              },
              {
                q: 'What\'s your refund policy?',
                a: 'Refunds are available if you cancel at least 2 weeks before the start date. Partial refunds are available for cancellations closer to the start.',
              },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-[#1F396D]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 pt-2">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enrollment Modal */}
      <AlertDialog open={!!selectedSummerCourse} onOpenChange={closeSummerEnrollmentModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Enroll in {selectedSummerCourse?.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Schedule: {selectedSummerCourse?.schedule}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {summerEnrollmentStatus === 'success' ? (
            <div className="py-8 text-center">
              <Sparkles className="w-12 h-12 text-[#F16112] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">You're All Set!</h3>
              <p className="text-gray-600">We'll contact you shortly to confirm your enrollment.</p>
              <Button
                onClick={closeSummerEnrollmentModal}
                className="mt-6 w-full bg-[#1F396D] hover:bg-[#183056] text-white rounded-full"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSummerEnrollmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Parent Name *</label>
                <input
                  type="text"
                  value={summerEnrollmentForm.parentName}
                  onChange={(e) => updateSummerEnrollmentForm('parentName', e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Email *</label>
                <input
                  type="email"
                  value={summerEnrollmentForm.email}
                  onChange={(e) => updateSummerEnrollmentForm('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Student Name *</label>
                <input
                  type="text"
                  value={summerEnrollmentForm.studentName}
                  onChange={(e) => updateSummerEnrollmentForm('studentName', e.target.value)}
                  placeholder="Student name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Grade *</label>
                <input
                  type="text"
                  value={summerEnrollmentForm.grade}
                  onChange={(e) => updateSummerEnrollmentForm('grade', e.target.value)}
                  placeholder="e.g., 10"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>

              {summerEnrollmentError && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{summerEnrollmentError}</div>
              )}

              <button
                type="submit"
                disabled={summerEnrollmentStatus === 'submitting'}
                className="w-full bg-[#F16112] hover:bg-[#d54f0a] disabled:bg-gray-400 text-white rounded-full px-6 py-3 font-semibold transition-colors"
              >
                {summerEnrollmentStatus === 'submitting' ? 'Submitting...' : 'Complete Enrollment'}
              </button>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>

      {/* 6. Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 py-4">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900">Enroll by June 1</p>
            <p className="text-xs text-gray-600">~2 spots left in most schedules</p>
          </div>
          <Button
            onClick={() => document.querySelector('[data-section="courses"]')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#F16112] hover:bg-[#d54f0a] text-white px-6 py-2 rounded-full font-semibold whitespace-nowrap"
          >
            Choose a Course
          </Button>
        </div>
      </div>

      {/* Bottom padding to prevent content from hiding under sticky CTA */}
      <div className="h-24"></div>
    </div>
  );
}
