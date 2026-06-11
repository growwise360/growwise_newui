# GTM repo artifacts

## `virtual_page_view_import.json`

This file is an **import package** for the GrowWise GTM container (`GTM-TNFBBQJM`). It contains only:

- **GA4 Configuration** tag (`send_page_view`: false)
- **GA4 Event** tag for `virtual_page_view`
- **GA4 Event** tag for `generate_lead`
- Related triggers and data layer variables

There is **no Meta (Facebook) Pixel tag** in this export. The live GTM workspace may still include a Pixel or other tags that were added directly in the Tag Manager UI and never exported here.

## Consent policy

The app now loads GTM / GA4 for all real users so `virtual_page_view` and `generate_lead`
can be attributed even when a visitor does not click the cookie banner before converting.

Consent-sensitive tags must be controlled inside GTM:

- GA4 Configuration: fire for all users
- `GA4 - virtual_page_view`: fire for all users
- `GA4 - generate_lead`: fire for all users
- Facebook / Meta Pixel: add an exception or consent trigger so it fires only after accepted consent

## Avoiding duplicate Meta Pixel loads

If the **same** pixel ID is fired from **both** the Next app ([`src/components/analytics/MetaPixel.tsx`](../src/components/analytics/MetaPixel.tsx)) **and** a GTM tag, set:

`NEXT_PUBLIC_META_PIXEL_DISABLE_APP=true`

See [`env.local.example`](../env.local.example) and [`src/lib/metaPixelEnv.ts`](../src/lib/metaPixelEnv.ts).

**Manual check:** In Google Tag Manager → **Tags**, search for “Facebook”, “Meta”, or “Custom HTML” snippets that load `fbevents.js` or `connect.facebook.net`.

If the app standalone Meta Pixel is used instead of a GTM Pixel tag, it remains consent-gated in
[`AnalyticsAfterConsent.tsx`](../src/components/analytics/AnalyticsAfterConsent.tsx).

## Lead conversion event

The app pushes `generate_lead` after successful lead form/API submissions:

| `lead_source` | When |
|---------------|------|
| `book_assessment` | `/book-assessment` form success |
| `free_assessment_modal` | shared free assessment modal success |
| `contact_form` | contact form success |
| `enroll` | general enrollment form success |
| `enroll_academic` | academic enrollment form success |
| `summer_camp_guide` | summer camp guide lead success |
| `math_finals_practice` | math finals practice lead success |

The checked-in import now includes:

- Custom Event trigger: `generate_lead`
- GA4 Event tag: `GA4 - generate_lead`
- Data layer variables: `lead_source`, `form_name`, `page_path`, `page_location`, `grade`, `camp_interest`, `program_type`

After importing/publishing in GTM:

1. Test in **GTM Preview** by submitting a real form and confirm `GA4 - generate_lead` fires.
2. Confirm `generate_lead` appears in **GA4 Realtime / DebugView**.
3. In GA4 Admin → Events, mark `generate_lead` as a **key event**.
4. In Google Ads → Goals → Conversions → Import from GA4, import `generate_lead`.

## Nextdoor conversion events (configure in GTM UI)

The app pushes these `dataLayer` events (after cookie consent):

| Event | When |
|-------|------|
| `page_view_from_nextdoor` | `/from-nextdoor` page load |
| `cta_click_nextdoor` | Book Assessment click from Nextdoor landing (`button_location` param) |
| `assessment_form_submitted` | Successful `/api/assessment` submit before thank-you redirect |

**Suggested GA4 setup:** Create Custom Event triggers for each name, then GA4 Event tags mapping to GA4 custom events (or mark `assessment_form_submitted` as a conversion).

**UTM landing URL for Nextdoor business profile:**

`https://growwiseschool.org/from-nextdoor?utm_source=nextdoor&utm_medium=social&utm_campaign=dublin_community`

## Lighthouse “Uses deprecated APIs” (AttributionReporting)

Chrome may flag **`AttributionReporting`** as originating from Meta’s **`fbevents.js`**. That comes from the Pixel script, not from first-party React code. A **lab baseline** without loading Pixel/GTM is documented in [`docs/performance-tests-status.md`](../docs/performance-tests-status.md) (section on Best Practices / third-party).
