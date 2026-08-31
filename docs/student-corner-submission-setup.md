# Student Corner submission setup

The Student Corner form accepts student articles and stories for private review. It does not publish files automatically.

## Before deployment

1. Apply `supabase/migrations/202608310001_create_student_work_submissions.sql` to the production Supabase project. This creates the private `student-submissions` bucket and the review queue table.
2. Confirm the deployment has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Set `STUDENT_SUBMISSION_REVIEW_EMAIL` to the inbox that should receive review notices. If it is omitted, the site contact email is used.
4. Confirm Brevo transactional email is configured. The existing SMTP sender is used as a fallback.

## Review workflow

1. A student and parent/guardian submit the form at `/resources/student-corner/submit`.
2. The file is stored in the private Supabase bucket and a `pending_review` database record is created.
3. The reviewer receives a seven-day signed download link. The parent/guardian receives a confirmation email.
4. Before publishing, review originality, sources, private information, parent permission, formatting, and editorial quality. Scan downloaded files before opening them.
5. Update the database status to `changes_requested`, `approved`, `published`, or `declined`. Record `reviewed_at` and `published_url` when applicable.

Email delivery is not guaranteed to reach the primary inbox. During launch testing, check Spam, Junk, and Promotions, and authenticate the sending domain with SPF, DKIM, and DMARC in Brevo.
