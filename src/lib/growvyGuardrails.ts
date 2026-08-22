import { CONTACT_INFO, OFFICE_HOURS } from '@/lib/constants';
import {
  CHATBOT_BRAND_NAME,
  CHATBOT_PUBLIC_CONTACT_EMAIL,
  formatChatbotApprovedCategoriesList,
} from '@/lib/chatbotScope';
import { CAMP_LANDING_PAGES } from '@/lib/camps/camp-data';

export type GrowvyDisposition = 'answer' | 'clarify' | 'refuse';
export type GrowvyReason =
  | 'approved-growwise-question'
  | 'ambiguous-growwise-question'
  | 'academic-work'
  | 'code-generation'
  | 'general-information'
  | 'competitor-or-market-information'
  | 'prompt-injection'
  | 'harmful-or-abusive'
  | 'not-growwise-specific'
  | 'unsupported-growwise-fact'
  | 'output-policy-failure';

export type GrowvyDecision = {
  disposition: GrowvyDisposition;
  reason: GrowvyReason;
  message: string;
  matchedKnowledgeIds: string[];
  formType?: 'assessment' | 'trial' | 'camp' | 'enroll' | 'contact';
};

type KnowledgeRecord = {
  id: string;
  name: string;
  aliases: readonly string[];
  overview: string;
  sourcePaths: readonly string[];
};

/**
 * Curated, public GrowWise facts only. Educational articles, source code,
 * testimonials with unverified outcome claims, and private pricing are
 * intentionally excluded from Growvy's answerable knowledge.
 */
const CORE_KNOWLEDGE: readonly KnowledgeRecord[] = [
  {
    id: 'program.stem',
    name: 'STEM Enrichment and Coding',
    aliases: ['stem', 'steam', 'coding', 'stem enrichment'],
    overview: 'GrowWise STEM enrichment includes approved program areas such as coding, game development, introductory AI and machine learning, robotics, workshops, and camps.',
    sourcePaths: ['public/api/mock/en/steam.json', 'src/lib/chatbotScope.ts'],
  },
  {
    id: 'program.math',
    name: 'Math',
    aliases: ['math', 'mathematics', 'algebra', 'geometry', 'calculus', 'integrated math', 'im1', 'im2'],
    overview: 'GrowWise offers math support from elementary foundations through advanced high-school math, including algebra, geometry, integrated math, and calculus readiness.',
    sourcePaths: ['public/api/mock/en/math-courses.json', 'src/lib/chatbotScope.ts'],
  },
  {
    id: 'program.english',
    name: 'English and Writing',
    aliases: ['english', 'writing', 'reading', 'grammar', 'ela', 'essay writing', 'creative writing'],
    overview: 'GrowWise offers English and writing support for Grades 3–12, including reading, grammar, essay writing, and creative writing.',
    sourcePaths: ['public/api/mock/en/english-courses.json', 'src/lib/chatbotScope.ts'],
  },
  {
    id: 'program.python',
    name: 'Python Programming',
    aliases: ['python', 'python programming', 'python coding'],
    overview: 'GrowWise offers Python Programming with fundamentals, object-oriented programming, data structures and algorithms, web development, API development, and project-based learning.',
    sourcePaths: ['public/api/mock/en/steam.json'],
  },
  {
    id: 'program.game-development',
    name: 'Game Development',
    aliases: ['game development', 'game design', 'roblox', 'scratch', 'minecraft', 'unity'],
    overview: 'GrowWise offers game-development programs that include Roblox Studio, Scratch, Minecraft modding, Unity basics, game-design principles, and introductory 3D modeling.',
    sourcePaths: ['public/api/mock/en/steam.json'],
  },
  {
    id: 'program.ai',
    name: 'AI and Machine Learning',
    aliases: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'prompt engineering', 'computer vision'],
    overview: 'GrowWise offers introductory AI and machine-learning programs covering approved course areas such as AI fundamentals, machine-learning basics, prompt engineering, computer vision, natural-language processing, and AI ethics.',
    sourcePaths: ['public/api/mock/en/steam.json'],
  },
  {
    id: 'program.robotics',
    name: 'Robotics',
    aliases: ['robotics', 'robot', 'robots'],
    overview: 'GrowWise offers robotics experiences as part of its STEM enrichment, workshops, and seasonal camp programming.',
    sourcePaths: ['src/lib/chatbotScope.ts', 'src/lib/llm.ts'],
  },
  {
    id: 'program.entrepreneurship',
    name: 'Young Entrepreneurs',
    aliases: ['young entrepreneurs', 'entrepreneurship', 'business program', 'startup basics'],
    overview: 'GrowWise offers a Young Entrepreneurs program covering business planning, leadership, brand building, financial literacy, marketing fundamentals, and presentation skills.',
    sourcePaths: ['public/api/mock/en/steam.json'],
  },
  {
    id: 'program.test-readiness',
    name: 'SAT and ACT Support',
    aliases: ['sat', 'act', 'test prep', 'test readiness'],
    overview: 'GrowWise offers SAT- and ACT-focused math and verbal support. Growvy can describe the service but cannot answer test questions or provide answer keys.',
    sourcePaths: ['src/lib/chatbotScope.ts', 'src/lib/llm.ts'],
  },
  {
    id: 'program.camps',
    name: 'Camps and Workshops',
    aliases: ['camp', 'camps', 'summer camp', 'winter camp', 'workshop', 'workshops'],
    overview: 'GrowWise runs seasonal camps and workshops across approved academic and STEM program areas. Current track, date, and seat details must be confirmed through the relevant camp page or the GrowWise team.',
    sourcePaths: ['src/lib/chatbotScope.ts', 'src/lib/chatbotPageContext.ts'],
  },
  {
    id: 'program.read-to-prove',
    name: 'Read to Prove',
    aliases: ['read to prove'],
    overview: 'Read to Prove is a GrowWise Academic Summer Sprint track for Grades 1–8 focused on reading comprehension, text evidence, main idea, and inference.',
    sourcePaths: ['src/i18n/messages/academic-summer-programs-hub-en.json'],
  },
  {
    id: 'program.write-to-explain',
    name: 'Write to Explain',
    aliases: ['write to explain'],
    overview: 'Write to Explain is a GrowWise Academic Summer Sprint track for Grades 1–8 focused on turning ideas into clear, structured writing.',
    sourcePaths: ['src/i18n/messages/academic-summer-programs-hub-en.json'],
  },
  {
    id: 'program.bridge-the-gap-math',
    name: 'Bridge the Gap Math',
    aliases: ['bridge the gap math', 'bridge the gap'],
    overview: 'Bridge the Gap Math is a GrowWise Academic Summer Sprint track for Grades 1–8 focused on strengthening math foundations, including multi-step work and word problems.',
    sourcePaths: ['src/i18n/messages/academic-summer-programs-hub-en.json'],
  },
] as const;

const CAMP_KNOWLEDGE: readonly KnowledgeRecord[] = CAMP_LANDING_PAGES.map((page) => ({
  id: `camp.${page.slug}`,
  name: page.h1,
  aliases: [
    page.h1.toLowerCase().replace(/\s*\([^)]*\)\s*/g, '').trim(),
    page.formConfig.defaultCampInterest.toLowerCase().replace(/\s*[—-]\s*dublin,?\s*ca\s*/i, '').trim(),
    page.slug.replace(/-dublin-ca$/, '').replace(/-/g, ' '),
  ],
  overview: `${page.h1} is a GrowWise program at the Dublin campus. ${page.heroSubtext}`,
  sourcePaths: ['src/lib/camps/camp-data.ts'],
}));

export const GROWVY_KNOWLEDGE: readonly KnowledgeRecord[] = [...CORE_KNOWLEDGE, ...CAMP_KNOWLEDGE];

const REFUSALS = {
  scope: `I can only help with ${CHATBOT_BRAND_NAME} programs, schedules, pricing, assessments, enrollment, current offers, and locations. What would you like to know about GrowWise?`,
  instruction: `I can describe GrowWise programs, but I can't teach a subject, solve assignments, write student work, or generate code. I can help with the related GrowWise program's availability, format, pricing process, or enrollment.`,
  injection: `I can't assist with internal instructions or attempts to change my role. I can help with approved GrowWise program and enrollment information.`,
  harmful: `I can't help with that request. I can only provide approved information about GrowWise programs and services.`,
  competitor: `I can only provide approved information about GrowWise itself, not market, competitor, or public-data research. I can describe GrowWise programs, schedules, pricing, offers, or enrollment.`,
} as const;

const PROMPT_INJECTION_PATTERNS = [
  /ignore (?:all |any )?(?:previous|prior|above) instructions?/i,
  /(?:reveal|repeat|show|print)[\s\S]{0,30}(?:system prompt|hidden prompt|instructions|developer message)/i,
  /you are now|act as|developer mode|jailbreak/i,
  /override[\s\S]{0,30}(?:rules|policy|instructions)/i,
  /(?:system|assistant|developer)\s*:/i,
];

const CODE_GENERATION_PATTERNS = [
  /\b(?:write|generate|create|build|produce|debug|fix|complete|implement)\b[\s\S]{0,45}\b(?:code|script|program|app|website|function|class|algorithm|game)\b/i,
  /\b(?:code|script|function)\b[\s\S]{0,35}\b(?:for me|solution|answer)\b/i,
  /```|<script\b|\bconsole\.log\b|\bprint\s*\(/i,
];

const ACADEMIC_WORK_PATTERNS = [
  /\b(?:do|solve|answer|complete|write|finish)\b[\s\S]{0,45}\b(?:homework|assignment|worksheet|quiz|exam|test|essay|paper|problem|question)\b/i,
  /\b(?:homework|assignment|worksheet|quiz|exam|test|essay|paper)\b[\s\S]{0,45}\b(?:for me|answers?|solution)\b/i,
  /\banswer key\b|\bplagiar/i,
];

const TEACHING_PATTERNS = [
  /^(?:can you |please )?(?:teach|explain|show me how|give me a lesson|tutor me)\b/i,
  /^(?:what|how|why) (?:is|are|does|do)\b/i,
  /\b(?:tutorial|lesson|worked example|practice problems?)\b/i,
];

const COMPETITOR_MARKET_PATTERNS = [
  /\b(?:competitor|competitors|market share|stock price|share price|crypto|bitcoin|investment|trading)\b/i,
  /\bcompare\b[\s\S]{0,30}\b(?:kumon|mathnasium|rsm|company|companies|provider|providers)\b/i,
  /\b(?:kumon|mathnasium|rsm)\b/i,
];

const GENERAL_INFORMATION_PATTERNS = [
  /\b(?:weather|news|politics|president|election|sports score|social media trends?|celebrity|recipe|travel|traffic)\b/i,
  /\b(?:medical|legal|financial) advice\b/i,
];

const HARMFUL_PATTERNS = [
  /\b(?:hack|malware|ransomware|phishing|steal|weapon|bomb|kill|hurt someone)\b/i,
  /\b(?:hate speech|sexual content)\b/i,
];

const ALLOWED_SERVICE_TERMS = [
  'course', 'courses', 'class', 'classes', 'program', 'programs',
  'offer', 'offers', 'available', 'availability', 'schedule', 'time', 'date', 'duration',
  'price', 'prices', 'pricing', 'cost', 'fee', 'credit', 'grade', 'grades', 'age', 'ages',
  'online', 'in person', 'in-person', 'location', 'address', 'phone', 'email', 'hours',
  'assessment', 'trial', 'enroll', 'enrollment', 'register', 'registration', 'camp', 'camps',
  'workshop', 'workshops', 'velp', 'velp1', 'activityhero', '6crickets',
] as const;

const OVERVIEW_TERMS = ['offer', 'offers', 'have', 'provide', 'available', 'about', 'details', 'cover', 'include', 'teach'] as const;
const PRICE_TERMS = ['price', 'prices', 'pricing', 'cost', 'fee', 'fees', 'how much'] as const;
const SCHEDULE_TERMS = ['schedule', 'time', 'times', 'date', 'dates', 'when', 'duration', 'how long', 'availability', 'available'] as const;

function normalize(input: string): string {
  return input.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9+\-\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function includesPhrase(input: string, phrase: string): boolean {
  return ` ${input} `.includes(` ${phrase} `);
}

function includesAny(input: string, phrases: readonly string[]): boolean {
  return phrases.some((phrase) => includesPhrase(input, phrase));
}

function matchKnowledge(input: string): KnowledgeRecord[] {
  const matches = GROWVY_KNOWLEDGE.filter((record) => record.aliases.some((alias) => includesPhrase(input, alias)));
  const campSpecific = matches.filter((record) => record.id.startsWith('camp.'));
  if (includesPhrase(input, 'camp') && campSpecific.length > 0) return campSpecific;
  const nonCampMatches = matches.filter((record) => !record.id.startsWith('camp.'));
  const longestAliasWords = Math.max(0, ...nonCampMatches.flatMap((record) => record.aliases.filter((alias) => includesPhrase(input, alias)).map((alias) => alias.split(' ').length)));
  const mostSpecific = nonCampMatches.filter((record) => record.aliases.some((alias) => includesPhrase(input, alias) && alias.split(' ').length === longestAliasWords));
  const withoutBroadStem = mostSpecific.filter((record) => record.id !== 'program.stem');
  return withoutBroadStem.length > 0 ? withoutBroadStem : mostSpecific;
}

function approvedProgramList(): string {
  return `GrowWise program areas include ${formatChatbotApprovedCategoriesList()}. Ask about a specific GrowWise program and I can share its approved details.`;
}

function contactAnswer(): GrowvyDecision {
  return {
    disposition: 'answer',
    reason: 'approved-growwise-question',
    matchedKnowledgeIds: ['business.contact'],
    message: `You can contact ${CHATBOT_BRAND_NAME} at ${CONTACT_INFO.phone}, email ${CHATBOT_PUBLIC_CONTACT_EMAIL}, or visit ${CONTACT_INFO.address}.`,
  };
}

function validateApprovedAnswer(message: string, matchedKnowledgeIds: readonly string[]): boolean {
  if (!message.trim() || matchedKnowledgeIds.length === 0) return false;
  if (/```|<script\b|\bdiscount\b/i.test(message)) return false;
  if (/\b(?:stock price|weather forecast|latest news|market share)\b/i.test(message)) return false;
  return true;
}

function approved(message: string, matchedKnowledgeIds: string[]): GrowvyDecision {
  if (!validateApprovedAnswer(message, matchedKnowledgeIds)) {
    return {
      disposition: 'refuse',
      reason: 'output-policy-failure',
      matchedKnowledgeIds: [],
      message: REFUSALS.scope,
    };
  }
  return { disposition: 'answer', reason: 'approved-growwise-question', message, matchedKnowledgeIds };
}

function refuse(reason: GrowvyReason, message: string): GrowvyDecision {
  return { disposition: 'refuse', reason, message, matchedKnowledgeIds: [] };
}

/**
 * Fail-closed Growvy decision engine. It never calls an LLM and never answers
 * from general model knowledge. A response is emitted only from approved,
 * source-attributed templates above.
 */
export function evaluateGrowvyRequest(rawInput: unknown, pageContextId = 'default'): GrowvyDecision {
  if (typeof rawInput !== 'string' || !rawInput.trim()) {
    return refuse('not-growwise-specific', REFUSALS.scope);
  }

  const input = normalize(rawInput);
  const records = matchKnowledge(input);
  const hasGrowWiseScope = includesPhrase(input, 'growwise') || includesPhrase(input, 'grow wise');
  const hasServiceIntent = includesAny(input, ALLOWED_SERVICE_TERMS);

  if (PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(rawInput))) {
    return refuse('prompt-injection', REFUSALS.injection);
  }
  if (HARMFUL_PATTERNS.some((pattern) => pattern.test(rawInput))) {
    return refuse('harmful-or-abusive', REFUSALS.harmful);
  }
  const codeGenerationMatched = CODE_GENERATION_PATTERNS.some((pattern) => pattern.test(rawInput));
  const namedWriteProgramQuestion = records.some((record) => record.id === 'program.write-to-explain') && hasServiceIntent && !/\b(?:code|script|app|function|algorithm|game)\b/i.test(rawInput);
  if (codeGenerationMatched && !namedWriteProgramQuestion) {
    return refuse('code-generation', REFUSALS.instruction);
  }
  if (COMPETITOR_MARKET_PATTERNS.some((pattern) => pattern.test(rawInput))) {
    return refuse('competitor-or-market-information', REFUSALS.competitor);
  }
  if (GENERAL_INFORMATION_PATTERNS.some((pattern) => pattern.test(rawInput))) {
    return refuse('general-information', REFUSALS.scope);
  }
  const isNamedGrowWiseTrack = records.some((record) => record.id.startsWith('camp.') || ['program.read-to-prove', 'program.write-to-explain', 'program.bridge-the-gap-math'].includes(record.id));
  const growWiseFactQuestion = records.length > 0 && /^(?:what|how|why)\b/i.test(input) && (hasGrowWiseScope || isNamedGrowWiseTrack);
  if (ACADEMIC_WORK_PATTERNS.some((pattern) => pattern.test(rawInput)) || (TEACHING_PATTERNS.some((pattern) => pattern.test(rawInput)) && !hasServiceIntent && !growWiseFactQuestion)) {
    return refuse('academic-work', REFUSALS.instruction);
  }

  if (/^(?:hi|hello|hey|good morning|good afternoon|good evening)\b/i.test(input)) {
    return approved(`Hello! I can help with GrowWise programs, schedules, pricing, assessments, enrollment, current offers, and locations. What GrowWise information do you need?`, ['business.scope']);
  }
  if (/^(?:thanks|thank you|ok|okay)\b/i.test(input)) {
    return approved(`You're welcome. I can help with GrowWise programs, schedules, pricing, assessments, enrollment, current offers, and locations.`, ['business.scope']);
  }

  if (includesAny(input, ['phone', 'email', 'contact', 'address', 'location', 'where are you located', 'reach you'])) {
    return contactAnswer();
  }
  if (includesAny(input, ['hours', 'open', 'close', 'closing'])) {
    return approved(`${CHATBOT_BRAND_NAME} office hours are ${OFFICE_HOURS.summary}.`, ['business.hours']);
  }
  if (includesAny(input, ['assessment', 'trial'])) {
    const result = approved(`GrowWise offers complimentary assessments or trial-style experiences for many programs; details vary by track. The team can confirm the appropriate next step for your child.`, ['service.assessment']);
    if (includesAny(input, ['book', 'schedule', 'request', 'sign up'])) result.formType = includesPhrase(input, 'trial') ? 'trial' : 'assessment';
    return result;
  }
  if (includesAny(input, ['enroll', 'enrollment', 'register', 'registration', 'sign up'])) {
    return { ...approved(`GrowWise can help you choose the appropriate program and complete enrollment. Share the student's grade and the GrowWise program of interest, or use the enrollment form on this page.`, ['service.enrollment']), formType: 'enroll' };
  }
  if (includesPhrase(input, 'velp') || includesPhrase(input, 'velp1')) {
    return approved(`For eligible Velp families, a 10% credit will be applied toward the current month's fee after assessment confirmation. The partner code is VELP1.`, ['offer.velp']);
  }
  if (PRICE_TERMS.some((term) => input.includes(term))) {
    const subject = records.length === 1 ? ` for ${records[0].name}` : '';
    return approved(`Current GrowWise pricing${subject} depends on the program and recommended placement. GrowWise will provide the applicable current fee after learning the student's grade and goals; I won't invent or estimate a price.`, ['policy.pricing', ...records.map((record) => record.id)]);
  }
  if (SCHEDULE_TERMS.some((term) => input.includes(term))) {
    const subject = records.length === 1 ? ` for ${records[0].name}` : '';
    return approved(`GrowWise schedules and availability${subject} can change. Please use the relevant program or camp page, or contact ${CONTACT_INFO.phone} to confirm the current options.`, ['policy.schedule', ...records.map((record) => record.id)]);
  }

  if (records.length === 1 && (hasServiceIntent || hasGrowWiseScope || isNamedGrowWiseTrack || OVERVIEW_TERMS.some((term) => input.includes(term)))) {
    return approved(records[0].overview, [records[0].id]);
  }
  if (records.length > 1 && (hasServiceIntent || hasGrowWiseScope)) {
    return {
      disposition: 'clarify',
      reason: 'ambiguous-growwise-question',
      matchedKnowledgeIds: records.map((record) => record.id),
      message: `I found more than one GrowWise program in that question: ${records.map((record) => record.name).join(', ')}. Which program would you like approved details about?`,
    };
  }
  if (includesAny(input, ['program', 'programs', 'course', 'courses', 'class', 'classes']) && hasServiceIntent) {
    return approved(approvedProgramList(), ['catalog.programs']);
  }

  if (records.length > 0 || hasGrowWiseScope || pageContextId !== 'default') {
    return {
      disposition: 'clarify',
      reason: 'unsupported-growwise-fact',
      matchedKnowledgeIds: records.map((record) => record.id),
      message: `I can help only with approved GrowWise program, schedule, pricing, assessment, enrollment, offer, and location details. Please ask for one of those GrowWise details.`,
    };
  }

  return refuse('not-growwise-specific', REFUSALS.scope);
}

export function getGrowvyKnowledgeSources(): readonly { id: string; sourcePaths: readonly string[] }[] {
  return GROWVY_KNOWLEDGE.map(({ id, sourcePaths }) => ({ id, sourcePaths }));
}
