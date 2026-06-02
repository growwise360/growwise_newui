type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

export function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push(payload)
}

export function trackPageViewFromNextdoor(pagePath: string): void {
  pushDataLayer({
    event: 'page_view_from_nextdoor',
    page_path: pagePath,
    page_title: typeof document !== 'undefined' ? document.title : '',
  })
}

export function trackCtaClickNextdoor(buttonLocation: string, pagePath: string): void {
  pushDataLayer({
    event: 'cta_click_nextdoor',
    button_location: buttonLocation,
    page_path: pagePath,
  })
}

export function trackAssessmentFormSubmitted(pagePath: string): void {
  pushDataLayer({
    event: 'assessment_form_submitted',
    page_path: pagePath,
  })
}
