import hubCopy from '@/i18n/messages/academic-summer-programs-hub-en.json';
import {
  formatAcademicSprintUsd,
  getAcademicSprintById,
  getAcademicSummerProgramsHubData,
  getAcademicTrackCards,
} from '@/lib/academic-summer-programs-hub-data';

const COPY = hubCopy.pricingSummary;
const TIER_LABELS = hubCopy.sprintCards.sprints['academic-summer-sprint'].pricingTiers;

export function AcademicPricingSummary() {
  const hub = getAcademicSummerProgramsHubData();
  const academicSprint = getAcademicSprintById('academic-summer-sprint');
  const trackCards = getAcademicTrackCards();
  const getReadyTracks = trackCards.filter((c) => c.pricingVariant === 'getReady');

  const upsellNote =
    academicSprint?.pricing &&
    COPY.upsellNote.replace(
      '{amount}',
      formatAcademicSprintUsd(academicSprint.pricing.upsellSaveAmount),
    );

  const trustFooter = COPY.trustFooter
    .replace('{rating}', String(hub.socialProof.googleRating))
    .replace('{reviewCount}', String(hub.socialProof.googleReviewCount))
    .replace('{studentsEnrolled}', String(hub.socialProof.studentsEnrolled));

  return (
    <section className="border-b border-slate-200 bg-slate-50/80 py-14 md:py-20" aria-labelledby="pricing-summary-heading">
      <div className="mx-auto max-w-[1100px] px-5 md:px-12">
        <h2
          id="pricing-summary-heading"
          className="font-heading text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          {COPY.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">{COPY.subhead}</p>

        {academicSprint?.pricing ? (
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <p className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-[#1F396D]">
              {COPY.academicSectionLabel}
            </p>
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.trackColumn}</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.perCohort}</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.bothCohorts}</th>
                </tr>
              </thead>
              <tbody>
                {trackCards
                  .filter((c) => c.pricingVariant === 'gradeBand')
                  .map((track) => (
                    <tr key={track.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-slate-900">{track.name}</td>
                      <td className="px-4 py-3 text-slate-700">
                        {academicSprint.pricing!.tiers
                          .map(
                            (tier) =>
                              `${TIER_LABELS[tier.id]?.label ?? tier.id}: ${formatAcademicSprintUsd(tier.perCohortPrice)}`,
                          )
                          .join(' · ')}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {academicSprint.pricing!.tiers
                          .map(
                            (tier) =>
                              `${TIER_LABELS[tier.id]?.label ?? tier.id}: ${formatAcademicSprintUsd(tier.bothCohortsPrice)}`,
                          )
                          .join(' · ')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {getReadyTracks.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <p className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-[#1F396D]">
              {COPY.getReadySectionLabel}
            </p>
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.trackColumn}</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.twoWeek}</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.fourWeek}</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">{COPY.upfront}</th>
                </tr>
              </thead>
              <tbody>
                {getReadyTracks.map((track) => (
                  <tr key={track.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-900">{track.name}</td>
                    {track.pricingLines.map((row) => (
                      <td key={row.label} className="px-4 py-3 tabular-nums text-slate-700">
                        {formatAcademicSprintUsd(row.amount)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {upsellNote ? (
          <p className="mt-6 text-sm font-semibold text-[#1F396D]">{upsellNote}</p>
        ) : null}
        <p className="mt-4 text-sm font-medium text-slate-600">{trustFooter}</p>
      </div>
    </section>
  );
}
