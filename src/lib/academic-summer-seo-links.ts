/**
 * Maps academic hub program ids to future `/camps/[slug]` detail pages.
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

/** Enable slugs here as program landing pages ship (same pattern as summer-camp-seo-links). */
const PROGRAM_ID_TO_SEO: Partial<Record<string, AcademicProgramSeoLink | null>> = {
  'read-to-prove': null,
  'write-to-explain': null,
  'bridge-the-gap-math': null,
  im1: null,
  'algebra-1': null,
  geometry: null,
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
