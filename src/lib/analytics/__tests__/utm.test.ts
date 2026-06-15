import { captureUtmFromSearchParams, getStoredUtm } from '../utm'

describe('utm attribution storage', () => {
  beforeEach(() => {
    sessionStorage.clear()
    window.history.pushState({}, '', '/')
  })

  it('infers door hanger attribution from book assessment community URLs', () => {
    window.history.pushState({}, '', '/book-assessment?community=dublin-ranch')

    captureUtmFromSearchParams('?community=dublin-ranch')

    expect(getStoredUtm()).toEqual({
      utm_source: 'door-hanger',
      utm_medium: 'physical-drop',
      utm_campaign: 'dublin-ranch',
    })
  })

  it('preserves explicit UTM parameters when provided', () => {
    window.history.pushState({}, '', '/book-assessment?community=dublin-ranch')

    captureUtmFromSearchParams(
      '?community=dublin-ranch&utm_source=qr&utm_medium=print&utm_campaign=test-drop',
    )

    expect(getStoredUtm()).toEqual({
      utm_source: 'qr',
      utm_medium: 'print',
      utm_campaign: 'test-drop',
    })
  })
})
