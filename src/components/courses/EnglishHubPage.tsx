import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers,
  MessageSquareText,
  PenLine,
  Phone,
  Quote,
  SearchCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { ENGLISH_COURSE_VISIBLE_FAQS } from '@/lib/schema/course-hub-jsonld-faqs'
import { CONTACT_INFO } from '@/lib/constants'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'

type EnglishHubPageProps = {
  locale: string
}

const heroStats = [
  'Grades 1-8',
  'Small groups of 6-10',
  'In-person in Dublin or live online',
  'Free first assessment',
]

const programCards = [
  {
    title: 'English Mastery',
    grade: 'Grades 1-8',
    href: '#programs',
    description:
      'Reading comprehension, writing structure, grammar, vocabulary, and essay skills taught together through a grade-aware curriculum.',
    skills: [
      'Reading comprehension strategies',
      'Paragraph and essay structure',
      'Grammar and sentence variety',
      'Vocabulary in context',
      'Literary analysis and inference',
      'Argumentative writing with evidence',
    ],
    price: '$289/mo',
    detail: '120 min/week - 3-month program',
    featured: true,
  },
  {
    title: 'Young Authors',
    grade: 'Grades 3-5 specialist cohort',
    href: '#young-authors',
    description:
      'A fixed creative writing cohort where students learn story structure, develop voice, revise their work, and finish one complete piece.',
    skills: [
      'Narrative and creative story structure',
      'Character development and dialogue',
      'Finding and developing writing voice',
      'Revision and editing habits',
      'Complete published piece at the end',
    ],
    price: '$295 total',
    detail: '12 sessions - fixed cohort',
    featured: false,
  },
]

const situations = [
  {
    icon: Target,
    title: 'Falling behind in class',
    symptom: 'Grades dropping, essay avoidance, vague written answers',
    body:
      'When English grades drop, the cause is often an earlier skill gap that has not been named yet. We use the assessment to identify whether the issue is comprehension, structure, grammar, or vocabulary, then build from that point.',
  },
  {
    icon: PenLine,
    title: 'Writing is weak',
    symptom: 'Short essays, missing argument, weak evidence',
    body:
      'Students who write vague essays often know what they want to say, but do not yet have a structure for saying it. We teach paragraph-level organization first, then move into essay-level writing.',
  },
  {
    icon: BookOpen,
    title: "Reads but doesn't comprehend",
    symptom: 'Fluent decoding, weak summary or inference',
    body:
      'A student can read words correctly and still miss the meaning. We target main idea, inference, author purpose, and text-level understanding directly.',
  },
  {
    icon: GraduationCap,
    title: 'Preparing for middle school',
    symptom: 'Grade 5 student heading into higher English expectations',
    body:
      'Middle school English expects structured paragraphs, evidence from text, and independent revision. We build those habits before the transition becomes stressful.',
  },
  {
    icon: Sparkles,
    title: 'Doing well and ready for more',
    symptom: 'Strong student, advanced writing or analysis goals',
    body:
      'For students already on track, we deepen essay complexity, literary analysis, multi-source arguments, and sentence control so strong skills keep compounding.',
  },
  {
    icon: ClipboardCheck,
    title: 'Needs year-round structure',
    symptom: 'Does well with support, slips without a routine',
    body:
      'A defined 3-month program gives students a weekly rhythm, measurable skills, and parent progress updates without turning English into open-ended tutoring.',
  },
]

const augustEnglishSearchCards = [
  {
    title: 'Comparing English tutoring options?',
    body:
      'Parents searching Kumon, tutoring centers, reading tutors, or writing classes are usually deciding whether the problem is practice volume, comprehension, grammar, or writing structure. GrowWise starts with a diagnostic so the first month targets the right gap.',
    href: '/resources/english-tutor-vs-reading-tutor-vs-writing-class',
    cta: 'Compare English options',
  },
  {
    title: 'Heading into a harder writing year?',
    body:
      'August is the window to strengthen paragraph structure, evidence, grammar, and vocabulary before essays and book reports start stacking up.',
    href: '/academic/english/elementary',
    cta: 'See elementary English support',
  },
  {
    title: 'Need a reading or writing tutor near Dublin?',
    body:
      'For Dublin, Pleasanton, San Ramon, and Tri-Valley families, the question is not just “who tutors English?” It is whether the program can name the exact comprehension or writing blocker.',
    href: '/book-assessment',
    cta: 'Book English assessment',
  },
] as const

const steps = [
  {
    eyebrow: 'Free',
    title: 'Assessment',
    body:
      'We map reading comprehension, writing structure, grammar patterns, and vocabulary range to find the real gap, not just the subject label.',
  },
  {
    eyebrow: 'Placement',
    title: 'Program fit and entry point',
    body:
      'Assessment results help clarify current reading and writing level, so families can choose the right program and start at an appropriate skill entry point.',
  },
  {
    eyebrow: '3-month program',
    title: 'Defined curriculum and progress updates',
    body:
      'Students attend 120 minutes per week. Families receive progress updates on skills covered, writing growth, and recommended next steps.',
  },
]

const skillAreas = [
  {
    icon: BookOpen,
    title: 'Reading',
    items: ['Main idea and detail', 'Inference', "Author's purpose", 'Text comparison', 'Summarizing'],
  },
  {
    icon: PenLine,
    title: 'Writing',
    items: ['Paragraph structure', 'Transitions', 'Sentence variety', 'Revision habits', 'Voice and clarity'],
  },
  {
    icon: Layers,
    title: 'Grammar',
    items: ['Parts of speech', 'Subject-verb agreement', 'Punctuation', 'Tense consistency', 'Complex sentences'],
  },
  {
    icon: MessageSquareText,
    title: 'Vocabulary',
    items: ['Context clues', 'Root words', 'Academic vocabulary', 'Word choice', 'Figurative language'],
  },
  {
    icon: FileText,
    title: 'Essay Writing',
    items: ['Thesis construction', 'Evidence integration', 'Argument structure', 'Introductions', 'Literary analysis'],
  },
]

const pricingOptions = [
  {
    id: 'english-mastery',
    name: 'English Mastery',
    grade: 'Grades 1-8',
    track: 'Reading - Writing - Grammar - Vocabulary - Essay Writing',
    price: '$289',
    per: '/month',
    schedule: '120 min/week - 3-month program',
    note: 'Best for students who need a complete English foundation or consistent ELA support.',
    featured: true,
  },
  {
    id: 'essay-writing',
    name: 'Essay Writing Focus',
    grade: 'Grades 4-8',
    track: 'Paragraphs - Essays - Evidence - Revision',
    price: '$289',
    per: '/month',
    schedule: '120 min/week - 3-month program',
    note: 'Best when reading is steady but written responses, paragraphs, or essays need direct structure.',
    featured: false,
  },
  {
    id: 'young-authors',
    name: 'Young Authors',
    grade: 'Grades 3-5',
    track: 'Creative Writing - Story Structure - Voice - Publishing',
    price: '$295',
    per: 'total',
    schedule: '12 sessions - fixed cohort',
    note: 'Best for creative writers who want to complete and polish one full piece.',
    featured: false,
  },
]

const reviews = [
  {
    quote:
      'GrowWise has been such a wonderful experience for my daughter. Her tutor has been patient, encouraging, and attentive to her individual learning needs.',
    author: 'Dublin Parent',
  },
  {
    quote:
      'The lessons are engaging and tailored to her pace, which has made learning enjoyable instead of stressful.',
    author: 'Tri-Valley Parent',
  },
  {
    quote:
      "Thanks to the small class size and the teacher's personalized approach, my child was able to grasp the fundamentals and actually enjoy the process.",
    author: 'Pleasanton Parent',
  },
]

const resources = [
  {
    tag: 'Free Tool',
    title: 'Math & Reading Readiness Checklist',
    body: 'Check observable signs across reading, writing, and math before choosing a support path.',
    href: '/readinesschecklist',
  },
  {
    tag: 'Guide',
    title: 'English Tutor vs. Reading Tutor vs. Writing Class',
    body: 'Choose the right support before August by separating reading, comprehension, grammar, writing, and confidence gaps.',
    href: '/resources/english-tutor-vs-reading-tutor-vs-writing-class',
  },
  {
    tag: 'Guide',
    title: 'Reading Fluency vs. Reading Comprehension',
    body: 'Why a child who reads aloud smoothly may still struggle to explain what they read.',
    href: '/resources/reading-fluency-vs-comprehension',
  },
  {
    tag: 'Guide',
    title: 'Why Your Child Struggles With Writing',
    body: 'Blank-page freeze, short answers, weak paragraphs, and writing avoidance can signal different gaps.',
    href: '/resources/child-struggles-with-writing-dublin-ca',
  },
  {
    tag: 'Blog',
    title: "Child Reads but Doesn't Understand",
    body: 'A parent guide for the common gap between decoding words and understanding meaning.',
    href: '/growwise-blogs/child-reads-but-doesnt-understand-passage',
  },
]

function SectionIntro({
  eyebrow,
  title,
  body,
  inverse = false,
}: {
  eyebrow: string
  title: string
  body?: string
  inverse?: boolean
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F16112]">{eyebrow}</p>
      <h2
        className={`font-heading mt-3 text-2xl font-black leading-tight md:text-3xl ${
          inverse ? 'text-white' : 'text-[#1F396D]'
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-3 text-sm leading-relaxed md:text-base ${inverse ? 'text-white/70' : 'text-slate-600'}`}>
          {body}
        </p>
      ) : null}
    </div>
  )
}

export function EnglishHubPage({ locale }: EnglishHubPageProps) {
  const assessmentHref = publicPath('/book-assessment', locale)
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`

  return (
    <div className="min-h-screen bg-white font-sans">
      <Breadcrumbs
        noSchema
        items={[
          { name: 'Academic', url: absoluteSiteUrl('/academic', locale) },
          { name: 'English Programs', url: absoluteSiteUrl('/academic/english', locale) },
        ]}
      />

      <main>
        <section className="relative isolate min-h-[32rem] overflow-hidden bg-[#1F396D]" aria-label="English programs hero">
          <div className="absolute inset-0">
            <Image
              src="/assets/students_growwise.webp"
              alt="GrowWise students working together in a small learning group"
              width={1600}
              height={900}
              priority
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/45" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#102542]/95 via-[#1F396D]/82 to-[#1F396D]/20"
              aria-hidden
            />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-20 lg:py-24">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FED7AA]">
              English Programs - Grades 1-8
            </p>
            <h1 className="font-heading mt-6 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
              English Reading &amp; Writing Classes for Grades 1-8 in Dublin, CA
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              Reading comprehension, writing structure, grammar, vocabulary, and essay skills
              taught through diagnostic-based small-group instruction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={assessmentHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F16112] px-6 py-3 text-sm font-black text-white transition-colors hover:bg-[#d64f0d]"
              >
                Book free assessment
              </Link>
              <Link
                href="#programs"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-black text-white transition-colors hover:bg-white/10"
              >
                See programs and pricing
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Program highlights">
              {heroStats.map((stat) => (
                <li
                  key={stat}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F1894F]" aria-hidden />
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="Start with the job"
              title="What are you trying to solve?"
              body="Most families arrive with a symptom. We use that symptom to identify the skill gap, then show which program is built for that need."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {situations.map(({ icon: Icon, title, symptom, body }) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF7ED] text-[#F16112]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-black text-[#1F396D]">{title}</h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-[#F16112]">{symptom}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-12 md:py-20" aria-labelledby="august-english-search-heading">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="August back-to-school searches"
              title="Parents compare English tutors before the first essay gets assigned."
              body="Searches for English tutor, reading tutor, writing classes, and tutoring centers rise before school starts. These pages need to answer what kind of English help the child actually needs."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {augustEnglishSearchCards.map((card) => (
                <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-[#1F396D]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
                  <Link
                    href={publicPath(card.href, locale)}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-black text-[#F16112] hover:text-[#C45A1A]"
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="Programs"
              title="Two separate English programs."
              body="English Mastery is the core grades 1-8 program. Young Authors is a separate creative writing cohort for grades 3-5."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {programCards.map((program) => (
                <Link
                  key={program.title}
                  href={program.href}
                  className={`group rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    program.featured ? 'border-[#F16112]/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">{program.grade}</p>
                      <h3 className="font-heading mt-2 text-2xl font-black text-[#1F396D]">{program.title}</h3>
                    </div>
                    <ArrowRight className="mt-2 h-5 w-5 text-[#F16112] transition group-hover:translate-x-1" aria-hidden />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{program.description}</p>
                  <ul className="mt-5 grid gap-2">
                    {program.skills.map((skill) => (
                      <li key={skill} className="flex gap-2 text-sm text-slate-800">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-[#FED7AA] bg-[#FFF7ED] px-4 py-3">
                    <span className="font-heading text-2xl font-black text-[#1F396D]">{program.price}</span>
                    <span className="text-right text-xs font-semibold leading-relaxed text-slate-600">{program.detail}</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-slate-600">
              Looking for a grade-specific starting point?{' '}
              <Link
                href={publicPath('/academic/english/elementary', locale)}
                className="font-bold text-[#1F396D] underline decoration-[#F16112]/60 underline-offset-4 hover:text-[#F16112]"
              >
                Explore elementary reading and writing support
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="How it works"
              title="Every program starts with a diagnostic. Not a placement test - a pattern finder."
              body="Before the first session. No charge. No commitment."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="border-l-4 border-slate-200 bg-white py-2 pl-5">
                  <span className="font-heading text-4xl font-black text-[#F16112]/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">{step.eyebrow}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1F396D]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#173257] px-5 py-14 text-white md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="What's covered"
              title="Five skill areas. Taught together, not in isolation."
              body="Reading, writing, grammar, vocabulary, and essay skills compound each other. The program connects them instead of treating each skill as a separate worksheet."
              inverse
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {skillAreas.map(({ icon: Icon, title, items }) => (
                <article key={title} className="rounded-lg border border-white/10 bg-white/5 p-5">
                  <Icon className="h-6 w-6 text-[#F1894F]" aria-hidden />
                  <h3 className="mt-4 font-black text-white">{title}</h3>
                  <ul className="mt-3 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-white/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="Programs - 3-month commitment"
              title="Defined programs. Not open-ended tutoring."
              body="Each program has a diagnostic, a clear curriculum scope, and a visible price before enrollment."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {pricingOptions.map((option) => (
                <article
                  key={option.id}
                  id={option.id === 'young-authors' ? 'young-authors' : undefined}
                  className={`rounded-lg border bg-white shadow-sm ${
                    option.featured ? 'border-[#F16112] ring-1 ring-[#F16112]/20' : 'border-slate-200'
                  }`}
                >
                  <div className={`rounded-t-lg px-5 py-5 ${option.featured ? 'bg-[#1F396D]' : 'bg-slate-50'}`}>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">{option.grade}</p>
                    <h3 className={`font-heading mt-2 text-xl font-black ${option.featured ? 'text-white' : 'text-[#1F396D]'}`}>
                      {option.name}
                    </h3>
                    <p className={`mt-2 text-xs leading-relaxed ${option.featured ? 'text-white/70' : 'text-slate-500'}`}>
                      {option.track}
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-end gap-2">
                      <span className="font-heading text-4xl font-black text-[#1F396D]">{option.price}</span>
                      <span className="pb-1 text-sm font-bold text-slate-500">{option.per}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{option.schedule}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{option.note}</p>
                    <Link
                      href={assessmentHref}
                      className={`mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-black transition-colors ${
                        option.featured
                          ? 'bg-[#F16112] text-white hover:bg-[#d64f0d]'
                          : 'bg-[#1F396D] text-white hover:bg-[#142b45]'
                      }`}
                    >
                      {option.id === 'young-authors' ? 'Ask about Young Authors' : 'Book free assessment'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
              English Mastery and Essay Writing Focus are $289/month with a 3-month program and 120 minutes per week.
              Young Authors is a fixed 12-session program at $295 total. Contact us for schedule and availability:
              {' '}
              {CONTACT_INFO.phone}
            </p>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="Parent feedback"
              title="Trusted by Dublin and Tri-Valley families."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <figure key={review.quote} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Quote className="h-6 w-6 text-[#F16112]" aria-hidden />
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
                    "{review.quote}"
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-black text-[#1F396D]">{review.author}</figcaption>
                  <p className="mt-1 text-xs font-semibold text-slate-500">5-star Google review</p>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="Free parent guides"
              title="Understand the gap before you choose a program."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={publicPath(resource.href, locale)}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#F16112]/50 hover:shadow-md"
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#F16112]">{resource.tag}</p>
                  <h3 className="mt-3 text-base font-black text-[#1F396D]">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{resource.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#F16112]">
                    Open resource
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionIntro eyebrow="Common questions" title="English program FAQs" />
            <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {ENGLISH_COURSE_VISIBLE_FAQS.map((faq) => (
                <details key={faq.question} className="group p-5 open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-black text-[#1F396D]">
                    {faq.question}
                    <SearchCheck className="h-5 w-5 shrink-0 text-[#F16112]" aria-hidden />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1F396D] px-5 py-16 text-white md:px-12 md:py-20" aria-labelledby="english-final-cta-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="english-final-cta-heading" className="font-heading text-3xl font-black md:text-4xl">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              A free assessment identifies the real gap, places your child in the right program,
              and gives you a concrete plan before you pay anything.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={assessmentHref}
                className="inline-flex min-h-12 min-w-[210px] items-center justify-center rounded-full bg-[#F16112] px-6 py-3 text-sm font-black text-white transition-colors hover:bg-[#d64f0d]"
              >
                Book free assessment
              </Link>
              <Link
                href={publicPath('/readinesschecklist', locale)}
                className="inline-flex min-h-12 min-w-[210px] items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-black text-white transition-colors hover:bg-white/10"
              >
                Take the checklist first
              </Link>
              <a
                href={phoneHref}
                className="inline-flex min-h-12 min-w-[210px] items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-black text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {CONTACT_INFO.phone}
              </a>
            </div>
            <p className="mt-6 text-xs font-semibold text-white/45">
              {CONTACT_INFO.address} - Also available online nationwide
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
