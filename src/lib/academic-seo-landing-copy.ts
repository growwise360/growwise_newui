import type { AcademicSeoLandingPageId } from '@/lib/academic-seo-landing-config';
import readingWritingCopy from '@/i18n/messages/summer-reading-writing-dublin-ca-en.json';
import mathFoundationsCopy from '@/i18n/messages/summer-math-foundations-dublin-ca-en.json';
import algebraCopy from '@/i18n/messages/summer-algebra-dublin-ca-en.json';
import geometryCopy from '@/i18n/messages/summer-geometry-precalculus-dublin-ca-en.json';
import type { AcademicSeoFaqItem } from '@/lib/schema/academic-seo-landing-jsonld';

export type AcademicSeoBodyWeekBlock = {
  title: string;
  body: string;
};

export type AcademicSeoBodyWorkOnSubsection = {
  h3: string;
  weeks: readonly AcademicSeoBodyWeekBlock[];
};

export type AcademicSeoFitGroup = {
  label: string;
  items: readonly string[];
};

export type AcademicSeoBodySections = {
  whatYourChildWillWorkOn: {
    heading: string;
    subsections: readonly AcademicSeoBodyWorkOnSubsection[];
  };
  whoTeaches: {
    heading: string;
    body: string;
  };
  whoIsRightFor: {
    heading: string;
    groups: readonly AcademicSeoFitGroup[];
    notRightFor?: AcademicSeoFitGroup;
  };
  whyGrowWise: {
    heading: string;
    body: string;
  };
};

export type AcademicSeoLandingCopy = {
  hero: {
    eyebrow: string;
    h1: string;
    subtext: string;
    ctaLabel: string;
  };
  keyDetails: readonly string[];
  bodySections: AcademicSeoBodySections;
  programCardOverrides?: Record<string, { tagline?: string; title?: string }>;
  summerCampCallout?: {
    text: string;
    linkLabel: string;
    href: string;
  };
  valueAnchorPrefix?: string;
  thankYouBenefit?: {
    title: string;
    copy: string;
    importantNote: string;
    ctaLabel?: string;
  };
  mainCta: {
    headline: string;
    subtext: string;
    button: string;
  };
  relatedPrograms: {
    heading: string;
    hubLinkLabel: string;
    items: Record<
      string,
      {
        label: string;
        description: string;
      }
    >;
  };
  faq: readonly AcademicSeoFaqItem[];
};

const COPY_BY_PAGE: Record<AcademicSeoLandingPageId, AcademicSeoLandingCopy> = {
  readingWriting: readingWritingCopy as AcademicSeoLandingCopy,
  mathFoundations: mathFoundationsCopy as AcademicSeoLandingCopy,
  algebra: algebraCopy as AcademicSeoLandingCopy,
  geometry: geometryCopy as AcademicSeoLandingCopy,
};

export function getAcademicSeoLandingCopy(pageId: AcademicSeoLandingPageId): AcademicSeoLandingCopy {
  return COPY_BY_PAGE[pageId];
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Counts user-visible copy from JSON (body sections, FAQ, hero, related links, etc.). */
export function countAcademicSeoLandingCopyWords(copy: AcademicSeoLandingCopy): number {
  const parts: string[] = [
    copy.hero.eyebrow,
    copy.hero.h1,
    copy.hero.subtext,
    copy.hero.ctaLabel,
    ...copy.keyDetails,
    copy.bodySections.whatYourChildWillWorkOn.heading,
    ...copy.bodySections.whatYourChildWillWorkOn.subsections.flatMap((subsection) => [
      subsection.h3,
      ...subsection.weeks.flatMap((week) => [week.title, week.body]),
    ]),
    copy.bodySections.whoTeaches.heading,
    copy.bodySections.whoTeaches.body,
    copy.bodySections.whoIsRightFor.heading,
    ...copy.bodySections.whoIsRightFor.groups.flatMap((group) => [group.label, ...group.items]),
    copy.bodySections.whyGrowWise.heading,
    copy.bodySections.whyGrowWise.body,
    copy.mainCta.headline,
    copy.mainCta.subtext,
    copy.mainCta.button,
    copy.relatedPrograms.heading,
    copy.relatedPrograms.hubLinkLabel,
    ...Object.values(copy.relatedPrograms.items).flatMap((item) => [item.label, item.description]),
    ...copy.faq.flatMap((item) => [item.question, item.answer]),
  ];

  if (copy.bodySections.whoIsRightFor.notRightFor) {
    parts.push(
      copy.bodySections.whoIsRightFor.notRightFor.label,
      ...copy.bodySections.whoIsRightFor.notRightFor.items,
    );
  }

  if (copy.summerCampCallout) {
    parts.push(copy.summerCampCallout.text, copy.summerCampCallout.linkLabel);
  }

  if (copy.valueAnchorPrefix) {
    parts.push(copy.valueAnchorPrefix);
  }

  if (copy.thankYouBenefit) {
    parts.push(
      copy.thankYouBenefit.title,
      copy.thankYouBenefit.copy,
      copy.thankYouBenefit.importantNote,
      copy.thankYouBenefit.ctaLabel ?? '',
    );
  }

  return parts.reduce((sum, text) => sum + countWords(text), 0);
}
