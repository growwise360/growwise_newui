import copy from '@/i18n/messages/academic-summer-programs-en.json';
import { SectionContainer } from '@/components/camps/SectionContainer';
import styles from '@/components/camps/academic-problem-section.module.css';
import { CONTACT_INFO } from '@/lib/constants';

const SECTION = copy.problem;
const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;

function StatItem({
  value,
  label,
  source,
  linkText,
  linkHref,
}: {
  value: string;
  label: string;
  source: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <figure className={styles.statItem}>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statSource}>{source}</p>
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.statLink}
        aria-label={`${source} — ${linkText}`}
      >
        {linkText}
      </a>
    </figure>
  );
}

export function AcademicProblemSection() {
  const [stat1, stat2, stat3] = SECTION.stats;

  return (
    <SectionContainer className="border-b border-slate-100 bg-white">
      <div className={styles.textBlock}>
        <h2 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">{SECTION.heading}</h2>
        <p className={styles.body}>{SECTION.copy}</p>
      </div>

      <div className={styles.bannerBreakout}>
        <div className={styles.banner} role="region" aria-label={SECTION.statsAriaLabel}>
          <div className={styles.statsRow}>
            <StatItem {...stat1} />
            <div className={styles.divider} aria-hidden="true" />
            <StatItem {...stat2} />
            <div className={styles.divider} aria-hidden="true" />
            <StatItem {...stat3} />
          </div>
          <p className={styles.bannerMeta}>
            <a
              href="https://growwiseschool.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bannerMetaLink}
            >
              growwiseschool.org
            </a>
            {' · '}
            <a href={phoneHref} className={styles.bannerMetaLink}>
              {CONTACT_INFO.phone}
            </a>
          </p>
          <p className={styles.bannerTransition}>{SECTION.transition}</p>
        </div>
      </div>
    </SectionContainer>
  );
}
