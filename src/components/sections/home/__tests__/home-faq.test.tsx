import React from 'react';
import { render, screen } from '@/test-utils';
import { HomeFaqSection } from '../HomeFaqSection';
import { HOME_ACADEMIC_FAQS, HOME_STEAM_FAQS, HOME_VISIBLE_FAQS } from '@/lib/home/homeFaqCopy';

describe('HomeFaqSection', () => {
  it('renders all visible FAQ questions', () => {
    render(<HomeFaqSection />);

    for (const faq of HOME_VISIBLE_FAQS) {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    }
  });

  it('renders STEAM and Academic group labels', () => {
    render(<HomeFaqSection />);

    expect(screen.getByText('Coding & AI Programs')).toBeInTheDocument();
    expect(screen.getByText('Academic Tutoring')).toBeInTheDocument();
  });

  it('includes key STEAM and Academic questions', () => {
    render(<HomeFaqSection />);

    expect(screen.getByText(HOME_STEAM_FAQS[0].question)).toBeInTheDocument();
    expect(screen.getByText(HOME_ACADEMIC_FAQS[0].question)).toBeInTheDocument();
  });
});
