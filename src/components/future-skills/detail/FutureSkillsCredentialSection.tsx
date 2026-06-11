import { ShieldCheck } from 'lucide-react';

import type { FutureSkillsPathway } from '@/lib/futureSkillsPathways';

interface FutureSkillsCredentialSectionProps {
  pathway: FutureSkillsPathway;
}

export function FutureSkillsCredentialSection({ pathway }: FutureSkillsCredentialSectionProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-3xl rounded-2xl bg-[#1F396D] p-8 text-white">
        <ShieldCheck className="mb-4 h-8 w-8 text-[#F8B34C]" aria-hidden />
        <h2 className="text-3xl font-bold">External certification is optional.</h2>
        {pathway.certiportOnSite && pathway.certiportOnSite.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-[#F8B34C]">On-site at GrowWise Dublin (Certiport)</p>
            {pathway.certiportOnSite.map((cert) => (
              <div key={cert.credential} className="rounded-xl border border-white/15 bg-white/10 p-4">
                <p className="font-bold text-white">{cert.credential}</p>
                <p className="mt-1 text-sm text-white/70">Certiport · on-site Dublin</p>
              </div>
            ))}
          </div>
        )}
        <h3 className="mt-6 text-xl font-bold text-[#F8B34C]">{pathway.credentialHighlight.title}</h3>
        <p className="mt-3 leading-7 text-white/82">{pathway.credentialHighlight.body}</p>
        <p className="mt-4 text-sm leading-7 text-white/70">{pathway.certificationFit}</p>
        {pathway.externalFees.length > 0 && (
          <div className="mt-6 border-t border-white/15 pt-6">
            <p className="text-sm font-bold uppercase tracking-wider text-[#F8B34C]">Optional external exams and credentials</p>
            <ul className="mt-3 space-y-2">
              {pathway.externalFees.map((fee) => (
                <li key={fee.item} className="text-sm leading-6 text-white/80">
                  {fee.item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
