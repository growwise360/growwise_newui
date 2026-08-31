# GrowWise referral automation setup

The website route is `/referral`. A successful submission upserts both family contacts,
creates one Brevo deal associated with the referred family, calculates the third billing
cycle from the required new-student start date, and creates a Brevo task due on that date.
The task sends email and push reminders one day before it is due.

## Brevo configuration

1. Create a `GrowWise Referrals` pipeline.
2. Add at least these stages:
   - `Referral Submitted`
   - `Enrolled — Credit Pending`
   - `Credit Applied`
   - `Not Eligible`
3. Copy the pipeline ID and the first two stage IDs into the environment variables
   documented in `env.local.example`.
4. Get the ID for Brevo's `To do` task type from `GET /v3/crm/tasktypes` and set
   `BREVO_REFERRAL_TASK_TYPE_ID`.
5. Create the optional deal attributes below and copy each internal name into its
   matching environment variable:

| Deal attribute label | Type | Environment variable |
| --- | --- | --- |
| GrowWise Referral ID | Text | `BREVO_REFERRAL_ATTR_REFERRAL_ID` |
| Referral Referrer Email | Text | `BREVO_REFERRAL_ATTR_REFERRER_EMAIL` |
| Referral Referred Email | Text | `BREVO_REFERRAL_ATTR_REFERRED_EMAIL` |
| Referral Submitted Date | Date | `BREVO_REFERRAL_ATTR_SUBMITTED_DATE` |
| New Student Start Date | Date | `BREVO_REFERRAL_ATTR_START_DATE` |
| Enrollment ID | Text | `BREVO_REFERRAL_ATTR_ENROLLMENT_ID` |
| Enrollment Date | Date | `BREVO_REFERRAL_ATTR_ENROLLMENT_DATE` |
| Referral Credit Due Date | Date | `BREVO_REFERRAL_ATTR_CREDIT_DUE_DATE` |
| Referral Credit Amount | Number | `BREVO_REFERRAL_ATTR_CREDIT_AMOUNT` |
| Referral Reminder Task ID | Text | `BREVO_REFERRAL_ATTR_TASK_ID` |

## Confirmed-enrollment webhook

The protected endpoint lets the enrollment or billing system replace the reported start
date with a confirmed enrollment date and move the deal into the pending-credit stage.

```http
POST /api/referrals/enrollment
Authorization: Bearer <REFERRAL_AUTOMATION_SECRET>
Content-Type: application/json

{
  "referredEmail": "new-parent@example.com",
  "enrollmentDate": "2026-09-12",
  "enrollmentId": "ENR-12345",
  "creditAmount": 50
}
```

The public form creates the initial reminder. When `BREVO_REFERRAL_ATTR_TASK_ID` is
configured, the confirmed-enrollment webhook reschedules that task using the verified
date instead of creating a duplicate reminder.

## Release checks

- Submit a referral using two Brevo test contacts.
- Confirm exactly one deal is created in the referral pipeline.
- Confirm the new student's name and start date appear in the linked task.
- Confirm the task due date is two calendar months after the start date.
- Confirm duplicate submissions for the referred email return HTTP 409.
- Confirm the referring family receives the confirmation email.
- In Brevo, confirm the configured `BREVO_SENDER_EMAIL` uses `@growwiseschool.org`
  and shows green DKIM and DMARC checks.
- Send test confirmations to Gmail, Outlook, and Yahoo accounts. In each mailbox,
  inspect the original headers and confirm `dkim=pass`, `spf=pass`, and `dmarc=pass`.
- Review Brevo Transactional > Logs for delivery, bounce, deferral, and spam events.

The success screen tells the referring family to check Spam, Junk, or Promotions if
the confirmation does not arrive within a few minutes. The referred family is not
emailed from this form; only the submitting GrowWise family receives confirmation.
