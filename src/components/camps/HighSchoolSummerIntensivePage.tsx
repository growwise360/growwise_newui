'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/lib/constants';
import { siteGoogleTrustReviewCards } from '@/lib/siteGoogleTrustReviews';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, Calculator, Award, Brain, Sparkles, Star, X, HelpCircle, Calendar, ChevronDown, DollarSign, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getDefaultOpenFaqValues } from "@/lib/faq-accordion";
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS } from '@/lib/schema/high-school-summer-intensive-jsonld-faqs';
import pageCopy from '@/i18n/messages/high-school-summer-intensive-en.json';

const PAGE = pageCopy;

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

// Social Proof Component with Real Reviews
function SocialProofSection() {
  const testimonials = useMemo(
    () =>
      siteGoogleTrustReviewCards().slice(0, 3).map((t, i) => ({
        id: i + 1,
        name: t.name,
        content: t.content,
        rating: t.rating,
      })),
    []
  );

  return (
    <section className="bg-gray-50 py-12 md:py-14 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{PAGE.socialProof.title}</h2>
          <p className="text-sm text-gray-600">{PAGE.socialProof.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                "{review.content}"
              </p>
              <p className="text-xs text-gray-600">
                — {review.name} {PAGE.socialProof.reviewAttribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      setSummerEnrollmentError(PAGE.enrollment.requiredFields);
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
        setSummerEnrollmentError(result.error || result.message || PAGE.enrollment.genericError);
        setSummerEnrollmentStatus('idle');
        return;
      }
      setSummerEnrollmentStatus('success');
    } catch {
      setSummerEnrollmentError(PAGE.enrollment.networkError);
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
          <p className="text-sm font-semibold text-gray-600 mb-3">{PAGE.courses.campDetailsLabel}</p>
          <div className="grid grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 ${courseTheme.iconTilePrimary}`}>
              <Calendar className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold text-gray-900">{PAGE.courses.durationLabel}</p>
              <p className="text-sm mt-1">{course.campDuration}</p>
            </div>
            <div className={`rounded-lg p-4 ${courseTheme.iconTileSecond}`}>
              <DollarSign className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold text-gray-900">Price</p>
              <p className="text-sm mt-1">${course.price.toLocaleString()}</p>
            </div>
            <div className={`rounded-lg p-4 ${courseTheme.iconTilePrimary}`}>
              <Clock className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold text-gray-900">{PAGE.courses.dailyHoursLabel}</p>
              <p className="text-sm mt-1">
                {course.sessions} {PAGE.courses.perDaySuffix}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {PAGE.courses.scheduleLabel}
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
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <Link href={publicPath('/academic/math/high-school', locale)} className="text-white/90 hover:text-white font-medium transition-colors">
              {PAGE.hero.backHighSchool}
            </Link>
            <Link href={publicPath('/camps/summer', locale)} className="text-white/80 hover:text-white font-medium transition-colors">
              {PAGE.hero.backSummer}
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{PAGE.hero.h1}</h1>
          <p className="text-lg text-white/90 mb-3">{PAGE.hero.dateLine}</p>
          <p className="text-base text-white/80 max-w-3xl">{PAGE.hero.subhead}</p>
        </div>
      </section>

      {/* 1. JTBD Situation Strip */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold text-gray-600 uppercase mb-6">{PAGE.jtbd.eyebrow}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAGE.jtbd.situations.map((situation, idx) => (
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
              <span className="text-lg font-bold">{PAGE.trustBar.rating}</span>
              <span>{PAGE.trustBar.ratingLabel}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="hidden sm:block">{PAGE.trustBar.reviews}</div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="hidden sm:block">{PAGE.trustBar.enrolled}</div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="hidden sm:block">{PAGE.trustBar.classSize}</div>
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="bg-white py-12 md:py-14 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">{PAGE.howItWorks.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PAGE.howItWorks.steps.map((item, stepIndex) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1F396D] text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {stepIndex + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Social Proof */}
      <SocialProofSection />

      {/* Courses Grid */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 lg:px-8" data-section="courses">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">{PAGE.courses.title}</h2>

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
                    <p className="text-sm font-semibold text-gray-600 uppercase mb-3">{PAGE.courses.outcomesLabel}</p>
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
                      <span className="text-xs font-medium text-gray-700">{PAGE.courses.alignedBadge}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50">
                      <span className="text-xs font-medium text-gray-700">{PAGE.courses.maxStudentsBadge}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50">
                      <span className="text-xs font-medium text-gray-700">{PAGE.courses.patternBadge}</span>
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
                        {PAGE.courses.curriculumToggle}
                      </button>

                      {expandedCurriculum[course.id] && (
                        <div className="mt-6 space-y-6">
                          {curriculum.weeks.map((week) => (
                            <div key={week.week} className="pb-6 border-b border-gray-200 last:border-b-0">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                Week {week.week}: {week.title}
                              </h4>
                              <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                  {PAGE.courses.coreTopicsLabel}
                                </p>
                                <p className="text-base text-gray-700">{week.topics.join(', ')}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                  {PAGE.courses.weeklyOutcomeLabel}
                                </p>
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
                    {PAGE.courses.enrollCta}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12">{PAGE.faq.title}</h2>
          <Accordion
            type="multiple"
            className="space-y-4"
            defaultValue={getDefaultOpenFaqValues(
              HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS.length,
              (idx) => `faq-${idx}`,
            )}
          >
            {HIGH_SCHOOL_SUMMER_INTENSIVE_FAQS.map((item, idx) => (
              <AccordionItem key={item.question} value={`faq-${idx}`}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-[#1F396D]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enrollment Modal */}
      <Dialog
        open={!!selectedSummerCourse}
        onOpenChange={(open) => {
          if (!open) closeSummerEnrollmentModal();
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {PAGE.modal.titlePrefix} {selectedSummerCourse?.name}
            </DialogTitle>
            <DialogDescription>
              {PAGE.modal.scheduleLabel} {selectedSummerCourse?.schedule}
            </DialogDescription>
          </DialogHeader>

          {summerEnrollmentStatus === 'success' ? (
            <div className="py-8 text-center">
              <Sparkles className="w-12 h-12 text-[#F16112] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{PAGE.modal.successTitle}</h3>
              <p className="text-gray-600">{PAGE.modal.successBody}</p>
              <Button
                onClick={closeSummerEnrollmentModal}
                className="mt-6 w-full bg-[#1F396D] hover:bg-[#183056] text-white rounded-full"
              >
                {PAGE.modal.done}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSummerEnrollmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">{PAGE.modal.parentNameLabel}</label>
                <input
                  type="text"
                  value={summerEnrollmentForm.parentName}
                  onChange={(e) => updateSummerEnrollmentForm('parentName', e.target.value)}
                  placeholder={PAGE.modal.parentNamePlaceholder}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">{PAGE.modal.emailLabel}</label>
                <input
                  type="email"
                  value={summerEnrollmentForm.email}
                  onChange={(e) => updateSummerEnrollmentForm('email', e.target.value)}
                  placeholder={PAGE.modal.emailPlaceholder}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">{PAGE.modal.studentNameLabel}</label>
                <input
                  type="text"
                  value={summerEnrollmentForm.studentName}
                  onChange={(e) => updateSummerEnrollmentForm('studentName', e.target.value)}
                  placeholder={PAGE.modal.studentNamePlaceholder}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F396D]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">{PAGE.modal.gradeLabel}</label>
                <input
                  type="text"
                  value={summerEnrollmentForm.grade}
                  onChange={(e) => updateSummerEnrollmentForm('grade', e.target.value)}
                  placeholder={PAGE.modal.gradePlaceholder}
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
                {summerEnrollmentStatus === 'submitting' ? PAGE.modal.submitting : PAGE.modal.submitIdle}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 6. Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 py-4">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900">{PAGE.sticky.headline}</p>
            <p className="text-xs text-gray-600">{PAGE.sticky.subline}</p>
          </div>
          <Button
            onClick={() => document.querySelector('[data-section="courses"]')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#F16112] hover:bg-[#d54f0a] text-white px-6 py-2 rounded-full font-semibold whitespace-nowrap"
          >
            {PAGE.sticky.cta}
          </Button>
        </div>
      </div>

      {/* Bottom padding to prevent content from hiding under sticky CTA */}
      <div className="h-24"></div>
    </div>
  );
}
