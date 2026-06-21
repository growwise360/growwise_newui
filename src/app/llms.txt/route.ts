/** Plain-text crawl hints for LLMs — fixed host URLs per product spec. */

const BODY = `# GrowWise School

> K-12 tutoring and STEAM enrichment in Dublin, CA. Math, English, coding, AI, robotics, SAT prep, and summer camps for Grades 1–12 in the Tri-Valley.

## Programs
- [Academic (Math & English)](https://growwiseschool.org/academic)
- [Math Programs](https://growwiseschool.org/academic/math)
- [English Reading & Writing](https://growwiseschool.org/academic/english)
- [Future Skills](https://growwiseschool.org/future-skills)
- [Design & Creative Media](https://growwiseschool.org/future-skills/design-creative-media)
- [Python Certification](https://growwiseschool.org/future-skills/python-certification)
- [AI & Machine Learning](https://growwiseschool.org/future-skills/ai-machine-learning)
- [AI Entrepreneurship](https://growwiseschool.org/future-skills/ai-entrepreneurship)
- [STEAM (Coding, AI, Game Dev)](https://growwiseschool.org/steam)
- [Summer Camps](https://growwiseschool.org/camps/summer)
- [Academic Summer Programs](https://growwiseschool.org/camps/academic-summer-programs-dublin-ca)
- [SAT Prep](https://growwiseschool.org/courses/sat-prep)
- [Workshops](https://growwiseschool.org/workshop-calendar)

## High-Value Parent Guides
- [Math & Reading Readiness Checklist](https://growwiseschool.org/readinesschecklist)
- [Child Reads but Does Not Understand the Passage](https://growwiseschool.org/growwise-blogs/child-reads-but-doesnt-understand-passage)
- [Why Is My Child Struggling With Fractions?](https://growwiseschool.org/growwise-blogs/why-is-my-child-struggling-with-fractions)
- [Common Core Math Strategies for Parents](https://growwiseschool.org/growwise-blogs/common-core-math-strategies-parents)
- [Can ChatGPT Replace a Tutor?](https://growwiseschool.org/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help)
- [Reading Help Checklist](https://growwiseschool.org/growwise-blogs/does-my-child-need-reading-help-checklist)
- [K-12 Tutoring in Dublin, CA](https://growwiseschool.org/resources/tutoring-dublin-ca)
- [Reading Fluency vs Comprehension](https://growwiseschool.org/resources/reading-fluency-vs-comprehension)
- [Summer Slide: Dublin Parent Guide](https://growwiseschool.org/resources/summer-slide-dublin-ca)
- [How to Prevent Summer Slide](https://growwiseschool.org/resources/summer-slide-prevention)
- [Why Khan Academy Summer Plans Fail](https://growwiseschool.org/resources/khan-academy-summer-doesnt-work)
- [Python vs Scratch for Kids](https://growwiseschool.org/resources/python-vs-scratch)
- [Small Group Tutoring vs 1-on-1](https://growwiseschool.org/resources/small-group-tutoring-vs-1-on-1)

## Info
- [K-12 Tutoring in Dublin, CA](https://growwiseschool.org/dublin-ca)
- [About](https://growwiseschool.org/about)
- [Contact](https://growwiseschool.org/contact)
- [Blog](https://growwiseschool.org/growwise-blogs)
- [Parent Guides & Resources](https://growwiseschool.org/resources)

Location: 4564 Dublin Blvd, Dublin, CA 94568
Phone: (925) 456-4606
Serving: Dublin, Pleasanton, San Ramon, Livermore
`

export async function GET(): Promise<Response> {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const dynamic = 'force-dynamic'
