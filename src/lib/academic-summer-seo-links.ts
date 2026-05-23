/**
 * Maps academic hub program ids to `/camps/[slug]` SEO detail pages.
 * Set `slug` when a landing page is published; links stay hidden until then.
 */

export type AcademicProgramSeoSlugKey =
  | 'readToProve'
  | 'writeWithStructure'
  | 'mistakeProofMath'
  | 'readingWritingPrograms'
  | 'im1GetReady'
  | 'algebra1GetReady'
  | 'geometryGetReady';

export type AcademicProgramSeoLink = {
  slug: string;
  labelKey: AcademicProgramSeoSlugKey;
};

/** Published program landing pages (pillar → detail). */
const PROGRAM_ID_TO_SEO: Partial<Record<string, AcademicProgramSeoLink | null>> = {
  'read-to-prove': {
    slug: 'summer-reading-writing-dublin-ca',
    labelKey: 'readToProve',
  },
  'write-to-explain': {
    slug: 'summer-reading-writing-dublin-ca',
    labelKey: 'writeWithStructure',
  },
  'bridge-the-gap-math': {
    slug: 'summer-math-foundations-dublin-ca',
    labelKey: 'mistakeProofMath',
  },
  im1: null,
  'algebra-1': {
    slug: 'summer-algebra-dublin-ca',
    labelKey: 'algebra1GetReady',
  },
  geometry: {
    slug: 'summer-geometry-precalculus-dublin-ca',
    labelKey: 'geometryGetReady',
  },
};

export function getAcademicProgramSeoLink(programId: string): AcademicProgramSeoLink | undefined {
  const link = PROGRAM_ID_TO_SEO[programId];
  return link ?? undefined;
}

export function academicProgramSeoMessagePath(
  labelKey: AcademicProgramSeoSlugKey,
): `seoLinks.${AcademicProgramSeoSlugKey}` {
  return `seoLinks.${labelKey}`;
}
