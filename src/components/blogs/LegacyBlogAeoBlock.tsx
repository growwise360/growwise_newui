import { generateFAQPageSchema } from '@/lib/seo/structuredData'

type LegacyBlogAeoEntry = {
  answer: string
  questionHeading: string
  context: string
  faqs: ReadonlyArray<{
    question: string
    answer: string
  }>
}

export const legacyBlogAeoBySlug = {
  'embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise': {
    answer:
      'GrowWise helps students keep pace with technology by combining structured coding paths, hands-on projects, and feedback that shows learners what to fix next. The goal is not just to finish lessons, but to build durable programming habits.',
    questionHeading: 'How does GrowWise help students build future-ready coding skills?',
    context:
      'The article explains why generic tutorials are not enough for long-term growth. Students need a clear sequence, project practice, review, and a community that keeps them moving from basics toward real applications.',
    faqs: [
      {
        question: 'What makes a coding path future-ready?',
        answer:
          'A future-ready coding path teaches fundamentals first, then uses projects, feedback, and emerging technologies so students can transfer skills beyond one tool or tutorial.',
      },
      {
        question: 'Why does feedback matter when learning to code?',
        answer:
          'Feedback helps students catch errors, understand why code behaves a certain way, and improve their approach before weak habits become automatic.',
      },
    ],
  },
  'harnessing-the-power-of-code-a-skill-for-the-modern-era': {
    answer:
      'Coding is a modern literacy because it teaches students how digital tools work and how to solve problems step by step. The post frames coding as useful across careers, not only for students who already plan to become software engineers.',
    questionHeading: 'Why is coding considered a modern literacy for students?',
    context:
      'The article connects coding to digital literacy, problem-solving, and career readiness across healthcare, finance, education, entertainment, and manufacturing.',
    faqs: [
      {
        question: 'Does every student need to become a programmer?',
        answer:
          'No. The value is that coding builds logical thinking and digital confidence, even when a student later works outside traditional software roles.',
      },
      {
        question: 'What skills does coding build besides syntax?',
        answer:
          'Coding builds decomposition, pattern recognition, debugging, persistence, and the ability to turn an idea into a working digital project.',
      },
    ],
  },
  'how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations': {
    answer:
      'Coding skills prepare students to work with AI because AI systems are built, tested, and improved through code. Students who understand programming can move from using AI tools to shaping how those tools solve real problems.',
    questionHeading: 'How do coding skills connect to future AI innovation?',
    context:
      'The article explains that AI depends on programming fundamentals, data handling, logic, and experimentation. Coding gives students the base needed to understand and build with AI.',
    faqs: [
      {
        question: 'Can students learn AI without coding?',
        answer:
          'Students can use AI tools without coding, but coding helps them understand how systems work, test ideas, and build more original AI-powered projects.',
      },
      {
        question: 'Which coding skills help with AI projects?',
        answer:
          'Helpful skills include Python basics, logical problem-solving, debugging, data structures, and the patience to test and revise a model or program.',
      },
    ],
  },
  'how-programming-skills-on-a-resume-will-open-more-career-opportunities': {
    answer:
      'Programming skills strengthen a student profile because they show problem-solving, technical fluency, persistence, and project evidence. The post explains how coding helps students move from interest in technology to finished work they can explain.',
    questionHeading: 'Why do programming skills strengthen student profiles?',
    context:
      'The article focuses on project evidence, student confidence, and how programming experience helps learners stand out when they can apply the skill.',
    faqs: [
      {
        question: 'Do programming skills help outside computer science classes?',
        answer:
          'Yes. Programming supports data analysis, automation, design, research, robotics, AI, and many other student projects where digital problem-solving matters.',
      },
      {
        question: 'What should students show in a coding profile?',
        answer:
          'Students should show real projects, the language used, the problem solved, and what they personally built, tested, or improved.',
      },
    ],
  },
  'how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide': {
    answer:
      "The right summer camp matches a child's interests, maturity, and need for structure. Parents should look for safe supervision, clear activities, age-appropriate challenge, and a camp format that leaves the child more confident, not exhausted.",
    questionHeading: 'How should parents choose the right summer camp?',
    context:
      'The article walks parents through interests, camp types, safety, schedules, staff quality, and the difference between entertainment-only camps and growth-oriented programs.',
    faqs: [
      {
        question: 'What should parents ask before choosing a camp?',
        answer:
          'Parents should ask about staff supervision, daily structure, student grouping, safety procedures, project outcomes, and how the camp supports children who need help joining in.',
      },
      {
        question: 'Is an academic camp still supposed to be fun?',
        answer:
          'Yes. A strong academic camp uses projects, teamwork, and visible progress so learning feels active rather than like extra schoolwork.',
      },
    ],
  },
  'how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux': {
    answer:
      'A Roblox player becomes a game developer by learning how games are designed, scripted, tested, and improved. The post shows how screen time can become productive when a child moves from playing games to building interactive experiences.',
    questionHeading: 'How can a Roblox player become a game developer?',
    context:
      'The article covers Roblox Studio, Lua scripting, game design, testing, and why structured learning helps students turn interest into technical skill.',
    faqs: [
      {
        question: 'Is Roblox development real coding?',
        answer:
          'Yes. Roblox development uses Lua scripting, logic, variables, events, testing, and design thinking, which are transferable programming foundations.',
      },
      {
        question: 'Why does structured Roblox learning help?',
        answer:
          'Structure helps students move beyond copying ideas. They learn how to plan a game, debug scripts, improve player experience, and finish a project.',
      },
    ],
  },
  'how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide': {
    answer:
      'Parents can identify learning gaps at home by watching for repeated mistake patterns, asking children to explain their reasoning, and comparing homework confidence with independent performance. A stable pattern matters more than one bad score.',
    questionHeading: 'How can parents spot learning gaps at home?',
    context:
      'The article recommends simple observation, open conversations, review of schoolwork, informal checks, and early action before a gap compounds.',
    faqs: [
      {
        question: 'What is a learning gap?',
        answer:
          'A learning gap is a missing or misunderstood concept that keeps showing up across assignments, even when the child works hard.',
      },
      {
        question: 'When should parents seek outside help?',
        answer:
          'Parents should seek help when the same error pattern keeps returning, when confidence drops, or when the child can follow examples but cannot explain the work independently.',
      },
    ],
  },
  'improve-child-focus-feel-valued': {
    answer:
      "A child's focus improves when the task is understandable, the environment feels emotionally safe, and expectations are broken into manageable steps. The post argues that focus is learned through support, not demanded through pressure.",
    questionHeading: 'What helps a child focus when they feel overwhelmed?',
    context:
      'The article connects focus to confidence, task clarity, emotional safety, routines, and parent presence. It avoids treating every focus issue as laziness or defiance.',
    faqs: [
      {
        question: 'Why does my child lose focus during homework?',
        answer:
          'A child may lose focus because the task is confusing, too long, emotionally stressful, or connected to a learning gap they are trying to avoid.',
      },
      {
        question: 'How can parents help without nagging?',
        answer:
          'Parents can reduce directions, sit nearby, ask where the task became confusing, and use short work periods with visible small wins.',
      },
    ],
  },
  'technical-schools-in-2025-a-smart-investment-for-your-career': {
    answer:
      'Technical skills are valuable before college because they help students test interests, build practical confidence, and create project evidence. The post frames technical learning as a way to give students direction before major school or career decisions.',
    questionHeading: 'Why should students build technical skills before college?',
    context:
      'The article explains why future readiness increasingly depends on usable skills, not only credentials, and why coding and technical programs help students move from learning to application.',
    faqs: [
      {
        question: 'What should a good technical program include?',
        answer:
          'A strong technical program should include fundamentals, hands-on practice, feedback, real projects, and clear evidence of what the learner can build.',
      },
      {
        question: 'Are technical skills useful before college?',
        answer:
          'Yes. Early technical skills help students test interests, build confidence, and create projects that make future coursework more meaningful.',
      },
    ],
  },
  'the-advantage-in-choosing-the-right-coding-class-for-your-child': {
    answer:
      'The right coding class gives a child structure, feedback, and projects that match their level. A strong class does more than entertain: it helps students learn concepts, debug mistakes, and build confidence through finished work.',
    questionHeading: 'What should parents look for in a coding class?',
    context:
      'The article compares class quality, project-based learning, instructor support, online vs. in-person formats, and how parents can choose a path that fits their child.',
    faqs: [
      {
        question: 'How do I know if a coding class is too easy?',
        answer:
          'It may be too easy if the child only follows instructions, never explains decisions, and does not have to debug or improve their own project.',
      },
      {
        question: 'Why are projects important in coding classes?',
        answer:
          'Projects show whether a student can apply concepts, make decisions, fix errors, and complete something that works.',
      },
    ],
  },
  'the-importance-of-coding-for-kids-building-future-ready-skills': {
    answer:
      'Coding helps kids build future-ready skills by teaching logic, creativity, persistence, and structured problem-solving. The post explains that coding is valuable because children learn how to create with technology instead of only consuming it.',
    questionHeading: 'Why is coding important for kids?',
    context:
      'The article covers problem-solving, creativity, early exposure, and the non-technical habits students build when they learn to design and debug programs.',
    faqs: [
      {
        question: 'What age should kids start coding?',
        answer:
          'Kids can start with visual and logic-based coding when they are ready to follow patterns, explain choices, and experiment with cause and effect.',
      },
      {
        question: 'Does coding help with school skills?',
        answer:
          'Yes. Coding supports planning, sequencing, reading instructions carefully, math reasoning, and persistence through mistakes.',
      },
    ],
  },
  'thinking-gap-your-kids-arent-distracted': {
    answer:
      'Some children who look distracted are actually stuck in a thinking gap. The post explains that when students lack a strategy or concept, they may appear unfocused even though the real issue is confusion, weak retrieval, or missing practice.',
    questionHeading: 'Is my child distracted or stuck in a thinking gap?',
    context:
      'The article reframes attention problems by asking whether the child understands the task, can explain the next step, and has enough practice to work independently.',
    faqs: [
      {
        question: 'What is a thinking gap?',
        answer:
          'A thinking gap is the moment when a student cannot choose the next step because a concept, strategy, or reasoning pattern is missing.',
      },
      {
        question: 'How can parents tell the difference from distraction?',
        answer:
          'Ask the child to explain the first step. If they cannot explain what to do or why, the issue may be a thinking gap rather than simple distraction.',
      },
    ],
  },
  'unlock-your-future-the-best-programming-languages-for-career-advancement': {
    answer:
      "The best programming language for a student depends on the learner's goal: Python for versatility, data, and AI; JavaScript for web projects; Java for deeper computer science; and visual tools for younger beginners. The article emphasizes choosing based on student projects, not hype.",
    questionHeading: 'Which programming language is best for students?',
    context:
      'The article compares language choices, student goals, learning resources, community, project evidence, and the habits needed to keep growing.',
    faqs: [
      {
        question: 'Should beginners start with Python or JavaScript?',
        answer:
          'Python is often easier for general problem-solving and data work. JavaScript is strong for web projects. The better first choice depends on what the learner wants to build.',
      },
      {
        question: 'Is one programming language enough?',
        answer:
          'One language is enough to learn fundamentals, but stronger student growth usually comes from applying those fundamentals across tools and project types.',
      },
    ],
  },
  'unlocking-confidence-independence-and-fun-through-summer-camp': {
    answer:
      'A strong summer camp builds confidence by giving children achievable challenges, social practice, and visible progress. The post explains how structured camp experiences help kids become more independent while still having fun.',
    questionHeading: 'How does summer camp build confidence and independence?',
    context:
      'The article covers achievement, independence, friendship, hidden academic benefits, fun, and how parents can choose a camp experience that supports growth.',
    faqs: [
      {
        question: 'Why does camp help children become more independent?',
        answer:
          'Camp gives children a safe place to make choices, try new tasks, work with peers, and experience success away from normal school routines.',
      },
      {
        question: 'What makes a camp confidence-building?',
        answer:
          'A confidence-building camp has clear structure, supportive instructors, attainable challenges, peer connection, and a finished project or skill students can point to.',
      },
    ],
  },
  'us-kids-falling-behind-math-english-parent-assessments': {
    answer:
      'Parents can respond to math and English gaps by using regular low-pressure assessments, looking for mistake patterns, and acting before gaps become confidence problems. The post emphasizes transparency over waiting for report cards.',
    questionHeading: 'How can parents respond when math or English gaps appear?',
    context:
      'The article discusses academic gaps, parent-teacher communication, regular assessments, stress reduction, and the value of actionable feedback.',
    faqs: [
      {
        question: 'Why do report cards miss some learning gaps?',
        answer:
          'Report cards summarize performance, but they often do not show which specific concepts are fragile or which mistake patterns keep returning.',
      },
      {
        question: 'What should an assessment tell parents?',
        answer:
          'A useful assessment should identify the skill, the mistake pattern, the likely gap, and the next action rather than only giving a score.',
      },
    ],
  },
  'why-learning-java-coding-is-impressive-on-your-linkedin-profile': {
    answer:
      'Java can strengthen a student profile because it signals experience with a structured, object-oriented programming language. The post explains how Java projects can demonstrate backend thinking, organized code, and readiness for deeper computer science.',
    questionHeading: 'Why do Java skills look strong on a student profile?',
    context:
      'The article covers Java relevance, structured programming, student profile positioning, and how learners can make technical skills visible through projects.',
    faqs: [
      {
        question: 'Is Java still worth learning?',
        answer:
          'Yes. Java remains useful for enterprise systems, Android foundations, backend services, and object-oriented programming practice.',
      },
      {
        question: 'How should students show Java experience?',
        answer:
          'Students should share completed projects, explain what the program does, and describe the Java concepts they used.',
      },
    ],
  },
  'why-learning-python-is-your-fast-track-to-in-demand-job-offers': {
    answer:
      'Python is a strong first text-based language for students because it is readable, versatile, and useful across automation, data analysis, AI, games, and web tools. The article presents Python as a practical path from beginner scripts to real projects.',
    questionHeading: 'Why is Python useful for future-ready student coding skills?',
    context:
      'The article explains Python readability, broad project use, practice paths, and why the language helps learners move quickly from basics to applied work.',
    faqs: [
      {
        question: 'Why is Python popular with beginners?',
        answer:
          'Python has readable syntax and broad use cases, so beginners can focus on problem-solving while still building useful projects.',
      },
      {
        question: 'What can students build with Python?',
        answer:
          'Students can build automation scripts, games, data projects, AI experiments, web tools, and portfolio projects that show applied thinking.',
      },
    ],
  },
} as const satisfies Record<string, LegacyBlogAeoEntry>

type LegacyBlogAeoProps = {
  slug: keyof typeof legacyBlogAeoBySlug
}

export function LegacyBlogAeoJsonLd({ slug }: LegacyBlogAeoProps) {
  const entry = legacyBlogAeoBySlug[slug]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema(entry.faqs)) }}
    />
  )
}

export function LegacyBlogAeoBlock({ slug }: LegacyBlogAeoProps) {
  const entry = legacyBlogAeoBySlug[slug]

  return (
    <section className="not-prose my-8 rounded-xl border border-[#1F396D]/15 bg-[#F7FAFC] p-6">
      <div className="llm-answer-block rounded-lg border-l-4 border-[#F16112] bg-white p-5 text-gray-800 shadow-sm">
        <p className="m-0 text-base leading-7">{entry.answer}</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-[#1F396D]">{entry.questionHeading}</h2>
      <p className="mt-3 text-gray-700 leading-7">{entry.context}</p>

      <h2 className="mt-8 text-2xl font-bold text-[#1F396D]">Common parent questions</h2>
      <div className="mt-4 space-y-4">
        {entry.faqs.map((faq) => (
          <div key={faq.question} className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
            <p className="mt-2 text-gray-700 leading-7">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
