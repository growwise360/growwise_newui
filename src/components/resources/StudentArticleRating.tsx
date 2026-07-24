'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

import type { RatingSummary, StudentArticleSlug } from '@/lib/studentArticleRatings'

type RatingResponse = RatingSummary & { success: boolean; error?: string }

export default function StudentArticleRating({ slug }: { slug: StudentArticleSlug }) {
  const [summary, setSummary] = useState<RatingSummary>({ average: null, count: 0, userRating: null })
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    fetch(`/api/student-article-ratings/${slug}`, { cache: 'no-store' })
      .then(async (response) => {
        const data = (await response.json()) as RatingResponse
        if (!response.ok || !data.success) throw new Error(data.error || 'Ratings unavailable')
        if (active) setSummary(data)
      })
      .catch(() => {
        if (active) setMessage('Ratings are temporarily unavailable.')
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug])

  async function saveRating(rating: number) {
    if (isSaving) return
    setIsSaving(true)
    setMessage('')
    try {
      const response = await fetch(`/api/student-article-ratings/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      })
      const data = (await response.json()) as RatingResponse
      if (!response.ok || !data.success) throw new Error(data.error || 'Rating could not be saved')
      setSummary(data)
      setMessage('Thank you—your rating was saved.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Rating could not be saved.')
    } finally {
      setIsSaving(false)
    }
  }

  const activeRating = hoveredRating ?? summary.userRating ?? 0

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center sm:p-6" aria-labelledby="article-rating-title">
      <h2 id="article-rating-title" className="font-heading text-xl font-bold text-[#1F396D]">
        How helpful was this article?
      </h2>
      <p className="mt-1 text-sm text-slate-600">Choose a star rating. You can change it anytime.</p>

      <div className="mt-4 flex justify-center gap-1" role="group" aria-label="Rate this article from 1 to 5 stars">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            disabled={isLoading || isSaving}
            onClick={() => saveRating(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(null)}
            onFocus={() => setHoveredRating(rating)}
            onBlur={() => setHoveredRating(null)}
            aria-label={`${rating} star${rating === 1 ? '' : 's'}`}
            aria-pressed={summary.userRating === rating}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-amber-500 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Star className={`h-7 w-7 ${rating <= activeRating ? 'fill-current' : ''}`} aria-hidden />
          </button>
        ))}
      </div>

      <p className="mt-3 min-h-5 text-sm font-semibold text-slate-600">
        {summary.count > 0 && summary.average !== null
          ? `${summary.average.toFixed(1)} out of 5 · ${summary.count} rating${summary.count === 1 ? '' : 's'}`
          : !isLoading && !message
            ? 'Be the first to rate this article.'
            : ''}
      </p>
      <p className="mt-1 min-h-5 text-sm text-slate-600" role="status" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
