export const HOME_GRAPH_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      name: 'GrowWise School',
      url: 'https://www.growwiseschool.org',
      logo: 'https://www.growwiseschool.org/logo.png',
      description:
        'GrowWise helps Grades 1-12 students become confident, independent learners through academic tutoring and STEAM programs. Available online nationwide and in-person in Dublin, CA.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4564 Dublin Blvd',
        addressLocality: 'Dublin',
        addressRegion: 'CA',
        postalCode: '94568',
        addressCountry: 'US',
      },
      telephone: '+19254564606',
      email: 'contact@growwiseschool.org',
      areaServed: 'US',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '325',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What age should my child start coding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ages 8-10 for block-based tools like Scratch. Ages 10+ for Python and text-based coding. GrowWise focuses on ages 10-18 — the range where students move from learning concepts to building real apps and games.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is vibe coding and should my child learn it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vibe coding means building apps using AI through natural language — describing what you want and using AI to generate and refine code. GrowWise teaches students to vibe code AND understand the fundamentals underneath — so they control the AI, not the other way around.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will coding still matter if AI writes code?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "More than ever. Kids who understand coding don't get replaced by AI — they use it, guide it, and build with it. Python and AI literacy are becoming as foundational as reading and writing in 2026.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why does my child keep making careless mistakes on tests?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Careless mistakes are rarely a knowledge problem. They usually come from a checking system issue, pacing pattern, or attention gap. GrowWise runs a diagnostic to find the exact mistake pattern and fixes it with targeted practice — not more worksheets.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does tutoring take to show results?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most students show measurable improvement within 4-6 sessions. GrowWise builds 4-8 week plans around specific milestones — not open-ended sessions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is GrowWise different from Kumon or Mathnasium?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Kumon and Mathnasium use fixed worksheets and repetition sequences. GrowWise runs a diagnostic first, builds a personalized plan, and aligns every session to your child's exact school curriculum and upcoming assessments.",
          },
        },
        {
          '@type': 'Question',
          name: 'Is online tutoring as effective as in-person?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For most students, yes — especially with live sessions and real-time screen sharing. GrowWise offers both: live online nationwide and in-person in Dublin, CA.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long until my child builds something real in coding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Most students ship their first working project within 4-6 sessions. By Month 3, they're building apps or games they can actually show people.",
          },
        },
      ],
    },
  ],
} as const;
