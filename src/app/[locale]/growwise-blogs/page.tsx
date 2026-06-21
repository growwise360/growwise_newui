import { Metadata } from 'next'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { notFound } from 'next/navigation'

import Link from 'next/link'
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { page } = (await searchParams) ?? {}
  const pageNum = parsePageNumber(page)

  const metadata = generateMetadataFromPath('/growwise-blogs', locale)
  const baseMetadata =
    metadata || {
      title: 'GrowWise Blog | Math, English & Coding Tips',
      description:
        'Practical articles on tutoring, English, coding, and STEAM for Dublin and Tri-Valley families.',
    }

  if (pageNum && pageNum > 1) {
    return {
      ...baseMetadata,
      title: `GrowWise Blog — Page ${pageNum} | GrowWise`,
      alternates: {
        canonical: absoluteSiteUrl(`/growwise-blogs?page=${pageNum}`, locale, getCanonicalSiteUrl()),
      },
    }
  }

  return baseMetadata
}

interface BlogPost {
  id: string;
  category: 'academic' | 'Coding';
  title: string;
  excerpt: string;
  href: string;
  readMore?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'reading-comprehension-words-no-understanding-2026',
    category: 'academic',
    title: 'My Child Can Read the Words but Doesn’t Understand the Passage',
    excerpt:
      'Why fluent reading can hide a comprehension gap—and how parents can check retelling, main idea, vocabulary, inference, and evidence.',
    href: '/growwise-blogs/child-reads-but-doesnt-understand-passage',
    readMore: 'Read parent guide »',
  },
  {
    id: 'fractions-parent-guide-2026',
    category: 'academic',
    title: 'Why Is My Child Struggling With Fractions?',
    excerpt:
      'A parent guide to fraction meaning, number lines, visual models, equivalent fractions, and the mistakes that memorized rules often hide.',
    href: '/growwise-blogs/why-is-my-child-struggling-with-fractions',
    readMore: 'Read parent guide »',
  },
  {
    id: 'common-core-math-strategies-2026',
    category: 'academic',
    title: 'Common Core Math Strategies Parents Can Use at Home',
    excerpt:
      'A practical parent guide to number lines, area models, bar models, place value, and helping with math homework without taking over.',
    href: '/growwise-blogs/common-core-math-strategies-parents',
    readMore: 'Read parent guide »',
  },
  {
    id: 'ai-homework-help-2026',
    category: 'academic',
    title: 'Can ChatGPT Replace a Tutor?',
    excerpt:
      'A parent guide to AI homework help, cheating boundaries, hidden learning gaps, and when children still need human support.',
    href: '/growwise-blogs/can-chatgpt-replace-a-tutor-ai-homework-help',
    readMore: 'Read parent guide »',
  },
  {
    id: 'reading-help-checklist-2026',
    category: 'academic',
    title: 'Does My Child Need Reading Help This Summer?',
    excerpt:
      'A 5-minute reading checklist for Dublin and Tri-Valley parents to spot decoding, fluency, and comprehension warning signs before summer gaps grow.',
    href: '/growwise-blogs/does-my-child-need-reading-help-checklist',
    readMore: 'Read checklist »',
  },
  {
    id: 'b-plus-math-understanding',
    category: 'academic',
    title: "Your Child Got a B+. That Doesn't Mean They Understand the Math.",
    excerpt:
      'Good grades can mask gaps in real math understanding. Here\'s how Tri-Valley parents tell the difference—and what to do next.',
    href: '/growwise-blogs/your-child-got-a-b-plus-doesnt-mean-they-understand-the-math',
    readMore: 'Read article »',
  },
  {
    id: 'math-finals-2026',
    category: 'academic',
    title: 'High School Math Finals Prep in Dublin, CA: Algebra 1–AP Precalculus',
    excerpt:
      'How to prepare for Algebra 1, Algebra 2, Precalculus, and AP Precalculus finals—practice plans, what to review, and in-center finals prep in Dublin, CA.',
    href: '/growwise-blogs/high-school-math-finals-prep-dublin-tri-valley',
    readMore: 'Read article »',
  },
  {
    id: '1',
    category: 'academic',
    title: 'US Kids & Core Skills — How Parents Can Help',
    excerpt: 'Understanding the challenges and solutions for improving student performance in core subjects.',
    href: '/growwise-blogs/us-kids-falling-behind-math-english-parent-assessments',
    readMore: 'Read article »'
  },
  {
    id: '2',
    category: 'academic',
    title: '12 Smart & Simple Ways to Improve Your Child\'s Focus',
    excerpt: 'Practical strategies to help your child develop better concentration and attention skills.',
    href: '/growwise-blogs/improve-child-focus-feel-valued',
    readMore: 'Read article »'
  },
  {
    id: '3',
    category: 'academic',
    title: 'Spot Learning Gaps at Home',
    excerpt: 'Learn how to spot and address learning gaps to ensure your child stays on track.',
    href: '/growwise-blogs/how-to-identify-learning-gaps-in-your-childs-education-at-home-parent-guide',
    readMore: 'Read article »'
  },
  {
    id: '17',
    category: 'academic',
    title: "Your Kids Aren't Distracted — They Were Never Taught How to Think",
    excerpt: "Fallon Middle School showed a thinking gap—not just screen time. Practical steps for Tri-Valley parents, plus a free Parent Playbook.",
    href: '/growwise-blogs/thinking-gap-your-kids-arent-distracted',
    readMore: 'Read article »'
  },
  {
    id: '4',
    category: 'Coding',
    title: 'Choosing the Right Summer Camp (Parents)',
    excerpt: 'A comprehensive guide to selecting the perfect summer camp experience for your child.',
    href: '/growwise-blogs/how-to-choose-the-right-summer-camp-for-your-child-a-parents-guide',
    readMore: 'Read article »'
  },
  {
    id: '5',
    category: 'Coding',
    title: 'From Roblox Player to Game Developer',
    excerpt: 'Transform your child\'s gaming passion into valuable coding and development skills.',
    href: '/growwise-blogs/how-to-go-from-roblox-player-to-game-developer-and-earn-real-robux',
    readMore: 'Read article »'
  },
  {
    id: '6',
    category: 'Coding',
    title: 'Summer Camp: Confidence & Fun',
    excerpt: 'Discover how summer camps can help children develop essential life skills while having fun.',
    href: '/growwise-blogs/unlocking-confidence-independence-and-fun-through-summer-camp',
    readMore: 'Read article »'
  },
  {
    id: '7',
    category: 'Coding',
    title: 'Coding & Tech Skills',
    excerpt: 'Discover how coding skills help students build problem-solving confidence and create with technology.',
    href: '/growwise-blogs/embrace-the-future-of-technology-advance-your-coding-expertise-with-growwise',
    readMore: 'Read article »'
  },
  {
    id: '8',
    category: 'Coding',
    title: 'Coding Skills & Tomorrow’s AI',
    excerpt: 'Learn how mastering coding today positions you to be at the forefront of tomorrow\'s AI-driven innovations.',
    href: '/growwise-blogs/how-coding-skills-empower-you-to-shape-tomorrows-ai-innovations',
    readMore: 'Read article »'
  },
  {
    id: '9',
    category: 'Coding',
    title: 'Python for Future-Ready Students',
    excerpt: 'Why Python is a practical first text-based language for students building AI, data, automation, and project confidence.',
    href: '/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers',
    readMore: 'Read article »'
  },
  {
    id: '10',
    category: 'Coding',
    title: 'Technical Skills Before College',
    excerpt: 'How early technical projects help students test interests, build confidence, and create proof of future-ready skills.',
    href: '/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career',
    readMore: 'Read article »'
  },
  {
    id: '11',
    category: 'Coding',
    title: 'Programming Skills for Student Profiles',
    excerpt: 'How coding projects help students show problem-solving, technical fluency, and builder confidence before college.',
    href: '/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities',
    readMore: 'Read article »'
  },
  {
    id: '12',
    category: 'Coding',
    title: 'Java Skills for Student Profiles',
    excerpt: 'When Java makes sense for students ready for object-oriented thinking, deeper projects, and CS foundations.',
    href: '/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile',
    readMore: 'Read article »'
  },
  {
    id: '13',
    category: 'Coding',
    title: 'Best Programming Languages for Students',
    excerpt: 'A parent-friendly comparison of Python, JavaScript, Java, and project goals so students choose the right path.',
    href: '/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement',
    readMore: 'Read article »'
  },
  {
    id: '14',
    category: 'Coding',
    title: 'Choosing the Right Coding Class',
    excerpt: 'Learn how selecting the right coding class gives your child structure, feedback, and real project progress.',
    href: '/growwise-blogs/the-advantage-in-choosing-the-right-coding-class-for-your-child',
    readMore: 'Read article »'
  },
  {
    id: '15',
    category: 'Coding',
    title: 'Code as a Modern Skill',
    excerpt: 'Explore why coding has become an essential skill in today\'s digital world and how it opens doors to innovation and opportunity.',
    href: '/growwise-blogs/harnessing-the-power-of-code-a-skill-for-the-modern-era',
    readMore: 'Read article »'
  },
  {
    id: '16',
    category: 'Coding',
    title: 'Coding for Kids — Future-Ready Skills',
    excerpt: 'Understand why coding education for children is crucial for developing problem-solving skills and preparing them for the future.',
    href: '/growwise-blogs/the-importance-of-coding-for-kids-building-future-ready-skills',
    readMore: 'Read article »'
  }
];

const POSTS_PER_PAGE = 6

function parsePageNumber(page: string | undefined): number | null {
  if (page === undefined) return 1
  if (!/^[1-9]\d*$/.test(page)) return null
  return Number.parseInt(page, 10)
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GrowWiseBlogsPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const { page } = await searchParams
  const currentPage = parsePageNumber(page)
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  if (!currentPage || currentPage > totalPages) {
    notFound()
  }
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = blogPosts.slice(startIndex, endIndex)
  
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
  ]

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "GrowWise Blog — Math, Coding & STEAM for Grades 1-12 Families",
    "description": "Practical articles on tutoring, English, coding, and STEAM for Dublin and Tri-Valley families.",
    "url": absoluteSiteUrl('/growwise-blogs', locale, baseUrl),
    "publisher": {
      "@type": "Organization",
      "name": "GrowWise",
      "url": baseUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              GrowWise Blogs
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Tips and blogs on math tutoring, English help, coding for kids, and STEAM Programs for Grades 1–12 in Dublin, Pleasanton, and San Ramon.
            </p>
            <p className="text-base md:text-lg text-gray-200/95 max-w-2xl mx-auto mt-4">
              Looking ahead to summer?{' '}
              <Link href={publicPath('/camps/summer', locale)} className="font-semibold text-white underline decoration-white/60 hover:decoration-white">
                Explore summer camps
              </Link>{' '}
              in Dublin and the Tri-Valley.
            </p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  {/* Category Badge */}
                  <div className="px-6 pt-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      post.category === 'academic'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#1F396D] mb-3 hover:text-[#F16112] transition-colors">
                      <Link href={post.href} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link
                      href={post.href}
                      className="inline-flex items-center text-[#F16112] font-semibold hover:text-[#F1894F] transition-colors group"
                    >
                      {post.readMore || 'Read More'}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                {currentPage > 1 ? (
                  <Link
                    href={publicPath(`/growwise-blogs${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`, locale)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-[#F16112] hover:text-[#F16112] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Page</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-400 cursor-not-allowed">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Page</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={publicPath(`/growwise-blogs${pageNum > 1 ? `?page=${pageNum}` : ''}`, locale)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#F16112] text-white'
                          : 'bg-white border-2 border-gray-300 hover:border-[#F16112] hover:text-[#F16112]'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>
                {currentPage < totalPages ? (
                  <Link
                    href={publicPath(`/growwise-blogs?page=${currentPage + 1}`, locale)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-[#F16112] hover:text-[#F16112] transition-colors"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-400 cursor-not-allowed">
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <BlogPostConversionSection
          locale={locale}
          programHref="/book-assessment"
          programLabel="Book Free Assessment"
          headline="Ready to find the right program?"
          subtext="Book a free assessment — we will recommend academic or STEAM programs for your child."
        />
      </div>
    </>
  )
}
