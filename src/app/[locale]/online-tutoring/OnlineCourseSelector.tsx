'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useButtonTracking } from '@/lib/analytics/hooks';
import { publicPath } from '@/lib/publicPath';

const subjects = ['Math', 'English', 'Chemistry', 'Physics'] as const;

export default function OnlineCourseSelector() {
  const router = useRouter();
  const locale = useLocale();
  const [subject, setSubject] = useState<(typeof subjects)[number] | ''>('');
  const [grade, setGrade] = useState('');
  const [goal, setGoal] = useState('');
  const [packageInterest, setPackageInterest] = useState('Not sure yet');
  const { trackCTAClick } = useButtonTracking();
  const availableSubjects = grade && Number(grade) >= 9 ? subjects : subjects.slice(0, 2);
  const recommendation = useMemo(() => {
    if (!subject) return '';
    if (subject === 'Math' && grade && Number(grade) >= 3 && Number(grade) <= 8) {
      return 'Start with the math self-check for supported Grades 3–8. It is a math diagnostic, not a final placement.';
    }
    return `We’ll route your request to the ${subject} program. A GrowWise teacher will confirm fit and placement.`;
  }, [grade, subject]);

  function continueToParentForm() {
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (grade) params.set('grade', `Grade ${grade}`);
    if (goal) params.set('goal', goal);
    params.set('package', packageInterest);
    params.set('utm_source', 'online-tutoring');
    params.set('utm_medium', 'website');
    params.set('utm_campaign', 'subject-package-intake');
    trackCTAClick('online_parent_intake', 'online_tutoring_course_selector', { subject, package_interest: packageInterest });
    router.push(`${publicPath('/book-assessment', locale)}?${params.toString()}#parent-enrollment-form`);
  }

  return (
    <section id="course-selector" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="selector-title">
      <h2 id="selector-title" className="text-2xl font-bold text-[#1F396D]">Find a starting point</h2>
      <p className="mt-2 max-w-2xl text-slate-600">A parent or guardian can choose the subject and share the student’s grade. This suggests a program; a GrowWise teacher confirms placement and quotes tuition before enrollment.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-semibold text-slate-700">Subject
          <select value={subject} onChange={(event) => setSubject(event.target.value as typeof subject)} className="mt-2 block h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base">
            <option value="">Choose a subject</option>{availableSubjects.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">Student grade
          <select value={grade} onChange={(event) => { const nextGrade = event.target.value; setGrade(nextGrade); if (Number(nextGrade) < 9 && (subject === 'Chemistry' || subject === 'Physics')) setSubject(''); }} className="mt-2 block h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base">
            <option value="">Choose a grade</option>{Array.from({ length: 10 }, (_, i) => i + 3).map((n) => <option key={n} value={n}>Grade {n}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">What would you like help with?
          <select value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-2 block h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base">
            <option value="">Choose a goal (optional)</option>
            <option value="Build foundations">Build foundations</option><option value="Keep up with school">Keep up with school</option><option value="Get ahead or prepare for a test">Get ahead or prepare for a test</option><option value="Create projects and practical skills">Create projects and practical skills</option>
          </select>
        </label>
      </div>
      <fieldset className="mt-5"><legend className="text-sm font-semibold text-slate-700">Which plan would you like to ask about?</legend><div className="mt-2 flex flex-wrap gap-3">{['Trial month', 'Three-month term', 'Not sure yet'].map((option) => <label key={option} className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm text-slate-700"><input type="radio" name="package-interest" value={option} checked={packageInterest === option} onChange={() => setPackageInterest(option)} />{option}</label>)}</div></fieldset>
      {recommendation && <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-[#1F396D]">{recommendation}</p>}
      <button type="button" onClick={continueToParentForm} disabled={!subject} className="mt-5 min-h-12 rounded-lg bg-[#C44B0A] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Continue with parent or guardian</button>
      <p className="mt-3 text-xs leading-5 text-slate-500">The course selector does not collect student contact details or enroll a student. The parent/guardian form is the next step.</p>
    </section>
  );
}
