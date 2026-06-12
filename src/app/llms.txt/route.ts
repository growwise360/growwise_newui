/** Plain-text crawl hints for LLMs — fixed host URLs per product spec. */

const BODY = `# GrowWise School

> K-12 tutoring and STEAM enrichment in Dublin, CA. Math, English, coding, AI, robotics, SAT prep, and summer camps for Grades 1–12 in the Tri-Valley.

## Programs
- [Academic (Math & English)](https://growwiseschool.org/academic)
- [STEAM (Coding, AI, Game Dev)](https://growwiseschool.org/steam)
- [Summer Camps](https://growwiseschool.org/camps/summer)
- [Academic Summer Programs](https://growwiseschool.org/camps/academic-summer-programs-dublin-ca)
- [SAT Prep](https://growwiseschool.org/courses/sat-prep)
- [Workshops](https://growwiseschool.org/workshop-calendar)

## High-Value Parent Guides
- [Math & Reading Readiness Checklist](https://growwiseschool.org/readinesschecklist)
- [K-12 Tutoring in Dublin, CA](https://growwiseschool.org/resources/tutoring-dublin-ca)
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
