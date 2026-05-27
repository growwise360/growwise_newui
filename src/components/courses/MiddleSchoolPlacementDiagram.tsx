'use client';

import { ArrowDown } from 'lucide-react';
import {
  MIDDLE_SCHOOL_PLACEMENT_DIAGRAM,
  type PlacementCourseBox,
} from '@/lib/middle-school-math-program-copy';

function PlacementPill({ children }: { children: string }) {
  return (
    <span className="inline-block text-[10px] font-semibold text-gray-600 text-center bg-gray-100 rounded-full px-3 py-1 whitespace-nowrap">
      {children}
    </span>
  );
}

function CourseBox({ course }: { course: PlacementCourseBox }) {
  return (
    <div
      className={`flex-1 min-w-[140px] max-w-xs rounded-xl border-2 ${course.borderClass} ${course.bgClass} p-5`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest ${course.labelClass} mb-0.5`}>
        {course.gradeNote}
      </p>
      <p className={`text-sm font-bold uppercase tracking-wide ${course.titleClass} mb-1`}>
        {course.title}
      </p>
      <p className={`text-sm ${course.descClass}`}>{course.description}</p>
    </div>
  );
}

function VerticalConnector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-3 shrink-0">
      <ArrowDown className="h-5 w-5 text-gray-400 md:hidden" aria-hidden />
      <PlacementPill>{label}</PlacementPill>
      <ArrowDown className="h-5 w-5 text-gray-400 md:hidden" aria-hidden />
    </div>
  );
}

export function MiddleSchoolPlacementDiagram() {
  const diagram = MIDDLE_SCHOOL_PLACEMENT_DIAGRAM;
  const [course12, course1] = diagram.gradeSixEntry;
  const [course3, im1] = diagram.gradeSevenOutcomes;

  return (
    <div className="space-y-2" aria-label="School district math placement pathways">
      <div className="flex justify-center mb-6">
        <PlacementPill>{diagram.placementFifthGrade}</PlacementPill>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6">
        <CourseBox course={course12} />
        <CourseBox course={course1} />
      </div>

      <VerticalConnector label={diagram.placementSeventhGrade} />

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6">
        <CourseBox course={course3} />
        <CourseBox course={im1} />
      </div>
    </div>
  );
}
