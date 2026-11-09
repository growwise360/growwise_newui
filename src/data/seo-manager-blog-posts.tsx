import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { EditorialBlogPost } from './editorial-blog-posts'
import { MarkdownBlogBody } from '@/components/blogs/MarkdownBlogBody'

type DraftConfig = Omit<EditorialBlogPost, 'slug' | 'headline' | 'seoTitle' | 'description' | 'publishedDate' | 'faqs' | 'body'> & {
  filename: string
  image: string
  imageAlt: string
  dek: string
  quickAnswer: string
  modifiedDate: string
  articleSection: string
  keywords: string[]
}

const SOURCE_DIR = join(process.cwd(), 'content', 'seo-manager')
const DATE = '2026-09-27'

const CONFIG: readonly DraftConfig[] = [
  {
    filename: '06-can-your-child-explain-it-without-ai.md',
    image: '/images/blogs/ai-helping-learning-not-doing-homework.webp', imageAlt: 'Parent checking that a student can explain work completed with AI support',
    dek: 'A finished assignment can hide an unfinished skill. Use a five-minute check to see whether your child can explain, adapt, and repeat the work without AI.',
    quickAnswer: 'AI supports learning when a student still explains, decides, writes, solves, and checks the work. It replaces learning when the student cannot explain or recreate the finished response without the tool. Ask for an explanation, change one detail, and check a fresh example with the tool closed.',
    modifiedDate: DATE, articleSection: 'AI and independent learning', keywords: ['kids using AI for homework', 'AI homework help for kids', 'how to tell if my child understands homework'],
    relatedPosts: [
      { title: 'Should Kids Use ChatGPT for Homework?', href: '/growwise-blogs/should-kids-use-chatgpt-for-homework', description: 'Set family rules that keep the student responsible for the work.' },
      { title: 'AI and Student Writing', href: '/growwise-blogs/is-ai-weakening-your-childs-writing', description: 'Check whether polished writing reflects independent skill.' },
      { title: 'California Phone-Free Schools Law', href: '/growwise-blogs/california-phone-free-schools-law-focus-homework', description: 'Separate a focus habit from the skill gap underneath it.' },
    ],
    programHref: '/self-check', programLabel: 'Take the Free Self-Check', ctaHeadline: 'Does finished work reflect real understanding?', ctaSubtext: 'GrowWise uses assessment, targeted teaching, and independent checks to make learning visible.',
  },
  {
    filename: '07-is-ai-weakening-your-childs-writing.md',
    image: '/images/blogs/ai-essay-writing-skills-revision.webp', imageAlt: 'Student independently revising an essay while a laptop remains in the background',
    dek: 'A polished essay is not proof of a stronger writer. Look for idea formation, evidence, explanation, drafting, and revision the student can do independently.',
    quickAnswer: 'AI can polish an essay, but writing skill grows when students form ideas, organize evidence, draft, judge feedback, and revise. Ask your child to explain the thesis, point to the evidence, and write a short paragraph without AI.',
    modifiedDate: DATE, articleSection: 'AI and student writing', keywords: ['AI and kids writing skills', 'child struggles to write paragraphs', 'how to improve my child writing'],
    relatedPosts: [
      { title: 'Can Your Child Explain It Without AI?', href: '/growwise-blogs/can-your-child-explain-it-without-ai', description: 'Use a short transfer check to see who did the thinking.' },
      { title: 'English Reading and Writing Programs', href: '/academic/english', description: 'Build evidence, clarity, and independent writing skills.' },
      { title: 'Why Your Child Struggles With Writing', href: '/resources/child-struggles-with-writing-dublin-ca', description: 'Separate idea, evidence, and clarity gaps.' },
    ],
    programHref: '/academic/english', programLabel: 'Explore English Programs', ctaHeadline: 'Build a writer who can think on the page', ctaSubtext: 'GrowWise makes student reasoning visible through short writing, evidence, feedback, and revision.',
  },
  {
    filename: '08-algebra-1-in-8th-grade-tri-valley.md',
    image: '/images/blogs/middle-school-math-cliff-pre-algebra.webp', imageAlt: 'Middle school student working through a pre-algebra readiness check',
    dek: 'Algebra 1 or Integrated Math 1 can open options, but readiness depends on foundations, explanation, and transfer—not the report-card grade alone.',
    quickAnswer: 'A student is more likely ready for eighth-grade Algebra 1 or Integrated Math 1 when they can work accurately with fractions, negatives, ratios, equations, and word problems without notes, explain their choices, and recover from errors. A diagnostic can separate ready, ready-with-support, and build-first cases.',
    modifiedDate: DATE, articleSection: 'Middle school math placement', keywords: ['is my child ready for Algebra 1', 'Algebra 1 in 8th grade', 'Integrated Math 1 readiness', 'Tri-Valley math placement'],
    relatedPosts: [
      { title: 'Integrated Math 1 vs. Algebra 1', href: '/growwise-blogs/integrated-math-1-vs-algebra-1-difference', description: 'Compare the course pathways and the foundations they share.' },
      { title: 'Math Olympiad by Grade', href: '/growwise-blogs/math-olympiad-by-grade', description: 'See how foundation and reasoning readiness transfer to competition math.' },
      { title: 'Is UC Bringing Back the SAT?', href: '/growwise-blogs/is-uc-bringing-back-the-sat-tri-valley', description: 'Connect algebra foundations to future testing choices.' },
    ],
    programHref: '/middle-school-tutoring-dublin-ca', programLabel: 'Explore Middle School Math', ctaHeadline: 'Get a clear placement recommendation', ctaSubtext: 'GrowWise checks the prerequisite skills and explains whether your student is ready now, ready with support, or should build first.',
  },
  {
    filename: '09-california-phone-free-schools-law-focus.md',
    image: '/images/blogs/screen-time-homework-focus-distractions.webp', imageAlt: 'Student working through homework during a phone-free focus block',
    dek: 'California districts now have phone policies, but removing a device does not by itself repair a learning gap. Watch where the work stops.',
    quickAnswer: 'California AB 3216 requires school districts to adopt policies limiting or prohibiting smartphone use during the school day, while local rules and exceptions vary. A phone-free block can reduce distraction at home, but repeated difficulty starting or completing work may point to a skill gap that needs targeted instruction.',
    modifiedDate: DATE, articleSection: 'California education policy and homework focus', keywords: ['California school phone ban 2026', 'AB 3216 phone-free schools', 'kids cannot focus on homework', 'Tri-Valley school phone policy'],
    relatedPosts: [
      { title: 'Learning How to Think in the AI Era', href: '/growwise-blogs/thinking-gap-your-kids-arent-distracted', description: 'Separate distraction from the underlying thinking gap.' },
      { title: 'Can Your Child Explain It Without AI?', href: '/growwise-blogs/can-your-child-explain-it-without-ai', description: 'Use a short transfer check to separate focus from understanding.' },
      { title: 'Homework Independence', href: '/resources/homework-independence', description: 'Create a predictable home routine that builds independence.' },
    ],
    programHref: '/academic', programLabel: 'Explore Academic Programs', ctaHeadline: 'Find out whether focus or skill is the blocker', ctaSubtext: 'GrowWise separates study habits from missing foundations, then gives families a specific next step.',
  },
  {
    filename: '10-is-uc-bringing-back-the-sat.md',
    image: '/images/blogs/understand-child-psat-score-report.webp', imageAlt: 'Parent and high school student reviewing a PSAT score report and SAT plan',
    dek: 'UC is reviewing standardized testing, while other colleges have changed policies. A diagnostic helps families prepare for the schools and deadlines that actually matter.',
    quickAnswer: 'UC has not reinstated an SAT or ACT requirement. Its faculty-led review is underway, with recommendations scheduled for the 2026–27 academic year. SAT prep can still make sense when a student is applying to test-required or test-recommended colleges, seeking some scholarships, or showing fixable gaps on a diagnostic.',
    modifiedDate: DATE, articleSection: 'SAT and college admissions', keywords: ['is UC bringing back the SAT', 'is SAT prep worth it', 'UC SAT 2027', 'when to start SAT prep'],
    relatedPosts: [
      { title: 'When Should My Child Start SAT Prep?', href: '/resources/when-to-start-sat-prep', description: 'Use grade, foundations, and testing goals to choose a timeline.' },
      { title: 'Algebra 1 in 8th Grade', href: '/growwise-blogs/algebra-1-8th-grade-math-placement-tri-valley', description: 'Strengthen the math foundations behind future testing.' },
      { title: 'How to Read a PSAT Score Report', href: '/growwise-blogs/understand-child-psat-score-report', description: 'Turn a score report into specific practice priorities.' },
    ],
    programHref: '/courses/sat-prep', programLabel: 'Explore SAT Prep', ctaHeadline: 'Plan SAT prep around the student, not the rumor', ctaSubtext: 'GrowWise starts with a timed diagnostic and builds a practical plan around goals, gaps, and test dates.',
  },
  {
    filename: '11-is-tutoring-worth-it.md',
    image: '/images/blogs/how-to-tell-if-tutoring-is-working.webp', imageAlt: 'Parent and educator reviewing measurable tutoring progress with a student',
    dek: 'Tutoring is worth the cost when it produces observable, transferable, increasingly independent skills. The design determines the result.',
    quickAnswer: 'Tutoring is most likely to be worth the money when it starts with a diagnostic, targets a specific gap, uses consistent instruction and regular practice, and measures transfer to new work. Homework completion alone is weak evidence; look for accuracy, explanation, retention, and growing independence.',
    modifiedDate: DATE, articleSection: 'Tutoring decisions and progress', keywords: ['is tutoring worth it', 'is tutoring worth the money', 'does my child need a tutor', 'disadvantages of tutoring'],
    relatedPosts: [
      { title: 'Kumon vs Mathnasium vs RSM', href: '/growwise-blogs/kumon-vs-mathnasium-vs-rsm', description: 'Compare learning models against the gap your child needs to close.' },
      { title: 'Online vs. In-Person Tutoring', href: '/growwise-blogs/online-vs-in-person-tutoring', description: 'Choose a format that supports attention and consistent practice.' },
      { title: 'Questions to Ask a Tutor', href: '/growwise-blogs/questions-to-ask-a-tutor-before-hiring', description: 'Use a parent checklist before choosing a provider.' },
    ],
    programHref: '/academic', programLabel: 'Explore Academic Programs', ctaHeadline: 'Know what tutoring should change', ctaSubtext: 'GrowWise identifies the blocker, targets instruction, and reports progress in terms families can see.',
  },
  {
    filename: '12-kumon-vs-mathnasium-vs-rsm.md',
    image: '/images/blogs/tutoring-vs-teaching-structured-learning.webp', imageAlt: 'Parent comparing structured math learning options for a child',
    dek: 'Kumon, Mathnasium, and RSM use different learning models. The right choice depends on the specific gap, pace, and support your child needs.',
    quickAnswer: 'Kumon emphasizes self-paced worksheet practice, Mathnasium uses assessment-based center instruction, and RSM uses a structured conceptual curriculum in group classes. Compare each program’s assessment, practice, group size, homework, and progress measures against your child’s actual learning need.',
    modifiedDate: DATE, articleSection: 'Math tutoring comparisons', keywords: ['Kumon vs Mathnasium vs RSM', 'Kumon vs Mathnasium', 'Mathnasium vs RSM', 'math tutoring comparison'],
    relatedPosts: [
      { title: 'Kumon Alternative in Dublin, CA', href: '/resources/kumon-alternative-dublin-ca', description: 'See how a diagnostic-first local option differs.' },
      { title: 'Mathnasium Alternative in Dublin and Pleasanton', href: '/resources/mathnasium-alternative-dublin-pleasanton', description: 'Compare support models for Tri-Valley families.' },
      { title: 'RSM Alternative in Dublin, CA', href: '/resources/rsm-alternative-dublin-ca', description: 'Explore another option for conceptual math support.' },
    ],
    programHref: '/academic/math', programLabel: 'Explore Math Programs', ctaHeadline: 'Choose the model that fits the real gap', ctaSubtext: 'GrowWise begins with diagnosis, then uses targeted teaching and independent checks rather than a one-size-fits-all level.',
  },
  {
    filename: '13-online-vs-in-person-tutoring.md',
    image: '/images/blogs/tutoring-vs-teaching-structured-learning.webp', imageAlt: 'Student receiving focused tutoring support in a structured learning setting',
    dek: 'Online and in-person tutoring can both work. The better format is the one that supports attention, observation, consistency, and the student’s specific goal.',
    quickAnswer: 'Online tutoring can work well for focused older students and clear test-prep goals. In-person tutoring often helps younger students, screen-distracted learners, and gaps where the tutor must watch each step. Choose the format that allows consistent, targeted instruction and regular independent practice.',
    modifiedDate: DATE, articleSection: 'Tutoring formats', keywords: ['online vs in person tutoring', 'is online tutoring effective', 'online math tutoring', 'in-person tutoring near me'],
    relatedPosts: [
      { title: 'Is Tutoring Worth It?', href: '/growwise-blogs/is-tutoring-worth-it', description: 'Evaluate the design and evidence behind a tutoring service.' },
      { title: 'Small Group Tutoring vs. 1-on-1', href: '/resources/small-group-tutoring-vs-1-on-1', description: 'Compare formats by attention, cost, and independence.' },
      { title: 'Tutoring in Dublin, CA', href: '/resources/tutoring-dublin-ca', description: 'See GrowWise academic options for Tri-Valley families.' },
    ],
    programHref: '/academic', programLabel: 'Explore Tutoring Programs', ctaHeadline: 'Choose the format that supports learning', ctaSubtext: 'GrowWise diagnoses first, then recommends in-person, online, or a hybrid plan based on the student’s needs.',
  },
  {
    filename: '14-questions-to-ask-a-tutor-before-hiring.md',
    image: '/images/blogs/is-my-child-behind-grade-level-diagnostic.webp', imageAlt: 'Parent asking questions while reviewing a child’s tutoring assessment plan',
    dek: 'Price and schedule do not show whether tutoring will work. These questions reveal how a provider diagnoses gaps, teaches, and measures progress.',
    quickAnswer: 'Before hiring a tutor, ask how they will diagnose the gap, what the first session will show, who will teach each week, how practice is targeted, how progress is measured, and what happens if the plan is not working. Strong answers are specific, observable, and tied to your child.',
    modifiedDate: DATE, articleSection: 'Choosing a tutor', keywords: ['questions to ask a tutor', 'how to choose a tutor for your child', 'questions to ask a private tutor'],
    relatedPosts: [
      { title: 'Is Tutoring Worth It?', href: '/growwise-blogs/is-tutoring-worth-it', description: 'Understand what makes tutoring effective.' },
      { title: 'Best Tutoring in Dublin, CA', href: '/resources/best-tutoring-dublin-ca', description: 'Compare local tutoring questions, formats, and fit.' },
      { title: 'Book a Diagnostic Assessment', href: '/book-assessment', description: 'Start with a clearer picture of what your child needs.' },
    ],
    programHref: '/book-assessment', programLabel: 'Book a Diagnostic Assessment', ctaHeadline: 'Ask GrowWise all twelve questions', ctaSubtext: 'We will show you how assessment, targeted practice, and progress updates fit together before you choose.',
  },
  {
    filename: '15-math-olympiad-by-grade.md',
    image: '/images/blogs/good-grades-hidden-math-gaps.webp', imageAlt: 'Student solving a challenging contest math problem with written reasoning',
    dek: 'Competition math rewards reasoning through unfamiliar problems. The right contest and preparation depend on grade, eligibility, foundations, and curiosity.',
    quickAnswer: 'MOEMS serves elementary and middle school divisions, while AMC 8 is for students in grade 8 and below and AMC 10/12 serve older students. Start with strategy-based problem solving and explanation, then add contest practice after checking that core math foundations are secure.',
    modifiedDate: DATE, articleSection: 'Math competitions and enrichment', keywords: ['math olympiad for kids', 'math olympiad by grade', 'AMC 8 preparation', 'MOEMS math olympiad'],
    relatedPosts: [
      { title: 'Math Olympiad Camp in Dublin', href: '/camps/math-olympiad-camp-dublin-ca', description: 'Explore GrowWise competition-math enrichment.' },
      { title: 'California Math Standards by Grade', href: '/resources/california-math-standards-by-grade', description: 'Check the foundations behind advanced problem solving.' },
      { title: 'Math Programs', href: '/academic/math', description: 'Build conceptual understanding and flexible reasoning.' },
    ],
    programHref: '/camps/math-olympiad-camp-dublin-ca', programLabel: 'Explore Math Olympiad Camp', ctaHeadline: 'Build the reasoning behind competition math', ctaSubtext: 'GrowWise checks foundations, teaches problem-solving strategies, and makes explanations part of practice.',
  },
] as const

function extract(source: string, pattern: RegExp) {
  const match = source.match(pattern)
  if (!match) throw new Error(`Missing blog metadata: ${pattern}`)
  return match[1].trim()
}

function parseFaqs(source: string) {
  const section = source.match(/^## FAQ\n([\s\S]*?)(?=^## Internal links)/m)?.[1] ?? ''
  return section.split(/\n\n(?=\*\*)/).map((block) => {
    const match = block.trim().match(/^\*\*(.+?)\*\*\n([\s\S]+)$/)
    if (!match) return null
    return { question: match[1].trim(), answer: match[2].replace(/\s+/g, ' ').trim() }
  }).filter((faq): faq is { question: string; answer: string } => Boolean(faq))
}

function parseSources(source: string) {
  const section = source.match(/^## Sources\n([\s\S]*?)$/m)?.[1] ?? ''
  return [...section.matchAll(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm)].map((match) => ({ name: match[1].trim(), url: match[2] }))
}

function extractBody(source: string) {
  const headings = [...source.matchAll(/^# .+$/gm)]
  const articleHeading = headings[1]
  if (!articleHeading) throw new Error('Missing article H1')
  const start = articleHeading.index! + articleHeading[0].length
  const end = source.search(/^## FAQ/m)
  return source.slice(start, end === -1 ? undefined : end).trim()
}

function buildPost(config: DraftConfig): EditorialBlogPost {
  const source = readFileSync(join(SOURCE_DIR, config.filename), 'utf8')
  const slug = extract(source, /^\*\*Slug:\*\*\s*(.*)$/m).replace(/^\//, '').replace(/^growwise-blogs\//, '')
  const headings = [...source.matchAll(/^# (.+)$/gm)]
  const post = {
    ...config,
    slug,
    headline: headings[1]?.[1]?.trim() ?? headings[0]?.[1]?.trim() ?? slug,
    seoTitle: extract(source, /^\*\*SEO Title:\*\*\s*(.*)$/m),
    description: extract(source, /^\*\*Meta Description:\*\*\s*(.*)$/m),
    publishedDate: DATE,
    faqs: parseFaqs(source),
    sources: parseSources(source),
    body: <MarkdownBlogBody markdown={extractBody(source)} />,
  }
  return post
}

export const SEO_MANAGER_BLOG_POSTS: readonly EditorialBlogPost[] = CONFIG.map(buildPost)
