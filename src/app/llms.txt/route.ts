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
