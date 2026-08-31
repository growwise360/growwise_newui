type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

type LeadSource =
  | 'book_assessment'
  | 'free_assessment_modal'
  | 'contact_form'
  | 'enroll'
  | 'enroll_academic'
  | 'referral'
  | 'summer_camp_guide'
  | 'math_finals_practice'

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

export function trackAssessmentOptionSelected(assessmentType: string): void {
  pushDataLayer({
    event: 'assessment_option_selected',
    assessment_type: assessmentType,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  })
}

export function trackAssessmentIntakeEvent(
  event:
    | 'assessment_intake_prompt_viewed'
    | 'assessment_intake_started'
    | 'assessment_intake_voice_used'
    | 'assessment_intake_review_shown'
    | 'assessment_intake_submitted'
    | 'assessment_intake_abandoned',
  params: Record<string, unknown> = {},
): void {
  pushDataLayer({
    event,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...params,
  })
}

export function trackAssessmentFormViewed(assessmentType: string): void {
  pushDataLayer({
    event: 'assessment_form_viewed',
    assessment_type: assessmentType,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  })
}

export function trackAssessmentFormStarted(assessmentType: string): void {
  pushDataLayer({
    event: 'assessment_form_started',
    assessment_type: assessmentType,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  })
}

export function trackAssessmentValidationError(
  assessmentType: string,
  fields: string[],
): void {
  pushDataLayer({
    event: 'assessment_validation_error',
    assessment_type: assessmentType,
    error_fields: fields,
    error_count: fields.length,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  })
}

export function trackAssessmentSubmitFailed(
  assessmentType: string,
  errorMessage: string,
): void {
  pushDataLayer({
    event: 'assessment_submit_failed',
    assessment_type: assessmentType,
    error_message: errorMessage,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  })
}

export function trackGenerateLead(
  leadSource: LeadSource,
  params: Record<string, unknown> = {},
): void {
  pushDataLayer({
    event: 'generate_lead',
    lead_source: leadSource,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...params,
  })
}
