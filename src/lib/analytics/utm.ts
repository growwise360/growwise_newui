/** UTM params for Nextdoor → assessment funnel. */
export const NEXTDOOR_UTM = {
  utm_source: 'nextdoor',
  utm_medium: 'social',
  utm_campaign: 'dublin_community',
} as const

export const DOOR_HANGER_UTM = {
  utm_source: 'door-hanger',
  utm_medium: 'physical-drop',
} as const

const UTM_STORAGE_KEY = 'growwise_attribution_utms'

export type StoredUtm = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function utmToSearchParams(utm: StoredUtm = NEXTDOOR_UTM): string {
  const params = new URLSearchParams()
  if (utm.utm_source) params.set('utm_source', utm.utm_source)
  if (utm.utm_medium) params.set('utm_medium', utm.utm_medium)
  if (utm.utm_campaign) params.set('utm_campaign', utm.utm_campaign)
  return params.toString()
}

export function appendUtm(href: string, utm: StoredUtm = getStoredUtm() ?? NEXTDOOR_UTM): string {
  const query = utmToSearchParams(utm)
  if (!query) return href
  const separator = href.includes('?') ? '&' : '?'
  return `${href}${separator}${query}`
}

export function captureUtmFromSearchParams(search?: string): void {
  if (!isBrowser()) return
  const params = new URLSearchParams(search ?? window.location.search)
  const community = params.get('community')
  const source =
    params.get('utm_source') ||
    (community && window.location.pathname.endsWith('/book-assessment')
      ? DOOR_HANGER_UTM.utm_source
      : null)
  if (!source) return

  const stored: StoredUtm = {
    utm_source: source,
    utm_medium:
      params.get('utm_medium') ??
      (source === DOOR_HANGER_UTM.utm_source ? DOOR_HANGER_UTM.utm_medium : undefined),
    utm_campaign: params.get('utm_campaign') ?? community ?? undefined,
  }
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored))
  } catch {
    /* sessionStorage unavailable */
  }
}

export function getStoredUtm(): StoredUtm | null {
  if (!isBrowser()) return null
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredUtm
  } catch {
    return null
  }
}

export function getStoredUtmNotesLine(): string {
  const utm = getStoredUtm()
  if (!utm?.utm_source) return ''
  const parts = [
    utm.utm_source && `utm_source=${utm.utm_source}`,
    utm.utm_medium && `utm_medium=${utm.utm_medium}`,
    utm.utm_campaign && `utm_campaign=${utm.utm_campaign}`,
  ].filter(Boolean)
  return parts.length ? `Attribution: ${parts.join(', ')}` : ''
}
