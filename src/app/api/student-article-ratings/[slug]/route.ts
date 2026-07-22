import { randomUUID } from 'node:crypto'

import { type NextRequest, NextResponse } from 'next/server'

import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit'
import { isOriginAllowed } from '@/lib/requestGuard'
import {
  createRatingsClient,
  hashRatingVisitor,
  isStudentArticleSlug,
  summarizeRatings,
} from '@/lib/studentArticleRatings'

export const runtime = 'nodejs'

const COOKIE_NAME = 'gw_article_rater'
const MAX_BODY_BYTES = 256

async function readSummary(slug: string, visitorHash?: string | null) {
  const supabase = createRatingsClient()
  if (!supabase) return { ok: false as const, status: 503, error: 'Ratings are not configured' }

  const { data, error } = await supabase
    .from('student_article_ratings')
    .select('rating, visitor_hash')
    .eq('article_slug', slug)

  if (error) {
    console.error('[student-article-ratings] read failed', error.message)
    return { ok: false as const, status: 503, error: 'Ratings are temporarily unavailable' }
  }

  return { ok: true as const, summary: summarizeRatings(data ?? [], visitorHash) }
}

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  if (!isStudentArticleSlug(slug)) {
    return NextResponse.json({ success: false, error: 'Unknown article' }, { status: 404 })
  }

  const visitorId = request.cookies.get(COOKIE_NAME)?.value
  const visitorHash = visitorId ? hashRatingVisitor(visitorId) : null
  const result = await readSummary(slug, visitorHash)
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: result.status })
  }

  return NextResponse.json({ success: true, ...result.summary })
}

export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  if (!isStudentArticleSlug(slug)) {
    return NextResponse.json({ success: false, error: 'Unknown article' }, { status: 404 })
  }
  if (!isOriginAllowed(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 403 })
  }
  if (!isAllowed('rating', clientIpFrom(request))) {
    return NextResponse.json({ success: false, error: 'Too many rating attempts' }, { status: 429 })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Request too large' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw) as Record<string, unknown>
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const rating = Number(body.rating)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ success: false, error: 'Rating must be between 1 and 5' }, { status: 400 })
  }

  const suppliedVisitorId = request.cookies.get(COOKIE_NAME)?.value
  const visitorId = suppliedVisitorId || randomUUID()
  const visitorHash = hashRatingVisitor(visitorId)
  const supabase = createRatingsClient()
  if (!visitorHash || !supabase) {
    return NextResponse.json({ success: false, error: 'Ratings are not configured' }, { status: 503 })
  }

  const { error } = await supabase.from('student_article_ratings').upsert(
    {
      article_slug: slug,
      visitor_hash: visitorHash,
      rating,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'article_slug,visitor_hash' },
  )

  if (error) {
    console.error('[student-article-ratings] save failed', error.message)
    return NextResponse.json({ success: false, error: 'Rating could not be saved' }, { status: 503 })
  }

  const result = await readSummary(slug, visitorHash)
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: result.status })
  }

  const response = NextResponse.json({ success: true, ...result.summary })
  if (!suppliedVisitorId) {
    response.cookies.set(COOKIE_NAME, visitorId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
  }
  return response
}
