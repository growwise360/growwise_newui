# Pre-audit: SEO Manager blogs

Generated 2026-09-27 before application integration.

| File | SEO title chars | Description chars | H1 count | FAQ count | FAQ/schema exact | Sources | Internal links |
|---|---:|---:|---:|---:|:---:|---:|---:|
| `06-can-your-child-explain-it-without-ai.md` | 61 | 134 | 2 | 5 | FAIL | 3 | 7 |
| `07-is-ai-weakening-your-childs-writing.md` | 60 | 136 | 2 | 5 | pass | 2 | 7 |
| `08-algebra-1-in-8th-grade-tri-valley.md` | 62 | 140 | 2 | 5 | pass | 3 | 10 |
| `09-california-phone-free-schools-law-focus.md` | 69 | 146 | 2 | 5 | pass | 2 | 10 |
| `10-is-uc-bringing-back-the-sat.md` | 70 | 165 | 2 | 5 | pass | 3 | 9 |
| `11-is-tutoring-worth-it.md` | 71 | 139 | 2 | 5 | pass | 1 | 8 |
| `12-kumon-vs-mathnasium-vs-rsm.md` | 66 | 146 | 2 | 5 | FAIL | 3 | 7 |
| `13-online-vs-in-person-tutoring.md` | 64 | 136 | 2 | 5 | pass | 1 | 7 |
| `14-questions-to-ask-a-tutor-before-hiring.md` | 66 | 130 | 2 | 5 | pass | 1 | 7 |
| `15-math-olympiad-by-grade.md` | 64 | 122 | 2 | 5 | pass | 3 | 9 |

## Findings
- The ten source files are not present in `src/data/editorial-blog-posts.tsx` and therefore are not routable through the existing catch-all blog page.
- Each source file contains two H1 headings: a metadata title and an article title.
- FAQ/schema text mismatches occur in `06-can-your-child-explain-it-without-ai.md` and `12-kumon-vs-mathnasium-vs-rsm.md`.
- Source files contain FAQPage examples but no BlogPosting or BreadcrumbList implementation data.
- Existing robots configuration explicitly allows OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, and Bingbot; `/llms.txt` exists but does not list these ten URLs.
