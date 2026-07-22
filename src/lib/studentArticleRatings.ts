import { createHash } from 'node:crypto'

import { createClient } from '@supabase/supabase-js'

export const STUDENT_ARTICLE_SLUGS = [
  'books-beyond-personality',
  'how-recycling-helps-the-environment',
] as const

export type StudentArticleSlug = (typeof STUDENT_ARTICLE_SLUGS)[number]

export type RatingSummary = {
  average: number | null
  count: number
  userRating: number | null
}

export function isStudentArticleSlug(value: string): value is StudentArticleSlug {
  return (STUDENT_ARTICLE_SLUGS as readonly string[]).includes(value)
}

export function createRatingsClient() {
  const url = process.env.SUPABASE_URL?.trim()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceRoleKey) return null

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export function hashRatingVisitor(visitorId: string) {
  const salt = process.env.ARTICLE_RATING_SALT?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!salt) return null
  return createHash('sha256').update(`${visitorId}:${salt}`).digest('hex')
}

export function summarizeRatings(
  rows: Array<{ rating: number; visitor_hash: string }>,
  visitorHash?: string | null,
): RatingSummary {
  const validRows = rows.filter((row) => Number.isInteger(row.rating) && row.rating >= 1 && row.rating <= 5)
  const count = validRows.length
  const average = count
    ? Math.round((validRows.reduce((total, row) => total + row.rating, 0) / count) * 10) / 10
    : null
  const userRating = visitorHash
    ? validRows.find((row) => row.visitor_hash === visitorHash)?.rating ?? null
    : null

  return { average, count, userRating }
}
