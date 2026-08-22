'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { CONTACT_INFO } from '@/lib/constants';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { publicPath } from '@/lib/publicPath';
import { useChatbot } from '../../contexts/ChatbotContext';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  MessageCircle,
  Quote} from "lucide-react";
import { getIconComponent } from '@/lib/iconMap';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAboutRequested } from '@/store/slices/aboutSlice';
import { FounderSection } from './about/FounderSection';
import { ParentTestimonialsSection } from './about/ParentTestimonialsSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ABOUT_FAQS } from '@/data/about-faqs';
import { FOUNDER_ABOUT_STORY_PARAGRAPHS } from '@/data/founder-copy';
import { getDefaultOpenFaqValues } from "@/lib/faq-accordion";
import { HelpCircle } from "lucide-react";

export default function About() {
  const locale = useLocale();
  const { openChatbot } = useChatbot();
  const t = useTranslations('about');
  const dispatch = useAppDispatch();
  const about = useAppSelector((s) => s.about.data);
  const aboutLoading = useAppSelector((s) => s.about.loading);

  useEffect(() => {
    if (!about && !aboutLoading) dispatch(fetchAboutRequested());
  }, [about, aboutLoading, dispatch]);

  // Data (from API via Redux) with fallbacks
  const coreValues = about?.coreValues ?? [];

  // Our story and achievements
  const achievements = about?.achievements ?? [];

  // Educational philosophy
  const educationalApproach = about?.educationalApproach ?? [];

  // Community involvement - Removed Scholarship Programs
  const communityImpact = about?.communityImpact ?? [];

  return (
    <div className="min-h-screen section-gray">
      {/* Hero Section */}
      <section className="section-base section-white">
        <div className="max-w-7xl mx-auto">
          <div className="center-text mb-12">
            <h1 className="title-hero mb-6">{about?.hero?.title || t('hero.title')}</h1>
            <p className="subtitle max-w-4xl mx-auto mb-8">{about?.hero?.subtitle || t('hero.subtitle')}</p>
            <p className="text-muted max-w-4xl mx-auto mb-8 text-center">
              See{' '}
              <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                our summer camps in Dublin CA
              </Link>{' '}
              for seasonal STEM and academic programs.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {about?.hero?.stats?.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="section-base section-gray">
        <div className="max-w-7xl mx-auto">
          <div className="center-text mb-12">
            <h2 className="title-section mb-4">{t('foundation.title')}</h2>
            <p className="subtitle-sm max-w-3xl mx-auto">{t('foundation.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = getIconComponent(value.icon);
              return (
                <Card key={index} className="card-xl hover:card-2xl transition-all duration-300 group">
                  <CardContent className="card-padding text-center">
                    <div className={`icon-badge bg-gradient-to-r ${value.gradient} mx-auto mb-6 icon-badge-hover`}>
                      <IconComponent className="icon-md-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-strong mb-4">{value.title}</h3>
                    <p className="text-muted leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-base section-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="title-section mb-6">{about?.story?.title || t('story.title')}</h2>
              <div className="space-y-6 text-muted leading-relaxed">
                {FOUNDER_ABOUT_STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={openChatbot}
                  className="bg-[#F16112] hover:bg-[#d54f0a] text-white px-6 py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('buttons.getToKnowUs')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/hero-master-the-core.jpg"
                    alt="Students learning in classroom"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/assets/photos/photo-1522071820081-009f0129c71c.jpg"
                    alt="STEAM learning activities"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg -mt-8">
                  <Image
                    src="/assets/hero-one-on-one.jpg"
                    alt="One-on-one tutoring session"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/photos/photo-1503676260728-1c00da094a0b.jpg"
                    alt="Modern learning environment"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-base section-gray">
        <div className="max-w-7xl mx-auto">
          <div className="center-text mb-12">
            <h2 className="title-section mb-4">{t('achievements.title')}</h2>
            <p className="subtitle-sm max-w-3xl mx-auto">{t('achievements.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = getIconComponent(achievement.icon);
              return (
                <Card key={index} className="card-base card-hover group text-center">
                  <CardContent className="card-padding">
                    <div className={`${achievement.bgColor} icon-badge mx-auto mb-4 icon-badge-hover`}>
                      <IconComponent className={`w-8 h-8 ${achievement.color}`} />
                    </div>
                    <div className={`stat-number ${achievement.color} mb-2`}>
                      {achievement.value}
                    </div>
                    <h3 className="text-lg font-bold text-strong mb-2">{achievement.title}</h3>
                    <p className="text-muted-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Approach Section */}
      <section className="section-base section-white">
        <div className="max-w-7xl mx-auto">
          <div className="center-text mb-12">
            <h2 className="title-section mb-4">{t('approach.title')}</h2>
            <p className="subtitle-sm max-w-3xl mx-auto">{t('approach.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationalApproach.map((approach, index) => {
              const IconComponent = getIconComponent(approach.icon);
              return (
                <Card key={index} className="card-base card-hover group">
                  <CardContent className="card-padding">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F16112]/10 icon-badge icon-badge-hover">
                        <IconComponent className="icon-md-orange" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-strong mb-3">{approach.title}</h3>
                        <p className="text-muted mb-4 leading-relaxed">{approach.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {approach.benefits.map((benefit, benefitIndex) => (
                            <Badge key={benefitIndex} className="bg-[#1F396D]/10 text-[#1F396D] hover:bg-[#1F396D]/20">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <FounderSection />

      {/* Community Impact Section - Now with 3 items */}
      <section className="section-base section-white">
        <div className="max-w-7xl mx-auto">
          <div className="center-text mb-12">
            <h2 className="title-section mb-4">{t('community.title')}</h2>
            <p className="subtitle-sm max-w-3xl mx-auto">{t('community.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityImpact.map((impact, index) => {
              const IconComponent = getIconComponent(impact.icon);
              return (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#F16112]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-[#F16112]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{impact.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{impact.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <ParentTestimonialsSection />

      {/* Location & Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1F396D]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">{t('location.title')}</h2>
          <p className="text-xl mb-4 text-white/90">{t('location.subtitle')}</p>
          <p className="mb-8">
            <Link
              href={publicPath('/dublin-ca', locale)}
              className="text-base font-semibold text-[#F1894F] underline-offset-4 hover:text-[#ffb380] hover:underline sm:text-lg"
            >
              Explore Grades 3–12 tutoring &amp; coding classes at our Dublin center →
            </Link>
          </p>
          <p className="mb-8">
            <Link
              href={publicPath('/why-growwise', locale)}
              className="text-base font-semibold text-[#F1894F] underline-offset-4 hover:text-[#ffb380] hover:underline sm:text-lg"
            >
              Why families choose GrowWise over traditional tutoring programs →
            </Link>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-[#F1894F]" />
              <div>
                <div className="font-semibold">{t('labels.address')}</div>
                <div className="text-sm text-white/80">{CONTACT_INFO.address}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-[#F1894F]" />
              <div>
                <div className="font-semibold">{t('labels.phone')}</div>
                <div className="text-sm text-white/80">{CONTACT_INFO.phone}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-6 h-6 text-[#F1894F]" />
              <div>
                <div className="font-semibold">{t('labels.email')}</div>
                <div className="text-sm text-white/80">{CONTACT_INFO.email}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#F16112] hover:bg-[#d54f0a] text-white px-8 py-3">
              <Calendar className="w-5 h-5 mr-2" />
              {t('buttons.scheduleTour')}
            </Button>
            <Button 
              onClick={openChatbot}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1F396D] px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('buttons.contactUs')}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {(() => {
          const faqs = [...ABOUT_FAQS];
          return (
            <>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Frequently Asked <span className="text-[#F16112]">Questions</span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    Learn more about GrowWise, our programs, and how we can help your child succeed.
                  </p>
                </div>

                <Accordion
                  type="multiple"
                  className="space-y-4"
                  defaultValue={getDefaultOpenFaqValues(faqs.length, (index) => `item-${index}`)}
                >
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#F16112]/10 rounded-lg flex items-center justify-center">
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
            </>
          );
        })()}
      </section>
    </div>
  );
}