import { isAutomatedAuditEnvironment } from '@/lib/consent';
import { isClarityExcludedPath, stripLocalePrefix } from '@/lib/analytics/clarityPaths';

const PROJECT_ID_PATTERN = /^[a-z0-9]+$/i;

export type ClaritySkipReason =
  | 'no_cookie_consent'
  | 'no_project_id'
  | 'invalid_project_id'
  | 'automated_audit'
  | 'excluded_path';

const SKIP_MESSAGES: Record<ClaritySkipReason, string> = {
  no_cookie_consent: 'Analytics cookies not accepted — Clarity will not load until the user clicks Accept.',
  no_project_id:
    'NEXT_PUBLIC_CLARITY_PROJECT_ID is empty — set it in .env.local or Vercel env vars.',
  invalid_project_id:
    'NEXT_PUBLIC_CLARITY_PROJECT_ID format is invalid — use the alphanumeric ID from Clarity Settings.',
  automated_audit:
    'Automated audit environment detected (Lighthouse/WebDriver) — Clarity is intentionally disabled.',
  excluded_path:
    'Current path is excluded from Clarity (login, checkout, dashboard) — no heatmaps on this page.',
};

export function getClaritySkipReasons(params: {
  projectId: string;
  pathname: string;
  consentAccepted?: boolean;
  isAudit?: boolean;
}): ClaritySkipReason[] {
  const reasons: ClaritySkipReason[] = [];
  const id = params.projectId.trim();
  const isAudit = params.isAudit ?? isAutomatedAuditEnvironment();

  if (params.consentAccepted === false) {
    reasons.push('no_cookie_consent');
  }
  if (!id) {
    reasons.push('no_project_id');
  } else if (!PROJECT_ID_PATTERN.test(id)) {
    reasons.push('invalid_project_id');
  }
  if (isAudit) {
    reasons.push('automated_audit');
  }
  if (isClarityExcludedPath(params.pathname)) {
    reasons.push('excluded_path');
  }

  return reasons;
}

function formatSkipReasons(reasons: ClaritySkipReason[]): string {
  return reasons.map((r) => SKIP_MESSAGES[r]).join(' ');
}

const LOG_PREFIX = '[GrowWise Clarity]';

/** Dev-only diagnostics — silent in production. */
export function logClarityDebug(
  event: 'skipped' | 'initialized' | 'stopped',
  reasons: ClaritySkipReason[],
  meta?: { pathname?: string; projectId?: string },
): void {
  if (process.env.NODE_ENV !== 'development') return;

  const path = meta?.pathname ? stripLocalePrefix(meta.pathname) : undefined;

  if (event === 'initialized') {
    console.info(
      `${LOG_PREFIX} Recording started.`,
      path ? `path=${path}` : '',
      meta?.projectId ? `project=${meta.projectId}` : '',
    );
    return;
  }

  if (event === 'stopped') {
    console.info(`${LOG_PREFIX} Recording stopped.`, path ? `path=${path}` : '');
    return;
  }

  if (reasons.length === 0) return;

  console.info(`${LOG_PREFIX} Not recording:`, formatSkipReasons(reasons), path ? `(path=${path})` : '');
}
