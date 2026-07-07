import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

const ASSESSMENTS = [
  { label: 'Math · Grades 3–8', badge: '🧮' },
  { label: 'English · Grades 4–5', badge: '📖' },
  { label: 'Algebra 2', badge: '📐' },
];

/**
 * Compact bar above the footer — directs parents to free self-assessments
 * hosted on the external LMS (thegrowwise.com/courses).
 */
export default function ParentResourcesBar() {
  return (
    <section
      className="bg-[#1F396D] py-6 px-4"
      aria-label="Free parent resources"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <FileText
            className="w-6 h-6 text-[#F16112] flex-shrink-0 mt-0.5 sm:mt-0"
            aria-hidden
          />
          <div>
            <p className="font-bold text-white text-sm sm:text-base">
              Free Self-Assessments for Your Child
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {ASSESSMENTS.map((a) => (
                <span
                  key={a.label}
                  className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 rounded-full px-3 py-0.5 text-xs font-medium"
                >
                  <span aria-hidden>{a.badge}</span>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="https://thegrowwise.com/courses/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F16112] hover:bg-[#d54f0a] text-white font-semibold text-sm rounded-full px-5 py-2.5 transition-colors whitespace-nowrap shadow-lg"
        >
          Browse Free Assessments
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
