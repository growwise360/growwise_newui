# Nextdoor ↔ Website Sync Process

Keep the GrowWise Nextdoor business listing and website aligned so neighbor trust on Nextdoor converts on [growwiseschool.org/from-nextdoor](https://growwiseschool.org/from-nextdoor).

**Public Nextdoor page:** [nextdoor.com/pages/growwise-dublin-ca-1](https://nextdoor.com/pages/growwise-dublin-ca-1/)  
**Website landing (use in Nextdoor “Website” field):**

```
https://growwiseschool.org/from-nextdoor?utm_source=nextdoor&utm_medium=social&utm_campaign=dublin_community
```

**Code locations for testimonials:** `src/data/from-nextdoor-testimonials.ts` (also used on `/about`).

---

## Weekly checklist

- [ ] New student project completed? Post photos or a short update on Nextdoor first.
- [ ] New parent testimonial collected? Screenshot for Nextdoor replies and add the exact quote to `from-nextdoor-testimonials.ts`.
- [ ] Seasonal update (camps, holidays, hours)? Post on Nextdoor and update `/from-nextdoor` or `/camps/summer` if dates change.
- [ ] Scan Nextdoor comments for recurring parent questions → add to `from-nextdoor-faqs.ts` if FAQ-worthy.

---

## Monthly content audit

- [ ] Pull top testimonials from Nextdoor → update `from-nextdoor-testimonials.ts` and verify `/about` Parent Testimonials section.
- [ ] Review Nextdoor Faves / engagement → note themes for blog or resource articles.
- [ ] Check Nextdoor Messages for common questions → blog post or FAQ candidates.
- [ ] Confirm Nextdoor website link still points to `/from-nextdoor` with UTM parameters.

---

## Quarterly referral campaign

- [ ] Post referral offer on Nextdoor, e.g. “Refer a neighbor, get $75 off” (align with enroll/promo policy).
- [ ] In GA4, review prior quarter: sessions with `utm_source=nextdoor` → `assessment_form_submitted` conversions.
- [ ] Share ROI summary with stakeholders (assessments booked, enrollments attributed where possible).

---

## Nextdoor listing optimization

- [ ] **Website field:** `growwiseschool.org/from-nextdoor?utm_source=nextdoor&utm_medium=social&utm_campaign=dublin_community`
- [ ] **Photo carousel:** Refresh quarterly with new student projects and campus shots.
- [ ] **Respond to comments** within 24 hours.
- [ ] **Hours / phone** match `CONTACT_INFO` on the website.

---

## Sample Nextdoor posts

### New program

> We just opened [program name] at GrowWise in Dublin — small classes, hands-on projects, and instructors who meet kids where they are. Neighbors can book a **free assessment** (no commitment): [landing URL with UTM]. Questions welcome in the comments.

### Seasonal (summer camps)

> Summer camp enrollment is open at GrowWise on Dublin Blvd — STEAM, Python, and academic tracks for grades 1–12. Dublin families: see schedules and book a free assessment to find the right fit: [landing URL with UTM].

### Referral ask

> Love GrowWise? Refer a Tri-Valley neighbor — [offer details]. They can learn more from families who already know us: [landing URL with UTM]. Thank you for supporting local education.

---

## GA4 monitoring (manual)

After GTM tags are configured for `page_view_from_nextdoor`, `cta_click_nextdoor`, and `assessment_form_submitted`:

1. **Exploration → Funnel:**  
   - Step 1: `page_view` or `page_view_from_nextdoor` where page path contains `/from-nextdoor`  
   - Step 2: `cta_click_nextdoor`  
   - Step 3: `assessment_form_submitted`

2. **Traffic acquisition:** Segment `Session source = nextdoor` (or `utm_source = nextdoor`).

3. **Secondary metric:** Assessment thank-you page views (`/book-assessment/thank-you`) from Nextdoor sessions → enrollment (checkout / HubSpot).

---

## Testimonial sync workflow

1. Screenshot or copy exact quote from Nextdoor (with parent permission).
2. Add entry to `FROM_NEXTDOOR_TESTIMONIALS` in `src/data/from-nextdoor-testimonials.ts`.
3. Deploy; verify `/from-nextdoor` and `/about` render the new card.
4. Optionally reply on Nextdoor thanking the parent and linking to the landing page.

---

## Deployment QA (quick)

- [ ] `/from-nextdoor` loads; sticky mobile CTA works.
- [ ] Book Assessment links include UTM query string.
- [ ] Sitemap includes `/from-nextdoor`.
- [ ] Footer link “Trusted by Dublin Neighbors” works.
- [ ] Rich Results Test: FAQ + no conflicting duplicate FAQ on same URL.
