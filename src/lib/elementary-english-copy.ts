/**
 * Copy for /academic/english/elementary — single source for UI + JSON-LD FAQ text.
 */

export const ELEMENTARY_ENGLISH_PROGRAM_ID = 'elementary-english' as const

export const ELEMENTARY_ENGLISH_COPY = {
  breadcrumb: {
    academic: 'Academic',
    englishPrograms: 'English programs',
    elementary: 'Elementary English',
  },
  hero: {
    eyebrow: 'Elementary English · Grades 1–5 · Dublin, CA + Live online nationwide',
    h1: 'Your child can read the words. But can they understand them, write about them, or explain them? That gap is what we fix.',
    subhead:
      'Most parents notice the problem in homework or report cards — but the gap usually started six to eighteen months earlier. Reading fluency, vocabulary, grammar, and writing all move together in Grades 1–5. When one pillar slips, the others stall.',
    tldr: {
      title: 'At a glance — what each pillar gap looks like',
      items: [
        { pillar: 'Reading fluency', signal: 'Reads aloud but cannot summarize; slow, labored reading; skips or guesses words.' },
        { pillar: 'Vocabulary', signal: 'Limited words in writing; cannot explain what they read; skips unfamiliar words.' },
        { pillar: 'Grammar', signal: 'Run-on sentences; verb tense shifts mid-essay; sentences sound off.' },
        { pillar: 'Writing', signal: 'Stares at a blank page; very short answers; resists writing tasks.' },
      ],
    },
    trustChips: [
      'Groups of 6–10 at the same skill profile',
      '4564 Dublin Blvd, Dublin, CA · live online nationwide',
      '2 sessions/week · 60 min · 3-month blocks',
      'Aligned to California Common Core ELA',
    ],
    primaryCta: 'Book free 45-min assessment',
    secondaryCta: 'Take the free self-check',
    microCopy:
      'No charge. No commitment. Assessment places your child in the right level before the first paid session.',
  },
  aeo: {
    heading: 'Elementary English tutoring — questions parents search for',
    blocks: [
      {
        question: 'Why does my child hate writing?',
        answer:
          'Most children who resist writing are missing vocabulary or grammar tools — not motivation. If they cannot find words or build sentences confidently, the blank page feels threatening. Our diagnostic finds which pillar is blocking them so instruction targets the root cause, not the attitude.',
      },
      {
        question: "My child can read out loud fine but doesn't understand what they read. What's happening?",
        answer:
          'Oral reading and comprehension are different skills. A child can decode words while vocabulary and inference lag — so they sound fluent but cannot retell or answer questions. This is common in Grades 2–4 and usually traces to Tier 2 vocabulary and comprehension strategy gaps.',
      },
      {
        question: "My child's teacher says they read below grade level. What does that actually mean?",
        answer:
          'It usually means fluency, vocabulary, or comprehension — not ability — is below the band expected for their grade. The label is a snapshot; our free assessment breaks it into the four pillars so you know exactly which skills to close and at which level to start.',
      },
      {
        question: 'Is elementary English tutoring in Grades 1–5 worth it, or should I wait and see?',
        answer:
          'Waiting often widens the gap because Grades 1–5 skills stack — weak vocabulary in Grade 2 makes Grade 4 essays harder. Early targeted support is worth it when you see pillar signals. A free assessment shows whether action is needed now or later.',
      },
    ],
  },
  compounding: {
    eyebrow: 'Why it compounds',
    heading: 'Reading below grade level in Grades 1–5 often starts long before parents notice',
    paragraphs: [
      'The chain is predictable: a phonics or fluency gap limits vocabulary exposure → comprehension fails on grade-level texts → writing stalls because students lack words and sentence patterns → by Grade 5, multi-paragraph essays feel impossible.',
      'The dangerous signal is a B or C in Grades 2–3 that looks okay when actual skill is a year behind — the class moved on, but the pillar never fully landed.',
      'Parents often say, “They were fine until this year.” The gap was smaller then; the work finally required enough reading and writing to expose it.',
    ],
  },
  painCards: [
    {
      quote: 'My child sits down to write and just stares at the page. Nothing comes out.',
      explanation: 'They often lack vocabulary and grammar patterns to translate ideas into sentences — so nothing comes out is a skills gap, not laziness.',
      rootCause: 'Vocabulary + grammar gap',
      level: 'Beginner or Champ',
    },
    {
      quote: 'She reads fine — but ask her what happened in the chapter and she goes blank.',
      explanation: 'Decoding can outpace Tier 2 vocabulary and inference — she reads words but cannot hold meaning or explain the text.',
      rootCause: 'Tier 2 vocabulary gap',
      level: 'Champ',
    },
    {
      quote: "His teacher says 'add more detail' on every assignment. He doesn't know what that means.",
      explanation: '“More detail” requires vocabulary, examples, and paragraph structure — without those tools, the feedback does not translate into action.',
      rootCause: 'Writing structure + vocabulary',
      level: 'Champ',
    },
    {
      quote: 'Every writing assignment ends in tears. She says she hates English.',
      explanation: 'Resistance usually means one or more pillars are below grade level and every assignment re-exposes the gap — fixing the skill removes the fight.',
      rootCause: 'One or more pillars below grade level',
      level: 'Beginner',
    },
    {
      quote: 'Going into 6th grade. I want all four skills solid before middle school.',
      explanation: 'Middle school ELA expects independent reading, structured writing, and grammar in longer assignments — Grades 4–5 is the right window to close readiness gaps.',
      rootCause: 'Readiness gap for middle school ELA',
      level: 'Champ (transition prep)',
    },
  ],
  pillars: {
    eyebrow: 'The four pillars',
    heading: 'Grades 1–5 English program — reading fluency, vocabulary, grammar, and writing',
    subheading: 'Every level works all four pillars simultaneously. Observable signals parents can watch for at home.',
    items: [
      {
        number: '1',
        name: 'Reading fluency',
        why: 'Accurate, expressive reading at the right pace is the gateway to comprehension — without it, every later skill fights uphill.',
        signal: 'Reads aloud but cannot summarize; slow or labored reading; skips or guesses words.',
      },
      {
        number: '2',
        name: 'Vocabulary',
        why: 'Academic words appear in textbooks, tests, and writing prompts — limited vocabulary caps both understanding and expression.',
        signal: 'Narrow word choice in writing; cannot explain what they read; skips unfamiliar words.',
      },
      {
        number: '3',
        name: 'Grammar',
        why: 'Clear sentences let ideas land — grammar patterns are the scaffolding for every paragraph they will write in middle school.',
        signal: 'Run-on sentences; verb tense shifts mid-essay; sentences sound off even when ideas are good.',
      },
      {
        number: '4',
        name: 'Writing',
        why: 'School success increasingly depends on organized written responses — from sentences in Grade 1 to multi-paragraph essays in Grade 5.',
        signal: 'Stares at a blank page; very short responses; no structure or detail; resists writing tasks.',
      },
    ],
  },
  mastery: {
    eyebrow: 'GrowWise mastery track',
    heading: 'Beginner, Champ, and Pro — diagnostic places your child',
    intro:
      'Three levels based on skill profile, not grade alone. Every three months we reassess all four pillars; students advance only at 90% or above — never early.',
    levels: [
      { name: 'Beginner', description: 'Below grade level on one or more pillars — closing foundational gaps in fluency, words, sentences, and short writing.' },
      { name: 'Champ', description: 'At grade level — building consistency so strong days become the norm across all four pillars.' },
      { name: 'Pro', description: 'Above grade level — accelerating with richer texts, advanced vocabulary, and structured multi-paragraph writing.' },
    ],
    rule: '90% across all four pillars · 3-month assessment · no student advances early',
  },
  curriculum: {
    eyebrow: 'Curriculum scope',
    heading: 'Elementary English tutoring online — scope by grade band',
    subheading: 'Parent-readable focus across reading fluency, vocabulary, grammar, and writing.',
    headers: ['Reading fluency', 'Vocabulary', 'Grammar', 'Writing'] as const,
    bands: [
      {
        label: 'Grades 1–2',
        fluency: 'Letter-sound links, blends and digraphs, short and long vowel patterns, sight-word automaticity, basic phrasing when reading aloud.',
        vocabulary: 'High-frequency word meanings, concrete nouns and verbs, simple synonyms and antonyms, picture clues, basic prefixes like un- and re-.',
        grammar: 'Singular and plural nouns, present and past tense verbs, adjectives, capitals and end punctuation, complete sentences vs. fragments.',
        writing: 'Complete sentences, adding who/what/where detail, responding to a prompt, spacing and capitals, telling vs. asking sentences.',
      },
      {
        label: 'Grades 3–4',
        fluency: 'Multisyllabic decoding, steady reading pace with accuracy, expression in longer texts, self-correction, purposeful reading of informational texts.',
        vocabulary: 'Tier 2 academic words (analyze, contrast, summarize), common prefixes and suffixes, multiple-meaning words, dictionary and glossary use.',
        grammar: 'Compound sentences with conjunctions, pronoun agreement, possessives and contractions, commas in lists, subject-verb agreement, paragraph conventions.',
        writing: 'Paragraph structure (topic, body, closing), opinion writing with reasons, sequenced narratives, revising for clarity and detail.',
      },
      {
        label: 'Grade 5',
        fluency: 'Close reading of complex texts, using context for unknown words, pace matched to comprehension, summarizing vs. retelling.',
        vocabulary: 'Greek and Latin roots, subject-specific academic words, figurative language, signal words (however, therefore, moreover).',
        grammar: 'Perfect verb tenses, correlative conjunctions, expanding and shortening sentences for effect, tense consistency, commas after introductory clauses.',
        writing: 'Multi-paragraph opinion and informative essays, thesis statements, evidence and transitions, revision vs. editing, introduction to citing sources.',
      },
    ],
  },
  notItems: {
    eyebrow: 'What this is not',
    heading: 'Not more of what is not working',
    intro: 'Many students with ELA gaps have already done generic practice. The issue is rarely volume alone — it is practice without diagnosis or targeted pillar work.',
    items: [
      'Not homework supervision',
      'Not reteaching this week’s unit without diagnosing the blocker',
      'Not generic “reading and writing practice” with no milestone',
      'Not correcting wrong answers without correcting the mistake pattern',
    ],
  },
  program: {
    sectionLabel: 'Program details',
    heading: 'Elementary English — structured 3-month program',
    includes: [
      'Free assessment before session 1 — places Beginner, Champ, or Pro',
      '2 sessions per week · 60 minutes each · 24 sessions per 3-month block',
      'Groups of 6–10 students at the same skill profile (not necessarily the same grade)',
      'All four pillars every session — reading fluency, vocabulary, grammar, writing',
      'Monthly parent progress report',
      'Aligned to California Common Core ELA',
      'In-person at 4564 Dublin Blvd, Dublin, CA or live online nationwide',
    ],
    outcomes: [
      'Measurable gains on the pillar gaps identified at diagnostic',
      'Stronger fluency and comprehension on grade-appropriate texts',
      'More confident sentence and paragraph writing with clearer structure',
      'Clear next-step plan after each 3-month assessment',
    ],
    footerMicro:
      'No long-term contract · Diagnostic-first placement · Current pricing shared before enrollment',
  },
  faq: {
    title: 'Elementary English tutoring FAQs',
    subtitle: 'Direct answers for Grades 1–5 parents in Dublin, Pleasanton, San Ramon, and the Tri-Valley.',
  },
  cta: {
    heading: 'Start with a free assessment.',
    body:
      'The assessment identifies pillar gaps, places your child in Beginner, Champ, or Pro, and outlines month one — before any paid session. No charge and no commitment.',
    primaryLabel: 'Book free assessment',
    primaryPath: '/book-assessment',
    secondaryLabel: 'Get More Information',
    secondaryPath: '/enroll-academic',
  },
} as const
