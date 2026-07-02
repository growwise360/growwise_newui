export const MIDDLE_SCHOOL_MATH_PROGRAM_DETAILS = {
  sectionLabel: 'Program details',
  heading: 'Middle School Math — 3-Month Program',
} as const;

export const MIDDLE_SCHOOL_PROGRAM_INCLUDES = [
  'Diagnostic assessment before session 1 — identifies track (standard or accelerated) and course entry point',
  'Live small groups of 6–10 students aligned to Course 1–3 or Course 1/2, IM1, and IM2',
  'Curriculum personalized to your child’s school sequence, syllabus, and current unit',
  'Monthly parent progress report — skills covered, gaps closed, and next steps',
  'Complimentary weekly practice session included with every program',
  'Live online or in-person at Dublin Blvd, Dublin CA',
] as const;

export const MIDDLE_SCHOOL_PROGRAM_OUTCOMES = [
  'Be placed in the right track and course level for their school pathway',
  'Close the primary gap identified at diagnostic — not just the current homework unit',
  'Build reasoning and test readiness for the next course in their sequence',
] as const;

export type PlacementCourseBox = {
  readonly id: string;
  readonly title: string;
  readonly gradeNote: string;
  readonly description: string;
  readonly borderClass: string;
  readonly bgClass: string;
  readonly labelClass: string;
  readonly titleClass: string;
  readonly descClass: string;
};

export const MIDDLE_SCHOOL_PLACEMENT_DIAGRAM = {
  sectionLabel: 'Middle school pathways',
  heading: 'School District Math Placement Test Prep',
  intro:
    'District math placement tests — not classroom grades alone — decide where your child starts in 6th grade and again before 7th. In 5th grade, students test into Course 1/2 or Course 1. After a year in either course, Grade 7 placement leads to Course 3 or Integrated Math 1.',
  placementFifthGrade: '5th grade · district math placement test',
  placementSeventhGrade: 'Grade 7 math placement',
  footer:
    'GrowWise prep aligns to the course your child is placed into — and closes gaps before the next placement window.',
  gradeSixEntry: [
    {
      id: 'course-1-2',
      title: 'Course 1/2',
      gradeNote: 'Grade 6',
      description: 'Accelerated foundations · algebra readiness',
      borderClass: 'border-orange-200',
      bgClass: 'bg-orange-50',
      labelClass: 'text-orange-600',
      titleClass: 'text-orange-800',
      descClass: 'text-orange-700',
    },
    {
      id: 'course-1',
      title: 'Course 1',
      gradeNote: 'Grade 6',
      description: 'Ratios · proportions · intro algebra',
      borderClass: 'border-green-200',
      bgClass: 'bg-green-50',
      labelClass: 'text-green-600',
      titleClass: 'text-green-800',
      descClass: 'text-green-700',
    },
  ] as const satisfies readonly PlacementCourseBox[],
  gradeSevenOutcomes: [
    {
      id: 'course-3',
      title: 'Course 3',
      gradeNote: 'Grade 7',
      description: 'Functions · linear relationships · data',
      borderClass: 'border-slate-300',
      bgClass: 'bg-slate-50',
      labelClass: 'text-slate-600',
      titleClass: 'text-slate-800',
      descClass: 'text-slate-700',
    },
    {
      id: 'im1',
      title: 'Integrated Math 1',
      gradeNote: 'Grade 7+',
      description: 'Linear equations · systems · geometry intro',
      borderClass: 'border-[#1F396D]/30',
      bgClass: 'bg-[#1F396D]/5',
      labelClass: 'text-[#1F396D]',
      titleClass: 'text-[#1F396D]',
      descClass: 'text-[#1F396D]/80',
    },
  ] as const satisfies readonly PlacementCourseBox[],
} as const;
