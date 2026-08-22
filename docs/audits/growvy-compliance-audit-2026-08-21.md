# Growvy Scope and Guardrail Compliance Audit

Date: 2026-08-21
Policy version: `growvy-guardrails-v1`
Audited implementation: `src/lib/growvyGuardrails.ts`, `src/app/api/chat/route.ts`, and `src/components/chatbot/Chatbot.tsx`
Final status: **PASS WITH DOCUMENTED EXCEPTIONS**

## Required operating boundary

Growvy is a constrained GrowWise information assistant. It may answer approved questions about GrowWise programs, course coverage, schedules, pricing process, assessments, trials, enrollment, current offers, contact details, office hours, and locations.

Growvy is not an educational information platform or a general-purpose assistant. It must not teach academic subjects, solve schoolwork, write student submissions, generate or debug code, provide test answers, perform competitor or market research, or provide public, social, news, political, financial, medical, legal, or other general information.

Mentioning GrowWise or a GrowWise program does not authorize a prohibited action. For example, Growvy may describe the GrowWise Python Programming program but must refuse to teach Python or generate Python code.

## Implemented controls

### Deterministic answer path

- The chat API no longer calls an open-ended language model.
- Answers are selected from source-attributed GrowWise knowledge records and fixed templates.
- Missing or unsupported information fails closed with a clarification or refusal.
- The dormant legacy `src/lib/llm.ts` service is not imported by any runtime route.

### Input screening

The policy screens for:

- Prompt injection and role override attempts
- Code generation and debugging
- Homework, tests, answer keys, essays, and plagiarism
- General teaching and tutorials
- Competitor, market, stock, investment, and cryptocurrency requests
- News, weather, politics, social trends, travel, medical, legal, and financial advice
- Harmful and cyber-abuse requests
- Requests that are not specifically answerable from approved GrowWise information

### Approved knowledge and provenance

The registry includes source-attributed records for:

- Math
- English and writing
- STEM enrichment and coding
- Python Programming
- Game Development
- AI and Machine Learning
- Robotics
- Young Entrepreneurs
- SAT and ACT support
- Camps and workshops
- Read to Prove
- Write to Explain
- Bridge the Gap Math
- Every registered camp landing page in `CAMP_LANDING_PAGES`
- Contact details, office hours, assessment/trial, enrollment, schedule policy, pricing policy, and the approved Velp credit wording

Educational articles, student work, general website prose, private pricing, and unverified performance claims are intentionally excluded.

### Commercial controls

- Growvy does not invent or estimate prices.
- When an exact current fee is not approved for chat, Growvy explains the pricing process and directs the family to GrowWise.
- Schedule and availability responses state that details can change and require confirmation.
- Velp uses the approved `10% credit` language.
- The output validator blocks the word `discount`, code blocks, scripts, and selected off-scope output phrases.

### Request and conversation integrity

- The API ignores browser-supplied conversation history.
- The API ignores browser-supplied page hints.
- Only a whitelisted page-context identifier is accepted.
- The newest message is sent once rather than duplicated in history.
- Lead forms are authorized only by the server decision. Browser keyword matching can no longer open a form before scope evaluation.
- The endpoint validates same-origin browser requests.
- Cross-origin access is no longer advertised with a wildcard CORS header.
- Request size, message length, and per-IP rate limits remain enforced.
- Responses use `Cache-Control: no-store`.

### User-interface disclosure

The welcome message and input placeholder now state that Growvy handles GrowWise programs, schedules, pricing, assessments, enrollment, offers, and locations. They no longer imply that users may ask arbitrary educational or general questions.

### Email-quality controls

- The browser and server use the same authoritative lead-email validator.
- Email syntax, local-part structure, domain-label structure, and length are validated.
- Known disposable and example domains are rejected.
- Common provider-domain misspellings such as `gmial.com`, `gmail.con`, and `outlok.com` are rejected.
- Numeric-only local parts, obvious placeholder registrations, and high-confidence random-character patterns are rejected.
- Conservative acceptance tests protect realistic parent, plus-addressed, school, and custom-domain addresses from broad heuristic rejection.
- The UI explains that a real email with correctly spelled domain is required and associates the validation error with the input for assistive technology.

## Post-compliance test results

### Policy and adversarial tests

File: `src/lib/__tests__/growvyGuardrails.test.ts`

Covered cases include:

- Approved program and business questions
- Program aliases and informal phrasing
- Python, coding, AI, robotics, math, English, SAT/ACT, camps, and academic summer tracks
- Current pricing and schedule handling
- Velp credit wording
- Code-generation attempts
- Homework, assignment, exam, test-answer, essay, and plagiarism requests
- General teaching requests
- Prompt extraction, role override, and policy override attempts
- Market, competitor, news, weather, political, social, and advice requests
- Harmful and cyber-abuse requests
- GrowWise-named attempts to disguise prohibited requests
- Knowledge provenance and source-file existence
- Forbidden output wording

Result: **passed**.

### API boundary tests

File: `src/app/api/chat/route.test.ts`

Verified:

- Approved GrowWise questions receive deterministic answers.
- GrowWise-named code requests are refused.
- Fabricated `system` and `assistant` history cannot authorize an answer.
- Client page hints cannot authorize an answer.
- Unknown page contexts fail closed.
- Forms are returned only after a successful guarded decision.
- Disallowed origins are rejected.
- Empty, oversized, and malformed requests are rejected.
- Successful responses are not cached.

Result: **passed**.

### Focused regression suite

Command:

```text
npx jest src/lib/__tests__/growvyGuardrails.test.ts src/app/api/chat/route.test.ts src/lib/__tests__/chatbotFormIntent.test.ts src/lib/__tests__/chatbotPageContext.test.ts --runInBand
```

Result: **4 suites passed; 143 tests passed**.

### Full repository suite

Command:

```text
npm test -- --runInBand
```

Result: **120 suites passed; 855 tests passed**.

### Lint and patch validation

Targeted ESLint result: **passed with no errors or warnings in the audited files**.
`git diff --check` result: **passed**.

### Production build

Command:

```text
npm run build
```

Result: **inconclusive**. Next.js entered the optimized production-build phase and produced no compilation or type error, but did not complete after approximately eight minutes. The process was manually stopped. Existing warnings concerned custom static-asset cache headers and the deprecated Next.js middleware convention; neither warning was introduced by the Growvy implementation.

The build must be rerun in CI or an environment where the repository's production build completes before deployment.

## Audit findings

| Control | Result | Evidence |
|---|---|---|
| GrowWise-only scope | Pass | Deterministic scope gate and adversarial tests |
| No academic teaching | Pass | Teaching and tutorial cases refused |
| No homework/test assistance | Pass | Homework, assignment, SAT, exam, and answer-key cases refused |
| No code generation | Pass | Direct and GrowWise-disguised code requests refused |
| No general public/social/market data | Pass | General-data and market cases refused |
| Prompt-injection resistance | Pass for tested classes | No model path; injection patterns and client-history rejection |
| Grounded GrowWise facts | Pass | Source-attributed registry and provenance test |
| Unsupported facts fail closed | Pass | Clarification/refusal behavior tested |
| Price and schedule hallucination prevention | Pass | Fixed pricing and schedule policies |
| Forbidden Velp terminology | Pass | Output validator and regression assertions |
| Client form authorization | Pass | Server-issued form type and API regression test |
| Same-origin request control | Pass | Origin guard and API test |
| Email syntax/domain-quality controls | Pass | Shared client/server validation and positive/negative tests |
| Distributed rate limiting | Exception | Current limiter is process-local |
| Full production build | Exception | Build did not finish in the local verification window |

## Documented exceptions and residual risk

### Process-local rate limiting

`src/lib/chatRateLimit.ts` stores counters in process memory. Limits reset on cold starts and are not shared across multiple server instances. Because Growvy's answer path no longer incurs model calls and has no privileged tools, the impact is lower than before, but distributed abuse protection remains incomplete.

Required follow-up: choose and configure an approved shared rate-limit store for the deployment platform. No vendor or service was assumed during this implementation.

### Production build completion

The full test suite and targeted lint passed, but the local production build did not finish. Deployment should remain gated on a successful CI production build.

### Language coverage

The approved deterministic answers are currently English. Localized page contexts do not grant additional facts, but translated user questions outside the tested English phrase set may be refused rather than answered. This is safe but may create false refusals.

Required follow-up: add separately reviewed locale-specific aliases and adversarial datasets before claiming equivalent non-English support.

### Email ownership and live deliverability

The validator can reject malformed, commonly mistyped, disposable, placeholder-like, and strongly random addresses. It cannot prove that a mailbox exists or belongs to the user. DNS/MX checks alone would also not prove mailbox ownership and can cause false rejections during temporary DNS failures.

Required follow-up if verified ownership is required: add a confirmation-link or one-time-code flow and unlock Growvy only after confirmation.

### Maintenance obligation

Static core facts and generated camp records remain accurate only while their source files are maintained. Any new program family, renamed program, commercial offer, or public policy must be added to the registry and tests before Growvy can answer it.

## Release recommendation

**PASS WITH DOCUMENTED EXCEPTIONS.**

The Growvy response path meets the requested GrowWise-only boundary for the audited English cases and is materially safer than the previous prompt-only design. Release is recommended only after:

1. CI completes `npm run build` successfully.
2. The process-local rate-limit exception is accepted for the current deployment or replaced with a configured shared limiter.
3. Product owners review the approved program descriptions and Velp wording as the business-content sign-off.

No claim is made that arbitrary future phrasing is perfectly classifiable. The implementation intentionally prefers false refusal over an off-scope or unsupported answer.

## Ongoing compliance requirements

- Run the full guardrail and API suites on every policy, content, or routing change.
- Add every newly observed legitimate paraphrase as a reviewed regression case.
- Never learn facts automatically from user conversations.
- Never ingest educational articles into the approved answer registry.
- Require source provenance for every new knowledge record.
- Expire and review commercial offers explicitly.
- Treat any off-scope answer as a release-blocking regression.
- Review false refusals separately; do not loosen global rules to fix a single phrase.

## OpenAI implementation note

The current design does not depend on a model for scope classification or answer generation. If a model-based classifier is introduced later, its output must be schema-constrained and treated only as an untrusted classification signal; application code must retain final authorization. See the official OpenAI documentation for [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [Moderation](https://platform.openai.com/docs/guides/moderation), and [Evals](https://platform.openai.com/docs/guides/evals).
