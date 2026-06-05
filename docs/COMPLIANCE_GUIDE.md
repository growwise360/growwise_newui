# Compliance Guide: Readiness Checklist Page

## Overview

The free readiness checklist page (`/free-dublin-math-reading-readiness-checklist`) is designed to be compliant with all major educational and privacy regulations while maintaining high conversion rates for lead generation.

## Pre-Compliance Checklist

### Legal
- [x] No medical claims (checklist is "pattern-finder", not diagnosis)
- [x] Disclaimer visible and prominent (yellow warning box)
- [x] Refers users to professionals for formal evaluation
- [x] No liability claims for GrowWise School
- [ ] Legal review by attorney (REQUIRED BEFORE LAUNCH)

### Privacy Compliance
- [x] FERPA compliant (no student data stored until /contact form)
- [x] COPPA compliant (parent-facing, not child-facing)
- [x] GDPR compliant (GA4 anonymized, no cookies before email)
- [x] California CCPA compliant (no sensitive data before email)
- [ ] Cookie consent banner (REQUIRED BEFORE LAUNCH)
- [ ] Privacy policy linked and current
- [ ] Terms of service linked and current

### Data Handling
- [x] No data collection on checklist page (GA4 anonymized only)
- [x] Email only captured at /contact form (high intent)
- [ ] Supabase encryption enabled (VERIFY IN DEPLOYMENT)
- [x] No invasive third-party integrations
- [ ] Data retention policy: 2-year auto-delete (CONFIGURE IN SUPABASE)

### Accessibility (WCAG 2.1 AA)
- [ ] Color contrast ratios tested (4.5:1 minimum)
- [ ] Keyboard navigation verified
- [ ] Screen reader tested
- [x] Mobile responsive
- [ ] No flashing content (photosensitivity safe)

### School Safety
- [x] No aggressive sales copy
- [x] Professional, educational design
- [x] Shareable on school websites
- [x] No direct child targeting
- [x] Prominent liability disclaimer

## Post-Deployment Monitoring

### Daily
- Check error logs (Vercel)
- Monitor GA4 events flow
- Verify email deliverability (Brevo)
- Check SSL certificate validity

### Weekly
- Review user feedback (email replies)
- Audit data retention (Supabase)
- Run privacy compliance scan
- Monitor Core Web Vitals

### Monthly
- Security audit
- Accessibility retest
- Legal compliance review
- School partner feedback

### Quarterly
- Full GDPR audit
- FERPA review
- COPPA compliance check
- State privacy laws update (CCPA, VCCPA, etc.)

## Analytics Events (Compliant)

All GA4 events are anonymized and do not track personally identifiable information (PII) until email is provided.

```
checklist_engagement
  - event_category: "checklist"
  - event_label: "user_started"

checklist_item_toggled
  - checked_count: number
  - total_items: 41
  - item_section: string

checklist_completed
  - score: number
  - intent_level: "high"

assessment_cta_click
  - score: number
  - source: "readiness_checklist_high_intent"
```

## FAQs (Compliant)

All FAQs emphasize:
1. This is NOT a diagnosis
2. Professional evaluation is needed for concerns
3. Data is safe and not collected until email
4. School professionals should be consulted

## Disclaimer Placement

The disclaimer appears in THREE locations for maximum visibility:

1. **Hero section** (below headline) - Small, transparent disclaimer about tool purpose
2. **Result block** (if needed) - Context-specific guidance
3. **Bottom of page** - Comprehensive, prominent yellow warning box

## Links & Privacy Policy

Ensure the following links are correct:

- [ ] `/privacy` - Privacy Policy
- [ ] `/terms` - Terms of Service
- [ ] Contact form validation before email capture

## Sign-Off (Required Before Launch)

Before deploying to production, obtain written sign-off from:

```
[ ] Legal Review
    Name: _________________ Date: _______ Signature: _______
    
[ ] Privacy Officer
    Name: _________________ Date: _______ Signature: _______
    
[ ] Engineering Lead
    Name: _________________ Date: _______ Signature: _______
    
[ ] Product Manager
    Name: _________________ Date: _______ Signature: _______
```

## School Sharing Guidelines

When sharing with schools, include:

1. **For PTA Presidents/Teachers**: "This is a free parent resource tool, no signup required, helps identify potential learning patterns"
2. **For School Websites**: Link to it as "Free Parent Resource: Readiness Checklist"
3. **For Newsletters**: Include disclaimer about non-clinical nature
4. **For Counselors**: Emphasize as screening tool only, not replacement for formal evaluation

## Post-Launch Verification Checklist

- [ ] GA4 events flowing correctly
- [ ] Page loads < 2 seconds
- [ ] Mobile test passed (3+ devices)
- [ ] Error logs clean (24h monitoring)
- [ ] Email capture working
- [ ] Brevo integration confirmed
- [ ] School partners receiving link successfully
- [ ] No privacy complaints (30-day post-launch)

## Escalation Path

If any compliance issues arise:

1. **Privacy concern** → Contact DPO, stop data collection, review logs
2. **Legal concern** → Contact legal team, pause school sharing
3. **Accessibility issue** → Stop launch, remediate, retest
4. **Technical issue** → Engineering team rollback if necessary

---

**Last Updated:** 2026-06-04  
**Version:** 1.0  
**Status:** Ready for Legal Review
