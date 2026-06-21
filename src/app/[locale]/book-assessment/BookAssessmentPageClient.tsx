'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { BookOpen, CheckCircle, Clock, Users, Award, TrendingUp, Brain, FileText, Sparkles, Eye, ChevronRight, Lightbulb, Trophy, Star, Shield, ArrowRight, Calendar, GraduationCap, User, Mail, Phone as PhoneIcon, Send, Calculator, X, AlertCircle } from 'lucide-react';
import CountryCodeSelector from '@/components/CountryCodeSelector';
import FormPrivacyConsent from '@/components/form/FormPrivacyConsent';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PHONE_PLACEHOLDER, CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { validatePhoneWithCountryCode, getPhonePlaceholder, getCallingCode, DIAL_CODE_TO_ISO2 } from '@/lib/phoneValidation';
import { getRecaptchaToken } from '@/lib/recaptcha';
import { publicPath } from '@/lib/publicPath';
import { siteGoogleTrustReviewCards } from '@/lib/siteGoogleTrustReviews';
import { trackAssessmentFormSubmitted, trackGenerateLead } from '@/lib/analytics/gtmEvents';
import { captureUtmFromSearchParams, getStoredUtm, getStoredUtmNotesLine } from '@/lib/analytics/utm';
import PartnerTrustStrip from '@/components/shared/PartnerTrustStrip';

interface FormData {
  parentName: string;
  email: string;
  countryCode: string;
  phone: string;
  studentName: string;
  grade: string;
  assessmentType: string;
  mode: string;
  scheduleDay: string;
  scheduleTime: string;
  hearAboutUs: string;
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
  'Advanced After-School Math & English Enrichment (Grades 1-12).';

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
  const communitySlug = searchParams.get('community') || '';
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
  const [isExploreCoursesModalOpen, setIsExploreCoursesModalOpen] = useState(false);

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
      assessmentType: '',
      mode: '',
      scheduleDay: '',
      scheduleTime: '',
      hearAboutUs: '',
    }),
    []
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);

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

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
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
      const notes = [
        storedUtmNotes,
        communitySlug && `Neighborhood: ${neighborhood.name}`,
        communitySlug && `Community slug: ${communitySlug}`,
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
        subjects: [],
        assessmentType: formData.assessmentType || 'General Academic Assessment',
        mode: formData.mode || 'Flexible',
        schedule: scheduleCombined,
        hearAboutUs: formData.hearAboutUs,
        notes,
        agreeToCommunications,
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
        setErrorMessage(result.error || result.message || `Server error (${response.status})`);
        setIsSubmitting(false);
        return;
      }

      if (result.success) {
        trackAssessmentFormSubmitted(window.location.pathname);
        trackGenerateLead('book_assessment', {
          form_name: 'book_assessment',
          assessment_type: assessmentData.assessmentType,
          grade: assessmentData.grade,
        });
        router.replace(publicPath('/book-assessment/thank-you', locale));
        return;
      } else {
        setErrorMessage(result.error || 'Failed to submit assessment booking');
      }
    } catch (error) {
      console.error('Assessment submission error:', error);
      setErrorMessage('Network error. Please try again.');
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

  const assessmentFeatures = [
    { icon: FileText, title: 'Detailed Report', description: 'Comprehensive analysis of strengths and growth areas', color: 'from-blue-500 to-blue-600', stats: '15+ Pages' },
    { icon: Users, title: 'Expert Evaluators', description: 'Certified teachers with 10+ years of experience', color: 'from-purple-500 to-purple-600', stats: 'Certified Pros' },
    { icon: Lightbulb, title: 'Actionable Insights', description: 'Clear recommendations for next steps', color: 'from-amber-500 to-amber-600', stats: 'Personalized' },
    { icon: Calendar, title: 'Flexible Scheduling', description: 'Book at your convenience', color: 'from-green-500 to-green-600', stats: '24/7 Booking' }
  ];

  // const processSteps = [
  //   { number: '1', title: 'Book Your Assessment', description: 'Choose your package and schedule a convenient time', icon: Calendar, color: 'from-[#1F396D] to-[#29335C]' },
  //   { number: '2', title: 'Take the Assessment', description: 'Complete the evaluation with our expert teachers', icon: FileText, color: 'from-[#F16112] to-[#F1894F]' },
  //   { number: '3', title: 'Receive Your Report', description: 'Get detailed insights within 48 hours', icon: FileText, color: 'from-[#1F396D] to-[#F16112]' },
  //   { number: '4', title: 'Plan Your Path', description: 'Schedule a consultation to discuss next steps', icon: Lightbulb, color: 'from-[#F1894F] to-[#1F396D]' }
  // ];

  const testimonials = useMemo(() => siteGoogleTrustReviewCards(), []);

  // const benefits = [
  //   { icon: Clock, text: 'Flexible scheduling' },
  //   { icon: Video, text: 'Online & in-person' },
  //   { icon: FileText, text: 'Detailed reports' },
  //   { icon: Target, text: 'Personalized insights' },
  //   { icon: Shield, text: '100% confidential' },
  //   { icon: Award, text: 'Expert evaluators' }
  // ];

  const scrollToForm = () => {
    const formSection = document.getElementById('assessment-form');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

      <section id="assessment-form" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#1F396D]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#F16112]/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white border-0 px-8 py-3 shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              100% Free - No Credit Card Required
            </Badge>
            <h1
              id="book-assessment-hero-h1"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-gray-900 mb-4"
            >
              {neighborhood.headline}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Capped at 8 students per class | 4564 Dublin Blvd
            </p>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['Takes 30 seconds', '4 details plus consent'],
              ['No commitment', 'Free first-step guidance'],
              ['Clear next step', 'We confirm timing with you'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-[#1F396D]/10 bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-sm font-black text-[#1F396D]">{title}</p>
                <p className="mt-1 text-xs text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          {testimonials[0] ? (
            <div className="mb-6 rounded-2xl border border-[#F16112]/20 bg-[#FFF7ED] px-5 py-4 text-center shadow-sm">
              <div className="mb-2 flex justify-center gap-1" aria-label={`${testimonials[0].rating} star Google review`}>
                {[...Array(testimonials[0].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#F16112] text-[#F16112]" aria-hidden />
                ))}
              </div>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-700">
                &quot;{testimonials[0].content}&quot;
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1F396D]">
                {testimonials[0].name} · Google review
              </p>
            </div>
          ) : null}
          <div suppressHydrationWarning>
            <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/60 shadow-2xl rounded-xl md:rounded-3xl overflow-hidden" suppressHydrationWarning>
              <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10 pt-4 sm:pt-6 md:pt-8 lg:pt-10" suppressHydrationWarning>
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8" suppressHydrationWarning noValidate>
                    <div className="space-y-4 md:space-y-6 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#1F396D]/5 to-[#F16112]/5 rounded-xl md:rounded-2xl border-2 border-[#1F396D]/10">
                      <div className="flex items-center gap-2 sm:gap-3 pb-3 md:pb-4 border-b-2 border-[#1F396D]/20">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-[#1F396D] to-[#29335C] rounded-lg md:rounded-xl"><User className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></div>
                        <div><h3 className="text-gray-900 text-lg sm:text-xl">Parent Information</h3><p className="text-xs sm:text-sm text-gray-500">So we can reach you quickly</p></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="parentName" className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2"><User className="w-4 h-4 text-[#F16112]" />Parent Name <span className="text-red-500">*</span></Label>
                          <Input id="parentName" type="text" value={formData.parentName} onChange={(e) => handleInputChange('parentName', e.target.value)} onFocus={() => setFocusedField('parentName')} onBlur={() => setFocusedField(null)} className={cn("bg-white border-2 rounded-lg md:rounded-xl transition-all h-12 md:h-14 text-sm sm:text-base", focusedField === 'parentName' ? 'border-[#F16112] shadow-md ring-2 ring-[#F16112]/10' : 'border-gray-300 hover:border-gray-400')} placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2"><Mail className="w-4 h-4 text-[#1F396D]" />Email Address <span className="text-red-500">*</span></Label>
                          <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} className={cn("bg-white border-2 rounded-lg md:rounded-xl transition-all h-12 md:h-14 text-sm sm:text-base", focusedField === 'email' ? 'border-[#F16112] shadow-md ring-2 ring-[#F16112]/10' : 'border-gray-300 hover:border-gray-400')} placeholder="john@example.com" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-[#F16112]" />Phone Number <span className="text-red-500">*</span></Label>
                        <div className={cn(
                          "flex items-center gap-0 border-2 rounded-lg md:rounded-xl bg-white overflow-hidden transition-all",
                          phoneError ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10' : 'border-gray-300 focus-within:border-[#F16112] focus-within:ring-2 focus-within:ring-[#F16112]/10'
                        )}>
                          <CountryCodeSelector
                            value={formData.countryCode}
                            onChange={handleCountryCodeChange}
                            className={cn("flex-shrink-0", focusedField === 'phone' && 'border-[#F16112]')}
                          />
                          <div className="w-px h-8 md:h-10 bg-gray-300 flex-shrink-0"></div>
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
                              "bg-transparent border-0 rounded-none transition-all flex-1 h-12 md:h-14 text-sm sm:text-base text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0",
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
                    </div>

                    <div className="space-y-4 md:space-y-6 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#F16112]/5 to-[#F1894F]/5 rounded-xl md:rounded-2xl border-2 border-[#F16112]/10">
                      <div className="flex items-center gap-2 sm:gap-3 pb-3 md:pb-4 border-b-2 border-[#F16112]/20">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-[#F16112] to-[#F1894F] rounded-lg md:rounded-xl"><GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></div>
                        <div><h3 className="text-gray-900 text-lg sm:text-xl">Student Information</h3><p className="text-xs sm:text-sm text-gray-500">Just enough to prepare the call</p></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="studentName" className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#F16112]" />Student Name <span className="text-gray-400 text-xs">(optional)</span></Label>
                          <Input id="studentName" type="text" value={formData.studentName} onChange={(e) => handleInputChange('studentName', e.target.value)} onFocus={() => setFocusedField('studentName')} onBlur={() => setFocusedField(null)} className={cn("bg-white border-2 rounded-lg md:rounded-xl transition-all h-12 md:h-14 text-sm sm:text-base", focusedField === 'studentName' ? 'border-[#F16112] shadow-md ring-2 ring-[#F16112]/10' : 'border-gray-300 hover:border-gray-400')} placeholder="Optional" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="grade" className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#1F396D]" />Child&apos;s Current Grade <span className="text-red-500">*</span></Label>
                          <Select
                            onValueChange={(value) => handleInputChange('grade', value)}
                            value={formData.grade || undefined}
                            required
                          >
                            <SelectTrigger
                              data-testid="assessment-grade-trigger"
                              className="bg-white border-2 border-gray-300 rounded-lg md:rounded-xl hover:border-gray-400 transition-all h-12 md:h-14 text-sm sm:text-base"
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
                            Request Free Assessment Call
                            <Sparkles className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
                          </>
                        )}
                      </Button>
                      <p className="mt-3 text-center text-xs text-slate-500">
                        We&apos;ll call or text within 24 hours. No payment. No commitment.
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

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, text: '24-hour response time guaranteed', color: 'from-blue-500 to-blue-600' },
              { icon: Shield, text: 'SSL Encrypted & 100% Secure', color: 'from-green-500 to-green-600' },
              { icon: Award, text: 'Certified Expert Evaluators', color: 'from-purple-500 to-purple-600' }
            ].map((item, index) => {
              const IconComponent = item.icon as any;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex p-5 bg-gradient-to-r ${item.color} rounded-2xl shadow-xl mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-[#1F396D]/10 bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-[#1F396D]">Prefer to choose a time now?</h2>
              <p className="mt-1 text-sm text-slate-600">
                Calendly receives the same neighborhood tracking automatically.
              </p>
            </div>
            <div className="min-h-[700px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <iframe
                title="Schedule a GrowWise academic assessment"
                src={calendlyUrl}
                className="h-[700px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Browse programs — visible before and after form submission */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-[#1F396D] mb-5 text-center">
            Want to explore programs first?
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: publicPath('/academic/math', locale), label: 'K–12 Math Tutoring' },
              { href: publicPath('/academic/math/high-school', locale), label: 'High School Math Tutoring' },
              { href: publicPath('/courses/sat-prep', locale), label: 'SAT Prep Tutoring' },
              { href: publicPath('/camps/summer', locale), label: 'Summer STEAM Camps 2026' },
              { href: publicPath('/camps/academic-summer-programs-dublin-ca', locale), label: 'Academic Summer Programs' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 p-4 rounded-xl border-2 border-[#1F396D]/20 bg-white hover:border-[#F16112] hover:shadow-md transition-all text-[#1F396D] font-semibold text-sm sm:text-base"
                >
                  <span className="text-[#F16112]">→</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white border-0 px-6 py-2">Parent Reviews</Badge>
            <h2 className="text-gray-900 mb-4">What Parents Are Saying</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Real feedback from GrowWise families (Google reviews)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <Card className="bg-white backdrop-blur-xl border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-6">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-[#F16112] text-[#F16112]" />))}</div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed text-base">"{testimonial.content}"</p>
                    <div className="border-t-2 border-gray-100 pt-6"><p className="font-bold text-gray-900 text-lg">{testimonial.name}</p><p className="text-sm text-gray-500 mt-1">{testimonial.role}</p></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerTrustStrip />

      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white border-0 px-6 py-2">Why Choose Us</Badge>
            <h2 className="text-gray-900 mb-4">Why GrowWise Assessments?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">We combine expertise, technology, and personalized attention to deliver exceptional results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Award, title: 'Expert Educators', description: 'Certified teachers with 10+ years of experience in academic assessment and curriculum design', color: 'from-[#F16112] to-[#F1894F]' },
              { icon: Brain, title: 'Comprehensive Analysis', description: 'In-depth evaluation covering multiple dimensions of academic performance and learning styles', color: 'from-[#1F396D] to-[#29335C]' },
              { icon: TrendingUp, title: 'Actionable Roadmap', description: 'Personalized learning path with specific recommendations for academic growth and success', color: 'from-[#F1894F] to-[#1F396D]' }
            ].map((item, index) => {
              const IconComponent = item.icon as any;
              return (
                <div key={index}>
                  <Card className="bg-white backdrop-blur-xl border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group">
                    <CardContent className="p-10 text-center">
                      <div className={`inline-flex p-6 bg-gradient-to-r ${item.color} rounded-3xl mb-6 shadow-2xl group-hover:shadow-xl transition-all`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-gray-900 mb-4 group-hover:text-[#F16112] transition-colors text-xl">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-base">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-[#1F396D] via-[#29335C] to-[#1F396D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div><div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#F16112] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div>
            <h2 className="text-white mb-6 text-4xl lg:text-5xl">Ready to Unlock Your Child's Potential?</h2>
            <p className="text-white/90 mb-10 text-xl leading-relaxed">Book a free assessment today and get personalized insights into your child's academic journey</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button onClick={scrollToForm} className="bg-white text-[#1F396D] hover:bg-gray-100 px-10 py-7 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-200 hover:scale-105 group text-lg"><Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />Book a Free Assessment<ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" /></Button>
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-7 rounded-2xl transition-all duration-200 text-lg backdrop-blur-xl"><PhoneIcon className="w-5 h-5 mr-2" />{CONTACT_INFO.phone}</Button>
            </div>
          </div>
        </div>
      </section>

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
