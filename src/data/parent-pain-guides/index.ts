import type { ParentPainGuide } from './types'

const DATE = '2026-08-26'
const DISPLAY_DATE = 'August 26, 2026'

const assessmentCta = {
  headline: 'Not sure what the grades are missing?',
  text: 'A free GrowWise assessment can show which skills are secure, which need support, and what a sensible next step looks like for your child.',
  label: 'Book a Free Assessment',
  href: '/book-assessment',
} as const

const GUIDES: readonly ParentPainGuide[] = [
  {
    slug: 'homework-grades-good-but-fails-tests',
    headline: "My Child Gets A's on Homework but Fails Tests. What Is Going On?",
    seoTitle: 'Good at Homework but Failing Tests? | Parent Guide',
    description: "Why a child can earn A's on homework but fail tests, how to find the real cause, and what parents can do without adding hours of studying.",
    schemaDescription: "A practical parent guide to why supported homework performance can differ from independent test performance, with ways to check recall, understanding, pacing, and anxiety.",
    excerpt: "Homework looks great, then the test comes back with a low score. Learn what that mismatch can reveal and how to respond without blaming your child.",
    keywords: ['good at homework but fails tests', 'A on homework failing tests', 'child studies but fails tests', 'homework test score gap'],
    image: '/images/blogs/homework-grades-good-but-fails-tests.webp',
    imageAlt: 'Parent and middle school student calmly comparing homework with a returned test at a kitchen table',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '8 min read',
    intro: [
      "The homework is complete. The answers are right. Your child seems to understand the lesson. Then the test comes home with a score that makes both of you wonder what happened.",
      "That gap is frustrating, but it is also useful information. Homework and tests often measure different conditions. Finding which condition changed is more helpful than telling a child to study harder.",
    ],
    answer: "A child can do well on homework and struggle on tests when homework includes notes, examples, hints, extra time, or immediate help. A test asks for independent recall and flexible use of skills. The mismatch can also involve pacing, unclear directions, careless checking, or anxiety. Compare the actual work before choosing a solution.",
    sections: [
      {
        heading: 'Why can homework look stronger than test performance?',
        paragraphs: [
          "Homework usually happens soon after a lesson. A similar example may still be visible in the textbook, and a parent, friend, or answer checker may confirm each step. Those supports are not bad. They simply make homework a poor test of independent recall.",
          "Tests remove those prompts and mix problem types. The student must decide which idea applies, retrieve it, and use it under a time limit. The Institute of Education Sciences recommends retrieval practice because recalling an answer strengthens learning and shows students what they do not yet know.",
        ],
      },
      {
        heading: 'How do you find the reason for the score gap?',
        paragraphs: [
          "Put one homework page beside the returned test. Look for patterns, not the final percentage. Did your child leave items blank, misread directions, forget a method, run out of time, or make errors only after the first page? Ask what felt different without turning the conversation into an interrogation.",
          "Then try three unfamiliar questions without notes. If your child cannot begin, retrieval or understanding may be the issue. If the work is accurate but slow, pacing may matter. If familiar skills disappear only in a testing setting, discuss the pattern with the teacher and consider anxiety as one possibility, not the automatic explanation.",
        ],
        checklist: [
          'Ask the teacher which error pattern appears most often.',
          'Use two or three closed-note practice questions after a delay.',
          'Have your child explain why a method works, not only repeat the steps.',
          'Practice mixed problems so the strategy is not given away by the worksheet heading.',
          'Track accuracy and time separately for two weeks.',
        ],
      },
      {
        heading: 'What should parents avoid doing after a bad test?',
        paragraphs: [
          "More worksheets are not always the answer. Repeating an easy, familiar format can increase homework accuracy while leaving the test problem untouched. Punishing the score can also make a child hide confusion or rush through future review.",
          "Choose one small experiment based on the evidence. That may be closed-note recall, a slower directions routine, short timed sets, or a teacher conversation. A precise adjustment gives your child a path forward and keeps one score from becoming an identity.",
        ],
      },
    ],
    faqs: [
      { question: 'Does failing tests mean my child did not understand the homework?', answer: 'Not necessarily. Homework may show that a child can complete familiar work with support. A test may reveal difficulty recalling, selecting, or applying the same skill independently.' },
      { question: 'Should I stop helping with homework?', answer: 'No. Shift some help from giving the next step to asking your child to explain the next step. End with one short closed-note problem to check independent recall.' },
      { question: 'Could test anxiety cause the difference?', answer: 'It can contribute, especially when physical worry or blanking appears mainly during tests. Knowledge, pacing, attention, and directions should also be checked before assuming anxiety is the only cause.' },
      { question: 'When should I contact the teacher?', answer: 'Contact the teacher when the pattern repeats across two or more assessments, when you cannot interpret the errors, or when the score differs sharply from what your child demonstrates at home.' },
    ],
    sources: [
      { name: 'Institute of Education Sciences', url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', note: 'practice guide on retrieval, spacing, and judging learning' },
      { name: 'What Works Clearinghouse', url: 'https://ies.ed.gov/ncee/WWC/Docs/PracticeGuide/20072004.pdf', note: 'evidence review for quizzes and active recall' },
    ],
    related: [
      { label: 'Test anxiety vs. a content gap', href: '/growwise-blogs/test-anxiety-vs-content-gap' },
      { label: 'Why grades can hide learning gaps', href: '/resources/why-grades-hide-learning-gaps' },
      { label: 'Careless math mistakes parent guide', href: '/resources/careless-math-mistakes' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'report-card-fine-child-actually-behind',
    headline: 'The Report Card Looks Fine, but Is My Child Actually Behind?',
    seoTitle: 'Report Card Looks Fine. Is My Child Behind?',
    description: 'A fine report card can still leave parents unsure. Compare grades, independent work, assessments, and growth without panicking over one number.',
    schemaDescription: 'A parent guide to looking beyond report card grades by comparing independent performance, standardized results, work samples, and progress over time.',
    excerpt: 'Good grades are reassuring, but they are only one signal. Learn how to check whether your child is mastering grade-level skills independently.',
    keywords: ['good grades but behind grade level', 'report card looks fine child behind', 'grades vs proficiency', 'hidden learning gaps'],
    image: '/images/blogs/report-card-fine-child-actually-behind.webp',
    imageAlt: 'Parent and elementary student reviewing a report card and schoolwork together in a bright living room',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '8 min read',
    intro: [
      "Your child brings home B's and A's, so you expect to feel reassured. Yet reading sounds effortful, math homework needs more help than it used to, or a standardized score tells a different story.",
      "A report card matters, but it combines many things: mastery, effort, completion, participation, retakes, and teacher judgment. The goal is not to distrust the grade. It is to understand what the grade includes.",
    ],
    answer: "A fine report card does not always prove that every grade-level skill is secure. Grades may include effort, homework, projects, participation, and supported corrections. Compare the report card with independent work, teacher comments, standardized results, and growth across several months. A repeated pattern across measures matters more than one score.",
    sections: [
      { heading: 'Why can grades and proficiency tell different stories?', paragraphs: [
        "Classroom grades answer a local question: how did this student perform under this teacher's policies and assignments? A proficiency measure asks a narrower question about performance on defined standards under common conditions. Neither measure tells the whole story.",
        "Homework completion and projects can lift a course grade while a foundational skill remains fragile. The reverse can happen too. A capable student may understand the material but lose points through missing work. That is why the pattern beneath the average matters.",
      ] },
      { heading: 'What should parents compare with the report card?', paragraphs: [
        "Ask the teacher which skills your child can use independently and which still require prompts. Review a recent writing sample, a reading passage your child has not practiced, or mixed math problems without examples at the top.",
        "Use state or district assessment reports as one additional signal. Look at performance areas and year-to-year movement rather than treating a single level as a verdict. Ask what classroom evidence agrees or disagrees with that result.",
      ], checklist: [
        'Read teacher comments for independence, accuracy, and work-habit patterns.',
        'Compare classwork with one short unfamiliar task completed without help.',
        'Review standardized results by skill area, not only the overall level.',
        'Ask whether performance is improving, flat, or slipping across the year.',
        'Choose one priority skill before adding broad tutoring or extra worksheets.',
      ] },
      { heading: 'How do you raise a concern without creating panic?', paragraphs: [
        "Use neutral language with your child: ‘We are checking which parts feel solid and which need more practice.’ Avoid announcing that the report card is wrong or that the child is behind based on one test.",
        "If several measures point to the same gap, act while the gap is still specific. A focused plan is easier for a child to understand and for adults to monitor than a vague goal to catch up.",
      ] },
    ],
    faqs: [
      { question: 'Can a child get good grades while working below grade level?', answer: 'It is possible because grades can include effort, completion, projects, corrections, and supported work. Ask what your child can do independently against current grade-level expectations.' },
      { question: 'Should I trust standardized tests more than teachers?', answer: 'Use both. Tests offer a common measure under limited conditions, while teachers see daily learning. Agreement across multiple sources is more useful than choosing one source as always correct.' },
      { question: 'What if only one subject looks weak?', answer: 'A narrow pattern is helpful because support can target that subject or skill rather than treating your child as generally behind.' },
      { question: 'How often should parents check progress?', answer: 'A focused review every six to eight weeks is usually more informative than checking daily. Use the same type of skill evidence so change is easier to see.' },
    ],
    sources: [
      { name: 'California Assessment of Student Performance and Progress', url: 'https://www.caaspp-elpac.org/resources/reporting/ssr-and-reporting-resources', note: 'official information about California assessments and score interpretation' },
      { name: 'Institute of Education Sciences', url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', note: 'guidance on checking what students have learned' },
    ],
    related: [
      { label: 'Is my child behind for their grade?', href: '/growwise-blogs/is-my-child-behind-grade-level-diagnostic' },
      { label: 'Why grades hide learning gaps', href: '/resources/why-grades-hide-learning-gaps' },
      { label: 'Spot learning gaps at home', href: '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'how-many-ap-classes-too-many-dublin-tri-valley',
    headline: 'How Many AP Classes Are Too Many? A Dublin and Tri-Valley Parent Guide',
    seoTitle: 'How Many AP Classes Are Too Many? Dublin Guide',
    description: 'Balance AP rigor, sleep, activities, and well-being with current Dublin Unified AP limits and a practical course-load decision framework.',
    schemaDescription: 'A local parent guide to choosing a sustainable AP and Honors course load using current Dublin Unified policy, student context, and workload evidence.',
    excerpt: 'The strongest schedule is not always the one with the most AP classes. Use local policy and your teen’s real weekly capacity to choose wisely.',
    keywords: ['how many AP classes is too many', 'Dublin Unified AP limit', 'AP classes Dublin CA', 'Tri-Valley high school course load'],
    image: '/images/blogs/how-many-ap-classes-too-many-dublin-tri-valley.webp',
    imageAlt: 'Tri-Valley high school student and parent planning a balanced course schedule at home',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read',
    intro: [
      "Course selection can feel like a quiet competition. Families hear what another student is taking, worry about college admissions, and wonder whether choosing fewer advanced classes means closing a door.",
      "Dublin Unified changed that conversation in January 2026 by adopting limits on annual and total AP and Honors enrollment. The district's stated goal is balance, student well-being, and deeper learning, not lower expectations.",
    ],
    answer: "There is no universal ideal number of AP classes. A sustainable load depends on prerequisites, reading and writing speed, activities, sleep, commute, and genuine interest. Dublin Unified now sets AP and Honors limits, so families should confirm the current policy and course catalog with a counselor, then judge rigor by depth and fit rather than raw course count.",
    sections: [
      { heading: 'What is Dublin Unified’s current AP policy?', paragraphs: [
        "On January 13, 2026, the Dublin Unified School District Board adopted Resolution 2025/26-37 to limit AP and Honors course loading. The district explains that colleges review applicants in the context of the opportunities and policies at their high school.",
        "Policies and course offerings can change. Before building a four-year plan, use the current district companion document, your school's course catalog, and a counselor rather than an older social post or another family's schedule.",
      ] },
      { heading: 'How can families judge whether a schedule is sustainable?', paragraphs: [
        "Start with time, not ambition. Estimate class hours, homework, sports, clubs, family responsibilities, meals, transportation, and a realistic sleep window. A plan that works only by borrowing from sleep is not balanced.",
        "Then examine fit. Two advanced classes that connect to a student's strengths and goals may show more meaningful rigor than a crowded schedule chosen for appearance. Ask which courses the student would still choose if nobody could see the transcript title.",
      ], checklist: [
        'Confirm current annual and four-year limits with the school counselor.',
        'Check prerequisites and expected weekly work for each course.',
        'Protect a realistic sleep window before filling remaining hours.',
        'Keep at least one activity or interest that is not tied to transcript pressure.',
        'Create a course-change plan before the school deadline passes.',
      ] },
      { heading: 'What are signs the course load is too heavy?', paragraphs: [
        "Watch for a pattern of chronic sleep loss, skipped meals, frequent illness, withdrawal from valued activities, constant crisis studying, or a sharp change in mood. One busy week is normal. A schedule that makes recovery impossible is not.",
        "Talk with the counselor early. Dropping or changing a course is a planning decision, not a moral failure. If stress is affecting health or daily functioning, involve your teen's pediatrician or a licensed mental-health professional.",
      ] },
    ],
    faqs: [
      { question: 'Do colleges expect students to take every AP offered?', answer: 'Colleges consider course rigor in school context. Dublin Unified states that its AP and Honors limits are reflected in the school profile used during admissions review.' },
      { question: 'Is three AP classes always too many?', answer: 'No fixed number works for every student. Prior preparation, course combination, reading speed, activities, sleep, and interest all change the workload.' },
      { question: 'Where can I find the current Dublin AP limit?', answer: 'Use Dublin Unified’s AP overview and companion resolution, then confirm how the rule applies to your student with the school counselor.' },
      { question: 'Should a student drop an AP after one low grade?', answer: 'One grade is not enough to decide. Review workload, understanding, health, teacher feedback, and the school’s change deadline before making a choice.' },
    ],
    sources: [
      { name: 'Dublin Unified School District AP Overview', url: 'https://www.dublinusd.org/apps/pages/index.jsp?pREC_ID=1197148&type=d&uREC_ID=443955', note: 'current district overview and policy context' },
      { name: 'DUSD AP and Honors Resolution Companion', url: 'https://www.dublinusd.org/pdf/AP_Honors%20Resolution%20Companion%20.pdf', note: 'official January 2026 policy summary' },
      { name: 'College Board AP Students', url: 'https://apstudents.collegeboard.org/', note: 'official course and exam information' },
    ],
    related: [
      { label: 'Private vs. public school rigor locally', href: '/growwise-blogs/private-vs-public-school-dublin-pleasanton' },
      { label: 'Stop measuring learning only by grades', href: '/growwise-blogs/stop-measuring-learning-by-grades-roots-not-fruit' },
      { label: 'High school math finals preparation', href: '/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley' },
    ],
    cta: { ...assessmentCta, headline: 'Want a clearer picture before choosing next year’s math?', text: 'A GrowWise assessment can show whether the foundation beneath an advanced course choice is secure.' },
  },
  {
    slug: 'middle-school-math-cliff-pre-algebra',
    headline: 'The Sixth and Seventh Grade Math Cliff: Why Pre-Algebra Suddenly Feels Hard',
    seoTitle: 'The Middle School Math Cliff: Pre-Algebra Help',
    description: 'Why students who were fine in elementary math can struggle in sixth or seventh grade, plus a practical pre-algebra foundation checklist.',
    schemaDescription: 'A parent guide to the middle school math transition, including fractions, ratios, negative numbers, variables, multi-step reasoning, and study habits.',
    excerpt: 'Your child was fine in elementary math. Then pre-algebra changed everything. The shift usually exposes a few specific foundations, not a lack of ability.',
    keywords: ['middle school math cliff', 'struggling with pre algebra', '6th grade math suddenly hard', '7th grade math help'],
    image: '/images/blogs/middle-school-math-cliff-pre-algebra.webp',
    imageAlt: 'Middle school student using a whiteboard to connect fractions, ratios, and variables with a supportive instructor',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read',
    intro: [
      "Elementary math may have felt comfortable. Then sixth or seventh grade arrives with negative numbers, ratios, variables, multi-step equations, and homework that no longer looks like the class example.",
      "This transition is often called a math cliff because several demands rise at once. It does not mean your child has reached the limit of their ability. It means the course is asking old foundations to work together in new ways.",
    ],
    answer: "Pre-algebra feels like a cliff when arithmetic fluency, fraction sense, ratios, negative numbers, and multi-step organization are not yet automatic enough to support abstract reasoning. Middle school also demands more independent note-taking and error checking. Identify the exact bottleneck, then connect concrete meaning to symbols instead of restarting every prior grade.",
    sections: [
      { heading: 'What changes in sixth and seventh grade math?', paragraphs: [
        "Earlier work often tells students which operation to use. Pre-algebra increasingly asks them to decide. A student must interpret relationships, choose a representation, keep track of several steps, and explain why an answer makes sense.",
        "Fractions and ratios become especially important because they appear inside proportions, slope, percent, probability, and equations. A memorized trick may work on a familiar worksheet but fail when the same idea appears in a word problem.",
      ] },
      { heading: 'Which foundations should parents check first?', paragraphs: [
        "Use a few mixed problems and ask your child to explain each choice. Can they compare fractions, reason about unit rates, place negative numbers, use order of operations, and keep an equation balanced? Do not turn the check into a long test.",
        "Also look at process. Many students know the math but lose signs, copy inaccurately, or crowd work into a space where errors become hard to see. Organization is part of successful multi-step math.",
      ], checklist: [
        'Explain a fraction as a number, not only a piece of a shape.',
        'Find and interpret a unit rate from a real situation.',
        'Compare and operate with positive and negative numbers.',
        'Explain what a variable represents in context.',
        'Show one step per line and check whether the answer is reasonable.',
      ] },
      { heading: 'How should parents rebuild without overwhelming the student?', paragraphs: [
        "Choose the smallest high-impact gap. Ten focused minutes on fraction magnitude can do more than an hour of mixed review if fractions are blocking ratios and equations. Connect diagrams, number lines, words, and symbols so the idea is not tied to one format.",
        "Track whether new classroom work becomes easier. The goal is transfer, not perfect scores on a separate packet. If the same gap persists despite targeted teaching, ask the school what additional assessment or support is available.",
      ] },
    ],
    faqs: [
      { question: 'Why was my child good at elementary math but weak in pre-algebra?', answer: 'Elementary success may rely on familiar procedures. Pre-algebra requires students to choose methods, connect concepts, and manage multiple steps more independently.' },
      { question: 'Are fractions really that important for algebra?', answer: 'Yes. Fraction and ratio reasoning supports proportions, slope, percent, rational expressions, probability, and many equation-solving tasks.' },
      { question: 'Should we restart the entire previous grade?', answer: 'Usually not. Use current errors to identify the smallest prerequisite gap, teach it directly, and then reconnect it to current work.' },
      { question: 'When is tutoring useful?', answer: 'Targeted instruction can help when the teacher has identified a recurring prerequisite gap, home practice leads to conflict, or the student needs a different representation and more feedback.' },
    ],
    sources: [
      { name: 'California Department of Education Mathematics Standards', url: 'https://www.cde.ca.gov/be/st/ss/documents/ccssmathstandardaug2013.pdf', note: 'official progression of middle school mathematics expectations' },
      { name: 'Institute of Education Sciences', url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', note: 'guidance on combining representations and deep explanatory questions' },
    ],
    related: [
      { label: 'Middle school math readiness checklist', href: '/resources/middle-school-math-readiness-checklist' },
      { label: 'Why fractions cause trouble', href: '/growwise-blogs/why-is-my-child-struggling-with-fractions' },
      { label: 'California math standards by grade', href: '/resources/california-math-standards-by-grade' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'understand-child-psat-score-report',
    headline: 'How to Read Your Child’s PSAT Score Report Without Overreacting',
    seoTitle: 'How to Read a PSAT Score Report | Parent Guide',
    description: 'Understand PSAT total scores, sections, percentiles, score ranges, benchmarks, and skill bands so you can choose a sensible next step.',
    schemaDescription: 'A current parent guide to reading PSAT 8/9, PSAT 10, and PSAT/NMSQT score reports using official College Board definitions.',
    excerpt: 'A PSAT report contains more than one big number. Learn what the score, percentile, range, and skill bands can and cannot tell you.',
    keywords: ['understand PSAT score report', 'what does PSAT score mean', 'PSAT score parent guide', 'PSAT percentile explained'],
    image: '/images/blogs/understand-child-psat-score-report.webp',
    imageAlt: 'Parent and high school student reviewing a digital PSAT score report together on a laptop',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read',
    intro: [
      "The PSAT score arrives, and the total number gets all the attention. Parents immediately ask whether it is good, whether SAT prep should start, and what it means for college.",
      "The useful information is spread across the report. The total score, section scores, percentile, score range, and Knowledge and Skills bands answer different questions.",
    ],
    answer: "Read a PSAT report in layers: confirm which PSAT your child took, review the total and section scores, use the percentile only with the stated comparison group, notice the score range, and examine Knowledge and Skills bands for practice priorities. One PSAT is a baseline, not a college-admission result or a fixed prediction.",
    sections: [
      { heading: 'Which PSAT did your child take?', paragraphs: [
        "The PSAT 8/9, PSAT 10, and PSAT/NMSQT do not all use the same score range. College Board currently reports PSAT 8/9 totals from 240 to 1440, while PSAT 10 and PSAT/NMSQT totals range from 320 to 1520.",
        "Start with the test name before comparing scores. A total from one assessment should not be interpreted against the scale or expectations of another.",
      ] },
      { heading: 'What do the percentile and score range mean?', paragraphs: [
        "A percentile describes a comparison group, not the percent of questions answered correctly. Read the label carefully because College Board reports specific percentile contexts. A score range estimates how performance might vary across another administration under similar conditions.",
        "Small differences inside that range should not drive a major decision. Look for broad section patterns and skill areas that agree with classroom evidence.",
      ], checklist: [
        'Confirm whether the report is PSAT 8/9, PSAT 10, or PSAT/NMSQT.',
        'Compare Math with Reading and Writing before focusing on the total.',
        'Read the label attached to the percentile comparison.',
        'Use Knowledge and Skills bands to choose one or two practice priorities.',
        'Discuss testing goals and timing before buying a broad prep package.',
      ] },
      { heading: 'How should families use the score next?', paragraphs: [
        "Connect the weakest reported area to actual work. If an algebra band looks weak, check whether classroom algebra feels uncertain too. If the report conflicts with grades and teacher observations, treat it as a question to investigate, not an automatic diagnosis.",
        "For younger students, strong reading, writing, and math foundations usually matter more than test tricks. For an eleventh grader, a diagnostic plan and testing calendar may be appropriate. The right next step depends on grade, goals, and the amount of time available.",
      ] },
    ],
    faqs: [
      { question: 'What is a good PSAT score?', answer: 'A useful score depends on which PSAT was taken, the student’s grade, goals, section balance, and comparison group. Start with growth and skill information rather than one universal cutoff.' },
      { question: 'Does the PSAT score predict the SAT exactly?', answer: 'No. The tests are connected, but a score includes a range and can change with learning, preparation, timing, and testing conditions.' },
      { question: 'Is the percentile the percentage correct?', answer: 'No. A percentile shows how a score compares with a defined group. It is different from the percentage of questions answered correctly.' },
      { question: 'Should an eighth or ninth grader start formal SAT prep?', answer: 'Usually the better priority is strengthening reading, writing, algebra, and problem-solving foundations. Use the PSAT 8/9 to identify skills, not to create unnecessary test pressure.' },
    ],
    sources: [
      { name: 'College Board, What Do My Scores Mean?', url: 'https://satsuite.collegeboard.org/scores/what-scores-mean', note: 'official score scales, ranges, percentiles, and skill reporting' },
      { name: 'College Board PSAT 10 Guide', url: 'https://satsuite.collegeboard.org/media/pdf/psat-10-understanding-scores.pdf', note: '2026 student and family score guide' },
    ],
    related: [
      { label: 'When should my child start SAT prep?', href: '/resources/when-to-start-sat-prep' },
      { label: 'Test anxiety vs. a content gap', href: '/growwise-blogs/test-anxiety-vs-content-gap' },
      { label: 'Report card looks fine, but is my child behind?', href: '/growwise-blogs/report-card-fine-child-actually-behind' },
    ],
    cta: { ...assessmentCta, headline: 'Want to turn the report into a focused plan?', text: 'A GrowWise assessment can connect score-report patterns with the math and reading skills your child uses in class.' },
  },
  {
    slug: 'test-anxiety-vs-content-gap',
    headline: 'Test Anxiety or Not Knowing the Material? How Parents Can Tell',
    seoTitle: 'Test Anxiety vs. a Content Gap | Parent Guide',
    description: 'Use timing, practice, error patterns, and physical signs to distinguish test anxiety from missing knowledge without trying to diagnose your child.',
    schemaDescription: 'A research-informed parent framework for comparing test anxiety, content gaps, pacing, and study methods using evidence across settings.',
    excerpt: 'A low test score can come from worry, missing knowledge, or both. Compare what happens before, during, and after the test to choose the right support.',
    keywords: ['test anxiety vs not knowing material', 'child blanks on tests', 'test anxiety signs students', 'why child fails tests'],
    image: '/images/blogs/test-anxiety-vs-content-gap.webp',
    imageAlt: 'Student practicing calmly with a short quiz while a parent observes from a respectful distance',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read', sensitive: true,
    intro: [
      "Your child says, ‘I knew it at home, but my mind went blank.’ You want to believe them, yet the returned test also shows mistakes on basic ideas. Is this anxiety, missing knowledge, or both?",
      "The distinction matters because the supports differ. Relaxation alone cannot teach an unknown concept, and extra worksheets alone may not help a student whose performance collapses under pressure.",
    ],
    answer: "Compare performance across conditions. A content gap usually appears in untimed, low-pressure, closed-note work too. Test anxiety is more likely when a student can explain and retrieve the material reliably in practice but shows physical worry, blanking, or a sharp drop mainly during evaluation. Many students have both, so use patterns rather than one sign.",
    sections: [
      { heading: 'What evidence points toward a content gap?', paragraphs: [
        "Ask your child to complete a few unfamiliar, closed-note questions several days after studying. If they cannot choose a method, explain the idea, or correct an error with a small prompt, the knowledge may not be secure yet.",
        "Rereading notes can create a feeling of familiarity without reliable recall. Practice that requires retrieval gives a clearer picture and can strengthen later memory at the same time.",
      ] },
      { heading: 'What evidence points toward test anxiety?', paragraphs: [
        "Look for a context-specific shift: nausea, shaking, racing thoughts, repeated reassurance, sleep disruption before tests, blanking on well-practiced material, or performance that improves markedly when the same task is untimed and private.",
        "Anxiety and achievement have a complex relationship. Research does not support assuming every poor test from an anxious student was caused entirely by anxiety. Compare knowledge before the exam and discuss repeated symptoms with qualified professionals.",
      ], checklist: [
        'Use a short closed-note check two or three days after studying.',
        'Compare timed and untimed performance on similar questions.',
        'Record physical symptoms and when they begin.',
        'Review whether errors cluster by skill, time, or test section.',
        'Share the pattern with the teacher, counselor, or pediatrician as appropriate.',
      ] },
      { heading: 'What if both anxiety and missing knowledge are present?', paragraphs: [
        "This is common. A shaky foundation raises worry, and worry can make study less efficient or increase avoidance. Use two tracks: targeted instruction for the exact gap and a predictable, lower-pressure testing routine.",
        "Seek help when distress is persistent, severe, or affecting health, sleep, attendance, or daily life. A tutor can teach and document academic patterns, but cannot diagnose an anxiety disorder.",
      ] },
    ],
    faqs: [
      { question: 'Can test anxiety make a student forget everything?', answer: 'Students may experience blanking or reduced access to familiar information under pressure, but poor performance can also reflect incomplete learning. Compare performance across settings.' },
      { question: 'Does high practice accuracy rule out a content gap?', answer: 'Not if practice uses notes, repeated question types, hints, or immediate correction. Closed-note, delayed, mixed practice provides stronger evidence.' },
      { question: 'Can a tutor treat test anxiety?', answer: 'A tutor can reduce avoidable academic uncertainty and teach test routines. A licensed mental-health professional is the right person to assess or treat significant anxiety.' },
      { question: 'When should I involve the school?', answer: 'Involve the teacher or counselor when the pattern repeats, symptoms occur at school, scores differ sharply from classroom evidence, or accommodations may need discussion.' },
    ],
    sources: [
      { name: 'PubMed systematic review', url: 'https://pubmed.ncbi.nlm.nih.gov/37253582/', note: '2023 review of test anxiety in primary school children' },
      { name: 'Psychological Science study', url: 'https://pubmed.ncbi.nlm.nih.gov/36221217/', note: 'study separating anxiety from measured knowledge' },
      { name: 'Institute of Education Sciences', url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', note: 'guidance on retrieval and judging learning' },
    ],
    related: [
      { label: 'Good homework grades but poor test scores', href: '/growwise-blogs/homework-grades-good-but-fails-tests' },
      { label: 'Math anxiety signs and help', href: '/growwise-blogs/math-anxiety-in-children-signs-help' },
      { label: 'How to understand a PSAT score report', href: '/growwise-blogs/understand-child-psat-score-report' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'gifted-underachiever-bright-child-not-lazy',
    headline: 'Gifted Underachiever: Why a Bright Child Coasts and What Helps',
    seoTitle: 'Gifted Underachiever: Bright, Not Lazy | Parent Guide',
    description: 'Why gifted children may coast, avoid challenge, or underachieve, plus practical ways parents can rebuild effort without using the lazy label.',
    schemaDescription: 'A strength-based parent guide to gifted underachievement, including signs, possible causes, school questions, and supportive next steps.',
    excerpt: 'A bright child who coasts is not automatically lazy. Look beneath the low effort to find challenge, skills, confidence, or unmet support needs.',
    keywords: ['gifted underachiever', 'bright child not motivated', 'gifted child coasting', 'smart kid lazy at school'],
    image: '/images/blogs/gifted-underachiever-bright-child-not-lazy.webp',
    imageAlt: 'Bright middle school student thinking beside an unfinished assignment while a parent listens without judgment',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read', sensitive: true,
    intro: [
      "Your child can discuss complex ideas, learn favorite subjects at remarkable speed, and still turn in rushed work. Adults see the ability and assume the missing ingredient is effort. The word lazy quickly enters the conversation.",
      "Underachievement is a pattern, not a character flaw. The useful question is not, ‘How do we make this child care?’ It is, ‘What makes effort feel unnecessary, unsafe, or hard to organize?’",
    ],
    answer: "A gifted underachiever performs below the level their demonstrated ability suggests, but the reason is rarely simple laziness. Work may feel repetitive, challenge may threaten a perfectionist identity, or planning and learning difficulties may be hidden by strong reasoning. Support should pair meaningful challenge with explicit skills, realistic expectations, and curiosity about the cause.",
    sections: [
      { heading: 'Why do some gifted children stop trying?', paragraphs: [
        "A child who has succeeded without much effort may never learn how to struggle productively. When work finally becomes hard, avoidance can protect the identity of being the smart one. Other students disengage because the work feels repetitive or disconnected from anything they value.",
        "There may also be a skill mismatch. Strong verbal reasoning can hide weak writing stamina. Quick mental math can hide poor organization. Anxiety, attention differences, learning disabilities, sleep, or social stress can affect performance too. No single explanation fits every child.",
      ] },
      { heading: 'How can parents respond without lowering expectations?', paragraphs: [
        "Separate ability, effort, strategy, and outcome. Praise a specific revision or a thoughtful question instead of praising intelligence. Set a small completion target and ask what got in the way before adding consequences.",
        "Meet with the teacher using examples. Ask where your child shows advanced thinking, where output drops, and whether the student has access to depth rather than only more work. Meaningful challenge and accountability can exist together.",
      ], checklist: [
        'Replace “You are so smart” with feedback about strategy, persistence, or revision.',
        'Choose one missing work habit to practice at a time.',
        'Offer deeper problems or authentic projects, not a larger pile of similar questions.',
        'Ask the teacher to compare reasoning quality with work completion.',
        'Seek a qualified evaluation when the ability and performance gap is persistent or severe.',
      ] },
      { heading: 'When might coasting signal something more?', paragraphs: [
        "A sudden change deserves attention, especially with sleep changes, school refusal, intense worry, low mood, or loss of interest beyond school. A long-standing pattern across writing, attention, organization, or reading may warrant discussion with the school support team or pediatrician.",
        "An article cannot identify giftedness, ADHD, anxiety, or a learning disability. A thoughtful evaluation looks at strengths and difficulties together instead of using one to cancel out the other.",
      ] },
    ],
    faqs: [
      { question: 'Is a gifted underachiever simply bored?', answer: 'Boredom is one possibility, but it is not the only one. Perfectionism, missing study skills, attention differences, anxiety, learning difficulties, sleep, and social stress can produce similar patterns.' },
      { question: 'Should gifted students be allowed to skip routine work?', answer: 'Expectations should remain clear, but teachers may use curriculum compacting or more meaningful challenge when a student has already demonstrated mastery.' },
      { question: 'Can consequences fix gifted underachievement?', answer: 'Consequences may improve a narrow behavior, but they will not resolve an unidentified learning, emotional, or executive-function barrier. Start by defining the specific behavior and likely cause.' },
      { question: 'When is an evaluation appropriate?', answer: 'Consider professional input when underachievement is persistent, appears across settings, causes distress, or includes a large and unexplained difference between reasoning ability and academic output.' },
    ],
    sources: [
      { name: 'National Association for Gifted Children', url: 'https://www.nagc.org/networks-and-special-interest-groups', note: 'guidance on assessment and underserved gifted learners' },
      { name: 'ERIC, U.S. Department of Education', url: 'https://eric.ed.gov/?id=ED424711', note: 'review of gifted students with learning disabilities' },
    ],
    related: [
      { label: 'When giftedness hides a real gap', href: '/growwise-blogs/twice-exceptional-2e-child-learning-gaps' },
      { label: 'Executive function and missing assignments', href: '/growwise-blogs/executive-function-smart-kids-missing-assignments' },
      { label: 'Homework independence by age', href: '/resources/homework-independence' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'twice-exceptional-2e-child-learning-gaps',
    headline: 'Twice-Exceptional Kids: When Giftedness Hides a Real Learning Gap',
    seoTitle: 'Twice-Exceptional Kids: Giftedness Hiding a Gap',
    description: 'Understand twice-exceptional or 2e learners, why strengths can mask difficulties, and how parents can ask for support without self-diagnosing.',
    schemaDescription: 'A parent guide to twice-exceptional learners whose high ability and disability or learning difference can mask each other at school.',
    excerpt: 'A child can be highly capable and still need real support. Learn why 2e students are often missed and what evidence parents can bring to school.',
    keywords: ['twice exceptional child', '2e kids signs', 'gifted child learning disability', 'giftedness hides ADHD'],
    image: '/images/blogs/twice-exceptional-2e-child-learning-gaps.webp',
    imageAlt: 'Creative student building a complex model while school papers and planning notes sit nearby',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read', sensitive: true,
    intro: [
      "Some children can explain ideas years beyond their grade level and still cannot get a paragraph onto paper. They may solve a difficult problem, lose the assignment, and then be told they are too capable to need help.",
      "Twice-exceptional, often shortened to 2e, describes the coexistence of high ability and a disability or learning difference. It does not describe one personality type, and it cannot be confirmed from a checklist alone.",
    ],
    answer: "A twice-exceptional child shows high potential in one or more areas and also has a disability or learning difference that affects access, output, attention, communication, or well-being. Strengths can compensate for the difficulty, while the difficulty can suppress visible achievement. Good support develops the child’s talents and addresses the barrier at the same time.",
    sections: [
      { heading: 'Why are twice-exceptional students easy to miss?', paragraphs: [
        "Average-looking grades can hide two extremes. Strong reasoning pulls performance up while slow processing, dyslexia, ADHD, autism, anxiety, or another disability pulls output down. Because the final grade looks acceptable, neither the advanced need nor the support need is obvious.",
        "Masking can work in the other direction too. Adults may focus on incomplete work or behavior and never see the sophisticated thinking beneath it. Identification requires a broad view of patterns, history, observations, and appropriate assessment.",
      ] },
      { heading: 'What evidence should parents collect?', paragraphs: [
        "Bring specific contrasts rather than a label. A child may discuss a novel insightfully but write only two sentences, understand advanced math but make frequent copying errors, or build elaborate projects while missing routine deadlines.",
        "Ask the school how achievement, classroom output, cognitive strengths, and possible access barriers are being considered together. Supports should not require a child to give up advanced opportunities, and enrichment should not replace needed accommodations.",
      ], checklist: [
        'Save work samples that show both unusually strong thinking and recurring difficulty.',
        'Record when the problem appears, what support helps, and whether it occurs across settings.',
        'Ask for input from teachers in more than one subject.',
        'Request the school’s evaluation process in writing when concerns persist.',
        'Use a licensed professional for diagnosis, not an online checklist.',
      ] },
      { heading: 'What does balanced support look like?', paragraphs: [
        "A strength-based plan gives the student real intellectual challenge while reducing barriers that do not measure the target skill. Depending on documented needs, that might include assistive technology, explicit organization systems, different ways to show knowledge, or targeted instruction.",
        "The goal is not to remove every hard task. It is to make sure the hard part is the learning itself, not an unrelated barrier that keeps the child from showing what they know.",
      ] },
    ],
    faqs: [
      { question: 'Does 2e mean gifted plus ADHD?', answer: 'ADHD is one possible exceptionality, but 2e can involve learning disabilities, autism, speech and language disorders, emotional disabilities, physical disabilities, or other documented needs.' },
      { question: 'Can a child have good grades and still be twice-exceptional?', answer: 'Yes. Strong ability, heavy effort, or family support may compensate for a difficulty. Grades alone cannot confirm or rule out twice-exceptionality.' },
      { question: 'Can a tutor diagnose a 2e child?', answer: 'No. Tutors can document learning patterns and provide instruction, but diagnosis and eligibility decisions belong to qualified clinicians and school evaluation teams.' },
      { question: 'Should support focus on strengths or weaknesses first?', answer: 'Both matter. Strengths keep the child engaged and growing, while targeted support improves access and independence in areas of difficulty.' },
    ],
    sources: [
      { name: 'National Association for Gifted Children', url: 'https://www.nagc.org/news/position-papers', note: 'professional position papers addressing gifted and twice-exceptional learners' },
      { name: 'ERIC', url: 'https://eric.ed.gov/?id=EJ1265925', note: 'review of assessment implications for high-ability students with disabilities' },
    ],
    related: [
      { label: 'Why bright children can underachieve', href: '/growwise-blogs/gifted-underachiever-bright-child-not-lazy' },
      { label: 'Executive function struggles in smart kids', href: '/growwise-blogs/executive-function-smart-kids-missing-assignments' },
      { label: 'Spot learning gaps at home', href: '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'math-anxiety-in-children-signs-help',
    headline: 'Math Anxiety in Kids: Signs It Is More Than “Not a Math Person”',
    seoTitle: 'Math Anxiety in Kids: Signs and Help | Parent Guide',
    description: 'Learn the signs of math anxiety in children, how it differs from a skill gap, and what parents can do to lower pressure and rebuild confidence.',
    schemaDescription: 'Research-informed guidance for parents on recognizing math anxiety, checking for skill gaps, reducing pressure, and knowing when to seek help.',
    excerpt: 'Avoiding math, freezing, or saying “I am not a math person” may signal anxiety, a skill gap, or both. Here is how to respond calmly.',
    keywords: ['math anxiety in kids', 'child afraid of math', 'not a math person child', 'signs of math anxiety'],
    image: '/images/blogs/math-anxiety-in-children-signs-help.webp',
    imageAlt: 'Parent reassuring an elementary student during a calm math activity with counters and paper',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '8 min read', sensitive: true,
    intro: [
      "The math page appears and your child’s whole body changes. They stall, complain of a stomachache, rush, cry, or insist they have never learned something you watched them do yesterday.",
      "Math anxiety is not proof that a child lacks ability. It is also not a reason to ignore missing skills. Anxiety and performance can influence each other, which is why parents need a calm way to examine both.",
    ],
    answer: "Math anxiety is worry or tension connected specifically to math situations. Signs can include avoidance, physical distress, rushing, blanking on familiar work, or harsh self-talk. A child may also have a genuine skill gap, and the two can reinforce each other. Lower the pressure, observe patterns, and check understanding with short, untimed tasks.",
    sections: [
      { heading: 'What does math anxiety look like at home?', paragraphs: [
        "Some signs are loud, such as tears or refusal. Others are easy to mistake for carelessness: finishing too fast, refusing to show work, asking for reassurance after every step, or avoiding advanced classes despite strong performance.",
        "Look for context. Does distress rise when work is timed, when someone watches, or when mistakes are corrected publicly? Can your child solve the same kind of problem during a game or conversation? Those differences help separate emotional load from missing knowledge.",
      ] },
      { heading: 'How can parents reduce pressure without avoiding math?', paragraphs: [
        "Start with work your child can enter successfully, then add one manageable stretch. Give quiet thinking time before offering help. Treat mistakes as information by asking, ‘Which step changed the answer?’ instead of reacting to the score.",
        "Be careful with family stories such as ‘I was never good at math either.’ They may sound comforting, but they can make ability feel fixed. Try, ‘This feels hard right now, and we can find the part that needs practice.’",
      ], checklist: [
        'Use short, untimed practice before adding speed.',
        'Ask for an estimate before exact calculation to build number sense.',
        'Praise a useful strategy or correction, not a math identity.',
        'Let the teacher know when physical distress or blanking repeats.',
        'Talk with a pediatrician or mental-health professional when anxiety affects sleep, health, or school attendance.',
      ] },
      { heading: 'Can math anxiety and a learning gap happen together?', paragraphs: [
        "Yes. Avoidance reduces practice, and weak foundations make each new lesson feel more threatening. Support works best when it addresses the specific skill and the emotional experience instead of choosing one explanation too quickly.",
        "A brief skills check can identify whether the difficulty is narrow, broad, or mainly tied to pressure. It should not be presented as another high-stakes test.",
      ] },
    ],
    faqs: [
      { question: 'Is math anxiety a diagnosis?', answer: 'Math anxiety describes a pattern of worry related to math. It is not something parents should diagnose from one behavior or one difficult week.' },
      { question: 'Can a child with good math grades have math anxiety?', answer: 'Yes. Some students maintain strong grades through heavy preparation, reassurance, or avoidance of challenging courses while experiencing significant distress.' },
      { question: 'Should my child take a break from math?', answer: 'A brief reset can help during escalation, but long-term avoidance usually makes reentry harder. Return with a smaller, supported task when your child is calm.' },
      { question: 'When should we seek professional help?', answer: 'Seek guidance when worry is intense, persistent, causes physical symptoms, disrupts sleep or attendance, or spreads beyond math into broader anxiety.' },
    ],
    sources: [
      { name: 'PubMed Central', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5370099/', note: 'large study of math, test, and general anxiety in children' },
      { name: 'American Psychological Association', url: 'https://www.apa.org/news/press/releases/xge1302224.pdf', note: 'research on math anxiety and working memory' },
    ],
    related: [
      { label: 'Test anxiety vs. not knowing the material', href: '/growwise-blogs/test-anxiety-vs-content-gap' },
      { label: 'Why careless math mistakes happen', href: '/resources/careless-math-mistakes' },
      { label: 'Why children struggle with fractions', href: '/growwise-blogs/why-is-my-child-struggling-with-fractions' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'homework-nightly-fight-how-to-stop',
    headline: 'Why Homework Becomes a Nightly Fight and How to Stop the Cycle',
    seoTitle: 'Homework Is a Nightly Fight? How to Stop the Cycle',
    description: 'Understand why homework becomes a nightly battle and use a calmer routine that reduces power struggles without removing expectations.',
    schemaDescription: 'A practical parent guide to homework power struggles, including how to identify the trigger, reset roles, and build a calmer routine.',
    excerpt: 'When every assignment becomes a battle, the problem is bigger than tonight’s worksheet. Reset the pattern while keeping expectations clear.',
    keywords: ['homework fight every night', 'child refuses homework', 'homework power struggle', 'how to stop homework battles'],
    image: '/images/blogs/homework-nightly-fight-how-to-stop.webp',
    imageAlt: 'Parent and child resetting after homework at a quiet kitchen table with notebooks closed',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '8 min read',
    intro: [
      "It starts with one reminder. Soon you are repeating directions, checking the portal, negotiating every problem, and raising your voice. Your child is upset, you are exhausted, and the actual homework is barely moving.",
      "A nightly fight is a pattern between people, not proof that either person does not care. Changing the pattern begins with finding the point where the conflict starts.",
    ],
    answer: "Homework fights often grow from a mix of fatigue, unclear expectations, task difficulty, transition trouble, and a parent becoming responsible for every step. Stop the cycle by discussing the routine outside homework time, defining one start cue, giving limited choices, and stepping back from moment-to-moment control while keeping a clear boundary around completion and communication.",
    sections: [
      { heading: 'Why does homework trigger such a big reaction?', paragraphs: [
        "After a full school day, a child may have little energy left for another demand. Starting can be harder than doing, especially when the assignment feels confusing or the child expects criticism. A parent’s understandable urgency can then feel like pressure.",
        "Watch the first five minutes. Is the trigger putting away a device, choosing where to start, reading the directions, or seeing how much work is assigned? Solving that entry point often helps more than debating attitude.",
      ] },
      { heading: 'How do you reset the homework roles?', paragraphs: [
        "Talk when nobody is doing homework. Agree on the start window, location, first action, break plan, and what happens when instructions are unclear. Let your child choose between two workable options so they have agency without controlling whether homework happens.",
        "Your role is to provide structure and limited help. Your child’s role is to attempt the work and communicate. The teacher’s role includes clarifying assignments and adjusting support when the workload or difficulty is not appropriate.",
      ], checklist: [
        'Use one agreed start cue instead of repeated reminders.',
        'Begin with a two-minute setup task such as opening the portal and listing assignments.',
        'Offer help in short check-ins rather than sitting beside every problem.',
        'Stop explaining when emotions are escalating and return after a brief reset.',
        'Contact the teacher when work regularly exceeds the expected time or cannot be started independently.',
      ] },
      { heading: 'What if the calmer routine does not work?', paragraphs: [
        "A routine cannot fix work a child genuinely cannot access. Persistent fights may point to a skill gap, attention or executive-function difficulty, anxiety, an unrealistic workload, sleep problems, or a mismatch between instructions and understanding.",
        "Bring a short log to the teacher: start time, task, help needed, emotional intensity, and total duration. Concrete patterns make it easier to decide whether the next step is instructional, organizational, or emotional support.",
      ] },
    ],
    faqs: [
      { question: 'Should I let natural consequences handle missing homework?', answer: 'Natural consequences can support ownership when expectations are understood and the work is accessible. They are less useful when a child is confused, overloaded, or unable to organize the task.' },
      { question: 'How much homework help is too much?', answer: 'If you are supplying most answers, monitoring every step, or working harder than your child, shift toward brief prompts and teacher communication.' },
      { question: 'Should homework happen right after school?', answer: 'Some children benefit from momentum, while others need food and movement first. Choose a predictable window based on when your child can start and sustain attention.' },
      { question: 'When should a homework fight concern me?', answer: 'Seek more support when conflict is intense or daily, work takes far longer than expected, your child cannot begin familiar tasks, or the pattern affects sleep and family relationships.' },
    ],
    sources: [
      { name: 'American Academy of Pediatrics', url: 'https://www.healthychildren.org/English/ages-stages/teen/school/Pages/Helping-Your-Teen-Succeed-In-School.aspx', note: 'guidance on routines, materials, and homework distractions' },
      { name: 'Institute of Education Sciences', url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', note: 'evidence-based study and learning practices' },
    ],
    related: [
      { label: 'Homework independence by age', href: '/resources/homework-independence' },
      { label: 'Executive function and missing assignments', href: '/growwise-blogs/executive-function-smart-kids-missing-assignments' },
      { label: 'Screen time and homework focus', href: '/growwise-blogs/screen-time-homework-focus-distractions' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'executive-function-smart-kids-missing-assignments',
    headline: 'Executive Function Struggles: Why Smart Kids Lose Papers and Miss Work',
    seoTitle: 'Executive Function: Why Smart Kids Miss Assignments',
    description: 'Why capable students lose papers, miss assignments, and struggle to start, plus simple systems that build executive-function support.',
    schemaDescription: 'A non-diagnostic parent guide to executive-function demands in school, including planning, starting, working memory, organization, and monitoring.',
    excerpt: 'Knowing the material does not automatically create a plan. Help a capable student manage starts, materials, deadlines, and follow-through.',
    keywords: ['executive function struggles kids', 'smart kid missing assignments', 'child loses homework papers', 'student cannot stay organized'],
    image: '/images/blogs/executive-function-smart-kids-missing-assignments.webp',
    imageAlt: 'Middle school student organizing folders and a weekly planner with a parent nearby',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read', sensitive: true,
    intro: [
      "Your child understands the lesson and can explain the answer. The assignment is still missing. Papers disappear, projects start the night before, and every reminder seems to evaporate.",
      "Academic ability and executive function are not the same thing. A student may reason well while still needing explicit systems for planning, starting, remembering, organizing, and checking work.",
    ],
    answer: "Executive function is a group of self-management skills used to start tasks, hold directions in mind, plan time, organize materials, shift strategies, and monitor progress. A bright student can understand difficult content and still miss assignments when those systems are overloaded. Externalize the plan, reduce steps, and teach routines directly instead of relying on repeated reminders.",
    sections: [
      { heading: 'What do executive-function struggles look like at school?', paragraphs: [
        "The same student may complete a challenging discussion in class and forget to submit the written response. They may underestimate project time, overlook one page of directions, or freeze because they cannot decide where to begin.",
        "These behaviors can occur for many reasons, including normal development, stress, sleep loss, attention differences, anxiety, learning difficulties, or an environment with too many systems. They do not confirm ADHD or any other diagnosis.",
      ] },
      { heading: 'Which systems reduce the daily load?', paragraphs: [
        "Choose one trusted place for assignments and one daily time to review it. Break vague tasks into visible actions such as open the document, write three headings, and draft the first paragraph. A plan works better when the next action is obvious.",
        "Use external supports while the skill develops: checklists, calendar alerts, labeled folders, a launch pad by the door, and a five-minute end-of-day reset. Support should gradually shift toward the student, not disappear overnight.",
      ], checklist: [
        'Use one assignment list rather than several competing notes and apps.',
        'Turn each project into dated next actions.',
        'Create a fixed place for papers and materials that travel to school.',
        'Schedule a brief daily review before leisure screen time begins.',
        'Praise using the system, even when the outcome is not perfect yet.',
      ] },
      { heading: 'When should families ask for more help?', paragraphs: [
        "Talk with the teacher when missing work continues across subjects or the school portal does not match what your child understands. Ask which step breaks down and which classroom systems are already available.",
        "If the pattern is persistent across home and school, causes significant distress, or interferes with daily functioning, discuss it with the school support team and your child's pediatrician. A full evaluation considers development and multiple possible causes.",
      ] },
    ],
    faqs: [
      { question: 'Are executive-function struggles the same as ADHD?', answer: 'No. ADHD can involve executive-function difficulties, but similar behaviors can arise from development, stress, sleep, anxiety, learning differences, or an overloaded environment.' },
      { question: 'Should parents keep checking the school portal?', answer: 'Use the portal as a teaching tool during one scheduled review. Constant checking and rescue can keep responsibility with the parent instead of building the student’s routine.' },
      { question: 'Why does my child remember hobbies but forget homework?', answer: 'Interest, immediate feedback, and a clear next action can reduce executive demands. Homework often involves delayed rewards, several steps, and competing systems.' },
      { question: 'Do planners work for every student?', answer: 'Only if the planner is consistently available, updated, and reviewed. The best system is simple enough for the student to use on an ordinary tired day.' },
    ],
    sources: [
      { name: 'CHADD', url: 'https://chadd.org/wp-content/uploads/2023/06/Attn_06_2023-Executive-Function-Coach.pdf', note: 'practical overview of executive-function support for students' },
      { name: 'Harvard Center on the Developing Child', url: 'https://developingchild.harvard.edu/resource-guides/guide-executive-function/', note: 'developmental overview of executive function and self-regulation' },
    ],
    related: [
      { label: 'Homework fights and how to reset them', href: '/growwise-blogs/homework-nightly-fight-how-to-stop' },
      { label: 'Gifted underachievement', href: '/growwise-blogs/gifted-underachiever-bright-child-not-lazy' },
      { label: 'Homework independence by age', href: '/resources/homework-independence' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'is-my-child-behind-grade-level-diagnostic',
    headline: 'Is My Child Behind for Their Grade? A No-Panic Parent Diagnostic',
    seoTitle: 'Is My Child Behind for Their Grade? Parent Checklist',
    description: 'Use a calm, practical checklist to decide whether your child is behind, still developing normally, or ready for a teacher conversation.',
    schemaDescription: 'A no-panic parent framework for checking grade-level concerns through independent work, classroom expectations, growth, and multiple sources of evidence.',
    excerpt: 'One hard assignment does not mean your child is behind. Use four kinds of evidence to decide whether concern is temporary, specific, or worth evaluating.',
    keywords: ['is my child behind for their grade', 'grade level diagnostic parents', 'how to know child is behind school', 'child academic progress checklist'],
    image: '/images/blogs/is-my-child-behind-grade-level-diagnostic.webp',
    imageAlt: 'Parent calmly observing an elementary child read and solve a short math problem at home',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '9 min read',
    intro: [
      "A difficult homework night can make a parent jump years ahead. What if this is not a phase? What if everyone else has noticed a gap and you have not?",
      "Pause before turning worry into a label. Being behind is not one feeling or one score. It is a pattern of current skills, independence, growth, and classroom evidence.",
    ],
    answer: "To tell whether a child may be behind, compare four things: the grade-level skill expected now, what your child can do independently, whether performance is improving, and whether teachers or assessments see the same pattern. One hard unit or low score is not enough. Repeated difficulty across several measures deserves a focused conversation and plan.",
    sections: [
      { heading: 'What does “behind grade level” actually mean?', paragraphs: [
        "The phrase should point to a specific skill and expectation, not a general judgment. ‘Reading is behind’ is vague. ‘Has difficulty retelling an unfamiliar grade-level passage without prompts’ gives adults something they can examine and teach.",
        "Children also develop unevenly. A student may be ahead in reasoning, on track in reading, and need support with written output. A useful diagnostic keeps those differences visible.",
      ] },
      { heading: 'What can parents check without creating another test?', paragraphs: [
        "Choose a calm moment and a short, unfamiliar task connected to current schoolwork. Ask your child to read and explain, solve and justify, or write briefly without step-by-step help. Stop before frustration takes over.",
        "Compare the result with teacher feedback and recent work. Then ask about growth. A child who is below a benchmark but making strong progress needs a different response from a child whose performance has been flat for months.",
      ], checklist: [
        'Name the exact skill you are concerned about.',
        'Observe one short independent task without coaching each step.',
        'Ask the teacher what grade-level work looks like right now.',
        'Compare at least two sources, such as work samples and an assessment.',
        'Set a six-to-eight-week checkpoint for one focused support plan.',
      ] },
      { heading: 'When is it time to request evaluation or support?', paragraphs: [
        "Ask for more information when the same difficulty appears across settings, progress remains limited despite targeted instruction, the gap is widening, or your child is distressed. Start with the teacher and ask what instruction or intervention has already been tried.",
        "A school evaluation or licensed professional may be appropriate when adults suspect a learning, attention, language, developmental, or emotional barrier. A blog checklist cannot make that determination.",
      ] },
    ],
    faqs: [
      { question: 'Does one low standardized score mean my child is behind?', answer: 'No. Use the score as one signal and compare it with classroom work, teacher observations, independent performance, and growth over time.' },
      { question: 'How can I check skills without teaching to the test?', answer: 'Use short, authentic tasks such as explaining a passage, solving mixed problems, or writing a response. Focus on reasoning and independence.' },
      { question: 'Should I compare my child with classmates?', answer: 'Use defined grade-level expectations and your child’s growth rather than informal comparisons, which may be incomplete or misleading.' },
      { question: 'How long should we wait before seeking help?', answer: 'Do not wait for failure when a clear pattern persists. After targeted support begins, set a specific review date with the teacher rather than waiting indefinitely.' },
    ],
    sources: [
      { name: 'California Assessment of Student Performance and Progress', url: 'https://www.caaspp-elpac.org/resources/reporting/ssr-and-reporting-resources', note: 'official assessment information for California families' },
      { name: 'California Common Core State Standards', url: 'https://www.cde.ca.gov/re/cc/', note: 'official grade-level standards and resources' },
    ],
    related: [
      { label: 'Report card looks fine, but is my child behind?', href: '/growwise-blogs/report-card-fine-child-actually-behind' },
      { label: 'Spot learning gaps at home', href: '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide' },
      { label: 'Why grades hide gaps', href: '/resources/why-grades-hide-learning-gaps' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'screen-time-homework-focus-distractions',
    headline: 'Screen Time and Homework Focus: What Is Actually Distracting Your Child?',
    seoTitle: 'Screen Time and Homework Focus | Parent Guide',
    description: 'Separate necessary school technology from entertainment distractions and build a realistic homework focus plan without banning every screen.',
    schemaDescription: 'A practical parent guide to reducing digital distraction during homework while recognizing that school assignments often require screens.',
    excerpt: 'The laptop may be required for homework, but notifications and tab switching are not. Build a focus plan around the actual distraction.',
    keywords: ['screen time homework focus', 'phone distracting child homework', 'student distracted by screens', 'homework technology rules'],
    image: '/images/blogs/screen-time-homework-focus-distractions.webp',
    imageAlt: 'Teen completing online homework at a clean desk with phone placed in a basket nearby',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '8 min read',
    intro: [
      "Telling a student to get off screens during homework sounds reasonable until the assignment, textbook, teacher messages, and submission portal all live on a screen.",
      "The better question is not how to remove every device. It is which digital behaviors are interrupting the work and what boundary can reduce them.",
    ],
    answer: "Homework focus is usually disrupted less by the school laptop itself than by switching between the assignment and messages, videos, games, or social media. Keep required technology available, turn off nonessential notifications, move the phone out of reach, close unrelated tabs, and use planned check breaks. Build the rule with your child and model it yourself.",
    sections: [
      { heading: 'Which screen behavior is causing the problem?', paragraphs: [
        "Observe before setting a rule. Is your child opening entertainment tabs, responding to every notification, using a phone while the laptop loads, or avoiding a confusing task by searching endlessly? Each pattern needs a different fix.",
        "The American Academy of Pediatrics now emphasizes context, content, and family conversation rather than one simple number for every child. During homework, the aim is to protect learning and sleep while keeping necessary tools usable.",
      ] },
      { heading: 'What does a realistic homework screen plan include?', paragraphs: [
        "Start with a clean digital workspace. Close unrelated tabs, use full-screen mode when helpful, silence nonessential alerts, and place the phone outside arm's reach. Decide in advance when messages can be checked.",
        "Include your child in the plan. Ask which notifications are hardest to ignore and which school tasks genuinely need communication. A rule is easier to follow when it matches the real workflow.",
      ], checklist: [
        'Separate required school technology from entertainment use.',
        'Turn off nonessential notifications before the work block starts.',
        'Keep the phone in a shared charging place during focused work.',
        'Use one planned message break instead of frequent checking.',
        'Review sleep, movement, task difficulty, and hunger before blaming the device.',
      ] },
      { heading: 'What if removing the phone does not improve focus?', paragraphs: [
        "The screen may have been the visible escape, not the underlying problem. If focus still breaks down, check whether the task is understood, appropriately difficult, and divided into manageable steps.",
        "Persistent attention problems across many settings deserve a broader conversation with teachers and the pediatrician. Device habits can affect attention, but they should not be used to diagnose or dismiss another need.",
      ] },
    ],
    faqs: [
      { question: 'Should phones be banned during homework?', answer: 'A phone-free focus block helps many students, but the plan should account for legitimate school communication and use predictable check times rather than constant negotiation.' },
      { question: 'Does all screen time hurt school performance?', answer: 'No. Content and context matter. Creating, researching, and completing schoolwork differ from frequent switching to entertainment or social media.' },
      { question: 'What if homework requires several websites?', answer: 'Use a written list of required sites, close each when finished, and keep unrelated tabs and notifications off during the work block.' },
      { question: 'How can parents model better focus?', answer: 'Put your own phone away during shared work or family time, name when you are using it for a necessary task, and follow the same notification rules.' },
    ],
    sources: [
      { name: 'American Academy of Pediatrics Family Media Plan', url: 'https://www.healthychildren.org/English/family-life/Media/Pages/How-to-Make-a-Family-Media-Use-Plan.aspx', note: 'current family media guidance' },
      { name: 'AAP teen school guidance', url: 'https://www.healthychildren.org/English/ages-stages/teen/school/Pages/Helping-Your-Teen-Succeed-In-School.aspx', note: 'guidance on digital switching during homework' },
    ],
    related: [
      { label: 'Homework fights and how to stop them', href: '/growwise-blogs/homework-nightly-fight-how-to-stop' },
      { label: 'Executive function and missing assignments', href: '/growwise-blogs/executive-function-smart-kids-missing-assignments' },
      { label: 'Ways to improve a child’s focus', href: '/growwise-blogs/improve-child-focus-feel-valued' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'private-vs-public-school-dublin-pleasanton',
    headline: 'Private vs. Public School Rigor in Dublin and Pleasanton: What Matters?',
    seoTitle: 'Private vs. Public Schools in Dublin and Pleasanton',
    description: 'Compare private and public school rigor in Dublin and Pleasanton using course access, teaching fit, workload, support, and your child’s needs.',
    schemaDescription: 'A balanced local parent guide to comparing public and private schools through verified programs, instructional fit, workload, student support, and total cost.',
    excerpt: 'A heavier workload does not automatically mean deeper learning. Compare the school experience your child will actually have, not the label alone.',
    keywords: ['private vs public school Dublin CA', 'Pleasanton private school vs public', 'school rigor Tri-Valley', 'best school fit Dublin Pleasanton'],
    image: '/images/blogs/private-vs-public-school-dublin-pleasanton.webp',
    imageAlt: 'Tri-Valley family comparing two school information folders together at a dining table',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '10 min read',
    intro: [
      "Families comparing schools often use rigor as shorthand for quality. One school assigns more homework, another offers more advanced courses, and a third promises smaller classes. Those facts matter, but none tells you how well your child will learn there.",
      "The useful comparison is specific: course access, teaching quality, feedback, workload, student support, climate, commute, and total cost. Public or private is only the starting category.",
    ],
    answer: "Neither private nor public schools are automatically more rigorous. Meaningful rigor combines strong content, explanation, feedback, and appropriate challenge without making workload the goal. Compare current course catalogs, class experience, support systems, student well-being, commute, and cost. Judge the fit for your child rather than relying on reputation or homework volume.",
    sections: [
      { heading: 'What does academic rigor actually look like?', paragraphs: [
        "Rigor is not simply more pages, faster pacing, or younger students taking older courses. Look for work that asks students to explain, transfer ideas, revise, and make connections. Ask how teachers respond when a capable student needs challenge or when a student has a gap.",
        "Review actual assignments and course sequences when schools make them available. Ask how much work is completed with feedback and how much is independent volume. A demanding schedule without recovery can produce compliance without durable learning.",
      ] },
      { heading: 'Which local facts should families verify?', paragraphs: [
        "Use official Dublin Unified and Pleasanton Unified school pages for current public-school programs, boundaries, policies, and course catalogs. Use each private school's current materials for tuition, accreditation, course offerings, support services, and enrollment conditions.",
        "Do not assume a statistic from one campus applies to another. Visit during a normal school day if possible, and ask the same questions at every school so the comparison remains fair.",
      ], checklist: [
        'Compare current course sequences and access rules, not only course names.',
        'Ask how teachers identify and respond to both gaps and advanced readiness.',
        'Review feedback quality, average nightly workload, and major project timing.',
        'Include commute, tuition, fees, transportation, and schedule constraints.',
        'Ask your child which environment helps them participate and recover from mistakes.',
      ] },
      { heading: 'How can parents make a child-specific decision?', paragraphs: [
        "Write down the three conditions your child needs most, such as smaller instructional groups, advanced math access, learning support, arts, athletics, or a manageable commute. Score each option against those conditions before adding reputation.",
        "A school choice is not permanent proof of good parenting. Revisit the fit using your child's learning, health, relationships, and independence after the transition, not only the transcript.",
      ] },
    ],
    faqs: [
      { question: 'Are private schools more academically rigorous?', answer: 'Some are, and some are not. Compare actual curriculum, assignments, feedback, course access, and student support rather than relying on the private-school label.' },
      { question: 'Does more homework mean a stronger school?', answer: 'No. Homework can support practice, but volume alone does not show depth, feedback quality, or lasting understanding.' },
      { question: 'How should families compare AP access?', answer: 'Use current course catalogs and enrollment policies. Dublin Unified adopted AP and Honors limits in 2026, so compare opportunities within each school’s documented context.' },
      { question: 'Should test scores decide the school choice?', answer: 'Use them as one community-level signal. They do not describe teaching fit, individual growth, support quality, climate, or your child’s likely classroom experience.' },
    ],
    sources: [
      { name: 'Dublin Unified School District', url: 'https://www.dublinusd.org/', note: 'official district programs, schools, and policies' },
      { name: 'Pleasanton Unified School District', url: 'https://www.pleasantonusd.net/', note: 'official district programs, schools, and policies' },
      { name: 'California School Dashboard', url: 'https://www.caschooldashboard.org/', note: 'official state school performance and local indicator data' },
    ],
    related: [
      { label: 'How many AP classes are too many?', href: '/growwise-blogs/how-many-ap-classes-too-many-dublin-tri-valley' },
      { label: 'Report card looks fine, but is my child behind?', href: '/growwise-blogs/report-card-fine-child-actually-behind' },
      { label: 'Best tutoring options in Dublin', href: '/resources/best-tutoring-dublin-ca' },
    ],
    cta: assessmentCta,
  },
  {
    slug: 'child-hates-reading-motivation-help',
    headline: 'My Child Hates Reading: Motivation Fixes Before Another Program',
    seoTitle: 'My Child Hates Reading: Motivation Help for Parents',
    description: 'Before buying another reading program, find out whether difficulty, choice, pressure, or routine is draining your child’s motivation to read.',
    schemaDescription: 'A practical parent guide to reading motivation, including how to separate skill difficulty from preference and rebuild low-pressure reading experiences.',
    excerpt: 'A child who hates reading may be avoiding difficulty, pressure, poor book fit, or a routine that feels like a test. Find the reason before adding more.',
    keywords: ['my child hates reading', 'how to motivate child to read', 'child refuses to read', 'reading motivation for kids'],
    image: '/images/blogs/child-hates-reading-motivation-help.webp',
    imageAlt: 'Parent and child choosing an engaging book together from a cozy home bookshelf',
    publishedDate: DATE, displayDate: DISPLAY_DATE, readTime: '8 min read',
    intro: [
      "You bring home books, create a reading chart, and offer rewards. Your child still avoids reading, negotiates every page, or says every book is boring.",
      "Motivation is not separate from skill, identity, choice, and experience. Before adding another program, find out what reading currently costs your child.",
    ],
    answer: "A child may hate reading because decoding or comprehension is tiring, the books do not fit their interests, reading has become a performance test, or screens and other activities offer faster rewards. First check whether the work is accessible. Then restore choice, shared reading, short successful sessions, and conversation that focuses on ideas rather than constant correction.",
    sections: [
      { heading: 'Is the problem motivation or reading difficulty?', paragraphs: [
        "Notice what your child avoids. Do they enjoy audiobooks but resist print? Can they read the words but not explain the passage? Do they choose books that are visually appealing but too difficult to sustain? These patterns point to different needs.",
        "Ask the teacher about decoding, fluency, vocabulary, and comprehension. A child who is using most of their energy to identify words has little attention left for the story, so telling them to love reading will not solve the load.",
      ] },
      { heading: 'How can parents rebuild willingness to read?', paragraphs: [
        "Lower the emotional stakes. Let your child abandon a book that is a poor fit, reread a favorite, choose graphic novels or nonfiction, and alternate pages with an adult. Listening to a rich audiobook can build knowledge and interest while print skills receive separate support.",
        "Talk about the idea before correcting every error. Ask which part was surprising, confusing, funny, or unfair. Reading starts to feel human again when the conversation is bigger than minutes and levels.",
      ], checklist: [
        'Offer three genuinely different choices instead of one assigned book.',
        'Use a short daily reading window that ends before conflict peaks.',
        'Read aloud or alternate pages without turning every mistake into a lesson.',
        'Connect books to a current hobby, question, movie, or real-world project.',
        'Ask the teacher for a skill check when reading remains unusually effortful.',
      ] },
      { heading: 'When is another reading program the right next step?', paragraphs: [
        "A program may help when assessment identifies a specific skill need and the instruction matches it. More generic reading time will not necessarily fix decoding, fluency, language, or comprehension difficulties.",
        "Ask what the program teaches, how progress is measured, and what happens if growth is limited. Motivation often improves when reading becomes more successful, but children still need choice and a reason to care about what they read.",
      ] },
    ],
    faqs: [
      { question: 'Should I require daily reading if my child hates it?', answer: 'A short predictable routine can help, but daily conflict and work far above the child’s level can strengthen avoidance. Adjust access, support, and choice.' },
      { question: 'Do graphic novels count as reading?', answer: 'Yes. They require language, sequencing, inference, and comprehension. They can be a useful bridge while other reading skills are supported directly.' },
      { question: 'Are audiobooks cheating?', answer: 'No. Audiobooks build language, knowledge, and story engagement. They do not replace direct print instruction when a child has a decoding or fluency need.' },
      { question: 'When should I request a reading evaluation?', answer: 'Ask for more information when reading remains unusually slow or effortful, avoidance is persistent, comprehension is weak, or progress is limited despite appropriate instruction.' },
    ],
    sources: [
      { name: 'Reading Rockets', url: 'https://www.readingrockets.org/resources/resource-library/dimensions-childrens-motivation-reading-and-their-relations-reading', note: 'research summary on the dimensions of reading motivation' },
      { name: 'U.S. Department of Education and HHS', url: 'https://www.readingrockets.org/topics/about-reading/articles/what-scientifically-based-reading-research', note: 'overview of scientifically based reading research' },
    ],
    related: [
      { label: 'Reading fluency vs. comprehension', href: '/resources/reading-fluency-vs-comprehension' },
      { label: 'My child reads words but misses meaning', href: '/growwise-blogs/child-reads-but-doesnt-understand-passage' },
      { label: 'Does my child need reading help?', href: '/growwise-blogs/does-my-child-need-reading-help-checklist' },
    ],
    cta: { ...assessmentCta, headline: 'Not sure whether the barrier is skill or motivation?', text: 'A free GrowWise assessment can identify how decoding, fluency, and comprehension are affecting your child’s reading experience.' },
  },
]

export const PARENT_PAIN_GUIDE_SLUGS = [
  'homework-grades-good-but-fails-tests',
  'gifted-underachiever-bright-child-not-lazy',
  'twice-exceptional-2e-child-learning-gaps',
  'math-anxiety-in-children-signs-help',
  'homework-nightly-fight-how-to-stop',
  'report-card-fine-child-actually-behind',
  'how-many-ap-classes-too-many-dublin-tri-valley',
  'middle-school-math-cliff-pre-algebra',
  'understand-child-psat-score-report',
  'test-anxiety-vs-content-gap',
  'executive-function-smart-kids-missing-assignments',
  'is-my-child-behind-grade-level-diagnostic',
  'screen-time-homework-focus-distractions',
  'private-vs-public-school-dublin-pleasanton',
  'child-hates-reading-motivation-help',
] as const

const RAW_GUIDE_BY_SLUG = new Map(GUIDES.map((guide) => [guide.slug, guide]))

export const PARENT_PAIN_GUIDES: readonly ParentPainGuide[] = PARENT_PAIN_GUIDE_SLUGS.map((slug) => {
  const guide = RAW_GUIDE_BY_SLUG.get(slug)
  if (!guide) throw new Error(`Missing parent pain guide: ${slug}`)
  return guide
})

const GUIDE_BY_SLUG = new Map(PARENT_PAIN_GUIDES.map((guide) => [guide.slug, guide]))

export function getParentPainGuide(slug: string) {
  return GUIDE_BY_SLUG.get(slug)
}

export type { ParentPainGuide } from './types'
