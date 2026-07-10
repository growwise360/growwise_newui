# Google Ads Keyword URL Implementation - 2026-07-10

## Files

- `google-ads-keyword-url-updates-2026-07-10.csv`: review sheet with current URL, recommended URL, action, and reason.
- `google-ads-editor-keyword-final-url-upload-2026-07-10.csv`: compact Google Ads Editor-style import sheet for the visible rows that need changes.

## Apply Steps

1. Open Google Ads Editor or Google Ads bulk upload.
2. Import `google-ads-editor-keyword-final-url-upload-2026-07-10.csv`.
3. Review the preview carefully before posting changes.
4. Confirm the `high school english tutoring near me` keyword is paused, not deleted.
5. Post the changes.
6. In Google Ads web UI, run keyword diagnosis or Ad Preview for each changed keyword.

## Verified Destination URLs

All recommended destination URLs returned direct HTTP 200 responses on production:

- `https://growwiseschool.org/academic/math`
- `https://growwiseschool.org/camps/summer-reading-writing-dublin-ca`
- `https://growwiseschool.org/resources/kumon-alternative-dublin-ca`
- `https://growwiseschool.org/resources/mathnasium-alternative-dublin-pleasanton`
- `https://growwiseschool.org/camps/math-olympiad-camp-dublin-ca`

## Notes

- This implements the visible screenshot rows only.
- Competitor alternative keywords are routed to comparison/resource pages instead of the generic assessment page.
- Math tutoring keywords are routed to the math programs hub.
- Camp-intent keywords are routed to the camp-specific page.
- The high-school English keyword is paused because the current English landing page is positioned for Grades 1-8, not high-school English.
