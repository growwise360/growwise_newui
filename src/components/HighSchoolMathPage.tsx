import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/lib/constants';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { GraduationCap, Calculator, TrendingUp, Award, BookOpen, CheckCircle, Clock, Users, Target, Brain, Sparkles, Eye, ChevronRight, Star, X, UserCheck, HelpCircle, Calendar, ChevronDown, ArrowRight, ShoppingCart } from "lucide-react";
import { MATH_HUB_COPY } from '@/lib/math-hub-copy';
import {
  HIGH_SCHOOL_MATH_PROGRAM_DETAILS,
  HIGH_SCHOOL_PROGRAM_INCLUDES,
  HIGH_SCHOOL_PROGRAM_OUTCOMES,
} from '@/lib/high-school-math-program-copy';
import { mapHubOptionsToPricingTiers } from '@/lib/map-math-program-tiers';
import { buildHighSchoolSeoIntroParagraph, getMathHubMinMonthlyUsd } from '@/lib/math-pricing-display';
import { MathProgramDetailsSection } from '@/components/courses/MathProgramDetailsSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { getDefaultOpenFaqValues } from "@/lib/faq-accordion";
import { HS_MATH_VISIBLE_FAQS } from "@/lib/schema/high-school-math-faqs";
import {
  HIGH_SCHOOL_JTBD_SECTION,
  HIGH_SCHOOL_JTBD_SITUATIONS,
  type HighSchoolJtbdSituation,
} from '@/lib/high-school-math-jtbd';
import { HIGH_SCHOOL_TRIAL } from '@/lib/math-program-trial-copy';
import { MathTrialSection } from '@/components/courses/MathTrialSection';
import { useCart } from './gw/CartContext';
import { useChatbot } from '../contexts/ChatbotContext';
import FreeAssessmentModal from './FreeAssessmentModal';
import { getIconComponent } from '@/lib/iconMap';
import { RelatedContent } from './seo/RelatedContent';
import { MathParentGuidesSection } from '@/components/courses/MathParentGuidesSection';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';

const hsMonthlyProgram = MATH_HUB_COPY.programOptions.cards.find((c) => c.id === 'high-school');
const hsGradeBandCard = MATH_HUB_COPY.gradeBands.cards.find((c) => c.id === 'high-school');
const floatingMathSymbols = [
  { symbol: '∑', left: 8, top: 18, duration: 9.2, size: 22 },
  { symbol: '∫', left: 18, top: 68, duration: 10.4, size: 28 },
  { symbol: '∂', left: 27, top: 32, duration: 11.1, size: 24 },
  { symbol: 'π', left: 39, top: 78, duration: 8.8, size: 30 },
  { symbol: '∞', left: 48, top: 20, duration: 10.9, size: 26 },
  { symbol: '√', left: 58, top: 54, duration: 9.7, size: 21 },
  { symbol: '≈', left: 69, top: 14, duration: 11.4, size: 29 },
  { symbol: '≠', left: 78, top: 72, duration: 9.5, size: 25 },
  { symbol: '≤', left: 88, top: 36, duration: 10.7, size: 23 },
  { symbol: '≥', left: 94, top: 84, duration: 8.9, size: 31 },
  { symbol: 'α', left: 12, top: 44, duration: 11.6, size: 20 },
  { symbol: 'β', left: 34, top: 10, duration: 9.8, size: 27 },
  { symbol: 'θ', left: 52, top: 88, duration: 10.2, size: 24 },
  { symbol: 'Δ', left: 72, top: 42, duration: 11.8, size: 32 },
  { symbol: '∇', left: 86, top: 8, duration: 9.1, size: 22 },
];

const augustHighSchoolReadiness = [
  {
    course: 'Algebra 1 and IM1',
    check: 'Linear equations, graphing, systems, proportions, and word-problem setup',
  },
  {
    course: 'Geometry',
    check: 'Algebra fluency, angle relationships, proof language, and visual reasoning',
  },
  {
    course: 'Algebra 2 and IM3',
    check: 'Functions, factoring, radicals, rational expressions, and multi-step test stamina',
  },
] as const;

const HighSchoolMathPage: React.FC = () => {
  const locale = useLocale();
  const { addItem } = useCart();
  const { openChatbot } = useChatbot();
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedHsJtbdId, setSelectedHsJtbdId] = useState(HIGH_SCHOOL_JTBD_SITUATIONS[0].id);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const selectedHsJtbd =
    HIGH_SCHOOL_JTBD_SITUATIONS.find((s) => s.id === selectedHsJtbdId) ??
    HIGH_SCHOOL_JTBD_SITUATIONS[0];

  const openAssessment = () => setIsAssessmentModalOpen(true);

  const primaryHsJtbdCta = (situation: HighSchoolJtbdSituation) => {
    if (situation.primaryCta === 'contact') {
      return (
        <button
          type="button"
          onClick={() => setIsContactModalOpen(true)}
          className="inline-flex items-center justify-center rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
        >
          {situation.primaryLabel}
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={openAssessment}
        className="inline-flex items-center justify-center rounded-full bg-[#F16112] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d54f0a]"
      >
        {situation.primaryLabel}
      </button>
    );
  };
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      const hasHover = window.matchMedia('(hover: hover)').matches;

      setIsTouchDevice(hasTouch && (isSmallScreen || !hasHover));
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programFeatures = [
    {
      icon: Calculator,
      title: 'Math Courses in Dublin',
      description: 'Our Math courses are tailored specifically for students in Dublin, CA. We understand the local education standards and customize our curriculum to meet and exceed these expectations.',
      color: 'text-[#1F396D]',
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      delay: '0ms',
      isWhiteCard: true
    },
    {
      icon: BookOpen,
      title: 'Common Core Math Alignment',
      description: 'At GrowWise, our math programs for Grades 1-8 are fully aligned with Common Core standards and the pacing guides used by DUSD, PUSD, and other Tri-Valley school districts. We focus on building strong number sense, conceptual understanding, and problem-solving skills that reinforce classroom instruction.',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-[#F16112] to-[#F1894F]',
      borderColor: 'border-[#F16112]',
      delay: '100ms',
      isOrangeCard: true
    },
    {
      icon: TrendingUp,
      title: 'Accelerated & Enrichment Math',
      description: 'GrowWise offers support for accelerated math learners through challenging problems, pre-algebra foundations, and advanced concepts. Our curriculum is designed to match the rigor of district-level accelerated programs and help students in Dublin, Pleasanton, and San Ramon stay ahead with confidence.',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-[#F16112] to-[#F1894F]',
      borderColor: 'border-[#F16112]',
      delay: '200ms',
      isOrangeCard: true
    }
  ];

  const highSchoolMathCourses = [
    {
      id: 'algebra-1',
      name: 'Algebra 1',
      description: 'Master linear equations, quadratic functions, and foundational algebraic concepts aligned with DUSD and PUSD standards.',
      parentFit: 'Best when your child is entering Algebra 1 or needs a stronger base before Algebra 2.',
      parentOutcome: 'Fewer missed steps on equations, graphs, and word problems.',
      parentConcern: 'My child understands in class, then freezes on homework or tests.',
      imageSrc: '/images/camps/banners/algebra_1_get_ready_3572836f_web.webp',
      groupPrice: 45,
      oneOnOnePrice: 65,
      level: 'Grades 8-9',
      icon: GraduationCap,
      gradient: 'from-[#1F396D] to-[#29335C]',
      bgGradient: 'bg-gradient-to-br from-[#1F396D]/5 to-[#29335C]/10',
      iconColor: 'text-[#1F396D]',
      hoverBorder: 'border-[#1F396D]/30',
      duration: 'One 2 hours class every weekday for 12 weeks',
      campDuration: 'June 15 - September 5, 2026',
      sessions: '2 hours',
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
      groupPrice: 45,
      oneOnOnePrice: 65,
      level: 'Grades 10-11',
      icon: Calculator,
      gradient: 'from-[#F16112] to-[#F1894F]',
      bgGradient: 'bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/10',
      iconColor: 'text-[#F16112]',
      hoverBorder: 'border-[#F16112]/30',
      duration: 'One 2 hours class every weekday for 12 weeks',
      campDuration: 'June 15 - September 5, 2026',
      sessions: '2 hours',
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
      groupPrice: 55,
      oneOnOnePrice: 70,
      level: 'Grades 10-11',
      icon: TrendingUp,
      gradient: 'from-[#1F396D] to-[#29335C]',
      bgGradient: 'bg-gradient-to-br from-[#1F396D]/5 to-[#29335C]/10',
      iconColor: 'text-[#1F396D]',
      hoverBorder: 'border-[#1F396D]/30',
      duration: 'One 2.5 hours class every weekday for 10 weeks',
      campDuration: 'June 15 - August 22, 2026',
      sessions: '2.5 hours',
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
      groupPrice: 55,
      oneOnOnePrice: 70,
      level: 'Grade 11',
      icon: Award,
      gradient: 'from-[#F16112] to-[#F1894F]',
      bgGradient: 'bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/10',
      iconColor: 'text-[#F16112]',
      hoverBorder: 'border-[#F16112]/30',
      duration: 'One 2.5 hours class every weekday for 12 weeks',
      campDuration: 'June 15 - September 5, 2026',
      sessions: '2.5 hours',
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
      groupPrice: 65,
      oneOnOnePrice: 75,
      level: 'Grade 11',
      icon: Brain,
      gradient: 'from-[#1F396D] to-[#29335C]',
      bgGradient: 'bg-gradient-to-br from-[#1F396D]/5 to-[#29335C]/10',
      iconColor: 'text-[#1F396D]',
      hoverBorder: 'border-[#1F396D]/30',
      duration: 'One 2.5 hours class every weekday for 12 weeks',
      campDuration: 'June 15 - September 5, 2026',
      sessions: '2.5 hours',
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
      groupPrice: 65,
      oneOnOnePrice: 75,
      level: 'Grades 11-12',
      icon: Sparkles,
      gradient: 'from-[#F16112] to-[#F1894F]',
      bgGradient: 'bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/10',
      iconColor: 'text-[#F16112]',
      hoverBorder: 'border-[#F16112]/30',
      duration: 'One 2.5 hours class every weekday for 14 weeks',
      campDuration: 'June 15 - September 19, 2026',
      sessions: '2.5 hours',
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

  type HighSchoolMathCourse = (typeof highSchoolMathCourses)[number];

  const handleAddToCart = (course: HighSchoolMathCourse) => {
    addItem({
      id: course.id,
      name: course.name,
      price: course.groupPrice,
      quantity: 1,
      image: '📐',
      category: 'High School Math',
    });
  };

  const handleMouseEnter = (courseId: string) => {
    if (!isTouchDevice) {
      setHoveredCourse(courseId);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setHoveredCourse(null);
    }
  };

  const getCourseGradients = (course: HighSchoolMathCourse) => ({
    gradient: course.gradient,
    bgGradient: course.bgGradient,
    iconColor: course.iconColor,
    hoverBorder: course.hoverBorder,
  });

  // Contact information for modal
  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Call Us',
      primary: '(925) 456-4606',
      secondary: 'Mon-Fri 9AM-7PM',
      description: 'Speak directly with our education consultants',
      bgColor: 'bg-[#1F396D]'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      primary: CONTACT_INFO.email,
      secondary: 'Response within 24 hours',
      description: 'Get detailed information about our programs',
      bgColor: 'bg-[#F16112]'
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      primary: '4564 Dublin Blvd',
      secondary: 'Dublin, CA 94568',
      description: 'Come see our learning center in person',
      bgColor: 'bg-[#F1894F]'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      primary: 'Instant Support',
      secondary: 'Available during business hours',
      description: 'Quick answers to your questions',
      bgColor: 'bg-[#29335C]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ebebeb]" style={{ fontFamily: '"Nunito", "Inter", system-ui, sans-serif' }}>

      {/* Enhanced Creative Header Section - High School Math Theme */}
      <section className="relative overflow-hidden">
        {/* Animated Background - High School Math-themed gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
          {/* Floating math symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {floatingMathSymbols.map((item, i) => (
              <div
                key={i}
                className="absolute text-gray-500/60 animate-float-gentle font-semibold"
                style={{
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  transform: `translateY(${scrollY * 0.05}px)`,
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${item.duration}s`,
                  fontSize: `${item.size}px`
                }}
              >
                {item.symbol}
              </div>
            ))}
          </div>
          
          {/* Gradient overlay circles - High School Math theme colors */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#1F396D]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#F16112]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-16">
          {/* Main Header Content */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              High School Math Tutoring
            </h1>
            <div className="inline-flex items-center gap-3 bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200/50">
              <GraduationCap className="w-5 h-5 text-[#F1894F]" />
              <span className="text-gray-700 font-medium">Excel in Math with GrowWise</span>
              <Sparkles className="w-5 h-5 text-[#F1894F]" />
            </div>
            
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Math Courses in Dublin, CA for Grades 9-12. Aligned with California Common Core Standards for academic success and future STEM opportunities.
            </p>
            <p className="text-base text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              For a focused summer boost, see{' '}
              <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                summer math camps in Dublin
              </Link>
              .
            </p>
            {hsGradeBandCard ? (
              <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto">
                {hsGradeBandCard.packageLine}
              </p>
            ) : null}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setIsAssessmentModalOpen(true)}
                className="bg-gradient-to-r from-[#F16112] to-[#F1894F] hover:from-[#d54f0a] hover:to-[#F16112] text-white rounded-full px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <Calculator className="mr-2 w-5 h-5" />
                Book a Free Assessment
              </Button>
              <Button 
                onClick={() => {
                  const coursesSection = document.getElementById('courses');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                variant="outline" 
                className="border-2 border-gray-400 text-gray-700 bg-white/60 hover:bg-white hover:text-[#1F396D] rounded-full px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 shadow-lg"
              >
                <Eye className="mr-2 w-5 h-5" />
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20" aria-labelledby="high-school-august-readiness-heading">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            August readiness for high school math
          </p>
          <h2 id="high-school-august-readiness-heading" className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Algebra, Geometry, and IM courses punish small gaps quickly.
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">
            Parents searching for an Algebra 2 tutor, Geometry tutor, or high school math tutor near Dublin should
            check the prerequisite skills before the first unit test. The goal is to find the one or two missing skills
            that can make a whole course feel harder than it should.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {augustHighSchoolReadiness.map((item) => (
              <article key={item.course} className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#1F396D] mb-2">{item.course}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.check}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={publicPath('/resources/back-to-school-math-assessment-dublin-ca', locale)}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F396D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162850]"
            >
              Read the high school math readiness guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={publicPath('/resources/math-tutoring-options-dublin-ca', locale)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F396D] px-6 py-3 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
            >
              Compare math tutoring options
            </Link>
          </div>
        </div>
      </section>

      {/* CTA: Explore Summer Intensive Programs */}
      <section className="bg-gradient-to-r from-[#1F396D] to-[#F16112] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Looking for summer intensive programs?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our 6-week High School Summer Intensive courses — Algebra 1, Algebra 2, Precalculus, and Calculus AB. June 15 – September 5, 2026.
          </p>
          <Link
            href={publicPath('/camps/high-school-summer-intensive-dublin-ca', locale)}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-[#1F396D] shadow-lg hover:bg-gray-100 transition-colors"
          >
            View Summer Programs →
          </Link>
        </div>
      </section>

      {/* JTBD — parent situations */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F16112] mb-3">
            {HIGH_SCHOOL_JTBD_SECTION.sectionLabel}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            {HIGH_SCHOOL_JTBD_SECTION.heading}
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="flex flex-col gap-2 lg:col-span-2" role="list">
              {HIGH_SCHOOL_JTBD_SITUATIONS.map((situation) => {
                const isSelected = selectedHsJtbdId === situation.id;
                return (
                  <button
                    key={situation.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedHsJtbdId(situation.id)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-[#1F396D] bg-[#1F396D] text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-[#1F396D]/40 hover:bg-slate-50'
                    }`}
                  >
                    {situation.leftLabel}
                  </button>
                );
              })}
            </div>
            <div
              className="rounded-2xl border border-slate-200 bg-gray-50 p-6 lg:col-span-3 min-h-[220px]"
              aria-live="polite"
            >
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-3">
                {selectedHsJtbd.tagPill}
              </span>
              <h3 className="text-lg font-bold text-[#1F396D] mb-3">{selectedHsJtbd.panelHeading}</h3>
              <p className="text-sm leading-relaxed text-slate-700 mb-6">{selectedHsJtbd.panelBody}</p>
              <div className="flex flex-wrap gap-3">
                {primaryHsJtbdCta(selectedHsJtbd)}
                {selectedHsJtbd.secondaryHref && selectedHsJtbd.secondaryLabel ? (
                  <Link
                    href={publicPath(selectedHsJtbd.secondaryHref, locale)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#1F396D] px-5 py-2.5 text-sm font-semibold text-[#1F396D] hover:bg-[#1F396D]/5"
                  >
                    {selectedHsJtbd.secondaryLabel}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our High School Math Programs */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-purple-200/30 backdrop-blur-lg rounded-[32px] border border-blue-200/30 p-8 lg:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Our <span className="text-[#1F396D]">High School Math Programs</span>?
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                At GrowWise, our High School Math courses are designed to guide students through Algebra I, Geometry, Algebra II, and Precalculus with clarity and confidence.
              </p>
            </div>

            {/* Three Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {programFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={index}
                    className={`${feature.isWhiteCard ? 'bg-white/80 backdrop-blur-sm border-2 border-gray-200' : 'bg-gradient-to-r from-[#F16112] to-[#F1894F]'} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${feature.isOrangeCard ? 'text-white border-[#F16112]' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className={`${feature.isWhiteCard ? 'bg-[#F16112]/10' : 'bg-white/20'} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                          <IconComponent className={`w-7 h-7 ${feature.isWhiteCard ? 'text-[#F16112]' : 'text-white'}`} />
                        </div>
                        <h3 className={`font-bold text-lg mb-3 ${feature.isWhiteCard ? 'text-gray-900' : 'text-white'}`}>
                          {feature.title}
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed ${feature.isWhiteCard ? 'text-gray-600' : 'text-white/95'}`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA Banner */}
      <div className="bg-amber-50 border-y border-amber-200 py-4 px-4 lg:px-8">
        <p className="text-center text-sm sm:text-base text-amber-900 max-w-3xl mx-auto">
          Not sure which program fits your child?{' '}
          <Link
            href={publicPath('/book-assessment', locale)}
            className="font-semibold text-[#1F396D] underline hover:text-[#F16112]"
          >
            Get a free academic assessment
          </Link>
          {' '}— we'll identify the right level and track before your first session.
        </p>
      </div>

      {hsMonthlyProgram ? (
        <MathProgramDetailsSection
          sectionLabel={HIGH_SCHOOL_MATH_PROGRAM_DETAILS.sectionLabel}
          heading={HIGH_SCHOOL_MATH_PROGRAM_DETAILS.heading}
          includes={HIGH_SCHOOL_PROGRAM_INCLUDES}
          outcomes={HIGH_SCHOOL_PROGRAM_OUTCOMES}
          fromMonthlyLabel={`From $${getMathHubMinMonthlyUsd('high-school')}/month`}
          tiers={mapHubOptionsToPricingTiers(hsMonthlyProgram.options)}
          onBookAssessment={openAssessment}
        />
      ) : null}

      {/* Free Sunday practice sessions */}
      {hsMonthlyProgram?.includedBenefit ? (
        <section className="bg-[#ebebeb] py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="rounded-xl border border-[#1F396D]/20 bg-blue-50 p-6 lg:p-8 flex flex-col md:flex-row items-start gap-5">
              <div className="shrink-0 h-12 w-12 rounded-full bg-[#1F396D] flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg mb-2">
                  Free Sunday practice sessions — included for all Grades 6–12 students
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every enrolled high school student gets access to free Sunday timed practice sessions.
                  Exam-style problems, structured like school assessments, designed to build test-readiness
                  between paid sessions.
                </p>
                <p className="text-gray-600 text-sm mt-3">{hsMonthlyProgram.includedBenefit}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* High School Math Courses Section */}
      <section id="courses" className="py-16 px-4 lg:px-8" style={{
        background: `
          radial-gradient(circle at 20% 25%, rgba(31, 57, 109, 0.08) 0%, transparent 15%),
          radial-gradient(circle at 80% 35%, rgba(241, 137, 79, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 45% 70%, rgba(31, 57, 109, 0.06) 0%, transparent 25%),
          radial-gradient(circle at 70% 15%, rgba(241, 97, 18, 0.09) 0%, transparent 18%),
          radial-gradient(circle at 15% 80%, rgba(241, 137, 79, 0.07) 0%, transparent 22%),
          radial-gradient(circle at 90% 60%, rgba(31, 57, 109, 0.05) 0%, transparent 30%),
          radial-gradient(circle at 35% 10%, rgba(241, 97, 18, 0.08) 0%, transparent 20%),
          radial-gradient(circle at 60% 90%, rgba(241, 137, 79, 0.06) 0%, transparent 25%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 50%, rgba(255, 255, 255, 0.9) 100%)
        `
      }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#1F396D]">High School Math Courses</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible learning options designed for every student's needs
            </p>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              Showing {highSchoolMathCourses.length} high school math programs
            </p>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {highSchoolMathCourses.map((course) => {
              const isHovered = hoveredCourse === course.id;
              const courseGradients = getCourseGradients(course);
              const IconComponent = course.icon;

              return (
                <div
                  key={course.id}
                  className={`relative h-[450px] cursor-pointer group ${!isTouchDevice ? 'perspective-1000' : ''}`}
                  onMouseEnter={() => handleMouseEnter(course.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelectedCourseId(course.id)}
                >
                  {/* Card Container with Conditional 3D Flip */}
                  <div className={`relative w-full h-full transition-transform duration-700 ${
                    !isTouchDevice ? 'transform-style-preserve-3d' : ''
                  } ${
                    !isTouchDevice && isHovered ? 'rotate-y-180' : ''
                  }`}>

                    {/* Front Side - Clean Layout */}
                    <Card className={`absolute inset-0 w-full h-full ${courseGradients.bgGradient} rounded-[24px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.1)] border-2 border-white/50 hover:border-gray-200 ${!isTouchDevice ? 'backface-hidden' : ''} group-hover:scale-105 transition-all duration-300`}>
                      <CardContent className="p-5 relative flex flex-col h-full justify-between">
                        {/* Top Section - Course Header */}
                        <div className="flex-shrink-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${courseGradients.gradient} shadow-lg`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-base ${courseGradients.iconColor} leading-tight`}>{course.name}</h4>
                              <Badge className="bg-white/80 text-gray-700 text-xs mt-1">
                                {course.level}
                              </Badge>
                            </div>
                            {/* Hover Indicator - Only show on non-touch devices */}
                            {!isTouchDevice && (
                              <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Course Description */}
                        <div className="flex-grow">
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>

                          {/* Pricing Display */}
                          <div className="mb-4 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#F16112]" />
                                <span className="text-sm text-gray-700 font-medium">Group Classes</span>
                              </div>
                              <span className="font-bold text-lg text-[#1F396D]">${course.groupPrice}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl">
                              <div className="flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-[#1F396D]" />
                                <span className="text-sm text-gray-700 font-medium">1-on-1 Classes</span>
                              </div>
                              <span className="font-bold text-lg text-[#1F396D]">${course.oneOnOnePrice}</span>
                            </div>
                          </div>

                          {/* Duration Info */}
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                            <Clock className="w-3.5 h-3.5 text-[#F16112]" />
                            <span>{course.sessions} per session</span>
                          </div>

                          {/* Mobile/Desktop Responsive Interaction Hint - Only for non-touch devices */}
                          {!isTouchDevice && (
                            <div className="mb-3 p-2.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:border-blue-200 transition-all duration-300">
                              <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600">
                                <Eye className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Hover to flip card</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Section - CTA */}
                        <div className="flex-shrink-0">
                          <Button
                            onClick={() => handleAddToCart(course)}
                            className={`w-full bg-gradient-to-r ${courseGradients.gradient} text-white rounded-xl py-2.5 text-sm transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105`}
                          >
                            {/* Desktop button text - Only for non-touch devices */}
                            {!isTouchDevice && (
                              <div className="hidden md:flex items-center justify-center">
                                <Eye className="mr-2 w-4 h-4" />
                                Hover to reveal information
                              </div>
                            )}
                            {/* Mobile button text or fallback for touch devices */}
                            <div className={`${!isTouchDevice ? 'flex md:hidden' : 'flex'} items-center justify-center`}>
                              <ShoppingCart className="mr-2 w-4 h-4" />
                              Add to Cart
                            </div>
                          </Button>
                        </div>

                        {/* Decorative background elements */}
                        <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${courseGradients.gradient} rounded-full opacity-10 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`} />
                        <div className={`absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br ${courseGradients.gradient} rounded-full opacity-5 transition-all duration-500 group-hover:scale-125 group-hover:opacity-10`} />
                      </CardContent>
                    </Card>

                    {/* Back Side - Enhanced Hover State - Only for non-touch devices */}
                    {!isTouchDevice && (
                      <Card className={`absolute inset-0 w-full h-full ${courseGradients.bgGradient} rounded-[24px] shadow-[0px_16px_32px_0px_rgba(0,0,0,0.15)] border-2 ${courseGradients.hoverBorder} backface-hidden rotate-y-180 scale-105`}>
                        <CardContent className="p-5 relative flex flex-col h-full overflow-hidden">
                          {/* Top Section - Course Header */}
                          <div className="flex-shrink-0 mb-3">
                            <h4 className={`font-bold text-sm ${courseGradients.iconColor} mb-1`}>{course.name}</h4>
                            <p className="text-[11px] text-gray-600">Key Topics</p>
                          </div>

                          {/* Middle Section - Topics List */}
                          <div className="flex-grow overflow-y-auto custom-scrollbar">
                            <ul className="space-y-2">
                              {course.topics.map((topic, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${courseGradients.iconColor}`}></span>
                                  <span className="text-xs leading-tight text-gray-700">
                                    {topic}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bottom Section - Pricing & CTA */}
                          <div className="flex-shrink-0 mt-3 pt-3 border-t border-gray-200">
                            <div className="mb-2 text-center">
                              <div className="text-xs text-gray-700 mb-1">
                                <span className="font-semibold">Group: ${course.groupPrice}</span>
                                <span className="mx-2">•</span>
                                <span className="font-semibold">1-on-1: ${course.oneOnOnePrice}</span>
                              </div>
                              <p className="text-[10px] text-gray-600">Per session</p>
                            </div>
                            <Button
                              onClick={() => handleAddToCart(course)}
                              className={`w-full bg-gradient-to-r ${courseGradients.gradient} text-white rounded-xl py-2.5 text-sm transition-all duration-300 shadow-md hover:shadow-lg`}
                            >
                              <ShoppingCart className="mr-2 w-4 h-4" />
                              Enroll Now
                            </Button>
                          </div>

                          {/* Decorative corner accent */}
                          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${courseGradients.gradient} rounded-bl-full opacity-10`}></div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* SEO Content Sections */}
      <section className="py-16 px-4 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="text-gray-600 leading-relaxed text-lg">
            {buildHighSchoolSeoIntroParagraph()}
          </p>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">High School Math Courses</h2>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Algebra 2 Tutoring</h3>
            <p className="text-gray-600 leading-relaxed">Algebra 2 is where many students hit a wall. Our program breaks down functions, polynomials, and complex equations with a concept-first approach — building real understanding, not just test technique.</p>
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Pre-Calculus Tutoring</h3>
            <p className="text-gray-600 leading-relaxed">For students preparing for Calculus, our Pre-Calculus program covers trigonometry, functions, and analytical geometry. We align with both DUSD and PUSD curriculum pacing.</p>
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Advanced Math Classes</h3>
            <p className="text-gray-600 leading-relaxed">
              Our advanced math classes are designed for students working 1–2 grade levels ahead or targeting accelerated placement. We cover{' '}
              <Link href={publicPath('/courses/integrated-math-1-dublin-ca', locale)} className="font-semibold text-[#1F396D] underline-offset-2 hover:text-[#F16112] hover:underline">
                Integrated Math 1
              </Link>{' '}
              &amp; 2, Geometry, and AP preparation.
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Serving high school students across Dublin, Pleasanton, San Ramon, and Livermore.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F16112]/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Excel in High School Math?
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Start your journey to mathematical excellence with GrowWise's expert instruction
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAssessmentModalOpen(true)}
              className="bg-gradient-to-r from-[#F16112] to-[#F1894F] hover:from-[#F1894F] hover:to-[#F16112] text-white px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book a Free Assessment
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#1F396D] px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods Modal */}
      <AlertDialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-3xl border-2 border-gray-200/50 shadow-[0px_30px_90px_rgba(31,57,109,0.25)] rounded-[20px] max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden max-h-[70vh]">
          {/* Enhanced Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F396D]/5 via-transparent to-[#F16112]/5"></div>
          
          {/* Custom Close Button */}
          <button
            onClick={() => setIsContactModalOpen(false)}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group"
          >
            <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          {/* Scrollable content area */}
          <div className="relative z-10 p-4 lg:p-6">
            <AlertDialogHeader className="text-center mb-4 lg:mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1F396D]/10 via-white to-[#F16112]/10 border border-gray-200 shadow-sm mb-3">
                <Sparkles className="w-4 h-4 text-[#F16112]" />
                <span className="text-xs font-semibold text-gray-700 tracking-wide">Get in touch</span>
                <Sparkles className="w-4 h-4 text-[#1F396D]" />
              </div>
              <AlertDialogTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Multiple Ways to <span className="bg-gradient-to-r from-[#1F396D] to-[#F16112] bg-clip-text text-transparent">Connect</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Choose the method that works best for you
              </AlertDialogDescription>
              <div className="mx-auto mt-3 h-px w-40 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </AlertDialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => {
                const IconComponent = getIconComponent(item.icon);
                const isPhone = item.icon === 'Phone';
                const isEmail = item.icon === 'Mail';
                const isLiveChat = item.icon === 'MessageCircle';
                const isVisitUs = item.icon === 'MapPin';
                const isClickable = isPhone || isEmail || isLiveChat || isVisitUs;
                
                const href = isPhone 
                  ? `tel:${item.primary.replace(/[\s\(\)\-]/g, '')}`
                  : isEmail 
                  ? `mailto:${item.primary}`
                  : isLiveChat
                  ? '#' // Will be handled by onClick
                  : isVisitUs
                  ? 'https://maps.google.com/?q=4564+Dublin+Blvd,+Dublin,+CA'
                  : '#';
                
                const CardWrapper = isClickable ? 'a' : 'div';
                const cardProps = isClickable ? { 
                  href: href, 
                  title: isPhone ? 'Click to call' : isEmail ? 'Click to email' : isVisitUs ? 'Click to view on map' : 'Click to start chat',
                  onClick: isLiveChat ? (e: React.MouseEvent) => { e.preventDefault(); setIsContactModalOpen(false); openChatbot(); } : undefined
                } : {};
                
                return (
                  <Card key={index} className="relative bg-white/95 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer group hover:border-[#F16112]/50 overflow-hidden hover:-translate-y-0.5">
                    <CardWrapper {...cardProps} className="block h-full no-underline">
                      <CardContent className="relative p-5 lg:p-6">
                        <div className={`${item.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-md ring-1 ring-white/40`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.title}</h3>
                        <div>
                          <p
                            className={`text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis leading-snug ${isClickable ? 'text-[#F16112] group-hover:text-[#d54f0a] transition-colors' : 'text-gray-800'}`}
                            title={item.primary}
                          >
                            {item.primary}
                          </p>
                        </div>
                        {/* Shortened: primary only for compact height */}
                      </CardContent>
                    </CardWrapper>
                  </Card>
                );
              })}
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <MathTrialSection config={HIGH_SCHOOL_TRIAL} locale={locale} />

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" aria-labelledby="hs-math-faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="hs-math-faq-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-[#F16112]">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Common questions from families about GrowWise high school math support.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="item-0"
          >
            {HS_MATH_VISIBLE_FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F16112]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-[#F16112]" />
                    </div>
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Content Section */}
      <MathParentGuidesSection locale={locale} pageId="high-school-math" />
      <RelatedContent locale={locale} currentPage="high-school-math" />

      {/* Course Detail Modal */}
      {selectedCourseId && (
        <AlertDialog open={!!selectedCourseId} onOpenChange={() => setSelectedCourseId(null)}>
          <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
            {(() => {
              const course = highSchoolMathCourses.find(c => c.id === selectedCourseId);
              if (!course) return null;

              return (
                <div className="flex flex-col">
                  {/* Header with Close Button */}
                  <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
                    <button
                      onClick={() => setSelectedCourseId(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Course Description */}
                    <p className="text-gray-700 text-base leading-relaxed mb-6">{course.description}</p>

                    {/* Course Goals Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Course Goals:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.goals && course.goals.map((goal, idx) => (
                          <div key={idx} className="flex gap-3">
                            <Star className="w-5 h-5 text-[#F16112] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-sm">{goal.title}:</h4>
                              <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6"></div>

                    {/* Course Info Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingCart className="w-5 h-5 text-[#F16112]" />
                          <span className="text-sm font-bold text-gray-900">Camp Duration</span>
                        </div>
                        <span className="text-sm text-gray-600">{course.campDuration}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-[#F16112]" />
                          <span className="text-sm font-bold text-gray-900">Class Duration</span>
                        </div>
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingCart className="w-5 h-5 text-[#F16112]" />
                          <span className="text-sm font-bold text-gray-900">Price</span>
                        </div>
                        <span className="text-lg font-bold text-[#F16112]">${course.groupPrice}.00</span>
                      </div>
                    </div>

                    {/* Schedule Selector and Enroll */}
                    <div className="flex items-end gap-4 pt-4 border-t border-gray-200">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">Select a schedule</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent text-gray-700">
                          <option>10am to Noon</option>
                          <option>1pm to 3pm</option>
                          <option>3:30pm to 5:30pm</option>
                          <option>Online Evening</option>
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          handleAddToCart(course);
                          setSelectedCourseId(null);
                        }}
                        className="bg-[#9333EA] hover:bg-[#7e22ce] text-white font-bold py-2.5 px-8 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Enroll
                      </button>
                    </div>

                    {course.level && (
                      <p className="text-xs text-gray-500 mt-4">Recommended for: {course.level}</p>
                    )}
                  </div>
                </div>
              );
            })()}
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Free Assessment Modal */}
      <FreeAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
      />
    </div>
  );
};

export default HighSchoolMathPage;
