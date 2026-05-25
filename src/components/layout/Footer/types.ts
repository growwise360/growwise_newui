export interface FooterLink {
  label: string;
  href: string;
  active?: boolean;
  highlight?: boolean;
}

export interface FooterSection {
  title: string;
  links?: FooterLink[];
  variant?: 'links' | 'contact';
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  onlineNote?: string;
}

export interface FooterData {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  contact: ContactInfo;
  sections: FooterSection[];
  curriculumAlignment?: string;
  legalDisclaimer?: string;
  copyright: string;
}

export interface FooterProps {
  data?: Partial<FooterData>;
  createLocaleUrl: (path: string) => string;
}
