import { CONTACT_INFO } from '@/lib/constants'

export type IntegratedMath1TopicSection = {
  title: string
  leadIn: string
  items: readonly string[]
}

export const INTEGRATED_MATH_1_DUBLIN_CA_COPY = {
  hero: {
    h1: 'Integrated Math 1 Tutoring in Dublin, CA',
    subtext: 'Help your student stop guessing and start understanding Math 1.',
    intro: [
      'Integrated Math 1 is a major shift for many students. It does not feel like one simple math class. Students are expected to connect algebra, functions, graphs, equations, geometry, data, and word problems — often in the same unit.',
      'At GrowWise School in Dublin, we help students build the skills and reasoning needed for Integrated Math 1, not just finish homework.',
      'Our focus is simple: find the pattern behind mistakes, fix the weak skill, and help students explain their work clearly.',
    ],
    phoneLabel: 'Call/Text',
    phone: CONTACT_INFO.phone,
    locationLabel: 'Location',
    location: `GrowWise School, ${CONTACT_INFO.street}, ${CONTACT_INFO.city}`,
    assessmentCta: 'Book a Free Assessment',
  },
  struggleSigns: {
    heading: 'Is your child struggling with Integrated Math 1?',
    intro:
      'Many students do not struggle because they are “bad at math.” They struggle because Math 1 requires several skills to work together.',
    subheading: 'Common signs include:',
    items: [
      'They can solve basic problems but struggle with word problems.',
      'They understand steps in class but make repeated errors on tests.',
      'They confuse slope, rate of change, and graph interpretation.',
      'They make sign mistakes in equations or inequalities.',
      'They struggle with systems of equations.',
      'They cannot explain why an answer makes sense.',
      'They rush and call everything a “silly mistake.”',
      'They had gaps from pre-algebra, Algebra 1 foundations, or middle school math.',
    ],
    closing:
      'When these patterns are not fixed early, Integrated Math 1 becomes harder as the course moves into functions, systems, exponential models, geometry, and proofs.',
  },
  coverage: {
    heading: 'What we cover in Integrated Math 1 support',
    intro: 'GrowWise Math 1 support is built around the real skill areas students need.',
    topics: [
      {
        title: 'Algebra Foundations',
        leadIn: 'Students strengthen:',
        items: [
          'Multi-step equations',
          'Variables on both sides',
          'Inequalities',
          'Distributive property',
          'Absolute value basics',
          'Sign rules',
          'Translating word problems into equations',
        ],
      },
      {
        title: 'Functions and Graphs',
        leadIn: 'Students learn how to work with:',
        items: [
          'Function notation',
          'Linear functions',
          'Slope and rate of change',
          'Slope-intercept form',
          'Point-slope form',
          'Standard form',
          'Graph interpretation',
          'Comparing tables, graphs, and equations',
        ],
      },
      {
        title: 'Systems of Equations',
        leadIn: 'Students practice:',
        items: [
          'Solving by graphing',
          'Solving by substitution',
          'Solving by elimination',
          'Word problems with systems',
          'Checking whether an answer makes sense',
        ],
      },
      {
        title: 'Exponential Thinking',
        leadIn: 'Students build understanding of:',
        items: [
          'Exponents',
          'Growth and decay',
          'Linear vs. exponential patterns',
          'Geometric sequences',
          'Real-world exponential models',
        ],
      },
      {
        title: 'Geometry and Reasoning',
        leadIn: 'Students work on:',
        items: [
          'Transformations',
          'Congruent triangles',
          'Coordinate geometry',
          'Distance and midpoint',
          'Area and perimeter on the coordinate plane',
          'Basic reasoning and proof-style explanations',
        ],
      },
      {
        title: 'Data and Word Problems',
        leadIn: 'Students learn how to:',
        items: [
          'Read math problems carefully',
          'Identify what is being asked',
          'Choose the right operation or model',
          'Interpret graphs and data',
          'Explain their answer in complete mathematical reasoning',
        ],
      },
    ] as const satisfies readonly IntegratedMath1TopicSection[],
  },
  approach: {
    heading: 'Our approach: mistake-pattern correction',
    intro: 'Most students do not need random extra worksheets.',
    subheading: 'They need to know which mistake pattern is blocking them.',
    body: 'At GrowWise, we look for patterns such as:',
    patterns: [
      'Rushing through steps',
      'Skipping setup',
      'Misreading the question',
      'Weak number sense',
      'Sign errors',
      'Fraction or decimal confusion',
      'Graph interpretation errors',
      'Not checking the final answer',
      'Weak explanation skills',
    ],
    closing:
      'Once we identify the pattern, we teach students how to correct it with targeted practice.',
  },
  audience: {
    heading: 'Who this program is for',
    intro: 'This Integrated Math 1 support is a good fit for:',
    items: [
      'Students currently taking Integrated Math 1',
      'Students entering Integrated Math 1 next school year',
      'Advanced middle school students preparing for high school math',
      'Students who need help before finals',
      'Students who understand lessons but lose points on tests',
      'Students who need stronger algebra, graphing, and word-problem skills',
    ],
    closing:
      'This is especially useful for families in Dublin, Pleasanton, San Ramon, Livermore, and nearby Tri-Valley areas looking for structured math support.',
  },
  whyGrowWise: {
    heading: 'Why GrowWise School',
    intro:
      'GrowWise School is a Dublin-based learning center focused on academic skill-building, reasoning, and clear explanations.',
    body: 'We do not just help students get through homework. We help them understand the “why” behind each step.',
    subheading: 'Students are guided to:',
    items: [
      'Show organized work',
      'Explain reasoning clearly',
      'Catch repeated mistakes',
      'Connect graphs, equations, and word problems',
      'Build stronger test-readiness habits',
    ],
  },
  cta: {
    heading: 'Get Integrated Math 1 support before small gaps become bigger problems.',
    subtext: 'Call or text GrowWise School to discuss your child’s Math 1 needs.',
    phoneLabel: 'Call/Text',
    locationLabel: 'Location',
    location: `${CONTACT_INFO.street}, ${CONTACT_INFO.city}`,
    programLabel: 'Program',
    program: 'Integrated Math 1 Tutoring / Math 1 Support',
    formatLabel: 'Format',
    format: 'Small-group or targeted academic support',
    assessmentCta: 'Book a Free Assessment',
  },
} as const

export const INTEGRATED_MATH_1_DUBLIN_CA_PATH = '/courses/integrated-math-1-dublin-ca' as const

export const INTEGRATED_MATH_1_DUBLIN_CA_DESCRIPTION =
  'Integrated Math 1 tutoring in Dublin, CA. Algebra, functions, systems, and word problems. Small groups. Book a free assessment.'
