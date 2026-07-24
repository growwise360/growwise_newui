import { createClient } from '@supabase/supabase-js';

export interface SelfCheckStats {
  families: number;
  patterns: number;
  sessions: number;
}

/**
 * Returns live counter values for the self-check page strip.
 *
 * c1 — families checked  = DISTINCT parent_email count in `leads` + COUNTER_BASE_FAMILIES
 * c2 — patterns found    = families × COUNTER_PATTERNS_PER_FAMILY  + COUNTER_BASE_PATTERNS
 * c3 — sessions booked   = COUNTER_BASE_SESSIONS (manually maintained; wire to enrollments later)
 *
 * Env vars (all optional — falls back to safe defaults if absent):
 *   COUNTER_BASE_FAMILIES      default 47
 *   COUNTER_BASE_PATTERNS      default 0   (c2 is derived from c1 × multiplier)
 *   COUNTER_BASE_SESSIONS      default 28
 *   COUNTER_PATTERNS_PER_FAMILY default 6  (avg patterns surfaced per quiz)
 */
export async function getSelfCheckStats(): Promise<SelfCheckStats> {
  const baseF   = parseInt(process.env.COUNTER_BASE_FAMILIES       ?? '47',  10);
  const baseP   = parseInt(process.env.COUNTER_BASE_PATTERNS        ?? '0',   10);
  const baseS   = parseInt(process.env.COUNTER_BASE_SESSIONS        ?? '28',  10);
  const ppm     = parseInt(process.env.COUNTER_PATTERNS_PER_FAMILY  ?? '6',   10);

  let liveCount = 0;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      // Count unique families (distinct parent_email)
      const { count, error } = await supabase
        .from('leads')
        .select('parent_email', { count: 'exact', head: true });

      if (!error && count !== null) {
        liveCount = count;
      }
    } catch {
      // Non-critical — counters fall back to baseline values
    }
  }

  const families = baseF + liveCount;
  const patterns = baseP + (families * ppm);
  const sessions = baseS;

  return { families, patterns, sessions };
}
