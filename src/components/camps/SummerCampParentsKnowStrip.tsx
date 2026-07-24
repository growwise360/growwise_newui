import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';
import copy from '@/i18n/messages/summer-camp-canonical-en.json';

const ICONS = [Users, Award, BookOpen, GraduationCap] as const;

export function SummerCampParentsKnowStrip() {
  const { heading, items } = copy.parentsKnow;

  return (
    <section aria-labelledby="summer-camp-parents-know-heading" className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-6 md:px-6">
      <h3
        id="summer-camp-parents-know-heading"
        className="font-heading text-base font-black uppercase tracking-tight text-slate-800"
      >
        {heading}
      </h3>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0" role="list">
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? Users;
          return (
            <li key={item.title} className="flex gap-3">
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F396D]/10 text-[#1F396D]"
                aria-hidden
              >
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
