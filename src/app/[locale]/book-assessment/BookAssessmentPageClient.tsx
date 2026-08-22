'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { BookOpen, CheckCircle, Users, Award, TrendingUp, Brain, Sparkles, Eye, ChevronRight, Lightbulb, Trophy, Shield, ArrowRight, Calendar, GraduationCap, User, Mail, Phone as PhoneIcon, Send, Calculator, X, AlertCircle, MessageCircle } from 'lucide-react';
import CountryCodeSelector from '@/components/CountryCodeSelector';
import FormPrivacyConsent from '@/components/form/FormPrivacyConsent';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PHONE_PLACEHOLDER, CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { validatePhoneWithCountryCode, getPhonePlaceholder, getCallingCode, DIAL_CODE_TO_ISO2 } from '@/lib/phoneValidation';
import { getRecaptchaToken } from '@/lib/recaptcha';
import { publicPath } from '@/lib/publicPath';
import {
  trackAssessmentFormStarted,
  trackAssessmentFormSubmitted,
  trackAssessmentFormViewed,
  trackAssessmentIntakeEvent,
  trackAssessmentOptionSelected,
  trackAssessmentSubmitFailed,
  trackAssessmentValidationError,
  trackGenerateLead,
} from '@/lib/analytics/gtmEvents';
import { captureUtmFromSearchParams, getStoredUtm, getStoredUtmNotesLine } from '@/lib/analytics/utm';
import { getVisitorEventIdentity, logVisitorEventClient } from '@/lib/analytics/visitorEventsClient';
import PartnerTrustStrip from '@/components/shared/PartnerTrustStrip';
import PartnerReferralCard from '@/components/shared/PartnerReferralCard';
import { useChatbot } from '@/contexts/ChatbotContext';
import { SITE_PROOF_LINE } from '@/lib/siteProof';

const partnerConfig = {
  velp: {
    name: "Velp",
    displayName: "Welcome to the Velp Family!",
    code: "VELP1",
    websiteUrl: "https://thevelp.app/",
    benefit: "A 10% credit will be applied toward the current month's fee after assessment confirmation",
    benefitShort: "10% credit",
  },
  activityhero: {
    name: "ActivityHero",
    displayName: "Welcome ActivityHero Families!",
    code: "HERO35",
    benefit: "$35 OFF your first paid program after assessment confirmation",
    benefitShort: "$35 OFF",
  },
  "6crickets": {
    name: "6Crickets",
    displayName: "Welcome 6Crickets Families!",
    code: "6cricket10",
    benefit: "10% OFF your first paid program after assessment confirmation",
    benefitShort: "10% OFF",
  },
} as const;

interface FormData {
  parentName: string;
  email: string;
  countryCode: string;
  phone: string;
  studentName: string;
  grade: string;
  subjectInterest: string;
  mainConcern: string;
  assessmentType: string;
  mode: string;
  scheduleDay: string;
  scheduleTime: string;
  hearAboutUs: string;
  partnerName?: string;
  partnerCode?: string;
  partnerBenefit?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landingUrl?: string;
}

const NEIGHBORHOODS: Record<string, { name: string; headline: string }> = {
  'dublin-ranch': {
    name: 'Dublin Ranch',
    headline: 'Advanced Math & English Pathways for Dublin Ranch Families.',
  },
  'wallis-ranch': {
    name: 'Wallis Ranch',
    headline: 'Empowering Wallis Ranch Students to Lead in Advanced Tracks.',
  },
  'schaefer-ranch': {
    name: 'Schaefer Ranch',
    headline: 'Elite Acceleration & AP Prep for Schaefer Ranch Scholars.',
  },
  'tassajara-hills': {
    name: 'Tassajara Hills',
    headline: 'Exceeding Classroom Pacing for Tassajara Hills Families.',
  },
};

const DEFAULT_ASSESSMENT_HEADLINE =
  'Advanced Math & English Readiness Assessment for Grades 3–12.';

const DEFAULT_ASSESSMENT_TYPE = 'Free 30-Minute Assessment';
const FULL_DIAGNOSTIC_TYPE = 'Full Diagnostic';

const ASSESSMENT_PROCESS_STEPS = [
  {
    title: 'Start With Your Concern',
    description: 'We begin with your child’s grade, subject, and what you are noticing at home or school.',
  },
  {
    title: 'Check Core Skills',
    description: 'We review key math, reading, writing, or English foundations based on grade level.',
  },
  {
    title: 'Watch the Thinking Process',
    description: 'We look at how your child solves problems, not just whether the answer is right or wrong.',
  },
  {
    title: 'Find the Real Gap',
    description: 'We separate rushed mistakes from true concept gaps or missing foundations.',
  },
] as const;

const ASSESSMENT_CALENDLY_URL =
  process.env.NEXT_PUBLIC_ASSESSMENT_CALENDLY_URL ||
  'https://calendly.com/connect-thegrowwise/new-meeting';
const CALENDLY_NEIGHBORHOOD_PARAM =
  process.env.NEXT_PUBLIC_CALENDLY_NEIGHBORHOOD_PARAM || 'a1';

export default function BookAssessmentPageClient() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openChatbot } = useChatbot();
  const communitySlug = searchParams.get('community') || '';
  const partnerParam = searchParams.get('partner') || '';
  const validPartner = partnerParam && partnerConfig[partnerParam as keyof typeof partnerConfig] ? partnerConfig[partnerParam as keyof typeof partnerConfig] : null;
  const neighborhood = NEIGHBORHOODS[communitySlug] || {
    name: 'Dublin',
    headline: DEFAULT_ASSESSMENT_HEADLINE,
  };
  const calendlyUrl = useMemo(() => {
    const url = new URL(ASSESSMENT_CALENDLY_URL);
    if (communitySlug) {
      url.searchParams.set('utm_source', 'door-hanger');
      url.searchParams.set('utm_medium', 'physical-drop');
      url.searchParams.set('utm_campaign', communitySlug);
      url.searchParams.set(CALENDLY_NEIGHBORHOOD_PARAM, neighborhood.name);
    }
    return url.toString();
  }, [communitySlug, neighborhood.name]);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const [hasTrackedFormView, setHasTrackedFormView] = useState(false);
  const [isExploreCoursesModalOpen, setIsExploreCoursesModalOpen] = useState(false);
  const [showGrowyIntakePrompt, setShowGrowyIntakePrompt] = useState(false);
  const hasLoggedAssessmentPageView = useRef(false);
  const hasTrackedGrowyPromptView = useRef(false);

  // Default consent to true so users (and automated tests) are not blocked if they miss this single checkbox.
  const [agreeToCommunications, setAgreeToCommunications] = useState(true);
  const initialFormData = useMemo<FormData>(
    () => ({
      parentName: '',
      email: '',
      countryCode: '+1',
      phone: '',
      studentName: '',
      grade: '',
      subjectInterest: '',
      mainConcern: '',
      assessmentType: DEFAULT_ASSESSMENT_TYPE,
      mode: '',
      scheduleDay: '',
      scheduleTime: '',
      hearAboutUs: validPartner ? validPartner.name : '',
      partnerName: validPartner ? validPartner.name : undefined,
      partnerCode: validPartner ? validPartner.code : undefined,
      partnerBenefit: validPartner ? validPartner.benefit : undefined,
      utm_source: validPartner ? 'partner' : undefined,
      utm_medium: undefined,
      utm_campaign: validPartner ? partnerParam : undefined,
      landingUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    }),
    [validPartner, partnerParam]
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const isFullDiagnosticSelected = formData.assessmentType === FULL_DIAGNOSTIC_TYPE;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    captureUtmFromSearchParams();
    const utm = getStoredUtm();
    if (utm?.utm_source === 'nextdoor') {
      setFormData((prev) => (prev.hearAboutUs ? prev : { ...prev, hearAboutUs: 'nextdoor' }));
    }
  }, []);

  useEffect(() => {
    if (!hasMounted || hasLoggedAssessmentPageView.current) return;
    hasLoggedAssessmentPageView.current = true;
    logVisitorEventClient('assessment_page_view', {
      selected_assessment_type: formData.assessmentType || DEFAULT_ASSESSMENT_TYPE,
    });
  }, [hasMounted, formData.assessmentType]);

  useEffect(() => {
    if (!hasMounted || hasTrackedFormView) return;
    const formSection = document.getElementById('assessment-booking-form');
    if (!formSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasTrackedFormView(true);
          trackAssessmentFormViewed(formData.assessmentType || DEFAULT_ASSESSMENT_TYPE);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(formSection);
    return () => observer.disconnect();
  }, [hasMounted, hasTrackedFormView, formData.assessmentType]);

  useEffect(() => {
    if (!hasMounted) return;
    if (sessionStorage.getItem('growyAssessmentPromptDismissed') === 'true') return;

    const showPrompt = () => setShowGrowyIntakePrompt(true);
    const timer = window.setTimeout(showPrompt, 15000);
    const formSection = document.getElementById('assessment-booking-form');

    if (!formSection) {
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          showPrompt();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(formSection);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasMounted]);

  useEffect(() => {
    if (!showGrowyIntakePrompt || hasTrackedGrowyPromptView.current) return;
    hasTrackedGrowyPromptView.current = true;
    trackAssessmentIntakeEvent('assessment_intake_prompt_viewed');
  }, [showGrowyIntakePrompt]);

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (!hasTrackedFormStart && field !== 'assessmentType') {
      setHasTrackedFormStart(true);
      trackAssessmentFormStarted(formData.assessmentType || DEFAULT_ASSESSMENT_TYPE);
      logVisitorEventClient('assessment_form_start', {
        selected_assessment_type: formData.assessmentType || DEFAULT_ASSESSMENT_TYPE,
      });
    }
    
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    if (field === 'phone' && phoneError) {
      setPhoneError(null);
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      const result = validatePhoneWithCountryCode(formData.countryCode, formData.phone);
      setPhoneError(result.errorMessage);
    } else {
      setPhoneError(null);
    }
  };

  const handleCountryCodeChange = (dialCode: string) => {
    handleInputChange('countryCode', dialCode);
    if (formData.phone.trim()) {
      const result = validatePhoneWithCountryCode(dialCode, formData.phone);
      setPhoneError(result.errorMessage);
    }
  };

  // Validate all form fields
  const validateForm = useCallback((): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    // Validate parent name
    if (!formData.parentName.trim()) {
      errors.parentName = 'Parent name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    const phoneValidation = validatePhoneWithCountryCode(formData.countryCode, formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.errorMessage || 'Phone number is invalid';
    }

    // Validate grade
    if (!formData.grade.trim()) {
      errors.grade = 'Grade level is required';
    }

    if (!formData.subjectInterest.trim()) {
      errors.subjectInterest = 'Subject interest is required';
    }

    // Validate communication consent
    if (!agreeToCommunications) {
      errors.agreeToCommunications = t('commonForm.privacy.agreeError');
    }

    setFormErrors(errors);
    setPhoneError(errors.phone || null);

    return { isValid: Object.keys(errors).length === 0, errors };
  }, [formData, agreeToCommunications, t]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent any event bubbling

    // Clear previous general errors
    setErrorMessage('');

    // Validate all form fields
    const validation = validateForm();

    if (!validation.isValid) {
      // Scroll to first error field after state update
      setTimeout(() => {
        const firstErrorId = Object.keys(validation.errors)[0];
        if (firstErrorId) {
          // Map field names to input IDs
          const fieldIdMap: Record<string, string> = {
            parentName: 'parentName',
            email: 'email',
            phone: 'phone',
            studentName: 'studentName',
            grade: 'grade',
            subjectInterest: 'subjectInterest',
            assessmentType: 'assessmentType',
            mode: 'mode',
            scheduleDay: 'schedule-day',
            scheduleTime: 'schedule-time',
            hearAboutUs: 'hearAboutUs',
            agreeToCommunications: 'agreeToCommunications'
          };
          const inputId = fieldIdMap[firstErrorId] || firstErrorId;
          const errorInput = document.getElementById(inputId);
          if (errorInput) {
            errorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            errorInput.focus();
          }
        }
      }, 100);
      trackAssessmentValidationError(
        formData.assessmentType || DEFAULT_ASSESSMENT_TYPE,
        Object.keys(validation.errors),
      );
      return; // CRITICAL: Prevent form submission - don't set isSubmitting
    }

    // Clear all errors if validation passes
    setFormErrors({});
    setPhoneError(null);
    const phoneValidation = validatePhoneWithCountryCode(formData.countryCode, formData.phone);

    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken('assessment_submit');

      const scheduleCombined = 'Flexible - discuss during callback';

      const storedUtmNotes = getStoredUtmNotesLine();
      const storedUtm = getStoredUtm();
      const visitorIdentity = getVisitorEventIdentity();
      const notes = [
        storedUtmNotes,
        communitySlug && `Neighborhood: ${neighborhood.name}`,
        communitySlug && `Community slug: ${communitySlug}`,
        formData.subjectInterest && `Subject interest: ${formData.subjectInterest}`,
        formData.mainConcern && `Main concern: ${formData.mainConcern}`,
      ]
        .filter(Boolean)
        .join('\n');

      const assessmentData = {
        parentName: formData.parentName,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: phoneValidation.e164 || formData.phone, // Use E.164 format if available
        studentName: formData.studentName.trim() || 'Not provided yet',
        grade: formData.grade,
        subjects: formData.subjectInterest ? [formData.subjectInterest] : [],
        assessmentType: formData.assessmentType || 'General Academic Assessment',
        mode: formData.mode || 'Flexible',
        schedule: scheduleCombined,
        hearAboutUs: formData.hearAboutUs,
        partnerName: formData.partnerName,
        partnerCode: formData.partnerCode,
        partnerBenefit: formData.partnerBenefit,
        utm_source: formData.utm_source || storedUtm?.utm_source,
        utm_medium: formData.utm_medium || storedUtm?.utm_medium,
        utm_campaign: formData.utm_campaign || storedUtm?.utm_campaign,
        landingUrl: formData.landingUrl,
        visitor_id: visitorIdentity.visitor_id,
        session_id: visitorIdentity.session_id,
        notes,
        agreeToCommunications,
        sms_consent: agreeToCommunications,
        recaptchaToken: recaptchaToken || undefined,
      };

      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.error || result.message || `Server error (${response.status})`;
        trackAssessmentSubmitFailed(assessmentData.assessmentType, message);
        setErrorMessage(message);
        setIsSubmitting(false);
        return;
      }

      if (result.success) {
        trackAssessmentFormSubmitted(window.location.pathname);
        trackGenerateLead('book_assessment', {
          form_name: 'book_assessment',
          assessment_type: assessmentData.assessmentType,
          subject_interest: formData.subjectInterest,
          grade: assessmentData.grade,
          value: 49,
          currency: 'USD',
        });
        router.replace(publicPath('/book-assessment/thank-you', locale));
        return;
      } else {
        const message = result.error || 'Failed to submit assessment booking';
        trackAssessmentSubmitFailed(assessmentData.assessmentType, message);
        setErrorMessage(message);
      }
    } catch (error) {
      console.error('Assessment submission error:', error);
      const message = 'Network error. Please try again.';
      trackAssessmentSubmitFailed(formData.assessmentType || DEFAULT_ASSESSMENT_TYPE, message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    agreeToCommunications,
    validateForm,
    router,
    locale,
    neighborhood.name,
    communitySlug,
  ]);

  // const processSteps = [
  //   { number: '1', title: 'Book Your Assessment', description: 'Choose your package and schedule a convenient time', icon: Calendar, color: 'from-[#1F396D] to-[#29335C]' },
  //   { number: '2', title: 'Take the Assessment', description: 'Complete the evaluation with our expert teachers', icon: FileText, color: 'from-[#F16112] to-[#F1894F]' },
  //   { number: '3', title: 'Receive Your Report', description: 'Get detailed insights within 48 hours', icon: FileText, color: 'from-[#1F396D] to-[#F16112]' },
  //   { number: '4', title: 'Plan Your Path', description: 'Schedule a consultation to discuss next steps', icon: Lightbulb, color: 'from-[#F1894F] to-[#1F396D]' }
  // ];

  // const benefits = [
  //   { icon: Clock, text: 'Flexible scheduling' },
  //   { icon: Video, text: 'Online & in-person' },
  //   { icon: FileText, text: 'Detailed reports' },
  //   { icon: Target, text: 'Personalized insights' },
  //   { icon: Shield, text: '100% confidential' },
  //   { icon: Award, text: 'Expert evaluators' }
  // ];

  const scrollToForm = () => {
    const formSection = document.getElementById('assessment-booking-form');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectFreeAssessmentAndScroll = () => {
    handleInputChange('assessmentType', DEFAULT_ASSESSMENT_TYPE);
    trackAssessmentOptionSelected(DEFAULT_ASSESSMENT_TYPE);
    logVisitorEventClient('assessment_option_selected', {
      selected_assessment_type: DEFAULT_ASSESSMENT_TYPE,
    });
    window.setTimeout(scrollToForm, 0);
  };

  const selectFullDiagnosticAndScroll = () => {
    handleInputChange('assessmentType', FULL_DIAGNOSTIC_TYPE);
    trackAssessmentOptionSelected(FULL_DIAGNOSTIC_TYPE);
    logVisitorEventClient('assessment_option_selected', {
      selected_assessment_type: FULL_DIAGNOSTIC_TYPE,
    });
    window.setTimeout(scrollToForm, 0);
  };

  const startGrowyAssessmentIntake = () => {
    trackAssessmentIntakeEvent('assessment_intake_started', {
      source: 'assessment_page_helper',
    });
    openChatbot({ initialMode: 'assessment-intake' });
  };

  const dismissGrowyAssessmentPrompt = () => {
    sessionStorage.setItem('growyAssessmentPromptDismissed', 'true');
    setShowGrowyIntakePrompt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50" suppressHydrationWarning>
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white border-0 px-6 py-2">Why Book With Us</Badge>
            <h2 className="text-gray-900 mb-4">Everything You Need to Know</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon as any;
              return (
                <div key={index}>
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-[#F16112]/30 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-4 bg-gradient-to-br from-[#1F396D]/10 to-[#F16112]/10 rounded-2xl mb-4">
                        <IconComponent className="w-7 h-7 text-[#F16112]" />
                      </div>
                      <p className="text-sm text-gray-700 font-medium leading-snug">{benefit.text}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-[#1F396D] to-[#29335C] text-white border-0 px-6 py-2">Simple Process</Badge>
            <h2 className="text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our streamlined 4-step process makes it easy to get the insights you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-1 bg-gradient-to-r from-[#1F396D] via-[#F16112] to-[#1F396D] opacity-20"></div>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon as any;
              return (
                <div key={index} className="relative">
                  <Card className="bg-white/90 backdrop-blur-xl border-2 border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 h-full group hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="relative inline-block mb-6">
                        <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white mb-2 mx-auto shadow-2xl group-hover:shadow-xl transition-all`}>
                          <span className="text-3xl font-bold">{step.number}</span>
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-xl p-3 rounded-xl shadow-lg border-2 border-white/60">
                          <IconComponent className="w-6 h-6 text-[#F16112]" />
                        </div>
                      </div>
                      <h3 className="text-gray-900 mb-3 group-hover:text-[#F16112] transition-colors">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[56px] -right-4 z-10">
                      <div>
                        <ChevronRight className="w-8 h-8 text-[#F16112]/40" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      <section id="assessment-form" className="bg-white">
        <div
          className="sticky top-0 z-40 flex min-h-10 items-center justify-center bg-[#F16112] px-4 py-2 text-center text-sm font-black text-white shadow-md"
          role="status"
          aria-label="Assessment availability"
        >
          Free Assessments Available Until July 31
        </div>
        <div className="relative isolate min-h-[24rem] overflow-hidden bg-[#1F396D] md:min-h-[26rem]" aria-labelledby="book-assessment-hero-h1">
          <div className="absolute inset-0">
            <Image
              src="/assets/students_growwise.webp"
              alt="GrowWise students at the Dublin learning center"
              width={1600}
              height={900}
              priority
              fetchPriority="high"
              sizes="100vw"
              unoptimized
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/45" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#102542]/95 via-[#1F396D]/82 to-[#1F396D]/20"
              aria-hidden
            />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 md:px-12 md:py-12 lg:py-14">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FED7AA]">
              Free · 30 minutes · Grades 3–12
            </p>
            <h1
              id="book-assessment-hero-h1"
              className="font-heading mt-6 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl"
            >
              Free 30-Minute Assessment
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              Find the exact gap. Leave with a written plan. No cost, no pressure.
            </p>
            <p className="mt-5 text-sm font-black text-[#FED7AA] sm:text-base">
              {SITE_PROOF_LINE}
            </p>
            <div className="mt-7 grid max-w-4xl gap-3 md:grid-cols-2">
              <blockquote className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-white/95 backdrop-blur">
                “I&apos;ve noticed a big improvement in her confidence, focus, and overall understanding.”
                <footer className="mt-2 text-xs font-bold text-[#FED7AA]">Mumtaz Salemi, Parent · Google review</footer>
              </blockquote>
              <blockquote className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-white/95 backdrop-blur">
                “Thanks to the small class size and the teacher&apos;s personalized approach, he was able to grasp the fundamentals.”
                <footer className="mt-2 text-xs font-bold text-[#FED7AA]">Roger Jiang, Parent · Google review</footer>
              </blockquote>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={selectFreeAssessmentAndScroll}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F16112] px-6 py-3 text-sm font-black text-white transition-colors hover:bg-[#d64f0d]"
              >
                Get My Child&apos;s Free Assessment
              </button>
            </div>
            <ul className="mt-7 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4" aria-label="Assessment highlights">
              {['Grades 3–12', 'Math and English', 'In-person or online', 'No pressure to enroll'].map((stat) => (
                <li
                  key={stat}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#F1894F]" aria-hidden />
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Partner Referral Card */}
          {validPartner && <PartnerReferralCard partner={validPartner} />}

          <section
            className="rounded-3xl border border-[#F16112]/20 bg-[#FFF7ED] p-5 shadow-sm sm:p-7"
            aria-labelledby="assessment-promise-title"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#C45A1A]">Our promise</p>
            <h2 id="assessment-promise-title" className="mt-2 text-2xl font-bold tracking-tight text-[#1F396D] sm:text-3xl">
              Leave knowing the exact skill gap. If we cannot identify it, we&apos;ll run a second session free.
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-700 sm:text-base">
              No enrollment pressure. No upsell script. If GrowWise isn&apos;t the right fit, we&apos;ll tell you that too.
              You&apos;ll receive a brief written next-step plan after the assessment.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Assessment promise details">
              {['No cost', 'No credit card', 'Clear next step within 24 hours'].map((item) => (
                <p key={item} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#1F396D] ring-1 ring-[#F16112]/15">
                  <Shield className="h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                  {item}
                </p>
              ))}
            </div>
          </section>

          <details className="group mt-5 overflow-hidden rounded-2xl border border-[#1F396D]/15 bg-white shadow-sm">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left marker:content-none sm:px-6">
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">
                  Need a deeper written analysis?
                </span>
                <span className="mt-1 block text-base font-bold text-[#1F396D] sm:text-lg">
                  60-Minute Full Diagnostic · $49
                </span>
              </span>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-[#1F396D] transition-transform group-open:rotate-90"
                aria-hidden
              />
            </summary>
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Choose this option for a deeper review of skill gaps, mistake patterns, and academic readiness,
                    followed by a comprehensive written learning plan.
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm font-semibold text-[#1F396D] sm:grid-cols-3">
                    {['60-minute session', 'Detailed gap analysis', 'Comprehensive written plan'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#F16112]" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    Our team confirms scheduling and payment details within 24 hours.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={selectFullDiagnosticAndScroll}
                  disabled={isFullDiagnosticSelected}
                  className="h-auto min-h-12 w-full rounded-full bg-[#1F396D] px-6 py-3 text-sm font-bold text-white hover:bg-[#162850] disabled:opacity-100 md:w-auto"
                >
                  {isFullDiagnosticSelected ? 'Full Diagnostic Selected' : 'Choose Full Diagnostic'}
                </Button>
              </div>
            </div>
          </details>

          {showGrowyIntakePrompt ? (
            <div className="mt-5 rounded-2xl border border-[#F16112]/25 bg-[#FFF7ED] p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F16112] text-white">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#1F396D]">Want Growy to help?</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    Tell Growy what you&apos;re noticing. We&apos;ll turn it into an assessment request you can review before sending.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:w-56">
                <Button
                  type="button"
                  onClick={startGrowyAssessmentIntake}
                  className="min-h-11 rounded-xl bg-[#F16112] text-sm font-bold text-white hover:bg-[#d94f0d]"
                >
                  Let Growy Help
                </Button>
                <button
                  type="button"
                  onClick={dismissGrowyAssessmentPrompt}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  I&apos;ll fill it myself
                </button>
              </div>
            </div>
          ) : null}
          <div id="assessment-booking-form" suppressHydrationWarning>
            <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/60 shadow-2xl rounded-xl md:rounded-3xl overflow-hidden" suppressHydrationWarning>
              <CardContent className="p-4 sm:p-6 md:p-8" suppressHydrationWarning>
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" suppressHydrationWarning noValidate>
                    <div className="rounded-2xl border border-[#F16112]/20 bg-[#FFF7ED] px-4 py-3">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#C45A1A]">
                            {isFullDiagnosticSelected ? 'Your selected assessment' : 'Your free assessment'}
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#1F396D] sm:text-base">
                            {isFullDiagnosticSelected
                              ? '60-Minute Full Diagnostic · $49'
                              : 'Free 30-Minute Assessment'}
                          </p>
                          <p id="selectedAssessmentType-help" className="mt-1 text-xs leading-relaxed text-slate-600">
                            {isFullDiagnosticSelected
                              ? 'Get a deeper gap analysis, mistake-pattern review, and comprehensive written learning plan.'
                              : 'Find the gap, get a brief written plan, and decide the next step without pressure.'}
                          </p>
                        </div>
                        {isFullDiagnosticSelected ? (
                          <button
                            type="button"
                            onClick={selectFreeAssessmentAndScroll}
                            className="self-start text-xs font-bold text-[#1F396D] underline decoration-[#F16112] underline-offset-4 hover:text-[#F16112]"
                          >
                            Switch to free assessment
                          </button>
                        ) : null}
                      </div>
                      <input
                        type="hidden"
                        id="selectedAssessmentType"
                        value={formData.assessmentType}
                        readOnly
                        aria-describedby="selectedAssessmentType-help"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-5">
                      <div className="space-y-2">
                        <Label htmlFor="parentName" className="text-gray-700 font-medium text-sm flex items-center gap-2"><User className="w-4 h-4 text-[#F16112]" />Parent Name <span className="text-red-500">*</span></Label>
                        <Input id="parentName" type="text" value={formData.parentName} onChange={(e) => handleInputChange('parentName', e.target.value)} onFocus={() => setFocusedField('parentName')} onBlur={() => setFocusedField(null)} className={cn("bg-white border rounded-lg transition-all h-11 text-sm", focusedField === 'parentName' ? 'border-[#F16112] shadow-sm ring-2 ring-[#F16112]/10' : 'border-gray-300 hover:border-gray-400')} placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium text-sm flex items-center gap-2"><Mail className="w-4 h-4 text-[#1F396D]" />Email Address <span className="text-red-500">*</span></Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} className={cn("bg-white border rounded-lg transition-all h-11 text-sm", focusedField === 'email' ? 'border-[#F16112] shadow-sm ring-2 ring-[#F16112]/10' : 'border-gray-300 hover:border-gray-400')} placeholder="john@example.com" required />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium text-sm flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-[#F16112]" />Phone Number <span className="text-red-500">*</span></Label>
                        <div className={cn(
                          "flex items-center gap-0 border rounded-lg bg-white overflow-hidden transition-all",
                          phoneError ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10' : 'border-gray-300 focus-within:border-[#F16112] focus-within:ring-2 focus-within:ring-[#F16112]/10'
                        )}>
                          <CountryCodeSelector
                            value={formData.countryCode}
                            onChange={handleCountryCodeChange}
                            className={cn("flex-shrink-0", focusedField === 'phone' && 'border-[#F16112]')}
                          />
                          <div className="w-px h-8 bg-gray-300 flex-shrink-0"></div>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => {
                              setFocusedField(null);
                              handlePhoneBlur();
                            }}
                            className={cn(
                              "bg-transparent border-0 rounded-none transition-all flex-1 h-11 text-sm text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0",
                              phoneError && "text-red-600"
                            ).trim()} 
                            placeholder={getPhonePlaceholder(DIAL_CODE_TO_ISO2[formData.countryCode])}
                            required
                            suppressHydrationWarning
                          />
                        </div>
                        {phoneError && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {phoneError}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grade" className="text-gray-700 font-medium text-sm flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#1F396D]" />Child&apos;s Current Grade <span className="text-red-500">*</span></Label>
                        <Select
                          onValueChange={(value) => handleInputChange('grade', value)}
                          value={formData.grade || undefined}
                          required
                        >
                          <SelectTrigger
                            data-testid="assessment-grade-trigger"
                            className="bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all h-11 text-sm"
                          >
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-white/60 rounded-xl shadow-2xl">
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade} className="hover:bg-[#F16112]/10 py-3">{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subjectInterest" className="text-gray-700 font-medium text-sm flex items-center gap-2"><Calculator className="w-4 h-4 text-[#F16112]" />Subject Interest <span className="text-red-500">*</span></Label>
                        <Select
                          onValueChange={(value) => handleInputChange('subjectInterest', value)}
                          value={formData.subjectInterest || undefined}
                          required
                        >
                          <SelectTrigger
                            id="subjectInterest"
                            data-testid="assessment-subject-interest-trigger"
                            className="bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all h-11 text-sm"
                          >
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-white/60 rounded-xl shadow-2xl">
                            <SelectItem value="Math" className="hover:bg-[#F16112]/10 py-3">Math</SelectItem>
                            <SelectItem value="English" className="hover:bg-[#F16112]/10 py-3">English</SelectItem>
                            <SelectItem value="Both" className="hover:bg-[#F16112]/10 py-3">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="mainConcern" className="text-gray-700 font-medium text-sm flex items-center gap-2"><Brain className="w-4 h-4 text-[#1F396D]" />What made you look for help? <span className="text-gray-400 text-xs">(optional)</span></Label>
                        <Input
                          id="mainConcern"
                          type="text"
                          value={formData.mainConcern}
                          onChange={(e) => handleInputChange('mainConcern', e.target.value)}
                          onFocus={() => setFocusedField('mainConcern')}
                          onBlur={() => setFocusedField(null)}
                          className={cn("bg-white border rounded-lg transition-all h-11 text-sm", focusedField === 'mainConcern' ? 'border-[#F16112] shadow-sm ring-2 ring-[#F16112]/10' : 'border-gray-300 hover:border-gray-400')}
                          placeholder="Example: careless mistakes, low confidence, writing takes too long, advanced math readiness"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2 rounded-xl bg-slate-50 p-3">
                        <Label htmlFor="hearAboutUs" className="text-gray-700 font-medium text-sm flex items-center gap-2"><User className="w-4 h-4 text-[#F16112]" />How did you hear about us? <span className="text-gray-400 text-xs">(optional)</span></Label>
                        <Select
                          onValueChange={(value) => handleInputChange('hearAboutUs', value)}
                          value={formData.hearAboutUs || undefined}
                        >
                          <SelectTrigger
                            id="hearAboutUs"
                            data-testid="assessment-hear-about-us-trigger"
                            className="bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all h-11 text-sm"
                          >
                            <SelectValue placeholder="Select how you heard about us" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-white/60 rounded-xl shadow-2xl">
                            <SelectItem value="Not provided">Not provided</SelectItem>
                            {validPartner && (
                              <SelectItem value={validPartner.name}>{validPartner.name}</SelectItem>
                            )}
                            <SelectItem value="Google Search">Google Search</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="Friend/Family Referral">Friend/Family Referral</SelectItem>
                            <SelectItem value="School Recommendation">School Recommendation</SelectItem>
                            <SelectItem value="Door Hanger">Door Hanger</SelectItem>
                            <SelectItem value="NextDoor">NextDoor</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <FormPrivacyConsent
                      checkboxId="agreeToCommunications"
                      checked={agreeToCommunications}
                      onCheckedChange={(checked) => {
                        setAgreeToCommunications(checked);
                        if (checked && formErrors.agreeToCommunications) {
                          setFormErrors((prev) => {
                            const next = { ...prev };
                            delete next.agreeToCommunications;
                            return next;
                          });
                        }
                      }}
                      error={formErrors.agreeToCommunications}
                      required
                      showSubmitDisclaimer
                      variant="compact"
                      alignPrivacyWithConsent
                      className="[&_h3]:!text-sm [&_label]:!text-xs [&_p]:!text-xs"
                      agreeLabel="I agree to receive SMS messages from GrowWise School about my inquiry, assessment, enrollment, class scheduling, reminders, and related program updates. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase."
                    />

                    {/* Form Validation Errors Summary */}
                    {Object.keys(formErrors).length > 0 && (
                      <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl md:rounded-2xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="text-red-800 font-semibold text-sm sm:text-base mb-2">
                              Please fix the following issues to submit the form:
                            </h3>
                            <ul className="space-y-1.5 text-sm text-red-700">
                              {formErrors.parentName && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Parent Name:</strong> {formErrors.parentName}</span>
                                </li>
                              )}
                              {formErrors.email && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Email:</strong> {formErrors.email}</span>
                                </li>
                              )}
                              {formErrors.phone && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Phone Number:</strong> {formErrors.phone}</span>
                                </li>
                              )}
                              {formErrors.grade && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Grade:</strong> {formErrors.grade}</span>
                                </li>
                              )}
                              {formErrors.subjectInterest && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Subject Interest:</strong> {formErrors.subjectInterest}</span>
                                </li>
                              )}
                              {formErrors.assessmentType && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Assessment Type:</strong> {formErrors.assessmentType}</span>
                                </li>
                              )}
                              {formErrors.agreeToCommunications && (
                                <li className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  <span><strong>Consent:</strong> {formErrors.agreeToCommunications}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* General Error Message */}
                    {errorMessage && (
                      <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl md:rounded-2xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-red-700 text-sm sm:text-base">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 md:pt-4">
                      <Button
                        type="submit"
                        data-testid="assessment-submit"
                        disabled={
                          isSubmitting ||
                          !agreeToCommunications ||
                          // Only block on non-consent errors; consent itself is derived from agreeToCommunications
                          Object.keys(formErrors).some((key) => key !== 'agreeToCommunications')
                        }
                        className="w-full bg-gradient-to-r from-[#F16112] via-[#F1894F] to-[#F16112] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white h-14 md:h-16 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:shadow-xl transition-all duration-500 disabled:opacity-50 text-base md:text-lg font-semibold group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full mr-3"></div>
                            Processing Your Request...
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                            {isFullDiagnosticSelected
                              ? "Request My Child's 60-Min Full Diagnostic →"
                              : "Get My Child's Free 30-Min Assessment →"}
                            <Sparkles className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
                          </>
                        )}
                      </Button>
                      <p className="mt-3 text-center text-xs text-slate-500">
                        {isFullDiagnosticSelected
                          ? '24-hour response · SSL secure · Scheduling and payment confirmed by our team'
                          : '24-hour response · SSL secure · No credit card'}
                      </p>
                      {errorMessage && (
                        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                          <p className="text-red-700 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errorMessage}
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['Response', 'We call or text within 24 hours'],
              ['No pressure', 'Enrollment only if GrowWise is a fit'],
              ['Local center', '4564 Dublin Blvd, Dublin, CA'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-[#1F396D]/10 bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-sm font-black text-[#1F396D]">{title}</p>
                <p className="mt-1 text-xs text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <section className="mt-8 rounded-3xl border border-[#1F396D]/10 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="assessment-comparison-title">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">For families comparing options</p>
                <h2 id="assessment-comparison-title" className="mt-2 text-2xl font-bold tracking-tight text-[#1F396D] sm:text-3xl">
                  Why families choose GrowWise after comparing options
                </h2>
                <p className="mt-3 text-sm font-black text-[#F16112]">
                  98% parent satisfaction from GrowWise families.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  The earlier we identify the gap, the easier it is to fix before the next test, unit, or school transition.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  'We identify the root gap before recommending a class.',
                  'We explain the learning pattern to parents, not just the score.',
                  'We connect assessment results to a clear 4-8 week plan.',
                  'We support both catch-up and advanced pathways.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-700 ring-1 ring-slate-200">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="assessment-process-title">
            <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">Assessment process</p>
                <h2 id="assessment-process-title" className="mt-2 text-2xl font-bold tracking-tight text-[#1F396D] sm:text-3xl">
                  How We Assess Your Child
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  A good assessment is not about giving your child a score. It helps us understand how your child thinks, where gaps may have started, and what support will actually help.
                </p>
                <div className="mt-5 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200">
                  Many students struggle not because they are weak, but because earlier gaps were never clearly identified. The right assessment helps parents understand what is really happening before choosing tutoring, enrichment, or an advanced pathway.
                </div>
                <div className="mt-5">
                  <Button
                    type="button"
                    onClick={selectFreeAssessmentAndScroll}
                    className="min-h-11 rounded-full bg-[#F16112] px-5 text-sm font-bold text-white hover:bg-[#d94f0d]"
                  >
                    Get My Child&apos;s Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>

              <ol className="grid gap-3 sm:grid-cols-2" aria-label="Assessment workflow">
                {ASSESSMENT_PROCESS_STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1F396D] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#1F396D]">{step.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{step.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </section>

      <PartnerTrustStrip />

      {/* Explore Courses Modal */}
      <AlertDialog open={isExploreCoursesModalOpen} onOpenChange={setIsExploreCoursesModalOpen}>
        <AlertDialogContent className="bg-white/90 backdrop-blur-3xl border-2 border-white/60 shadow-[0px_40px_120px_rgba(31,57,109,0.3)] rounded-[32px] max-w-2xl p-0 overflow-hidden ring-1 ring-white/30">
          {/* Enhanced Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F396D]/8 via-transparent to-[#F16112]/8"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5"></div>

          {/* Custom Close Button */}
          <button
            onClick={() => setIsExploreCoursesModalOpen(false)}
            className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/60 group"
          >
            <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>

          <div className="relative z-10 p-8">
            <AlertDialogHeader className="text-center mb-8">
              <AlertDialogTitle className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your <span className="bg-gradient-to-r from-[#1F396D] to-[#F16112] bg-clip-text text-transparent">Academic Path</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg text-gray-600 leading-relaxed">
                Select the subject that matches your learning goals and start your academic journey
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card onClick={() => { router.push(publicPath('/academic/math', locale)); setIsExploreCoursesModalOpen(false); }} className="bg-white/40 backdrop-blur-2xl border-2 border-white/50 rounded-[24px] shadow-[0px_20px_50px_rgba(255,255,255,0.3)] hover:shadow-[0px_30px_80px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-pointer group hover:scale-105 transform overflow-hidden relative ring-1 ring-white/40 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F396D]/10 to-[#29335C]/15 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
                <CardContent className="p-8 text-center flex flex-col items-center justify-between relative z-10 h-full">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-white/50 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-[0px_15px_40px_rgba(255,255,255,0.4)] border-2 border-white/60 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/30">
                        <Calculator className="w-10 h-10 text-[#1F396D] drop-shadow-sm" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1F396D] transition-colors">Math Courses</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Master mathematics from basics to advanced levels with personalized instruction</p>
                    <div className="space-y-2 mb-6 text-left w-full">
                      <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1F396D] flex-shrink-0" /><span className="text-sm text-gray-700">DUSD & PUSD Aligned</span></div>
                      <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1F396D] flex-shrink-0" /><span className="text-sm text-gray-700">Grade-Level & Accelerated</span></div>
                      <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1F396D] flex-shrink-0" /><span className="text-sm text-gray-700">One-on-One Support</span></div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#1F396D] to-[#29335C] hover:from-[#29335C] hover:to-[#1F396D] text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 mt-auto">
                    View More
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card onClick={() => { router.push(publicPath('/academic/english', locale)); setIsExploreCoursesModalOpen(false); }} className="bg-white/40 backdrop-blur-2xl border-2 border-white/50 rounded-[24px] shadow-[0px_20px_50px_rgba(255,255,255,0.3)] hover:shadow-[0px_30px_80px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-pointer group hover:scale-105 transform overflow-hidden relative ring-1 ring-white/40 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F16112]/10 to-[#F1894F]/15 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
                <CardContent className="p-8 text-center flex flex-col items-center justify-between relative z-10 h-full">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-white/50 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-[0px_15px_40px_rgba(255,255,255,0.4)] border-2 border-white/60 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/30">
                        <BookOpen className="w-10 h-10 text-[#F16112] drop-shadow-sm" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F16112] transition-colors">English Language Arts</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Comprehensive English language arts skills from reading to writing excellence</p>
                    <div className="space-y-2 mb-6 text-left w-full">
                      <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#F16112] flex-shrink-0" /><span className="text-sm text-gray-700">Reading Comprehension</span></div>
                      <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#F16112] flex-shrink-0" /><span className="text-sm text-gray-700">Essay Writing</span></div>
                      <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#F16112] flex-shrink-0" /><span className="text-sm text-gray-700">Grammar & Vocabulary</span></div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#F16112] to-[#F1894F] hover:from-[#F1894F] hover:to-[#F16112] text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 mt-auto">
                    View More
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">Not sure which path to choose? <Button variant="ghost" className="text-[#1F396D] font-medium hover:underline p-0 h-auto" onClick={() => setIsExploreCoursesModalOpen(false)}>Contact us for guidance</Button></p>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
